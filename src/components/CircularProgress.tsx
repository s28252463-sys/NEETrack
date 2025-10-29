'use client';

import { type TimerMode } from './PomodoroTimer';

interface CircularProgressProps {
    progress: number;
    mode: TimerMode;
}

export function CircularProgress({ progress, mode }: CircularProgressProps) {
    const strokeWidth = 10;
    const radius = 80;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;

    const color = {
        work: 'hsl(var(--primary))',
        shortBreak: 'hsl(var(--chart-2))', // Using a chart color for green
        longBreak: 'hsl(var(--accent))',
    }[mode];

    return (
        <svg className="w-full h-full" viewBox="0 0 200 200">
            <circle
                className="text-gray-200 dark:text-gray-700/50"
                stroke="currentColor"
                strokeWidth={strokeWidth}
                fill="transparent"
                r={radius}
                cx={100}
                cy={100}
            />
            <circle
                stroke={color}
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                fill="transparent"
                r={radius}
                cx={100}
                cy={100}
                style={{
                    transform: 'rotate(-90deg)',
                    transformOrigin: '50% 50%',
                    transition: 'stroke-dashoffset 0.3s ease-out, stroke 0.3s ease-out'
                }}
            />
        </svg>
    );
}
