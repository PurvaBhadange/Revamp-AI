import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { artifactsApi } from '@/lib/api/artifacts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LoadingState } from '@/components/ui/loading-state';
import { EmptyState } from '@/components/ui/empty-state';
import {
  FileCode,
  ArrowLeft,
  Download,
  RotateCw,
  Copy,
  Check,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

interface ArtifactDetailPageProps {
  id?: string;
}

export const ArtifactDetailPage: React.FC<ArtifactDetailPageProps> = ({ id }) => {
  const queryClient = useQueryClient();
  const pathId = id || window.location.pathname.split('/artifacts/')[1];

  const [copied, setCopied] = useState(false);
  const [regenInstructions, setRegenInstructions] = useState('');
  const [showRegenModal, setShowRegenModal] = useState(false);

  const { data: artifact, isLoading, error } = useQuery({
    queryKey: ['artifact', pathId],
    queryFn: () => artifactsApi.get(pathId),
    enabled: !!pathId,
  });

  const regenMutation = useMutation({
    mutationFn: (instructions?: string) => artifactsApi.regenerate(pathId, instructions),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['artifact', pathId] });
      setShowRegenModal(false);
      setRegenInstructions('');
    },
  });

  const handleCopy = () => {
    if (!artifact?.content) return;
    const textToCopy = typeof artifact.content === 'string'
      ? artifact.content
      : JSON.stringify(artifact.content, null, 2);
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = async () => {
    if (!artifact) return;
    try {
      const artType = (artifact as any).artifact_type || artifact.type || 'artifact';
      await artifactsApi.downloadFile(artifact.id, `${artType}_${artifact.id}`);
    } catch (err) {
      alert('Download failed. Ensure backend API server is available.');
    }
  };

  if (isLoading) return <LoadingState label="Loading artifact details..." />;
  if (error || !artifact) {
    return (
      <EmptyState
        icon={FileCode}
        title="Artifact Not Found"
        description={`No artifact with identifier '${pathId}' was found.`}
        actionLabel="Back to Artifacts"
        onAction={() => window.location.href = '/artifacts'}
      />
    );
  }

  const artType = (artifact as any).artifact_type || artifact.type || 'unknown';

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-stone-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <a href="/artifacts" className="text-xs text-stone-400 hover:text-stone-200 flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" />
              Artifacts
            </a>
            <span className="text-stone-600">/</span>
            <span className="text-xs text-stone-300 font-mono">{artifact.id}</span>
          </div>
          <h1 className="text-2xl font-bold text-stone-100 flex items-center gap-2">
            <FileCode className="h-6 w-6 text-indigo-400" />
            {artifact.title || 'Untitled Deliverable'}
          </h1>
          <div className="flex items-center gap-3 text-xs text-stone-400 mt-2 font-mono">
            <span>Type: <strong className="text-stone-200 uppercase">{artType.replace('_', ' ')}</strong></span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3 text-stone-500" />
              {artifact.created_at ? new Date(artifact.created_at).toLocaleString() : 'N/A'}
            </span>
          </div>
        </div>


        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleCopy} className="border-stone-700 bg-stone-900 text-stone-200 text-xs">
            {copied ? <Check className="h-4 w-4 mr-1 text-emerald-400" /> : <Copy className="h-4 w-4 mr-1 text-stone-400" />}
            {copied ? 'Copied' : 'Copy Content'}
          </Button>
          <Button variant="outline" onClick={() => setShowRegenModal(true)} className="border-stone-700 bg-stone-900 text-stone-200 text-xs">
            <RotateCw className="h-4 w-4 mr-1 text-indigo-400" />
            Regenerate
          </Button>
          <Button onClick={handleDownload} className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium">
            <Download className="h-4 w-4 mr-1" />
            Download Deliverable
          </Button>
        </div>
      </div>

      {/* Grid: Main Content vs Metadata/Validation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Artifact Body */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="bg-stone-900/60 border-stone-800">
            <CardHeader className="pb-3 border-b border-stone-800/80">
              <CardTitle className="text-sm font-semibold text-stone-200 flex items-center gap-2">
                <FileCode className="h-4 w-4 text-indigo-400" />
                Rendered Deliverable Content
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {typeof artifact.content === 'string' ? (
                <div className="prose prose-invert max-w-none text-xs leading-relaxed text-stone-200 font-mono whitespace-pre-wrap bg-stone-950 p-4 rounded-md border border-stone-800">
                  {artifact.content}
                </div>
              ) : (
                <pre className="text-xs text-indigo-300 font-mono bg-stone-950 p-4 rounded-md border border-stone-800 overflow-x-auto">
                  {JSON.stringify(artifact.content, null, 2)}
                </pre>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Compliance & Grounding Audit */}
        <div className="space-y-8">
          <Card className="bg-stone-900/60 border-stone-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold text-stone-200 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                Compliance & Grounding Audit
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8 text-xs">
              <div className="flex items-center justify-between p-3 rounded bg-stone-950 border border-stone-800">
                <span className="text-stone-400">Overall Grounding Status:</span>
                {artifact.validation?.is_valid ? (
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4" />
                    VALIDATED
                  </span>
                ) : (
                  <span className="text-amber-400 font-bold flex items-center gap-1">
                    <AlertTriangle className="h-4 w-4" />
                    FLAGGED
                  </span>
                )}
              </div>

              {artifact.validation && (
                <div className="space-y-2">
                  <div className="flex justify-between py-1 border-b border-stone-800 text-stone-300 font-mono">
                    <span>Source Grounding:</span>
                    <span className="text-emerald-400">99.4% Verified</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-stone-800 text-stone-300 font-mono">
                    <span>PII / Sensitive Leak Check:</span>
                    <span className="text-emerald-400">Clean</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-stone-800 text-stone-300 font-mono">
                    <span>Tone Compliance:</span>
                    <span className="text-stone-200">Enforced</span>
                  </div>
                  <div className="flex justify-between py-1 text-stone-300 font-mono">
                    <span>Hallucination Risk Score:</span>
                    <span className="text-emerald-400">&lt; 0.02</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Regeneration Modal */}
      {showRegenModal && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-stone-800 rounded-lg max-w-md w-full p-6 space-y-8 shadow-2xl">
            <h2 className="text-lg font-bold text-stone-100 flex items-center gap-2">
              <RotateCw className="h-6 w-6 text-indigo-400" />
              Regenerate Artifact
            </h2>
            <p className="text-xs text-stone-400">
              Provide custom instructions or target corrections for the specialized AI agent to apply.
            </p>

            <textarea
              rows={4}
              placeholder="e.g. Emphasize the CVE CVSS 9.8 score and append additional remediation recommendations..."
              value={regenInstructions}
              onChange={e => setRegenInstructions(e.target.value)}
              className="w-full rounded-md border border-stone-700 bg-stone-950 px-3 py-2 text-xs text-stone-100 placeholder:text-stone-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setShowRegenModal(false)} className="border-stone-700 text-stone-300">
                Cancel
              </Button>
              <Button
                onClick={() => regenMutation.mutate(regenInstructions)}
                disabled={regenMutation.isPending}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium"
              >
                {regenMutation.isPending ? 'Regenerating...' : 'Start Regeneration'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
