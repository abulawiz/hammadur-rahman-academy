import { Router } from 'express';
import { db, logActivity } from '../db.js';

export const assignmentsRouter = Router();

// 1. Get all assignments
assignmentsRouter.get('/', (req, res) => {
  try {
    const { classGrade, subject, status } = req.query;

    let query = `
      SELECT a.*, 
        (SELECT COUNT(*) FROM assignment_submissions WHERE assignment_id = a.id) as submission_count
      FROM assignments a
      WHERE 1=1
    `;
    const params: any[] = [];

    if (classGrade) {
      query += ` AND a.class_grade LIKE ?`;
      params.push(`%${classGrade}%`);
    }
    if (subject) {
      query += ` AND a.subject LIKE ?`;
      params.push(`%${subject}%`);
    }
    if (status) {
      query += ` AND a.status = ?`;
      params.push(status);
    }

    query += ` ORDER BY a.id DESC`;

    const assignments = db.prepare(query).all(...params);

    return res.json({
      success: true,
      count: assignments.length,
      assignments
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// 2. Get Student Assignments & Submissions Dashboard (Named route must precede /:id)
function handleStudentAssignments(req: any, res: any) {
  try {
    const admissionNo = (req.params.admissionNo || req.query.admissionNo as string || '').trim();
    if (!admissionNo) {
      return res.status(400).json({ error: 'Admission number is required.' });
    }
    const cleanAdmission = admissionNo.toUpperCase();

    const student = db.prepare('SELECT full_name, class_grade FROM students WHERE UPPER(admission_no) = ?').get(cleanAdmission) as any;
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const assignments = db.prepare(`
      SELECT a.*, 
        s.id as submission_id,
        s.submission_text,
        s.score,
        s.teacher_feedback,
        s.submission_date,
        COALESCE(s.status, 'Pending Submission') as student_submission_status
      FROM assignments a
      LEFT JOIN assignment_submissions s ON a.id = s.assignment_id AND UPPER(s.admission_no) = ?
      ORDER BY a.due_date ASC
    `).all(cleanAdmission);

    return res.json({
      success: true,
      student,
      assignments
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}

assignmentsRouter.get('/student', handleStudentAssignments);
assignmentsRouter.get('/student/:admissionNo', handleStudentAssignments);

// 3. Get Single Assignment with Submissions
assignmentsRouter.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const assignment = db.prepare('SELECT * FROM assignments WHERE id = ?').get(id) as any;

    if (!assignment) {
      return res.status(404).json({ error: 'Assignment not found' });
    }

    const submissions = db.prepare(`
      SELECT * FROM assignment_submissions
      WHERE assignment_id = ?
      ORDER BY submission_date DESC
    `).all(id);

    return res.json({
      success: true,
      assignment,
      submissions
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});


// 3. Create a New Assignment
assignmentsRouter.post('/', (req, res) => {
  try {
    const { title, subject, classGrade, teacherName, dueDate, maxScore, instructions, attachmentsUrl } = req.body;

    if (!title || !subject || !classGrade || !dueDate || !instructions) {
      return res.status(400).json({ error: 'Title, subject, classGrade, dueDate, and instructions are required.' });
    }

    const insert = db.prepare(`
      INSERT INTO assignments (title, subject, class_grade, teacher_name, due_date, max_score, instructions, attachments_url)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = insert.run(
      title.trim(),
      subject.trim(),
      classGrade.trim(),
      teacherName || 'Senior Master',
      dueDate,
      maxScore || 20,
      instructions.trim(),
      attachmentsUrl || ''
    );

    logActivity('ASSIGNMENT_CREATED', teacherName || 'Staff', 'Assignments', `Created assignment "${title}" for ${classGrade}.`);

    return res.status(201).json({
      success: true,
      message: 'Assignment created successfully',
      assignmentId: result.lastInsertRowid
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// 4. Submit an Assignment by Student
assignmentsRouter.post('/:id/submit', (req, res) => {
  try {
    const { id } = req.params;
    const { admissionNo, submissionText } = req.body;

    if (!admissionNo || !submissionText) {
      return res.status(400).json({ error: 'admissionNo and submissionText are required.' });
    }

    const cleanAdmission = admissionNo.trim().toUpperCase();
    const student = db.prepare('SELECT full_name FROM students WHERE UPPER(admission_no) = ?').get(cleanAdmission) as any;
    if (!student) {
      return res.status(404).json({ error: 'Student not found.' });
    }

    const assignment = db.prepare('SELECT title FROM assignments WHERE id = ?').get(id) as any;
    if (!assignment) {
      return res.status(404).json({ error: 'Assignment not found.' });
    }

    // Check if already submitted
    const existing = db.prepare('SELECT id FROM assignment_submissions WHERE assignment_id = ? AND UPPER(admission_no) = ?').get(id, cleanAdmission) as any;
    if (existing) {
      db.prepare(`
        UPDATE assignment_submissions
        SET submission_text = ?, submission_date = CURRENT_TIMESTAMP, status = 'Resubmitted'
        WHERE id = ?
      `).run(submissionText.trim(), existing.id);

      return res.json({
        success: true,
        message: 'Assignment updated and resubmitted successfully.'
      });
    }

    const insert = db.prepare(`
      INSERT INTO assignment_submissions (assignment_id, admission_no, student_name, submission_text)
      VALUES (?, ?, ?, ?)
    `);

    const result = insert.run(id, cleanAdmission, student.full_name, submissionText.trim());

    logActivity('ASSIGNMENT_SUBMITTED', student.full_name, 'Assignments', `Submitted coursework for "${assignment.title}".`);

    return res.status(201).json({
      success: true,
      message: 'Assignment submitted successfully.',
      submissionId: result.lastInsertRowid
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// 5. Grade Assignment Submission
assignmentsRouter.post('/submissions/:id/grade', (req, res) => {
  try {
    const { id } = req.params;
    const { score, teacherFeedback, gradedBy } = req.body;

    if (score === undefined || score === null) {
      return res.status(400).json({ error: 'Score is required.' });
    }

    const sub = db.prepare('SELECT s.*, a.title FROM assignment_submissions s JOIN assignments a ON s.assignment_id = a.id WHERE s.id = ?').get(id) as any;
    if (!sub) {
      return res.status(404).json({ error: 'Submission not found' });
    }

    db.prepare(`
      UPDATE assignment_submissions
      SET score = ?, teacher_feedback = ?, status = 'Graded'
      WHERE id = ?
    `).run(Number(score), teacherFeedback || '', id);

    logActivity('ASSIGNMENT_GRADED', gradedBy || 'Teacher', 'Assignments', `Graded submission for ${sub.student_name} (${score} marks).`);

    return res.json({
      success: true,
      message: `Submission graded successfully (${score} marks).`
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});


