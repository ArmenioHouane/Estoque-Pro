import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import User from '@/models/user';

export const runtime = 'nodejs';


export async function POST(request: Request) {
  await connectToDatabase();
  const { name, email, password } = await request.json();

  // Manual validation
  const errors: string[] = [];
 if (!name?.trim()) errors.push('Nome é obrigatório');
if (!email?.trim()) errors.push('Email é obrigatório');
if (!password?.trim()) errors.push('Senha é obrigatória');
if (name && name.length > 50) errors.push('Nome muito longo (máximo 50 caracteres)');
if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Email inválido');
if (password && password.length < 8) errors.push('A senha deve ter no mínimo 8 caracteres');

  if (errors.length > 0) {
    return NextResponse.json(
      { success: false, errors },
      { status: 400 }
    );
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'Usuário já existe' },
        { status: 409 }
      );
    }

    const user = await User.create({ name, email, password });
    return NextResponse.json(
      { success: true, user: { id: user._id, name: user.name, email: user.email } },
      { status: 201 }
    );
  } catch (error) {
     console.error('Erro ao fazer login:', error);
    return NextResponse.json(
      { success: false, message: 'Erro de servidor' },
      { status: 500 }
    );
  }
}