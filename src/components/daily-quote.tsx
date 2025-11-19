'use client';

import { useState, useEffect } from 'react';
import { Quote as QuoteIcon } from 'lucide-react';

const quotes = [
  "The secret of getting ahead is getting started.",
  "Believe you can and you're halfway there.",
  "It does not matter how slowly you go as long as you do not stop.",
  "The will to win, the desire to succeed, the urge to reach your full potential... these are the keys that will unlock the door to personal excellence.",
  "Success is not final, failure is not fatal: it is the courage to continue that counts.",
  "The future belongs to those who believe in the beauty of their dreams.",
  "Don't watch the clock; do what it does. Keep going.",
  "The only way to do great work is to love what you do.",
  "Success is the sum of small efforts, repeated day in and day out.",
  "The expert in anything was once a beginner."
];

const DailyQuote = () => {
  const [quote, setQuote] = useState({ text: '', author: '' });

  useEffect(() => {
    // Determine the day of the year to select a consistent daily quote
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = (now.getTime() - start.getTime()) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
    const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    // Select a quote based on the day of the year
    const quoteIndex = dayOfYear % quotes.length;
    const selectedQuote = quotes[quoteIndex];
    
    // For this example, author is unknown. You could add authors to the quotes array.
    setQuote({ text: selectedQuote, author: 'Unknown' });

  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-between rounded-2xl bg-card/80 p-6 shadow-lg backdrop-blur-md border border-border/30 md:col-span-2 lg:col-span-1">
      <div className="flex items-center justify-between text-card-foreground/80">
        <h2 className="font-semibold text-lg">Quote of the Day</h2>
        <QuoteIcon className="h-5 w-5" />
      </div>
      <div className="my-6 flex-grow flex flex-col items-center justify-center text-center">
        <blockquote className="text-xl italic font-medium text-foreground">
          “{quote.text}”
        </blockquote>
      </div>
    </div>
  );
};

export default DailyQuote;
