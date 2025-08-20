// Complete Datacenter Scenarios with Proper Agent Hierarchy
// Pattern: IO_AGENT → MRA → Specialized Agents → MRA (correlation) → IO_AGENT

const scenarios = {
    'incident-management': {
        title: 'AI-Driven Incident Management',
        icon: '🚨',
        description: 'Automated detection, triage, root cause analysis, and resolution of datacenter incidents',
        initialQuery: 'Critical alert: Database cluster experiencing high latency',
        responses: [
            `<div class="agent-workflow">
                <div class="workflow-header">
                    <span class="workflow-icon">🚨</span>
                    <h3 class="workflow-title">Multi-Agent Incident Response Orchestration</h3>
                </div>
                
                <div class="ticket-info">
                    <div>
                        <div class="ticket-id">TICKET #DC-2024-00847</div>
                        <div style="font-size: 12px; color: #888; margin-top: 5px;">Generated: ${new Date().toISOString()}</div>
                    </div>
                    <div class="ticket-priority severity-critical">P1 - CRITICAL</div>
                </div>
                
                <div class="agent-step">
                    <div class="agent-header">
                        <span class="agent-name">📥 IO_AGENT</span>
                        <span class="agent-status status-completed">Task Received</span>
                    </div>
                    <div class="agent-content">
                        <strong>Input Source:</strong> ServiceNow Ticketing System<br>
                        <strong>Alert Type:</strong> Database Performance Degradation<br>
                        <strong>Severity:</strong> P1 - Critical<br>
                        <strong>Affected System:</strong> Production Database Cluster<br>
                        <br>
                        <strong>🎯 MRA Selection:</strong> Routing to <code>INCIDENT_MRA</code><br>
                        <div style="background: #1a0a1a; padding: 10px; border-radius: 5px; margin-top: 10px;">
                            <strong>→ Initiating handoff to Master Reasoning Agent...</strong>
                        </div>
                    </div>
                </div>
                
                <div class="agent-step">
                    <div class="agent-header">
                        <span class="agent-name">🧠 INCIDENT_MRA</span>
                        <span class="agent-status status-active">Orchestrating Response</span>
                    </div>
                    <div class="agent-content">
                        <strong>Agent Deployment Strategy:</strong><br>
                        <div style="margin-left: 20px; color: #00ff88;">
                            ✓ Deploying DETECTION_AGENT<br>
                            ✓ Deploying TRIAGE_AGENT<br>
                            ✓ Deploying RCA_AGENT<br>
                            ✓ Deploying DB_SPECIALIST_AGENT<br>
                            ✓ Deploying INFRA_AGENT<br>
                        </div>
                    </div>
                </div>
                
                <div class="agent-step">
                    <div class="agent-header">
                        <span class="agent-name">🔍 DETECTION_AGENT</span>
                        <span class="agent-status status-completed">Analysis Complete</span>
                    </div>
                    <div class="agent-content">
                        <strong>Anomaly Detected:</strong> Query latency 850ms (baseline: 45ms)<br>
                        <strong>Pattern Match:</strong> Query plan regression<br>
                        <strong>→ Reporting to MRA...</strong>
                    </div>
                </div>
                
                <div class="agent-step" style="border: 2px solid #00ff88;">
                    <div class="agent-header">
                        <span class="agent-name">🧠 INCIDENT_MRA</span>
                        <span class="agent-status status-completed">Correlation Complete</span>
                    </div>
                    <div class="agent-content">
                        <strong>Correlated Findings:</strong> Database query plan regression confirmed<br>
                        <strong>Resolution Plan:</strong> Apply index hints, optimize queries<br>
                        <strong>← Sending report to IO_AGENT...</strong>
                    </div>
                </div>
                
                <div class="agent-step" style="border: 2px solid #00aaff;">
                    <div class="agent-header">
                        <span class="agent-name">📥 IO_AGENT</span>
                        <span class="agent-status status-completed">Response Delivered</span>
                    </div>
                    <div class="agent-content">
                        ✅ <strong>Incident Resolved</strong><br>
                        • Root Cause: Query plan regression<br>
                        • Resolution Time: 8 minutes 34 seconds<br>
                        • Agents Involved: 8<br>
                        • Ticket Status: Auto-closed
                    </div>
                </div>
            </div>`
        ]
    },

    'capacity-management': {
        title: 'Predictive Capacity Management',
        icon: '📊',
        description: 'AI-powered capacity planning and optimization using predictive analytics',
        initialQuery: 'Analyze current capacity and predict future requirements',
        responses: [
            `<div class="agent-workflow">
                <div class="workflow-header">
                    <span class="workflow-icon">📊</span>
                    <h3 class="workflow-title">Multi-Agent Capacity Planning Orchestration</h3>
                </div>
                
                <div class="agent-step">
                    <div class="agent-header">
                        <span class="agent-name">📥 IO_AGENT</span>
                        <span class="agent-status status-completed">Request Received</span>
                    </div>
                    <div class="agent-content">
                        <strong>Input Source:</strong> Scheduled Capacity Review<br>
                        <strong>Scope:</strong> All datacenter resources<br>
                        <strong>Time Horizon:</strong> 7, 30, 90, 365 days<br>
                        <br>
                        <strong>🎯 MRA Selection:</strong> Routing to <code>CAPACITY_MRA</code><br>
                        <div style="background: #1a0a1a; padding: 10px; border-radius: 5px; margin-top: 10px;">
                            <strong>→ Initiating handoff to Master Reasoning Agent...</strong>
                        </div>
                    </div>
                </div>
                
                <div class="agent-step">
                    <div class="agent-header">
                        <span class="agent-name">🧠 CAPACITY_MRA</span>
                        <span class="agent-status status-active">Orchestrating Analysis</span>
                    </div>
                    <div class="agent-content">
                        <strong>Agent Deployment:</strong><br>
                        <div style="margin-left: 20px; color: #00ff88;">
                            ✓ MONITORING_AGENT - Current metrics<br>
                            ✓ ANALYTICS_AGENT - Historical trends<br>
                            ✓ ML_PREDICTION_AGENT - Forecasting<br>
                            ✓ OPTIMIZATION_AGENT - Resource optimization<br>
                            ✓ COST_ANALYST_AGENT - Financial analysis<br>
                        </div>
                    </div>
                </div>
                
                <div class="agent-step">
                    <div class="agent-header">
                        <span class="agent-name">📊 MONITORING_AGENT</span>
                        <span class="agent-status status-completed">Metrics Collected</span>
                    </div>
                    <div class="agent-content">
                        <strong>Current Utilization:</strong><br>
                        • CPU: 77.8% (12,450/16,000 cores)<br>
                        • Memory: 70.6% (45.2/64 TB)<br>
                        • Network: 85% ⚠️ (850/1000 Gb)<br>
                        <strong>→ Reporting to MRA...</strong>
                    </div>
                </div>
                
                <div class="agent-step">
                    <div class="agent-header">
                        <span class="agent-name">🤖 ML_PREDICTION_AGENT</span>
                        <span class="agent-status status-completed">Predictions Generated</span>
                    </div>
                    <div class="agent-content">
                        <strong>Capacity Predictions:</strong><br>
                        • Network: 98% in 90 days 🔴<br>
                        • CPU: 95% in 90 days ⚠️<br>
                        • Critical Date: Network exhaustion ~45 days<br>
                        <strong>→ Reporting to MRA...</strong>
                    </div>
                </div>
                
                <div class="agent-step" style="border: 2px solid #00ff88;">
                    <div class="agent-header">
                        <span class="agent-name">🧠 CAPACITY_MRA</span>
                        <span class="agent-status status-completed">Analysis Complete</span>
                    </div>
                    <div class="agent-content">
                        <strong>Consolidated Plan:</strong><br>
                        🔴 Network capacity critical - 45 days<br>
                        💰 $67k/month savings via optimization<br>
                        <strong>Action Plan:</strong> Immediate optimization + network upgrade<br>
                        <strong>← Sending report to IO_AGENT...</strong>
                    </div>
                </div>
                
                <div class="agent-step" style="border: 2px solid #00aaff;">
                    <div class="agent-header">
                        <span class="agent-name">📥 IO_AGENT</span>
                        <span class="agent-status status-completed">Report Delivered</span>
                    </div>
                    <div class="agent-content">
                        📊 <strong>Executive Summary:</strong><br>
                        • Network exhaustion: 45 days<br>
                        • Investment needed: $165k<br>
                        • Savings identified: $804k/year<br>
                        • JIRA Tickets Created: 3<br>
                        • Approvals Requested: CFO, CTO
                    </div>
                </div>
            </div>`
        ]
    },

    'resiliency-check': {
        title: 'Datacenter Resiliency Check',
        icon: '🛡️',
        description: 'Automated resilience validation through chaos engineering and failover testing',
        initialQuery: 'Run comprehensive resiliency assessment',
        responses: [
            `<div class="agent-workflow">
                <div class="workflow-header">
                    <span class="workflow-icon">🛡️</span>
                    <h3 class="workflow-title">Multi-Agent Resiliency Testing Orchestration</h3>
                </div>
                
                <div class="agent-step">
                    <div class="agent-header">
                        <span class="agent-name">📥 IO_AGENT</span>
                        <span class="agent-status status-completed">Request Received</span>
                    </div>
                    <div class="agent-content">
                        <strong>Input Source:</strong> Quarterly Resiliency Review<br>
                        <strong>Test Scope:</strong> Full datacenter infrastructure<br>
                        <strong>Test Type:</strong> Chaos engineering + Failover tests<br>
                        <br>
                        <strong>🎯 MRA Selection:</strong> Routing to <code>RESILIENCY_MRA</code><br>
                        <div style="background: #1a0a1a; padding: 10px; border-radius: 5px; margin-top: 10px;">
                            <strong>→ Initiating handoff to Master Reasoning Agent...</strong>
                        </div>
                    </div>
                </div>
                
                <div class="agent-step">
                    <div class="agent-header">
                        <span class="agent-name">🧠 RESILIENCY_MRA</span>
                        <span class="agent-status status-active">Orchestrating Tests</span>
                    </div>
                    <div class="agent-content">
                        <strong>Test Agent Deployment:</strong><br>
                        <div style="margin-left: 20px; color: #00ff88;">
                            ✓ ASSESSMENT_AGENT - Baseline assessment<br>
                            ✓ CHAOS_AGENT - Failure injection<br>
                            ✓ FAILOVER_AGENT - Failover testing<br>
                            ✓ RECOVERY_AGENT - Recovery validation<br>
                            ✓ COMPLIANCE_AGENT - Standards check<br>
                        </div>
                    </div>
                </div>
                
                <div class="agent-step">
                    <div class="agent-header">
                        <span class="agent-name">💥 CHAOS_AGENT</span>
                        <span class="agent-status status-active">Injecting Failures</span>
                    </div>
                    <div class="agent-content">
                        <strong>Chaos Experiments:</strong><br>
                        ✅ Random pod termination - Recovered in 12s<br>
                        ✅ Network partition - Failover in 8s<br>
                        ⚠️ Storage failure - Recovery 45s (target: 30s)<br>
                        ✅ Database failover - 15s, zero data loss<br>
                        <strong>→ Reporting to MRA...</strong>
                    </div>
                </div>
                
                <div class="agent-step" style="border: 2px solid #00ff88;">
                    <div class="agent-header">
                        <span class="agent-name">🧠 RESILIENCY_MRA</span>
                        <span class="agent-status status-completed">Assessment Complete</span>
                    </div>
                    <div class="agent-content">
                        <strong>Resiliency Score: 94/100</strong><br>
                        ✅ N+2 redundancy verified<br>
                        ⚠️ Storage failover needs improvement<br>
                        <strong>Recommendations:</strong> Optimize storage failover<br>
                        <strong>← Sending report to IO_AGENT...</strong>
                    </div>
                </div>
                
                <div class="agent-step" style="border: 2px solid #00aaff;">
                    <div class="agent-header">
                        <span class="agent-name">📥 IO_AGENT</span>
                        <span class="agent-status status-completed">Report Delivered</span>
                    </div>
                    <div class="agent-content">
                        🛡️ <strong>Resiliency Status:</strong><br>
                        • Overall Score: 94/100<br>
                        • Tests Passed: 47/50<br>
                        • Avg Recovery: 8.3 min<br>
                        • Next DR Drill: 5 days<br>
                        • Report Filed: Compliance Team
                    </div>
                </div>
            </div>`
        ]
    },

    'infra-verification': {
        title: 'Infrastructure Verification',
        icon: '✅',
        description: 'Automated verification of datacenter infrastructure, configurations, and compliance',
        initialQuery: 'Verify infrastructure configuration and compliance',
        responses: [
            `<div class="agent-workflow">
                <div class="workflow-header">
                    <span class="workflow-icon">✅</span>
                    <h3 class="workflow-title">Multi-Agent Infrastructure Verification</h3>
                </div>
                
                <div class="agent-step">
                    <div class="agent-header">
                        <span class="agent-name">📥 IO_AGENT</span>
                        <span class="agent-status status-completed">Request Received</span>
                    </div>
                    <div class="agent-content">
                        <strong>Input Source:</strong> Compliance Audit Request<br>
                        <strong>Verification Scope:</strong> All infrastructure components<br>
                        <strong>Standards:</strong> PCI-DSS, SOC2, CIS Benchmarks<br>
                        <br>
                        <strong>🎯 MRA Selection:</strong> Routing to <code>VERIFICATION_MRA</code><br>
                        <div style="background: #1a0a1a; padding: 10px; border-radius: 5px; margin-top: 10px;">
                            <strong>→ Initiating handoff to Master Reasoning Agent...</strong>
                        </div>
                    </div>
                </div>
                
                <div class="agent-step">
                    <div class="agent-header">
                        <span class="agent-name">🧠 VERIFICATION_MRA</span>
                        <span class="agent-status status-active">Orchestrating Verification</span>
                    </div>
                    <div class="agent-content">
                        <strong>Verification Agent Deployment:</strong><br>
                        <div style="margin-left: 20px; color: #00ff88;">
                            ✓ CONFIG_AGENT - Configuration checks<br>
                            ✓ COMPLIANCE_AGENT - Standards validation<br>
                            ✓ HARDWARE_AGENT - Hardware health<br>
                            ✓ NETWORK_AGENT - Network verification<br>
                            ✓ SECURITY_AGENT - Security posture<br>
                        </div>
                    </div>
                </div>
                
                <div class="agent-step">
                    <div class="agent-header">
                        <span class="agent-name">⚙️ CONFIG_AGENT</span>
                        <span class="agent-status status-completed">Config Verified</span>
                    </div>
                    <div class="agent-content">
                        <strong>Configuration Status:</strong><br>
                        ✅ 847/850 servers compliant<br>
                        ⚠️ 3 configuration drifts detected<br>
                        • MySQL max_connections changed<br>
                        • VLAN 200 missing on switch<br>
                        <strong>→ Reporting to MRA...</strong>
                    </div>
                </div>
                
                <div class="agent-step">
                    <div class="agent-header">
                        <span class="agent-name">🔐 COMPLIANCE_AGENT</span>
                        <span class="agent-status status-warning">Issues Found</span>
                    </div>
                    <div class="agent-content">
                        <strong>Compliance Results:</strong><br>
                        ✅ PCI-DSS: Fully Compliant<br>
                        ✅ SOC 2: Compliant<br>
                        ⚠️ CIS: 3 medium findings<br>
                        <strong>→ Reporting to MRA...</strong>
                    </div>
                </div>
                
                <div class="agent-step" style="border: 2px solid #00ff88;">
                    <div class="agent-header">
                        <span class="agent-name">🧠 VERIFICATION_MRA</span>
                        <span class="agent-status status-completed">Verification Complete</span>
                    </div>
                    <div class="agent-content">
                        <strong>Overall Compliance: 96.5%</strong><br>
                        ✅ Infrastructure verified<br>
                        ⚠️ 6 items need attention<br>
                        <strong>Action Plan:</strong> Auto-remediation available<br>
                        <strong>← Sending report to IO_AGENT...</strong>
                    </div>
                </div>
                
                <div class="agent-step" style="border: 2px solid #00aaff;">
                    <div class="agent-header">
                        <span class="agent-name">📥 IO_AGENT</span>
                        <span class="agent-status status-completed">Report Delivered</span>
                    </div>
                    <div class="agent-content">
                        ✅ <strong>Verification Summary:</strong><br>
                        • Compliance Score: 96.5%<br>
                        • Config Drift: 6 items<br>
                        • Hardware Alerts: 3<br>
                        • Next Audit: 45 days<br>
                        • Report Filed: Audit Committee
                    </div>
                </div>
            </div>`
        ]
    },

    'service-verification': {
        title: 'Service Verification Testing',
        icon: '🔍',
        description: 'Black box and white box testing for VMs, containers, databases, and message queues',
        initialQuery: 'Run comprehensive service verification tests',
        responses: [
            `<div class="agent-workflow">
                <div class="workflow-header">
                    <span class="workflow-icon">🔍</span>
                    <h3 class="workflow-title">Multi-Agent Service Testing Pipeline</h3>
                </div>
                
                <div class="agent-step">
                    <div class="agent-header">
                        <span class="agent-name">📥 IO_AGENT</span>
                        <span class="agent-status status-completed">Request Received</span>
                    </div>
                    <div class="agent-content">
                        <strong>Input Source:</strong> Service Health Check Request<br>
                        <strong>Test Scope:</strong> All datacenter services<br>
                        <strong>Test Types:</strong> Black box + White box testing<br>
                        <br>
                        <strong>🎯 MRA Selection:</strong> Routing to <code>TESTING_MRA</code><br>
                        <div style="background: #1a0a1a; padding: 10px; border-radius: 5px; margin-top: 10px;">
                            <strong>→ Initiating handoff to Master Reasoning Agent...</strong>
                        </div>
                    </div>
                </div>
                
                <div class="agent-step">
                    <div class="agent-header">
                        <span class="agent-name">🧠 TESTING_MRA</span>
                        <span class="agent-status status-active">Orchestrating Tests</span>
                    </div>
                    <div class="agent-content">
                        <strong>Test Agent Deployment:</strong><br>
                        <div style="margin-left: 20px; color: #00ff88;">
                            ✓ BLACKBOX_AGENT - External testing<br>
                            ✓ WHITEBOX_AGENT - Internal testing<br>
                            ✓ VM_TEST_AGENT - VM services<br>
                            ✓ CONTAINER_AGENT - K8s testing<br>
                            ✓ DB_TEST_AGENT - Database testing<br>
                        </div>
                    </div>
                </div>
                
                <div class="agent-step">
                    <div class="agent-header">
                        <span class="agent-name">⬛ BLACKBOX_AGENT</span>
                        <span class="agent-status status-completed">External Tests Done</span>
                    </div>
                    <div class="agent-content">
                        <strong>Black Box Results:</strong><br>
                        ✅ VM Service: 48/50 passed<br>
                        ✅ Kubernetes: 38/40 passed<br>
                        ⚠️ Database: 3 slow queries<br>
                        ✅ Message Queue: 35/36 passed<br>
                        <strong>→ Reporting to MRA...</strong>
                    </div>
                </div>
                
                <div class="agent-step">
                    <div class="agent-header">
                        <span class="agent-name">⬜ WHITEBOX_AGENT</span>
                        <span class="agent-status status-completed">Internal Tests Done</span>
                    </div>
                    <div class="agent-content">
                        <strong>White Box Results:</strong><br>
                        ✅ Code Coverage: 87%<br>
                        ✅ Internal APIs: All passing<br>
                        ⚠️ Memory leaks: 2 detected<br>
                        ✅ Security: No vulnerabilities<br>
                        <strong>→ Reporting to MRA...</strong>
                    </div>
                </div>
                
                <div class="agent-step" style="border: 2px solid #00ff88;">
                    <div class="agent-header">
                        <span class="agent-name">🧠 TESTING_MRA</span>
                        <span class="agent-status status-completed">Test Analysis Complete</span>
                    </div>
                    <div class="agent-content">
                        <strong>Test Summary:</strong><br>
                        • Overall Pass Rate: 95.7%<br>
                        • Critical Issues: 0<br>
                        • Performance Issues: 5<br>
                        <strong>Recommendations:</strong> Optimize slow queries<br>
                        <strong>← Sending report to IO_AGENT...</strong>
                    </div>
                </div>
                
                <div class="agent-step" style="border: 2px solid #00aaff;">
                    <div class="agent-header">
                        <span class="agent-name">📥 IO_AGENT</span>
                        <span class="agent-status status-completed">Report Delivered</span>
                    </div>
                    <div class="agent-content">
                        🔍 <strong>Service Health Report:</strong><br>
                        • Tests Passed: 287/300<br>
                        • Service SLA: 99.95%<br>
                        • Code Coverage: 87%<br>
                        • Next Test Cycle: 7 days<br>
                        • Report Filed: DevOps Team
                    </div>
                </div>
            </div>`
        ]
    },

    'service-creation': {
        title: 'AI Service Creation Agent',
        icon: '🤖',
        description: 'Automatically generate self-service portals from API documentation',
        initialQuery: 'Create a self-service portal for Firewall as a Service',
        responses: [
            `<div class="agent-workflow">
                <div class="workflow-header">
                    <span class="workflow-icon">🤖</span>
                    <h3 class="workflow-title">Multi-Agent Service Creation Pipeline</h3>
                </div>
                
                <div class="agent-step">
                    <div class="agent-header">
                        <span class="agent-name">📥 IO_AGENT</span>
                        <span class="agent-status status-completed">Request Received</span>
                    </div>
                    <div class="agent-content">
                        <strong>Input:</strong> API Documentation (OpenAPI Spec)<br>
                        <strong>Service:</strong> Firewall as a Service<br>
                        <strong>Requirements:</strong> Self-service portal with UI + Backend<br>
                        <br>
                        <strong>🎯 MRA Selection:</strong> Routing to <code>CREATION_MRA</code><br>
                        <div style="background: #1a0a1a; padding: 10px; border-radius: 5px; margin-top: 10px;">
                            <strong>→ Initiating handoff to Master Reasoning Agent...</strong>
                        </div>
                    </div>
                </div>
                
                <div class="agent-step">
                    <div class="agent-header">
                        <span class="agent-name">🧠 CREATION_MRA</span>
                        <span class="agent-status status-active">Orchestrating Pipeline</span>
                    </div>
                    <div class="agent-content">
                        <strong>Creation Agent Deployment:</strong><br>
                        <div style="margin-left: 20px; color: #00ff88;">
                            ✓ API_PARSER_AGENT - Parse API spec<br>
                            ✓ UI_DESIGNER_AGENT - Design interface<br>
                            ✓ FRONTEND_DEV_AGENT - Generate UI<br>
                            ✓ BACKEND_DEV_AGENT - Generate server<br>
                            ✓ DEVOPS_AGENT - Create deployment<br>
                        </div>
                    </div>
                </div>
                
                <div class="agent-step">
                    <div class="agent-header">
                        <span class="agent-name">📄 API_PARSER_AGENT</span>
                        <span class="agent-status status-completed">API Analyzed</span>
                    </div>
                    <div class="agent-content">
                        <strong>API Analysis:</strong><br>
                        • Endpoints: 12 discovered<br>
                        • Auth: API Key (Header)<br>
                        • Models: 5 schemas extracted<br>
                        <strong>→ Passing to UI_DESIGNER...</strong>
                    </div>
                </div>
                
                <div class="agent-step">
                    <div class="agent-header">
                        <span class="agent-name">💻 FRONTEND_DEV_AGENT</span>
                        <span class="agent-status status-completed">Frontend Generated</span>
                    </div>
                    <div class="agent-content">
                        <strong>UI Components Generated:</strong><br>
                        ✅ Dashboard component<br>
                        ✅ Firewall creation form<br>
                        ✅ Rule management table<br>
                        ✅ Metrics dashboard<br>
                        <strong>Files: 23 components created</strong>
                    </div>
                </div>
                
                <div class="agent-step" style="border: 2px solid #00ff88;">
                    <div class="agent-header">
                        <span class="agent-name">🧠 CREATION_MRA</span>
                        <span class="agent-status status-completed">Portal Complete</span>
                    </div>
                    <div class="agent-content">
                        <strong>Generation Summary:</strong><br>
                        ✅ Full-stack application generated<br>
                        ✅ 8,743 lines of code<br>
                        ✅ Docker + K8s configs ready<br>
                        ✅ Documentation generated<br>
                        <strong>← Sending package to IO_AGENT...</strong>
                    </div>
                </div>
                
                <div class="agent-step" style="border: 2px solid #00aaff;">
                    <div class="agent-header">
                        <span class="agent-name">📥 IO_AGENT</span>
                        <span class="agent-status status-completed">Delivered to User</span>
                    </div>
                    <div class="agent-content">
                        🤖 <strong>Portal Generated!</strong><br>
                        • Generation Time: 4:28<br>
                        • Code: 8.7k lines<br>
                        • Test Coverage: 87%<br>
                        • Time Saved: 3 weeks<br>
                        • GitHub Repo: Ready to deploy
                    </div>
                </div>
            </div>`
        ]
    },

    'vm-management': {
        title: 'VM Lifecycle Management',
        icon: '💻',
        description: 'Intelligent VM provisioning, optimization, and lifecycle automation',
        initialQuery: 'Optimize VM resource allocation across clusters',
        responses: [
            `<div class="agent-workflow">
                <div class="workflow-header">
                    <span class="workflow-icon">💻</span>
                    <h3 class="workflow-title">Multi-Agent VM Optimization Pipeline</h3>
                </div>
                
                <div class="agent-step">
                    <div class="agent-header">
                        <span class="agent-name">📥 IO_AGENT</span>
                        <span class="agent-status status-completed">Request Received</span>
                    </div>
                    <div class="agent-content">
                        <strong>Input:</strong> VM Optimization Request<br>
                        <strong>Scope:</strong> 3,247 VMs across 85 hosts<br>
                        <strong>Goal:</strong> Optimize resource allocation<br>
                        <br>
                        <strong>🎯 MRA Selection:</strong> Routing to <code>VM_MRA</code><br>
                        <div style="background: #1a0a1a; padding: 10px; border-radius: 5px; margin-top: 10px;">
                            <strong>→ Initiating handoff to Master Reasoning Agent...</strong>
                        </div>
                    </div>
                </div>
                
                <div class="agent-step">
                    <div class="agent-header">
                        <span class="agent-name">🧠 VM_MRA</span>
                        <span class="agent-status status-active">Orchestrating Optimization</span>
                    </div>
                    <div class="agent-content">
                        <strong>VM Agent Deployment:</strong><br>
                        <div style="margin-left: 20px; color: #00ff88;">
                            ✓ VM_ANALYSIS_AGENT - Analyze usage<br>
                            ✓ RIGHTSIZING_AGENT - Size optimization<br>
                            ✓ PLACEMENT_AGENT - Host placement<br>
                            ✓ MIGRATION_AGENT - Live migration<br>
                        </div>
                    </div>
                </div>
                
                <div class="agent-step">
                    <div class="agent-header">
                        <span class="agent-name">📊 VM_ANALYSIS_AGENT</span>
                        <span class="agent-status status-completed">Analysis Complete</span>
                    </div>
                    <div class="agent-content">
                        <strong>VM Analysis:</strong><br>
                        • Idle VMs: 234 (>7 days inactive)<br>
                        • Oversized: 456 (using <30%)<br>
                        • Undersized: 89 (>90% usage)<br>
                        • Waste: $42,000/month<br>
                        <strong>→ Reporting to MRA...</strong>
                    </div>
                </div>
                
                <div class="agent-step" style="border: 2px solid #00ff88;">
                    <div class="agent-header">
                        <span class="agent-name">🧠 VM_MRA</span>
                        <span class="agent-status status-completed">Optimization Plan Ready</span>
                    </div>
                    <div class="agent-content">
                        <strong>Optimization Actions:</strong><br>
                        ✅ Right-size 456 VMs<br>
                        ✅ Migrate 78 VMs for balance<br>
                        ✅ Consolidate 45 low-usage VMs<br>
                        <strong>Savings: $67,000/month</strong><br>
                        <strong>← Sending plan to IO_AGENT...</strong>
                    </div>
                </div>
                
                <div class="agent-step" style="border: 2px solid #00aaff;">
                    <div class="agent-header">
                        <span class="agent-name">📥 IO_AGENT</span>
                        <span class="agent-status status-completed">Report Delivered</span>
                    </div>
                    <div class="agent-content">
                        💻 <strong>VM Optimization Complete:</strong><br>
                        • VMs Optimized: 578<br>
                        • Monthly Savings: $67k<br>
                        • Performance Gain: 23%<br>
                        • Zero Downtime Migration<br>
                        • Report Filed: Infrastructure Team
                    </div>
                </div>
            </div>`
        ]
    },

    'container-orchestration': {
        title: 'Container Orchestration',
        icon: '🐳',
        description: 'Kubernetes cluster management, scaling, and optimization',
        initialQuery: 'Analyze and optimize Kubernetes cluster performance',
        responses: [
            `<div class="agent-workflow">
                <div class="workflow-header">
                    <span class="workflow-icon">🐳</span>
                    <h3 class="workflow-title">Multi-Agent K8s Optimization</h3>
                </div>
                
                <div class="agent-step">
                    <div class="agent-header">
                        <span class="agent-name">📥 IO_AGENT</span>
                        <span class="agent-status status-completed">Request Received</span>
                    </div>
                    <div class="agent-content">
                        <strong>Input:</strong> K8s Cluster Optimization<br>
                        <strong>Cluster Size:</strong> 45 nodes, 2,847 pods<br>
                        <strong>Namespaces:</strong> 67 active<br>
                        <br>
                        <strong>🎯 MRA Selection:</strong> Routing to <code>K8S_MRA</code><br>
                        <div style="background: #1a0a1a; padding: 10px; border-radius: 5px; margin-top: 10px;">
                            <strong>→ Initiating handoff to Master Reasoning Agent...</strong>
                        </div>
                    </div>
                </div>
                
                <div class="agent-step">
                    <div class="agent-header">
                        <span class="agent-name">🧠 K8S_MRA</span>
                        <span class="agent-status status-active">Orchestrating Analysis</span>
                    </div>
                    <div class="agent-content">
                        <strong>K8s Agent Deployment:</strong><br>
                        <div style="margin-left: 20px; color: #00ff88;">
                            ✓ CLUSTER_AGENT - Cluster analysis<br>
                            ✓ POD_OPTIMIZER - Pod optimization<br>
                            ✓ HPA_TUNER - Autoscaling tuning<br>
                            ✓ RESOURCE_AGENT - Resource limits<br>
                        </div>
                    </div>
                </div>
                
                <div class="agent-step">
                    <div class="agent-header">
                        <span class="agent-name">☸️ CLUSTER_AGENT</span>
                        <span class="agent-status status-completed">Analysis Complete</span>
                    </div>
                    <div class="agent-content">
                        <strong>Cluster Status:</strong><br>
                        • CPU Utilization: 68%<br>
                        • Memory: 74%<br>
                        • Unused PVCs: 234 (2.3TB)<br>
                        • Pending Pods: 12<br>
                        <strong>→ Reporting to MRA...</strong>
                    </div>
                </div>
                
                <div class="agent-step" style="border: 2px solid #00ff88;">
                    <div class="agent-header">
                        <span class="agent-name">🧠 K8S_MRA</span>
                        <span class="agent-status status-completed">Optimization Complete</span>
                    </div>
                    <div class="agent-content">
                        <strong>Optimizations Applied:</strong><br>
                        ✅ HPA tuned for 34 deployments<br>
                        ✅ Resource limits adjusted<br>
                        ✅ Pod distribution rebalanced<br>
                        ✅ Unused PVCs cleaned<br>
                        <strong>Savings: $18,000/month</strong><br>
                        <strong>← Sending report to IO_AGENT...</strong>
                    </div>
                </div>
                
                <div class="agent-step" style="border: 2px solid #00aaff;">
                    <div class="agent-header">
                        <span class="agent-name">📥 IO_AGENT</span>
                        <span class="agent-status status-completed">Report Delivered</span>
                    </div>
                    <div class="agent-content">
                        🐳 <strong>K8s Optimization Summary:</strong><br>
                        • Pods Optimized: 1,234<br>
                        • Storage Freed: 2.3TB<br>
                        • Cost Savings: $18k/month<br>
                        • Performance: +35%<br>
                        • Report Filed: Platform Team
                    </div>
                </div>
            </div>`
        ]
    },

    'database-optimization': {
        title: 'Database Performance Optimization',
        icon: '🗄️',
        description: 'AI-driven database tuning, query optimization, and capacity planning',
        initialQuery: 'Optimize database performance and identify bottlenecks',
        responses: [
            `<div class="agent-workflow">
                <div class="workflow-header">
                    <span class="workflow-icon">🗄️</span>
                    <h3 class="workflow-title">Multi-Agent Database Optimization</h3>
                </div>
                
                <div class="agent-step">
                    <div class="agent-header">
                        <span class="agent-name">📥 IO_AGENT</span>
                        <span class="agent-status status-completed">Request Received</span>
                    </div>
                    <div class="agent-content">
                        <strong>Input:</strong> Database Performance Optimization<br>
                        <strong>Databases:</strong> 23 production instances<br>
                        <strong>Types:</strong> PostgreSQL, MySQL, MongoDB<br>
                        <br>
                        <strong>🎯 MRA Selection:</strong> Routing to <code>DB_MRA</code><br>
                        <div style="background: #1a0a1a; padding: 10px; border-radius: 5px; margin-top: 10px;">
                            <strong>→ Initiating handoff to Master Reasoning Agent...</strong>
                        </div>
                    </div>
                </div>
                
                <div class="agent-step">
                    <div class="agent-header">
                        <span class="agent-name">🧠 DB_MRA</span>
                        <span class="agent-status status-active">Orchestrating Analysis</span>
                    </div>
                    <div class="agent-content">
                        <strong>Database Agent Deployment:</strong><br>
                        <div style="margin-left: 20px; color: #00ff88;">
                            ✓ QUERY_ANALYZER - Query analysis<br>
                            ✓ INDEX_OPTIMIZER - Index tuning<br>
                            ✓ CACHE_TUNER - Cache optimization<br>
                            ✓ SCHEMA_ADVISOR - Schema review<br>
                        </div>
                    </div>
                </div>
                
                <div class="agent-step">
                    <div class="agent-header">
                        <span class="agent-name">🔍 QUERY_ANALYZER</span>
                        <span class="agent-status status-completed">Analysis Complete</span>
                    </div>
                    <div class="agent-content">
                        <strong>Query Analysis:</strong><br>
                        • Slow queries: 23 identified<br>
                        • Missing indexes: 15 critical<br>
                        • N+1 queries: 8 patterns<br>
                        • Cache hit rate: 45%<br>
                        <strong>→ Reporting to MRA...</strong>
                    </div>
                </div>
                
                <div class="agent-step" style="border: 2px solid #00ff88;">
                    <div class="agent-header">
                        <span class="agent-name">🧠 DB_MRA</span>
                        <span class="agent-status status-completed">Optimization Complete</span>
                    </div>
                    <div class="agent-content">
                        <strong>Optimizations Applied:</strong><br>
                        ✅ Created 15 missing indexes<br>
                        ✅ Rewrote 8 inefficient queries<br>
                        ✅ Adjusted buffer pool size<br>
                        ✅ Enabled query caching<br>
                        <strong>Performance: +65% improvement</strong><br>
                        <strong>← Sending report to IO_AGENT...</strong>
                    </div>
                </div>
                
                <div class="agent-step" style="border: 2px solid #00aaff;">
                    <div class="agent-header">
                        <span class="agent-name">📥 IO_AGENT</span>
                        <span class="agent-status status-completed">Report Delivered</span>
                    </div>
                    <div class="agent-content">
                        🗄️ <strong>Database Optimization Summary:</strong><br>
                        • Query Latency: -65%<br>
                        • Throughput: +120%<br>
                        • CPU Usage: 85% → 52%<br>
                        • Cache Hit: 45% → 78%<br>
                        • Report Filed: DBA Team
                    </div>
                </div>
            </div>`
        ]
    },

    'network-automation': {
        title: 'Network Automation & SDN',
        icon: '🌐',
        description: 'Software-defined networking, automated configuration, and optimization',
        initialQuery: 'Automate network configuration and optimize traffic flow',
        responses: [
            `<div class="agent-workflow">
                <div class="workflow-header">
                    <span class="workflow-icon">🌐</span>
                    <h3 class="workflow-title">Multi-Agent Network Orchestration</h3>
                </div>
                
                <div class="agent-step">
                    <div class="agent-header">
                        <span class="agent-name">📥 IO_AGENT</span>
                        <span class="agent-status status-completed">Request Received</span>
                    </div>
                    <div class="agent-content">
                        <strong>Input:</strong> Network Automation Request<br>
                        <strong>Scope:</strong> SDN configuration + optimization<br>
                        <strong>Devices:</strong> 145 switches, 23 routers<br>
                        <br>
                        <strong>🎯 MRA Selection:</strong> Routing to <code>NETWORK_MRA</code><br>
                        <div style="background: #1a0a1a; padding: 10px; border-radius: 5px; margin-top: 10px;">
                            <strong>→ Initiating handoff to Master Reasoning Agent...</strong>
                        </div>
                    </div>
                </div>
                
                <div class="agent-step">
                    <div class="agent-header">
                        <span class="agent-name">🧠 NETWORK_MRA</span>
                        <span class="agent-status status-active">Orchestrating Automation</span>
                    </div>
                    <div class="agent-content">
                        <strong>Network Agent Deployment:</strong><br>
                        <div style="margin-left: 20px; color: #00ff88;">
                            ✓ SDN_CONTROLLER - SDN management<br>
                            ✓ CONFIG_AUTOMATION - Auto-config<br>
                            ✓ TRAFFIC_OPTIMIZER - Flow optimization<br>
                            ✓ SECURITY_POLICY - Policy enforcement<br>
                        </div>
                    </div>
                </div>
                
                <div class="agent-step">
                    <div class="agent-header">
                        <span class="agent-name">🔧 CONFIG_AUTOMATION</span>
                        <span class="agent-status status-completed">Configuration Applied</span>
                    </div>
                    <div class="agent-content">
                        <strong>Automated Changes:</strong><br>
                        ✅ VLANs provisioned: 12<br>
                        ✅ BGP peers configured: 8<br>
                        ✅ QoS policies: 23 services<br>
                        ✅ Load balancing: 15 pools<br>
                        <strong>→ Reporting to MRA...</strong>
                    </div>
                </div>
                
                <div class="agent-step" style="border: 2px solid #00ff88;">
                    <div class="agent-header">
                        <span class="agent-name">🧠 NETWORK_MRA</span>
                        <span class="agent-status status-completed">Automation Complete</span>
                    </div>
                    <div class="agent-content">
                        <strong>Network Optimization Results:</strong><br>
                        ✅ Flow rules updated: 1,247<br>
                        ✅ Traffic engineering applied<br>
                        ✅ Micro-segmentation enabled<br>
                        <strong>Performance: Latency -15%</strong><br>
                        <strong>← Sending report to IO_AGENT...</strong>
                    </div>
                </div>
                
                <div class="agent-step" style="border: 2px solid #00aaff;">
                    <div class="agent-header">
                        <span class="agent-name">📥 IO_AGENT</span>
                        <span class="agent-status status-completed">Report Delivered</span>
                    </div>
                    <div class="agent-content">
                        🌐 <strong>Network Automation Summary:</strong><br>
                        • Configs Automated: 168<br>
                        • Latency Reduced: 15%<br>
                        • Packet Loss: 0.001%<br>
                        • Bandwidth Optimized: +23%<br>
                        • Report Filed: Network Team
                    </div>
                </div>
            </div>`
        ]
    }
};