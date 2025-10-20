'use client';

import { useEffect, useState } from 'react';
import { getDailyQuote } from '@/app/actions';
import { Card, CardContent } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';
import { Skeleton } from './ui/skeleton';

export function MotivationalQuote() {
  const [quote, setQuote] = useState<{ quote: string; author: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // This ensures the rest of the code only runs on the client.
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const fetchQuote = async () => {
      // Use date string as key to fetch quote only once per day
      const today = new Date().toISOString().split('T')[0];
      const storedQuote = localStorage.getItem('dailyQuote');
      
      if (storedQuote) {
        const { date, data } = JSON.parse(storedQuote);
        if (date === today) {
          setQuote(data);
          setLoading(false);
          return;
        }
      }

      setLoading(true);
      const result = await getDailyQuote();
      if (result.success && result.quote) {
        const newQuote = { quote: result.quote, author: result.author || 'Anonymous' };
        setQuote(newQuote);
        localStorage.setItem('dailyQuote', JSON.stringify({ date: today, data: newQuote }));
      }
      setLoading(false);
    };

    fetchQuote();
  }, [isClient]);

  return (
    <Card className="bg-accent/20 border-accent/30 shadow-md">
      <CardContent className="p-6 flex items-start gap-4">
        <Lightbulb className="h-8 w-8 text-accent-foreground mt-1 flex-shrink-0" />
        {!isClient || loading ? (
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
