from typing import Any, Dict, List
from pydantic import BaseModel
from app.models.llm import llm_service
from app.agents.state import TransformationState

class ExecutiveBriefOutput(BaseModel):
    title: str = "Executive Brief: Cybersecurity Intelligence Report"
    executive_summary: str
    business_impact: str
    operational_risk: str
    immediate_decisions: List[str]
    recommended_actions: List[str]

class ExecutiveAgent:
    def run(self, state: TransformationState) -> Dict[str, Any]:
        ctx = state.central_context
        prompt = f"""
You are the Senior Executive Communication Agent.
Generate a high-level Executive Brief based strictly on the Central Context below.

Central Context:
Core Topic: {ctx.core_topic if ctx else ''}
Executive Summary: {ctx.executive_summary if ctx else ''}
Key Findings: {ctx.key_findings if ctx else []}
Threat Indicators: {ctx.threat_indicators if ctx else []}
Urgency Level: {ctx.urgency_level if ctx else 'high'}
Recommended Actions: {ctx.recommended_actions if ctx else []}

User Parameters:
- Target Audience: {state.target_audience}
- Tone: {state.tone}
- Language: {state.language}

Focus on business risk, financial exposure, operational continuity, and key leadership decision items.
"""
        result = llm_service.generate_json(
            prompt=prompt,
            schema_class=ExecutiveBriefOutput,
            system_prompt="You produce executive leadership briefs for CISOs and enterprise CEOs.",
            use_fast_model=False
        )
        return result.model_dump()

executive_agent = ExecutiveAgent()
