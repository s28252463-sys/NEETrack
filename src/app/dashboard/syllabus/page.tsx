'use client';
import { SyllabusTracker } from '@/components/SyllabusTracker';
import { useState } from 'react';

export default function SyllabusPage() {
  const [, setCompletionPercentage] = useState(0);

  return (
    <main className="p-4 sm:p-6">
      <SyllabusTracker onProgressChange={setCompletionPercentage} />
    </main>
  );
}
