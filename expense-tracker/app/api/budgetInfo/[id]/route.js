import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';

import { eq, getTableColumns, sql } from 'drizzle-orm';
import { db } from '@/utils/drizzledb';
import { Budgets, Expenses } from '@/utils/schema';

export async function GET(req, { params }) {
  try {
    const user = await currentUser();

    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { emailAddress } = user.emailAddresses.find(
      (email) => email.id === user.primaryEmailAddressId
    );

    const budgetInfo = await db
      .select({
        ...getTableColumns(Budgets),
        spent: sql`sum(${Expenses.amount})`.mapWith(Number),
        totalItems: sql`count(${Expenses.id})`.mapWith(Number)
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, emailAddress))
      .where(eq(Budgets.id, params.id))
      .groupBy(Budgets.id);

    return NextResponse.json(budgetInfo);
  } catch (error) {
    console.log('[BUDGETS_GET_INFO]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
