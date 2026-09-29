# REVAMP AI: Architecture & Technical Approach
**Smart India Hackathon 2026 | Problem Statement 26154 | Organization: NTRO / NCIIPC**

---

## 1. Executive Overview
REVAMP AI is a sovereign, multi-agent Content Transformation Engine designed specifically for Critical Information Infrastructure (CII) environments. It autonomously ingests raw, unstructured cyber threat intelligence and simultaneously orchestrates the generation of six distinct, fact-verified communication artifacts (Executive Briefs, Technical Advisories, Presentations, Social Media Campaigns, Infographics, and Video Scripts). The system is built on a local-first, air-gapped-ready microservices architecture to ensure zero data leakage of classified intelligence.

---

## 2. End-to-End System Architecture

The platform operates on a decentralized microservices model, enabling horizontal scaling and high availability.

### A. Frontend (Analyst Operator Console)
* **Framework:** Next.js (React 19) + TypeScript
* **State Management:** Zustand (Global State) + React Query (API Syncing)
* **Design System:** Tailwind CSS with custom glassmorphic telemetry dashboards.
* **Functionality:** Provides a real-time, tabbed workspace for analysts to review, edit, and export generated artifacts.

### B. Backend (Agentic Orchestration Layer)
* **Framework:** FastAPI (Python 3.11)
* **Asynchronous Task Queue:** Celery + Redis (Message Broker)
* **Database:** PostgreSQL (Metadata & Artifact Storage)
* **Vector Store (RAG):** Upstash Vector / Local Qdrant

### C. Sovereign AI & Embedding Stack
* **LLM Engine:** Local execution capability (Llama 3.1 8B) with fallback to secure enterprise APIs for classification.
* **Embedding Model:** `all-MiniLM-L6-v2` (384-dimensional). Chosen specifically for its sub-20ms inference speed on CPU architectures, allowing for completely offline, on-premise execution without external API dependencies.

---

## 3. The Multi-Agent Transformation Pipeline (LangGraph)

Instead of relying on a single, monolithic prompt (which introduces hallucination), REVAMP AI utilizes **LangGraph** to construct a directed cyclic graph of specialized AI agents working in parallel.

1. **Multimodal Ingestion:** Source intelligence (logs, PDFs, raw text) is parsed and chunked.
2. **Intermediate Context Object (ICO) Extraction:** An Extraction Agent normalizes the raw data into a strictly typed JSON object containing core facts, IoCs (Indicators of Compromise), and MITRE ATT&CK mappings. This acts as the single source of truth.
3. **Parallel Generation Swarm:**
   * *Executive Agent:* Generates high-level business impact briefs.
   * *Technical Agent:* Formats the IoCs into a NIST SP 800-61 compliant advisory.
   * *Creative Agent:* Generates the slide deck, infographic layout, and video script.
4. **ReAct Compliance Loop:** Before rendering, a Validation Agent cross-references every generated artifact against the original ICO. If hallucination or missing data is detected, the artifact is rejected and re-routed to the Generation Swarm (Maximum 2 retries).
5. **Artifact Rendering:** The validated text is streamed back to the Next.js frontend, where it is compiled into downloadable formats (PDF, PPTX, MP4).

---

## 4. Security & NCIIPC Compliance

Given the sensitivity of the target organization (NTRO), REVAMP AI is engineered with strict security constraints:
* **Air-Gapped Readiness:** The entire pipeline (including RAG embeddings via Sentence-BERT) can run in a completely isolated, offline environment.
* **Data Leakage Prevention:** Synthetic test datasets comply strictly with **RFC 5737** (Test Networks) and **RFC 3849** (IPv6), ensuring no live production IP addresses are accidentally exposed during demonstrations or testing.
* **Traceability:** Every generated artifact maintains a cryptographic link to its source document in the PostgreSQL database, providing a complete audit trail for intelligence provenance.

---
*Document designed to meet the 2-page limit requirement for SIH 2026 Evaluation.*
