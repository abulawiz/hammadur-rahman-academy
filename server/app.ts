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

export const app = express();

// Initialize Database schema and seed data
initDatabase();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// List of all module routers
const routers: [string, any][] = [
  ['/results', resultsRouter],
  ['/admissions', admissionsRouter],
  ['/announcements', announcementsRouter],
  ['/inquiries', inquiriesRouter],
  ['/admin', adminRouter],
  ['/students', studentsRouter],
  ['/staff', staffRouter],
  ['/academics', academicsRouter],
  ['/fees', feesRouter],
  ['/attendance', attendanceRouter],
  ['/assignments', assignmentsRouter],
  ['/cbt', cbtRouter],
  ['/timetable', timetableRouter],
  ['/hostels', hostelsRouter],
  ['/logs', logsRouter],
];

// Mount on both `/api/...` and `/...` to ensure Vercel rewrites and direct calls both work
for (const [routePath, router] of routers) {
  app.use(`/api${routePath}`, router);
  app.use(routePath, router);
}

// Health check endpoint
const healthHandler = (req: express.Request, res: express.Response) => {
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
};

app.get('/api/health', healthHandler);
app.get('/health', healthHandler);
app.get('/api', healthHandler);

export default app;
