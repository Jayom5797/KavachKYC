import fetch, { FormData, File as FetchFile } from 'node-fetch';

export interface OcrResult {
  text: string;
}

export async function ocrSpaceFromBuffer(buffer: Buffer, filename: string, apiKey: string, mimetype = 'image/png'): Promise<OcrResult> {
  const form = new FormData();
  // node-fetch's FetchFile expects BlobPart[]; wrap Buffer in an array
  const file = new FetchFile([buffer] as unknown as BlobPart[], filename, { type: mimetype });
  form.append('file', file);
  form.append('language', 'eng');
  form.append('isTable', 'false');
  form.append('OCREngine', '2');
  form.append('scale', 'true');
  form.append('detectOrientation', 'true');
  form.append('isOverlayRequired', 'false');
  form.append('isCreateSearchablePdf', 'false');
  form.append('isSearchablePdfHideTextLayer', 'true');

  const res = await fetch('https://api.ocr.space/parse/image', {
    method: 'POST',
    headers: {
      apikey: apiKey,
    } as any,
    body: form as any,
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`OCR.Space error ${res.status}: ${txt}`);
  }

  const json: any = await res.json();
  // OCR.Space structure: { ParsedResults: [{ ParsedText: '...' }], OCRExitCode, IsErroredOnProcessing }
  const parsedText = json?.ParsedResults?.[0]?.ParsedText || '';
  return { text: parsedText };
}
