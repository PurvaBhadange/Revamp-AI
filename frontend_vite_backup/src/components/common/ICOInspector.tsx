import React, { useState, useEffect } from 'react';
import { ICOSchema, IntentType, FactConflict, ProvenanceItem } from '@/types/transformation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  ShieldAlert,
  CheckCircle,
  AlertTriangle,
  FileText,
  Tag,
  Clock,
  ExternalLink,
  Edit2,
  Save,
  UserCheck,
  Layers,
  Sparkles,
  Search,
  BookOpen
} from 'lucide-react';

interface ICOInspectorProps {
  ico: ICOSchema | null;
  onApprove?: () => void;
  onUpdate?: (updatedICO: ICOSchema) => Promise<void> | void;
  isApproving?: boolean;
  isEditingAllowed?: boolean;
  readOnly?: boolean;
}

const INTENT_OPTIONS: { id: IntentType; label: string; desc: string }[] = [
  { id: 'incident_report', label: 'Incident Report', desc: 'Active security incident analysis & response' },
  { id: 'vulnerability_advisory', label: 'Vulnerability Advisory', desc: 'CVE disclosure & technical patch instructions' },
  { id: 'threat_intelligence', label: 'Threat Intelligence', desc: 'Actor TTPs, IoCs, and threat landscape report' },
  { id: 'malware_analysis', label: 'Malware Analysis', desc: 'Reverse engineering findings & indicator list' },
  { id: 'security_alert', label: 'Security Alert', desc: 'Urgent notification requiring immediate mitigation' },
  { id: 'risk_assessment', label: 'Risk Assessment', desc: 'Systemic security audit & impact evaluate' },
  { id: 'policy_update', label: 'Policy Update', desc: 'Compliance guidelines & governance directive' },
];

export const ICOInspector: React.FC<ICOInspectorProps> = ({
  ico,
  onApprove,
  onUpdate,
  isApproving = false,
  isEditingAllowed = true,
  readOnly = false,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'provenance' | 'conflicts' | 'rag'>('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [editedICO, setEditedICO] = useState<ICOSchema | null>(ico);
  const [selectedIntent, setSelectedIntent] = useState<IntentType>(
    ico?.user_intent || ico?.detected_intent || 'security_alert'
  );

  useEffect(() => {
    setEditedICO(ico);
    if (ico) {
      setSelectedIntent(ico.user_intent || ico.detected_intent || 'security_alert');
    }
  }, [ico]);

  if (!ico || !editedICO) {
    return (
      <Card className="p-8 text-center border-stone-200 bg-stone-50">
        <Sparkles className="h-8 w-8 text-orange-600 mx-auto animate-pulse mb-3" />
        <h3 className="text-sm font-semibold text-stone-700">Extracting Intent Context Object (ICO)...</h3>
        <p className="text-xs text-stone-500 mt-1">Normalizing facts, threat indicators, and source provenance.</p>
      </Card>
    );
  }

  const handleIntentChange = (newIntent: IntentType) => {
    setSelectedIntent(newIntent);
    setEditedICO((prev) => (prev ? { ...prev, user_intent: newIntent } : null));
  };

  const handleSave = async () => {
    if (onUpdate && editedICO) {
      await onUpdate({ ...editedICO, user_intent: selectedIntent });
    }
    setIsEditing(false);
  };

  const confidencePct = Math.round((editedICO.confidence_score || 0.9) * 100);
  const hasConflicts = (editedICO.conflicts && editedICO.conflicts.length > 0);

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between p-4 rounded-lg border border-orange-500/30 bg-orange-50/20">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-lg bg-orange-900/50 border border-orange-700 text-orange-600">
            <Layers className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-base font-bold text-stone-900">{editedICO.core_topic || 'Cybersecurity Context'}</h2>
              <Badge variant={editedICO.status === 'approved' ? 'success' : 'warning'} className="uppercase text-xs">
                {editedICO.status || 'review'}
              </Badge>
              <span className="text-xs text-stone-600 font-mono">v{editedICO.version || 1}.0</span>
            </div>
            <p className="text-xs text-stone-600 mt-0.5">
              Source of Truth for LangGraph Multi-Agent Transformation Pipeline
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3 mt-3 sm:mt-0">
          <div className="text-right">
            <span className="text-xs text-stone-500 block uppercase font-mono">Fact Confidence</span>
            <span className="text-xs font-bold text-emerald-600">{confidencePct}% High</span>
          </div>

          {!readOnly && isEditingAllowed && (
            isEditing ? (
              <Button variant="primary" size="sm" onClick={handleSave}>
                <Save className="h-4 w-4 mr-1.5" /> Save Edits
              </Button>
            ) : (
              <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                <Edit2 className="h-4 w-4 mr-1.5" /> Edit ICO
              </Button>
            )
          )}
        </div>
      </div>

      {/* Conflicts Warning Alert */}
      {hasConflicts && (
        <div className="p-5 rounded-lg border border-amber-500/40 bg-amber-950/30 flex items-start space-x-3">
          <AlertTriangle className="h-6 w-6 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-amber-700 uppercase">Fact Conflicts Detected ({editedICO.conflicts?.length})</h4>
            <p className="text-xs text-amber-200/80">
              Multiple source documents contain conflicting statements. Review conflicts tab before approval.
            </p>
          </div>
        </div>
      )}

      {/* Tabs Bar */}
      <div className="flex border-b border-stone-200 space-x-4 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-2.5 flex items-center space-x-2 border-b-2 transition-all ${
            activeTab === 'overview'
              ? 'border-orange-500 text-orange-600 font-bold'
              : 'border-transparent text-stone-600 hover:text-stone-900'
          }`}
        >
          <BookOpen className="h-4 w-4" /> <span>ICO Fact Summary</span>
        </button>
        <button
          onClick={() => setActiveTab('provenance')}
          className={`pb-2.5 flex items-center space-x-2 border-b-2 transition-all ${
            activeTab === 'provenance'
              ? 'border-orange-500 text-orange-600 font-bold'
              : 'border-transparent text-stone-600 hover:text-stone-900'
          }`}
        >
          <FileText className="h-4 w-4" /> <span>Source Provenance ({editedICO.provenance?.length || 0})</span>
        </button>
        {hasConflicts && (
          <button
            onClick={() => setActiveTab('conflicts')}
            className={`pb-2.5 flex items-center space-x-2 border-b-2 transition-all ${
              activeTab === 'conflicts'
                ? 'border-amber-500 text-amber-600 font-bold'
                : 'border-transparent text-amber-500/70 hover:text-amber-600'
            }`}
          >
            <AlertTriangle className="h-4 w-4" /> <span>Fact Conflicts ({editedICO.conflicts?.length})</span>
          </button>
        )}
        {editedICO.retrieved_knowledge && editedICO.retrieved_knowledge.length > 0 && (
          <button
            onClick={() => setActiveTab('rag')}
            className={`pb-2.5 flex items-center space-x-2 border-b-2 transition-all ${
              activeTab === 'rag'
                ? 'border-purple-500 text-purple-400 font-bold'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Search className="h-4 w-4" /> <span>RAG Context ({editedICO.retrieved_knowledge.length})</span>
          </button>
        )}
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Intent Classifier & Override */}
          <Card className="border-stone-200 bg-stone-50 p-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-stone-700 uppercase tracking-wider flex items-center space-x-1.5">
                  <ShieldAlert className="h-4 w-4 text-orange-600" />
                  <span>Detected Intelligence Intent</span>
                </label>
                {editedICO.user_intent && (
                  <Badge variant="info" className="text-xs">User Overridden</Badge>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {INTENT_OPTIONS.map((opt) => {
                  const isSelected = selectedIntent === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleIntentChange(opt.id)}
                      className={`p-3 rounded-md border text-left transition-all ${
                        isSelected
                          ? 'border-orange-500 bg-orange-50 text-orange-700 ring-1 ring-orange-500'
                          : 'border-stone-300 bg-white text-stone-600 hover:border-dark-600 hover:text-stone-900'
                      }`}
                    >
                      <span className="text-xs font-bold block">{opt.label}</span>
                      <span className="text-xs text-stone-500 block mt-0.5 line-clamp-1">{opt.desc}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </Card>

          {/* Grid of Attributes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Core Objective & Target Audience */}
            <Card className="border-stone-200 bg-stone-50 p-4 space-y-3">
              <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider border-b border-stone-200 pb-2">
                Core Objective & Audience
              </h4>
              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-stone-500 block text-xs uppercase font-mono">Objective</span>
                  <p className="text-stone-900 font-medium">{editedICO.core_objective || 'Analyze cybersecurity intelligence'}</p>
                </div>
                <div>
                  <span className="text-stone-500 block text-xs uppercase font-mono">Primary Audience</span>
                  <p className="text-orange-600 font-semibold capitalize">{editedICO.target_audience || 'Executive & Technical'}</p>
                </div>
                <div>
                  <span className="text-stone-500 block text-xs uppercase font-mono">Urgency / Severity</span>
                  <Badge variant={editedICO.severity === 'HIGH' || editedICO.severity === 'CRITICAL' ? 'danger' : 'warning'} className="uppercase mt-1 font-mono">
                    {editedICO.severity || 'HIGH'}
                  </Badge>
                </div>
              </div>
            </Card>

            {/* Affected Systems */}
            <Card className="border-stone-200 bg-stone-50 p-4 space-y-3">
              <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider border-b border-stone-200 pb-2">
                Affected Infrastructure & Systems
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {(editedICO.affected_systems && editedICO.affected_systems.length > 0) ? (
                  editedICO.affected_systems.map((sys, idx) => (
                    <Badge key={idx} variant="info" className="font-mono text-xs">
                      {sys}
                    </Badge>
                  ))
                ) : (
                  <span className="text-xs text-stone-500 italic">No specific systems isolated</span>
                )}
              </div>
            </Card>
          </div>

          {/* Extracted Facts & Provenance */}
          <Card className="border-stone-200 bg-stone-50 p-4 space-y-3">
            <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider border-b border-stone-200 pb-2 flex items-center justify-between">
              <span>Extracted Factual Claims ({editedICO.key_facts?.length || 0})</span>
              <span className="text-xs text-stone-500 font-mono">Source Verified</span>
            </h4>
            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {(editedICO.key_facts && editedICO.key_facts.length > 0) ? (
                editedICO.key_facts.map((fact, idx) => (
                  <div key={idx} className="p-3 rounded bg-white border border-stone-200 text-xs flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-stone-900">{fact}</p>
                      {editedICO.provenance && editedICO.provenance[idx] && (
                        <span className="text-xs font-mono text-stone-500 mt-1 block">
                          Source: {editedICO.provenance[idx].source_file} (Confidence: {Math.round(editedICO.provenance[idx].confidence * 100)}%)
                        </span>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <span className="text-xs text-stone-500 italic">No extracted facts available.</span>
              )}
            </div>
          </Card>

          {/* IoCs / Threat Indicators & Entities */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-stone-200 bg-stone-50 p-4 space-y-3">
              <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider border-b border-stone-200 pb-2 flex items-center space-x-1.5">
                <Tag className="h-4 w-4 text-amber-600" />
                <span>Indicators of Compromise (IoCs)</span>
              </h4>
              <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                {(editedICO.threat_indicators && editedICO.threat_indicators.length > 0) ? (
                  editedICO.threat_indicators.map((ioc, idx) => (
                    <span key={idx} className="px-2 py-1 rounded bg-amber-950/40 border border-amber-800/60 text-amber-700">
                      {ioc}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-stone-500 italic">No explicit IoCs detected</span>
                )}
              </div>
            </Card>

            <Card className="border-stone-200 bg-stone-50 p-4 space-y-3">
              <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider border-b border-stone-200 pb-2">
                Extracted Threat Entities
              </h4>
              <div className="flex flex-wrap gap-1.5 text-xs">
                {(editedICO.entities && editedICO.entities.length > 0) ? (
                  editedICO.entities.map((ent, idx) => (
                    <span key={idx} className="px-2 py-1 rounded bg-white border border-stone-300 text-stone-700">
                      {ent}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-stone-500 italic">No threat entities parsed</span>
                )}
              </div>
            </Card>
          </div>

          {/* Timeline & Recommendations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-stone-200 bg-stone-50 p-4 space-y-3">
              <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider border-b border-stone-200 pb-2 flex items-center space-x-1.5">
                <Clock className="h-4 w-4 text-orange-600" />
                <span>Incident Timeline</span>
              </h4>
              <ul className="space-y-1.5 text-xs font-mono text-stone-700">
                {(editedICO.timeline && editedICO.timeline.length > 0) ? (
                  editedICO.timeline.map((ev, idx) => (
                    <li key={idx} className="p-1.5 rounded bg-white border border-stone-200">
                      • {ev}
                    </li>
                  ))
                ) : (
                  <li className="text-stone-500 italic">No timeline entries found</li>
                )}
              </ul>
            </Card>

            <Card className="border-stone-200 bg-stone-50 p-4 space-y-3">
              <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider border-b border-stone-200 pb-2">
                Actionable Recommendations
              </h4>
              <ul className="space-y-1.5 text-xs text-stone-700">
                {(editedICO.recommendations && editedICO.recommendations.length > 0) ? (
                  editedICO.recommendations.map((rec, idx) => (
                    <li key={idx} className="p-1.5 rounded bg-emerald-50/20 border border-emerald-800/40 text-emerald-700 flex items-start space-x-1.5">
                      <span className="font-bold">•</span> <span>{rec}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-stone-500 italic">No recommendations specified</li>
                )}
              </ul>
            </Card>
          </div>
        </div>
      )}

      {/* TAB 2: PROVENANCE */}
      {activeTab === 'provenance' && (
        <Card className="border-stone-200 bg-stone-50 p-4 space-y-3">
          <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider border-b border-stone-200 pb-2">
            Detailed Source Provenance Mapping
          </h4>
          <div className="space-y-2">
            {(editedICO.provenance && editedICO.provenance.length > 0) ? (
              editedICO.provenance.map((p, idx) => (
                <div key={idx} className="p-3 rounded-md bg-white border border-stone-200 space-y-1">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-orange-600 font-bold">{p.source_file}</span>
                    <Badge variant="outline" className="text-xs">
                      Confidence: {Math.round(p.confidence * 100)}%
                    </Badge>
                  </div>
                  <p className="text-xs text-stone-900 mt-1 font-semibold">{p.fact}</p>
                  <p className="text-xs text-stone-600 italic bg-stone-50 p-2 rounded border border-stone-200 mt-1">
                    "{p.raw_text_snippet}"
                  </p>
                </div>
              ))
            ) : (
              <p className="text-xs text-stone-500 italic p-4 text-center">No explicit provenance mapping found.</p>
            )}
          </div>
        </Card>
      )}

      {/* TAB 3: CONFLICTS */}
      {activeTab === 'conflicts' && (
        <Card className="border-stone-200 bg-stone-50 p-4 space-y-3">
          <h4 className="text-xs font-bold text-amber-600 uppercase tracking-wider border-b border-stone-200 pb-2 flex items-center space-x-2">
            <AlertTriangle className="h-4 w-4" />
            <span>Conflicting Fact Discrepancies</span>
          </h4>
          <div className="space-y-3">
            {editedICO.conflicts?.map((c, idx) => (
              <div key={idx} className="p-3 rounded-md bg-amber-950/20 border border-amber-800/40 text-xs space-y-2">
                <p className="font-semibold text-amber-200">{c.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="p-2 rounded bg-white border border-stone-200">
                    <span className="text-stone-500 font-mono block text-xs">Source A ({c.source_a})</span>
                    <span className="text-stone-700">{c.fact_a}</span>
                  </div>
                  <div className="p-2 rounded bg-white border border-stone-200">
                    <span className="text-stone-500 font-mono block text-xs">Source B ({c.source_b})</span>
                    <span className="text-stone-700">{c.fact_b}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* TAB 4: RAG CONTEXT */}
      {activeTab === 'rag' && (
        <Card className="border-stone-200 bg-stone-50 p-4 space-y-3">
          <h4 className="text-xs font-bold text-purple-400 uppercase tracking-wider border-b border-stone-200 pb-2 flex items-center space-x-2">
            <Search className="h-4 w-4" />
            <span>Retrieved Qdrant Knowledge Passages</span>
          </h4>
          <div className="space-y-3">
            {editedICO.retrieved_knowledge?.map((pass, idx) => (
              <div key={idx} className="p-3 rounded bg-white border border-stone-200 text-xs space-y-1">
                <div className="flex items-center justify-between text-xs font-mono text-purple-300">
                  <span>Knowledge Base Chunk #{idx + 1}</span>
                  <span>Score: {pass.score ? pass.score.toFixed(3) : 'N/A'}</span>
                </div>
                <p className="text-stone-700">{pass.content || pass.text}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Action Footer Button: Approve ICO */}
      {!readOnly && onApprove && (
        <div className="flex items-center justify-end space-x-3 pt-2">
          <Button
            variant="primary"
            size="lg"
            onClick={onApprove}
            isLoading={isApproving}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold"
          >
            <UserCheck className="h-6 w-6 mr-2" /> APPROVE ICO & PROCEED TO GENERATION
          </Button>
        </div>
      )}
    </div>
  );
};
