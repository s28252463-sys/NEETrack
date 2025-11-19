'use client';
import * as React from 'react';

export const DashboardBackground = () => {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden bg-background">
            <svg viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg" className="h-full w-full object-cover">
                <defs>
                    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: 'hsl(var(--background))', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: 'hsl(240, 15%, 8%)', stopOpacity: 1 }} />
                    </linearGradient>

                    <radialGradient id="glowPrimary">
                    <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0.3 }} />
                    <stop offset="100%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0 }} />
                    </radialGradient>

                    <radialGradient id="glowAccent">
                    <stop offset="0%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 0.2 }} />
                    <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 0 }} />
                    </radialGradient>
                </defs>
                <rect width="1200" height="800" fill="url(#bgGradient)" />
                <circle cx="150" cy="120" r="250" fill="url(#glowPrimary)" opacity="0.5" />
                <circle cx="1050" cy="650" r="300" fill="url(#glowAccent)" opacity="0.6" />
                <circle cx="600" cy="400" r="200" fill="url(#glowPrimary)" opacity="0.3" />
                <g opacity="0.1">
                    <line x1="0" y1="200" x2="1200" y2="200" stroke="hsl(var(--border))" strokeWidth="0.5" />
                    <line x1="0" y1="400" x2="1200" y2="400" stroke="hsl(var(--border))" strokeWidth="0.5" />
                    <line x1="0" y1="600" x2="1200" y2="600" stroke="hsl(var(--border))" strokeWidth="0.5" />
                    <line x1="300" y1="0" x2="300" y2="800" stroke="hsl(var(--border))" strokeWidth="0.5" />
                    <line x1="600" y1="0" x2="600" y2="800" stroke="hsl(var(--border))" strokeWidth="0.5" />
                    <line x1="900" y1="0" x2="900" y2="800" stroke="hsl(var(--border))" strokeWidth="0.5" />
                </g>
            </svg>
        </div>
    );
};
