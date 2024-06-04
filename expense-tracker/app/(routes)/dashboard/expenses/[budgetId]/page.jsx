'use client';

import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';

import { PenBox, Trash } from 'lucide-react';
import appService from '@/services/appService';
import BudgetItem from '@/components/BudgetItem';
import AddExpense from '@/components/AddExpense';
import ExpenseList from '@/components/ExpenseList';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import EditBudget from '@/components/EditBudget';

const ExpensesPage = ({ params }) => {
  const { user } = useUser();
  const [budgetInfo, setBudgetInfo] = useState(null);
  const [expenseList, setExpenseList] = useState([]);
  const route = useRouter();

  useEffect(() => {
    user && getBudgetInfo();
  }, [user]);

  const getBudgetInfo = async () => {
    try {
      const response = await appService.getBudgetInfo(
        '/api/budgetInfo',
        params.budgetId
      );
      setBudgetInfo(response);
      getExpenseList();
    } catch (error) {
      toast('Error getting budget info');
      console.log(error);
    }
  };

  const getExpenseList = async () => {
    try {
      const response = await appService.getAll(
        `/api/expenses/${params.budgetId}`
      );
      const formattedExpenses = response.map((exp) => ({
        ...exp,
        createdAt: format(new Date(parseInt(exp.createdAt, 10)), 'MM/dd/yyyy')
      }));
      setExpenseList(formattedExpenses);
    } catch (error) {
      toast('Error getting budget info');
      console.log(error);
    }
  };

  const deleteExpense = async (exp) => {
    try {
      await appService.deleteItem('/api/expenses', exp.id);
      getBudgetInfo();
      toast('Expense has been deleted');
    } catch (error) {
      toast('Error deleting expense');
      console.log(error);
    }
  };

  const deleteBudget = async () => {
    try {
      await appService.deleteItem('/api/budgets', params.budgetId);
      toast('Budget has been deleted');
      route.replace('/dashboard/budgets');
    } catch (error) {
      toast('Error deleting budget');
      console.log(error);
    }
  };

  return (
    <div className="w-full p-20 pt-10 md:p-10">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">My Expenses</h2>
        <div className="flex gap-2 items-center">
          <EditBudget budgetInfo={budgetInfo} refresh={() => getBudgetInfo()} />
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="gap-2" variant="destructive">
                <Trash /> Delete Budget
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your budget and expenses associated with this budget, and
                  remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => deleteBudget()}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      <div className="mt-7">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {budgetInfo ? (
            <BudgetItem budget={budgetInfo} />
          ) : (
            <div className="w-full bg-slate-200 rounded-lg h-[150px] animate-pulse" />
          )}
          <AddExpense
            user={user}
            budgetId={params.budgetId}
            refresh={() => getBudgetInfo()}
          />
        </div>
        <div>
          <h2>Expenses</h2>
          <ExpenseList
            expenseList={expenseList}
            deleteExpense={deleteExpense}
          />
        </div>
      </div>
    </div>
  );
};

export default ExpensesPage;
