'use client';

import { useState, useEffect, useMemo } from 'react';
import { Calendar } from 'lucide-react';

const ExamCountdown = () => {
  const [daysLeft, setDaysLeft] = useState<number | null>(null);

  // Set the target date once using useMemo to prevent re-computation
  const targetDate = useMemo(() => {
    // NEET is May 3rd. We'll set the date to midnight UTC on that day.
    return new Date('2026-05-03T00:00:00.000Z');
  }, []);

  useEffect(() => {
    // This effect runs only on the client
    const calculateDaysLeft = () => {
      const now = new Date();
      // Get today's date at midnight UTC
      const today = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
      
      const difference = targetDate.getTime() - today.getTime();
      
      if (difference > 0) {
        // Use Math.ceil to correctly round up to the nearest full day.
        const totalDays = Math.ceil(difference / (1000 * 60 * 60 * 24));
        setDaysLeft(totalDays);
      } else {
        setDaysLeft(0);
      }
    };
    
    // Calculate on mount
    calculateDaysLeft();

    // Set up an interval to recalculate once a day.
    const interval = setInterval(calculateDaysLeft, 1000 * 60 * 60); // Check every hour

    return () => clearInterval(interval);
  }, [targetDate]);


  return (
    <div className="w-full max-w-sm rounded-2xl bg-white/10 p-6 shadow-2xl backdrop-blur-lg">
      <div className="flex items-center justify-between text-white/80">
        <h2 className="font-semibold">Days Until Exam</h2>
        <Calendar className="h-5 w-5" />
      </div>
      <div className="my-6 text-center">
         {daysLeft !== null ? (
            <p className="text-6xl md:text-7xl font-bold text-cyan-300 drop-shadow-[0_0_10px_rgba(74,222,222,0.5)]">
                {daysLeft}
            </p>
         ) : (
            <p className="text-6xl md:text-7xl font-bold text-cyan-300 drop-shadow-[0_0_10px_rgba(74,222,222,0.5)]">
                --
            </p>
         )}
        <p className="text-sm text-white/70">NEET UG 2026</p>
      </div>
    </div>
  );
};

export default ExamCountdown;
