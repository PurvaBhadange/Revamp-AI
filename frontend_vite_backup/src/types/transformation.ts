export type TargetAudience = 'technical' | 'executive' | 'general_public' | 'defense';
export type Tone = 'urgent' | 'formal' | 'educational' | 'neutral' | 'threat_alert';
export type Objective = 'action_required' | 'information_dissemination' | 'policy_compliance';
export type UrgencyLevel = 'critical' | 'high' | 'medium' | 'low';
export type CybersecurityIntent = 
  | 'incident_report'
  | 'vulnerability_advisory'
  | 'threat_intelligence'
  | 'malware_analysis'
  | 'security_alert'
  | 'risk_assessment'
  | 'policy_update';

export type OutputFormat = 
  | 'executive_brief'
  | 'advisory'
  | 'social'
  | 'presentation'
  | 'infographic'
  | 'video';

export interface ProvenanceItem {
  fact: string;
  source_document_id: string;
  source_type: string;
  quote_snippet?: string | null;
  confidence_score: number;
}

export interface FactConflict {
  field_name: string;
  conflicting_values: string[];
  description: string;
  resolution_status: 'unresolved' | 'user_resolved';
}

export interface CentralContext {
  version?: number;
  status?: 'draft' | 'review' | 'approved';
  detected_intent?: CybersecurityIntent;
  user_intent?: CybersecurityIntent | null;
  core_topic: string;
  executive_summary: string;
  key_findings: string[];
  entities: string[];
  threat_indicators: string[];
  affected_systems: string[];
  timeline: string[];
  technical_details: string[];
  urgency_level: UrgencyLevel;
  business_impact?: string;
  operational_risk?: string;
  recommended_actions: string[];
  references: string[];
  provenance?: ProvenanceItem[];
  conflicts?: FactConflict[];
  retrieved_knowledge?: Record<string, any>[];
  confidence?: Record<string, any>;
}

export interface TransformationCreateRequest {
  project_id: string;
  source_document_ids: string[];
  user_intent?: CybersecurityIntent | null;
  target_audience: TargetAudience;
  tone: Tone;
  objective: Objective;
  urgency_level: UrgencyLevel;
  language: string;
  output_formats: OutputFormat[];
}

export interface TransformationCreateResponse {
  transformation_id: string;
  job_id: string;
  status: string;
}

export interface Transformation {
  id: string;
  project_id: string;
  status: 'queued' | 'running' | 'completed' | 'failed' | 'cancelled';
  current_stage: string;
  detected_intent?: CybersecurityIntent;
  user_intent?: CybersecurityIntent | null;
  ico_status?: 'draft' | 'review' | 'approved';
  ico_version?: number;
  target_audience: TargetAudience;
  tone: Tone;
  objective: Objective;
  urgency_level: UrgencyLevel;
  language: string;
  output_formats: OutputFormat[];
  source_document_ids: string[];
  central_context?: CentralContext | null;
  error_message?: string | null;
  created_at: string;
  updated_at: string;
}

