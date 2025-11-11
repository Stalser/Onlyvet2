// app/api/pets/[id]/route.ts
import { NextRequest } from 'next/server';
import { ensureTables, run } from '@/lib/db';
import { getSession } from '@/lib/session';

export async function PUT(req: NextRequest, { params }:{ params:{ id:string }}){
  const { email } = getSession();
  if (!email) return new Response(JSON.stringify({ ok:false, error:'Unauthorized' }), { status: 401 });
  const body = await req.json().catch(()=>({}));
  await ensureTables();
  await run('update pets set name=$1, species=$2, sex=$3, birth=$4, notes=$5 where id=$6 and user_email=$7',
    [body.name, body.species, body.sex, body.birth, body.notes, params.id, email]);
  return new Response(JSON.stringify({ ok:true }), { status: 200, headers: { 'Content-Type':'application/json' } });
}

export async function DELETE(req: NextRequest, { params }:{ params:{ id:string }}){
  const { email } = getSession();
  if (!email) return new Response(JSON.stringify({ ok:false, error:'Unauthorized' }), { status: 401 });
  await ensureTables();
  await run('delete from pets where id=$1 and user_email=$2', [params.id, email]);
  return new Response(JSON.stringify({ ok:true }), { status: 200, headers: { 'Content-Type':'application/json' } });
}
