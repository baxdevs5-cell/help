import React from 'react';
import { Star, ShieldCheck, CheckCircle2, ArrowRight, Sparkles, Heart } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const StatsAndCommunity: React.FC = () => {
  const { setActiveTab } = useApp();

  const stats = [
    { value: '18,500+', label: 'Problems Solved', sub: 'Across 14 categories' },
    { value: '17+', label: 'Precision Tools', sub: 'Calculators & converters' },
    { value: '5', label: 'Global Languages', sub: 'UZ, EN, RU, TR, AR' },
    { value: '100%', label: 'Free & Private', sub: 'No telemetry or ads' },
  ];

  const testimonials = [
    {
      name: 'Sherzod R.',
      role: 'IT Student',
      comment: 'Laptopim qotib qolganida HELP HUB Task Manager va tozalash bo‘yicha 5 daqiqada yordam berdi. Retseptlar vositasi ham ajoyib!',
      rating: 5,
      avatar: '👨‍💻'
    },
    {
      name: 'Elena S.',
      role: 'Freelance Designer',
      comment: 'The Pomodoro timer + Budget calculator in one place saves me from keeping 10 tabs open. Clean and very responsive interface.',
      rating: 5,
      avatar: '👩‍🎨'
    },
    {
      name: 'Murat K.',
      role: 'Software Engineer',
      comment: 'Hem Türkçe desteği olması hem de Gemini yapay zekasının pratik çözüm üretmesi harika. Startup seviyesinde bir platform.',
      rating: 5,
      avatar: '🚀'
    }
  ];

  return (
    <div className="space-y-16 py-12">
      {/* Live Platform Stats */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-8 sm:p-12 dark:border-slate-800 dark:bg-slate-900/60">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {stats.map((stat, idx) => (
              <div key={idx} className="space-y-1">
                <span className="font-mono text-3xl sm:text-4xl font-black tracking-tight text-blue-600 dark:text-blue-400">
                  {stat.value}
                </span>
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  {stat.label}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {stat.sub}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Testimonials */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Real Impact
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Trusted by Daily Problem Solvers
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            What users say about getting things done with HELP HUB
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-3">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-500" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic">
                  “{t.comment}”
                </p>
              </div>

              <div className="mt-5 flex items-center gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <span className="text-2xl">{t.avatar}</span>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">{t.name}</h4>
                  <p className="text-[10px] text-slate-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 sm:p-12 text-white shadow-xl text-center">
          <div className="relative max-w-2xl mx-auto space-y-4">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Ready to solve your next problem?
            </h2>
            <p className="text-sm sm:text-base text-blue-100 font-normal">
              Whether you need to fix your PC, calculate your monthly budget, or practice new English vocabulary — HELP HUB is right here.
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="rounded-2xl bg-white px-6 py-3 text-xs sm:text-sm font-bold text-blue-600 shadow-md hover:bg-blue-50 transition"
              >
                Ask a Question Now
              </button>
              <button
                onClick={() => {
                  setActiveTab('dashboard');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="rounded-2xl border border-white/30 bg-white/10 px-6 py-3 text-xs sm:text-sm font-bold text-white backdrop-blur-sm hover:bg-white/20 transition"
              >
                Open My Dashboard
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
