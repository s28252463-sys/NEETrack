import { Target } from 'lucide-react';
import Link from 'next/link';

export function Header() {
  return (
    <header className="flex items-center justify-center py-6 bg-card border-b">
      <div className="container mx-auto flex items-center justify-center">
        <Link href="/" className="flex items-center gap-4">
            <Target className="h-10 w-10 text-primary" />
            <h1 className="text-4xl font-headline font-bold text-gray-800 dark:text-gray-200">
              NEETrack
            </h1>
        </Link>
      </div>
    </header>
  );
}
