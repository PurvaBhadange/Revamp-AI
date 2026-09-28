"use client";

import React, { useState } from 'react';
import { 
  Users, Target, CheckCircle2, ArrowRight, ArrowLeft,
  FileText, Presentation, FileCheck, PieChart, Video, FileOutput,
  Briefcase, MessageSquare, BarChart3, Megaphone, Globe, Layers, Twitter
} from 'lucide-react';

import { useWizardStore } from '@/stores/transformationWizardStore';

interface ConfigureTransformationPageProps {
  onNavigate: (route: string) => void;
}

export function ConfigureTransformationPage({ onNavigate }: ConfigureTransformationPageProps) {
  const { tone, setTone, selectedOutputs, toggleOutput, targetAudience, setTargetAudience, objective, setObjective, language, setLanguage, urgencyLevel, setUrgencyLevel } = useWizardStore();
  const [activeTab, setActiveTab] = useState('summary');

  // Convert array of outputs to a mapped boolean object for the UI checkboxes
  const formats = {
    summary: selectedOutputs.includes('executive_brief'),
    presentation: selectedOutputs.includes('presentation'),
    linkedin: selectedOutputs.includes('social'),
    twitter: selectedOutputs.includes('twitter'),
    advisory: selectedOutputs.includes('advisory'),
    infographic: selectedOutputs.includes('infographic'),
    video: selectedOutputs.includes('video')
  };

  const handleToggle = (key: keyof typeof formats) => {
    const formatMap: Record<string, any> = {
      summary: 'executive_brief',
      presentation: 'presentation',
      linkedin: 'social',
      twitter: 'twitter',
      advisory: 'advisory',
      infographic: 'infographic',
      video: 'video'
    };
    toggleOutput(formatMap[key]);
  };

  return (
    <div className="min-h-full bg-[#F8F7F5] font-sans px-10 py-12">
      <div className="max-w-[1200px] mx-auto">
        
        {/* HEADER */}
        <div className="flex justify-between items-start mb-12">
          <div>
            <p className="text-[10px] font-bold tracking-[0.2em] text-[#C07050] uppercase mb-2">New Transformation</p>
            <h1 className="text-[44px] font-black text-stone-950 tracking-tight leading-none mb-3">Configure Transformation</h1>
            <p className="text-[15px] text-stone-500 font-medium">Set your audience, tone and outputs to generate tailored communication.</p>
          </div>

          {/* STEPPER */}
          <div className="flex items-center gap-3 mt-4">
            {/* Step 1 */}
            <div className="flex items-center gap-2.5 opacity-60">
              <div className="h-9 w-9 rounded-full border border-stone-300 bg-white text-stone-500 flex items-center justify-center text-[11px] font-bold shrink-0">01</div>
              <div>
                <p className="text-[12px] font-bold text-stone-600 leading-tight">Source</p>
                <p className="text-[10px] text-stone-400 leading-tight mt-0.5">Upload or add source</p>
              </div>
            </div>
            <div className="w-10 h-px bg-stone-300 mx-1"></div>
            {/* Step 2 */}
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-full bg-[#9E573F] text-white flex items-center justify-center text-[11px] font-bold shrink-0 shadow-sm">02</div>
              <div>
                <p className="text-[12px] font-bold text-stone-900 leading-tight">Configure</p>
                <p className="text-[10px] text-stone-500 leading-tight mt-0.5">Set audience and outputs</p>
              </div>
            </div>
            <div className="w-10 h-px bg-stone-300 mx-1 opacity-60"></div>
            {/* Step 3 */}
            <div className="flex items-center gap-2.5 opacity-60">
              <div className="h-9 w-9 rounded-full border border-stone-300 bg-white text-stone-500 flex items-center justify-center text-[11px] font-bold shrink-0">03</div>
              <div>
                <p className="text-[12px] font-bold text-stone-600 leading-tight">Review</p>
                <p className="text-[10px] text-stone-400 leading-tight mt-0.5">Check and refine</p>
              </div>
            </div>
            <div className="w-10 h-px bg-stone-300 mx-1 opacity-60"></div>
            {/* Step 4 */}
            <div className="flex items-center gap-2.5 opacity-60">
              <div className="h-9 w-9 rounded-full border border-stone-300 bg-white text-stone-500 flex items-center justify-center text-[11px] font-bold shrink-0">04</div>
              <div>
                <p className="text-[12px] font-bold text-stone-600 leading-tight">Generate</p>
                <p className="text-[10px] text-stone-400 leading-tight mt-0.5">Create your content</p>
              </div>
            </div>
          </div>
        </div>

        {/* MAIN SPLIT */}
        <div className="grid grid-cols-[1fr_420px] gap-12">
          
          {/* LEFT COLUMN */}
          <div>
            
            {/* 1. Set Audience */}
            <div className="mb-4">
              <h2 className="text-[19px] font-black text-stone-900 mb-1">1. Set audience and objective</h2>
              <p className="text-[13px] text-stone-500">Help REVAMP AI understand who the content is for and what you want to achieve.</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-10">
              <div>
                <label className="block text-[12px] font-bold text-stone-900 mb-2">Target audience</label>
                <div className="relative">
                  <select 
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value as any)}
                    className="w-full appearance-none bg-white border border-stone-200 rounded-lg px-4 py-3 pl-10 text-[13px] text-stone-800 font-medium shadow-sm focus:outline-none focus:border-[#C07050] focus:ring-1 focus:ring-[#C07050]"
                  >
                    <option value="executive">Industry Professionals</option>
                    <option value="general_public">General Public</option>
                    <option value="technical">Internal Team</option>
                    <option value="defense">Executive Board</option>
                  </select>
                  <Users className="absolute left-3.5 top-3.5 h-4 w-4 text-[#C07050]" strokeWidth={2} />
                  <div className="absolute right-3.5 top-4 pointer-events-none">
                    <svg className="h-3 w-3 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-[12px] font-bold text-stone-900 mb-2">Communication objective</label>
                <div className="relative">
                  <select 
                    value={objective}
                    onChange={(e) => setObjective(e.target.value as any)}
                    className="w-full appearance-none bg-white border border-stone-200 rounded-lg px-4 py-3 pl-10 text-[13px] text-stone-800 font-medium shadow-sm focus:outline-none focus:border-[#C07050] focus:ring-1 focus:ring-[#C07050]"
                  >
                    <option value="information_dissemination">Inform / Educate</option>
                    <option value="action_required">Persuade / Sell</option>
                    <option value="policy_compliance">Report / Analyze</option>
                  </select>
                  <Target className="absolute left-3.5 top-3.5 h-4 w-4 text-[#C07050]" strokeWidth={2} />
                  <div className="absolute right-3.5 top-4 pointer-events-none">
                    <svg className="h-3 w-3 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Language + Level of Detail */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              <div>
                <label className="block text-[12px] font-bold text-stone-900 mb-2">
                  <Globe className="inline h-3.5 w-3.5 mr-1 text-[#C07050]" strokeWidth={2} />
                  Output language
                </label>
                <div className="relative">
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full appearance-none bg-white border border-stone-200 rounded-lg px-4 py-3 pl-10 text-[13px] text-stone-800 font-medium shadow-sm focus:outline-none focus:border-[#C07050] focus:ring-1 focus:ring-[#C07050]"
                  >
                    <option value="English">English</option>
                    <option value="Hindi">Hindi</option>
                    <option value="French">French</option>
                    <option value="German">German</option>
                    <option value="Spanish">Spanish</option>
                    <option value="Arabic">Arabic</option>
                    <option value="Chinese">Chinese (Simplified)</option>
                    <option value="Japanese">Japanese</option>
                    <option value="Portuguese">Portuguese</option>
                    <option value="Russian">Russian</option>
                  </select>
                  <Globe className="absolute left-3.5 top-3.5 h-4 w-4 text-[#C07050]" strokeWidth={2} />
                  <div className="absolute right-3.5 top-4 pointer-events-none">
                    <svg className="h-3 w-3 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-bold text-stone-900 mb-2">
                  <Layers className="inline h-3.5 w-3.5 mr-1 text-[#C07050]" strokeWidth={2} />
                  Level of detail
                </label>
                <div className="relative">
                  <select
                    value={urgencyLevel}
                    onChange={(e) => setUrgencyLevel(e.target.value as any)}
                    className="w-full appearance-none bg-white border border-stone-200 rounded-lg px-4 py-3 pl-10 text-[13px] text-stone-800 font-medium shadow-sm focus:outline-none focus:border-[#C07050] focus:ring-1 focus:ring-[#C07050]"
                  >
                    <option value="low">Brief — High-level overview</option>
                    <option value="medium">Standard — Balanced depth</option>
                    <option value="high">Detailed — In-depth analysis</option>
                    <option value="critical">Comprehensive — Full technical depth</option>
                  </select>
                  <Layers className="absolute left-3.5 top-3.5 h-4 w-4 text-[#C07050]" strokeWidth={2} />
                  <div className="absolute right-3.5 top-4 pointer-events-none">
                    <svg className="h-3 w-3 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Tone and Style */}
            <div className="mb-4">
              <h2 className="text-[19px] font-black text-stone-900 mb-1">2. Choose tone and style</h2>
              <p className="text-[13px] text-stone-500">Select a tone that matches your brand and audience.</p>
            </div>
            
            <div className="grid grid-cols-4 gap-4 mb-10">
              {[
                { id: 'professional', icon: Briefcase, label: 'Professional', desc: 'Formal and factual' },
                { id: 'conversational', icon: MessageSquare, label: 'Conversational', desc: 'Simple and engaging' },
                { id: 'analytical', icon: BarChart3, label: 'Analytical', desc: 'Data-driven and detailed' },
                { id: 'persuasive', icon: Megaphone, label: 'Persuasive', desc: 'Compelling and action-oriented' },
              ].map((t) => (
                <div 
                  key={t.id}
                  onClick={() => setTone(t.id)}
                  className={`cursor-pointer rounded-xl border p-4 relative transition-all shadow-sm ${
                    tone === t.id 
                      ? 'bg-white border-[#C07050] ring-1 ring-[#C07050]' 
                      : 'bg-[#FDFCFB] border-stone-200 hover:border-stone-300'
                  }`}
                >
                  {tone === t.id && (
                    <div className="absolute top-2 right-2 text-[#C07050]">
                      <CheckCircle2 className="h-4 w-4" fill="currentColor" stroke="white" />
                    </div>
                  )}
                  <t.icon className={`h-6 w-6 mb-3 ${tone === t.id ? 'text-[#C07050]' : 'text-stone-600'}`} strokeWidth={1.5} />
                  <p className="text-[13px] font-bold text-stone-900 mb-1">{t.label}</p>
                  <p className="text-[11px] text-stone-500 leading-tight">{t.desc}</p>
                </div>
              ))}
            </div>

            {/* 3. Output Formats */}
            <div className="mb-4">
              <h2 className="text-[19px] font-black text-stone-900 mb-1">3. Select output formats</h2>
              <p className="text-[13px] text-stone-500">Choose one or more formats for your transformed content.</p>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-12">
              {[
                { id: 'summary',      icon: FileText,    label: 'Executive Summary', sub: 'Concise brief',        badge: null },
                { id: 'presentation', icon: Presentation, label: 'Presentation',      sub: 'PPTX + speaker notes', badge: null },
                { id: 'advisory',     icon: FileCheck,   label: 'Advisory',           sub: 'PDF document',         badge: null },
                { id: 'infographic',  icon: PieChart,    label: 'Infographic',         sub: 'SVG visual',           badge: null },
                { id: 'linkedin',     icon: FileOutput,  label: 'LinkedIn Post',       sub: 'Social media',         badge: 'in' },
                { id: 'twitter',      icon: Twitter,     label: 'X / Twitter Post',    sub: '≤280 chars per tweet', badge: 'X' },
                { id: 'video',        icon: Video,       label: 'Video Package',       sub: 'Script + MP3 + SRT',   badge: null },
              ].map((f) => {
                const isSelected = formats[f.id as keyof typeof formats];
                return (
                  <div
                    key={f.id}
                    onClick={() => handleToggle(f.id as keyof typeof formats)}
                    className="cursor-pointer bg-white rounded-xl border border-stone-200 p-3.5 flex items-center justify-between shadow-sm hover:border-[#C07050]/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 ${
                        f.badge === 'in' ? 'bg-[#F2F6FA]' : f.badge === 'X' ? 'bg-black' : 'bg-[#FAF6F4]'
                      }`}>
                        {f.badge === 'in' ? (
                          <div className="h-4 w-4 bg-[#0A66C2] rounded-sm flex items-center justify-center">
                            <span className="text-[9px] font-black text-white leading-none">in</span>
                          </div>
                        ) : f.badge === 'X' ? (
                          <span className="text-[11px] font-black text-white leading-none">𝕏</span>
                        ) : (
                          <f.icon className="h-4 w-4 text-[#A35E47]" strokeWidth={1.5} />
                        )}
                      </div>
                      <div>
                        <p className="text-[12px] font-bold text-stone-900 leading-tight">{f.label}</p>
                        <p className="text-[10px] text-stone-400 mt-0.5">{f.sub}</p>
                      </div>
                    </div>
                    <div className={`h-[18px] w-[18px] rounded-[4px] border flex items-center justify-center ${
                      isSelected ? 'bg-[#9E573F] border-[#9E573F]' : 'bg-white border-stone-300'
                    }`}>
                      {isSelected && <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* BOTTOM ACTION BAR */}
            <div className="flex items-center justify-between pt-6">
              <button 
                onClick={() => onNavigate('/transform/new')}
                className="flex items-center gap-2 bg-white border border-stone-300 text-stone-700 font-semibold text-[14px] px-5 py-2.5 rounded-lg hover:bg-stone-50 transition-all shadow-sm"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
              <div className="flex items-center gap-6">
                <button className="text-[13px] font-semibold text-stone-700 hover:text-stone-900 underline underline-offset-4 transition-colors">
                  Save as draft
                </button>
                <button 
                  onClick={() => onNavigate('/transform/3')}
                  className="flex items-center gap-2 bg-[#9E573F] hover:bg-[#8B4A2F] text-white font-semibold text-[14px] px-6 py-3 rounded-lg transition-all shadow-sm"
                >
                  Continue to Review <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN */}
          <div>
            <div className="mb-4">
              <h2 className="text-[19px] font-black text-stone-900 mb-1">Live preview</h2>
              <p className="text-[13px] text-stone-500">This is a preview of how your content will look based on the current settings.</p>
            </div>

            {/* Tabs */}
            <div className="flex gap-6 border-b border-stone-200 mb-6">
              {formats.summary && (
                <button 
                  onClick={() => setActiveTab('summary')}
                  className={`pb-3 text-[13px] font-bold ${activeTab === 'summary' ? 'text-[#9E573F] border-b-2 border-[#9E573F]' : 'text-stone-500 hover:text-stone-700'}`}
                >
                  Executive Summary
                </button>
              )}
              {formats.presentation && (
                <button 
                  onClick={() => setActiveTab('presentation')}
                  className={`pb-3 text-[13px] font-bold ${activeTab === 'presentation' ? 'text-[#9E573F] border-b-2 border-[#9E573F]' : 'text-stone-500 hover:text-stone-700'}`}
                >
                  Presentation
                </button>
              )}
              {formats.linkedin && (
                <button 
                  onClick={() => setActiveTab('linkedin')}
                  className={`pb-3 text-[13px] font-bold ${activeTab === 'linkedin' ? 'text-[#9E573F] border-b-2 border-[#9E573F]' : 'text-stone-500 hover:text-stone-700'}`}
                >
                  LinkedIn Post
                </button>
              )}
            </div>

            {/* Preview Panel */}
            <div className="flex gap-6">
              
              {/* Document Mockup */}
              <div className="bg-white border border-stone-200 shadow-md w-[240px] h-[340px] shrink-0 p-5 flex flex-col relative overflow-hidden">
                <div className="flex items-center gap-1 mb-8">
                  <span className="text-[8px] font-black text-stone-900">REVAMP</span>
                  <span className="text-[8px] font-black text-[#C07050]">AI</span>
                </div>
                
                <p className="text-[8px] font-bold text-stone-500 mb-1">Q3 2024</p>
                <h3 className="text-[18px] font-black text-stone-900 leading-tight mb-3">Product Strategy<br/>Report</h3>
                <p className="text-[9px] text-stone-500 leading-relaxed mb-auto pr-4">
                  Key insights, market analysis and strategic recommendations
                </p>
                
                {/* Architecture image embedded at the bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-[120px] bg-cover bg-center" style={{ backgroundImage: `url('/architecture.jpg')` }} />
              </div>

              {/* Sidebar Metadata */}
              <div className="flex-1 space-y-6 pt-1">
                <div className="flex gap-3">
                  <FileText className="h-4 w-4 text-stone-500 shrink-0" strokeWidth={1.5} />
                  <div>
                    <p className="text-[11px] font-bold text-stone-900">Format</p>
                    <p className="text-[10px] text-stone-500 mt-0.5">PDF Document</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <FileText className="h-4 w-4 text-stone-500 shrink-0" strokeWidth={1.5} />
                  <div>
                    <p className="text-[11px] font-bold text-stone-900">Estimated length</p>
                    <p className="text-[10px] text-stone-500 mt-0.5">8-12 pages</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="shrink-0 flex flex-col gap-[3px] mt-1">
                    <div className="flex items-center gap-1"><div className="h-[3px] w-[3px] rounded-full bg-stone-500"/><div className="h-[2px] w-[10px] bg-stone-500 rounded"/></div>
                    <div className="flex items-center gap-1"><div className="h-[3px] w-[3px] rounded-full bg-stone-500"/><div className="h-[2px] w-[14px] bg-stone-500 rounded"/></div>
                    <div className="flex items-center gap-1"><div className="h-[3px] w-[3px] rounded-full bg-stone-500"/><div className="h-[2px] w-[10px] bg-stone-500 rounded"/></div>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-stone-900 mb-1">Key sections</p>
                    <ul className="text-[10px] text-stone-500 space-y-1 ml-2 list-disc pl-2">
                      <li>Executive summary</li>
                      <li>Market analysis</li>
                      <li>Competitive landscape</li>
                      <li>Strategic recommendations</li>
                    </ul>
                  </div>
                </div>

                <div className="flex gap-3">
                  <PieChart className="h-4 w-4 text-stone-500 shrink-0" strokeWidth={1.5} />
                  <div>
                    <p className="text-[11px] font-bold text-stone-900 mb-1">Visual elements</p>
                    <ul className="text-[10px] text-stone-500 space-y-1 ml-2 list-disc pl-2">
                      <li>Charts and graphs</li>
                      <li>Key statistics</li>
                      <li>Branded design</li>
                    </ul>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
