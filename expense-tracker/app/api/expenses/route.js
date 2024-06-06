import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';

import { desc, eq } from 'drizzle-orm';
import { db } from '@/utils/drizzledb';
import { Budgets, Expenses } from '@/utils/schema';

export async function GET(req) {
  try {
    const user = await currentUser();

    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { emailAddress } = user.emailAddresses.find(
      (email) => email.id === user.primaryEmailAddressId
    );

    const expenseList = await db
      .select({
        id: Expenses.id,
        name: Expenses.name,
        amount: Expenses.amount,
        createdAt: Expenses.createdAt
      })
      .from(Budgets)
      .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, emailAddress))
      .orderBy(desc(Expenses.createdAt));

    return NextResponse.json(expenseList);
  } catch (error) {
    console.log('[EXPENSES_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
