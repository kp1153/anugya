import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function proxy(request) {
  const { pathname } = request.nextUrl;
  
  if (pathname === '/admin/login') {
    return NextResponse.next();
  }

  const token = request.cookies.get('admin-token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    await jwtVerify(token, secret);
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }
}

export const config = {
  matcher: '/admin/:path*'
};