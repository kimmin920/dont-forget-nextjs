import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { userId, deviceToken } = await req.json();

    if (!userId || !deviceToken) {
      return NextResponse.json(
        { error: 'Missing userId or deviceToken' },
        { status: 400 }
      );
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: { deviceToken },
    });

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error('Error updating device token:', error);
    return NextResponse.json(
      { error: 'Failed to update device token' },
      { status: 500 }
    );
  }
}
