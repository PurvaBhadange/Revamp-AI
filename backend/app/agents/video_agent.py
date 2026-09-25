from typing import Any, Dict, List
from pydantic import BaseModel
from app.models.llm import llm_service
from app.agents.state import TransformationState

class VideoScene(BaseModel):
    scene_number: int
    duration: float = 8.0
    visual_recommendation: str
    voiceover_text: str
    subtitle_text: str
    image_prompt: str

class VideoScriptOutput(BaseModel):
    title: str = "Cybersecurity Intelligence Video Script"
    total_duration: float = 40.0
    scenes: List[VideoScene]

class VideoAgent:
    def run(self, state: TransformationState) -> Dict[str, Any]:
        ctx = state.central_context
        prompt = f"""
You are the Video Script & Storyboard Director Agent.
Create a scene-by-scene Video Package Script based on the Central Context.

Central Context:
Core Topic: {ctx.core_topic if ctx else ''}
Executive Summary: {ctx.executive_summary if ctx else ''}
Key Findings: {ctx.key_findings if ctx else []}
Urgency Level: {ctx.urgency_level if ctx else 'high'}
Recommended Actions: {ctx.recommended_actions if ctx else []}

Generate 4 to 6 concise scenes (duration 5-10s each) with:
- visual_recommendation
- voiceover_text (clear narration)
- subtitle_text (short onscreen text)
- image_prompt (for visual generation)
"""
        result = llm_service.generate_json(
            prompt=prompt,
            schema_class=VideoScriptOutput,
            system_prompt="You create multimedia video storyboards and voiceover scripts.",
            use_fast_model=False
        )
        return result.model_dump()

video_agent = VideoAgent()
