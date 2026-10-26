import { Router } from 'express';
import { db } from '../db.js';

export const adminRouter = Router();

// Admin Authentication (supports admin, bursar)
adminRouter.post('/login', (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required.' });
    }

    const cleanUser = username.trim().toLowerCase();
    const cleanPass = password.trim();

    const admin = db.prepare(`
      SELECT id, username, full_name, role FROM admins
      WHERE LOWER(username) = ? AND password = ?
    `).get(cleanUser, cleanPass) as any;

    if (!admin) {
      return res.status(401).json({ error: 'Invalid administrator credentials. Please check username and password.' });
    }

    return res.json({
      success: true,
      message: 'Authentication successful',
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

// Complete Admin Dashboard Comprehensive Metrics
adminRouter.get('/stats', (req, res) => {
  try {
    const applicationsCount = (db.prepare('SELECT COUNT(*) as count FROM admission_applications').get() as any).count;
    const pendingApps = (db.prepare("SELECT COUNT(*) as count FROM admission_applications WHERE status = 'Pending Review'").get() as any).count;
    const studentsCount = (db.prepare("SELECT COUNT(*) as count FROM students WHERE status = 'Enrolled'").get() as any).count;
    const staffCount = (db.prepare("SELECT COUNT(*) as count FROM staff WHERE status = 'Active'").get() as any).count;
    const classesCount = (db.prepare('SELECT COUNT(*) as count FROM academic_classes').get() as any).count;
    const inquiriesCount = (db.prepare("SELECT COUNT(*) as count FROM inquiries WHERE status = 'Unread'").get() as any).count;
    const announcementsCount = (db.prepare('SELECT COUNT(*) as count FROM announcements').get() as any).count;
    const feesTotal = (db.prepare("SELECT COALESCE(SUM(amount_paid), 0) as total FROM fee_payments WHERE status = 'Verified'").get() as any).total;

    return res.json({
      success: true,
      stats: {
        totalApplications: applicationsCount,
        pendingApplications: pendingApps,
        enrolledStudents: studentsCount,
        activeStaff: staffCount,
        academicClasses: classesCount,
        unreadInquiries: inquiriesCount,
        publishedAnnouncements: announcementsCount,
        totalFeesCollected: feesTotal
      }
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});
