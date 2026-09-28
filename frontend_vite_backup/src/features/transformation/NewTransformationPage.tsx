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
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Wizard Progress Header */}
      <div className="flex items-center justify-between p-3 rounded-lg border border-stone-200 bg-stone-50">
        {stages.map((st, idx) => {
          const isActive = currentStage === st.id;
          const isDone = stages.findIndex((s) => s.id === currentStage) > idx;

          return (
            <React.Fragment key={st.id}>
              <div
                onClick={() => isDone && setStage(st.id)}
                className={`flex items-center space-x-2 cursor-pointer ${
                  isActive
                    ? 'text-orange-600 font-bold'
                    : isDone
                    ? 'text-emerald-600 font-semibold'
                    : 'text-stone-500'
                }`}
              >
                <div
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-mono border ${
                    isActive
                      ? 'border-orange-500 bg-orange-50 text-orange-600'
                      : isDone
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-600'
                      : 'border-stone-300 bg-stone-100 text-stone-500'
                  }`}
                >
                  {isDone ? <CheckCircle2 className="h-4 w-4" /> : st.number}
                </div>
                <span className="text-xs uppercase tracking-wider hidden md:inline">{st.label}</span>
              </div>
              {idx < stages.length - 1 && <div className="h-px w-8 bg-stone-100 hidden sm:block" />}
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
          <CardContent className="space-y-8">
            {/* Input Type Selector Tabs */}
            <div className="flex space-x-2 border-b border-stone-200 pb-3">
              <button
                onClick={() => setSourceType('file')}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-xs font-semibold ${
                  sourceType === 'file' ? 'bg-orange-600 text-white' : 'bg-stone-100 text-stone-600 hover:text-white'
                }`}
              >
                <FileText className="h-4 w-4" /> <span>Upload Document / Media</span>
              </button>
              <button
                onClick={() => setSourceType('url')}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-xs font-semibold ${
                  sourceType === 'url' ? 'bg-orange-600 text-white' : 'bg-stone-100 text-stone-600 hover:text-white'
                }`}
              >
                <Globe className="h-4 w-4" /> <span>Web URL Scraper</span>
              </button>
              <button
                onClick={() => setSourceType('text')}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-xs font-semibold ${
                  sourceType === 'text' ? 'bg-orange-600 text-white' : 'bg-stone-100 text-stone-600 hover:text-white'
                }`}
              >
                <AlignLeft className="h-4 w-4" /> <span>Raw Text Input</span>
              </button>
            </div>

            {sourceType === 'file' && (
              <FileUploader onFileSelect={handleFileUpload} isLoading={isUploading} />
            )}

            {sourceType === 'url' && (
              <div className="space-y-8">
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
              <div className="space-y-8">
                <Input
                  label="Intelligence Document Title"
                  value={textTitle}
                  onChange={(e) => setTextTitle(e.target.value)}
                />
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider">Raw Text Content</label>
                  <textarea
                    rows={6}
                    className="w-full rounded-md border border-stone-300 bg-stone-50 p-3 text-xs text-stone-900 placeholder:text-stone-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
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
          <CardContent className="space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-5 rounded bg-white border border-stone-200 text-xs">
              <div>
                <span className="text-stone-500 block text-xs uppercase font-mono">Document Title</span>
                <span className="font-semibold text-stone-900 truncate block">{ingestedDocument?.title || 'Report Doc'}</span>
              </div>
              <div>
                <span className="text-stone-500 block text-xs uppercase font-mono">Source Type</span>
                <span className="font-semibold text-orange-600 uppercase">{ingestedDocument?.source_type}</span>
              </div>
              <div>
                <span className="text-stone-500 block text-xs uppercase font-mono">Status</span>
                <span className="font-semibold text-emerald-600 uppercase">{ingestedDocument?.status}</span>
              </div>
              <div>
                <span className="text-stone-500 block text-xs uppercase font-mono">Document ID</span>
                <span className="font-mono text-stone-600 text-xs truncate block">{ingestedDocument?.source_document_id}</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider">Extracted Text Preview</label>
              <div className="p-4 rounded-md border border-stone-200 bg-white font-mono text-xs text-stone-700 max-h-48 overflow-y-auto whitespace-pre-wrap">
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
          <CardContent className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Target Audience */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider">Target Audience</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['technical', 'executive', 'general_public', 'defense'] as TargetAudience[]).map((aud) => (
                    <button
                      key={aud}
                      onClick={() => setTargetAudience(aud)}
                      className={`p-3 rounded border text-xs font-semibold text-left capitalize transition-all ${
                        targetAudience === aud
                          ? 'border-orange-500 bg-orange-50 text-orange-700'
                          : 'border-stone-300 bg-stone-50 text-stone-600 hover:bg-stone-100'
                      }`}
                    >
                      {aud.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tone */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider">Tone</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['urgent', 'formal', 'educational', 'neutral', 'threat_alert'] as Tone[]).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTone(t)}
                      className={`p-3 rounded border text-xs font-semibold text-left capitalize transition-all ${
                        tone === t
                          ? 'border-orange-500 bg-orange-50 text-orange-700'
                          : 'border-stone-300 bg-stone-50 text-stone-600 hover:bg-stone-100'
                      }`}
                    >
                      {t.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Objective */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider">Objective</label>
                <div className="space-y-2">
                  {(['action_required', 'information_dissemination', 'policy_compliance'] as Objective[]).map((obj) => (
                    <button
                      key={obj}
                      onClick={() => setObjective(obj)}
                      className={`w-full p-3 rounded border text-xs font-semibold text-left capitalize transition-all ${
                        objective === obj
                          ? 'border-orange-500 bg-orange-50 text-orange-700'
                          : 'border-stone-300 bg-stone-50 text-stone-600 hover:bg-stone-100'
                      }`}
                    >
                      {obj.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Urgency / Severity */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider">Urgency / Severity</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['critical', 'high', 'medium', 'low'] as UrgencyLevel[]).map((urg) => (
                    <button
                      key={urg}
                      onClick={() => setUrgencyLevel(urg)}
                      className={`p-3 rounded border text-xs font-bold text-left uppercase transition-all ${
                        urgencyLevel === urg
                          ? 'border-amber-500 bg-amber-50 text-amber-700'
                          : 'border-stone-300 bg-stone-50 text-stone-600 hover:bg-stone-100'
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
                        ? 'border-orange-500 bg-orange-50 shadow-sm'
                        : 'border-stone-300 bg-stone-50/60 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="p-2 rounded bg-stone-100 text-orange-600 border border-stone-300">
                        <Icon className="h-6 w-6" />
                      </div>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => {}}
                        className="h-4 w-4 rounded accent-blue-600 cursor-pointer"
                      />
                    </div>
                    <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wide">{out.title}</h4>
                    <p className="text-xs text-stone-600 mt-1 line-clamp-2">{out.desc}</p>
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
        <Card className="border-orange-500/40">
          <CardHeader>
            <CardTitle>Stage 05: Confirm Transformation Execution</CardTitle>
            <CardDescription>Review configuration parameters before triggering LangGraph AI agents</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-lg bg-white border border-stone-200 text-xs">
              <div>
                <span className="text-stone-500 block text-xs uppercase font-mono">Source Document</span>
                <span className="font-semibold text-stone-900">{ingestedDocument?.title || 'Report Doc'}</span>
              </div>
              <div>
                <span className="text-stone-500 block text-xs uppercase font-mono">Target Audience</span>
                <span className="font-semibold text-orange-600 capitalize">{targetAudience}</span>
              </div>
              <div>
                <span className="text-stone-500 block text-xs uppercase font-mono">Tone & Objective</span>
                <span className="font-semibold text-stone-900 capitalize">{tone} / {objective.replace('_', ' ')}</span>
              </div>
              <div>
                <span className="text-stone-500 block text-xs uppercase font-mono">Urgency / Severity</span>
                <span className="font-bold text-amber-600 uppercase">{urgencyLevel}</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider">
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
              <Zap className="mr-2 h-6 w-6 text-amber-600 fill-amber-400" /> GENERATE TRANSFORMATION
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
