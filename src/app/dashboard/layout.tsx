export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen bg-background text-foreground">
            <div className="w-64 flex-shrink-0 border-r bg-card">
                <div className="flex h-16 items-center border-b px-4">
                    <h2 className="text-lg font-semibold">NEATrack</h2>
                </div>
                <div className="p-4">
                    <p>Sidebar</p>
                </div>
            </div>
            <main className="flex-1 overflow-y-auto p-4">
                {children}
            </main>
        </div>
    );
}
