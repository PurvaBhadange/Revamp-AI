"use client";

import React from 'react';
import { useUIStore } from '@/stores/uiStore';
import {
  LayoutDashboard, Plus, FolderOpen, History,
  BookTemplate, Activity, Settings, ChevronRight, ChevronLeft
} from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';

interface SidebarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
}

export function Sidebar({ currentRoute, onNavigate }: SidebarProps) {
  const { isSidebarCollapsed, toggleSidebar, setSidebarCollapsed } = useUIStore();
  const { user } = useAuthStore();

  const handleNavClick = (route: string) => {
    onNavigate(route);
    if (window.innerWidth < 768) setSidebarCollapsed(true);
  };

  const firstName = user?.full_name?.split(' ')[0] || 'Atharva';
  const lastName = user?.full_name?.split(' ')[1] || 'Wani';
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`;

  const workspaceItems = [
    { icon: LayoutDashboard, label: 'Dashboard', route: '/dashboard' },
    { icon: Plus, label: 'New Transformation', route: '/transform/new' },
    { icon: FolderOpen, label: 'Projects', route: '/projects' },
    { icon: History, label: 'History', route: '/history' },
    { icon: BookTemplate, label: 'Templates', route: '/templates' },
  ];

  const accountItems = [
    { icon: Activity, label: 'Usage', route: '/usage' },
    { icon: Settings, label: 'Settings', route: '/settings' },
  ];

  const NavItem = ({ icon: Icon, label, route }: { icon: unknown, label: string, route: string }) => {
    const isActive = currentRoute === route || (route !== '/dashboard' && currentRoute.startsWith(route));
    return (
      <button
        onClick={() => handleNavClick(route)}
        title={isSidebarCollapsed ? label : undefined}
        className={`w-full flex items-center gap-3 px-5 py-2.5 text-sm transition-all duration-150 relative ${
          isActive
            ? 'bg-[#EBDCD5] text-[#8B4A2F] font-semibold rounded-r-full mr-2'
            : 'text-stone-600 hover:bg-stone-200/40 hover:text-stone-900 font-medium mr-2 rounded-r-full'
        }`}
      >
        {isActive && <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#8B4A2F] rounded-r-full" />}
        <Icon className={`h-4 w-4 ${isActive ? 'text-[#8B4A2F]' : 'text-stone-500'}`} strokeWidth={1.5} />
        {!isSidebarCollapsed && <span className="truncate">{label}</span>}
      </button>
    );
  };

  return (
    <aside className={`relative flex flex-col border-r border-[#E5DFD6] bg-[#F2EDE7] transition-all duration-300 z-30 shrink-0 ${isSidebarCollapsed ? 'w-16' : 'w-56'}`}>

      {/* Logo */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#E5DFD6]/50">
        {!isSidebarCollapsed && (
          <div className="flex items-center cursor-pointer" onClick={() => onNavigate('/dashboard')}>
            <span className="text-base font-black text-stone-950 tracking-tight">REVAMP</span>
            <span className="text-base font-black text-[#C07050] tracking-tight">&nbsp;AI</span>
          </div>
        )}
        <button onClick={toggleSidebar} className="p-1 text-stone-400 hover:text-stone-700 rounded-md hover:bg-stone-100 transition-all ml-auto">
          {isSidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
        {/* Workspace section */}
        <div>
          <div className="space-y-0.5">
            {workspaceItems.map(item => <NavItem key={item.route} {...item} />)}
          </div>
        </div>

        {/* Account section */}
        <div>
          <div className="space-y-0.5">
            {accountItems.map(item => <NavItem key={item.route} {...item} />)}
          </div>
        </div>
      </div>

      {/* Decorative Architecture Image */}
      {!isSidebarCollapsed && (
        <div className="h-[240px] w-full relative shrink-0">
          <div className="absolute inset-0 z-0" style={{ backgroundImage: `url('/architecture.jpg')`, backgroundSize: 'cover', backgroundPosition: 'left center' }} />
          {/* Subtle gradient overlay to blend perfectly into the sidebar */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#F2EDE7] via-transparent to-transparent z-10" />
        </div>
      )}

      {/* User Footer */}
      <div className="border-t border-[#E5DFD6]/50 px-3 py-3">
        <button
          onClick={() => handleNavClick('/settings')}
          className="w-full flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-stone-50 transition-all group"
        >
          <div className="h-8 w-8 rounded-full bg-[#8B4A2F] flex items-center justify-center text-white text-xs font-black shrink-0">
            {initials}
          </div>
          {!isSidebarCollapsed && (
            <>
              <div className="flex-1 min-w-0 text-left">
                <p className="text-xs font-semibold text-stone-900 truncate">{user?.full_name || 'Atharva Wani'}</p>
                <p className="text-[10px] text-stone-400 truncate">Personal Workspace</p>
              </div>
              <ChevronRight className="h-3.5 w-3.5 text-stone-300 group-hover:text-stone-500 shrink-0" />
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
