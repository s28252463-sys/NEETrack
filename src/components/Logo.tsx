export function Logo() {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 160 50"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <defs>
        <path
          id="swoosh"
          d="M 50 48 Q 80 52, 110 48"
          strokeWidth="1.5"
          fill="none"
        />
      </defs>
      <g transform="translate(5, 0) scale(0.4)">
        {/* Green N-shape */}
        <path
          d="M60 90 L60 0 L100 0 L100 50 L140 50 L140 130 L100 130 L100 90 Z"
          fill="#8CC63F"
          transform="skewY(-20)"
        >
          {/* Shading for Green N */}
          <path d="M70 10 L60 0 L60 20 Z" fill="#679e27" />
          <path d="M130 140 L140 130 L120 130 Z" fill="#679e27" />
        </path>
        {/* Dark N-shape */}
        <path
          d="M160 40 L160 130 L120 130 L120 80 L80 80 L80 0 L120 0 L120 40 Z"
          fill="#2C3E50"
          transform="skewY(-20) translate(20, 0)"
        >
          {/* Shading for Dark N */}
          <path d="M90 10 L80 0 L80 20 Z" fill="#1e2a36" />
          <path d="M150 140 L160 130 L140 130 Z" fill="#1e2a36" />
        </path>

        {/* Small decorative triangles */}
        <path
          d="M45 10 L50 0 L40 0Z"
          fill="#8CC63F"
          transform="translate(18, 128)"
        />
        <path
          d="M205 10 L210 0 L200 0Z"
          fill="#2C3E50"
          transform="translate(-5, -30) rotate(180)"
        />
      </g>
      <text
        x="80"
        y="42"
        fontFamily="Poppins, sans-serif"
        fontSize="16"
        fontWeight="600"
        textAnchor="middle"
      >
        <tspan fill="#2C3E50">NEE</tspan>
        <tspan fill="#8CC63F">Track</tspan>
      </text>
      <use xlinkHref="#swoosh" stroke="#2C3E50" />
    </svg>
  );
}
