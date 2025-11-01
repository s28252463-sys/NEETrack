'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';
import { Menu, BookOpen } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background/50 px-4 backdrop-blur-sm md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <BookOpen className="h-6 w-6" />
            <span className="sr-only">NEATrack</span>
          </Link>
          <Link
            href="/dashboard"
            className="text-foreground transition-colors hover:text-foreground"
          >
            Dashboard
          </Link>
          <Link
            href="/dashboard/pomodoro-timer"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Pomodoro Timer
          </Link>
          <Link
            href="/dashboard/syllabus-tracker"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Syllabus Tracker
          </Link>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <BookOpen className="h-6 w-6" />
                <span className="sr-only">NEATrack</span>
              </Link>
              <Link href="/dashboard" className="hover:text-foreground">
                Dashboard
              </Link>
              <Link
                href="/dashboard/pomodoro-timer"
                className="text-muted-foreground hover:text-foreground"
              >
                Pomodoro Timer
              </Link>
              <Link
                href="/dashboard/syllabus-tracker"
                className="text-muted-foreground hover:text-foreground"
              >
                Syllabus Tracker
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        {children}
      </main>
    </div>
  );
}
