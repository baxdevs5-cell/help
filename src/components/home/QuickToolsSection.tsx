import React from 'react';
import {
  Percent,
  Coins,
  Activity,
  Timer,
  UtensilsCrossed,
  ShieldCheck,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TOOLS_LIST } from '../../data/mockData';

export const QuickToolsSection: React.FC = () => {
  const { t, setSelectedToolId, setActiveTab, recordToolUsage } = useApp();

  const featured = TOOLS_LIST.filter((tool) =>
    ['percentage_calculator', 'currency_converter', 'bmi_calculator', 'study_timer', 'recipe_finder', 'password_checker'].includes(tool.id)
  );

  const getIcon = (id: string) => {
    switch (id) {
      case 'percentage_calculator': return <Percent className="h-5 w-5" />;
      case 'currency_converter': return <Coins className="h-5 w-5" />;
      case 'bmi_calculator': return <Activity className="h-5 w-5" />;
      case 'study_timer': return <Timer className="h-5 w-5" />;
      case 'recipe_finder': return <UtensilsCrossed className="h-5 w-5" />;
      case 'password_checker': return <ShieldCheck className="h-5 w-5" />;
      default: return <Sparkles className="h-5 w-5" />;
    }
  };

  const handleOpen = (toolId: string) => {
    recordToolUsage(toolId);
    setSelectedToolId(toolId);
  };

  return (
    <section className="py-12 border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Instant Utilities
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-1">
              Popular Quick Tools
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Zero configuration — launch directly in one click
            </p>
          </div>
          <button
            onClick={() => {
              setActiveTab('tools');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
          >
            <span>View All 17+ Tools</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((tool) => (
            <div
              key={tool.id}
              onClick={() => handleOpen(tool.id)}
              className="group cursor-pointer rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-500/50 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition dark:bg-blue-950/50 dark:text-blue-400">
                  {getIcon(tool.id)}
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  {tool.category}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 dark:text-white mt-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {tool.name}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                {tool.description}
              </p>

              <div className="mt-5 flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300">
                <span>Launch Tool</span>
                <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
