"use client";

import React from 'react';
import { useAuthStore } from '@/stores/authStore';
import { useUIStore } from '@/stores/uiStore';
import { Search, Bell } from 'lucide-react';

interface TopBarProps {
  title: string;
  onNavigate: (route: string) => void;
}

export function TopBar({ title, onNavigate }: TopBarProps) {
  const { user } = useAuthStore();
  const { toggleCommandPalette } = useUIStore();
  const firstName = user?.full_name?.split(' ')[0] || 'A';
  const lastName = user?.full_name?.split(' ')[1] || 'W';
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`;

  return (
    <header className="h-14 border-b border-stone-200 bg-white px-6 flex items-center justify-between z-20 sticky top-0">
      {/* Search */}
      <button
        onClick={toggleCommandPalette}
        className="flex items-center gap-2 px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-sm text-stone-400 hover:bg-white hover:border-stone-300 transition-all min-w-[340px]"
      >
        <Search className="h-3.5 w-3.5 shrink-0" />
        <span className="text-sm">Search projects, templates or content...</span>
      </button>

      {/* Right */}
      <div className="flex items-center gap-3">
        <button className="relative h-9 w-9 flex items-center justify-center rounded-lg hover:bg-stone-100 transition-colors text-stone-500">
          <Bell className="h-4 w-4" />
        </button>
        <div className="h-8 w-8 rounded-full bg-[#8B4A2F] flex items-center justify-center text-white text-xs font-black cursor-pointer">
          {initials}
        </div>
      </div>
    </header>
  );
}
