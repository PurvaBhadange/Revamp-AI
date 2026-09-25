import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { knowledgeApi } from '@/lib/api/knowledge';
import { KnowledgeSearchResult } from '@/types/knowledge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { EmptyState } from '@/components/ui/empty-state';
import { LoadingState } from '@/components/ui/loading-state';
import { Database, Search, Plus, Trash2, FileText, Layers, Sparkles, CheckCircle2 } from 'lucide-react';

export const KnowledgeBasePage: React.FC = () => {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<'documents' | 'search'>('documents');

  // Indexing Form State
  const [isIndexModalOpen, setIsIndexModalOpen] = useState(false);
  const [docTitle, setDocTitle] = useState('');
  const [docSourceType, setDocSourceType] = useState('text');
  const [docContent, setDocContent] = useState('');

  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<KnowledgeSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const { data: documents = [], isLoading } = useQuery({
    queryKey: ['knowledge-documents'],
    queryFn: () => knowledgeApi.listDocuments(),
  });

  const indexMutation = useMutation({
    mutationFn: (data: { title: string; content: string; sourceType: string }) =>
      knowledgeApi.indexDocument(data.title, data.content, data.sourceType),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['knowledge-documents'] });
      setIsIndexModalOpen(false);
      setDocTitle('');
      setDocContent('');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: knowledgeApi.deleteDocument,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['knowledge-documents'] });
    },
  });

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    try {
      const results = await knowledgeApi.search(searchQuery.trim(), 5);
      setSearchResults(results);
    } catch (err) {
      console.error('Semantic search error:', err);
    } finally {
      setIsSearching(false);
    }
  };

  const handleIndexSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docTitle.trim() || !docContent.trim()) return;
    indexMutation.mutate({
      title: docTitle.trim(),
      content: docContent.trim(),
      sourceType: docSourceType,
    });
  };

  if (isLoading) return <LoadingState label="Querying Qdrant Vector Knowledge Base..." />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <Database className="h-6 w-6 text-emerald-400" />
            Knowledge Base & RAG Vector Storage
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Qdrant-backed domain intelligence corpus used during AI transformation retrieval & grounding.
          </p>
        </div>
        <Button onClick={() => setIsIndexModalOpen(true)} className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Index Document
        </Button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('documents')}
          className={`px-4 py-2 text-xs font-semibold rounded-md transition flex items-center gap-2 ${
            activeTab === 'documents'
              ? 'bg-slate-800 text-emerald-400 border border-slate-700'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Layers className="h-4 w-4" />
          Indexed Documents ({documents.length})
        </button>
        <button
          onClick={() => setActiveTab('search')}
          className={`px-4 py-2 text-xs font-semibold rounded-md transition flex items-center gap-2 ${
            activeTab === 'search'
              ? 'bg-slate-800 text-emerald-400 border border-slate-700'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Search className="h-4 w-4" />
          Semantic Vector Search Test
        </button>
      </div>

      {/* Tab 1: Indexed Documents List */}
      {activeTab === 'documents' && (
        <div className="space-y-4">
          {documents.length === 0 ? (
            <EmptyState
              icon={Database}
              title="No Knowledge Documents Indexed"
              description="Upload or paste domain intelligence documents into Qdrant to improve AI transformation grounding."
              actionLabel="Index First Source"
              onAction={() => setIsIndexModalOpen(true)}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {documents.map(doc => (
                <Card key={doc.id} className="bg-slate-900/60 border-slate-800 hover:border-slate-700 transition">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-sm font-semibold text-slate-100 line-clamp-1 flex items-center gap-1.5">
                        <FileText className="h-4 w-4 text-emerald-400 shrink-0" />
                        {doc.title}
                      </CardTitle>
                      <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 bg-emerald-950/20 text-[10px] uppercase font-mono">
                        {doc.source_type}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3 pt-0">
                    <div className="text-xs text-slate-400 flex items-center justify-between font-mono pt-2 border-t border-slate-800/80">
                      <span>Chunks: <strong className="text-slate-200">{doc.chunk_count}</strong></span>
                      <span>{new Date(doc.created_at).toLocaleDateString()}</span>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          if (confirm(`Delete document "${doc.title}" from knowledge index?`)) {
                            deleteMutation.mutate(doc.id);
                          }
                        }}
                        className="text-slate-500 hover:text-rose-400 text-xs h-7 px-2"
                      >
                        <Trash2 className="h-3.5 w-3.5 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Vector Search Simulator */}
      {activeTab === 'search' && (
        <div className="space-y-6">
          <Card className="bg-slate-900/60 border-slate-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold text-slate-100 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-indigo-400" />
                Query Vector Embeddings
              </CardTitle>
              <p className="text-xs text-slate-400">
                Execute dense semantic similarity queries against Qdrant collection embeddings to test RAG grounding accuracy.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSearchSubmit} className="flex gap-2">
                <Input
                  type="text"
                  placeholder="e.g. Cobalt Strike lateral movement indicators or C2 infrastructure..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="bg-slate-950 border-slate-700 text-sm flex-1"
                />
                <Button type="submit" disabled={isSearching || !searchQuery.trim()} className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium">
                  {isSearching ? 'Querying...' : 'Search Vectors'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {searchResults.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">
                Similarity Search Results ({searchResults.length} matches)
              </h3>
              {searchResults.map((res, idx) => (
                <div key={idx} className="p-4 rounded-lg bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-200">
                      {res.metadata?.title || 'Knowledge Chunk'}
                    </span>
                    <Badge variant="outline" className="border-indigo-500/30 bg-indigo-950/30 text-indigo-400 font-mono text-xs">
                      Cosine Score: {(res.score * 100).toFixed(1)}%
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-300 font-mono bg-slate-950/60 p-3 rounded border border-slate-800/60 leading-relaxed">
                    "{res.chunk_text}"
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Index Modal */}
      {isIndexModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-lg max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <Database className="h-5 w-5 text-emerald-400" />
              Index Knowledge Source into Vector Database
            </h2>
            <form onSubmit={handleIndexSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300">Document Title *</label>
                <Input
                  type="text"
                  required
                  placeholder="e.g. NIST SP 800-61 Rev 2 Incident Handling Guide"
                  value={docTitle}
                  onChange={e => setDocTitle(e.target.value)}
                  className="bg-slate-950 border-slate-700 text-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300">Source Type</label>
                <select
                  value={docSourceType}
                  onChange={e => setDocSourceType(e.target.value)}
                  className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="text">Raw Text / Article</option>
                  <option value="pdf">PDF Report</option>
                  <option value="advisory">Security Advisory</option>
                  <option value="policy">Policy Standard</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300">Content / Intelligence Text *</label>
                <textarea
                  rows={6}
                  required
                  placeholder="Paste domain intelligence context or standard operational guidelines..."
                  value={docContent}
                  onChange={e => setDocContent(e.target.value)}
                  className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 font-mono placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" onClick={() => setIsIndexModalOpen(false)} className="border-slate-700 text-slate-300">
                  Cancel
                </Button>
                <Button type="submit" disabled={indexMutation.isPending} className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium">
                  {indexMutation.isPending ? 'Embedding & Indexing...' : 'Index Document'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
