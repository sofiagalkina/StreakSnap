// app/api/streaks/route.ts

import { NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'


// Handle GET requests
export async function GET() {
  try {
    const streaks = await prisma.streak.findMany()
    return NextResponse.json(streaks)
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching streaks' }, { status: 500 })
  }
}

// Handle POST requests
export async function POST(req: Request) {
  const body = await req.json();
  const { title, streakType, count, datatype, streakCount, average } = body;

  if (!title || !streakType) {
    return NextResponse.json({ error: 'Title and Streak Type are required' }, { status: 400 });
  }

  try {
    const newStreak = await prisma.streak.create({
      data: {
        title,
        streakType,
        streakCount: parseInt(streakCount, 10) || 0,
        count: parseFloat(count) || 0,
        average: parseFloat(average) || 0,
        datatype: streakType === 'COUNT' ? datatype : 'NONE',  // Ensure datatype is handled correctly for simple streaks
      },
    });
    return NextResponse.json(newStreak);
  } catch (error) {
    console.error('Error creating streak:', error);
    return NextResponse.json({ error: 'Error creating streak' }, { status: 500 });
  }
}
