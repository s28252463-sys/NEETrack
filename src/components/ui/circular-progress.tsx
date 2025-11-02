'use client';
import * as React from 'react';
import { cn } from '@/lib/utils';

interface CircularProgressProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  gradientId?: string;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  size = 100,
  strokeWidth = 10,
  className,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  // Ensure offset doesn't go below 0
  const offset = Math.max(0, circumference - (value / 100) * circumference);
  const gradientId = React.useId();

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={cn('transform -rotate-90', className)}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor: '#34d399', stopOpacity: 1}} />
            <stop offset="50%" style={{stopColor: '#fde047', stopOpacity: 1}} />
            <stop offset="100%" style={{stopColor: '#f87171', stopOpacity: 1}} />
        </linearGradient>
      </defs>
      <circle
        className="text-muted/20"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        fill="transparent"
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
      <circle
        stroke={`url(#${gradientId})`}
        strokeWidth={strokeWidth}
        fill="transparent"
        strokeLinecap="round"
        r={radius}
        cx={size / 2}
        cy={size / 2}
        style={{
          strokeDasharray: circumference,
          strokeDashoffset: offset,
          transition: 'stroke-dashoffset 0.5s ease-in-out',
        }}
      />
    </svg>
  );
};
