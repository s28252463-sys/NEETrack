export function Header() {
  return (
    <header className="flex items-center justify-center py-4 bg-card border-b">
      <div className="container mx-auto flex items-center justify-center">
        <svg
          className="h-16"
          viewBox="0 0 200 60"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{stopColor: 'hsl(var(--primary))', stopOpacity:1}} />
              <stop offset="100%" style={{stopColor: 'hsl(var(--accent))', stopOpacity:1}} />
            </linearGradient>
          </defs>
          <path 
            d="M 10 30 a 20 20 0 1 0 40 0 a 20 20 0 1 0 -40 0" 
            fill="url(#grad1)" 
          />
          <circle cx="30" cy="30" r="8" fill="white" />
          <path 
            d="M 30 22 a 8 8 0 0 1 0 16"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
          />
           <text 
            x="65" 
            y="38" 
            fontFamily="Poppins, sans-serif" 
            fontSize="28" 
            fontWeight="bold" 
            fill="hsl(var(--foreground))"
            >
            NEETrack
          </text>
        </svg>
      </div>
    </header>
  );
}
