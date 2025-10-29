'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, RefreshCw, Settings } from 'lucide-react';
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
import { CircularProgress } from './CircularProgress';
import { cn } from '@/lib/utils';


const SHORT_BREAK_DURATION = 5 * 60; // 5 minutes
const LONG_BREAK_DURATION = 15 * 60; // 15 minutes
const FOCUS_DATA_KEY = 'pomodoroFocusData';
const POMODORO_SETTINGS_KEY = 'pomodoroSettings';

type TimerMode = 'work' | 'shortBreak' | 'longBreak';

interface PomodoroSettings {
  workDuration: number;
}

const SessionTracker = ({ sessionCount }: { sessionCount: number }) => (
    <div className="flex flex-col items-center gap-4 w-full">
        <div className="bg-gray-800 text-white rounded-full px-4 py-2">
            <p>Session {sessionCount % 4 || 4}/4</p>
        </div>
        <div className="flex items-center gap-2">
            {[1, 2, 3, 4].map((i) => (
                <div key={i} className={cn(
                    "w-3 h-3 rounded-full",
                    i <= sessionCount % 4 ? "bg-teal-400" : "bg-gray-300",
                    sessionCount % 4 === 0 && "bg-teal-400" // all filled on 4th session
                )} />
            ))}
        </div>
        <div className="text-xs text-muted-foreground">
            <span>Short Break: 5 min</span> &bull; <span>Long Break: 15 min</span>
        </div>
    </div>
);


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
    let notification: Notification | undefined;
    
    if (isClient && Notification.permission === 'default') {
        Notification.requestPermission();
    }

    if (isActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prevTime => prevTime - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      setIsActive(false);
      let notificationTitle = '';
      let notificationBody = '';

      if (mode === 'work') {
        const newSessionCount = sessionCount + 1;
        setSessionCount(newSessionCount);
        recordFocusSession(); 
        const nextMode = newSessionCount % 4 === 0 ? 'longBreak' : 'shortBreak';
        setMode(nextMode);
        setTimeRemaining(getDuration(nextMode));
        
        notificationTitle = "Time for a break!";
        notificationBody = `Great work! Starting your ${newSessionCount % 4 === 0 ? 'long' : 'short'} break.`;
        if (isClient) new Audio('https://www.soundjay.com/buttons/sounds/button-1.mp3').play();

      } else {
        setMode('work');
        setTimeRemaining(getDuration('work'));
        notificationTitle = "Back to work!";
        notificationBody = "Your break is over. Let's get back to focusing.";
        if (isClient) new Audio('https://www.soundjay.com/buttons/sounds/button-2.mp3').play();
      }

      if (isClient && Notification.permission === 'granted') {
          notification = new Notification(notificationTitle, { body: notificationBody });
      }
    }

    return () => {
      if (interval) clearInterval(interval);
      if (notification) notification.close();
    };
  }, [isActive, timeRemaining, mode, sessionCount, getDuration, isClient, recordFocusSession]);

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  const handleReset = useCallback(() => {
    setIsActive(false);
    setTimeRemaining(getDuration(mode));
  }, [mode, getDuration]);

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

  const progress = (timeRemaining / getDuration(mode)) * 100;
  
  const modeText = useMemo(() => {
      switch(mode){
          case 'work': return 'FOCUS';
          case 'shortBreak': return 'SHORT BREAK';
          case 'longBreak': return 'LONG BREAK';
      }
  }, [mode])

  return (
    <div className="space-y-8">
        <Card className="shadow-lg max-w-md mx-auto">
          <CardContent className="flex flex-col items-center justify-center space-y-8 pt-8">
            
             <div className="relative w-64 h-64">
                <CircularProgress progress={progress} />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <p className="text-muted-foreground tracking-widest text-sm">{modeText}</p>
                    <p className="text-6xl font-semibold font-mono text-foreground tabular-nums">
                        {formatTime(timeRemaining)}
                    </p>
                </div>
            </div>

            <div className="flex items-center justify-center space-x-4 w-full">
              <Button onClick={handleToggle} className="w-24 bg-teal-500 hover:bg-teal-600 text-white rounded-full">
                {isActive ? <Pause /> : <Play />}
                <span className="ml-2">{isActive ? 'PAUSE' : 'START'}</span>
              </Button>
              <Button onClick={handleReset} variant="destructive" className="w-24 bg-red-500 hover:bg-red-600 rounded-full">
                <RefreshCw />
                <span className="ml-2">RESET</span>
              </Button>
              <Popover>
                  <PopoverTrigger asChild>
                      <Button variant="ghost" size="icon" className="text-muted-foreground">
                          <Settings />
                      </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-60">
                      <div className="grid gap-4">
                          <div className="space-y-2">
                              <h4 className="font-medium leading-none">Settings</h4>
                              <p className="text-sm text-muted-foreground">
                                  Customize your focus time.
                              </p>
                          </div>
                          <div className="grid gap-2">
                              <Label htmlFor="work-duration">Focus (minutes)</Label>
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
            
            <SessionTracker sessionCount={sessionCount} />
          </CardContent>
        </Card>
        <FocusGraph data={focusData} />
    </div>
  );
}
