
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="flex items-center justify-between p-4 sm:p-6 container mx-auto">
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 256 256"
            className="h-8 w-8 text-primary"
          >
            <rect width="256" height="256" fill="none" />
            <path
              d="M88,112a48,48,0,1,1,48,48A48.05,48.05,0,0,1,88,112Z"
              opacity="0.2"
            />
            <path
              d="M128,80h80a0,0,0,0,1,0,0v96a0,0,0,0,1,0,0H128a48,48,0,0,1-48-48v0A48,48,0,0,1,128,80Z"
              opacity="0.2"
            />
            <path
              d="M128,32a96,96,0,1,0,96,96A96.11,96.11,0,0,0,128,32Zm0,176a80,80,0,1,1,80-80A80.09,80.09,0,0,1,128,208Z"
              fill="currentColor"
            />
          </svg>
          <h1 className="text-2xl font-bold font-headline">NEETrack</h1>
        </div>
        <Button asChild>
          <Link href="/dashboard">
            Go to Dashboard <ArrowRight className="ml-2" />
          </Link>
        </Button>
      </header>
      <main className="flex-grow flex items-center justify-center">
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-4xl md:text-6xl font-bold font-headline mb-4">
            Your Ultimate NEET UG Preparation Companion
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Track your syllabus, manage mock tests, and get AI-powered personalized study plans to ace the exam.
          </p>
          <Button size="lg" asChild>
            <Link href="/dashboard">
              Get Started Now <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </main>
      <footer className="text-center py-6 text-muted-foreground text-sm">
        <p>Built for NEET UG Aspirants with ❤️</p>
      </footer>
    </div>
  );
}
