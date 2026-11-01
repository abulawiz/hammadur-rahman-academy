import { Router } from 'express';
import { db, logActivity } from '../db.js';

export const cbtRouter = Router();

// 1. Get all available CBT Exams
cbtRouter.get('/exams', (req, res) => {
  try {
    const exams = db.prepare(`
      SELECT e.*, 
        (SELECT COUNT(*) FROM cbt_questions WHERE exam_id = e.id) as question_count,
        (SELECT COUNT(*) FROM cbt_attempts WHERE exam_id = e.id) as attempt_count
      FROM cbt_exams e
      WHERE e.is_active = 1
      ORDER BY e.id DESC
    `).all();

    return res.json({
      success: true,
      count: exams.length,
      exams
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// 2. Start a CBT Exam (Returns questions without revealing correct answer)
cbtRouter.get('/exams/:id', (req, res) => {
  try {
    const { id } = req.params;
    const exam = db.prepare('SELECT * FROM cbt_exams WHERE id = ?').get(id) as any;

    if (!exam) {
      return res.status(404).json({ error: 'CBT Exam not found' });
    }

    // Exclude correct_option and explanation to maintain test integrity
    const questions = db.prepare(`
      SELECT id, exam_id, question_text, option_a, option_b, option_c, option_d
      FROM cbt_questions
      WHERE exam_id = ?
      ORDER BY id ASC
    `).all(id);

    return res.json({
      success: true,
      exam,
      totalQuestions: questions.length,
      questions
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// 3. Submit CBT Exam Answers & Instant Automated Evaluation
cbtRouter.post('/exams/:id/submit', (req, res) => {
  try {
    const { id } = req.params;
    const { admissionNo, answers } = req.body; // answers is an object: { [questionId]: 'A' | 'B' | 'C' | 'D' }

    if (!admissionNo || !answers) {
      return res.status(400).json({ error: 'admissionNo and answers are required.' });
    }

    const cleanAdmission = admissionNo.trim().toUpperCase();
    const student = db.prepare('SELECT full_name FROM students WHERE UPPER(admission_no) = ?').get(cleanAdmission) as any;
    if (!student) {
      return res.status(404).json({ error: 'Student not found in database.' });
    }

    const exam = db.prepare('SELECT * FROM cbt_exams WHERE id = ?').get(id) as any;
    if (!exam) {
      return res.status(404).json({ error: 'CBT Exam not found.' });
    }

    const questions = db.prepare('SELECT * FROM cbt_questions WHERE exam_id = ?').all(id) as any[];
    if (questions.length === 0) {
      return res.status(400).json({ error: 'This exam currently has no questions.' });
    }

    let correctCount = 0;
    const detailedReview = questions.map((q) => {
      const selected = (answers[q.id] || '').trim().toUpperCase();
      const isCorrect = selected === q.correct_option.trim().toUpperCase();
      if (isCorrect) correctCount++;

      return {
        questionId: q.id,
        questionText: q.question_text,
        selectedOption: selected || 'Unanswered',
        correctOption: q.correct_option,
        isCorrect,
        explanation: q.explanation || 'Refer to classroom syllabus and WAEC/NECO curriculum guide.'
      };
    });

    const totalQuestions = questions.length;
    const percentage = Number(((correctCount / totalQuestions) * 100).toFixed(1));
    const passed = percentage >= exam.pass_percentage ? 1 : 0;

    // Record attempt
    const insertAttempt = db.prepare(`
      INSERT INTO cbt_attempts (exam_id, admission_no, student_name, score, total_questions, percentage, passed)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    const attemptResult = insertAttempt.run(
      id,
      cleanAdmission,
      student.full_name,
      correctCount,
      totalQuestions,
      percentage,
      passed
    );

    logActivity('CBT_COMPLETED', student.full_name, 'CBT Engine', `Scored ${correctCount}/${totalQuestions} (${percentage}%) in "${exam.title}".`);

    return res.json({
      success: true,
      message: passed ? 'Congratulations! You passed the CBT examination.' : 'Test completed. Keep practicing to improve your score.',
      attemptId: attemptResult.lastInsertRowid,
      examTitle: exam.title,
      subject: exam.subject,
      studentName: student.full_name,
      admissionNo: cleanAdmission,
      score: correctCount,
      totalQuestions,
      percentage,
      passed: Boolean(passed),
      review: detailedReview
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// 4. Student CBT History
function handleStudentCbtAttempts(req: any, res: any) {
  try {
    const admissionNo = (req.params.admissionNo || req.query.admissionNo as string || '').trim();
    if (!admissionNo) {
      return res.status(400).json({ error: 'Admission number is required.' });
    }
    const cleanAdmission = admissionNo.toUpperCase();

    const attempts = db.prepare(`
      SELECT a.*, e.title as exam_title, e.subject, e.pass_percentage
      FROM cbt_attempts a
      JOIN cbt_exams e ON a.exam_id = e.id
      WHERE UPPER(a.admission_no) = ?
      ORDER BY a.completed_at DESC
    `).all(cleanAdmission);

    return res.json({
      success: true,
      count: attempts.length,
      attempts
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}

cbtRouter.get('/attempts', handleStudentCbtAttempts);
cbtRouter.get('/attempts/:admissionNo', handleStudentCbtAttempts);


// 5. Create a new CBT Exam with Questions (Admin / Staff)
cbtRouter.post('/exams', (req, res) => {
  try {
    const { title, subject, targetClass, durationMinutes, passPercentage, instructions, questions, createdBy } = req.body;

    if (!title || !subject || !targetClass || !instructions) {
      return res.status(400).json({ error: 'Title, subject, targetClass, and instructions are required.' });
    }

    const insertExam = db.prepare(`
      INSERT INTO cbt_exams (title, subject, target_class, duration_minutes, total_questions, pass_percentage, instructions)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    const totalQ = Array.isArray(questions) ? questions.length : 0;
    const examRes = insertExam.run(
      title.trim(),
      subject.trim(),
      targetClass.trim(),
      durationMinutes || 30,
      totalQ,
      passPercentage || 50.0,
      instructions.trim()
    );

    const examId = examRes.lastInsertRowid;

    if (Array.isArray(questions) && questions.length > 0) {
      const insertQ = db.prepare(`
        INSERT INTO cbt_questions (exam_id, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `);

      for (const q of questions) {
        insertQ.run(
          examId,
          q.questionText.trim(),
          q.optionA.trim(),
          q.optionB.trim(),
          q.optionC.trim(),
          q.optionD.trim(),
          q.correctOption.trim().toUpperCase(),
          q.explanation || ''
        );
      }
    }

    logActivity('CBT_EXAM_CREATED', createdBy || 'Admin', 'CBT Engine', `Created exam "${title}" with ${totalQ} questions.`);

    return res.status(201).json({
      success: true,
      message: 'CBT Exam and questions created successfully.',
      examId
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});
