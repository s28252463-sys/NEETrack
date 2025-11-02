'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';
import {
  Menu,
  BookOpen,
  LogOut,
  Timer,
  ListChecks,
  ClipboardList,
} from 'lucide-react';
import { useAuth, useUser } from '@/firebase';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useRouter } from 'next/navigation';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Logo } from '@/components/ui/logo';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = useAuth();
  const { user } = useUser();
  const router = useRouter();

  const handleSignOut = async () => {
    await auth.signOut();
    router.push('/login');
  };

  const getInitials = (email?: string | null) => {
    if (!email) return 'U';
    return email.substring(0, 2).toUpperCase();
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background/50 px-4 backdrop-blur-sm md:px-6 z-10">
        <TooltipProvider>
          <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-lg font-semibold md:text-base"
            >
              <Logo className="h-8 w-auto" />
            </Link>
            <Link
              href="/dashboard"
              className="text-foreground transition-colors hover:text-foreground"
            >
              Dashboard
            </Link>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/dashboard/pomodoro-timer"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Timer className="h-5 w-5" />
                  <span className="sr-only">Pomodoro Timer</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Pomodoro Timer</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/dashboard/syllabus-tracker"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  <ListChecks className="h-5 w-5" />
                  <span className="sr-only">Syllabus Tracker</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Syllabus Tracker</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/dashboard/mock-tests"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  <ClipboardList className="h-5 w-5" />
                  <span className="sr-only">Mock Tests</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Mock Tests</p>
              </TooltipContent>
            </Tooltip>
          </nav>
        </TooltipProvider>
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
                <Logo className="h-8 w-auto" />
              </Link>
              <Link href="/dashboard" className="hover:text-foreground">
                Dashboard
              </Link>
              <Link
                href="/dashboard/pomodoro-timer"
                className="flex items-center gap-4 text-muted-foreground hover:text-foreground"
              >
                <Timer className="h-5 w-5" />
                Pomodoro Timer
              </Link>
              <Link
                href="/dashboard/syllabus-tracker"
                className="flex items-center gap-4 text-muted-foreground hover:text-foreground"
              >
                <ListChecks className="h-5 w-5" />
                Syllabus Tracker
              </Link>
              <Link
                href="/dashboard/mock-tests"
                className="flex items-center gap-4 text-muted-foreground hover:text-foreground"
              >
                <ClipboardList className="h-5 w-5" />
                Mock Tests
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center justify-end gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <Avatar>
                  <AvatarImage src={user?.photoURL || ''} alt="User avatar" />
                  <AvatarFallback>{getInitials(user?.email)}</AvatarFallback>
                </Avatar>
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                {user?.isAnonymous ? 'Anonymous User' : user?.email}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        {children}
      </main>
    </div>
  );
}
