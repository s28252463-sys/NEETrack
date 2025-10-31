'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CountdownCircle } from './CountdownCircle';

interface ExamCountdownProps {
  examDate: Date;
  progressStartDate: Date;
}

const TimeCard = ({ value, unit }: { value: number; unit: string }) => (
  <div className="flex flex-col items-center">
    <div className="text-2xl font-bold text-gray-800 dark:text-gray-200 bg-white/30 backdrop-blur-sm rounded-lg p-2 w-16 text-center">
      {String(value).padStart(2, '0')}
    </div>
    <span className="text-xs text-muted-foreground mt-1">{unit}</span>
  </div>
);

export function ExamCountdown({ examDate, progressStartDate }: ExamCountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [dayProgress, setDayProgress] = useState(100);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = examDate.getTime() - now.getTime();
      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }

      // Calculate day progress
      const totalDuration = examDate.getTime() - progressStartDate.getTime();
      const elapsedDuration = now.getTime() - progressStartDate.getTime();
      const progress = 100 - (elapsedDuration / totalDuration) * 100;
      setDayProgress(Math.max(0, progress));
    };

    calculateTimeLeft();
    const intervalId = setInterval(calculateTimeLeft, 1000);
    
    return () => clearInterval(intervalId);
  }, [examDate, progressStartDate]);

  return (
    <Card className="w-full max-w-sm shadow-lg countdown-background">
      <CardHeader className="items-center pb-2">
        <CardTitle className="text-lg font-medium font-headline text-center text-foreground/80">
          Countdown to NEET UG
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center p-4">
        <div className="relative w-48 h-48">
          <CountdownCircle progress={dayProgress} />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-5xl font-bold text-gray-800 dark:text-gray-200">
              {timeLeft.days}
            </div>
            <div className="text-sm text-muted-foreground">Days</div>
          </div>
        </div>
        <div className="flex justify-center gap-4 mt-4">
          <TimeCard value={timeLeft.hours} unit="Hours" />
          <TimeCard value={timeLeft.minutes} unit="Minutes" />
          <TimeCard value={timeLeft.seconds} unit="Seconds" />
        </div>
        <div className="text-center mt-4 text-xs text-muted-foreground">
          {examDate.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </div>
      </CardContent>
    </Card>
  );
}
