import React from 'react';
import { useAuthStore } from '@/stores/authStore';
import { useUIStore } from '@/stores/uiStore';
import { Button } from '@/components/ui/button';
import { Search, LogOut, User as UserIcon, Bell, Activity, Command } from 'lucide-react';

interface TopBarProps {
  title: string;
  onNavigate: (route: string) => void;
}

export function TopBar({ title, onNavigate }: TopBarProps) {
  const { user, logout } = useAuthStore();
  const { toggleCommandPalette, activeJobId } = useUIStore();

  return (
    <header className="h-14 border-b border-dark-800 bg-dark-950/80 backdrop-blur-md px-6 flex items-center justify-between z-20 sticky top-0">
      {/* Title & Command Search */}
      <div className="flex items-center space-x-6">
        <h1 className="text-sm font-bold tracking-wider text-slate-100 uppercase">{title}</h1>
        
        {/* Quick Command Palette Trigger */}
        <button
          onClick={toggleCommandPalette}
          className="hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-md bg-dark-900 border border-dark-800 text-slate-400 hover:text-slate-200 hover:border-dark-700 text-xs transition-all"
        >
          <Search className="h-3.5 w-3.5 text-slate-500" />
          <span>Quick search or command...</span>
          <kbd className="inline-flex items-center px-1.5 py-0.5 rounded bg-dark-800 border border-dark-700 text-[10px] font-mono text-slate-400">
            <Command className="h-2.5 w-2.5 mr-0.5" /> K
          </kbd>
        </button>
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-4">
        {/* Active Processing Indicator */}
        {activeJobId && (
          <button
            onClick={() => onNavigate(`/jobs/${activeJobId}`)}
            className="flex items-center space-x-2 px-2.5 py-1 rounded bg-blue-950/80 border border-blue-800/80 text-blue-400 text-xs font-mono animate-pulse"
          >
            <Activity className="h-3.5 w-3.5" />
            <span>PROCESSING JOB #{activeJobId.substring(0, 6)}</span>
          </button>
        )}

        <button className="relative p-1.5 text-slate-400 hover:text-white rounded hover:bg-dark-900 transition-colors">
          <Bell className="h-4 w-4" />
        </button>

        {/* User Badge */}
        <div className="flex items-center space-x-3 pl-3 border-l border-dark-800">
          <div className="flex items-center space-x-2">
            <div className="h-7 w-7 rounded-full bg-dark-800 border border-dark-700 flex items-center justify-center text-slate-300">
              <UserIcon className="h-4 w-4" />
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-xs font-semibold text-slate-200">{user?.full_name || 'Threat Analyst'}</span>
              <span className="text-[10px] text-slate-400 font-mono">{user?.email || 'admin@revamp.ai'}</span>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={() => logout()} title="Log out">
            <LogOut className="h-4 w-4 text-slate-400 hover:text-red-400" />
          </Button>
        </div>
      </div>
    </header>
  );
}
