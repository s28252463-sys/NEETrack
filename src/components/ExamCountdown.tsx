'use client';

import { useEffect, useState } from 'react';
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock } from 'lucide-react';

interface ExamCountdownProps {
  examDate: Date;
}

export function ExamCountdown({ examDate }: ExamCountdownProps) {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const days = differenceInDays(examDate, now);
      const hours = differenceInHours(examDate, now) % 24;
      const minutes = differenceInMinutes(examDate, now) % 60;
      const seconds = differenceInSeconds(examDate, now) % 60;
      setCountdown({ days, hours, minutes, seconds });
    }, 1000);
    return () => clearInterval(interval);
  }, [examDate]);

  return (
    <Card className="col-span-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Exam Countdown</CardTitle>
        <Clock className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {countdown.days}d {countdown.hours}h {countdown.minutes}m {countdown.seconds}s
        </div>
        <p className="text-xs text-muted-foreground">
          Until NEET 2026
        </p>
      </CardContent>
    </Card>
  );
}

    