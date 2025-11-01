'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Stethoscope, Heart, BookOpen, Brain, Target, TrendingUp, Zap, Award, Clock, Menu, X } from 'lucide-react';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { FloatingParticles } from '@/components/FloatingParticles';
import { PomodoroTimer } from '@/components/PomodoroTimer';


const quotes = [
  "It does not matter how slowly you go as long as you do not stop.",
  "Success is the sum of small efforts repeated day in and day out.",
  "The expert in anything was once a beginner.",
  "Your future is created by what you do today, not tomorrow.",
  "Dream big, work hard, stay focused, and surround yourself with good people."
];

export default function PomodoroPage() {
  const [menuOpen, setMenuOpen] = useState(false);
 
  const [currentQuote, setCurrentQuote] = useState("");

  useEffect(() => {
    setCurrentQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Animated Geometric Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Triangular pattern overlay */}
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
                <polygon
                  points="50,10 90,90 10,90"
                  fill="url(#grad1)"
                  opacity="0.6"
                />
              </svg>
            </motion.div>
          ))}
        </div>

        {/* Gradient definitions */}
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

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: menuOpen ? 0 : -300 }}
        className="fixed left-0 top-0 h-full w-64 bg-white/10 backdrop-blur-xl border-r border-white/20 z-50 lg:translate-x-0"
      >
        <div className="p-6">
          <div className="flex items-center gap-3 mb-12">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Stethoscope className="w-8 h-8 text-cyan-400" />
            </motion.div>
            <h2 className="text-2xl text-white">NEETtrack</h2>
          </div>

          <nav className="space-y-2">
            {[
              { icon: Target, label: 'Dashboard', active: false, href: "/" },
              { icon: BookOpen, label: 'Syllabus Tracker', active: false },
              { icon: Brain, label: 'Mock Tests', active: false },
              { icon: Clock, label: 'Pomodoro Timer', active: true, href: "/pomodoro" },
              { icon: Award, label: 'About Us', active: false },
            ].map((item, index) => (
              <motion.button
                key={item.label}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => {
                  if (item.href) {
                    window.location.href = item.href;
                  }
                }}
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

      {/* Mobile menu button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="lg:hidden fixed top-6 left-6 z-50 p-2 bg-white/10 backdrop-blur-xl rounded-lg text-white"
      >
        {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Main Content */}
      <main className="lg:ml-64">
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Header Quote */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <motion.p
              key={currentQuote}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xl md:text-2xl text-white/90 italic max-w-4xl mx-auto"
            >
              "{currentQuote}"
            </motion.p>
            <div className="flex items-center justify-end gap-2 mt-4 max-w-4xl mx-auto">
              <span className="text-white/60">— Continue</span>
            </div>
          </motion.div>

          {/* Main Grid */}
          <div className="grid lg:grid-cols-1 gap-8">
             <PomodoroTimer />
          </div>
        </div>
      </main>
    </div>
  );
}
