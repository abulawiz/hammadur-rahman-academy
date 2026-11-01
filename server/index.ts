import express from 'express';
import cors from 'cors';
import { initDatabase } from './db.js';
import { resultsRouter } from './routes/results.js';
import { admissionsRouter } from './routes/admissions.js';
import { announcementsRouter } from './routes/announcements.js';
import { inquiriesRouter } from './routes/inquiries.js';
import { adminRouter } from './routes/admin.js';
import { studentsRouter } from './routes/students.js';
import { staffRouter } from './routes/staff.js';
import { academicsRouter } from './routes/academics.js';
import { feesRouter } from './routes/fees.js';
import { attendanceRouter } from './routes/attendance.js';
import { assignmentsRouter } from './routes/assignments.js';
import { cbtRouter } from './routes/cbt.js';
import { timetableRouter } from './routes/timetable.js';
import { hostelsRouter } from './routes/hostels.js';
import { logsRouter } from './routes/logs.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Database schema and seed data
initDatabase();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/results', resultsRouter);
app.use('/api/admissions', admissionsRouter);
app.use('/api/announcements', announcementsRouter);
app.use('/api/inquiries', inquiriesRouter);
app.use('/api/admin', adminRouter);
app.use('/api/students', studentsRouter);
app.use('/api/staff', staffRouter);
app.use('/api/academics', academicsRouter);
app.use('/api/fees', feesRouter);
app.use('/api/attendance', attendanceRouter);
app.use('/api/assignments', assignmentsRouter);
app.use('/api/cbt', cbtRouter);
app.use('/api/timetable', timetableRouter);
app.use('/api/hostels', hostelsRouter);
app.use('/api/logs', logsRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    institution: 'Hammadur Rahman Academy Secondary School, Lafia',
    database: 'SQLite (Connected)',
    modules: [
      'students',
      'results',
      'admissions',
      'staff',
      'academics',
      'fees',
      'announcements',
      'inquiries',
      'admin',
      'attendance',
      'assignments',
      'cbt',
      'timetable',
      'hostels',
      'logs'
    ],
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`[HRA Server] Complete Backend API running at http://127.0.0.1:${PORT}`);
});

