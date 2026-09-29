"use client";

import React, { useState, useEffect } from 'react';
import { 
  Check, FileText, Presentation, Loader2, Clock, 
  Info, ArrowRight, Folder
} from 'lucide-react';
import { transformationsApi } from '@/lib/api/transformations';

interface JobProcessingPageProps {
  jobId?: string;
  onNavigate: (route: string) => void;
}

export function JobProcessingPage({ jobId, onNavigate }: JobProcessingPageProps) {
  // Simulate progress
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    if (!jobId) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => onNavigate('/transform/result'), 500);
            return 100;
          }
          return prev + 1;
        });
      }, 100);
      return () => clearInterval(interval);
    } else {
      setTimeout(() => setProgress(10), 0);
      const poll = async () => {
        try {
          const data = await transformationsApi.get(jobId);
          if (data.status === 'completed') {
            setProgress(100);
            clearInterval(interval);
            setTimeout(() => onNavigate(`/transform/${jobId}`), 500);
          } else if (data.status === 'failed') {
            clearInterval(interval);
          } else {
            setProgress(prev => prev >= 95 ? 95 : prev + 5);
          }
        } catch(e) {
          console.error("Polling error:", e);
        }
      };
      
      const interval = setInterval(poll, 1500);
      return () => clearInterval(interval);
    }
  }, [jobId, onNavigate]);

  return (
    <div className="min-h-full bg-[#F8F7F5] font-sans px-10 py-12">
      <div className="max-w-[1200px] mx-auto">
        
        {/* HEADER & TOP RIGHT CARD */}
        <div className="flex justify-between items-start mb-12">
          <div>
            <p className="text-[10px] font-bold tracking-[0.2em] text-[#C07050] uppercase mb-2">Generating Content</p>
            <h1 className="text-[44px] font-black text-stone-950 tracking-tight leading-none mb-3">Creating your content</h1>
            <p className="text-[15px] text-stone-500 font-medium">REVAMP AI is transforming your source into tailored, audience-ready content.</p>
          </div>

          {/* Source Document Card */}
          <div className="bg-white border border-stone-200 shadow-sm rounded-xl p-4 flex gap-4 w-[420px]">
            {/* Mini Document */}
            <div className="w-[70px] h-[90px] bg-white border border-stone-200 shadow-sm rounded flex flex-col shrink-0 overflow-hidden relative">
              <div className="p-1.5 flex-1">
                <div className="w-3/4 h-[1.5px] bg-stone-300 mb-0.5 rounded"></div>
                <div className="w-full h-[1.5px] bg-stone-200 mb-0.5 rounded"></div>
                <div className="w-5/6 h-[1.5px] bg-stone-200 rounded"></div>
              </div>
              <div className="h-[40px] bg-red-900 flex items-center justify-center">
                <span className="text-[6px] font-black tracking-widest text-white">CRITICAL</span>
              </div>
            </div>

            {/* Details */}
            <div className="flex-1">
              <p className="text-[10px] font-bold text-stone-900 mb-0.5">Source document</p>
              <h3 className="text-[15px] font-black text-stone-900 leading-tight mb-1">Active Directory Zero-Day</h3>
              <p className="text-[10px] text-stone-500 font-medium flex items-center gap-1.5 mb-2">
                <FileText className="h-3 w-3" /> TXT <span className="mx-0.5">•</span> Source Intel <span className="mx-0.5">•</span> 2.4 KB
              </p>
              <p className="text-[9px] text-stone-400 leading-tight">
                Raw incident report detailing anomalous lateral movement, WAF bypass via CVE-2026-9912...
              </p>
            </div>
          </div>
        </div>

        {/* PROGRESS BAR SECTION */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-4 relative">
            {/* Connecting lines */}
            <div className="absolute top-4 left-[20px] right-[20px] h-px bg-stone-200 -z-10"></div>
            <div className="absolute top-4 left-[20px] w-[55%] h-px bg-[#A35E47] -z-10 transition-all duration-500" style={{ width: `${Math.max(0, progress - 10)}%` }}></div>
            
            {/* Steps */}
            <div className="flex flex-col gap-2 bg-[#F8F7F5] px-2 w-[22%]">
              <div className="h-8 w-8 rounded-full bg-[#9E573F] text-white flex items-center justify-center shrink-0 shadow-sm">
                <Check className="h-4 w-4" strokeWidth={3} />
              </div>
              <div>
                <p className="text-[13px] font-bold text-stone-900 leading-tight">01 Extract key facts</p>
                <p className="text-[11px] text-stone-500 leading-tight mt-1">Identify the most important information from your source.</p>
              </div>
            </div>

            <div className="flex flex-col gap-2 bg-[#F8F7F5] px-2 w-[22%]">
              <div className="h-8 w-8 rounded-full bg-[#9E573F] text-white flex items-center justify-center shrink-0 shadow-sm">
                <Check className="h-4 w-4" strokeWidth={3} />
              </div>
              <div>
                <p className="text-[13px] font-bold text-stone-900 leading-tight">02 Adapt messaging</p>
                <p className="text-[11px] text-stone-500 leading-tight mt-1">Tailor the content to your audience, objective and tone.</p>
              </div>
            </div>

            <div className="flex flex-col gap-2 bg-[#F8F7F5] px-2 w-[22%]">
              <div className="h-8 w-8 rounded-full bg-[#9E573F] text-white flex items-center justify-center text-[11px] font-bold shrink-0 shadow-md">
                03
              </div>
              <div>
                <p className="text-[13px] font-bold text-stone-900 leading-tight">03 Build formats</p>
                <p className="text-[11px] text-stone-500 leading-tight mt-1">Generating your selected output formats.</p>
              </div>
            </div>

            <div className="flex flex-col gap-2 bg-[#F8F7F5] px-2 w-[22%] opacity-50">
              <div className="h-8 w-8 rounded-full border-2 border-stone-300 bg-[#F8F7F5] text-stone-500 flex items-center justify-center text-[11px] font-bold shrink-0">
                04
              </div>
              <div>
                <p className="text-[13px] font-bold text-stone-900 leading-tight">04 Prepare outputs</p>
                <p className="text-[11px] text-stone-500 leading-tight mt-1">Finalize and organize your content.</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-2">
            <div className="h-4 flex-1 bg-[#EBE7E0] rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#8B4A2F] to-[#C07050] rounded-full transition-all duration-300 ease-out relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
              </div>
            </div>
            <span className="text-[14px] font-black text-stone-900 w-8">{progress}%</span>
          </div>
          <p className="text-[11px] text-stone-500">This may take a few minutes. You can leave this page — we&apos;ll notify you when it&apos;s ready.</p>
        </div>

        {/* BOTTOM SPLIT SECTION */}
        <div className="grid grid-cols-[1fr_320px] gap-10">
          
          {/* Outputs Generation Grid */}
          <div>
            <div className="mb-4">
              <h2 className="text-[19px] font-black text-stone-900 mb-1">Generating outputs</h2>
              <p className="text-[13px] text-stone-500">Your selected formats are being created based on the source and settings.</p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              
              {/* Output 1 - Ready */}
              <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-4 flex flex-col h-[280px]">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-[#A35E47]" strokeWidth={2} />
                    <h3 className="text-[13px] font-bold text-stone-900 leading-tight">Executive Summary</h3>
                  </div>
                  <div className="flex items-center gap-1 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full">
                    <Check className="h-3 w-3 text-green-600" strokeWidth={3} />
                    <span className="text-[9px] font-bold text-green-700">Ready</span>
                  </div>
                </div>
                <p className="text-[10px] text-stone-500 leading-tight mb-4">A concise executive summary with key insights and recommendations.</p>
                
                {/* Visual Thumbnail */}
                <div className="flex-1 bg-[#F5F4F1] border border-stone-200 rounded-lg overflow-hidden flex items-center justify-center p-3 relative">
                  <div className="w-full h-full bg-white shadow-sm border border-stone-200 flex flex-col relative overflow-hidden">
                    <div className="p-3">
                      <p className="text-[5px] font-black text-stone-900 mb-2">NCIIPC ALERT</p>
                      <h4 className="text-[11px] font-black text-stone-900 leading-tight mb-2">Executive<br/>Briefing</h4>
                      <div className="w-full h-px bg-stone-100 mb-1"></div>
                      <div className="w-full h-px bg-stone-100 mb-1"></div>
                      <div className="w-3/4 h-px bg-stone-100"></div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-[40px] bg-red-900 flex items-center justify-center">
                      <span className="text-[6px] font-black tracking-widest text-white">CRITICAL</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <p className="text-[10px] text-stone-400 font-medium flex items-center gap-1.5">
                    <FileText className="h-3 w-3" /> PDF <span className="mx-0.5">•</span> 4 pages
                  </p>
                  <button className="flex items-center gap-1 text-[11px] font-bold text-[#A35E47] border border-[#E5DFD6] px-3 py-1.5 rounded hover:bg-stone-50 transition-colors">
                    View <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>

              {/* Output 2 - Processing */}
              <div className="bg-white rounded-xl border border-[#C07050] ring-1 ring-[#C07050]/20 shadow-md p-4 flex flex-col h-[280px]">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Presentation className="h-4 w-4 text-[#A35E47]" strokeWidth={2} />
                    <h3 className="text-[13px] font-bold text-stone-900 leading-tight">Presentation</h3>
                  </div>
                  <div className="flex items-center gap-1 bg-orange-50 border border-orange-200 px-2 py-0.5 rounded-full">
                    <Loader2 className="h-3 w-3 text-orange-600 animate-spin" />
                    <span className="text-[9px] font-bold text-orange-700">Processing</span>
                  </div>
                </div>
                <p className="text-[10px] text-stone-500 leading-tight mb-4">A clean, professional presentation with key insights, visuals and takeaways.</p>
                
                {/* Visual Thumbnail */}
                <div className="flex-1 bg-[#F5F4F1] border border-stone-200 rounded-lg overflow-hidden flex items-center justify-center relative">
                  {/* Stacked slides */}
                  <div className="absolute right-4 top-4 bottom-4 left-10 bg-white shadow-sm border border-stone-200 rounded opacity-60 translate-x-4 scale-95" />
                  <div className="absolute right-6 top-4 bottom-4 left-8 bg-white shadow-sm border border-stone-200 rounded opacity-80 translate-x-2 scale-95" />
                  <div className="absolute inset-4 bg-white shadow-md border border-stone-200 rounded flex flex-col p-3 z-10">
                    <h4 className="text-[10px] font-black text-stone-900 leading-tight mb-auto w-2/3">AD Zero-Day<br/>Exploit Overview</h4>
                    <div className="flex items-end gap-1 h-[30px] w-[50%] self-end">
                      <div className="w-full bg-[#E5DFD6] h-[30%]"></div>
                      <div className="w-full bg-[#D4ACA0] h-[50%]"></div>
                      <div className="w-full bg-[#C07050] h-[70%]"></div>
                      <div className="w-full bg-[#8B4A2F] h-[100%]"></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <p className="text-[10px] text-stone-400 font-medium flex items-center gap-1.5">
                    <Presentation className="h-3 w-3" /> PPTX <span className="mx-0.5">•</span> ~10-12 slides
                  </p>
                </div>
              </div>

              {/* Output 3 - Pending */}
              <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-4 flex flex-col h-[280px] opacity-80">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 bg-[#0A66C2] rounded-[3px] flex items-center justify-center">
                      <span className="text-[9px] font-black text-white leading-none">in</span>
                    </div>
                    <h3 className="text-[13px] font-bold text-stone-900 leading-tight">LinkedIn Post</h3>
                  </div>
                  <div className="flex items-center gap-1 bg-stone-100 border border-stone-200 px-2 py-0.5 rounded-full">
                    <Clock className="h-3 w-3 text-stone-500" />
                    <span className="text-[9px] font-bold text-stone-600">Pending</span>
                  </div>
                </div>
                <p className="text-[10px] text-stone-500 leading-tight mb-4">A short, engaging post tailored for professional audiences on LinkedIn.</p>
                
                {/* Visual Thumbnail */}
                <div className="flex-1 bg-[#F5F4F1] border border-stone-200 rounded-lg overflow-hidden flex items-center justify-center p-3">
                  <div className="w-full h-full bg-white shadow-sm border border-stone-200 rounded flex flex-col p-2">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-5 w-5 bg-[#0A66C2] rounded-[3px] flex items-center justify-center shrink-0">
                        <span className="text-[10px] font-black text-white">in</span>
                      </div>
                      <div className="flex-1">
                        <div className="h-[2px] w-full bg-stone-200 mb-[2px]"></div>
                        <div className="h-[2px] w-3/4 bg-stone-200 mb-[2px]"></div>
                        <div className="h-[2px] w-1/2 bg-stone-200"></div>
                      </div>
                    </div>
                    <div className="h-full w-full bg-stone-100 rounded flex items-center justify-center overflow-hidden relative">
                      <div className="absolute inset-0 bg-red-900 opacity-70 filter grayscale flex items-center justify-center">
                        <span className="text-[8px] font-black tracking-widest text-white">CVE-2026-9912</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <p className="text-[10px] text-stone-400 font-medium flex items-center gap-1.5">
                    Social Media <span className="mx-0.5">•</span> ~1,100 characters
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Generation Activity Timeline */}
          <div>
            <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-5 h-full">
              <h2 className="text-[15px] font-black text-stone-900 mb-6">Generation activity</h2>
              
              <div className="relative pl-6 space-y-6">
                {/* Vertical Line */}
                <div className="absolute left-[9px] top-2 bottom-6 w-px bg-stone-200 -z-10"></div>
                <div className="absolute left-[9px] top-2 h-[50%] w-px bg-[#C07050] -z-10"></div>

                {/* Event 1 */}
                <div className="relative">
                  <div className="absolute -left-[24px] top-0 h-[18px] w-[18px] rounded-full bg-[#C07050] border-2 border-white flex items-center justify-center shadow-sm">
                    <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[11px] font-bold text-stone-900">Facts extracted</p>
                      <p className="text-[10px] text-stone-500 mt-0.5">Key information identified from your source.</p>
                    </div>
                    <span className="text-[9px] font-medium text-stone-400 shrink-0">10:24 AM</span>
                  </div>
                </div>

                {/* Event 2 */}
                <div className="relative">
                  <div className="absolute -left-[24px] top-0 h-[18px] w-[18px] rounded-full bg-[#C07050] border-2 border-white flex items-center justify-center shadow-sm">
                    <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[11px] font-bold text-stone-900">Messaging adapted</p>
                      <p className="text-[10px] text-stone-500 mt-0.5">Content tailored for your target audience.</p>
                    </div>
                    <span className="text-[9px] font-medium text-stone-400 shrink-0">10:25 AM</span>
                  </div>
                </div>

                {/* Event 3 (Active) */}
                <div className="relative">
                  <div className="absolute -left-[24px] top-0 h-[18px] w-[18px] rounded-full bg-white border-[3px] border-[#C07050] flex items-center justify-center shadow-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#C07050]"></div>
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[11px] font-bold text-stone-900">Building presentation</p>
                      <p className="text-[10px] text-stone-500 mt-0.5">Generating slides and visuals for your presentation.</p>
                    </div>
                    <span className="text-[9px] font-medium text-stone-400 shrink-0">10:26 AM</span>
                  </div>
                </div>

                {/* Event 4 (Pending) */}
                <div className="relative">
                  <div className="absolute -left-[24px] top-0 h-[18px] w-[18px] rounded-full bg-stone-200 border-2 border-white shadow-sm"></div>
                  <div className="flex justify-between items-start opacity-50">
                    <div>
                      <p className="text-[11px] font-bold text-stone-900">Preparing LinkedIn post</p>
                      <p className="text-[10px] text-stone-500 mt-0.5">Waiting to start...</p>
                    </div>
                    <span className="text-[9px] font-medium text-stone-400 shrink-0">—</span>
                  </div>
                </div>

                {/* Event 5 (Pending) */}
                <div className="relative">
                  <div className="absolute -left-[24px] top-0 h-[18px] w-[18px] rounded-full bg-stone-200 border-2 border-white shadow-sm"></div>
                  <div className="flex justify-between items-start opacity-50">
                    <div>
                      <p className="text-[11px] font-bold text-stone-900">Finalizing outputs</p>
                      <p className="text-[10px] text-stone-500 mt-0.5">Organizing and optimizing all generated content.</p>
                    </div>
                    <span className="text-[9px] font-medium text-stone-400 shrink-0">—</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM ACTION BAR */}
        <div className="flex items-center justify-between mt-10 pt-5 border-t border-stone-200">
          <div className="flex items-center gap-2 text-[12px] text-stone-500">
            <Info className="h-4 w-4" />
            You can leave this page — we&apos;ll notify you here and via email when your content is ready.
          </div>
          
          <button 
            onClick={() => onNavigate('/dashboard')} 
            className="flex items-center gap-2 bg-white border border-stone-300 hover:bg-stone-50 text-stone-800 font-semibold text-[13px] px-5 py-2.5 rounded-lg transition-all shadow-sm"
          >
            <Folder className="h-4 w-4" /> View project
          </button>
        </div>

      </div>
    </div>
  );
}
