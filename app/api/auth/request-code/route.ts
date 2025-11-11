// app/api/auth/request-code/route.ts
import { NextRequest } from 'next/server';
import { ensureTables, run } from '@/lib/db';

export async function POST(req: NextRequest) {
  const body = await req.json().catch(()=>({}));
  const email = String(body.email||'').trim().toLowerCase();
  const fio = String(body.fio || body.name || '').trim(); // поддержим и name для обратной совместимости
  const phone = String(body.phone || '').trim();
  if (!email) return new Response(JSON.stringify({ ok:false, error:'Email required' }), { status: 400 });

  await ensureTables();
  // upsert user with full_name and phone
  await run(`
    insert into users(email, full_name, phone)
    values($1,$2,$3)
    on conflict (email) do update set
      full_name = coalesce($2, users.full_name),
      phone = coalesce($3, users.phone)
  `, [email, fio || null, phone || null]);

  // generate 6-digit code valid for 10 min
  const code = (Math.floor(Math.random()*900000)+100000).toString();
  const expires = new Date(Date.now() + 10*60*1000).toISOString();
  await run('insert into auth_codes(email, code, expires_at) values ($1,$2,$3)', [email, code, expires]);

  // DEV ONLY: return code in response (prod — отправлять email)
  return new Response(JSON.stringify({ ok:true, code }), { status: 200, headers: { 'Content-Type': 'application/json' } });
}
