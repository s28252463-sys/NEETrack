'use client';

import CountdownTimer from '@/components/countdown-timer';
import ExamCountdown from '@/components/exam-countdown';
import MockTestCountdown from '@/components/mock-test-countdown';

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-8">
      <div className="text-center">
        <blockquote className="text-2xl font-semibold italic text-white">
          &quot;The expert in anything was once a beginner.&quot;
        </blockquote>
        <p className="mt-2 text-sm text-muted-foreground">— Helen Hayes</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        <ExamCountdown />
        <MockTestCountdown />
        <CountdownTimer />
      </div>
    </div>
  );
}
