'use client';

import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';

import { Trash } from 'lucide-react';
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
import useWindowSize from '@/hooks/useWindowSize';
import { cn } from '@/lib/utils';

const ExpensePage = ({ params }) => {
  const { user } = useUser();
  const [budgetInfo, setBudgetInfo] = useState(null);
  const [expenseList, setExpenseList] = useState([]);
  const route = useRouter();
  const { width } = useWindowSize();

  if (!user) {
    route.replace('/sign-in');
  }

  useEffect(() => {
    getBudgetInfo();
  }, []);

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
        createdAt: format(new Date(+exp.createdAt), 'MM/dd/yyyy')
      }));
      setExpenseList(formattedExpenses);
    } catch (error) {
      toast('Error getting budget info');
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
    user && (
      <div className="w-full p-1 md:p-10 pb-20">
        <div
          className={
            width > 450 ? 'flex justify-between items-center' : 'flex flex-col'
          }
        >
          <h2 className="text-3xl font-bold">My Expenses</h2>
          <div
            className={cn(
              'flex gap-2 items-center',
              width <= 450 ? 'self-center mt-5' : ''
            )}
          >
            <EditBudget
              budgetInfo={budgetInfo}
              refresh={() => getBudgetInfo()}
            />
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {budgetInfo ? (
              <div className="lg:col-span-2">
                <BudgetItem budget={budgetInfo} />
              </div>
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
            <ExpenseList expenseList={expenseList} refresh={getBudgetInfo} />
          </div>
        </div>
      </div>
    )
  );
};

export default ExpensePage;
