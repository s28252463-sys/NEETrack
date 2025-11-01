'use client';

import { CountdownTimer } from "@/components/countdown-timer";

export default function DashboardPage() {
    return (
        <div className="flex flex-col items-center justify-center h-full p-4">
            <div className="w-full max-w-4xl mx-auto">
                <CountdownTimer />
            </div>
        </div>
    );
}
