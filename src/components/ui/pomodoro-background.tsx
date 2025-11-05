'use client';

import { usePomodoro } from '@/context/pomodoro-context';

export const PomodoroBackground = () => {
  const { mode } = usePomodoro();

  // Define SVG gradients for different modes
  const gradients = {
    focus: {
      id: 'focus-gradient',
      startColor: 'hsl(var(--primary) / 0.1)',
      endColor: 'hsl(var(--primary) / 0)',
    },
    shortBreak: {
      id: 'short-break-gradient',
      startColor: 'hsl(var(--accent) / 0.1)',
      endColor: 'hsl(var(--accent) / 0)',
    },
    longBreak: {
      id: 'long-break-gradient',
      startColor: 'hsl(var(--accent) / 0.15)',
      endColor: 'hsl(var(--accent) / 0)',
    },
  };

  const currentGradient = gradients[mode];

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <svg
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid slice"
        className="opacity-50"
      >
        <defs>
          <radialGradient
            id={currentGradient.id}
            cx="50%"
            cy="50%"
            r="50%"
            fx="50%"
            fy="50%"
          >
            <stop offset="0%" stopColor={currentGradient.startColor} />
            <stop offset="100%" stopColor={currentGradient.endColor} />
          </radialGradient>
        </defs>

        <rect width="100%" height="100%" fill={`url(#${currentGradient.id})`} />
      </svg>
    </div>
  );
};
