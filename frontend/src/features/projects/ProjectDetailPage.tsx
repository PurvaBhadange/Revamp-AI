import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { projectsApi } from '@/lib/api/projects';
import { knowledgeApi } from '@/lib/api/knowledge';
import { transformationsApi } from '@/lib/api/transformations';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/common/StatusBadge';
import { SeverityBadge } from '@/components/common/SeverityBadge';
import { LoadingState } from '@/components/ui/loading-state';
import { EmptyState } from '@/components/ui/empty-state';
import { FolderGit2, ArrowLeft, Plus, Database, Sparkles, FileText, Clock, ExternalLink } from 'lucide-react';

interface ProjectDetailPageProps {
  id?: string;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({ id }) => {
  // Extract project ID from URL window location if not passed explicitly as prop
  const pathId = id || window.location.pathname.split('/projects/')[1];

  const { data: project, isLoading: isProjectLoading, error: projectError } = useQuery({
    queryKey: ['project', pathId],
    queryFn: () => projectsApi.get(pathId),
    enabled: !!pathId,
  });

  const { data: knowledgeDocs = [] } = useQuery({
    queryKey: ['knowledge-docs', pathId],
    queryFn: () => knowledgeApi.listDocuments(pathId),
    enabled: !!pathId,
  });

  const { data: transformations = [] } = useQuery({
    queryKey: ['transformations', pathId],
    queryFn: transformationsApi.list,
  });

  if (isProjectLoading) return <LoadingState label="Loading project details..." />;
  if (projectError || !project) {
    return (
      <EmptyState
        icon={FolderGit2}
        title="Project Not Found"
        description={`No project with identifier '${pathId}' was found.`}
        actionLabel="Back to Projects"
        onAction={() => window.location.href = '/projects'}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <a href="/projects" className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1">
              <ArrowLeft className="h-3.5 w-3.5" />
              Projects
            </a>
            <span className="text-slate-600">/</span>
            <span className="text-xs text-slate-300 font-mono">{project.id}</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <FolderGit2 className="h-6 w-6 text-indigo-400" />
            {project.name}
          </h1>
          {project.description && (
            <p className="text-sm text-slate-400 mt-1 max-w-3xl">
              {project.description}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <StatusBadge status={project.status || 'active'} />
          <a
            href={`/transform/new?project_id=${project.id}`}
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium px-3.5 py-2 rounded-md transition"
          >
            <Sparkles className="h-4 w-4" />
            New Transformation
          </a>
        </div>
      </div>

      {/* Grid Specs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Col: Associated Transformations */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-slate-200 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-indigo-400" />
              Transformations in this Project
            </h2>
          </div>

          {transformations.length === 0 ? (
            <EmptyState
              icon={Sparkles}
              title="No transformations recorded"
              description="Launch a new transformation to extract structured intelligence and output deliverables for this project."
            />
          ) : (
            <div className="space-y-3">
              {transformations.map(t => (
                <Card key={t.id} className="bg-slate-900/60 border-slate-800 hover:border-slate-700 transition">
                  <CardContent className="p-4 flex items-center justify-between gap-4">
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-slate-100 truncate">{t.source_document?.title || t.id}</span>
                        <SeverityBadge severity={t.severity} />
                      </div>
                      <div className="flex items-center gap-3 text-xs text-slate-400">
                        <span>Audience: <strong className="text-slate-300">{t.target_audience}</strong></span>
                        <span>•</span>
                        <span>Outputs: <strong className="text-slate-300">{t.output_formats.length} requested</strong></span>
                        <span>•</span>
                        <span className="flex items-center gap-1 font-mono">
                          <Clock className="h-3 w-3 text-slate-500" />
                          {new Date(t.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <a
                      href={`/transform/${t.id}`}
                      className="inline-flex items-center gap-1 text-xs font-medium text-indigo-400 hover:text-indigo-300 bg-indigo-950/40 border border-indigo-800/40 px-3 py-1.5 rounded transition shrink-0"
                    >
                      View Outputs
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Right Col: Indexed Knowledge Sources */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-slate-200 flex items-center gap-2">
              <Database className="h-4 w-4 text-emerald-400" />
              Indexed RAG Context ({knowledgeDocs.length})
            </h2>
          </div>

          <Card className="bg-slate-900/60 border-slate-800">
            <CardContent className="p-4 space-y-3">
              {knowledgeDocs.length === 0 ? (
                <p className="text-xs text-slate-400 py-2 text-center">
                  No knowledge base documents indexed for this specific project. Standard global intelligence corpus will be queried.
                </p>
              ) : (
                knowledgeDocs.map(doc => (
                  <div key={doc.id} className="p-2.5 rounded bg-slate-950/60 border border-slate-800 flex items-start justify-between gap-2">
                    <div className="space-y-0.5">
                      <p className="text-xs font-medium text-slate-200 line-clamp-1">{doc.title}</p>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono">
                        <span className="uppercase text-emerald-400">{doc.source_type}</span>
                        <span>•</span>
                        <span>{doc.chunk_count} chunks</span>
                      </div>
                    </div>
                    <FileText className="h-4 w-4 text-slate-500 shrink-0" />
                  </div>
                ))
              )}

              <a
                href="/knowledge-base"
                className="w-full inline-flex items-center justify-center gap-1.5 py-1.5 rounded border border-slate-700 bg-slate-800 text-slate-200 text-xs font-medium hover:bg-slate-700 transition"
              >
                Manage Knowledge Base
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
