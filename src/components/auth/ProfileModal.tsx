import React, { useState } from 'react';
import { X, User, Mail, Shield, Award, Star, Flame, Sparkles, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { INITIAL_ACHIEVEMENTS } from '../../data/mockData';

export const ProfileModal: React.FC = () => {
  const { profileModalOpen, setProfileModalOpen, user, updateUser, favorites, tasks, showToast } = useApp();
  const [tab, setTab] = useState<'profile' | 'login' | 'register'>('profile');
  const [editName, setEditName] = useState(user.name);
  const [editEmail, setEditEmail] = useState(user.email);
  const [editAvatar, setEditAvatar] = useState(user.avatar);

  if (!profileModalOpen) return null;

  const avatars = ['👨‍💻', '👩‍💻', '🧠', '🚀', '⚡', '🌟', '🎯', '🦁'];

  const handleSave = () => {
    updateUser({
      name: editName,
      email: editEmail,
      avatar: editAvatar
    });
    showToast('Profile updated successfully!', 'success');
    setProfileModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-950 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 px-6 py-4">
          <div className="flex gap-2">
            <button
              onClick={() => setTab('profile')}
              className={`text-xs font-bold px-3 py-1 rounded-lg transition ${
                tab === 'profile' ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-300' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Profile & Activity
            </button>
            <button
              onClick={() => setTab('login')}
              className={`text-xs font-bold px-3 py-1 rounded-lg transition ${
                tab === 'login' ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-300' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setTab('register')}
              className={`text-xs font-bold px-3 py-1 rounded-lg transition ${
                tab === 'register' ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-300' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Register
            </button>
          </div>

          <button
            onClick={() => setProfileModalOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-900 dark:hover:text-slate-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {tab === 'profile' && (
            <div className="space-y-5">
              {/* Avatar Selector */}
              <div className="flex items-center gap-4">
                <span className="text-4xl p-2 rounded-2xl bg-blue-50 dark:bg-slate-900 border border-blue-200 dark:border-slate-800">
                  {editAvatar}
                </span>
                <div>
                  <label className="text-xs font-medium text-slate-500">Pick Avatar</label>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {avatars.map((av) => (
                      <button
                        key={av}
                        onClick={() => setEditAvatar(av)}
                        className={`text-lg p-1 rounded-lg hover:scale-110 transition ${
                          editAvatar === av ? 'bg-blue-100 dark:bg-blue-900' : ''
                        }`}
                      >
                        {av}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Name & Email inputs */}
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-slate-700 dark:text-slate-300">Name</label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full mt-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2 text-sm text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-700 dark:text-slate-300">Email</label>
                  <input
                    type="email"
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    className="w-full mt-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2 text-sm text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Level & XP stats */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <div className="flex justify-between items-center text-xs font-bold text-slate-900 dark:text-white mb-2">
                  <span>Level {user.level} Citizen</span>
                  <span className="text-blue-600 dark:text-blue-400 font-mono">{user.xp} XP</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-xs pt-2 border-t border-slate-200/60 dark:border-slate-800">
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white">{user.tasksCompleted}</span>
                    <p className="text-[10px] text-slate-400">Tasks</p>
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white">{user.streakDays} days</span>
                    <p className="text-[10px] text-slate-400">Streak</p>
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white">{favorites.length}</span>
                    <p className="text-[10px] text-slate-400">Favorites</p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleSave}
                className="w-full py-2.5 rounded-xl bg-blue-600 text-sm font-semibold text-white hover:bg-blue-700 transition"
              >
                Save Changes
              </button>
            </div>
          )}

          {tab === 'login' && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-slate-700 dark:text-slate-300">Email Address</label>
                <input
                  type="email"
                  defaultValue="user@helphub.io"
                  className="w-full mt-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2 text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-700 dark:text-slate-300">Password</label>
                <input
                  type="password"
                  defaultValue="••••••••••••"
                  className="w-full mt-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2 text-sm"
                />
              </div>
              <button
                onClick={() => {
                  showToast('Signed in successfully!', 'success');
                  setProfileModalOpen(false);
                }}
                className="w-full py-2.5 rounded-xl bg-blue-600 text-sm font-semibold text-white hover:bg-blue-700 transition"
              >
                Sign In
              </button>
            </div>
          )}

          {tab === 'register' && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-slate-700 dark:text-slate-300">Your Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Jasur Alimov"
                  className="w-full mt-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2 text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-700 dark:text-slate-300">Email</label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  className="w-full mt-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2 text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-700 dark:text-slate-300">Password</label>
                <input
                  type="password"
                  placeholder="Create secure password"
                  className="w-full mt-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2 text-sm"
                />
              </div>
              <button
                onClick={() => {
                  showToast('Account registered! Welcome to HELP HUB.', 'success');
                  setProfileModalOpen(false);
                }}
                className="w-full py-2.5 rounded-xl bg-blue-600 text-sm font-semibold text-white hover:bg-blue-700 transition"
              >
                Create Account
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
