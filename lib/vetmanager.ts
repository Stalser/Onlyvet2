// lib/vetmanager.ts
export async function pushToVetmanager(payload: any) {
  const base = process.env.VETMANAGER_BASE_URL;
  const key = process.env.VETMANAGER_API_KEY;
  if (!base || !key) return { ok: true, skipped: true, message: 'VETMANAGER_* not set — demo mode' };
  try {
    const res = await fetch(`${base}/appointments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${key}` },
      body: JSON.stringify({
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
        } : undefined
      })
    });
    const data = await res.json();
    if (!res.ok) return { ok:false, error: data };
    return { ok:true, data };
  } catch (e: any) {
    return { ok:false, error: e?.message || 'Vetmanager push failed' };
  }
}
