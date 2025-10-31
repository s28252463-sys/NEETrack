'use client';
import { PomodoroTimer } from '@/components/PomodoroTimer';

export default function PomodoroPage() {
  return (
    <main className="p-4 sm:p-6 flex justify-center">
      <PomodoroTimer />
    </main>
  );
}
