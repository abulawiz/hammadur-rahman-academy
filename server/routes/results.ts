import { Router } from 'express';
import { db } from '../db.js';

export const resultsRouter = Router();

// Check student result by Admission No and Scratch Card PIN
resultsRouter.post('/check', (req, res) => {
  try {
    const { admissionNo, pin, term, session } = req.body;

    if (!admissionNo || !pin) {
      return res.status(400).json({ error: 'Student Admission Number and PIN are required.' });
    }

    const cleanAdmission = admissionNo.trim().toUpperCase();
    const cleanPin = pin.trim();

    // 1. Verify Student exists and PIN matches
    const student = db.prepare(`
      SELECT * FROM students 
      WHERE UPPER(admission_no) = ? AND pin = ?
    `).get(cleanAdmission, cleanPin) as any;

    if (!student) {
      return res.status(404).json({ 
        error: 'Invalid Credentials: No student found matching this Admission Number and PIN.' 
      });
    }

    // 2. Fetch Result for term/session if specified, or latest result
    let query = `SELECT * FROM student_results WHERE UPPER(admission_no) = ?`;
    const params: any[] = [cleanAdmission];

    if (term) {
      query += ` AND term = ?`;
      params.push(term);
    }
    if (session) {
      query += ` AND session = ?`;
      params.push(session);
    }

    query += ` ORDER BY id DESC LIMIT 1`;

    const resultRecord = db.prepare(query).get(...params) as any;

    if (!resultRecord) {
      return res.status(404).json({
        error: `No published report card found for ${student.full_name} for the selected session.`
      });
    }

    // Parse JSON grades
    let parsedGrades = [];
    try {
      parsedGrades = JSON.parse(resultRecord.grades_json);
    } catch {
      parsedGrades = [];
    }

    return res.json({
      success: true,
      student: {
        admissionNo: student.admission_no,
        studentName: student.full_name,
        classGrade: student.class_grade,
        gender: student.gender,
        guardianName: student.guardian_name
      },
      result: {
        term: resultRecord.term,
        session: resultRecord.session,
        attendance: resultRecord.attendance,
        position: resultRecord.position,
        averageScore: resultRecord.average_score,
        principalRemark: resultRecord.principal_remark,
        promotionStatus: resultRecord.promotion_status,
        grades: parsedGrades
      }
    });

  } catch (error: any) {
    console.error('Error checking student result:', error);
    return res.status(500).json({ error: 'Server error while checking result.' });
  }
});

// Admin: Get all student records
resultsRouter.get('/all', (req, res) => {
  try {
    const students = db.prepare(`
      SELECT s.*, 
        (SELECT COUNT(*) FROM student_results r WHERE r.admission_no = s.admission_no) as results_count
      FROM students s
      ORDER BY s.id DESC
    `).all();

    return res.json({ success: true, students });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// Admin: Upload / add new student result
resultsRouter.post('/create', (req, res) => {
  try {
    const {
      admissionNo,
      term,
      session,
      attendance,
      position,
      averageScore,
      principalRemark,
      promotionStatus,
      grades
    } = req.body;

    if (!admissionNo || !term || !session || !grades) {
      return res.status(400).json({ error: 'Missing required result fields.' });
    }

    const insert = db.prepare(`
      INSERT INTO student_results (
        admission_no, term, session, attendance, position, average_score,
        principal_remark, promotion_status, grades_json
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insert.run(
      admissionNo.trim().toUpperCase(),
      term,
      session,
      attendance || '115 / 120 Days',
      position || 'N/A',
      averageScore || 0,
      principalRemark || 'Satisfactory academic performance.',
      promotionStatus || 'PROMOTED',
      JSON.stringify(grades)
    );

    return res.json({ success: true, message: 'Student termly report saved successfully.' });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});
