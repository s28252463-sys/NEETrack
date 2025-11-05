'use client';

export const MeadowBackground = () => {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden bg-background">
            <svg 
                width="100%" 
                height="100%" 
                preserveAspectRatio="xMidYMid slice"
                className="opacity-80"
            >
                <defs>
                    <radialGradient id="sky-gradient" cx="50%" cy="0%" r="70%" fx="50%" fy="0%">
                        <stop offset="0%" stopColor="hsl(140, 70%, 85%)" stopOpacity="0.7" />
                        <stop offset="100%" stopColor="hsl(100, 70%, 92%)" stopOpacity="0.3" />
                    </radialGradient>
                    <linearGradient id="grass-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="hsl(100, 70%, 92%)" />
                        <stop offset="60%" stopColor="hsl(110, 60%, 80%)" />
                        <stop offset="100%" stopColor="hsl(120, 50%, 70%)" />
                    </linearGradient>
                </defs>

                <rect width="100%" height="100%" fill="url(#sky-gradient)" />
                <rect y="30%" width="100%" height="70%" fill="url(#grass-gradient)" />

                {/* Flowers */}
                <g fill="hsl(45, 100%, 75%)" opacity="0.8">
                    {[...Array(30)].map((_, i) => (
                        <circle 
                            key={`f1-${i}`}
                            cx={`${Math.random() * 100}%`}
                            cy={`${60 + Math.random() * 40}%`}
                            r={`${2 + Math.random() * 4}`}
                        />
                    ))}
                </g>
                <g fill="hsl(0, 0%, 100%)" opacity="0.7">
                    {[...Array(40)].map((_, i) => (
                        <circle 
                            key={`f2-${i}`}
                            cx={`${Math.random() * 100}%`}
                            cy={`${65 + Math.random() * 35}%`}
                            r={`${1 + Math.random() * 3}`}
                        />
                    ))}
                </g>
                 <g fill="hsl(30, 100%, 80%)" opacity="0.7">
                    {[...Array(20)].map((_, i) => (
                        <circle 
                            key={`f3-${i}`}
                            cx={`${Math.random() * 100}%`}
                            cy={`${70 + Math.random() * 30}%`}
                            r={`${1 + Math.random() * 2}`}
                        />
                    ))}
                </g>
            </svg>
        </div>
    )
}
