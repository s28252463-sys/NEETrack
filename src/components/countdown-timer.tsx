'use client';

import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ hours: 0, minutes: 0, seconds: 0 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // This ensures the component only renders and runs logic on the client
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) {
      return; // Don't run the timer logic on the server
    }

    const calculateTimeLeft = () => {
      const now = new Date();
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999); // Set to the last millisecond of the current day

      const difference = endOfDay.getTime() - now.getTime();

      if (difference > 0) {
        const hours = Math.floor((difference / (1000 * 60 * 60)));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        return { hours, minutes, seconds };
      }
      
      return { hours: 0, minutes: 0, seconds: 0 };
    };
    
    // Set initial value
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [isClient]); 

  if (!isClient) {
    // Show a loading state or placeholder on the server
    return (
        <div className="w-full max-w-lg rounded-2xl bg-card/80 p-6 shadow-lg backdrop-blur-md border border-border/30">
            <div className="flex items-center justify-between text-card-foreground/80">
                <h2 className="font-semibold">Time Remaining Today</h2>
                <Clock className="h-5 w-5" />
            </div>
            <div className="my-6 text-center">
                <p className="text-4xl md:text-5xl font-bold text-primary drop-shadow-[0_0_10px_rgba(235,123,91,0.5)]">
                  --:--:--
                </p>
                <p className="text-sm text-muted-foreground">
                  Loading...
                </p>
            </div>
        </div>
    );
  }

  const TimeBox = ({ value, unit }: { value: number; unit: string }) => (
    <div className="flex flex-col items-center justify-center rounded-lg bg-black/5 p-4">
      <p className="text-5xl font-bold text-foreground">{String(value).padStart(2, '0')}</p>
      <p className="text-sm text-muted-foreground">{unit}</p>
    </div>
  );

  return (
    <div className="w-full h-full flex flex-col justify-between max-w-2xl rounded-2xl bg-card/80 p-6 shadow-lg backdrop-blur-md border border-border/30">
      <div className="flex items-center justify-between text-card-foreground/80">
        <h2 className="font-semibold">Time Remaining Today</h2>
        <Clock className="h-5 w-5" />
      </div>
      <div className="my-6 grid grid-cols-3 gap-4">
        <TimeBox value={timeLeft.hours} unit="Hours" />
        <TimeBox value={timeLeft.minutes} unit="Minutes" />
        <TimeBox value={timeLeft.seconds} unit="Seconds" />
      </div>
    </div>
  );
};

export default CountdownTimer;
