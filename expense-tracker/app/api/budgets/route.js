import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

import { db } from '@/utils/drizzledb';
import { Budgets } from '@/utils/schema';

export async function POST(req) {
  try {
    const { userId } = auth();
    const { icon, name, amount, createdBy } = await req.json();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!name || !amount) {
      return new NextResponse('Name and amount required', { status: 400 });
    }

    const budget = await db
      .insert(Budgets)
      .values({
        name,
        amount,
        icon,
        createdBy
      })
      .returning();

    return NextResponse.json(budget);
  } catch (error) {
    console.log('[BUDGETS_POST]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
