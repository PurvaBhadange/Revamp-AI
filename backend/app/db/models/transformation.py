import uuid
from datetime import datetime
from sqlalchemy import Column, String, Text, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from app.db.database import Base

class Transformation(Base):
    __tablename__ = "transformations"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    project_id = Column(String(36), ForeignKey("projects.id"), nullable=False)
    status = Column(String(50), default="queued")  # queued, running, completed, failed, cancelled
    current_stage = Column(String(100), default="queued")
    
    # Configurations
    target_audience = Column(String(100), default="executive")
    tone = Column(String(100), default="formal")
    objective = Column(String(100), default="action_required")
    urgency_level = Column(String(50), default="high")
    language = Column(String(50), default="English")
    output_formats = Column(JSON, default=list)  # list of requested formats
    source_document_ids = Column(JSON, default=list)

    central_context = Column(JSON, nullable=True)  # Enforces cross-output consistency
    error_message = Column(Text, nullable=True)

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    project = relationship("Project", back_populates="transformations")
    agent_runs = relationship("AgentRun", back_populates="transformation", cascade="all, delete-orphan")
    artifacts = relationship("Artifact", back_populates="transformation", cascade="all, delete-orphan")
