import React, { useState, useRef, useEffect } from 'react';
import {
  Brain,
  Search,
  Globe,
  Sun,
  Moon,
  Laptop,
  Bell,
  Menu,
  X,
  CheckCheck,
  Trash2,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Language, ThemeMode, ActiveTab } from '../../types';

export const Navbar: React.FC = () => {
  const {
    t,
    language,
    setLanguage,
    theme,
    setTheme,
    activeTab,
    setActiveTab,
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    clearNotifications,
    setSearchModalOpen,
    setProfileModalOpen,
    user
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);

  const langRef = useRef<HTMLDivElement>(null);
  const themeRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangDropdownOpen(false);
      }
      if (themeRef.current && !themeRef.current.contains(e.target as Node)) {
        setThemeDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'uz', label: "O'zbekcha", flag: '🇺🇿' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'ru', label: 'Русский', flag: '🇷🇺' },
    { code: 'tr', label: 'Türkçe', flag: '🇹🇷' },
    { code: 'ar', label: 'العربية', flag: '🇸🇦' },
  ];

  const currentFlag = languages.find((l) => l.code === language)?.flag || '🇺🇿';

  const navItems: { tab: ActiveTab; label: string }[] = [
    { tab: 'home', label: t.nav.home },
    { tab: 'categories', label: t.nav.categories },
    { tab: 'tools', label: t.nav.tools },
    { tab: 'ai', label: t.nav.aiHelp },
    { tab: 'dashboard', label: t.nav.dashboard },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md transition-colors dark:border-slate-800/80 dark:bg-slate-950/90">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <div
          onClick={() => {
            setActiveTab('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex cursor-pointer items-center gap-3 transition-opacity hover:opacity-90"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20">
            <Brain className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold tracking-tight text-slate-900 text-lg dark:text-white">
                HELP HUB
              </span>
              <span className="rounded bg-blue-100 px-1.5 py-0.2 text-[10px] font-semibold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                PRO
              </span>
            </div>
            <span className="hidden text-[11px] text-slate-500 dark:text-slate-400 sm:inline-block">
              {t.tagline}
            </span>
          </div>
        </div>

        {/* Center Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const isActive = activeTab === item.tab;
            return (
              <button
                key={item.tab}
                onClick={() => {
                  setActiveTab(item.tab);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`relative px-3.5 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-blue-600 dark:bg-blue-400" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Tools & Controls */}
        <div className="flex items-center gap-2">
          {/* Quick Search Button */}
          <button
            onClick={() => setSearchModalOpen(true)}
            aria-label={t.nav.search}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-100/70 px-3 py-1.5 text-xs text-slate-500 transition-all hover:border-slate-300 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-slate-700"
          >
            <Search className="h-4 w-4 text-slate-400" />
            <span className="hidden sm:inline">{t.nav.search}</span>
            <kbd className="hidden rounded bg-white px-1.5 py-0.5 font-mono text-[10px] text-slate-500 shadow-sm dark:bg-slate-800 dark:text-slate-400 lg:inline-block">
              ⌘K
            </kbd>
          </button>

          {/* Language Selector */}
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
              aria-label={t.nav.language}
            >
              <span className="text-sm">{currentFlag}</span>
              <span className="hidden uppercase sm:inline font-mono">{language}</span>
              <ChevronDown className="h-3 w-3 text-slate-400" />
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-xl dark:border-slate-800 dark:bg-slate-900">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLanguage(l.code);
                      setLangDropdownOpen(false);
                    }}
                    className={`flex w-full items-center justify-between px-3 py-2 text-left text-xs transition ${
                      language === l.code
                        ? 'bg-blue-50 font-semibold text-blue-600 dark:bg-blue-950/50 dark:text-blue-400'
                        : 'text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{l.flag}</span>
                      <span>{l.label}</span>
                    </span>
                    {language === l.code && <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Switcher */}
          <div className="relative" ref={themeRef}>
            <button
              onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
              aria-label={t.nav.theme}
            >
              {theme === 'light' ? (
                <Sun className="h-4 w-4 text-amber-500" />
              ) : theme === 'dark' ? (
                <Moon className="h-4 w-4 text-blue-400" />
              ) : (
                <Laptop className="h-4 w-4 text-slate-400" />
              )}
            </button>

            {themeDropdownOpen && (
              <div className="absolute right-0 mt-2 w-36 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-xl dark:border-slate-800 dark:bg-slate-900">
                <button
                  onClick={() => {
                    setTheme('light');
                    setThemeDropdownOpen(false);
                  }}
                  className={`flex w-full items-center gap-2 px-3 py-2 text-xs transition ${
                    theme === 'light' ? 'bg-amber-50 font-medium text-amber-700 dark:bg-amber-950/40 dark:text-amber-300' : 'text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800'
                  }`}
                >
                  <Sun className="h-4 w-4 text-amber-500" />
                  <span>Light</span>
                </button>
                <button
                  onClick={() => {
                    setTheme('dark');
                    setThemeDropdownOpen(false);
                  }}
                  className={`flex w-full items-center gap-2 px-3 py-2 text-xs transition ${
                    theme === 'dark' ? 'bg-blue-50 font-medium text-blue-700 dark:bg-blue-950/40 dark:text-blue-300' : 'text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800'
                  }`}
                >
                  <Moon className="h-4 w-4 text-blue-400" />
                  <span>Dark</span>
                </button>
                <button
                  onClick={() => {
                    setTheme('system');
                    setThemeDropdownOpen(false);
                  }}
                  className={`flex w-full items-center gap-2 px-3 py-2 text-xs transition ${
                    theme === 'system' ? 'bg-slate-100 font-medium text-slate-800 dark:bg-slate-800 dark:text-slate-200' : 'text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800'
                  }`}
                >
                  <Laptop className="h-4 w-4 text-slate-400" />
                  <span>System</span>
                </button>
              </div>
            )}
          </div>

          {/* Notifications Center */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
              className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
              aria-label={t.nav.notifications}
            >
              <Bell className="h-4 w-4 text-slate-600 dark:text-slate-300" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white shadow-sm">
                  {unreadCount}
                </span>
              )}
            </button>

            {notifDropdownOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/80 px-4 py-3 dark:border-slate-800 dark:bg-slate-900/80">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-slate-900 dark:text-white">
                      {t.nav.notifications}
                    </span>
                    {unreadCount > 0 && (
                      <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-medium text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={markAllNotificationsRead}
                      title="Mark all as read"
                      className="rounded p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                      <CheckCheck className="h-4 w-4" />
                    </button>
                    <button
                      onClick={clearNotifications}
                      title="Clear notifications"
                      className="rounded p-1 text-slate-400 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
                  {notifications.length === 0 ? (
                    <div className="p-6 text-center text-xs text-slate-400">
                      No notifications
                    </div>
                  ) : (
                    notifications.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => markNotificationRead(n.id)}
                        className={`cursor-pointer p-3.5 transition hover:bg-slate-50 dark:hover:bg-slate-800/50 ${
                          !n.read ? 'bg-blue-50/40 dark:bg-blue-950/20' : ''
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                            {n.title}
                          </h4>
                          <span className="text-[10px] text-slate-400 whitespace-nowrap">
                            {n.time}
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                          {n.message}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Pill / Button */}
          <button
            onClick={() => setProfileModalOpen(true)}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white py-1.5 pl-2 pr-3 text-xs font-medium text-slate-800 transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            <span className="text-base">{user.avatar}</span>
            <div className="hidden flex-col items-start sm:flex">
              <span className="font-semibold text-slate-900 dark:text-white leading-tight">
                {user.name}
              </span>
              <span className="text-[10px] text-blue-600 dark:text-blue-400 font-mono">
                Lv.{user.level} · {user.xp} XP
              </span>
            </div>
          </button>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 md:hidden"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="border-b border-slate-200 bg-white px-4 pt-2 pb-6 shadow-xl dark:border-slate-800 dark:bg-slate-950 md:hidden">
          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.tab}
                onClick={() => {
                  setActiveTab(item.tab);
                  setMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-sm font-medium ${
                  activeTab === item.tab
                    ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400'
                    : 'text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-900'
                }`}
              >
                <span>{item.label}</span>
                {activeTab === item.tab && (
                  <span className="h-2 w-2 rounded-full bg-blue-600" />
                )}
              </button>
            ))}
            <button
              onClick={() => {
                setActiveTab('settings');
                setMobileMenuOpen(false);
              }}
              className="flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-900"
            >
              <span>{t.nav.settings}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
