import time
import random
from typing import Dict, Any, List
from ..state import RetentionState
from ..llm_provider import get_llm
from ..models import SimulationResult
from .utils import emit_telemetry

llm, LLM_AVAILABLE = get_llm()

def node_simulation(state: RetentionState) -> Dict[str, Any]:
    """
    [Agent 3: SimulationAgent]
    Purpose: Simulate outcomes for each candidate strategy.
    """
    candidates = state.get("strategy_candidates", [])
    emit_telemetry(state, "SimulationAgent", "SIMULATION_STARTED", f"Simulating {len(candidates)} candidate strategies.")
    
    simulation_results = []
    
    for strategy in candidates:
        emit_telemetry(state, "SimulationAgent", "STRATEGY_SIMULATION", f"Running digital twin for: {strategy.get('name')}")
        
        # In a real scenario, we might use an LLM here to simulate the customer's reaction.
        # For efficiency, we'll use a combination of rule-based scoring and probabilistic modeling.
        
        # Base probability from strategy ROI estimate + some randomness
        roi = strategy.get("roi_estimate", 0.5)
        sentiment_score = random.uniform(0.3, 0.9) # Simulated sentiment
        
        # User's Simulation Logic: score = (ROI * 0.7) + (sentiment_score * 0.3)
        score = (roi * 0.7) + (sentiment_score * 0.3)
        
        if score > 0.8:
            outcome = "RETAINED"
            success_probability = 0.94
            retention_forecast = "94%"
        elif score > 0.5:
            outcome = "STABLE"
            success_probability = 0.62
            retention_forecast = "62%"
        else:
            outcome = "LOST"
            success_probability = 0.21
            retention_forecast = "21%"
        
        # Engagement score forecast
        engagement_forecast = 7.5 + random.uniform(-1, 2)
        
        # CLV impact (dollar value)
        clv_impact = random.uniform(50, 200)
        
        sim_data = {
            **strategy,
            "success_probability": success_probability,
            "simulation_score": score,
            "outcome": outcome,
            "retention_forecast": retention_forecast,
            "engagement_forecast": engagement_forecast,
            "clv_impact": clv_impact,
            "user_reaction": "Positive" if score > 0.6 else "Skeptical"
        }
        simulation_results.append(sim_data)
        
        # Small delay to mimic processing
        time.sleep(0.1)

    emit_telemetry(state, "SimulationAgent", "SIMULATION_COMPLETED", 
                   f"Successfully simulated {len(simulation_results)} strategies.")
    
    return {
        "simulation_results": simulation_results,
        "engagement_score_forecast": sum(r["engagement_forecast"] for r in simulation_results) / len(simulation_results) if simulation_results else 0,
        "clv_impact": sum(r["clv_impact"] for r in simulation_results) / len(simulation_results) if simulation_results else 0,
        "agent_telemetry": state.get("agent_telemetry", [])
    }
