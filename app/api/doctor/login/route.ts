// app/api/doctor/login/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request){
  const { email } = await req.json();
  if(!email) return NextResponse.json({ error: 'email required' }, { status: 400 });
  // In real app: send code via email provider (Resend etc)
  const code = '111111'; // dev
  return NextResponse.json({ ok: true, code });
}
