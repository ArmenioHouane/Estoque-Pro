import { NextResponse } from 'next/server';
import { getAuthCookie, verifyToken } from '@/lib/auth';
import User from '@/models/user';
import { connectToDatabase } from '@/lib/mongodb';

export const runtime = 'nodejs';

export async function GET() {
  await connectToDatabase();
  const token = await getAuthCookie();

  if (!token) {
    return NextResponse.json({ authenticated: false });
  }

  const decoded = await verifyToken(token);
  if (!decoded) {
    return NextResponse.json({ authenticated: false });
  }

  const user = await User.findById(decoded.userId).select('-password');
  return user 
    ? NextResponse.json({ authenticated: true, user })
    : NextResponse.json({ authenticated: false });
}