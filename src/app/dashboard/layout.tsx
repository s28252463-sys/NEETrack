"use client"
import { Sidebar, SidebarContent, SidebarHeader, SidebarHeaderTitle, SidebarNav, SidebarNavLink } from "@/components/ui/sidebar";
import { Home, Clock, Circle } from "lucide-react";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen bg-gray-900 text-white">
            <Sidebar>
                <SidebarHeader>
                    <Circle className="h-6 w-6" />
                    <SidebarHeaderTitle>NEATrack</SidebarHeaderTitle>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarNav>
                        <SidebarNavLink href="/dashboard">
                            <Home className="h-5 w-5" />
                            Dashboard
                        </SidebarNavLink>
                        <SidebarNavLink href="/dashboard/pomodoro-timer">
                            <Clock className="h-5 w-5" />
                            Pomodoro Timer
                        </SidebarNavLink>
                    </SidebarNav>
                </SidebarContent>
            </Sidebar>
            <main className="flex-1 overflow-y-auto p-4 bg-dots">
                {children}
            </main>
        </div>
    );
}
