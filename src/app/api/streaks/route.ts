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
  const body = await req.json()
  const { title, count, datatype } = body

  try {
    const newStreak = await prisma.streak.create({
      data: {
        title,
        count: parseFloat(count),
        datatype,
      },
    })
    return NextResponse.json(newStreak)
  } catch (error) {
    return NextResponse.json({ error: 'Error creating streak' }, { status: 500 })
  }
}
