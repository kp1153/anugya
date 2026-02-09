import { NextResponse } from 'next/server';
import { SignJWT } from 'jose';

const ADMIN_USERS = [
  { username: 'namwale1153@gmail.com', password: 'Maqbool2@' }
];

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    const admin = ADMIN_USERS.find(
      user => user.username === username && user.password === password
    );

    if (admin) {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      
      const token = await new SignJWT({ username, role: 'admin' })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('24h')
        .sign(secret);

      const response = NextResponse.json({ success: true });
      
      response.cookies.set('admin-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 86400,
        path: '/'
      });

      return response;
    }

    return NextResponse.json({ success: false }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}