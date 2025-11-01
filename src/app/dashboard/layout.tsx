'use client';

import { Sidebar, SidebarContent, SidebarHeader, SidebarHeaderTitle, SidebarNav, SidebarNavLink } from "@/components/ui/sidebar";
import { Brain, Clock } from "lucide-react";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen bg-background text-foreground">
            <Sidebar>
                <SidebarHeader>
                    <SidebarHeaderTitle>NEATrack</SidebarHeaderTitle>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarNav>
                        <SidebarNavLink href="/dashboard">
                            <Brain />
                            Dashboard
                        </SidebarNavLink>
                        <SidebarNavLink href="/dashboard/pomodoro-timer">
                            <Clock />
                            Pomodoro Timer
                        </SidebarNavLink>
                    </SidebarNav>
                </SidebarContent>
            </Sidebar>
            <main className="flex-1 overflow-y-auto p-4">
                {children}
            </main>
        </div>
    );
}
