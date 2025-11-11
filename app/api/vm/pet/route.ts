// app/api/vm/pet/route.ts
import { NextRequest } from 'next/server';
import { vmRequest } from '@/lib/vetmanager';

export async function POST(req: NextRequest) {
  const body = await req.json().catch(()=> ({}));
  const res = await vmRequest('/pets', body, 'POST');
  return new Response(JSON.stringify(res), { status: 200, headers: { 'Content-Type':'application/json' } });
}
