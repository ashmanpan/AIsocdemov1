"""
AWS Lambda Function: Claude Conversation Handler
Handles conversational AI interactions with Claude for service creation
"""

import json
import os
import boto3
from datetime import datetime
import uuid

# Use urllib for HTTP requests (built-in, no dependencies needed)
from urllib import request as urllib_request
from urllib.error import HTTPError

# DynamoDB and S3 clients
dynamodb = boto3.resource('dynamodb')
s3_client = boto3.client('s3')
table = dynamodb.Table(os.environ.get('DYNAMODB_TABLE', 'CloudServiceCreator'))
s3_bucket = os.environ.get('S3_BUCKET', 'cloudservicecreator-code')

# Claude client
ANTHROPIC_API_KEY = os.environ.get('ANTHROPIC_API_KEY')

# Conversation questions flow
QUESTIONS = [
    {
        "step": 1,
        "question": "What type of cloud service would you like to create?",
        "field": "service_type",
        "options": ["vFirewall", "vRouter", "vLoad Balancer", "vVPN", "vIDS/IPS", "SD-WAN", "Custom Service"]
    },
    {
        "step": 2,
        "question": "Which vendor or technology would you prefer?",
        "field": "vendor",
        "options": ["Cisco (ASA, FTD, CSR1000v)", "Palo Alto Networks", "Fortinet", "Check Point", "Open Source", "Multi-vendor"]
    },
    {
        "step": 3,
        "question": "What deployment model do you need?",
        "field": "deployment_model",
        "options": ["Public Cloud (AWS/Azure/GCP)", "Private Cloud", "Hybrid Cloud", "Multi-Cloud", "On-Premises"]
    },
    {
        "step": 4,
        "question": "Which features should the service support? (Select multiple)",
        "field": "features",
        "multi_select": True,
        "options": [
            "Traffic Filtering",
            "Threat Detection",
            "VPN Support",
            "Load Balancing",
            "High Availability",
            "Auto-Scaling",
            "Monitoring & Logging",
            "API Management",
            "User Portal",
            "Billing Integration"
        ]
    },
    {
        "step": 5,
        "question": "What SLA requirements do you have?",
        "field": "sla",
        "options": ["99.9% (Standard)", "99.95% (High)", "99.99% (Mission Critical)", "Custom SLA"]
    },
    {
        "step": 6,
        "question": "What scalability do you need?",
        "field": "scalability",
        "options": ["Small (1-10 instances)", "Medium (10-100 instances)", "Large (100-1000 instances)", "Enterprise (1000+ instances)"]
    },
    {
        "step": 7,
        "question": "What systems should it integrate with?",
        "field": "integration",
        "options": ["Cloud Management Portal", "ITSM (ServiceNow)", "Billing System", "Monitoring (Prometheus/Grafana)", "SIEM", "All of the above"]
    }
]


def lambda_handler(event, context):
    """
    Main Lambda handler for conversation management
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
        action = body.get('action', 'start')

        # Route to appropriate handler
        if action == 'start':
            result = start_conversation(body)
        elif action == 'message':
            result = handle_message(body)
        elif action == 'generate':
            result = generate_code(body)
        elif action == 'firewall_chat':
            result = firewall_chat(body)
        elif action == 'test':
            # Import testing agents
            from testing_agents import OrchestratorAgent
            test_type = body.get('test_type', 'full_cycle')
            service_id = body.get('service_id', 'all')
            orchestrator = OrchestratorAgent()
            results = orchestrator.orchestrate_tests(test_type, service_id)
            result = {'action': 'test', 'results': results}
        else:
            return {
                'statusCode': 400,
                'headers': headers,
                'body': json.dumps({'error': 'Invalid action'})
            }

        return {
            'statusCode': 200,
            'headers': headers,
            'body': json.dumps(result)
        }

    except Exception as e:
        print(f"Error: {str(e)}")
        return {
            'statusCode': 500,
            'headers': headers,
            'body': json.dumps({'error': str(e)})
        }


def start_conversation(body):
    """Start a new conversation"""
    conversation_id = str(uuid.uuid4())

    # Save to DynamoDB
    table.put_item(
        Item={
            'pk': f'CONVERSATION#{conversation_id}',
            'sk': 'DATA',
            'conversation_id': conversation_id,
            'created_at': datetime.utcnow().isoformat(),
            'user_email': 'anonymous',
            'status': 'active',
            'current_step': 1,
            'messages': json.dumps([]),
            'data': json.dumps({})
        }
    )

    # Return first question
    return {
        'conversation_id': conversation_id,
        'step': 1,
        'question': QUESTIONS[0]['question'],
        'options': QUESTIONS[0]['options'],
        'field': QUESTIONS[0]['field'],
        'multi_select': QUESTIONS[0].get('multi_select', False)
    }


def handle_message(body):
    """Handle a message in the conversation"""
    conversation_id = body.get('conversation_id')
    message = body.get('message')
    current_step = body.get('step', 1)

    if not conversation_id:
        raise ValueError("conversation_id is required")

    # Get conversation from DynamoDB
    response = table.get_item(Key={
        'pk': f'CONVERSATION#{conversation_id}',
        'sk': 'DATA'
    })
    conversation = response.get('Item')

    if not conversation:
        raise ValueError("Conversation not found")

    # Parse existing data
    conversation_data = json.loads(conversation.get('data', '{}'))
    messages = json.loads(conversation.get('messages', '[]'))

    # Save user response
    current_question = QUESTIONS[current_step - 1]
    conversation_data[current_question['field']] = message
    messages.append({
        'role': 'user',
        'content': message,
        'step': current_step
    })

    # Move to next step
    next_step = current_step + 1

    if next_step > len(QUESTIONS):
        # Conversation complete
        table.update_item(
            Key={
                'pk': f'CONVERSATION#{conversation_id}',
                'sk': 'DATA'
            },
            UpdateExpression='SET #status = :status, #data = :data, messages = :messages',
            ExpressionAttributeNames={
                '#status': 'status',
                '#data': 'data'
            },
            ExpressionAttributeValues={
                ':status': 'completed',
                ':data': json.dumps(conversation_data),
                ':messages': json.dumps(messages)
            }
        )

        return {
            'conversation_id': conversation_id,
            'status': 'completed',
            'message': 'All questions answered! Ready to generate code.',
            'data': conversation_data
        }

    # Update DynamoDB
    table.update_item(
        Key={
            'pk': f'CONVERSATION#{conversation_id}',
            'sk': 'DATA'
        },
        UpdateExpression='SET current_step = :step, #data = :data, messages = :messages',
        ExpressionAttributeNames={'#data': 'data'},
        ExpressionAttributeValues={
            ':step': next_step,
            ':data': json.dumps(conversation_data),
            ':messages': json.dumps(messages)
        }
    )

    # Return next question
    next_question = QUESTIONS[next_step - 1]
    return {
        'conversation_id': conversation_id,
        'step': next_step,
        'question': next_question['question'],
        'options': next_question['options'],
        'field': next_question['field'],
        'multi_select': next_question.get('multi_select', False)
    }


def generate_code(body):
    """Generate code using Claude AI via direct HTTP API"""
    conversation_id = body.get('conversation_id')
    service_data = body.get('service_data', {})

    if not ANTHROPIC_API_KEY:
        raise ValueError("ANTHROPIC_API_KEY not configured")

    # Build prompt for code generation
    prompt = build_code_generation_prompt(service_data)

    # Call Claude API directly via HTTP
    api_url = 'https://api.anthropic.com/v1/messages'

    request_data = {
        "model": "claude-sonnet-4-20250514",
        "max_tokens": 8000,
        "messages": [{
            "role": "user",
            "content": prompt
        }]
    }

    req = urllib_request.Request(
        api_url,
        data=json.dumps(request_data).encode('utf-8'),
        headers={
            'Content-Type': 'application/json',
            'anthropic-version': '2023-06-01',
            'x-api-key': ANTHROPIC_API_KEY
        }
    )

    try:
        with urllib_request.urlopen(req) as response:
            response_data = json.loads(response.read().decode('utf-8'))
            generated_content = response_data['content'][0]['text']
    except HTTPError as e:
        error_body = e.read().decode('utf-8')
        print(f"Claude API Error: {e.code} - {error_body}")
        raise ValueError(f"Failed to generate code: {error_body}")

    # Parse code files (assuming Claude returns structured format)
    code_files = parse_generated_code(generated_content)

    # Generate service_id if not present
    service_id = service_data.get('service_id', str(uuid.uuid4()))
    code_id = str(uuid.uuid4())
    timestamp = datetime.utcnow().isoformat()

    # Upload code files to S3
    s3_keys = {}
    for filename, code_content in code_files.items():
        s3_key = f'{service_id}/{code_id}/{filename}'
        s3_client.put_object(
            Bucket=s3_bucket,
            Key=s3_key,
            Body=code_content.encode('utf-8'),
            ContentType='text/plain'
        )
        s3_keys[filename] = s3_key

    # Save metadata to DynamoDB
    table.put_item(
        Item={
            'pk': f'SERVICE#{service_id}',
            'sk': f'CODE#{code_id}',
            'code_id': code_id,
            'service_id': service_id,
            'conversation_id': conversation_id,
            'created_at': timestamp,
            'user_email': 'anonymous',
            's3_bucket': s3_bucket,
            's3_keys': json.dumps(s3_keys),
            'file_count': len(code_files)
        }
    )

    return {
        'code_id': code_id,
        'conversation_id': conversation_id,
        'files': code_files,
        'message': 'Code generated successfully!'
    }


def build_code_generation_prompt(service_data):
    """Build the prompt for Claude to generate code"""
    prompt = f"""You are an expert cloud service developer. Generate complete, production-ready code for a cloud service based on these requirements:

Service Type: {service_data.get('service_type', 'N/A')}
Vendor: {service_data.get('vendor', 'N/A')}
Deployment: {service_data.get('deployment_model', 'N/A')}
Features: {', '.join(service_data.get('features', []))}
SLA: {service_data.get('sla', 'N/A')}
Scalability: {service_data.get('scalability', 'N/A')}
Integration: {service_data.get('integration', 'N/A')}

Generate the following files:
1. backend_service.py - Main service orchestration code
2. api_routes.py - REST API endpoints
3. database_schema.sql - Database schema
4. config.yaml - Configuration file
5. requirements.txt - Python dependencies
6. README.md - Setup and deployment guide

Requirements:
- Complete working code (no TODOs or placeholders)
- Follow best practices and security standards
- Include error handling and logging
- Add comments for complex logic
- Use async/await where appropriate

Format your response as:
```filename: backend_service.py
[code here]
```

```filename: api_routes.py
[code here]
```

And so on for each file."""

    return prompt


def parse_generated_code(content):
    """Parse Claude's response into individual code files"""
    files = {}
    current_file = None
    current_code = []

    for line in content.split('\n'):
        if line.startswith('```filename:'):
            # Save previous file
            if current_file:
                files[current_file] = '\n'.join(current_code)

            # Start new file
            current_file = line.replace('```filename:', '').strip()
            current_code = []
        elif line.startswith('```') and current_file:
            # End of file
            files[current_file] = '\n'.join(current_code)
            current_file = None
            current_code = []
        elif current_file:
            current_code.append(line)

    # Save last file if exists
    if current_file and current_code:
        files[current_file] = '\n'.join(current_code)

    return files


def firewall_chat(body):
    """
    Handle firewall management chat using Claude AI
    Simplified chat without structured conversation flow
    """
    message = body.get('message', '')
    conversation_history = body.get('conversationHistory', [])

    if not ANTHROPIC_API_KEY:
        raise ValueError("ANTHROPIC_API_KEY not configured")

    if not message:
        raise ValueError("Message is required")

    # Build system prompt for firewall expertise
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

    # Prepare messages for Claude API
    messages = conversation_history + [{"role": "user", "content": message}]

    # Call Claude API
    api_url = 'https://api.anthropic.com/v1/messages'

    request_data = {
        "model": "claude-3-5-sonnet-20241022",
        "max_tokens": 4096,
        "system": system_prompt,
        "messages": messages
    }

    req = urllib_request.Request(
        api_url,
        data=json.dumps(request_data).encode('utf-8'),
        headers={
            'Content-Type': 'application/json',
            'anthropic-version': '2023-06-01',
            'x-api-key': ANTHROPIC_API_KEY
        }
    )

    try:
        with urllib_request.urlopen(req) as response:
            response_data = json.loads(response.read().decode('utf-8'))
            ai_response = response_data['content'][0]['text']
    except HTTPError as e:
        error_body = e.read().decode('utf-8')
        print(f"Claude API Error: {e.code} - {error_body}")
        raise ValueError(f"Failed to get chat response: {error_body}")

    return {
        'response': ai_response,
        'conversationHistory': messages + [{"role": "assistant", "content": ai_response}]
    }
