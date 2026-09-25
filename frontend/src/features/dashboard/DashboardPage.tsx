import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { transformationsApi } from '@/lib/api/transformations';
import { artifactsApi } from '@/lib/api/artifacts';
import { projectsApi } from '@/lib/api/projects';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/common/StatusBadge';
import { SeverityBadge } from '@/components/common/SeverityBadge';
import { LoadingSpinner } from '@/components/ui/loading-state';
import { EmptyState } from '@/components/ui/empty-state';
import { formatDate } from '@/lib/utils';
import { PlusCircle, ShieldAlert, FileText, Database, Activity, ArrowRight, CheckCircle2 } from 'lucide-react';

interface DashboardPageProps {
  onNavigate: (route: string) => void;
}

export function DashboardPage({ onNavigate }: DashboardPageProps) {
  const { data: transformations, isLoading: loadingTrans } = useQuery({
    queryKey: ['transformations'],
    queryFn: () => transformationsApi.list(),
  });

  const { data: artifacts, isLoading: loadingArt } = useQuery({
    queryKey: ['artifacts'],
    queryFn: () => artifactsApi.list(),
  });

  const { data: projects } = useQuery({
    queryKey: ['projects'],
    queryFn: () => projectsApi.list(),
  });

  if (loadingTrans || loadingArt) {
    return <LoadingSpinner text="Loading Analyst Command Center..." />;
  }

  const activeJobs = (transformations || []).filter((t) => t.status === 'running' || t.status === 'queued');
  const recentTransformations = (transformations || []).slice(0, 5);
  const recentArtifacts = (artifacts || []).slice(0, 4);

  return (
    <div className="space-y-6">
      {/* Top Banner Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-dark-900/80 border-dark-800">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Active Transformations</p>
              <h3 className="text-2xl font-bold text-slate-100 mt-1">{activeJobs.length}</h3>
            </div>
            <div className="p-2.5 rounded bg-blue-950/60 border border-blue-800/60 text-blue-400">
              <Activity className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-dark-900/80 border-dark-800">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Total Transformations</p>
              <h3 className="text-2xl font-bold text-slate-100 mt-1">{(transformations || []).length}</h3>
            </div>
            <div className="p-2.5 rounded bg-dark-800 border border-dark-700 text-slate-300">
              <ShieldAlert className="h-5 w-5 text-amber-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-dark-900/80 border-dark-800">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Generated Artifacts</p>
              <h3 className="text-2xl font-bold text-slate-100 mt-1">{(artifacts || []).length}</h3>
            </div>
            <div className="p-2.5 rounded bg-dark-800 border border-dark-700 text-slate-300">
              <FileText className="h-5 w-5 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-dark-900/80 border-dark-800">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Intelligence Projects</p>
              <h3 className="text-2xl font-bold text-slate-100 mt-1">{(projects || []).length}</h3>
            </div>
            <div className="p-2.5 rounded bg-dark-800 border border-dark-700 text-slate-300">
              <Database className="h-5 w-5 text-emerald-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Action CTA Banner */}
      <Card className="border-blue-500/30 bg-gradient-to-r from-dark-900 via-dark-850 to-blue-950/40">
        <CardContent className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-base font-bold text-slate-100 tracking-wide uppercase">
              Start Automated Intelligence Transformation
            </h2>
            <p className="text-xs text-slate-300 max-w-2xl">
              Upload raw intelligence reports (PDF, DOCX, TXT, PNG, MP3, MP4) and generate audience-tailored Executive Briefs, Security Advisories, Social Campaigns, PPTX Decks, and Video Packages.
            </p>
          </div>
          <Button variant="primary" onClick={() => onNavigate('/transform/new')} className="shrink-0">
            <PlusCircle className="mr-2 h-4 w-4" /> New Transformation
          </Button>
        </CardContent>
      </Card>

      {/* Main Grid: Recent Transformations & Recent Artifacts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Transformations Column (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Transformations</CardTitle>
                <CardDescription>Processed intelligence pipelines</CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={() => onNavigate('/artifacts')}>
                View All <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Button>
            </CardHeader>
            <CardContent>
              {recentTransformations.length > 0 ? (
                <div className="space-y-3">
                  {recentTransformations.map((t) => (
                    <div
                      key={t.id}
                      onClick={() => onNavigate(t.status === 'running' ? `/jobs/${t.id}` : `/transform/${t.id}`)}
                      className="flex items-center justify-between p-3.5 rounded-lg border border-dark-800 bg-dark-950/60 hover:bg-dark-850 hover:border-dark-700 cursor-pointer transition-all"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <SeverityBadge severity={t.urgency_level} />
                          <span className="text-xs font-semibold text-slate-200">
                            {t.central_context?.core_topic || `Transformation #${t.id.substring(0, 8)}`}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400">
                          Audience: <span className="text-slate-300 capitalize">{t.target_audience}</span> | Outputs: {t.output_formats.length} formats
                        </p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-[11px] text-slate-500 font-mono hidden sm:inline">{formatDate(t.created_at)}</span>
                        <StatusBadge status={t.status} />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyState
                  title="No Transformations Executed"
                  description="Start by ingesting cybersecurity source documents."
                  actionLabel="New Transformation"
                  onAction={() => onNavigate('/transform/new')}
                />
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recent Artifacts Column (1 col) */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Generated Artifacts</CardTitle>
                <CardDescription>Latest intelligence outputs</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              {recentArtifacts.length > 0 ? (
                <div className="space-y-3">
                  {recentArtifacts.map((art) => (
                    <div
                      key={art.id}
                      onClick={() => onNavigate(`/artifacts/${art.id}`)}
                      className="p-3 rounded-lg border border-dark-800 bg-dark-950/60 hover:bg-dark-850 cursor-pointer transition-colors space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-200 truncate">{art.title}</span>
                        <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-dark-800 text-blue-400 border border-dark-700">
                          {art.type.replace('_', ' ')}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-slate-400">
                        <span className="flex items-center text-emerald-400">
                          <CheckCircle2 className="h-3 w-3 mr-1" /> Grounded
                        </span>
                        <span className="font-mono text-[10px]">{formatDate(art.created_at)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyState
                  title="No Artifacts Available"
                  description="Generated artifacts will appear here after transformations."
                />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
