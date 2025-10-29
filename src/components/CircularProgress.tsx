'use client';

interface CircularProgressProps {
    progress: number;
}

export function CircularProgress({ progress }: CircularProgressProps) {
    const strokeWidth = 10;
    const radius = 80;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;

    return (
        <svg className="w-full h-full" viewBox="0 0 200 200">
            <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4fd1c5" />
                    <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
            </defs>
            <circle
                className="text-gray-200 dark:text-gray-700"
                stroke="currentColor"
                strokeWidth={strokeWidth}
                fill="transparent"
                r={radius}
                cx={100}
                cy={100}
            />
            <circle
                stroke="url(#progressGradient)"
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
                    transition: 'stroke-dashoffset 0.3s ease-out'
                }}
            />
        </svg>
    );
}
