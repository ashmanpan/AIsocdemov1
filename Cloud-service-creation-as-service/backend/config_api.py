"""
FastAPI endpoint for LLM configuration management
Handles API key storage and testing
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import os
import anthropic
import time
import hashlib
import secrets
from dotenv import load_dotenv, set_key, find_dotenv

app = FastAPI(title="Cloud Service Creator - LLM Config API")

# Admin password (change this!)
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "cisco@admin123")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ConfigRequest(BaseModel):
    api_key: str
    model: str = "claude-sonnet-4-20250514"
    provider: str = "anthropic"
    system_prompt: Optional[str] = None


class TestRequest(BaseModel):
    api_key: str


class LoginRequest(BaseModel):
    password: str


@app.post("/api/auth/login")
async def admin_login(login: LoginRequest):
    """
    Authenticate admin user
    """
    if login.password == ADMIN_PASSWORD:
        # Generate simple token (in production, use JWT)
        token = secrets.token_urlsafe(32)
        return {
            "success": True,
            "token": token,
            "message": "Login successful"
        }
    else:
        raise HTTPException(status_code=401, detail="Invalid password")


@app.get("/api/config")
async def get_config():
    """
    Get current LLM configuration
    """
    load_dotenv()

    api_key = os.getenv("ANTHROPIC_API_KEY")
    model = os.getenv("MODEL_NAME", "claude-sonnet-4-20250514")
    provider = os.getenv("API_PROVIDER", "anthropic")

    return {
        "configured": bool(api_key and api_key != "sk-ant-your-api-key-here"),
        "api_key": api_key if api_key else None,
        "model": model,
        "provider": provider
    }


@app.post("/api/config")
async def save_config(config: ConfigRequest):
    """
    Save LLM configuration to .env file
    """
    try:
        # Find or create .env file
        env_file = find_dotenv()
        if not env_file:
            env_file = os.path.join(os.path.dirname(__file__), '.env')
            # Create .env if it doesn't exist
            with open(env_file, 'w') as f:
                f.write("# Anthropic Claude API Configuration\n")

        # Save configuration
        set_key(env_file, "ANTHROPIC_API_KEY", config.api_key)
        set_key(env_file, "MODEL_NAME", config.model)
        set_key(env_file, "API_PROVIDER", config.provider)

        if config.system_prompt:
            set_key(env_file, "SYSTEM_PROMPT", config.system_prompt)

        # Reload environment variables
        load_dotenv(override=True)

        return {
            "success": True,
            "message": "Configuration saved successfully",
            "env_file": env_file
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save configuration: {str(e)}")


@app.post("/api/test-connection")
async def test_connection(test: TestRequest):
    """
    Test connection to Claude API
    """
    try:
        start_time = time.time()

        # Initialize Claude client
        client = anthropic.Anthropic(api_key=test.api_key)

        # Send test message
        response = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=100,
            messages=[
                {
                    "role": "user",
                    "content": "Reply with just 'API connection successful' if you receive this message."
                }
            ]
        )

        end_time = time.time()
        response_time = int((end_time - start_time) * 1000)  # Convert to ms

        return {
            "success": True,
            "model": "claude-sonnet-4-20250514",
            "response_time": response_time,
            "test_response": response.content[0].text,
            "usage": {
                "input_tokens": response.usage.input_tokens,
                "output_tokens": response.usage.output_tokens
            }
        }

    except anthropic.AuthenticationError:
        raise HTTPException(status_code=401, detail="Invalid API key")

    except anthropic.RateLimitError:
        raise HTTPException(status_code=429, detail="Rate limit exceeded")

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Connection test failed: {str(e)}")


@app.get("/api/stats")
async def get_stats():
    """
    Get usage statistics (placeholder - implement with database)
    """
    return {
        "total_calls": 0,
        "total_cost": 0.0,
        "avg_response_time": 0,
        "services_generated": 0
    }


@app.get("/health")
async def health_check():
    """
    Health check endpoint
    """
    return {"status": "healthy", "service": "LLM Config API"}


if __name__ == "__main__":
    import uvicorn
    print("🚀 Starting LLM Config API on http://localhost:8000")
    print("📝 Admin panel: http://localhost:8000/../llm-admin.html")
    uvicorn.run(app, host="0.0.0.0", port=8000)
