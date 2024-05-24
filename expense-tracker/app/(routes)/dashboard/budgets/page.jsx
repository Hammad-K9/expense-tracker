import React from 'react';

import BudgetList from '@/components/BudgetList';

const Budgets = () => (
  <div className="p-10">
    <h2 className="font-bold text-3xl">My Budgets</h2>
    <BudgetList />
  </div>
);

export default Budgets;
