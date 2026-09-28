import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  CheckCircle2,
  Circle,
  Plus,
  Trash2,
  Star,
  Flame,
  Award,
  Clock,
  Search,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Zap,
  Target
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { INITIAL_ACHIEVEMENTS, TOOLS_LIST } from '../../data/mockData';

export const PersonalDashboard: React.FC = () => {
  const {
    t,
    user,
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    favorites,
    recentTools,
    recentSearches,
    setSelectedToolId,
    setActiveTab,
  } = useApp();

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [selectedTaskCategory, setSelectedTaskCategory] = useState('Productivity');

  // Animated counter for progress
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const [displayPercent, setDisplayPercent] = useState(0);

  // Smooth counter effect when landing or changing tasks
  useEffect(() => {
    let start = 0;
    const duration = 1200; // ms
    const startTime = performance.now();

    const animateCount = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.round(start + (progressPercent - start) * easeProgress);

      setDisplayPercent(currentVal);

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      } else {
        setDisplayPercent(progressPercent);
      }
    };

    const animFrame = requestAnimationFrame(animateCount);
    return () => cancelAnimationFrame(animFrame);
  }, [progressPercent]);

  // Greeting based on time
  const hour = new Date().getHours();
  const greeting =
    hour < 12
      ? t.dashboard.goodMorning
      : hour < 18
      ? t.dashboard.goodAfternoon
      : t.dashboard.goodEvening;

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    addTask(newTaskTitle.trim(), selectedTaskCategory, 'medium');
    setNewTaskTitle('');
  };

  const favoriteTools = TOOLS_LIST.filter((tool) => favorites.includes(tool.id));
  const recentToolItems = TOOLS_LIST.filter((tool) => recentTools.includes(tool.id));

  // Current level info
  const xpInCurrentLevel = user.xp % 100;
  const xpNeeded = 100 - xpInCurrentLevel;

  // Segmented block visualizer (10 blocks)
  const totalBlocks = 10;
  const filledBlocks = Math.round((progressPercent / 100) * totalBlocks);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8 animate-fadeIn">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{user.avatar}</span>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                {greeting}, {user.name} 👋
              </h1>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Welcome back to your central hub. Let's make today productive and focused!
            </p>

            {/* Level & XP progress with smooth Framer Motion */}
            <div className="pt-2 max-w-md">
              <div className="flex justify-between items-center text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                <span className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400">
                  <Sparkles className="h-4 w-4" />
                  Level {user.level} Practitioner
                </span>
                <span className="text-slate-500 font-mono">
                  {user.xp} XP ({xpNeeded} XP to Lv.{user.level + 1})
                </span>
              </div>
              <div className="relative h-2.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${xpInCurrentLevel}%` }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                  className="relative h-full rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 shadow-sm"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <motion.div
              whileHover={{ y: -2 }}
              className="p-3.5 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 text-center transition"
            >
              <span className="text-xl font-black text-blue-600 dark:text-blue-400">{user.tasksCompleted}</span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">{t.dashboard.statsCompleted}</p>
            </motion.div>
            <motion.div
              whileHover={{ y: -2 }}
              className="p-3.5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/40 text-center transition"
            >
              <div className="flex items-center justify-center gap-1">
                <Flame className="h-4 w-4 text-amber-500 fill-amber-500" />
                <span className="text-xl font-black text-amber-600 dark:text-amber-400">{user.streakDays}d</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">{t.dashboard.statsStreak}</p>
            </motion.div>
            <motion.div
              whileHover={{ y: -2 }}
              className="p-3.5 rounded-2xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/40 text-center transition"
            >
              <span className="text-xl font-black text-purple-600 dark:text-purple-400">{user.toolsUsed}</span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">{t.dashboard.statsTools}</p>
            </motion.div>
            <motion.div
              whileHover={{ y: -2 }}
              className="p-3.5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40 text-center transition"
            >
              <span className="text-xl font-black text-emerald-600 dark:text-emerald-400">{user.xp}</span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">{t.dashboard.statsXp}</p>
            </motion.div>
          </div>
        </div>

        {/* Dynamic Progress Visualization Card (80% State Enhancement) */}
        <div className="mt-8 border-t border-slate-100 dark:border-slate-800 pt-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-emerald-500" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                {t.dashboard.todayProgress}
              </span>
              {progressPercent >= 80 && (
                <motion.span
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 flex items-center gap-1 shadow-sm"
                >
                  <Zap className="h-3 w-3 fill-emerald-500 text-emerald-500" />
                  80%+ High Velocity
                </motion.span>
              )}
            </div>

            <div className="flex items-center gap-3">
              {/* Terminal ASCII Visualizer (████████░░ 80%) */}
              <div className="hidden sm:flex items-center gap-2 rounded-xl bg-slate-100 dark:bg-slate-800 px-3 py-1 font-mono text-xs text-slate-700 dark:text-slate-300">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold tracking-tighter">
                  {'█'.repeat(filledBlocks)}
                  <span className="opacity-30">{'░'.repeat(totalBlocks - filledBlocks)}</span>
                </span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {displayPercent}%
                </span>
              </div>

              <span className="font-mono text-xs font-semibold text-slate-500">
                ({completedTasks}/{totalTasks} tasks completed)
              </span>
            </div>
          </div>

          {/* Dynamic Animated Progress Bar with Framer Motion & Glow */}
          <div className="relative">
            {/* Outer Track */}
            <div className="relative h-4 w-full rounded-full bg-slate-100 dark:bg-slate-800 p-0.5 overflow-hidden shadow-inner">
              {/* Inner Animated Bar */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{
                  duration: 1.4,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.2
                }}
                className="relative h-full rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400 shadow-md shadow-emerald-500/25 transition-all"
              >
                {/* Continuous Shimmer Light Beam */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />

                {/* Leading Edge Glow Pulse */}
                <div className="absolute right-0 top-0 bottom-0 w-2 rounded-full bg-white/80 blur-[2px] animate-pulse-glow" />
              </motion.div>
            </div>

            {/* Segment Markers Overlay (10 Segments) */}
            <div className="absolute inset-0 flex justify-between px-1 pointer-events-none">
              {[...Array(9)].map((_, i) => (
                <div
                  key={i}
                  className="h-full w-[1.5px] bg-slate-300/40 dark:bg-slate-700/50"
                />
              ))}
            </div>
          </div>

          {/* Segmented Interactive Block Strip */}
          <div className="grid grid-cols-10 gap-1.5 pt-1">
            {[...Array(totalBlocks)].map((_, idx) => {
              const isFilled = idx < filledBlocks;
              return (
                <motion.div
                  key={idx}
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{ scaleY: 1, opacity: 1 }}
                  transition={{ delay: 0.1 + idx * 0.04, duration: 0.3 }}
                  className={`h-2 rounded-sm transition-colors duration-300 ${
                    isFilled
                      ? 'bg-gradient-to-tr from-emerald-500 to-teal-400 shadow-xs'
                      : 'bg-slate-200/80 dark:bg-slate-800/80'
                  }`}
                  title={`Block ${idx + 1} (${(idx + 1) * 10}%)`}
                />
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Main Grid: Tasks & Favorites */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Today's Tasks & Learning Progress */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tasks Section */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {t.dashboard.tasksTitle}
                </h3>
              </div>
              <span className="text-xs text-slate-500 font-mono">
                {completedTasks}/{totalTasks} Done
              </span>
            </div>

            {/* Add Task Form */}
            <form onSubmit={handleAddTask} className="flex gap-2 mb-4">
              <input
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder={t.dashboard.addTaskPlaceholder}
                className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs sm:text-sm text-slate-900 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
              <button
                type="submit"
                disabled={!newTaskTitle.trim()}
                className="flex items-center gap-1 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 transition disabled:opacity-50"
              >
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">{t.dashboard.addTaskBtn}</span>
              </button>
            </form>

            {/* Task list with Framer Motion layout animations */}
            <div className="space-y-2">
              <AnimatePresence>
                {tasks.length === 0 ? (
                  <p className="py-6 text-center text-xs text-slate-400">
                    {t.dashboard.noTasks}
                  </p>
                ) : (
                  tasks.map((task) => (
                    <motion.div
                      key={task.id}
                      layout
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all ${
                        task.completed
                          ? 'border-slate-100 bg-slate-50/70 text-slate-400 dark:border-slate-800/60 dark:bg-slate-900/40 line-through'
                          : 'border-slate-200/90 bg-white text-slate-800 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 hover:border-blue-400'
                      }`}
                    >
                      <div
                        onClick={() => toggleTask(task.id)}
                        className="flex items-center gap-3 cursor-pointer flex-1"
                      >
                        {task.completed ? (
                          <motion.div
                            initial={{ scale: 0.7 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                          >
                            <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                          </motion.div>
                        ) : (
                          <Circle className="h-5 w-5 text-slate-300 dark:text-slate-600 shrink-0 hover:text-blue-500 transition-colors" />
                        )}
                        <span className="text-xs sm:text-sm font-medium">{task.title}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-slate-400 px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800">
                          {task.category}
                        </span>
                        <button
                          onClick={() => deleteTask(task.id)}
                          className="text-slate-300 hover:text-red-500 p-1 transition"
                          title="Remove task"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Gamification Badges Section */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-amber-500" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {t.dashboard.badgesTitle}
                </h3>
              </div>
              <span className="text-xs text-slate-500">
                {INITIAL_ACHIEVEMENTS.filter((b) => b.unlocked || user.xp >= (b.requiredXp || 0)).length} of {INITIAL_ACHIEVEMENTS.length} Unlocked
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {INITIAL_ACHIEVEMENTS.map((badge) => {
                const isUnlocked = badge.unlocked || user.xp >= (badge.requiredXp || 0);
                return (
                  <motion.div
                    key={badge.id}
                    whileHover={{ scale: 1.02 }}
                    className={`p-3.5 rounded-2xl border transition ${
                      isUnlocked
                        ? 'border-amber-200 bg-amber-50/50 dark:border-amber-900/40 dark:bg-amber-950/20 shadow-xs'
                        : 'border-slate-200 bg-slate-50/60 dark:border-slate-800 dark:bg-slate-900/30 opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl">{isUnlocked ? '🏅' : '🔒'}</span>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                          {badge.title}
                        </h4>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                          {badge.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Right 1 Col: Favorites & Recent Tools & Searches */}
        <div className="space-y-6">
          {/* Favorites */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex items-center gap-2 mb-4">
              <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {t.dashboard.favoritesTitle}
              </h3>
            </div>

            {favoriteTools.length === 0 ? (
              <p className="text-xs text-slate-400 py-3">{t.dashboard.noFavorites}</p>
            ) : (
              <div className="space-y-2">
                {favoriteTools.map((tool) => (
                  <motion.div
                    key={tool.id}
                    whileHover={{ x: 3 }}
                    onClick={() => setSelectedToolId(tool.id)}
                    className="flex cursor-pointer items-center justify-between p-3 rounded-2xl border border-slate-200/80 bg-slate-50/60 hover:bg-blue-50/50 dark:border-slate-800 dark:bg-slate-800/40 dark:hover:bg-blue-950/30 transition"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                        {tool.name}
                      </span>
                    </div>
                    <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Recently Used Tools */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex items-center gap-2 mb-4">
              <Clock className="h-5 w-5 text-blue-500" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {t.dashboard.recentToolsTitle}
              </h3>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {recentToolItems.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => setSelectedToolId(tool.id)}
                  className="text-xs px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-blue-50 hover:text-blue-600 transition"
                >
                  {tool.name}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Recent Searches */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex items-center gap-2 mb-3">
              <Search className="h-4 w-4 text-slate-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {t.dashboard.recentSearchesTitle}
              </h3>
            </div>

            <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
              {recentSearches.map((s, idx) => (
                <li key={idx} className="truncate">
                  • “{s}”
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
