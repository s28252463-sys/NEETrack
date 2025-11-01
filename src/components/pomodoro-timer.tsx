'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { CircularProgress } from '@/components/ui/circular-progress';
import { BrainCircuit, Coffee, Play, Pause, RotateCw, Settings, Volume2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type TimerMode = 'focus' | 'shortBreak' | 'longBreak';

const MODES: { [key in TimerMode]: { time: number; label: string; icon: React.ReactNode } } = {
  focus: { time: 25 * 60, label: 'Focus Time', icon: <BrainCircuit className="size-5" /> },
  shortBreak: { time: 5 * 60, label: 'Short Break', icon: <Coffee className="size-5" /> },
  longBreak: { time: 15 * 60, label: 'Long Break', icon: <Coffee className="size-5" /> },
};

const PomodoroTimer = () => {
  const [mode, setMode] = useState<TimerMode>('focus');
  const [time, setTime] = useState(MODES[mode].time);
  const [isActive, setIsActive] = useState(false);
  const [sessionCount, setSessionCount] = useState(0);

  useEffect(() => {
    setTime(MODES[mode].time);
    setIsActive(false);
  }, [mode]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      if (mode === 'focus') {
        setSessionCount((prev) => prev + 1);
        // After 4 focus sessions, take a long break
        if ((sessionCount + 1) % 4 === 0) {
          setMode('longBreak');
        } else {
          setMode('shortBreak');
        }
      } else {
        setMode('focus');
      }
      setIsActive(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, time, mode, sessionCount]);

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setTime(MODES[mode].time);
    setIsActive(false);
  };

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const progress = (MODES[mode].time - time) / MODES[mode].time * 100;

  const ModeButton = ({ targetMode, label, children }: { targetMode: TimerMode, label: string, children: React.ReactNode }) => (
    <Button
      variant="ghost"
      onClick={() => setMode(targetMode)}
      className={cn(
        'flex h-auto flex-col items-center justify-center gap-1 rounded-2xl p-3 text-sm font-normal text-white/70 transition-all',
        mode === targetMode ? 'bg-cyan-400/20 text-cyan-300' : 'bg-white/10'
      )}
    >
      {children}
      <span>{label}</span>
    </Button>
  );

  return (
    <div className="w-full max-w-sm rounded-3xl bg-gradient-to-br from-[#2a3a6b] to-[#1e2a53] p-6 text-white shadow-2xl">
      <header className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-cyan-400/20 p-2">
            <BrainCircuit className="size-6 text-cyan-300" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Focus Time</h1>
            <p className="text-sm text-white/60">Session {sessionCount + 1}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-white/70 hover:bg-white/20 hover:text-white">
            <Volume2 className="size-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white/70 hover:bg-white/20 hover:text-white">
            <Settings className="size-5" />
          </Button>
        </div>
      </header>

      <main className="my-10 flex flex-col items-center">
        <div className="relative flex size-56 items-center justify-center">
          <CircularProgress value={progress} size={224} strokeWidth={8} />
          <div className="absolute flex flex-col items-center">
            <span className="font-mono text-7xl font-bold tracking-tighter">
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </span>
            <p className="text-xs text-white/60">
              Click time to edit • {Math.floor(progress)}% Complete
            </p>
          </div>
        </div>
      </main>
      
      <div className="grid grid-cols-2 gap-4">
        <Button
          onClick={toggleTimer}
          className="h-16 rounded-2xl bg-cyan-400 text-lg font-bold text-slate-900 shadow-lg transition-all hover:bg-cyan-300"
        >
          {isActive ? <Pause className="size-8" /> : <Play className="size-8" />}
        </Button>
        <Button onClick={resetTimer} className="h-16 rounded-2xl bg-white/10 text-white/70 shadow-lg transition-all hover:bg-white/20">
          <RotateCw className="size-8" />
        </Button>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3">
        <ModeButton targetMode="focus" label="Focus Time">
          <BrainCircuit className="size-5" />
        </ModeButton>
        <ModeButton targetMode="shortBreak" label="Short Break">
          <Coffee className="size-5" />
        </ModeButton>
        <ModeButton targetMode="longBreak" label="Long Break">
          <Coffee className="size-5" />
        </Button>
      </div>
      
      <footer className="mt-6 flex items-center justify-center gap-2">
          <span className="text-sm text-white/60">Focus Sessions:</span>
          <div className="flex gap-1.5">
            {[...Array(4)].map((_, i) => (
              <div key={i} className={cn("size-2 rounded-full", i < sessionCount % 4 ? "bg-cyan-300" : "bg-white/20")}></div>
            ))}
          </div>
          <span className="ml-2 text-sm font-semibold text-white/80">{sessionCount}</span>
      </footer>
    </div>
  );
};

export default PomodoroTimer;
