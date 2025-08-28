export interface ApiResponse<T> { ok: boolean; data?: T; error?: string }

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001'

export async function validateDocument(file: File) {
  const form = new FormData()
  form.append('file', file)
  const res = await fetch(`${API_BASE}/api/validate`, { method: 'POST', body: form })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text)
  }
  return (await res.json()) as ApiResponse<any>
}
