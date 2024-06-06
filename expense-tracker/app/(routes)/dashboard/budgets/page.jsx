import React from 'react';
import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';

import BudgetList from '@/components/BudgetList';

const Budgets = () => {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  return (
    <div className="w-full p-1 md:p-10 pb-20">
      <h2 className="font-bold text-3xl">My Budgets</h2>
      <div className="">
        <BudgetList />
      </div>
    </div>
  );
};

export default Budgets;
