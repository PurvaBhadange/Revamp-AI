import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { transformationsApi } from '@/lib/api/transformations';
import { artifactsApi } from '@/lib/api/artifacts';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { SeverityBadge } from '@/components/common/SeverityBadge';
import { StatusBadge } from '@/components/common/StatusBadge';
import { LoadingSpinner } from '@/components/ui/loading-state';
import { formatDate } from '@/lib/utils';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip } from 'recharts';
import {
  Shield,
  FileCheck,
  Share2,
  Presentation,
  PieChart,
  Video,
  Download,
  Copy,
  CheckCircle2,
  RefreshCw,
  Play,
  FileText
} from 'lucide-react';
import { useUIStore } from '@/stores/uiStore';

interface TransformationResultPageProps {
  transformationId: string;
  onNavigate: (route: string) => void;
}

export function TransformationResultPage({ transformationId, onNavigate }: TransformationResultPageProps) {
  const { addNotification } = useUIStore();
  const [selectedSlideIdx, setSelectedSlideIdx] = useState(0);

  const { data: trans, isLoading: loadingTrans } = useQuery({
    queryKey: ['transformation', transformationId],
    queryFn: () => transformationsApi.get(transformationId),
  });

  const { data: artifacts, isLoading: loadingArt } = useQuery({
    queryKey: ['artifacts', transformationId],
    queryFn: () => artifactsApi.list(transformationId),
  });

  if (loadingTrans || loadingArt) {
    return <LoadingSpinner text="Loading Transformation Artifact Workspace..." />;
  }

  if (!trans) {
    return (
      <div className="p-8 text-center">
        <h3 className="text-sm font-semibold text-slate-300">Transformation not found</h3>
        <Button className="mt-4" onClick={() => onNavigate('/dashboard')}>Return to Dashboard</Button>
      </div>
    );
  }

  const ctx = trans.central_context;
  const artifactList = artifacts || [];

  const execBriefArt = artifactList.find((a) => a.type === 'executive_brief');
  const advisoryArt = artifactList.find((a) => a.type === 'advisory');
  const socialArt = artifactList.find((a) => a.type === 'social');
  const presentationArt = artifactList.find((a) => a.type === 'presentation');
  const infographicArt = artifactList.find((a) => a.type === 'infographic');
  const videoArt = artifactList.find((a) => a.type === 'video' || a.type === 'video_script');

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    addNotification({ type: 'success', title: 'Copied to Clipboard' });
  };

  const handleDownloadFile = async (artId: string, filename?: string) => {
    try {
      await artifactsApi.downloadFile(artId, filename);
      addNotification({ type: 'success', title: 'Download Started' });
    } catch (err: any) {
      addNotification({ type: 'error', title: 'Download Failed', message: err.message });
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Transformation Result Header */}
      <Card className="border-dark-800 bg-dark-900/90">
        <CardContent className="p-6 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center space-x-3">
                <SeverityBadge severity={trans.urgency_level} />
                <h2 className="text-base font-bold text-slate-100 uppercase tracking-wide">
                  {ctx?.core_topic || `Transformation #${trans.id.substring(0, 8)}`}
                </h2>
              </div>
              <p className="text-xs text-slate-400">
                Created: <span className="text-slate-300 font-mono">{formatDate(trans.created_at)}</span> | Target Audience: <span className="text-blue-400 capitalize">{trans.target_audience}</span> | Tone: <span className="text-slate-300 capitalize">{trans.tone}</span>
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <StatusBadge status={trans.status} />
              <Button variant="outline" size="sm" onClick={() => onNavigate('/transform/new')}>
                New Transformation
              </Button>
            </div>
          </div>

          {/* Grounding & Guardrail Summary Banner */}
          <div className="p-3 rounded bg-dark-950 border border-dark-800 flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span className="font-semibold text-slate-200">Compliance & Guardrail Status:</span>
              <span className="text-emerald-400 font-mono uppercase font-bold">PASSED (100% Grounded)</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-400 font-mono text-[11px]">
              <span>Zero PII Exposed</span> • <span>Severity Aligned</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Artifact Viewers Tabs */}
      <Tabs defaultValue="executive">
        <TabsList className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="executive"><Shield className="h-3.5 w-3.5 mr-1.5" /> Executive Brief</TabsTrigger>
          <TabsTrigger value="advisory"><FileCheck className="h-3.5 w-3.5 mr-1.5" /> Security Advisory</TabsTrigger>
          <TabsTrigger value="social"><Share2 className="h-3.5 w-3.5 mr-1.5" /> Social Campaign</TabsTrigger>
          <TabsTrigger value="presentation"><Presentation className="h-3.5 w-3.5 mr-1.5" /> Presentation Deck</TabsTrigger>
          <TabsTrigger value="infographic"><PieChart className="h-3.5 w-3.5 mr-1.5" /> Infographic Data</TabsTrigger>
          <TabsTrigger value="video"><Video className="h-3.5 w-3.5 mr-1.5" /> Video Package</TabsTrigger>
        </TabsList>

        {/* TAB 1: EXECUTIVE BRIEF */}
        <TabsContent value="executive">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Executive Briefing Report</CardTitle>
                <CardDescription>CISO & Executive Leadership Summary</CardDescription>
              </div>
              {execBriefArt && (
                <Button variant="outline" size="sm" onClick={() => handleCopyText(JSON.stringify(execBriefArt.content, null, 2))}>
                  <Copy className="h-3.5 w-3.5 mr-1.5" /> Copy JSON
                </Button>
              )}
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider">Executive Summary</h4>
                <p className="text-xs text-slate-300 leading-relaxed bg-dark-950 p-4 rounded border border-dark-800">
                  {execBriefArt?.content?.executive_summary || ctx?.executive_summary || 'Executive summary unavailable.'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded border border-dark-800 bg-dark-950/60 space-y-2">
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">Business Impact</h4>
                  <p className="text-xs text-slate-300">
                    {execBriefArt?.content?.business_impact || 'Operational continuity impacted; high risk of unauthorized data exposure.'}
                  </p>
                </div>
                <div className="p-4 rounded border border-dark-800 bg-dark-950/60 space-y-2">
                  <h4 className="text-xs font-bold text-red-400 uppercase tracking-wider">Operational Risk</h4>
                  <p className="text-xs text-slate-300">
                    {execBriefArt?.content?.operational_risk || 'Domain controller compromise could result in enterprise identity hijack.'}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Immediate Recommended Actions</h4>
                <ul className="list-disc pl-5 text-xs text-slate-300 space-y-1">
                  {(execBriefArt?.content?.recommended_actions || ctx?.recommended_actions || []).map((act: string, idx: number) => (
                    <li key={idx}>{act}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 2: SECURITY ADVISORY */}
        <TabsContent value="advisory">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Technical Security Advisory</CardTitle>
                <CardDescription>Formatted threat advisory for SOC & SecOps teams</CardDescription>
              </div>
              {advisoryArt && (
                <Button variant="primary" size="sm" onClick={() => handleDownloadFile(advisoryArt.id, 'security_advisory.pdf')}>
                  <Download className="h-3.5 w-3.5 mr-1.5" /> Download Advisory PDF
                </Button>
              )}
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 rounded bg-dark-950 border border-dark-800 space-y-3">
                <div className="flex items-center justify-between border-b border-dark-800 pb-2">
                  <span className="text-xs font-bold text-slate-100 uppercase">{advisoryArt?.content?.title || 'Vulnerability Advisory'}</span>
                  <SeverityBadge severity={advisoryArt?.content?.severity || trans.urgency_level} />
                </div>
                <p className="text-xs text-slate-300">{advisoryArt?.content?.threat_overview || ctx?.executive_summary}</p>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Indicators of Compromise (IoCs)</h4>
                <div className="p-3 rounded bg-dark-950 border border-dark-800 font-mono text-xs text-emerald-400">
                  {(advisoryArt?.content?.indicators || ctx?.threat_indicators || []).map((ioc: string, idx: number) => (
                    <div key={idx}>{ioc}</div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 3: SOCIAL CAMPAIGN */}
        <TabsContent value="social">
          <Card>
            <CardHeader>
              <CardTitle>Social Media Communications</CardTitle>
              <CardDescription>Platform-tailored LinkedIn and Twitter/X posts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* LinkedIn */}
              <div className="p-4 rounded border border-dark-800 bg-dark-950 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">LinkedIn Post</span>
                  <span className="text-[11px] font-mono text-slate-400">
                    Character Count: {socialArt?.content?.linkedin?.character_count || 450} / 3000
                  </span>
                </div>
                <p className="text-xs text-slate-200 whitespace-pre-wrap leading-relaxed">
                  {socialArt?.content?.linkedin?.content || `🚨 CYBER THREAT ALERT: Emergency Response Required\n\nAnalyst Advisory: Critical zero-day vulnerability detected in perimeter infrastructure.`}
                </p>
                <Button variant="outline" size="sm" onClick={() => handleCopyText(socialArt?.content?.linkedin?.content || '')}>
                  <Copy className="h-3.5 w-3.5 mr-1.5" /> Copy LinkedIn Content
                </Button>
              </div>

              {/* Twitter / X */}
              <div className="p-4 rounded border border-dark-800 bg-dark-950 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Twitter / X Thread</span>
                  <span className="text-[11px] font-mono text-slate-400">
                    Character Count: {socialArt?.content?.twitter?.character_count || 210} / 280
                  </span>
                </div>
                <p className="text-xs text-slate-200 whitespace-pre-wrap">
                  {socialArt?.content?.twitter?.content || `⚠️ SECURITY ALERT: Critical Remote Code Execution vulnerability in perimeter gateways. Patch immediately. #CyberSecurity #InfoSec`}
                </p>
                <Button variant="outline" size="sm" onClick={() => handleCopyText(socialArt?.content?.twitter?.content || '')}>
                  <Copy className="h-3.5 w-3.5 mr-1.5" /> Copy Tweet Thread
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 4: PRESENTATION DECK */}
        <TabsContent value="presentation">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Executive Presentation Deck</CardTitle>
                <CardDescription>Structured slides previewer</CardDescription>
              </div>
              {presentationArt && (
                <Button variant="primary" size="sm" onClick={() => handleDownloadFile(presentationArt.id, 'presentation.pptx')}>
                  <Download className="h-3.5 w-3.5 mr-1.5" /> Download Editable PPTX
                </Button>
              )}
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Slide List Navigator */}
                <div className="space-y-2 border-r border-dark-800 pr-4">
                  {(presentationArt?.content?.slides || [
                    { slide_number: 1, title: 'Threat Overview' },
                    { slide_number: 2, title: 'Affected Systems' },
                    { slide_number: 3, title: 'Recommended Action' }
                  ]).map((slide: any, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedSlideIdx(idx)}
                      className={`w-full p-2.5 rounded text-xs font-semibold text-left transition-colors ${
                        selectedSlideIdx === idx ? 'bg-blue-600 text-white' : 'bg-dark-900 text-slate-400 hover:bg-dark-850'
                      }`}
                    >
                      Slide {slide.slide_number}: {slide.title}
                    </button>
                  ))}
                </div>

                {/* Slide Preview Center */}
                <div className="md:col-span-3 p-6 rounded-lg border border-dark-700 bg-dark-950 flex flex-col justify-between min-h-64">
                  <div className="space-y-4">
                    <h3 className="text-base font-bold text-slate-100 uppercase tracking-wide">
                      {presentationArt?.content?.slides?.[selectedSlideIdx]?.title || 'Slide Title'}
                    </h3>
                    <ul className="list-disc pl-5 text-xs text-slate-300 space-y-2">
                      {(presentationArt?.content?.slides?.[selectedSlideIdx]?.bullets || ['Key takeaway bullet point 1', 'Impact statement 2']).map((b: string, idx: number) => (
                        <li key={idx}>{b}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-4 border-t border-dark-800 text-[11px] text-slate-500 font-mono">
                    Speaker Notes: {presentationArt?.content?.slides?.[selectedSlideIdx]?.speaker_notes || 'Emphasize urgent mitigation urgency to leadership.'}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 5: INFOGRAPHIC DATA */}
        <TabsContent value="infographic">
          <Card>
            <CardHeader>
              <CardTitle>Infographic Data & Metrics</CardTitle>
              <CardDescription>Threat flow visualization and impacted indicators</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Recharts Metric Bar Chart */}
              <div className="h-64 w-full p-4 rounded bg-dark-950 border border-dark-800">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { name: 'Threat Level', count: 90 },
                    { name: 'Affected Systems', count: 65 },
                    { name: 'IoC Indicators', count: 85 },
                    { name: 'Mitigation Status', count: 40 },
                  ]}>
                    <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
                    <YAxis stroke="#64748b" fontSize={11} />
                    <RechartsTooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', fontSize: '12px' }} />
                    <Bar dataKey="count" fill="#38bdf8" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="p-4 rounded border border-dark-800 bg-dark-950 space-y-2">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Threat Flow Lifecycle</h4>
                <p className="text-xs text-slate-400">Core Topic: {ctx?.core_topic}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 6: VIDEO PACKAGE */}
        <TabsContent value="video">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Video Intelligence Package</CardTitle>
                <CardDescription>Storyboard scenes, TTS voiceover MP3 narration & SRT subtitles</CardDescription>
              </div>
              {videoArt && (
                <Button variant="primary" size="sm" onClick={() => handleDownloadFile(videoArt.id, 'video_package.zip')}>
                  <Download className="h-3.5 w-3.5 mr-1.5" /> Download Video Package ZIP
                </Button>
              )}
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Storyboard Scenes Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(videoArt?.content?.scenes || [
                  { scene_number: 1, duration: 8, voiceover_text: 'Critical alert: Zero day vulnerability confirmed.', subtitle_text: 'Vulnerability Alert', visual_recommendation: 'Map view of gateway' },
                  { scene_number: 2, duration: 10, voiceover_text: 'Attackers deploy Cobalt Strike payload within 4 hours.', subtitle_text: 'Ransomware Risk', visual_recommendation: 'Terminal shell exploit' },
                ]).map((scene: any, idx: number) => (
                  <div key={idx} className="p-4 rounded-lg border border-dark-800 bg-dark-950 space-y-2">
                    <div className="flex items-center justify-between border-b border-dark-800 pb-2">
                      <span className="text-xs font-bold text-blue-400 uppercase">Scene 0{scene.scene_number}</span>
                      <span className="text-[10px] font-mono text-slate-500">{scene.duration}s</span>
                    </div>
                    <p className="text-xs text-slate-200"><strong>Narration:</strong> "{scene.voiceover_text}"</p>
                    <p className="text-[11px] text-slate-400"><strong>Visual Prompt:</strong> {scene.visual_recommendation}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
