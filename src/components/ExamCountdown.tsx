'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CalendarDays } from 'lucide-react';
import { CountdownCircle } from './CountdownCircle';
import { cn } from '@/lib/utils';

interface ExamCountdownProps {
  examDate: Date;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const PROGRESS_START_DATE = new Date('2025-05-05T00:00:00');

export function ExamCountdown({ examDate }: ExamCountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [dayProgress, setDayProgress] = useState(100);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const calculateCountdown = () => {
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
        
        // Calculate progress for the circle
        const totalDuration = examDate.getTime() - PROGRESS_START_DATE.getTime();
        const timeElapsed = now.getTime() - PROGRESS_START_DATE.getTime();

        if (totalDuration > 0 && timeElapsed >= 0) {
            const progress = 100 - (timeElapsed / totalDuration) * 100;
            setDayProgress(progress < 0 ? 0 : progress > 100 ? 100 : progress);
        } else if (timeElapsed < 0) {
            setDayProgress(100);
        } else {
            setDayProgress(0);
        }

    };
    
    calculateCountdown();
    const intervalId = setInterval(calculateCountdown, 1000);
    
    return () => clearInterval(intervalId);

  }, [examDate, isClient]);

  return (
    <Card className={cn("shadow-lg w-full", "countdown-background")}>
      <CardContent className="p-6 text-center">
        <div className="relative w-48 h-48 mx-auto mb-6">
            <CountdownCircle progress={dayProgress} />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-bold text-primary">
                    {isClient && timeLeft ? timeLeft.days : '-'}
                </span>
                <span className="text-sm text-muted-foreground">days until NEET UG</span>
            </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="p-3 bg-primary/10 rounded-lg">
                <p className="text-2xl font-bold text-primary">{isClient && timeLeft ? timeLeft.hours : '-'}</p>
                <p className="text-xs text-muted-foreground">Hours</p>
            </div>
             <div className="p-3 bg-primary/10 rounded-lg">
                <p className="text-2xl font-bold text-primary">{isClient && timeLeft ? timeLeft.minutes : '-'}</p>
                <p className="text-xs text-muted-foreground">Minutes</p>
            </div>
             <div className="p-3 bg-primary/10 rounded-lg">
                <p className="text-2xl font-bold text-primary">{isClient && timeLeft ? timeLeft.seconds : '-'}</p>
                <p className="text-xs text-muted-foreground">Seconds</p>
            </div>
        </div>
        
        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2">
                <CalendarDays className="h-5 w-5 text-primary"/>
                <div>
                    <p className="text-xs text-left text-muted-foreground">NEET UG Exam Date</p>
                    <p className="text-sm font-semibold text-left">
                        {examDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                </div>
            </div>
            {/* The "Change Date" button is present in the image but its functionality is not specified.
                For now, it will be a visual placeholder.
            */}
            <div className="h-9 px-3 py-2 text-primary text-sm font-medium">
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
