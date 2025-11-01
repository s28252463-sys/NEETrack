'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Settings, Coffee, Brain, Volume2, VolumeX, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type TimerMode = 'focus' | 'shortBreak' | 'longBreak';

interface FocusSession {
  date: string; // YYYY-MM-DD format
  minutes: number;
}

const modeConfig = {
  focus: {
    label: 'Focus Time',
    icon: Brain,
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'from-blue-500/20 to-cyan-500/20',
    defaultMinutes: 25,
  },
  shortBreak: {
    label: 'Short Break',
    icon: Coffee,
    color: 'from-green-500 to-emerald-500',
    bgColor: 'from-green-500/20 to-emerald-500/20',
    defaultMinutes: 5,
  },
  longBreak: {
    label: 'Long Break',
    icon: Coffee,
    color: 'from-purple-500 to-pink-500',
    bgColor: 'from-purple-500/20 to-pink-500/20',
    defaultMinutes: 15,
  },
};

export function PomodoroTimer() {
  const [mode, setMode] = useState<TimerMode>('focus');
  const [timeLeft, setTimeLeft] = useState(modeConfig.focus.defaultMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editMinutes, setEditMinutes] = useState('25');
  const [editSeconds, setEditSeconds] = useState('00');
  const [settings, setSettings] = useState({
    focus: 25,
    shortBreak: 5,
    longBreak: 15,
  });
  const [focusHistory, setFocusHistory] = useState<FocusSession[]>([]);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const initialTimeRef = useRef(modeConfig.focus.defaultMinutes * 60);
  const sessionStartTimeRef = useRef(initialTimeRef.current);

  const config = modeConfig[mode];
  const ModeIcon = config.icon;
  const totalTime = initialTimeRef.current;
  const progress = (timeLeft / totalTime) * 100;

  // Load focus history from localStorage on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = localStorage.getItem('pomodoroFocusHistory');
    if (stored) {
      try {
        setFocusHistory(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse focus history', e);
      }
    }
  }, []);

  // Save focus history to localStorage whenever it changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (focusHistory.length > 0) {
      localStorage.setItem('pomodoroFocusHistory', JSON.stringify(focusHistory));
    }
  }, [focusHistory]);

  // Get weekly data for chart
  const getWeeklyData = () => {
    const today = new Date();
    const weekData = [];
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
      const totalMinutes = focusHistory
        .filter(session => session.date === dateStr)
        .reduce((sum, session) => sum + session.minutes, 0);
      
      weekData.push({
        day: dayName,
        minutes: totalMinutes,
        hours: Math.round((totalMinutes / 60) * 10) / 10,
      });
    }
    
    return weekData;
  };

  const weeklyData = getWeeklyData();
  const totalWeekMinutes = weeklyData.reduce((sum, day) => sum + day.minutes, 0);
  const totalWeekHours = Math.floor(totalWeekMinutes / 60);
  const totalWeekRemainingMins = totalWeekMinutes % 60;

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleTimerComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft]);

  const handleTimerComplete = () => {
    setIsRunning(false);
    if (soundEnabled) {
      // Play completion sound (browser notification sound)
      const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjWJ0fPTgjMGHm7A7+OZTA8PVqzn77BdGAg+mdr0xnMlBS1+zPLaizsIHGm98OScTgwRYrru8qJPDw9esuXwrV0XCDyY2PTAfCgFKHvJ8dOAPQkaa7nt4pZLDRNmvOvvn1EOEWGz6O6kUBELSpne9L9tJAUrf9Hx04I8ByJ2xO3eliQMFWm679yWTA4PWq3n8apWFgk7l9r0w3ElBSt8y/HZijwIG2u77uKWTA0TZrzr759REhFht+rurVQPDEub3vS/byMFLIDQ8dWFOgchasTt3pYkDBZrvO/clkwOD1ut5/GrVhYJO5jb9MNxJQUsfc3y2Ik7CBtrvO7jl0wNE2a86/CfUBETYbfr7q5UDwxLm9/0wG4jBSyA0fHVhjsHIWrE7d6WJAwVa7zv3JZMDg9brufxq1YWCTuY2/TDcSUFLH3N8tiJOwgba7zu5JdMDRNmvOvwn1ARFGCz6u6uVA4MS5vf9MBuIwUsgNHx1YY7ByFqxO3eliQMFWu979yWTA4PWq3n8atWFQk7mNv0w3ElBSx9zfLYiTsIG2u87uSXTA0TZbzr8J9QERRgs+rurVQODEub3/TAbiMFLIDR8dWGOwchasLt3pYkDBVrvO/clkwOD1qt5/GrVhYJO5jb9MNxJQUsfc3y2Ik7CBtrvO7kl0wNE2W86/CfUBEUYLPq7q1UDgxLm9/0wG4jBSyA0fHVhjsHIWrC7d6WJAwVa7zv3JZMDg9arufxq1YWCTuY2/TDcSUFLH3N8tiJOwgba7zu5JdMDRNlvOvwn1ARFGCz6u6tVA4MS5vf9MBuIwUsgNHx1YY7ByFqwu3eliQMFWu879yWTA4PWq3n8atWFgk7mNv0w3ElBSx9zfLYiTsIG2u87uSXTA0TZbzr8J9QERRgs+rurVQODEub3/TAbiMFLIDR8dWGOwchasLt3pYkDBVrvO/clkwOD1qt5/GrVhYJO5jb9MNxJQUsfc3y2Ik7CBtrvO7kl0wNE2W86/CfUBEUYLPq7q1UDgxLm9/0wG4jBSyA0fHVhjsHIWrC7d6WJAwVa7zv3JZMDg9arufxq1YWCTuY2/TDcSUFLH3N8tiJOwgba7zu5JdMDRNlvOvwn1ARFGCz6u6tVA4MS5vf9MBuIwUsgNHx1YY7ByFqwu3eliQMFWu879yWTA4PWq3n8atWFgk7mNv0w3ElBSx9zfLYiTsIG2u87uSXTA0TZbzr8J9QERRgs+rurVQODEub3/TAbiMFLIDR8dWGOwchasLt3pYkDBVrvO/clkwOD1qt5/GrVhYJO5jb9MNxJQUsfc3y2Ik7CBtrvO7kl0wNE2W86/CfUBEUYLPq7q1UDgxLm9/0wG4jBSyA0fHVhjsHIWrC7d6WJAwVa7zv3JZMDg9arufxq1YWCTuY2/TDcSUFLH3N8tiJOwgba7zu5JdMDRNlvOvwn1ARFGCz6u6tVA4MS5vf9MBuIwUsgNHx1YY7ByFqwu3eliQMFWu879yWTA4PWq3n8atWFgk7mNv0w3ElBSx9zfLYiTsIG2u87uSXTA0TZbzr8J9QERRgs+rurVQODEub3/TAbiMFLIDR8dWGOwchasLt3pYkDBVrvO/clkwOD1qt5/GrVhYJO5jb9MNxJQUsfc3y2Ik7CBtrvO7kl0wNE2W86/CfUBEUYLPq7q1UDgxLm9/0wG4jBSyA0fHVhjsHIWrC7d6WJAwVa7zv3JZMDg9arufxq1YWCTuY2/TDcSUFLH3N8tiJOwgba7zu5JdMDRNlvOvwn1ARFGCz6u6tVA4=');
      audio.play().catch(() => {});
    }
    
    if (mode === 'focus') {
      // Record completed focus session
      const completedMinutes = Math.round((sessionStartTimeRef.current - timeLeft) / 60);
      if (completedMinutes > 0) {
        const today = new Date().toISOString().split('T')[0];
        setFocusHistory(prev => {
          const existingIndex = prev.findIndex(session => session.date === today);
          if (existingIndex >= 0) {
            const updated = [...prev];
            updated[existingIndex] = {
              ...updated[existingIndex],
              minutes: updated[existingIndex].minutes + completedMinutes
            };
            return updated;
          } else {
            return [...prev, { date: today, minutes: completedMinutes }];
          }
        });
      }
      
      const newSessions = sessionsCompleted + 1;
      setSessionsCompleted(newSessions);
      
      // After 4 focus sessions, suggest long break
      if (newSessions % 4 === 0) {
        switchMode('longBreak');
      } else {
        switchMode('shortBreak');
      }
    } else {
      switchMode('focus');
    }
  };

  const switchMode = (newMode: TimerMode) => {
    setMode(newMode);
    const minutes = newMode === 'focus' ? settings.focus : 
                    newMode === 'shortBreak' ? settings.shortBreak : 
                    settings.longBreak;
    sessionStartTimeRef.current = minutes * 60;
    const newTime = minutes * 60;
    setTimeLeft(newTime);
    initialTimeRef.current = newTime;
    setIsRunning(false);
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    const minutes = mode === 'focus' ? settings.focus : 
                    mode === 'shortBreak' ? settings.shortBreak : 
                    settings.longBreak;
    const newTime = minutes * 60;
    setTimeLeft(newTime);
    initialTimeRef.current = newTime;
    sessionStartTimeRef.current = newTime;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleEditClick = () => {
    if (!isRunning) {
      const mins = Math.floor(timeLeft / 60);
      const secs = timeLeft % 60;
      setEditMinutes(String(mins).padStart(2, '0'));
      setEditSeconds(String(secs).padStart(2, '0'));
      setIsEditing(true);
    }
  };

  const handleEditSave = () => {
    const mins = parseInt(editMinutes) || 0;
    const secs = parseInt(editSeconds) || 0;
    const totalSeconds = Math.min(Math.max(mins * 60 + secs, 1), 5999); // Min 1 sec, max 99:59
    setTimeLeft(totalSeconds);
    initialTimeRef.current = totalSeconds;
    sessionStartTimeRef.current = totalSeconds;
    setIsEditing(false);
  };

  const handleEditCancel = () => {
    setIsEditing(false);
  };

  const updateSettings = () => {
    const minutes = mode === 'focus' ? settings.focus : 
                    mode === 'shortBreak' ? settings.shortBreak : 
                    settings.longBreak;
    const newTime = minutes * 60;
    setTimeLeft(newTime);
    initialTimeRef.current = newTime;
    setIsRunning(false);
  };

  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative group"
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${config.bgColor} rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500`} />
        
        <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl overflow-hidden">
          {/* Animated background gradient */}
          <motion.div
            className="absolute inset-0 opacity-20"
            animate={{
              background: [
                `linear-gradient(135deg, ${mode === 'focus' ? '#3b82f6 0%, #06b6d4 100%' : mode === 'shortBreak' ? '#10b981 0%, #059669 100%' : '#a855f7 0%, #ec4899 100%'})`,
              ],
            }}
            transition={{ duration: 1 }}
          />

          <div className="relative z-10">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: isRunning ? 360 : 0 }}
                  transition={{ duration: 2, repeat: isRunning ? Infinity : 0, ease: "linear" }}
                  className={`p-3 bg-gradient-to-br ${config.color} rounded-xl`}
                >
                  <ModeIcon className="w-6 h-6 text-white" />
                </motion.div>
                <div>
                  <h3 className="text-white text-xl">{config.label}</h3>
                  <p className="text-white/60 text-sm">Session {sessionsCompleted + 1}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  {soundEnabled ? (
                    <Volume2 className="w-5 h-5 text-white/80" />
                  ) : (
                    <VolumeX className="w-5 h-5 text-white/80" />
                  )}
                </button>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                      <Settings className="w-5 h-5 text-white/80" />
                    </button>
                  </DialogTrigger>
                  <DialogContent className="bg-slate-900/95 backdrop-blur-xl border-white/20 text-white">
                    <DialogHeader>
                      <DialogTitle className="text-white">Timer Settings</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6 pt-4">
                      <div>
                        <label className="text-white/80 text-sm mb-2 block">
                          Focus Time: {settings.focus} minutes
                        </label>
                        <Slider
                          value={[settings.focus]}
                          onValueChange={([value]) => setSettings({ ...settings, focus: value })}
                          min={1}
                          max={60}
                          step={1}
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label className="text-white/80 text-sm mb-2 block">
                          Short Break: {settings.shortBreak} minutes
                        </label>
                        <Slider
                          value={[settings.shortBreak]}
                          onValueChange={([value]) => setSettings({ ...settings, shortBreak: value })}
                          min={1}
                          max={30}
                          step={1}
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label className="text-white/80 text-sm mb-2 block">
                          Long Break: {settings.longBreak} minutes
                        </label>
                        <Slider
                          value={[settings.longBreak]}
                          onValueChange={([value]) => setSettings({ ...settings, longBreak: value })}
                          min={1}
                          max={60}
                          step={1}
                          className="w-full"
                        />
                      </div>
                      <Button
                        onClick={updateSettings}
                        className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                      >
                        Apply Settings
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Circular Timer */}
            <div className="relative w-full aspect-square max-w-sm mx-auto mb-8">
              <svg className="w-full h-full -rotate-90">
                {/* Background circle */}
                <circle
                  cx="50%"
                  cy="50%"
                  r="45%"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.1)"
                  strokeWidth="12"
                />
                
                {/* Progress circle */}
                <motion.circle
                  cx="50%"
                  cy="50%"
                  r="45%"
                  fill="none"
                  stroke="url(#timerGradient)"
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 45}%`}
                  initial={{ strokeDashoffset: 0 }}
                  animate={{ 
                    strokeDashoffset: `${2 * Math.PI * 45 * (1 - progress / 100)}%`
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  style={{
                    filter: 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.5))',
                  }}
                />
                
                <defs>
                  <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Timer Display */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                {isEditing ? (
                  <div className="flex flex-col items-center gap-4">
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={editMinutes}
                        onChange={(e) => {
                          const val = e.target.value.slice(0, 2);
                          setEditMinutes(val);
                        }}
                        className="w-24 h-24 text-center text-5xl bg-white/10 backdrop-blur-sm border-2 border-cyan-400 rounded-xl text-white focus:outline-none focus:border-cyan-300"
                        min="0"
                        max="99"
                        placeholder="00"
                      />
                      <span className="text-5xl text-white">:</span>
                      <input
                        type="number"
                        value={editSeconds}
                        onChange={(e) => {
                          const val = e.target.value.slice(0, 2);
                          if (parseInt(val) < 60 || val === '') {
                            setEditSeconds(val);
                          }
                        }}
                        className="w-24 h-24 text-center text-5xl bg-white/10 backdrop-blur-sm border-2 border-cyan-400 rounded-xl text-white focus:outline-none focus:border-cyan-300"
                        min="0"
                        max="59"
                        placeholder="00"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={handleEditSave}
                        className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-white text-sm hover:from-cyan-600 hover:to-blue-600 transition-all"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleEditCancel}
                        className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg text-white text-sm hover:bg-white/20 transition-all"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <AnimatePresence mode="wait">
                      <motion.button
                        key={timeLeft}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 1.1, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={handleEditClick}
                        disabled={isRunning}
                        className={`text-7xl md:text-8xl bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent ${
                          !isRunning ? 'cursor-pointer hover:scale-105 transition-transform' : 'cursor-not-allowed'
                        }`}
                      >
                        {formatTime(timeLeft)}
                      </motion.button>
                    </AnimatePresence>
                    <p className="text-white/60 mt-2">
                      {!isRunning && 'Click time to edit • '}{Math.floor((progress / 100) * 100)}% Complete
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTimer}
                className={`p-6 bg-gradient-to-br ${config.color} rounded-2xl shadow-lg hover:shadow-xl transition-all`}
              >
                {isRunning ? (
                  <Pause className="w-8 h-8 text-white" fill="white" />
                ) : (
                  <Play className="w-8 h-8 text-white" fill="white" />
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetTimer}
                className="p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 transition-all"
              >
                <RotateCcw className="w-8 h-8 text-white" />
              </motion.button>
            </div>

            {/* Mode Switcher */}
            <div className="grid grid-cols-3 gap-3">
              {(Object.keys(modeConfig) as TimerMode[]).map((modeKey) => {
                const modeConf = modeConfig[modeKey];
                const ModeIconItem = modeConf.icon;
                const isActive = mode === modeKey;
                
                return (
                  <motion.button
                    key={modeKey}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => switchMode(modeKey)}
                    className={`p-4 rounded-xl border transition-all ${
                      isActive
                        ? `bg-gradient-to-br ${modeConf.color} border-white/30 shadow-lg`
                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <ModeIconItem className={`w-5 h-5 mx-auto mb-2 ${isActive ? 'text-white' : 'text-white/60'}`} />
                    <p className={`text-xs ${isActive ? 'text-white' : 'text-white/60'}`}>
                      {modeConf.label}
                    </p>
                  </motion.button>
                );
              })}
            </div>

            {/* Session Counter */}
            <div className="mt-6 flex items-center justify-center gap-2">
              <span className="text-white/60 text-sm">Focus Sessions:</span>
              <div className="flex gap-1">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full ${
                      i < (sessionsCompleted % 4)
                        ? 'bg-cyan-400'
                        : 'bg-white/20'
                    }`}
                  />
                ))}
              </div>
              <span className="text-white text-sm ml-2">{sessionsCompleted}</span>
            </div>
          </div>
        </div>

        {/* Weekly Focus Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-6 md:p-8 shadow-2xl overflow-hidden relative"
        >
          {/* Geometric Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white">Weekly Focus Time</h3>
                  <p className="text-white/60 text-sm">Last 7 days</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white/60 text-sm">Total</p>
                <p className="text-white">
                  {totalWeekHours}h {totalWeekRemainingMins}m
                </p>
              </div>
            </div>

            {/* Chart */}
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorMinutes" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                  <XAxis 
                    dataKey="day" 
                    stroke="rgba(255, 255, 255, 0.5)"
                    style={{ fontSize: '12px' }}
                  />
                  <YAxis 
                    stroke="rgba(255, 255, 255, 0.5)"
                    style={{ fontSize: '12px' }}
                    label={{ value: 'Hours', angle: -90, position: 'insideLeft', fill: 'rgba(255, 255, 255, 0.5)', dy: 40 }}
                    tickFormatter={(value) => `${value}h`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(0, 0, 0, 0.8)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '12px',
                      padding: '12px',
                    }}
                    labelStyle={{ color: 'white', marginBottom: '4px' }}
                    itemStyle={{ color: '#06b6d4' }}
                    formatter={(value: number) => [`${value.toFixed(1)} hours`, 'Focus Time']}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="hours" 
                    stroke="#06b6d4" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorMinutes)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <p className="text-white/60 text-xs mb-1">Avg/Day</p>
                <p className="text-white">
                  {Math.round((totalWeekMinutes / 7) / 60 * 10) / 10}h
                </p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <p className="text-white/60 text-xs mb-1">Best Day</p>
                <p className="text-white">
                  {weeklyData.reduce((max, day) => day.hours > max.hours ? day : max, {day: '-', hours: 0}).day}
                </p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <p className="text-white/60 text-xs mb-1">Peak</p>
                <p className="text-white">
                  {Math.max(...weeklyData.map(d => d.hours)).toFixed(1)}h
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
