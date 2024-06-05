import React, { useEffect, useState } from 'react';
import { PiggyBank, Receipt, Wallet } from 'lucide-react';

export const CardInfo = ({ budgetList }) => {
  const [totalBudgetAmount, setTotalBudgetAmount] = useState(0);
  const [totalBudgetSpent, setTotalBudgetSpent] = useState(0);

  useEffect(() => {
    budgetList && calculateCardInfo();
  }, [budgetList]);

  const calculateCardInfo = () => {
    let totalBudgetAmount_ = 0;
    let totalBudgetSpent_ = 0;
    budgetList.forEach((b) => {
      totalBudgetAmount_ += +b.allocatedAmount;
      totalBudgetSpent_ += b.spent;
    });
    setTotalBudgetAmount(totalBudgetAmount_);
    setTotalBudgetSpent(totalBudgetSpent_);
  };
  return (
    <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {budgetList?.length > 0 ? (
        <>
          <div className="p-7 border rounded-lg flex justify-between items-center">
            <div>
              <h2 className="text-sm">Total Budget Amount</h2>
              <h2 className="font-bold text-2xl">${totalBudgetAmount}</h2>
            </div>
            <PiggyBank className="bg-primary p-3 h-12 w-12 rounded-full" />
          </div>
          <div className="p-7 border rounded-lg flex justify-between items-center">
            <div>
              <h2 className="text-sm">Total Budget Spent</h2>
              <h2 className="font-bold text-2xl">${totalBudgetSpent}</h2>
            </div>
            <Receipt className="bg-primary p-3 h-12 w-12 rounded-full" />
          </div>
          <div className="p-7 border rounded-lg flex justify-between items-center">
            <div>
              <h2 className="text-sm">No. Budgets</h2>
              <h2 className="font-bold text-2xl">{budgetList?.length}</h2>
            </div>
            <Wallet className="bg-primary p-3 h-12 w-12 rounded-full" />
          </div>
        </>
      ) : (
        [1, 2, 3].map((n, i) => (
          <div
            key={i}
            className="w-full bg-slate-200 rounded-lg h-[100px] animate-pulse"
          />
        ))
      )}
    </div>
  );
};

export default CardInfo;
