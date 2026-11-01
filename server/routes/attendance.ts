import { Router } from 'express';
import { db, logActivity } from '../db.js';

export const attendanceRouter = Router();

// 1. Get Attendance Summary / Stats
attendanceRouter.get('/summary', (req, res) => {
  try {
    const today = (req.query.date as string) || new Date().toISOString().split('T')[0];
    
    const totalStudents = (db.prepare("SELECT COUNT(*) as count FROM students WHERE status = 'Enrolled'").get() as any).count;
    const presentToday = (db.prepare("SELECT COUNT(*) as count FROM attendance WHERE date = ? AND status = 'Present'").get(today) as any).count;
    const absentToday = (db.prepare("SELECT COUNT(*) as count FROM attendance WHERE date = ? AND status = 'Absent'").get(today) as any).count;
    const lateToday = (db.prepare("SELECT COUNT(*) as count FROM attendance WHERE date = ? AND status = 'Late'").get(today) as any).count;
    const excusedToday = (db.prepare("SELECT COUNT(*) as count FROM attendance WHERE date = ? AND status = 'Excused'").get(today) as any).count;

    const rate = totalStudents > 0 ? ((presentToday / totalStudents) * 100).toFixed(1) : '100.0';

    return res.json({
      success: true,
      date: today,
      stats: {
        totalStudents,
        presentToday,
        absentToday,
        lateToday,
        excusedToday,
        attendanceRate: `${rate}%`
      }
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// 2. Get Class Attendance for a Date
attendanceRouter.get('/class/:className', (req, res) => {
  try {
    const { className } = req.params;
    const date = (req.query.date as string) || new Date().toISOString().split('T')[0];

    const records = db.prepare(`
      SELECT a.*, s.full_name, s.gender, s.enrollment_type
      FROM attendance a
      JOIN students s ON a.admission_no = s.admission_no
      WHERE a.class_name = ? AND a.date = ?
      ORDER BY s.full_name ASC
    `).all(className, date);

    return res.json({
      success: true,
      className,
      date,
      count: records.length,
      records
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// 3. Get Student Attendance Profile
function handleStudentAttendance(req: any, res: any) {
  try {
    const admissionNo = (req.params.admissionNo || req.query.admissionNo as string || '').trim();
    if (!admissionNo) {
      return res.status(400).json({ error: 'Admission number is required.' });
    }
    const cleanAdmission = admissionNo.toUpperCase();

    const student = db.prepare('SELECT full_name, class_grade, admission_no FROM students WHERE UPPER(admission_no) = ?').get(cleanAdmission) as any;
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const history = db.prepare(`
      SELECT * FROM attendance
      WHERE UPPER(admission_no) = ?
      ORDER BY date DESC
      LIMIT 60
    `).all(cleanAdmission);

    const totalDays = history.length;
    const presentDays = history.filter((r: any) => r.status === 'Present').length;
    const attendancePercentage = totalDays > 0 ? ((presentDays / totalDays) * 100).toFixed(1) : '100.0';

    return res.json({
      success: true,
      student,
      summary: {
        totalRecordedDays: totalDays,
        presentDays,
        absentDays: history.filter((r: any) => r.status === 'Absent').length,
        attendancePercentage: `${attendancePercentage}%`
      },
      history
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}

attendanceRouter.get('/student', handleStudentAttendance);
attendanceRouter.get('/student/:admissionNo', handleStudentAttendance);

// 4. Mark or Batch Mark Attendance
attendanceRouter.post('/mark', (req, res) => {
  try {
    const { records, admissionNo, className, date, status, remarks, markedBy } = req.body;

    // Batch marking support
    if (Array.isArray(records)) {
      const insert = db.prepare(`
        INSERT INTO attendance (admission_no, class_name, date, status, remarks, marked_by)
        VALUES (?, ?, ?, ?, ?, ?)
      `);

      const transaction = db.transaction((rows: any[]) => {
        for (const row of rows) {
          insert.run(
            row.admissionNo.trim().toUpperCase(),
            row.className || 'General',
            row.date || new Date().toISOString().split('T')[0],
            row.status || 'Present',
            row.remarks || '',
            row.markedBy || markedBy || 'Class Master'
          );
        }
      });

      transaction(records);

      logActivity('ATTENDANCE_BATCH_MARKED', markedBy || 'Admin', 'Attendance', `Marked attendance for ${records.length} students on ${records[0]?.date || 'today'}.`);

      return res.status(201).json({
        success: true,
        message: `Successfully marked attendance for ${records.length} students.`
      });
    }

    // Single marking
    if (!admissionNo || !status) {
      return res.status(400).json({ error: 'admissionNo and status are required.' });
    }

    const recDate = date || new Date().toISOString().split('T')[0];
    const insert = db.prepare(`
      INSERT INTO attendance (admission_no, class_name, date, status, remarks, marked_by)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    insert.run(
      admissionNo.trim().toUpperCase(),
      className || 'General',
      recDate,
      status,
      remarks || '',
      markedBy || 'Class Master'
    );

    logActivity('ATTENDANCE_MARKED', markedBy || 'Admin', 'Attendance', `Marked ${status} for ${admissionNo} on ${recDate}.`);

    return res.status(201).json({
      success: true,
      message: `Attendance marked as ${status} for ${admissionNo}.`
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});
