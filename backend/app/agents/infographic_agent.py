from typing import Any, Dict, List
from pydantic import BaseModel
from app.models.llm import llm_service
from app.agents.state import TransformationState

class InfographicMetric(BaseModel):
    label: str
    value: str
    description: str

class InfographicOutput(BaseModel):
    title: str = "Cybersecurity Intelligence Infographic Data"
    severity: str = "HIGH"
    core_topic: str
    impact_summary: str
    metrics: List[InfographicMetric]
    timeline: List[str]
    threat_flow: List[str]
    affected_systems: List[str]
    indicators: List[str]
    mitigation_flow: List[str]

class InfographicAgent:
    def run(self, state: TransformationState) -> Dict[str, Any]:
        ctx = state.central_context
        prompt = f"""
You are the Infographic Data Visualizer Agent.
Extract visual data structures for rendering an interactive Infographic from Central Context.

Central Context:
Core Topic: {ctx.core_topic if ctx else ''}
Executive Summary: {ctx.executive_summary if ctx else ''}
Threat Indicators: {ctx.threat_indicators if ctx else []}
Affected Systems: {ctx.affected_systems if ctx else []}
Timeline: {ctx.timeline if ctx else []}
Recommended Actions: {ctx.recommended_actions if ctx else []}
"""
        result = llm_service.generate_json(
            prompt=prompt,
            schema_class=InfographicOutput,
            system_prompt="You create structured data objects for frontend charts and vector infographics.",
            use_fast_model=False
        )
        return result.model_dump()

infographic_agent = InfographicAgent()
