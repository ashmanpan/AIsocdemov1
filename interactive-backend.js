// Node.js backend for interactive LLM responses
const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');

const app = express();
app.use(cors());
app.use(express.json());

// Initialize OpenAI client (or use Anthropic Claude)
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// Store scenario contexts
const scenarioContexts = {
    'lateral-movement': `You are an AI SOC analyst specializing in lateral movement detection in telecom networks.
    You have deep knowledge of:
    - Cyber Kill Chain methodology
    - 5G/4G network architecture (AMF, SMF, UPF, PCF components)
    - APT attack patterns in telco infrastructure
    - GTP and Diameter protocol vulnerabilities
    - Network segmentation and zero-trust principles
    Current scenario: Advanced persistent threat detected moving laterally through 5G core network.`,

    'insider-threat': `You are an AI SOC analyst specializing in insider threat detection.
    You monitor:
    - Privileged account behavior analytics
    - Data exfiltration patterns
    - Access pattern anomalies
    - Behavioral baselines and deviations
    Current scenario: Suspicious activities detected from privileged telco admin account.`,

    'zero-day': `You are an AI SOC analyst specializing in zero-day threat detection.
    You analyze:
    - Unknown vulnerabilities in telco software
    - Anomalous system behaviors
    - Memory corruption indicators
    - Novel exploit techniques
    Current scenario: Potential zero-day exploit detected in OSS/BSS systems.`,

    // Add more scenario contexts...
};

// Endpoint for interactive Q&A
app.post('/api/ask', async (req, res) => {
    try {
        const { question, scenario, conversationHistory = [] } = req.body;

        // Get scenario-specific context
        const context = scenarioContexts[scenario] || 'You are an AI SOC analyst.';

        // Build messages array with conversation history
        const messages = [
            {
                role: 'system',
                content: context
            },
            ...conversationHistory,
            {
                role: 'user',
                content: question
            }
        ];

        // Get LLM response
        const completion = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: messages,
            temperature: 0.7,
            max_tokens: 1000
        });

        const answer = completion.choices[0].message.content;

        // Format response with simulated agent structure
        const formattedResponse = formatAsAgentResponse(answer, scenario);

        res.json({
            success: true,
            response: formattedResponse,
            rawAnswer: answer
        });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to generate response'
        });
    }
});

// Format response to match demo UI style
function formatAsAgentResponse(answer, scenario) {
    const timestamp = new Date().toISOString();

    return `
        <div class="agent-workflow">
            <div class="workflow-header">
                <span class="workflow-icon">🤖</span>
                <h3 class="workflow-title">AI SOC Analyst Response</h3>
            </div>

            <div class="agent-step">
                <div class="agent-header">
                    <span class="agent-name">🧠 AI_ANALYST</span>
                    <span class="agent-status status-completed">Analysis Complete</span>
                </div>
                <div class="agent-content">
                    <div class="response-timestamp">Generated: ${timestamp}</div>
                    <div class="response-body">${answer}</div>
                </div>
            </div>
        </div>
    `;
}

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK', service: 'Interactive SOC Demo Backend' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Interactive backend running on port ${PORT}`);
});