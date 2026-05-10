import time
from typing import Dict, Any, List
from ..state import RetentionState
from .utils import emit_telemetry

def node_action_execution(state: RetentionState) -> Dict[str, Any]:
    """
    [Agent 6: ActionExecutionAgent]
    Purpose: Executes the validated strategy (Email, SMS, API triggers).
    """
    strategy = state.get("selected_strategy", {})
    customer_id = state.get("customer_id")
    
    # 1. Verification (Double check governance)
    if not state.get("validation_passed"):
        emit_telemetry(state, "ActionExecutionAgent", "EXECUTION_STOPPED", "Governance check failed. Halting workflow.")
        return {"execution_status": "STOPPED"}

    emit_telemetry(state, "ActionExecutionAgent", "EXECUTION_STARTED", f"Executing {strategy.get('name')} for {customer_id}")
    
    # 2. Simulate API Calls (As per user spec)
    # api.trigger_email(customer_id, strategy)
    # api.trigger_discount_code(customer_id, code)
    
    emit_telemetry(state, "ActionExecutionAgent", "EMAIL_TRIGGERED", f"Retention email sent to {customer_id}")
    if "Discount" in strategy.get("name", ""):
        emit_telemetry(state, "ActionExecutionAgent", "DISCOUNT_APPLIED", f"Discount code generated and attached to {customer_id}")

    # 3. Construct execution payload
    payload = {
        "customer_id": customer_id,
        "strategy_id": strategy.get("strategy_id"),
        "action": strategy.get("name"),
        "details": strategy.get("details"),
        "confidence": state.get("decision_confidence"),
        "is_automated": True,
        "execution_timestamp": time.time()
    }
    
    emit_telemetry(state, "ActionExecutionAgent", "EXECUTION_COMPLETED", 
                   "Final action successfully executed and recorded.")
    
    return {
        "final_action": strategy.get("name"),
        "execution_payload": payload,
        "execution_status": "SUCCESS",
        "agent_telemetry": state.get("agent_telemetry", [])
    }

def node_feedback_learning(state: RetentionState) -> Dict[str, Any]:
    """
    [Agent 9: FeedbackLearningAgent]
    Purpose: Closes the loop by learning from outcome data.
    """
    emit_telemetry(state, "FeedbackLearningAgent", "LEARNING_STARTED", "Capturing execution metrics for continuous improvement.")
    
    # Capture metrics for the learning loop
    metrics = {
        "customer_id": state.get("customer_id"),
        "risk_level": state.get("risk_level"),
        "strategy_selected": state.get("final_action"),
        "predicted_success": state.get("decision_confidence"),
        "timestamp": time.time()
    }
    
    emit_telemetry(state, "FeedbackLearningAgent", "LEARNING_COMPLETED", 
                   "Metrics captured for model retraining.")
    
    return {
        "feedback_metrics": metrics,
        "agent_telemetry": state.get("agent_telemetry", [])
    }
