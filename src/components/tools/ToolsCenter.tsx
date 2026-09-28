import React, { useState } from 'react';
import {
  Percent,
  Coins,
  Scale,
  Ruler,
  Weight,
  Clock,
  Calendar,
  Cake,
  Activity,
  FileText,
  HardDrive,
  Palette,
  ShieldCheck,
  Wallet,
  PiggyBank,
  Timer,
  Hourglass,
  UtensilsCrossed,
  Search,
  Star,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TOOLS_LIST } from '../../data/mockData';
import { ToolDefinition } from '../../types';

export const ToolsCenter: React.FC = () => {
  const { t, setSelectedToolId, recordToolUsage, isFavorite, toggleFavorite } = useApp();
  const [filter, setFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const getToolIcon = (name: string) => {
    switch (name) {
      case 'Percent': return <Percent className="h-5 w-5" />;
      case 'Coins': return <Coins className="h-5 w-5" />;
      case 'Scale': return <Scale className="h-5 w-5" />;
      case 'Ruler': return <Ruler className="h-5 w-5" />;
      case 'Weight': return <Weight className="h-5 w-5" />;
      case 'Clock': return <Clock className="h-5 w-5" />;
      case 'Calendar': return <Calendar className="h-5 w-5" />;
      case 'Cake': return <Cake className="h-5 w-5" />;
      case 'Activity': return <Activity className="h-5 w-5" />;
      case 'FileText': return <FileText className="h-5 w-5" />;
      case 'HardDrive': return <HardDrive className="h-5 w-5" />;
      case 'Palette': return <Palette className="h-5 w-5" />;
      case 'ShieldCheck': return <ShieldCheck className="h-5 w-5" />;
      case 'Wallet': return <Wallet className="h-5 w-5" />;
      case 'PiggyBank': return <PiggyBank className="h-5 w-5" />;
      case 'Timer': return <Timer className="h-5 w-5" />;
      case 'Hourglass': return <Hourglass className="h-5 w-5" />;
      case 'UtensilsCrossed': return <UtensilsCrossed className="h-5 w-5" />;
      default: return <Sparkles className="h-5 w-5" />;
    }
  };

  const filteredTools = TOOLS_LIST.filter((tool) => {
    const matchesFilter = filter === 'all' || tool.category === filter;
    const matchesSearch =
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleLaunch = (tool: ToolDefinition) => {
    recordToolUsage(tool.id);
    setSelectedToolId(tool.id);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8 animate-fadeIn">
      {/* Top Banner */}
      <div className="rounded-3xl border border-slate-200 bg-gradient-to-r from-blue-600/5 via-indigo-600/5 to-purple-600/5 p-6 sm:p-8 dark:border-slate-800 dark:from-blue-950/20 dark:via-indigo-950/20 dark:to-purple-950/20">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
            <Sparkles className="h-3.5 w-3.5" />
            17+ Precision Tools & Utilities
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {t.tools.title}
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {t.tools.subtitle}
          </p>
        </div>

        {/* Search & Category Filter */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search calculator or tool..."
              className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 text-xs text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            />
          </div>

          {/* Interactive filter tabs */}
          <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-medium w-full sm:w-auto">
            {[
              { id: 'all', label: t.tools.filterAll },
              { id: 'calculators', label: t.tools.filterCalculators },
              { id: 'converters', label: t.tools.filterConverters },
              { id: 'productivity', label: t.tools.filterProductivity },
              { id: 'lifestyle', label: t.tools.filterLifestyle },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-3 py-1.5 rounded-lg transition ${
                  filter === tab.id
                    ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTools.map((tool) => {
          const favorited = isFavorite(tool.id);
          return (
            <div
              key={tool.id}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-500/50 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-500/50"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white dark:bg-blue-950/50 dark:text-blue-400 dark:group-hover:bg-blue-500 dark:group-hover:text-white">
                    {getToolIcon(tool.icon)}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(tool.id);
                    }}
                    className={`rounded-lg p-1.5 transition ${
                      favorited ? 'text-amber-500' : 'text-slate-300 hover:text-slate-500 dark:text-slate-600 dark:hover:text-slate-400'
                    }`}
                    title={favorited ? 'In Favorites' : 'Add to Favorites'}
                  >
                    <Star className={`h-4 w-4 ${favorited ? 'fill-amber-500' : ''}`} />
                  </button>
                </div>

                <div className="mt-4">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {tool.name}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                    {tool.description}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3 dark:border-slate-800">
                <span className="text-[11px] font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  {tool.category}
                </span>
                <button
                  onClick={() => handleLaunch(tool)}
                  className="flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-800 transition hover:bg-blue-600 hover:text-white dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-blue-600 dark:hover:text-white"
                >
                  <span>{t.tools.openTool}</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
