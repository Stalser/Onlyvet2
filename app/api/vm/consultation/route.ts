// app/api/vm/consultation/route.ts
import { NextRequest } from 'next/server';
import { vmRequest } from '@/lib/vetmanager';

export async function POST(req: NextRequest) {
  const body = await req.json().catch(()=> ({}));
  const res = await vmRequest('/consultations', body, 'POST');
  return new Response(JSON.stringify(res), { status: 200, headers: { 'Content-Type':'application/json' } });
}
