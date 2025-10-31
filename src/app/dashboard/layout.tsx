'use client';

import { Sidebar, SidebarContent, SidebarInset, SidebarProvider, useSidebar } from '@/components/ui/sidebar';
import { Header } from '@/components/Header';
import { DashboardNav } from './components/DashboardNav';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {

  return (
    <SidebarProvider>
        <Sidebar>
            <SidebarContent>
                <DashboardNav />
            </SidebarContent>
        </Sidebar>
        <SidebarInset>
            <Header />
            {children}
        </SidebarInset>
    </SidebarProvider>
  );
}
