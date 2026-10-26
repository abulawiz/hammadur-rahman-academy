import { Router } from 'express';
import { db } from '../db.js';

export const staffRouter = Router();

// 1. Get all staff
staffRouter.get('/', (req, res) => {
  try {
    const { department, status } = req.query;

    let query = `SELECT * FROM staff WHERE 1=1`;
    const params: any[] = [];

    if (department && department !== 'All') {
      query += ` AND department = ?`;
      params.push(department);
    }

    if (status && status !== 'All') {
      query += ` AND status = ?`;
      params.push(status);
    }

    query += ` ORDER BY id ASC`;

    const staffList = db.prepare(query).all(...params);
    return res.json({ success: true, count: staffList.length, staff: staffList });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// 2. Add new staff
staffRouter.post('/', (req, res) => {
  try {
    const { fullName, role, department, qualification, phone, email } = req.body;

    if (!fullName || !role || !department) {
      return res.status(400).json({ error: 'Full name, role, and department are required.' });
    }

    const totalStaff = (db.prepare('SELECT COUNT(*) as c FROM staff').get() as any).c;
    const staffId = `HRA/ST/${String(totalStaff + 1).padStart(3, '0')}`;

    const insert = db.prepare(`
      INSERT INTO staff (staff_id, full_name, role, department, qualification, phone, email, status, date_joined)
      VALUES (?, ?, ?, ?, ?, ?, ?, 'Active', ?)
    `);

    const result = insert.run(
      staffId,
      fullName.trim(),
      role.trim(),
      department,
      qualification?.trim() || 'TRCN Certified Teacher',
      phone?.trim() || '',
      email?.trim() || '',
      new Date().toISOString().split('T')[0]
    );

    return res.status(201).json({
      success: true,
      message: 'Staff member added successfully.',
      staffId,
      id: result.lastInsertRowid
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// 3. Update staff
staffRouter.put('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, role, department, qualification, phone, email, status } = req.body;

    const update = db.prepare(`
      UPDATE staff SET
        full_name = COALESCE(?, full_name),
        role = COALESCE(?, role),
        department = COALESCE(?, department),
        qualification = COALESCE(?, qualification),
        phone = COALESCE(?, phone),
        email = COALESCE(?, email),
        status = COALESCE(?, status)
      WHERE id = ?
    `);

    const info = update.run(fullName, role, department, qualification, phone, email, status, id);

    if (info.changes === 0) {
      return res.status(404).json({ error: 'Staff member not found.' });
    }

    return res.json({ success: true, message: 'Staff member updated successfully.' });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// 4. Delete staff
staffRouter.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const info = db.prepare('DELETE FROM staff WHERE id = ?').run(id);

    if (info.changes === 0) {
      return res.status(404).json({ error: 'Staff member not found.' });
    }

    return res.json({ success: true, message: 'Staff member deleted.' });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});
