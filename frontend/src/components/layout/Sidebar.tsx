import React from 'react';
import { useUIStore } from '@/stores/uiStore';
import {
  Shield,
  LayoutDashboard,
  PlusCircle,
  Activity,
  FolderKanban,
  Database,
  FileText,
  BookmarkCheck,
  History,
  Settings,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface SidebarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
}

export function Sidebar({ currentRoute, onNavigate }: SidebarProps) {
  const { isSidebarCollapsed, toggleSidebar, setSidebarCollapsed } = useUIStore();

  const handleNavClick = (route: string) => {
    onNavigate(route);
    if (window.innerWidth < 768) {
      setSidebarCollapsed(true);
    }
  };

  const navSections = [
    {
      title: 'OVERVIEW',
      items: [{ label: 'Dashboard', icon: LayoutDashboard, route: '/dashboard' }],
    },
    {
      title: 'TRANSFORM',
      items: [
        { label: 'New Transformation', icon: PlusCircle, route: '/transform/new' },
        { label: 'Active Jobs', icon: Activity, route: '/jobs' },
      ],
    },
    {
      title: 'INTELLIGENCE',
      items: [
        { label: 'Projects', icon: FolderKanban, route: '/projects' },
        { label: 'Knowledge Base', icon: Database, route: '/knowledge-base' },
      ],
    },
    {
      title: 'OUTPUTS',
      items: [
        { label: 'Artifacts', icon: FileText, route: '/artifacts' },
        { label: 'Templates', icon: BookmarkCheck, route: '/templates' },
      ],
    },
    {
      title: 'SYSTEM',
      items: [
        { label: 'Audit Log', icon: History, route: '/activity' },
        { label: 'Settings', icon: Settings, route: '/settings' },
      ],
    },
  ];

  return (
    <aside
      className={`relative flex flex-col border-r border-dark-800 bg-dark-950 transition-all duration-300 z-30 ${
        isSidebarCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="flex h-14 items-center justify-between px-4 border-b border-dark-800">
        <div className="flex items-center space-x-3 overflow-hidden cursor-pointer" onClick={() => onNavigate('/dashboard')}>
          <div className="flex h-8 w-8 items-center justify-center rounded bg-blue-600 text-white font-bold shrink-0 border border-blue-400/40">
            <Shield className="h-5 w-5" />
          </div>
          {!isSidebarCollapsed && (
            <div className="flex flex-col">
              <span className="text-xs font-bold text-slate-100 uppercase tracking-wider">OMNITRANSFORM</span>
              <span className="text-[10px] text-blue-400 font-mono">CYBER INTEL v1.0</span>
            </div>
          )}
        </div>
        <button
          onClick={toggleSidebar}
          className="p-1 text-slate-400 hover:text-white rounded hover:bg-dark-800 transition-colors"
          title="Toggle Sidebar"
        >
          {isSidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto py-4 px-2 space-y-6">
        {navSections.map((section, idx) => (
          <div key={idx} className="space-y-1">
            {!isSidebarCollapsed && (
              <h4 className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                {section.title}
              </h4>
            )}
            {section.items.map((item) => {
              const Icon = item.icon;
              const isActive = currentRoute === item.route;
              return (
                <button
                  key={item.route}
                  onClick={() => handleNavClick(item.route)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30 font-semibold'
                      : 'text-slate-400 hover:bg-dark-900 hover:text-slate-200'
                  }`}
                  title={isSidebarCollapsed ? item.label : undefined}
                >
                  <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-blue-400' : 'text-slate-400'}`} />
                  {!isSidebarCollapsed && <span className="truncate">{item.label}</span>}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* System Operational Status Footer */}
      {!isSidebarCollapsed && (
        <div className="p-3 border-t border-dark-800 bg-dark-900/60">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-400 font-mono">SYSTEM STATUS</span>
            <span className="flex items-center text-emerald-400 font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse mr-1.5"></span>
              ONLINE
            </span>
          </div>
        </div>
      )}
    </aside>
  );
}
