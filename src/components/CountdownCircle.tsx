'use client';

interface CountdownCircleProps {
    progress: number;
}

export function CountdownCircle({ progress }: CountdownCircleProps) {
    const strokeWidth = 12;
    const radius = 80;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;

    return (
        <svg className="w-full h-full" viewBox="0 0 200 200">
            {/* Background Circle */}
            <circle
                className="text-primary/10"
                stroke="currentColor"
                strokeWidth={strokeWidth}
                fill="transparent"
                r={radius}
                cx={100}
                cy={100}
            />
            {/* Progress Circle */}
            <circle
                className="text-primary"
                stroke="currentColor"
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
                    transition: 'stroke-dashoffset 0.5s ease-out'
                }}
            />
        </svg>
    );
}
