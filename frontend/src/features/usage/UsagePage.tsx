"use client";

import React from 'react';
import { 
  ArrowRight, FileText, CheckCircle2, X, File, Database, 
  Image as ImageIcon, MoreHorizontal, FileCheck, Users, 
  Settings, Clock, Presentation
} from 'lucide-react';

interface UsagePageProps {
  onNavigate: (route: string) => void;
}

export function UsagePage({ onNavigate }: UsagePageProps) {
  return (
    <div className="min-h-full bg-[#FDFCFB] font-sans px-8 py-10">
      
      {/* PAGE HEADER */}
      <div className="mb-8">
        <p className="text-[10px] font-bold tracking-[0.2em] text-[#C07050] uppercase mb-2">Usage & Plan</p>
        <h1 className="text-[44px] font-black text-stone-950 tracking-tight leading-none mb-3">Usage & Plan</h1>
        <p className="text-[15px] text-stone-500 font-medium">Keep track of your transformations and workspace capacity.</p>
      </div>

      {/* TOP SECTION: Plan Banner & Features */}
      <div className="flex gap-6 mb-6">
        
        {/* Banner */}
        <div className="flex-1 bg-[#F5EBE6] rounded-xl relative overflow-hidden border border-[#EBE3DE]">
          <div className="absolute right-0 top-0 bottom-0 w-2/3 bg-cover bg-left z-0 opacity-90 mix-blend-multiply" style={{ backgroundImage: `url('/architecture.jpg')` }}></div>
          <div className="absolute right-0 top-0 bottom-0 w-2/3 bg-gradient-to-r from-[#F5EBE6] via-[#F5EBE6]/80 to-transparent z-10"></div>
          
          <div className="relative z-20 p-8 flex flex-col justify-center h-full max-w-[500px]">
            <div className="flex items-center gap-4 mb-4">
              <h2 className="text-[32px] font-serif font-bold text-stone-900 leading-none">Personal Workspace</h2>
              <div className="bg-[#EBDCD5] text-[#8B4A2F] text-[11px] font-bold px-3 py-1 rounded-md border border-[#D4ACA0]/30">Free plan</div>
            </div>
            <p className="text-[14px] text-stone-700 font-medium mb-8 leading-relaxed pr-10">
              You're currently on the Free plan. Upgrade to unlock higher limits and advanced features.
            </p>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 bg-[#9E573F] hover:bg-[#8B4A2F] text-white font-semibold text-[13px] px-6 py-2.5 rounded-lg shadow-sm transition-colors">
                Upgrade plan <ArrowRight className="h-4 w-4" />
              </button>
              <button className="bg-white border border-[#C07050] text-[#A35E47] hover:bg-[#FDF3F0] font-semibold text-[13px] px-6 py-2.5 rounded-lg shadow-sm transition-colors">
                Manage plan
              </button>
            </div>
          </div>
        </div>

        {/* Features List */}
        <div className="w-[340px] shrink-0 bg-[#FDFCFB] border border-stone-200 rounded-xl p-6 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[15px] font-black text-stone-900">Plan features</h3>
            <button className="text-[11px] font-bold text-[#A35E47] hover:text-[#8B4A2F] flex items-center gap-1">
              Compare plans <ArrowRight className="h-3 w-3" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-4 w-4 text-[#A35E47]" strokeWidth={2.5} />
                <span className="text-[12px] font-medium text-stone-700">Document transformations</span>
              </div>
              <span className="text-[11px] text-stone-400 font-medium">Limited</span>
            </div>
            
            <div className="h-px w-full bg-stone-100"></div>
            
            <div className="flex items-center justify-between opacity-50">
              <div className="flex items-center gap-3">
                <X className="h-4 w-4 text-[#A35E47]" strokeWidth={2.5} />
                <span className="text-[12px] font-medium text-stone-700">Advanced templates</span>
              </div>
              <span className="text-[11px] text-stone-400 font-medium">Not included</span>
            </div>

            <div className="h-px w-full bg-stone-100"></div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-4 w-4 text-[#A35E47]" strokeWidth={2.5} />
                <span className="text-[12px] font-medium text-stone-700">Export to multiple formats</span>
              </div>
              <span className="text-[11px] text-stone-400 font-medium">Included</span>
            </div>

            <div className="h-px w-full bg-stone-100"></div>

            <div className="flex items-center justify-between opacity-50">
              <div className="flex items-center gap-3">
                <X className="h-4 w-4 text-[#A35E47]" strokeWidth={2.5} />
                <span className="text-[12px] font-medium text-stone-700">Team collaboration</span>
              </div>
              <span className="text-[11px] text-stone-400 font-medium">Not included</span>
            </div>

            <div className="h-px w-full bg-stone-100"></div>

            <div className="flex items-center justify-between opacity-50">
              <div className="flex items-center gap-3">
                <X className="h-4 w-4 text-[#A35E47]" strokeWidth={2.5} />
                <span className="text-[12px] font-medium text-stone-700">Priority processing</span>
              </div>
              <span className="text-[11px] text-stone-400 font-medium">Not included</span>
            </div>
          </div>
        </div>
      </div>

      {/* MIDDLE SECTION: Usage & Charts */}
      <div className="flex gap-6 mb-6">
        
        {/* Usage Summary */}
        <div className="flex-1 bg-white border border-stone-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-[15px] font-black text-stone-900">Usage summary</h3>
            <button className="flex items-center gap-2 bg-stone-50 border border-stone-200 text-stone-600 text-[11px] font-bold px-3 py-1.5 rounded-md hover:bg-stone-100">
              This month <ChevronDownIcon />
            </button>
          </div>

          <div className="space-y-6">
            {/* Transformations */}
            <div className="flex items-center justify-between p-4 bg-[#FDFCFB] border border-stone-100 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-[#FDF3F0] flex items-center justify-center text-[#C07050]">
                  <File className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[11px] text-stone-500 font-medium mb-0.5">Transformations used</p>
                  <p className="text-[18px] font-black text-stone-900 leading-none">28 / 50</p>
                </div>
              </div>
              <div className="flex items-center gap-4 w-[280px]">
                <div className="flex-1 h-2 bg-stone-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#A35E47] rounded-full w-[56%]"></div>
                </div>
                <span className="text-[12px] font-bold text-stone-500 w-8 text-right">56%</span>
              </div>
            </div>

            {/* Storage */}
            <div className="flex items-center justify-between p-4 bg-[#FDFCFB] border border-stone-100 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-[#FDF3F0] flex items-center justify-center text-[#C07050]">
                  <Database className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[11px] text-stone-500 font-medium mb-0.5">Storage used</p>
                  <p className="text-[18px] font-black text-stone-900 leading-none">6.8 GB / 20 GB</p>
                </div>
              </div>
              <div className="flex items-center gap-4 w-[280px]">
                <div className="flex-1 h-2 bg-stone-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#A35E47] rounded-full w-[34%]"></div>
                </div>
                <span className="text-[12px] font-bold text-stone-500 w-8 text-right">34%</span>
              </div>
            </div>

            {/* Outputs */}
            <div className="flex items-center justify-between p-4 bg-[#FDFCFB] border border-stone-100 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-[#FDF3F0] flex items-center justify-center text-[#C07050]">
                  <ImageIcon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[11px] text-stone-500 font-medium mb-0.5">Outputs generated</p>
                  <p className="text-[18px] font-black text-stone-900 leading-none">82 / 200</p>
                </div>
              </div>
              <div className="flex items-center gap-4 w-[280px]">
                <div className="flex-1 h-2 bg-stone-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#A35E47] rounded-full w-[41%]"></div>
                </div>
                <span className="text-[12px] font-bold text-stone-500 w-8 text-right">41%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Monthly Usage Chart */}
        <div className="w-[480px] shrink-0 bg-white border border-stone-200 rounded-xl p-6 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-[15px] font-black text-stone-900">Monthly usage</h3>
            <button className="flex items-center gap-2 bg-stone-50 border border-stone-200 text-stone-600 text-[11px] font-bold px-3 py-1.5 rounded-md hover:bg-stone-100">
              Last 6 months <ChevronDownIcon />
            </button>
          </div>

          <div className="flex-1 flex flex-col justify-end relative pb-8">
            {/* Y-axis lines */}
            <div className="absolute left-6 right-0 bottom-8 top-2 flex flex-col justify-between z-0">
              <div className="flex items-center gap-2"><span className="text-[9px] text-stone-400 w-4 text-right">100</span><div className="flex-1 h-px bg-stone-100"></div></div>
              <div className="flex items-center gap-2"><span className="text-[9px] text-stone-400 w-4 text-right">80</span><div className="flex-1 h-px bg-stone-100"></div></div>
              <div className="flex items-center gap-2"><span className="text-[9px] text-stone-400 w-4 text-right">60</span><div className="flex-1 h-px bg-stone-100"></div></div>
              <div className="flex items-center gap-2"><span className="text-[9px] text-stone-400 w-4 text-right">40</span><div className="flex-1 h-px bg-stone-100"></div></div>
              <div className="flex items-center gap-2"><span className="text-[9px] text-stone-400 w-4 text-right">20</span><div className="flex-1 h-px bg-stone-100"></div></div>
              <div className="flex items-center gap-2"><span className="text-[9px] text-stone-400 w-4 text-right">0</span><div className="flex-1 h-px bg-stone-200"></div></div>
            </div>

            {/* Bars */}
            <div className="flex justify-around items-end z-10 pl-12 pr-4 h-[160px]">
              <div className="flex flex-col w-8 h-[60%]">
                <div className="bg-[#EBDCD5] h-[25%] rounded-t-sm"></div>
                <div className="bg-[#C07050] h-[35%]"></div>
                <div className="bg-[#8B4A2F] h-[40%]"></div>
              </div>
              <div className="flex flex-col w-8 h-[85%]">
                <div className="bg-[#EBDCD5] h-[15%] rounded-t-sm"></div>
                <div className="bg-[#C07050] h-[45%]"></div>
                <div className="bg-[#8B4A2F] h-[40%]"></div>
              </div>
              <div className="flex flex-col w-8 h-[75%]">
                <div className="bg-[#EBDCD5] h-[20%] rounded-t-sm"></div>
                <div className="bg-[#C07050] h-[35%]"></div>
                <div className="bg-[#8B4A2F] h-[45%]"></div>
              </div>
              <div className="flex flex-col w-8 h-[65%]">
                <div className="bg-[#EBDCD5] h-[25%] rounded-t-sm"></div>
                <div className="bg-[#C07050] h-[30%]"></div>
                <div className="bg-[#8B4A2F] h-[45%]"></div>
              </div>
              <div className="flex flex-col w-8 h-[80%]">
                <div className="bg-[#EBDCD5] h-[15%] rounded-t-sm"></div>
                <div className="bg-[#C07050] h-[35%]"></div>
                <div className="bg-[#8B4A2F] h-[50%]"></div>
              </div>
              <div className="flex flex-col w-8 h-[70%]">
                <div className="bg-[#EBDCD5] h-[20%] rounded-t-sm"></div>
                <div className="bg-[#C07050] h-[30%]"></div>
                <div className="bg-[#8B4A2F] h-[50%]"></div>
              </div>
            </div>
            
            {/* X-axis labels */}
            <div className="absolute left-12 right-4 bottom-2 flex justify-around items-center">
              <span className="text-[9px] font-bold text-stone-500 w-8 text-center">Apr</span>
              <span className="text-[9px] font-bold text-stone-500 w-8 text-center">May</span>
              <span className="text-[9px] font-bold text-stone-500 w-8 text-center">Jun</span>
              <span className="text-[9px] font-bold text-stone-500 w-8 text-center">Jul</span>
              <span className="text-[9px] font-bold text-stone-500 w-8 text-center">Aug</span>
              <span className="text-[9px] font-bold text-stone-500 w-8 text-center">Sep</span>
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-6 pl-10 mt-2">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-[#8B4A2F]"></div>
              <span className="text-[10px] text-stone-500 font-medium">Documents</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-[#C07050]"></div>
              <span className="text-[10px] text-stone-500 font-medium">Presentations</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-[#EBDCD5]"></div>
              <span className="text-[10px] text-stone-500 font-medium">Social Media</span>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION: Recent Usage */}
      <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-[15px] font-black text-stone-900">Recent usage</h3>
          <button 
            onClick={() => onNavigate('/history')}
            className="text-[11px] font-bold text-[#A35E47] hover:text-[#8B4A2F] flex items-center gap-1"
          >
            View all <ArrowRight className="h-3 w-3" />
          </button>
        </div>

        <div className="flex flex-col w-full text-[12px]">
          {/* Table Header */}
          <div className="flex items-center border-b border-stone-200 pb-2 mb-2 px-2 text-[10px] font-bold text-stone-400">
            <div className="w-[30%]">Name</div>
            <div className="w-[20%]">Project</div>
            <div className="w-[15%]">Output type</div>
            <div className="w-[15%]">Size</div>
            <div className="w-[15%]">Date</div>
            <div className="w-[5%]"></div>
          </div>

          {/* Row 1 */}
          <div className="flex items-center px-2 py-3 hover:bg-stone-50 rounded-lg transition-colors border-b border-stone-100 last:border-0">
            <div className="w-[30%] flex items-center gap-3">
              <div className="h-7 w-7 rounded bg-white border border-stone-200 shadow-sm flex overflow-hidden shrink-0">
                 <div className="w-1/3 flex items-center justify-center bg-stone-100 p-0.5"><div className="w-full h-1 bg-stone-300 rounded-sm"></div></div>
                 <div className="w-2/3 h-full bg-cover bg-center" style={{ backgroundImage: `url('/architecture.jpg')` }} />
              </div>
              <span className="font-bold text-stone-900">Q3 Product Strategy Report</span>
            </div>
            <div className="w-[20%] text-stone-500 font-medium">Product Strategy</div>
            <div className="w-[15%] flex items-center gap-2 text-stone-600 font-medium">
              <FileText className="h-3.5 w-3.5" /> PDF
            </div>
            <div className="w-[15%] text-stone-500 font-medium">4.2 MB</div>
            <div className="w-[15%] text-stone-500 font-medium">Sep 27, 2026 10:24 AM</div>
            <div className="w-[5%] flex justify-end"><button className="text-stone-400 hover:text-stone-700"><MoreHorizontal className="h-4 w-4" /></button></div>
          </div>

          {/* Row 2 */}
          <div className="flex items-center px-2 py-3 hover:bg-stone-50 rounded-lg transition-colors border-b border-stone-100 last:border-0">
            <div className="w-[30%] flex items-center gap-3">
              <div className="h-7 w-7 rounded bg-white border border-stone-200 shadow-sm flex overflow-hidden shrink-0">
                 <div className="w-full flex items-center justify-center p-1"><div className="w-full h-1 bg-stone-300 rounded-sm"></div></div>
                 <div className="w-1/2 h-full bg-cover bg-center absolute right-0" style={{ backgroundImage: `url('/architecture.jpg')` }} />
              </div>
              <span className="font-bold text-stone-900">Executive Summary</span>
            </div>
            <div className="w-[20%] text-stone-500 font-medium">Product Strategy</div>
            <div className="w-[15%] flex items-center gap-2 text-stone-600 font-medium">
              <FileText className="h-3.5 w-3.5" /> DOCX
            </div>
            <div className="w-[15%] text-stone-500 font-medium">1.2 MB</div>
            <div className="w-[15%] text-stone-500 font-medium">Sep 27, 2026 09:18 AM</div>
            <div className="w-[5%] flex justify-end"><button className="text-stone-400 hover:text-stone-700"><MoreHorizontal className="h-4 w-4" /></button></div>
          </div>

          {/* Row 3 */}
          <div className="flex items-center px-2 py-3 hover:bg-stone-50 rounded-lg transition-colors border-b border-stone-100 last:border-0">
            <div className="w-[30%] flex items-center gap-3">
              <div className="h-7 w-7 rounded bg-white border border-stone-200 shadow-sm flex overflow-hidden shrink-0 relative flex-col">
                 <div className="flex items-center gap-0.5 p-1">
                   <div className="h-2 w-2 bg-[#0A66C2] rounded-[1px] flex items-center justify-center text-[4px] font-bold text-white">in</div>
                   <div className="w-2 h-0.5 bg-stone-200"></div>
                 </div>
                 <div className="w-full flex-1 bg-cover bg-center" style={{ backgroundImage: `url('/architecture.jpg')` }} />
              </div>
              <span className="font-bold text-stone-900">LinkedIn Post</span>
            </div>
            <div className="w-[20%] text-stone-500 font-medium">Product Launch</div>
            <div className="w-[15%] flex items-center gap-2 text-stone-600 font-medium">
              <div className="h-3.5 w-3.5 bg-stone-200 rounded flex items-center justify-center text-[7px] font-bold">in</div> Social Media
            </div>
            <div className="w-[15%] text-stone-500 font-medium">~1,100 characters</div>
            <div className="w-[15%] text-stone-500 font-medium">Sep 26, 2026 06:42 PM</div>
            <div className="w-[5%] flex justify-end"><button className="text-stone-400 hover:text-stone-700"><MoreHorizontal className="h-4 w-4" /></button></div>
          </div>

          {/* Row 4 */}
          <div className="flex items-center px-2 py-3 hover:bg-stone-50 rounded-lg transition-colors border-b border-stone-100 last:border-0">
            <div className="w-[30%] flex items-center gap-3">
              <div className="h-7 w-7 rounded bg-white border border-stone-200 shadow-sm flex overflow-hidden shrink-0">
                 <div className="w-1/3 flex items-center justify-center bg-[#FDF3F0] p-0.5"><div className="text-[3px] font-bold text-[#C07050]">2024</div></div>
                 <div className="w-2/3 h-full bg-cover bg-center filter grayscale opacity-50" style={{ backgroundImage: `url('/architecture.jpg')` }} />
              </div>
              <span className="font-bold text-stone-900">Market Analysis Presentation</span>
            </div>
            <div className="w-[20%] text-stone-500 font-medium">Market Analysis</div>
            <div className="w-[15%] flex items-center gap-2 text-stone-600 font-medium">
              <Presentation className="h-3.5 w-3.5" /> PPTX
            </div>
            <div className="w-[15%] text-stone-500 font-medium">8.4 MB</div>
            <div className="w-[15%] text-stone-500 font-medium">Sep 26, 2026 04:15 PM</div>
            <div className="w-[5%] flex justify-end"><button className="text-stone-400 hover:text-stone-700"><MoreHorizontal className="h-4 w-4" /></button></div>
          </div>

          {/* Row 5 */}
          <div className="flex items-center px-2 py-3 hover:bg-stone-50 rounded-lg transition-colors border-b border-stone-100 last:border-0">
            <div className="w-[30%] flex items-center gap-3">
              <div className="h-7 w-7 rounded bg-white border border-stone-200 shadow-sm flex overflow-hidden shrink-0">
                 <div className="w-1/3 flex items-center justify-center bg-stone-100 p-0.5"><div className="w-full h-1 bg-stone-300 rounded-sm"></div></div>
                 <div className="w-2/3 h-full bg-cover bg-center" style={{ backgroundImage: `url('/architecture.jpg')` }} />
              </div>
              <span className="font-bold text-stone-900">Customer Research Report</span>
            </div>
            <div className="w-[20%] text-stone-500 font-medium">Research</div>
            <div className="w-[15%] flex items-center gap-2 text-stone-600 font-medium">
              <FileText className="h-3.5 w-3.5" /> PDF
            </div>
            <div className="w-[15%] text-stone-500 font-medium">3.7 MB</div>
            <div className="w-[15%] text-stone-500 font-medium">Sep 25, 2026 05:27 PM</div>
            <div className="w-[5%] flex justify-end"><button className="text-stone-400 hover:text-stone-700"><MoreHorizontal className="h-4 w-4" /></button></div>
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
