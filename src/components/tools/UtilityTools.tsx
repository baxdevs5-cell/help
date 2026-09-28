import React, { useState } from 'react';
import { Copy, Check, RefreshCw, Shield, Key, Eye, EyeOff, Hash, Layers } from 'lucide-react';
import { useApp } from '../../context/AppContext';

// 1. Length Converter
export const LengthConverter: React.FC = () => {
  const [value, setValue] = useState('10');
  const [fromUnit, setFromUnit] = useState('m');

  const v = parseFloat(value) || 0;

  // Base in meters
  const toMeters: Record<string, number> = {
    mm: 0.001,
    cm: 0.01,
    m: 1,
    km: 1000,
    in: 0.0254,
    ft: 0.3048,
    yd: 0.9144,
    mi: 1609.344
  };

  const meters = v * (toMeters[fromUnit] || 1);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-medium text-slate-700 dark:text-slate-300">Enter Value</label>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full mt-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-slate-700 dark:text-slate-300">Source Unit</label>
          <select
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
            className="w-full mt-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm"
          >
            <option value="m">Meters (m)</option>
            <option value="km">Kilometers (km)</option>
            <option value="cm">Centimeters (cm)</option>
            <option value="mm">Millimeters (mm)</option>
            <option value="ft">Feet (ft)</option>
            <option value="in">Inches (in)</option>
            <option value="mi">Miles (mi)</option>
            <option value="yd">Yards (yd)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {[
          { label: 'Kilometers', val: meters / 1000, unit: 'km' },
          { label: 'Meters', val: meters, unit: 'm' },
          { label: 'Centimeters', val: meters * 100, unit: 'cm' },
          { label: 'Millimeters', val: meters * 1000, unit: 'mm' },
          { label: 'Feet', val: meters / 0.3048, unit: 'ft' },
          { label: 'Inches', val: meters / 0.0254, unit: 'in' },
          { label: 'Miles', val: meters / 1609.344, unit: 'mi' },
          { label: 'Yards', val: meters / 0.9144, unit: 'yd' },
        ].map((item) => (
          <div key={item.unit} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
            <span className="text-[10px] text-slate-400 font-medium">{item.label}</span>
            <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
              {item.val < 0.0001 ? item.val.toExponential(2) : item.val.toLocaleString('en-US', { maximumFractionDigits: 4 })}
            </p>
            <span className="text-[10px] text-slate-500 font-mono">{item.unit}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// 2. Weight Converter
export const WeightConverter: React.FC = () => {
  const [value, setValue] = useState('5');
  const [fromUnit, setFromUnit] = useState('kg');

  const v = parseFloat(value) || 0;

  // Base in grams
  const toGrams: Record<string, number> = {
    mg: 0.001,
    g: 1,
    kg: 1000,
    ton: 1000000,
    lb: 453.59237,
    oz: 28.34952
  };

  const grams = v * (toGrams[fromUnit] || 1);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-medium text-slate-700 dark:text-slate-300">Enter Weight</label>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full mt-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-slate-700 dark:text-slate-300">Unit</label>
          <select
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
            className="w-full mt-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm"
          >
            <option value="kg">Kilograms (kg)</option>
            <option value="g">Grams (g)</option>
            <option value="mg">Milligrams (mg)</option>
            <option value="lb">Pounds (lbs)</option>
            <option value="oz">Ounces (oz)</option>
            <option value="ton">Metric Tons (t)</option>
          </select>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-100 dark:bg-blue-950/30 dark:border-blue-900/50">
        <span className="text-[11px] font-semibold uppercase text-blue-600 dark:text-blue-400">
          Conversion Preview:
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
          <div>
            <p className="text-xs text-slate-500">Grams</p>
            <p className="text-lg font-bold text-slate-900 dark:text-white">{(grams).toLocaleString()} g</p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Kilograms</p>
            <p className="text-lg font-bold text-slate-900 dark:text-white">{(grams / 1000).toLocaleString()} kg</p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Pounds (lbs)</p>
            <p className="text-lg font-bold text-slate-900 dark:text-white">{(grams / 453.59237).toFixed(3)} lbs</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// 3. Word & Character Counter
export const WordCounter: React.FC = () => {
  const [text, setText] = useState('HELP HUB is an all-in-one digital assistance platform designed to help people solve everyday problems.');
  const [copied, setCopied] = useState(false);

  const trimmed = text.trim();
  const words = trimmed ? trimmed.split(/\s+/).length : 0;
  const chars = text.length;
  const charsNoSpaces = text.replace(/\s+/g, '').length;
  const paragraphs = trimmed ? text.split(/\n+/).filter(Boolean).length : 0;
  const readingTimeMin = (words / 200).toFixed(1);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-center">
          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{words}</span>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">Words</p>
        </div>
        <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-center">
          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{chars}</span>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">Characters</p>
        </div>
        <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-center">
          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{charsNoSpaces}</span>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">Without spaces</p>
        </div>
        <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-center">
          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">~{readingTimeMin} m</span>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">Read time</p>
        </div>
      </div>

      <div>
        <textarea
          rows={5}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or write your text here..."
          className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-3 text-sm text-slate-900 dark:text-white focus:border-blue-500 focus:outline-none"
        />
      </div>

      <div className="flex justify-between items-center text-xs">
        <span className="text-slate-500">Paragraphs: {paragraphs}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          <span>{copied ? 'Copied' : 'Copy Text'}</span>
        </button>
      </div>
    </div>
  );
};

// 4. File Size Converter
export const FileSizeConverter: React.FC = () => {
  const [val, setVal] = useState('1024');
  const [unit, setUnit] = useState('MB');

  const num = parseFloat(val) || 0;

  const toBytes: Record<string, number> = {
    B: 1,
    KB: 1024,
    MB: 1024 ** 2,
    GB: 1024 ** 3,
    TB: 1024 ** 4
  };

  const bytes = num * (toBytes[unit] || 1);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-medium text-slate-700 dark:text-slate-300">File Size</label>
          <input
            type="number"
            value={val}
            onChange={(e) => setVal(e.target.value)}
            className="w-full mt-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-slate-700 dark:text-slate-300">Unit</label>
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="w-full mt-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm"
          >
            <option value="B">Bytes (B)</option>
            <option value="KB">Kilobytes (KB)</option>
            <option value="MB">Megabytes (MB)</option>
            <option value="GB">Gigabytes (GB)</option>
            <option value="TB">Terabytes (TB)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {[
          { label: 'Gigabytes (GB)', val: (bytes / 1024 ** 3).toFixed(4) },
          { label: 'Megabytes (MB)', val: (bytes / 1024 ** 2).toFixed(2) },
          { label: 'Kilobytes (KB)', val: (bytes / 1024).toFixed(0) },
          { label: 'Terabytes (TB)', val: (bytes / 1024 ** 4).toFixed(6) },
          { label: 'Bytes (B)', val: bytes.toLocaleString() },
        ].map((item, idx) => (
          <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <span className="text-[11px] text-slate-400">{item.label}</span>
            <p className="text-base font-bold text-slate-900 dark:text-white mt-0.5">{item.val}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// 5. Password Strength Checker & Generator
export const PasswordTool: React.FC = () => {
  const { awardXp } = useApp();
  const [password, setPassword] = useState('H3lpHub!2026_Secure');
  const [showPassword, setShowPassword] = useState(true);
  const [length, setLength] = useState(16);
  const [useUpper, setUseUpper] = useState(true);
  const [useLower, setUseLower] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [copied, setCopied] = useState(false);

  // Evaluate password strength
  const calculateStrength = (pwd: string) => {
    let score = 0;
    if (pwd.length >= 8) score += 1;
    if (pwd.length >= 12) score += 1;
    if (pwd.length >= 16) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[a-z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;

    if (score <= 3) return { label: 'Weak', color: 'bg-red-500', text: 'text-red-500', percent: 25, crackTime: 'A few seconds' };
    if (score <= 5) return { label: 'Moderate', color: 'bg-amber-500', text: 'text-amber-500', percent: 60, crackTime: '3 days' };
    if (score <= 6) return { label: 'Strong', color: 'bg-blue-500', text: 'text-blue-500', percent: 85, crackTime: '500 years' };
    return { label: 'Unbreakable', color: 'bg-emerald-500', text: 'text-emerald-500', percent: 100, crackTime: '400 million years' };
  };

  const strength = calculateStrength(password);

  const generatePassword = () => {
    let chars = '';
    if (useUpper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (useLower) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (useNumbers) chars += '0123456789';
    if (useSymbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (!chars) chars = 'abcdefghijklmnopqrstuvwxyz';

    let result = '';
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);
    for (let i = 0; i < length; i++) {
      result += chars[array[i] % chars.length];
    }
    setPassword(result);
    awardXp(2, 'Generated secure password');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Password display & generator */}
      <div className="relative flex items-center">
        <input
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Type or generate password..."
          className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 py-2.5 pl-3.5 pr-24 font-mono text-sm text-slate-900 dark:text-white"
        />
        <div className="absolute right-2 flex items-center gap-1">
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
          <button
            onClick={handleCopy}
            className="rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-600 hover:bg-blue-100 dark:bg-blue-950/60 dark:text-blue-300"
          >
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      </div>

      {/* Strength Bar */}
      <div>
        <div className="flex justify-between items-center text-xs mb-1">
          <span className="text-slate-500">Security rating:</span>
          <span className={`font-semibold ${strength.text}`}>{strength.label} (Est. crack: {strength.crackTime})</span>
        </div>
        <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div
            className={`h-full ${strength.color} transition-all duration-300`}
            style={{ width: `${strength.percent}%` }}
          />
        </div>
      </div>

      {/* Generator controls */}
      <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Length: {length} chars</span>
          <input
            type="range"
            min={8}
            max={32}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-32"
          />
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={useUpper} onChange={(e) => setUseUpper(e.target.checked)} />
            <span>Uppercase (A-Z)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={useLower} onChange={(e) => setUseLower(e.target.checked)} />
            <span>Lowercase (a-z)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={useNumbers} onChange={(e) => setUseNumbers(e.target.checked)} />
            <span>Numbers (0-9)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={useSymbols} onChange={(e) => setUseSymbols(e.target.checked)} />
            <span>Symbols (!@#$)</span>
          </label>
        </div>

        <button
          onClick={generatePassword}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-2 text-xs font-semibold text-white hover:bg-blue-700 transition"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span>Generate New Password</span>
        </button>
      </div>
    </div>
  );
};

// 6. Color Picker & Palette
export const ColorPickerTool: React.FC = () => {
  const [color, setColor] = useState('#3b82f6');
  const [copiedHex, setCopiedHex] = useState(false);

  // Convert hex to rgb
  const hexToRgb = (hex: string) => {
    let c = hex.replace('#', '');
    if (c.length === 3) c = c.split('').map(char => char + char).join('');
    const num = parseInt(c, 16);
    return {
      r: (num >> 16) & 255,
      g: (num >> 8) & 255,
      b: num & 255
    };
  };

  const rgb = hexToRgb(color);
  const rgbString = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;

  const handleCopyHex = () => {
    navigator.clipboard.writeText(color);
    setCopiedHex(true);
    setTimeout(() => setCopiedHex(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="h-14 w-14 cursor-pointer rounded-xl border border-slate-300 dark:border-slate-700"
        />
        <div className="flex-1 space-y-1">
          <p className="text-xs text-slate-500">Selected Color</p>
          <div className="flex items-center gap-2">
            <span className="font-mono text-lg font-bold text-slate-900 dark:text-white uppercase">{color}</span>
            <button
              onClick={handleCopyHex}
              className="p-1 rounded text-slate-400 hover:text-slate-600"
            >
              {copiedHex ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
            </button>
          </div>
          <span className="text-xs font-mono text-slate-500">{rgbString}</span>
        </div>
      </div>

      <div>
        <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2 block">
          Preset Modern Shades:
        </span>
        <div className="flex flex-wrap gap-2">
          {['#2563eb', '#4f46e5', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#0f172a'].map((c) => (
            <button
              key={c}
              onClick={() => setColor(c)}
              className="h-8 w-8 rounded-lg shadow-sm transition hover:scale-110 border border-black/10"
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
