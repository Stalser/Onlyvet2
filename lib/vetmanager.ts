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
  let data: any = null;
  try { data = await res.json(); } catch {}
  return { ok: res.ok, data };
}

/** Backward-compatible helper used by /api/booking */
export async function pushToVetmanager(payload: any) {
  const base = process.env.VETMANAGER_BASE_URL;
  const key = process.env.VETMANAGER_API_KEY;
  if (!base || !key) return { ok: true, demo: true, message: 'VETMANAGER_* not set — demo mode' };
  // Map payload to Vetmanager appointment format (adjust as needed)
  const body = {
    client:  { name: payload.ownerName, phone: payload.phone, email: payload.email },
    patient: { name: payload.petName, species: payload.petType },
    schedule:{ date: payload.date, time: payload.time },
    doctorExternalId: payload.doctorId,
    specialty: payload.specialty,
    notes: payload.notes || '',
    service: payload.service ? {
      code: payload.service.slug,
      name: payload.service.name,
      price: payload.service.price,
      duration: payload.service.duration
    } : (payload.serviceSlug ? {
      code: payload.serviceSlug,
      name: payload.serviceName,
      price: payload.servicePrice,
      duration: payload.serviceDuration
    } : undefined)
  };
  return await vmRequest('/appointments', body, 'POST');
}
