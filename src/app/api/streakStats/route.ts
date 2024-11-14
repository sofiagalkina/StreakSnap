import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma'

export async function GET(request: Request) {
    const url = new URL(request.url);
    const streakId = url.searchParams.get('streakId');

    if (!streakId) {
        return NextResponse.json({ error: 'streakId is required' }, { status: 400 });
    }

    try {
        // Fetch all streak entries for the given streakId
        const streakEntries = await prisma.streak.findMany({
            where: { id: parseInt(streakId, 10) },
            orderBy: { createdAt: 'desc' },
        });

        const statistics = processStreakStatistics(streakEntries);

        // Return only the processed statistics
        return NextResponse.json(statistics);
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching streak history' }, { status: 500 });
    }
}
  
  
  // Helper function to calculate statistics
  function processStreakStatistics(entries: Array<any>) {
    // Calculate total and highest values for streakCount, count, and average
    let totalStreakCount = 0;
    let totalCount = 0;
    let totalAverage = 0;
  
    let highestStreakCount = 0;
    let highestCount = 0;
    let highestAverage = 0;
  
    entries.forEach(entry => {
        totalStreakCount += entry.streakCount;
        totalCount += entry.count;
        totalAverage += entry.average;
  
        if (entry.streakCount > highestStreakCount) {
            highestStreakCount = entry.streakCount;
        }
        if (entry.count > highestCount) {
            highestCount = entry.count;
        }
        if (entry.average > highestAverage) {
            highestAverage = entry.average;
        }
    });
  
    return {
        totalStreakCount,
        totalCount,
        totalAverage,
        highestStreakCount,
        highestCount,
        highestAverage,
    };
  }
  