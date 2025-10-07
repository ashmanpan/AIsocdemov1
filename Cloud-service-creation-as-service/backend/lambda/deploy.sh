#!/bin/bash

# AWS Lambda Deployment Script for Cloud Service Creator
# This script deploys the Lambda function and creates API Gateway

set -e

echo "🚀 Deploying Cloud Service Creator to AWS Lambda..."

# Configuration
FUNCTION_NAME="CloudServiceCreator-API"
REGION="ap-south-1"  # Your AWS region
RUNTIME="python3.12"
HANDLER="conversation_handler.lambda_handler"
ROLE_NAME="CloudServiceCreatorLambdaRole"
API_NAME="CloudServiceCreatorAPI"

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Step 1: Creating DynamoDB Table and S3 Bucket...${NC}"
python3 ../dynamodb_service.py

echo -e "${BLUE}Step 2: Creating IAM Role for Lambda...${NC}"

# Check if role exists
if ! aws iam get-role --role-name $ROLE_NAME 2>/dev/null; then
    echo "Creating IAM role..."

    # Create trust policy
    cat > /tmp/trust-policy.json <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF

    # Create role
    aws iam create-role \
        --role-name $ROLE_NAME \
        --assume-role-policy-document file:///tmp/trust-policy.json \
        --region $REGION

    # Attach policies
    aws iam attach-role-policy \
        --role-name $ROLE_NAME \
        --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole

    aws iam attach-role-policy \
        --role-name $ROLE_NAME \
        --policy-arn arn:aws:iam::aws:policy/AmazonDynamoDBFullAccess

    aws iam attach-role-policy \
        --role-name $ROLE_NAME \
        --policy-arn arn:aws:iam::aws:policy/AmazonS3FullAccess

    echo "Waiting for role to be ready..."
    sleep 10
else
    echo "IAM role already exists"
fi

# Get role ARN
ROLE_ARN=$(aws iam get-role --role-name $ROLE_NAME --query 'Role.Arn' --output text)
echo "Role ARN: $ROLE_ARN"

echo -e "${BLUE}Step 3: Creating Lambda Layer for Dependencies...${NC}"

# Create layer directory
mkdir -p layer/python
pip3 install -r requirements.txt -t layer/python/ --quiet

# Package layer
cd layer
zip -r ../anthropic-layer.zip python > /dev/null
cd ..

# Upload layer
LAYER_VERSION=$(aws lambda publish-layer-version \
    --layer-name anthropic-sdk \
    --description "Anthropic Claude SDK" \
    --zip-file fileb://anthropic-layer.zip \
    --compatible-runtimes python3.12 python3.11 \
    --region $REGION \
    --query 'Version' \
    --output text)

echo "Layer version created: $LAYER_VERSION"
LAYER_ARN="arn:aws:lambda:${REGION}:$(aws sts get-caller-identity --query Account --output text):layer:anthropic-sdk:${LAYER_VERSION}"

echo -e "${BLUE}Step 4: Packaging Lambda Function...${NC}"

# Package Lambda function
zip -j function.zip conversation_handler.py

echo -e "${BLUE}Step 5: Creating/Updating Lambda Function...${NC}"

# Check if function exists
if aws lambda get-function --function-name $FUNCTION_NAME --region $REGION 2>/dev/null; then
    echo "Updating existing function..."

    aws lambda update-function-code \
        --function-name $FUNCTION_NAME \
        --zip-file fileb://function.zip \
        --region $REGION

    aws lambda update-function-configuration \
        --function-name $FUNCTION_NAME \
        --timeout 60 \
        --memory-size 512 \
        --environment Variables={ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY},DYNAMODB_TABLE=CloudServiceCreator,S3_BUCKET=cloudservicecreator-code} \
        --region $REGION
else
    echo "Creating new function..."

    aws lambda create-function \
        --function-name $FUNCTION_NAME \
        --runtime $RUNTIME \
        --role $ROLE_ARN \
        --handler $HANDLER \
        --zip-file fileb://function.zip \
        --timeout 60 \
        --memory-size 512 \
        --layers $LAYER_ARN \
        --environment Variables={ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY},DYNAMODB_TABLE=CloudServiceCreator,S3_BUCKET=cloudservicecreator-code} \
        --region $REGION
fi

echo -e "${BLUE}Step 6: Creating API Gateway...${NC}"

# Create REST API
API_ID=$(aws apigateway create-rest-api \
    --name $API_NAME \
    --description "Cloud Service Creator API" \
    --region $REGION \
    --query 'id' \
    --output text 2>/dev/null || \
    aws apigateway get-rest-apis \
    --query "items[?name=='$API_NAME'].id" \
    --output text \
    --region $REGION)

echo "API ID: $API_ID"

# Get root resource
ROOT_ID=$(aws apigateway get-resources \
    --rest-api-id $API_ID \
    --region $REGION \
    --query 'items[?path==`/`].id' \
    --output text)

# Create /conversation resource
RESOURCE_ID=$(aws apigateway create-resource \
    --rest-api-id $API_ID \
    --parent-id $ROOT_ID \
    --path-part conversation \
    --region $REGION \
    --query 'id' \
    --output text 2>/dev/null || \
    aws apigateway get-resources \
    --rest-api-id $API_ID \
    --region $REGION \
    --query "items[?path=='/conversation'].id" \
    --output text)

# Create POST method
aws apigateway put-method \
    --rest-api-id $API_ID \
    --resource-id $RESOURCE_ID \
    --http-method POST \
    --authorization-type NONE \
    --region $REGION 2>/dev/null || echo "Method already exists"

# Set integration
LAMBDA_ARN="arn:aws:lambda:${REGION}:$(aws sts get-caller-identity --query Account --output text):function:${FUNCTION_NAME}"

aws apigateway put-integration \
    --rest-api-id $API_ID \
    --resource-id $RESOURCE_ID \
    --http-method POST \
    --type AWS_PROXY \
    --integration-http-method POST \
    --uri "arn:aws:apigateway:${REGION}:lambda:path/2015-03-31/functions/${LAMBDA_ARN}/invocations" \
    --region $REGION 2>/dev/null || echo "Integration already exists"

# Add Lambda permission for API Gateway
aws lambda add-permission \
    --function-name $FUNCTION_NAME \
    --statement-id apigateway-invoke \
    --action lambda:InvokeFunction \
    --principal apigateway.amazonaws.com \
    --source-arn "arn:aws:execute-api:${REGION}:$(aws sts get-caller-identity --query Account --output text):${API_ID}/*" \
    --region $REGION 2>/dev/null || echo "Permission already exists"

# Enable CORS
aws apigateway put-method \
    --rest-api-id $API_ID \
    --resource-id $RESOURCE_ID \
    --http-method OPTIONS \
    --authorization-type NONE \
    --region $REGION 2>/dev/null || echo "OPTIONS method already exists"

# Deploy API
aws apigateway create-deployment \
    --rest-api-id $API_ID \
    --stage-name prod \
    --region $REGION

# Get API endpoint
API_ENDPOINT="https://${API_ID}.execute-api.${REGION}.amazonaws.com/prod/conversation"

echo ""
echo -e "${GREEN}✅ Deployment Complete!${NC}"
echo ""
echo "API Endpoint: $API_ENDPOINT"
echo ""
echo "Test with:"
echo "curl -X POST $API_ENDPOINT \\"
echo "  -H 'Content-Type: application/json' \\"
echo "  -d '{\"action\": \"start\"}'"
echo ""
echo "Update your frontend service-creator.html with this API endpoint!"

# Cleanup
rm -rf layer
rm -f function.zip anthropic-layer.zip
rm -f /tmp/trust-policy.json

echo ""
echo "🎉 All done! Your Cloud Service Creator is now live on AWS Lambda!"
