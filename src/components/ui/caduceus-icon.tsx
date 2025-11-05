import { cn } from '@/lib/utils';
import * as React from 'react';

export const CaduceusIcon = React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>(
  ({ className, ...props }, ref) => (
    <svg
      ref={ref}
      viewBox="0 0 200 300"
      className={cn('w-auto h-full', className)}
      {...props}
    >
      <defs>
        <linearGradient id="brush-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
          <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      <g>
        <path
          d="M 80 160 C 100 150, 120 170, 140 165 S 150 140, 130 130"
          fill="url(#brush-stroke)"
          stroke="none"
        />
        <path
          d="M 70 180 C 90 170, 110 190, 130 185 S 140 160, 120 150"
          fill="url(#brush-stroke)"
          stroke="none"
        />

        <g className="fill-current text-foreground/80">
          <line
            x1="100"
            y1="50"
            x2="100"
            y2="250"
            stroke="currentColor"
            strokeWidth="4"
          />
          <circle cx="100" cy="250" r="8" fill="currentColor" />
          <path
            d="M 100 240 Q 70 220 75 200 Q 80 180 100 170 Q 85 150 80 130 Q 75 110 100 90"
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <path
            d="M 100 240 Q 130 220 125 200 Q 120 180 100 170 Q 115 150 120 130 Q 125 110 100 90"
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <ellipse cx="75" cy="200" rx="6" ry="8" fill="currentColor" />
          <circle cx="73" cy="198" r="1.5" fill="hsl(var(--card))" />
          <ellipse cx="125" cy="200" rx="6" ry="8" fill="currentColor" />
          <circle cx="127" cy="198" r="1.5" fill="hsl(var(--card))" />
          <path
            d="M 100 80 Q 60 70 40 85 Q 30 95 45 100 Q 35 105 40 115 Q 50 120 70 110 Q 80 95 100 90"
            fill="currentColor"
            opacity="0.9"
          />
          <path
            d="M 100 80 Q 140 70 160 85 Q 170 95 155 100 Q 165 105 160 115 Q 150 120 130 110 Q 120 95 100 90"
            fill="currentColor"
            opacity="0.9"
          />
          <circle cx="100" cy="60" r="12" fill="currentColor" />
          <circle cx="97" cy="57" r="3" fill="hsl(var(--card))" opacity="0.6" />
        </g>
      </g>
    </svg>
  )
);

CaduceusIcon.displayName = 'CaduceusIcon';

    