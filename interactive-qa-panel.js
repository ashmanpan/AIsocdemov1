// Interactive Q&A Panel - Add this to your existing SOC demo
// This creates a slide-out panel on the right side for LLM-based Q&A

(function() {
    // Configuration
    const CONFIG = {
        openaiApiKey: null, // Will be set by user
        currentScenario: null,
        conversationHistory: []
    };

    // Scenario contexts for LLM
    const SCENARIO_CONTEXTS = {
        'lateral-movement': `You are an AI SOC analyst expert. The current demo is showing lateral movement detection in 5G/4G telco infrastructure.
        Key details from the scenario:
        - APT attack detected moving through Cyber Kill Chain phases
        - Affected systems: AMF, SMF, UPF, PCF, HSS, OSS/BSS
        - Attack vector: Supply chain compromise via vendor portal
        - Tools in use: Splunk SIEM, CrowdStrike EDR, Cisco NDR, Exabeam UBA
        - Threat actor: TELECOM PHANTOM (89% confidence)
        Answer questions based on this context and the telco security domain.`,

        'insider-threat': `You are an AI SOC analyst expert. The current demo is showing insider threat detection in telco NOC/SOC.
        Key details from the scenario:
        - Privileged NOC engineer account showing suspicious behavior
        - After-hours access to critical RAN controllers
        - User: J.Smith (NOC4521) with 92% risk score
        - Behavioral analytics detecting peer group deviation
        Answer questions about insider threats in telecommunications context.`,

        'zero-day': `You are an AI SOC analyst expert. The current demo is showing zero-day detection.
        Key details from the scenario:
        - Unknown vulnerability in OSS/BSS systems
        - Memory corruption and privilege escalation detected
        - Behavioral sandboxing and anomaly detection in progress
        Answer questions about zero-day threats and detection methods.`,

        // Add more scenarios as needed
    };

    // Create the Q&A panel HTML
    function createQAPanel() {
        const panelHTML = `
            <div id="qaPanel" class="qa-panel">
                <div class="qa-panel-header">
                    <span class="qa-icon">💬</span>
                    <span class="qa-title">Ask AI Expert</span>
                    <button class="qa-close" onclick="toggleQAPanel()">✕</button>
                </div>

                <div class="qa-api-setup" id="qaApiSetup">
                    <input type="password"
                           id="qaApiKey"
                           placeholder="Enter OpenAI API Key (sk-...)"
                           class="qa-api-input">
                    <button onclick="saveQAApiKey()" class="qa-api-button">Enable Q&A</button>
                </div>

                <div class="qa-chat-container" id="qaChatContainer" style="display: none;">
                    <div class="qa-messages" id="qaMessages">
                        <div class="qa-message qa-ai">
                            <div class="qa-message-header">🤖 AI Expert</div>
                            <div class="qa-message-content">
                                Ask me anything about this security scenario! I can explain the attack patterns, tools, response strategies, or any technical details.
                            </div>
                        </div>
                    </div>

                    <div class="qa-input-container">
                        <input type="text"
                               id="qaInput"
                               placeholder="Ask about this scenario..."
                               class="qa-input"
                               onkeypress="handleQAKeyPress(event)">
                        <button onclick="sendQAMessage()" class="qa-send-button">→</button>
                    </div>
                </div>

                <div class="qa-loading" id="qaLoading" style="display: none;">
                    <div class="qa-spinner"></div>
                    <span>AI is thinking...</span>
                </div>
            </div>

            <button id="qaToggleButton" class="qa-toggle-button" onclick="toggleQAPanel()">
                <span class="qa-toggle-icon">💬</span>
                <span class="qa-toggle-text">Ask AI</span>
            </button>
        `;

        // Add styles
        const styles = `
            <style>
                /* Q&A Panel Styles */
                .qa-panel {
                    position: fixed;
                    right: -400px;
                    top: 0;
                    width: 400px;
                    height: 100vh;
                    background: linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%);
                    border-left: 2px solid #00ff88;
                    box-shadow: -5px 0 20px rgba(0, 0, 0, 0.5);
                    transition: right 0.3s ease-in-out;
                    z-index: 10000;
                    display: flex;
                    flex-direction: column;
                }

                .qa-panel.open {
                    right: 0;
                }

                .qa-panel-header {
                    background: #111;
                    padding: 15px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    border-bottom: 1px solid #333;
                }

                .qa-icon {
                    font-size: 20px;
                }

                .qa-title {
                    font-size: 16px;
                    font-weight: 600;
                    color: #00ff88;
                    flex: 1;
                    margin-left: 10px;
                }

                .qa-close {
                    background: none;
                    border: none;
                    color: #888;
                    font-size: 20px;
                    cursor: pointer;
                    padding: 0;
                    width: 30px;
                    height: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 4px;
                    transition: all 0.2s;
                }

                .qa-close:hover {
                    background: #333;
                    color: #fff;
                }

                .qa-api-setup {
                    padding: 20px;
                    background: #0a0a0a;
                    border-bottom: 1px solid #333;
                }

                .qa-api-input {
                    width: 100%;
                    padding: 10px;
                    background: #1a1a1a;
                    border: 1px solid #333;
                    color: #fff;
                    border-radius: 4px;
                    margin-bottom: 10px;
                    font-size: 14px;
                }

                .qa-api-button {
                    width: 100%;
                    padding: 10px;
                    background: linear-gradient(45deg, #00ff88, #00aaff);
                    color: #000;
                    border: none;
                    border-radius: 4px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: transform 0.2s;
                }

                .qa-api-button:hover {
                    transform: scale(1.02);
                }

                .qa-chat-container {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                }

                .qa-messages {
                    flex: 1;
                    overflow-y: auto;
                    padding: 15px;
                }

                .qa-messages::-webkit-scrollbar {
                    width: 6px;
                }

                .qa-messages::-webkit-scrollbar-thumb {
                    background: #444;
                    border-radius: 3px;
                }

                .qa-message {
                    margin-bottom: 15px;
                    animation: slideInRight 0.3s ease;
                }

                @keyframes slideInRight {
                    from {
                        opacity: 0;
                        transform: translateX(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                .qa-message-header {
                    font-size: 12px;
                    font-weight: 600;
                    margin-bottom: 5px;
                    color: #00ff88;
                }

                .qa-user .qa-message-header {
                    color: #00aaff;
                }

                .qa-message-content {
                    background: #1a1a1a;
                    padding: 10px;
                    border-radius: 8px;
                    font-size: 14px;
                    line-height: 1.5;
                    color: #ddd;
                }

                .qa-user .qa-message-content {
                    background: #0a2a3a;
                    border-left: 3px solid #00aaff;
                }

                .qa-ai .qa-message-content {
                    border-left: 3px solid #00ff88;
                }

                .qa-input-container {
                    padding: 15px;
                    background: #111;
                    border-top: 1px solid #333;
                    display: flex;
                    gap: 10px;
                }

                .qa-input {
                    flex: 1;
                    padding: 10px 15px;
                    background: #1a1a1a;
                    border: 1px solid #333;
                    color: #fff;
                    border-radius: 20px;
                    font-size: 14px;
                    outline: none;
                }

                .qa-input:focus {
                    border-color: #00ff88;
                }

                .qa-send-button {
                    width: 40px;
                    height: 40px;
                    background: linear-gradient(45deg, #00ff88, #00aaff);
                    color: #000;
                    border: none;
                    border-radius: 50%;
                    font-size: 20px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: transform 0.2s;
                }

                .qa-send-button:hover:not(:disabled) {
                    transform: scale(1.1);
                }

                .qa-send-button:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }

                .qa-loading {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    text-align: center;
                    color: #00ff88;
                }

                .qa-spinner {
                    width: 30px;
                    height: 30px;
                    border: 3px solid #333;
                    border-top-color: #00ff88;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin: 0 auto 10px;
                }

                @keyframes spin {
                    to { transform: rotate(360deg); }
                }

                .qa-toggle-button {
                    position: fixed;
                    right: 20px;
                    bottom: 20px;
                    background: linear-gradient(45deg, #00ff88, #00aaff);
                    color: #000;
                    border: none;
                    padding: 15px 20px;
                    border-radius: 30px;
                    font-weight: 600;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    box-shadow: 0 4px 15px rgba(0, 255, 136, 0.3);
                    transition: all 0.3s;
                    z-index: 9999;
                }

                .qa-toggle-button:hover {
                    transform: scale(1.05);
                    box-shadow: 0 6px 20px rgba(0, 255, 136, 0.5);
                }

                .qa-toggle-button.hidden {
                    display: none;
                }

                .qa-toggle-icon {
                    font-size: 20px;
                }

                /* Responsive adjustments */
                @media (max-width: 768px) {
                    .qa-panel {
                        width: 100%;
                        right: -100%;
                    }
                }
            </style>
        `;

        // Add to page
        document.head.insertAdjacentHTML('beforeend', styles);
        document.body.insertAdjacentHTML('beforeend', panelHTML);
    }

    // Toggle panel visibility
    window.toggleQAPanel = function() {
        const panel = document.getElementById('qaPanel');
        const button = document.getElementById('qaToggleButton');

        panel.classList.toggle('open');

        if (panel.classList.contains('open')) {
            button.classList.add('hidden');
            // Focus input if API key is set
            if (CONFIG.openaiApiKey) {
                document.getElementById('qaInput').focus();
            }
        } else {
            button.classList.remove('hidden');
        }
    };

    // Save API key
    window.saveQAApiKey = function() {
        const apiKey = document.getElementById('qaApiKey').value;
        if (apiKey) {
            CONFIG.openaiApiKey = apiKey;
            localStorage.setItem('qa_openai_key', apiKey);
            document.getElementById('qaApiSetup').style.display = 'none';
            document.getElementById('qaChatContainer').style.display = 'flex';
            document.getElementById('qaInput').focus();
        }
    };

    // Handle enter key
    window.handleQAKeyPress = function(event) {
        if (event.key === 'Enter') {
            sendQAMessage();
        }
    };

    // Send message to OpenAI
    window.sendQAMessage = async function() {
        const input = document.getElementById('qaInput');
        const message = input.value.trim();

        if (!message || !CONFIG.openaiApiKey) return;

        // Add user message
        addQAMessage('user', message);

        // Clear input and disable
        input.value = '';
        input.disabled = true;
        document.querySelector('.qa-send-button').disabled = true;
        document.getElementById('qaLoading').style.display = 'block';

        try {
            // Get current scenario from the page
            const activeScenario = document.querySelector('.scenario-item.active');
            const scenarioId = activeScenario ? activeScenario.dataset.scenario : 'lateral-movement';
            const context = SCENARIO_CONTEXTS[scenarioId] || SCENARIO_CONTEXTS['lateral-movement'];

            // Call OpenAI API
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${CONFIG.openaiApiKey}`
                },
                body: JSON.stringify({
                    model: 'gpt-4',
                    messages: [
                        { role: 'system', content: context },
                        ...CONFIG.conversationHistory,
                        { role: 'user', content: message }
                    ],
                    temperature: 0.7,
                    max_tokens: 500
                })
            });

            if (!response.ok) {
                throw new Error('API request failed');
            }

            const data = await response.json();
            const aiResponse = data.choices[0].message.content;

            // Add AI response
            addQAMessage('ai', aiResponse);

            // Update conversation history
            CONFIG.conversationHistory.push(
                { role: 'user', content: message },
                { role: 'assistant', content: aiResponse }
            );

            // Keep history manageable
            if (CONFIG.conversationHistory.length > 10) {
                CONFIG.conversationHistory = CONFIG.conversationHistory.slice(-10);
            }

        } catch (error) {
            console.error('Error:', error);
            addQAMessage('ai', 'Sorry, I encountered an error. Please check your API key and try again.');
        } finally {
            input.disabled = false;
            document.querySelector('.qa-send-button').disabled = false;
            document.getElementById('qaLoading').style.display = 'none';
            input.focus();
        }
    };

    // Add message to chat
    function addQAMessage(type, content) {
        const messagesContainer = document.getElementById('qaMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `qa-message qa-${type}`;

        messageDiv.innerHTML = `
            <div class="qa-message-header">${type === 'user' ? '👤 You' : '🤖 AI Expert'}</div>
            <div class="qa-message-content">${content.replace(/\n/g, '<br>')}</div>
        `;

        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Initialize on page load
    window.addEventListener('DOMContentLoaded', function() {
        createQAPanel();

        // Check for saved API key
        const savedKey = localStorage.getItem('qa_openai_key');
        if (savedKey) {
            CONFIG.openaiApiKey = savedKey;
            document.getElementById('qaApiSetup').style.display = 'none';
            document.getElementById('qaChatContainer').style.display = 'flex';
        }

        // Update scenario context when user switches scenarios
        document.addEventListener('click', function(e) {
            if (e.target.closest('.scenario-item')) {
                CONFIG.conversationHistory = []; // Reset conversation for new scenario
            }
        });
    });

})();