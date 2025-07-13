import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { listJournals } from '@/app/actions/journal';

export async function GET() {
  try {
    // Fetch journals from the database
    const journals = await listJournals();
    return NextResponse.json(journals);
  } catch (error) {
    console.error('Error fetching journals:', error);
    return NextResponse.json(
      { error: 'Failed to fetch journals' },
      { status: 500 }
    );
  }
}
