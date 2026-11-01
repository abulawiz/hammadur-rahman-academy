import { Router } from 'express';
import { db, logActivity } from '../db.js';

export const timetableRouter = Router();

// 1. Get Class Daily Timetable
timetableRouter.get('/class/:className', (req, res) => {
  try {
    const { className } = req.params;

    const periods = db.prepare(`
      SELECT * FROM timetables
      WHERE class_name LIKE ?
      ORDER BY 
        CASE day_of_week
          WHEN 'Monday' THEN 1
          WHEN 'Tuesday' THEN 2
          WHEN 'Wednesday' THEN 3
          WHEN 'Thursday' THEN 4
          WHEN 'Friday' THEN 5
          ELSE 6
        END,
        period_number ASC
    `).all(`%${className}%`);

    // Group by day of week
    const grouped: Record<string, any[]> = {
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: []
    };

    periods.forEach((p: any) => {
      if (grouped[p.day_of_week]) {
        grouped[p.day_of_week].push(p);
      }
    });

    return res.json({
      success: true,
      className,
      totalPeriods: periods.length,
      timetable: grouped,
      allPeriods: periods
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// 2. Add or Update Class Period
timetableRouter.post('/', (req, res) => {
  try {
    const { className, dayOfWeek, periodNumber, startTime, endTime, subject, teacherName, roomVenue } = req.body;

    if (!className || !dayOfWeek || !periodNumber || !startTime || !endTime || !subject || !teacherName) {
      return res.status(400).json({ error: 'All timetable period fields are required.' });
    }

    const insert = db.prepare(`
      INSERT INTO timetables (class_name, day_of_week, period_number, start_time, end_time, subject, teacher_name, room_venue)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = insert.run(
      className.trim(),
      dayOfWeek.trim(),
      Number(periodNumber),
      startTime.trim(),
      endTime.trim(),
      subject.trim(),
      teacherName.trim(),
      roomVenue || 'Main Campus Classroom'
    );

    logActivity('TIMETABLE_ADDED', 'Admin', 'Academics', `Added ${subject} for ${className} on ${dayOfWeek} Period ${periodNumber}.`);

    return res.status(201).json({
      success: true,
      message: 'Timetable period scheduled successfully.',
      id: result.lastInsertRowid
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// 3. Get All Examination Schedules
timetableRouter.get('/exams', (req, res) => {
  try {
    const { session, term, examType, classGrade } = req.query;

    let query = `SELECT * FROM exam_schedules WHERE 1=1`;
    const params: any[] = [];

    if (session) {
      query += ` AND session = ?`;
      params.push(session);
    }
    if (term) {
      query += ` AND term = ?`;
      params.push(term);
    }
    if (examType) {
      query += ` AND exam_type LIKE ?`;
      params.push(`%${examType}%`);
    }
    if (classGrade) {
      query += ` AND class_grade LIKE ?`;
      params.push(`%${classGrade}%`);
    }

    query += ` ORDER BY exam_date ASC, start_time ASC`;

    const schedules = db.prepare(query).all(...params);

    return res.json({
      success: true,
      count: schedules.length,
      schedules
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// 4. Create an Examination Schedule (Admin / Exam Officer)
timetableRouter.post('/exams', (req, res) => {
  try {
    const { session, term, examType, subject, classGrade, examDate, startTime, endTime, venue } = req.body;

    if (!session || !term || !examType || !subject || !classGrade || !examDate || !startTime || !endTime || !venue) {
      return res.status(400).json({ error: 'All exam schedule fields are required.' });
    }

    const insert = db.prepare(`
      INSERT INTO exam_schedules (session, term, exam_type, subject, class_grade, exam_date, start_time, end_time, venue)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = insert.run(
      session.trim(),
      term.trim(),
      examType.trim(),
      subject.trim(),
      classGrade.trim(),
      examDate.trim(),
      startTime.trim(),
      endTime.trim(),
      venue.trim()
    );

    logActivity('EXAM_TIMETABLE_CREATED', 'Admin', 'Examinations', `Scheduled ${examType} for ${subject} (${classGrade}) on ${examDate}.`);

    return res.status(201).json({
      success: true,
      message: 'Examination schedule created successfully.',
      id: result.lastInsertRowid
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});
