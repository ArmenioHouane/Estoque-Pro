import { NextResponse } from 'next/server';
import {
  generateToken,
  generateCSRFToken,
  setAuthCookies,
} from '@/lib/auth';
import User from '@/models/user';
import { connectToDatabase } from '@/lib/mongodb';


export const runtime = 'nodejs';

export async function POST(request: Request) {
  await connectToDatabase();
  const { email, password } = await request.json();

  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      return NextResponse.json(
        { success: false, message: 'Credenciais inválidas' },
        { status: 401 }
      );
    }

    const token = generateToken(user._id);
    const csrfToken = generateCSRFToken();

    const response = NextResponse.json({
      success: true,
      user: { id: user._id, name: user.name, email: user.email },
      csrfToken,
    });

    setAuthCookies(response, token, csrfToken);

    console.log('Token JWT:', token);
    console.log('CSRF Token:', csrfToken);
    console.log('Set-Cookie Headers:', response.headers.get('Set-Cookie'));

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: 'Login falhou' },
      { status: 500 }
    );
  }
}
