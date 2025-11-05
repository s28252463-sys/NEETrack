'use client';

import PomodoroTimer from '@/components/pomodoro-timer';
import { PomodoroBackground } from '@/components/ui/pomodoro-background';

export default function PomodoroTimerPage() {
  return (
    <div className="dark -m-8 flex flex-1 justify-center items-start p-8 relative overflow-hidden">
       <PomodoroBackground />
      <div className="z-10 flex flex-1 justify-center items-start">
        <PomodoroTimer />
      </div>
    </div>
  );
}
