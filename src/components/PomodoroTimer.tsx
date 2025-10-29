'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Timer, Play, Pause, RefreshCw, Settings } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useUser } from '@/firebase/auth/use-user';
import { useFirestore } from '@/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { format, subDays } from 'date-fns';
import { FocusGraph, type DailyFocus } from './FocusGraph';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError, type SecurityRuleContext } from '@/firebase/errors';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { useToast } from '@/hooks/use-toast';

const SHORT_BREAK_DURATION = 5 * 60; // 5 minutes
const LONG_BREAK_DURATION = 15 * 60; // 15 minutes
const FOCUS_DATA_KEY = 'pomodoroFocusData';
const POMODORO_SETTINGS_KEY = 'pomodoroSettings';

type TimerMode = 'work' | 'shortBreak' | 'longBreak';

interface PomodoroSettings {
  workDuration: number;
}

export function PomodoroTimer() {
  const { toast } = useToast();
  const [workDuration, setWorkDuration] = useState(25 * 60);
  const [mode, setMode] = useState<TimerMode>('work');
  const [timeRemaining, setTimeRemaining] = useState(workDuration);
  const [isActive, setIsActive] = useState(false);
  const [sessionCount, setSessionCount] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const { user, loading: userLoading } = useUser();
  const firestore = useFirestore();
  const [focusData, setFocusData] = useState<DailyFocus[]>([]);

  useEffect(() => {
    setIsClient(true);
  }, []);

   // Load settings on component mount
  useEffect(() => {
    if (isClient) {
      const savedSettings = localStorage.getItem(POMODORO_SETTINGS_KEY);
      if (savedSettings) {
        const settings: PomodoroSettings = JSON.parse(savedSettings);
        setWorkDuration(settings.workDuration);
        if (mode === 'work' && !isActive) {
          setTimeRemaining(settings.workDuration);
        }
      }
    }
  }, [isClient, mode, isActive]);

  const getDuration = useCallback((currentMode: TimerMode) => {
    switch (currentMode) {
      case 'work':
        return workDuration;
      case 'shortBreak':
        return SHORT_BREAK_DURATION;
      case 'longBreak':
        return LONG_BREAK_DURATION;
    }
  }, [workDuration]);

  // Update time remaining if duration changes
  useEffect(() => {
      if (!isActive) {
          setTimeRemaining(getDuration(mode));
      }
  }, [workDuration, mode, isActive, getDuration]);


  const getFocusDataRef = useCallback(() => {
    if (user && firestore) {
      return doc(firestore, `users/${user.uid}/progress/pomodoro`);
    }
    return null;
  }, [user, firestore]);
  
  const loadFocusData = useCallback(async () => {
    let data: DailyFocus[] = [];
    const focusDataRef = getFocusDataRef();
    if (focusDataRef) {
      try {
        const docSnap = await getDoc(focusDataRef);
        if (docSnap.exists()) {
          data = docSnap.data().sessions || [];
        }
      } catch (e: any) {
        if (e.code === 'permission-denied') {
          const permissionError = new FirestorePermissionError({
              path: focusDataRef.path,
              operation: 'get',
          } satisfies SecurityRuleContext);
          errorEmitter.emit('permission-error', permissionError);
        } else {
            console.error("An unexpected error occurred while loading focus data:", e);
        }
      }
    } else if (isClient) {
      const localData = localStorage.getItem(FOCUS_DATA_KEY);
      if (localData) {
        data = JSON.parse(localData);
      }
    }
    setFocusData(data);
  }, [getFocusDataRef, isClient]);

  useEffect(() => {
    if (!userLoading) {
      loadFocusData();
    }
  }, [userLoading, loadFocusData]);

  const saveFocusData = useCallback(async (updatedData: DailyFocus[]) => {
    setFocusData(updatedData);
    const focusDataRef = getFocusDataRef();
    const dataToSave = { sessions: updatedData };

    if (focusDataRef) {
      setDoc(focusDataRef, dataToSave)
        .catch(serverError => {
            const permissionError = new FirestorePermissionError({
                path: focusDataRef.path,
                operation: 'create', // or 'update'
                requestResourceData: dataToSave,
            } satisfies SecurityRuleContext);
            errorEmitter.emit('permission-error', permissionError);
        });
    } else if (isClient) {
      localStorage.setItem(FOCUS_DATA_KEY, JSON.stringify(updatedData));
    }
  }, [getFocusDataRef, isClient]);
  
  const recordFocusSession = useCallback(async () => {
    const todayStr = format(new Date(), 'yyyy-MM-dd');
    let updatedData = [...focusData];
    const todayData = updatedData.find(d => d.date === todayStr);

    if (todayData) {
      todayData.sessions += 1;
    } else {
      updatedData.push({ date: todayStr, sessions: 1 });
    }

    // Keep only last 30 days of data for performance
    const thirtyDaysAgo = format(subDays(new Date(), 30), 'yyyy-MM-dd');
    updatedData = updatedData.filter(d => d.date >= thirtyDaysAgo);

    await saveFocusData(updatedData);

  }, [focusData, saveFocusData]);


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
        recordFocusSession(); // Record the completed session
        const nextMode = newSessionCount % 4 === 0 ? 'longBreak' : 'shortBreak';
        setMode(nextMode);
        setTimeRemaining(getDuration(nextMode));
        if (isClient) new Audio('https://www.soundjay.com/buttons/sounds/button-1.mp3').play();
      } else {
        setMode('work');
        setTimeRemaining(getDuration('work'));
        if (isClient) new Audio('https://www.soundjay.com/buttons/sounds/button-2.mp3').play();
      }
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive, timeRemaining, mode, sessionCount, getDuration, isClient, recordFocusSession]);

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
  
  const handleWorkDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMinutes = parseInt(e.target.value, 10);
    if (!isNaN(newMinutes) && newMinutes >= 1 && newMinutes <= 120) {
      const newDurationInSeconds = newMinutes * 60;
      setWorkDuration(newDurationInSeconds);
       if (isClient) {
        localStorage.setItem(POMODORO_SETTINGS_KEY, JSON.stringify({ workDuration: newDurationInSeconds }));
      }
      toast({
          title: "Duration Updated",
          description: `Work session set to ${newMinutes} minutes.`
      })
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-8">
        <Card className="shadow-lg max-w-md mx-auto">
          <CardHeader>
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Timer className="h-6 w-6 text-primary" />
                    <CardTitle className="font-headline text-2xl">Pomodoro Timer</CardTitle>
                </div>
                 <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Settings className="h-5 w-5" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-60">
                        <div className="grid gap-4">
                            <div className="space-y-2">
                                <h4 className="font-medium leading-none">Settings</h4>
                                <p className="text-sm text-muted-foreground">
                                    Customize your timer.
                                </p>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="work-duration">Work (minutes)</Label>
                                <Input 
                                    id="work-duration"
                                    type="number"
                                    min="1"
                                    max="120"
                                    value={workDuration / 60}
                                    onChange={handleWorkDurationChange}
                                />
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
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
                Today's completed sessions: <span className="font-bold">{focusData.find(d => d.date === format(new Date(), 'yyyy-MM-dd'))?.sessions || 0}</span>
            </p>
          </CardContent>
        </Card>
        <FocusGraph data={focusData} />
    </div>
  );
}
