import React, { useState } from 'react';
import { useWizardStore, WizardStage } from '@/stores/transformationWizardStore';
import { useUIStore } from '@/stores/uiStore';
import { ingestionApi } from '@/lib/api/ingestion';
import { transformationsApi } from '@/lib/api/transformations';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { FileUploader } from '@/components/common/FileUploader';
import { OutputFormat, TargetAudience, Tone, Objective, UrgencyLevel } from '@/types/transformation';
import {
  FileText,
  Globe,
  AlignLeft,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Settings,
  Sliders,
  Sparkles,
  Zap,
  Shield,
  FileCheck,
  Video,
  Presentation,
  Share2,
  PieChart,
  FileDown
} from 'lucide-react';

interface NewTransformationPageProps {
  onNavigate?: (route: string) => void;
}

export function NewTransformationPage({ onNavigate }: NewTransformationPageProps) {
  const navigate = onNavigate || ((route: string) => {
    window.history.pushState({}, '', route);
    window.dispatchEvent(new Event('popstate'));
  });
  const {
    currentStage,
    projectId,
    sourceType,
    ingestedDocument,
    extractedText,
    targetAudience,
    tone,
    objective,
    urgencyLevel,
    language,
    selectedOutputs,
    setStage,
    setSourceType,
    setIngestedDocument,
    setExtractedText,
    setTargetAudience,
    setTone,
    setObjective,
    setUrgencyLevel,
    setLanguage,
    toggleOutput,
  } = useWizardStore();

  const { addNotification } = useUIStore();

  const [isUploading, setIsUploading] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [textInput, setTextInput] = useState('');
  const [textTitle, setTextTitle] = useState('Cybersecurity Intelligence Feed');

  // Stage 1: File / URL / Text Handlers
  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    try {
      const res = await ingestionApi.uploadFile(projectId, file);
      setIngestedDocument(res);
      addNotification({ type: 'success', title: 'Document Ingested', message: `Successfully parsed ${file.name}` });
      setStage('inspect');
    } catch (err: any) {
      addNotification({ type: 'error', title: 'Ingestion Failed', message: err.message });
    } finally {
      setIsUploading(false);
    }
  };

  const handleUrlSubmit = async () => {
    if (!urlInput) return;
    setIsUploading(true);
    try {
      const res = await ingestionApi.ingestUrl(projectId, urlInput);
      setIngestedDocument(res);
      addNotification({ type: 'success', title: 'URL Ingested', message: `Parsed webpage content` });
      setStage('inspect');
    } catch (err: any) {
      addNotification({ type: 'error', title: 'URL Fetch Failed', message: err.message });
    } finally {
      setIsUploading(false);
    }
  };

  const handleTextSubmit = async () => {
    if (!textInput) return;
    setIsUploading(true);
    try {
      const res = await ingestionApi.ingestText(projectId, textTitle, textInput);
      setIngestedDocument(res);
      setExtractedText(textInput);
      addNotification({ type: 'success', title: 'Text Ingested', message: 'Raw text normalized successfully' });
      setStage('inspect');
    } catch (err: any) {
      addNotification({ type: 'error', title: 'Text Ingestion Failed', message: err.message });
    } finally {
      setIsUploading(false);
    }
  };

  // Stage 5: Final Submission Handler
  const handleCreateTransformation = async () => {
    if (!ingestedDocument) {
      addNotification({ type: 'error', title: 'Missing Source', message: 'Please ingest a source document first' });
      setStage('source');
      return;
    }

    setIsUploading(true);
    try {
      const res = await transformationsApi.create({
        project_id: projectId,
        source_document_ids: [ingestedDocument.source_document_id],
        target_audience: targetAudience,
        tone: tone,
        objective: objective,
        urgency_level: urgencyLevel,
        language: language,
        output_formats: selectedOutputs,
      });

      addNotification({ type: 'success', title: 'Transformation Job Enqueued', message: `Job #${res.job_id.substring(0, 8)} created` });
      navigate(`/jobs/${res.job_id}`);
    } catch (err: any) {
      addNotification({ type: 'error', title: 'Transformation Failed', message: err.message });
    } finally {
      setIsUploading(false);
    }
  };

  const stages: { id: WizardStage; label: string; number: string }[] = [
    { id: 'source', label: 'Source Input', number: '01' },
    { id: 'inspect', label: 'Inspect', number: '02' },
    { id: 'configure', label: 'Configure', number: '03' },
    { id: 'outputs', label: 'Select Outputs', number: '04' },
    { id: 'summary', label: 'Generate', number: '05' },
  ];

  const availableOutputs: { id: OutputFormat; title: string; desc: string; icon: any }[] = [
    { id: 'executive_brief', title: 'Executive Brief', desc: 'CISO / Board high-level risk & impact report', icon: Shield },
    { id: 'advisory', title: 'Security Advisory', desc: 'Technical advisory with IoCs & mitigation PDF', icon: FileCheck },
    { id: 'social', title: 'Social Campaign', desc: 'Formatted LinkedIn post & Twitter/X thread', icon: Share2 },
    { id: 'presentation', title: 'Presentation Deck', desc: 'Structured slides downloadable as editable PPTX', icon: Presentation },
    { id: 'infographic', title: 'Infographic Data', desc: 'Interactive charts, metrics & vector SVG', icon: PieChart },
    { id: 'video', title: 'Video Package', desc: 'Script, TTS narration audio MP3, SRT & ZIP', icon: Video },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Wizard Progress Header */}
      <div className="flex items-center justify-between p-3 rounded-lg border border-dark-800 bg-dark-900">
        {stages.map((st, idx) => {
          const isActive = currentStage === st.id;
          const isDone = stages.findIndex((s) => s.id === currentStage) > idx;

          return (
            <React.Fragment key={st.id}>
              <div
                onClick={() => isDone && setStage(st.id)}
                className={`flex items-center space-x-2 cursor-pointer ${
                  isActive
                    ? 'text-blue-400 font-bold'
                    : isDone
                    ? 'text-emerald-400 font-semibold'
                    : 'text-slate-500'
                }`}
              >
                <div
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-mono border ${
                    isActive
                      ? 'border-blue-500 bg-blue-950 text-blue-400'
                      : isDone
                      ? 'border-emerald-500 bg-emerald-950 text-emerald-400'
                      : 'border-dark-700 bg-dark-800 text-slate-500'
                  }`}
                >
                  {isDone ? <CheckCircle2 className="h-3.5 w-3.5" /> : st.number}
                </div>
                <span className="text-xs uppercase tracking-wider hidden md:inline">{st.label}</span>
              </div>
              {idx < stages.length - 1 && <div className="h-px w-8 bg-dark-800 hidden sm:block" />}
            </React.Fragment>
          );
        })}
      </div>

      {/* STAGE 01: SOURCE INPUT */}
      {currentStage === 'source' && (
        <Card>
          <CardHeader>
            <CardTitle>Stage 01: Ingest Intelligence Source</CardTitle>
            <CardDescription>Select source type to ingest threat data or report material</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Input Type Selector Tabs */}
            <div className="flex space-x-2 border-b border-dark-800 pb-3">
              <button
                onClick={() => setSourceType('file')}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-xs font-semibold ${
                  sourceType === 'file' ? 'bg-blue-600 text-white' : 'bg-dark-800 text-slate-400 hover:text-white'
                }`}
              >
                <FileText className="h-4 w-4" /> <span>Upload Document / Media</span>
              </button>
              <button
                onClick={() => setSourceType('url')}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-xs font-semibold ${
                  sourceType === 'url' ? 'bg-blue-600 text-white' : 'bg-dark-800 text-slate-400 hover:text-white'
                }`}
              >
                <Globe className="h-4 w-4" /> <span>Web URL Scraper</span>
              </button>
              <button
                onClick={() => setSourceType('text')}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-xs font-semibold ${
                  sourceType === 'text' ? 'bg-blue-600 text-white' : 'bg-dark-800 text-slate-400 hover:text-white'
                }`}
              >
                <AlignLeft className="h-4 w-4" /> <span>Raw Text Input</span>
              </button>
            </div>

            {sourceType === 'file' && (
              <FileUploader onFileSelect={handleFileUpload} isLoading={isUploading} />
            )}

            {sourceType === 'url' && (
              <div className="space-y-4">
                <Input
                  label="Target Web URL"
                  placeholder="https://cisa.gov/advisories/aa26-080a"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                />
                <Button variant="primary" onClick={handleUrlSubmit} isLoading={isUploading} disabled={!urlInput}>
                  Fetch & Parse Webpage Content
                </Button>
              </div>
            )}

            {sourceType === 'text' && (
              <div className="space-y-4">
                <Input
                  label="Intelligence Document Title"
                  value={textTitle}
                  onChange={(e) => setTextTitle(e.target.value)}
                />
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">Raw Text Content</label>
                  <textarea
                    rows={6}
                    className="w-full rounded-md border border-dark-700 bg-dark-900 p-3 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Paste raw threat feed, security advisory text, or logs here..."
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                  />
                </div>
                <Button variant="primary" onClick={handleTextSubmit} isLoading={isUploading} disabled={!textInput}>
                  Ingest Text Content
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* STAGE 02: INSPECT EXTRACTED INTELLIGENCE */}
      {currentStage === 'inspect' && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Stage 02: Extracted Document Intelligence</CardTitle>
              <CardDescription>Inspecting parsed metadata and normalized text preview</CardDescription>
            </div>
            <Badge variant="success">SOURCE VERIFIED</Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-3.5 rounded bg-dark-950 border border-dark-800 text-xs">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-mono">Document Title</span>
                <span className="font-semibold text-slate-200 truncate block">{ingestedDocument?.title || 'Report Doc'}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-mono">Source Type</span>
                <span className="font-semibold text-blue-400 uppercase">{ingestedDocument?.source_type}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-mono">Status</span>
                <span className="font-semibold text-emerald-400 uppercase">{ingestedDocument?.status}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-mono">Document ID</span>
                <span className="font-mono text-slate-400 text-[11px] truncate block">{ingestedDocument?.source_document_id}</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">Extracted Text Preview</label>
              <div className="p-4 rounded-md border border-dark-800 bg-dark-950 font-mono text-xs text-slate-300 max-h-48 overflow-y-auto whitespace-pre-wrap">
                {extractedText || ingestedDocument?.title || 'Extracted intelligence preview loaded.'}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setStage('source')}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Change Source
            </Button>
            <Button variant="primary" onClick={() => setStage('configure')}>
              Proceed to Configuration <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* STAGE 03: CONFIGURE PARAMETERS */}
      {currentStage === 'configure' && (
        <Card>
          <CardHeader>
            <CardTitle>Stage 03: Transformation Parameters</CardTitle>
            <CardDescription>Tailor audience, tone, objective, severity, and language</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Target Audience */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">Target Audience</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['technical', 'executive', 'general_public', 'defense'] as TargetAudience[]).map((aud) => (
                    <button
                      key={aud}
                      onClick={() => setTargetAudience(aud)}
                      className={`p-3 rounded border text-xs font-semibold text-left capitalize transition-all ${
                        targetAudience === aud
                          ? 'border-blue-500 bg-blue-950/60 text-blue-300'
                          : 'border-dark-700 bg-dark-900 text-slate-400 hover:bg-dark-850'
                      }`}
                    >
                      {aud.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tone */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">Tone</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['urgent', 'formal', 'educational', 'neutral', 'threat_alert'] as Tone[]).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTone(t)}
                      className={`p-3 rounded border text-xs font-semibold text-left capitalize transition-all ${
                        tone === t
                          ? 'border-blue-500 bg-blue-950/60 text-blue-300'
                          : 'border-dark-700 bg-dark-900 text-slate-400 hover:bg-dark-850'
                      }`}
                    >
                      {t.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Objective */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">Objective</label>
                <div className="space-y-2">
                  {(['action_required', 'information_dissemination', 'policy_compliance'] as Objective[]).map((obj) => (
                    <button
                      key={obj}
                      onClick={() => setObjective(obj)}
                      className={`w-full p-2.5 rounded border text-xs font-semibold text-left capitalize transition-all ${
                        objective === obj
                          ? 'border-blue-500 bg-blue-950/60 text-blue-300'
                          : 'border-dark-700 bg-dark-900 text-slate-400 hover:bg-dark-850'
                      }`}
                    >
                      {obj.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Urgency / Severity */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">Urgency / Severity</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['critical', 'high', 'medium', 'low'] as UrgencyLevel[]).map((urg) => (
                    <button
                      key={urg}
                      onClick={() => setUrgencyLevel(urg)}
                      className={`p-3 rounded border text-xs font-bold text-left uppercase transition-all ${
                        urgencyLevel === urg
                          ? 'border-amber-500 bg-amber-950/60 text-amber-300'
                          : 'border-dark-700 bg-dark-900 text-slate-400 hover:bg-dark-850'
                      }`}
                    >
                      {urg}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setStage('inspect')}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Inspect
            </Button>
            <Button variant="primary" onClick={() => setStage('outputs')}>
              Select Outputs <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* STAGE 04: OUTPUT SELECTION */}
      {currentStage === 'outputs' && (
        <Card>
          <CardHeader>
            <CardTitle>Stage 04: Communication Artifact Outputs</CardTitle>
            <CardDescription>Select output formats to generate from the central context</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {availableOutputs.map((out) => {
                const Icon = out.icon;
                const isSelected = selectedOutputs.includes(out.id);
                return (
                  <div
                    key={out.id}
                    onClick={() => toggleOutput(out.id)}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      isSelected
                        ? 'border-blue-500 bg-blue-950/40 shadow-sm'
                        : 'border-dark-700 bg-dark-900/60 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="p-2 rounded bg-dark-800 text-blue-400 border border-dark-700">
                        <Icon className="h-5 w-5" />
                      </div>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => {}}
                        className="h-4 w-4 rounded accent-blue-600 cursor-pointer"
                      />
                    </div>
                    <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wide">{out.title}</h4>
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{out.desc}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setStage('configure')}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Configure
            </Button>
            <Button variant="primary" onClick={() => setStage('summary')} disabled={selectedOutputs.length === 0}>
              Review Summary <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* STAGE 05: CONFIRMATION SUMMARY & GENERATE */}
      {currentStage === 'summary' && (
        <Card className="border-blue-500/40">
          <CardHeader>
            <CardTitle>Stage 05: Confirm Transformation Execution</CardTitle>
            <CardDescription>Review configuration parameters before triggering LangGraph AI agents</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-lg bg-dark-950 border border-dark-800 text-xs">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-mono">Source Document</span>
                <span className="font-semibold text-slate-200">{ingestedDocument?.title || 'Report Doc'}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-mono">Target Audience</span>
                <span className="font-semibold text-blue-400 capitalize">{targetAudience}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-mono">Tone & Objective</span>
                <span className="font-semibold text-slate-200 capitalize">{tone} / {objective.replace('_', ' ')}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-mono">Urgency / Severity</span>
                <span className="font-bold text-amber-400 uppercase">{urgencyLevel}</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Selected Artifact Outputs ({selectedOutputs.length})
              </label>
              <div className="flex flex-wrap gap-2">
                {selectedOutputs.map((out) => (
                  <Badge key={out} variant="info" className="uppercase font-mono">
                    {out.replace('_', ' ')}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setStage('outputs')}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Edit Outputs
            </Button>
            <Button variant="primary" onClick={handleCreateTransformation} isLoading={isUploading} size="lg">
              <Zap className="mr-2 h-5 w-5 text-amber-400 fill-amber-400" /> GENERATE TRANSFORMATION
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
