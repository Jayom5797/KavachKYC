import { GoogleGenerativeAI } from '@google/generative-ai';
import { KycValidationResult } from '../types/validation.js';
import { extractJson } from '../utils/json.js';

export async function analyzeWithGemini(
  apiKey: string,
  ocrText: string,
  image?: { buffer: Buffer; mimeType: string }
): Promise<KycValidationResult> {
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const prompt = `You are an AI document validator.\n\nGiven the OCR text from a KYC document, extract fields like {Name, DOB, Document Type, Document Number}.\nCheck if the format is valid, detect inconsistencies or tampering, and return a JSON response in this exact format:\n\n{\n  \"name\": \"...\",\n  \"dob\": \"YYYY-MM-DD\",\n  \"document_type\": \"...\",\n  \"document_number\": \"...\",\n  \"confidence_score\": 85,\n  \"validation\": {\n    \"format_check\": \"Valid/Invalid\",\n    \"photo_match\": \"Likely / Suspicious / Not Available\",\n    \"final_status\": \"Valid / Suspicious / Fraud\",\n    \"consistency_check\": true,\n    \"security_features\": true\n  },\n  \"reasoning\": \"short explanation\"\n}\n\nRules:\n- Respond with JSON only. No extra commentary.\n- If a field is missing, use \"\" for strings and choose the most appropriate validation status.\n- If an image is provided, use it to improve extraction of Name, Document Type and number.\n- Set confidence_score based on OCR text clarity and completeness (0-100).\n- Set consistency_check to true if data fields are logically consistent.\n- Set security_features to true if document appears to have security elements.\n\nOCR TEXT:\n----------------\n${ocrText}\n----------------`;

  const parts: any[] = [{ text: prompt }];
  if (image) {
    const base64 = image.buffer.toString('base64');
    parts.push({ inlineData: { mimeType: image.mimeType, data: base64 } });
  }

  const result = await model.generateContent({ contents: [{ role: 'user', parts }] });
  const text = result.response.text();
  const json = extractJson(text) as KycValidationResult;
  return json;
}
