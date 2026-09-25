from typing import List, Optional
from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.api.deps import get_current_user
from app.db.models.user import User
from app.db.models.transformation import Transformation
from app.schemas.transformation import TransformationCreateRequest, TransformationCreateResponse, TransformationResponse
from app.services.transformation_service import transformation_service
from app.services.audit_service import audit_service
from app.workers.tasks import run_transformation_pipeline
from app.core.exceptions import NotFoundError

router = APIRouter(prefix="/transformations", tags=["Transformations"])

@router.post("", response_model=TransformationCreateResponse, status_code=status.HTTP_201_CREATED)
def create_transformation(
    request: TransformationCreateRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    trans = transformation_service.create_transformation(
        db,
        project_id=request.project_id,
        source_document_ids=request.source_document_ids,
        target_audience=request.target_audience,
        tone=request.tone,
        objective=request.objective,
        urgency_level=request.urgency_level,
        language=request.language,
        output_formats=request.output_formats
    )

    # Trigger async job or run inline
    try:
        run_transformation_pipeline.delay(trans.id)
    except Exception:
        # Fallback inline execution if Celery worker is offline
        transformation_service.execute_transformation_sync(db, trans.id)

    audit_service.log_action(db, action="create_transformation", resource="transformation", user_id=current_user.id, resource_id=trans.id)

    return TransformationCreateResponse(
        transformation_id=trans.id,
        job_id=trans.id,
        status=trans.status
    )

@router.get("", response_model=List[TransformationResponse])
def list_transformations(
    project_id: Optional[str] = Query(None),
    status: Optional[str] = Query(None),
    urgency: Optional[str] = Query(None),
    limit: int = Query(50, ge=1, le=100),
    skip: int = Query(0, ge=0),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    query = db.query(Transformation)
    if project_id:
        query = query.filter(Transformation.project_id == project_id)
    if status:
        query = query.filter(Transformation.status == status)
    if urgency:
        query = query.filter(Transformation.urgency_level == urgency)

    transformations = query.order_by(Transformation.created_at.desc()).offset(skip).limit(limit).all()
    return transformations

@router.get("/{transformation_id}", response_model=TransformationResponse)
def get_transformation(
    transformation_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    trans = db.query(Transformation).filter(Transformation.id == transformation_id).first()
    if not trans:
        raise NotFoundError(message=f"Transformation {transformation_id} not found")
    return trans
