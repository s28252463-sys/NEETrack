'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { ExamCountdown } from '@/components/ExamCountdown';
import { SyllabusTracker } from '@/components/SyllabusTracker';
import { StudyPlanner } from '@/components/StudyPlanner';
import { MockTests } from '@/components/MockTests';

const EXAM_DATE = new Date('2026-05-03T00:00:00');

export default function DashboardPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-950 text-white">
      <Header />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <ExamCountdown examDate={EXAM_DATE} />
          {isClient && <SyllabusTracker />}
        </div>
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-2">
          <StudyPlanner />
          <MockTests />
        </div>
      </main>
    </div>
  );
}

    