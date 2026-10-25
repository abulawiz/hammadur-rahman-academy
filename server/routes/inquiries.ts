import { Router } from 'express';
import { db } from '../db.js';

export const inquiriesRouter = Router();

// Submit Contact Message / Inquiry
inquiriesRouter.post('/', (req, res) => {
  try {
    const { fullName, email, phone, inquiryType, message } = req.body;

    if (!fullName || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required.' });
    }

    const insert = db.prepare(`
      INSERT INTO inquiries (full_name, email, phone, inquiry_type, message, status)
      VALUES (?, ?, ?, ?, ?, 'Unread')
    `);

    insert.run(
      fullName.trim(),
      email.trim(),
      phone?.trim() || '',
      inquiryType || 'Admissions Inquiry',
      message.trim()
    );

    return res.status(201).json({
      success: true,
      message: 'Inquiry received. The administrative office at Lafia campus will contact you shortly.'
    });
  } catch (error: any) {
    console.error('Error submitting inquiry:', error);
    return res.status(500).json({ error: 'Server error saving inquiry.' });
  }
});

// Admin: List inquiries
inquiriesRouter.get('/', (req, res) => {
  try {
    const inquiries = db.prepare(`
      SELECT * FROM inquiries ORDER BY id DESC
    `).all();

    return res.json({ success: true, inquiries });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// Admin: Update status
inquiriesRouter.patch('/:id/status', (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const update = db.prepare(`UPDATE inquiries SET status = ? WHERE id = ?`);
    const info = update.run(status || 'Replied', id);

    if (info.changes === 0) {
      return res.status(404).json({ error: 'Inquiry not found.' });
    }

    return res.json({ success: true, message: `Inquiry status updated to ${status}.` });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});
