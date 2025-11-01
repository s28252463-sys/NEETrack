import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarHeaderTitle,
    SidebarNav,
    SidebarNavLink,
    SidebarFooter,
} from "@/components/ui/sidebar";
import { Home, Package2 } from "lucide-react";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex">
            <Sidebar>
                <SidebarHeader>
                    <Package2 />
                    <SidebarHeaderTitle>My App</SidebarHeaderTitle>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarNav>
                        <SidebarNavLink href="/dashboard">
                            <Home />
                            Dashboard
                        </SidebarNavLink>
                    </SidebarNav>
                </SidebarContent>
                <SidebarFooter />
            </Sidebar>
            <main className="flex-1 p-4">
                {children}
            </main>
        </div>
    );
}
