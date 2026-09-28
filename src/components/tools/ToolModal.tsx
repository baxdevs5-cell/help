import React from 'react';
import { X, Star, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TOOLS_LIST } from '../../data/mockData';
import {
  PercentageCalculator,
  CurrencyConverter,
  BMICalculator,
  AgeCalculator,
  SimpleBudgetCalculator,
  SavingsGoalCalculator,
  DateCalculator,
} from './CalculatorTools';
import {
  LengthConverter,
  WeightConverter,
  WordCounter,
  FileSizeConverter,
  PasswordTool,
  ColorPickerTool,
} from './UtilityTools';
import { StudyTimerTool, CountdownTimerTool } from './TimerTools';
import { RecipeFinderTool } from './RecipeFinderTool';

export const ToolModal: React.FC = () => {
  const { selectedToolId, setSelectedToolId, isFavorite, toggleFavorite, recordToolUsage } = useApp();

  if (!selectedToolId) return null;

  const tool = TOOLS_LIST.find((t) => t.id === selectedToolId);
  const favorited = isFavorite(selectedToolId);

  const renderToolComponent = () => {
    switch (selectedToolId) {
      case 'percentage_calculator':
        return <PercentageCalculator />;
      case 'currency_converter':
        return <CurrencyConverter />;
      case 'bmi_calculator':
        return <BMICalculator />;
      case 'age_calculator':
        return <AgeCalculator />;
      case 'budget_calculator':
        return <SimpleBudgetCalculator />;
      case 'savings_calculator':
        return <SavingsGoalCalculator />;
      case 'time_calculator':
      case 'date_calculator':
        return <DateCalculator />;
      case 'unit_converter':
      case 'length_converter':
        return <LengthConverter />;
      case 'weight_converter':
        return <WeightConverter />;
      case 'word_counter':
      case 'character_counter':
        return <WordCounter />;
      case 'file_size_converter':
        return <FileSizeConverter />;
      case 'color_picker':
        return <ColorPickerTool />;
      case 'password_checker':
        return <PasswordTool />;
      case 'study_timer':
        return <StudyTimerTool />;
      case 'countdown_timer':
        return <CountdownTimerTool />;
      case 'recipe_finder':
        return <RecipeFinderTool />;
      default:
        return <PercentageCalculator />;
    }
  };

  const handleClose = () => {
    setSelectedToolId(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-950 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 px-6 py-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {tool?.name || 'Interactive Tool'}
              </h3>
              <button
                onClick={() => toggleFavorite(selectedToolId)}
                className={`p-1 rounded-lg transition ${
                  favorited ? 'text-amber-500 fill-amber-500' : 'text-slate-400 hover:text-slate-600'
                }`}
                title={favorited ? 'Favorited' : 'Add to Favorites'}
              >
                <Star className={`h-4 w-4 ${favorited ? 'fill-amber-500' : ''}`} />
              </button>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {tool?.description}
            </p>
          </div>

          <button
            onClick={handleClose}
            className="flex h-8 w-8 items-center justify-center rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-900 dark:hover:text-slate-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tool Interactive Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {renderToolComponent()}
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80 px-6 py-3 bg-slate-50/50 dark:bg-slate-900/50 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <Sparkles className="h-3 w-3 text-blue-500" />
            +2 XP earned per interaction
          </span>
          <button
            onClick={handleClose}
            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
