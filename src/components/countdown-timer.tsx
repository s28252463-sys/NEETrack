'use client';

import { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';

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
    const calculateTimeLeft = () => {
      const difference = +targetDate - +new Date();
      let timeLeftData: TimeLeft = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };

      if (difference > 0) {
        timeLeftData = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
        setTotalSeconds(difference / 1000);
      }
      return timeLeftData;
    };
    
    // Set initial values on mount
    const initialTimeLeft = calculateTimeLeft();
    setTimeLeft(initialTimeLeft);
    const initialDifference = +targetDate - +new Date();
    if(initialDifference > 0) {
        const seconds = initialDifference/1000;
        setInitialTotalSeconds(seconds);
        setTotalSeconds(seconds);
    }


    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!timeLeft) {
    return <div>Loading...</div>;
  }

  const progressPercentage = initialTotalSeconds > 0 ? (totalSeconds / initialTotalSeconds) * 100 : 0;

  return (
    <div>
      <div className="grid grid-cols-4 gap-4 text-center">
        <div>
          <p className="text-4xl font-bold">{timeLeft.days}</p>
          <p className="text-sm text-muted-foreground">Days</p>
        </div>
        <div>
          <p className="text-4xl font-bold">{timeLeft.hours}</p>
          <p className="text-sm text-muted-foreground">Hours</p>
        </div>
        <div>
          <p className="text-4xl font-bold">{timeLeft.minutes}</p>
          <p className="text-sm text-muted-foreground">Minutes</p>
        </div>
        <div>
          <p className="text-4xl font-bold">{timeLeft.seconds}</p>
          <p className="text-sm text-muted-foreground">Seconds</p>
        </div>
      </div>
      <div className="mt-6">
        <Progress value={progressPercentage} className="w-full" />
        <p className="text-right text-xs text-muted-foreground mt-1">
          {100 - Math.round(progressPercentage)}% of the time has passed.
        </p>
      </div>
    </div>
  );
};

export default CountdownTimer;
