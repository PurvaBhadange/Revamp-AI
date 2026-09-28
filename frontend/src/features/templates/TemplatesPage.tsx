"use client";

import React, { useState } from 'react';
import { 
  Plus, Search, FileText, Clock, Users, ArrowRight, Copy, Play
} from 'lucide-react';

interface TemplatesPageProps {
  onNavigate: (route: string) => void;
}

export function TemplatesPage({ onNavigate }: TemplatesPageProps) {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div className="min-h-full bg-[#FDFCFB] font-sans px-8 py-10">
      
      {/* PAGE HEADER */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="text-[10px] font-bold tracking-[0.2em] text-[#C07050] uppercase mb-2">Templates</p>
          <h1 className="text-[44px] font-black text-stone-950 tracking-tight leading-none mb-3">Templates</h1>
          <p className="text-[15px] text-stone-500 font-medium">Start with a proven content transformation.</p>
        </div>
        <button 
          onClick={() => onNavigate('/transform/new')}
          className="flex items-center gap-2 bg-white border border-[#C07050] text-[#A35E47] hover:bg-[#FDF3F0] font-semibold text-[14px] px-5 py-3 rounded-lg shadow-sm transition-colors"
        >
          <Plus className="h-4 w-4" /> Create from scratch
        </button>
      </div>

      {/* FEATURED BANNER */}
      <div className="w-full h-[320px] bg-[#F5EEE9] rounded-2xl mb-8 flex relative overflow-hidden border border-stone-200">
        
        {/* Banner Content */}
        <div className="w-1/2 p-12 flex flex-col justify-center relative z-10">
          <p className="text-[10px] font-bold tracking-[0.2em] text-[#C07050] uppercase mb-3">Featured Template</p>
          <h2 className="text-[46px] font-serif font-bold text-stone-900 leading-none mb-4 tracking-tight">Executive Brief</h2>
          <p className="text-[15px] text-stone-600 font-medium mb-8 max-w-[400px]">
            Turn complex information into a concise, high-impact executive brief with key insights and recommendations.
          </p>
          
          <button 
            onClick={() => onNavigate('/transform/new')}
            className="flex items-center justify-center gap-2 bg-[#9E573F] hover:bg-[#8B4A2F] text-white font-semibold text-[14px] w-[180px] py-3.5 rounded-lg shadow-sm transition-colors mb-6"
          >
            Use template <ArrowRight className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-6 text-[12px] text-stone-500 font-medium">
            <div className="flex items-center gap-1.5"><FileText className="h-4 w-4" /> 4 pages</div>
            <div className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> ~ 5 mins</div>
            <div className="flex items-center gap-1.5"><Users className="h-4 w-4" /> Executives & Stakeholders</div>
          </div>
        </div>

        {/* Banner Graphic */}
        <div className="absolute right-0 top-0 bottom-0 w-3/5 bg-gradient-to-r from-[#F5EEE9] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-0 z-0 bg-cover bg-center opacity-30" style={{ backgroundImage: `url('/architecture.jpg')` }}></div>
        
        <div className="absolute right-[-20px] top-4 bottom-[-40px] w-1/2 flex items-center justify-end z-10 gap-6 pr-8">
          
          {/* Page 1 (Front) */}
          <div className="w-[300px] h-[380px] bg-white shadow-2xl rounded-sm border border-stone-200 shrink-0 transform -translate-y-8 z-30 flex flex-col relative overflow-hidden">
             <div className="p-8 pb-0">
               <div className="flex items-center gap-1 mb-8">
                 <span className="text-[8px] font-black text-stone-900">REVAMP</span>
                 <span className="text-[8px] font-black text-[#C07050]">AI</span>
               </div>
               <h3 className="text-[32px] font-serif font-bold text-stone-900 leading-none mb-6">Executive<br/>Brief</h3>
               <div className="w-full h-[2px] bg-stone-200 mb-2"></div>
               <div className="w-5/6 h-[2px] bg-stone-200 mb-2"></div>
               <div className="w-4/6 h-[2px] bg-stone-200"></div>
             </div>
             <div className="absolute bottom-0 right-0 left-12 h-[160px] bg-cover bg-center" style={{ backgroundImage: `url('/architecture.jpg')` }} />
          </div>

          {/* Page 2 (Middle) */}
          <div className="w-[260px] h-[340px] bg-white shadow-xl rounded-sm border border-stone-200 shrink-0 transform translate-x-[-120px] translate-y-4 z-20 flex flex-col p-6">
            <h4 className="text-[14px] font-bold text-stone-900 mb-6">Key Insights</h4>
            <div className="flex-1 flex flex-col gap-4">
              <div className="w-full h-2 bg-stone-100"></div>
              <div className="w-3/4 h-2 bg-stone-100"></div>
              {/* Mini bar chart */}
              <div className="flex items-end gap-1.5 h-16 w-3/4 mt-4">
                <div className="w-full bg-[#E5DFD6] h-[30%]"></div>
                <div className="w-full bg-[#D4ACA0] h-[50%]"></div>
                <div className="w-full bg-[#C07050] h-[70%]"></div>
                <div className="w-full bg-[#8B4A2F] h-[100%]"></div>
              </div>
            </div>
            <div className="w-full h-[60px] bg-cover bg-center mt-auto opacity-80" style={{ backgroundImage: `url('/architecture.jpg')` }} />
          </div>

          {/* Page 3 (Back) */}
          <div className="w-[260px] h-[340px] bg-white shadow-lg rounded-sm border border-stone-200 shrink-0 transform translate-x-[-220px] translate-y-12 z-10 flex flex-col p-6">
            <h4 className="text-[14px] font-bold text-stone-900 mb-6 leading-tight">Strategic<br/>Recommendations</h4>
            <div className="flex-1 flex flex-col gap-4">
              <div className="flex items-start gap-2">
                <span className="text-[10px] font-bold text-stone-400">01</span>
                <div>
                  <div className="w-24 h-1.5 bg-stone-200 mb-1"></div>
                  <div className="w-32 h-1.5 bg-stone-100"></div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[10px] font-bold text-stone-400">02</span>
                <div>
                  <div className="w-24 h-1.5 bg-stone-200 mb-1"></div>
                  <div className="w-32 h-1.5 bg-stone-100"></div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[10px] font-bold text-stone-400">03</span>
                <div>
                  <div className="w-24 h-1.5 bg-stone-200 mb-1"></div>
                  <div className="w-32 h-1.5 bg-stone-100"></div>
                </div>
              </div>
            </div>
            <div className="w-full h-[60px] bg-cover bg-center mt-auto opacity-60" style={{ backgroundImage: `url('/architecture.jpg')` }} />
          </div>

        </div>
      </div>

      {/* FILTERS BAR */}
      <div className="flex items-center justify-between mb-8">
        <div className="relative w-[300px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
          <input 
            type="text" 
            placeholder="Search templates..." 
            className="w-full h-10 pl-9 pr-4 rounded-lg border border-stone-200 bg-white text-[13px] placeholder:text-stone-400 focus:outline-none focus:border-[#C07050] focus:ring-1 focus:ring-[#C07050] shadow-sm"
          />
        </div>

        <div className="flex items-center gap-1.5">
          <button className="px-5 py-2 rounded-full text-[12px] font-bold bg-[#FDF3F0] text-[#9E573F] border border-[#C07050] transition-colors">All</button>
          <button className="px-5 py-2 rounded-full text-[12px] font-bold text-stone-600 hover:bg-stone-100 border border-transparent transition-colors">Social (3)</button>
          <button className="px-5 py-2 rounded-full text-[12px] font-bold text-stone-600 hover:bg-stone-100 border border-transparent transition-colors">Documents (4)</button>
          <button className="px-5 py-2 rounded-full text-[12px] font-bold text-stone-600 hover:bg-stone-100 border border-transparent transition-colors">Presentations (3)</button>
          <button className="px-5 py-2 rounded-full text-[12px] font-bold text-stone-600 hover:bg-stone-100 border border-transparent transition-colors">Video (2)</button>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 h-10 px-4 rounded-lg bg-white border border-stone-200 text-[12px] font-bold text-stone-700 shadow-sm hover:bg-stone-50">
            Audience <ChevronDownIcon />
          </button>
          <button className="flex items-center gap-2 h-10 px-4 rounded-lg bg-white border border-stone-200 text-[12px] font-bold text-stone-700 shadow-sm hover:bg-stone-50">
            Objective <ChevronDownIcon />
          </button>
        </div>
      </div>

      {/* TEMPLATES GRID */}
      <div className="grid grid-cols-4 gap-6 pb-10">
        
        {/* Card 1: Executive Brief */}
        <div className="bg-white rounded-xl border border-stone-200 shadow-sm hover:shadow-md transition-all p-4 group">
          <div className="w-full aspect-[2/1] bg-[#F5F4F1] rounded-lg mb-4 flex overflow-hidden border border-stone-100 relative">
            <div className="w-1/2 p-3 flex flex-col justify-center">
              <h4 className="text-[12px] font-serif font-black text-stone-900 leading-tight mb-2">Executive<br/>Brief</h4>
              <div className="w-full h-0.5 bg-stone-200 mb-1"></div>
              <div className="w-3/4 h-0.5 bg-stone-200"></div>
            </div>
            <div className="w-1/2 h-full bg-cover bg-center" style={{ backgroundImage: `url('/architecture.jpg')` }} />
          </div>
          <h3 className="text-[14px] font-bold text-stone-900 mb-1">Executive Brief</h3>
          <p className="text-[11px] text-stone-500 leading-relaxed mb-4 h-8 line-clamp-2">
            Concise summary with key insights and recommendations.
          </p>
          <div className="flex items-center justify-between mt-auto">
            <button className="text-[12px] font-bold text-[#A35E47] flex items-center gap-1 hover:text-[#8B4A2F]">
              Use template <ArrowRight className="h-3 w-3" />
            </button>
            <button className="text-stone-400 hover:text-stone-700"><Copy className="h-4 w-4" /></button>
          </div>
        </div>

        {/* Card 2: LinkedIn Thought Leadership */}
        <div className="bg-white rounded-xl border border-stone-200 shadow-sm hover:shadow-md transition-all p-4 group">
          <div className="w-full aspect-[2/1] bg-[#F5F4F1] rounded-lg mb-4 flex overflow-hidden border border-stone-100 relative">
            <div className="w-2/3 p-3 flex flex-col justify-center bg-white border-r border-stone-100">
              <div className="flex items-center gap-1 mb-2">
                <div className="h-3.5 w-3.5 bg-[#0A66C2] rounded-[2px] flex items-center justify-center text-[7px] font-bold text-white">in</div>
                <h4 className="text-[9px] font-black text-stone-900 leading-tight">LinkedIn<br/>Thought Leadership</h4>
              </div>
              <div className="w-full h-0.5 bg-stone-200 mb-1"></div>
              <div className="w-5/6 h-0.5 bg-stone-200 mb-1"></div>
              <div className="w-1/2 h-0.5 bg-stone-200"></div>
            </div>
            <div className="w-1/3 h-full bg-cover bg-center" style={{ backgroundImage: `url('/architecture.jpg')` }} />
          </div>
          <h3 className="text-[14px] font-bold text-stone-900 mb-1">LinkedIn Thought Leadership</h3>
          <p className="text-[11px] text-stone-500 leading-relaxed mb-4 h-8 line-clamp-2">
            Engaging post tailored for professional audiences.
          </p>
          <div className="flex items-center justify-between mt-auto">
            <button className="text-[12px] font-bold text-[#A35E47] flex items-center gap-1 hover:text-[#8B4A2F]">
              Use template <ArrowRight className="h-3 w-3" />
            </button>
            <button className="text-stone-400 hover:text-stone-700"><Copy className="h-4 w-4" /></button>
          </div>
        </div>

        {/* Card 3: Product Launch Brief */}
        <div className="bg-white rounded-xl border border-stone-200 shadow-sm hover:shadow-md transition-all p-4 group">
          <div className="w-full aspect-[2/1] bg-[#F5F4F1] rounded-lg mb-4 flex overflow-hidden border border-stone-100 relative">
            <div className="w-1/2 p-3 flex flex-col justify-center">
              <h4 className="text-[11px] font-serif font-black text-stone-900 leading-tight mb-2">Product<br/>Launch Brief</h4>
              <div className="w-full h-0.5 bg-stone-200 mb-1"></div>
              <div className="w-3/4 h-0.5 bg-stone-200"></div>
            </div>
            <div className="w-1/2 h-full bg-cover bg-center" style={{ backgroundImage: `url('/architecture.jpg')` }} />
          </div>
          <h3 className="text-[14px] font-bold text-stone-900 mb-1">Product Launch</h3>
          <p className="text-[11px] text-stone-500 leading-relaxed mb-4 h-8 line-clamp-2">
            Create a compelling product launch narrative and key messages.
          </p>
          <div className="flex items-center justify-between mt-auto">
            <button className="text-[12px] font-bold text-[#A35E47] flex items-center gap-1 hover:text-[#8B4A2F]">
              Use template <ArrowRight className="h-3 w-3" />
            </button>
            <button className="text-stone-400 hover:text-stone-700"><Copy className="h-4 w-4" /></button>
          </div>
        </div>

        {/* Card 4: Market Analysis */}
        <div className="bg-white rounded-xl border border-stone-200 shadow-sm hover:shadow-md transition-all p-4 group">
          <div className="w-full aspect-[2/1] bg-[#F5F4F1] rounded-lg mb-4 flex overflow-hidden border border-stone-100 relative">
            <div className="w-1/2 p-3 flex flex-col justify-center bg-white border-r border-stone-100">
              <h4 className="text-[11px] font-serif font-black text-stone-900 leading-tight mb-2">Market<br/>Analysis</h4>
              <div className="w-full h-0.5 bg-stone-200 mb-1"></div>
              <div className="w-3/4 h-0.5 bg-stone-200"></div>
            </div>
            <div className="w-1/2 h-full bg-[#FAF9F7] flex items-end justify-center gap-[2px] p-2">
              <div className="w-1/4 h-[30%] bg-[#E5DFD6]"></div>
              <div className="w-1/4 h-[50%] bg-[#D4ACA0]"></div>
              <div className="w-1/4 h-[75%] bg-[#C07050]"></div>
              <div className="w-1/4 h-[100%] bg-[#8B4A2F]"></div>
            </div>
          </div>
          <h3 className="text-[14px] font-bold text-stone-900 mb-1">Market Analysis</h3>
          <p className="text-[11px] text-stone-500 leading-relaxed mb-4 h-8 line-clamp-2">
            Transform market research into clear insights and opportunities.
          </p>
          <div className="flex items-center justify-between mt-auto">
            <button className="text-[12px] font-bold text-[#A35E47] flex items-center gap-1 hover:text-[#8B4A2F]">
              Use template <ArrowRight className="h-3 w-3" />
            </button>
            <button className="text-stone-400 hover:text-stone-700"><Copy className="h-4 w-4" /></button>
          </div>
        </div>

        {/* Card 5: Board Presentation */}
        <div className="bg-white rounded-xl border border-stone-200 shadow-sm hover:shadow-md transition-all p-4 group">
          <div className="w-full aspect-[2/1] bg-[#F5F4F1] rounded-lg mb-4 flex overflow-hidden border border-stone-100 relative">
            <div className="w-1/2 p-3 flex flex-col justify-center bg-[#FAF9F7]">
              <h4 className="text-[11px] font-serif font-black text-stone-900 leading-tight mb-2">Board<br/>Presentation</h4>
              <div className="w-full h-0.5 bg-stone-200 mb-1"></div>
              <div className="w-3/4 h-0.5 bg-stone-200"></div>
            </div>
            <div className="w-1/2 h-full bg-cover bg-center" style={{ backgroundImage: `url('/architecture.jpg')` }} />
          </div>
          <h3 className="text-[14px] font-bold text-stone-900 mb-1">Board Presentation</h3>
          <p className="text-[11px] text-stone-500 leading-relaxed mb-4 h-8 line-clamp-2">
            Professional slides for board meetings and investors.
          </p>
          <div className="flex items-center justify-between mt-auto">
            <button className="text-[12px] font-bold text-[#A35E47] flex items-center gap-1 hover:text-[#8B4A2F]">
              Use template <ArrowRight className="h-3 w-3" />
            </button>
            <button className="text-stone-400 hover:text-stone-700"><Copy className="h-4 w-4" /></button>
          </div>
        </div>

        {/* Card 6: Advisory Note */}
        <div className="bg-white rounded-xl border border-stone-200 shadow-sm hover:shadow-md transition-all p-4 group">
          <div className="w-full aspect-[2/1] bg-[#F5F4F1] rounded-lg mb-4 flex overflow-hidden border border-stone-100 relative">
            <div className="w-1/2 p-3 flex flex-col justify-center bg-white">
              <h4 className="text-[11px] font-serif font-black text-stone-900 leading-tight mb-2">Advisory<br/>Note</h4>
              <div className="w-full h-0.5 bg-stone-200 mb-1"></div>
              <div className="w-3/4 h-0.5 bg-stone-200"></div>
            </div>
            <div className="w-1/2 h-full bg-cover bg-center filter grayscale opacity-90" style={{ backgroundImage: `url('/architecture.jpg')` }} />
          </div>
          <h3 className="text-[14px] font-bold text-stone-900 mb-1">Advisory Note</h3>
          <p className="text-[11px] text-stone-500 leading-relaxed mb-4 h-8 line-clamp-2">
            Structured advisory note with analysis and recommendations.
          </p>
          <div className="flex items-center justify-between mt-auto">
            <button className="text-[12px] font-bold text-[#A35E47] flex items-center gap-1 hover:text-[#8B4A2F]">
              Use template <ArrowRight className="h-3 w-3" />
            </button>
            <button className="text-stone-400 hover:text-stone-700"><Copy className="h-4 w-4" /></button>
          </div>
        </div>

        {/* Card 7: Video Script */}
        <div className="bg-white rounded-xl border border-stone-200 shadow-sm hover:shadow-md transition-all p-4 group">
          <div className="w-full aspect-[2/1] bg-[#F5F4F1] rounded-lg mb-4 flex overflow-hidden border border-stone-100 relative">
            <div className="w-1/2 p-3 flex flex-col justify-center bg-[#FAF9F7]">
              <h4 className="text-[11px] font-serif font-black text-stone-900 leading-tight mb-2">Video<br/>Script</h4>
              <div className="w-6 h-4 bg-white border border-stone-200 rounded flex items-center justify-center">
                <Play className="h-2 w-2 text-[#C07050] fill-[#C07050]" />
              </div>
            </div>
            <div className="w-1/2 h-full bg-cover bg-center opacity-80" style={{ backgroundImage: `url('/architecture.jpg')` }} />
          </div>
          <h3 className="text-[14px] font-bold text-stone-900 mb-1">Video Script</h3>
          <p className="text-[11px] text-stone-500 leading-relaxed mb-4 h-8 line-clamp-2">
            Generate a compelling script for product, brand or explainer videos.
          </p>
          <div className="flex items-center justify-between mt-auto">
            <button className="text-[12px] font-bold text-[#A35E47] flex items-center gap-1 hover:text-[#8B4A2F]">
              Use template <ArrowRight className="h-3 w-3" />
            </button>
            <button className="text-stone-400 hover:text-stone-700"><Copy className="h-4 w-4" /></button>
          </div>
        </div>

        {/* Card 8: Infographic */}
        <div className="bg-white rounded-xl border border-stone-200 shadow-sm hover:shadow-md transition-all p-4 group">
          <div className="w-full aspect-[2/1] bg-[#F5F4F1] rounded-lg mb-4 flex overflow-hidden border border-stone-100 relative">
            <div className="w-1/2 p-3 flex flex-col justify-center bg-white border-r border-stone-100">
              <h4 className="text-[11px] font-serif font-black text-stone-900 leading-tight mb-2">Infographic</h4>
              <div className="w-full h-0.5 bg-stone-200 mb-1"></div>
              <div className="w-3/4 h-0.5 bg-stone-200"></div>
            </div>
            <div className="w-1/2 h-full bg-[#FAF9F7] flex flex-col items-center justify-center p-2 gap-2">
              {/* Mini infographic layout */}
              <div className="flex gap-1 w-full justify-center">
                <div className="w-2/3 flex flex-col gap-[2px]">
                   <div className="flex gap-1 items-center"><div className="h-1 w-1 bg-stone-300 rounded-full"></div><div className="h-0.5 w-6 bg-stone-200"></div></div>
                   <div className="flex gap-1 items-center"><div className="h-1 w-1 bg-stone-300 rounded-full"></div><div className="h-0.5 w-8 bg-stone-200"></div></div>
                   <div className="flex gap-1 items-center"><div className="h-1 w-1 bg-stone-300 rounded-full"></div><div className="h-0.5 w-5 bg-stone-200"></div></div>
                </div>
                {/* Pie chart */}
                <div className="h-5 w-5 rounded-full border-[3px] border-[#E5DFD6] border-t-[#C07050] border-r-[#8B4A2F]"></div>
              </div>
            </div>
          </div>
          <h3 className="text-[14px] font-bold text-stone-900 mb-1">Infographic</h3>
          <p className="text-[11px] text-stone-500 leading-relaxed mb-4 h-8 line-clamp-2">
            Convert key information into a clean, visual infographic.
          </p>
          <div className="flex items-center justify-between mt-auto">
            <button className="text-[12px] font-bold text-[#A35E47] flex items-center gap-1 hover:text-[#8B4A2F]">
              Use template <ArrowRight className="h-3 w-3" />
            </button>
            <button className="text-stone-400 hover:text-stone-700"><Copy className="h-4 w-4" /></button>
          </div>
        </div>

      </div>
    </div>
  );
}

const ChevronDownIcon = () => (
  <svg className="h-3.5 w-3.5 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);
