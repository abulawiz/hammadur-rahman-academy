import { Router } from 'express';
import { db, logActivity } from '../db.js';

export const hostelsRouter = Router();

// 1. Get All Hostels with Live Occupancy
hostelsRouter.get('/', (req, res) => {
  try {
    const hostels = db.prepare(`
      SELECT h.*,
        (SELECT COUNT(*) FROM hostel_allocations WHERE hostel_id = h.id AND status = 'Occupied') as occupied_count
      FROM hostels h
      ORDER BY h.id ASC
    `).all() as any[];

    const withMetrics = hostels.map(h => ({
      ...h,
      availableBeds: h.capacity - h.occupied_count,
      occupancyRate: `${((h.occupied_count / h.capacity) * 100).toFixed(1)}%`
    }));

    return res.json({
      success: true,
      count: withMetrics.length,
      hostels: withMetrics
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// 2. Get Allocations in a Hostel
hostelsRouter.get('/:id/allocations', (req, res) => {
  try {
    const { id } = req.params;

    const hostel = db.prepare('SELECT * FROM hostels WHERE id = ?').get(id) as any;
    if (!hostel) {
      return res.status(404).json({ error: 'Hostel not found.' });
    }

    const allocations = db.prepare(`
      SELECT a.*, s.class_grade, s.gender, s.guardian_name, s.guardian_phone
      FROM hostel_allocations a
      JOIN students s ON a.admission_no = s.admission_no
      WHERE a.hostel_id = ?
      ORDER BY a.room_no ASC, a.bed_no ASC
    `).all(id);

    return res.json({
      success: true,
      hostel,
      count: allocations.length,
      allocations
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// 3. Allocate a Student to a Bed Space
hostelsRouter.post('/allocate', (req, res) => {
  try {
    const { hostelId, admissionNo, roomNo, bedNo, session } = req.body;

    if (!hostelId || !admissionNo || !roomNo || !bedNo) {
      return res.status(400).json({ error: 'hostelId, admissionNo, roomNo, and bedNo are required.' });
    }

    const cleanAdmission = admissionNo.trim().toUpperCase();
    const student = db.prepare('SELECT full_name, enrollment_type FROM students WHERE UPPER(admission_no) = ?').get(cleanAdmission) as any;
    if (!student) {
      return res.status(404).json({ error: 'Student not found in database.' });
    }

    const hostel = db.prepare('SELECT * FROM hostels WHERE id = ?').get(hostelId) as any;
    if (!hostel) {
      return res.status(404).json({ error: 'Hostel not found.' });
    }

    // Check if bed already taken in this room
    const existingBed = db.prepare(`
      SELECT student_name FROM hostel_allocations
      WHERE hostel_id = ? AND room_no = ? AND bed_no = ? AND status = 'Occupied'
    `).get(hostelId, roomNo.trim(), bedNo.trim()) as any;

    if (existingBed) {
      return res.status(409).json({ error: `Bed ${bedNo} in Room ${roomNo} is already occupied by ${existingBed.student_name}.` });
    }

    const insert = db.prepare(`
      INSERT INTO hostel_allocations (hostel_id, admission_no, student_name, room_no, bed_no, session, status)
      VALUES (?, ?, ?, ?, ?, ?, 'Occupied')
    `);

    const result = insert.run(
      hostelId,
      cleanAdmission,
      student.full_name,
      roomNo.trim(),
      bedNo.trim(),
      session || '2026/2027'
    );

    logActivity('HOSTEL_ALLOCATED', 'House Master', 'Boarding', `Allocated ${student.full_name} (${cleanAdmission}) to ${hostel.name} Room ${roomNo} Bed ${bedNo}.`);

    return res.status(201).json({
      success: true,
      message: `${student.full_name} successfully allocated to ${hostel.name}, Room ${roomNo}, Bed ${bedNo}.`,
      allocationId: result.lastInsertRowid
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// 4. Create a New Hostel Block
hostelsRouter.post('/', (req, res) => {
  try {
    const { name, gender, capacity, houseMaster, contactPhone, description } = req.body;

    if (!name || !gender || !capacity || !houseMaster || !contactPhone) {
      return res.status(400).json({ error: 'Name, gender, capacity, houseMaster, and contactPhone are required.' });
    }

    const insert = db.prepare(`
      INSERT INTO hostels (name, gender, capacity, house_master, contact_phone, description)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    const result = insert.run(
      name.trim(),
      gender.trim(),
      Number(capacity),
      houseMaster.trim(),
      contactPhone.trim(),
      description || 'Boarding residence block'
    );

    logActivity('HOSTEL_CREATED', 'Admin', 'Boarding', `Created hostel block "${name}" (Capacity: ${capacity}).`);

    return res.status(201).json({
      success: true,
      message: 'Hostel block registered successfully.',
      hostelId: result.lastInsertRowid
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});
