import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { auditApi } from '@/lib/api/audit';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { LoadingState } from '@/components/ui/loading-state';
import { EmptyState } from '@/components/ui/empty-state';
import { History, Search, ShieldCheck, CheckCircle2, XCircle, Clock, User, Filter } from 'lucide-react';

export const AuditPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const { data: auditLogs = [], isLoading } = useQuery({
    queryKey: ['audit-logs'],
    queryFn: () => auditApi.list(100, 0),
  });

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch =
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      (log.resource && log.resource.toLowerCase().includes(search.toLowerCase())) ||
      (log.user_id && log.user_id.toLowerCase().includes(search.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || log.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (isLoading) return <LoadingState label="Retrieving system audit log trail..." />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <History className="h-6 w-6 text-indigo-400" />
            Activity & Enterprise Audit Log
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Immutable operational event records tracking user actions, agent executions, ingestion jobs, and artifact exports.
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-slate-900/60 p-3 rounded-lg border border-slate-800">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <Input
            type="text"
            placeholder="Search log by action, resource, or user..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9 bg-slate-950 border-slate-700 text-sm"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-slate-400" />
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="rounded-md border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option value="all">All Execution Statuses</option>
            <option value="success">Success</option>
            <option value="failed">Failed</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Table */}
      {filteredLogs.length === 0 ? (
        <EmptyState
          icon={History}
          title="No Audit Events Recorded"
          description="System events will be logged here as operators perform transformations and manage knowledge repositories."
        />
      ) : (
        <div className="overflow-x-auto border border-slate-800 rounded-lg bg-slate-900/60">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/80 text-[11px] font-mono uppercase text-slate-400">
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Operator / User</th>
                <th className="py-3 px-4">Action Event</th>
                <th className="py-3 px-4">Resource Target</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-xs text-slate-300">
              {filteredLogs.map(log => (
                <tr key={log.id} className="hover:bg-slate-800/40 transition">
                  <td className="py-3 px-4 font-mono text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-slate-500 shrink-0" />
                      {new Date(log.created_at).toLocaleString()}
                    </div>
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-300">
                    <div className="flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5 text-slate-500 shrink-0" />
                      {log.user_id || 'system'}
                    </div>
                  </td>
                  <td className="py-3 px-4 font-mono font-semibold text-slate-100">
                    {log.action}
                  </td>
                  <td className="py-3 px-4 font-mono text-indigo-400">
                    {log.resource || '—'}
                  </td>
                  <td className="py-3 px-4">
                    {log.status === 'success' || log.status === 'completed' ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/30 border border-emerald-800/30 px-2 py-0.5 rounded">
                        <CheckCircle2 className="h-3 w-3" />
                        SUCCESS
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-rose-400 bg-rose-950/30 border border-rose-800/30 px-2 py-0.5 rounded">
                        <XCircle className="h-3 w-3" />
                        FAILED
                      </span>
                    )}
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
