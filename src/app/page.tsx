'use client';

import { useState, useEffect } from 'react';
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
} from '@/components/ui/sidebar';
import { ListChecks, ClipboardList, Timer, Home as HomeIcon } from 'lucide-react';
import { SyllabusTracker } from '@/components/SyllabusTracker';
import { MockTests } from '@/components/MockTests';

const EXAM_DATE = new Date('2026-05-03T00:00:00');

export default function HomePage() {
  const [activePage, setActivePage] = useState('dashboard');
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [daysLeft, setDaysLeft] = useState<number>(0);

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

  const renderContent = () => {
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
      default:
        return <div>Dashboard</div>;
    }
  };

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
      </Sidebar>
      <SidebarInset>
        <div className="flex flex-col min-h-screen">
          <header className="flex items-center justify-start p-4 border-b md:hidden">
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
                <Image src="https://8upload.com/image/68f5f647ac27a/qr.jpg" alt="Donation QR Code" width={128} height={128} className="rounded-md" />
            </div>
            <p>Built for NEET UG Aspirants with ❤️</p>
          </footer>
        </div>
      </SidebarInset>
    </div>
  );
}