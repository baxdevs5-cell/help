import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Bell, Sparkles, Coffee } from 'lucide-react';
import { useApp } from '../../context/AppContext';

// Web Audio API beep sound
function playChime() {
  try {
    const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.3); // A5
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.5);
  } catch (e) {
    console.log('Audio not allowed without gesture', e);
  }
}

// 1. Study Pomodoro Timer
export const StudyTimerTool: React.FC = () => {
  const { awardXp } = useApp();
  const [mode, setMode] = useState<'focus' | 'break'>('focus');
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      playChime();
      if (mode === 'focus') {
        awardXp(10, 'Completed 25-min Study Session! 🧠');
        setCompletedSessions((c) => c + 1);
        setMode('break');
        setTimeLeft(5 * 60);
      } else {
        setMode('focus');
        setTimeLeft(25 * 60);
      }
      setIsRunning(false);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning, timeLeft, mode, awardXp]);

  const toggleRun = () => setIsRunning(!isRunning);

  const reset = (newMode = mode) => {
    setIsRunning(false);
    setMode(newMode);
    setTimeLeft(newMode === 'focus' ? 25 * 60 : 5 * 60);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const totalTime = mode === 'focus' ? 25 * 60 : 5 * 60;
  const progressPercent = ((totalTime - timeLeft) / totalTime) * 100;

  return (
    <div className="space-y-6 text-center">
      {/* Mode toggle */}
      <div className="flex justify-center gap-2">
        <button
          onClick={() => reset('focus')}
          className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition ${
            mode === 'focus'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
          }`}
        >
          <Sparkles className="h-3.5 w-3.5" />
          Focus (25m)
        </button>
        <button
          onClick={() => reset('break')}
          className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition ${
            mode === 'break'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
          }`}
        >
          <Coffee className="h-3.5 w-3.5" />
          Break (5m)
        </button>
      </div>

      {/* Large countdown display */}
      <div className="relative mx-auto flex h-48 w-48 items-center justify-center rounded-full border-4 border-slate-200 dark:border-slate-800">
        <div className="flex flex-col items-center">
          <span className="font-mono text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {formatted}
          </span>
          <span className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-1">
            {mode === 'focus' ? 'Deep Work' : 'Rest'}
          </span>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex justify-center items-center gap-3">
        <button
          onClick={toggleRun}
          className={`flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-bold text-white shadow-lg transition ${
            isRunning
              ? 'bg-amber-500 hover:bg-amber-600 shadow-amber-500/20'
              : 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/20'
          }`}
        >
          {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-white" />}
          <span>{isRunning ? 'Pause' : 'Start Focus'}</span>
        </button>
        <button
          onClick={() => reset()}
          className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2.5 text-slate-600 hover:bg-slate-100 dark:text-slate-300"
          title="Reset Timer"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
      </div>

      <p className="text-xs text-slate-500 dark:text-slate-400">
        Completed study blocks today: <span className="font-bold text-blue-600 dark:text-blue-400">{completedSessions}</span> (+{completedSessions * 10} XP earned)
      </p>
    </div>
  );
};

// 2. Countdown Timer
export const CountdownTimerTool: React.FC = () => {
  const [eventName, setEventName] = useState('New Year 2027 / Next Big Goal');
  const [targetDate, setTargetDate] = useState('2027-01-01T00:00');
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculate = () => {
      const difference = +new Date(targetDate) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };
    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-medium text-slate-700 dark:text-slate-300">Milestone Name</label>
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            className="w-full mt-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-slate-700 dark:text-slate-300">Target Date & Time</label>
          <input
            type="datetime-local"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
            className="w-full mt-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
          {eventName}
        </h4>
        <div className="grid grid-cols-4 gap-2">
          <div className="p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
            <span className="text-2xl font-black text-blue-600 dark:text-blue-400">{timeLeft.days}</span>
            <p className="text-[10px] text-slate-400">Days</p>
          </div>
          <div className="p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
            <span className="text-2xl font-black text-blue-600 dark:text-blue-400">{timeLeft.hours}</span>
            <p className="text-[10px] text-slate-400">Hours</p>
          </div>
          <div className="p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
            <span className="text-2xl font-black text-blue-600 dark:text-blue-400">{timeLeft.minutes}</span>
            <p className="text-[10px] text-slate-400">Mins</p>
          </div>
          <div className="p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
            <span className="text-2xl font-black text-blue-600 dark:text-blue-400">{timeLeft.seconds}</span>
            <p className="text-[10px] text-slate-400">Secs</p>
          </div>
        </div>
      </div>
    </div>
  );
};
