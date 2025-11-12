// app/api/admin/session/route.ts
import { NextResponse } from 'next/server';
import { cookieSetHeader, cookieClearHeader } from '@/lib/auth';

export async function POST(){
  const res = NextResponse.json({ ok: true });
  res.headers.set('Set-Cookie', cookieSetHeader('ov_admin','1', 60*60*24*7));
  return res;
}
export async function DELETE(){
  const res = NextResponse.json({ ok: true });
  res.headers.set('Set-Cookie', cookieClearHeader('ov_admin'));
  return res;
}
