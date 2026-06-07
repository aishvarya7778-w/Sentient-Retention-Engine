import sys
import os
from datetime import datetime
from typing import Optional, Dict, Any
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

# Add the parent directory to sys.path to allow importing from core
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

from core.database import fetch_customer_data, get_db_connection
from psycopg2 import extras
from digital_twin.simulation.simulator import DigitalTwinEngine, UserProfile

router = APIRouter()

class SimulationOverride(BaseModel):
    usage: Optional[float] = None
    complaints: Optional[int] = None
    payment_delay: Optional[int] = None
    churn_risk: Optional[float] = None

class TwinContext(BaseModel):
    userId: str

def get_user_profile(user_id: str) -> Optional[UserProfile]:
    # Check if database is reachable
    db_conn = None
    try:
        db_conn = get_db_connection()
    except Exception as e:
        print(f"Error checking DB connection: {e}")
        db_conn = None

    # Database connection failed -> Gracefully fall back to default profile (Resiliency)
    if db_conn is None:
        return UserProfile(
            user_id=user_id,
            usage=15.0,
            complaints=0,
            payment_delay=0,
            churn_risk=0.5
        )

    db_conn.close()

    # 1. Try raw_customer_churn
    raw_data = None
    raw_error = False
    try:
        raw_data = fetch_customer_data(user_id)
    except Exception as e:
        print(f"Error fetching customer data from DB: {e}")
        raw_error = True
    
    if raw_data:
        # Map raw_customer_churn fields
        tech_support = raw_data.get("tech_support", "No")
        complaints = 3 if tech_support == "No" else 0
        payment_method = raw_data.get("payment_method", "")
        payment_delay = 1 if "check" in str(payment_method).lower() or "mailed" in str(payment_method).lower() else 0
        
        try:
            usage = float(raw_data.get("monthly_charges", 15.0))
        except (TypeError, ValueError):
            usage = 15.0
            
        churn_str = str(raw_data.get("churn", "No")).strip().lower()
        churn_risk = 0.85 if churn_str == "yes" else 0.25
        
        return UserProfile(
            user_id=user_id,
            usage=usage,
            complaints=complaints,
            payment_delay=payment_delay,
            churn_risk=churn_risk
        )
        
    # 2. Try users table
    users_error = False
    conn = None
    try:
        conn = get_db_connection()
        if conn:
            with conn.cursor(cursor_factory=extras.RealDictCursor) as cur:
                cur.execute("SELECT * FROM users WHERE user_id = %s", (user_id,))
                user_rec = cur.fetchone()
                if user_rec:
                    try:
                        usage = float(user_rec.get("usage_score", 15.0))
                    except (TypeError, ValueError):
                        usage = 15.0
                        
                    try:
                        complaints = int(user_rec.get("complaints_count", 0))
                    except (TypeError, ValueError):
                        complaints = 0
                        
                    try:
                        payment_delay = int(user_rec.get("payment_delay_count", 0))
                    except (TypeError, ValueError):
                        payment_delay = 0
                        
                    churn_risk = 0.5
                    try:
                        cur.execute("SELECT churn_risk FROM churn_predictions WHERE user_id = %s ORDER BY predicted_at DESC LIMIT 1", (user_id,))
                        pred_rec = cur.fetchone()
                        if pred_rec:
                            churn_risk = float(pred_rec.get("churn_risk", 0.5))
                    except Exception:
                        pass
                        
                    return UserProfile(
                        user_id=user_id,
                        usage=usage,
                        complaints=complaints,
                        payment_delay=payment_delay,
                        churn_risk=churn_risk
                    )
    except Exception as e:
        print(f"Error fetching from users table in twin_api: {e}")
        users_error = True
    finally:
        if conn:
            conn.close()

    # If any error occurred during query execution, fall back to default profile
    if raw_error or users_error:
        return UserProfile(
            user_id=user_id,
            usage=15.0,
            complaints=0,
            payment_delay=0,
            churn_risk=0.5
        )

    # No errors occurred, but user was not found in either table -> 404 (return None)
    return None

@router.get("/")
async def twin_status():
    return {"status": "Digital Twin Engine Active"}

@router.post("/simulate/action")
async def simulate_action(userId: str, action: str, overrides: Optional[SimulationOverride] = None):
    # Retrieve user profile with fallbacks
    profile = get_user_profile(userId)
    if profile is None:
        raise HTTPException(status_code=404, detail=f"User {userId} not found")
    
    # Apply overrides if provided
    if overrides:
        if overrides.usage is not None:
            profile.usage = overrides.usage
        if overrides.complaints is not None:
            profile.complaints = overrides.complaints
        if overrides.payment_delay is not None:
            profile.payment_delay = overrides.payment_delay
        if overrides.churn_risk is not None:
            profile.churn_risk = overrides.churn_risk
            
    # Clip and validate
    profile.__post_init__()
    
    # Run simulation
    engine = DigitalTwinEngine()
    try:
        res = engine.simulate(profile, action)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
        
    return {
        "userId": userId,
        "action": action,
        "original_churn": res.original_churn,
        "simulated_churn": res.simulated_churn,
        "reduction": res.reduction,
        "reduction_percentage": res.reduction_percentage,
        "predicted_impact": {
            "churn_reduction": f"{res.reduction_percentage:.1f}%",
            "ltv_increase": f"{res.reduction * 15.0:.1f}%" if action == "DISCOUNT" else f"{res.reduction * 5.0:.1f}%",
            "confidence": 0.85
        }
    }

@router.get("/{userId}/state")
async def get_twin_state(userId: str):
    profile = get_user_profile(userId)
    if profile is None:
        raise HTTPException(status_code=404, detail=f"User {userId} not found")
    
    # Determine risk level category
    if profile.churn_risk > 0.75:
        risk_level = "Critical-Risk"
    elif profile.churn_risk > 0.5:
        risk_level = "High-Risk"
    elif profile.churn_risk > 0.25:
        risk_level = "Medium-Risk"
    else:
        risk_level = "Low-Risk"
        
    # Generate key features dynamically
    features = []
    if profile.usage < 10.0:
        features.append("Low_Activity")
    if profile.complaints > 2:
        features.append("High_Support_Tickets")
    if profile.payment_delay > 0:
        features.append("Payment_Issues")
    if not features:
        features.append("Healthy_Usage")
        
    return {
        "userId": userId,
        "current_state": risk_level,
        "last_updated": datetime.utcnow().isoformat() + "Z",
        "key_features": features,
        "metrics": {
            "usage": profile.usage,
            "complaints": profile.complaints,
            "payment_delay": profile.payment_delay,
            "churn_risk": profile.churn_risk
        }
    }

