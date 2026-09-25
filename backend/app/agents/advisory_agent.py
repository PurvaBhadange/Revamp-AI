from typing import Any, Dict, List
from pydantic import BaseModel
from app.models.llm import llm_service
from app.agents.state import TransformationState

class AdvisoryOutput(BaseModel):
    title: str = "SECURITY ADVISORY: Vulnerability Alert"
    severity: str = "HIGH"
    target_audience: str = "Technical"
    threat_overview: str
    affected_systems: List[str]
    indicators: List[str]
    mitigation_steps: List[str]
    recommended_actions: List[str]
    references: List[str]

class AdvisoryAgent:
    def run(self, state: TransformationState) -> Dict[str, Any]:
        ctx = state.central_context
        prompt = f"""
You are the Technical Security Advisory Agent.
Generate a technical Security Advisory strictly adhering to the Central Context.

Central Context:
Core Topic: {ctx.core_topic if ctx else ''}
Urgency Level: {ctx.urgency_level if ctx else 'high'}
Affected Systems: {ctx.affected_systems if ctx else []}
Indicators: {ctx.threat_indicators if ctx else []}
Technical Details: {ctx.technical_details if ctx else []}
Recommended Actions: {ctx.recommended_actions if ctx else []}

User Parameters:
- Target Audience: {state.target_audience}
- Tone: {state.tone}
- Language: {state.language}
"""
        result = llm_service.generate_json(
            prompt=prompt,
            schema_class=AdvisoryOutput,
            system_prompt="You produce technical security advisories for SecOps and SOC teams.",
            use_fast_model=False
        )
        return result.model_dump()

advisory_agent = AdvisoryAgent()
