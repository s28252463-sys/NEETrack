'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, Settings } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';

const MockTestCountdown = () => {
  const [targetDate, setTargetDate] = useState<Date | null>(null);
  const [daysLeft, setDaysLeft] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  // Load the saved date from localStorage on initial client render
  useEffect(() => {
    const savedDate = localStorage.getItem('mockTestTargetDate');
    if (savedDate) {
      const date = new Date(savedDate);
      setTargetDate(date);
      setSelectedDate(date);
    }
  }, []);

  // Recalculate days left whenever the target date changes
  useEffect(() => {
    if (!targetDate) {
      setDaysLeft(null);
      return;
    }

    const calculateDaysLeft = () => {
      const now = new Date();
      // Set both dates to midnight to compare just the day part
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const target = new Date(
        targetDate.getFullYear(),
        targetDate.getMonth(),
        targetDate.getDate()
      );

      const difference = target.getTime() - today.getTime();

      if (difference >= 0) {
        setDaysLeft(Math.ceil(difference / (1000 * 60 * 60 * 24)));
      } else {
        setDaysLeft(null); // Or show a "past due" message
      }
    };

    calculateDaysLeft();
    // Update once a day
    const interval = setInterval(calculateDaysLeft, 1000 * 60 * 60 * 24);
    return () => clearInterval(interval);
  }, [targetDate]);

  const handleSaveDate = () => {
    if (selectedDate) {
      setTargetDate(selectedDate);
      localStorage.setItem('mockTestTargetDate', selectedDate.toISOString());
      setIsDialogOpen(false);
    }
  };

  return (
    <div className="w-full max-w-sm rounded-2xl bg-white/10 p-6 shadow-2xl backdrop-blur-lg">
      <div className="flex items-center justify-between text-white/80">
        <h2 className="font-semibold">Next Mock Test</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-white/70 hover:bg-white/20 hover:text-white -mr-2"
            >
              <Settings className="h-5 w-5" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Set Mock Test Date</DialogTitle>
              <DialogDescription>
                Select the date of your next mock test to start the countdown.
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-center">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                initialFocus
              />
            </div>
            <DialogFooter>
              <Button onClick={handleSaveDate}>Save Date</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="my-6 text-center">
        {daysLeft !== null ? (
          <>
            <p className="text-6xl md:text-7xl font-bold text-cyan-300 drop-shadow-[0_0_10px_rgba(74,222,222,0.5)]">
              {daysLeft}
            </p>
            <p className="text-sm text-white/70">
              Days Remaining
            </p>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-28">
            <p className="text-muted-foreground">No date set.</p>
            <Button
              variant="link"
              className="text-cyan-300"
              onClick={() => setIsDialogOpen(true)}
            >
              Set Mock Test Date
            </Button>
          </div>
        )}
      </div>
       <div className="flex items-center justify-center gap-2 text-sm text-white/60">
            <CalendarIcon className="h-4 w-4" />
            <span>{targetDate ? format(targetDate, 'PPP') : 'Not Set'}</span>
        </div>
    </div>
  );
};

export default MockTestCountdown;
