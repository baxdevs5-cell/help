import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, ThemeMode, ActiveTab, UserProfile, TaskItem, NotificationItem } from '../types';
import { translations, Translations } from '../i18n/translations';
import { INITIAL_TASKS, INITIAL_NOTIFICATIONS, INITIAL_ACHIEVEMENTS } from '../data/mockData';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  selectedToolId: string | null;
  setSelectedToolId: (id: string | null) => void;
  selectedCategoryId: string | null;
  setSelectedCategoryId: (id: string | null) => void;
  user: UserProfile;
  updateUser: (updates: Partial<UserProfile>) => void;
  tasks: TaskItem[];
  addTask: (title: string, category?: string, priority?: 'low' | 'medium' | 'high') => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  awardXp: (amount: number, reason?: string) => void;
  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  clearNotifications: () => void;
  recentTools: string[];
  recordToolUsage: (toolId: string) => void;
  recentSearches: string[];
  recordSearch: (term: string) => void;
  searchModalOpen: boolean;
  setSearchModalOpen: (open: boolean) => void;
  authModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
  profileModalOpen: boolean;
  setProfileModalOpen: (open: boolean) => void;
  toast: { message: string; type: 'success' | 'info' | 'warning' } | null;
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
  resetAllData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Language
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('helphub_lang');
    return (saved as Language) || 'uz';
  });

  const t = translations[language] || translations.uz;

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('helphub_lang', lang);
  };

  // Sync html dir and lang
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  // Theme
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('helphub_theme');
    return (saved as ThemeMode) || 'light';
  });

  const setTheme = (mode: ThemeMode) => {
    setThemeState(mode);
    localStorage.setItem('helphub_theme', mode);
  };

  useEffect(() => {
    const root = document.documentElement;
    const isDark =
      theme === 'dark' ||
      (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Navigation tab
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [selectedToolId, setSelectedToolId] = useState<string | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  // User & Gamification
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('helphub_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return {
      name: 'Azizbek',
      email: 'user@helphub.io',
      avatar: '👨‍💻',
      level: 2,
      xp: 65,
      streakDays: 4,
      tasksCompleted: 8,
      toolsUsed: 14,
      lastActiveDate: new Date().toISOString().slice(0, 10),
      badges: ['first_step']
    };
  });

  const updateUser = (updates: Partial<UserProfile>) => {
    setUser((prev) => {
      const next = { ...prev, ...updates };
      localStorage.setItem('helphub_user', JSON.stringify(next));
      return next;
    });
  };

  // Toast
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'warning' } | null>(null);
  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast((curr) => (curr?.message === message ? null : curr));
    }, 3200);
  };

  // XP & Gamification Awarder
  const awardXp = (amount: number, reason?: string) => {
    setUser((prev) => {
      const newXp = prev.xp + amount;
      const newLevel = Math.floor(newXp / 100) + 1;
      const leveledUp = newLevel > prev.level;

      if (leveledUp) {
        showToast(`🎉 Level Up! You reached Level ${newLevel}!`, 'success');
      } else if (reason) {
        showToast(`+${amount} XP: ${reason}`, 'info');
      }

      const next = {
        ...prev,
        xp: newXp,
        level: newLevel
      };
      localStorage.setItem('helphub_user', JSON.stringify(next));
      return next;
    });
  };

  // Tasks
  const [tasks, setTasks] = useState<TaskItem[]>(() => {
    const saved = localStorage.getItem('helphub_tasks');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_TASKS;
  });

  useEffect(() => {
    localStorage.setItem('helphub_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title: string, category = 'General', priority: 'low' | 'medium' | 'high' = 'medium') => {
    const newTask: TaskItem = {
      id: `task_${Date.now()}`,
      title,
      category,
      completed: false,
      priority,
      xpReward: 5
    };
    setTasks((prev) => [newTask, ...prev]);
    showToast('Task added to your dashboard!', 'success');
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const nextCompleted = !t.completed;
          if (nextCompleted) {
            awardXp(t.xpReward || 5, 'Completed task');
            updateUser({ tasksCompleted: user.tasksCompleted + 1 });
          }
          return { ...t, completed: nextCompleted };
        }
        return t;
      })
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    showToast('Task removed', 'info');
  };

  // Favorites
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('helphub_favorites');
    return saved ? JSON.parse(saved) : ['percentage_calculator', 'currency_converter', 'study_timer'];
  });

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter((item) => item !== id) : [...prev, id];
      localStorage.setItem('helphub_favorites', JSON.stringify(next));
      showToast(exists ? 'Removed from favorites' : 'Added to favorites ⭐', 'info');
      return next;
    });
  };

  const isFavorite = (id: string) => favorites.includes(id);

  // Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('helphub_notifs');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  useEffect(() => {
    localStorage.setItem('helphub_notifs', JSON.stringify(notifications));
  }, [notifications]);

  const markNotificationRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast('All notifications marked as read', 'info');
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  // Recently used tools
  const [recentTools, setRecentTools] = useState<string[]>(() => {
    const saved = localStorage.getItem('helphub_recent_tools');
    return saved ? JSON.parse(saved) : ['percentage_calculator', 'currency_converter', 'bmi_calculator'];
  });

  const recordToolUsage = (toolId: string) => {
    setRecentTools((prev) => {
      const filtered = prev.filter((id) => id !== toolId);
      const next = [toolId, ...filtered].slice(0, 8);
      localStorage.setItem('helphub_recent_tools', JSON.stringify(next));
      return next;
    });
    awardXp(2);
    updateUser({ toolsUsed: user.toolsUsed + 1 });
  };

  // Recent searches
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    const saved = localStorage.getItem('helphub_recent_searches');
    return saved ? JSON.parse(saved) : ['laptop sekin ishlayapti', 'percentage calculator', 'egg potato recipes'];
  });

  const recordSearch = (term: string) => {
    if (!term.trim()) return;
    setRecentSearches((prev) => {
      const filtered = prev.filter((s) => s.toLowerCase() !== term.toLowerCase());
      const next = [term.trim(), ...filtered].slice(0, 8);
      localStorage.setItem('helphub_recent_searches', JSON.stringify(next));
      return next;
    });
  };

  // Modals
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  // Global keyboard shortcut: Cmd+K / Ctrl+K opens search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchModalOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setSearchModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const resetAllData = () => {
    localStorage.removeItem('helphub_user');
    localStorage.removeItem('helphub_tasks');
    localStorage.removeItem('helphub_favorites');
    localStorage.removeItem('helphub_recent_tools');
    localStorage.removeItem('helphub_recent_searches');
    localStorage.removeItem('helphub_notifs');
    window.location.reload();
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        theme,
        setTheme,
        activeTab,
        setActiveTab,
        selectedToolId,
        setSelectedToolId,
        selectedCategoryId,
        setSelectedCategoryId,
        user,
        updateUser,
        tasks,
        addTask,
        toggleTask,
        deleteTask,
        favorites,
        toggleFavorite,
        isFavorite,
        awardXp,
        notifications,
        markNotificationRead,
        markAllNotificationsRead,
        clearNotifications,
        recentTools,
        recordToolUsage,
        recentSearches,
        recordSearch,
        searchModalOpen,
        setSearchModalOpen,
        authModalOpen,
        setAuthModalOpen,
        profileModalOpen,
        setProfileModalOpen,
        toast,
        showToast,
        resetAllData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
