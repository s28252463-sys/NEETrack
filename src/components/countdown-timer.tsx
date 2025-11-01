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
  const [totalSeconds, setTotalSeconds] = useState<number>(0);
  const [initialTotalSeconds, setInitialTotalSeconds] = useState<number>(0);

  useEffect(() => {
    // This function will only run on the client
    const calculateTimeLeft = () => {
      const difference = +targetDate - +new Date();
      let timeLeftData: TimeLeft = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };

      if (difference > 0) {
        const currentTotalSeconds = difference / 1000;
        timeLeftData = {
          days: Math.floor(currentTotalSeconds / (60 * 60 * 24)),
          hours: Math.floor((currentTotalSeconds / (60 * 60)) % 24),
          minutes: Math.floor((currentTotalSeconds / 60) % 60),
          seconds: Math.floor(currentTotalSeconds % 60),
        };
        setTotalSeconds(currentTotalSeconds);
      }
      return timeLeftData;
    };
    
    // Set initial values only once on mount, inside useEffect
    if (initialTotalSeconds === 0) {
        const initialDifference = +targetDate - +new Date();
        if (initialDifference > 0) {
            const seconds = initialDifference / 1000;
            setInitialTotalSeconds(seconds);
            setTotalSeconds(seconds);
        }
    }
    
    // Set initial time left and then update every second
    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, initialTotalSeconds]);

  if (!timeLeft) {
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

  const progressPercentage = initialTotalSeconds > 0 ? (totalSeconds / initialTotalSeconds) * 100 : 0;
  const targetDateFormatted = format(targetDate, 'MMMM d, yyyy');

  const TimeBox = ({ value, unit }: { value: number; unit: string }) => (
    <div className="flex flex-col items-center justify-center rounded-lg bg-white/10 p-3">
      <p className="text-2xl font-bold text-white">{value}</p>
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
        <Progress value={100 - progressPercentage} className="h-2 [&>*]:bg-cyan-300" />
      </div>
    </div>
  );
};

export default CountdownTimer;
