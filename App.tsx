import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { KnowledgeBase } from './components/KnowledgeBase';
import { CrmView } from './components/CrmView';
import { AuthView } from './components/AuthView';
import { MariaView } from './components/MariaView';
import { SettingsView } from './components/SettingsView';
import { AbTestingView } from './components/AbTestingView';
import { CadencesView } from './components/CadencesView';
import { AnalyticsView } from './components/AnalyticsView';
import { InboxView } from './components/InboxView';
import type { User } from './types';
import { MOCK_USER } from './constants';

export type View = 'Maria' | 'A/B Lab' | 'CRM' | 'Inbox' | 'Cadences' | 'Knowledge' | 'Analytics' | 'Settings';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeView, setActiveView] = useState<View>('CRM');

  const handleLogin = () => {
    // In a real app, this would involve an API call.
    // Here, we'll just set a mock user.
    setUser(MOCK_USER);
    setActiveView('CRM');
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return <AuthView onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (activeView) {
      case 'Maria':
        return <MariaView />;
      case 'A/B Lab':
        return <AbTestingView />;
      case 'CRM':
        return <CrmView />;
      case 'Knowledge':
        return <KnowledgeBase />;
      case 'Settings':
        return <SettingsView />;
      case 'Cadences':
        return <CadencesView />;
       case 'Inbox':
        return <InboxView />;
      case 'Analytics':
        return <AnalyticsView />;
      default:
        return <div className="p-8"><h1 className="text-2xl font-bold">{activeView}</h1><p>This view is not yet implemented.</p></div>;
    }
  };

  return (
    <div className="flex h-screen w-full bg-background text-foreground">
      <Sidebar user={user} activeView={activeView} onNavigate={setActiveView} onLogout={handleLogout} />
      <main className="flex-1 flex flex-col overflow-hidden">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;