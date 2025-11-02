'use client';

import { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';
import { Calendar } from 'lucide-react';
import { format } from 'date-fns';

interface CountdownTimerProps {
  targetDate: Date;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [initialTotalDays, setInitialTotalDays] = useState<number>(0);
  const [isClient, setIsClient] = useState(false);

  // Memoize target time to avoid re-calculating on every render
  const targetTime = targetDate.getTime();

  useEffect(() => {
    // This ensures the component only renders and runs logic on the client
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) {
      return; // Don't run the timer logic on the server
    }

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        return { days, hours, minutes, seconds };
      }
      
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    // Set initial total days once on mount
    if (initialTotalDays === 0) {
      const now = new Date().getTime();
      const initialDifference = targetTime - now;
      if (initialDifference > 0) {
        setInitialTotalDays(Math.floor(initialDifference / (1000 * 60 * 60 * 24)));
      }
    }
    
    // Set initial value
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
    // Only re-run if the target time or client status changes
  }, [targetTime, isClient, initialTotalDays]); 

  if (!isClient || !timeLeft) {
    return (
        <div className="w-full max-w-sm rounded-2xl bg-white/10 p-6 shadow-2xl backdrop-blur-lg">
            <div className="flex items-center justify-between text-white/80">
                <h2 className="font-semibold">Countdown to NEET UG</h2>
                <Calendar className="h-5 w-5" />
            </div>
            <div className="my-6 text-center">
                <p className="text-8xl font-bold text-cyan-300 drop-shadow-[0_0_10px_rgba(74,222,222,0.5)]">
                  -
                </p>
                <p className="text-sm text-white/70">
                  Loading...
                </p>
            </div>
        </div>
    );
  }

  const progressPercentage = initialTotalDays > 0 ? ((initialTotalDays - timeLeft.days) / initialTotalDays) * 100 : 0;
  const targetDateFormatted = format(targetDate, 'MMMM d, yyyy');

  const TimeBox = ({ value, unit }: { value: number; unit: string }) => (
    <div className="flex flex-col items-center justify-center rounded-lg bg-white/10 p-3">
      <p className="text-2xl font-bold text-white">{String(value).padStart(2, '0')}</p>
      <p className="text-xs text-white/70">{unit}</p>
    </div>
  );

  return (
    <div className="w-full max-w-sm rounded-2xl bg-white/10 p-6 shadow-2xl backdrop-blur-lg">
      <div className="flex items-center justify-between text-white/80">
        <h2 className="font-semibold">Countdown to NEET UG</h2>
        <Calendar className="h-5 w-5" />
      </div>
      <div className="my-6 text-center">
        <p className="text-8xl font-bold text-cyan-300 drop-shadow-[0_0_10px_rgba(74,222,222,0.5)]">
          {timeLeft.days}
        </p>
        <p className="text-sm text-white/70">
          days remaining until {targetDateFormatted}
        </p>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <TimeBox value={timeLeft.hours} unit="Hours" />
        <TimeBox value={timeLeft.minutes} unit="Minutes" />
        <TimeBox value={timeLeft.seconds} unit="Seconds" />
      </div>
      <div className="mt-6">
        <Progress value={progressPercentage} className="h-2 [&>*]:bg-cyan-300" />
      </div>
    </div>
  );
};

export default CountdownTimer;
