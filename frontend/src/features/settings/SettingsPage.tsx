import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { settingsApi } from '@/lib/api/settings';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LoadingState } from '@/components/ui/loading-state';
import { EmptyState } from '@/components/ui/empty-state';
import { Settings, Cpu, Shield, Database, Server, Check, Save, Sparkles, UserCheck } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const queryClient = useQueryClient();
  const [selectedProvider, setSelectedProvider] = useState<'gemini' | 'ollama'>('gemini');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const { data: settings, isLoading, error } = useQuery({
    queryKey: ['settings'],
    queryFn: settingsApi.get,
    onSuccess: (data) => {
      setSelectedProvider(data.llm_provider as 'gemini' | 'ollama');
    },
  });

  const updateMutation = useMutation({
    mutationFn: settingsApi.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings'] });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    },
  });

  const handleProviderSwitch = (provider: 'gemini' | 'ollama') => {
    setSelectedProvider(provider);
    updateMutation.mutate({ llm_provider: provider });
  };

  if (isLoading) return <LoadingState label="Retrieving system configuration..." />;
  if (error || !settings) return <EmptyState icon={Settings} title="Settings Error" description="Unable to connect to backend settings API endpoint." />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <Settings className="h-6 w-6 text-indigo-400" />
            System & LLM Engine Settings
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage GenAI model providers, vector indexing parameters, operational defaults, and system telemetry.
          </p>
        </div>
        {saveSuccess && (
          <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-mono bg-emerald-950/40 border border-emerald-800/40 px-3 py-1.5 rounded-md">
            <Check className="h-4 w-4" />
            Settings Updated
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: LLM Provider Configuration */}
        <div className="lg:col-span-2 space-y-6">
          {/* AI Model Provider */}
          <Card className="bg-slate-900/60 border-slate-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold text-slate-100 flex items-center gap-2">
                <Cpu className="h-5 w-5 text-indigo-400" />
                Specialized LLM Orchestration Engine
              </CardTitle>
              <p className="text-xs text-slate-400">
                Select backend inference provider for agent transformation tasks. All direct API credentials remain secured strictly server-side.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Provider 1: Gemini Cloud */}
                <div
                  onClick={() => handleProviderSwitch('gemini')}
                  className={`p-4 rounded-lg border cursor-pointer transition flex flex-col justify-between space-y-3 ${
                    selectedProvider === 'gemini'
                      ? 'bg-indigo-950/30 border-indigo-500 shadow-md'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-slate-100 flex items-center gap-1.5">
                        Google Gemini 2.5 Flash
                        <Sparkles className="h-4 w-4 text-amber-400" />
                      </h4>
                      <p className="text-xs text-slate-400 mt-1">
                        Ultra-fast multi-modal processing with high structural reasoning.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono pt-2 border-t border-slate-800/80">
                    <span className="text-slate-400">Status:</span>
                    <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 bg-emerald-950/20 text-[10px]">
                      AVAILABLE
                    </Badge>
                  </div>
                </div>

                {/* Provider 2: Local Ollama */}
                <div
                  onClick={() => handleProviderSwitch('ollama')}
                  className={`p-4 rounded-lg border cursor-pointer transition flex flex-col justify-between space-y-3 ${
                    selectedProvider === 'ollama'
                      ? 'bg-indigo-950/30 border-indigo-500 shadow-md'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-slate-100 flex items-center gap-1.5">
                        Local Ollama (Llama 3.1)
                        <Server className="h-4 w-4 text-purple-400" />
                      </h4>
                      <p className="text-xs text-slate-400 mt-1">
                        Air-gapped on-premise model execution for ultra-sensitive intelligence.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono pt-2 border-t border-slate-800/80">
                    <span className="text-slate-400">Status:</span>
                    <Badge variant="outline" className="border-slate-700 text-slate-400 bg-slate-950 text-[10px]">
                      CONFIGURED
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Operational Defaults */}
          <Card className="bg-slate-900/60 border-slate-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold text-slate-100 flex items-center gap-2">
                <Shield className="h-5 w-5 text-emerald-400" />
                Default Transformation Parameters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-400 font-medium">Default Target Audience</label>
                  <input
                    type="text"
                    disabled
                    value="Executive / Board"
                    className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-slate-300 font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400 font-medium">Default Communication Tone</label>
                  <input
                    type="text"
                    disabled
                    value="Formal Threat Alert"
                    className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-slate-300 font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400 font-medium">Default Primary Language</label>
                  <input
                    type="text"
                    disabled
                    value="English (en-US)"
                    className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-slate-300 font-mono"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Server Topology & Security Audit */}
        <div className="space-y-6">
          {/* Vector Storage Status */}
          <Card className="bg-slate-900/60 border-slate-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold text-slate-100 flex items-center gap-2">
                <Database className="h-5 w-5 text-purple-400" />
                Qdrant Vector DB Topology
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-800 text-slate-300 font-mono">
                <span>Vector Host:</span>
                <span className="text-slate-400">{settings.qdrant_url}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800 text-slate-300 font-mono">
                <span>RAG Collection:</span>
                <span className="text-indigo-400">{settings.qdrant_collection}</span>
              </div>
              <div className="flex justify-between py-1 text-slate-300 font-mono">
                <span>Distance Metric:</span>
                <span className="text-slate-400">Cosine (384-dim)</span>
              </div>
            </CardContent>
          </Card>

          {/* System Telemetry */}
          <Card className="bg-slate-900/60 border-slate-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold text-slate-100 flex items-center gap-2">
                <Server className="h-5 w-5 text-sky-400" />
                FastAPI Backend Health
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-800 text-slate-300 font-mono">
                <span>Platform:</span>
                <span className="text-slate-200">{settings.app_name}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800 text-slate-300 font-mono">
                <span>Environment:</span>
                <span className="text-emerald-400 uppercase">{settings.environment}</span>
              </div>
              <div className="flex justify-between py-1 text-slate-300 font-mono">
                <span>API Status:</span>
                <span className="text-emerald-400 font-bold">ONLINE (200 OK)</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
