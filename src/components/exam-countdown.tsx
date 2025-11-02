'use client';

import { useState, useEffect, useMemo } from 'react';
import { Calendar } from 'lucide-react';
import { CircularProgress } from '@/components/ui/circular-progress';

const ExamCountdown = () => {
  const [daysLeft, setDaysLeft] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);

  // The target date for the exam (May 3, 2026, at midnight UTC)
  const targetDate = useMemo(() => new Date('2026-05-03T00:00:00.000Z'), []);
  // The start date of the countdown period (May 5, 2025, at midnight UTC)
  const startDate = useMemo(() => new Date('2025-05-05T00:00:00.000Z'), []);
  
  // Total duration of the countdown in days. Memoized for efficiency.
  const totalCountdownDays = useMemo(() => {
    const totalDuration = targetDate.getTime() - startDate.getTime();
    return Math.ceil(totalDuration / (1000 * 60 * 60 * 24));
  }, [targetDate, startDate]);


  useEffect(() => {
    // This effect runs only on the client
    const calculateDaysLeft = () => {
      const now = new Date();
      // Get today's date at midnight UTC for a clean day-to-day comparison
      const today = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
      
      const difference = targetDate.getTime() - today.getTime();
      
      if (difference > 0) {
        // Use Math.ceil to correctly round up to the nearest full day.
        const remainingDays = Math.ceil(difference / (1000 * 60 * 60 * 24));
        setDaysLeft(remainingDays);
        
        // Calculate days that have passed since the start date
        const passedDifference = today.getTime() - startDate.getTime();
        const daysPassed = Math.max(0, Math.ceil(passedDifference / (1000 * 60 * 60 * 24)));
        
        // Calculate progress based on days passed
        const passedPercentage = (daysPassed / totalCountdownDays) * 100;

        // To show a reducing effect, we show the inverse of the passed percentage.
        setProgress(100 - passedPercentage);

      } else {
        setDaysLeft(0);
        setProgress(0);
      }
    };
    
    // Calculate on mount
    calculateDaysLeft();

    // Set up an interval to recalculate once a day
    const interval = setInterval(calculateDaysLeft, 1000 * 60 * 60);

    return () => clearInterval(interval);
  }, [targetDate, startDate, totalCountdownDays]);


  return (
    <div className="w-full max-w-sm rounded-2xl bg-card/60 p-6 shadow-lg backdrop-blur-lg">
      <div className="flex items-center justify-between text-card-foreground/80">
        <h2 className="font-semibold">Days Until Exam</h2>
        <Calendar className="h-5 w-5" />
      </div>
      <div className="my-6 text-center flex justify-center items-center">
         <div className="relative flex size-56 items-center justify-center">
            <CircularProgress value={progress} size={224} strokeWidth={10} />
            <div className="absolute flex flex-col items-center">
              {daysLeft !== null ? (
                  <p className="text-6xl md:text-7xl font-bold text-primary drop-shadow-[0_0_10px_rgba(235,123,91,0.5)]">
                      {daysLeft}
                  </p>
              ) : (
                  <p className="text-6xl md:text-7xl font-bold text-primary drop-shadow-[0_0_10px_rgba(235,123,91,0.5)]">
                      --
                  </p>
              )}
              <p className="text-sm text-muted-foreground">NEET UG 2026</p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default ExamCountdown;
