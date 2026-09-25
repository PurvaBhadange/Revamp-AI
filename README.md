# OmniTransform AI Backend
**Gen AI Platform for Automated Cybersecurity Intelligence & Content Transformation**

OmniTransform AI is a production-grade backend engine designed for SIH Problem Statement 26154: *"Gen AI Platform for Automated Content Transformation"*. It processes multimodal cybersecurity intelligence inputs (PDF, DOCX, TXT, PNG, JPG, MP3, MP4, Web URLs, Raw Text) and transforms them into multiple audience-tailored communication artifacts (Executive Briefs, Technical Security Advisories, LinkedIn & Twitter social campaigns, Editable PPTX slides, Infographic visual structures, and Video Packages with TTS narration audio and SRT subtitles).

---

## 1. Project Overview & Architecture

OmniTransform AI is architected around a **Shared Central Context** design pattern to guarantee 100% cross-output consistency across executive, technical, and media artifacts.

### Transformation Pipeline Architecture

```
INPUT (PDF / DOCX / TXT / Image / Audio / Video / URL / Text)
  │
  ▼
INGESTION & PARSING (PyMuPDF, python-docx, Tesseract OCR, Faster-Whisper, BeautifulSoup)
  │
  ▼
NORMALIZATION (Standardized NormalizedDocument Schema)
  │
  ▼
CENTRAL CONTEXT AGENT (Authoritative Shared Source of Truth)
  │
  ▼
RAG RETRIEVAL (SentenceTransformers + Qdrant Vector Store)
  │
  ▼
PARALLEL SPECIALIZED AGENTS
  ├── Executive Brief Agent
  ├── Security Advisory Agent
  ├── Social Campaign Agent (LinkedIn & Twitter/X)
  ├── Presentation Slide Agent
  ├── Infographic Data Agent
  └── Video Script & Storyboard Agent
  │
  ▼
COMPLIANCE & GUARDRAIL AGENT (Source Grounding, PII Masking, Severity Consistency)
  │
  ▼
ARTIFACT RENDERERS (WeasyPrint PDF, python-pptx PPTX, SVG Infographic, edge-tts MP3, SRT, ZIP)
  │
  ▼
PREVIEW & DOWNLOAD ENDPOINTS
```

---

## 2. Tech Stack

- **Framework**: Python 3.11, FastAPI 0.116.1, Uvicorn 0.35.0, Pydantic v2.11.7
- **Database & ORM**: PostgreSQL / SQLite, SQLAlchemy 2.0.43, Alembic 1.14.1
- **Async Job & Queue**: Redis 5.2.1, Celery 5.5.3, Server-Sent Events (SSE)
- **AI & Orchestration**: LangGraph 0.6.6, LangChain 0.3.27, Gemini 2.5 Flash (`gemini-2.5-flash`), Gemini 2.5 Flash Lite (`gemini-2.5-flash-lite`), Ollama (`llama3.1:8b`)
- **Vector Search & RAG**: Qdrant (`qdrant-client`), `sentence-transformers` (`all-MiniLM-L6-v2`)
- **Multimodal Processors**: PyMuPDF (`fitz`), `python-docx`, `pytesseract` (OCR), `faster-whisper` (Audio Speech-to-Text), `httpx` & `beautifulsoup4`
- **Artifact Renderers**: `WeasyPrint` / `reportlab` (PDF), `python-pptx` (PowerPoint), `edge-tts` (Voice Narration MP3), `zipfile` & custom SRT formatter

---

## 3. Environment Variables

Create `.env` in the root directory based on `.env.example`:

```ini
APP_NAME=OmniTransform AI
ENVIRONMENT=development
DEBUG=true

# LLM Providers
LLM_PROVIDER=gemini
GEMINI_API_KEY=your_actual_gemini_api_key
GEMINI_MODEL=gemini-2.5-flash
GEMINI_FAST_MODEL=gemini-2.5-flash-lite

OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama3.1:8b

# Vector Database
QDRANT_URL=http://localhost:6333
QDRANT_API_KEY=

# Relational Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/omnitransform

# Redis & Celery
REDIS_URL=redis://localhost:6379/0

# Security
SECRET_KEY=secure_random_32_character_secret_key
JWT_SECRET_KEY=another_secure_random_32_character_jwt_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=1440

# Storage
STORAGE_PATH=./storage

# CORS Frontend Integration
FRONTEND_URL=http://localhost:5173
ALLOWED_ORIGINS=http://localhost:5173
```

---

## 4. Quick Start & Service Execution

### Docker Setup (PostgreSQL + Redis + Qdrant)

Run background services with Docker Compose:

```bash
docker-compose up -d
```

### PostgreSQL Setup

If running standalone PostgreSQL:
```bash
createdb omnitransform
```

### Redis Setup

Ensure Redis server is running locally on port `6379`:
```bash
redis-server
```

### Qdrant Setup

Qdrant runs on port `6333`. Note that the backend features an **in-memory vector store fallback** if Qdrant is temporarily offline or running isolated tests.

### Local Ollama Setup (Air-Gapped / Privacy Mode)

To use local LLM inference via Ollama:
1. Install Ollama from https://ollama.com
2. Pull Llama 3.1 model:
   ```bash
   ollama pull llama3.1:8b
   ```
3. Set `LLM_PROVIDER=ollama` in your `.env`.

---

## 5. Running the Backend & Celery Worker

### Start FastAPI Server

```bash
uvicorn app.main:app --reload --port 8000
```
FastAPI interactive docs will be available at:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`
- OpenAPI JSON: `http://localhost:8000/openapi.json`

### Start Celery Worker

In a separate terminal:
```bash
celery -A app.workers.celery_app worker --loglevel=info
```

---

## 6. Frontend Integration (Bolt Contract)

The Bolt frontend communicates exclusively with FastAPI endpoints:

| Bolt Contract Function | Backend API Mapping | Method |
| :--- | :--- | :--- |
| `auth.login()` | `/api/v1/auth/login` | POST |
| `auth.logout()` | `/api/v1/auth/logout` | POST |
| `auth.me()` | `/api/v1/auth/me` | GET |
| `projects.list()` | `/api/v1/projects` | GET |
| `projects.get()` | `/api/v1/projects/{id}` | GET |
| `projects.create()` | `/api/v1/projects` | POST |
| `ingestion.upload()` | `/api/v1/ingestion/upload` | POST |
| `ingestion.getStatus()` | `/api/v1/ingestion/{id}` | GET |
| `transformations.create()` | `/api/v1/transformations` | POST |
| `transformations.get()` | `/api/v1/transformations/{id}` | GET |
| `jobs.getStatus()` | `/api/v1/jobs/{id}` | GET |
| `jobs.subscribe()` | `/api/v1/jobs/{id}/events` | GET (SSE) |
| `artifacts.list()` | `/api/v1/artifacts` | GET |
| `artifacts.download()` | `/api/v1/artifacts/{id}/download` | GET |
| `artifacts.regenerate()` | `/api/v1/artifacts/{id}/regenerate` | POST |
| `knowledgeBase.search()` | `/api/v1/knowledge-base/search` | POST |
| `audit.list()` | `/api/v1/audit` | GET |
| `settings.get()` | `/api/v1/settings` | GET |

---

## 7. Testing

Run automated pytest test cases:

```bash
python -m pytest backend/tests -v
```

All external LLM and network calls are safely mocked so unit tests run cleanly without external credentials.

---

## 8. Security Notes

- All file uploads pass MIME type & path traversal validations.
- API keys, JWT secrets, and DB passwords are isolated in environment variables.
- Passwords are securely hashed with Argon2 / PBKDF2 sha256.
- Sensitive source documents and stack traces are suppressed in HTTP error responses.
