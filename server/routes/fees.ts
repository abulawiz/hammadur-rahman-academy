import { Router } from 'express';
import { db } from '../db.js';

export const feesRouter = Router();

// 1. Get Fee Schedules
feesRouter.get('/schedules', (req, res) => {
  try {
    const schedules = db.prepare('SELECT * FROM fee_schedules ORDER BY id ASC').all();
    return res.json({ success: true, count: schedules.length, schedules });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// 2. Get Payments / Receipts List
feesRouter.get('/payments', (req, res) => {
  try {
    const { status, search } = req.query;

    let query = `SELECT * FROM fee_payments WHERE 1=1`;
    const params: any[] = [];

    if (status && status !== 'All') {
      query += ` AND status = ?`;
      params.push(status);
    }

    if (search) {
      query += ` AND (student_name LIKE ? OR admission_no LIKE ? OR receipt_no LIKE ?)`;
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    query += ` ORDER BY id DESC`;

    const payments = db.prepare(query).all(...params);

    const totalCollected = (db.prepare(`
      SELECT SUM(amount_paid) as total FROM fee_payments WHERE status = 'Verified'
    `).get() as any).total || 0;

    return res.json({ success: true, totalCollected, count: payments.length, payments });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// 3. Record new fee payment
feesRouter.post('/record-payment', (req, res) => {
  try {
    const {
      admissionNo,
      studentName,
      classLevel,
      term,
      session,
      amountPaid,
      paymentMethod,
      transactionRef
    } = req.body;

    if (!admissionNo || !studentName || !amountPaid) {
      return res.status(400).json({ error: 'Admission number, student name, and amount paid are required.' });
    }

    const year = new Date().getFullYear();
    const count = (db.prepare('SELECT COUNT(*) as c FROM fee_payments').get() as any).c;
    const receiptNo = `HRA-REC-${year}-${String(count + 1).padStart(4, '0')}`;

    const insert = db.prepare(`
      INSERT INTO fee_payments (
        receipt_no, admission_no, student_name, class_level, term, session,
        amount_paid, payment_method, transaction_ref, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'Verified')
    `);

    insert.run(
      receiptNo,
      admissionNo.trim().toUpperCase(),
      studentName.trim(),
      classLevel || 'Senior Secondary',
      term || 'First Term',
      session || '2026/2027',
      Number(amountPaid),
      paymentMethod || 'Bank Transfer',
      transactionRef || `TXN-${Math.floor(100000 + Math.random() * 900000)}`
    );

    return res.status(201).json({
      success: true,
      message: 'Payment recorded and official receipt generated.',
      receiptNo,
      amountPaid: Number(amountPaid)
    });

  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});
