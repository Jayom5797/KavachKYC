import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import validateRouter from './routes/validate.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api', validateRouter);

const PORT = process.env.PORT ? Number(process.env.PORT) : 5001;
app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});
