import { NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';

import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import { db } from '@/utils/drizzledb';
import { Budgets, Expenses } from '@/utils/schema';

export async function POST(req) {
  try {
    const { userId } = auth();
    const { icon, name, allocatedAmount, createdBy, createdAt } =
      await req.json();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!name || !allocatedAmount) {
      return new NextResponse('Name and amount required', {
        status: 400
      });
    }

    const budget = await db
      .insert(Budgets)
      .values({
        name,
        allocatedAmount,
        icon,
        createdBy,
        createdAt
      })
      .returning();

    return NextResponse.json(budget);
  } catch (error) {
    console.log('[BUDGETS_POST]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function GET(req) {
  try {
    const user = await currentUser();

    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { emailAddress } = user.emailAddresses.find(
      (email) => email.id === user.primaryEmailAddressId
    );

    const budgetList = await db
      .select({
        ...getTableColumns(Budgets),
        spent: sql`sum(${Expenses.amount})`.mapWith(Number),
        totalItems: sql`count(${Expenses.id})`.mapWith(Number)
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, emailAddress))
      .groupBy(Budgets.id)
      .orderBy(desc(Budgets.createdAt));

    return NextResponse.json(budgetList);
  } catch (error) {
    console.log('[BUDGETS_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const budgetId = params.id[0];

    // Delete all expenses in a budget before deleting budget
    await db
      .delete(Expenses)
      .where(eq(Expenses.budgetId, budgetId))
      .returning();

    const deletedBudget = await db
      .delete(Budgets)
      .where(eq(Budgets.id, budgetId))
      .returning();

    return NextResponse.json(deletedBudget);
  } catch (error) {
    console.log('[BUDGETS_DELETE]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
