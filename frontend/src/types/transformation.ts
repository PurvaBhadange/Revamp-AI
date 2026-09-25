export type TargetAudience = 'technical' | 'executive' | 'general_public' | 'defense';
export type Tone = 'urgent' | 'formal' | 'educational' | 'neutral' | 'threat_alert';
export type Objective = 'action_required' | 'information_dissemination' | 'policy_compliance';
export type UrgencyLevel = 'critical' | 'high' | 'medium' | 'low';

export type OutputFormat = 
  | 'executive_brief'
  | 'advisory'
  | 'social'
  | 'presentation'
  | 'infographic'
  | 'video';

export interface CentralContext {
  core_topic: string;
  executive_summary: string;
  key_findings: string[];
  entities: string[];
  threat_indicators: string[];
  affected_systems: string[];
  timeline: string[];
  technical_details: string[];
  urgency_level: UrgencyLevel;
  recommended_actions: string[];
  references: string[];
  confidence?: Record<string, any>;
}

export interface TransformationCreateRequest {
  project_id: string;
  source_document_ids: string[];
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
