import { NextRequest } from 'next/server';
export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log('FEEDBACK:', body);
  return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
}
