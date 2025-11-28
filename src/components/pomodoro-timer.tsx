'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { NebulaTimer } from '@/components/ui/nebula-timer';
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
  const progress =
    (timerModes[mode].time - time) / timerModes[mode].time * 100;

  const ModeButton = ({
    targetMode,
    label,
    children,
  }: {
    targetMode: 'focus' | 'shortBreak' | 'longBreak';
    label: string;
    children: React.ReactNode;
  }) => (
    <Button
      variant="ghost"
      onClick={() => setMode(targetMode)}
      className={cn(
        'h-auto flex-1 rounded-full py-2 px-4 text-sm font-medium transition-all',
        mode === targetMode
          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/50'
          : 'bg-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800'
      )}
    >
      <span className="flex items-center gap-2">
        {children}
        {label}
      </span>
    </Button>
  );

  return (
    <div className="w-full max-w-sm rounded-[2rem] bg-[#0f172a] p-6 text-slate-100 shadow-2xl shadow-black/50 border border-slate-800 relative overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-amber-500/10 p-2.5">
            <BrainCircuit className="size-6 text-amber-400" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-100">{timerModes[mode].label}</h1>
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">
              Session {mode === 'focus' ? sessionCount + 1 : sessionCount}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="text-slate-400 hover:bg-slate-800 hover:text-slate-100 rounded-full"
          >
            <Volume2 className="size-5" />
          </Button>
          <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-slate-400 hover:bg-slate-800 hover:text-slate-100 rounded-full"
              >
                <Settings className="size-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-[#0f172a] border-slate-800 text-slate-100" aria-describedby="timer-settings-desc" aria-labelledby="timer-settings-title">
              <DialogHeader>
                <DialogTitle id="timer-settings-title" className="text-amber-400">Timer Settings</DialogTitle>
                <DialogDescription id="timer-settings-desc" className="text-slate-400">
                  Adjust the length of your timer sessions (in minutes).
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="focus" className="text-right text-slate-300">
                    Focus
                  </Label>
                  <Input
                    id="focus"
                    name="focus"
                    type="number"
                    value={settings.focus}
                    onChange={handleSettingsChange}
                    className="col-span-3 bg-slate-900 border-slate-700 text-slate-100 focus-visible:ring-amber-500"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="shortBreak" className="text-right text-slate-300">
                    Short Break
                  </Label>
                  <Input
                    id="shortBreak"
                    name="shortBreak"
                    type="number"
                    value={settings.shortBreak}
                    onChange={handleSettingsChange}
                    className="col-span-3 bg-slate-900 border-slate-700 text-slate-100 focus-visible:ring-amber-500"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="longBreak" className="text-right text-slate-300">
                    Long Break
                  </Label>
                  <Input
                    id="longBreak"
                    name="longBreak"
                    type="number"
                    value={settings.longBreak}
                    onChange={handleSettingsChange}
                    className="col-span-3 bg-slate-900 border-slate-700 text-slate-100 focus-visible:ring-amber-500"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  onClick={() => {
                    handleSaveSettings();
                    setIsSettingsOpen(false);
                  }}
                  className="bg-amber-500 text-slate-900 hover:bg-amber-400"
                >
                  Save Changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      {/* Timer Display */}
      <main className="mb-12 flex flex-col items-center justify-center">
        <NebulaTimer value={progress} size={300}>
          <div className="flex flex-col items-center">
            <span className="font-sans text-7xl font-bold tracking-tight text-slate-50 drop-shadow-[0_0_15px_rgba(251,191,36,0.3)]">
              {String(minutes).padStart(2, '0')}:
              {String(seconds).padStart(2, '0')}
            </span>
            <p className="mt-2 text-sm font-medium text-slate-400">
              {Math.floor(progress)}% Complete
            </p>
          </div>
        </NebulaTimer>
      </main>

      {/* Controls */}
      <div className="flex items-center justify-center gap-8 mb-10">
        <div className="w-12" /> {/* Spacer for balance */}
        <Button
          onClick={toggleTimer}
          className="size-20 rounded-full bg-amber-400 text-slate-900 shadow-[0_0_20px_rgba(251,191,36,0.3)] transition-all hover:bg-amber-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(251,191,36,0.5)] flex items-center justify-center"
        >
          {isActive ? (
            <Pause className="size-8 fill-current" />
          ) : (
            <Play className="size-8 ml-1 fill-current" />
          )}
        </Button>
        <Button
          onClick={resetTimer}
          className="text-slate-500 hover:text-slate-300 hover:bg-transparent w-12"
          variant="ghost"
          size="icon"
        >
          <RotateCw className="size-6" />
        </Button>
      </div>

      {/* Footer / Mode Selectors */}
      <div className="flex justify-center items-center gap-2 bg-slate-900/50 p-1.5 rounded-full border border-slate-800">
        <ModeButton targetMode="focus" label="Focus">
          <BrainCircuit className="size-4" />
        </ModeButton>
        <ModeButton targetMode="shortBreak" label="Short">
          <Coffee className="size-4" />
        </ModeButton>
        <ModeButton targetMode="longBreak" label="Long">
          <Coffee className="size-4" />
        </ModeButton>
      </div>
    </div>
  );
};

export default PomodoroTimer;
