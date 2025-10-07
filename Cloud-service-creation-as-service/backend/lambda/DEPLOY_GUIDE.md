# AWS Lambda Deployment Guide

## Quick Deploy (One Command)

**Set your Anthropic API key and run:**

```bash
cd /home/kpanse/wsl-myprojects/Agentic-AI-demos/Cloud-service-creation-as-service/backend/lambda

export ANTHROPIC_API_KEY="your-anthropic-key-here"

./deploy.sh
```

## What This Does

1. ✅ Creates DynamoDB tables:
   - CloudServiceCreator-Services
   - CloudServiceCreator-Conversations
   - CloudServiceCreator-GeneratedCode

2. ✅ Creates IAM role with permissions for Lambda

3. ✅ Creates Lambda Layer with Anthropic SDK

4. ✅ Deploys Lambda function with Claude integration

5. ✅ Creates API Gateway endpoint

6. ✅ Configures CORS for frontend access

## After Deployment

You'll get an API endpoint like:
```
https://abc123.execute-api.ap-south-1.amazonaws.com/prod/conversation
```

## Update Frontend

Copy the API endpoint to your `service-creator.html`:

```javascript
const API_ENDPOINT = 'https://YOUR-API-ID.execute-api.ap-south-1.amazonaws.com/prod/conversation';
```

## Test Your API

```bash
# Start a conversation
curl -X POST https://YOUR-API-ID.execute-api.ap-south-1.amazonaws.com/prod/conversation \
  -H 'Content-Type: application/json' \
  -d '{"action": "start"}'

# Send a message
curl -X POST https://YOUR-API-ID.execute-api.ap-south-1.amazonaws.com/prod/conversation \
  -H 'Content-Type: application/json' \
  -d '{
    "action": "message",
    "conversation_id": "your-conversation-id",
    "message": "vFirewall",
    "step": 1
  }'

# Generate code
curl -X POST https://YOUR-API-ID.execute-api.ap-south-1.amazonaws.com/prod/conversation \
  -H 'Content-Type: application/json' \
  -d '{
    "action": "generate",
    "conversation_id": "your-conversation-id",
    "service_data": {
      "service_type": "vFirewall",
      "vendor": "Cisco",
      "features": ["Traffic Filtering", "Threat Detection"]
    }
  }'
```

## Cost Estimate

- **Lambda**: Free tier: 1M requests/month, then $0.20 per 1M requests
- **DynamoDB**: Free tier: 25GB storage, then minimal costs
- **API Gateway**: Free tier: 1M requests/month, then $1 per 1M requests
- **Anthropic API**: ~$0.20 per service generation

**Total: ~$20-50/month for 1000 service generations**

## Troubleshooting

### Issue: Permission Denied
```bash
chmod +x deploy.sh
```

### Issue: API Key Not Set
```bash
export ANTHROPIC_API_KEY="sk-ant-your-key-here"
./deploy.sh
```

### Issue: Region Error
Edit `deploy.sh` and change:
```bash
REGION="ap-south-1"  # Change to your region
```

### Issue: Lambda Timeout
Increase timeout in deploy.sh:
```bash
--timeout 60  # Change to 120 for complex code generation
```

## View Logs

```bash
aws logs tail /aws/lambda/CloudServiceCreator-API --follow --region ap-south-1
```

## Update Lambda Function

After making changes to `conversation_handler.py`:

```bash
cd /home/kpanse/wsl-myprojects/Agentic-AI-demos/Cloud-service-creation-as-service/backend/lambda

# Package and update
zip -j function.zip conversation_handler.py

aws lambda update-function-code \
  --function-name CloudServiceCreator-API \
  --zip-file fileb://function.zip \
  --region ap-south-1
```

## Delete Everything (Cleanup)

```bash
# Delete Lambda
aws lambda delete-function --function-name CloudServiceCreator-API --region ap-south-1

# Delete API Gateway
API_ID=$(aws apigateway get-rest-apis --query "items[?name=='CloudServiceCreatorAPI'].id" --output text --region ap-south-1)
aws apigateway delete-rest-api --rest-api-id $API_ID --region ap-south-1

# Delete DynamoDB tables
aws dynamodb delete-table --table-name CloudServiceCreator-Services --region ap-south-1
aws dynamodb delete-table --table-name CloudServiceCreator-Conversations --region ap-south-1
aws dynamodb delete-table --table-name CloudServiceCreator-GeneratedCode --region ap-south-1

# Delete IAM role
aws iam detach-role-policy --role-name CloudServiceCreatorLambdaRole --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole
aws iam detach-role-policy --role-name CloudServiceCreatorLambdaRole --policy-arn arn:aws:iam::aws:policy/AmazonDynamoDBFullAccess
aws iam delete-role --role-name CloudServiceCreatorLambdaRole
```

## Architecture

```
User Browser (Amplify)
    ↓
API Gateway (HTTPS endpoint)
    ↓
Lambda Function (Python)
    ↓ ↓ ↓
    |  |  └─→ DynamoDB (Storage)
    |  └────→ Claude API (Code Generation)
    └───────→ Response to User
```

## Security Notes

- ✅ API key stored securely in Lambda environment variables
- ✅ Never exposed to browser/frontend
- ✅ IAM roles with minimal permissions
- ✅ CORS configured for your Amplify domain only
- ✅ HTTPS only (enforced by API Gateway)

## Next Steps

1. Deploy: `./deploy.sh`
2. Get API endpoint from output
3. Update `service-creator.html` with endpoint
4. Test in browser
5. Monitor in CloudWatch Logs

---

**Ready to deploy? Run: `export ANTHROPIC_API_KEY="your-key" && ./deploy.sh`**
