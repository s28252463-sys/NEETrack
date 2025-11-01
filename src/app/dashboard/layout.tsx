import { Sidebar, SidebarContent, SidebarHeader, SidebarHeaderTitle, SidebarNav, SidebarNavLink } from "@/components/ui/sidebar";
import { Home, ClipboardList, BookOpen, Clock, Info, Circle } from "lucide-react";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen bg-gradient-to-br from-[#8ec5fc] to-[#e0c3fc]">
            <Sidebar>
                <SidebarHeader>
                    <Circle className="h-6 w-6 text-white" />
                    <SidebarHeaderTitle>NEATrack</SidebarHeaderTitle>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarNav>
                        <SidebarNavLink href="/dashboard" className="bg-white/40 text-gray-900 font-semibold rounded-lg">
                            <Home className="h-5 w-5" />
                            Dashboard
                        </SidebarNavLink>
                        <SidebarNavLink href="/syllabus-tracker">
                             <ClipboardList className="h-5 w-5" />
                             Syllabus Tracker
                        </SidebarNavLink>
                        <SidebarNavLink href="/mock-tests">
                            <BookOpen className="h-5 w-5" />
                            Mock Tests
                        </SidebarNavLink>
                        <SidebarNavLink href="/pomodoro-timer">
                            <Clock className="h-5 w-5" />
                            Pomodoro Timer
                        </SidebarNavLink>
                        <SidebarNavLink href="/about-us">
                            <Info className="h-5 w-5" />
                            About Us
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
