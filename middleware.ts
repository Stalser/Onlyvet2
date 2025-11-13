// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  if (url.pathname.startsWith('/doctor')) {
    const has = req.cookies.get('ov_doc');
    if (!has) {
      url.pathname = '/auth/doctor';
      return NextResponse.redirect(url);
    }
  }
  if (url.pathname.startsWith('/admin')) {
    const has = req.cookies.get('ov_admin');
    if (!has) {
      url.pathname = '/auth/admin';
      return NextResponse.redirect(url);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/doctor/:path*', '/admin/:path*'],
};
