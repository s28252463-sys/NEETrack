export function Header() {
  return (
    <header className="flex items-center justify-center py-6 bg-card border-b">
      <div className="container mx-auto flex items-center justify-center">
        <svg
          className="h-12 w-12 text-primary"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
            <path d="M12 2L14.39 8.36L21 9.27L15.55 14.47L17.21 21.02L12 17.77L6.79 21.02L8.45 14.47L3 9.27L9.61 8.36L12 2Z" fill="hsl(var(--accent))" stroke="hsl(var(--accent))" />
            <path d="M12 2L14.39 8.36L21 9.27L15.55 14.47L17.21 21.02L12 17.77L6.79 21.02L8.45 14.47L3 9.27L9.61 8.36L12 2Z" stroke="hsl(var(--primary))" strokeWidth="1" />
            <circle cx="12" cy="12" r="3" fill="hsl(var(--primary))" />
        </svg>
        <h1 className="ml-4 text-4xl font-headline font-bold text-gray-800 dark:text-gray-200">
          NEETrack
        </h1>
      </div>
    </header>
  );
}
