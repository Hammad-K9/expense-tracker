import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

import { db } from '@/utils/drizzledb';
import { Budgets, Expenses } from '@/utils/schema';

export async function POST(req) {
  try {
    const { userId } = auth();
    const { name, amount, budgetId, createdBy, createdAt } = await req.json();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!name || !amount) {
      return new NextResponse('Name and amount required', {
        status: 400
      });
    }

    const expense = await db
      .insert(Expenses)
      .values({
        name,
        amount,
        budgetId,
        createdBy,
        createdAt
      })
      .returning({ insertedId: Budgets.id });

    return NextResponse.json(expense);
  } catch (error) {
    console.log('[EXPENSES_POST]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
