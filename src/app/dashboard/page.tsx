'use client';

import CountdownTimer from '@/components/countdown-timer';
import ExamCountdown from '@/components/exam-countdown';

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-8">
      <div className="text-center">
        <blockquote className="text-2xl font-semibold italic text-white">
          &quot;The expert in anything was once a beginner.&quot;
        </blockquote>
        <p className="mt-2 text-sm text-muted-foreground">— Helen Hayes</p>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center gap-8">
        <ExamCountdown />
        <CountdownTimer />
      </div>
    </div>
  );
}
