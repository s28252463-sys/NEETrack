import * as React from "react"
import { cn } from "@/lib/utils"

const Logo = React.forwardRef<
    SVGSVGElement,
    React.SVGProps<SVGSVGElement>
>(({ className, ...props }, ref) => (
    <svg
      ref={ref}
      viewBox="0 0 250 150"
      className={cn("w-auto h-10", className)}
      {...props}
    >
      <defs>
        <clipPath id="clip-n">
          <path d="M40 100 V10 H60 L100 80 V100 H80 L40 30 V100 Z" />
        </clipPath>
      </defs>

      {/* Stylized N */}
      <g>
        {/* Left downward arrow (green) */}
        <path
          d="M40 100 V10 H60 L100 80 V100 H80 L40 30 V100 Z"
          fill="#52B338"
        />
        <path
          d="M30 90 L50 110 L70 90 Z"
          fill="#52B338"
        />
        
        {/* Right upward arrow (blue) */}
        <path
          d="M100 100 V10 H120 L80 80 V100 H100 Z"
          fill="#1E4671"
          transform="translate(40, 0)"
        />
        <path
          d="M110 20 L130 0 L150 20 Z"
          fill="#1E4671"
        />
      </g>
      
      {/* Text */}
      <text
        x="50%"
        y="125"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="30"
        fontWeight="bold"
        fontFamily="Arial, sans-serif"
      >
        <tspan fill="#1E4671">NEE</tspan>
        <tspan fill="#52B338">Track</tspan>
      </text>
      
      {/* Underline */}
      <path
        d="M60 138 Q125 148 190 138"
        stroke="#1E4671"
        strokeWidth="3"
        fill="none"
      />
    </svg>
));
Logo.displayName = "Logo";

export { Logo };
