#!/bin/bash

# API Gateway and Lambda Configuration Script
# Sets up complete API Gateway for CiscoAI Video API

set -e

API_ID="kwbm1mafkf"
ROOT_RESOURCE_ID="aot264v6u4"
REGION="ap-southeast-1"
LAMBDA_ARN="arn:aws:lambda:ap-southeast-1:264314137331:function:CiscoAI-Video-API"
ACCOUNT_ID="264314137331"

echo "🚀 Setting up API Gateway for CiscoAI Videos..."

# Create /videos resource
echo "📁 Creating /videos resource..."
VIDEOS_RESOURCE=$(aws apigateway create-resource \
    --rest-api-id $API_ID \
    --parent-id $ROOT_RESOURCE_ID \
    --path-part videos \
    --region $REGION)

VIDEOS_RESOURCE_ID=$(echo $VIDEOS_RESOURCE | jq -r '.id')
echo "✅ /videos resource created: $VIDEOS_RESOURCE_ID"

# Create GET /videos method
echo "🔧 Creating GET /videos..."
aws apigateway put-method \
    --rest-api-id $API_ID \
    --resource-id $VIDEOS_RESOURCE_ID \
    --http-method GET \
    --authorization-type NONE \
    --region $REGION

aws apigateway put-integration \
    --rest-api-id $API_ID \
    --resource-id $VIDEOS_RESOURCE_ID \
    --http-method GET \
    --type AWS_PROXY \
    --integration-http-method POST \
    --uri "arn:aws:apigateway:$REGION:lambda:path/2015-03-31/functions/$LAMBDA_ARN/invocations" \
    --region $REGION

# Create POST /videos method
echo "🔧 Creating POST /videos..."
aws apigateway put-method \
    --rest-api-id $API_ID \
    --resource-id $VIDEOS_RESOURCE_ID \
    --http-method POST \
    --authorization-type NONE \
    --region $REGION

aws apigateway put-integration \
    --rest-api-id $API_ID \
    --resource-id $VIDEOS_RESOURCE_ID \
    --http-method POST \
    --type AWS_PROXY \
    --integration-http-method POST \
    --uri "arn:aws:apigateway:$REGION:lambda:path/2015-03-31/functions/$LAMBDA_ARN/invocations" \
    --region $REGION

# Create OPTIONS for CORS
echo "🔧 Creating OPTIONS /videos (CORS)..."
aws apigateway put-method \
    --rest-api-id $API_ID \
    --resource-id $VIDEOS_RESOURCE_ID \
    --http-method OPTIONS \
    --authorization-type NONE \
    --region $REGION

aws apigateway put-integration \
    --rest-api-id $API_ID \
    --resource-id $VIDEOS_RESOURCE_ID \
    --http-method OPTIONS \
    --type AWS_PROXY \
    --integration-http-method POST \
    --uri "arn:aws:apigateway:$REGION:lambda:path/2015-03-31/functions/$LAMBDA_ARN/invocations" \
    --region $REGION

# Create /{id} resource under /videos
echo "📁 Creating /videos/{id} resource..."
VIDEO_ID_RESOURCE=$(aws apigateway create-resource \
    --rest-api-id $API_ID \
    --parent-id $VIDEOS_RESOURCE_ID \
    --path-part '{id}' \
    --region $REGION)

VIDEO_ID_RESOURCE_ID=$(echo $VIDEO_ID_RESOURCE | jq -r '.id')
echo "✅ /videos/{id} resource created: $VIDEO_ID_RESOURCE_ID"

# Create GET /videos/{id}
echo "🔧 Creating GET /videos/{id}..."
aws apigateway put-method \
    --rest-api-id $API_ID \
    --resource-id $VIDEO_ID_RESOURCE_ID \
    --http-method GET \
    --authorization-type NONE \
    --region $REGION

aws apigateway put-integration \
    --rest-api-id $API_ID \
    --resource-id $VIDEO_ID_RESOURCE_ID \
    --http-method GET \
    --type AWS_PROXY \
    --integration-http-method POST \
    --uri "arn:aws:apigateway:$REGION:lambda:path/2015-03-31/functions/$LAMBDA_ARN/invocations" \
    --region $REGION

# Create PUT /videos/{id}
echo "🔧 Creating PUT /videos/{id}..."
aws apigateway put-method \
    --rest-api-id $API_ID \
    --resource-id $VIDEO_ID_RESOURCE_ID \
    --http-method PUT \
    --authorization-type NONE \
    --region $REGION

aws apigateway put-integration \
    --rest-api-id $API_ID \
    --resource-id $VIDEO_ID_RESOURCE_ID \
    --http-method PUT \
    --type AWS_PROXY \
    --integration-http-method POST \
    --uri "arn:aws:apigateway:$REGION:lambda:path/2015-03-31/functions/$LAMBDA_ARN/invocations" \
    --region $REGION

# Create DELETE /videos/{id}
echo "🔧 Creating DELETE /videos/{id}..."
aws apigateway put-method \
    --rest-api-id $API_ID \
    --resource-id $VIDEO_ID_RESOURCE_ID \
    --http-method DELETE \
    --authorization-type NONE \
    --region $REGION

aws apigateway put-integration \
    --rest-api-id $API_ID \
    --resource-id $VIDEO_ID_RESOURCE_ID \
    --http-method DELETE \
    --type AWS_PROXY \
    --integration-http-method POST \
    --uri "arn:aws:apigateway:$REGION:lambda:path/2015-03-31/functions/$LAMBDA_ARN/invocations" \
    --region $REGION

# Deploy API
echo "🚀 Deploying API to production..."
aws apigateway create-deployment \
    --rest-api-id $API_ID \
    --stage-name prod \
    --region $REGION

echo ""
echo "✅ API Gateway Setup Complete!"
echo ""
echo "📋 API Endpoint:"
echo "https://$API_ID.execute-api.$REGION.amazonaws.com/prod/videos"
echo ""
echo "🧪 Test with:"
echo "curl https://$API_ID.execute-api.$REGION.amazonaws.com/prod/videos"
