'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Coffee, Play, Pause, RotateCcw, Settings, Volume2 } from "lucide-react";
import { CircularProgress } from "@/components/ui/circular-progress";
import { cn } from "@/lib/utils";

const modes = {
    pomodoro: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60,
};

type Mode = keyof typeof modes;

export function PomodoroTimer() {
    const [mode, setMode] = useState<Mode>('pomodoro');
    const [time, setTime] = useState(modes[mode]);
    const [isActive, setIsActive] = useState(false);
    const [sessionCount, setSessionCount] = useState(0);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const progress = ((modes[mode] - time) / modes[mode]) * 100;

    const resetTimer = useCallback(() => {
        setIsActive(false);
        setTime(modes[mode]);
    }, [mode]);

    useEffect(() => {
        setTime(modes[mode]);
        setIsActive(false);
    }, [mode]);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        if (isActive && time > 0) {
            interval = setInterval(() => {
                setTime(t => t - 1);
            }, 1000);
        } else if (isActive && time === 0) {
            setIsActive(false);
            if (mode === 'pomodoro') {
                setSessionCount(s => s + 1);
                if ((sessionCount + 1) % 4 === 0) {
                    setMode('longBreak');
                } else {
                    setMode('shortBreak');
                }
            } else {
                setMode('pomodoro');
            }
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isActive, time, mode, sessionCount]);


    return (
        <Card className="w-full max-w-xs mx-auto bg-[#2a4a7c]/60 border-[#5a7fbb] text-white shadow-2xl rounded-3xl p-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="bg-cyan-400/20 p-2 rounded-lg">
                        <Brain className="h-6 w-6 text-cyan-300" />
                    </div>
                    <div>
                        <h2 className="font-bold text-lg">Focus Time</h2>
                        <p className="text-xs text-gray-300">Session {sessionCount + 1}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Volume2 className="h-5 w-5 text-gray-300 cursor-pointer" />
                    <Settings className="h-5 w-5 text-gray-300 cursor-pointer" />
                </div>
            </div>

            <div className="relative flex items-center justify-center my-8">
                <CircularProgress value={progress} size={200} strokeWidth={10} />
                <div className="absolute flex flex-col items-center">
                    <div className="text-6xl font-bold tracking-tighter">{formatTime(time)}</div>
                    <p className="text-xs text-gray-300 mt-1">Click time to edit • {Math.floor(progress)}% Complete</p>
                </div>
            </div>

            <div className="flex items-center justify-center gap-4 mb-6">
                <Button size="lg" className="bg-cyan-400 hover:bg-cyan-500 text-gray-900 rounded-2xl w-24 h-16 shadow-lg" onClick={() => setIsActive(!isActive)}>
                    {isActive ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
                </Button>
                <Button variant="ghost" size="lg" className="bg-white/10 hover:bg-white/20 rounded-2xl w-24 h-16 shadow-lg" onClick={resetTimer}>
                    <RotateCcw className="h-8 w-8" />
                </Button>
            </div>

            <div className="grid grid-cols-3 gap-2 bg-black/20 p-2 rounded-xl mb-4">
                <Button variant="ghost" onClick={() => setMode('pomodoro')} className={cn("flex-col h-auto py-2", mode === 'pomodoro' && 'bg-cyan-400/30 text-cyan-200')}>
                    <Brain className="h-5 w-5 mb-1" />
                    <span className="text-xs">Focus Time</span>
                </Button>
                 <Button variant="ghost" onClick={() => setMode('shortBreak')} className={cn("flex-col h-auto py-2", mode === 'shortBreak' && 'bg-cyan-400/30 text-cyan-200')}>
                    <Coffee className="h-5 w-5 mb-1" />
                    <span className="text-xs">Short Break</span>
                </Button>
                 <Button variant="ghost" onClick={() => setMode('longBreak')} className={cn("flex-col h-auto py-2", mode === 'longBreak' && 'bg-cyan-400/30 text-cyan-200')}>
                    <Coffee className="h-5 w-5 mb-1" />
                    <span className="text-xs">Long Break</span>
                </Button>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-300">
                <span>Focus Sessions</span>
                <div className="flex items-center gap-1">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className={cn("w-2 h-2 rounded-full", i < (sessionCount % 4) ? "bg-cyan-400" : "bg-white/20")}></div>
                    ))}
                    <span className="ml-2 font-bold">{sessionCount}</span>
                </div>
            </div>

        </Card>
    );
}
