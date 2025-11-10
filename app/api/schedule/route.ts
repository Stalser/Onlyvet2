import { NextRequest } from 'next/server';

/**
 * GET /api/schedule?doctorId=ivlev&from=YYYY-MM-DD&days=7
 * Demo: if VETMANAGER_* not set, returns generated 7-day schedule 10:00-20:00 with random free slots.
 * Prod: map to Vetmanager doctor's schedule endpoint here.
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const doctorId = searchParams.get('doctorId') || '';
  const days = Number(searchParams.get('days') || 7);
  const from = searchParams.get('from') ? new Date(searchParams.get('from')!) : new Date();

  const base = process.env.VETMANAGER_BASE_URL;
  const key = process.env.VETMANAGER_API_KEY;

  if (base && key) {
    // TODO: replace with real Vetmanager schedule mapping
    // Example request (pseudo):
    // const res = await fetch(`${base}/doctors/${doctorId}/schedule?from=...&to=...`, { headers: { Authorization: `Bearer ${key}` } });
    // const data = await res.json();
    // return new Response(JSON.stringify({ slots: mapToSlots(data) }), { status: 200 });
  }

  // Demo schedule
  const slots: { date: string; time: string }[] = [];
  for (let i = 0; i < days; i++) {
    const d = new Date(from);
    d.setDate(d.getDate() + i);
    const dayIso = d.toISOString().slice(0,10);
    // generate a few free hours
    for (const h of [10, 12, 14, 16, 18, 20]) {
      // simple rule: odd days -> fewer slots
      if ((d.getDate() + h) % 2 === 0) {
        const hh = String(h).padStart(2,'0');
        slots.push({ date: dayIso, time: `${hh}:00` });
      }
    }
  }
  return new Response(JSON.stringify({ slots }), { status: 200, headers: { 'Content-Type': 'application/json' } });
}
