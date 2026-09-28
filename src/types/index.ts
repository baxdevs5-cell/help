export type Language = 'uz' | 'en' | 'ru' | 'tr' | 'ar';

export type ThemeMode = 'light' | 'dark' | 'system';

export type ActiveTab = 'home' | 'categories' | 'tools' | 'ai' | 'dashboard' | 'settings';

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  level: number;
  xp: number;
  streakDays: number;
  tasksCompleted: number;
  toolsUsed: number;
  lastActiveDate: string;
  badges: string[];
}

export interface TaskItem {
  id: string;
  title: string;
  category: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  xpReward: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'system' | 'streak' | 'task' | 'achievement' | 'tool';
  actionUrl?: string;
}

export interface ProblemDiagnosis {
  category: string;
  possibleCauses: string[];
  simpleExplanation: string;
  stepByStepSolutions: string[];
  relatedTools: string[];
  relatedArticles: string[];
  recommendedNextActions: string[];
}

export interface ToolDefinition {
  id: string;
  name: string;
  category: 'calculators' | 'converters' | 'productivity' | 'developer' | 'lifestyle';
  icon: string;
  description: string;
  popular?: boolean;
}

export interface CategoryInfo {
  id: string;
  title: string;
  icon: string;
  color: string;
  description: string;
  topicsCount: number;
  toolsCount: number;
  popularTopics: string[];
}

export interface RecipeItem {
  id: string;
  title: string;
  prepTime: string;
  calories: string;
  ingredients: string[];
  matchRate?: number;
  instructions: string[];
  image: string;
  tag: string;
}

export interface AchievementBadge {
  id: string;
  title: string;
  icon: string;
  description: string;
  unlocked: boolean;
  unlockedAt?: string;
  requiredXp?: number;
}
