import React from 'react';
import { Brain, Heart, Sparkles, Shield, ArrowUp } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const { t, setActiveTab } = useApp();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-200/80 bg-white/70 backdrop-blur-md pt-12 pb-8 dark:border-slate-800/80 dark:bg-slate-950/70">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:gap-12">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white">
                <Brain className="h-5 w-5" />
              </div>
              <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                HELP HUB
              </span>
            </div>
            <p className="max-w-md text-sm text-slate-600 leading-relaxed dark:text-slate-400">
              {t.footer.about}
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1">
                <Shield className="h-3.5 w-3.5 text-emerald-500" />
                No ads & tracking
              </span>
              <span className="flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5 text-blue-500" />
                Gemini 3.8 Intelligence
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
              {t.footer.quickLinks}
            </h4>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <button
                  onClick={() => {
                    setActiveTab('categories');
                    scrollToTop();
                  }}
                  className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition"
                >
                  {t.nav.categories}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('tools');
                    scrollToTop();
                  }}
                  className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition"
                >
                  {t.nav.tools} (17+ Utilities)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('ai');
                    scrollToTop();
                  }}
                  className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition"
                >
                  {t.nav.aiHelp}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('dashboard');
                    scrollToTop();
                  }}
                  className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition"
                >
                  {t.nav.dashboard}
                </button>
              </li>
            </ul>
          </div>

          {/* Trust & Settings */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
              {t.footer.legal}
            </h4>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <button
                  onClick={() => {
                    setActiveTab('settings');
                    scrollToTop();
                  }}
                  className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition"
                >
                  {t.nav.settings}
                </button>
              </li>
              <li className="text-slate-500 dark:text-slate-500">
                {t.footer.privacy}
              </li>
              <li className="text-slate-500 dark:text-slate-500">
                {t.footer.terms}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-slate-200/80 pt-6 text-xs text-slate-500 dark:border-slate-800/80 dark:text-slate-400 sm:flex-row">
          <div className="flex items-center gap-1.5">
            <span>© {new Date().getFullYear()} HELP HUB.</span>
            <span>{t.footer.rights}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-[11px]">
              Crafted with <Heart className="h-3 w-3 text-red-500 fill-red-500" /> for daily productivity
            </span>
            <button
              onClick={scrollToTop}
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
              aria-label="Back to top"
            >
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
