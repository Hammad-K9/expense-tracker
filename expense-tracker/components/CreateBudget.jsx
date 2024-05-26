'use client';

import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import EmojiPicker from 'emoji-picker-react';
import { useUser } from '@clerk/nextjs';
import { toast } from 'sonner';
import appService from '@/services/appService';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const CreateBudget = () => {
  const [emojiIcon, setEmojiIcon] = useState('🦋');
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState(0);

  const { user } = useUser();

  const onCreateBudget = async () => {
    try {
      const result = await appService.create('/api/budgets', {
        name,
        amount,
        icon: emojiIcon,
        createdBy: user?.primaryEmailAddress?.emailAddress
      });

      toast('Successfully created');
      console.log(result);
    } catch (error) {
      toast('Something went wrong');
    } finally {
      setOpenDialog(false);
      setName('');
      setAmount(0);
    }
  };

  return (
    <div>
      <Dialog
        open={openDialog}
        onOpenChange={() => {
          setOpenEmojiPicker(false);
          setOpenDialog(true);
        }}
      >
        <DialogTrigger>
          <div className="bg-slate-100 p-10 rounded-md flex flex-col items-center border-2 border-dashed cursor-pointer hover:shadow-md">
            <h2>Create New Budget</h2>
            <PlusCircle />
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Budget</DialogTitle>
            <DialogDescription>
              <Button
                variant="outline"
                type="button"
                onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                className="text-lg"
              >
                {emojiIcon}
              </Button>
              <div>
                <EmojiPicker
                  open={openEmojiPicker}
                  onEmojiClick={(e) => {
                    setEmojiIcon(e.emoji);
                    setOpenEmojiPicker(false);
                  }}
                />
              </div>
              <div className="mt-2">
                <Label className="text-black" htmlFor="budget-name">
                  Budget Name
                </Label>
                <Input
                  type="text"
                  id="budget-name"
                  placeholder="Groceries"
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === 'Enter' && name && amount ? onCreateBudget() : ''
                  }
                />
              </div>
              <div className="mt-2">
                <Label className="text-black" htmlFor="budget-amount">
                  Budget Amount
                </Label>
                <Input
                  type="number"
                  id="budget-amount"
                  placeholder="300.05"
                  onChange={(e) => setAmount(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === 'Enter' && name && amount ? onCreateBudget() : ''
                  }
                />
              </div>
              <Button
                disabled={!(name && amount)}
                className="mt-5 w-full"
                onClick={onCreateBudget}
              >
                Create Budget
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateBudget;
