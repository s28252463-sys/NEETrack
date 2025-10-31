'use client';

import { useState, useEffect } from 'react';
import { ExamCountdown } from '@/components/ExamCountdown';
import { SyllabusTracker } from '@/components/SyllabusTracker';
import { StudyPlanner } from '@/components/StudyPlanner';
import { MockTests } from '@/components/MockTests';
import { SmartStudySuggester } from '@/components/SmartStudySuggester';
import { MotivationalQuote } from '@/components/MotivationalQuote';
import Ad from '@/components/Ad';

const EXAM_DATE = new Date('2026-05-03T00:00:00');
const PROGRESS_START_DATE = new Date('2025-05-05T00:00:00');

export default function DashboardPage() {
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [daysLeft, setDaysLeft] = useState<number>(0);

  useEffect(() => {
    const calculateDaysLeft = () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const examDay = new Date(EXAM_DATE);
      examDay.setHours(0, 0, 0, 0);
      const diffTime = examDay.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDaysLeft(diffDays > 0 ? diffDays : 0);
    };
    calculateDaysLeft();
    const interval = setInterval(calculateDaysLeft, 1000 * 60 * 60 * 24); // Recalculate every day
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="container mx-auto px-4 py-8 flex-grow">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ExamCountdown examDate={EXAM_DATE} progressStartDate={PROGRESS_START_DATE} />
          <SyllabusTracker onProgressChange={setCompletionPercentage} />
          <MockTests />
        </div>
        <div className="lg:col-span-1 space-y-6">
          <Ad />
          <SmartStudySuggester progress={completionPercentage} daysLeft={daysLeft} />
          <StudyPlanner progress={completionPercentage} daysLeft={daysLeft} />
          <MotivationalQuote />
        </div>
      </div>
    </main>
  );
}
