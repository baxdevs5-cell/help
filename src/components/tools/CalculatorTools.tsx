import React, { useState } from 'react';
import { Copy, Check, RotateCcw, ArrowRight, DollarSign, Calendar, Clock, Calculator, Heart, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

// 1. Percentage Calculator
export const PercentageCalculator: React.FC = () => {
  const { awardXp } = useApp();
  const [valA, setValA] = useState<string>('20');
  const [valB, setValB] = useState<string>('150');
  const [mode, setMode] = useState<'whatIsPercentOf' | 'isWhatPercentOf' | 'percentChange'>('whatIsPercentOf');
  const [copied, setCopied] = useState(false);

  const numA = parseFloat(valA) || 0;
  const numB = parseFloat(valB) || 0;

  let result = 0;
  let resultLabel = '';

  if (mode === 'whatIsPercentOf') {
    result = (numA / 100) * numB;
    resultLabel = `${numA}% of ${numB} = ${result.toFixed(2)}`;
  } else if (mode === 'isWhatPercentOf') {
    result = numB !== 0 ? (numA / numB) * 100 : 0;
    resultLabel = `${numA} is ${result.toFixed(2)}% of ${numB}`;
  } else {
    result = numA !== 0 ? ((numB - numA) / numA) * 100 : 0;
    resultLabel = `Change from ${numA} to ${numB} = ${result >= 0 ? '+' : ''}${result.toFixed(2)}%`;
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(result.toFixed(2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    awardXp(2, 'Calculated percentage');
  };

  return (
    <div className="space-y-4">
      {/* Mode Selector */}
      <div className="flex flex-wrap gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-medium">
        <button
          onClick={() => setMode('whatIsPercentOf')}
          className={`px-3 py-1.5 rounded-lg transition ${mode === 'whatIsPercentOf' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-300 shadow-sm' : 'text-slate-600 dark:text-slate-300'}`}
        >
          What is X% of Y?
        </button>
        <button
          onClick={() => setMode('isWhatPercentOf')}
          className={`px-3 py-1.5 rounded-lg transition ${mode === 'isWhatPercentOf' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-300 shadow-sm' : 'text-slate-600 dark:text-slate-300'}`}
        >
          X is what % of Y?
        </button>
        <button
          onClick={() => setMode('percentChange')}
          className={`px-3 py-1.5 rounded-lg transition ${mode === 'percentChange' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-300 shadow-sm' : 'text-slate-600 dark:text-slate-300'}`}
        >
          % Increase / Decrease
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
            {mode === 'whatIsPercentOf' ? 'Percentage (%)' : mode === 'isWhatPercentOf' ? 'Value (X)' : 'Initial Value'}
          </label>
          <input
            type="number"
            value={valA}
            onChange={(e) => setValA(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
            {mode === 'whatIsPercentOf' ? 'Total (Y)' : mode === 'isWhatPercentOf' ? 'Total (Y)' : 'Final Value'}
          </label>
          <input
            type="number"
            value={valB}
            onChange={(e) => setValB(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          />
        </div>
      </div>

      <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-100 dark:bg-blue-950/30 dark:border-blue-900/50 flex items-center justify-between">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Calculation Result
          </span>
          <p className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
            {resultLabel}
          </p>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-blue-200 bg-white text-xs font-medium text-blue-700 hover:bg-blue-50 dark:border-blue-800 dark:bg-slate-800 dark:text-blue-300"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
    </div>
  );
};

// 2. Currency Converter
export const CurrencyConverter: React.FC = () => {
  const { awardXp } = useApp();
  const [amount, setAmount] = useState<string>('100');
  const [from, setFrom] = useState<string>('USD');
  const [to, setTo] = useState<string>('UZS');

  // Rates based on USD baseline
  const ratesToUsd: Record<string, number> = {
    USD: 1.0,
    EUR: 1.08,
    UZS: 0.000078, // ~12,850 UZS per USD
    RUB: 0.0108,   // ~92.5 RUB per USD
    TRY: 0.029,    // ~34.5 TRY per USD
    SAR: 0.2667,   // 3.75 SAR per USD
  };

  const parsedAmount = parseFloat(amount) || 0;
  // Convert from currency -> USD -> to currency
  const inUsd = parsedAmount * ratesToUsd[from];
  const converted = inUsd / ratesToUsd[to];

  const handleSwap = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
    awardXp(1);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
            Amount
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
            From Currency
          </label>
          <select
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          >
            <option value="USD">USD - US Dollar ($)</option>
            <option value="UZS">UZS - Uzbek Som (so'm)</option>
            <option value="EUR">EUR - Euro (€)</option>
            <option value="RUB">RUB - Russian Ruble (₽)</option>
            <option value="TRY">TRY - Turkish Lira (₺)</option>
            <option value="SAR">SAR - Saudi Riyal (﷼)</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
            To Currency
          </label>
          <select
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          >
            <option value="UZS">UZS - Uzbek Som (so'm)</option>
            <option value="USD">USD - US Dollar ($)</option>
            <option value="EUR">EUR - Euro (€)</option>
            <option value="RUB">RUB - Russian Ruble (₽)</option>
            <option value="TRY">TRY - Turkish Lira (₺)</option>
            <option value="SAR">SAR - Saudi Riyal (﷼)</option>
          </select>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleSwap}
          className="text-xs px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition"
        >
          ⇄ Swap Currencies
        </button>
      </div>

      <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-100 dark:bg-emerald-950/30 dark:border-emerald-900/50">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
          Exchange Result
        </span>
        <div className="flex items-baseline gap-2 mt-1">
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white">
            {converted.toLocaleString('en-US', { maximumFractionDigits: 2 })}
          </p>
          <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
            {to}
          </span>
        </div>
        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
          1 {from} ≈ {(ratesToUsd[from] / ratesToUsd[to]).toFixed(4)} {to} (Mid-market simulated rate)
        </p>
      </div>
    </div>
  );
};

// 3. BMI Calculator
export const BMICalculator: React.FC = () => {
  const { awardXp } = useApp();
  const [heightCm, setHeightCm] = useState<string>('175');
  const [weightKg, setWeightKg] = useState<string>('70');

  const h = (parseFloat(heightCm) || 0) / 100;
  const w = parseFloat(weightKg) || 0;
  const bmi = h > 0 ? w / (h * h) : 0;

  let category = 'Normal weight';
  let color = 'text-emerald-600 dark:text-emerald-400';
  let tip = 'Your BMI is in the healthy optimal range!';

  if (bmi < 18.5) {
    category = 'Underweight';
    color = 'text-amber-500';
    tip = 'Consider a nutrient-dense diet and resistance strength training.';
  } else if (bmi >= 18.5 && bmi < 25) {
    category = 'Healthy / Normal';
    color = 'text-emerald-600 dark:text-emerald-400';
    tip = 'Maintain balanced nutrition and regular physical activity.';
  } else if (bmi >= 25 && bmi < 30) {
    category = 'Overweight';
    color = 'text-orange-500';
    tip = 'Daily brisk walking and balanced portion sizes recommended.';
  } else {
    category = 'Obese';
    color = 'text-red-600 dark:text-red-400';
    tip = 'Consult a healthcare professional for personalized guidance.';
  }

  // Ideal weight range for height: 18.5 to 24.9
  const minIdeal = (18.5 * h * h).toFixed(1);
  const maxIdeal = (24.9 * h * h).toFixed(1);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
            Height (cm)
          </label>
          <input
            type="number"
            value={heightCm}
            onChange={(e) => setHeightCm(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
            Weight (kg)
          </label>
          <input
            type="number"
            value={weightKg}
            onChange={(e) => setWeightKg(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          />
        </div>
      </div>

      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 dark:bg-slate-900 dark:border-slate-800">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500">BMI INDEX</span>
          <span className={`text-xs font-bold ${color}`}>{category}</span>
        </div>
        <p className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
          {bmi > 0 ? bmi.toFixed(1) : '--'}
        </p>
        <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">{tip}</p>
        <div className="mt-3 text-[11px] text-slate-500 dark:text-slate-400">
          Ideal weight for {heightCm} cm: <span className="font-semibold text-slate-700 dark:text-slate-200">{minIdeal} – {maxIdeal} kg</span>
        </div>
      </div>
    </div>
  );
};

// 4. Age Calculator
export const AgeCalculator: React.FC = () => {
  const [birthDate, setBirthDate] = useState<string>('2000-01-15');

  const bDate = new Date(birthDate);
  const now = new Date();

  let years = now.getFullYear() - bDate.getFullYear();
  let months = now.getMonth() - bDate.getMonth();
  let days = now.getDate() - bDate.getDate();

  if (days < 0) {
    months -= 1;
    days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  // Next birthday calculation
  let nextBday = new Date(now.getFullYear(), bDate.getMonth(), bDate.getDate());
  if (nextBday < now) {
    nextBday.setFullYear(now.getFullYear() + 1);
  }
  const daysToNext = Math.ceil((nextBday.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  const totalDaysLived = Math.floor((now.getTime() - bDate.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
          Select Date of Birth
        </label>
        <input
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
        />
      </div>

      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-xl">
          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{years}</span>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">Years</p>
        </div>
        <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-xl">
          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{months}</span>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">Months</p>
        </div>
        <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-xl">
          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{days}</span>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">Days</p>
        </div>
      </div>

      <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-xs text-slate-600 dark:text-slate-300 space-y-1">
        <div className="flex justify-between">
          <span>Next Birthday:</span>
          <span className="font-semibold text-slate-900 dark:text-white">In {daysToNext} days</span>
        </div>
        <div className="flex justify-between">
          <span>Total Days Lived:</span>
          <span className="font-semibold text-slate-900 dark:text-white">{totalDaysLived.toLocaleString()} days</span>
        </div>
      </div>
    </div>
  );
};

// 5. Simple Budget Calculator
export const SimpleBudgetCalculator: React.FC = () => {
  const { awardXp } = useApp();
  const [income, setIncome] = useState<string>('1200');
  const [housing, setHousing] = useState<string>('400');
  const [food, setFood] = useState<string>('300');
  const [transport, setTransport] = useState<string>('100');
  const [bills, setBills] = useState<string>('100');
  const [entertainment, setEntertainment] = useState<string>('100');

  const inc = parseFloat(income) || 0;
  const h = parseFloat(housing) || 0;
  const f = parseFloat(food) || 0;
  const t = parseFloat(transport) || 0;
  const b = parseFloat(bills) || 0;
  const e = parseFloat(entertainment) || 0;

  const totalNeeds = h + f + t + bills ? h + f + t + b : 0;
  const totalWants = e;
  const totalExpenses = totalNeeds + totalWants;
  const netSavings = inc - totalExpenses;
  const savingsRate = inc > 0 ? (netSavings / inc) * 100 : 0;

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
          Monthly Net Income ($)
        </label>
        <input
          type="number"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        <div>
          <label className="text-[11px] text-slate-500 dark:text-slate-400">Housing / Rent</label>
          <input
            type="number"
            value={housing}
            onChange={(e) => setHousing(e.target.value)}
            className="w-full mt-0.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2.5 py-1.5 text-xs"
          />
        </div>
        <div>
          <label className="text-[11px] text-slate-500 dark:text-slate-400">Groceries & Food</label>
          <input
            type="number"
            value={food}
            onChange={(e) => setFood(e.target.value)}
            className="w-full mt-0.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2.5 py-1.5 text-xs"
          />
        </div>
        <div>
          <label className="text-[11px] text-slate-500 dark:text-slate-400">Transport / Gas</label>
          <input
            type="number"
            value={transport}
            onChange={(e) => setTransport(e.target.value)}
            className="w-full mt-0.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2.5 py-1.5 text-xs"
          />
        </div>
        <div>
          <label className="text-[11px] text-slate-500 dark:text-slate-400">Utilities & Bills</label>
          <input
            type="number"
            value={bills}
            onChange={(e) => setBills(e.target.value)}
            className="w-full mt-0.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2.5 py-1.5 text-xs"
          />
        </div>
        <div>
          <label className="text-[11px] text-slate-500 dark:text-slate-400">Entertainment</label>
          <input
            type="number"
            value={entertainment}
            onChange={(e) => setEntertainment(e.target.value)}
            className="w-full mt-0.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2.5 py-1.5 text-xs"
          />
        </div>
      </div>

      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 dark:bg-slate-900 dark:border-slate-800 space-y-2">
        <div className="flex justify-between items-center text-xs">
          <span className="text-slate-500">Total Outflow:</span>
          <span className="font-semibold text-slate-900 dark:text-white">${totalExpenses.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center text-xs">
          <span className="text-slate-500">Remaining for Savings:</span>
          <span className={`font-bold ${netSavings >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500'}`}>
            ${netSavings.toFixed(2)} ({savingsRate.toFixed(1)}%)
          </span>
        </div>
        <div className="pt-2 text-[11px] text-slate-500 dark:text-slate-400">
          💡 50/30/20 Guideline: Target Needs ≈ ${(inc * 0.5).toFixed(0)}, Wants ≈ ${(inc * 0.3).toFixed(0)}, Savings ≈ ${(inc * 0.2).toFixed(0)}
        </div>
      </div>
    </div>
  );
};

// 6. Savings Goal Calculator
export const SavingsGoalCalculator: React.FC = () => {
  const [goalName, setGoalName] = useState('New Laptop / Trip');
  const [target, setTarget] = useState('1500');
  const [current, setCurrent] = useState('300');
  const [monthly, setMonthly] = useState('150');

  const tgt = parseFloat(target) || 0;
  const cur = parseFloat(current) || 0;
  const mon = parseFloat(monthly) || 0;

  const remaining = Math.max(0, tgt - cur);
  const monthsNeeded = mon > 0 ? Math.ceil(remaining / mon) : 0;
  const progressPercent = tgt > 0 ? Math.min(100, Math.round((cur / tgt) * 100)) : 0;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-medium text-slate-700 dark:text-slate-300">Goal Description</label>
          <input
            type="text"
            value={goalName}
            onChange={(e) => setGoalName(e.target.value)}
            className="w-full mt-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-slate-700 dark:text-slate-300">Target Amount ($)</label>
          <input
            type="number"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            className="w-full mt-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-slate-700 dark:text-slate-300">Current Saved ($)</label>
          <input
            type="number"
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
            className="w-full mt-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-slate-700 dark:text-slate-300">Monthly Deposit ($)</label>
          <input
            type="number"
            value={monthly}
            onChange={(e) => setMonthly(e.target.value)}
            className="w-full mt-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-100 dark:bg-purple-950/30 dark:border-purple-900/50 space-y-2">
        <div className="flex justify-between items-center text-xs font-semibold text-purple-900 dark:text-purple-300">
          <span>Goal Progress</span>
          <span>{progressPercent}% (${cur} / ${tgt})</span>
        </div>
        <div className="h-2.5 w-full bg-purple-200 dark:bg-purple-900/60 rounded-full overflow-hidden">
          <div
            className="h-full bg-purple-600 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="text-xs text-slate-700 dark:text-slate-300 pt-1">
          At ${mon}/month, you will reach your goal in <span className="font-bold text-purple-700 dark:text-purple-300">{monthsNeeded} months</span> (around {new Date(Date.now() + monthsNeeded * 30 * 24 * 60 * 60 * 1000).toLocaleString('default', { month: 'short', year: 'numeric' })}).
        </div>
      </div>
    </div>
  );
};

// 7. Time & Date Calculator
export const DateCalculator: React.FC = () => {
  const [startDate, setStartDate] = useState('2026-09-27');
  const [endDate, setEndDate] = useState('2026-12-31');

  const d1 = new Date(startDate);
  const d2 = new Date(endDate);
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const diffWeeks = (diffDays / 7).toFixed(1);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-medium text-slate-700 dark:text-slate-300">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full mt-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-slate-700 dark:text-slate-300">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full mt-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2 text-sm"
          />
        </div>
      </div>

      <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-100 dark:bg-blue-950/30 dark:border-blue-900/50 flex items-center justify-around text-center">
        <div>
          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{diffDays}</span>
          <p className="text-xs text-slate-500">Days Difference</p>
        </div>
        <div className="h-8 w-px bg-blue-200 dark:bg-blue-800" />
        <div>
          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{diffWeeks}</span>
          <p className="text-xs text-slate-500">Weeks</p>
        </div>
      </div>
    </div>
  );
};
