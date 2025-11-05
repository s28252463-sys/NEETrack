'use client';

import PomodoroTimer from '@/components/pomodoro-timer';
import Image from 'next/image';

export default function PomodoroTimerPage() {
  return (
    <div className="dark -m-8 flex flex-1 justify-center items-start p-8 relative">
       <Image
        src="/pomodoro-bg.jpg"
        alt="Focus background"
        layout="fill"
        objectFit="cover"
        className="z-0 opacity-20"
      />
      <div className="z-10 flex flex-1 justify-center items-start">
        <PomodoroTimer />
      </div>
    </div>
  );
}
