import { Router } from 'express';
import { db } from '../db.js';

export const logsRouter = Router();

// 1. Get Audit & System Activity Logs
logsRouter.get('/', (req, res) => {
  try {
    const limit = Number(req.query.limit) || 100;
    const { module, actor } = req.query;

    let query = `SELECT * FROM audit_logs WHERE 1=1`;
    const params: any[] = [];

    if (module) {
      query += ` AND module = ?`;
      params.push(module);
    }
    if (actor) {
      query += ` AND actor = ?`;
      params.push(actor);
    }

    query += ` ORDER BY id DESC LIMIT ?`;
    params.push(limit);

    const logs = db.prepare(query).all(...params);

    return res.json({
      success: true,
      count: logs.length,
      logs
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// 2. Post Custom Audit Log
logsRouter.post('/', (req, res) => {
  try {
    const { action, actor, module, details } = req.body;

    if (!action || !actor || !module) {
      return res.status(400).json({ error: 'Action, actor, and module are required.' });
    }

    const insert = db.prepare(`
      INSERT INTO audit_logs (action, actor, module, details, ip_address)
      VALUES (?, ?, ?, ?, ?)
    `);

    const ip = req.ip || req.socket.remoteAddress || '127.0.0.1';
    insert.run(action.trim(), actor.trim(), module.trim(), details || '', ip);

    return res.status(201).json({
      success: true,
      message: 'Log record created.'
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});
