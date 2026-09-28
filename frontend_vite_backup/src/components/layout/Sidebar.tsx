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
  Globe,
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
      title: 'PLATFORM',
      items: [
        { label: 'Enterprise Landing', icon: Globe, route: '/landing' },
        { label: 'Analyst Dashboard', icon: LayoutDashboard, route: '/dashboard' },
      ],
    },
    {
      title: 'TRANSFORMATION',
      items: [
        { label: 'New Transformation', icon: PlusCircle, route: '/transform/new' },
        { label: 'Active Pipeline Jobs', icon: Activity, route: '/jobs' },
      ],
    },
    {
      title: 'INTELLIGENCE',
      items: [
        { label: 'Projects & Feeds', icon: FolderKanban, route: '/projects' },
        { label: 'Knowledge Base (RAG)', icon: Database, route: '/knowledge-base' },
      ],
    },
    {
      title: 'DELIVERABLES',
      items: [
        { label: 'Artifacts Library', icon: FileText, route: '/artifacts' },
        { label: 'Format Templates', icon: BookmarkCheck, route: '/templates' },
      ],
    },
    {
      title: 'SECURITY & GOVERNANCE',
      items: [
        { label: 'Audit Provenance', icon: History, route: '/activity' },
        { label: 'Engine Settings', icon: Settings, route: '/settings' },
      ],
    },
  ];

  return (
    <aside
      className={`relative flex flex-col border-r border-stone-200 bg-white transition-all duration-300 z-30 shadow-subtle ${
        isSidebarCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="flex h-14 items-center justify-between px-4 border-b border-stone-200 bg-white">
        <div className="flex items-center space-x-3 overflow-hidden cursor-pointer" onClick={() => onNavigate('/dashboard')}>
          <div className="flex h-8 w-8 items-center justify-center rounded bg-orange-600 text-white font-bold shrink-0 shadow-sm">
            <Shield className="h-6 w-6" />
          </div>
          {!isSidebarCollapsed && (
            <div className="flex flex-col">
              <span className="text-xs font-extrabold text-stone-900 uppercase tracking-wider font-display">REVAMP AI</span>
              <span className="text-xs text-orange-700 font-tech font-bold uppercase">CYBER INTEL ENTERPRISE</span>
            </div>
          )}
        </div>
        <button
          onClick={toggleSidebar}
          className="p-1 text-stone-400 hover:text-stone-700 rounded hover:bg-stone-100 transition-colors"
          title="Toggle Sidebar"
        >
          {isSidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto py-3 px-2 space-y-5">
        {navSections.map((section, idx) => (
          <div key={idx} className="space-y-1">
            {!isSidebarCollapsed && (
              <h4 className="px-3 text-xs font-bold text-stone-400 uppercase tracking-widest mb-1 font-tech">
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
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-xs font-sans font-medium transition-all ${
                    isActive
                      ? 'bg-orange-50 text-orange-700 border-l-2 border-orange-600 font-semibold shadow-subtle'
                      : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                  }`}
                  title={isSidebarCollapsed ? item.label : undefined}
                >
                  <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-orange-600' : 'text-stone-500'}`} />
                  {!isSidebarCollapsed && <span className="truncate">{item.label}</span>}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* System Operational Status Footer */}
      {!isSidebarCollapsed && (
        <div className="p-3 border-t border-stone-200 bg-stone-50">
          <div className="flex items-center justify-between text-xs">
            <span className="text-stone-500 font-tech font-bold">SYSTEM STATUS</span>
            <span className="flex items-center text-emerald-700 font-tech font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span>
              ONLINE
            </span>
          </div>
        </div>
      )}
    </aside>
  );
}
