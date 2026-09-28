"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight, Play, FileText, Image as ImageIcon, Mic, Video,
  AlignLeft, Globe, Upload, Settings2, Zap, Edit3, Plus, Bell,
  Search, LayoutDashboard, History, BookTemplate, Activity, Settings, Share2,
  FileCheck, Presentation, PieChart, Check
} from 'lucide-react';

interface LandingPageProps {
  onNavigate: (route: string) => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-white text-stone-900 font-sans antialiased overflow-x-hidden">

      {/* ═══════════════════════════════════════════════════
          NAVBAR
      ═══════════════════════════════════════════════════ */}
      <header className="sticky top-0 z-50 bg-[#F9F8F6]">
        <div className="max-w-[1440px] mx-auto px-8 md:px-16 lg:px-24 h-20 flex items-center justify-between">
          <div className="flex items-center cursor-pointer" onClick={() => onNavigate('/')}>
            <span className="text-lg font-black text-stone-950 tracking-tight">REVAMP&nbsp;</span>
            <span className="text-lg font-black text-[#C07050] tracking-tight">AI</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-stone-600">
            {[
              { label: 'Product', href: '#outputs' },
              { label: 'How it works', href: '#how' },
              { label: 'Use Cases', href: '#use-cases' },
              { label: 'Features', href: '#features' },
              { label: 'Resources', href: '#resources' }
            ].map(link => (
              <a 
                key={link.label} 
                href={link.href} 
                className="hover:text-stone-900 transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════════ */}
      <section className="relative w-full h-[calc(100vh-80px)] min-h-[640px] overflow-hidden bg-[#F9F8F6] border-b border-stone-200 flex items-center">
        {/* Full bleed architectural background right side */}
        <div 
          className="absolute right-0 top-0 bottom-0 w-[55%] bg-cover bg-left z-0"
          style={{ backgroundImage: `url('/architecture.jpg')` }}
        />
        <div className="absolute right-0 top-0 bottom-0 w-[55%] bg-gradient-to-l from-transparent via-[#F9F8F6]/20 to-[#F9F8F6] z-0" />
        
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-8 md:px-16 lg:px-24 grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10 items-center">

        {/* ── Hero Left ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-lg"
        >
          {/* Category label */}
          <p className="text-[11px] font-bold tracking-[0.25em] text-[#C07050] uppercase mb-5 flex items-center gap-2">
            <span className="inline-block w-6 h-px bg-[#C07050]" />
            AI-Powered Content Transformation
          </p>

          {/* Headline */}
          <h1 className="text-[64px] leading-[1.05] font-black text-stone-950 tracking-tight mb-6">
            One source.<br />
            Every format<br />
            you need.
          </h1>

          {/* Subtext */}
          <p className="text-[16px] text-stone-500 leading-relaxed mb-10 max-w-[420px]">
            Transform documents, reports, media and ideas into clear, audience-ready communication.
          </p>

          {/* CTAs */}
          <div className="flex items-center gap-5 mb-16">
            <button
              onClick={() => onNavigate('/transform/new')}
              className="flex items-center gap-2 bg-[#9E573F] hover:bg-[#8B4A2F] text-white font-semibold text-[15px] px-7 py-3.5 rounded-lg transition-all shadow-sm"
            >
              Start transforming <ArrowRight className="h-4 w-4" />
            </button>
            <button className="flex items-center gap-2.5 text-[15px] font-semibold text-stone-700 hover:text-stone-900 transition-colors">
              <div className="h-10 w-10 rounded-full border-2 border-stone-300 flex items-center justify-center hover:border-stone-500 transition-colors bg-white shadow-sm hover:scale-105">
                <Play className="h-3.5 w-3.5 ml-0.5 fill-current" />
              </div>
              See how it works
            </button>
          </div>

          {/* Source format icons */}
          <div className="flex items-center gap-7 flex-wrap">
            {[
              { icon: FileText, label: 'Documents', sub: 'PDF, DOCX, PPTX' },
              { icon: ImageIcon, label: 'Images', sub: 'JPG, PNG' },
              { icon: Mic, label: 'Audio', sub: 'MP3, WAV' },
              { icon: Video, label: 'Video', sub: 'MP4' },
              { icon: AlignLeft, label: 'Text', sub: 'Plain text' },
              { icon: Globe, label: 'Web Articles', sub: 'URLs' },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex flex-col items-center text-center gap-1.5">
                <div className="h-9 w-9 flex items-center justify-center">
                  <Icon className="h-5 w-5 text-stone-400" strokeWidth={1.5} />
                </div>
                <p className="text-[12px] font-semibold text-stone-700 leading-none">{label}</p>
                <p className="text-[10px] text-stone-400 leading-none">{sub}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Hero Right — App Mockup ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex justify-center lg:justify-end scale-[1.05] xl:scale-[1.1] origin-right ml-4"
        >

          {/* Tablet frame */}
          <div className="relative z-10 bg-[#1C1917] rounded-[20px] p-[10px] shadow-2xl shadow-stone-900/40 w-full max-w-[560px]">
            {/* Inner screen */}
            <div className="rounded-[12px] overflow-hidden bg-[#F9F8F7] flex flex-col">
              {/* App topbar */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-white border-b border-stone-200">
                <div className="flex-1 max-w-[220px]">
                  <div className="h-6 bg-stone-50 border border-stone-200 rounded-md flex items-center px-2 gap-1.5 w-full">
                    <Search className="h-3 w-3 text-stone-400" />
                    <span className="text-[9px] text-stone-400">Search projects, templates...</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Bell className="h-3.5 w-3.5 text-stone-400" />
                  <div className="h-6 w-6 rounded-full bg-[#8B4A2F] flex items-center justify-center text-white text-[9px] font-black">AW</div>
                </div>
              </div>

              {/* App body */}
              <div className="flex h-[330px]">
                {/* Sidebar */}
                <div className="w-[130px] bg-[#F2EDE7] border-r border-[#E5DFD6] py-3 flex flex-col shrink-0">
                  {/* Sidebar Logo */}
                  <div className="flex items-center px-3 mb-4">
                    <span className="text-[11px] font-black text-stone-900 tracking-tight">REVAMP</span>
                    <span className="text-[11px] font-black text-[#C07050] tracking-tight">&nbsp;AI</span>
                  </div>
                  {[
                    { icon: LayoutDashboard, label: 'Dashboard', active: true },
                    { icon: Plus, label: 'New Project' },
                    { icon: FileText, label: 'Projects' },
                    { icon: History, label: 'History' },
                    { icon: BookTemplate, label: 'Templates' },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className={`flex items-center gap-2 px-3 py-1.5 text-[9px] font-medium transition-all relative ${
                        item.active 
                          ? 'bg-[#EBDCD5] text-[#8B4A2F] font-semibold rounded-r-full mr-1.5' 
                          : 'text-stone-600 mr-1.5 rounded-r-full hover:bg-stone-200/40'
                      }`}
                    >
                      {item.active && <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#8B4A2F] rounded-r-full" />}
                      <item.icon className="h-3 w-3 shrink-0" strokeWidth={1.5} />
                      {item.label}
                    </div>
                  ))}
                  <div className="mt-3 pt-3 border-t border-[#E5DFD6]/50 mx-1.5 space-y-0.5">
                    {[{ icon: Activity, label: 'Usage' }, { icon: Settings, label: 'Settings' }].map(item => (
                      <div key={item.label} className="flex items-center gap-2 px-2 py-1.5 text-[9px] text-stone-600 rounded-r-full hover:bg-stone-200/40 mr-1.5 transition-all">
                        <item.icon className="h-3 w-3 shrink-0" strokeWidth={1.5} />
                        {item.label}
                      </div>
                    ))}
                  </div>
                  {/* User */}
                  <div className="mt-auto px-2.5 py-2.5 mx-1 flex items-center gap-2 border-t border-[#E5DFD6]/50 hover:bg-stone-200/40 rounded-lg cursor-pointer transition-all">
                    <div className="h-5 w-5 rounded-full bg-[#8B4A2F] flex items-center justify-center text-white text-[7px] font-black shrink-0">AW</div>
                    <div className="min-w-0">
                      <p className="text-[8px] font-semibold text-stone-900 truncate">Atharva Wani</p>
                      <p className="text-[7px] text-stone-500 truncate">Workspace · Personal</p>
                    </div>
                  </div>
                </div>

                {/* Main content */}
                <div className="flex-1 p-4 overflow-hidden">
                  <h3 className="text-sm font-black text-stone-900 mb-0.5">Good morning, Atharva.</h3>
                  <p className="text-[9px] text-stone-500 mb-3">Turn information into communication.</p>

                  <button className="flex items-center gap-1 bg-[#8B4A2F] text-white text-[9px] font-semibold px-3 py-1.5 rounded-md mb-4">
                    <Plus className="h-2.5 w-2.5" /> New Transformation
                  </button>

                  {/* 4-step mini flow */}
                  <div className="grid grid-cols-4 divide-x divide-stone-100 bg-white border border-stone-100 rounded-lg mb-4">
                    {[
                      { icon: FileText, title: 'Upload a source', sub: 'Documents, media, URLs' },
                      { icon: Share2, title: 'Choose outputs', sub: 'Summary, advisory, social...' },
                      { icon: Settings2, title: 'Configure', sub: 'Set audience and tone...' },
                      { icon: Play, title: 'Generate', sub: 'Get your artefacts' },
                    ].map((s) => (
                      <div key={s.title} className="p-1.5 flex gap-1 items-start">
                        <div className="mt-0.5 shrink-0">
                          <s.icon className="h-2 w-2 text-[#A35E47]" strokeWidth={2} />
                        </div>
                        <div>
                          <p className="text-[6.5px] font-bold text-stone-900 leading-[1.1] mb-[1px]">{s.title}</p>
                          <p className="text-[5px] text-stone-400 leading-[1.1]">{s.sub}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Recent transformations */}
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-[9px] font-bold text-stone-800">Recent Transformations</p>
                    <p className="text-[8px] text-[#C07050] font-semibold">View all →</p>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { title: 'Q2 Cybersecurity Report', meta: 'PDF · 48 pages', tags: ['Summary', 'Advisory', 'LinkedIn', 'Presentation'], time: '4 outputs · Updated 2 hours ago', thumb: 'PDF', bg: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=100&q=60' },
                      { title: 'Annual Security Advisory', meta: 'DOCX · 12 pages', tags: ['Advisory', 'Brief', 'Social'], time: '3 outputs · Updated yesterday', thumb: 'DOCX', bg: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&q=60' },
                      { title: 'Research Communication Pack', meta: 'PPTX · 22 slides', tags: ['Summary', 'Infographic'], time: '2 outputs · Updated 3 days ago', thumb: 'PPTX', bg: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=100&q=60' },
                    ].map((card) => (
                      <div key={card.title} className="bg-white rounded-lg border border-stone-100 shadow-sm overflow-hidden flex flex-col">
                        {/* Header + Thumb */}
                        <div className="p-1.5 flex gap-1.5 border-b border-stone-100">
                          <div 
                            className="h-9 w-7 rounded shrink-0 bg-cover bg-center overflow-hidden relative shadow-inner flex items-end justify-center pb-[2px]"
                            style={{ backgroundImage: `url('${card.bg}')` }}
                          >
                            <div className="absolute inset-0 bg-black/30" />
                            <span className="text-[4.5px] font-black uppercase bg-white/90 text-stone-800 px-1 py-px rounded-[1px] relative z-10 shadow-sm">{card.thumb}</span>
                          </div>
                          <div className="flex-1 min-w-0 pt-[1px]">
                            <p className="text-[7px] font-bold text-stone-900 leading-[1.1] truncate mb-[1px]">{card.title}</p>
                            <p className="text-[5.5px] text-stone-500 mb-0.5">{card.meta}</p>
                            <div className="flex flex-wrap gap-[2px]">
                              {card.tags.slice(0, 2).map((t) => (
                                <span key={t} className="text-[4px] font-medium text-stone-500 bg-stone-100 px-1 py-[1px] rounded-[2px]">{t}</span>
                              ))}
                            </div>
                          </div>
                        </div>
                        {/* Footer */}
                        <div className="px-1.5 py-1 text-[5px] text-stone-400">
                          {card.time}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          HOW IT WORKS
      ═══════════════════════════════════════════════════ */}
      <section id="how" className="bg-[#F7F5F2] py-20 border-t border-stone-100">
        <div className="max-w-[1440px] mx-auto px-8 md:px-16 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] items-start gap-0">
            {/* Left label + heading */}
            <div className="border-r border-[#E5DFD6] pr-10 py-2 h-full">
              <p className="text-[9px] font-bold tracking-[0.2em] text-[#C07050] uppercase mb-2">
                A Simple, Powerful Process
              </p>
              <h2 className="text-[34px] font-black text-stone-950 leading-none mb-3">How it works</h2>
              <p className="text-[13px] text-stone-600 leading-relaxed max-w-[240px]">
                From any source to multiple, high-quality communication artefacts in four simple steps.
              </p>
            </div>

            {/* 4 Steps */}
            <div className="flex justify-between items-start gap-6 pl-10 h-full py-2">
              {[
                { num: '01', icon: Upload, title: 'Upload', desc: 'Bring your source material (documents, media, text or URLs).' },
                { num: '02', icon: Settings2, title: 'Configure', desc: 'Choose audience, tone, language and objective.' },
                { num: '03', icon: Zap, title: 'Transform', desc: 'REVAMP AI generates multiple communication artefacts.' },
                { num: '04', icon: Edit3, title: 'Refine', desc: 'Review, edit and export for your audience and channels.' },
              ].map((step, i) => (
                <div key={step.num} className="relative flex flex-col group flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-[14px] font-black text-[#8B4A2F] flex items-center gap-2">
                      {i > 0 && <ArrowRight className="h-3.5 w-3.5 text-[#C07050]/60" strokeWidth={2.5} />}
                      {step.num}
                    </div>
                    <div className="h-9 w-9 rounded-[10px] bg-white border border-stone-200 flex items-center justify-center shadow-sm">
                      <step.icon className="h-4 w-4 text-stone-700" strokeWidth={1.5} />
                    </div>
                  </div>
                  <h3 className="text-[14px] font-bold text-stone-900 mb-1.5">{step.title}</h3>
                  <p className="text-[11px] text-stone-500 leading-relaxed pr-2">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          ONE SOURCE → MULTIPLE OUTPUTS
      ═══════════════════════════════════════════════════ */}
      {/* ═══════════════════════════════════════════════════
          ONE SOURCE → MULTIPLE OUTPUTS
      ═══════════════════════════════════════════════════ */}
      <section id="outputs" className="py-24 bg-white border-t border-stone-100">
        <div className="max-w-[1440px] mx-auto px-8 md:px-16 lg:px-24">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            {/* Left */}
            <div className="w-[300px] shrink-0 z-20 bg-white">
              <p className="text-[9px] font-bold tracking-[0.2em] text-[#C07050] uppercase mb-4">
                One Source, Multiple Outputs
              </p>
              <h2 className="text-[34px] font-black text-stone-950 leading-[1.1] mb-5">
                Turn one source into every format you need.
              </h2>
              <p className="text-[14px] text-stone-600 leading-relaxed mb-8">
                Maintain the original meaning while adapting the message for different audiences, purposes and channels.
              </p>
              <button
                onClick={() => onNavigate('/transform/new')}
                className="flex items-center gap-2 bg-[#9E573F] hover:bg-[#8B4A2F] text-white font-semibold text-[13px] px-6 py-3.5 rounded-lg transition-all shadow-sm"
              >
                Start transforming <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            {/* Right — Transformation diagram */}
            <div className="relative flex-1 h-[440px] w-full flex items-center -ml-10">
              
              {/* SVG Connectors */}
              <svg className="absolute inset-0 w-full h-full z-0" viewBox="0 0 800 440" fill="none" preserveAspectRatio="xMidYMid meet">
                <style>
                  {`
                    .conn { stroke: #D4ACA0; stroke-width: 1.5px; fill: none; }
                    .dot { fill: #9E573F; }
                  `}
                </style>
                {/* Source to REVAMP AI */}
                <path className="conn" d="M 230 220 C 260 220, 270 220, 310 220" />
                <path className="conn" d="M 230 200 C 260 200, 270 210, 310 210" />
                <path className="conn" d="M 230 240 C 260 240, 270 230, 310 230" />

                {/* REVAMP AI to Left Column */}
                <path className="conn" d="M 430 220 C 460 220, 460 110, 500 110" />
                <path className="conn" d="M 430 220 C 460 220, 460 220, 500 220" />
                <path className="conn" d="M 430 220 C 460 220, 460 330, 500 330" />

                {/* Left Column to Right Column */}
                <path className="conn" d="M 680 110 C 700 110, 700 110, 720 110" />
                <path className="conn" d="M 680 220 C 700 220, 700 170, 720 170" />
                <path className="conn" d="M 680 220 C 700 220, 700 270, 720 270" />
                <path className="conn" d="M 680 330 C 700 330, 700 330, 720 330" />
                
                {/* Dots */}
                <circle cx="310" cy="220" r="3" className="dot" />
                <circle cx="430" cy="220" r="3" className="dot" />
                
                <circle cx="500" cy="110" r="3" className="dot" />
                <circle cx="500" cy="220" r="3" className="dot" />
                <circle cx="500" cy="330" r="3" className="dot" />
                
                <circle cx="680" cy="110" r="3" className="dot" />
                <circle cx="680" cy="220" r="3" className="dot" />
                <circle cx="680" cy="330" r="3" className="dot" />
                
                <circle cx="720" cy="110" r="3" className="dot" />
                <circle cx="720" cy="170" r="3" className="dot" />
                <circle cx="720" cy="270" r="3" className="dot" />
                <circle cx="720" cy="330" r="3" className="dot" />
              </svg>

              {/* Source Document */}
              <div className="absolute left-[30px] top-1/2 -translate-y-1/2 w-[200px] bg-white border border-stone-200 rounded-xl shadow-xl p-3.5 z-10">
                <div className="flex gap-2.5 mb-3.5">
                  <div className="h-6 w-5 bg-stone-100 rounded border border-stone-200 flex items-center justify-center shrink-0">
                    <span className="text-[5px] font-black text-stone-500">PDF</span>
                  </div>
                  <div className="pt-0.5">
                    <p className="text-[10px] font-bold text-stone-900 leading-tight mb-0.5">Q2 Cybersecurity<br/>Threat Report</p>
                    <p className="text-[8px] text-stone-500 font-medium">48 pages · 2.4 MB</p>
                  </div>
                </div>
                <div className="h-[90px] bg-cover bg-center rounded-lg border border-stone-200 mb-2.5 filter grayscale" style={{ backgroundImage: `url('/architecture.jpg')` }} />
                <div className="space-y-1.5 px-1 pb-1">
                  <div className="h-1.5 bg-stone-200 rounded-sm w-full"></div>
                  <div className="h-1.5 bg-stone-200 rounded-sm w-full"></div>
                  <div className="h-1.5 bg-stone-100 rounded-sm w-4/5"></div>
                  <div className="h-1.5 bg-stone-100 rounded-sm w-3/4"></div>
                </div>
              </div>

              {/* REVAMP AI Center Box */}
              <div className="absolute left-[310px] top-1/2 -translate-y-1/2 w-[120px] h-[60px] bg-[#9E573F] rounded-lg shadow-xl flex items-center justify-center z-10">
                <span className="text-[14px] font-black text-white tracking-tight">REVAMP AI</span>
              </div>

              {/* Outputs - Column 1 */}
              <div className="absolute left-[500px] top-1/2 -translate-y-1/2 h-full flex flex-col justify-between py-[80px] z-10 w-[180px]">
                
                <div className="bg-white border border-stone-200 shadow-sm rounded-xl p-3 flex items-center gap-3">
                  <div className="h-9 w-9 bg-stone-50 border border-stone-100 rounded-lg flex items-center justify-center shrink-0">
                    <FileText className="h-4 w-4 text-stone-500" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-stone-900 leading-tight">Executive Summary</p>
                    <p className="text-[9px] text-stone-500 mt-0.5">PDF · 1,240 words</p>
                  </div>
                </div>

                <div className="bg-white border border-stone-200 shadow-sm rounded-xl p-3 flex items-center gap-3">
                  <div className="h-9 w-9 bg-stone-50 border border-stone-100 rounded-lg flex items-center justify-center shrink-0">
                    <FileCheck className="h-4 w-4 text-[#A35E47]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-stone-900 leading-tight">Advisory</p>
                    <p className="text-[9px] text-stone-500 mt-0.5">8 recommendations</p>
                  </div>
                </div>

                <div className="bg-white border border-stone-200 shadow-sm rounded-xl p-3 flex items-center gap-3">
                  <div className="h-9 w-9 bg-stone-50 border border-stone-100 rounded-lg flex items-center justify-center shrink-0">
                    <div className="h-4 w-4 bg-[#0A66C2] rounded-[3px] flex items-center justify-center"><span className="text-[9px] font-black text-white leading-none">in</span></div>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-stone-900 leading-tight">LinkedIn Post</p>
                    <p className="text-[9px] text-stone-500 mt-0.5">1,100 characters</p>
                  </div>
                </div>
              </div>

              {/* Outputs - Column 2 */}
              <div className="absolute left-[720px] top-1/2 -translate-y-1/2 h-full flex flex-col justify-between py-[80px] z-10 w-[180px]">
                <div className="bg-white border border-stone-200 shadow-sm rounded-xl p-3 flex items-center gap-3 relative -mt-[60px]">
                  <div className="h-9 w-9 bg-stone-50 border border-stone-100 rounded-lg flex items-center justify-center shrink-0">
                    <Presentation className="h-4 w-4 text-[#A35E47]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-stone-900 leading-tight">Presentation</p>
                    <p className="text-[9px] text-stone-500 mt-0.5">12 slides</p>
                  </div>
                </div>

                <div className="bg-white border border-stone-200 shadow-sm rounded-xl p-3 flex items-center gap-3 relative mt-[60px] mb-[60px]">
                  <div className="h-9 w-9 bg-stone-50 border border-stone-100 rounded-lg flex items-center justify-center shrink-0">
                    <PieChart className="h-4 w-4 text-stone-500" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-stone-900 leading-tight">Infographic</p>
                    <p className="text-[9px] text-stone-500 mt-0.5">Visual summary</p>
                  </div>
                </div>

                <div className="bg-stone-800 border border-stone-700 shadow-lg rounded-xl p-3 flex items-center gap-3 relative -mb-[60px]">
                  <div className="h-9 w-9 bg-stone-700 border border-stone-600 rounded-lg flex items-center justify-center shrink-0">
                    <Video className="h-4 w-4 text-white" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-white leading-tight">Video Package</p>
                    <p className="text-[9px] text-stone-400 mt-0.5">60-90 seconds</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          USE CASES
      ═══════════════════════════════════════════════════ */}
      <section id="use-cases" className="py-24 bg-[#F9F8F6] border-t border-stone-200">
        <div className="max-w-[1440px] mx-auto px-8 md:px-16 lg:px-24">
          <div className="text-center mb-16">
            <p className="text-[9px] font-bold tracking-[0.2em] text-[#C07050] uppercase mb-4">Targeted Applications</p>
            <h2 className="text-[34px] font-black text-stone-950 leading-[1.1]">Built for every team.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Cybersecurity Teams', desc: 'Turn raw threat intelligence feeds into executive briefs, detailed advisories, and immediate Slack alerts instantly.' },
              { title: 'Marketing & Comms', desc: 'Transform technical release notes into engaging blog posts, social media updates, and customer-facing newsletters.' },
              { title: 'Executive Leadership', desc: 'Distill massive quarterly reports into concise presentations, infographics, and talking points for the board.' }
            ].map(uc => (
              <div key={uc.title} className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm">
                <h3 className="text-lg font-black text-stone-900 mb-3">{uc.title}</h3>
                <p className="text-[13px] text-stone-600 leading-relaxed">{uc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          FEATURES
      ═══════════════════════════════════════════════════ */}
      <section id="features" className="py-24 bg-white border-t border-stone-200">
        <div className="max-w-[1440px] mx-auto px-8 md:px-16 lg:px-24">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="flex-1">
              <p className="text-[9px] font-bold tracking-[0.2em] text-[#C07050] uppercase mb-4">Enterprise Capabilities</p>
              <h2 className="text-[34px] font-black text-stone-950 leading-[1.1] mb-6">Unmatched accuracy & control.</h2>
              <div className="space-y-6">
                {[
                  { title: 'Tone & Persona Engine', desc: 'Precisely dictate the tone from formal to persuasive, ensuring the output always matches your brand voice.' },
                  { title: 'Automated Fact-Checking', desc: 'Built-in RAG (Retrieval-Augmented Generation) prevents hallucinations and grounds every claim in your source data.' },
                  { title: 'Multi-modal Generation', desc: 'Generate PDFs, presentations, images, and videos all from a single textual or multimedia source.' }
                ].map(f => (
                  <div key={f.title} className="flex gap-4">
                    <div className="mt-1 h-6 w-6 rounded-full bg-[#EBDCD5] flex items-center justify-center shrink-0">
                      <Check className="h-3 w-3 text-[#8B4A2F]" strokeWidth={3} />
                    </div>
                    <div>
                      <h4 className="text-[14px] font-bold text-stone-900 mb-1">{f.title}</h4>
                      <p className="text-[13px] text-stone-600">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 w-full h-[400px] bg-[#F9F8F6] rounded-2xl border border-stone-200 shadow-inner flex items-center justify-center relative overflow-hidden">
               <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: `url('/architecture.jpg')` }} />
               <div className="relative z-10 bg-white/90 backdrop-blur-sm p-6 rounded-xl border border-stone-200 shadow-xl max-w-[320px]">
                 <p className="text-xs font-bold text-stone-900 mb-2">Confidence Score</p>
                 <div className="flex items-end gap-2 mb-4">
                   <span className="text-4xl font-black text-[#C07050]">99.8%</span>
                 </div>
                 <div className="h-2 w-full bg-stone-100 rounded-full overflow-hidden">
                   <div className="h-full bg-[#C07050] w-[99.8%]" />
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          RESOURCES
      ═══════════════════════════════════════════════════ */}
      <section id="resources" className="py-24 bg-stone-900 text-white">
        <div className="max-w-[1440px] mx-auto px-8 md:px-16 lg:px-24 text-center">
          <h2 className="text-[34px] font-black leading-[1.1] mb-6">Ready to transform your content?</h2>
          <p className="text-[15px] text-stone-400 mb-10 max-w-[600px] mx-auto">
            Join thousands of professionals saving hours of manual formatting and rewriting every week. 
            Access our documentation, APIs, and community resources.
          </p>
          <div className="flex justify-center gap-4">
            <button 
              onClick={() => onNavigate('/login')}
              className="bg-[#C07050] hover:bg-[#A35E47] text-white font-semibold px-8 py-3.5 rounded-lg transition-colors"
            >
              Get Started for Free
            </button>
            <button className="bg-stone-800 hover:bg-stone-700 border border-stone-700 text-white font-semibold px-8 py-3.5 rounded-lg transition-colors">
              Read Documentation
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════════════ */}
      <footer className="bg-stone-950 py-10 border-t border-stone-800">
        <div className="max-w-[1440px] mx-auto px-8 md:px-16 lg:px-24 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center">
            <span className="text-sm font-black text-white">REVAMP</span>
            <span className="text-sm font-black text-[#C07050]">&nbsp;AI</span>
          </div>
          <p className="text-stone-500 text-xs">© {new Date().getFullYear()} Revamp AI. All rights reserved.</p>
          <div className="flex gap-6 text-xs text-stone-500">
            {['Privacy', 'Terms', 'Contact'].map(l => (
              <a key={l} href="#" className="hover:text-stone-300 transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </footer>

    </div>
  );
}
