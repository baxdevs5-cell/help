import React, { useState } from 'react';
import {
  Smartphone,
  GraduationCap,
  DollarSign,
  CloudSun,
  Gamepad2,
  Cpu,
  Utensils,
  CalendarCheck,
  Languages,
  Car,
  HeartPulse,
  Plane,
  Briefcase,
  Lock,
  ArrowRight,
  Sparkles,
  BookOpen,
  Wrench,
  CheckCircle2,
  X,
  Droplets,
  Wind,
  Sun,
  CloudRain
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CATEGORIES_LIST, ENGLISH_VOCABULARY, CAR_SYMPTOMS } from '../../data/mockData';
import { CategoryInfo } from '../../types';

export const CategoriesView: React.FC = () => {
  const { t, setSelectedToolId, setActiveTab, awardXp } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<CategoryInfo | null>(null);

  // Weather widget state
  const [weatherCity, setWeatherCity] = useState<'Tashkent' | 'London' | 'New York' | 'Istanbul' | 'Dubai'>('Tashkent');

  const weatherData: Record<string, { temp: number; desc: string; rainChance: number; humidity: number; wind: number; icon: 'sun' | 'rain' | 'cloud' }> = {
    Tashkent: { temp: 24, desc: 'Sunny & Pleasant', rainChance: 5, humidity: 38, wind: 12, icon: 'sun' },
    London: { temp: 16, desc: 'Light Rain Showers', rainChance: 75, humidity: 82, wind: 20, icon: 'rain' },
    'New York': { temp: 19, desc: 'Partly Cloudy', rainChance: 20, humidity: 55, wind: 15, icon: 'cloud' },
    Istanbul: { temp: 22, desc: 'Clear Skies', rainChance: 10, humidity: 60, wind: 18, icon: 'sun' },
    Dubai: { temp: 34, desc: 'Warm & Sunny', rainChance: 0, humidity: 45, wind: 14, icon: 'sun' },
  };

  // English Flashcard state
  const [vocabIndex, setVocabIndex] = useState(0);
  const [showVocabTranslation, setShowVocabTranslation] = useState(false);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Smartphone': return <Smartphone className="h-6 w-6" />;
      case 'GraduationCap': return <GraduationCap className="h-6 w-6" />;
      case 'DollarSign': return <DollarSign className="h-6 w-6" />;
      case 'CloudSun': return <CloudSun className="h-6 w-6" />;
      case 'Gamepad2': return <Gamepad2 className="h-6 w-6" />;
      case 'Cpu': return <Cpu className="h-6 w-6" />;
      case 'Utensils': return <Utensils className="h-6 w-6" />;
      case 'CalendarCheck': return <CalendarCheck className="h-6 w-6" />;
      case 'Languages': return <Languages className="h-6 w-6" />;
      case 'Car': return <Car className="h-6 w-6" />;
      case 'HeartPulse': return <HeartPulse className="h-6 w-6" />;
      case 'Plane': return <Plane className="h-6 w-6" />;
      case 'Briefcase': return <Briefcase className="h-6 w-6" />;
      case 'Lock': return <Lock className="h-6 w-6" />;
      default: return <Sparkles className="h-6 w-6" />;
    }
  };

  const nextCard = () => {
    setShowVocabTranslation(false);
    setVocabIndex((prev) => (prev + 1) % ENGLISH_VOCABULARY.length);
    awardXp(2, 'Practiced vocabulary card');
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="rounded-3xl border border-slate-200 bg-gradient-to-r from-blue-600/5 to-indigo-600/5 p-6 sm:p-8 dark:border-slate-800 dark:from-blue-950/20 dark:to-indigo-950/20">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
            <Sparkles className="h-3.5 w-3.5" />
            14 Comprehensive Knowledge Domains
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {t.categories.title}
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {t.categories.subtitle}
          </p>
        </div>
      </div>

      {/* Grid of Categories */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES_LIST.map((cat) => (
          <div
            key={cat.id}
            onClick={() => setSelectedCategory(cat)}
            className="group relative flex flex-col justify-between cursor-pointer overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-500/50 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-500/50"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr ${cat.color} text-white shadow-md`}>
                  {getCategoryIcon(cat.icon)}
                </div>
                <span className="text-xs font-medium text-slate-400">
                  {cat.topicsCount} guides
                </span>
              </div>

              <div className="mt-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {cat.title}
                </h3>
                <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              {/* Popular topics */}
              <div className="mt-4 space-y-1">
                {cat.popularTopics.slice(0, 2).map((topic, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300">
                    <span className="h-1 w-1 rounded-full bg-blue-500" />
                    <span className="truncate">{topic}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-3 dark:border-slate-800">
              <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                {cat.toolsCount} related tools
              </span>
              <span className="flex items-center gap-1 text-xs font-semibold text-slate-700 dark:text-slate-300 group-hover:translate-x-0.5 transition-transform">
                {t.categories.explore}
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Category Modal / Interactive Panel */}
      {selectedCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-950 max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr ${selectedCategory.color} text-white`}>
                  {getCategoryIcon(selectedCategory.icon)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {selectedCategory.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {selectedCategory.description}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedCategory(null)}
                className="flex h-8 w-8 items-center justify-center rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-900 dark:hover:text-slate-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Category-Specific Interactive Widgets */}

              {/* Weather Widget */}
              {selectedCategory.id === 'weather' && (
                <div className="rounded-2xl border border-blue-200 bg-blue-50/50 p-5 dark:border-blue-900/50 dark:bg-blue-950/20 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                      Live Weather Radar & Forecast
                    </span>
                    <select
                      value={weatherCity}
                      onChange={(e) => setWeatherCity(e.target.value as unknown as typeof weatherCity)}
                      className="rounded-lg border border-blue-200 bg-white px-2.5 py-1 text-xs text-slate-800 dark:border-blue-800 dark:bg-slate-800 dark:text-white"
                    >
                      <option value="Tashkent">Tashkent, UZ</option>
                      <option value="London">London, UK</option>
                      <option value="New York">New York, US</option>
                      <option value="Istanbul">Istanbul, TR</option>
                      <option value="Dubai">Dubai, UAE</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {weatherData[weatherCity].icon === 'sun' && <Sun className="h-12 w-12 text-amber-500 animate-spin-slow" />}
                      {weatherData[weatherCity].icon === 'rain' && <CloudRain className="h-12 w-12 text-blue-500" />}
                      {weatherData[weatherCity].icon === 'cloud' && <CloudSun className="h-12 w-12 text-sky-500" />}
                      <div>
                        <span className="text-4xl font-extrabold text-slate-900 dark:text-white">
                          {weatherData[weatherCity].temp}°C
                        </span>
                        <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                          {weatherData[weatherCity].desc}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-1 text-right text-xs text-slate-600 dark:text-slate-300">
                      <div className="flex items-center gap-1 justify-end">
                        <Droplets className="h-3.5 w-3.5 text-blue-500" />
                        <span>Rain: {weatherData[weatherCity].rainChance}%</span>
                      </div>
                      <div className="flex items-center gap-1 justify-end">
                        <Wind className="h-3.5 w-3.5 text-slate-400" />
                        <span>Wind: {weatherData[weatherCity].wind} km/h</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* English Interactive Flashcards */}
              {selectedCategory.id === 'english' && (
                <div className="rounded-2xl border border-indigo-200 bg-indigo-50/50 p-5 dark:border-indigo-900/50 dark:bg-indigo-950/20 space-y-4">
                  <div className="flex items-center justify-between text-xs text-indigo-700 dark:text-indigo-300 font-bold">
                    <span>Active Recall Flashcard ({vocabIndex + 1}/{ENGLISH_VOCABULARY.length})</span>
                    <span className="px-2 py-0.5 rounded bg-indigo-200 dark:bg-indigo-900 text-[10px]">
                      {ENGLISH_VOCABULARY[vocabIndex].level}
                    </span>
                  </div>

                  <div
                    onClick={() => setShowVocabTranslation(!showVocabTranslation)}
                    className="cursor-pointer min-h-28 rounded-xl bg-white dark:bg-slate-900 p-5 text-center flex flex-col justify-center items-center border border-indigo-100 dark:border-indigo-800 shadow-sm"
                  >
                    <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
                      {ENGLISH_VOCABULARY[vocabIndex].word}
                    </span>
                    {showVocabTranslation ? (
                      <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 mt-2">
                        {ENGLISH_VOCABULARY[vocabIndex].translation}
                      </p>
                    ) : (
                      <span className="text-xs text-slate-400 mt-2">(Click card to reveal translation)</span>
                    )}
                    <p className="text-xs text-slate-500 italic mt-2">
                      “{ENGLISH_VOCABULARY[vocabIndex].example}”
                    </p>
                  </div>

                  <button
                    onClick={nextCard}
                    className="w-full py-2 rounded-xl bg-indigo-600 text-xs font-bold text-white hover:bg-indigo-700 transition"
                  >
                    Next Word (+2 XP) →
                  </button>
                </div>
              )}

              {/* Car Diagnostic Guide */}
              {selectedCategory.id === 'cars' && (
                <div className="space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Common Car Sounds & Quick Diagnostics:
                  </span>
                  <div className="space-y-2">
                    {CAR_SYMPTOMS.map((item, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60">
                        <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white">
                          <span>{item.symptom}</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] ${
                            item.urgency === 'Critical' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                          }`}>
                            {item.urgency}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                          Cause: {item.cause}
                        </p>
                        <p className="text-xs font-medium text-blue-600 dark:text-blue-400 mt-1">
                          Action: {item.action}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Guides List */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Featured Guides & Solutions
                </h4>
                <div className="space-y-2.5">
                  {selectedCategory.popularTopics.map((topic, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-400 bg-white dark:bg-slate-900 transition"
                    >
                      <div className="flex items-center gap-3">
                        <BookOpen className="h-4 w-4 text-blue-500" />
                        <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                          {topic}
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedCategory(null);
                          setActiveTab('ai');
                        }}
                        className="text-xs text-blue-600 dark:text-blue-400 font-medium hover:underline"
                      >
                        Ask AI →
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80 px-6 py-3 bg-slate-50/50 dark:bg-slate-900/50 text-xs">
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setActiveTab('tools');
                }}
                className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              >
                Browse all tools in Tools Center →
              </button>
              <button
                onClick={() => setSelectedCategory(null)}
                className="px-4 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
