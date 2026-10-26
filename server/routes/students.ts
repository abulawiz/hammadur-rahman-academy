import { Router } from 'express';
import { db } from '../db.js';

export const studentsRouter = Router();

// Helper to generate a unique random PIN: XXXX-XXXX-XXXX
function generateScratchPin(): string {
  const part1 = Math.floor(1000 + Math.random() * 9000);
  const part2 = Math.floor(1000 + Math.random() * 9000);
  const part3 = Math.floor(1000 + Math.random() * 9000);
  return `${part1}-${part2}-${part3}`;
}

// 1. List all students with search & filters
studentsRouter.get('/', (req, res) => {
  try {
    const { search, classGrade, status } = req.query;

    let query = `
      SELECT s.*, 
        (SELECT COUNT(*) FROM student_results r WHERE r.admission_no = s.admission_no) as results_count
      FROM students s
      WHERE 1=1
    `;
    const params: any[] = [];

    if (search) {
      query += ` AND (full_name LIKE ? OR admission_no LIKE ? OR guardian_phone LIKE ?)`;
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    if (classGrade && classGrade !== 'All') {
      query += ` AND class_grade LIKE ?`;
      params.push(`%${classGrade}%`);
    }

    if (status && status !== 'All') {
      query += ` AND status = ?`;
      params.push(status);
    }

    query += ` ORDER BY id DESC`;

    const students = db.prepare(query).all(...params);
    return res.json({ success: true, count: students.length, students });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// 2. Get single student by ID or Admission No
studentsRouter.get('/:identifier', (req, res) => {
  try {
    const { identifier } = req.params;

    const student = db.prepare(`
      SELECT * FROM students 
      WHERE id = ? OR UPPER(admission_no) = UPPER(?)
    `).get(identifier, identifier) as any;

    if (!student) {
      return res.status(404).json({ error: 'Student record not found.' });
    }

    // Fetch historical results
    const results = db.prepare(`
      SELECT * FROM student_results 
      WHERE UPPER(admission_no) = UPPER(?)
      ORDER BY id DESC
    `).all(student.admission_no);

    return res.json({ success: true, student, results });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// 3. Register / Enroll new student
studentsRouter.post('/', (req, res) => {
  try {
    const {
      fullName,
      classGrade,
      gender,
      dob,
      stateOfOrigin,
      lga,
      guardianName,
      guardianPhone,
      guardianEmail,
      enrollmentType
    } = req.body;

    if (!fullName || !classGrade || !gender) {
      return res.status(400).json({ error: 'Full name, class, and gender are required.' });
    }

    // Auto-generate Admission Number: HRA/YEAR/SERIAL
    const year = new Date().getFullYear();
    const countTotal = (db.prepare('SELECT COUNT(*) as c FROM students').get() as any).c;
    const serial = String(countTotal + 101).padStart(3, '0');
    const admissionNo = `HRA/${year}/${serial}`;
    const pin = generateScratchPin();

    const insert = db.prepare(`
      INSERT INTO students (
        admission_no, pin, full_name, class_grade, gender, dob,
        state_of_origin, lga, guardian_name, guardian_phone, guardian_email,
        enrollment_type, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Enrolled')
    `);

    const result = insert.run(
      admissionNo,
      pin,
      fullName.trim(),
      classGrade,
      gender,
      dob || '',
      stateOfOrigin || 'Nasarawa',
      lga || 'Lafia',
      guardianName?.trim() || '',
      guardianPhone?.trim() || '',
      guardianEmail?.trim() || '',
      enrollmentType || 'Boarding Student'
    );

    return res.status(201).json({
      success: true,
      message: 'Student registered and enrolled successfully.',
      student: {
        id: result.lastInsertRowid,
        admissionNo,
        pin,
        fullName,
        classGrade
      }
    });

  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// 4. Update student record
studentsRouter.put('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const {
      fullName,
      classGrade,
      guardianName,
      guardianPhone,
      guardianEmail,
      enrollmentType,
      status
    } = req.body;

    const update = db.prepare(`
      UPDATE students SET
        full_name = COALESCE(?, full_name),
        class_grade = COALESCE(?, class_grade),
        guardian_name = COALESCE(?, guardian_name),
        guardian_phone = COALESCE(?, guardian_phone),
        guardian_email = COALESCE(?, guardian_email),
        enrollment_type = COALESCE(?, enrollment_type),
        status = COALESCE(?, status)
      WHERE id = ?
    `);

    const info = update.run(
      fullName,
      classGrade,
      guardianName,
      guardianPhone,
      guardianEmail,
      enrollmentType,
      status,
      id
    );

    if (info.changes === 0) {
      return res.status(404).json({ error: 'Student record not found.' });
    }

    return res.json({ success: true, message: 'Student record updated successfully.' });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// 5. Regenerate scratch card PIN
studentsRouter.post('/:id/regenerate-pin', (req, res) => {
  try {
    const { id } = req.params;
    const newPin = generateScratchPin();

    const update = db.prepare(`UPDATE students SET pin = ? WHERE id = ?`);
    const info = update.run(newPin, id);

    if (info.changes === 0) {
      return res.status(404).json({ error: 'Student not found.' });
    }

    return res.json({
      success: true,
      message: 'New scratch card PIN issued successfully.',
      newPin
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// 6. Delete student
studentsRouter.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const info = db.prepare('DELETE FROM students WHERE id = ?').run(id);

    if (info.changes === 0) {
      return res.status(404).json({ error: 'Student not found.' });
    }

    return res.json({ success: true, message: 'Student deleted successfully.' });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});
