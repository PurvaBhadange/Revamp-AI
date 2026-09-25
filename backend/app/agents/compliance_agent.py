import json
from typing import Any, Dict, List
from pydantic import BaseModel
from app.models.llm import llm_service
from app.agents.state import TransformationState

class ComplianceCheckResult(BaseModel):
    status: str = "passed"  # passed, warning, failed
    warnings: List[str] = []
    issues: List[str] = []
    checks: Dict[str, bool] = {
        "source_grounding": True,
        "no_unsupported_claims": True,
        "central_context_consistency": True,
        "pii_detection": True,
        "output_format_compliance": True,
        "severity_consistency": True
    }

class ComplianceAgent:
    def run(self, state: TransformationState) -> Dict[str, Any]:
        ctx = state.central_context
        ctx_dict = ctx.model_dump() if ctx else {}
        
        # Check generated outputs against central context
        artifacts_summary = {
            "executive_brief": state.executive_brief,
            "advisory": state.advisory,
            "social": state.social,
            "presentation": state.presentation,
            "infographic": state.infographic,
            "video_script": state.video_script
        }

        prompt = f"""
You are the Compliance & Guardrail Validation Agent.
Audit the generated artifacts against the authoritative Central Context.

Central Context:
{json.dumps(ctx_dict, indent=2)}

Generated Artifacts Summary:
{json.dumps(artifacts_summary, indent=2)[:4000]}

Validation Criteria:
1. Grounding: Are claims supported by central context?
2. Consistency: Does severity match central context urgency ({state.urgency_level})?
3. PII / Sensitive Exposure: Is any raw private password or unmasked PII exposed?
4. Audience alignment: Is tone compliant with {state.tone}?

Output a ComplianceCheckResult JSON:
- status ("passed", "warning", or "failed")
- warnings
- issues
- checks dictionary
"""
        result = llm_service.generate_json(
            prompt=prompt,
            schema_class=ComplianceCheckResult,
            system_prompt="You perform rigorous security, privacy, and consistency guardrail validation.",
            use_fast_model=True  # Can use fast model for validation
        )
        return result.model_dump()

compliance_agent = ComplianceAgent()
