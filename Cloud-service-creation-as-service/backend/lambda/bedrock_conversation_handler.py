"""
AWS Lambda Function: Bedrock Claude Conversation Handler
Uses AWS Bedrock with Claude Sonnet 4.5 for firewall management chat
"""

import json
import boto3
from datetime import datetime

# Bedrock client
bedrock_runtime = boto3.client('bedrock-runtime', region_name='ap-south-1')

# Anthropic Claude Sonnet 4.5 (Global inference profile)
BEDROCK_MODEL_ID = 'global.anthropic.claude-sonnet-4-5-20250929-v1:0'


def lambda_handler(event, context):
    """
    Main Lambda handler for Bedrock-powered conversation
    """
    # CORS headers (defined first to be available in error handler)
    headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
    }

    try:
        # Handle OPTIONS for CORS
        if event.get('httpMethod') == 'OPTIONS':
            return {
                'statusCode': 200,
                'headers': headers,
                'body': ''
            }

        # Parse request (handle None body)
        body_str = event.get('body') or '{}'
        body = json.loads(body_str)

        # Extract message and conversation history
        message = body.get('message', '')
        conversation_history = body.get('conversationHistory', [])

        if not message:
            raise ValueError("Message is required")

        # Call Bedrock for chat response
        result = bedrock_firewall_chat(message, conversation_history)

        return {
            'statusCode': 200,
            'headers': headers,
            'body': json.dumps(result)
        }

    except Exception as e:
        print(f"Error: {str(e)}")
        import traceback
        traceback.print_exc()
        return {
            'statusCode': 500,
            'headers': headers,
            'body': json.dumps({'error': str(e)})
        }


def bedrock_firewall_chat(message, conversation_history):
    """
    Handle firewall management chat using AWS Bedrock with Claude Sonnet 4.5
    """
    # System prompt for firewall expertise
    system_prompt = """You are an AI assistant specialized in Cisco firewall management, network security, and FTD/FMC systems.

You help network engineers and security analysts with:
- Troubleshooting firewall issues (CPU spikes, packet loss, performance)
- Analyzing traffic patterns and anomalies
- Interface validation and discrepancy resolution
- Security policy recommendations
- Root cause analysis for network incidents
- FMC/FTD configuration best practices

Provide clear, actionable technical guidance. When analyzing issues, use a structured approach:
1. Understand the problem
2. Gather relevant data points
3. Correlate information
4. Identify root cause
5. Provide remediation steps

Be concise but thorough. Use technical terminology appropriately."""

    # Prepare messages for Bedrock (Anthropic format)
    messages = conversation_history + [{"role": "user", "content": message}]

    # Bedrock request body (Anthropic Messages API format)
    request_body = {
        "anthropic_version": "bedrock-2023-05-31",
        "max_tokens": 4096,
        "system": system_prompt,
        "messages": messages
    }

    # Call Bedrock
    try:
        response = bedrock_runtime.invoke_model(
            modelId=BEDROCK_MODEL_ID,
            contentType='application/json',
            accept='application/json',
            body=json.dumps(request_body)
        )

        # Parse response
        response_body = json.loads(response['body'].read())
        ai_response = response_body['content'][0]['text']

        # Return response with updated conversation history
        return {
            'response': ai_response,
            'conversationHistory': messages + [{"role": "assistant", "content": ai_response}],
            'model': BEDROCK_MODEL_ID
        }

    except Exception as e:
        print(f"Bedrock Error: {str(e)}")
        raise ValueError(f"Failed to get chat response from Bedrock: {str(e)}")
