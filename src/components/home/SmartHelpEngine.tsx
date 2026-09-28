import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Wrench,
  BookOpen,
  Plus,
  Loader2,
  Check
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ProblemDiagnosis } from '../../types';

interface Props {
  initialProblem?: string;
}

export const SmartHelpEngine: React.FC<Props> = ({ initialProblem }) => {
  const { t, language, setSelectedToolId, addTask, awardXp, recordSearch } = useApp();
  const [problemInput, setProblemInput] = useState(initialProblem || '');
  const [loading, setLoading] = useState(false);
  const [diagnosis, setDiagnosis] = useState<ProblemDiagnosis | null>(null);
  const [addedTasks, setAddedTasks] = useState<Record<number, boolean>>({});

  const handleDiagnose = async (queryText?: string) => {
    const q = queryText || problemInput;
    if (!q.trim()) return;

    recordSearch(q);
    setLoading(true);
    setDiagnosis(null);
    setAddedTasks({});

    try {
      const res = await fetch('/api/gemini/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ problem: q, language })
      });

      if (!res.ok) throw new Error('Network error');
      const data: ProblemDiagnosis = await res.json();
      setDiagnosis(data);
      awardXp(5, 'Smart Help Diagnosis');
    } catch (err) {
      console.error(err);
      // Emergency fallback in case fetch fails
      setDiagnosis({
        category: '💻 Computer & System',
        possibleCauses: [
          'Background apps consuming CPU & RAM',
          'Disk space almost full',
          'Temporary cache buildup'
        ],
        simpleExplanation: 'System performance slows down when disk space is low or too many background apps run simultaneously.',
        stepByStepSolutions: [
          'Open Task Manager and close unused background processes',
          'Clean disk space using cleanmgr (Windows) or purge caches',
          'Disable non-essential startup apps'
        ],
        relatedTools: ['file_size_converter', 'study_timer'],
        relatedArticles: ['Speeding up your computer in 5 steps'],
        recommendedNextActions: ['Check background tasks', 'Restart computer']
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddStepToTasks = (stepText: string, index: number) => {
    addTask(stepText, diagnosis?.category || 'General', 'medium');
    setAddedTasks((prev) => ({ ...prev, [index]: true }));
  };

  return (
    <div id="smart-help-section" className="space-y-6">
      {/* Search & Natural Input Box */}
      <div className="relative overflow-hidden rounded-3xl border border-blue-100 bg-white p-6 shadow-xl shadow-blue-500/5 dark:border-slate-800 dark:bg-slate-900/90 dark:shadow-none">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <input
            type="text"
            value={problemInput}
            onChange={(e) => setProblemInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleDiagnose()}
            placeholder={t.hero.searchPlaceholder}
            className="w-full flex-1 rounded-2xl border border-slate-200 bg-slate-50/70 px-5 py-4 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800/80 dark:text-white dark:focus:bg-slate-900"
          />
          <button
            onClick={() => handleDiagnose()}
            disabled={loading || !problemInput.trim()}
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-7 py-4 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition hover:opacity-95 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="h-4 w-4" />
            )}
            <span>{loading ? t.smartHelp.analyzing : t.hero.findHelpBtn}</span>
          </button>
        </div>

        {/* Suggestion Chips */}
        <div className="mt-4 flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/70">
          <span className="text-xs font-semibold text-slate-400">
            {t.hero.tryAsking}
          </span>
          {[
            { label: t.hero.examples.laptop, query: t.hero.examples.laptop },
            { label: t.hero.examples.cooking, query: t.hero.examples.cooking },
            { label: t.hero.examples.convert, query: t.hero.examples.convert },
            { label: t.hero.examples.exam, query: t.hero.examples.exam },
            { label: t.hero.examples.weather, query: t.hero.examples.weather },
          ].map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                setProblemInput(item.query);
                handleDiagnose(item.query);
              }}
              className="text-xs px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-blue-700 dark:hover:bg-blue-950/40 transition"
            >
              “{item.label}”
            </button>
          ))}
        </div>
      </div>

      {/* Resolution Pathway Result Card */}
      {diagnosis && (
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900 animate-slideUp">
          {/* Pathway Header Bar */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 text-white">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-200">
              {t.smartHelp.flowTitle}
            </span>
            <div className="mt-1 flex flex-wrap items-center gap-2 text-sm font-bold">
              <span className="truncate max-w-xs opacity-90">“{problemInput}”</span>
              <ArrowRight className="h-4 w-4 shrink-0 text-blue-300" />
              <span className="rounded-lg bg-white/20 px-2.5 py-0.5">{diagnosis.category}</span>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* Explanation */}
            <div className="flex items-start gap-3 rounded-2xl bg-blue-50/60 p-4 border border-blue-100 dark:bg-blue-950/20 dark:border-blue-900/50">
              <Lightbulb className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400">
                  {t.smartHelp.explanation}
                </h4>
                <p className="mt-1 text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                  {diagnosis.simpleExplanation}
                </p>
              </div>
            </div>

            {/* Possible Causes */}
            {diagnosis.possibleCauses?.length > 0 && (
              <div>
                <h4 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                  {t.smartHelp.causes}
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300">
                  {diagnosis.possibleCauses.map((cause, idx) => (
                    <li key={idx} className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                      <span>{cause}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Step by Step Solutions */}
            <div>
              <h4 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                {t.smartHelp.solutions}
              </h4>
              <div className="space-y-2.5">
                {diagnosis.stepByStepSolutions.map((step, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between gap-3 rounded-xl border border-slate-200/80 p-3.5 bg-white dark:border-slate-800 dark:bg-slate-900/70"
                  >
                    <div className="flex items-start gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-xs font-bold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                        {idx + 1}
                      </span>
                      <span className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200">
                        {step}
                      </span>
                    </div>
                    <button
                      onClick={() => handleAddStepToTasks(step, idx)}
                      disabled={addedTasks[idx]}
                      className="shrink-0 flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 disabled:text-emerald-600"
                    >
                      {addedTasks[idx] ? (
                        <>
                          <Check className="h-3 w-3 text-emerald-500" />
                          <span>Saved</span>
                        </>
                      ) : (
                        <>
                          <Plus className="h-3 w-3" />
                          <span className="hidden sm:inline">{t.smartHelp.addToDashboard}</span>
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Tools to Launch */}
            {diagnosis.relatedTools?.length > 0 && (
              <div>
                <h4 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  <Wrench className="h-4 w-4 text-indigo-500" />
                  {t.smartHelp.recommendedTools}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {diagnosis.relatedTools.map((toolId) => (
                    <button
                      key={toolId}
                      onClick={() => setSelectedToolId(toolId)}
                      className="flex items-center gap-2 rounded-xl bg-indigo-50 px-4 py-2 text-xs font-bold text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-950/50 dark:text-indigo-300 dark:hover:bg-indigo-900/60 transition"
                    >
                      <span>🛠️ {toolId.replace(/_/g, ' ').toUpperCase()}</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
