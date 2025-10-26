'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Header } from '@/components/Header';
import { ExamCountdown } from '@/components/ExamCountdown';
import { StudyPlanner } from '@/components/StudyPlanner';
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
import { ListChecks, ClipboardList, Timer, HomeIcon, User, LogOut, BookOpen } from 'lucide-react';
import { SyllabusTracker } from '@/components/SyllabusTracker';
import { MockTests } from '@/components/MockTests';
import { useUser } from '@/firebase/auth/use-user';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { signOut } from 'firebase/auth';
import { useAuth } from '@/firebase';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';
import { StudyMaterial } from '@/components/StudyMaterial';

const EXAM_DATE = new Date('2026-05-03T00:00:00');
const DONATION_QR_CODE_DATA_URI = "data:image/jpeg;base64,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";

export default function HomePage() {
  const [activePage, setActivePage] = useState('dashboard');
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [daysLeft, setDaysLeft] = useState<number>(0);
  const [isClient, setIsClient] = useState(false);
  const { user, loading } = useUser();
  const router = useRouter();
  const auth = useAuth();
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (!isClient) return;
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
  }, [isClient]);

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
      // The useUser hook will trigger the redirect to /login
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
              <StudyPlanner progress={completionPercentage} daysLeft={daysLeft} />
            </div>
          </div>
        );
      case 'syllabus':
        return <SyllabusTracker onProgressChange={setCompletionPercentage} />;
      case 'tests':
        return <MockTests />;
      case 'pomodoro':
        return <div className="flex justify-center items-start pt-10"><PomodoroTimer /></div>;
      case 'materials':
        return <StudyMaterial />;
      default:
        return <div>Dashboard</div>;
    }
  }, [activePage, completionPercentage, daysLeft]);

  if (loading) {
    return (
        <div className="flex h-screen w-full items-center justify-center">
            <div className="flex items-center">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="ml-4 space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                </div>
            </div>
        </div>
    );
  }
  
  if (!user) {
    return null; // The useEffect hook will handle the redirect
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
                      <SidebarMenuButton onClick={() => setActivePage('materials')} isActive={activePage === 'materials'} tooltip="Study Material">
                          <BookOpen />
                          <span className="group-data-[state=collapsed]/sidebar-wrapper:hidden group-data-[mobile=true]/sidebar:inline">Study Material</span>
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
          <main className="container mx-auto px-4 py-8 flex-grow">
            {renderContent()}
          </main>
          <footer className="text-center py-8 text-muted-foreground text-sm space-y-4">
            <div>
              <p>Found this tool helpful? Support the developers with a small donation!</p>
              <p>Your contribution helps keep the app running and improving.</p>
            </div>
            <div className="flex justify-center">
                <Image src={DONATION_QR_CODE_DATA_URI} alt="Donation QR Code" width={128} height={128} className="rounded-md" />
            </div>
            <p>Built for NEET UG Aspirants with ❤️</p>
          </footer>
        </div>
      </SidebarInset>
    </div>
  );
}
