from typing import Any, Dict, List, Optional
from datetime import datetime
from pydantic import BaseModel, Field

class TransformationCreateRequest(BaseModel):
    project_id: str
    source_document_ids: List[str]
    target_audience: str = Field(default="executive", description="technical, executive, general_public, defense")
    tone: str = Field(default="formal", description="urgent, formal, educational, neutral, threat_alert")
    objective: str = Field(default="action_required", description="action_required, information_dissemination, policy_compliance")
    urgency_level: str = Field(default="high", description="critical, high, medium, low")
    language: str = Field(default="English")
    output_formats: List[str] = Field(
        default=["executive_brief", "advisory", "social", "presentation", "infographic", "video"],
        description="executive_brief, advisory, social, presentation, infographic, video"
    )

class TransformationCreateResponse(BaseModel):
    transformation_id: str
    job_id: str
    status: str = "queued"

class TransformationResponse(BaseModel):
    id: str
    project_id: str
    status: str
    current_stage: str
    target_audience: str
    tone: str
    objective: str
    urgency_level: str
    language: str
    output_formats: List[str]
    source_document_ids: List[str]
    central_context: Optional[Dict[str, Any]] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class CentralContextSchema(BaseModel):
    core_topic: str = ""
    executive_summary: str = ""
    key_findings: List[str] = []
    entities: List[str] = []
    threat_indicators: List[str] = []
    affected_systems: List[str] = []
    timeline: List[str] = []
    technical_details: List[str] = []
    urgency_level: str = "high"
    recommended_actions: List[str] = []
    references: List[str] = []
    confidence: Dict[str, Any] = {}
