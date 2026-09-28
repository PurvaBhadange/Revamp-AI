import React from 'react';
import { useAuthStore } from '@/stores/authStore';
import { useUIStore } from '@/stores/uiStore';
import { Button } from '@/components/ui/button';
import { Search, LogOut, User as UserIcon, Bell, Activity, Command, Globe, ShieldCheck } from 'lucide-react';

interface TopBarProps {
  title: string;
  onNavigate: (route: string) => void;
}

export function TopBar({ title, onNavigate }: TopBarProps) {
  const { user, logout } = useAuthStore();
  const { toggleCommandPalette, activeJobId } = useUIStore();

  return (
    <header className="h-14 border-b border-stone-200 bg-white px-6 flex items-center justify-between z-20 sticky top-0 shadow-subtle">
      {/* Title & Organization Info */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 border-r border-stone-200 pr-4">
          <ShieldCheck className="h-4 w-4 text-orange-600" />
          <span className="text-xs font-tech font-bold uppercase text-stone-700 hidden lg:inline">NTRO / NCIIPC Command</span>
        </div>
        <h1 className="text-sm font-display font-extrabold tracking-wide text-stone-900 uppercase">{title}</h1>
        
        {/* Quick Command Palette Trigger */}
        <button
          onClick={toggleCommandPalette}
          className="hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-md bg-stone-50 border border-stone-200 text-stone-500 hover:text-stone-800 hover:border-stone-300 text-xs transition-all font-sans"
        >
          <Search className="h-4 w-4 text-stone-400" />
          <span>Quick search or command...</span>
          <kbd className="inline-flex items-center px-1.5 py-0.5 rounded bg-white border border-stone-200 text-xs font-mono text-stone-500">
            <Command className="h-2.5 w-2.5 mr-0.5" /> K
          </kbd>
        </button>
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-3">
        {/* Quick Landing Page Toggle */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onNavigate('/landing')}
          className="text-xs font-sans text-stone-700 hover:text-orange-600"
          title="View Landing Page"
        >
          <Globe className="h-4 w-4 mr-1.5 text-orange-600" />
          <span className="hidden sm:inline">Landing Page</span>
        </Button>

        {/* Active Processing Indicator */}
        {activeJobId && (
          <button
            onClick={() => onNavigate(`/jobs/${activeJobId}`)}
            className="flex items-center space-x-2 px-2.5 py-1 rounded bg-orange-50 border border-orange-200 text-orange-700 text-xs font-mono font-bold animate-pulse"
          >
            <Activity className="h-4 w-4" />
            <span>JOB #{activeJobId.substring(0, 6)}</span>
          </button>
        )}

        {/* System Health Badge */}
        <div className="hidden sm:flex items-center space-x-1 px-2.5 py-1 rounded bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-tech font-bold">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse mr-1"></span>
          <span>Engine Healthy</span>
        </div>

        {/* Notifications */}
        <button
          className="relative p-1.5 text-stone-500 hover:text-stone-800 rounded-md hover:bg-stone-100 transition-colors"
          title="Notifications"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-orange-600"></span>
        </button>

        {/* User Profile */}
        <div className="flex items-center space-x-3 pl-3 border-l border-stone-200">
          <div className="flex items-center space-x-2">
            <div className="h-7 w-7 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center text-stone-700">
              <UserIcon className="h-4 w-4" />
            </div>
            <div className="hidden md:flex flex-col text-left">
              <span className="text-xs font-semibold text-stone-900">{user?.full_name || 'Threat Analyst'}</span>
              <span className="text-xs text-stone-500 font-mono">{user?.email || 'admin@revamp.ai'}</span>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={() => logout()} title="Log out" className="text-stone-500 hover:text-red-600">
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
