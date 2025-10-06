# Quick Start: Claude Sonnet Integration

## Step 1: Get Anthropic API Key

1. Go to https://console.anthropic.com/
2. Sign up / Log in
3. Navigate to **API Keys**
4. Create new key
5. Copy your API key (starts with `sk-ant-`)

**Pricing:**
- Claude Sonnet: $3 per million input tokens, $15 per million output tokens
- ~$0.50 per service generation (very cost-effective!)

## Step 2: Setup Environment

```bash
# Create virtual environment
cd Cloud-service-creation-as-service/backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

## Step 3: Configure API Key

Create `.env` file:
```bash
# .env
ANTHROPIC_API_KEY=sk-ant-your-api-key-here
```

**IMPORTANT: Never commit .env file to git!**

Add to `.gitignore`:
```
.env
*.env
__pycache__/
venv/
```

## Step 4: Test Claude Integration

```bash
# Quick test
python llm_service_claude.py
```

You should see:
```
🤖 Starting conversation...
AI: What type of cloud service would you like to create?
...
```

## Step 5: Use in Your Application

### Simple Usage

```python
from llm_service_claude import ClaudeServiceCreator

# Initialize
service = ClaudeServiceCreator()

# Start conversation
response = await service.start_conversation()
print(response['question'])

# User answers
answer = "I want to create vFirewall service"
response = await service.send_message(answer, current_step=1)

# After 7 questions, generate code
requirements = {
    'service_type': 'vFirewall',
    'vendor': 'Cisco',
    'features': ['Traffic Filtering', 'Threat Detection'],
    # ... other requirements
}

generated_files = await service.generate_complete_service(requirements)

# Use the generated code
for filename, code in generated_files.items():
    with open(f'output/{filename}', 'w') as f:
        f.write(code)
```

### FastAPI Integration

```python
# app/main.py
from fastapi import FastAPI, HTTPException
from llm_service_claude import ClaudeServiceCreator
from pydantic import BaseModel

app = FastAPI()
service = ClaudeServiceCreator()

class MessageRequest(BaseModel):
    conversation_id: str
    message: str
    step: int

@app.post("/api/conversation/start")
async def start_conversation():
    response = await service.start_conversation()
    return response

@app.post("/api/conversation/message")
async def send_message(request: MessageRequest):
    response = await service.send_message(
        request.message,
        request.step
    )
    return response

@app.post("/api/generate")
async def generate_code(requirements: dict):
    generated_files = await service.generate_complete_service(requirements)
    return {"files": generated_files}

# Run: uvicorn app.main:app --reload
```

## Step 6: Connect Frontend to Backend

Update your `service-creator.html` to call real API instead of simulation:

```javascript
// Replace simulated conversation with real API calls
async function askQuestion(stepIndex) {
    // Call real backend
    const response = await fetch('http://localhost:8000/api/conversation/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            conversation_id: conversationId,
            message: userAnswer,
            step: stepIndex
        })
    });

    const data = await response.json();
    addMessage(data.question, false);
    // ... handle response
}

async function generateCode() {
    const response = await fetch('http://localhost:8000/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(conversationData)
    });

    const data = await response.json();
    // Real generated code from Claude!
    console.log(data.files);
}
```

## Architecture with Claude

```
Frontend (HTML/JS)
    │
    ├─> POST /api/conversation/start
    ├─> POST /api/conversation/message
    └─> POST /api/generate
          │
          ▼
    FastAPI Backend
          │
          ▼
    Claude Sonnet API
    (Real AI Processing)
          │
          ▼
    Generated Code
```

## Cost Estimation

**Per Service Generation:**
- Conversation (7 Q&A): ~2,000 tokens × $0.003 = **$0.006**
- Backend Code: ~4,000 tokens × $0.015 = **$0.06**
- API Code: ~3,000 tokens × $0.015 = **$0.045**
- Database Schema: ~2,000 tokens × $0.015 = **$0.03**
- Tests: ~3,000 tokens × $0.015 = **$0.045**
- Docs: ~2,000 tokens × $0.015 = **$0.03**

**Total: ~$0.20 per complete service generation** 🎉

**Monthly estimates:**
- 100 generations: **$20/month**
- 500 generations: **$100/month**
- 1,000 generations: **$200/month**

Much cheaper than GPT-4! ($0.50-1.00 per generation)

## Production Deployment

### Docker Setup

```dockerfile
# Dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

```yaml
# docker-compose.yml
version: '3.8'

services:
  api:
    build: .
    ports:
      - "8000:8000"
    environment:
      - ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}
      - DATABASE_URL=postgresql://user:pass@db:5432/cloudcreator
    depends_on:
      - db
      - redis

  db:
    image: postgres:15
    environment:
      POSTGRES_DB: cloudcreator
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  postgres_data:
```

Run:
```bash
docker-compose up -d
```

## Monitoring & Logging

### Track API Usage

```python
import logging
from datetime import datetime

class ClaudeUsageTracker:
    def __init__(self):
        self.total_tokens = 0
        self.total_cost = 0

    def track_request(self, response):
        input_tokens = response.usage.input_tokens
        output_tokens = response.usage.output_tokens

        # Claude Sonnet pricing
        input_cost = (input_tokens / 1_000_000) * 3
        output_cost = (output_tokens / 1_000_000) * 15

        total_cost = input_cost + output_cost

        self.total_tokens += input_tokens + output_tokens
        self.total_cost += total_cost

        logging.info(f"""
        Claude API Call:
        - Input: {input_tokens} tokens
        - Output: {output_tokens} tokens
        - Cost: ${total_cost:.4f}
        - Total Today: ${self.total_cost:.2f}
        """)

# Add to ClaudeServiceCreator
tracker = ClaudeUsageTracker()
# After each API call:
tracker.track_request(response)
```

## Troubleshooting

### Issue: "Invalid API Key"
```bash
# Check API key is set
echo $ANTHROPIC_API_KEY

# Verify in code
import os
print(os.getenv("ANTHROPIC_API_KEY"))
```

### Issue: Rate Limits
Claude has rate limits:
- Free tier: 50 requests/day
- Paid tier: 1000 requests/minute

Add retry logic:
```python
from anthropic import RateLimitError
import time

try:
    response = self.client.messages.create(...)
except RateLimitError:
    time.sleep(60)  # Wait 1 minute
    response = self.client.messages.create(...)
```

### Issue: Slow Response
Claude Sonnet typically responds in 2-5 seconds. If slower:
- Check network connection
- Reduce max_tokens
- Use caching for repeated requests

## Next Steps

1. ✅ Test conversation flow
2. ✅ Test code generation
3. ✅ Connect frontend to backend
4. ✅ Deploy to production
5. 🎉 Start saving developers months of coding time!

## Support

- Anthropic Docs: https://docs.anthropic.com/
- Claude API Reference: https://docs.anthropic.com/en/api/
- Support: support@anthropic.com

---

**You're now ready to build real AI-powered cloud services!** 🚀
