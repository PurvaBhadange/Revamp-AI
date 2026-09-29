"use client";

import React from 'react';
import { 
  Users, Target, FileText, Globe, SlidersHorizontal, Layers,
  Edit2, Check, ArrowRight, ArrowLeft, Presentation, CheckCircle2,
  Info
} from 'lucide-react';

import { useWizardStore } from '@/stores/transformationWizardStore';
import { transformationsApi } from '@/lib/api/transformations';

interface ReviewTransformationPageProps {
  onNavigate: (route: string) => void;
}

export function ReviewTransformationPage({ onNavigate }: ReviewTransformationPageProps) {
  const {
    projectId,
    ingestedDocument,
    targetAudience,
    tone,
    objective,
    urgencyLevel,
    language,
    selectedOutputs
  } = useWizardStore();

  return (
    <div className="min-h-full bg-[#F8F7F5] font-sans px-10 py-12">
      <div className="max-w-[1200px] mx-auto">
        
        {/* HEADER */}
        <div className="flex justify-between items-start mb-12">
          <div>
            <p className="text-[10px] font-bold tracking-[0.2em] text-[#C07050] uppercase mb-2">New Transformation</p>
            <h1 className="text-[44px] font-black text-stone-950 tracking-tight leading-none mb-3">Review Transformation</h1>
            <p className="text-[15px] text-stone-500 font-medium">Check your transformation plan before generation.</p>
          </div>

          {/* STEPPER */}
          <div className="flex items-center gap-3 mt-4">
            {/* Step 1 - Completed */}
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-full border border-[#C07050] text-[#C07050] flex items-center justify-center">
                <Check className="h-5 w-5" strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-[12px] font-bold text-stone-900 leading-tight">Source</p>
                <p className="text-[10px] text-stone-500 leading-tight mt-0.5">Upload or add source</p>
              </div>
            </div>
            <div className="w-10 h-px bg-stone-300 mx-1"></div>
            {/* Step 2 - Completed */}
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-full border border-[#C07050] text-[#C07050] flex items-center justify-center">
                <Check className="h-5 w-5" strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-[12px] font-bold text-stone-900 leading-tight">Configure</p>
                <p className="text-[10px] text-stone-500 leading-tight mt-0.5">Set audience and outputs</p>
              </div>
            </div>
            <div className="w-10 h-px bg-stone-300 mx-1"></div>
            {/* Step 3 - Active */}
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-full bg-[#9E573F] text-white flex items-center justify-center text-[11px] font-bold shrink-0 shadow-sm">03</div>
              <div>
                <p className="text-[12px] font-bold text-stone-900 leading-tight">Review</p>
                <p className="text-[10px] text-stone-500 leading-tight mt-0.5">Check and refine</p>
              </div>
            </div>
            <div className="w-10 h-px bg-stone-300 mx-1 opacity-60"></div>
            {/* Step 4 - Inactive */}
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
        <div className="grid grid-cols-[1fr_440px] gap-12">
          
          {/* LEFT COLUMN */}
          <div>
            
            {/* Transformation Brief Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[19px] font-black text-stone-900">Transformation brief</h2>
              <button 
                onClick={() => onNavigate('/transform/2')}
                className="flex items-center gap-1.5 text-[12px] font-semibold text-[#A35E47] hover:text-[#8B4A2F] transition-colors"
              >
                <Edit2 className="h-3.5 w-3.5" strokeWidth={2} /> Edit configuration
              </button>
            </div>
            
            {/* Brief Card */}
            <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-6 mb-8">
              {/* Document Source */}
              <div className="flex gap-5 mb-8">
                {/* Mini Document */}
                <div className="w-[100px] h-[130px] bg-white border border-stone-200 shadow-sm rounded flex flex-col shrink-0 overflow-hidden relative">
                  <div className="p-2 flex-1">
                    <p className="text-[8px] font-bold text-stone-900 leading-tight mb-1">Q3 Product Strategy Report</p>
                    <div className="w-3/4 h-[2px] bg-stone-200 mb-0.5 rounded"></div>
                    <div className="w-full h-[2px] bg-stone-100 mb-0.5 rounded"></div>
                    <div className="w-5/6 h-[2px] bg-stone-100 rounded"></div>
                  </div>
                  <div className="h-[55px] bg-cover bg-center filter grayscale" style={{ backgroundImage: `url('/architecture.jpg')` }} />
                  <div className="h-[20px] bg-white border-t border-stone-100 flex items-center px-2 gap-[2px]">
                    <div className="w-[8px] h-[1px] bg-stone-300 rounded"></div>
                    <div className="w-[6px] h-[1px] bg-stone-300 rounded"></div>
                  </div>
                </div>

                {/* Details */}
                <div className="flex-1 pt-1">
                  <p className="text-[10px] font-bold text-stone-900 mb-1">Source document</p>
                  <h3 className="text-[17px] font-black text-stone-900 leading-tight mb-2">Q3 Product Strategy Report</h3>
                  <div className="flex items-center gap-2 text-[11px] text-stone-500 font-medium mb-4">
                    <FileText className="h-3.5 w-3.5" /> PDF · 18 pages · 4.2 MB
                  </div>
                  <p className="text-[11px] text-stone-500 leading-relaxed max-w-sm">
                    Quarterly strategy report covering product performance, market analysis, key initiatives and roadmap for Q4. Includes competitive landscape and growth opportunities.
                  </p>
                </div>
              </div>

              <div className="w-full h-px bg-stone-100 mb-6"></div>

              {/* Metadata Grid */}
              <div className="grid grid-cols-2 gap-y-6 gap-x-8">
                <div className="flex gap-3">
                  <Users className="h-5 w-5 text-[#C07050] shrink-0" strokeWidth={1.5} />
                  <div>
                    <p className="text-[11px] font-bold text-stone-900">Target audience</p>
                    <p className="text-[11px] text-stone-500 mt-0.5">Industry Professionals</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Target className="h-5 w-5 text-[#C07050] shrink-0" strokeWidth={1.5} />
                  <div>
                    <p className="text-[11px] font-bold text-stone-900">Communication objective</p>
                    <p className="text-[11px] text-stone-500 mt-0.5">Inform / Educate</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <FileText className="h-5 w-5 text-[#C07050] shrink-0" strokeWidth={1.5} />
                  <div>
                    <p className="text-[11px] font-bold text-stone-900">Tone and style</p>
                    <p className="text-[11px] text-stone-500 mt-0.5">Professional</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Globe className="h-5 w-5 text-[#C07050] shrink-0" strokeWidth={1.5} />
                  <div>
                    <p className="text-[11px] font-bold text-stone-900">Language</p>
                    <p className="text-[11px] text-stone-500 mt-0.5">English</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <SlidersHorizontal className="h-5 w-5 text-[#C07050] shrink-0" strokeWidth={1.5} />
                  <div>
                    <p className="text-[11px] font-bold text-stone-900">Level of detail</p>
                    <p className="text-[11px] text-stone-500 mt-0.5">Concise</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Layers className="h-5 w-5 text-[#C07050] shrink-0" strokeWidth={1.5} />
                  <div>
                    <p className="text-[11px] font-bold text-stone-900">Output formats</p>
                    <p className="text-[11px] text-stone-500 mt-0.5">3 selected</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Selected Outputs Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[15px] font-black text-stone-900">Selected outputs</h2>
              <button 
                onClick={() => onNavigate('/transform/2')}
                className="text-[12px] font-semibold text-[#A35E47] hover:text-[#8B4A2F] transition-colors"
              >
                Edit outputs
              </button>
            </div>

            {/* Outputs Grid */}
            <div className="grid grid-cols-3 gap-3 mb-10">
              {/* Output 1 */}
              <div className="bg-white rounded-xl border border-stone-200 p-3 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="h-7 w-7 rounded-lg bg-[#FAF6F4] flex items-center justify-center shrink-0">
                    <FileText className="h-3.5 w-3.5 text-[#A35E47]" strokeWidth={2} />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-stone-900 leading-tight">Executive Summary</p>
                    <p className="text-[9px] text-stone-500 mt-0.5">PDF / DOCX</p>
                  </div>
                </div>
                <div className="h-[14px] w-[14px] rounded-full bg-[#9E573F] flex items-center justify-center shrink-0">
                  <Check className="h-2 w-2 text-white" strokeWidth={3} />
                </div>
              </div>
              {/* Output 2 */}
              <div className="bg-white rounded-xl border border-stone-200 p-3 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="h-7 w-7 rounded-lg bg-[#FAF6F4] flex items-center justify-center shrink-0">
                    <Presentation className="h-3.5 w-3.5 text-[#A35E47]" strokeWidth={2} />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-stone-900 leading-tight">Presentation</p>
                    <p className="text-[9px] text-stone-500 mt-0.5">PPTX</p>
                  </div>
                </div>
                <div className="h-[14px] w-[14px] rounded-full bg-[#9E573F] flex items-center justify-center shrink-0">
                  <Check className="h-2 w-2 text-white" strokeWidth={3} />
                </div>
              </div>
              {/* Output 3 */}
              <div className="bg-white rounded-xl border border-stone-200 p-3 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="h-7 w-7 rounded-lg bg-[#F2F6FA] flex items-center justify-center shrink-0">
                    <div className="h-3.5 w-3.5 bg-[#0A66C2] rounded-sm flex items-center justify-center">
                      <span className="text-[8px] font-black text-white leading-none">in</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-stone-900 leading-tight">LinkedIn Post</p>
                    <p className="text-[9px] text-stone-500 mt-0.5">Social Media</p>
                  </div>
                </div>
                <div className="h-[14px] w-[14px] rounded-full bg-[#9E573F] flex items-center justify-center shrink-0">
                  <Check className="h-2 w-2 text-white" strokeWidth={3} />
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN */}
          <div>
            
            <div className="mb-4">
              <h2 className="text-[19px] font-black text-stone-900 mb-1">Output plan</h2>
              <p className="text-[13px] text-stone-500">Here's what REVAMP AI will generate for you.</p>
            </div>

            {/* Plan Cards */}
            <div className="space-y-3 mb-10">
              
              {/* Card 1 */}
              {selectedOutputs.includes('executive_brief') && (
                <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-4 flex gap-4">
                  <div className="w-[80px] h-[60px] border border-stone-200 bg-stone-50 rounded overflow-hidden flex flex-col p-1.5 shrink-0">
                    <div className="w-1/2 h-1 bg-stone-300 rounded-sm mb-1.5"></div>
                    <div className="w-full h-0.5 bg-stone-200 mb-0.5"></div>
                    <div className="w-full h-0.5 bg-stone-200 mb-0.5"></div>
                    <div className="w-4/5 h-0.5 bg-stone-200 mb-1.5"></div>
                    <div className="w-full h-0.5 bg-stone-200 mb-0.5"></div>
                    <div className="w-full h-0.5 bg-stone-200 mb-0.5"></div>
                    <div className="w-5/6 h-0.5 bg-stone-200"></div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="text-[13px] font-bold text-stone-900 leading-tight">Executive Summary</h3>
                      <div className="flex items-center gap-1 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="h-3 w-3 text-green-600" />
                        <span className="text-[9px] font-bold text-green-700">Ready</span>
                      </div>
                    </div>
                    <p className="text-[11px] text-stone-500 leading-tight mb-2 pr-6">
                      A concise executive summary highlighting key insights, findings and recommendations.
                    </p>
                    <p className="text-[10px] text-stone-400 font-medium flex items-center gap-1.5">
                      <FileText className="h-3 w-3" /> PDF / DOCX <span className="mx-0.5">•</span> 2–4 pages
                    </p>
                  </div>
                </div>
              )}

              {/* Card 2 */}
              {selectedOutputs.includes('presentation') && (
                <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-4 flex gap-4">
                  <div className="w-[80px] h-[60px] border border-stone-200 bg-white rounded overflow-hidden relative shrink-0 p-1.5">
                    <div className="w-2/3 h-1 bg-stone-900 mb-1"></div>
                    <div className="w-1/3 h-0.5 bg-stone-400 mb-2"></div>
                    <div className="absolute bottom-1 right-1 flex items-end gap-[2px]">
                      <div className="w-[6px] h-[10px] bg-[#C07050]"></div>
                      <div className="w-[6px] h-[16px] bg-[#C07050]"></div>
                      <div className="w-[6px] h-[12px] bg-[#C07050]"></div>
                      <div className="w-[6px] h-[22px] bg-[#8B4A2F]"></div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="text-[13px] font-bold text-stone-900 leading-tight">Presentation</h3>
                      <div className="flex items-center gap-1 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="h-3 w-3 text-green-600" />
                        <span className="text-[9px] font-bold text-green-700">Ready</span>
                      </div>
                    </div>
                    <p className="text-[11px] text-stone-500 leading-tight mb-2 pr-6">
                      A clean, professional presentation with key insights, visuals and takeaways.
                    </p>
                    <p className="text-[10px] text-stone-400 font-medium flex items-center gap-1.5">
                      <Presentation className="h-3 w-3" /> PPTX <span className="mx-0.5">•</span> 10–12 slides
                    </p>
                  </div>
                </div>
              )}

              {/* Card 3 */}
              {selectedOutputs.includes('social') && (
                <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-4 flex gap-4">
                  <div className="w-[80px] h-[60px] border border-stone-200 bg-white rounded overflow-hidden shrink-0 relative p-1.5 flex flex-col">
                    <div className="flex items-center gap-1 mb-1.5">
                      <div className="h-3 w-3 bg-[#0A66C2] rounded-[2px] flex items-center justify-center">
                        <span className="text-[6px] font-black text-white">in</span>
                      </div>
                      <div className="w-1/2 h-1 bg-stone-300 rounded-sm"></div>
                    </div>
                    <div className="w-full h-0.5 bg-stone-200 mb-0.5"></div>
                    <div className="w-full h-0.5 bg-stone-200 mb-0.5"></div>
                    <div className="w-3/4 h-0.5 bg-stone-200 mb-1"></div>
                    <div className="absolute bottom-0 left-0 right-0 h-4 bg-stone-100 border-t border-stone-200" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="text-[13px] font-bold text-stone-900 leading-tight">LinkedIn Post</h3>
                      <div className="flex items-center gap-1 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="h-3 w-3 text-green-600" />
                        <span className="text-[9px] font-bold text-green-700">Ready</span>
                      </div>
                    </div>
                    <p className="text-[11px] text-stone-500 leading-tight mb-2 pr-6">
                      A short, engaging post tailored for professional audiences on LinkedIn.
                    </p>
                    <div className="text-[10px] text-stone-400 font-medium flex items-center gap-1.5">
                      <div className="h-3 w-3 bg-[#0A66C2] rounded-[2px] flex items-center justify-center">
                        <span className="text-[6px] font-black text-white">in</span>
                      </div> 
                      Social Media <span className="mx-0.5">•</span> ~1,100 characters
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* AI Process */}
            <h2 className="text-[15px] font-black text-stone-900 mb-4">What REVAMP AI will do</h2>
            <div className="flex justify-between relative">
              
              <div className="flex flex-col w-[22%] z-10">
                <div className="h-6 w-6 rounded-full border border-[#C07050] text-[#C07050] flex items-center justify-center text-[9px] font-bold mb-2 bg-[#F8F7F5]">01</div>
                <h4 className="text-[10px] font-bold text-stone-900 mb-1">Extract key facts</h4>
                <p className="text-[9px] text-stone-500 leading-tight">Identify the most important information from your source.</p>
              </div>

              <div className="absolute top-3 left-[15%] right-[85%] border-t border-stone-200 z-0"></div>
              <ArrowRight className="absolute top-[8px] left-[20%] h-3 w-3 text-stone-300" strokeWidth={1.5} />

              <div className="flex flex-col w-[22%] z-10">
                <div className="h-6 w-6 rounded-full border border-[#C07050] text-[#C07050] flex items-center justify-center text-[9px] font-bold mb-2 bg-[#F8F7F5]">02</div>
                <h4 className="text-[10px] font-bold text-stone-900 mb-1">Adapt messaging</h4>
                <p className="text-[9px] text-stone-500 leading-tight">Tailor the content to your audience, objective and tone.</p>
              </div>

              <div className="absolute top-3 left-[40%] right-[60%] border-t border-stone-200 z-0"></div>
              <ArrowRight className="absolute top-[8px] left-[45%] h-3 w-3 text-stone-300" strokeWidth={1.5} />

              <div className="flex flex-col w-[22%] z-10">
                <div className="h-6 w-6 rounded-full border border-[#C07050] text-[#C07050] flex items-center justify-center text-[9px] font-bold mb-2 bg-[#F8F7F5]">03</div>
                <h4 className="text-[10px] font-bold text-stone-900 mb-1">Structure each format</h4>
                <p className="text-[9px] text-stone-500 leading-tight">Organize and format content for the selected outputs.</p>
              </div>

              <div className="absolute top-3 left-[65%] right-[35%] border-t border-stone-200 z-0"></div>
              <ArrowRight className="absolute top-[8px] left-[70%] h-3 w-3 text-stone-300" strokeWidth={1.5} />

              <div className="flex flex-col w-[22%] z-10">
                <div className="h-6 w-6 rounded-full border border-[#C07050] text-[#C07050] flex items-center justify-center text-[9px] font-bold mb-2 bg-[#F8F7F5]">04</div>
                <h4 className="text-[10px] font-bold text-stone-900 mb-1">Prepare editable outputs</h4>
                <p className="text-[9px] text-stone-500 leading-tight">Generate high-quality, ready-to-use content you can refine.</p>
              </div>
            </div>

          </div>
        </div>

        {/* BOTTOM ACTION BAR */}
        <div className="flex items-center justify-between mt-12 pt-6 pb-12 border-t border-stone-200">
          <button 
            onClick={() => onNavigate('/transform/2')}
            className="flex items-center gap-2 bg-white border border-stone-300 text-stone-700 font-semibold text-[14px] px-5 py-2.5 rounded-lg hover:bg-stone-50 transition-all shadow-sm"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5 text-[11px] text-stone-500 mr-4">
              <Info className="h-3.5 w-3.5" />
              You can edit or regenerate outputs after generation.
            </div>
            <button className="text-[13px] font-bold text-stone-900 hover:text-stone-700 underline underline-offset-4 transition-colors">
              Save as draft
            </button>
            <button 
              onClick={async () => {
                try {
                  const data = await transformationsApi.create({
                    project_id: projectId || 'proj_01',
                    source_document_ids: ingestedDocument?.id ? [ingestedDocument.id] : ['doc_default_01'],
                    target_audience: targetAudience,
                    tone: tone,
                    objective: objective,
                    urgency_level: urgencyLevel,
                    language: language,
                    output_formats: selectedOutputs
                  });
                  onNavigate(`/jobs/${data.transformation_id}`);
                } catch (e) {
                  console.error("Failed to start transformation:", e);
                }
              }}
              className="flex items-center gap-2 bg-[#9E573F] hover:bg-[#8B4A2F] text-white font-semibold text-[14px] px-6 py-3 rounded-lg transition-all shadow-sm"
            >
              Start Transformation <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Scroll Spacer */}
        <div className="h-12 w-full shrink-0"></div>

      </div>
    </div>
  );
}
