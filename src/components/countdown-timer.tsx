'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CalendarIcon } from 'lucide-react';
import { formatDistanceToNowStrict, differenceInDays } from 'date-fns';

const TimeCard = ({ value, unit }: { value: string; unit: string }) => (
    <div className="bg-white/10 rounded-lg p-3 text-center">
        <div className="text-3xl font-bold">{value}</div>
        <div className="text-xs text-gray-300">{unit}</div>
    </div>
);

export function CountdownTimer() {
    const targetDate = new Date('2026-05-03T00:00:00');
    const totalDays = differenceInDays(targetDate, new Date('2024-10-25')); // Assuming start date for progress

    const calculateTimeLeft = () => {
        const difference = +targetDate - +new Date();
        let timeLeft = {
            days: '0',
            hours: '0',
            minutes: '0',
            seconds: '0',
        };

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)).toString(),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24).toString().padStart(2, '0'),
                minutes: Math.floor((difference / 1000 / 60) % 60).toString().padStart(2, '0'),
                seconds: Math.floor((difference / 1000) % 60).toString().padStart(2, '0'),
            };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    });

    const daysRemaining = parseInt(timeLeft.days, 10);
    const progress = totalDays > 0 ? ((totalDays - daysRemaining) / totalDays) * 100 : 0;

    return (
        <Card className="bg-card/80 backdrop-blur-sm border-white/20 text-white w-full max-w-sm mx-auto">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    Countdown to NEET UG
                </CardTitle>
                <CalendarIcon className="h-4 w-4 text-gray-300" />
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center">
                <div className="text-8xl font-bold text-cyan-300 my-4">{timeLeft.days}</div>
                <p className="text-sm text-gray-300 mb-6">
                    days remaining until May 3, 2026
                </p>
                <div className="grid grid-cols-3 gap-4 w-full mb-6">
                    <TimeCard value={timeLeft.hours} unit="Hours" />
                    <TimeCard value={timeLeft.minutes} unit="Minutes" />
                    <TimeCard value={timeLeft.seconds} unit="Seconds" />
                </div>
                <Progress value={progress} className="w-full h-2 bg-white/20 [&>div]:bg-cyan-400" />
            </CardContent>
        </Card>
    );
}
