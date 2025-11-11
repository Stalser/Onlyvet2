// app/api/consultations/[id]/route.ts
import { NextRequest } from 'next/server';
import { ensureTables, run } from '@/lib/db';
import { getSession } from '@/lib/session';

export async function PUT(req: NextRequest, { params }:{ params:{ id:string }}){
  const { email } = getSession();
  if (!email) return new Response(JSON.stringify({ ok:false, error:'Unauthorized' }), { status: 401 });
  const body = await req.json().catch(()=>({}));
  await ensureTables();
  await run('update consultations set date=$1, doctor_id=$2, doctor_name=$3, service=$4, summary=$5, recommendations=$6 where id=$7 and user_email=$8',
    [body.date, body.doctorId, body.doctorName, body.service, body.summary, body.recommendations, params.id, email]);
  return new Response(JSON.stringify({ ok:true }), { status: 200, headers: { 'Content-Type':'application/json' } });
}

export async function DELETE(req: NextRequest, { params }:{ params:{ id:string }}){
  const { email } = getSession();
  if (!email) return new Response(JSON.stringify({ ok:false, error:'Unauthorized' }), { status: 401 });
  await ensureTables();
  await run('delete from consultations where id=$1 and user_email=$2', [params.id, email]);
  return new Response(JSON.stringify({ ok:true }), { status: 200, headers: { 'Content-Type':'application/json' } });
}
