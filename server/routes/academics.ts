import { Router } from 'express';
import { db } from '../db.js';

export const academicsRouter = Router();

// 1. Get all classes
academicsRouter.get('/classes', (req, res) => {
  try {
    const classes = db.prepare(`
      SELECT c.*,
        (SELECT COUNT(*) FROM students s WHERE s.class_grade LIKE '%' || c.name || '%') as real_enrolled
      FROM academic_classes c
      ORDER BY c.id ASC
    `).all();

    return res.json({ success: true, count: classes.length, classes });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// 2. Get all curriculum subjects
academicsRouter.get('/subjects', (req, res) => {
  try {
    const { department } = req.query;

    let query = `SELECT * FROM subjects WHERE 1=1`;
    const params: any[] = [];

    if (department && department !== 'All') {
      query += ` AND department = ?`;
      params.push(department);
    }

    query += ` ORDER BY department, title ASC`;

    const subjects = db.prepare(query).all(...params);
    return res.json({ success: true, count: subjects.length, subjects });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// 3. Add new subject
academicsRouter.post('/subjects', (req, res) => {
  try {
    const { code, title, department, isCore } = req.body;

    if (!code || !title || !department) {
      return res.status(400).json({ error: 'Subject code, title, and department are required.' });
    }

    const insert = db.prepare(`
      INSERT INTO subjects (code, title, department, is_core)
      VALUES (?, ?, ?, ?)
    `);

    insert.run(code.trim().toUpperCase(), title.trim(), department, isCore ? 1 : 0);
    return res.status(201).json({ success: true, message: 'Subject added to school curriculum.' });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});
