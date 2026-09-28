import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { projectsApi } from '@/lib/api/projects';
import { Project } from '@/types/project';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { StatusBadge } from '@/components/common/StatusBadge';
import { EmptyState } from '@/components/ui/empty-state';
import { LoadingState } from '@/components/ui/loading-state';
import { FolderGit2, Plus, Search, Calendar, FileText, ArrowRight, Trash2 } from 'lucide-react';
import { useNavigate } from 'react me-router-dom'; // using standard react router if needed, or link

export const ProjectsPage: React.FC = () => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDesc, setNewProjectDesc] = useState('');

  const { data: projects = [], isLoading, error } = useQuery({
    queryKey: ['projects'],
    queryFn: projectsApi.list,
  });

  const createMutation = useMutation({
    mutationFn: projectsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      setIsModalOpen(false);
      setNewProjectName('');
      setNewProjectDesc('');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: projectsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });

  const filteredProjects = projects.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    (p.description && p.description.toLowerCase().includes(search.toLowerCase()))
  );

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectName.trim()) return;
    createMutation.mutate({
      name: newProjectName.trim(),
      description: newProjectDesc.trim() || undefined,
    });
  };

  if (isLoading) return <LoadingState label="Loading intelligence projects..." />;
  if (error) return <EmptyState icon={FolderGit2} title="Failed to load projects" description="There was an error communicating with the backend API." />;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-stone-800">
        <div>
          <h1 className="text-2xl font-bold text-stone-100 flex items-center gap-2">
            <FolderGit2 className="h-6 w-6 text-indigo-400" />
            Intelligence Projects
          </h1>
          <p className="text-sm text-stone-400 mt-1">
            Organize transformations, source documents, and knowledge repositories by mission or threat campaign.
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Project
        </Button>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4 bg-stone-900/60 p-3 rounded-lg border border-stone-800">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-stone-400" />
          <Input
            type="text"
            placeholder="Search projects by name or description..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9 bg-stone-950 border-stone-700 text-sm"
          />
        </div>
        <div className="text-xs text-stone-400 font-mono">
          Total Projects: <span className="text-stone-200 font-semibold">{filteredProjects.length}</span>
        </div>
      </div>

      {/* Project Grid */}
      {filteredProjects.length === 0 ? (
        <EmptyState
          icon={FolderGit2}
          title="No projects found"
          description={search ? "No project matches your search parameters." : "Create your first intelligence project to organize document transformations."}
          actionLabel={!search ? "Create First Project" : undefined}
          onAction={!search ? () => setIsModalOpen(true) : undefined}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.map(project => (
            <Card key={project.id} className="bg-stone-900/60 border-stone-800 hover:border-stone-700 transition duration-150 flex flex-col justify-between">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-base font-semibold text-stone-100 line-clamp-1">{project.name}</CardTitle>
                  <StatusBadge status={project.status || 'active'} />
                </div>
                <p className="text-xs text-stone-400 mt-1 line-clamp-2 min-h-[2.5rem]">
                  {project.description || 'No description provided.'}
                </p>
              </CardHeader>
              <CardContent className="pt-0 space-y-8">
                <div className="flex items-center justify-between text-xs text-stone-400 pt-3 border-t border-stone-800/80">
                  <span className="flex items-center gap-1 font-mono">
                    <Calendar className="h-4 w-4 text-stone-500" />
                    {new Date(project.created_at).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1 font-mono text-indigo-400">
                    <FileText className="h-4 w-4" />
                    {project.id}
                  </span>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <a
                    href={`/projects/${project.id}`}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded text-xs font-medium bg-stone-800 hover:bg-stone-700 text-stone-200 transition"
                  >
                    View Project Details
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      if (confirm(`Are you sure you want to delete project ${project.name}?`)) {
                        deleteMutation.mutate(project.id);
                      }
                    }}
                    className="text-stone-500 hover:text-rose-400 hover:bg-stone-800/50 p-1.5"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Modal Dialog for New Project */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-stone-800 rounded-lg max-w-md w-full p-6 space-y-8 shadow-2xl">
            <h2 className="text-lg font-bold text-stone-100 flex items-center gap-2">
              <FolderGit2 className="h-6 w-6 text-indigo-400" />
              New Intelligence Project
            </h2>
            <form onSubmit={handleCreate} className="space-y-8">
              <div className="space-y-1">
                <label className="text-xs font-medium text-stone-300">Project Name *</label>
                <Input
                  type="text"
                  required
                  placeholder="e.g. Operation CyberStorm 2026"
                  value={newProjectName}
                  onChange={e => setNewProjectName(e.target.value)}
                  className="bg-stone-950 border-stone-700 text-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-stone-300">Description</label>
                <textarea
                  rows={3}
                  placeholder="Briefly describe the campaign, threat actor, or objective..."
                  value={newProjectDesc}
                  onChange={e => setNewProjectDesc(e.target.value)}
                  className="w-full rounded-md border border-stone-700 bg-stone-950 px-3 py-2 text-sm text-stone-100 placeholder:text-stone-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} className="border-stone-700 text-stone-300">
                  Cancel
                </Button>
                <Button type="submit" disabled={createMutation.isPending} className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium">
                  {createMutation.isPending ? 'Creating...' : 'Create Project'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
