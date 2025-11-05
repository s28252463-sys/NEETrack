'use client';

export const PomodoroBackground = () => (
  <div className="absolute inset-0 z-0 opacity-40">
    <svg
      className="w-full h-full"
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 1920 1080"
    >
      <defs>
        <radialGradient
          id="grad1"
          cx="50%"
          cy="50%"
          r="50%"
          fx="50%"
          fy="50%"
        >
          <stop offset="0%" style={{ stopColor: 'hsl(260, 100%, 70%)', stopOpacity: 0.15 }} />
          <stop offset="100%" style={{ stopColor: 'hsl(20, 14%, 4%)', stopOpacity: 0.15 }} />
        </radialGradient>
        <filter id="soft-glow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="30" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Main gradient background */}
      <rect width="1920" height="1080" fill="url(#grad1)" />

      {/* Abstract Shapes */}
      <g filter="url(#soft-glow)">
        {/* Large flowing shape 1 */}
        <path
          d="M -100 200 C 200 100, 400 400, 700 300 S 1000 0, 1300 200 S 1600 500, 2000 400 V 1080 H -100 Z"
          fill="hsla(340, 80%, 70%, 0.1)"
        />

        {/* Large flowing shape 2 */}
        <path
          d="M 2000 800 C 1700 900, 1500 600, 1200 700 S 900 1000, 600 800 S 300 500, -100 600 V 1080 H 2000 Z"
          fill="hsla(260, 100%, 80%, 0.1)"
        />
        
        {/* Subtle Circles/Orbs */}
        <circle cx="200" cy="800" r="150" fill="hsla(330, 100%, 70%, 0.1)" />
        <circle cx="1700" cy="250" r="200" fill="hsla(250, 100%, 75%, 0.12)" />
        <circle cx="1000" cy="600" r="100" fill="hsla(20, 14%, 4%, 0.2)" />
      </g>
    </svg>
  </div>
);
