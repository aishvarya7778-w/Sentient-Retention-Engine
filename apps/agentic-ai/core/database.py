import psycopg2
from psycopg2 import extras
import os
from dotenv import load_dotenv

load_dotenv()

DB_URL = os.getenv("DATABASE_URL")
if not DB_URL:
    raise ValueError("DATABASE_URL environment variable is not set")

def get_db_connection():
    try:
        conn = psycopg2.connect(DB_URL)
        return conn
    except Exception as e:
        print(f"Database connection error: {e}")
        return None

def fetch_customer_data(customer_id: str):
    conn = get_db_connection()
    if not conn:
        return None
    
    try:
        with conn.cursor(cursor_factory=extras.RealDictCursor) as cur:
            cur.execute("SELECT * FROM raw_customer_churn WHERE customer_id = %s", (customer_id,))
            result = cur.fetchone()
            return result
    except Exception as e:
        print(f"Error fetching customer data: {e}")
        return None
    finally:
        conn.close()

def create_retention_action(customer_id: str, action_type: str, status: str = 'pending'):
    conn = get_db_connection()
    if not conn:
        return None
    
    try:
        with conn.cursor(cursor_factory=extras.RealDictCursor) as cur:
            cur.execute(
                "INSERT INTO retention_actions (user_id, action_type, status) VALUES (%s, %s, %s) RETURNING id",
                (customer_id, action_type, status)
            )
            result = cur.fetchone()
            conn.commit()
            return result['id'] if result else None
    except Exception as e:
        print(f"Error creating retention action: {e}")
        return None
    finally:
        conn.close()

def create_agent_memory(customer_id: str, action: str, result: str, churn_risk: float, reason: str):
    conn = get_db_connection()
    if not conn:
        return None
    
    try:
        with conn.cursor() as cur:
            cur.execute(
                "INSERT INTO agent_memory (user_id, action, result, churn_risk, reason) VALUES (%s, %s, %s, %s, %s)",
                (customer_id, action, result, churn_risk, reason)
            )
            conn.commit()
    except Exception as e:
        print(f"Error creating agent memory: {e}")
    finally:
        conn.close()
