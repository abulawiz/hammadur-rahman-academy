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
      'admin'
    ],
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`[HRA Server] Complete Backend API running at http://127.0.0.1:${PORT}`);
});
