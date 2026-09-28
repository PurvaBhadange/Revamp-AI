# Revamp AI - Intelligent Content Transformation Engine
**Smart India Hackathon (SIH) Submission**

## 1. Executive Summary
Organizations frequently need to convert threat intelligence, advisories, and raw text into specific communication artifacts tailored for various audiences. **Revamp AI** is an intelligent, autonomous content transformation engine powered by the indigenous **Sarvam AI** model. It ingests heterogeneous data sources and utilizes a multi-agent LangGraph orchestrator to simultaneously generate CISO briefings, technical advisories, social media campaigns, and presentation decks with zero hallucination.

## 2. System Architecture

The application is built on a scalable, modern microservices architecture:

### Frontend (User Interface)
* **Framework:** Next.js (React) + TypeScript
* **Styling:** Tailwind CSS (Modern SaaS Light Theme with Glassmorphism)
* **State Management:** Zustand (Global State) + React Query (API Syncing)
* **Visualizations:** Recharts (Data telemetry) & Framer Motion (Animations)
* **Core Components:** 
  * Global Telemetry Dashboard
  * Multi-step Intelligence Ingestion Wizard
  * Real-time LangGraph Boot Terminal
  * Modular Results Workspace

### Backend (Intelligence Engine)
* **Framework:** FastAPI (Python)
* **Database:** SQLite (Local Dev) / PostgreSQL (Production ready)
* **LLM Provider:** **Sarvam AI** (Native Indic & English text generation)
* **Orchestration:** LangGraph / LangChain (Multi-Agent Swarm logic)
* **Core Microservices:**
  1. `ingestion_service.py`: Normalizes incoming text, PDFs, or URLs.
  2. `llm.py`: Manages strict JSON prompt engineering for the Sarvam model.
  3. `agent_service.py`: Spawns parallel agents (Executive, Social, Technical) to generate parallel artifacts.

## 3. The 5-Stage Autonomous Pipeline

1. **Multimodal Ingestion:** The operator pastes raw text (or logs) into the Dashboard Wizard.
2. **Context Extraction:** The backend normalizes the input into a single authoritative JSON representation of indicators of compromise (IoCs) and business impact.
3. **Agent Swarm (LangGraph):** The system dynamically spawns specialized AI agents. The *Executive Agent* writes the C-suite brief, the *Social Agent* writes the X/LinkedIn posts, and the *Technical Agent* extracts the IoCs.
4. **Guardrail Validation:** The pipeline verifies factual consistency against the original payload to ensure zero hallucination.
5. **Render & Export:** The artifacts are streamed back to the Next.js frontend into a beautiful, tabbed Deliverable Workspace.

## 4. Current Limitations & Future Scope
While functionally robust, a production deployment at NTRO would require addressing the following:
* **Token Context Limits:** Integrating a Vector DB (like Milvus) for Retrieval-Augmented Generation (RAG) to handle massive 500-page PDF threat reports without crashing the LLM context window.
* **Physical File Compilation:** Replacing the simulated UI exports with a dedicated Python rendering farm (using `ReportLab` and `python-pptx`) to generate physical `.pdf` and `.pptx` byte streams.
* **Scraper Anti-Bot bypass:** Integrating a headless browser pool (Playwright) to bypass Cloudflare when scraping external threat URLs.
