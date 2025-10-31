export function Logo() {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <g>
        {/* Stylized Letter N using three bars */}
        <path 
          d="M 20,90 L 20,10 L 40,10 L 80,90 L 60,90 L 40,50 L 40,90 Z" 
          fill="url(#logo-gradient)" 
        />
        <path 
          d="M 60,10 L 80,10 L 80,90 L 60,90 Z" 
          fill="hsl(var(--primary))"
        />
      </g>
    </svg>
  );
}
