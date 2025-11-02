'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';
import { BrainCircuit, Coffee } from 'lucide-react';

type TimerMode = 'focus' | 'shortBreak' | 'longBreak';

interface TimerModeDetails {
  time: number;
  label: string;
  icon: JSX.Element;
}

interface PomodoroContextType {
  mode: TimerMode;
  setMode: Dispatch<SetStateAction<TimerMode>>;
  time: number;
  isActive: boolean;
  sessionCount: number;
  timerModes: Record<TimerMode, TimerModeDetails>;
  toggleTimer: () => void;
  resetTimer: () => void;
  settings: {
    focus: number;
    shortBreak: number;
    longBreak: number;
  };
  handleSettingsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSaveSettings: () => void;
}

const PomodoroContext = createContext<PomodoroContextType | undefined>(
  undefined
);

export const PomodoroProvider = ({ children }: { children: ReactNode }) => {
  const [timerModes, setTimerModes] = useState<Record<TimerMode, TimerModeDetails>>({
    focus: { time: 25 * 60, label: 'Focus Time', icon: <BrainCircuit className="size-5" /> },
    shortBreak: { time: 5 * 60, label: 'Short Break', icon: <Coffee className="size-5" /> },
    longBreak: { time: 15 * 60, label: 'Long Break', icon: <Coffee className="size-5" /> },
  });

  const [mode, setMode] = useState<TimerMode>('focus');
  const [time, setTime] = useState(timerModes[mode].time);
  const [isActive, setIsActive] = useState(false);
  const [sessionCount, setSessionCount] = useState(0);

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
    setSettings((prev) => ({ ...prev, [name]: Number(value) }));
  };

  const handleSaveSettings = () => {
    const newTimerModes = {
      focus: { ...timerModes.focus, time: settings.focus * 60 },
      shortBreak: { ...timerModes.shortBreak, time: settings.shortBreak * 60 },
      longBreak: { ...timerModes.longBreak, time: settings.longBreak * 60 },
    };
    setTimerModes(newTimerModes);
    // If the currently active mode's time was changed, update the timer
    if (!isActive) {
        setTime(newTimerModes[mode].time);
    }
  };

  return (
    <PomodoroContext.Provider
      value={{
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
      }}
    >
      {children}
    </PomodoroContext.Provider>
  );
};

export const usePomodoro = () => {
  const context = useContext(PomodoroContext);
  if (context === undefined) {
    throw new Error('usePomodoro must be used within a PomodoroProvider');
  }
  return context;
};
