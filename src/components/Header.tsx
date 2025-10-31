import { Target } from 'lucide-react';

export function Header() {
  return (
    <header className="flex items-center justify-center py-6 bg-card border-b">
      <div className="container mx-auto flex items-center justify-center">
        <Target className="h-10 w-10 text-primary" />
        <h1 className="ml-4 text-4xl font-headline font-bold text-gray-800 dark:text-gray-200">
          NEETrack
        </h1>
      </div>
    </header>
  );
}
