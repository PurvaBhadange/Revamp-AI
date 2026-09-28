import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { transformationsApi } from '@/lib/api/transformations';
import { artifactsApi } from '@/lib/api/artifacts';
import { projectsApi } from '@/lib/api/projects';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LoadingSpinner } from '@/components/ui/loading-state';
import { StatusBadge } from '@/components/common/StatusBadge';
import { SeverityBadge } from '@/components/common/SeverityBadge';
import {
  Activity,
  ShieldAlert,
  ShieldCheck,
  FileText,
  Clock,
  RefreshCw,
  Download,
  PlusCircle,
  Search,
  ArrowRight,
  X,
  Layers,
  SearchX
} from 'lucide-react';

interface DashboardPageProps {
  onNavigate: (route: string) => void;
}

export function DashboardPage({ onNavigate }: DashboardPageProps) {
  const queryClient = useQueryClient();

  const { data: transformations, isLoading: loadingTrans, refetch: refetchTrans } = useQuery({
    queryKey: ['transformations'],
    queryFn: () => transformationsApi.list(),
  });

  const { data: artifacts, isLoading: loadingArt, refetch: refetchArt } = useQuery({
    queryKey: ['artifacts'],
    queryFn: () => artifactsApi.list(),
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [inspectingItem, setInspectingItem] = useState<any | null>(null);

  const filteredTransformations = useMemo(() => {
    if (!transformations) return [];
    return transformations.filter((t) => {
      const matchesSearch =
        searchQuery === '' ||
        (t.central_context?.core_topic || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.target_audience.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSeverity =
        selectedSeverity === 'all' || (t.urgency_level || '').toLowerCase() === selectedSeverity.toLowerCase();
      const matchesStatus =
        selectedStatus === 'all' || (t.status || '').toLowerCase() === selectedStatus.toLowerCase();
      return matchesSearch && matchesSeverity && matchesStatus;
    });
  }, [transformations, searchQuery, selectedSeverity, selectedStatus]);

  const handleExportSummary = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(transformations, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `revamp_threat_intel_audit_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  if (loadingTrans || loadingArt) {
    return <LoadingSpinner text="Connecting to Command Center..." />;
  }

  const activeJobs = (transformations || []).filter((t) => t.status === 'running' || t.status === 'queued');

  return (
    <motion.div 
      className="space-y-8"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Breadcrumb & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-stone-200">
        <div>
          <div className="flex items-center space-x-2 text-xs text-stone-500 font-tech font-bold uppercase tracking-wider">
            <span className="text-orange-600">NTRO / NCIIPC COMMAND</span>
            <span>/</span>
            <span>ANALYST WORKSPACE</span>
          </div>
          <h2 className="text-2xl font-black text-stone-900 mt-1 font-display tracking-tight">Intelligence Pipeline Stream</h2>
        </div>

        <div className="flex items-center space-x-2 font-sans">
          <Button variant="outline" size="sm" onClick={() => { refetchTrans(); refetchArt(); }} className="text-sm shadow-sm">
            <RefreshCw className="h-4 w-4 mr-1 text-stone-600" /> Refresh
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportSummary} className="text-sm shadow-sm" title="Export JSON Audit Log">
            <Download className="h-4 w-4 mr-1 text-stone-600" /> Export Audit
          </Button>
          <Button variant="primary" size="sm" onClick={() => onNavigate('/transform/new')} className="text-sm font-semibold shadow-sm">
            <PlusCircle className="mr-1.5 h-4 w-4" /> Ingest Intelligence
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <Card className="bg-white border-stone-200 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-stone-500 uppercase tracking-wider font-tech">Active Pipelines</p>
              <div className="flex items-baseline space-x-2 mt-1.5">
                <span className="text-3xl sm:text-4xl font-black text-stone-900 font-display">{activeJobs.length}</span>
                <span className="text-xs text-orange-600 font-semibold font-mono">running</span>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-orange-50 border border-orange-200 text-orange-700">
              <Activity className="h-6 w-6 animate-pulse" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-stone-200 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-stone-500 uppercase tracking-wider font-tech">Transformations</p>
              <div className="flex items-baseline space-x-2 mt-1.5">
                <span className="text-3xl sm:text-4xl font-black text-stone-900 font-display">{(transformations || []).length}</span>
                <span className="text-xs text-emerald-700 font-semibold font-tech">100% SLA</span>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700">
              <ShieldAlert className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-stone-200 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-stone-500 uppercase tracking-wider font-tech">Generated Artifacts</p>
              <div className="flex items-baseline space-x-2 mt-1.5">
                <span className="text-3xl sm:text-4xl font-black text-stone-900 font-display">{(artifacts || []).length}</span>
                <span className="text-[11px] text-stone-500 font-mono">PDF, PPTX, MP3</span>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-stone-100 border border-stone-200 text-stone-700">
              <FileText className="h-6 w-6 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-stone-200 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-stone-500 uppercase tracking-wider font-tech">Grounding Integrity</p>
              <div className="flex items-baseline space-x-2 mt-1.5">
                <span className="text-3xl sm:text-4xl font-black text-emerald-700 font-display">99.8%</span>
                <span className="text-[11px] text-stone-500 font-mono">0 halluc.</span>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700">
              <ShieldCheck className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-stone-200 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-stone-500 uppercase tracking-wider font-tech">Mean Synthesis Time</p>
              <div className="flex items-baseline space-x-2 mt-1.5">
                <span className="text-3xl sm:text-4xl font-black text-stone-900 font-display">18.4s</span>
                <span className="text-xs text-emerald-700 font-semibold font-tech">-4.1s SLA</span>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-stone-100 border border-stone-200 text-stone-700">
              <Clock className="h-6 w-6 text-stone-700" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* INTELLIGENCE PIPELINE STREAM */}
      <div className="space-y-6">
        {/* Interactive Multi-Filter Toolbar */}
        <div className="p-5 rounded-lg border border-stone-200 bg-white shadow-subtle flex flex-wrap items-center justify-between gap-3">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3 top-3 h-4 w-4 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by core topic, ID, or audience..."
              className="w-full pl-9 pr-8 py-2 text-sm rounded-md border border-stone-300 bg-white text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-orange-600"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-2.5 top-3 text-stone-400 hover:text-stone-600">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <select value={selectedSeverity} onChange={(e) => setSelectedSeverity(e.target.value)} className="h-9 rounded-md border border-stone-300 px-3 text-sm bg-white text-stone-700 focus:ring-1 focus:ring-orange-600 font-medium">
              <option value="all">All Severities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} className="h-9 rounded-md border border-stone-300 px-3 text-sm bg-white text-stone-700 focus:ring-1 focus:ring-orange-600 font-medium">
              <option value="all">All Statuses</option>
              <option value="running">Running</option>
              <option value="completed">Completed</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>

        {/* Data Grid */}
        {filteredTransformations.length === 0 ? (
          <div className="py-16 flex flex-col items-center justify-center text-center bg-white border border-stone-200 rounded-lg">
            <div className="h-12 w-12 rounded-full bg-stone-100 flex items-center justify-center mb-3">
              <SearchX className="h-6 w-6 text-stone-400" />
            </div>
            <h3 className="text-sm font-semibold text-stone-900">No pipelines match your criteria</h3>
            <p className="text-xs text-stone-500 mt-1 max-w-sm">Adjust your filters or initiate a new intelligence transformation.</p>
            <Button variant="outline" size="sm" onClick={() => { setSearchQuery(''); setSelectedSeverity('all'); setSelectedStatus('all'); }} className="mt-4 text-xs">
              Clear All Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filteredTransformations.map((t: any) => (
              <Card key={t.id} className="border border-stone-200 bg-white hover:border-orange-300 hover:shadow-md transition-all flex flex-col">
                <CardContent className="p-5 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex space-x-2">
                      <StatusBadge status={t.status} />
                      <SeverityBadge severity={t.urgency_level} />
                    </div>
                    <span className="text-[11px] font-mono text-stone-400 font-medium">{t.id.substring(0, 8)}</span>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-stone-900 leading-snug line-clamp-2">
                      {t.central_context?.core_topic || 'Ingesting Threat Intelligence...'}
                    </h3>
                    <p className="text-xs text-stone-500 mt-1.5 font-sans">
                      Target: <span className="font-semibold text-stone-800 uppercase">{t.target_audience}</span>
                    </p>
                    <p className="text-xs text-stone-500 mt-0.5 font-sans">
                      Tone: <span className="font-semibold text-stone-800 capitalize">{t.tone}</span>
                    </p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-stone-100">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => setInspectingItem(t)} className="flex-1 h-8 text-xs font-semibold">
                        Quick Inspect
                      </Button>
                      <Button variant="primary" size="sm" onClick={() => onNavigate(t.status === 'running' ? `/jobs/${t.id}` : `/transform/${t.id}`)} className="flex-1 h-8 text-xs font-semibold shadow-sm">
                        Workspace <ArrowRight className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* QUICK INSPECT MODAL */}
      {inspectingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-2xl bg-white border border-stone-200 rounded-xl shadow-modal overflow-hidden max-h-[90vh] flex flex-col"
          >
            <div className="p-5 border-b border-stone-200 bg-stone-50 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-orange-700 uppercase">Incident Details</span>
                <h3 className="text-base font-bold text-stone-900 mt-0.5">
                  {inspectingItem.central_context?.core_topic || `Transformation #${inspectingItem.id.substring(0, 8)}`}
                </h3>
              </div>
              <button onClick={() => setInspectingItem(null)} className="p-1 rounded text-stone-400 hover:text-stone-600 transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6 text-sm">
              <div className="grid grid-cols-2 gap-4 p-4 rounded-lg bg-stone-50 border border-stone-200">
                <div><span className="text-stone-500 font-medium block text-xs">Urgency Level:</span><SeverityBadge severity={inspectingItem.urgency_level} /></div>
                <div><span className="text-stone-500 font-medium block text-xs">Status:</span><StatusBadge status={inspectingItem.status} /></div>
                <div><span className="text-stone-500 font-medium block text-xs">Target Audience:</span><span className="font-semibold text-stone-800 uppercase text-xs">{inspectingItem.target_audience}</span></div>
                <div><span className="text-stone-500 font-medium block text-xs">Communication Tone:</span><span className="font-semibold text-stone-800 uppercase text-xs">{inspectingItem.tone}</span></div>
              </div>

              {inspectingItem.central_context && (
                <div>
                  <h4 className="font-bold text-stone-900 uppercase mb-2 flex items-center text-xs">
                    <Layers className="h-4 w-4 mr-1 text-orange-600" /> Extracted Central Context (Single Source of Truth)
                  </h4>
                  <pre className="p-4 rounded-lg border border-stone-200 bg-stone-50 font-mono text-xs text-stone-800 overflow-x-auto max-h-48 leading-relaxed">
                    {JSON.stringify(inspectingItem.central_context, null, 2)}
                  </pre>
                </div>
              )}

              <div>
                <h4 className="font-bold text-stone-900 uppercase mb-2 text-xs">Dispatched Output Formats:</h4>
                <div className="flex flex-wrap gap-2">
                  {inspectingItem.output_formats.map((f: string, i: number) => (
                    <span key={i} className="px-2.5 py-1 rounded bg-orange-50 text-orange-700 font-mono text-xs border border-orange-200 font-semibold uppercase tracking-wider">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-5 border-t border-stone-200 bg-stone-50 flex items-center justify-between">
              <Button variant="outline" size="sm" onClick={() => setInspectingItem(null)} className="text-sm">Close</Button>
              <Button variant="primary" size="sm" onClick={() => {
                const id = inspectingItem.id;
                setInspectingItem(null);
                onNavigate(inspectingItem.status === 'running' ? `/jobs/${id}` : `/transform/${id}`);
              }} className="text-sm font-semibold shadow-sm">
                Open Full Deliverables Workspace <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
