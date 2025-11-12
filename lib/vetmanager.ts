// lib/vetmanager.ts
const BASE = process.env.VETMANAGER_BASE_URL || '';
const TOKEN = process.env.VETMANAGER_TOKEN || '';

export async function vmFetch(path: string, init?: RequestInit){
  if(!BASE || !TOKEN) throw new Error('VETMANAGER env not set');
  const url = BASE.replace(/\/$/,'') + path;
  const headers = { 'Authorization': `Bearer ${TOKEN}`, 'Content-Type': 'application/json', ...(init?.headers||{}) };
  const res = await fetch(url, { ...init, headers });
  if(!res.ok) throw new Error(`Vetmanager error ${res.status}`);
  return res.json();
}
export async function vmPing(){ return { ok: true, base: !!BASE, token: !!TOKEN }; }
