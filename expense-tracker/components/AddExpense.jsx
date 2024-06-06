import React, { useState } from 'react';
import { toast } from 'sonner';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import appService from '@/services/appService';

const AddExpense = ({ user, budgetId, refresh }) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');

  const addNewExpense = async () => {
    try {
      await appService.create(`/api/expenses/${budgetId}`, {
        name,
        amount,
        budgetId,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        createdAt: Date.now()
      });

      toast('Successfully created expense');
      setName('');
      setAmount('');
      refresh();
    } catch (error) {
      toast('Something went wrong');
    }
  };

  return (
    <div className="p-5 border rounded-lg min-w-[360px] md:min-w-screen">
      <h2 className="font-bold text-lg">Add Expense</h2>
      <div className="mt-2">
        <Label className="text-black" htmlFor="expense-name">
          Expense Name
        </Label>
        <Input
          type="text"
          id="expense-name"
          placeholder="Groceries"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mt-2">
        <Label className="text-black" htmlFor="expense-amount">
          Expense Amount
        </Label>
        <Input
          type="number"
          id="expense-amount"
          placeholder="300.05"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          asChild
        />
      </div>
      <Button
        disabled={!(name && amount)}
        className="mt-5 w-full"
        onClick={addNewExpense}
      >
        Add Expense
      </Button>
    </div>
  );
};

export default AddExpense;
