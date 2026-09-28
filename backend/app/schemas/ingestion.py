from typing import Any, Dict, List, Optional
from datetime import datetime
from pydantic import BaseModel, ConfigDict, HttpUrl

class IngestionUrlRequest(BaseModel):
    project_id: str
    url: str
    title: Optional[str] = None

class IngestionTextRequest(BaseModel):
    project_id: str
    title: str
    text: str

class IngestionResponse(BaseModel):
    ingestion_id: str
    source_document_id: str
    project_id: str
    status: str
    title: str
    source_type: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)

class NormalizedDocumentSchema(BaseModel):
    document_id: str
    source_type: str
    title: str
    text: str
    language: Optional[str] = "English"
    metadata: Dict[str, Any] = {}
    pages: List[Dict[str, Any]] = []
    media: List[Dict[str, Any]] = []
    entities: List[str] = []
    timestamps: List[Dict[str, Any]] = []
