// app/api/pets/route.ts
import { NextRequest } from 'next/server';
import { ensureTables, run } from '@/lib/db';
import { getSession } from '@/lib/session';

export async function GET() {
  const { email } = getSession();
  if (!email) return new Response(JSON.stringify({ ok:false, error:'Unauthorized' }), { status: 401 });
  await ensureTables();
  const { rows, demo } = await run('select * from pets where user_email=$1 order by id desc', [email]);
  return new Response(JSON.stringify({ ok:true, items: rows, demo }), { status: 200, headers: { 'Content-Type':'application/json' } });
}

export async function POST(req: NextRequest) {
  const { email } = getSession();
  if (!email) return new Response(JSON.stringify({ ok:false, error:'Unauthorized' }), { status: 401 });
  const body = await req.json().catch(()=>({}));
  if(!body.name) return new Response(JSON.stringify({ ok:false, error:'Name required' }), { status: 400 });
  await ensureTables();
  await run('insert into pets(user_email, name, species, sex, birth, notes) values ($1,$2,$3,$4,$5,$6)',
    [email, body.name, body.species||null, body.sex||null, body.birth||null, body.notes||null]);
  return new Response(JSON.stringify({ ok:true }), { status: 200, headers: { 'Content-Type':'application/json' } });
}
