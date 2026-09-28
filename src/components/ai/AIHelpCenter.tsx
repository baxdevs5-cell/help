import React, { useState, useRef, useEffect } from 'react';
import {
  Brain,
  Send,
  Sparkles,
  Bot,
  User,
  Trash2,
  Copy,
  Check,
  Loader2,
  HelpCircle,
  Lightbulb,
  Compass,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  time: string;
  suggestedNextSteps?: string[];
}

export const AIHelpCenter: React.FC = () => {
  const { t, language, awardXp, setSelectedToolId } = useApp();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm_welcome',
      role: 'assistant',
      text: language === 'uz'
        ? "Salom! Men HELP HUB AI yordamchisiman. Sizga qanday yordam bera olaman? Texnologiya, ta'lim, moliya, avtomobil yoki kundalik rejalashtirish bo‘yicha har qanday savolingizni bering!"
        : "Hello! I am your HELP HUB AI assistant. What can I help you with today? Feel free to ask about tech, education, finance, cars, or personal planning!",
      time: 'Just now'
    }
  ]);
  const [input, setInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Technology');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const categories = [
    { id: 'Technology', label: '💻 Technology' },
    { id: 'Education', label: '📚 Education' },
    { id: 'Money', label: '💰 Money' },
    { id: 'Cars', label: '🚗 Cars' },
    { id: 'Food', label: '🍳 Food' },
    { id: 'Gaming', label: '🎮 Gaming' },
    { id: 'Travel', label: '🌍 Travel' },
    { id: 'Writing', label: '📝 Writing' },
    { id: 'Ideas', label: '💡 Ideas' },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (customPrompt?: string) => {
    const textToSend = customPrompt || input;
    if (!textToSend.trim() || loading) return;

    const userMsg: Message = {
      id: `u_${Date.now()}`,
      role: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          category: selectedCategory,
          language,
          history: messages.slice(-6).map((m) => ({ role: m.role, text: m.text }))
        })
      });

      if (!res.ok) throw new Error('API request failed');
      const data = await res.json();

      const aiMsg: Message = {
        id: `ai_${Date.now()}`,
        role: 'assistant',
        text: data.reply || 'Here is what I recommend for your situation.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedNextSteps: data.suggestedNextSteps
      };

      setMessages((prev) => [...prev, aiMsg]);
      awardXp(5, 'Engaged with AI Assistant');
    } catch (err) {
      console.error(err);
      const fallbackMsg: Message = {
        id: `ai_${Date.now()}`,
        role: 'assistant',
        text: "I analyzed your question. For immediate solutions, explore our interactive toolkit (Calculators, Pomodoro Study Timer, or Recipe Finder). What specific step would you like to take next?",
        time: 'Just now'
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  const copyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const clearChat = () => {
    setMessages([
      {
        id: `welcome_${Date.now()}`,
        role: 'assistant',
        text: "Chat cleared. What else can I help you solve today?",
        time: 'Just now'
      }
    ]);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
            <Sparkles className="h-3.5 w-3.5" />
            Gemini 3.8 Intelligence Engine
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-2">
            “What can I help you with?”
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {t.ai.subtitle}
          </p>
        </div>

        <button
          onClick={clearChat}
          className="flex items-center gap-1.5 self-start sm:self-center px-3 py-1.5 text-xs text-slate-500 hover:text-red-500 transition rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800"
        >
          <Trash2 className="h-3.5 w-3.5" />
          <span>Clear Chat</span>
        </button>
      </div>

      {/* Category Picker */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`whitespace-nowrap px-3.5 py-1.5 rounded-xl text-xs font-medium transition ${
              selectedCategory === cat.id
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-blue-400'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Chat Area */}
      <div className="flex flex-col h-[520px] rounded-3xl border border-slate-200 bg-white shadow-md dark:border-slate-800 dark:bg-slate-950 overflow-hidden">
        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.role === 'assistant' && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-sm">
                  <Bot className="h-4 w-4" />
                </div>
              )}

              <div className={`relative max-w-xl rounded-2xl p-4 text-sm leading-relaxed ${
                m.role === 'user'
                  ? 'bg-blue-600 text-white shadow-sm rounded-br-none'
                  : 'bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-100 border border-slate-200/60 dark:border-slate-800 rounded-bl-none'
              }`}>
                <div className="whitespace-pre-wrap font-sans text-xs sm:text-sm">
                  {m.text}
                </div>

                {m.suggestedNextSteps && m.suggestedNextSteps.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-wrap gap-1.5">
                    {m.suggestedNextSteps.map((step, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(step)}
                        className="text-[11px] px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 border border-slate-200 dark:border-slate-700 hover:bg-blue-50 transition"
                      >
                        → {step}
                      </button>
                    ))}
                  </div>
                )}

                <div className="mt-2 flex items-center justify-between text-[10px] opacity-70">
                  <span>{m.time}</span>
                  {m.role === 'assistant' && (
                    <button
                      onClick={() => copyMessage(m.id, m.text)}
                      className="hover:opacity-100 transition p-1"
                    >
                      {copiedId === m.id ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                    </button>
                  )}
                </div>
              </div>

              {m.role === 'user' && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200">
                  <User className="h-4 w-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 justify-start items-center">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">
                <Bot className="h-4 w-4" />
              </div>
              <div className="flex items-center gap-2 rounded-2xl bg-slate-100 px-4 py-3 text-xs text-slate-500 dark:bg-slate-900 dark:text-slate-400">
                <Loader2 className="h-3.5 w-3.5 animate-spin text-blue-500" />
                <span>{t.ai.thinking}</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Quick Prompts */}
        <div className="border-t border-slate-100 bg-slate-50/70 p-2 dark:border-slate-800/80 dark:bg-slate-900/40">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none px-2 py-1">
            {t.ai.suggestedPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                className="whitespace-nowrap rounded-lg border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600 hover:border-blue-400 hover:text-blue-600 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-blue-500 transition"
              >
                “{prompt}”
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="border-t border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-950">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={t.ai.inputPlaceholder}
              className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-white"
            />
            <button
              onClick={() => handleSend()}
              disabled={loading || !input.trim()}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md transition hover:bg-blue-700 disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-2 text-center text-[10px] text-slate-400">
            {t.ai.disclaimer}
          </p>
        </div>
      </div>
    </div>
  );
};
