from typing import List
from app.models.llm import llm_service
from app.schemas.transformation import CentralContextSchema
from app.agents.state import TransformationState

class ContextAgent:
    def run(self, state: TransformationState) -> CentralContextSchema:
        combined_text = "\n\n".join(state.source_texts)
        if len(combined_text) > 20000:
            combined_text = combined_text[:20000] + "\n...[truncated for context extraction]"

        prompt = f"""
You are the Lead Cybersecurity Context Extraction Agent.
Analyze the following source document(s) and extract the authoritative Central Context.

User Configuration:
- Urgency Level requested: {state.urgency_level}
- Target Audience: {state.target_audience}
- Tone: {state.tone}

Source Document Text:
\"\"\"
{combined_text}
\"\"\"

Extract:
1. core_topic
2. executive_summary
3. key_findings (list of key takeaways)
4. entities (threat actors, malware names, CVEs, companies)
5. threat_indicators (IPs, domains, hashes, IOCs)
6. affected_systems (operating systems, infrastructure, applications)
7. timeline (sequence of events/milestones)
8. technical_details (technical breakdown)
9. urgency_level (critical, high, medium, low)
10. recommended_actions (actionable mitigation steps)
11. references (sources/citations)
12. confidence (assessment object)
"""
        context = llm_service.generate_json(
            prompt=prompt,
            schema_class=CentralContextSchema,
            system_prompt="You are an expert cybersecurity intelligence analyst. Maintain 100% factual grounding.",
            use_fast_model=False
        )
        if not context.urgency_level:
            context.urgency_level = state.urgency_level
        return context

context_agent = ContextAgent()
