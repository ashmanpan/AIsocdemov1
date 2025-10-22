#!/bin/bash

# Test Complete Flow - Cloud Service Creator
API_ENDPOINT="https://bhq3kn2ms0.execute-api.ap-south-1.amazonaws.com/prod/conversation"

echo "🧪 Testing Complete Cloud Service Creator Flow"
echo "================================================"
echo ""

# Step 1: Start conversation
echo "📋 Step 1: Starting conversation..."
RESPONSE=$(curl -s -X POST $API_ENDPOINT \
  -H 'Content-Type: application/json' \
  -d '{"action": "start"}')

CONVERSATION_ID=$(echo $RESPONSE | grep -o '"conversation_id":"[^"]*"' | cut -d'"' -f4)
echo "✅ Conversation started: $CONVERSATION_ID"
echo "   Question: $(echo $RESPONSE | grep -o '"question":"[^"]*"' | cut -d'"' -f4)"
echo ""

# Step 2: Answer question 1 - Service Type
echo "📋 Step 2: Selecting vFirewall..."
RESPONSE=$(curl -s -X POST $API_ENDPOINT \
  -H 'Content-Type: application/json' \
  -d "{\"action\": \"message\", \"conversation_id\": \"$CONVERSATION_ID\", \"message\": \"vFirewall\", \"step\": 1}")
echo "✅ $(echo $RESPONSE | grep -o '"question":"[^"]*"' | cut -d'"' -f4)"
echo ""

# Step 3: Answer question 2 - Vendor
echo "📋 Step 3: Selecting Cisco..."
RESPONSE=$(curl -s -X POST $API_ENDPOINT \
  -H 'Content-Type: application/json' \
  -d "{\"action\": \"message\", \"conversation_id\": \"$CONVERSATION_ID\", \"message\": \"Cisco (ASA, FTD, CSR1000v)\", \"step\": 2}")
echo "✅ $(echo $RESPONSE | grep -o '"question":"[^"]*"' | cut -d'"' -f4)"
echo ""

# Step 4: Answer question 3 - Deployment
echo "📋 Step 4: Selecting Public Cloud..."
RESPONSE=$(curl -s -X POST $API_ENDPOINT \
  -H 'Content-Type: application/json' \
  -d "{\"action\": \"message\", \"conversation_id\": \"$CONVERSATION_ID\", \"message\": \"Public Cloud (AWS/Azure/GCP)\", \"step\": 3}")
echo "✅ $(echo $RESPONSE | grep -o '"question":"[^"]*"' | cut -d'"' -f4 | head -1)"
echo ""

# Step 5: Answer question 4 - Features (multi-select)
echo "📋 Step 5: Selecting features..."
RESPONSE=$(curl -s -X POST $API_ENDPOINT \
  -H 'Content-Type: application/json' \
  -d "{\"action\": \"message\", \"conversation_id\": \"$CONVERSATION_ID\", \"message\": [\"Traffic Filtering\", \"Threat Detection\", \"VPN Support\"], \"step\": 4}")
echo "✅ $(echo $RESPONSE | grep -o '"question":"[^"]*"' | cut -d'"' -f4 | head -1)"
echo ""

# Step 6: Answer question 5 - SLA
echo "📋 Step 6: Selecting SLA..."
RESPONSE=$(curl -s -X POST $API_ENDPOINT \
  -H 'Content-Type: application/json' \
  -d "{\"action\": \"message\", \"conversation_id\": \"$CONVERSATION_ID\", \"message\": \"99.9% (Standard)\", \"step\": 5}")
echo "✅ $(echo $RESPONSE | grep -o '"question":"[^"]*"' | cut -d'"' -f4 | head -1)"
echo ""

# Step 7: Answer question 6 - Scalability
echo "📋 Step 7: Selecting scalability..."
RESPONSE=$(curl -s -X POST $API_ENDPOINT \
  -H 'Content-Type: application/json' \
  -d "{\"action\": \"message\", \"conversation_id\": \"$CONVERSATION_ID\", \"message\": \"Medium (10-100 instances)\", \"step\": 6}")
echo "✅ $(echo $RESPONSE | grep -o '"question":"[^"]*"' | cut -d'"' -f4 | head -1)"
echo ""

# Step 8: Answer question 7 - Integration
echo "📋 Step 8: Selecting integration..."
RESPONSE=$(curl -s -X POST $API_ENDPOINT \
  -H 'Content-Type: application/json' \
  -d "{\"action\": \"message\", \"conversation_id\": \"$CONVERSATION_ID\", \"message\": \"All of the above\", \"step\": 7}")

if echo $RESPONSE | grep -q '"status":"completed"'; then
  echo "✅ All questions answered!"
  echo ""

  # Step 9: Generate code
  echo "📋 Step 9: Generating code with Claude AI..."
  echo "⏳ This will take 30-60 seconds..."

  RESPONSE=$(curl -s -X POST $API_ENDPOINT \
    -H 'Content-Type: application/json' \
    -d "{\"action\": \"generate\", \"conversation_id\": \"$CONVERSATION_ID\", \"service_data\": {\"service_type\": \"vFirewall\", \"vendor\": \"Cisco\", \"deployment_model\": \"Public Cloud\", \"features\": [\"Traffic Filtering\", \"Threat Detection\", \"VPN Support\"], \"sla\": \"99.9%\", \"scalability\": \"Medium\", \"integration\": \"All\"}}")

  if echo $RESPONSE | grep -q '"code_id"'; then
    CODE_ID=$(echo $RESPONSE | grep -o '"code_id":"[^"]*"' | cut -d'"' -f4)
    FILE_COUNT=$(echo $RESPONSE | grep -o '"file_count":[0-9]*' | cut -d':' -f2)

    echo ""
    echo "✅ CODE GENERATION SUCCESSFUL!"
    echo "   Code ID: $CODE_ID"
    echo "   Files generated: $FILE_COUNT"
    echo "   Stored in S3: cloudservicecreator-code"
    echo ""
    echo "🎉 ALL TESTS PASSED!"
  else
    echo ""
    echo "❌ Code generation failed"
    echo "Response: $RESPONSE"
  fi
else
  echo "❌ Conversation not completed"
  echo "Response: $RESPONSE"
fi

echo ""
echo "================================================"
