// lib/vetmanager.ts (patch)
const BASE = process.env.VETMANAGER_BASE_URL || '';
const TOKEN = process.env.VETMANAGER_TOKEN || '';

function ensureConfig() {
  if (!BASE || !TOKEN) {
    throw new Error('VETMANAGER_BASE_URL или VETMANAGER_TOKEN не заданы');
  }
}

export async function vmFetch(path: string, init?: RequestInit) {
  ensureConfig();
  const url = BASE.replace(/\/$/, '') + path;
  const headers = {
    'Authorization': `Bearer ${TOKEN}`,
    'Content-Type': 'application/json',
    ...(init?.headers || {})
  };
  const res = await fetch(url, { ...init, headers });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Vetmanager ${res.status}: ${text || res.statusText}`);
  }
  return res.json();
}

export async function vmPing() {
  return { ok: !!BASE && !!TOKEN, base: !!BASE, token: !!TOKEN };
}

export type VmDoctor = { id: string; name: string; email?: string; specialty?: string };

export async function vmListDoctors(): Promise<VmDoctor[]> {
  const data = await vmFetch('/staff'); 
  const raw = (data.items || data.staff || []) as any[];
  return raw.map((d) => ({
    id: String(d.id),
    name: d.name || d.fullName || d.title || 'Врач',
    email: d.email || d.emailAddress || '',
    specialty: d.specialty || d.position || ''
  }));
}
