'use client';

import { CountdownTimer } from "@/components/countdown-timer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
    return (
        <div className="flex flex-col items-center justify-center h-full p-4">
            <div className="w-full max-w-4xl mx-auto">
                <CountdownTimer />
                <Card className="mt-8 bg-card/80 backdrop-blur-sm border-white/20 text-white">
                    <CardHeader>
                        <CardTitle>Quote of the Day</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <blockquote className="border-l-2 pl-6 italic">
                            "The journey of a thousand miles begins with a single step."
                        </blockquote>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
