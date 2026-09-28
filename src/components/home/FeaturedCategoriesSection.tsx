import React from 'react';
import {
  Smartphone,
  GraduationCap,
  DollarSign,
  CloudSun,
  Gamepad2,
  Cpu,
  Utensils,
  Languages,
  Car,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CATEGORIES_LIST } from '../../data/mockData';

export const FeaturedCategoriesSection: React.FC = () => {
  const { t, setActiveTab } = useApp();

  const featured = CATEGORIES_LIST.slice(0, 6);

  const getIcon = (id: string) => {
    switch (id) {
      case 'tech': return <Smartphone className="h-5 w-5" />;
      case 'learning': return <GraduationCap className="h-5 w-5" />;
      case 'money': return <DollarSign className="h-5 w-5" />;
      case 'weather': return <CloudSun className="h-5 w-5" />;
      case 'gaming': return <Gamepad2 className="h-5 w-5" />;
      case 'computer': return <Cpu className="h-5 w-5" />;
      case 'recipes': return <Utensils className="h-5 w-5" />;
      case 'english': return <Languages className="h-5 w-5" />;
      case 'cars': return <Car className="h-5 w-5" />;
      default: return <Smartphone className="h-5 w-5" />;
    }
  };

  return (
    <section className="py-12 border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Structured Knowledge
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-1">
              {t.categories.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              {t.categories.subtitle}
            </p>
          </div>
          <button
            onClick={() => {
              setActiveTab('categories');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
          >
            <span>{t.categories.viewAll} (14 Hubs)</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((cat) => (
            <div
              key={cat.id}
              onClick={() => {
                setActiveTab('categories');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group cursor-pointer rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-500/50 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex items-center justify-between">
                <div className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr ${cat.color} text-white shadow-md`}>
                  {getIcon(cat.id)}
                </div>
                <span className="text-xs font-semibold text-slate-400">
                  {cat.topicsCount} guides
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 dark:text-white mt-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {cat.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                {cat.description}
              </p>

              <div className="mt-5 flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 text-xs font-semibold text-blue-600 dark:text-blue-400">
                <span>Explore Category</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
