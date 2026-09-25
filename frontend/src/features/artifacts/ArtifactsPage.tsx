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

  const { data: artifacts = [], isLoading, error } = useQuery({
    queryKey: ['artifacts'],
    queryFn: () => artifactsApi.list(),
  });

  const getArtifactIcon = (type: ArtifactType) => {
    switch (type) {
      case 'executive_brief':
        return <FileText className="h-4 w-4 text-sky-400" />;
      case 'security_advisory':
        return <ShieldAlert className="h-4 w-4 text-rose-400" />;
      case 'social_linkedin':
      case 'social_twitter':
        return <Share2 className="h-4 w-4 text-emerald-400" />;
      case 'presentation':
        return <Presentation className="h-4 w-4 text-indigo-400" />;
      case 'infographic':
        return <BarChart3 className="h-4 w-4 text-amber-400" />;
      case 'video_script':
      case 'video_package':
        return <Video className="h-4 w-4 text-purple-400" />;
      default:
        return <FileCode className="h-4 w-4 text-slate-400" />;
    }
  };

  const filteredArtifacts = artifacts.filter(art => {
    const matchesType = typeFilter === 'all' || art.artifact_type === typeFilter;
    const matchesSearch =
      art.title.toLowerCase().includes(search.toLowerCase()) ||
      art.artifact_type.toLowerCase().includes(search.toLowerCase());
    return matchesType && matchesSearch;
  });

  const handleDownload = async (art: Artifact) => {
    try {
      await artifactsApi.downloadFile(art.id, `${art.artifact_type}_${art.id}`);
    } catch (err) {
      console.error('Download error:', err);
      alert('Failed to download artifact file from backend API.');
    }
  };

  if (isLoading) return <LoadingState label="Fetching generated artifacts library..." />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <FileCode className="h-6 w-6 text-indigo-400" />
            Artifacts Library
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Central repository of all security briefs, advisories, decks, social threads, and media generated across transformations.
          </p>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-slate-900/60 p-3 rounded-lg border border-slate-800">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <Input
            type="text"
            placeholder="Search artifacts by title or type..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9 bg-slate-950 border-slate-700 text-sm"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-slate-400" />
          <select
            value={typeFilter}
            onChange={e => setTypeFilter(e.target.value)}
            className="rounded-md border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option value="all">All Deliverable Types</option>
            <option value="executive_brief">Executive Brief</option>
            <option value="security_advisory">Security Advisory</option>
            <option value="social_linkedin">LinkedIn Post</option>
            <option value="social_twitter">X / Twitter Thread</option>
            <option value="presentation">Presentation (PPTX)</option>
            <option value="infographic">Infographic Metrics</option>
            <option value="video_package">Video Package</option>
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
        <div className="overflow-x-auto border border-slate-800 rounded-lg bg-slate-900/60">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/80 text-[11px] font-mono uppercase text-slate-400">
                <th className="py-3 px-4">Artifact Deliverable</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Compliance Status</th>
                <th className="py-3 px-4">Created Date</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-xs text-slate-300">
              {filteredArtifacts.map(art => (
                <tr key={art.id} className="hover:bg-slate-800/40 transition">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded bg-slate-950 border border-slate-800 shrink-0">
                        {getArtifactIcon(art.artifact_type as ArtifactType)}
                      </div>
                      <div>
                        <a
                          href={`/artifacts/${art.id}`}
                          className="font-semibold text-slate-100 hover:text-indigo-400 transition line-clamp-1"
                        >
                          {art.title}
                        </a>
                        <span className="text-[10px] font-mono text-slate-500">ID: {art.id}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant="outline" className="border-slate-700 bg-slate-950 text-slate-300 font-mono uppercase text-[10px]">
                      {art.artifact_type.replace('_', ' ')}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    {art.validation?.is_valid ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400 bg-emerald-950/30 border border-emerald-800/30 px-2 py-0.5 rounded">
                        <CheckCircle2 className="h-3 w-3" />
                        VALIDATED
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-400 bg-amber-950/30 border border-amber-800/30 px-2 py-0.5 rounded">
                        <AlertTriangle className="h-3 w-3" />
                        FLAGGED
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-400">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-slate-500" />
                      {new Date(art.created_at).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDownload(art)}
                        className="h-7 text-xs text-slate-300 hover:text-indigo-400"
                      >
                        <Download className="h-3.5 w-3.5 mr-1" />
                        Download
                      </Button>
                      <a
                        href={`/artifacts/${art.id}`}
                        className="h-7 text-xs inline-flex items-center px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 transition font-medium"
                      >
                        <ExternalLink className="h-3.5 w-3.5 mr-1 text-slate-400" />
                        View
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
