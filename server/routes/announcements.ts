import { Router } from 'express';
import { db } from '../db.js';

export const announcementsRouter = Router();

// Get announcements with optional category filter
announcementsRouter.get('/', (req, res) => {
  try {
    const { category } = req.query;

    let query = `SELECT * FROM announcements`;
    const params: any[] = [];

    if (category && category !== 'All') {
      query += ` WHERE category = ?`;
      params.push(category);
    }

    query += ` ORDER BY urgent DESC, id DESC`;

    const announcements = db.prepare(query).all(...params);
    return res.json({ success: true, announcements });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// Admin: Post new announcement
announcementsRouter.post('/', (req, res) => {
  try {
    const { title, dateText, category, content, badge, urgent } = req.body;

    if (!title || !content || !category) {
      return res.status(400).json({ error: 'Title, content, and category are required.' });
    }

    const insert = db.prepare(`
      INSERT INTO announcements (title, date_text, category, content, badge, urgent)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    const result = insert.run(
      title.trim(),
      dateText || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      category,
      content.trim(),
      badge || null,
      urgent ? 1 : 0
    );

    return res.status(201).json({
      success: true,
      message: 'Announcement published successfully.',
      announcementId: result.lastInsertRowid
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// Admin: Delete announcement
announcementsRouter.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const del = db.prepare(`DELETE FROM announcements WHERE id = ?`);
    const info = del.run(id);

    if (info.changes === 0) {
      return res.status(404).json({ error: 'Announcement not found.' });
    }

    return res.json({ success: true, message: 'Announcement deleted.' });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});
