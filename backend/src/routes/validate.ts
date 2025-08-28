import express, { Request, Response } from 'express';
import multer from 'multer';
import { ocrSpaceFromBuffer } from '../services/ocrSpace.js';
import { analyzeWithGemini } from '../services/gemini.js';

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post('/validate', upload.single('file'), async (req: Request, res: Response) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: 'No file uploaded' });

    const ocrKey = process.env.OCR_SPACE_API_KEY;
    const geminiKey = process.env.GOOGLE_GEMINI_API_KEY;
    if (!ocrKey || !geminiKey) {
      return res.status(500).json({ error: 'Server missing API keys' });
    }

    // Step 1: OCR
    const { text } = await ocrSpaceFromBuffer(
      file.buffer,
      file.originalname || 'image.png',
      ocrKey,
      file.mimetype || 'image/png'
    );

    // Step 2: Gemini analysis
    const analysis = await analyzeWithGemini(
      geminiKey,
      text,
      { buffer: file.buffer, mimeType: file.mimetype || 'image/png' }
    );

    return res.json({ ok: true, data: analysis });
  } catch (err: any) {
    console.error('Validation error', err);
    return res.status(500).json({ ok: false, error: err?.message || 'Internal error' });
  }
});

export default router;
