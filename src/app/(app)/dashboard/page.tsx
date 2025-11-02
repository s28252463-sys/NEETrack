'use client';

import ExamCountdown from '@/components/exam-countdown';
import MockTestCountdown from '@/components/mock-test-countdown';

export default function DashboardPage() {
  return (
    <div className="theme-galaxy -m-8 flex-1 p-8 flex items-center justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        <ExamCountdown />
        <MockTestCountdown />
      </div>
    </div>
  );
}
