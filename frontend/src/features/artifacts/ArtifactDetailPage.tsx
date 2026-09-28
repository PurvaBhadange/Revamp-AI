"use client";

import React, { useState } from 'react';
import { 
  Sidebar as SidebarIcon, ChevronDown, Share2, Download, 
  Bold, Italic, Underline, AlignLeft, List, ListOrdered, Link, Image as ImageIcon, LayoutGrid, MoreHorizontal,
  Wand2, Hammer, PlusSquare, ArrowRight, Save, Clock, Target, Maximize2, MousePointerClick, ChevronRight
} from 'lucide-react';

interface ArtifactDetailPageProps {
  id: string;
  onNavigate: (route: string) => void;
}

export function ArtifactDetailPage({ id, onNavigate }: ArtifactDetailPageProps) {
  const [activeTab, setActiveTab] = useState('refine');

  return (
    <div className="flex flex-col h-full bg-[#FDFDFD] font-sans">
      
      {/* CUSTOM TOP BAR (Replaces standard TopBar) */}
      <div className="h-16 border-b border-stone-200 bg-white flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => onNavigate('/transform/result')}
            className="h-8 w-8 rounded flex items-center justify-center hover:bg-stone-100 text-stone-600 transition-colors"
          >
            <SidebarIcon className="h-4 w-4" />
          </button>
          
          <div className="flex items-center gap-2">
            <h1 className="text-[14px] font-bold text-stone-900">Executive Summary — Q3 Product Strategy</h1>
            <div className="bg-stone-100 text-stone-600 text-[10px] font-bold px-1.5 py-0.5 rounded">PDF</div>
          </div>

          <div className="flex items-center gap-1.5 ml-4 text-[11px] text-stone-500 font-medium">
            <Save className="h-3.5 w-3.5" /> Auto-saved 2 mins ago
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1.5 text-[12px] font-semibold text-stone-700 hover:text-stone-900 px-3 py-1.5 border border-stone-200 rounded-lg shadow-sm bg-white">
            Version 1 <ChevronDown className="h-3 w-3" />
          </button>
          
          <div className="h-5 w-px bg-stone-200 mx-1"></div>
          
          <button className="flex items-center gap-1.5 text-[12px] font-semibold text-stone-700 hover:text-stone-900 px-4 py-1.5 border border-stone-200 rounded-lg shadow-sm bg-white">
            <Share2 className="h-3.5 w-3.5" /> Share
          </button>
          <button className="flex items-center gap-1.5 text-[12px] font-semibold text-white bg-[#9E573F] hover:bg-[#8B4A2F] px-4 py-1.5 rounded-lg shadow-sm transition-colors">
            <Download className="h-3.5 w-3.5" /> Export
          </button>
          
          <div className="ml-2 h-8 w-8 rounded-full bg-stone-200 border-2 border-white shadow-sm flex items-center justify-center text-[10px] font-black text-stone-700">AW</div>
        </div>
      </div>

      {/* THREE COLUMN LAYOUT */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* LEFT PANEL: Document Outline */}
        <div className="w-[260px] border-r border-stone-200 bg-[#FDFDFD] flex flex-col shrink-0">
          <div className="p-4 flex items-center justify-between border-b border-stone-100">
            <h2 className="text-[13px] font-bold text-stone-900">Document outline</h2>
            <button className="text-stone-400 hover:text-stone-700"><PlusSquare className="h-4 w-4" /></button>
          </div>
          
          <div className="flex-1 overflow-y-auto py-2">
            
            {/* Outline 1 */}
            <div className="mb-2">
              <div className="flex items-center gap-2 px-4 py-1.5 bg-[#FAF6F4]">
                <div className="h-5 w-5 rounded bg-stone-200/50 flex items-center justify-center text-[10px] font-bold text-stone-700">1</div>
                <span className="text-[12px] font-bold text-stone-900">Overview</span>
              </div>
              <div className="pl-11 pr-4 py-1 flex items-center gap-3">
                <span className="text-[10px] text-stone-400 font-medium">1.1</span>
                <span className="text-[11px] text-stone-600 font-medium">Executive Summary</span>
              </div>
              <div className="pl-11 pr-4 py-1 flex items-center gap-3">
                <span className="text-[10px] text-stone-400 font-medium">1.2</span>
                <span className="text-[11px] text-stone-600 font-medium">Background</span>
              </div>
              <div className="pl-11 pr-4 py-1 flex items-center gap-3">
                <span className="text-[10px] text-stone-400 font-medium">1.3</span>
                <span className="text-[11px] text-stone-600 font-medium">Objectives</span>
              </div>
            </div>

            {/* Outline 2 */}
            <div className="mb-2">
              <div className="flex items-center gap-2 px-4 py-1.5 hover:bg-stone-50 cursor-pointer">
                <div className="h-5 w-5 rounded bg-stone-100 flex items-center justify-center text-[10px] font-bold text-stone-500">2</div>
                <span className="text-[12px] font-bold text-stone-900">Market Analysis</span>
              </div>
              <div className="pl-11 pr-4 py-1 flex items-center gap-3">
                <span className="text-[10px] text-stone-400 font-medium">2.1</span>
                <span className="text-[11px] text-stone-500">Industry Landscape</span>
              </div>
              <div className="pl-11 pr-4 py-1 flex items-center gap-3">
                <span className="text-[10px] text-stone-400 font-medium">2.2</span>
                <span className="text-[11px] text-stone-500">Key Trends</span>
              </div>
              <div className="pl-11 pr-4 py-1 flex items-center gap-3">
                <span className="text-[10px] text-stone-400 font-medium">2.3</span>
                <span className="text-[11px] text-stone-500">Competitive Analysis</span>
              </div>
            </div>

            {/* Outline 3 */}
            <div className="mb-2">
              <div className="flex items-center gap-2 px-4 py-1.5 hover:bg-stone-50 cursor-pointer">
                <div className="h-5 w-5 rounded bg-stone-100 flex items-center justify-center text-[10px] font-bold text-stone-500">3</div>
                <span className="text-[12px] font-bold text-stone-900">Key Initiatives</span>
              </div>
              <div className="pl-11 pr-4 py-1 flex items-center gap-3">
                <span className="text-[10px] text-stone-400 font-medium">3.1</span>
                <span className="text-[11px] text-stone-500">Product Innovation</span>
              </div>
              <div className="pl-11 pr-4 py-1 flex items-center gap-3">
                <span className="text-[10px] text-stone-400 font-medium">3.2</span>
                <span className="text-[11px] text-stone-500">Go-to-Market Strategy</span>
              </div>
              <div className="pl-11 pr-4 py-1 flex items-center gap-3">
                <span className="text-[10px] text-stone-400 font-medium">3.3</span>
                <span className="text-[11px] text-stone-500">Operational Efficiency</span>
              </div>
            </div>

            {/* Outline 4 */}
            <div>
              <div className="flex items-center gap-2 px-4 py-1.5 hover:bg-stone-50 cursor-pointer">
                <div className="h-5 w-5 rounded bg-stone-100 flex items-center justify-center text-[10px] font-bold text-stone-500">4</div>
                <span className="text-[12px] font-bold text-stone-900">Recommendations</span>
              </div>
              <div className="pl-11 pr-4 py-1 flex items-center gap-3">
                <span className="text-[10px] text-stone-400 font-medium">4.1</span>
                <span className="text-[11px] text-stone-500">Strategic Priorities</span>
              </div>
              <div className="pl-11 pr-4 py-1 flex items-center gap-3">
                <span className="text-[10px] text-stone-400 font-medium">4.2</span>
                <span className="text-[11px] text-stone-500">Risk Considerations</span>
              </div>
              <div className="pl-11 pr-4 py-1 flex items-center gap-3">
                <span className="text-[10px] text-stone-400 font-medium">4.3</span>
                <span className="text-[11px] text-stone-500">Next Steps</span>
              </div>
            </div>

          </div>
        </div>

        {/* MIDDLE PANEL: Editor Workspace */}
        <div className="flex-1 bg-[#F5F4F1] flex flex-col relative">
          
          {/* Toolbar */}
          <div className="h-[46px] bg-white border-b border-stone-200 flex items-center px-4 gap-4 shrink-0 shadow-sm z-10">
            <button className="flex items-center gap-1 text-[11px] font-bold text-stone-700 bg-stone-100 px-2 py-1 rounded">
              Normal Text <ChevronDown className="h-3 w-3" />
            </button>
            <div className="w-px h-4 bg-stone-200"></div>
            <button className="flex items-center gap-1 text-[11px] font-bold text-stone-700">
              Times New Roman <ChevronDown className="h-3 w-3" />
            </button>
            <div className="w-px h-4 bg-stone-200"></div>
            <button className="flex items-center gap-1 text-[11px] font-bold text-stone-700">
              11 <ChevronDown className="h-3 w-3" />
            </button>
            <div className="w-px h-4 bg-stone-200"></div>
            <div className="flex items-center gap-1">
              <button className="h-7 w-7 flex items-center justify-center rounded bg-stone-100 text-stone-900"><Bold className="h-3.5 w-3.5" /></button>
              <button className="h-7 w-7 flex items-center justify-center rounded hover:bg-stone-100 text-stone-600"><Italic className="h-3.5 w-3.5" /></button>
              <button className="h-7 w-7 flex items-center justify-center rounded hover:bg-stone-100 text-stone-600"><Underline className="h-3.5 w-3.5" /></button>
            </div>
            <div className="w-px h-4 bg-stone-200"></div>
            <div className="flex items-center gap-1">
              <button className="h-7 w-7 flex items-center justify-center rounded hover:bg-stone-100 text-stone-600"><AlignLeft className="h-3.5 w-3.5" /></button>
              <button className="h-7 w-7 flex items-center justify-center rounded hover:bg-stone-100 text-stone-600"><List className="h-3.5 w-3.5" /></button>
              <button className="h-7 w-7 flex items-center justify-center rounded hover:bg-stone-100 text-stone-600"><ListOrdered className="h-3.5 w-3.5" /></button>
            </div>
            <div className="w-px h-4 bg-stone-200"></div>
            <div className="flex items-center gap-1">
              <button className="h-7 w-7 flex items-center justify-center rounded hover:bg-stone-100 text-stone-600"><Link className="h-3.5 w-3.5" /></button>
              <button className="h-7 w-7 flex items-center justify-center rounded hover:bg-stone-100 text-stone-600"><ImageIcon className="h-3.5 w-3.5" /></button>
              <button className="h-7 w-7 flex items-center justify-center rounded hover:bg-stone-100 text-stone-600"><LayoutGrid className="h-3.5 w-3.5" /></button>
            </div>
            <div className="w-px h-4 bg-stone-200"></div>
            <button className="h-7 w-7 flex items-center justify-center rounded hover:bg-stone-100 text-stone-600"><MoreHorizontal className="h-3.5 w-3.5" /></button>
          </div>

          {/* Paper Canvas */}
          <div className="flex-1 overflow-y-auto px-10 py-12 flex justify-center">
            
            <div className="w-[816px] min-h-[1056px] bg-white shadow-sm border border-stone-200 pt-16 px-20 pb-20 relative">
              
              {/* Header Image overlay */}
              <div className="absolute top-16 right-0 left-20 h-[140px] bg-cover bg-center overflow-hidden" style={{ backgroundImage: `url('/architecture.jpg')` }}>
                <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent flex flex-col justify-center pr-4">
                  <div className="flex items-center gap-2 mb-2 w-[240px]">
                    <span className="text-[10px] font-black tracking-widest text-[#C07050]">Q3 2024</span>
                    <div className="h-px flex-1 bg-[#C07050]"></div>
                  </div>
                  <h1 className="text-[42px] font-serif font-bold text-stone-900 leading-tight mb-2 tracking-tight">Executive Summary</h1>
                  <p className="text-[16px] text-stone-600 font-serif">Q3 Product Strategy Report</p>
                </div>
              </div>

              {/* Content Space (starts below header image) */}
              <div className="mt-[180px]">
                
                {/* Highlighted text with floating toolbar */}
                <div className="relative">
                  {/* Floating AI Toolbar */}
                  <div className="absolute -top-12 left-8 bg-white border border-stone-200 shadow-md rounded-lg flex items-center p-1 gap-1 z-20">
                    <button className="h-7 w-7 flex items-center justify-center hover:bg-stone-100 rounded text-stone-700 font-serif font-bold text-[12px]">B</button>
                    <button className="h-7 w-7 flex items-center justify-center hover:bg-stone-100 rounded text-stone-700 font-serif italic text-[12px]">I</button>
                    <button className="h-7 w-7 flex items-center justify-center hover:bg-stone-100 rounded text-stone-700 font-serif underline text-[12px]">U</button>
                    <button className="h-7 w-7 flex items-center justify-center hover:bg-stone-100 rounded text-stone-700"><Link className="h-3.5 w-3.5" /></button>
                    <div className="w-px h-4 bg-stone-200 mx-1"></div>
                    <button className="flex items-center gap-1.5 px-3 h-7 bg-[#FDF3F0] hover:bg-[#FCE6DF] text-[#C07050] text-[11px] font-bold rounded transition-colors">
                      <Wand2 className="h-3 w-3" /> Improve with AI
                    </button>
                    <button className="h-7 w-7 flex items-center justify-center hover:bg-stone-100 rounded text-stone-700"><MoreHorizontal className="h-3.5 w-3.5" /></button>
                  </div>

                  <p className="text-[14px] leading-[1.7] text-stone-900 font-serif mb-4">
                    <span className="bg-blue-100/60 selection:bg-blue-200 relative inline">
                      In Q3 2024, we made significant progress toward strengthening our product position, expanding into new markets, and building the foundation for sustainable growth. Our focus remained on delivering customer value through innovation, operational excellence, and data-driven decision making.
                      {/* Fake caret */}
                      <span className="absolute -right-px top-[2px] bottom-[2px] w-0.5 bg-blue-500 animate-pulse"></span>
                    </span>
                  </p>
                </div>
                
                <p className="text-[14px] leading-[1.7] text-stone-900 font-serif mb-8">
                  This report outlines the key achievements, market insights, strategic initiatives and recommendations to guide our efforts in the next quarter.
                </p>

                <div className="grid grid-cols-[1fr_240px] gap-8 mb-8">
                  <div>
                    <h2 className="text-[20px] font-bold font-serif text-stone-900 mb-4 tracking-tight">Key Highlights</h2>
                    <ul className="space-y-3">
                      <li className="flex gap-3 text-[13px] text-stone-800 font-serif leading-relaxed">
                        <div className="h-1.5 w-1.5 rounded-full bg-[#C07050] mt-2 shrink-0"></div>
                        12% growth in product adoption compared to Q2 2024.
                      </li>
                      <li className="flex gap-3 text-[13px] text-stone-800 font-serif leading-relaxed">
                        <div className="h-1.5 w-1.5 rounded-full bg-[#C07050] mt-2 shrink-0"></div>
                        Successful launch of two major feature enhancements.
                      </li>
                      <li className="flex gap-3 text-[13px] text-stone-800 font-serif leading-relaxed">
                        <div className="h-1.5 w-1.5 rounded-full bg-[#C07050] mt-2 shrink-0"></div>
                        Expansion into 3 new international markets.
                      </li>
                      <li className="flex gap-3 text-[13px] text-stone-800 font-serif leading-relaxed">
                        <div className="h-1.5 w-1.5 rounded-full bg-[#C07050] mt-2 shrink-0"></div>
                        Improved customer satisfaction score to 4.6/5.
                      </li>
                    </ul>
                  </div>

                  {/* Graphic Mockup */}
                  <div className="bg-[#FAF9F7] border border-stone-200 rounded-lg p-4 flex flex-col justify-between">
                    <h4 className="text-[10px] font-bold text-stone-900 mb-4">Product Adoption Growth</h4>
                    <div className="flex-1 flex items-end gap-3 justify-center px-2 relative mb-4">
                      
                      <div className="flex flex-col items-center gap-1 w-8">
                        <div className="w-full bg-[#E5DFD6] h-[30%] rounded-t-sm"></div>
                        <span className="text-[8px] font-bold text-stone-500">Q1</span>
                      </div>
                      <div className="flex flex-col items-center gap-1 w-8">
                        <div className="w-full bg-[#D4ACA0] h-[45%] rounded-t-sm"></div>
                        <span className="text-[8px] font-bold text-stone-500">Q2</span>
                      </div>
                      <div className="flex flex-col items-center gap-1 w-8">
                        <div className="w-full bg-[#C07050] h-[65%] rounded-t-sm"></div>
                        <span className="text-[8px] font-bold text-stone-500">Q3</span>
                      </div>
                      <div className="flex flex-col items-center gap-1 w-8 relative">
                        {/* Pill +12% */}
                        <div className="absolute -top-6 bg-white border border-[#A35E47] text-[#A35E47] text-[9px] font-bold px-1.5 py-0.5 rounded shadow-sm z-10 whitespace-nowrap">
                          +12%
                        </div>
                        <div className="w-full bg-[#8B4A2F] h-[85%] rounded-t-sm"></div>
                        <span className="text-[8px] font-bold text-stone-500">Q4 (F)</span>
                      </div>
                      
                      {/* Y-axis lines */}
                      <div className="absolute left-0 bottom-6 right-0 h-px bg-stone-200"></div>
                      <div className="absolute left-0 bottom-[35%] right-0 h-px bg-stone-200"></div>
                      <div className="absolute left-0 bottom-[55%] right-0 h-px bg-stone-200"></div>
                      <div className="absolute left-0 bottom-[75%] right-0 h-px bg-stone-200"></div>

                      <div className="absolute -left-1 bottom-[20px] text-[7px] text-stone-400">0%</div>
                      <div className="absolute -left-1 bottom-[32%] text-[7px] text-stone-400">10%</div>
                      <div className="absolute -left-1 bottom-[52%] text-[7px] text-stone-400">20%</div>
                      <div className="absolute -left-1 bottom-[72%] text-[7px] text-stone-400">30%</div>
                    </div>
                  </div>
                </div>

                <h2 className="text-[20px] font-bold font-serif text-stone-900 mb-3 tracking-tight">Strategic Outlook</h2>
                <p className="text-[14px] leading-[1.7] text-stone-900 font-serif mb-4">
                  Looking ahead, we will continue to invest in core product innovation, strengthen our market presence, and focus on operational scalability. The upcoming quarter presents significant opportunities to accelerate growth and deliver long-term value to our customers and stakeholders.
                </p>

              </div>
            </div>

          </div>

          {/* Bottom Footer inside Editor workspace */}
          <div className="h-10 bg-white border-t border-stone-200 flex items-center justify-between px-6 shrink-0 text-[11px] text-stone-500 font-medium z-10">
            <div className="flex items-center gap-4">
              <span>Page 1 of 18</span>
              <div className="w-px h-3 bg-stone-300"></div>
              <span>654 words</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-stone-600">
                <div className="h-1.5 w-1.5 bg-emerald-500 rounded-full"></div> Last saved 2 mins ago
              </div>
              <div className="flex items-center gap-3 ml-2 border border-stone-200 rounded px-2 py-1">
                <button><Search className="h-3 w-3" /></button>
                <div className="w-16 h-1 bg-stone-200 rounded-full relative">
                  <div className="absolute left-1/2 top-1/2 -translate-y-1/2 h-2.5 w-2.5 bg-stone-400 border border-white rounded-full"></div>
                </div>
                <span className="w-8 text-center">100%</span>
                <button><Maximize2 className="h-3 w-3" /></button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: Refine with AI */}
        <div className="w-[320px] bg-white border-l border-stone-200 flex flex-col shrink-0">
          
          {/* Tabs */}
          <div className="flex items-center px-4 border-b border-stone-200 h-[46px] shrink-0 gap-6">
            <button 
              onClick={() => setActiveTab('refine')}
              className={`h-full text-[12px] font-bold border-b-2 transition-colors ${activeTab === 'refine' ? 'border-[#C07050] text-[#C07050]' : 'border-transparent text-stone-500 hover:text-stone-700'}`}
            >
              Refine
            </button>
            <button 
              onClick={() => setActiveTab('comments')}
              className={`h-full text-[12px] font-bold border-b-2 transition-colors ${activeTab === 'comments' ? 'border-[#C07050] text-[#C07050]' : 'border-transparent text-stone-500 hover:text-stone-700'}`}
            >
              Comments (3)
            </button>
            <button 
              onClick={() => setActiveTab('versions')}
              className={`h-full text-[12px] font-bold border-b-2 transition-colors ${activeTab === 'versions' ? 'border-[#C07050] text-[#C07050]' : 'border-transparent text-stone-500 hover:text-stone-700'}`}
            >
              Versions
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 flex flex-col">
            
            <div className="mb-4">
              <h3 className="text-[13px] font-bold text-stone-900 mb-1">Refine with AI</h3>
              <p className="text-[11px] text-stone-500">Select text or use these actions to improve your content.</p>
            </div>

            {/* Quick Actions Grid */}
            <div className="space-y-2 mb-6">
              
              <button className="w-full flex items-center gap-3 p-3 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 hover:border-stone-300 transition-all text-left shadow-sm">
                <div className="h-8 w-8 rounded bg-[#FAF6F4] flex items-center justify-center text-[#C07050] shrink-0">
                  <Clock className="h-4 w-4" strokeWidth={2} />
                </div>
                <div>
                  <p className="text-[12px] font-bold text-stone-900 leading-tight">Shorten</p>
                  <p className="text-[10px] text-stone-500 mt-0.5">Make it more concise</p>
                </div>
              </button>

              <button className="w-full flex items-center gap-3 p-3 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 hover:border-stone-300 transition-all text-left shadow-sm">
                <div className="h-8 w-8 rounded bg-[#FAF6F4] flex items-center justify-center text-[#C07050] shrink-0">
                  <Hammer className="h-4 w-4" strokeWidth={2} />
                </div>
                <div>
                  <p className="text-[12px] font-bold text-stone-900 leading-tight">Make clearer</p>
                  <p className="text-[10px] text-stone-500 mt-0.5">Improve structure and readability</p>
                </div>
              </button>

              <button className="w-full flex items-center gap-3 p-3 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 hover:border-stone-300 transition-all text-left shadow-sm">
                <div className="h-8 w-8 rounded bg-[#FAF6F4] flex items-center justify-center text-[#C07050] shrink-0">
                  <Target className="h-4 w-4" strokeWidth={2} />
                </div>
                <div>
                  <p className="text-[12px] font-bold text-stone-900 leading-tight">Change tone</p>
                  <p className="text-[10px] text-stone-500 mt-0.5">Professional, conversational, etc.</p>
                </div>
              </button>

              <button className="w-full flex items-center gap-3 p-3 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 hover:border-stone-300 transition-all text-left shadow-sm">
                <div className="h-8 w-8 rounded bg-[#FAF6F4] flex items-center justify-center text-[#C07050] shrink-0">
                  <LayoutGrid className="h-4 w-4" strokeWidth={2} />
                </div>
                <div>
                  <p className="text-[12px] font-bold text-stone-900 leading-tight">Add detail</p>
                  <p className="text-[10px] text-stone-500 mt-0.5">Include key points or examples</p>
                </div>
              </button>

              <button className="w-full flex items-center gap-3 p-3 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 hover:border-stone-300 transition-all text-left shadow-sm">
                <div className="h-8 w-8 rounded bg-[#FAF6F4] flex items-center justify-center text-[#C07050] shrink-0">
                  <Wand2 className="h-4 w-4" strokeWidth={2} />
                </div>
                <div>
                  <p className="text-[12px] font-bold text-stone-900 leading-tight">Rewrite selection</p>
                  <p className="text-[10px] text-stone-500 mt-0.5">Generate a new version</p>
                </div>
              </button>
            </div>

            {/* Custom Instruction */}
            <div className="mb-6 border-b border-stone-200 pb-6">
              <label className="block text-[11px] font-bold text-stone-900 mb-2">Custom instruction</label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="e.g. Emphasize market opportunities..." 
                  className="w-full h-9 rounded-lg border border-stone-200 pl-3 pr-10 text-[12px] text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#C07050] focus:ring-1 focus:ring-[#C07050]"
                />
                <button className="absolute right-1 top-1 bottom-1 w-7 bg-stone-100 hover:bg-stone-200 rounded flex items-center justify-center transition-colors">
                  <ArrowRight className="h-3 w-3 text-stone-600" />
                </button>
              </div>
            </div>

            {/* Recent Changes */}
            <div className="mt-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[12px] font-bold text-stone-900">Recent changes</h3>
                <button className="text-[10px] font-bold text-[#A35E47] hover:text-[#8B4A2F]">View all</button>
              </div>

              <div className="space-y-4 relative pl-3">
                <div className="absolute left-[3px] top-2 bottom-2 w-px bg-stone-200 -z-10"></div>
                
                <div className="relative">
                  <div className="absolute -left-[6px] top-1 h-1.5 w-1.5 rounded-full bg-[#C07050] border-2 border-white box-content"></div>
                  <div className="flex justify-between items-start">
                    <p className="text-[11px] font-bold text-stone-900 leading-tight">Refined executive summary</p>
                    <span className="text-[9px] text-stone-400 shrink-0">2 mins ago</span>
                  </div>
                  <p className="text-[10px] text-stone-500 mt-0.5">Made more concise and added growth metrics.</p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[6px] top-1 h-1.5 w-1.5 rounded-full bg-[#C07050] border-2 border-white box-content"></div>
                  <div className="flex justify-between items-start">
                    <p className="text-[11px] font-bold text-stone-900 leading-tight">Changed tone to professional</p>
                    <span className="text-[9px] text-stone-400 shrink-0">12 mins ago</span>
                  </div>
                  <p className="text-[10px] text-stone-500 mt-0.5">Updated key initiatives section.</p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[6px] top-1 h-1.5 w-1.5 rounded-full bg-[#C07050] border-2 border-white box-content"></div>
                  <div className="flex justify-between items-start">
                    <p className="text-[11px] font-bold text-stone-900 leading-tight">Added market analysis details</p>
                    <span className="text-[9px] text-stone-400 shrink-0">28 mins ago</span>
                  </div>
                  <p className="text-[10px] text-stone-500 mt-0.5">Included competitive landscape insights.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
