'use client';

export const MandalaBackground = () => {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden bg-background">
            <svg 
                width="100%" 
                height="100%" 
                preserveAspectRatio="xMidYMid slice"
                className="opacity-70"
            >
                <defs>
                    <radialGradient id="artist-blue-glow" cx="20%" cy="20%" r="50%">
                        <stop offset="0%" stopColor="hsl(var(--primary) / 0.3)" />
                        <stop offset="100%" stopColor="hsl(var(--primary) / 0)" />
                    </radialGradient>
                    <radialGradient id="artist-pink-glow" cx="80%" cy="80%" r="60%">
                        <stop offset="0%" stopColor="hsl(var(--accent) / 0.25)" />
                        <stop offset="100%" stopColor="hsl(var(--accent) / 0)" />
                    </radialGradient>
                     <radialGradient id="artist-orange-glow" cx="50%" cy="50%" r="40%">
                        <stop offset="0%" stopColor="hsl(var(--secondary) / 0.2)" />
                        <stop offset="100%" stopColor="hsl(var(--secondary) / 0)" />
                    </radialGradient>
                </defs>

                <rect width="100%" height="100%" fill="url(#artist-blue-glow)" />
                <rect width="100%" height="100%" fill="url(#artist-pink-glow)" />
                <rect width="100%" height="100%" fill="url(#artist-orange-glow)" />
                
                {/* Intricate line art */}
                <g opacity="0.1" stroke="hsl(var(--primary) / 0.5)" strokeWidth="0.5">
                    <path d="M 600 0 C 400 200, 800 600, 600 800 S 800 200, 1000 0" fill="none" />
                    <path d="M 0 400 C 200 200, 600 600, 800 400 S 200 600, 0 800" fill="none" />
                     <circle cx="50%" cy="50%" r="150" fill="none" />
                     <circle cx="50%" cy="50%" r="250" fill="none" />
                     <circle cx="20%" cy="80%" r="100" fill="none" />
                     <circle cx="80%" cy="20%" r="120" fill="none" />
                </g>
            </svg>
        </div>
    )
}
