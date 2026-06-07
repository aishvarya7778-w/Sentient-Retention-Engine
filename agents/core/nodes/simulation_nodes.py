import time
import random
import json
from typing import Dict, Any, List
from langchain_core.messages import HumanMessage, SystemMessage
from ..state import RetentionState
from ..llm_provider import get_llm
from ..models import SimulationResult
from .utils import emit_telemetry
from ..governance_policy import HARDCODED_POLICIES
from digital_twin.simulation.simulator import DigitalTwinEngine, UserProfile

llm, LLM_AVAILABLE = get_llm()

from ..governance_engine import governance_protected

@governance_protected("run_simulations")
def node_simulation(state: RetentionState) -> Dict[str, Any]:
    """
    [Agent 3: SimulationAgent]
    Purpose: Simulate outcomes for each candidate strategy.
    """
    candidates = state.get("strategy_candidates", [])
    emit_telemetry(state, "SimulationAgent", "SIMULATION_STARTED", f"Simulating {len(candidates)} candidate strategies.")
    
    # Initialize Digital Twin Engine
    twin_engine = DigitalTwinEngine()
    
    # Map State to UserProfile using configured defaults
    user_id = state.get("customer_id") or "unknown"
    try:
        usage = float(state.get("usage_last_30d", 15.0))
    except (TypeError, ValueError):
        usage = 15.0
    try:
        complaints = int(state.get("support_ticket_count", 0))
    except (TypeError, ValueError):
        complaints = 0
    payment_status = str(state.get("payment_status", "Paid")).strip().lower()
    payment_delay = 1 if payment_status in ["late", "unpaid", "overdue"] else 0
    try:
        churn_risk = float(state.get("risk_score", 0.5))
    except (TypeError, ValueError):
        churn_risk = 0.5
        
    user_profile = UserProfile(
        user_id=user_id,
        usage=usage,
        complaints=complaints,
        payment_delay=payment_delay,
        churn_risk=churn_risk
    )
    
    simulation_results = []
    
    for strategy in candidates:
        emit_telemetry(state, "SimulationAgent", "STRATEGY_SIMULATION", f"Running digital twin for: {strategy.get('name')}")
        
        # Map strategy to Digital Twin action
        name_upper = strategy.get("name", "").upper()
        details_upper = strategy.get("details", "").upper()
        strat_id_upper = strategy.get("strategy_id", "").upper()
        
        if any(k in name_upper or k in details_upper or k in strat_id_upper for k in ["DISCOUNT", "BILLING", "FEE", "WAIVE", "CRITICAL"]):
            twin_action = "DISCOUNT"
        elif any(k in name_upper or k in details_upper or k in strat_id_upper for k in ["EMAIL", "ENGAGE", "SUPPORT", "USAGE"]):
            twin_action = "EMAIL"
        else:
            twin_action = "NONE"
            
        # Run deterministic simulation using DigitalTwinEngine
        twin_result = twin_engine.simulate(user_profile, twin_action)
        
        # Try to use Gemini Flash for dynamic customer reaction simulation
        llm_flash, flash_available = get_llm("gemini_flash")
        
        sim_data = None
        if flash_available:
            try:
                agent_id = "SimulationAgent"
                policy = HARDCODED_POLICIES.get(agent_id, {})
                allowed_actions = policy.get("allowed_actions", [])
                blocked_actions = policy.get("blocked_actions", [])
 
                system_prompt = f"""You are the {agent_id} for the Sentient Retention Engine.
Your purpose is to simulate the customer's reaction to a candidate retention strategy and estimate key metrics.

## Governance & Permission Scopes
You must operate STRICTLY under the following permission boundaries:
- ALLOWED ACTIONS: {', '.join(allowed_actions)}
- BLOCKED ACTIONS: {', '.join(blocked_actions)}

WARNING: You are strictly BLOCKED from performing {', '.join(blocked_actions)}. Under no circumstances should you simulate or generate any outcome that bypasses these limits or attempts to actually execute these blocked actions. Your task is strictly simulation and scenario analysis.

## Expected Output Format
You must output a single JSON object. Do not include any explanation or markdown formatting outside of a standard json block.
The JSON object must contain the following keys:
- success_probability: A float between 0.0 and 1.0 representing the likelihood that this strategy retains the customer.
- outcome: A string, one of "RETAINED" (probability > 0.8), "STABLE" (probability between 0.5 and 0.8), or "LOST" (probability < 0.5).
- retention_forecast: A percentage string representing the forecast (e.g., "85%").
- engagement_forecast: A float between 1.0 and 10.0 representing the forecast of customer engagement.
- clv_impact: A float representing estimated financial impact (e.g., customer lifetime value change, between 50.0 and 200.0).
- user_reaction: A string summarizing the customer's likely response (e.g., "Highly enthusiastic about the premium trial", "Skeptical but willing to stay for 3 months").
"""

                user_prompt = f"""Simulate customer reaction for the following candidate strategy:
Strategy ID: {strategy.get('strategy_id')}
Strategy Name: {strategy.get('name')}
Strategy Details: {strategy.get('details')}

Customer Profile:
- Customer ID: {state.get('customer_id')}
- Plan Tier: {state.get('plan_tier')}
- Churn Risk Level: {state.get('risk_level')}
- Churn Risk Score: {state.get('risk_score')}
- Primary Drivers: {', '.join(state.get('primary_drivers', []))}
- Support Tickets: {state.get('support_ticket_count', 0)}
- Usage (last 30d): {state.get('usage_last_30d', 0)}
- Network Drop Events: {state.get('network_drop_events', 0)}
- Payment Status: {state.get('payment_status')}

## Deterministic Simulation Baseline (Anchor)
Our Digital Twin Simulator has calculated the following baseline forecast for this action ({twin_action}):
- Original Churn Risk: {twin_result.original_churn}
- Predicted Churn Risk after Intervention: {twin_result.simulated_churn}
- Churn Risk Reduction: {twin_result.reduction} ({twin_result.reduction_percentage}%)

You MUST use this deterministic simulation as your anchor. Your final predicted `success_probability` (representing likelihood that the strategy retains the customer) should align logically with the anchored twin results (e.g. if simulated churn is {twin_result.simulated_churn}, success_probability should be around {round(1.0 - twin_result.simulated_churn, 2)} unless there are strong contextual reasons in the user profile to adjust it).
"""

                messages = [
                    SystemMessage(content=system_prompt),
                    HumanMessage(content=user_prompt)
                ]
                
                response = llm_flash.invoke(messages)
                content = response.content.strip()
                
                # Clean up potential markdown JSON blocks
                if content.startswith("```json"):
                    content = content[7:]
                if content.endswith("```"):
                    content = content[:-3]
                content = content.strip()
                
                parsed_res = json.loads(content)
                if not isinstance(parsed_res, dict) or "success_probability" not in parsed_res:
                    raise ValueError("Parsed result is not a dictionary or is missing 'success_probability'")
                
                # Sanitize metrics and apply boundaries
                try:
                    success_prob = float(parsed_res.get("success_probability"))
                except (TypeError, ValueError):
                    raise ValueError("Invalid success_probability value")
                
                success_prob = max(0.0, min(1.0, success_prob))
                
                outcome = parsed_res.get("outcome", "STABLE")
                if outcome not in ["RETAINED", "STABLE", "LOST"]:
                    outcome = "RETAINED" if success_prob > 0.8 else "STABLE" if success_prob >= 0.5 else "LOST"
                
                retention_forecast = parsed_res.get("retention_forecast", f"{int(success_prob * 100)}%")
                
                try:
                    engagement_forecast = float(parsed_res.get("engagement_forecast", 7.0))
                except (TypeError, ValueError):
                    engagement_forecast = 7.0
                engagement_forecast = max(1.0, min(10.0, engagement_forecast))
                
                try:
                    clv_impact = float(parsed_res.get("clv_impact", 100.0))
                except (TypeError, ValueError):
                    clv_impact = 100.0
                clv_impact = max(50.0, min(200.0, clv_impact))
                
                user_reaction = parsed_res.get("user_reaction", "Simulated reaction")
                
                sim_data = {
                    **strategy,
                    "success_probability": success_prob,
                    "simulation_score": success_prob,
                    "outcome": outcome,
                    "retention_forecast": retention_forecast,
                    "engagement_forecast": engagement_forecast,
                    "clv_impact": clv_impact,
                    "user_reaction": user_reaction
                }
            except Exception as e:
                emit_telemetry(state, "SimulationAgent", "LLM_FALLBACK", f"Gemini Flash customer simulation failed or output corrupt: {e}. Falling back to deterministic twin.")
                sim_data = None
        
        # Fallback to Digital Twin simulator results directly if LLM was not available or failed
        if not sim_data:
            success_probability = round(1.0 - twin_result.simulated_churn, 4)
            success_probability = max(0.0, min(1.0, success_probability))
            
            if success_probability > 0.8:
                outcome = "RETAINED"
            elif success_probability >= 0.5:
                outcome = "STABLE"
            else:
                outcome = "LOST"
                
            retention_forecast = f"{int(success_probability * 100)}%"
            
            action_effects = twin_engine.ACTION_EFFECTS.get(twin_action, {})
            usage_boost = action_effects.get("usage_boost", 0.0)
            engagement_forecast = min(10.0, max(1.0, 7.0 + (usage_boost * 10.0) + (user_profile.usage * 0.05)))
            
            roi = strategy.get("roi_estimate", 1.15)
            clv_impact = min(200.0, max(50.0, 100.0 * roi + (twin_result.reduction * 50.0)))
            
            sim_data = {
                **strategy,
                "success_probability": success_probability,
                "simulation_score": success_probability,
                "outcome": outcome,
                "retention_forecast": retention_forecast,
                "engagement_forecast": round(engagement_forecast, 2),
                "clv_impact": round(clv_impact, 2),
                "user_reaction": f"Deterministic twin simulator predicted a {twin_result.reduction_percentage}% churn risk reduction via {twin_action}."
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
