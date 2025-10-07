# LLM Admin Panel - Setup Guide

## Quick Start

### 1. Access the Admin Panel

Navigate to: [http://localhost/llm-admin.html](http://localhost/llm-admin.html)

Or click the **🔑 Admin** link in the navigation menu.

### 2. Login

**Default Password:** `cisco@admin123`

⚠️ **Important:** Change this password in production!

### 3. Configure API Key

1. **Get Anthropic API Key:**
   - Go to [https://console.anthropic.com/](https://console.anthropic.com/)
   - Sign up / Log in
   - Navigate to **API Keys**
   - Create new key
   - Copy your API key (starts with `sk-ant-`)

2. **Enter API Key in Admin Panel:**
   - Select LLM Provider: **Anthropic Claude** (recommended)
   - Select Model: **Claude Sonnet 4** (latest)
   - Paste your API key
   - Click **💾 Save Configuration**

3. **Test Connection:**
   - Click **🧪 Test Connection**
   - Wait for success message
   - Verify response time and model info

## Security

### Change Admin Password

**Method 1: Via .env file (Recommended)**

Edit `backend/.env`:

```bash
# Change this password!
ADMIN_PASSWORD=your-new-secure-password-here
```

**Method 2: Via Environment Variable**

```bash
export ADMIN_PASSWORD="your-new-secure-password"
```

Then restart the backend:

```bash
cd backend
python config_api.py
```

### Password Requirements (Production)

- Minimum 12 characters
- Mix of uppercase, lowercase, numbers, special characters
- Never use default password in production
- Store securely (use environment variables, not hardcoded)

## Backend Setup

### Start the Config API Server

```bash
cd backend

# Create virtual environment (first time only)
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies (first time only)
pip install -r requirements.txt

# Start the server
python config_api.py
```

Server will start at: [http://localhost:8000](http://localhost:8000)

### Without Backend (Browser-Only Mode)

If you don't start the backend server, the admin panel will:
- Store API key in browser's localStorage
- Use client-side password check
- Function normally, but without backend persistence

**Note:** Browser-only mode is fine for testing, but use backend for production.

## Features

### 🔑 API Key Management
- Securely store Anthropic API keys
- Support for multiple LLM providers (Claude, GPT-4, Together AI)
- Model selection (Claude Sonnet 4, Claude 3.5, GPT-4 Turbo)
- Custom system prompts

### 🧪 Connection Testing
- Test API connectivity
- Measure response time
- Verify token usage
- Real-time feedback

### 📊 Usage Statistics (Coming Soon)
- Total API calls
- Estimated costs
- Average response time
- Services generated

### 🛡️ Security Features
- Password-protected access
- Session-based authentication
- API key masking in UI
- Secure .env file storage
- Never commits secrets to git (.gitignore)

## API Endpoints

### Login
```bash
POST /api/auth/login
{
  "password": "cisco@admin123"
}
```

### Get Configuration
```bash
GET /api/config
```

### Save Configuration
```bash
POST /api/config
{
  "api_key": "sk-ant-...",
  "model": "claude-sonnet-4-20250514",
  "provider": "anthropic",
  "system_prompt": "optional custom prompt"
}
```

### Test Connection
```bash
POST /api/test-connection
{
  "api_key": "sk-ant-..."
}
```

## Troubleshooting

### "Backend not available" Error

**Solution 1:** Start the backend server
```bash
cd backend
python config_api.py
```

**Solution 2:** Use browser-only mode
- Admin panel will still work
- API key saved to localStorage
- No backend needed for testing

### "Invalid Password" Error

**Check current password:**
```bash
cat backend/.env | grep ADMIN_PASSWORD
```

**Reset to default:**
```bash
echo "ADMIN_PASSWORD=cisco@admin123" >> backend/.env
```

### "Invalid API Key" Error

**Verify API key format:**
- Should start with `sk-ant-`
- No extra spaces or quotes
- Check at: https://console.anthropic.com/

**Test manually:**
```bash
curl https://api.anthropic.com/v1/messages \
  -H "x-api-key: YOUR_API_KEY" \
  -H "content-type: application/json" \
  -d '{"model":"claude-sonnet-4-20250514","max_tokens":100,"messages":[{"role":"user","content":"test"}]}'
```

### CORS Errors in Browser Console

**Fix:** Ensure backend is running with CORS enabled (already configured in `config_api.py`)

## Cost Estimation

### Claude Sonnet 4 Pricing

- **Input:** $3 per 1M tokens
- **Output:** $15 per 1M tokens

### Per Service Generation Estimate

- **Conversation (7 Q&A):** ~2,000 tokens × $0.003 = **$0.006**
- **Backend Code:** ~4,000 tokens × $0.015 = **$0.06**
- **API Code:** ~3,000 tokens × $0.015 = **$0.045**
- **Database Schema:** ~2,000 tokens × $0.015 = **$0.03**
- **Tests:** ~3,000 tokens × $0.015 = **$0.045**
- **Docs:** ~2,000 tokens × $0.015 = **$0.03**

**Total: ~$0.20 per complete service generation** 🎉

### Monthly Estimates

- **100 services:** $20/month
- **500 services:** $100/month
- **1,000 services:** $200/month

**Much cheaper than GPT-4!** ($0.50-1.00 per service)

## Production Deployment

### Environment Variables

```bash
# .env file
ANTHROPIC_API_KEY=sk-ant-your-real-key-here
ADMIN_PASSWORD=your-secure-password-here
MODEL_NAME=claude-sonnet-4-20250514
API_PROVIDER=anthropic
```

### Docker Deployment

```bash
# Start with Docker Compose
docker-compose up -d
```

### Kubernetes Deployment

```bash
# Create secret
kubectl create secret generic llm-config \
  --from-literal=anthropic-api-key=sk-ant-... \
  --from-literal=admin-password=...

# Deploy
kubectl apply -f kubernetes/deployment.yaml
```

## Support

- **Anthropic Docs:** https://docs.anthropic.com/
- **Claude API Reference:** https://docs.anthropic.com/en/api/
- **Support:** support@anthropic.com

---

**You're now ready to use the LLM Admin Panel!** 🚀

Access it at: [http://localhost/llm-admin.html](http://localhost/llm-admin.html)
