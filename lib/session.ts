// lib/session.ts
import { cookies } from 'next/headers';
const COOKIE = 'onlyvet_session';

export function setSession(email: string) {
  const c = cookies();
  const value = Buffer.from(JSON.stringify({ email, t: Date.now() })).toString('base64');
  c.set(COOKIE, value, { httpOnly: true, sameSite: 'lax', path: '/', maxAge: 60*60*24*30 });
}

export function clearSession() {
  const c = cookies();
  c.set(COOKIE, '', { httpOnly: true, sameSite: 'lax', path: '/', maxAge: 0 });
}

export function getSession(): { email?: string } {
  try {
    const c = cookies();
    const raw = c.get(COOKIE)?.value;
    if (!raw) return {};
    const parsed = JSON.parse(Buffer.from(raw, 'base64').toString('utf8'));
    return { email: parsed.email };
  } catch {
    return {};
  }
}
