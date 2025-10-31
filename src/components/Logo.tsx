export function Logo() {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        {/* Green downward arrow shape */}
        <path
          d="M45 10 L45 70 L25 70 L50 95 L75 70 L55 70 L55 10 Z"
          fill="#8CC63F"
        />
        {/* Blue upward arrow shape */}
        <path
          d="M55 90 L55 30 L75 30 L50 5 L25 30 L45 30 L45 90 Z"
          fill="#2C3E50"
        />
      </g>
    </svg>
  );
}
