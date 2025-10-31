export function Logo() {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 100 125" // Adjusted viewBox for the text
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
        {/* Stylized Letter N */}
        <path
          d="M 20,80 L 20,0 L 40,0 L 80,80 L 60,80 L 40,40 L 40,80 Z"
          fill="url(#logo-gradient)"
        />
        <path
          d="M 60,0 L 80,0 L 80,80 L 60,80 Z"
          fill="hsl(var(--primary))"
        />
      </g>
       {/* App Name Text */}
      <text 
        x="50" 
        y="110" 
        fontFamily="Poppins, sans-serif"
        fontSize="24" 
        fontWeight="600"
        fill="hsl(var(--foreground))"
        textAnchor="middle"
      >
        NEETrack
      </text>
    </svg>
  );
}
