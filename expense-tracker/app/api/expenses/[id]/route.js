import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

import { desc, eq } from 'drizzle-orm';
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

export async function GET(req, { params }) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const expensesList = await db
      .select()
      .from(Expenses)
      .where(eq(Expenses.budgetId, params.id))
      .orderBy(desc(Expenses.createdAt));

    return NextResponse.json(expensesList);
  } catch (error) {
    console.log('[EXPENSES_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const deletedExpense = await db
      .delete(Expenses)
      .where(eq(Expenses.id, params.id))
      .returning();

    return NextResponse.json(deletedExpense);
  } catch (error) {
    console.log('[EXPENSES_DELETE]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
