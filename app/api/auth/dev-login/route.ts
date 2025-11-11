// app/api/auth/dev-login/route.ts
import { NextRequest } from 'next/server';
import { setSession } from '@/lib/session';

export async function POST(req: NextRequest) {
  if (process.env.ONLYVET_DEV !== '1') {
    return new Response(JSON.stringify({ ok:false, error:'Dev login disabled' }), { status: 403 });
  }
  const body = await req.json().catch(()=>({}));
  const email = String(body.email||'').trim().toLowerCase();
  if (!email) return new Response(JSON.stringify({ ok:false, error:'Email required' }), { status: 400 });
  setSession(email);
  return new Response(JSON.stringify({ ok:true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
}
