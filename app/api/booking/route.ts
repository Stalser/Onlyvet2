import { NextRequest } from 'next/server';
import { pushToVetmanager } from '@/lib/vetmanager';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const required = ['ownerName','email','phone','petName','petType','specialty','doctorId','date','time'];
  const missing = required.filter(k => !body?.[k]);
  if (missing.length) return new Response(JSON.stringify({ ok:false, error: 'Missing fields: ' + missing.join(', ') }), { status: 400 });
  console.log('BOOKING:', body);
  const vetres = await pushToVetmanager(body);
  return new Response(JSON.stringify({ ok: true, vetmanager: vetres }), { status: 200, headers: { 'Content-Type': 'application/json' } });
}
