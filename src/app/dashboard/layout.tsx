"use client"
import Link from "next/link";
import { Sidebar, SidebarContent, SidebarHeader, SidebarHeaderTitle, SidebarNav, SidebarNavLink } from "@/components/ui/sidebar";
import { Home, Clock, Circle } from "lucide-react";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen bg-background text-white">
            <div className="w-64 flex-shrink-0 border-r bg-sidebar text-sidebar-foreground">
                <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-4">
                    <Circle className="h-6 w-6" />
                    <h2 className="text-lg font-semibold">NEATrack</h2>
                </div>
                <div className="flex-1 overflow-y-auto">
                    <nav className="grid gap-1 px-4 py-4">
                        <Link href="/dashboard" className="flex items-center gap-3 rounded-md px-3 py-2 text-sidebar-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                            <Home className="h-5 w-5" />
                            Dashboard
                        </Link>
                        <Link href="/dashboard/pomodoro-timer" className="flex items-center gap-3 rounded-md px-3 py-2 text-sidebar-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                            <Clock className="h-5 w-5" />
                            Pomodoro Timer
                        </Link>
                    </nav>
                </div>
            </div>
            <main className="flex-1 overflow-y-auto p-4">
                {children}
            </main>
        </div>
    );
}
