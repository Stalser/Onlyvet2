// app/api/auth/request-code/route.ts
import { NextRequest } from 'next/server';
import { ensureTables, run } from '@/lib/db';

export async function POST(req: NextRequest) {
  const body = await req.json().catch(()=>({}));
  const email = String(body.email||'').trim().toLowerCase();
  const name = (body.name||'').toString().trim();
  if (!email) return new Response(JSON.stringify({ ok:false, error:'Email required' }), { status: 400 });

  await ensureTables();
  await run('insert into users(email,name) values($1,$2) on conflict (email) do update set name = coalesce($2, users.name)', [email, name || null]);

  // generate 6-digit code valid for 10 min
  const code = (Math.floor(Math.random()*900000)+100000).toString();
  const expires = new Date(Date.now() + 10*60*1000).toISOString();
  await run('insert into auth_codes(email, code, expires_at) values ($1,$2,$3)', [email, code, expires]);

  // In real life, send via email provider. For now, return in response (dev) and log.
  console.log('LOGIN CODE for', email, code);

  return new Response(JSON.stringify({ ok:true, code, hint:'In production, send this code via email.' }), { status: 200, headers: { 'Content-Type': 'application/json' } });
}
