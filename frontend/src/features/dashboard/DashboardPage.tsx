"use client";

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { transformationsApi } from '@/lib/api/transformations';
import { useAuthStore } from '@/stores/authStore';
import { LoadingSpinner } from '@/components/ui/loading-state';
import {
  Plus, ArrowRight, FileText, MoreHorizontal, ChevronRight,
  Upload, Settings2, Zap, Edit3, Shield, AlertCircle,
  Share2, Presentation, PieChart, Video, Play
} from 'lucide-react';

interface DashboardPageProps {
  onNavigate: (route: string) => void;
}

const OUTPUT_COLORS: Record<string, string> = {
  summary: 'text-[#C07050]',
  executive_brief: 'text-[#C07050]',
  advisory: 'text-[#C07050]',
  linkedin: 'text-[#0A66C2]',
  brief: 'text-stone-500',
  social: 'text-purple-500',
  presentation: 'text-orange-500',
  infographic: 'text-teal-500',
  video: 'text-stone-700',
  prerisory: 'text-stone-500',
};

const OUTPUT_ICONS: Record<string, React.ElementType> = {
  summary: FileText,
  executive_brief: FileText,
  advisory: AlertCircle,
  linkedin: Share2,
  brief: FileText,
  social: Share2,
  presentation: Presentation,
  infographic: PieChart,
  video: Video,
};

function OutputTag({ type }: { type: string }) {
  const Icon = OUTPUT_ICONS[type.toLowerCase()] || FileText;
  const color = OUTPUT_COLORS[type.toLowerCase()] || 'text-stone-500';
  const label = type.charAt(0).toUpperCase() + type.slice(1).replace('_', ' ');
  return (
    <span className={`inline-flex items-center gap-1 text-[10px] font-medium ${color}`}>
      <Icon className="h-3 w-3" />
      {label}
    </span>
  );
}

function timeAgo(dateStr: string): string {
  if (!dateStr) return '—';
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins} minutes ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hour${hrs > 1 ? 's' : ''} ago`;
  const days = Math.floor(hrs / 24);
  return `${days} day${days > 1 ? 's' : ''} ago`;
}

const DEMO_TRANSFORMATIONS = [
  {
    id: 'demo-1',
    title: 'Q2 Cybersecurity Report',
    meta: 'PDF · 48 pages',
    time: '2 hours ago',
    status: 'completed',
    thumb: 'pdf',
    outputs: ['summary', 'advisory', 'linkedin', 'linkedin', 'presentation'],
    count: 4,
  },
  {
    id: 'demo-2',
    title: 'Annual Security Advisory',
    meta: 'DOCX · 12 pages',
    time: 'yesterday',
    status: 'completed',
    thumb: 'docx',
    outputs: ['advisory', 'brief', 'social', 'prerisory', 'infographic'],
    count: 3,
  },
  {
    id: 'demo-3',
    title: 'Research Communication Pack',
    meta: 'PPTX · 22 slides',
    time: '3 days ago',
    status: 'completed',
    thumb: 'pptx',
    outputs: ['summary', 'infographic', 'video', 'linkedin'],
    count: 2,
  },
  {
    id: 'demo-4',
    title: 'Cloud Migration Strategy 2025',
    meta: 'Text · 14,200 words',
    time: '5 days ago',
    status: 'completed',
    thumb: 'txt',
    outputs: ['executive_brief', 'presentation', 'social', 'video'],
    count: 4,
  },
];

const DEMO_TEMPLATES = [
  { icon: FileText, title: 'Executive Brief', desc: 'For leadership communication', color: 'text-[#C07050]' },
  { icon: Shield, title: 'Security Advisory', desc: 'For risk and compliance teams', color: 'text-stone-600' },
  { icon: Share2, title: 'LinkedIn Thought Leadership', desc: 'For professional audience', color: 'text-[#0A66C2]' },
  { icon: FileText, title: 'Research Summary', desc: 'For academic and technical reports', color: 'text-teal-600' },
  { icon: Zap, title: 'Public Communication', desc: 'For general awareness and outreach', color: 'text-purple-600' },
];

const THUMB_COLORS: Record<string, string> = {
  pdf: 'bg-red-50 text-red-500',
  docx: 'bg-blue-50 text-blue-500',
  pptx: 'bg-orange-50 text-orange-500',
  txt: 'bg-stone-100 text-stone-500',
};

export function DashboardPage({ onNavigate }: DashboardPageProps) {
  const { user } = useAuthStore();
  const firstName = user?.full_name?.split(' ')[0] || 'Atharva';

  const { data: transformations, isLoading } = useQuery({
    queryKey: ['transformations'],
    queryFn: () => transformationsApi.list(),
  });

  const displayItems = (transformations && transformations.length > 0)
    ? transformations.slice(0, 4).map((t: any, i: number) => ({
        id: t.id,
        title: t.central_context?.core_topic || `Transformation ${t.id.substring(0, 8)}`,
        meta: `Job · ${t.id.substring(0, 6)}`,
        time: timeAgo(t.created_at),
        status: t.status,
        thumb: 'pdf',
        outputs: (t.selected_outputs || ['executive_brief', 'advisory']).slice(0, 4),
        count: t.selected_outputs?.length || 4,
      }))
    : DEMO_TRANSFORMATIONS;

  return (
    <div className="min-h-full bg-[#F8F7F5] font-sans">

      {/* ── HERO BANNER ── */}
      <div className="relative bg-[#F9F8F6] overflow-hidden border-b border-stone-200">
        {/* Architecture texture right side */}
        <div
          className="absolute right-0 top-0 bottom-0 w-[45%] bg-cover bg-center"
          style={{ backgroundImage: `url('/architecture.jpg')` }}
        />
        <div className="absolute right-0 top-0 bottom-0 w-[45%] bg-gradient-to-l from-transparent via-[#F9F8F6]/80 to-[#F9F8F6]" />

        <div className="relative z-10 max-w-[1200px] mx-auto px-10 py-16">
          <p className="text-[11px] font-bold tracking-[0.2em] text-[#C07050] uppercase mb-4">Good morning,</p>
          <h1 className="text-[64px] font-black text-stone-950 tracking-tight leading-[1] mb-2">
            {firstName}.
          </h1>
          <p className="text-[32px] font-medium text-stone-600 mb-6 tracking-tight leading-tight max-w-xl">
            Turn information into communication.
          </p>
          <p className="text-[15px] text-stone-500 max-w-[440px] leading-relaxed mb-10 font-medium">
            Upload a source once and transform it into clear, audience-ready communication across multiple formats.
          </p>
          <button
            onClick={() => onNavigate('/transform/new')}
            className="flex items-center gap-2 bg-[#A35E47] hover:bg-[#8B4A2F] text-white font-semibold text-[15px] px-6 py-3.5 rounded-lg transition-all shadow-sm"
          >
            <Plus className="h-4 w-4" /> New Transformation <ArrowRight className="h-4 w-4 ml-1" />
          </button>
        </div>

        {/* Floating quote card */}
        <div className="absolute right-[12%] top-1/2 -translate-y-1/2 z-20 bg-[#F4EFEB] rounded-2xl p-7 shadow-[0_8px_30px_rgb(0,0,0,0.08)] max-w-[240px]">
          <p className="text-lg font-medium text-stone-800 leading-snug mb-8 tracking-tight">
            "Same source.<br />Multiple formats.<br />Real impact."
          </p>
          <div className="flex items-center gap-1">
            <span className="text-[10px] font-black text-stone-900">REVAMP</span>
            <span className="text-[10px] font-black text-[#C07050]">AI</span>
          </div>
        </div>
      </div>

      {/* ── 4-STEP MINI PROCESS ── */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-[1200px] mx-auto px-10">
          <div className="grid grid-cols-4 divide-x divide-stone-100">
            {[
              { icon: FileText, title: 'Upload a source', desc: 'Documents, media, text or URLs' },
              { icon: Share2, title: 'Choose outputs', desc: 'Summary, advisory, social and more' },
              { icon: Settings2, title: 'Configure', desc: 'Set audience, tone and objective' },
              { icon: Play, title: 'Generate', desc: 'Get your communication artefacts' },
            ].map((step) => (
              <div key={step.title} className="flex items-start gap-3 px-8 py-5 hover:bg-stone-50 transition-colors cursor-pointer group">
                <div className="flex items-center justify-center shrink-0 mt-0.5">
                  <step.icon className="h-6 w-6 text-[#A35E47]" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-[13px] font-bold text-stone-900">{step.title}</p>
                  <p className="text-[11px] text-stone-500 mt-0.5">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── RECENT TRANSFORMATIONS ── */}
      <div className="max-w-[1200px] mx-auto px-10 pt-8 pb-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-black text-stone-900">Recent Transformations</h2>
          <button onClick={() => onNavigate('/activity')} className="flex items-center gap-1 text-sm font-semibold text-[#C07050] hover:text-[#8B4A2F] transition-colors">
            View all <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {isLoading ? (
          <div className="py-12 text-center text-stone-400 text-sm">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {displayItems.map((item, index) => {
              const bgImg = [
                'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=100&q=60',
                'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&q=60',
                'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=100&q=60',
                'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=100&q=60'
              ][index % 4];
              
              return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden hover:shadow-md hover:border-stone-300 transition-all cursor-pointer group flex flex-col"
                onClick={() => onNavigate(item.status === 'completed' ? `/transform/${item.id}` : `/jobs/${item.id}`)}
              >
                {/* Card header with thumbnail + title */}
                <div className="p-3 border-b border-stone-100 flex-1">
                  <div className="flex items-start gap-3">
                    {/* Thumbnail */}
                    <div 
                      className="h-20 w-16 rounded-md flex flex-col items-center justify-end pb-1.5 shrink-0 bg-cover bg-center overflow-hidden relative shadow-inner"
                      style={{ backgroundImage: `url('${bgImg}')` }}
                    >
                      <div className="absolute inset-0 bg-black/30" />
                      <span className="text-[9px] font-black uppercase bg-white/90 text-stone-800 px-1.5 py-0.5 rounded-sm relative z-10 shadow-sm">{item.thumb}</span>
                    </div>
                    <div className="flex-1 min-w-0 py-0.5">
                      <div className="flex justify-between items-start">
                        <p className="text-[13px] font-bold text-stone-900 leading-tight pr-1 mb-1">{item.title}</p>
                        <button onClick={(e) => { e.stopPropagation(); }} className="text-stone-400 hover:text-stone-600 shrink-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-[11px] text-stone-500 mb-0.5">{item.meta}</p>
                      <p className="text-[10px] text-stone-400">Updated {item.time}</p>
                    </div>
                  </div>
                </div>

                {/* Output tags */}
                <div className="px-3 py-3 space-y-1.5 bg-stone-50/50">
                  <div className="grid grid-cols-2 gap-x-2 gap-y-2">
                    {item.outputs.slice(0, 4).map((out: string, i: number) => (
                      <OutputTag key={i} type={out} />
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="px-3 py-2.5 border-t border-stone-100 flex items-center justify-between bg-white">
                  <span className="text-[11px] font-medium text-stone-500">{item.count} outputs</span>
                  <button className="flex items-center gap-1 bg-[#A35E47] text-white text-[11px] font-bold px-3.5 py-1.5 rounded hover:bg-[#8B4A2F] transition-colors">
                    Open <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </motion.div>
            )})}
          </div>
        )}
      </div>

      {/* ── TEMPLATES ── */}
      <div className="max-w-[1200px] mx-auto px-10 pt-6 pb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-black text-stone-900">Templates</h2>
          <button onClick={() => onNavigate('/templates')} className="flex items-center gap-1 text-sm font-semibold text-[#C07050] hover:text-[#8B4A2F] transition-colors">
            View all <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {DEMO_TEMPLATES.map((tpl) => (
            <button
              key={tpl.title}
              onClick={() => onNavigate('/transform/new')}
              className="flex items-start gap-3 bg-white border border-stone-200 rounded-xl p-4 hover:border-[#C07050]/40 hover:shadow-sm transition-all text-left group"
            >
              <div className={`h-7 w-7 rounded-lg bg-stone-50 flex items-center justify-center shrink-0 ${tpl.color}`}>
                <tpl.icon className="h-3.5 w-3.5" strokeWidth={1.5} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-stone-900 leading-tight mb-0.5">{tpl.title}</p>
                <p className="text-[10px] text-stone-400 leading-tight">{tpl.desc}</p>
              </div>
              <ChevronRight className="h-3.5 w-3.5 text-stone-300 group-hover:text-[#C07050] shrink-0 mt-0.5 transition-colors" />
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
