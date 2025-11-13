// lib/auth.ts
export const COOKIE_DOCTOR = 'ov_doc';
export const COOKIE_ADMIN = 'ov_admin';

export function cookieSetHeader(name: string, value: string, maxAgeSeconds: number) {
  return `${name}=${value}; Path=/; Max-Age=${maxAgeSeconds}; SameSite=Lax`;
}

export function cookieClearHeader(name: string) {
  return `${name}=; Path=/; Max-Age=0; SameSite=Lax`;
}
