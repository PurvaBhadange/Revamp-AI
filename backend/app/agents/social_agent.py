from typing import Any, Dict, List
from pydantic import BaseModel
from app.models.llm import llm_service
from app.agents.state import TransformationState

class SocialPlatformContent(BaseModel):
    platform: str  # linkedin or twitter
    content: str
    character_count: int
    hashtags: List[str]
    references: List[str] = []

class SocialOutput(BaseModel):
    linkedin: SocialPlatformContent
    twitter: SocialPlatformContent

class SocialAgent:
    def run(self, state: TransformationState) -> Dict[str, Any]:
        ctx = state.central_context
        prompt = f"""
You are the Cybersecurity Social Content Specialist.
Generate audience-tailored social media communications based on the Central Context.

Central Context:
Core Topic: {ctx.core_topic if ctx else ''}
Executive Summary: {ctx.executive_summary if ctx else ''}
Key Findings: {ctx.key_findings if ctx else []}
Urgency Level: {ctx.urgency_level if ctx else 'high'}

Generate:
1. LinkedIn Post: Engaging, professional cybersecurity post formatted with clear sections and linebreaks (Under 3000 chars).
2. Twitter/X Thread: Concise, impact-driven thread (Under 280 characters per tweet or total summary thread under 280 chars).
Include relevant hashtags (e.g., #CyberSecurity #InfoSec #ThreatIntel).
"""
        result = llm_service.generate_json(
            prompt=prompt,
            schema_class=SocialOutput,
            system_prompt="You create viral, high-authority cybersecurity posts for social media.",
            use_fast_model=False
        )
        return result.model_dump()

social_agent = SocialAgent()
