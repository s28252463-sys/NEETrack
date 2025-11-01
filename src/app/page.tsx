"use client";
import { useEffect } from 'react';
import { redirect } from 'next/navigation';

export default function Home() {
  useEffect(() => {
    redirect('/dashboard');
  }, []);

  return (
    <div className="flex h-screen items-center justify-center bg-background text-foreground">
      <p>Loading...</p>
    </div>
  );
}
