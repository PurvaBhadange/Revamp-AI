from typing import Any, Dict, List
from pydantic import BaseModel
from app.models.llm import llm_service
from app.agents.state import TransformationState

class SlideItem(BaseModel):
    slide_number: int
    title: str
    bullets: List[str]
    speaker_notes: str

class PresentationOutput(BaseModel):
    title: str = "Cybersecurity Intelligence Presentation"
    slides: List[SlideItem]

class PresentationAgent:
    def run(self, state: TransformationState) -> Dict[str, Any]:
        ctx = state.central_context
        prompt = f"""
You are the Presentation Design Agent.
Generate a structured 5 to 7 slide presentation based strictly on the Central Context.

Central Context:
Core Topic: {ctx.core_topic if ctx else ''}
Executive Summary: {ctx.executive_summary if ctx else ''}
Key Findings: {ctx.key_findings if ctx else []}
Threat Indicators: {ctx.threat_indicators if ctx else []}
Affected Systems: {ctx.affected_systems if ctx else []}
Recommended Actions: {ctx.recommended_actions if ctx else []}

User Parameters:
- Target Audience: {state.target_audience}
- Tone: {state.tone}
"""
        result = llm_service.generate_json(
            prompt=prompt,
            schema_class=PresentationOutput,
            system_prompt="You structure slide presentations with bullet points and speaker notes.",
            use_fast_model=False
        )
        return result.model_dump()

presentation_agent = PresentationAgent()
