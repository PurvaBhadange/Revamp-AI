"use client";

import React, { useState } from 'react';
import { 
  FileText, Presentation, Plus, MoreHorizontal, Calendar, ArrowDownUp,
  FolderOpen, ExternalLink, ArrowRight, Clock, Users, Edit3, Download, Sparkles
} from 'lucide-react';

interface HistoryPageProps {
  onNavigate: (route: string) => void;
}

export function HistoryPage({ onNavigate }: HistoryPageProps) {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div className="min-h-full bg-[#FDFCFB] font-sans px-8 py-10">
      
      {/* PAGE HEADER */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="text-[10px] font-bold tracking-[0.2em] text-[#C07050] uppercase mb-2">History</p>
          <h1 className="text-[44px] font-black text-stone-950 tracking-tight leading-none mb-3">History</h1>
          <p className="text-[15px] text-stone-500 font-medium">A record of your transformations, edits, and exports.</p>
        </div>
      </div>

      <div className="flex gap-8">
        
        {/* MAIN COLUMN (HISTORY LIST) */}
        <div className="flex-1">
          
          {/* FILTERS BAR */}
          <div className="flex items-center justify-between border-b border-stone-200 pb-4 mb-6">
            <div className="flex gap-2">
              <button 
                onClick={() => setActiveTab('all')}
                className={`px-4 py-1.5 rounded-full text-[13px] font-bold transition-colors ${
                  activeTab === 'all' ? 'bg-[#FDF3F0] text-[#9E573F] border border-[#C07050]' : 'text-stone-500 hover:bg-stone-100 border border-transparent'
                }`}
              >
                All activity (28)
              </button>
              <button 
                onClick={() => setActiveTab('transform')}
                className={`px-4 py-1.5 rounded-full text-[13px] font-bold transition-colors ${
                  activeTab === 'transform' ? 'bg-[#FDF3F0] text-[#9E573F] border border-[#C07050]' : 'text-stone-500 hover:bg-stone-100 border border-transparent'
                }`}
              >
                Transformations (12)
              </button>
              <button 
                onClick={() => setActiveTab('edits')}
                className={`px-4 py-1.5 rounded-full text-[13px] font-bold transition-colors ${
                  activeTab === 'edits' ? 'bg-[#FDF3F0] text-[#9E573F] border border-[#C07050]' : 'text-stone-500 hover:bg-stone-100 border border-transparent'
                }`}
              >
                Edits (8)
              </button>
              <button 
                onClick={() => setActiveTab('exports')}
                className={`px-4 py-1.5 rounded-full text-[13px] font-bold transition-colors ${
                  activeTab === 'exports' ? 'bg-[#FDF3F0] text-[#9E573F] border border-[#C07050]' : 'text-stone-500 hover:bg-stone-100 border border-transparent'
                }`}
              >
                Exports (6)
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 text-[12px] font-bold text-stone-700 bg-white border border-stone-200 px-3 py-1.5 rounded-lg shadow-sm hover:bg-stone-50">
                <Calendar className="h-3.5 w-3.5 text-stone-500" /> Last 30 days <ChevronDownIcon />
              </button>
              <button className="flex items-center gap-2 text-[12px] font-bold text-stone-700 bg-white border border-stone-200 px-3 py-1.5 rounded-lg shadow-sm hover:bg-stone-50">
                <ArrowDownUp className="h-3.5 w-3.5 text-stone-500" /> Newest first <ChevronDownIcon />
              </button>
            </div>
          </div>

          {/* TABLE HEADER */}
          <div className="flex items-center px-4 py-2 text-[11px] font-bold text-stone-400 mb-2">
            <div className="w-[32%]">Content / Project</div>
            <div className="w-[28%]">Action</div>
            <div className="w-[18%]">Output type</div>
            <div className="w-[12%]">Status</div>
            <div className="w-[10%] text-right">Date & time</div>
          </div>

          {/* HISTORY LIST */}
          <div className="flex flex-col gap-1">
            
            {/* Item 1 (Selected) */}
            <div className="flex items-center px-4 py-3 bg-[#FAF6F4] rounded-lg border border-[#F0EBE6]">
              {/* Content */}
              <div className="w-[32%] flex items-center gap-3">
                <div className="h-12 w-12 rounded bg-white shadow-sm flex overflow-hidden shrink-0">
                   <div className="w-1/3 flex items-center justify-center bg-stone-100 p-0.5"><div className="w-full h-1 bg-stone-300 rounded-sm"></div></div>
                   <div className="w-2/3 h-full bg-cover bg-center" style={{ backgroundImage: `url('/architecture.jpg')` }} />
                </div>
                <div>
                  <h4 className="text-[13px] font-bold text-stone-900 leading-tight">Q3 Product Strategy Report</h4>
                  <p className="text-[10px] text-stone-500">Project: Product Strategy</p>
                  <p className="text-[10px] text-stone-400 mt-0.5">PDF <span className="mx-0.5">•</span> 18 pages <span className="mx-0.5">•</span> 4.2 MB</p>
                </div>
              </div>
              
              {/* Action */}
              <div className="w-[28%] flex items-center gap-3">
                <div className="h-8 w-8 rounded-full flex items-center justify-center text-[#C07050]">
                  <Users className="h-4 w-4" /> {/* Fallback icon, could be a refresh/transform icon */}
                </div>
                <div>
                  <p className="text-[12px] font-bold text-stone-900 leading-tight">Transformation completed</p>
                  <p className="text-[10px] text-stone-500 mt-0.5">Generated 3 outputs</p>
                </div>
              </div>

              {/* Output type */}
              <div className="w-[18%] flex items-center gap-1.5">
                <div className="h-6 w-6 rounded border border-[#E5DFD6] flex items-center justify-center bg-white"><FileText className="h-3 w-3 text-[#A35E47]" /></div>
                <div className="h-6 w-6 rounded border border-[#E5DFD6] flex items-center justify-center bg-white"><Presentation className="h-3 w-3 text-[#A35E47]" /></div>
                <div className="h-6 w-6 rounded border border-blue-200 flex items-center justify-center bg-blue-50 text-[#0A66C2] font-black text-[8px]">in</div>
                <div className="h-6 w-6 rounded border border-stone-200 flex items-center justify-center bg-white text-stone-500 text-[9px] font-bold">+1</div>
              </div>

              {/* Status */}
              <div className="w-[12%] flex items-center gap-1.5">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
                <span className="text-[11px] font-medium text-emerald-600">Completed</span>
              </div>

              {/* Date */}
              <div className="w-[10%] text-right flex items-center justify-between pl-4">
                <div className="text-right">
                  <p className="text-[10px] text-stone-500 font-medium">Sep 27, 2026</p>
                  <p className="text-[10px] text-stone-400 mt-0.5">10:24 AM</p>
                </div>
                <button className="text-stone-400 hover:text-stone-700 ml-2"><MoreHorizontal className="h-4 w-4" /></button>
              </div>
            </div>

            {/* Item 2 */}
            <div className="flex items-center px-4 py-3 hover:bg-stone-50 rounded-lg transition-colors border border-transparent hover:border-stone-200 group">
              <div className="w-[32%] flex items-center gap-3">
                <div className="h-12 w-12 rounded bg-white border border-stone-200 shadow-sm flex overflow-hidden shrink-0">
                   <div className="w-full flex items-center justify-center p-2"><div className="w-full h-1 bg-stone-300 rounded-sm"></div></div>
                   <div className="w-1/2 h-full bg-cover bg-center absolute right-0" style={{ backgroundImage: `url('/architecture.jpg')` }} />
                </div>
                <div>
                  <h4 className="text-[13px] font-bold text-stone-900 leading-tight group-hover:text-[#A35E47] transition-colors cursor-pointer">Executive Summary</h4>
                  <p className="text-[10px] text-stone-500">Project: Product Strategy</p>
                  <p className="text-[10px] text-stone-400 mt-0.5">DOCX <span className="mx-0.5">•</span> 4 pages <span className="mx-0.5">•</span> 1.2 MB</p>
                </div>
              </div>
              
              <div className="w-[28%] flex items-center gap-3">
                <div className="h-8 w-8 rounded-full flex items-center justify-center text-[#C07050]">
                  <Edit3 className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[12px] font-bold text-stone-900 leading-tight">Edited</p>
                  <p className="text-[10px] text-stone-500 mt-0.5">Shortened and clarified</p>
                </div>
              </div>

              <div className="w-[18%] flex items-center gap-2">
                <FileText className="h-3.5 w-3.5 text-[#0A66C2]" />
                <span className="text-[11px] font-medium text-stone-600">Document</span>
              </div>

              <div className="w-[12%] flex items-center gap-1.5">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
                <span className="text-[11px] font-medium text-emerald-600">Saved</span>
              </div>

              <div className="w-[10%] text-right flex items-center justify-between pl-4">
                <div className="text-right">
                  <p className="text-[10px] text-stone-500 font-medium">Sep 27, 2026</p>
                  <p className="text-[10px] text-stone-400 mt-0.5">09:18 AM</p>
                </div>
                <button className="text-stone-400 hover:text-stone-700 ml-2 opacity-0 group-hover:opacity-100 transition-opacity"><MoreHorizontal className="h-4 w-4" /></button>
              </div>
            </div>

            {/* Item 3 */}
            <div className="flex items-center px-4 py-3 hover:bg-stone-50 rounded-lg transition-colors border border-transparent hover:border-stone-200 group">
              <div className="w-[32%] flex items-center gap-3">
                <div className="h-12 w-12 rounded bg-white border border-stone-200 shadow-sm flex flex-col p-1.5 shrink-0 relative overflow-hidden">
                   <div className="flex items-center gap-1 mb-1">
                     <div className="h-3 w-3 bg-[#0A66C2] rounded-[2px] flex items-center justify-center text-[5px] font-bold text-white">in</div>
                     <div className="w-5 h-0.5 bg-stone-200"></div>
                   </div>
                   <div className="w-full flex-1 bg-cover bg-center rounded-sm" style={{ backgroundImage: `url('/architecture.jpg')` }} />
                </div>
                <div>
                  <h4 className="text-[13px] font-bold text-stone-900 leading-tight">LinkedIn Post</h4>
                  <p className="text-[10px] text-stone-500">Project: Product Strategy</p>
                  <p className="text-[10px] text-stone-400 mt-0.5">Social Media <span className="mx-0.5">•</span> ~1,100 characters</p>
                </div>
              </div>
              
              <div className="w-[28%] flex items-center gap-3">
                <div className="h-8 w-8 rounded-full flex items-center justify-center text-[#C07050]">
                  <Download className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[12px] font-bold text-stone-900 leading-tight">Exported</p>
                  <p className="text-[10px] text-stone-500 mt-0.5">Copied to clipboard</p>
                </div>
              </div>

              <div className="w-[18%] flex items-center gap-2">
                <div className="h-3.5 w-3.5 bg-[#0A66C2] rounded-[2px] flex items-center justify-center text-[7px] font-bold text-white">in</div>
                <span className="text-[11px] font-medium text-stone-600">Social Media</span>
              </div>

              <div className="w-[12%] flex items-center gap-1.5">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
                <span className="text-[11px] font-medium text-emerald-600">Exported</span>
              </div>

              <div className="w-[10%] text-right flex items-center justify-between pl-4">
                <div className="text-right">
                  <p className="text-[10px] text-stone-500 font-medium">Sep 26, 2026</p>
                  <p className="text-[10px] text-stone-400 mt-0.5">06:42 PM</p>
                </div>
                <button className="text-stone-400 hover:text-stone-700 ml-2 opacity-0 group-hover:opacity-100 transition-opacity"><MoreHorizontal className="h-4 w-4" /></button>
              </div>
            </div>

            {/* Item 4 */}
            <div className="flex items-center px-4 py-3 hover:bg-stone-50 rounded-lg transition-colors border border-transparent hover:border-stone-200 group">
              <div className="w-[32%] flex items-center gap-3">
                <div className="h-12 w-12 rounded bg-white border border-stone-200 shadow-sm flex overflow-hidden shrink-0">
                   <div className="w-1/3 flex items-center justify-center bg-[#FDF3F0] p-0.5"><div className="text-[5px] font-bold text-[#C07050]">2024</div></div>
                   <div className="w-2/3 h-full bg-cover bg-center filter grayscale opacity-50" style={{ backgroundImage: `url('/architecture.jpg')` }} />
                </div>
                <div>
                  <h4 className="text-[13px] font-bold text-stone-900 leading-tight">Annual Market Review</h4>
                  <p className="text-[10px] text-stone-500">Project: Market Analysis</p>
                  <p className="text-[10px] text-stone-400 mt-0.5">PDF <span className="mx-0.5">•</span> 25 pages <span className="mx-0.5">•</span> 5.1 MB</p>
                </div>
              </div>
              
              <div className="w-[28%] flex items-center gap-3">
                <div className="h-8 w-8 rounded-full flex items-center justify-center text-[#C07050]">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[12px] font-bold text-stone-900 leading-tight">Transformation started</p>
                  <p className="text-[10px] text-stone-500 mt-0.5">Processing document</p>
                </div>
              </div>

              <div className="w-[18%] flex items-center gap-1.5 opacity-50">
                <div className="h-6 w-6 rounded border border-stone-200 flex items-center justify-center bg-white"><FileText className="h-3 w-3 text-[#A35E47]" /></div>
                <div className="h-6 w-6 rounded border border-stone-200 flex items-center justify-center bg-white"><Presentation className="h-3 w-3 text-[#A35E47]" /></div>
                <div className="h-6 w-6 rounded border border-stone-200 flex items-center justify-center bg-white"><span className="text-[9px] font-bold text-stone-500">+1</span></div>
              </div>

              <div className="w-[12%] flex items-center gap-1.5">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                <span className="text-[11px] font-medium text-blue-600">In progress</span>
              </div>

              <div className="w-[10%] text-right flex items-center justify-between pl-4">
                <div className="text-right">
                  <p className="text-[10px] text-stone-500 font-medium">Sep 26, 2026</p>
                  <p className="text-[10px] text-stone-400 mt-0.5">04:15 PM</p>
                </div>
                <button className="text-stone-400 hover:text-stone-700 ml-2 opacity-0 group-hover:opacity-100 transition-opacity"><MoreHorizontal className="h-4 w-4" /></button>
              </div>
            </div>

            {/* Item 5 */}
            <div className="flex items-center px-4 py-3 hover:bg-stone-50 rounded-lg transition-colors border border-transparent hover:border-stone-200 group">
              <div className="w-[32%] flex items-center gap-3">
                <div className="h-12 w-12 rounded bg-white border border-stone-200 shadow-sm flex flex-col justify-center shrink-0">
                  <p className="text-[5px] text-stone-400 px-2 leading-[1.2]">Product<br/>Launch<br/>Brief</p>
                </div>
                <div>
                  <h4 className="text-[13px] font-bold text-stone-900 leading-tight">Product Post</h4>
                  <p className="text-[10px] text-stone-500">Project: Product Launch</p>
                  <p className="text-[10px] text-stone-400 mt-0.5">PDF <span className="mx-0.5">•</span> 12 pages <span className="mx-0.5">•</span> 2.8 MB</p>
                </div>
              </div>
              
              <div className="w-[28%] flex items-center gap-3">
                <div className="h-8 w-8 rounded-full flex items-center justify-center text-[#C07050]">
                  <FileText className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[12px] font-bold text-stone-900 leading-tight">Draft saved</p>
                  <p className="text-[10px] text-stone-500 mt-0.5">Configuration saved</p>
                </div>
              </div>

              <div className="w-[18%] flex items-center gap-2 text-stone-400">
                —
              </div>

              <div className="w-[12%] flex items-center gap-1.5">
                <div className="h-1.5 w-1.5 rounded-full bg-stone-400"></div>
                <span className="text-[11px] font-medium text-stone-500">Draft</span>
              </div>

              <div className="w-[10%] text-right flex items-center justify-between pl-4">
                <div className="text-right">
                  <p className="text-[10px] text-stone-500 font-medium">Sep 26, 2026</p>
                  <p className="text-[10px] text-stone-400 mt-0.5">01:03 PM</p>
                </div>
                <button className="text-stone-400 hover:text-stone-700 ml-2 opacity-0 group-hover:opacity-100 transition-opacity"><MoreHorizontal className="h-4 w-4" /></button>
              </div>
            </div>

            {/* Item 6 */}
            <div className="flex items-center px-4 py-3 hover:bg-stone-50 rounded-lg transition-colors border border-transparent hover:border-stone-200 group">
              <div className="w-[32%] flex items-center gap-3">
                <div className="h-12 w-12 rounded bg-white border border-stone-200 shadow-sm flex overflow-hidden shrink-0">
                   <div className="w-full flex items-center justify-center p-2"><div className="w-full h-1 bg-stone-300 rounded-sm"></div></div>
                   <div className="w-1/2 h-full bg-cover bg-center absolute right-0" style={{ backgroundImage: `url('/architecture.jpg')` }} />
                </div>
                <div>
                  <h4 className="text-[13px] font-bold text-stone-900 leading-tight">Customer Research</h4>
                  <p className="text-[10px] text-stone-500">Project: Research</p>
                  <p className="text-[10px] text-stone-400 mt-0.5">PDF <span className="mx-0.5">•</span> 16 pages <span className="mx-0.5">•</span> 3.7 MB</p>
                </div>
              </div>
              
              <div className="w-[28%] flex items-center gap-3">
                <div className="h-8 w-8 rounded-full flex items-center justify-center text-emerald-600">
                  <Users className="h-4 w-4" /> 
                </div>
                <div>
                  <p className="text-[12px] font-bold text-stone-900 leading-tight">Transformation completed</p>
                  <p className="text-[10px] text-stone-500 mt-0.5">Generated 4 outputs</p>
                </div>
              </div>

              <div className="w-[18%] flex items-center gap-1.5">
                <div className="h-6 w-6 rounded border border-[#E5DFD6] flex items-center justify-center bg-white"><FileText className="h-3 w-3 text-[#A35E47]" /></div>
                <div className="h-6 w-6 rounded border border-[#E5DFD6] flex items-center justify-center bg-white"><Presentation className="h-3 w-3 text-[#A35E47]" /></div>
                <div className="h-6 w-6 rounded border border-blue-200 flex items-center justify-center bg-blue-50 text-[#0A66C2] font-black text-[8px]">in</div>
                <div className="h-6 w-6 rounded border border-stone-200 flex items-center justify-center bg-white text-stone-500 text-[9px] font-bold">+1</div>
              </div>

              <div className="w-[12%] flex items-center gap-1.5">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
                <span className="text-[11px] font-medium text-emerald-600">Completed</span>
              </div>

              <div className="w-[10%] text-right flex items-center justify-between pl-4">
                <div className="text-right">
                  <p className="text-[10px] text-stone-500 font-medium">Sep 25, 2026</p>
                  <p className="text-[10px] text-stone-400 mt-0.5">05:27 PM</p>
                </div>
                <button className="text-stone-400 hover:text-stone-700 ml-2 opacity-0 group-hover:opacity-100 transition-opacity"><MoreHorizontal className="h-4 w-4" /></button>
              </div>
            </div>

          </div>

        </div>

        {/* RIGHT SIDEBAR (Selected Item Detail) */}
        <div className="w-[300px] shrink-0 flex flex-col gap-6 pt-4">
          
          <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden flex flex-col">
            
            {/* Hero Image */}
            <div className="h-[140px] w-full bg-cover bg-center relative" style={{ backgroundImage: `url('/architecture.jpg')` }}>
              <div className="absolute inset-0 bg-white/20"></div>
              <div className="absolute top-4 left-4">
                <p className="text-[16px] font-bold text-stone-900 tracking-tight">Q3 2024</p>
              </div>
              {/* Fake wireframe line */}
              <div className="absolute top-12 left-4 w-12 h-[2px] bg-stone-300"></div>
              <div className="absolute top-14 left-4 w-16 h-[2px] bg-stone-300"></div>
            </div>

            <div className="p-5 flex flex-col flex-1">
              <h2 className="text-[16px] font-black text-stone-900 leading-tight mb-1">Q3 Product Strategy Report</h2>
              <p className="text-[11px] text-stone-500 font-medium flex items-center gap-1.5 mb-3">
                <FileText className="h-3.5 w-3.5" /> PDF <span className="mx-0.5">•</span> 18 pages <span className="mx-0.5">•</span> 4.2 MB
              </p>
              <p className="text-[11px] text-stone-500 leading-relaxed mb-6">
                Quarterly strategy report covering product performance, market analysis, key initiatives and roadmap for Q4. Includes competitive landscape and growth opportunities.
              </p>

              {/* Sections */}
              <div className="space-y-4 flex-1">
                
                <div>
                  <h4 className="text-[10px] font-bold text-stone-900 mb-2">Project</h4>
                  <div className="flex items-center gap-2">
                    <FolderOpen className="h-3.5 w-3.5 text-stone-400" />
                    <span className="text-[12px] font-medium text-stone-700">Product Strategy</span>
                  </div>
                </div>

                <div className="h-px w-full bg-stone-100"></div>

                <div>
                  <h4 className="text-[10px] font-bold text-stone-900 mb-2">Source document</h4>
                  <div className="flex items-start justify-between">
                    <div className="flex gap-2">
                      <FileText className="h-4 w-4 text-[#C07050]" />
                      <div>
                        <p className="text-[11px] font-medium text-stone-700">Q3 Product Strategy Report.pdf</p>
                        <p className="text-[9px] text-stone-400 mt-0.5">18 pages <span className="mx-0.5">•</span> 4.2 MB</p>
                      </div>
                    </div>
                    <ExternalLink className="h-3.5 w-3.5 text-stone-400 hover:text-stone-600 cursor-pointer" />
                  </div>
                </div>

                <div className="h-px w-full bg-stone-100"></div>

                <div>
                  <h4 className="text-[10px] font-bold text-stone-900 mb-2">Generated outputs (3)</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2 items-center">
                        <FileText className="h-4 w-4 text-[#C07050]" />
                        <div>
                          <p className="text-[11px] font-medium text-stone-700 leading-tight">Executive Summary</p>
                          <p className="text-[9px] text-stone-400 mt-0.5">PDF <span className="mx-0.5">•</span> 4 pages</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-stone-400 hover:text-stone-600">
                        <ExternalLink className="h-3.5 w-3.5 cursor-pointer" />
                        <MoreHorizontal className="h-3.5 w-3.5 cursor-pointer" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex gap-2 items-center">
                        <Presentation className="h-4 w-4 text-[#C07050]" />
                        <div>
                          <p className="text-[11px] font-medium text-stone-700 leading-tight">Presentation</p>
                          <p className="text-[9px] text-stone-400 mt-0.5">PPTX <span className="mx-0.5">•</span> 10 slides</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-stone-400 hover:text-stone-600">
                        <ExternalLink className="h-3.5 w-3.5 cursor-pointer" />
                        <MoreHorizontal className="h-3.5 w-3.5 cursor-pointer" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex gap-2 items-center">
                        <div className="h-4 w-4 bg-[#0A66C2] rounded-[3px] flex items-center justify-center"><span className="text-[9px] font-bold text-white">in</span></div>
                        <div>
                          <p className="text-[11px] font-medium text-stone-700 leading-tight">LinkedIn Post</p>
                          <p className="text-[9px] text-stone-400 mt-0.5">Social Media <span className="mx-0.5">•</span> ~1,100 characters</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-stone-400 hover:text-stone-600">
                        <ExternalLink className="h-3.5 w-3.5 cursor-pointer" />
                        <MoreHorizontal className="h-3.5 w-3.5 cursor-pointer" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="h-px w-full bg-stone-100"></div>

                <div>
                  <h4 className="text-[10px] font-bold text-stone-900 mb-2">Version</h4>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-3.5 w-3.5 text-stone-400" />
                      <span className="text-[12px] font-medium text-stone-700">v1.0</span>
                    </div>
                    <span className="text-[9px] text-stone-400">Generated Sep 27, 2026, 10:24 AM</span>
                  </div>
                </div>

              </div>
              
              {/* Actions */}
              <div className="flex items-center gap-2 pt-6 mt-4">
                <button className="flex-1 flex items-center justify-center gap-2 bg-white border border-stone-300 hover:bg-stone-50 text-stone-700 font-semibold text-[13px] py-2.5 rounded-lg transition-colors shadow-sm">
                  <FolderOpen className="h-4 w-4 text-[#A35E47]" /> Open project
                </button>
                <button 
                  onClick={() => onNavigate('/transform/result')}
                  className="flex-1 flex items-center justify-center gap-2 bg-[#9E573F] hover:bg-[#8B4A2F] text-white font-semibold text-[13px] py-2.5 rounded-lg transition-colors shadow-sm"
                >
                  View output <ArrowRight className="h-4 w-4" />
                </button>
              </div>

            </div>
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
