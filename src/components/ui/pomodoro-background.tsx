'use client';

export const PomodoroBackground = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-background">
      <svg
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid slice"
        className="opacity-20"
      >
        <defs>
          <radialGradient
            id="serenity-bg-gradient"
            cx="50%"
            cy="50%"
            r="50%"
            fx="50%"
            fy="50%"
          >
            <stop offset="0%" stopColor="hsl(var(--primary) / 0.15)" />
            <stop offset="100%" stopColor="hsl(var(--background) / 0)" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#serenity-bg-gradient)" />
      </svg>
    </div>
  );
};
