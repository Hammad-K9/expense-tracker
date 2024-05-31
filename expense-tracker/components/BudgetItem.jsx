import React from 'react';
import Link from 'next/link';

export const BudgetItem = ({ budget }) => {
  const progressBarPercentage = () =>
    ((budget.spent / budget.allocatedAmount) * 100).toFixed(2);

  return (
    <Link
      href={`/dashboard/expenses/${budget.id}`}
      className="p-5 border rounded-lg hover:shadow-md cursor-pointer h-[150px]"
    >
      <div className="flex gap-2 items-center justify-between">
        <div className="flex gap-2 items-center">
          <div className="text-2xl p-3 px-4 bg-slate-100 rounded-full">
            {budget.icon}
          </div>
          <div>
            <h2 className="font-bold">{budget.name}</h2>
            <h2 className="text-sm text-gray-500">{budget.totalItems} Items</h2>
          </div>
        </div>
        <h2 className="font-bold text-primary text-lg">
          ${budget.allocatedAmount}
        </h2>
      </div>
      <div className="mt-5">
        <div className="flex justify-between">
          <h2 className="text-xs text-slate-400">${budget.spent || 0} spent</h2>
          <h2 className="text-xs text-slate-400">
            ${budget.allocatedAmount - budget.spent} remaining
          </h2>
        </div>
        <div className="w-full bg-slate-300 h-2 rounded-full">
          <div
            className="bg-primary h-2 rounded-full"
            style={{ width: `${progressBarPercentage()}%` }}
          />
        </div>
      </div>
    </Link>
  );
};
export default BudgetItem;
