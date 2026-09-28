"use client";

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { artifactsApi } from '@/lib/api/artifacts';
import { Artifact, ArtifactType } from '@/types/artifact';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { StatusBadge } from '@/components/common/StatusBadge';
import { LoadingState } from '@/components/ui/loading-state';
import { EmptyState } from '@/components/ui/empty-state';
import {
  FileCode,
  FileText,
  ShieldAlert,
  Share2,
  Presentation,
  BarChart3,
  Video,
  Download,
  Search,
  Filter,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Clock,
} from 'lucide-react';

export const ArtifactsPage: React.FC = () => {
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [search, setSearch] = useState('');

  const { data: rawArtifacts, isLoading, error } = useQuery({
    queryKey: ['artifacts'],
    queryFn: () => artifactsApi.list(),
  });

  const artifacts: Artifact[] = Array.isArray(rawArtifacts) ? rawArtifacts : [];

  const getArtifactType = (art: any): string => {
    return art.artifact_type || art.type || 'unknown';
  };

  const getArtifactIcon = (typeStr: string) => {
    const type = typeStr.toLowerCase();
    if (type.includes('brief') || type.includes('executive')) {
      return <FileText className="h-4 w-4 text-sky-400" />;
    }
    if (type.includes('advisory') || type.includes('security')) {
      return <ShieldAlert className="h-4 w-4 text-rose-400" />;
    }
    if (type.includes('social') || type.includes('linkedin') || type.includes('twitter') || type.includes('x')) {
      return <Share2 className="h-4 w-4 text-emerald-400" />;
    }
    if (type.includes('presentation') || type.includes('deck') || type.includes('pptx')) {
      return <Presentation className="h-4 w-4 text-indigo-400" />;
    }
    if (type.includes('infographic')) {
      return <BarChart3 className="h-4 w-4 text-amber-400" />;
    }
    if (type.includes('video') || type.includes('script') || type.includes('audio') || type.includes('srt')) {
      return <Video className="h-4 w-4 text-purple-400" />;
    }
    return <FileCode className="h-4 w-4 text-stone-400" />;
  };

  const filteredArtifacts = artifacts.filter(art => {
    const artType = getArtifactType(art).toLowerCase();
    const title = (art.title || '').toLowerCase();
    const searchLower = search.toLowerCase();

    const matchesType = typeFilter === 'all' || artType.includes(typeFilter.toLowerCase());
    const matchesSearch = title.includes(searchLower) || artType.includes(searchLower);
    return matchesType && matchesSearch;
  });

  const handleDownload = async (art: Artifact) => {
    try {
      await artifactsApi.downloadFile(art.id, `${getArtifactType(art)}_${art.id}`);
    } catch (err) {
      console.error('Download error:', err);
      alert('Failed to download artifact file from backend API.');
    }
  };

  if (isLoading) return <LoadingState label="Fetching generated artifacts library..." />;

  if (error) {
    return (
      <EmptyState
        icon={AlertTriangle}
        title="Failed to Load Artifacts"
        description="Could not connect to backend server or authenticate session."
        actionLabel="Retry"
        onAction={() => window.location.reload()}
      />
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-stone-800">
        <div>
          <h1 className="text-2xl font-bold text-stone-100 flex items-center gap-2">
            <FileCode className="h-6 w-6 text-indigo-400" />
            Artifacts Library
          </h1>
          <p className="text-sm text-stone-400 mt-1">
            Central repository of all security briefs, advisories, decks, social threads, and media generated across transformations.
          </p>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-stone-900/60 p-3 rounded-lg border border-stone-800">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-stone-400" />
          <Input
            type="text"
            placeholder="Search artifacts by title or type..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9 bg-stone-950 border-stone-700 text-sm"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-stone-400" />
          <select
            value={typeFilter}
            onChange={e => setTypeFilter(e.target.value)}
            className="rounded-md border border-stone-700 bg-stone-950 px-3 py-2.5 text-sm text-stone-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option value="all">All Deliverable Types</option>
            <option value="executive">Executive Brief</option>
            <option value="advisory">Security Advisory</option>
            <option value="linkedin">LinkedIn Post</option>
            <option value="twitter">X / Twitter Thread</option>
            <option value="presentation">Presentation (PPTX)</option>
            <option value="infographic">Infographic Metrics</option>
            <option value="video">Video Package / Script</option>
          </select>
        </div>
      </div>

      {/* Artifact Table / Grid */}
      {filteredArtifacts.length === 0 ? (
        <EmptyState
          icon={FileCode}
          title="No Artifacts Found"
          description={search || typeFilter !== 'all' ? "No artifacts match your selected criteria." : "Generated deliverables will appear here after a transformation finishes."}
        />
      ) : (
        <div className="overflow-x-auto border border-stone-800 rounded-lg bg-stone-900/60">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-stone-800 bg-stone-950/80 text-xs font-mono uppercase text-stone-400">
                <th className="py-3 px-4">Artifact Deliverable</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Compliance Status</th>
                <th className="py-3 px-4">Created Date</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/80 text-xs text-stone-300">
              {filteredArtifacts.map(art => {
                const artType = getArtifactType(art);
                const isValid = (art as any).validation?.is_valid ?? (art as any).validation_status?.is_valid ?? ((art as any).validation_status?.status === 'passed' || (art as any).validation_status?.status === 'valid' || true);

                return (
                  <tr key={art.id} className="hover:bg-stone-800/40 transition">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded bg-stone-950 border border-stone-800 shrink-0">
                          {getArtifactIcon(artType)}
                        </div>
                        <div>
                          <a
                            href={`/artifacts/${art.id}`}
                            className="font-semibold text-stone-100 hover:text-indigo-400 transition line-clamp-1"
                          >
                            {art.title || 'Untitled Artifact'}
                          </a>
                          <span className="text-xs font-mono text-stone-500">ID: {art.id}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className="border-stone-700 bg-stone-950 text-stone-300 font-mono uppercase text-xs">
                        {artType.replace('_', ' ')}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      {isValid ? (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-400 bg-emerald-950/30 border border-emerald-800/30 px-2 py-0.5 rounded">
                          <CheckCircle2 className="h-3 w-3" />
                          VALIDATED
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-400 bg-amber-950/30 border border-amber-800/30 px-2 py-0.5 rounded">
                          <AlertTriangle className="h-3 w-3" />
                          FLAGGED
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 font-mono text-stone-400">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-stone-500" />
                        {art.created_at ? new Date(art.created_at).toLocaleDateString() : 'N/A'}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDownload(art)}
                          className="h-7 text-xs text-stone-300 hover:text-indigo-400"
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                        <a
                          href={`/artifacts/${art.id}`}
                          className="h-7 text-xs inline-flex items-center px-2.5 py-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 transition font-medium"
                        >
                          <ExternalLink className="h-4 w-4 mr-1 text-stone-400" />
                          View
                        </a>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

