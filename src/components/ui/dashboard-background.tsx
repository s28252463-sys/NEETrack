'use client';
import * as React from 'react';

export const DashboardBackground = () => {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden bg-background">
            <svg viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg" className="h-full w-full object-cover">
                <defs>
                    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#0f0f23', stopOpacity: 1 }} />
                    <stop offset="30%" style={{ stopColor: '#1a1535', stopOpacity: 1 }} />
                    <stop offset="70%" style={{ stopColor: '#0d1b2a', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#0a192f', stopOpacity: 1 }} />
                    </linearGradient>

                    <radialGradient id="glowBlue">
                    <stop offset="0%" style={{ stopColor: '#00d9ff', stopOpacity: 0.4 }} />
                    <stop offset="100%" style={{ stopColor: '#00d9ff', stopOpacity: 0 }} />
                    </radialGradient>

                    <radialGradient id="glowPink">
                    <stop offset="0%" style={{ stopColor: '#ff00ff', stopOpacity: 0.35 }} />
                    <stop offset="100%" style={{ stopColor: '#ff00ff', stopOpacity: 0 }} />
                    </radialGradient>

                    <radialGradient id="glowGreen">
                    <stop offset="0%" style={{ stopColor: '#00ff88', stopOpacity: 0.3 }} />
                    <stop offset="100%" style={{ stopColor: '#00ff88', stopOpacity: 0 }} />
                    </radialGradient>
                </defs>
                <rect width="1200" height="800" fill="url(#bgGradient)" />
                <circle cx="150" cy="120" r="180" fill="url(#glowBlue)" />
                <circle cx="1050" cy="650" r="200" fill="url(#glowPink)" />
                <circle cx="600" cy="400" r="150" fill="url(#glowGreen)" />
                <circle cx="900" cy="200" r="120" fill="url(#glowBlue)" />
                <circle cx="300" cy="650" r="140" fill="url(#glowPink)" />
                <g opacity="0.05">
                    <line x1="0" y1="200" x2="1200" y2="200" stroke="#00d9ff" strokeWidth="0.5" />
                    <line x1="0" y1="400" x2="1200" y2="400" stroke="#00d9ff" strokeWidth="0.5" />
                    <line x1="0" y1="600" x2="1200" y2="600" stroke="#00d9ff" strokeWidth="0.5" />
                    <line x1="300" y1="0" x2="300" y2="800" stroke="#00d9ff" strokeWidth="0.5" />
                    <line x1="600" y1="0" x2="600" y2="800" stroke="#00d9ff" strokeWidth="0.5" />
                    <line x1="900" y1="0" x2="900" y2="800" stroke="#00d9ff" strokeWidth="0.5" />
                </g>
            </svg>
        </div>
    );
};
