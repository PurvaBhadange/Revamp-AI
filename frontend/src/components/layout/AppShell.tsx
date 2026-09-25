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
    <div className="flex h-screen w-screen overflow-hidden bg-dark-950 text-slate-100">
      {/* Sidebar */}
      <Sidebar currentRoute={currentRoute} onNavigate={onNavigate} />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopBar title={title} onNavigate={onNavigate} />
        <main className="flex-1 overflow-y-auto p-6 bg-dark-950">{children}</main>
      </div>

      {/* Global Command Palette */}
      <CommandPalette onNavigate={onNavigate} />

      {/* Toast Notifications */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col space-y-2 max-w-sm w-full pointer-events-none">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`pointer-events-auto flex items-start justify-between p-3.5 rounded-lg border shadow-xl transition-all ${
              n.type === 'error'
                ? 'bg-red-950/95 border-red-800 text-red-200'
                : n.type === 'success'
                ? 'bg-emerald-950/95 border-emerald-800 text-emerald-200'
                : n.type === 'warning'
                ? 'bg-amber-950/95 border-amber-800 text-amber-200'
                : 'bg-dark-900/95 border-dark-700 text-slate-200'
            }`}
          >
            <div className="flex items-start space-x-3">
              {n.type === 'error' && <AlertCircle className="h-4 w-4 text-red-400 mt-0.5 shrink-0" />}
              {n.type === 'success' && <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />}
              {n.type === 'info' && <Info className="h-4 w-4 text-blue-400 mt-0.5 shrink-0" />}
              <div>
                <h5 className="text-xs font-semibold">{n.title}</h5>
                {n.message && <p className="text-[11px] opacity-90 mt-0.5">{n.message}</p>}
              </div>
            </div>
            <button onClick={() => removeNotification(n.id)} className="opacity-70 hover:opacity-100 ml-2">
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
