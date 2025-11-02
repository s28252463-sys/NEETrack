'use client';

import CountdownTimer from '@/components/countdown-timer';
import ExamCountdown from '@/components/exam-countdown';
import MockTestCountdown from '@/components/mock-test-countdown';

export default function DashboardPage() {
  return (
    <div className="-m-8 flex-1 p-8">
      <div className="flex-1 space-y-8">
        <div className="text-center">
          <blockquote className="text-2xl font-semibold italic text-foreground/80">
            &quot;The expert in anything was once a beginner.&quot;
          </blockquote>
          <p className="mt-2 text-sm text-muted-foreground">— Helen Hayes</p>
        </div>
        <div className="space-y-8">
          {/* Top row for the two main countdowns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center">
            <ExamCountdown />
            <MockTestCountdown />
          </div>
          {/* Bottom row for the daily timer, centered */}
          <div className="grid grid-cols-1 justify-items-center">
            <CountdownTimer />
          </div>
        </div>
      </div>
    </div>
  );
}
