import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col h-screen bg-gradient-to-br from-[#1e1c3a] to-[#2a2850]">
            <header className="p-4">
                <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6 text-white" />
                </Button>
            </header>
            <main className="flex-1 overflow-y-auto p-4">
                {children}
            </main>
        </div>
    );
}
