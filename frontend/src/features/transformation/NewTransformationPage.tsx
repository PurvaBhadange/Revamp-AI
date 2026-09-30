"use client";

import React, { useState, useRef } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { useWizardStore } from '@/stores/transformationWizardStore';
import { ingestionApi } from '@/lib/api/ingestion';
import { 
  FileUp, FileText, Link as LinkIcon, Clock, Calendar, 
  File, Scale, Files, RefreshCw, Trash2, ArrowRight, Loader2, Check
} from 'lucide-react';

interface NewTransformationPageProps {
  onNavigate: (route: string) => void;
}

export function NewTransformationPage({ onNavigate }: NewTransformationPageProps) {
  const [context, setContext] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { setIngestedDocument, ingestedDocument } = useWizardStore();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      // using a default demo project_id for now
      const doc = await ingestionApi.uploadFile('proj_01', file);
      setIngestedDocument(doc);
    } catch (e) {
      console.error('Failed to upload file', e);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-full bg-[#F8F7F5] font-sans px-4 md:px-10 py-6 md:py-12">
      <div className="max-w-[1200px] mx-auto">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-8 md:mb-12">
          <div>
            <p className="text-[10px] font-bold tracking-[0.2em] text-[#C07050] uppercase mb-2">New Transformation</p>
            <h1 className="text-3xl md:text-[44px] font-black text-stone-950 tracking-tight leading-none mb-3">New Transformation</h1>
            <p className="text-[13px] md:text-[15px] text-stone-500 font-medium">Turn your content into professional outputs.</p>
          </div>

          {/* DESKTOP STEPPER */}
          <div className="hidden md:flex items-center gap-3 mt-4">
            {/* Step 1 */}
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-full bg-[#9E573F] text-white flex items-center justify-center text-[11px] font-bold shrink-0 shadow-sm">01</div>
              <div>
                <p className="text-[12px] font-bold text-stone-900 leading-tight">Source</p>
                <p className="text-[10px] text-stone-500 leading-tight mt-0.5">Upload or add source</p>
              </div>
            </div>
            <div className="w-10 h-px bg-stone-300 mx-1"></div>
            {/* Step 2 */}
            <div className="flex items-center gap-2.5 opacity-60">
              <div className="h-9 w-9 rounded-full border border-stone-300 bg-white text-stone-500 flex items-center justify-center text-[11px] font-bold shrink-0">02</div>
              <div>
                <p className="text-[12px] font-bold text-stone-600 leading-tight">Configure</p>
                <p className="text-[10px] text-stone-400 leading-tight mt-0.5">Set audience and outputs</p>
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

        {/* MOBILE STEPPER */}
        <div className="flex md:hidden items-center justify-center mb-8 w-full max-w-xs mx-auto">
          <div className="flex flex-col items-center gap-1">
            <div className="h-7 w-7 rounded-full bg-[#9E573F] text-white flex items-center justify-center text-[10px] font-bold shadow-sm">1</div>
            <span className="text-[10px] font-bold text-stone-900">Source</span>
          </div>
          <div className="flex-1 h-px bg-stone-300 mx-2 -mt-4"></div>
          <div className="flex flex-col items-center gap-1 opacity-50">
            <div className="h-7 w-7 rounded-full border border-stone-300 bg-white text-stone-500 flex items-center justify-center text-[10px] font-bold">2</div>
            <span className="text-[10px] font-bold text-stone-500">Settings</span>
          </div>
          <div className="flex-1 h-px bg-stone-300 mx-2 -mt-4 opacity-50"></div>
          <div className="flex flex-col items-center gap-1 opacity-50">
            <div className="h-7 w-7 rounded-full border border-stone-300 bg-white text-stone-500 flex items-center justify-center text-[10px] font-bold">3</div>
            <span className="text-[10px] font-bold text-stone-500">Outputs</span>
          </div>
        </div>

        {/* MAIN SPLIT */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8 md:gap-12">
          
          {/* LEFT COLUMN */}
          <div>
            {/* Section 1 */}
            <div className="flex items-end justify-between mb-4">
              <div>
                <h2 className="text-[19px] font-black text-stone-900 mb-1">1. Add your source</h2>
                <p className="text-[13px] text-stone-500">Upload a document, paste text, or add a link to get started.</p>
              </div>
              <button className="flex items-center gap-1.5 text-[12px] font-semibold text-stone-700 hover:text-stone-900 transition-colors pb-1">
                <Clock className="h-3.5 w-3.5" strokeWidth={2.5} /> Browse recent sources
              </button>
            </div>

            {/* Upload Box */}
            <div className="border border-dashed border-stone-300 bg-[#FDFCFB] rounded-xl p-10 flex flex-col items-center justify-center mb-10 shadow-sm relative overflow-hidden">
              <div className="h-16 w-14 border-[2px] border-stone-800 rounded-lg flex items-center justify-center mb-5 bg-white relative">
                <FileUp className="h-6 w-6 text-stone-800" strokeWidth={2} />
                <div className="absolute right-0 top-0 w-4 h-4 bg-[#FDFCFB] -mt-[2px] -mr-[2px] border-l-[2px] border-b-[2px] border-stone-800" style={{ borderBottomLeftRadius: '6px' }} />
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-2">Start with your source</h3>
              <p className="text-[14px] text-stone-500 mb-8">Upload a document, paste text, or add a source link.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full mb-8">
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileUpload} 
                  className="hidden" 
                />
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="w-full flex items-center justify-center gap-2 bg-[#FDEEEB] border border-[#F5D8D0] hover:bg-[#F5D8D0] text-[#9E573F] font-semibold text-[13px] py-4 rounded-lg transition-all shadow-sm flex-col"
                >
                  {isUploading ? <Loader2 className="h-5 w-5 animate-spin" /> : <FileUp className="h-5 w-5" />} 
                  {isUploading ? 'Uploading...' : 'Upload'}
                </button>
                <button 
                  onClick={async () => {
                    const text = prompt("Paste text:");
                    if (text) {
                      setIsUploading(true);
                      try {
                        const doc = await ingestionApi.ingestText('proj_01', 'Pasted Text', text);
                        setIngestedDocument(doc);
                      } catch (e) {
                        console.error('Failed to paste text', e);
                      } finally {
                        setIsUploading(false);
                      }
                    }
                  }}
                  disabled={isUploading}
                  className="w-full flex items-center justify-center gap-2 bg-white hover:bg-stone-50 border border-stone-300 text-stone-700 font-semibold text-[13px] py-4 rounded-lg transition-all flex-col"
                >
                  <FileText className="h-5 w-5" /> Paste text
                </button>
                <button 
                  onClick={async () => {
                    const url = prompt("Enter URL:");
                    if (url) {
                      setIsUploading(true);
                      try {
                        const doc = await ingestionApi.ingestUrl('proj_01', url);
                        setIngestedDocument(doc);
                      } catch (e) {
                        console.error('Failed to add URL', e);
                      } finally {
                        setIsUploading(false);
                      }
                    }
                  }}
                  disabled={isUploading}
                  className="w-full flex items-center justify-center gap-2 bg-white hover:bg-stone-50 border border-stone-300 text-stone-700 font-semibold text-[13px] py-4 rounded-lg transition-all flex-col"
                >
                  <LinkIcon className="h-5 w-5" /> Add URL
                </button>
              </div>

              <div className="w-full max-w-lg relative flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-stone-200"></div>
                </div>
                <div className="relative bg-[#FDFCFB] px-3 text-[11px] text-stone-400 font-medium">Supported formats</div>
              </div>
              <p className="text-[11px] text-stone-400 mt-3 font-medium">PDF, DOCX, TXT, MD, JPG, PNG, MP4, MOV, WAV and more</p>
            </div>

            {/* Section 2 */}
            <div className="mb-4">
              <h2 className="text-[19px] font-black text-stone-900 mb-1">2. What are you transforming?</h2>
              <p className="text-[13px] text-stone-500">Add optional context to help REVAMP AI understand your source and generate better outputs.</p>
            </div>
            
            <div className="relative mb-8">
              <textarea 
                className="w-full h-24 p-4 rounded-xl border border-stone-200 bg-white text-[13px] text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#C07050]/20 focus:border-[#C07050] transition-all resize-none shadow-sm"
                placeholder="E.g. This is our quarterly product strategy report. Create a concise executive summary and a LinkedIn post targeting industry professionals."
                value={context}
                onChange={(e) => setContext(e.target.value)}
              />
              <span className="absolute bottom-3 right-4 text-[11px] text-stone-400 font-medium">
                {context.length}/500
              </span>
            </div>

          </div>

          {/* RIGHT COLUMN */}
          <div>
            <div className="mb-4">
              <h2 className="text-[19px] font-black text-stone-900 mb-1">Source preview</h2>
              <p className="text-[13px] text-stone-500">Review your source before continuing.</p>
            </div>

            {/* Preview Card */}
            {!ingestedDocument ? (
              <div className="bg-white border border-stone-200 rounded-xl shadow-sm p-10 mb-8 flex flex-col items-center justify-center text-center">
                <File className="h-10 w-10 text-stone-300 mb-4" strokeWidth={1.5} />
                <h3 className="text-[15px] font-bold text-stone-900 mb-1">No source added</h3>
                <p className="text-[12px] text-stone-500">Upload a file or add a link to see the preview here.</p>
              </div>
            ) : (
              <div className="bg-white border border-stone-200 rounded-xl shadow-sm p-6 mb-8">
                <div className="flex gap-5 mb-5">
                  {/* Mini Document */}
                  <div className="w-[100px] h-[130px] bg-white border border-stone-200 shadow-sm rounded flex flex-col shrink-0 overflow-hidden relative">
                    <div className="p-2 flex-1">
                      <p className="text-[8px] font-bold text-stone-900 leading-tight mb-1 truncate">{ingestedDocument.title}</p>
                      <div className="w-3/4 h-[2px] bg-stone-200 mb-0.5 rounded"></div>
                      <div className="w-full h-[2px] bg-stone-100 mb-0.5 rounded"></div>
                      <div className="w-5/6 h-[2px] bg-stone-100 rounded"></div>
                    </div>
                    <div className="h-[20px] bg-white border-t border-stone-100 flex items-center px-2 gap-[2px]">
                      <div className="w-[8px] h-[1px] bg-stone-300 rounded"></div>
                      <div className="w-[6px] h-[1px] bg-stone-300 rounded"></div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="flex-1 pt-1">
                    <p className="text-[8px] font-bold tracking-[0.2em] text-[#C07050] uppercase mb-1.5">Document</p>
                    <h3 className="text-[17px] font-black text-stone-900 leading-tight mb-1.5 break-all">{ingestedDocument.title}</h3>
                    <p className="text-[11px] text-stone-500 font-medium uppercase">{ingestedDocument.source_type}</p>
                  </div>
                </div>

                <div className="w-full h-px bg-stone-100 mb-5"></div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-2 text-stone-500 font-medium">
                      <Calendar className="h-3.5 w-3.5" /> Uploaded
                    </div>
                    <span className="text-stone-900 font-medium">Just now</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-2 text-stone-500 font-medium">
                      <File className="h-3.5 w-3.5" /> File type
                    </div>
                    <span className="text-stone-900 font-medium uppercase">{ingestedDocument.source_type}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-2 text-stone-500 font-medium">
                      <Check className="h-3.5 w-3.5" /> Status
                    </div>
                    <span className="text-green-600 font-bold uppercase">{ingestedDocument.status}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-1.5 text-[11px] font-semibold text-stone-700 bg-white border border-stone-200 px-3 py-1.5 rounded hover:bg-stone-50 transition-colors shadow-sm">
                    <RefreshCw className="h-3 w-3" /> Replace
                  </button>
                  <button onClick={() => setIngestedDocument(null)} className="flex items-center gap-1.5 text-[11px] font-semibold text-red-500 hover:text-red-700 transition-colors px-2">
                    <Trash2 className="h-3 w-3" /> Remove
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* BOTTOM ACTION BAR */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-between sm:justify-end gap-4 sm:gap-6 mt-8 sm:mt-10 pt-6 border-t border-stone-200 pb-12">
          <button className="text-[13px] font-semibold text-stone-700 hover:text-stone-900 underline underline-offset-4 transition-colors">
            Save as draft
          </button>
          <button 
            onClick={() => onNavigate('/transform/2')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#9E573F] hover:bg-[#8B4A2F] text-white font-semibold text-[14px] px-6 py-3.5 rounded-lg transition-all shadow-sm"
          >
            Continue <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Scroll Spacer */}
        <div className="h-12 w-full shrink-0"></div>

      </div>
    </div>
  );
}
