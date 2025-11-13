// app/api/admin/doctors/route.ts
import { NextResponse } from 'next/server';
import { listDoctors, addDoctor, removeDoctor } from '@/lib/doctorStore';

function isAdmin(req: Request){
  const cookie = (req.headers.get('cookie')||'').includes('ov_admin=1');
  return cookie;
}

export async function GET(req: Request){
  if(!isAdmin(req)) return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  return NextResponse.json({ items: listDoctors() });
}

export async function POST(req: Request){
  if(!isAdmin(req)) return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  const data = await req.json();
  try{
    addDoctor({ email: data.email, name: data.name||data.email, specialty: data.specialty||'' });
    return NextResponse.json({ ok: true });
  }catch(e: any){
    return NextResponse.json({ error: e.message||'error' }, { status: 400 });
  }
}

export async function DELETE(req: Request){
  if(!isAdmin(req)) return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email') || '';
  removeDoctor(email);
  return NextResponse.json({ ok: true });
}
