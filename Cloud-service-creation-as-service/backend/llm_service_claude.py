"""
Claude Sonnet LLM Integration for Cloud Service Creator
Using Anthropic's Claude API for conversation and code generation
"""

import os
import anthropic
import json
from typing import Dict, List, Optional
from enum import Enum


class MessageRole(Enum):
    USER = "user"
    ASSISTANT = "assistant"


class ClaudeServiceCreator:
    """
    Claude-powered service creator
    """

    def __init__(self, api_key: Optional[str] = None):
        """
        Initialize Claude client

        Args:
            api_key: Anthropic API key (or from environment)
        """
        self.api_key = api_key or os.getenv("ANTHROPIC_API_KEY")
        if not self.api_key:
            raise ValueError("ANTHROPIC_API_KEY not found in environment")

        self.client = anthropic.Anthropic(api_key=self.api_key)
        self.model = "claude-sonnet-4-20250514"  # Latest Sonnet model
        self.conversation_history = []

    # =============================================
    # CONVERSATION MANAGEMENT
    # =============================================

    async def start_conversation(self) -> Dict:
        """
        Start new conversation and get first question
        """
        system_prompt = """You are an expert Cloud Service Architect AI specializing in helping developers
create production-ready cloud services like vFirewall-as-a-Service, vRouter-as-a-Service, etc.

Your role:
1. Ask intelligent questions to gather requirements (7 key areas)
2. Prioritize Cisco products (ASA, FTD, CSR1000v, Meraki) but support all vendors
3. Adapt questions based on previous answers
4. Be concise but thorough

Start by asking what type of cloud service they want to create."""

        response = self.client.messages.create(
            model=self.model,
            max_tokens=1024,
            system=system_prompt,
            messages=[
                {
                    "role": "user",
                    "content": "I want to create a cloud service. Help me get started."
                }
            ]
        )

        first_question = response.content[0].text

        # Store in history
        self.conversation_history = [
            {"role": "user", "content": "I want to create a cloud service. Help me get started."},
            {"role": "assistant", "content": first_question}
        ]

        return {
            "question": first_question,
            "step": 1,
            "total_steps": 7
        }

    async def send_message(self, user_message: str, current_step: int) -> Dict:
        """
        Send user message and get AI response

        Args:
            user_message: User's answer
            current_step: Current conversation step (1-7)

        Returns:
            AI response with next question
        """
        # Add user message to history
        self.conversation_history.append({
            "role": "user",
            "content": user_message
        })

        # Build system prompt with context
        system_prompt = self._build_conversation_system_prompt(current_step)

        # Get AI response
        response = self.client.messages.create(
            model=self.model,
            max_tokens=1024,
            temperature=0.7,
            system=system_prompt,
            messages=self.conversation_history
        )

        ai_response = response.content[0].text

        # Add to history
        self.conversation_history.append({
            "role": "assistant",
            "content": ai_response
        })

        return {
            "question": ai_response,
            "step": current_step + 1,
            "total_steps": 7,
            "conversation_complete": current_step >= 7
        }

    def _build_conversation_system_prompt(self, current_step: int) -> str:
        """
        Build context-aware system prompt based on conversation progress
        """
        requirements_areas = [
            "Service Type (vFirewall, vRouter, vLoadBalancer, etc.)",
            "Intent & Purpose",
            "Features Required",
            "Vendor Selection (Cisco FIRST: ASA, FTD, CSR, Meraki, then others)",
            "API Documentation URLs",
            "Pricing Model (hourly, monthly, tiered, usage-based)",
            "Logging & Authentication (OAuth, SAML, MFA, RBAC, ELK, monitoring)"
        ]

        current_area = requirements_areas[current_step - 1] if current_step <= 7 else "Summary"

        return f"""You are collecting requirements for cloud service creation.

Current Step: {current_step}/7
Current Area: {current_area}

Conversation Guidelines:
- Ask ONE clear question about the current area
- Provide relevant options when appropriate
- For vendor selection, ALWAYS list Cisco products FIRST
- Be concise (2-3 sentences max)
- Use bullet points for options
- If user has answered all 7 areas, acknowledge completion

Next question should focus on: {current_area}"""

    # =============================================
    # CODE GENERATION
    # =============================================

    async def generate_backend_service(self, requirements: Dict) -> str:
        """
        Generate backend service code using Claude

        Args:
            requirements: Collected requirements from conversation

        Returns:
            Generated Python backend code
        """
        system_prompt = """You are an expert Python backend developer specializing in FastAPI and Flask.
Generate production-ready, enterprise-grade code following best practices:
- Complete working code (no TODOs or placeholders)
- Comprehensive error handling
- Detailed docstrings
- Logging for all operations
- Input validation
- Security best practices (auth, sanitization)
- Vendor API integration"""

        user_prompt = f"""Generate complete backend service code for {requirements.get('service_type', 'Cloud Service')}.

Requirements:
{json.dumps(requirements, indent=2)}

Generate backend_service.py with:
1. Flask/FastAPI app setup
2. Database models (SQLAlchemy)
3. Service manager class for vendor API integration
4. Complete error handling
5. Logging configuration
6. JWT authentication setup

Vendor Priority: {requirements.get('vendor', 'Cisco')} (use their official APIs)

Output ONLY the Python code. No explanations."""

        response = self.client.messages.create(
            model=self.model,
            max_tokens=4000,
            temperature=0.2,  # Lower temp for consistent code
            system=system_prompt,
            messages=[{"role": "user", "content": user_prompt}]
        )

        return response.content[0].text

    async def generate_api_endpoints(self, requirements: Dict) -> str:
        """
        Generate REST API endpoints
        """
        system_prompt = """You are an expert API developer. Generate production-ready REST API code."""

        user_prompt = f"""Generate complete REST API endpoints for {requirements.get('service_type', 'Service')}.

Requirements:
{json.dumps(requirements, indent=2)}

Generate api_endpoints.py with:
1. Flask/FastAPI routes
2. CRUD operations (Create, Read, Update, Delete instances)
3. JWT authentication (@jwt_required)
4. Input validation (Pydantic/Marshmallow)
5. Error handling
6. Response formatting

Endpoints needed:
- POST /api/v1/{requirements.get('service_type', 'service').lower()}/create
- GET /api/v1/{requirements.get('service_type', 'service').lower()}/:id
- GET /api/v1/{requirements.get('service_type', 'service').lower()}
- PUT /api/v1/{requirements.get('service_type', 'service').lower()}/:id
- DELETE /api/v1/{requirements.get('service_type', 'service').lower()}/:id

Output ONLY the Python code."""

        response = self.client.messages.create(
            model=self.model,
            max_tokens=4000,
            temperature=0.2,
            system=system_prompt,
            messages=[{"role": "user", "content": user_prompt}]
        )

        return response.content[0].text

    async def generate_database_schema(self, requirements: Dict) -> str:
        """
        Generate database schema SQL
        """
        system_prompt = """You are a database architect. Generate production-ready PostgreSQL schemas."""

        user_prompt = f"""Generate database schema for {requirements.get('service_type', 'Service')}.

Requirements:
{json.dumps(requirements, indent=2)}

Generate database_schema.sql with:
1. Service instances table
2. Customer accounts table
3. Usage logs table
4. Billing records table (for {requirements.get('pricing_model', 'monthly')} pricing)
5. Proper indexes for performance
6. Foreign key relationships
7. JSON/JSONB columns for flexible config storage

Output ONLY the SQL code."""

        response = self.client.messages.create(
            model=self.model,
            max_tokens=3000,
            temperature=0.1,
            system=system_prompt,
            messages=[{"role": "user", "content": user_prompt}]
        )

        return response.content[0].text

    async def generate_portal_integration(self, requirements: Dict) -> str:
        """
        Generate cloud portal JavaScript integration
        """
        system_prompt = """You are a frontend integration specialist. Generate clean, modern JavaScript."""

        user_prompt = f"""Generate cloud management portal integration for {requirements.get('service_type', 'Service')}.

Requirements:
{json.dumps(requirements, indent=2)}

Generate portal_integration.js with:
1. ES6 class-based widget
2. Fetch API for REST calls
3. Instance list display
4. Create/delete operations
5. Real-time status updates
6. Error handling

Output ONLY the JavaScript code."""

        response = self.client.messages.create(
            model=self.model,
            max_tokens=3000,
            temperature=0.2,
            system=system_prompt,
            messages=[{"role": "user", "content": user_prompt}]
        )

        return response.content[0].text

    async def generate_test_suite(self, requirements: Dict) -> str:
        """
        Generate pytest test suite
        """
        system_prompt = """You are a QA engineer. Generate comprehensive pytest test suites."""

        user_prompt = f"""Generate test suite for {requirements.get('service_type', 'Service')}.

Requirements:
{json.dumps(requirements, indent=2)}

Generate test_suite.py with:
1. pytest fixtures
2. Authentication tests
3. CRUD operation tests
4. API endpoint tests
5. Database tests
6. {requirements.get('vendor', 'Vendor')} integration tests
7. Performance tests
8. Error handling tests

Output ONLY the Python pytest code."""

        response = self.client.messages.create(
            model=self.model,
            max_tokens=3000,
            temperature=0.2,
            system=system_prompt,
            messages=[{"role": "user", "content": user_prompt}]
        )

        return response.content[0].text

    async def generate_documentation(self, requirements: Dict) -> str:
        """
        Generate README documentation
        """
        system_prompt = """You are a technical writer. Generate clear, comprehensive documentation."""

        user_prompt = f"""Generate README.md for {requirements.get('service_type', 'Service')}.

Requirements:
{json.dumps(requirements, indent=2)}

Generate README.md with:
1. Project overview
2. Features list
3. Installation instructions
4. API documentation
5. Configuration guide
6. {requirements.get('vendor', 'Vendor')} integration setup
7. Testing instructions
8. Deployment guide

Output ONLY the Markdown content."""

        response = self.client.messages.create(
            model=self.model,
            max_tokens=3000,
            temperature=0.3,
            system=system_prompt,
            messages=[{"role": "user", "content": user_prompt}]
        )

        return response.content[0].text

    # =============================================
    # COMPLETE GENERATION PIPELINE
    # =============================================

    async def generate_complete_service(self, requirements: Dict) -> Dict[str, str]:
        """
        Generate all files for complete service

        Args:
            requirements: All collected requirements

        Returns:
            Dictionary of filename -> code content
        """
        print("🤖 Starting code generation with Claude Sonnet...")

        generated_files = {}

        # 1. Backend Service
        print("📝 Generating backend service...")
        generated_files['backend_service.py'] = await self.generate_backend_service(requirements)

        # 2. API Endpoints
        print("📝 Generating API endpoints...")
        generated_files['api_endpoints.py'] = await self.generate_api_endpoints(requirements)

        # 3. Database Schema
        print("📝 Generating database schema...")
        generated_files['database_schema.sql'] = await self.generate_database_schema(requirements)

        # 4. Portal Integration
        print("📝 Generating portal integration...")
        generated_files['portal_integration.js'] = await self.generate_portal_integration(requirements)

        # 5. Test Suite
        print("📝 Generating test suite...")
        generated_files['test_suite.py'] = await self.generate_test_suite(requirements)

        # 6. Documentation
        print("📝 Generating documentation...")
        generated_files['README.md'] = await self.generate_documentation(requirements)

        print("✅ Code generation complete!")

        return generated_files

    # =============================================
    # CODE REVIEW & OPTIMIZATION
    # =============================================

    async def review_generated_code(self, code: str, filename: str) -> Dict:
        """
        Review generated code for issues

        Args:
            code: Generated code
            filename: Filename for context

        Returns:
            Review results with suggestions
        """
        system_prompt = """You are a senior code reviewer. Analyze code for:
1. Security vulnerabilities
2. Performance issues
3. Best practice violations
4. Missing error handling
5. Code quality issues"""

        user_prompt = f"""Review this {filename}:

```
{code}
```

Provide:
1. Overall quality score (1-10)
2. Security issues (if any)
3. Performance concerns (if any)
4. Improvement suggestions

Format response as JSON:
{{
  "score": 8,
  "security_issues": [],
  "performance_issues": [],
  "suggestions": []
}}"""

        response = self.client.messages.create(
            model=self.model,
            max_tokens=1500,
            temperature=0.1,
            system=system_prompt,
            messages=[{"role": "user", "content": user_prompt}]
        )

        # Parse JSON response
        review_text = response.content[0].text
        try:
            # Extract JSON from response
            import re
            json_match = re.search(r'\{[\s\S]*\}', review_text)
            if json_match:
                return json.loads(json_match.group())
        except:
            pass

        return {
            "score": 7,
            "review_text": review_text
        }


# =============================================
# USAGE EXAMPLE
# =============================================

async def main():
    """
    Example usage
    """
    # Initialize Claude service
    service = ClaudeServiceCreator(api_key="your-api-key-here")

    # Start conversation
    print("\n🤖 Starting conversation...")
    response = await service.start_conversation()
    print(f"\nAI: {response['question']}")

    # Simulate conversation (replace with real user input)
    requirements = {}
    step = 1

    # Example: User answers 7 questions
    user_answers = [
        "vFirewall as a Service",
        "Provide enterprise customers with secure, scalable firewall protection for their cloud infrastructure",
        "Traffic Filtering, Threat Detection, VPN Support, NAT Configuration, High Availability",
        "Cisco ASA and Cisco FTD",
        "https://developer.cisco.com/docs/firepower-apis/",
        "Monthly Subscription with tiered pricing",
        "OAuth 2.0, Multi-Factor Authentication, Centralized Logging with ELK, RBAC"
    ]

    for answer in user_answers:
        print(f"\nUser: {answer}")
        response = await service.send_message(answer, step)
        print(f"\nAI: {response['question']}")
        step = response['step']

        if response['conversation_complete']:
            break

    # Extract requirements from conversation
    requirements = {
        'service_type': 'vFirewall',
        'intent': 'Provide enterprise firewall protection',
        'features': ['Traffic Filtering', 'Threat Detection', 'VPN', 'NAT', 'HA'],
        'vendor': 'Cisco',
        'api_docs': 'https://developer.cisco.com/docs/firepower-apis/',
        'pricing_model': 'monthly',
        'logging_auth': ['OAuth', 'MFA', 'ELK', 'RBAC']
    }

    # Generate all code files
    print("\n\n🚀 Generating complete service...")
    generated_files = await service.generate_complete_service(requirements)

    # Display results
    print("\n✅ Generated Files:")
    for filename, code in generated_files.items():
        print(f"\n📄 {filename} ({len(code)} characters)")
        print(f"Preview: {code[:200]}...")

    # Optional: Review code
    print("\n🔍 Reviewing backend code...")
    review = await service.review_generated_code(
        generated_files['backend_service.py'],
        'backend_service.py'
    )
    print(f"\n📊 Code Quality Score: {review.get('score', 'N/A')}/10")


if __name__ == "__main__":
    import asyncio
    asyncio.run(main())
