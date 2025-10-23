'use client';

import { useEffect, useState } from 'react';
import { getDailyQuoteAction } from '@/app/actions';
import { Card, CardContent } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';
import { Skeleton } from './ui/skeleton';

export function MotivationalQuote() {
  const [quote, setQuote] = useState<{ quote: string; author: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuote = async () => {
      // Use date string as key to fetch quote only once per day
      const today = new Date().toISOString().split('T')[0];
      const storedQuote = localStorage.getItem('dailyQuote');
      
      if (storedQuote) {
        try {
          const { date, data } = JSON.parse(storedQuote);
          if (date === today && data) {
            setQuote(data);
            setLoading(false);
            return;
          }
        } catch (e) {
          // Invalid JSON in localStorage, fetch new quote
          localStorage.removeItem('dailyQuote');
        }
      }

      // If no valid quote in storage, fetch a new one
      const result = await getDailyQuoteAction();
      if (result.success && result.quote) {
        const newQuote = { quote: result.quote, author: result.author || 'Anonymous' };
        setQuote(newQuote);
        localStorage.setItem('dailyQuote', JSON.stringify({ date: today, data: newQuote }));
      }
      setLoading(false);
    };

    fetchQuote();
    // The empty dependency array [] ensures this effect runs only once on the client, after mount.
  }, []);

  return (
    <Card className="bg-accent/20 border-accent/30 shadow-md">
      <CardContent className="p-6 flex items-start gap-4">
        <Lightbulb className="h-8 w-8 text-accent-foreground mt-1 flex-shrink-0" />
        {loading ? (
          <div className="space-y-2 flex-grow">
            <Skeleton className="h-5 w-4/5" />
            <Skeleton className="h-4 w-1/4" />
          </div>
        ) : quote ? (
          <div className="flex-grow">
            <blockquote className="text-lg font-medium text-accent-foreground">
              “{quote.quote}”
            </blockquote>
            <p className="text-right text-sm text-muted-foreground mt-2">— {quote.author}</p>
          </div>
        ) : (
          <p className="text-muted-foreground">Could not load a quote today. Keep pushing forward!</p>
        )}
      </CardContent>
    </Card>
  );
}
