import express from 'express';

export const app = express();

app.disable('x-powered-by');
app.use(express.json({ limit: '256kb' }));

const healthCheck = (_req: express.Request, res: express.Response) => {
  res.setHeader('Cache-Control', 'no-store');
  res.status(200).json({ status: 'ok' });
};

app.get(['/health', '/api/health', '/api'], healthCheck);

app.use((_req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  res.status(503).json({ error: 'School services are temporarily unavailable.' });
});

export default app;
