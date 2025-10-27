'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Quote } from 'lucide-react';
import { motivationalQuotes } from '@/lib/quotes';

export function MotivationalQuote() {
  const [quote, setQuote] = useState<{ quote: string; author: string } | null>(null);

  useEffect(() => {
    const today = new Date();
    const startOfYear = new Date(today.getFullYear(), 0, 0);
    const diff = today.getTime() - startOfYear.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    
    const quoteIndex = dayOfYear % motivationalQuotes.length;
    setQuote(motivationalQuotes[quoteIndex]);
  }, []);

  if (!quote) {
    return null;
  }

  return (
    <Card className="bg-gradient-to-br from-primary/80 to-accent/70 text-primary-foreground border-none shadow-xl">
      <CardContent className="p-6 relative">
        <Quote className="absolute top-4 left-4 h-10 w-10 text-white/20" />
        <div className="relative z-10 text-center pt-8">
            <blockquote className="text-xl font-semibold italic tracking-wide">
              “{quote.quote}”
            </blockquote>
            <p className="text-right text-sm font-medium text-white/80 mt-4">— {quote.author}</p>
        </div>
         <Quote className="absolute bottom-4 right-4 h-10 w-10 text-white/20 transform rotate-180" />
      </CardContent>
    </Card>
  );
}
