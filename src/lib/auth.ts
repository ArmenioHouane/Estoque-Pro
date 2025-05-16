import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { connectToDatabase } from './mongodb';
import User from '@/models/user';
import { randomBytes } from 'crypto';
import { NextResponse } from 'next/server';


// Token generation
export function generateToken(userId: string) {
  return jwt.sign(
    { userId, iat: Math.floor(Date.now() / 1000) },
    process.env.JWT_SECRET!,
    { expiresIn: '1d' }
  );
}

// Cookie management
export function setAuthCookies(response: NextResponse, token: string, csrfToken: string) {
  response.cookies.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 86400, // 1 day
    path: '/',
  });

  response.cookies.set('csrf_token', csrfToken, {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 86400,
    path: '/',
  });
}
export async function getAuthCookie(request?: NextRequest) {
  if (request) {
    return request.cookies.get('token')?.value;
  }

  const cookieStore = await cookies(); 
  return cookieStore.get('token')?.value;
}

export async function verifyToken(token: string) {
  try {
    await connectToDatabase();
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { 
      userId: string; 
      iat: number;
    };

    const user = await User.findById(decoded.userId);
    if (!user || user.invalidatedTokensAt > new Date(decoded.iat * 1000)) {
      return null;
    }

    return decoded;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export function generateCSRFToken() {
  return randomBytes(32).toString('hex');
}

export async function getCSRFToken(request?: NextRequest) {
  if (request) {
    return request.cookies.get('csrf_token')?.value;
  }

  const cookieStore = await cookies(); 
  return cookieStore.get('csrf_token')?.value;
}

export async function clearAuthCookies() {
  const cookieStore = await cookies();
  cookieStore.delete('token');
  cookieStore.delete('csrf_token');
}

export async function invalidateToken(userId: string) {
  await connectToDatabase();
  await User.findByIdAndUpdate(userId, { invalidatedTokensAt: Date.now() });
}