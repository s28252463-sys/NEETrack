'use client';

import ExamCountdown from '@/components/exam-countdown';
import MockTestCountdown from '@/components/mock-test-countdown';
import CountdownTimer from '@/components/countdown-timer';
import { DashboardBackground } from '@/components/ui/dashboard-background';

export default function DashboardPage() {
  return (
    <div className="theme-galaxy -m-8 flex-1 p-8 flex items-center justify-center relative overflow-hidden">
        <DashboardBackground />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full max-w-7xl z-10">
            <ExamCountdown />
            <CountdownTimer />
            <MockTestCountdown />
        </div>
    </div>
  );
}
