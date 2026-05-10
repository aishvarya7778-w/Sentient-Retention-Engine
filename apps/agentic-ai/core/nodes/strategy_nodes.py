import json
import time
from typing import Dict, Any, List
from langchain_core.messages import HumanMessage, SystemMessage
from ..state import RetentionState
from ..llm_provider import get_llm
from ..models import RetentionStrategy
from .utils import emit_telemetry

llm, LLM_AVAILABLE = get_llm()

def node_strategy_planning(state: RetentionState) -> Dict[str, Any]:
    """
    [Agent 2: StrategyPlanningAgent]
    Purpose: Generate high-level candidate strategies based on risk drivers.
    """
    risk_level = state.get("risk_level", "MEDIUM")
    drivers = state.get("primary_drivers", ["GENERAL_CHURN_RISK"])
    emit_telemetry(state, "StrategyPlanningAgent", "STRATEGY_GENERATION_STARTED", 
                   f"Planning strategies for {risk_level} risk due to {', '.join(drivers)}")

    # RAG Grounding
    # Strategy Selection Matrix from User Doc
    candidates = []
    if "USAGE_DECLINE" in drivers:
        candidates.append({
            "strategy_id": "ST-USAGE",
            "name": "Feature Enablement Trial",
            "details": "Premium trial for 3 months to increase engagement via new features.",
            "roi_estimate": 1.45
        })
    if "BILLING_ISSUE" in drivers:
        candidates.append({
            "strategy_id": "ST-BILLING",
            "name": "Billing Grace Period",
            "details": "Waive late fees and offer flexible payment plan.",
            "roi_estimate": 1.25
        })
    if "SUPPORT_FRICTION" in drivers:
        candidates.append({
            "strategy_id": "ST-SUPPORT",
            "name": "Priority Specialist Support",
            "details": "Direct line to senior support specialist + priority queue.",
            "roi_estimate": 1.35
        })
    if risk_level == "CRITICAL":
        candidates.append({
            "strategy_id": "ST-CRITICAL",
            "name": "VIP Concierge Discount",
            "details": "Dedicated account manager + 20% loyalty discount.",
            "roi_estimate": 1.65
        })
    
    if not candidates:
        candidates.append({
            "strategy_id": "ST-DEFAULT",
            "name": "Loyalty Appreciation",
            "details": "Standard 10% discount for continued service.",
            "roi_estimate": 1.15
        })

    emit_telemetry(state, "StrategyPlanningAgent", "CANDIDATES_GENERATED", 
                   f"Generated {len(candidates)} candidate strategies.")
    
    return {
        "strategy_candidates": candidates,
        "agent_telemetry": state.get("agent_telemetry", [])
    }

def node_decision(state: RetentionState) -> Dict[str, Any]:
    """
    [Agent 4: DecisionAgent]
    Purpose: Ranks and selects the optimal strategy based on simulation outcomes.
    """
    emit_telemetry(state, "DecisionAgent", "DECISION_STARTED", "Selecting optimal strategy based on simulations.")
    
    sim_results = state.get("simulation_results", [])
    candidates = state.get("strategy_candidates", [])
    
    if not sim_results:
        # If no simulation happened, pick the one with highest ROI estimate
        selected = max(candidates, key=lambda x: x.get("roi_estimate", 0))
        reasoning = "Selected based on initial ROI estimate (No simulation data available)."
        confidence = 0.65 # Lower confidence without simulation
    else:
        # User's Decision Logic: score = (roi * 0.4) + (confidence * 0.6)
        def calculate_score(s):
            roi = s.get("roi_estimate", 0)
            conf = s.get("success_probability", 0)
            return (roi * 0.4) + (conf * 0.6)
            
        selected = max(sim_results, key=calculate_score)
        confidence = selected.get("success_probability", 0)
        score = calculate_score(selected)
        reasoning = f"Selected {selected.get('name')} with weighted score {score:.2f} (ROI: {selected.get('roi_estimate')}, Conf: {confidence:.2f})"
    
    emit_telemetry(state, "DecisionAgent", "DECISION_COMPLETED", 
                   f"Strategy Selected: {selected.get('name')}", 
                   {"confidence": confidence, "reasoning": reasoning})
    
    return {
        "selected_strategy": selected,
        "decision_confidence": confidence,
        "decision_reasoning": reasoning,
        "agent_telemetry": state.get("agent_telemetry", [])
    }
