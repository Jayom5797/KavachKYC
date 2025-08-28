// Best-effort JSON extraction from LLM outputs (handles markdown fences)
export function extractJson(text: string): any {
  const fenceMatch = text.match(/```(?:json)?\n([\s\S]*?)```/i);
  const raw = fenceMatch ? fenceMatch[1] : text;
  try {
    return JSON.parse(raw);
  } catch {
    // Try to find first { ... } block
    const start = raw.indexOf('{');
    const end = raw.lastIndexOf('}');
    if (start !== -1 && end !== -1 && end > start) {
      const candidate = raw.slice(start, end + 1);
      try { return JSON.parse(candidate); } catch {}
    }
    throw new Error('Failed to parse JSON from model output');
  }
}
