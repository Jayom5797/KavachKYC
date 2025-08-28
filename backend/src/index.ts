import 'dotenv/config';
import express from 'express';
import cors, { CorsOptions } from 'cors';
import validateRouter from './routes/validate.js';

const app = express();

// Configure CORS to allow requests from the Vercel frontend and localhost
const allowedOrigins = [
  'https://kavach-kyc.vercel.app',
  'http://localhost:5173', // Vite default
  'http://localhost:3000'
];

const corsOptions: CorsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    // Allow requests with no origin (like mobile apps or curl requests) or from whitelisted domains
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(cors(corsOptions));
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
