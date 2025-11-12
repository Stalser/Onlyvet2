// app/api/doctor/login/route.ts
import { NextResponse } from 'next/server';
import { isDoctorAllowed } from '@/lib/doctorStore';

export async function POST(req: Request){
  const { email } = await req.json();
  if(!email) return NextResponse.json({ error: 'email required' }, { status: 400 });
  if(!isDoctorAllowed(email)) return NextResponse.json({ error: 'email is not allowed for doctor login' }, { status: 403 });
  return NextResponse.json({ ok: true, code: '111111' });
}
