import { Router } from 'express';
import { db } from '../db.js';

export const admissionsRouter = Router();

// Submit Online Admission Application
admissionsRouter.post('/apply', (req, res) => {
  try {
    const {
      studentFirstName,
      studentLastName,
      gender,
      dob,
      classApplied,
      enrollmentType,
      stateOfOrigin,
      lga,
      parentName,
      parentPhone,
      parentEmail,
      parentAddress,
      previousSchool,
      lastClassPassed,
      medicalNotes
    } = req.body;

    if (!studentFirstName || !studentLastName || !parentName || !parentPhone || !classApplied) {
      return res.status(400).json({ error: 'Please provide all required application fields.' });
    }

    // Generate unique Application Reference: HRA-ADM-YEAR-RANDOM
    const year = new Date().getFullYear();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const refNumber = `HRA-ADM-${year}-${randomSuffix}`;

    const insert = db.prepare(`
      INSERT INTO admission_applications (
        ref_number, first_name, last_name, gender, dob, class_applied,
        enrollment_type, state_of_origin, lga, parent_name, parent_phone,
        parent_email, parent_address, previous_school, last_class_passed,
        medical_notes, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insert.run(
      refNumber,
      studentFirstName.trim(),
      studentLastName.trim(),
      gender || 'Male',
      dob || '',
      classApplied,
      enrollmentType || 'Boarding Student',
      stateOfOrigin || 'Nasarawa',
      lga || 'Lafia',
      parentName.trim(),
      parentPhone.trim(),
      parentEmail?.trim() || '',
      parentAddress?.trim() || 'Lafia, Nasarawa State',
      previousSchool?.trim() || '',
      lastClassPassed || '',
      medicalNotes || 'None',
      'Pending Review'
    );

    return res.status(201).json({
      success: true,
      message: 'Application registered successfully.',
      refNumber,
      candidateName: `${studentFirstName} ${studentLastName}`,
      classApplied,
      enrollmentType,
      screeningVenue: 'School Examination Hall, Main Campus, Lafia, Nasarawa State',
      examDate: 'Saturday, 8th August 2026 at 8:30 AM prompt'
    });

  } catch (error: any) {
    console.error('Error submitting application:', error);
    return res.status(500).json({ error: 'Server error saving application.' });
  }
});

// Admin: List all admission applications
admissionsRouter.get('/applications', (req, res) => {
  try {
    const { status, classLevel } = req.query;

    let query = `SELECT * FROM admission_applications WHERE 1=1`;
    const params: any[] = [];

    if (status && status !== 'All') {
      query += ` AND status = ?`;
      params.push(status);
    }

    if (classLevel && classLevel !== 'All') {
      query += ` AND class_applied LIKE ?`;
      params.push(`%${classLevel}%`);
    }

    query += ` ORDER BY id DESC`;

    const applications = db.prepare(query).all(...params);
    return res.json({ success: true, applications });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// Admin: Update status of application (Pending, Interview Scheduled, Approved, Declined)
admissionsRouter.patch('/applications/:id/status', (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: 'Status is required.' });
    }

    const update = db.prepare(`
      UPDATE admission_applications SET status = ? WHERE id = ?
    `);

    const info = update.run(status, id);

    if (info.changes === 0) {
      return res.status(404).json({ error: 'Application record not found.' });
    }

    return res.json({ success: true, message: `Application status updated to ${status}.` });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});
