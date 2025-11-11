import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json().catch(()=>null);
  console.log('NEW REVIEW:', { name: body?.name, rating: body?.rating, photo: body?.photo ? 'attached' : 'none' });
  return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
}
