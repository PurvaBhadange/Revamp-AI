"use client";

import { User } from '@/types/auth';
import { Project } from '@/types/project';
import { Transformation } from '@/types/transformation';
import { Artifact } from '@/types/artifact';
import { KnowledgeDocument } from '@/types/knowledge';
import { AuditLog } from '@/types/audit';

export const mockUser: User = {
  id: 'usr_mock_001',
  email: 'admin@revamp.ai',
  full_name: 'Senior Threat Analyst',
  role: 'analyst',
  is_active: true,
};

export const mockProjects: Project[] = [
  {
    id: 'proj_01',
    name: 'Critical Ransomware Campaign Analysis',
    description: 'Investigation into APT29 zero-day gateway vulnerability and ransomware payloads.',
    status: 'active',
    owner_id: 'usr_mock_001',
    created_at: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
    updated_at: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
  {
    id: 'proj_02',
    name: 'Industrial ICS SCADA Threat Advisory',
    description: 'Substation SCADA protocol exploit intelligence transformation deck.',
    status: 'active',
    owner_id: 'usr_mock_001',
    created_at: new Date(Date.now() - 3600000 * 24 * 5).toISOString(),
    updated_at: new Date(Date.now() - 3600000 * 24 * 1).toISOString(),
  }
];

export const mockTransformations: Transformation[] = [
  {
    id: 'trans_demo_101',
    project_id: 'proj_01',
    status: 'completed',
    current_stage: 'completed',
    target_audience: 'executive',
    tone: 'urgent',
    objective: 'action_required',
    urgency_level: 'critical',
    language: 'English',
    output_formats: ['executive_brief', 'advisory', 'social', 'presentation', 'infographic', 'video'],
    source_document_ids: ['doc_001'],
    central_context: {
      core_topic: 'Zero-Day AD Privilege Escalation via Perimeter Exploit',
      executive_summary: 'At 03:14 IST, a zero-day exploit (CVE-2026-9912) was used to bypass the WAF, enabling lateral movement to the HR subnet. The attacker escalated privileges and extracted NTLM hashes from the primary Domain Controller. Containment isolated the subnet and suspended AD sync.',
      key_findings: [
        'Initial Access via T1190 legacy portal flaw.',
        'Privilege Escalation via T1068 PowerShell script.',
        'Credential Access via T1003.001 LSASS dump.'
      ],
      entities: ['HR Subnet', 'Active Directory DC', 'svchost_updater.exe'],
      threat_indicators: ['198.51.100.45', '203.0.113.88', 'sha256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'],
      affected_systems: ['Legacy Employee Portal', 'Primary Active Directory Domain Controllers'],
      timeline: ['03:14 IST - Initial lateral movement detected'],
      technical_details: ['Deserialization flaw in WAF', 'PowerShell SYSTEM elevation'],
      urgency_level: 'critical',
      recommended_actions: [
        'Isolate HR subnet (192.0.2.0/24).',
        'Force-reset service account passwords.',
        'Pause Active Directory synchronization.'
      ],
      references: ['CVE-2026-9912', 'MITRE ATT&CK T1190']
    },
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
    updated_at: new Date(Date.now() - 3600000 * 1).toISOString(),
  }
];

export const mockArtifacts: Artifact[] = [
  {
    id: 'art_exec_01',
    transformation_id: 'trans_demo_101',
    type: 'executive_brief',
    title: 'Executive Brief Report',
    status: 'generated',
    content: {
      title: 'Executive Brief: Critical Perimeter Breach Alert',
      executive_summary: 'A critical perimeter vulnerability (CVE-2026-1001) has been confirmed active in enterprise networks.',
      business_impact: 'Potential operational shutdown of core identity servers; high risk of ransom deployment within 12 hours.',
      operational_risk: 'High financial & regulatory compliance liability if customer data repository is accessed.',
      immediate_decisions: ['Approve emergency system maintenance window.', 'Authorize external incident response team deployment.'],
      recommended_actions: ['Isolate affected gateway nodes.', 'Deploy mandatory multi-factor authentication reset.']
    },
    size: 24500,
    validation_status: {
      status: 'passed',
      warnings: [],
      issues: [],
      checks: { source_grounding: true, severity_consistency: true, pii_detection: true }
    },
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
    updated_at: new Date(Date.now() - 3600000 * 1).toISOString(),
  },
  {
    id: 'art_adv_01',
    transformation_id: 'trans_demo_101',
    type: 'advisory',
    title: 'Security Advisory Alert',
    status: 'generated',
    content: {
      title: 'SECURITY ADVISORY: Emergency Gateway Vulnerability',
      severity: 'CRITICAL',
      threat_overview: 'Active exploitation of heap buffer overflow in perimeter gateway SSL module.',
      affected_systems: ['Primary Firewall Gateway', 'Domain Controllers'],
      indicators: ['192.168.1.100', 'hash: 44d88612fea8a8f36de82e1278abb02f'],
      mitigation_steps: ['Patch gateway to v4.2.1', 'Block remote management interface over WAN'],
      recommended_actions: ['Conduct full memory dump audit of Domain Controller 01'],
      references: ['CISA Advisory AA26-080A']
    },
    file_path: '/storage/pdf/trans_demo_101_advisory.pdf',
    mime_type: 'application/pdf',
    size: 148000,
    validation_status: { status: 'passed' },
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
    updated_at: new Date(Date.now() - 3600000 * 1).toISOString(),
  }
];

export const mockKnowledgeDocuments: KnowledgeDocument[] = [
  {
    id: 'kb_doc_01',
    title: 'APT29 Attack Tactics & Infrastructure Playbook',
    source_type: 'pdf',
    chunk_count: 42,
    created_at: new Date(Date.now() - 3600000 * 24 * 3).toISOString()
  },
  {
    id: 'kb_doc_02',
    title: 'Enterprise SCADA Threat Matrix Baseline',
    source_type: 'docx',
    chunk_count: 28,
    created_at: new Date(Date.now() - 3600000 * 24 * 7).toISOString()
  }
];

export const mockAuditLogs: AuditLog[] = [
  {
    id: 'audit_01',
    user_id: 'usr_mock_001',
    action: 'create_transformation',
    resource: 'transformation',
    resource_id: 'trans_demo_101',
    status: 'success',
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString()
  },
  {
    id: 'audit_02',
    user_id: 'usr_mock_001',
    action: 'download_artifact',
    resource: 'artifact',
    resource_id: 'art_adv_01',
    status: 'success',
    timestamp: new Date(Date.now() - 3600000 * 1).toISOString()
  }
];
