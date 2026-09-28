"use client";

import React, { useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { CommandPalette } from './CommandPalette';
import { useUIStore } from '@/stores/uiStore';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { soundManager } from '@/lib/audio';

interface AppShellProps {
  title: string;
  currentRoute: string;
  onNavigate: (route: string) => void;
  children: React.ReactNode;
}

export function AppShell({ title, currentRoute, onNavigate, children }: AppShellProps) {
  const { notifications, removeNotification } = useUIStore();

  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      soundManager.init();
      const target = e.target as HTMLElement;
      if (target.closest('button') || target.closest('a')) soundManager.playClick();
    };
    window.addEventListener('click', handleGlobalClick, true);
    return () => window.removeEventListener('click', handleGlobalClick, true);
  }, []);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-stone-50 text-stone-900 font-sans selection:bg-orange-200 selection:text-orange-900">
      <Sidebar currentRoute={currentRoute} onNavigate={onNavigate} />
      <div className="flex flex-1 flex-col overflow-hidden">
        {!currentRoute.startsWith('/artifacts') && <TopBar title={title} onNavigate={onNavigate} />}
        <main className="flex-1 flex flex-col overflow-y-auto bg-stone-50">{children}</main>
      </div>

      <CommandPalette onNavigate={onNavigate} />

      {/* Toast Notifications */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col space-y-2 max-w-sm w-full pointer-events-none">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`pointer-events-auto flex items-start justify-between p-4 rounded-xl bg-white border shadow-xl transition-all ${
              n.type === 'error' ? 'border-l-4 border-l-red-500 border-stone-100'
              : n.type === 'success' ? 'border-l-4 border-l-emerald-500 border-stone-100'
              : n.type === 'warning' ? 'border-l-4 border-l-orange-500 border-stone-100'
              : 'border-l-4 border-l-blue-500 border-stone-100'
            }`}
          >
            <div className="flex items-start space-x-3">
              {n.type === 'error' && <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />}
              {n.type === 'success' && <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />}
              {n.type === 'info' && <Info className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />}
              <div>
                <h5 className="text-xs font-bold text-stone-900">{n.title}</h5>
                {n.message && <p className="text-xs text-stone-500 mt-0.5">{n.message}</p>}
              </div>
            </div>
            <button onClick={() => removeNotification(n.id)} className="text-stone-300 hover:text-stone-600 ml-2 mt-0.5">
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
