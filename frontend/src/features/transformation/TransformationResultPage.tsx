"use client";

import React, { useState } from 'react';
import { 
  FileText, Presentation, Search, RefreshCw, Eye, Download, 
  MoreHorizontal, Copy, Folder, ArrowLeft, CheckCircle2,
  Globe2
} from 'lucide-react';

import { useQuery } from '@tanstack/react-query';
import { artifactsApi } from '@/lib/api/artifacts';
import { useWizardStore } from '@/stores/transformationWizardStore';

interface TransformationResultPageProps {
  transformationId?: string;
  onNavigate: (route: string) => void;
}

export function TransformationResultPage({ transformationId, onNavigate }: TransformationResultPageProps) {
  const [activeFilter, setActiveFilter] = useState('all');
  const { selectedOutputs } = useWizardStore();

  const { data: artifacts, isLoading } = useQuery({
    queryKey: ['artifacts', transformationId],
    queryFn: () => artifactsApi.list(transformationId),
    enabled: !!transformationId,
  });

  return (
    <div className="min-h-full bg-[#F8F7F5] font-sans px-10 py-12">
      <div className="max-w-[1300px] mx-auto">
        
        {/* HEADER & TOP RIGHT CARD */}
        <div className="flex justify-between items-start mb-10">
          <div>
            <p className="text-[10px] font-bold tracking-[0.2em] text-[#C07050] uppercase mb-2">Transformation Complete</p>
            <h1 className="text-[44px] font-black text-stone-950 tracking-tight leading-none mb-3">Your content is ready</h1>
            <p className="text-[15px] text-stone-500 font-medium">
              REVAMP AI has generated {isLoading ? '...' : (artifacts?.length || 0)} outputs from your source document.
            </p>
          </div>

          {/* Source Document Card */}
          <div className="bg-white border border-stone-200 shadow-sm rounded-xl p-4 flex gap-5 w-[520px]">
            {/* Mini Document */}
            <div className="w-[85px] h-[110px] bg-white border border-stone-200 shadow-sm rounded flex flex-col shrink-0 overflow-hidden relative">
              <div className="p-2 flex-1">
                <p className="text-[6px] font-bold text-stone-900 leading-tight mb-1">Q3 Product Strategy Report</p>
                <div className="w-3/4 h-[1.5px] bg-stone-300 mb-0.5 rounded"></div>
                <div className="w-full h-[1.5px] bg-stone-200 mb-0.5 rounded"></div>
                <div className="w-5/6 h-[1.5px] bg-stone-200 rounded"></div>
              </div>
              <div className="h-[45px] bg-cover bg-center" style={{ backgroundImage: `url('/architecture.jpg')` }} />
            </div>

            {/* Details */}
            <div className="flex-1 pt-1">
              <h3 className="text-[17px] font-black text-stone-900 leading-tight mb-1">Q3 Product Strategy Report</h3>
              <p className="text-[11px] text-stone-500 font-medium flex items-center gap-1.5 mb-3">
                <FileText className="h-3.5 w-3.5" /> PDF <span className="mx-0.5">•</span> 18 pages <span className="mx-0.5">•</span> 4.2 MB
              </p>
              <p className="text-[11px] text-stone-500 leading-relaxed pr-2">
                Quarterly strategy report covering product performance, market analysis, key initiatives and roadmap for Q4. Includes competitive landscape and growth opportunities.
              </p>
            </div>
          </div>
        </div>

        {/* FILTERS AND ACTIONS BAR */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setActiveFilter('all')}
              className={`px-5 py-2 rounded-full text-[13px] font-bold transition-colors ${
                activeFilter === 'all' 
                ? 'bg-[#FDF3F0] text-[#9E573F] border border-[#C07050]' 
                : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-50'
              }`}
            >
              All outputs (3)
            </button>
            <button 
              onClick={() => setActiveFilter('docs')}
              className={`px-5 py-2 rounded-full text-[13px] font-bold transition-colors ${
                activeFilter === 'docs' 
                ? 'bg-[#FDF3F0] text-[#9E573F] border border-[#C07050]' 
                : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-50'
              }`}
            >
              Documents (1)
            </button>
            <button 
              onClick={() => setActiveFilter('pres')}
              className={`px-5 py-2 rounded-full text-[13px] font-bold transition-colors ${
                activeFilter === 'pres' 
                ? 'bg-[#FDF3F0] text-[#9E573F] border border-[#C07050]' 
                : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-50'
              }`}
            >
              Presentations (1)
            </button>
            <button 
              onClick={() => setActiveFilter('social')}
              className={`px-5 py-2 rounded-full text-[13px] font-bold transition-colors ${
                activeFilter === 'social' 
                ? 'bg-[#FDF3F0] text-[#9E573F] border border-[#C07050]' 
                : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-50'
              }`}
            >
              Social Media (1)
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button className="h-9 w-9 rounded-lg bg-white border border-stone-200 flex items-center justify-center text-stone-600 hover:bg-stone-50 transition-colors shadow-sm">
              <Search className="h-4 w-4" />
            </button>
            <button className="flex items-center gap-2 h-9 px-4 rounded-lg bg-white border border-stone-200 text-[12px] font-bold text-stone-700 hover:bg-stone-50 transition-colors shadow-sm">
              <RefreshCw className="h-3.5 w-3.5" /> Regenerate all
            </button>
          </div>
        </div>

        {/* OUTPUTS GRID */}
        <div className="grid grid-cols-3 gap-6 mb-12">
          
          {/* Card 1: Executive Summary */}
          {selectedOutputs.includes('executive_brief') && (
            <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-5 flex flex-col">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <FileText className="h-5 w-5 text-[#A35E47]" strokeWidth={1.5} />
                  <h3 className="text-[15px] font-black text-stone-900 leading-tight">Executive Summary</h3>
                </div>
                <div className="flex items-center gap-1 bg-[#F0FDF4] border border-green-200 px-2 py-0.5 rounded-full">
                  <CheckCircle2 className="h-3 w-3 text-green-600" />
                  <span className="text-[10px] font-bold text-green-700">Ready</span>
                </div>
              </div>
              <p className="text-[12px] text-stone-500 leading-relaxed mb-6 h-10">
                A concise executive summary with key insights and recommendations.
              </p>
            
            {/* Visual Mockup */}
            <div className="w-full aspect-[4/3] bg-[#F5F4F1] border border-stone-200 rounded-lg mb-5 flex items-center justify-center p-6 relative overflow-hidden">
              <div className="w-full h-full bg-white shadow-md flex flex-row relative overflow-hidden">
                <div className="w-1/2 p-5 flex flex-col">
                  <div className="flex items-center gap-1 mb-6">
                    <span className="text-[7px] font-black text-stone-900">REVAMP</span>
                    <span className="text-[7px] font-black text-[#C07050]">AI</span>
                  </div>
                  <p className="text-[8px] font-bold text-stone-500 mb-1">Q3 2024</p>
                  <h4 className="text-[16px] font-black text-stone-900 leading-tight mb-8">Executive<br/>Summary</h4>
                  <div className="w-full h-[2px] bg-stone-200 mb-1.5 rounded"></div>
                  <div className="w-full h-[2px] bg-stone-200 mb-1.5 rounded"></div>
                  <div className="w-5/6 h-[2px] bg-stone-200 mb-1.5 rounded"></div>
                  <div className="w-3/4 h-[2px] bg-stone-200 rounded"></div>
                </div>
                <div className="w-1/2 h-full bg-cover bg-center" style={{ backgroundImage: `url('/architecture.jpg')` }} />
              </div>
            </div>

            <p className="text-[11px] text-stone-400 font-medium flex items-center gap-1.5 mb-5">
              <FileText className="h-3.5 w-3.5" /> PDF <span className="mx-1">•</span> 4 pages <span className="mx-1">•</span> 1.2 MB
            </p>
            
            <div className="flex items-center gap-2 mt-auto">
              <button 
                onClick={() => onNavigate('/artifacts/exec-summary')}
                className="flex-1 flex items-center justify-center gap-2 bg-[#9E573F] hover:bg-[#8B4A2F] text-white font-semibold text-[13px] py-2.5 rounded-lg transition-colors shadow-sm"
              >
                <Eye className="h-4 w-4" /> View
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 bg-white border border-stone-300 hover:bg-stone-50 text-stone-700 font-semibold text-[13px] py-2.5 rounded-lg transition-colors shadow-sm">
                <Download className="h-4 w-4" /> Download
              </button>
              <button className="flex items-center justify-center w-10 h-[38px] bg-white border border-stone-300 hover:bg-stone-50 text-stone-600 rounded-lg transition-colors shadow-sm shrink-0">
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

          {/* Card 2: Presentation */}
          {selectedOutputs.includes('presentation') && (
            <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-5 flex flex-col">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <Presentation className="h-5 w-5 text-[#A35E47]" strokeWidth={1.5} />
                  <h3 className="text-[15px] font-black text-stone-900 leading-tight">Presentation</h3>
                </div>
                <div className="flex items-center gap-1 bg-[#F0FDF4] border border-green-200 px-2 py-0.5 rounded-full">
                  <CheckCircle2 className="h-3 w-3 text-green-600" />
                  <span className="text-[10px] font-bold text-green-700">Ready</span>
                </div>
              </div>
              <p className="text-[12px] text-stone-500 leading-relaxed mb-6 h-10">
                A clean, professional presentation with key insights, visuals and takeaways.
              </p>
            
            {/* Visual Mockup */}
            <div className="w-full aspect-[4/3] bg-[#F5F4F1] border border-stone-200 rounded-lg mb-5 flex flex-col items-center justify-center p-4 relative overflow-hidden">
              {/* Background faded slide */}
              <div className="absolute top-6 right-4 left-16 bottom-[80px] bg-white border border-stone-200 shadow-sm rounded-lg opacity-40 translate-x-4 scale-95" />
              {/* Main Slide */}
              <div className="w-full h-[140px] bg-white border border-stone-200 shadow-md rounded-lg mb-3 flex flex-col p-4 relative z-10">
                <div className="flex items-center gap-1 mb-2">
                  <span className="text-[6px] font-black text-stone-900">REVAMP</span>
                  <span className="text-[6px] font-black text-[#C07050]">AI</span>
                </div>
                <h4 className="text-[14px] font-black text-stone-900 leading-tight mb-auto w-2/3">Q3 Product<br/>Strategy Overview</h4>
                {/* Bar chart graphic */}
                <div className="flex items-end gap-1.5 h-[40px] w-[50%] self-end">
                  <div className="w-full bg-[#E5DFD6] h-[30%] rounded-t-sm"></div>
                  <div className="w-full bg-[#D4ACA0] h-[50%] rounded-t-sm"></div>
                  <div className="w-full bg-[#C07050] h-[75%] rounded-t-sm"></div>
                  <div className="w-full bg-[#8B4A2F] h-[100%] rounded-t-sm"></div>
                </div>
                <div className="absolute bottom-3 left-4 flex gap-[2px]">
                  <div className="w-4 h-[2px] bg-stone-900"></div>
                  <div className="w-2 h-[2px] bg-[#C07050]"></div>
                </div>
              </div>
              {/* Thumbnail row */}
              <div className="flex gap-2 w-full justify-between z-10">
                <div className="h-9 flex-1 bg-white border-2 border-[#C07050] rounded flex relative overflow-hidden">
                   <div className="absolute top-0.5 left-1 text-[5px] text-stone-400 font-bold">01</div>
                   <div className="absolute bottom-0 right-0 left-4 h-1/2 bg-cover bg-center" style={{ backgroundImage: `url('/architecture.jpg')` }} />
                </div>
                <div className="h-9 flex-1 bg-white border border-stone-200 rounded flex relative overflow-hidden">
                   <div className="absolute top-0.5 left-1 text-[5px] text-stone-400 font-bold">02</div>
                   <div className="flex items-end gap-[1px] absolute bottom-1 right-1 h-3 w-4">
                     <div className="w-full h-[40%] bg-stone-200"></div>
                     <div className="w-full h-[70%] bg-stone-300"></div>
                     <div className="w-full h-[100%] bg-stone-400"></div>
                   </div>
                </div>
                <div className="h-9 flex-1 bg-white border border-stone-200 rounded flex relative overflow-hidden">
                   <div className="absolute top-0.5 left-1 text-[5px] text-stone-400 font-bold">03</div>
                   <div className="flex items-end gap-[1px] absolute bottom-1 right-1 h-3 w-4">
                     <div className="w-full h-[60%] bg-[#E5DFD6]"></div>
                     <div className="w-full h-[80%] bg-[#C07050]"></div>
                     <div className="w-full h-[40%] bg-[#8B4A2F]"></div>
                   </div>
                </div>
                <div className="h-9 flex-1 bg-white border border-stone-200 rounded flex relative overflow-hidden">
                   <div className="absolute top-0.5 left-1 text-[5px] text-stone-400 font-bold">04</div>
                   <div className="absolute bottom-0 right-0 left-0 h-1/2 bg-cover bg-center" style={{ backgroundImage: `url('/architecture.jpg')` }} />
                </div>
              </div>
            </div>

            <p className="text-[11px] text-stone-400 font-medium flex items-center gap-1.5 mb-5">
              <Presentation className="h-3.5 w-3.5" /> PPTX <span className="mx-1">•</span> 10 slides <span className="mx-1">•</span> 8.4 MB
            </p>
            
            <div className="flex items-center gap-2 mt-auto">
              <button className="flex-1 flex items-center justify-center gap-2 bg-[#9E573F] hover:bg-[#8B4A2F] text-white font-semibold text-[13px] py-2.5 rounded-lg transition-colors shadow-sm">
                <Eye className="h-4 w-4" /> View
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 bg-white border border-stone-300 hover:bg-stone-50 text-stone-700 font-semibold text-[13px] py-2.5 rounded-lg transition-colors shadow-sm">
                <Download className="h-4 w-4" /> Download
              </button>
              <button className="flex items-center justify-center w-10 h-[38px] bg-white border border-stone-300 hover:bg-stone-50 text-stone-600 rounded-lg transition-colors shadow-sm shrink-0">
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>
            </div>
          )}

          {/* Card 3: LinkedIn Post */}
          {selectedOutputs.includes('social') && (
            <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-5 flex flex-col">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2.5">
                <div className="h-5 w-5 bg-[#0A66C2] rounded-[4px] flex items-center justify-center">
                  <span className="text-[12px] font-black text-white leading-none">in</span>
                </div>
                <h3 className="text-[15px] font-black text-stone-900 leading-tight">LinkedIn Post</h3>
              </div>
              <div className="flex items-center gap-1 bg-[#F0FDF4] border border-green-200 px-2 py-0.5 rounded-full">
                <CheckCircle2 className="h-3 w-3 text-green-600" />
                <span className="text-[10px] font-bold text-green-700">Ready</span>
              </div>
            </div>
            <p className="text-[12px] text-stone-500 leading-relaxed mb-6 h-10">
              A short, engaging post tailored for professional audiences on LinkedIn.
            </p>
            
            {/* Visual Mockup */}
            <div className="w-full aspect-[4/3] bg-[#F5F4F1] border border-stone-200 rounded-lg mb-5 flex items-center justify-center p-5 relative overflow-hidden">
              <div className="w-full h-full bg-white shadow-md border border-stone-200 rounded-[6px] flex flex-col relative overflow-hidden">
                <div className="p-3">
                  {/* LinkedIn Header */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-7 w-7 bg-[#0A66C2] rounded-[4px] flex items-center justify-center shrink-0">
                      <span className="text-[14px] font-black text-white">in</span>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-stone-900 leading-tight">REVAMP AI</p>
                      <p className="text-[8px] text-stone-500 leading-tight flex items-center gap-0.5">1d • <Globe2 className="h-2 w-2" /></p>
                    </div>
                  </div>
                  {/* Post Content */}
                  <p className="text-[10px] font-bold text-stone-900 leading-tight mb-2">
                    5 key trends shaping the future of product strategy in 2024.
                  </p>
                  <p className="text-[9px] text-stone-600 leading-relaxed mb-2">
                    From market shifts to emerging opportunities, here are the insights every leader should know.
                  </p>
                  <p className="text-[9px] font-medium text-[#0A66C2] leading-tight mb-2">
                    #ProductStrategy #Leadership #Innovation #BusinessGrowth
                  </p>
                </div>
                {/* Image Embed */}
                <div className="flex-1 bg-cover bg-center" style={{ backgroundImage: `url('/architecture.jpg')` }} />
              </div>
            </div>

            <p className="text-[11px] text-stone-400 font-medium flex items-center gap-1.5 mb-5">
              <div className="h-3.5 w-3.5 bg-[#0A66C2] rounded-[2px] flex items-center justify-center">
                <span className="text-[8px] font-black text-white leading-none">in</span>
              </div>
              Social Media <span className="mx-1">•</span> ~1,100 characters
            </p>
            
            <div className="flex items-center gap-2 mt-auto">
              <button className="flex-1 flex items-center justify-center gap-2 bg-[#9E573F] hover:bg-[#8B4A2F] text-white font-semibold text-[13px] py-2.5 rounded-lg transition-colors shadow-sm">
                <Copy className="h-4 w-4" /> Copy
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 bg-white border border-stone-300 hover:bg-stone-50 text-stone-700 font-semibold text-[13px] py-2.5 rounded-lg transition-colors shadow-sm">
                <Download className="h-4 w-4" /> Download
              </button>
              <button className="flex items-center justify-center w-10 h-[38px] bg-white border border-stone-300 hover:bg-stone-50 text-stone-600 rounded-lg transition-colors shadow-sm shrink-0">
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>
            </div>
          )}

        </div>

        {/* BOTTOM ACTION BAR */}
        <div className="flex items-center justify-between pt-5 border-t border-stone-200">
          <button 
            onClick={() => onNavigate('/transform/new')}
            className="flex items-center gap-2 bg-white border border-stone-300 hover:bg-stone-50 text-stone-800 font-semibold text-[14px] px-6 py-3 rounded-lg transition-all shadow-sm"
          >
            <ArrowLeft className="h-4 w-4" /> Transform another document
          </button>
          
          <button 
            onClick={() => onNavigate('/dashboard')}
            className="flex items-center gap-2 bg-[#9E573F] hover:bg-[#8B4A2F] text-white font-semibold text-[14px] px-6 py-3 rounded-lg transition-all shadow-sm"
          >
            <Folder className="h-4 w-4" /> Save to project
          </button>
        </div>

      </div>
    </div>
  );
}
