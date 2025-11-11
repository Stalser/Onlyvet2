import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json().catch(()=>null);
  console.log('NEW REVIEW:', body);
  // TODO: when DB/CRM ready — store to database or Vetmanager note
  return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
}
