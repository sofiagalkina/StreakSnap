import { NextResponse } from 'next/server';
import { prisma } from '@/../lib/prisma' // Adjust the path if necessary
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  const { name, email, password } = await request.json();

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    return NextResponse.json({ id: user.id, name: user.name, email: user.email });
  } catch (error) {
    return NextResponse.json({ error: 'Email already exists' }, { status: 400 });
  }
}
