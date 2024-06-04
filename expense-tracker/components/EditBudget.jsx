'use client';

import React, { useEffect, useState } from 'react';
import { PenBox } from 'lucide-react';
import EmojiPicker from 'emoji-picker-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import appService from '@/services/appService';

export const EditBudget = ({ budgetInfo, refresh }) => {
  const [emojiIcon, setEmojiIcon] = useState();
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [name, setName] = useState();
  const [allocatedAmount, setAllocatedAmount] = useState();

  useEffect(() => {
    setEmojiIcon(budgetInfo?.icon);
    setName(budgetInfo?.name);
    setAllocatedAmount(budgetInfo?.allocatedAmount);
  }, [budgetInfo]);

  const onUpdateBudget = async () => {
    try {
      await appService.update(
        '/api/budgetInfo',
        {
          ...budgetInfo,
          name,
          allocatedAmount,
          icon: emojiIcon,
          createdAt: Date.now()
        },
        budgetInfo.id
      );

      refresh();
      toast('Successfully updated budget');
    } catch (error) {
      toast('Something went wrong');
    } finally {
      setName('');
      setAllocatedAmount('');
    }
  };

  return (
    <Dialog onOpenChange={() => setOpenEmojiPicker(false)}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <PenBox /> Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Budget</DialogTitle>
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
                className="text-black"
                type="text"
                id="budget-name"
                placeholder="Groceries"
                defaultValue={budgetInfo?.name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mt-2">
              <Label className="text-black" htmlFor="budget-allocated-amount">
                Budget Amount
              </Label>
              <Input
                className="text-black"
                type="number"
                id="budget-allocated-amount"
                placeholder="300.05"
                defaultValue={budgetInfo?.allocatedAmount}
                onChange={(e) => setAllocatedAmount(e.target.value)}
                asChild
              />
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              disabled={!(name && allocatedAmount)}
              className="mt-5 w-full"
              onClick={onUpdateBudget}
            >
              Update Budget
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditBudget;
