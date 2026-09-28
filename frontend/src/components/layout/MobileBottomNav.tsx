"use client";

import React from 'react';
import { Home, FolderOpen, BookTemplate, History, Settings } from 'lucide-react';

interface MobileBottomNavProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
}

export function MobileBottomNav({ currentRoute, onNavigate }: MobileBottomNavProps) {
  const navItems = [
    { icon: Home, label: 'Home', route: '/dashboard' },
    { icon: FolderOpen, label: 'Projects', route: '/projects' },
    { icon: BookTemplate, label: 'Templates', route: '/templates' },
    { icon: History, label: 'History', route: '/history' },
    { icon: Settings, label: 'Settings', route: '/settings' },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 h-[72px] bg-[#FDFCFB] border-t border-stone-200 z-40 flex items-center justify-around px-2 pb-safe shadow-[0_-4px_24px_rgba(0,0,0,0.04)]">
      {navItems.map((item) => {
        const isActive = currentRoute === item.route || (item.route !== '/dashboard' && currentRoute.startsWith(item.route));
        return (
          <button
            key={item.route}
            onClick={() => onNavigate(item.route)}
            className="flex flex-col items-center justify-center w-16 h-full gap-1 pt-1"
          >
            <item.icon 
              className={`h-5 w-5 transition-colors ${isActive ? 'text-[#8B4A2F]' : 'text-stone-400'}`} 
              strokeWidth={isActive ? 2 : 1.5} 
            />
            <span className={`text-[10px] transition-colors ${isActive ? 'font-bold text-[#8B4A2F]' : 'font-medium text-stone-500'}`}>
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
