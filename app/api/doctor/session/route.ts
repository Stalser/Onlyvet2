// app/api/doctor/session/route.ts
import { NextResponse } from 'next/server';

export async function POST(){
  const res = NextResponse.json({ ok: true });
  res.headers.set('Set-Cookie', 'ov_doc=1; Path=/; Max-Age=604800; SameSite=Lax');
  return res;
}

export async function DELETE(){
  const res = NextResponse.json({ ok: true });
  res.headers.set('Set-Cookie', 'ov_doc=; Path=/; Max-Age=0; SameSite=Lax');
  return res;
}
