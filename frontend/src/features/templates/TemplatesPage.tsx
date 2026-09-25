import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LayoutTemplate, ArrowRight, ShieldAlert, FileText, Presentation, Share2, Video, Sparkles } from 'lucide-react';

interface TransformationTemplate {
  id: string;
  name: string;
  description: string;
  audience: string;
  tone: string;
  severity: string;
  objective: string;
  outputs: string[];
  icon: React.ReactNode;
}

const TEMPLATES: TransformationTemplate[] = [
  {
    id: 'exec_brief_standard',
    name: 'Executive Cyber Briefing',
    description: 'Concise financial and operational risk summary designed for Board members, CISOs, and executive leadership.',
    audience: 'Executive',
    tone: 'Formal',
    severity: 'High',
    objective: 'Action Required',
    outputs: ['executive_brief', 'presentation'],
    icon: <FileText className="h-5 w-5 text-sky-400" />,
  },
  {
    id: 'critical_advisory',
    name: 'Critical Vulnerability Advisory',
    description: 'Technical threat breakdown detailing IOCs, zero-day exploitation, affected CVE systems, and immediate mitigation commands.',
    audience: 'Technical',
    tone: 'Threat Alert',
    severity: 'Critical',
    objective: 'Action Required',
    outputs: ['security_advisory', 'executive_brief', 'infographic'],
    icon: <ShieldAlert className="h-5 w-5 text-rose-400" />,
  },
  {
    id: 'public_threat_awareness',
    name: 'Public Threat Alert & Social Campaign',
    description: 'Multi-channel social awareness thread breaking down scam patterns, phishing vectors, and public security advisories.',
    audience: 'General Public',
    tone: 'Educational',
    severity: 'Medium',
    objective: 'Information Dissemination',
    outputs: ['social_linkedin', 'social_twitter', 'video_package'],
    icon: <Share2 className="h-5 w-5 text-emerald-400" />,
  },
  {
    id: 'defense_briefing_deck',
    name: 'Defense Incident Response Briefing',
    description: 'Formal tactical slide presentation and video package for Security Operations Center (SOC) shift handover.',
    audience: 'Defense / Security',
    tone: 'Formal',
    severity: 'Critical',
    objective: 'Policy Compliance',
    outputs: ['presentation', 'video_package', 'security_advisory'],
    icon: <Presentation className="h-5 w-5 text-indigo-400" />,
  },
];

export const TemplatesPage: React.FC = () => {
  const handleUseTemplate = (tmpl: TransformationTemplate) => {
    const params = new URLSearchParams({
      audience: tmpl.audience,
      tone: tmpl.tone,
      severity: tmpl.severity,
      objective: tmpl.objective,
      outputs: tmpl.outputs.join(','),
    });
    window.location.href = `/transform/new?${params.toString()}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <LayoutTemplate className="h-6 w-6 text-indigo-400" />
            Transformation Templates
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Pre-configured target audiences, tones, and deliverable combinations optimized for rapid operational deployment.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {TEMPLATES.map(tmpl => (
          <Card key={tmpl.id} className="bg-slate-900/60 border-slate-800 hover:border-slate-700 transition flex flex-col justify-between">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2.5 rounded bg-slate-950 border border-slate-800 shrink-0">
                    {tmpl.icon}
                  </div>
                  <div>
                    <CardTitle className="text-base font-semibold text-slate-100">{tmpl.name}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="border-indigo-500/30 text-indigo-400 bg-indigo-950/30 font-mono text-[10px]">
                        {tmpl.audience}
                      </Badge>
                      <Badge variant="outline" className="border-slate-700 text-slate-300 font-mono text-[10px]">
                        {tmpl.tone}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                {tmpl.description}
              </p>
            </CardHeader>

            <CardContent className="pt-0 space-y-4">
              <div className="p-3 rounded bg-slate-950/60 border border-slate-800/80 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-400 font-mono">
                  <span>Objective:</span>
                  <strong className="text-slate-200">{tmpl.objective}</strong>
                </div>
                <div className="flex justify-between text-slate-400 font-mono">
                  <span>Deliverables:</span>
                  <strong className="text-indigo-400 uppercase">{tmpl.outputs.length} Selected</strong>
                </div>
              </div>

              <Button
                onClick={() => handleUseTemplate(tmpl)}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs py-2 flex items-center justify-center gap-2"
              >
                <Sparkles className="h-3.5 w-3.5" />
                Launch Transformation with Template
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
