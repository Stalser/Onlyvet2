import { NextRequest } from 'next/server';
export async function POST(req: NextRequest) {
  const payload = await req.json();
  const base = process.env.VETMANAGER_BASE_URL;
  const key = process.env.VETMANAGER_API_KEY;
  if (!base || !key) return new Response(JSON.stringify({ ok: true, skipped: true, message: 'VETMANAGER_* env not set — demo mode.' }), { status: 200 });
  try {
    const res = await fetch(`${base}/appointments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${key}` },
      body: JSON.stringify({
        client: { name: payload.ownerName, phone: payload.phone, email: payload.email },
        patient: { name: payload.petName, species: payload.petType },
        schedule: { date: payload.date, time: payload.time },
        doctorExternalId: payload.doctorId,
        specialty: payload.specialty,
        notes: payload.notes || ''
      })
    });
    const data = await res.json();
    if (!res.ok) return new Response(JSON.stringify({ ok: false, error: data }), { status: 502 });
    return new Response(JSON.stringify({ ok: true, data }), { status: 200 });
  } catch (e: any) {
    return new Response(JSON.stringify({ ok: false, error: e?.message || 'Vetmanager request failed' }), { status: 500 });
  }
}
