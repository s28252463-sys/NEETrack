'use client';

import PomodoroTimer from '@/components/pomodoro-timer';
import { PomodoroBackground } from '@/components/ui/pomodoro-background';
import Script from 'next/script';

export default function PomodoroTimerPage() {
  return (
    <div className="-m-8 flex flex-1 flex-col justify-between items-center p-8 relative overflow-hidden theme-serenity">
      <PomodoroBackground />
      <div className="z-10 flex flex-1 justify-center items-center w-full">
        <PomodoroTimer />
      </div>
      <Script async={true} data-cfasync="false" src="//pl28085801.effectivegatecpm.com/48a2c7d50ab69852baf22279c014a0b5/invoke.js" />
      <div id="container-48a2c7d50ab69852baf22279c014a0b5" className="w-full mt-4"></div>
    </div>
  );
}
