import { NextResponse } from 'next/server';
import { prisma } from '@/../lib/prisma'; // Adjust the path if necessary
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  const user = await prisma.user.findUnique({ where: { email } });
  if (user && await bcrypt.compare(password, user.password)) {
    // Successful login, return user data (omit password)
    return NextResponse.json({ id: user.id, name: user.name, email: user.email });
  } else {
    return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
  }
}
