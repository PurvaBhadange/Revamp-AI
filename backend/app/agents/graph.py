import logging
import os
from typing import Any, Dict, Callable
from app.agents.state import TransformationState, AgentProgress
from app.agents.ingestion_agent import ingestion_agent
from app.agents.context_agent import context_agent
from app.agents.executive_agent import executive_agent
from app.agents.advisory_agent import advisory_agent
from app.agents.social_agent import social_agent
from app.agents.presentation_agent import presentation_agent
from app.agents.infographic_agent import infographic_agent
from app.agents.video_agent import video_agent
from app.agents.compliance_agent import compliance_agent

from app.renderers.pdf_renderer import pdf_renderer
from app.renderers.pptx_renderer import pptx_renderer
from app.renderers.infographic_renderer import infographic_renderer
from app.renderers.audio_renderer import audio_renderer
from app.renderers.video_package_renderer import video_package_renderer
from app.storage.local_storage import storage_manager

logger = logging.getLogger("omnitransform.graph")

class TransformationGraphRunner:
    def execute(self, state: TransformationState, progress_callback: Callable[[str, str, Dict[str, Any]], None] = None) -> TransformationState:
        def update_progress(agent_name: str, status: str, extra: Dict[str, Any] = None):
            state.current_stage = agent_name
            state.agent_progress[agent_name] = AgentProgress(name=agent_name, status=status)
            if progress_callback:
                progress_callback(agent_name, status, extra or {})

        try:
            # Stage 1: Ingestion Context
            update_progress("ingestion_agent", "running")
            ingestion_agent.run(state)
            update_progress("ingestion_agent", "completed")

            # Stage 2: Central Context
            update_progress("context_agent", "running")
            state.central_context = context_agent.run(state)
            update_progress("context_agent", "completed", {"core_topic": state.central_context.core_topic})

            # Stage 3: RAG Retrieval (Optional contextual lookup)
            update_progress("rag_retriever", "running")
            update_progress("rag_retriever", "completed")

            # Stage 4: Parallel Transformation Agents based on output_formats requested
            formats = state.output_formats or ["executive_brief", "advisory", "social", "presentation", "infographic", "video"]
            
            if "executive_brief" in formats:
                update_progress("executive_agent", "running")
                state.executive_brief = executive_agent.run(state)
                update_progress("executive_agent", "completed")

            if "advisory" in formats:
                update_progress("advisory_agent", "running")
                state.advisory = advisory_agent.run(state)
                update_progress("advisory_agent", "completed")

            if "social" in formats:
                update_progress("social_agent", "running")
                state.social = social_agent.run(state)
                update_progress("social_agent", "completed")

            if "presentation" in formats:
                update_progress("presentation_agent", "running")
                state.presentation = presentation_agent.run(state)
                update_progress("presentation_agent", "completed")

            if "infographic" in formats:
                update_progress("infographic_agent", "running")
                state.infographic = infographic_agent.run(state)
                update_progress("infographic_agent", "completed")

            if "video" in formats or "video_script" in formats:
                update_progress("video_agent", "running")
                state.video_script = video_agent.run(state)
                update_progress("video_agent", "completed")

            # Stage 5: Compliance Agent
            update_progress("compliance_agent", "running")
            state.compliance_report = compliance_agent.run(state)
            update_progress("compliance_agent", "completed")

            # Stage 6: Rendering Artifact Files
            update_progress("rendering", "running")
            self._render_artifacts(state)
            update_progress("rendering", "completed")

            state.current_stage = "completed"
            return state

        except Exception as e:
            logger.error(f"Graph execution failed: {e}", exc_info=True)
            state.error = str(e)
            state.current_stage = "failed"
            return state

    def _render_artifacts(self, state: TransformationState):
        prefix = f"trans_{state.transformation_id[:8]}"
        
        # Advisory PDF
        if state.advisory:
            pdf_path = storage_manager.get_path("pdf", f"{prefix}_advisory.pdf")
            rendered = pdf_renderer.render_advisory_pdf(state.advisory, pdf_path)
            state.rendered_files["advisory"] = rendered

        # Presentation PPTX
        if state.presentation:
            pptx_path = storage_manager.get_path("presentations", f"{prefix}_presentation.pptx")
            rendered = pptx_renderer.render_presentation(state.presentation.get("slides", []), pptx_path)
            state.rendered_files["presentation"] = rendered

        # Infographic SVG / Data
        if state.infographic:
            info_path = storage_manager.get_path("artifacts", f"{prefix}_infographic.json")
            res = infographic_renderer.render_infographic(state.infographic, info_path)
            state.rendered_files["infographic"] = res.get("svg_path", info_path)

        # Video Package ZIP
        if state.video_script:
            zip_path = storage_manager.get_path("video", f"{prefix}_video_package.zip")
            rendered = video_package_renderer.render_package(state.video_script, zip_path)
            state.rendered_files["video"] = rendered

graph_runner = TransformationGraphRunner()
