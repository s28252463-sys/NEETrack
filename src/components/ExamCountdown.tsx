'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarDays } from 'lucide-react';

interface ExamCountdownProps {
  examDate: Date;
}

export function ExamCountdown({ examDate }: ExamCountdownProps) {
  const [daysLeft, setDaysLeft] = useState<number | null>(null);

  useEffect(() => {
    const calculateDaysLeft = () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const examDay = new Date(examDate);
      examDay.setHours(0, 0, 0, 0);

      const diffTime = examDay.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDaysLeft(diffDays > 0 ? diffDays : 0);
    };

    calculateDaysLeft();
    const intervalId = setInterval(calculateDaysLeft, 1000 * 60 * 60); // Update every hour
    
    return () => clearInterval(intervalId);
  }, [examDate]);

  return (
    <Card className="shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium font-headline">
          Countdown to NEET UG
        </CardTitle>
        <CalendarDays className="h-5 w-5 text-primary" />
      </CardHeader>
      <CardContent>
        {daysLeft !== null ? (
          <div className="text-4xl font-bold text-primary">{daysLeft}</div>
        ) : (
          <div className="text-4xl font-bold text-primary">-</div>
        )}
        <p className="text-xs text-muted-foreground pt-1">
          days remaining until {examDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </CardContent>
    </Card>
  );
}
