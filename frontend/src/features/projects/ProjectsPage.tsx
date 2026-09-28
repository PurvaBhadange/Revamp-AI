"use client";

import React, { useState } from 'react';
import { 
  Plus, LayoutGrid, List as ListIcon, Filter, ArrowUpDown, 
  MoreHorizontal, FileText, Presentation, Image as ImageIcon, 
  BarChart3, FileCheck, CheckCircle2, Circle, Clock, Users, Star, 
  Globe2, Check
} from 'lucide-react';

interface ProjectsPageProps {
  onNavigate: (route: string) => void;
}

export function ProjectsPage({ onNavigate }: ProjectsPageProps) {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div className="min-h-full bg-[#FDFCFB] font-sans px-8 py-10">
      
      {/* PAGE HEADER */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="text-[10px] font-bold tracking-[0.2em] text-[#C07050] uppercase mb-2">Projects</p>
          <h1 className="text-[44px] font-black text-stone-950 tracking-tight leading-none mb-3">Projects</h1>
          <p className="text-[15px] text-stone-500 font-medium">Your transformations, organized in one place.</p>
        </div>
        <button 
          onClick={() => onNavigate('/transform/new')}
          className="flex items-center gap-2 bg-[#9E573F] hover:bg-[#8B4A2F] text-white font-semibold text-[14px] px-5 py-3 rounded-lg shadow-sm transition-colors"
        >
          <Plus className="h-4 w-4" /> New Transformation
        </button>
      </div>

      <div className="flex gap-10">
        
        {/* MAIN COLUMN */}
        <div className="flex-1">
          
          {/* TABS & FILTERS */}
          <div className="flex items-center justify-between border-b border-stone-200 mb-6">
            <div className="flex gap-6">
              <button 
                onClick={() => setActiveTab('all')}
                className={`pb-3 text-[13px] font-bold transition-colors border-b-2 ${
                  activeTab === 'all' ? 'border-[#C07050] text-[#C07050]' : 'border-transparent text-stone-500 hover:text-stone-800'
                }`}
              >
                All Projects (12)
              </button>
              <button 
                onClick={() => setActiveTab('drafts')}
                className={`pb-3 text-[13px] font-bold transition-colors border-b-2 ${
                  activeTab === 'drafts' ? 'border-[#C07050] text-[#C07050]' : 'border-transparent text-stone-500 hover:text-stone-800'
                }`}
              >
                Drafts (3)
              </button>
              <button 
                onClick={() => setActiveTab('progress')}
                className={`pb-3 text-[13px] font-bold transition-colors border-b-2 ${
                  activeTab === 'progress' ? 'border-[#C07050] text-[#C07050]' : 'border-transparent text-stone-500 hover:text-stone-800'
                }`}
              >
                In Progress (4)
              </button>
              <button 
                onClick={() => setActiveTab('ready')}
                className={`pb-3 text-[13px] font-bold transition-colors border-b-2 ${
                  activeTab === 'ready' ? 'border-[#C07050] text-[#C07050]' : 'border-transparent text-stone-500 hover:text-stone-800'
                }`}
              >
                Ready (5)
              </button>
            </div>

            <div className="flex items-center gap-3 pb-2">
              <div className="flex items-center bg-stone-100 rounded-lg p-0.5 border border-stone-200">
                <button className="p-1.5 bg-white shadow-sm rounded-md text-stone-800"><LayoutGrid className="h-4 w-4" /></button>
                <button className="p-1.5 text-stone-500 hover:text-stone-800"><ListIcon className="h-4 w-4" /></button>
              </div>
              <button className="flex items-center gap-1.5 text-[12px] font-bold text-stone-700 bg-white border border-stone-200 px-3 py-1.5 rounded-lg shadow-sm hover:bg-stone-50">
                <Filter className="h-3.5 w-3.5" /> Filter <ChevronDownIcon />
              </button>
              <button className="flex items-center gap-1.5 text-[12px] font-bold text-stone-700 bg-white border border-stone-200 px-3 py-1.5 rounded-lg shadow-sm hover:bg-stone-50">
                <ArrowUpDown className="h-3.5 w-3.5" /> Sort by <ChevronDownIcon />
              </button>
            </div>
          </div>

          {/* PROJECTS GRID */}
          <div className="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-5 mb-10">
            
            {/* Card 1 */}
            <div className="bg-white border border-stone-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
              {/* Thumbnail */}
              <div className="w-full h-[120px] bg-[#F5F4F1] rounded-lg mb-4 overflow-hidden relative flex">
                <div className="w-1/2 p-3 flex flex-col justify-center bg-[#F5F4F1]">
                  <p className="text-[7px] font-black text-[#C07050] mb-1 tracking-widest">Q3 2024</p>
                  <h3 className="text-[13px] font-black text-stone-900 leading-tight">Product<br/>Strategy Report</h3>
                </div>
                <div className="w-1/2 h-full bg-cover bg-center" style={{ backgroundImage: `url('/architecture.jpg')` }} />
                <button className="absolute top-2 right-2 h-6 w-6 bg-white/80 rounded flex items-center justify-center hover:bg-white text-stone-600 shadow-sm">
                  <MoreHorizontal className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Status & Details */}
              <div className="flex items-center gap-1.5 bg-[#F0FDF4] border border-green-200 w-fit px-2 py-0.5 rounded-full mb-3">
                <CheckCircle2 className="h-3 w-3 text-green-600" />
                <span className="text-[10px] font-bold text-green-700">Ready</span>
              </div>
              <h2 className="text-[15px] font-black text-stone-900 leading-tight mb-1.5">Q3 Product Strategy Report</h2>
              <p className="text-[10px] text-stone-500 font-medium flex items-center gap-1.5 mb-2.5">
                <FileText className="h-3 w-3" /> PDF <span className="mx-0.5">•</span> 18 pages <span className="mx-0.5">•</span> 4.2 MB
              </p>
              <p className="text-[11px] text-stone-500 leading-relaxed line-clamp-2 mb-4 h-8">
                Quarterly strategy report covering market analysis, key initiatives and growth opportunities.
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-bold text-stone-900">3 outputs</span>
                  <div className="flex items-center gap-1.5">
                    <div className="h-6 w-6 rounded border border-[#E5DFD6] flex items-center justify-center bg-[#FAF6F4]"><FileText className="h-3 w-3 text-[#A35E47]" /></div>
                    <div className="h-6 w-6 rounded border border-[#E5DFD6] flex items-center justify-center bg-[#FAF6F4]"><Presentation className="h-3 w-3 text-[#A35E47]" /></div>
                    <div className="h-6 w-6 rounded border border-blue-100 flex items-center justify-center bg-blue-50 text-[#0A66C2] font-black text-[8px]">in</div>
                    <button className="h-6 w-6 rounded border border-stone-200 border-dashed flex items-center justify-center text-stone-400 hover:text-stone-600"><Plus className="h-3 w-3" /></button>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-5 w-5 rounded-full bg-stone-200 text-stone-600 flex items-center justify-center text-[7px] font-black">AW</div>
                  <span className="text-[9px] text-stone-400 font-medium">Updated 2 hours ago</span>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white border border-stone-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-full h-[120px] bg-[#F5F4F1] rounded-lg mb-4 overflow-hidden relative flex">
                <div className="w-1/2 p-3 flex flex-col justify-center bg-[#F5F4F1]">
                  <p className="text-[7px] font-black text-[#C07050] mb-1 tracking-widest">2024</p>
                  <h3 className="text-[13px] font-black text-stone-900 leading-tight">Market Review</h3>
                </div>
                <div className="w-1/2 h-full bg-cover bg-center filter grayscale" style={{ backgroundImage: `url('/architecture.jpg')` }} />
                <button className="absolute top-2 right-2 h-6 w-6 bg-white/80 rounded flex items-center justify-center hover:bg-white text-stone-600 shadow-sm"><MoreHorizontal className="h-3.5 w-3.5" /></button>
              </div>

              <div className="flex items-center gap-1.5 bg-blue-50 border border-blue-200 w-fit px-2 py-0.5 rounded-full mb-3">
                <div className="h-2 w-2 rounded-full bg-blue-600" />
                <span className="text-[10px] font-bold text-blue-700">In progress</span>
              </div>
              <h2 className="text-[15px] font-black text-stone-900 leading-tight mb-1.5">Annual Market Review</h2>
              <p className="text-[10px] text-stone-500 font-medium flex items-center gap-1.5 mb-2.5">
                <FileText className="h-3 w-3" /> DOCX <span className="mx-0.5">•</span> 25 pages <span className="mx-0.5">•</span> 5.1 MB
              </p>
              <p className="text-[11px] text-stone-500 leading-relaxed line-clamp-2 mb-4 h-8">
                Comprehensive analysis of market trends, competitive landscape and outlook for 2024.
              </p>

              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-bold text-stone-900">3 outputs</span>
                  <div className="flex items-center gap-1.5">
                    <div className="h-6 w-6 rounded border border-[#E5DFD6] flex items-center justify-center bg-[#FAF6F4]"><FileText className="h-3 w-3 text-[#A35E47]" /></div>
                    <div className="h-6 w-6 rounded border border-[#E5DFD6] flex items-center justify-center bg-[#FAF6F4]"><BarChart3 className="h-3 w-3 text-[#A35E47]" /></div>
                    <div className="h-6 w-6 rounded border border-[#E5DFD6] flex items-center justify-center bg-[#FAF6F4]"><ImageIcon className="h-3 w-3 text-[#A35E47]" /></div>
                    <button className="h-6 w-6 rounded border border-stone-200 border-dashed flex items-center justify-center text-stone-400 hover:text-stone-600"><Plus className="h-3 w-3" /></button>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-5 w-5 rounded-full bg-stone-200 text-stone-600 flex items-center justify-center text-[7px] font-black">AW</div>
                  <span className="text-[9px] text-stone-400 font-medium">Updated 4 hours ago</span>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white border border-stone-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-full h-[120px] bg-[#F5F4F1] rounded-lg mb-4 overflow-hidden relative flex">
                <div className="w-1/2 p-3 flex flex-col justify-center bg-[#F5F4F1]">
                  <p className="text-[7px] font-black text-[#C07050] mb-1 tracking-widest">2024</p>
                  <h3 className="text-[13px] font-black text-stone-900 leading-tight">Product<br/>Launch Brief</h3>
                </div>
                <div className="w-1/2 h-full bg-cover bg-center" style={{ backgroundImage: `url('/architecture.jpg')` }} />
                <button className="absolute top-2 right-2 h-6 w-6 bg-white/80 rounded flex items-center justify-center hover:bg-white text-stone-600 shadow-sm"><MoreHorizontal className="h-3.5 w-3.5" /></button>
              </div>

              <div className="flex items-center gap-1.5 bg-stone-100 border border-stone-200 w-fit px-2 py-0.5 rounded-full mb-3">
                <div className="h-2 w-2 rounded-full bg-stone-400" />
                <span className="text-[10px] font-bold text-stone-600">Draft</span>
              </div>
              <h2 className="text-[15px] font-black text-stone-900 leading-tight mb-1.5">Product Launch Brief</h2>
              <p className="text-[10px] text-stone-500 font-medium flex items-center gap-1.5 mb-2.5">
                <FileText className="h-3 w-3" /> PDF <span className="mx-0.5">•</span> 12 pages <span className="mx-0.5">•</span> 2.8 MB
              </p>
              <p className="text-[11px] text-stone-500 leading-relaxed line-clamp-2 mb-4 h-8">
                Internal brief for the upcoming product launch including positioning, audience and messaging.
              </p>

              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-bold text-stone-900">3 outputs</span>
                  <div className="flex items-center gap-1.5">
                    <div className="h-6 w-6 rounded border border-[#E5DFD6] flex items-center justify-center bg-[#FAF6F4]"><Presentation className="h-3 w-3 text-[#A35E47]" /></div>
                    <div className="h-6 w-6 rounded border border-blue-100 flex items-center justify-center bg-blue-50 text-[#0A66C2] font-black text-[8px]">in</div>
                    <button className="h-6 w-6 rounded border border-stone-200 border-dashed flex items-center justify-center text-stone-400 hover:text-stone-600"><Plus className="h-3 w-3" /></button>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-5 w-5 rounded-full bg-stone-200 text-stone-600 flex items-center justify-center text-[7px] font-black">AW</div>
                  <span className="text-[9px] text-stone-400 font-medium">Updated 1 day ago</span>
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white border border-stone-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-full h-[120px] bg-[#F5F4F1] rounded-lg mb-4 overflow-hidden relative flex">
                <div className="w-1/2 p-3 flex flex-col justify-center bg-[#F5F4F1]">
                  <h3 className="text-[13px] font-black text-stone-900 leading-tight">Customer<br/>Research Report</h3>
                </div>
                <div className="w-1/2 h-full bg-cover bg-center" style={{ backgroundImage: `url('/architecture.jpg')` }} />
                <button className="absolute top-2 right-2 h-6 w-6 bg-white/80 rounded flex items-center justify-center hover:bg-white text-stone-600 shadow-sm"><MoreHorizontal className="h-3.5 w-3.5" /></button>
              </div>

              <div className="flex items-center gap-1.5 bg-[#F0FDF4] border border-green-200 w-fit px-2 py-0.5 rounded-full mb-3">
                <CheckCircle2 className="h-3 w-3 text-green-600" />
                <span className="text-[10px] font-bold text-green-700">Ready</span>
              </div>
              <h2 className="text-[15px] font-black text-stone-900 leading-tight mb-1.5">Customer Research Report</h2>
              <p className="text-[10px] text-stone-500 font-medium flex items-center gap-1.5 mb-2.5">
                <FileText className="h-3 w-3" /> PDF <span className="mx-0.5">•</span> 16 pages <span className="mx-0.5">•</span> 3.7 MB
              </p>
              <p className="text-[11px] text-stone-500 leading-relaxed line-clamp-2 mb-4 h-8">
                Insights from customer interviews and surveys with key recommendations.
              </p>

              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-bold text-stone-900">4 outputs</span>
                  <div className="flex items-center gap-1.5">
                    <div className="h-6 w-6 rounded border border-[#E5DFD6] flex items-center justify-center bg-[#FAF6F4]"><FileText className="h-3 w-3 text-[#A35E47]" /></div>
                    <div className="h-6 w-6 rounded border border-[#E5DFD6] flex items-center justify-center bg-[#FAF6F4]"><BarChart3 className="h-3 w-3 text-[#A35E47]" /></div>
                    <div className="h-6 w-6 rounded border border-[#E5DFD6] flex items-center justify-center bg-[#FAF6F4]"><ImageIcon className="h-3 w-3 text-[#A35E47]" /></div>
                    <div className="h-6 w-6 rounded border border-blue-100 flex items-center justify-center bg-blue-50 text-[#0A66C2] font-black text-[8px]">in</div>
                    <button className="h-6 w-6 rounded border border-stone-200 border-dashed flex items-center justify-center text-stone-400 hover:text-stone-600"><Plus className="h-3 w-3" /></button>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-5 w-5 rounded-full bg-stone-200 text-stone-600 flex items-center justify-center text-[7px] font-black">AW</div>
                  <span className="text-[9px] text-stone-400 font-medium">Updated 2 days ago</span>
                </div>
              </div>
            </div>

            {/* Card 5 */}
            <div className="bg-white border border-stone-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-full h-[120px] bg-[#F5F4F1] rounded-lg mb-4 overflow-hidden relative flex">
                <div className="w-1/2 p-3 flex flex-col justify-center bg-[#F5F4F1]">
                  <h3 className="text-[13px] font-black text-stone-900 leading-tight">Competitive<br/>Analysis</h3>
                </div>
                <div className="w-1/2 h-full bg-cover bg-center filter grayscale opacity-80" style={{ backgroundImage: `url('/architecture.jpg')` }} />
                <button className="absolute top-2 right-2 h-6 w-6 bg-white/80 rounded flex items-center justify-center hover:bg-white text-stone-600 shadow-sm"><MoreHorizontal className="h-3.5 w-3.5" /></button>
              </div>

              <div className="flex items-center gap-1.5 bg-blue-50 border border-blue-200 w-fit px-2 py-0.5 rounded-full mb-3">
                <div className="h-2 w-2 rounded-full bg-blue-600" />
                <span className="text-[10px] font-bold text-blue-700">In progress</span>
              </div>
              <h2 className="text-[15px] font-black text-stone-900 leading-tight mb-1.5">Competitive Analysis</h2>
              <p className="text-[10px] text-stone-500 font-medium flex items-center gap-1.5 mb-2.5">
                <FileText className="h-3 w-3" /> PDF <span className="mx-0.5">•</span> 20 pages <span className="mx-0.5">•</span> 4.5 MB
              </p>
              <p className="text-[11px] text-stone-500 leading-relaxed line-clamp-2 mb-4 h-8">
                Detailed analysis of key competitors, their strategies and market positioning.
              </p>

              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-bold text-stone-900">3 outputs</span>
                  <div className="flex items-center gap-1.5">
                    <div className="h-6 w-6 rounded border border-[#E5DFD6] flex items-center justify-center bg-[#FAF6F4]"><FileText className="h-3 w-3 text-[#A35E47]" /></div>
                    <div className="h-6 w-6 rounded border border-[#E5DFD6] flex items-center justify-center bg-[#FAF6F4]"><Presentation className="h-3 w-3 text-[#A35E47]" /></div>
                    <div className="h-6 w-6 rounded border border-[#E5DFD6] flex items-center justify-center bg-[#FAF6F4]"><BarChart3 className="h-3 w-3 text-[#A35E47]" /></div>
                    <button className="h-6 w-6 rounded border border-stone-200 border-dashed flex items-center justify-center text-stone-400 hover:text-stone-600"><Plus className="h-3 w-3" /></button>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-5 w-5 rounded-full bg-stone-200 text-stone-600 flex items-center justify-center text-[7px] font-black">AW</div>
                  <span className="text-[9px] text-stone-400 font-medium">Updated 3 days ago</span>
                </div>
              </div>
            </div>

            {/* Card 6 */}
            <div className="bg-white border border-stone-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-full h-[120px] bg-[#F5F4F1] rounded-lg mb-4 overflow-hidden relative flex">
                <div className="w-1/2 p-3 flex flex-col justify-center bg-[#F5F4F1]">
                  <p className="text-[7px] font-black text-[#C07050] mb-1 tracking-widest">2024</p>
                  <h3 className="text-[13px] font-black text-stone-900 leading-tight">Go-to-Market<br/>Strategy</h3>
                </div>
                <div className="w-1/2 h-full bg-cover bg-center" style={{ backgroundImage: `url('/architecture.jpg')` }} />
                <button className="absolute top-2 right-2 h-6 w-6 bg-white/80 rounded flex items-center justify-center hover:bg-white text-stone-600 shadow-sm"><MoreHorizontal className="h-3.5 w-3.5" /></button>
              </div>

              <div className="flex items-center gap-1.5 bg-stone-100 border border-stone-200 w-fit px-2 py-0.5 rounded-full mb-3">
                <div className="h-2 w-2 rounded-full bg-stone-400" />
                <span className="text-[10px] font-bold text-stone-600">Draft</span>
              </div>
              <h2 className="text-[15px] font-black text-stone-900 leading-tight mb-1.5">Go-to-Market Strategy</h2>
              <p className="text-[10px] text-stone-500 font-medium flex items-center gap-1.5 mb-2.5">
                <FileText className="h-3 w-3" /> DOCX <span className="mx-0.5">•</span> 14 pages <span className="mx-0.5">•</span> 3.1 MB
              </p>
              <p className="text-[11px] text-stone-500 leading-relaxed line-clamp-2 mb-4 h-8">
                Strategy and execution plan for market entry in new regions.
              </p>

              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-bold text-stone-900">2 outputs</span>
                  <div className="flex items-center gap-1.5">
                    <div className="h-6 w-6 rounded border border-[#E5DFD6] flex items-center justify-center bg-[#FAF6F4]"><Presentation className="h-3 w-3 text-[#A35E47]" /></div>
                    <div className="h-6 w-6 rounded border border-[#E5DFD6] flex items-center justify-center bg-[#FAF6F4]"><BarChart3 className="h-3 w-3 text-[#A35E47]" /></div>
                    <button className="h-6 w-6 rounded border border-stone-200 border-dashed flex items-center justify-center text-stone-400 hover:text-stone-600"><Plus className="h-3 w-3" /></button>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-5 w-5 rounded-full bg-stone-200 text-stone-600 flex items-center justify-center text-[7px] font-black">AW</div>
                  <span className="text-[9px] text-stone-400 font-medium">Updated 5 days ago</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* RIGHT SIDEBAR */}
        <div className="w-[320px] flex flex-col gap-6 shrink-0">
          
          {/* Recent Activity */}
          <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[14px] font-black text-stone-900">Recent activity</h2>
              <button className="text-[10px] font-bold text-[#A35E47] hover:text-[#8B4A2F]">View all</button>
            </div>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="mt-0.5"><FileText className="h-4 w-4 text-[#C07050]" strokeWidth={1.5} /></div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <p className="text-[11px] font-bold text-stone-900 leading-tight">Q3 Product Strategy Report</p>
                    <span className="text-[9px] text-stone-400 shrink-0">2 hours ago</span>
                  </div>
                  <p className="text-[10px] text-stone-500 mt-0.5">Generated 3 outputs</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="mt-0.5"><FileCheck className="h-4 w-4 text-stone-400" strokeWidth={1.5} /></div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <p className="text-[11px] font-bold text-stone-900 leading-tight">Annual Market Review</p>
                    <span className="text-[9px] text-stone-400 shrink-0">4 hours ago</span>
                  </div>
                  <p className="text-[10px] text-stone-500 mt-0.5">Updated transformation settings</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="mt-0.5"><FileText className="h-4 w-4 text-[#C07050]" strokeWidth={1.5} /></div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <p className="text-[11px] font-bold text-stone-900 leading-tight">Product Launch Brief</p>
                    <span className="text-[9px] text-stone-400 shrink-0">1 day ago</span>
                  </div>
                  <p className="text-[10px] text-stone-500 mt-0.5">Created new project</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="mt-0.5"><FileText className="h-4 w-4 text-[#C07050]" strokeWidth={1.5} /></div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <p className="text-[11px] font-bold text-stone-900 leading-tight">Customer Research Report</p>
                    <span className="text-[9px] text-stone-400 shrink-0">2 days ago</span>
                  </div>
                  <p className="text-[10px] text-stone-500 mt-0.5">Exported LinkedIn post</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="mt-0.5"><FileText className="h-4 w-4 text-[#C07050]" strokeWidth={1.5} /></div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <p className="text-[11px] font-bold text-stone-900 leading-tight">Competitive Analysis</p>
                    <span className="text-[9px] text-stone-400 shrink-0">3 days ago</span>
                  </div>
                  <p className="text-[10px] text-stone-500 mt-0.5">Generated presentation</p>
                </div>
              </div>
            </div>
          </div>

          {/* Storage */}
          <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-[14px] font-black text-stone-900">Storage</h2>
              <span className="text-[10px] text-stone-500 font-medium">6.8 GB of 20 GB used</span>
            </div>
            <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#C07050] rounded-full w-[34%]"></div>
            </div>
          </div>

          {/* Quick Filters */}
          <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-sm">
            <h2 className="text-[14px] font-black text-stone-900 mb-4">Quick filters</h2>
            <div className="space-y-1">
              <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-[#FDF3F0] text-[#A35E47] transition-colors">
                <div className="flex items-center gap-3">
                  <Users className="h-4 w-4" />
                  <span className="text-[12px] font-bold">My projects</span>
                </div>
                <span className="text-[10px] font-bold text-[#A35E47]">12</span>
              </button>
              <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-stone-600 hover:bg-stone-50 transition-colors">
                <div className="flex items-center gap-3">
                  <Users className="h-4 w-4 text-stone-400" />
                  <span className="text-[12px] font-medium text-stone-700">Shared with me</span>
                </div>
                <span className="text-[10px] font-medium text-stone-400">0</span>
              </button>
              <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-stone-600 hover:bg-stone-50 transition-colors">
                <div className="flex items-center gap-3">
                  <Star className="h-4 w-4 text-stone-400" />
                  <span className="text-[12px] font-medium text-stone-700">Favorites</span>
                </div>
                <span className="text-[10px] font-medium text-stone-400">3</span>
              </button>
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
