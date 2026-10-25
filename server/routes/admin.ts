import { Router } from 'express';
import { db } from '../db.js';

export const adminRouter = Router();

// Admin Authentication (default credentials: admin / admin123)
adminRouter.post('/login', (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required.' });
    }

    const admin = db.prepare(`
      SELECT id, username, full_name, role FROM admins
      WHERE username = ? AND password = ?
    `).get(username.trim(), password.trim()) as any;

    if (!admin) {
      return res.status(401).json({ error: 'Invalid administrator credentials.' });
    }

    return res.json({
      success: true,
      message: 'Login successful',
      admin: {
        id: admin.id,
        username: admin.username,
        fullName: admin.full_name,
        role: admin.role
      }
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// Admin Dashboard Summary Metrics
adminRouter.get('/stats', (req, res) => {
  try {
    const applicationsCount = (db.prepare('SELECT COUNT(*) as count FROM admission_applications').get() as any).count;
    const pendingApps = (db.prepare("SELECT COUNT(*) as count FROM admission_applications WHERE status = 'Pending Review'").get() as any).count;
    const studentsCount = (db.prepare('SELECT COUNT(*) as count FROM students').get() as any).count;
    const inquiriesCount = (db.prepare("SELECT COUNT(*) as count FROM inquiries WHERE status = 'Unread'").get() as any).count;
    const announcementsCount = (db.prepare('SELECT COUNT(*) as count FROM announcements').get() as any).count;

    return res.json({
      success: true,
      stats: {
        totalApplications: applicationsCount,
        pendingApplications: pendingApps,
        enrolledStudents: studentsCount,
        unreadInquiries: inquiriesCount,
        publishedAnnouncements: announcementsCount
      }
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});
