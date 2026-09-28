/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { Toast } from './components/common/Toast';
import { HeroSection } from './components/home/HeroSection';
import { HowItWorks } from './components/home/HowItWorks';
import { QuickToolsSection } from './components/home/QuickToolsSection';
import { FeaturedCategoriesSection } from './components/home/FeaturedCategoriesSection';
import { StatsAndCommunity } from './components/home/StatsAndCommunity';
import { ToolsCenter } from './components/tools/ToolsCenter';
import { ToolModal } from './components/tools/ToolModal';
import { CategoriesView } from './components/categories/CategoriesView';
import { AIHelpCenter } from './components/ai/AIHelpCenter';
import { PersonalDashboard } from './components/dashboard/PersonalDashboard';
import { SettingsView } from './components/settings/SettingsView';
import { GlobalSearchModal } from './components/search/GlobalSearchModal';
import { ProfileModal } from './components/auth/ProfileModal';

const AppContent: React.FC = () => {
  const { activeTab } = useApp();

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 transition-colors duration-200 dark:bg-slate-950 dark:text-slate-100">
      <Navbar />

      <main className="flex-1">
        {activeTab === 'home' && (
          <div className="space-y-4">
            <HeroSection />
            <FeaturedCategoriesSection />
            <QuickToolsSection />
            <HowItWorks />
            <StatsAndCommunity />
          </div>
        )}

        {activeTab === 'categories' && <CategoriesView />}

        {activeTab === 'tools' && <ToolsCenter />}

        {activeTab === 'ai' && <AIHelpCenter />}

        {activeTab === 'dashboard' && <PersonalDashboard />}

        {activeTab === 'settings' && <SettingsView />}
      </main>

      {/* Global Modals & Notifications */}
      <ToolModal />
      <GlobalSearchModal />
      <ProfileModal />
      <Toast />

      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
