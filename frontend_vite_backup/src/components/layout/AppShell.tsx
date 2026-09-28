import React from 'react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { CommandPalette } from './CommandPalette';
import { useUIStore } from '@/stores/uiStore';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

interface AppShellProps {
  title: string;
  currentRoute: string;
  onNavigate: (route: string) => void;
  children: React.ReactNode;
}

export function AppShell({ title, currentRoute, onNavigate, children }: AppShellProps) {
  const { notifications, removeNotification } = useUIStore();

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-stone-50 text-stone-900">
      {/* Sidebar */}
      <Sidebar currentRoute={currentRoute} onNavigate={onNavigate} />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopBar title={title} onNavigate={onNavigate} />
        <main className="flex-1 overflow-y-auto p-6 bg-stone-50">{children}</main>
      </div>

      {/* Global Command Palette */}
      <CommandPalette onNavigate={onNavigate} />

      {/* Toast Notifications */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col space-y-2 max-w-sm w-full pointer-events-none">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`pointer-events-auto flex items-start justify-between p-5 rounded-lg border border-stone-200 bg-white shadow-lg transition-all ${
              n.type === 'error'
                ? 'border-l-4 border-l-red-600'
                : n.type === 'success'
                ? 'border-l-4 border-l-emerald-600'
                : n.type === 'warning'
                ? 'border-l-4 border-l-amber-600'
                : 'border-l-4 border-l-blue-600'
            }`}
          >
            <div className="flex items-start space-x-3">
              {n.type === 'error' && <AlertCircle className="h-4 w-4 text-red-600 mt-0.5 shrink-0" />}
              {n.type === 'success' && <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />}
              {n.type === 'info' && <Info className="h-4 w-4 text-orange-600 mt-0.5 shrink-0" />}
              <div>
                <h5 className="text-xs font-semibold text-stone-900">{n.title}</h5>
                {n.message && <p className="text-xs text-stone-500 mt-0.5">{n.message}</p>}
              </div>
            </div>
            <button onClick={() => removeNotification(n.id)} className="text-stone-400 hover:text-stone-600 ml-2">
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
