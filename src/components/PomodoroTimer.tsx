'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Timer, Play, Pause, RefreshCw } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const WORK_DURATION = 25 * 60; // 25 minutes
const SHORT_BREAK_DURATION = 5 * 60; // 5 minutes
const LONG_BREAK_DURATION = 15 * 60; // 15 minutes

type TimerMode = 'work' | 'shortBreak' | 'longBreak';

export function PomodoroTimer() {
  const [mode, setMode] = useState<TimerMode>('work');
  const [timeRemaining, setTimeRemaining] = useState(WORK_DURATION);
  const [isActive, setIsActive] = useState(false);
  const [sessionCount, setSessionCount] = useState(0);

  const getDuration = useCallback((currentMode: TimerMode) => {
    switch (currentMode) {
      case 'work':
        return WORK_DURATION;
      case 'shortBreak':
        return SHORT_BREAK_DURATION;
      case 'longBreak':
        return LONG_BREAK_DURATION;
    }
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prevTime => prevTime - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      setIsActive(false);
      if (mode === 'work') {
        const newSessionCount = sessionCount + 1;
        setSessionCount(newSessionCount);
        const nextMode = newSessionCount % 4 === 0 ? 'longBreak' : 'shortBreak';
        setMode(nextMode);
        setTimeRemaining(getDuration(nextMode));
        // Optionally play a sound
        new Audio('https://www.soundjay.com/buttons/sounds/button-1.mp3').play();
      } else {
        setMode('work');
        setTimeRemaining(getDuration('work'));
         // Optionally play a sound
         new Audio('https://www.soundjay.com/buttons/sounds/button-2.mp3').play();
      }
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive, timeRemaining, mode, sessionCount, getDuration]);

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  const handleReset = useCallback(() => {
    setIsActive(false);
    setTimeRemaining(getDuration(mode));
  }, [mode, getDuration]);

  const handleModeChange = (newMode: TimerMode) => {
    setMode(newMode);
    setIsActive(false);
    setTimeRemaining(getDuration(newMode));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
         <div className="flex items-center gap-2">
            <Timer className="h-6 w-6 text-primary" />
            <CardTitle className="font-headline text-2xl">Pomodoro Timer</CardTitle>
        </div>
        <CardDescription>
            Focus on your studies with the Pomodoro technique.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center space-y-6">
        <Tabs value={mode} onValueChange={(value) => handleModeChange(value as TimerMode)} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="work">Work</TabsTrigger>
                <TabsTrigger value="shortBreak">Short Break</TabsTrigger>
                <TabsTrigger value="longBreak">Long Break</TabsTrigger>
            </TabsList>
        </Tabs>

        <div className="text-7xl font-bold font-mono text-primary tabular-nums">
          {formatTime(timeRemaining)}
        </div>
        <div className="flex items-center space-x-4">
          <Button onClick={handleToggle} className="w-28">
            {isActive ? <Pause className="mr-2" /> : <Play className="mr-2" />}
            {isActive ? 'Pause' : 'Start'}
          </Button>
          <Button onClick={handleReset} variant="outline">
            <RefreshCw className="mr-2" />
            Reset
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
            Completed sessions: <span className="font-bold">{sessionCount}</span>
        </p>
      </CardContent>
    </Card>
  );
}
