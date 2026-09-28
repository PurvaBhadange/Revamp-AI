import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Shield,
  ShieldAlert,
  ShieldCheck,
  Cpu,
  FileText,
  FileCheck,
  Video,
  Presentation,
  Share2,
  Database,
  ArrowRight,
  CheckCircle2,
  Activity,
  Layers,
  Sparkles,
  Lock,
  Terminal,
  ExternalLink,
  ChevronRight,
  Sliders,
  Eye,
  Copy,
  Check,
  AlertTriangle
} from 'lucide-react';

interface LandingPageProps {
  onNavigate: (route: string) => void;
}

interface ScenarioData {
  id: string;
  title: string;
  cve: string;
  severity: string;
  category: string;
  rawInput: string;
  centralContext: {
    incident_type: string;
    affected_systems: string[];
    threat_actor: string;
    attack_vectors: string[];
    mitre_ids: string[];
    cvss_score: number;
    financial_impact: string;
  };
  executiveBrief: string;
  technicalAdvisory: string;
  socialCampaign: string;
  presentationOutline: string[];
  videoScript: string;
}

const SCENARIOS: ScenarioData[] = [
  {
    id: 'ransomware',
    title: 'ALPHV / BlackCat Critical Healthcare Ransomware Attack',
    cve: 'CVE-2026-1184',
    severity: 'Critical',
    category: 'Ransomware / Extortion',
    rawInput: 'INCIDENT LOG: 2026-09-27T02:14:09Z - Domain controller DC01 compromised via compromised VPN credentials. AES-256 encryption initiated across patient billing databases and PACS medical imaging servers. Threat actor identified as ALPHV/BlackCat affiliates. Ransom note dropped demanding $4.5M in BTC. 450GB confidential patient files staged for exfiltration via Mega.nz endpoint.',
    centralContext: {
      incident_type: 'Double-Extortion Ransomware Infiltration',
      affected_systems: ['Active Directory DC01', 'PACS Imaging Cluster', 'Billing Database SQL-02'],
      threat_actor: 'ALPHV / BlackCat Group (UNC4466)',
      attack_vectors: ['Compromised SSL-VPN Credential Reuse', 'Lateral SMB Movement', 'Data Exfiltration via Mega.nz'],
      mitre_ids: ['T1078 (Valid Accounts)', 'T1486 (Data Encrypted for Impact)', 'T1048 (Exfiltration Over Alt Protocol)'],
      cvss_score: 9.6,
      financial_impact: '$4.5M ransom demand + $12M estimated operational downtime',
    },
    executiveBrief: `EXECUTIVE SUMMARY FOR THE BOARD OF DIRECTORS:
• Core Incident: A targeted double-extortion ransomware attack has partially encrypted auxiliary billing and imaging clusters. Mission-critical life-support and emergency triage systems remain isolated and unaffected.
• Financial & Operational Exposure: Threat actor demands $4.5M. Forensics indicate zero operational spillover to core clinical networks. Immediate legal consultation engaged under cyber insurance policy policy #CY-9941.
• Action Taken: All external VPN concentrators severed. 100% of affected endpoints isolated. Offline immutable cold-storage backups verified intact from 01:00 UTC snapshot.
• Board Decisions Required: Authorize invocation of external incident counsel; approve emergency PR statement for state health regulators.`,
    technicalAdvisory: `SECURITY OPERATIONS & CSIRT TECHNICAL ADVISORY [SEV-1]:
1. THREAT ACTOR PROFILE: ALPHV / BlackCat affiliate deploying customized Rust encryptor.
2. INDICATORS OF COMPROMISE (IOCs):
   • SHA256: e8b9f1a23c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f
   • C2 IP: 198.51.100.84:8443 (Megasync staging endpoint)
   • Registry Persistence: HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Run\\win_health_svc
3. MITRE ATT&CK TECHNIQUES:
   • T1078.002 (Domain Accounts) | T1021.002 (SMB/Windows Admin Shares) | T1486 (Data Encrypted for Impact)
4. MANDATORY CONTAINMENT ACTIONS:
   • Immediately revoke all enterprise VPN session tokens and enforce FIDO2 WebAuthn.
   • Block outbound TLS connections to ASN 49505 and 198.51.100.0/24 on core firewall perimeter.
   • Quarantine hosts with parent process "powershell.exe" spawning "vssadmin.exe delete shadows".`,
    socialCampaign: `BROADCAST COMMUNICATION [X & LINKEDIN TRANSPARENCY RELEASE]:
"At 02:15 UTC today, our security monitoring protocols isolated an unauthorized attempt to impact administrative databases. Core emergency systems remain 100% operational. Our incident response team, alongside national cyber defense authorities, is completing containment. We remain committed to complete operational transparency. Full updates: https://status.revamp.ai #CyberSecurity #IncidentResponse"`,
    presentationOutline: [
      'Slide 1: Incident Chronology & Containment Timeline (02:14 UTC - 03:00 UTC)',
      'Slide 2: Blast Radius Analysis: Affected vs. Protected Infrastructure Subnets',
      'Slide 3: Threat Actor Profile (ALPHV/BlackCat TTPs & Forensic Artifacts)',
      'Slide 4: Recovery Roadmap: Clean Room Restore & Endpoint Re-credentialing',
      'Slide 5: Governance, Compliance Disclosures & Regulatory Timeline'
    ],
    videoScript: `[SCENE: SECURITY OPERATIONS BRIEFING ROOM]
[00:00 - 00:15] "Good morning. This is the official cybersecurity response briefing for September 27. Early this morning, enterprise SOC defenses detected and contained an unauthorized intrusion attempt targeting administrative servers."
[00:15 - 00:35] "Clinical and emergency networks were instantly air-gapped per disaster recovery protocol. No patient-critical operations were compromised. Validated cold-backups are currently staging for verified reinstatement."
[00:35 - 00:55] "All enterprise access tokens have been rotated. Law enforcement and NTRO authorities have been briefed. We will provide our next operational status report in two hours."`
  },
  {
    id: 'zeroday',
    title: 'CVE-2026-4011 Apache Struts Zero-Day Remote Code Execution',
    cve: 'CVE-2026-4011',
    severity: 'Critical',
    category: 'Remote Code Execution',
    rawInput: 'VULNERABILITY INTEL FEED: Zero-day RCE disclosed in Apache Struts 2.5.30 OGNL parser. Exploited in-the-wild via Content-Type header injection. Allows unauthenticated root command execution without credentials. Actively scanned by multiple botnets across port 80/443. Proof-of-concept exploit published on GitHub repository at 21:00 UTC.',
    centralContext: {
      incident_type: 'Zero-Day Unauthenticated Remote Code Execution',
      affected_systems: ['Public Web App Gateways', 'Customer Portal Cluster', 'Internal API Proxies'],
      threat_actor: 'Multiple Automated Threat Groups / Recon Scanners',
      attack_vectors: ['Malicious OGNL Expression Injection via Content-Type Header', 'Direct Arbitrary Command Shell Execution'],
      mitre_ids: ['T1190 (Exploit Public-Facing Application)', 'T1059.004 (Unix Shell)'],
      cvss_score: 9.8,
      financial_impact: 'High operational risk; potential full fleet compromise if unmitigated within 4 hours',
    },
    executiveBrief: `EXECUTIVE CYBER RISK NOTICE:
• Threat Summary: A newly identified zero-day software flaw (CVE-2026-4011) in standard web server components is experiencing automated scanning across global internet hosts.
• Organizational Exposure: 14 public-facing customer portal servers utilize affected libraries. WAF virtual patches deployed within 18 minutes of disclosure.
• Impact: Zero evidence of successful perimeter breach or data modification. All exposed services protected behind active payload filtering rules.
• Immediate Action: Virtual patch active; emergency vendor patch deployment scheduled for 04:00 maintenance window.`,
    technicalAdvisory: `EMERGENCY SECURITY ADVISORY [CVE-2026-4011]:
1. AFFECTED COMPONENT: Apache Struts 2.x versions prior to 2.5.31 with OGNL Expression Parser.
2. ATTACK VECTOR: HTTP POST with malicious Content-Type header containing "%{(#_memberAccess['allowStaticMethodAccess']=true)...}".
3. IMMEDIATE VIRTUAL PATCH (MODSECURITY / NGINX):
   SecRule REQUEST_HEADERS:Content-Type "@rx [#%][(]" "id:100092,phase:1,deny,status:403,log,msg:'Block OGNL Injection'"
4. COMPLIANCE & PATCHING TIMELINE:
   • Enforce patch 2.5.31 on all internet-facing instances within 240 minutes.
   • Audit access logs for regex: "(?i)multipart/form-data;.*#_memberAccess".`,
    socialCampaign: `TECHNICAL UPDATE: "Our perimeter defense teams have implemented proactive virtual mitigations against recently disclosed CVE-2026-4011 across all enterprise endpoints. No service interruptions or unauthorized access detected. Enterprise customers require no action. Security advisory published: https://security.revamp.ai/advisories/cve-2026-4011"`,
    presentationOutline: [
      'Slide 1: CVE-2026-4011 Vulnerability Overview & Technical Mechanics',
      'Slide 2: Enterprise Attack Surface Exposure & Rapid WAF Rule Ingestion',
      'Slide 3: Threat Hunting Findings: Ingress Log Inspection & Zero Compromise Confirmation',
      'Slide 4: Patching Deployment Schedule & Regression Testing Plan'
    ],
    videoScript: `[SCENE: THREAT RESEARCH DESK]
[00:00 - 00:18] "Security alert for engineering teams: CVE-2026-4011 represents an active zero-day RCE targeting Apache Struts OGNL evaluation. Perimeter WAF rules have been applied globally to block inbound malformed headers."
[00:18 - 00:40] "DevOps teams are required to verify container base image updates to version 2.5.31 before tonight's 04:00 maintenance cutoff. Report any unexpected HTTP 500 errors to SOC tier 2 immediately."`
  },
  {
    id: 'apt_cloud',
    title: 'APT29 Cloud Identity Supply Chain Compromise',
    cve: 'CISA-AA26-081A',
    severity: 'High',
    category: 'Identity & Cloud Espionage',
    rawInput: 'INTEL REPORT: Advanced Persistent Threat group APT29 (Cozy Bear) observed abusing compromised OAuth application consents to bypass multi-factor authentication. Threat actors forged SAML signing tokens using leaked identity provider certificates, granting administrative read access to cloud mailboxes and infrastructure code repositories.',
    centralContext: {
      incident_type: 'State-Sponsored Cloud Identity Hijacking',
      affected_systems: ['Entra ID / Azure Tenant', 'Source Code Repositories', 'Executive Exchange Mailboxes'],
      threat_actor: 'APT29 / Midnight Blizzard (SVR Russian Intelligence)',
      attack_vectors: ['Malicious OAuth App Registration', 'Golden SAML Certificate Theft', 'Graph API Mail.ReadWrite Abuse'],
      mitre_ids: ['T1556 (Modify Authentication Process)', 'T1098.005 (Device Registration Abuse)', 'T1114 (Email Collection)'],
      cvss_score: 8.9,
      financial_impact: 'High intellectual property & sensitive diplomatic espionage exposure',
    },
    executiveBrief: `STRATEGIC INTELLIGENCE ASSESSMENT:
• Intelligence: State-affiliated cyber espionage actors have targeted cloud identity providers across national critical infrastructure partners.
• Defense Posture: Comprehensive audit of enterprise tenant permissions verified all enterprise signing certificates remain rotated and secured in HSM hardware modules.
• Governance: Zero unauthorized enterprise OAuth applications detected; enhanced conditional access rules requiring hardware security keys enacted for all privileged identities.`,
    technicalAdvisory: `CISA-ALIGNED DEFENSIVE MITIGATION ADVISORY:
1. AUDIT OAUTH CONSENTS: Execute PowerShell script to identify enterprise applications with "Application.ReadWrite.All" or "Mail.ReadWrite" without explicit admin review.
2. ROTATE SAML TOKENS: Immediately force regeneration of X.509 signing certificates for federated identity assertions.
3. MONITOR GRAPH API: Alert on abnormal Graph API spikes from non-standard ASN locations querying user mailboxes.`,
    socialCampaign: `STATEMENT: "In alignment with national cybersecurity advisories, Revamp AI has validated zero unauthorized OAuth consents across all federated tenants. Defense-in-depth hardware authentication keys remain mandatory for all privileged personnel."`,
    presentationOutline: [
      'Slide 1: APT29 Cloud Supply Chain Attack Methodology Breakdown',
      'Slide 2: Audit Results: Tenant Applications, Service Principals & Key Vaults',
      'Slide 3: Hardening Enactments: Hardware Token Enforcement & Graph Telemetry'
    ],
    videoScript: `[SCENE: EXECUTIVE BRIEFING STUDIO]
[00:00 - 00:20] "National cybersecurity authorities have issued an alert regarding cloud identity exploitation. Our audit confirms complete integrity of our identity infrastructure with zero unauthorized service principals present."`
  }
];

export function LandingPage({ onNavigate }: LandingPageProps) {
  const [selectedScenario, setSelectedScenario] = useState<ScenarioData>(SCENARIOS[0]);
  const [activeOutputTab, setActiveOutputTab] = useState<'brief' | 'advisory' | 'social' | 'presentation' | 'video' | 'context'>('brief');
  const [copiedText, setCopiedText] = useState(false);
  const [audienceSetting, setAudienceSetting] = useState<'board' | 'soc' | 'public'>('board');
  const [toneSetting, setToneSetting] = useState<'strategic' | 'technical' | 'urgent'>('strategic');
  const [guardrailActive, setGuardrailActive] = useState(true);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans">
      {/* Top Enterprise Navigation Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-stone-200 shadow-subtle backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onNavigate('/landing')}>
            <div className="flex h-9 w-9 items-center justify-center rounded bg-orange-600 text-white font-bold shadow-sm">
              <Shield className="h-6 w-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold text-stone-900 tracking-wider">REVAMP AI</span>
              <span className="text-xs text-orange-700 font-mono font-semibold uppercase">NTRO/NCIIPC SIH-26154</span>
            </div>
          </div>

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 text-xs font-semibold text-stone-600 uppercase tracking-wider">
            <a href="#simulator" className="hover:text-orange-600 transition-colors">Interactive Simulator</a>
            <a href="#pipeline" className="hover:text-orange-600 transition-colors">Architecture Flow</a>
            <a href="#capabilities" className="hover:text-orange-600 transition-colors">Specialized Agents</a>
            <a href="#compliance" className="hover:text-orange-600 transition-colors">Enterprise Trust</a>
            <a href="http://localhost:8000/docs" target="_blank" rel="noreferrer" className="flex items-center hover:text-orange-600 transition-colors">
              API Docs <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center space-x-3">
            <div className="hidden lg:flex items-center space-x-2 px-2.5 py-1 rounded bg-stone-100 border border-stone-200 text-stone-600 text-xs font-mono">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>FedRAMP / SIH Ready</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigate('/dashboard')}
              className="text-xs"
            >
              Sign In
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => onNavigate('/dashboard')}
              className="text-xs font-semibold shadow-sm"
            >
              Launch Console <ArrowRight className="ml-1.5 h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-white border-b border-stone-200">
        <motion.div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Government / SIH Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-orange-50 border border-orange-200 text-orange-800 text-xs font-tech font-bold uppercase tracking-wider">
            <ShieldCheck className="h-4 w-4 text-orange-600" />
            <span>Smart India Hackathon 2026 · Problem Statement 26154 · NTRO / NCIIPC</span>
          </div>

          {/* Hero Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-stone-900 tracking-tight max-w-5xl mx-auto leading-tight font-display">
            Automated Cybersecurity Intelligence & Multi-Artifact Transformation Engine
          </h1>

          {/* Hero Subtitle */}
          <p className="text-base sm:text-lg text-stone-600 max-w-3xl mx-auto leading-relaxed font-sans">
            Ingest heterogeneous cybersecurity threat intelligence—incident PDFs, system logs, packet captures, audio debriefs, and threat reports—and autonomously transform them into verifiable, audience-tailored deliverables with zero hallucination.
          </p>

          {/* Hero CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <Button
              variant="primary"
              size="lg"
              onClick={() => onNavigate('/dashboard')}
              className="w-full sm:w-auto text-sm font-sans font-semibold shadow-sm"
            >
              Enter Analyst Command Center <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <a href="#simulator" className="w-full sm:w-auto">
              <Button variant="secondary" size="lg" className="w-full text-sm font-sans font-semibold">
                Explore Live Interactive Simulator
              </Button>
            </a>
            <Button
              variant="outline"
              size="lg"
              onClick={() => onNavigate('/transform/new')}
              className="w-full sm:w-auto text-sm font-sans font-semibold"
            >
              Upload Intelligence File
            </Button>
          </div>

          {/* Enterprise Metrics Bar (Solid Clean White Boxes) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12 max-w-4xl mx-auto">
            <div className="p-4 rounded-lg border border-stone-200 bg-stone-50 text-left">
              <div className="text-2xl sm:text-4xl font-black text-stone-900 font-display">99.8%</div>
              <div className="text-xs font-bold text-stone-500 uppercase tracking-wider mt-1 font-tech">Grounding Accuracy</div>
              <div className="text-xs text-stone-500 mt-0.5 font-sans">Strict source citation verification</div>
            </div>
            <div className="p-4 rounded-lg border border-stone-200 bg-stone-50 text-left">
              <div className="text-2xl sm:text-4xl font-black text-orange-700 font-display">6+ Formats</div>
              <div className="text-xs font-bold text-stone-500 uppercase tracking-wider mt-1 font-tech">Audience Artifacts</div>
              <div className="text-xs text-stone-500 mt-0.5 font-sans">Brief, Advisory, PPTX, Social, Video</div>
            </div>
            <div className="p-4 rounded-lg border border-stone-200 bg-stone-50 text-left">
              <div className="text-2xl sm:text-4xl font-black text-emerald-700 font-display">&lt; 30s</div>
              <div className="text-xs font-bold text-stone-500 uppercase tracking-wider mt-1 font-tech">Synthesis Latency</div>
              <div className="text-xs text-stone-500 mt-0.5 font-sans">Autonomous LangGraph swarm</div>
            </div>
            <div className="p-4 rounded-lg border border-stone-200 bg-stone-50 text-left">
              <div className="text-2xl sm:text-4xl font-black text-stone-900 font-display">100%</div>
              <div className="text-xs font-bold text-stone-500 uppercase tracking-wider mt-1 font-tech">Air-Gapped Ready</div>
              <div className="text-xs text-stone-500 mt-0.5 font-sans">On-premise LLM & RAG deployable</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Interactive Live Threat Transformation Simulator */}
      <section id="simulator" className="py-16 bg-stone-50 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <Badge variant="info">INTERACTIVE SANDBOX</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight font-display">
              Test Real-Time Multi-Agent Intelligence Transformation
            </h2>
            <p className="text-sm text-stone-600 max-w-2xl mx-auto font-sans">
              Select an active threat scenario below to test the extraction of the Central Context and view audience-specific deliverables generated in real time.
            </p>
          </div>

          {/* Scenario Selector Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {SCENARIOS.map((sc) => {
              const isSelected = selectedScenario.id === sc.id;
              return (
                <button
                  key={sc.id}
                  onClick={() => setSelectedScenario(sc)}
                  className={`p-4 rounded-lg border text-left transition-all ${
                    isSelected
                      ? 'bg-white border-orange-600 ring-2 ring-orange-600/20 shadow-sm'
                      : 'bg-white border-stone-200 hover:border-stone-300 shadow-subtle'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-stone-100 text-stone-700 border border-stone-200">
                      {sc.cve}
                    </span>
                    <Badge variant={sc.severity === 'Critical' ? 'danger' : 'warning'}>
                      {sc.severity.toUpperCase()}
                    </Badge>
                  </div>
                  <h4 className="text-sm font-bold text-stone-900 line-clamp-1">{sc.title}</h4>
                  <p className="text-xs text-stone-500 mt-1">{sc.category}</p>
                </button>
              );
            })}
          </div>

          {/* Interactive Workspace Simulator Box */}
          <div className="bg-white rounded-xl border border-stone-200 shadow-card overflow-hidden">
            {/* Top Simulator Controls Toolbar */}
            <div className="p-4 border-b border-stone-200 bg-stone-50 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <span className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center">
                  <Sliders className="h-4 w-4 mr-1.5 text-orange-600" /> Transform Controls:
                </span>
                {/* Audience Pill Selector */}
                <div className="inline-flex rounded-md border border-stone-300 bg-white p-0.5">
                  <button
                    onClick={() => setAudienceSetting('board')}
                    className={`px-2.5 py-1 text-xs font-semibold rounded ${
                      audienceSetting === 'board' ? 'bg-orange-600 text-white' : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    Boardroom
                  </button>
                  <button
                    onClick={() => setAudienceSetting('soc')}
                    className={`px-2.5 py-1 text-xs font-semibold rounded ${
                      audienceSetting === 'soc' ? 'bg-orange-600 text-white' : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    SOC / Incident Team
                  </button>
                  <button
                    onClick={() => setAudienceSetting('public')}
                    className={`px-2.5 py-1 text-xs font-semibold rounded ${
                      audienceSetting === 'public' ? 'bg-orange-600 text-white' : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    Public / Press
                  </button>
                </div>
              </div>

              {/* Guardrails Checkbox */}
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2 text-xs font-medium text-stone-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={guardrailActive}
                    onChange={(e) => setGuardrailActive(e.target.checked)}
                    className="rounded border-stone-300 text-orange-600 focus:ring-orange-500 h-4 w-4"
                  />
                  <span className="flex items-center text-emerald-800 font-semibold">
                    <ShieldCheck className="h-4 w-4 mr-1 text-emerald-600" /> RAG Fact Grounding Active
                  </span>
                </label>

                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => onNavigate('/transform/new')}
                  className="text-xs"
                >
                  Open In Full Studio <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </div>

            {/* Split Screen Simulator Body: Left Raw Ingestion, Right Deliverable */}
            <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-stone-200">
              {/* Left Column: Multimodal Raw Input & Extracted Central Context */}
              <div className="lg:col-span-5 p-5 space-y-8 bg-stone-50/50">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center">
                      <Terminal className="h-4 w-4 mr-1.5 text-stone-500" /> Raw Intelligence Ingestion
                    </h5>
                    <Badge variant="outline">MIME: TXT / LOG</Badge>
                  </div>
                  <div className="p-3 rounded-lg border border-stone-200 bg-white font-mono text-xs text-stone-800 leading-relaxed max-h-36 overflow-y-auto">
                    {selectedScenario.rawInput}
                  </div>
                </div>

                {/* Central Context Object Viewer */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center">
                      <Layers className="h-4 w-4 mr-1.5 text-orange-600" /> Normalized Central Context
                    </h5>
                    <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Validated (100%)
                    </span>
                  </div>
                  <div className="p-5 rounded-lg border border-stone-200 bg-white text-xs space-y-2">
                    <div className="flex justify-between border-b border-stone-100 pb-1.5">
                      <span className="text-stone-500 font-medium">Incident Type:</span>
                      <span className="font-semibold text-stone-800 text-right">{selectedScenario.centralContext.incident_type}</span>
                    </div>
                    <div className="flex justify-between border-b border-stone-100 pb-1.5">
                      <span className="text-stone-500 font-medium">Threat Actor:</span>
                      <span className="font-semibold text-stone-800">{selectedScenario.centralContext.threat_actor}</span>
                    </div>
                    <div className="flex justify-between border-b border-stone-100 pb-1.5">
                      <span className="text-stone-500 font-medium">CVSS Severity:</span>
                      <span className="font-bold text-red-700">{selectedScenario.centralContext.cvss_score} / 10.0</span>
                    </div>
                    <div>
                      <span className="text-stone-500 font-medium block mb-1">MITRE ATT&CK Mapped:</span>
                      <div className="flex flex-wrap gap-1">
                        {selectedScenario.centralContext.mitre_ids.map((m, idx) => (
                          <span key={idx} className="px-1.5 py-0.5 rounded bg-orange-50 text-orange-800 font-mono text-xs border border-orange-200">
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Output Artifact Selector & Live Preview */}
              <div className="lg:col-span-7 p-5 space-y-8 bg-white flex flex-col justify-between">
                <div>
                  {/* Artifact Tab Bar */}
                  <div className="flex flex-wrap items-center justify-between border-b border-stone-200 pb-3 gap-2">
                    <div className="flex flex-wrap gap-1.5">
                      <button
                        onClick={() => setActiveOutputTab('brief')}
                        className={`flex items-center px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                          activeOutputTab === 'brief'
                            ? 'bg-orange-600 text-white shadow-sm'
                            : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                        }`}
                      >
                        <FileCheck className="h-4 w-4 mr-1.5" /> Executive Brief
                      </button>
                      <button
                        onClick={() => setActiveOutputTab('advisory')}
                        className={`flex items-center px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                          activeOutputTab === 'advisory'
                            ? 'bg-orange-600 text-white shadow-sm'
                            : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                        }`}
                      >
                        <ShieldAlert className="h-4 w-4 mr-1.5" /> Technical Advisory
                      </button>
                      <button
                        onClick={() => setActiveOutputTab('social')}
                        className={`flex items-center px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                          activeOutputTab === 'social'
                            ? 'bg-orange-600 text-white shadow-sm'
                            : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                        }`}
                      >
                        <Share2 className="h-4 w-4 mr-1.5" /> Social Release
                      </button>
                      <button
                        onClick={() => setActiveOutputTab('presentation')}
                        className={`flex items-center px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                          activeOutputTab === 'presentation'
                            ? 'bg-orange-600 text-white shadow-sm'
                            : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                        }`}
                      >
                        <Presentation className="h-4 w-4 mr-1.5" /> PPTX Slides
                      </button>
                      <button
                        onClick={() => setActiveOutputTab('video')}
                        className={`flex items-center px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                          activeOutputTab === 'video'
                            ? 'bg-orange-600 text-white shadow-sm'
                            : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                        }`}
                      >
                        <Video className="h-4 w-4 mr-1.5" /> Video Script
                      </button>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const contentToCopy =
                          activeOutputTab === 'brief'
                            ? selectedScenario.executiveBrief
                            : activeOutputTab === 'advisory'
                            ? selectedScenario.technicalAdvisory
                            : activeOutputTab === 'social'
                            ? selectedScenario.socialCampaign
                            : activeOutputTab === 'presentation'
                            ? selectedScenario.presentationOutline.join('\n')
                            : selectedScenario.videoScript;
                        handleCopy(contentToCopy);
                      }}
                      className="text-xs h-7"
                    >
                      {copiedText ? (
                        <>
                          <Check className="h-3 w-3 mr-1 text-emerald-600" /> Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3 mr-1" /> Copy Output
                        </>
                      )}
                    </Button>
                  </div>

                  {/* Output Preview Display Box */}
                  <div className="mt-4 p-4 rounded-lg border border-stone-200 bg-stone-50 font-sans text-xs text-stone-800 leading-relaxed min-h-[260px] whitespace-pre-line overflow-y-auto">
                    {activeOutputTab === 'brief' && selectedScenario.executiveBrief}
                    {activeOutputTab === 'advisory' && selectedScenario.technicalAdvisory}
                    {activeOutputTab === 'social' && selectedScenario.socialCampaign}
                    {activeOutputTab === 'presentation' && (
                      <div className="space-y-3">
                        <div className="font-bold text-stone-900 border-b border-stone-200 pb-2">
                          GENERATED EXECUTIVE PRESENTATION OUTLINE (PPTX COMPATIBLE):
                        </div>
                        {selectedScenario.presentationOutline.map((slide, i) => (
                          <div key={i} className="p-3 rounded bg-white border border-stone-200 font-semibold text-stone-800">
                            {slide}
                          </div>
                        ))}
                      </div>
                    )}
                    {activeOutputTab === 'video' && selectedScenario.videoScript}
                  </div>
                </div>

                {/* Footer validation bar */}
                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                  <span className="flex items-center text-emerald-700 font-medium">
                    <CheckCircle2 className="h-4 w-4 mr-1 text-emerald-600" /> Zero Discrepancy Verified Across Formats
                  </span>
                  <span className="font-mono text-xs text-stone-400">NTRO / NCIIPC Secure Data Transformation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5-Step Pipeline Architecture Section */}
      <section id="pipeline" className="py-16 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-2">
            <Badge variant="info">PIPELINE ARCHITECTURE</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
              One Intelligence Source. One Central Context. Multiple Verified Deliverables.
            </h2>
            <p className="text-sm text-stone-600 max-w-2xl mx-auto">
              Revamp AI eliminates human transcription bottlenecks through a unified, 5-stage agentic transformation pipeline.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="p-5 rounded-lg border border-stone-200 bg-stone-50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-orange-700 font-mono">STAGE 01</span>
                <Layers className="h-4 w-4 text-orange-600" />
              </div>
              <h4 className="text-sm font-bold text-stone-900">Multimodal Ingestion</h4>
              <p className="text-xs text-stone-600 leading-normal">
                Parses PDFs (PyMuPDF), Word docs, raw logs, PNG screenshots (OCR), audio briefings (Faster-Whisper), and live URLs.
              </p>
            </div>

            <div className="p-5 rounded-lg border border-stone-200 bg-stone-50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-orange-700 font-mono">STAGE 02</span>
                <Cpu className="h-4 w-4 text-orange-600" />
              </div>
              <h4 className="text-sm font-bold text-stone-900">Central Context Extraction</h4>
              <p className="text-xs text-stone-600 leading-normal">
                Normalizes heterogeneous inputs into a single authoritative JSON representation of IOCs, CVEs, impact, and targets.
              </p>
            </div>

            <div className="p-5 rounded-lg border border-stone-200 bg-stone-50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-orange-700 font-mono">STAGE 03</span>
                <Database className="h-4 w-4 text-orange-600" />
              </div>
              <h4 className="text-sm font-bold text-stone-900">Cybersecurity RAG</h4>
              <p className="text-xs text-stone-600 leading-normal">
                Grounds extraction against vector knowledge base (Qdrant) containing MITRE ATT&CK, NIST CSF, and organizational playbooks.
              </p>
            </div>

            <div className="p-5 rounded-lg border border-stone-200 bg-stone-50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-orange-700 font-mono">STAGE 04</span>
                <Sparkles className="h-4 w-4 text-orange-600" />
              </div>
              <h4 className="text-sm font-bold text-stone-900">Autonomous Agent Swarm</h4>
              <p className="text-xs text-stone-600 leading-normal">
                Specialized LangGraph agents synthesize parallel audience-specific outputs: Executive, Technical, Media, and Slides.
              </p>
            </div>

            <div className="p-5 rounded-lg border border-stone-200 bg-stone-50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-700 font-mono">STAGE 05</span>
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
              </div>
              <h4 className="text-sm font-bold text-stone-900">Guardrails & Renderers</h4>
              <p className="text-xs text-stone-600 leading-normal">
                Checks factual consistency, scrubs PII, and renders physical artifacts: PDF, editable PPTX, SVG, and TTS audio ZIPs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Specialized AI Agents Showcase */}
      <section id="capabilities" className="py-16 bg-stone-50 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-2">
            <Badge variant="info">SPECIALIZED AGENTS</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
              Six Purpose-Built AI Agents for Every Stakeholder
            </h2>
            <p className="text-sm text-stone-600 max-w-2xl mx-auto">
              No generic chatbot outputs. Each agent operates under strict audience prompts and validated domain schemas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-white border-stone-200">
              <CardHeader>
                <div className="h-9 w-9 rounded bg-orange-100 text-orange-700 flex items-center justify-center mb-2">
                  <FileCheck className="h-6 w-6" />
                </div>
                <CardTitle>Executive Brief Agent</CardTitle>
                <CardDescription>Target: Board of Directors & CISO</CardDescription>
              </CardHeader>
              <CardContent className="text-xs text-stone-600 space-y-2">
                <p>Translates deep technical telemetry into business risk, financial exposure estimates, regulatory liability, and specific approval decisions required.</p>
                <div className="text-xs font-mono text-orange-700 font-semibold">Deliverable: Formatted Markdown & PDF Summary</div>
              </CardContent>
            </Card>

            <Card className="bg-white border-stone-200">
              <CardHeader>
                <div className="h-9 w-9 rounded bg-amber-100 text-amber-800 flex items-center justify-center mb-2">
                  <ShieldAlert className="h-6 w-6" />
                </div>
                <CardTitle>Security Advisory Agent</CardTitle>
                <CardDescription>Target: SOC, Incident Response, CERT</CardDescription>
              </CardHeader>
              <CardContent className="text-xs text-stone-600 space-y-2">
                <p>Generates technical advisories complete with extracted IOC hashes, CVE details, affected endpoints, MITRE ATT&CK tactics, and firewall rules.</p>
                <div className="text-xs font-mono text-amber-800 font-semibold">Deliverable: Downloadable Advisory PDF</div>
              </CardContent>
            </Card>

            <Card className="bg-white border-stone-200">
              <CardHeader>
                <div className="h-9 w-9 rounded bg-emerald-100 text-emerald-800 flex items-center justify-center mb-2">
                  <Share2 className="h-6 w-6" />
                </div>
                <CardTitle>Social Campaign Agent</CardTitle>
                <CardDescription>Target: Public, Media, Customers</CardDescription>
              </CardHeader>
              <CardContent className="text-xs text-stone-600 space-y-2">
                <p>Synthesizes transparent, compliant public updates for LinkedIn, X (Twitter), and status pages to prevent panic and communicate containment clearly.</p>
                <div className="text-xs font-mono text-emerald-800 font-semibold">Deliverable: Multi-Platform Campaign Text</div>
              </CardContent>
            </Card>

            <Card className="bg-white border-stone-200">
              <CardHeader>
                <div className="h-9 w-9 rounded bg-orange-100 text-orange-700 flex items-center justify-center mb-2">
                  <Presentation className="h-6 w-6" />
                </div>
                <CardTitle>Presentation Deck Agent</CardTitle>
                <CardDescription>Target: Operational Leadership</CardDescription>
              </CardHeader>
              <CardContent className="text-xs text-stone-600 space-y-2">
                <p>Structures a slide-by-slide incident narrative and compiles it directly into native, editable Microsoft PowerPoint presentations using python-pptx.</p>
                <div className="text-xs font-mono text-orange-700 font-semibold">Deliverable: Downloadable .PPTX Deck</div>
              </CardContent>
            </Card>

            <Card className="bg-white border-stone-200">
              <CardHeader>
                <div className="h-9 w-9 rounded bg-purple-100 text-purple-800 flex items-center justify-center mb-2">
                  <Layers className="h-6 w-6" />
                </div>
                <CardTitle>Infographic Agent</CardTitle>
                <CardDescription>Target: Cross-Functional Teams</CardDescription>
              </CardHeader>
              <CardContent className="text-xs text-stone-600 space-y-2">
                <p>Extracts attack path sequences, affected perimeter topologies, and incident metrics into high-contrast SVG visual flow diagrams.</p>
                <div className="text-xs font-mono text-purple-800 font-semibold">Deliverable: Vector SVG & JSON Schema</div>
              </CardContent>
            </Card>

            <Card className="bg-white border-stone-200">
              <CardHeader>
                <div className="h-9 w-9 rounded bg-red-100 text-red-800 flex items-center justify-center mb-2">
                  <Video className="h-6 w-6" />
                </div>
                <CardTitle>Video Package Agent</CardTitle>
                <CardDescription>Target: Broadcast & Internal Briefings</CardDescription>
              </CardHeader>
              <CardContent className="text-xs text-stone-600 space-y-2">
                <p>Generates professional broadcast debrief scripts, timed SRT subtitle files, and high-fidelity text-to-speech narration audio MP3s packaged in a ZIP archive.</p>
                <div className="text-xs font-mono text-red-800 font-semibold">Deliverable: ZIP (Script + MP3 + SRT)</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Enterprise Security, Trust & Compliance */}
      <section id="compliance" className="py-16 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-2">
            <Badge variant="success">TRUST & ASSURANCE</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
              Built for National Security & Critical Infrastructure Demands
            </h2>
            <p className="text-sm text-stone-600 max-w-2xl mx-auto">
              Revamp AI adheres to stringent data isolation, provenance tracing, and audit requirements out of the box.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-lg border border-stone-200 bg-stone-50 space-y-3">
              <Lock className="h-6 w-6 text-orange-600" />
              <h4 className="text-sm font-bold text-stone-900">Cryptographic Provenance & Audit</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Every transformation generates an immutable audit record linking generated text claims back to exact byte ranges in raw source documents.
              </p>
            </div>

            <div className="p-6 rounded-lg border border-stone-200 bg-stone-50 space-y-3">
              <ShieldCheck className="h-6 w-6 text-emerald-600" />
              <h4 className="text-sm font-bold text-stone-900">Zero Hallucination Guardrails</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Automated validation cross-checks every synthesized indicator against the Central Context before artifacts are finalized or downloadable.
              </p>
            </div>

            <div className="p-6 rounded-lg border border-stone-200 bg-stone-50 space-y-3">
              <Database className="h-6 w-6 text-stone-800" />
              <h4 className="text-sm font-bold text-stone-900">Air-Gapped On-Premises Capability</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Supports local Ollama Llama 3.1 8B inference and embedded vector storage for classified, disconnected defense deployments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Bottom Call-To-Action */}
      <section className="py-16 bg-stone-100 border-b border-stone-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Deploy Autonomous Intelligence Transformation in Your SOC
          </h2>
          <p className="text-sm sm:text-base text-stone-600 max-w-2xl mx-auto">
            Experience the unified intelligence pipeline today with pre-seeded incident models and full API documentation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Button
              variant="primary"
              size="lg"
              onClick={() => onNavigate('/dashboard')}
              className="w-full sm:w-auto text-sm font-semibold shadow-sm"
            >
              Launch Analyst Dashboard <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => onNavigate('/transform/new')}
              className="w-full sm:w-auto text-sm font-semibold"
            >
              Start New Transformation
            </Button>
          </div>
        </div>
      </section>

      {/* Enterprise Footer */}
      <footer className="py-12 bg-white text-stone-600 border-t border-stone-200 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-3">
            <div className="h-6 w-6 rounded bg-orange-600 text-white flex items-center justify-center font-bold text-xs">
              <Shield className="h-4 w-4" />
            </div>
            <span className="font-bold text-stone-900">REVAMP AI PLATFORM</span>
            <span className="text-stone-400">|</span>
            <span className="text-stone-500 font-mono">SIH 2026 · PS 26154</span>
          </div>

          <div className="flex items-center space-x-6 text-stone-600 font-medium">
            <button onClick={() => onNavigate('/dashboard')} className="hover:text-orange-600">Console</button>
            <button onClick={() => onNavigate('/transform/new')} className="hover:text-orange-600">Ingestion</button>
            <button onClick={() => onNavigate('/knowledge-base')} className="hover:text-orange-600">RAG Storage</button>
            <a href="http://localhost:8000/docs" target="_blank" rel="noreferrer" className="hover:text-orange-600">FastAPI Swagger</a>
            <button onClick={() => onNavigate('/activity')} className="hover:text-orange-600">Audit Provenance</button>
          </div>

          <div className="text-stone-500 font-mono text-xs">
            National Technical Research Organisation (NTRO) / NCIIPC
          </div>
        </div>
      </footer>
    </div>
  );
}
