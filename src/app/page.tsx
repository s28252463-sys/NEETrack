'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Stethoscope,
  BookOpen,
  Brain,
  Target,
  Zap,
  Award,
  Clock,
  Menu,
  X,
} from 'lucide-react';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { FloatingParticles } from '@/components/FloatingParticles';
import { PomodoroTimer } from '@/components/PomodoroTimer';


const quotes = [
  'It does not matter how slowly you go as long as you do not stop.',
  'Success is the sum of small efforts repeated day in and day out.',
  'The expert in anything was once a beginner.',
  'Your future is created by what you do today, not tomorrow.',
  'Dream big, work hard, stay focused, and surround yourself with good people.',
];

const studySuggestions = [
  {
    phase: 'Build Your Foundation',
    icon: BookOpen,
    description: "Focus on understanding core concepts thoroughly. Don't rush.",
    detail: 'Aim to cover 1-2% of the syllabus consistently each week.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    phase: 'Active Recall Practice',
    icon: Brain,
    description: 'Test yourself regularly with previous year questions.',
    detail: 'Solve at least 50 MCQs daily across Physics, Chemistry & Biology.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    phase: 'Master High-Yield Topics',
    icon: Target,
    description: 'Focus on topics with maximum weightage in NEET.',
    detail: 'Human Physiology, Organic Chemistry, and Mechanics are crucial.',
    color: 'from-orange-500 to-red-500',
  },
  {
    phase: 'Speed & Accuracy',
    icon: Zap,
    description: 'Take full-length mock tests in exam conditions.',
    detail: 'Aim for 95%+ accuracy with time management mastery.',
    color: 'from-green-500 to-teal-500',
  },
];

function TimeCard({ value, label }: { value: number; label: string }) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
      <AnimatePresence mode="wait">
        <motion.div
          key={value}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="text-3xl text-white text-center mb-1"
        >
          {String(value).padStart(2, '0')}
        </motion.div>
      </AnimatePresence>
      <p className="text-white/60 text-xs text-center">{label}</p>
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [examDate, setExamDate] = useState<Date | undefined>(() => {
    if (typeof window !== 'undefined') {
      const savedDate = localStorage.getItem('examDate');
      if (savedDate) {
        const date = new Date(savedDate);
        if (!isNaN(date.getTime())) {
          return date;
        }
      }
    }
    const defaultDate = new Date();
    defaultDate.setDate(defaultDate.getDate() + 183);
    return defaultDate;
  });

  const [daysLeft, setDaysLeft] = useState(0);
  const [hoursLeft, setHoursLeft] = useState(0);
  const [minutesLeft, setMinutesLeft] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [currentQuote, setCurrentQuote] = useState('');
  const [currentSuggestion, setCurrentSuggestion] = useState(0);

  useEffect(() => {
    if (examDate) {
      localStorage.setItem('examDate', examDate.toISOString());
    }

    const calculateTimeLeft = () => {
      if (!examDate) return;
      const now = new Date();
      const difference = examDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setDaysLeft(days);
        setHoursLeft(hours);
        setMinutesLeft(minutes);
        setSecondsLeft(seconds);
      } else {
        setDaysLeft(0);
        setHoursLeft(0);
        setMinutesLeft(0);
        setSecondsLeft(0);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [examDate]);

  useEffect(() => {
    setCurrentQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    const quoteInterval = setInterval(() => {
      setCurrentQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    }, 10000);

    const suggestionInterval = setInterval(() => {
      setCurrentSuggestion((prev) => (prev + 1) % studySuggestions.length);
    }, 8000);

    return () => {
      clearInterval(quoteInterval);
      clearInterval(suggestionInterval);
    };
  }, []);

  const suggestion = studySuggestions[currentSuggestion];
  const SuggestionIcon = suggestion.icon;

  if (!examDate) {
    return null;
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${(i % 5) * 20}%`,
                top: `${Math.floor(i / 5) * 25}%`,
                width: '20%',
                height: '25%',
              }}
              animate={{
                opacity: [0.1, 0.3, 0.1],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 8 + (i % 3) * 2,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            >
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <polygon points="50,10 90,90 10,90" fill="url(#grad1)" opacity="0.6" />
              </svg>
            </motion.div>
          ))}
        </div>
        <svg width="0" height="0">
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 0.8 }} />
              <stop offset="100%" style={{ stopColor: '#06b6d4', stopOpacity: 0.4 }} />
            </linearGradient>
          </defs>
        </svg>
        <FloatingParticles />
      </div>
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: menuOpen ? 0 : -300 }}
        transition={{ type: 'spring', stiffness: 260, damping: 30 }}
        className="fixed left-0 top-0 h-full w-64 bg-white/10 backdrop-blur-xl border-r border-white/20 z-50 lg:translate-x-0"
      >
        <div className="p-6">
          <div className="flex items-center gap-3 mb-12">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <Stethoscope className="w-8 h-8 text-cyan-400" />
            </motion.div>
            <h2 className="text-2xl text-white">NEETrack</h2>
          </div>
          <nav className="space-y-2">
            {[
              { icon: Target, label: 'Dashboard', active: true },
              { icon: BookOpen, label: 'Syllabus Tracker' },
              { icon: Brain, label: 'Mock Tests' },
              { icon: Clock, label: 'Pomodoro Timer' },
              { icon: Award, label: 'About Us' },
            ].map((item, index) => (
              <motion.button
                key={item.label}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  item.active
                    ? 'bg-white/20 text-white'
                    : 'text-white/60 hover:bg-white/10 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </motion.button>
            ))}
          </nav>
        </div>
        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex items-center gap-3 p-3 bg-white/10 rounded-lg backdrop-blur-sm">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-white">
              S
            </div>
            <div className="flex-1">
              <p className="text-white text-sm">soumya</p>
              <p className="text-white/60 text-xs">NEET Aspirant</p>
            </div>
          </div>
        </div>
      </motion.aside>
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="lg:hidden fixed top-6 left-6 z-50 p-2 bg-white/10 backdrop-blur-xl rounded-lg text-white"
      >
        {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>
      <main className="lg:ml-64">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={currentQuote}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-xl md:text-2xl text-white/90 italic max-w-4xl mx-auto"
              >
                "{currentQuote}"
              </motion.p>
            </AnimatePresence>
          </motion.div>
          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
              <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl overflow-hidden">
                <motion.div
                  className="absolute inset-0 opacity-30"
                  animate={{
                    background: [
                      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                      'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    ],
                  }}
                  transition={{ duration: 10, repeat: Infinity }}
                />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-white/90">Countdown to NEET UG</h3>
                    <Popover>
                      <PopoverTrigger asChild>
                        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                          <Calendar className="w-5 h-5 text-white/80" />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="end">
                        <CalendarComponent
                          mode="single"
                          selected={examDate}
                          onSelect={(date) => date && setExamDate(date)}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="text-center mb-8">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={daysLeft}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 1.2, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 200 }}
                        className="text-8xl md:text-9xl bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent mb-4"
                      >
                        {daysLeft}
                      </motion.div>
                    </AnimatePresence>
                    <p className="text-white/80 text-lg">
                      days remaining until {format(examDate, 'MMMM d, yyyy')}
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <TimeCard value={hoursLeft} label="Hours" />
                    <TimeCard value={minutesLeft} label="Minutes" />
                    <TimeCard value={secondsLeft} label="Seconds" />
                  </div>
                  <div className="mt-6">
                    <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-cyan-400 to-blue-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(((365 - daysLeft) / 365) * 100, 100)}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="relative group"
            >
              <PomodoroTimer />
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
