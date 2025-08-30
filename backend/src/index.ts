import 'dotenv/config';
import express from 'express';
import cors, { CorsOptions } from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
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

// Serve static files from the 'public' directory (for the frontend)
app.use(express.static('public'));

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api', validateRouter);

// Handle SPA routing by serving index.html for all non-API routes
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

const PORT = process.env.PORT ? Number(process.env.PORT) : 5001;
app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});
