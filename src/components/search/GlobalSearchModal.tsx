import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Wrench, FolderTree, BookOpen, Utensils, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TOOLS_LIST, CATEGORIES_LIST, RECIPES_DATA } from '../../data/mockData';

export const GlobalSearchModal: React.FC = () => {
  const { searchModalOpen, setSearchModalOpen, setSelectedToolId, setActiveTab, recordSearch } = useApp();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchModalOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [searchModalOpen]);

  if (!searchModalOpen) return null;

  const q = query.trim().toLowerCase();

  // Search through Tools
  const matchedTools = q
    ? TOOLS_LIST.filter(
        (t) => t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)
      )
    : TOOLS_LIST.slice(0, 4);

  // Search through Categories
  const matchedCategories = q
    ? CATEGORIES_LIST.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.popularTopics.some((p) => p.toLowerCase().includes(q))
      )
    : CATEGORIES_LIST.slice(0, 3);

  // Search through Recipes
  const matchedRecipes = q
    ? RECIPES_DATA.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.ingredients.some((ing) => ing.toLowerCase().includes(q))
      )
    : [];

  const handleSelectTool = (toolId: string) => {
    recordSearch(query);
    setSelectedToolId(toolId);
    setSearchModalOpen(false);
  };

  const handleSelectCategory = () => {
    recordSearch(query);
    setActiveTab('categories');
    setSearchModalOpen(false);
  };

  const handleSelectRecipe = () => {
    recordSearch(query);
    setSelectedToolId('recipe_finder');
    setSearchModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-950 flex flex-col">
        {/* Search Input Bar */}
        <div className="flex items-center border-b border-slate-200 dark:border-slate-800 px-4 py-3.5">
          <Search className="h-5 w-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search all tools, categories, recipes, and guides..."
            className="w-full bg-transparent px-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none dark:text-white"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <kbd className="ml-2 rounded bg-slate-100 px-2 py-0.5 text-[10px] font-mono text-slate-500 dark:bg-slate-800">
            ESC
          </kbd>
        </div>

        {/* Results stream */}
        <div className="max-h-96 overflow-y-auto p-4 space-y-4">
          {/* Tools Group */}
          {matchedTools.length > 0 && (
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2">
                🧰 Interactive Tools ({matchedTools.length})
              </span>
              <div className="mt-1 space-y-1">
                {matchedTools.map((tool) => (
                  <div
                    key={tool.id}
                    onClick={() => handleSelectTool(tool.id)}
                    className="flex cursor-pointer items-center justify-between p-2.5 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-950/40 transition"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300">
                        <Wrench className="h-3.5 w-3.5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-slate-900 dark:text-white">
                          {tool.name}
                        </h4>
                        <p className="text-[11px] text-slate-500 truncate max-w-sm">
                          {tool.description}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Categories Group */}
          {matchedCategories.length > 0 && (
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2">
                📂 Knowledge Categories ({matchedCategories.length})
              </span>
              <div className="mt-1 space-y-1">
                {matchedCategories.map((cat) => (
                  <div
                    key={cat.id}
                    onClick={handleSelectCategory}
                    className="flex cursor-pointer items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 transition"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-300">
                        <FolderTree className="h-3.5 w-3.5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-slate-900 dark:text-white">
                          {cat.title}
                        </h4>
                        <p className="text-[11px] text-slate-500 truncate max-w-sm">
                          {cat.description}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recipes Group */}
          {matchedRecipes.length > 0 && (
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2">
                🍳 Recipes ({matchedRecipes.length})
              </span>
              <div className="mt-1 space-y-1">
                {matchedRecipes.map((rec) => (
                  <div
                    key={rec.id}
                    onClick={handleSelectRecipe}
                    className="flex cursor-pointer items-center justify-between p-2.5 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/40 transition"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-base">{rec.image}</span>
                      <div>
                        <h4 className="text-xs font-semibold text-slate-900 dark:text-white">
                          {rec.title}
                        </h4>
                        <p className="text-[11px] text-slate-500">
                          {rec.prepTime} · {rec.ingredients.join(', ')}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {q && matchedTools.length === 0 && matchedCategories.length === 0 && matchedRecipes.length === 0 && (
            <div className="py-8 text-center text-xs text-slate-400">
              No matching tools or guides found for “{query}”. Try searching for “percentage”, “weather”, “bmi”, or “laptop”.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-100 bg-slate-50 px-4 py-2 text-[11px] text-slate-400 dark:border-slate-800 dark:bg-slate-900/50 flex justify-between">
          <span>Pro tip: Press Esc anytime to close</span>
          <span>HELP HUB Fast Search</span>
        </div>
      </div>
    </div>
  );
};
