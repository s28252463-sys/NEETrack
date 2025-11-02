'use client';
import { useState } from 'react';
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
import { usePomodoro } from '@/context/pomodoro-context';

const PomodoroTimer = () => {
  const {
    mode,
    setMode,
    time,
    isActive,
    sessionCount,
    timerModes,
    toggleTimer,
    resetTimer,
    settings,
    handleSettingsChange,
    handleSaveSettings,
  } = usePomodoro();

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const progress = (timerModes[mode].time - time) / timerModes[mode].time * 100;

  const ModeButton = ({ targetMode, label, children }: { targetMode: 'focus' | 'shortBreak' | 'longBreak', label: string, children: React.ReactNode }) => (
    <Button
      variant="ghost"
      onClick={() => setMode(targetMode)}
      className={cn(
        'flex h-auto flex-col items-center justify-center gap-1 rounded-2xl p-3 text-sm font-normal text-foreground/70 transition-all',
        mode === targetMode ? 'bg-primary/20 text-primary' : 'bg-black/5'
      )}
    >
      {children}
      <span>{label}</span>
    </Button>
  );

  return (
    <div className="w-full max-w-sm rounded-3xl bg-card/60 p-6 text-foreground shadow-lg backdrop-blur-lg">
      <header className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-primary/20 p-2">
            <BrainCircuit className="size-6 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold">{timerModes[mode].label}</h1>
            <p className="text-sm text-muted-foreground">Session {mode === 'focus' ? sessionCount + 1 : sessionCount}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:bg-black/10 hover:text-foreground">
            <Volume2 className="size-5" />
          </Button>
           <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:bg-black/10 hover:text-foreground">
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
                <Button onClick={() => {
                  handleSaveSettings();
                  setIsSettingsOpen(false);
                }}>Save Changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <main className="my-10 flex flex-col items-center">
        <div className="relative flex size-56 items-center justify-center">
          <CircularProgress value={progress} size={224} strokeWidth={10} />
          <div className="absolute flex flex-col items-center">
            <span className="font-mono text-7xl font-bold tracking-tighter">
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </span>
            <p className="text-xs text-muted-foreground">
              {Math.floor(progress)}% Complete
            </p>
          </div>
        </div>
      </main>
      
      <div className="grid grid-cols-2 gap-4">
        <Button
          onClick={toggleTimer}
          className="h-16 rounded-2xl bg-primary text-lg font-bold text-primary-foreground shadow-lg transition-all hover:bg-primary/90"
        >
          {isActive ? <Pause className="size-8" /> : <Play className="size-8" />}
        </Button>
        <Button onClick={resetTimer} className="h-16 rounded-2xl bg-black/5 text-muted-foreground shadow-lg transition-all hover:bg-black/10">
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
          <span className="text-sm text-muted-foreground">Focus Sessions:</span>
          <div className="flex gap-1.5">
            {[...Array(4)].map((_, i) => (
              <div key={i} className={cn("size-2 rounded-full", i < sessionCount % 4 ? "bg-primary" : "bg-black/10")}></div>
            ))}
          </div>
          <span className="ml-2 text-sm font-semibold text-foreground/80">{sessionCount}</span>
      </footer>
    </div>
  );
};

export default PomodoroTimer;
