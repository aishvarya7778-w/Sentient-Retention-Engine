import time
from typing import Dict, Any, List
from ..state import RetentionState
from ..llm_provider import get_llm
from ..models import BusinessRuleCheck
from .utils import emit_telemetry
from ..database import create_retention_action, create_agent_memory

llm, LLM_AVAILABLE = get_llm()

def node_governance(state: RetentionState) -> Dict[str, Any]:
    """
    [Agent 5: GovernanceEngine]
    Purpose: Validate selected strategy against confidence, ROI, business policy, and risk thresholds.
    """
    strategy = state.get("selected_strategy", {})
    confidence = state.get("decision_confidence", 0)
    risk_level = state.get("risk_level", "MEDIUM")
    plan_tier = state.get("plan_tier", "BASIC")
    roi_estimate = strategy.get("roi_estimate", 0)
    reasoning = state.get("decision_reasoning", "")
    
    emit_telemetry(state, "GovernanceEngine", "VALIDATION_STARTED", 
                   f"Initiating validation layer for {strategy.get('name')} | Risk: {risk_level}")
    
    violations = []
    
    # 1. Confidence Threshold Check
    target_confidence = 0.90 if risk_level == "CRITICAL" else 0.80
    if confidence < target_confidence:
        violations.append(f"CONFIDENCE_UNDER_THRESHOLD: {confidence:.2f} < {target_confidence}")
    
    # 2. ROI Constraint Check
    # Business requirement: ROI must be at least 1.5x for CRITICAL retention actions
    min_roi = 1.5 if risk_level == "CRITICAL" else 1.2
    if roi_estimate < min_roi:
        violations.append(f"ROI_CONSTRAINT_VIOLATION: {roi_estimate:.2f} < {min_roi}")
        
    # 3. Customer Sensitivity Detection
    sensitivity = "HIGH" if (risk_level in ["CRITICAL", "HIGH"] or plan_tier == "ENTERPRISE") else "LOW"
    
    # 4. Hallucination Risk Assessment (Heuristic-based)
    hallucination_risk = "LOW"
    if len(reasoning) < 50:
        hallucination_risk = "MEDIUM"
        violations.append("HALLUCINATION_RISK: Reasoning depth insufficient.")
    elif "test" in reasoning.lower() or "placeholder" in reasoning.lower():
        hallucination_risk = "HIGH"
        violations.append("HALLUCINATION_RISK: Detected non-deterministic/placeholder terminology.")

    # 5. Policy Compliance
    if "Discount" in strategy.get("name", "") and plan_tier == "ENTERPRISE":
        # Enterprise customers should get service-based retention, not generic discounts
        violations.append("POLICY_VIOLATION: Direct discounts are deprecated for Enterprise Tier.")

    passed = len(violations) == 0
    
    validation_status = "VALIDATION_PASSED" if passed else "VALIDATION_FAILED"
    message = "Governance Clearance Granted" if passed else f"Escalation Required: {violations[0]}"
    
    # Enrich state with governance metrics for the dashboard
    governance_metadata = {
        "confidence": f"{confidence*100:.1f}%",
        "roi_status": "PASS" if roi_estimate >= min_roi else "FAIL",
        "policy_compliance": "PASS" if not any("POLICY" in v for v in violations) else "FAIL",
        "hallucination_risk": hallucination_risk,
        "sensitivity": sensitivity,
        "violations": violations
    }

    emit_telemetry(state, "GovernanceEngine", validation_status, message, governance_metadata)

    return {
        "validation_passed": passed,
        "policy_violations": violations,
        "roi_check": roi_estimate >= min_roi,
        "governance_report": {
            "status": "APPROVED" if passed else "REJECTED",
            "violations": violations,
            "timestamp": time.time(),
            "reasoning": message,
            "metadata": governance_metadata
        },
        "agent_telemetry": state.get("agent_telemetry", [])
    }

def node_human_handoff(state: RetentionState) -> Dict[str, Any]:
    """
    [Agent 7: HumanHandoffAgent]
    Purpose: Bridges AI uncertainty with specialist intervention by persisting cases to the management queue.
    """
    customer_id = state.get("customer_id")
    risk_score = state.get("risk_score", 0.5)
    violations = state.get("policy_violations", [])
    reason = violations[0] if violations else "Low AI confidence / ROI threshold fail"
    
    emit_telemetry(state, "HumanHandoffAgent", "ESCALATION_TRIGGERED", 
                   f"Escalating customer {customer_id} to human specialist. Reason: {reason}")
    
    # Persist the escalation to the database for the Admin Dashboard
    # This creates a 'pending' record in retention_actions that specialists can 'claim'
    escalation_id = create_retention_action(customer_id, "ESCALATION", "pending")
    
    # Record in agent memory
    create_agent_memory(
        customer_id=customer_id,
        action="HUMAN_INTERVENTION",
        result="escalated",
        churn_risk=risk_score,
        reason=f"Governance Failure: {reason}. Manual review required."
    )
    
    return {
        "status": "HANDOFF_COMPLETE",
        "specialist_queue_id": f"SQ-{escalation_id}" if escalation_id else "PENDING_QUEUE",
        "handoff_timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "escalated_to_human": True,
        "human_status": "PENDING",
        "escalation_id": str(escalation_id) if escalation_id else None,
        "escalation_reason": reason,
        "final_action": "HUMAN_REVIEW_REQUIRED",
        "message": f"ESCALATION_SUCCESS: Case {escalation_id or 'NEW'} added to Specialist Queue. Reason: {reason}",
        "agent_telemetry": state.get("agent_telemetry", [])
    }
