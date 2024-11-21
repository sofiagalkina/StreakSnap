// app/api/streaks/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'

export async function GET(request: Request) {
  const url = new URL(request.url);
  const userId = url.searchParams.get('userId');
  if (!userId) {
    const id = url.searchParams.get('id');
    // Fetch a specific streak by ID
    const streak = await prisma.streak.findFirst({
      where: { id: parseInt(id) },
    });

    if (!streak) {
        return NextResponse.json({ error: 'Streak not found' }, { status: 404 });
    }
    return NextResponse.json(streak);
  }

  try {
      if (userId) {
          // Fetch a specific streak by ID
          console.log('userId:', parseInt(userId));
          const streak = await prisma.streak.findMany({
              where: { userId: parseInt(userId) },
          });

          if (!streak) {
              return NextResponse.json({ error: 'Streak not found' }, { status: 404 });
          }

          return NextResponse.json(streak);
      } else {
          // Fetch all streaks
          // const streaks = await prisma.streak.findMany();
          // return NextResponse.json(streaks);
      }
  } catch (error) {
      return NextResponse.json({ error: 'Error fetching streak(s)' }, { status: 500 });
  }
}

// Handle POST requests
export async function POST(req: Request) {
  const body = await req.json();
  const { title, userId, streakType, count, datatype, streakCount, average } = body;

  if (!title || !streakType) {
    return NextResponse.json({ error: 'Title and Streak Type are required' }, { status: 400 });
  }

  try {
    const newStreak = await prisma.streak.create({
      data: {
        title,
        userId: parseInt(userId),
        streakType,
        streakCount: parseInt(streakCount, 10) || 0,
        count: parseFloat(count) || 0,
        average: parseFloat(average) || 0,
        datatype: streakType === 'COUNT' ? datatype : 'NONE',
        totalStreak: 0,
        totalCount: 0,
        totalAverage: 0,
        highestStreak: 0,
        highestCount: 0,
        highestAverage: 0,
      },
    });
    console.log('New Streak:', newStreak);
    return NextResponse.json(newStreak);
  } catch (error) {
    console.error('Error creating streak:', error);
    return NextResponse.json({ error: 'Error creating streak' }, { status: 500 });
  }
}

// Handle PUT requests (Edit Streaks)
export async function PUT(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get('id');

  if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  try {
      const { title, streakCount, count, average } = await request.json(); // Parse title and count from request body

      // Update the streak in the database
      const updatedStreak = await prisma.streak.update({
          where: { id: parseInt(id) },
          data: {
              title,
              streakCount,
              count,
              average
          },
      });

      return NextResponse.json(updatedStreak, { status: 200 });
  } catch (error) {
      console.error('Error updating streak:', error);
      return NextResponse.json({ error: 'Error updating streak' }, { status: 500 });
  }
}


// Handle PATCH requests (Update count and record streak)
export async function PATCH(req: Request) {
  const body = await req.json();
  const { id, newCount } = body;

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  try {
    // Fetch the current streak
    const existingStreak = await prisma.streak.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!existingStreak) {
      return NextResponse.json({ error: 'Streak not found' }, { status: 404 });
    }

    // Determine if it's a count or simple streak
    let updatedStreak;
    let updatedHighestStreak = existingStreak.highestStreak;
    let updatedHighestCount = existingStreak.highestCount;
    let updatedHighestAverage = existingStreak.highestAverage;

    if (existingStreak.streakType === 'COUNT') {
      if (newCount === undefined) {
        return NextResponse.json({ error: 'newCount is required for count streaks' }, { status: 400 });
      }
      const updatedStreakCount = existingStreak.streakCount + 1;
      const updatedCount = existingStreak.count + parseFloat(newCount);
      const updatedAverage = updatedCount / updatedStreakCount;

      if (updatedStreakCount > existingStreak.highestStreak) {
        updatedHighestStreak = existingStreak.streakCount + 1;
      }
      if (updatedCount > existingStreak.highestCount) {
        updatedHighestCount = existingStreak.highestCount + 1;
      }
      if (updatedAverage > existingStreak.highestAverage) {
        updatedHighestAverage= existingStreak.highestCount / existingStreak.highestStreak;
      }

      updatedStreak = await prisma.streak.update({
        where: { id: parseInt(id, 10) },
        data: {
          count: existingStreak.count + parseFloat(newCount), 
          streakCount: existingStreak.streakCount + 1,        
          average: (existingStreak.count + parseFloat(newCount)) / (existingStreak.streakCount + 1), 
          lastUpdated: new Date(),            
          totalStreak: existingStreak.totalStreak + 1,
          totalCount: existingStreak.totalCount + parseFloat(newCount),
          totalAverage: (existingStreak.totalCount + parseFloat(newCount)) / (existingStreak.totalStreak + 1),                
          highestStreak: updatedHighestStreak,
          highestCount: updatedHighestCount,
          highestAverage: updatedHighestAverage,
        },
      });

    } else if (existingStreak.streakType === 'SIMPLE') {
      const updatedStreakCount = existingStreak.streakCount + 1;
      if (updatedStreakCount > existingStreak.highestStreak) {
        updatedHighestStreak = existingStreak.streakCount + 1;
        console.log("updatedHighestStreak:", updatedHighestStreak);
      }

      updatedStreak = await prisma.streak.update({
        where: { id: parseInt(id, 10) },
        data: {
          streakCount: existingStreak.streakCount + 1, 
          lastUpdated: new Date(),                    
          totalStreak: existingStreak.totalStreak + 1,
          highestStreak: updatedHighestStreak,
        },
      });
    }

    return NextResponse.json(updatedStreak);
  } catch (error) {
    console.error('Error updating streak:', error);
    return NextResponse.json({ error: 'Error updating streak' }, { status: 500 });
  }
}

// Handle DELETE requests (Delete a streak)
export async function DELETE(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  try {
    // Attempt to delete the streak by ID
    const deletedStreak = await prisma.streak.delete({
      where: { id: parseInt(id, 10) },
    });

    return NextResponse.json(deletedStreak, { status: 200 });
  } catch (error) {
    console.error('Error deleting streak:', error);
    return NextResponse.json({ error: 'Error deleting streak' }, { status: 500 });
  }
}
