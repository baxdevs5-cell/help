import React from 'react';
import { Sparkles, Bot, ArrowRight, ShieldCheck, Zap, Globe2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SmartHelpEngine } from './SmartHelpEngine';

export const HeroSection: React.FC = () => {
  const { t, setActiveTab } = useApp();

  return (
    <section className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-16">
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-blue-400/15 via-indigo-500/10 to-purple-400/15 blur-3xl pointer-events-none rounded-full dark:from-blue-600/10 dark:to-indigo-600/10" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-8">
        {/* Top Tagline Pill */}
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-white/90 px-4 py-1.5 text-xs font-semibold text-blue-700 shadow-sm backdrop-blur-md dark:border-blue-900/50 dark:bg-slate-900/80 dark:text-blue-300">
          <Sparkles className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
          <span>HELP HUB — {t.tagline}</span>
        </div>

        {/* Hero Headings */}
        <div className="space-y-4 max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
            {t.hero.title}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
            {t.hero.subheading}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => {
              const el = document.getElementById('smart-help-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition hover:opacity-95"
          >
            <span>🔍 {t.hero.findHelpBtn}</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('ai');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white/90 px-6 py-3.5 text-sm font-bold text-slate-800 shadow-sm backdrop-blur-md hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 transition"
          >
            <Bot className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span>🤖 {t.hero.aiAssistantBtn}</span>
          </button>
        </div>

        {/* Intelligent Diagnostic Search Engine Box */}
        <div className="pt-4 text-left">
          <SmartHelpEngine />
        </div>

        {/* Trust points */}
        <div className="pt-4 flex flex-wrap justify-center items-center gap-6 text-xs font-medium text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1.5">
            <Zap className="h-4 w-4 text-amber-500" />
            17+ Instant Interactive Tools
          </span>
          <span className="flex items-center gap-1.5">
            <Globe2 className="h-4 w-4 text-blue-500" />
            5 Full Languages (Uzbek, English, Russian, Turkish, Arabic)
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            Private & Zero Bloat
          </span>
        </div>
      </div>
    </section>
  );
};
