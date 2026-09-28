"use client";

import React, { useState } from 'react';
import { 
  User, Bell, Shield, Users, Link2, CreditCard, Trash2, Building, Database, ChevronDown
} from 'lucide-react';

interface SettingsPageProps {
  onNavigate: (route: string) => void;
}

export function SettingsPage({ onNavigate }: SettingsPageProps) {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="min-h-full bg-[#FDFCFB] font-sans px-8 py-10">
      
      {/* PAGE HEADER */}
      <div className="mb-10">
        <p className="text-[10px] font-bold tracking-[0.2em] text-[#C07050] uppercase mb-2">Settings</p>
        <h1 className="text-[44px] font-black text-stone-950 tracking-tight leading-none mb-3">Settings</h1>
        <p className="text-[15px] text-stone-500 font-medium">Manage your account, preferences, and workspace settings.</p>
      </div>

      <div className="flex gap-8">
        
        {/* LEFT COLUMN: Sub-navigation */}
        <div className="w-[200px] shrink-0">
          <div className="flex flex-col">
            <button 
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-3 px-4 py-3 text-[13px] font-bold transition-all ${
                activeTab === 'profile' 
                  ? 'bg-[#FDF3F0] text-[#A35E47] border-l-4 border-[#C07050]' 
                  : 'text-stone-700 hover:bg-stone-50 border-l-4 border-transparent'
              }`}
            >
              <User className="h-4 w-4" /> Profile
            </button>
            <button 
              onClick={() => setActiveTab('notifications')}
              className={`flex items-center gap-3 px-4 py-3 text-[13px] font-bold transition-all ${
                activeTab === 'notifications' 
                  ? 'bg-[#FDF3F0] text-[#A35E47] border-l-4 border-[#C07050]' 
                  : 'text-stone-700 hover:bg-stone-50 border-l-4 border-transparent'
              }`}
            >
              <Bell className="h-4 w-4" /> Notifications
            </button>
            <button 
              onClick={() => setActiveTab('security')}
              className={`flex items-center gap-3 px-4 py-3 text-[13px] font-bold transition-all ${
                activeTab === 'security' 
                  ? 'bg-[#FDF3F0] text-[#A35E47] border-l-4 border-[#C07050]' 
                  : 'text-stone-700 hover:bg-stone-50 border-l-4 border-transparent'
              }`}
            >
              <Shield className="h-4 w-4" /> Security
            </button>
            <button 
              onClick={() => setActiveTab('workspace')}
              className={`flex items-center gap-3 px-4 py-3 text-[13px] font-bold transition-all ${
                activeTab === 'workspace' 
                  ? 'bg-[#FDF3F0] text-[#A35E47] border-l-4 border-[#C07050]' 
                  : 'text-stone-700 hover:bg-stone-50 border-l-4 border-transparent'
              }`}
            >
              <Users className="h-4 w-4" /> Workspace
            </button>
            <button 
              onClick={() => setActiveTab('integrations')}
              className={`flex items-center gap-3 px-4 py-3 text-[13px] font-bold transition-all ${
                activeTab === 'integrations' 
                  ? 'bg-[#FDF3F0] text-[#A35E47] border-l-4 border-[#C07050]' 
                  : 'text-stone-700 hover:bg-stone-50 border-l-4 border-transparent'
              }`}
            >
              <Link2 className="h-4 w-4" /> Integrations
            </button>
            <button 
              onClick={() => setActiveTab('billing')}
              className={`flex items-center gap-3 px-4 py-3 text-[13px] font-bold transition-all ${
                activeTab === 'billing' 
                  ? 'bg-[#FDF3F0] text-[#A35E47] border-l-4 border-[#C07050]' 
                  : 'text-stone-700 hover:bg-stone-50 border-l-4 border-transparent'
              }`}
            >
              <CreditCard className="h-4 w-4" /> Billing
            </button>
          </div>
        </div>

        {/* CENTER COLUMN: Settings Form */}
        <div className="flex-1 flex flex-col gap-6 max-w-[640px]">
          
          {/* Profile Information Card */}
          <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-start justify-between mb-8">
              <div>
                <h2 className="text-[18px] font-black text-stone-900 leading-tight mb-1">Profile information</h2>
                <p className="text-[12px] text-stone-500 font-medium">Update your personal details and how others see you on REVAMP AI.</p>
              </div>
              <button className="bg-[#A35E47] hover:bg-[#8B4A2F] text-white font-semibold text-[13px] px-5 py-2 rounded-lg shadow-sm transition-colors shrink-0">
                Save changes
              </button>
            </div>

            <div className="mb-6">
              <label className="block text-[12px] font-bold text-stone-900 mb-3">Profile picture</label>
              <div className="flex items-center gap-6">
                <div className="h-20 w-20 rounded-full bg-stone-200 text-stone-800 flex items-center justify-center text-[24px] font-black shrink-0">
                  AW
                </div>
                <div>
                  <button className="bg-white border border-[#C07050] text-[#A35E47] hover:bg-[#FDF3F0] font-semibold text-[12px] px-4 py-2 rounded-lg transition-colors mb-2">
                    Change photo
                  </button>
                  <p className="text-[11px] text-stone-400 font-medium">JPG, PNG up to 5MB</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-[12px] font-bold text-stone-900 mb-2">Full name</label>
                <input 
                  type="text" 
                  defaultValue="Atharva Wani"
                  className="w-full h-10 px-3 rounded-lg border border-stone-200 text-[13px] text-stone-900 focus:outline-none focus:border-[#C07050] focus:ring-1 focus:ring-[#C07050]"
                />
              </div>
              <div>
                <label className="block text-[12px] font-bold text-stone-900 mb-2">Email address</label>
                <input 
                  type="email" 
                  defaultValue="atharvawani0811@gmail.com"
                  className="w-full h-10 px-3 rounded-lg border border-stone-200 text-[13px] text-stone-900 focus:outline-none focus:border-[#C07050] focus:ring-1 focus:ring-[#C07050]"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-[12px] font-bold text-stone-900 mb-2">Workspace name</label>
              <input 
                type="text" 
                defaultValue="Personal Workspace"
                className="w-full h-10 px-3 rounded-lg border border-stone-200 text-[13px] text-stone-900 focus:outline-none focus:border-[#C07050] focus:ring-1 focus:ring-[#C07050]"
              />
              <p className="text-[10px] text-stone-400 font-medium mt-1.5">This is the name of your default workspace.</p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-[12px] font-bold text-stone-900 mb-2">Language</label>
                <div className="relative">
                  <input 
                    type="text" 
                    readOnly
                    defaultValue="English (US)"
                    className="w-full h-10 px-3 pr-10 rounded-lg border border-stone-200 text-[13px] text-stone-900 cursor-pointer focus:outline-none focus:border-[#C07050] focus:ring-1 focus:ring-[#C07050]"
                  />
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-[12px] font-bold text-stone-900 mb-2">Timezone</label>
                <div className="relative">
                  <input 
                    type="text" 
                    readOnly
                    defaultValue="(GMT+05:30) Asia/Kolkata"
                    className="w-full h-10 px-3 pr-10 rounded-lg border border-stone-200 text-[13px] text-stone-900 cursor-pointer focus:outline-none focus:border-[#C07050] focus:ring-1 focus:ring-[#C07050]"
                  />
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400 pointer-events-none" />
                </div>
              </div>
            </div>

          </div>

          {/* Danger Zone Card */}
          <div className="bg-[#FDFCFB] border border-stone-200 rounded-xl p-6 shadow-sm flex items-center justify-between">
            <div>
              <h2 className="text-[16px] font-black text-stone-900 leading-tight mb-1">Danger zone</h2>
              <p className="text-[11px] text-stone-500 font-medium">Permanently delete your account and all associated data. This action cannot be undone.</p>
            </div>
            <button className="bg-white border border-red-500 text-red-600 hover:bg-red-50 font-semibold text-[12px] px-4 py-2 rounded-lg shadow-sm transition-colors flex items-center gap-1.5 shrink-0">
              <Trash2 className="h-3.5 w-3.5" /> Delete account
            </button>
          </div>

        </div>

        {/* RIGHT COLUMN: Summary & Image */}
        <div className="w-[280px] shrink-0 flex flex-col gap-6">
          
          {/* Account Summary */}
          <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-sm">
            <div className="mb-5">
              <h3 className="text-[14px] font-black text-stone-900">Account summary</h3>
              <p className="text-[10px] text-stone-500 font-medium">Your current plan and workspace details.</p>
            </div>

            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="mt-0.5"><User className="h-4 w-4 text-stone-700" strokeWidth={2} /></div>
                <div>
                  <p className="text-[12px] font-bold text-stone-900 leading-tight">Atharva Wani</p>
                  <p className="text-[10px] text-stone-500 mt-0.5">atharvawani0811@gmail.com</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="mt-0.5"><Building className="h-4 w-4 text-stone-700" strokeWidth={2} /></div>
                <div>
                  <p className="text-[12px] font-bold text-stone-900 leading-tight">Personal Workspace</p>
                  <p className="text-[10px] text-stone-500 mt-0.5">Free plan</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="mt-0.5"><Database className="h-4 w-4 text-stone-700" strokeWidth={2} /></div>
                <div className="w-full">
                  <p className="text-[12px] font-bold text-stone-900 leading-tight">Usage this month</p>
                  <p className="text-[10px] text-stone-500 mt-0.5 mb-2">28 / 50 transformations</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-stone-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#A35E47] rounded-full w-[56%]"></div>
                    </div>
                    <span className="text-[9px] font-bold text-stone-500">56%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative Image */}
          <div className="w-full h-[180px] rounded-xl bg-cover bg-center border border-stone-200 shadow-sm" style={{ backgroundImage: `url('/architecture.jpg')` }}></div>

        </div>

      </div>
    </div>
  );
}
