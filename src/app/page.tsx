'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { ExamCountdown } from '@/components/ExamCountdown';
import { SyllabusTracker } from '@/components/SyllabusTracker';
import { StudyPlanner } from '@/components/StudyPlanner';
import { MockTests } from '@/components/MockTests';
import { PomodoroTimer } from '@/components/PomodoroTimer';
import { FloatingParticles } from '@/components/FloatingParticles';

const EXAM_DATE = new Date('2026-05-03T00:00:00');

export default function Home() {
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
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <FloatingParticles />
      <Header />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3 space-y-8">
            <SyllabusTracker onProgressChange={setCompletionPercentage} />
            <MockTests />
          </div>
          <div className="lg:col-span-2 space-y-8">
            <ExamCountdown examDate={EXAM_DATE} />
            <StudyPlanner progress={completionPercentage} daysLeft={daysLeft} />
            <PomodoroTimer />
          </div>
        </div>
      </main>
      <footer className="text-center py-4 text-muted-foreground text-sm">
        <p>Built for NEET UG Aspirants with ❤️</p>
      </footer>
    </div>
  );
}
