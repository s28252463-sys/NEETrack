'use client';

import ExamCountdown from '@/components/exam-countdown';
import MockTestCountdown from '@/components/mock-test-countdown';
import CountdownTimer from '@/components/countdown-timer';
import { AnimatedBubbles } from '@/components/ui/animated-bubbles';
import DailyQuote from '@/components/daily-quote';

export default function DashboardPage() {
  return (
    <div className="theme-galaxy -m-8 flex-1 p-8 flex flex-col items-center justify-center relative overflow-hidden">
        <AnimatedBubbles />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl z-10">
            <ExamCountdown />
            <CountdownTimer />
            <MockTestCountdown />
            <DailyQuote />
        </div>
        <div id="container-48a2c7d50ab69852baf22279c014a0b5" className="mt-8"></div>
    </div>
  );
}
