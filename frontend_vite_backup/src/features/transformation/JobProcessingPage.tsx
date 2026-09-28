import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { jobsApi } from '@/lib/api/jobs';
import { useUIStore } from '@/stores/uiStore';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AgentStatusCard } from '@/components/common/AgentStatusCard';
import { StatusBadge } from '@/components/common/StatusBadge';
import { LoadingSpinner } from '@/components/ui/loading-state';
import { SSEJobEvent } from '@/types/job';
import { Activity, ArrowRight, AlertTriangle, RefreshCw } from 'lucide-react';

interface JobProcessingPageProps {
  jobId: string;
  onNavigate?: (route: string) => void;
}

export function JobProcessingPage({ jobId, onNavigate }: JobProcessingPageProps) {
  const navigate = onNavigate || ((route: string) => {
    window.history.pushState({}, '', route);
    window.dispatchEvent(new Event('popstate'));
  });
  const { setActiveJobId, addNotification } = useUIStore();
  const [eventLogs, setEventLogs] = useState<string[]>([]);
  const [isReconnecting, setIsReconnecting] = useState(false);

  // Poll job status
  const { data: jobStatus, refetch } = useQuery({
    queryKey: ['job', jobId],
    queryFn: () => jobsApi.get(jobId),
    refetchInterval: (query) => {
      const data = query.state.data;
      if (data?.status === 'completed' || data?.status === 'failed' || data?.status === 'cancelled') {
        return false;
      }
      return 2000;
    },
  });

  useEffect(() => {
    setActiveJobId(jobId);

    // Subscribe to backend Server-Sent Events (SSE)
    const unsubscribe = jobsApi.subscribeEvents(
      jobId,
      (evt: SSEJobEvent) => {
        const logLine = `[${new Date().toLocaleTimeString()}] Event: ${evt.event}`;
        setEventLogs((prev) => [logLine, ...prev.slice(0, 20)]);
        refetch();

        if (evt.event === 'job.completed') {
          setActiveJobId(null);
          addNotification({ type: 'success', title: 'Transformation Complete', message: 'All communication artifacts generated' });
          navigate(`/transform/${jobId}`);
        }
      },
      () => {
        setIsReconnecting(true);
        setTimeout(() => setIsReconnecting(false), 3000);
      }
    );

    return () => {
      unsubscribe();
      setActiveJobId(null);
    };
  }, [jobId, setActiveJobId, refetch, navigate, addNotification]);

  if (!jobStatus) {
    return <LoadingSpinner text={`Restoring Job #${jobId.substring(0, 8)} Session...`} />;
  }

  const isFinished = jobStatus.status === 'completed';

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Job Header */}
      <Card className="border-orange-500/40 bg-stone-50/90">
        <CardContent className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-3">
              <Activity className="h-6 w-6 text-orange-600 animate-pulse" />
              <h2 className="text-base font-bold text-stone-900 uppercase tracking-wide">
                Transformation Pipeline Job #{jobId.substring(0, 8)}
              </h2>
            </div>
            <p className="text-xs text-stone-600 font-mono">
              Current Stage: <span className="text-orange-600 font-semibold uppercase">{jobStatus.current_stage}</span>
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <StatusBadge status={jobStatus.status} />
            {isFinished && (
              <Button variant="primary" onClick={() => navigate(`/transform/${jobId}`)}>
                Review Artifacts <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* SSE Connection Warning */}
      {isReconnecting && (
        <div className="flex items-center space-x-2 p-3 rounded-md bg-amber-950/80 border border-amber-800 text-amber-200 text-xs">
          <RefreshCw className="h-4 w-4 animate-spin text-amber-600" />
          <span>Connection interrupted. Reconnecting to backend stream...</span>
        </div>
      )}

      {/* Agents Pipeline Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {jobStatus.agents.length > 0 ? (
          jobStatus.agents.map((agent) => (
            <AgentStatusCard key={agent.name} name={agent.name} status={agent.status} error={agent.error} />
          ))
        ) : (
          <div className="col-span-2 p-6 text-center text-xs text-stone-600">
            Agents executing... Ingestion & Central Context Extraction in progress.
          </div>
        )}
      </div>

      {/* Live SSE Event Log */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xs font-semibold text-stone-600">Live Execution Log (SSE Event Stream)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 rounded bg-white font-mono text-xs text-stone-700 space-y-1.5 max-h-40 overflow-y-auto">
            {eventLogs.length > 0 ? (
              eventLogs.map((log, idx) => (
                <div key={idx} className="text-xs text-orange-600/90">{log}</div>
              ))
            ) : (
              <div className="text-xs text-stone-500">Subscribed to real-time events at /api/v1/jobs/{jobId}/events</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
