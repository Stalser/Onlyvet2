// lib/vetmanager.ts
export async function vmRequest(path: string, body?: any, method: 'GET'|'POST'|'PUT' = 'POST') {
  const base = process.env.VETMANAGER_BASE_URL;
  const key = process.env.VETMANAGER_API_KEY;
  if (!base || !key) return { ok: true, demo: true, message: 'VETMANAGER_* not set' };
  const res = await fetch(`${base}${path}`, {
    method,
    headers: { 'Content-Type':'application/json', 'Authorization': `Bearer ${key}` },
    body: method==='GET' ? undefined : JSON.stringify(body||{})
  });
  const data = await res.json().catch(()=> ({}));
  return { ok: res.ok, data };
}
