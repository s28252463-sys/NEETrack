'use client';

import CountdownTimer from '@/components/countdown-timer';

export default function DashboardPage() {
  const examDate = new Date('2026-05-03T09:00:00');

  return (
    <div className="flex-1 space-y-8">
      <div className="text-center">
        <blockquote className="text-2xl font-semibold italic text-white">
          &quot;The expert in anything was once a beginner.&quot;
        </blockquote>
        <p className="mt-2 text-sm text-muted-foreground">— Helen Hayes</p>
      </div>
      <div className="flex justify-center">
        <CountdownTimer targetDate={examDate} />
      </div>
    </div>
  );
}
