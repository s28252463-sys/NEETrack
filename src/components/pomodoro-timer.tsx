'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { CircularProgress } from '@/components/ui/circular-progress';
import {
  BrainCircuit,
  Coffee,
  Play,
  Pause,
  RotateCw,
  Settings,
  Volume2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type TimerMode = 'focus' | 'shortBreak' | 'longBreak';

const PomodoroTimer = () => {
  const [timerModes, setTimerModes] = useState({
    focus: { time: 25 * 60, label: 'Focus Time', icon: <BrainCircuit className="size-5" /> },
    shortBreak: { time: 5 * 60, label: 'Short Break', icon: <Coffee className="size-5" /> },
    longBreak: { time: 15 * 60, label: 'Long Break', icon: <Coffee className="size-5" /> },
  });

  const [mode, setMode] = useState<TimerMode>('focus');
  const [time, setTime] = useState(timerModes[mode].time);
  const [isActive, setIsActive] = useState(false);
  const [sessionCount, setSessionCount] = useState(0);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  // State for settings form inputs
  const [settings, setSettings] = useState({
    focus: timerModes.focus.time / 60,
    shortBreak: timerModes.shortBreak.time / 60,
    longBreak: timerModes.longBreak.time / 60,
  });

  useEffect(() => {
    setTime(timerModes[mode].time);
    setIsActive(false);
  }, [mode, timerModes]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0 && isActive) {
      if (mode === 'focus') {
        setSessionCount((prev) => prev + 1);
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
    setTime(timerModes[mode].time);
    setIsActive(false);
  };

  const handleSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: Number(value) }));
  };
  
  const handleSaveSettings = () => {
    setTimerModes({
      focus: { ...timerModes.focus, time: settings.focus * 60 },
      shortBreak: { ...timerModes.shortBreak, time: settings.shortBreak * 60 },
      longBreak: { ...timerModes.longBreak, time: settings.longBreak * 60 },
    });
    setIsSettingsOpen(false);
  };


  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const progress = (timerModes[mode].time - time) / timerModes[mode].time * 100;

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
            <h1 className="text-xl font-bold">{timerModes[mode].label}</h1>
            <p className="text-sm text-white/60">Session {mode === 'focus' ? sessionCount + 1 : sessionCount}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-white/70 hover:bg-white/20 hover:text-white">
            <Volume2 className="size-5" />
          </Button>
           <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white/70 hover:bg-white/20 hover:text-white">
                <Settings className="size-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Timer Settings</DialogTitle>
                <DialogDescription>
                  Adjust the length of your timer sessions (in minutes).
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="focus" className="text-right">
                    Focus
                  </Label>
                  <Input
                    id="focus"
                    name="focus"
                    type="number"
                    value={settings.focus}
                    onChange={handleSettingsChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="shortBreak" className="text-right">
                    Short Break
                  </Label>
                  <Input
                    id="shortBreak"
                    name="shortBreak"
                    type="number"
                    value={settings.shortBreak}
                    onChange={handleSettingsChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="longBreak" className="text-right">
                    Long Break
                  </Label>
                  <Input
                    id="longBreak"
                    name="longBreak"
                    type="number"
                    value={settings.longBreak}
                    onChange={handleSettingsChange}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleSaveSettings}>Save Changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
              {Math.floor(progress)}% Complete
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
        <ModeButton targetMode="focus" label="Focus">
          <BrainCircuit className="size-5" />
        </ModeButton>
        <ModeButton targetMode="shortBreak" label="Short Break">
          <Coffee className="size-5" />
        </ModeButton>
        <ModeButton targetMode="longBreak" label="Long Break">
          <Coffee className="size-5" />
        </ModeButton>
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
