import React from 'react';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Toast: React.FC = () => {
  const { toast } = useApp();

  if (!toast) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/95 px-4 py-3 shadow-2xl backdrop-blur-md transition-all dark:border-slate-800 dark:bg-slate-900/95">
      {toast.type === 'success' && <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />}
      {toast.type === 'warning' && <AlertCircle className="h-5 w-5 text-amber-500 shrink-0" />}
      {toast.type === 'info' && <Info className="h-5 w-5 text-blue-500 shrink-0" />}
      <span className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-100">
        {toast.message}
      </span>
    </div>
  );
};
