// app/api/auth/verify-code/route.ts
import { NextRequest } from 'next/server';
import { ensureTables, run } from '@/lib/db';
import { setSession } from '@/lib/session';

export async function POST(req: NextRequest) {
  const body = await req.json().catch(()=>({}));
  const email = String(body.email||'').trim().toLowerCase();
  const code  = String(body.code||'').trim();
  if (!email || !code) return new Response(JSON.stringify({ ok:false, error:'Email and code required' }), { status: 400 });
  await ensureTables();
  const { rows } = await run('select * from auth_codes where email=$1 and code=$2 order by id desc limit 1', [email, code]);
  if (!rows.length) return new Response(JSON.stringify({ ok:false, error:'Invalid code' }), { status: 400 });
  const exp = new Date(rows[0].expires_at).getTime();
  if (Date.now() > exp) return new Response(JSON.stringify({ ok:false, error:'Code expired' }), { status: 400 });

  setSession(email);
  return new Response(JSON.stringify({ ok:true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
}
