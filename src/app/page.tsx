'use client';

import { useState, useEffect, useCallback } from 'react';
import { Header } from '@/components/Header';
import { ExamCountdown } from '@/components/ExamCountdown';
import { SmartStudySuggester } from '@/components/SmartStudySuggester';
import { PomodoroTimer } from '@/components/PomodoroTimer';
import { MotivationalQuote } from '@/components/MotivationalQuote';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarInset,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { ListChecks, ClipboardList, Timer, HomeIcon, User, LogOut } from 'lucide-react';
import { SyllabusTracker } from '@/components/SyllabusTracker';
import { MockTests } from '@/components/MockTests';
import { useUser } from '@/firebase/auth/use-user';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { signOut } from 'firebase/auth';
import { useAuth } from '@/firebase';
import Link from 'next/link';
import Ad from '@/components/Ad';
import { Loader } from '@/components/Loader';
import { cn } from '@/lib/utils';

const EXAM_DATE = new Date('2026-05-03T00:00:00');

export default function HomePage() {
  const [activePage, setActivePage] = useState('dashboard');
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [daysLeft, setDaysLeft] = useState<number>(0);
  const { user, loading } = useUser();
  const router = useRouter();
  const auth = useAuth();
  
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    const calculateDaysLeft = () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const examDay = new Date(EXAM_DATE);
      examDay.setHours(0, 0, 0, 0);
      const diffTime = examDay.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDaysLeft(diffDays > 0 ? diffDays : 0);
    };
    calculateDaysLeft();
    const interval = setInterval(calculateDaysLeft, 1000 * 60 * 60 * 24);
    return () => clearInterval(interval);
  }, []);

  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('');
  };
  
  const handleSignOut = async () => {
    if (auth) {
      await signOut(auth);
    }
  };

  const renderContent = useCallback(() => {
    switch (activePage) {
      case 'dashboard':
        return (
          <div className="space-y-8">
            <MotivationalQuote />
            <div className="grid gap-8 md:grid-cols-2">
              <ExamCountdown examDate={EXAM_DATE} />
              <SmartStudySuggester progress={completionPercentage} daysLeft={daysLeft} />
            </div>
          </div>
        );
      case 'syllabus':
        return <SyllabusTracker onProgressChange={setCompletionPercentage} />;
      case 'tests':
        return <MockTests />;
      case 'pomodoro':
        return <PomodoroTimer />;
      default:
        return <div>Dashboard</div>;
    }
  }, [activePage, completionPercentage, daysLeft]);

  if (loading) {
    return <Loader />;
  }
  
  if (!user) {
    // This will be a brief blank screen while redirecting
    return null;
  }

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar>
          <SidebarHeader>
              <Header />
          </SidebarHeader>
          <SidebarContent>
              <SidebarMenu>
                  <SidebarMenuItem>
                      <SidebarMenuButton onClick={() => setActivePage('dashboard')} isActive={activePage === 'dashboard'} tooltip="Dashboard">
                          <HomeIcon />
                          <span className="group-data-[state=collapsed]/sidebar-wrapper:hidden group-data-[mobile=true]/sidebar:inline">Dashboard</span>
                      </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                      <SidebarMenuButton onClick={() => setActivePage('syllabus')} isActive={activePage === 'syllabus'} tooltip="Syllabus Tracker">
                          <ListChecks />
                          <span className="group-data-[state=collapsed]/sidebar-wrapper:hidden group-data-[mobile=true]/sidebar:inline">Syllabus Tracker</span>
                      </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                      <SidebarMenuButton onClick={() => setActivePage('tests')} isActive={activePage === 'tests'} tooltip="Mock Tests">
                          <ClipboardList />
                          <span className="group-data-[state=collapsed]/sidebar-wrapper:hidden group-data-[mobile=true]/sidebar:inline">Mock Tests</span>
                      </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                      <SidebarMenuButton onClick={() => setActivePage('pomodoro')} isActive={activePage === 'pomodoro'} tooltip="Pomodoro Timer">
                          <Timer />
                          <span className="group-data-[state=collapsed]/sidebar-wrapper:hidden group-data-[mobile=true]/sidebar:inline">Pomodoro Timer</span>
                      </SidebarMenuButton>
                  </SidebarMenuItem>
              </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            {user ? (
              <div className="flex items-center gap-3 p-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.photoURL || ''} alt={user.displayName || 'User'} />
                  <AvatarFallback>{getInitials(user.displayName)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col overflow-hidden group-data-[state=collapsed]/sidebar-wrapper:hidden group-data-[mobile=true]/sidebar:inline">
                  <span className="text-sm font-medium truncate">{user.displayName}</span>
                  <span className="text-xs text-muted-foreground truncate">{user.email}</span>
                </div>
                <Button onClick={handleSignOut} variant="ghost" size="icon" className="ml-auto group-data-[state=collapsed]/sidebar-wrapper:hidden group-data-[mobile=true]/sidebar:inline">
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="p-2">
                <Button asChild className="w-full justify-start group-data-[state=collapsed]/sidebar-wrapper:justify-center group-data-[mobile=true]/sidebar:justify-start">
                  <Link href="/login">
                    <User className="h-5 w-5" />
                    <span className="ml-2 group-data-[state=collapsed]/sidebar-wrapper:hidden group-data-[mobile=true]/sidebar:inline">Sign In</span>
                  </Link>
                </Button>
              </div>
            )}
          </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <div className="flex flex-col min-h-screen">
          <header className="flex items-center justify-between p-2 border-b md:hidden">
              <SidebarTrigger />
              <div className="mx-auto">
                <Header />
              </div>
          </header>
          <main className={cn("container mx-auto px-4 py-8 flex-grow", ['dashboard', 'syllabus', 'pomodoro'].includes(activePage) && 'dashboard-bg')}>
            {renderContent()}
          </main>
          <footer className="text-center py-8 text-muted-foreground text-sm space-y-4">
            <Ad />
            <p>Built for NEET UG Aspirants with ❤️</p>
          </footer>
        </div>
      </SidebarInset>
    </div>
  );
}
