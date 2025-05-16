import { NextResponse } from 'next/server';
import { clearAuthCookies, invalidateToken } from '@/lib/auth';
import { getAuthCookie } from '@/lib/auth';
import { verifyToken } from '@/lib/auth';

export const runtime = 'nodejs';


export async function POST() {
  const token = await getAuthCookie();
  
  if (token) {
    const decoded = await verifyToken(token);
    if (decoded) {
      await invalidateToken(decoded.userId);
    }
  }

  clearAuthCookies();
  return NextResponse.json({ success: true, message: 'Logged out' });
}