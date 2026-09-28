import React, { useState } from 'react';
import {
  Sun,
  Moon,
  Laptop,
  Globe,
  Bell,
  Volume2,
  Shield,
  Download,
  RotateCcw,
  Check,
  User,
  Sliders
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Language, ThemeMode } from '../../types';

export const SettingsView: React.FC = () => {
  const {
    t,
    theme,
    setTheme,
    language,
    setLanguage,
    user,
    updateUser,
    tasks,
    favorites,
    resetAllData,
    showToast,
  } = useApp();

  const [soundEnabled, setSoundEnabled] = useState(true);
  const [taskAlerts, setTaskAlerts] = useState(true);
  const [streakAlerts, setStreakAlerts] = useState(true);

  const languages: { code: Language; name: string; flag: string }[] = [
    { code: 'uz', name: "O'zbekcha (Uzbek)", flag: '🇺🇿' },
    { code: 'en', name: 'English (US/UK)', flag: '🇬🇧' },
    { code: 'ru', name: 'Русский (Russian)', flag: '🇷🇺' },
    { code: 'tr', name: 'Türkçe (Turkish)', flag: '🇹🇷' },
    { code: 'ar', name: 'العربية (Arabic - RTL)', flag: '🇸🇦' },
  ];

  const exportDataJson = () => {
    const backup = {
      user,
      tasks,
      favorites,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `helphub_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    showToast('Your HELP HUB data has been exported!', 'success');
  };

  const handleReset = () => {
    if (window.confirm(t.settings.resetConfirm)) {
      resetAllData();
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 space-y-8 animate-fadeIn">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          {t.settings.title}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          {t.settings.subtitle}
        </p>
      </div>

      <div className="space-y-6">
        {/* Appearance Section */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <div className="flex items-center gap-2">
            <Sliders className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              {t.settings.appearance}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={() => setTheme('light')}
              className={`flex items-center gap-3 p-4 rounded-2xl border transition ${
                theme === 'light'
                  ? 'border-blue-500 bg-blue-50/50 text-blue-700 dark:border-blue-500 dark:bg-blue-950/40 dark:text-blue-300 font-bold'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              <Sun className="h-5 w-5 text-amber-500" />
              <span>{t.settings.themeLight}</span>
            </button>

            <button
              onClick={() => setTheme('dark')}
              className={`flex items-center gap-3 p-4 rounded-2xl border transition ${
                theme === 'dark'
                  ? 'border-blue-500 bg-blue-50/50 text-blue-700 dark:border-blue-500 dark:bg-blue-950/40 dark:text-blue-300 font-bold'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              <Moon className="h-5 w-5 text-blue-400" />
              <span>{t.settings.themeDark}</span>
            </button>

            <button
              onClick={() => setTheme('system')}
              className={`flex items-center gap-3 p-4 rounded-2xl border transition ${
                theme === 'system'
                  ? 'border-blue-500 bg-blue-50/50 text-blue-700 dark:border-blue-500 dark:bg-blue-950/40 dark:text-blue-300 font-bold'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              <Laptop className="h-5 w-5 text-slate-500" />
              <span>{t.settings.themeSystem}</span>
            </button>
          </div>
        </div>

        {/* Language Section */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              {t.settings.language}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {languages.map((l) => {
              const isSelected = language === l.code;
              return (
                <button
                  key={l.code}
                  onClick={() => setLanguage(l.code)}
                  className={`flex items-center justify-between p-3.5 rounded-2xl border transition ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50/60 text-blue-700 dark:border-blue-500 dark:bg-blue-950/40 dark:text-blue-300 font-bold'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">{l.flag}</span>
                    <span className="text-xs">{l.name}</span>
                  </div>
                  {isSelected && <Check className="h-4 w-4 text-blue-600 dark:text-blue-400" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Notifications & Audio Alerts */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              {t.settings.notifications}
            </h2>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
            <label className="flex items-center justify-between py-3 cursor-pointer">
              <span className="text-xs text-slate-700 dark:text-slate-300">{t.settings.enableNotifs}</span>
              <input
                type="checkbox"
                checked={taskAlerts}
                onChange={(e) => setTaskAlerts(e.target.checked)}
                className="h-4 w-4 rounded text-blue-600"
              />
            </label>
            <label className="flex items-center justify-between py-3 cursor-pointer">
              <span className="text-xs text-slate-700 dark:text-slate-300">Daily streak reminders</span>
              <input
                type="checkbox"
                checked={streakAlerts}
                onChange={(e) => setStreakAlerts(e.target.checked)}
                className="h-4 w-4 rounded text-blue-600"
              />
            </label>
            <label className="flex items-center justify-between py-3 cursor-pointer">
              <span className="text-xs text-slate-700 dark:text-slate-300">{t.settings.soundAlerts}</span>
              <input
                type="checkbox"
                checked={soundEnabled}
                onChange={(e) => setSoundEnabled(e.target.checked)}
                className="h-4 w-4 rounded text-blue-600"
              />
            </label>
          </div>
        </div>

        {/* Data & Privacy */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              {t.settings.privacy}
            </h2>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400">
            HELP HUB operates locally on your machine with no third-party tracking scripts. All your tasks, tool states, and streaks stay inside your browser storage.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={exportDataJson}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 transition"
            >
              <Download className="h-4 w-4" />
              <span>{t.settings.exportData}</span>
            </button>
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 text-xs font-semibold text-red-600 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400 transition"
            >
              <RotateCcw className="h-4 w-4" />
              <span>{t.settings.resetData}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
