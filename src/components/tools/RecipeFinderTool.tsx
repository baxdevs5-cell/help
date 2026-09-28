import React, { useState } from 'react';
import { Utensils, Check, Clock, Flame, ChevronRight, Plus, X } from 'lucide-react';
import { RECIPES_DATA } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

export const RecipeFinderTool: React.FC = () => {
  const { awardXp } = useApp();
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>(['egg', 'potato']);
  const [activeRecipe, setActiveRecipe] = useState<string | null>(null);

  const availableIngredients = [
    { id: 'egg', label: '🥚 Egg (Tuxum)' },
    { id: 'potato', label: '🥔 Potato (Kartoshka)' },
    { id: 'tomato', label: '🍅 Tomato (Pomidor)' },
    { id: 'onion', label: '🧅 Onion (Piyoz)' },
    { id: 'cheese', label: '🧀 Cheese (Pishloq)' },
    { id: 'flour', label: '🌾 Flour (Un)' },
    { id: 'oil', label: '🫒 Oil (Yog‘)' },
    { id: 'salt', label: '🧂 Salt (Tuz)' },
  ];

  const toggleIngredient = (id: string) => {
    setSelectedIngredients((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
    awardXp(1);
  };

  // Score each recipe based on how many selected ingredients match
  const scoredRecipes = RECIPES_DATA.map((recipe) => {
    const matchedCount = recipe.ingredients.filter((ing) =>
      selectedIngredients.includes(ing)
    ).length;
    const matchRate = Math.round((matchedCount / recipe.ingredients.length) * 100);
    return {
      ...recipe,
      matchRate,
      matchedCount
    };
  }).sort((a, b) => b.matchRate - a.matchRate);

  return (
    <div className="space-y-5">
      <div>
        <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
          Select what you have in your fridge & pantry:
        </h4>
        <div className="flex flex-wrap gap-2">
          {availableIngredients.map((item) => {
            const isSelected = selectedIngredients.includes(item.id);
            return (
              <button
                key={item.id}
                onClick={() => toggleIngredient(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition ${
                  isSelected
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <span>{item.label}</span>
                {isSelected ? <Check className="h-3 w-3" /> : <Plus className="h-3 w-3 opacity-60" />}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Matched Recipes ({scoredRecipes.filter((r) => r.matchRate > 0).length} found):
        </h4>

        <div className="grid grid-cols-1 gap-3">
          {scoredRecipes.map((recipe) => {
            const isExpanded = activeRecipe === recipe.id;
            return (
              <div
                key={recipe.id}
                className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition hover:border-slate-300 dark:hover:border-slate-700"
              >
                <div
                  onClick={() => setActiveRecipe(isExpanded ? null : recipe.id)}
                  className="flex cursor-pointer items-center justify-between p-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{recipe.image}</span>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        {recipe.title}
                      </h4>
                      <div className="flex items-center gap-3 text-xs text-slate-500 mt-0.5">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {recipe.prepTime}
                        </span>
                        <span className="flex items-center gap-1">
                          <Flame className="h-3 w-3 text-orange-500" />
                          {recipe.calories}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className={`text-xs font-bold ${
                        recipe.matchRate >= 60 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-500'
                      }`}>
                        {recipe.matchRate}% Match
                      </span>
                    </div>
                    <ChevronRight className={`h-4 w-4 text-slate-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                  </div>
                </div>

                {isExpanded && (
                  <div className="border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/40 p-4 space-y-3">
                    <div>
                      <h5 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                        Ingredients Needed:
                      </h5>
                      <div className="flex flex-wrap gap-1.5">
                        {recipe.ingredients.map((ing) => {
                          const hasIt = selectedIngredients.includes(ing);
                          return (
                            <span
                              key={ing}
                              className={`text-xs px-2.5 py-1 rounded-lg font-medium ${
                                hasIt
                                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                                  : 'bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                              }`}
                            >
                              {ing} {hasIt ? '✓' : '(missing)'}
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <h5 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                        Preparation Steps:
                      </h5>
                      <ol className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                        {recipe.instructions.map((step, idx) => (
                          <li key={idx} className="flex gap-2">
                            <span className="font-bold text-rose-600 dark:text-rose-400">{idx + 1}.</span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
