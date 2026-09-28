import React from 'react';
import { HelpCircle, Search, CheckCircle, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const HowItWorks: React.FC = () => {
  const { t } = useApp();

  const steps = [
    {
      num: '01',
      title: t.howItWorks.step1Title,
      desc: t.howItWorks.step1Desc,
      icon: <HelpCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
      color: 'border-blue-500/30 bg-blue-500/5'
    },
    {
      num: '02',
      title: t.howItWorks.step2Title,
      desc: t.howItWorks.step2Desc,
      icon: <Search className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />,
      color: 'border-indigo-500/30 bg-indigo-500/5'
    },
    {
      num: '03',
      title: t.howItWorks.step3Title,
      desc: t.howItWorks.step3Desc,
      icon: <CheckCircle className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
      color: 'border-emerald-500/30 bg-emerald-500/5'
    },
  ];

  return (
    <section className="py-12 border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            {t.howItWorks.badge}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {t.howItWorks.heading}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {t.howItWorks.subheading}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className={`relative overflow-hidden rounded-3xl border ${step.color} p-6 sm:p-8 bg-white dark:bg-slate-900 shadow-sm transition hover:shadow-md`}
            >
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700">
                  {step.icon}
                </div>
                <span className="font-mono text-3xl font-black text-slate-200 dark:text-slate-800">
                  {step.num}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-5">
                {step.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
