import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { KnowledgeBase } from './components/KnowledgeBase';
import { CrmView } from './components/CrmView';
import { LandingOrAuth } from './components/LandingOrAuth';
import { MariaView } from './components/MariaView';
import { SettingsView } from './components/SettingsView';
import { AbTestingView } from './components/AbTestingView';
import { CadencesView } from './components/CadencesView';
import { AnalyticsView } from './components/AnalyticsView';
import { InboxView } from './components/InboxView';
import { TasksView } from './components/TasksView';
import type { User, Task } from './types';
import { MOCK_USER, TASKS as INITIAL_TASKS } from './constants';

export type View = 'Maria' | 'A/B Lab' | 'CRM' | 'Inbox' | 'Cadences' | 'Knowledge' | 'Analytics' | 'Settings' | 'Tasks';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeView, setActiveView] = useState<View>('CRM');
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);

  const handleLogin = () => {
    setUser(MOCK_USER);
    setActiveView('CRM');
  };

  const handleLogout = () => {
    setUser(null);
  };
  
  const handleSaveTask = (taskToSave: Task) => {
    setTasks(prevTasks => {
        const taskExists = prevTasks.some(t => t.id === taskToSave.id);
        if (taskExists) {
            return prevTasks.map(t => t.id === taskToSave.id ? taskToSave : t);
        } else {
            return [taskToSave, ...prevTasks];
        }
    });
  };

  if (!user) {
    return <LandingOrAuth onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (activeView) {
      case 'Maria':
        return <MariaView />;
      case 'A/B Lab':
        return <AbTestingView />;
      case 'CRM':
        return <CrmView allTasks={tasks} onSaveTask={handleSaveTask} />;
      case 'Tasks':
        return <TasksView tasks={tasks} onSaveTask={handleSaveTask} />;
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