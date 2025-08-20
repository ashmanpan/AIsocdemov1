// Capacity Management Scenario
const capacityManagement = {
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
                    <strong>Input Source:</strong> Scheduled Capacity Review (Weekly)<br>
                    <strong>Request Type:</strong> Predictive Capacity Analysis<br>
                    <strong>Scope:</strong> All datacenter resources<br>
                    <strong>Time Horizon:</strong> 7, 30, 90, 365 days<br>
                    <strong>Trigger:</strong> Automated weekly review + 85% threshold alert<br>
                    <br>
                    <strong>🎯 MRA Selection:</strong> Routing to <code>CAPACITY_MRA</code> based on:<br>
                    • Task type: Capacity planning and prediction<br>
                    • Requires: Historical analysis, ML prediction, optimization<br>
                    • Complexity: Multi-resource, multi-timeline analysis<br>
                    <br>
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
                    <strong>Master Reasoning Agent - Capacity Planning Orchestration</strong><br>
                    <br>
                    <strong>Analysis Scope Definition:</strong><br>
                    • Resources: CPU, Memory, Storage, Network, Power, Cooling<br>
                    • Timeframes: Real-time, 7d, 30d, 90d, 1y predictions<br>
                    • Optimization goals: Cost, performance, reliability balance<br>
                    <br>
                    <strong>Agent Deployment Strategy:</strong><br>
                    <div style="margin-left: 20px; color: #00ff88;">
                        ✓ Deploying <strong>MONITORING_AGENT</strong> → Current utilization metrics<br>
                        ✓ Deploying <strong>ANALYTICS_AGENT</strong> → Historical trend analysis<br>
                        ✓ Deploying <strong>ML_PREDICTION_AGENT</strong> → Future demand forecasting<br>
                        ✓ Deploying <strong>OPTIMIZATION_AGENT</strong> → Resource optimization strategies<br>
                        ✓ Deploying <strong>COST_ANALYST_AGENT</strong> → Financial impact analysis<br>
                        ✓ Deploying <strong>RISK_ASSESSMENT_AGENT</strong> → Capacity risk evaluation<br>
                    </div>
                    <br>
                    <strong>Coordination Status:</strong> 6 agents deployed in parallel...
                </div>
            </div>
            
            <div class="agent-step">
                <div class="agent-header">
                    <span class="agent-name">📊 MONITORING_AGENT</span>
                    <span class="agent-status status-completed">Metrics Collected</span>
                </div>
                <div class="agent-content">
                    <strong>Current Resource Utilization Report:</strong><br>
                    <br>
                    <div class="capacity-metrics" style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                        <div>
                            <strong>CPU Cores:</strong><br>
                            • Used: 12,450 / 16,000 (77.8%)<br>
                            • Peak (24h): 14,200 (88.8%)<br>
                            • Trend: +2.3% daily
                        </div>
                        <div>
                            <strong>Memory:</strong><br>
                            • Used: 45.2 TB / 64 TB (70.6%)<br>
                            • Peak (24h): 52.1 TB (81.4%)<br>
                            • Trend: +1.8% daily
                        </div>
                        <div>
                            <strong>Storage:</strong><br>
                            • Used: 2.8 PB / 5.0 PB (56.0%)<br>
                            • Growth: 50 TB/week<br>
                            • Trend: +3.5% weekly
                        </div>
                        <div>
                            <strong>Network:</strong><br>
                            • Used: 850 Gb / 1000 Gb (85.0%)<br>
                            • Peak (24h): 950 Gb (95.0%)<br>
                            • Trend: +4.1% daily ⚠️
                        </div>
                    </div>
                    <br>
                    <strong>Critical Finding:</strong> Network approaching capacity limit<br>
                    <strong>→ Reporting to MRA...</strong>
                </div>
            </div>
            
            <div class="agent-step">
                <div class="agent-header">
                    <span class="agent-name">📈 ANALYTICS_AGENT</span>
                    <span class="agent-status status-completed">Trends Analyzed</span>
                </div>
                <div class="agent-content">
                    <strong>Historical Pattern Analysis:</strong><br>
                    <br>
                    • <strong>Seasonal Patterns:</strong><br>
                      - Q4 peak: +45% (Black Friday/Holiday)<br>
                      - Monthly peak: Day 1-3 (+25% billing cycle)<br>
                      - Weekly peak: Monday 9-11 AM (+30%)<br>
                    <br>
                    • <strong>Growth Trends (YoY):</strong><br>
                      - Compute: +68% annually<br>
                      - Storage: +125% annually<br>
                      - Network: +95% annually<br>
                    <br>
                    • <strong>Event Correlations:</strong><br>
                      - Product launches: +200% for 48 hours<br>
                      - Marketing campaigns: +50% sustained<br>
                    <br>
                    <strong>→ Reporting to MRA...</strong>
                </div>
            </div>
            
            <div class="agent-step">
                <div class="agent-header">
                    <span class="agent-name">🤖 ML_PREDICTION_AGENT</span>
                    <span class="agent-status status-completed">Predictions Generated</span>
                </div>
                <div class="agent-content">
                    <strong>ML-Based Capacity Predictions (95% confidence):</strong><br>
                    <br>
                    <table style="width: 100%; color: #ddd;">
                        <tr style="border-bottom: 1px solid #333;">
                            <th>Resource</th>
                            <th>7 Days</th>
                            <th>30 Days</th>
                            <th>90 Days</th>
                            <th>Action</th>
                        </tr>
                        <tr>
                            <td>CPU</td>
                            <td>82%</td>
                            <td>89%</td>
                            <td>95% ⚠️</td>
                            <td>Order Q2</td>
                        </tr>
                        <tr>
                            <td>Memory</td>
                            <td>73%</td>
                            <td>78%</td>
                            <td>85%</td>
                            <td>Plan Q2</td>
                        </tr>
                        <tr>
                            <td>Storage</td>
                            <td>58%</td>
                            <td>62%</td>
                            <td>70%</td>
                            <td>OK</td>
                        </tr>
                        <tr>
                            <td>Network</td>
                            <td>87% ⚠️</td>
                            <td>92% ⚠️</td>
                            <td>98% 🔴</td>
                            <td>URGENT</td>
                        </tr>
                    </table>
                    <br>
                    <strong>Critical Date:</strong> Network exhaustion in ~45 days<br>
                    <strong>→ Reporting to MRA...</strong>
                </div>
            </div>
            
            <div class="agent-step">
                <div class="agent-header">
                    <span class="agent-name">⚡ OPTIMIZATION_AGENT</span>
                    <span class="agent-status status-completed">Optimizations Identified</span>
                </div>
                <div class="agent-content">
                    <strong>Resource Optimization Opportunities:</strong><br>
                    <br>
                    <strong>Immediate Actions (This Week):</strong><br>
                    ✅ Migrate 200 idle VMs → Free 1,600 cores<br>
                    ✅ Enable memory ballooning → Reclaim 5TB RAM<br>
                    ✅ Compress cold data → Save 400TB storage<br>
                    ✅ Implement QoS policies → Optimize bandwidth<br>
                    <br>
                    <strong>Consolidation Opportunities:</strong><br>
                    • 456 oversized VMs (using <30% allocated)<br>
                    • 89 duplicate datasets (can deduplicate)<br>
                    • 23 unused network VLANs<br>
                    <br>
                    <strong>Efficiency Gains:</strong> Can free 20% resources<br>
                    <strong>→ Reporting to MRA...</strong>
                </div>
            </div>
            
            <div class="agent-step">
                <div class="agent-header">
                    <span class="agent-name">💰 COST_ANALYST_AGENT</span>
                    <span class="agent-status status-completed">Cost Analysis Done</span>
                </div>
                <div class="agent-content">
                    <strong>Financial Impact Analysis:</strong><br>
                    <br>
                    <strong>Current Costs:</strong><br>
                    • Monthly infrastructure: $285,000<br>
                    • Wasted resources: $42,000/month<br>
                    • Over-provisioning cost: $31,000/month<br>
                    <br>
                    <strong>Expansion Costs:</strong><br>
                    • Network upgrade (urgent): $45,000<br>
                    • Compute expansion (Q2): $120,000<br>
                    • Total CAPEX needed: $165,000<br>
                    <br>
                    <strong>Optimization Savings:</strong><br>
                    • Immediate: $67,000/month<br>
                    • Annual projection: $804,000<br>
                    <br>
                    <strong>→ Reporting to MRA...</strong>
                </div>
            </div>
            
            <div class="agent-step" style="border: 2px solid #00ff88;">
                <div class="agent-header">
                    <span class="agent-name">🧠 CAPACITY_MRA</span>
                    <span class="agent-status status-completed">Analysis Complete</span>
                </div>
                <div class="agent-content">
                    <strong>Master Reasoning Agent - Consolidated Capacity Plan</strong><br>
                    <br>
                    <strong>Critical Findings Correlation:</strong><br>
                    🔴 Network capacity critical - 45 days to exhaustion<br>
                    ⚠️ CPU capacity warning - 88 days to 95% threshold<br>
                    ✅ Storage and memory within safe limits<br>
                    💰 $67k/month savings available through optimization<br>
                    <br>
                    <strong>Recommended Action Plan:</strong><br>
                    <br>
                    <strong>Week 1 (Immediate):</strong><br>
                    1. Execute optimization plan → Free 20% resources<br>
                    2. Order network switches → $45k (4-week lead time)<br>
                    3. Migrate idle workloads → Immediate relief<br>
                    <br>
                    <strong>Month 1-2:</strong><br>
                    4. Install network capacity → Prevent exhaustion<br>
                    5. Plan compute expansion → Q2 implementation<br>
                    6. Implement auto-scaling policies<br>
                    <br>
                    <strong>Quarter 2:</strong><br>
                    7. Add compute nodes → Stay ahead of growth<br>
                    8. Review and adjust predictions<br>
                    <br>
                    <div style="background: #001a0f; padding: 10px; border-radius: 5px;">
                        <strong>← Sending consolidated report to IO_AGENT...</strong>
                    </div>
                </div>
            </div>
            
            <div class="agent-step" style="border: 2px solid #00aaff;">
                <div class="agent-header">
                    <span class="agent-name">📥 IO_AGENT</span>
                    <span class="agent-status status-completed">Report Delivered</span>
                </div>
                <div class="agent-content">
                    <strong>Executive Summary for Stakeholders:</strong><br>
                    <br>
                    📊 <strong>Current Utilization:</strong><br>
                    • Overall: 73% (healthy)<br>
                    • Network: 85% (critical - action required)<br>
                    <br>
                    🔮 <strong>Predictions:</strong><br>
                    • Network exhaustion: 45 days<br>
                    • CPU threshold breach: 88 days<br>
                    <br>
                    💡 <strong>Recommendations:</strong><br>
                    1. Immediate: Optimize to free 20% capacity<br>
                    2. Urgent: Order network equipment ($45k)<br>
                    3. Q2: Compute expansion ($120k)<br>
                    <br>
                    💰 <strong>Financial Impact:</strong><br>
                    • Investment needed: $165k<br>
                    • Savings identified: $804k/year<br>
                    • ROI: 2.5 months<br>
                    <br>
                    <strong>Reports Generated:</strong> ✅<br>
                    <strong>JIRA Tickets Created:</strong> 3<br>
                    <strong>Approvals Requested:</strong> CFO, CTO
                </div>
            </div>
            
            <div class="metrics-grid">
                <div class="metric-card">
                    <div class="metric-title">Agents Involved</div>
                    <div class="metric-value">8</div>
                    <div class="metric-details">Parallel execution</div>
                </div>
                <div class="metric-card">
                    <div class="metric-title">Analysis Time</div>
                    <div class="metric-value">2.3 min</div>
                    <div class="metric-details">End-to-end</div>
                </div>
                <div class="metric-card">
                    <div class="metric-title">Savings Found</div>
                    <div class="metric-value">$67k</div>
                    <div class="metric-details">Monthly</div>
                </div>
                <div class="metric-card">
                    <div class="metric-title">Risk Prevented</div>
                    <div class="metric-value">100%</div>
                    <div class="metric-details">Network outage</div>
                </div>
            </div>
        </div>`
    ]
};

// Service Creation Scenario
const serviceCreation = {
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
                    <strong>Input Source:</strong> User Request via CLI<br>
                    <strong>Task Type:</strong> Service Portal Generation<br>
                    <strong>Service:</strong> Firewall as a Service (FWaaS)<br>
                    <strong>API Documentation:</strong> Palo Alto Networks v10.1 OpenAPI Spec<br>
                    <strong>Requirements:</strong> Self-service portal with UI + Backend<br>
                    <br>
                    <strong>🎯 MRA Selection:</strong> Routing to <code>CREATION_MRA</code> based on:<br>
                    • Task: Automated code generation<br>
                    • Complexity: Full-stack application<br>
                    • Integration: API parsing and UI generation<br>
                    <br>
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
                    <strong>Master Reasoning Agent - Service Creation Orchestration</strong><br>
                    <br>
                    <strong>Pipeline Planning:</strong><br>
                    • Parse API documentation → Extract capabilities<br>
                    • Design UI components → Match to API endpoints<br>
                    • Generate backend code → API client + middleware<br>
                    • Create deployment artifacts → Docker, K8s, CI/CD<br>
                    • Generate documentation → User guides, API docs<br>
                    <br>
                    <strong>Agent Deployment Strategy:</strong><br>
                    <div style="margin-left: 20px; color: #00ff88;">
                        ✓ Deploying <strong>API_PARSER_AGENT</strong> → Analyze API specification<br>
                        ✓ Deploying <strong>UI_DESIGNER_AGENT</strong> → Design user interface<br>
                        ✓ Deploying <strong>BACKEND_DEV_AGENT</strong> → Generate server code<br>
                        ✓ Deploying <strong>FRONTEND_DEV_AGENT</strong> → Generate UI code<br>
                        ✓ Deploying <strong>DEVOPS_AGENT</strong> → Create deployment configs<br>
                        ✓ Deploying <strong>DOC_GENERATOR_AGENT</strong> → Write documentation<br>
                    </div>
                    <br>
                    <strong>Coordination:</strong> Sequential + parallel execution...
                </div>
            </div>
            
            <div class="agent-step">
                <div class="agent-header">
                    <span class="agent-name">📄 API_PARSER_AGENT</span>
                    <span class="agent-status status-completed">API Analyzed</span>
                </div>
                <div class="agent-content">
                    <strong>API Specification Analysis Complete:</strong><br>
                    <br>
                    <strong>Service Details:</strong><br>
                    • API Type: RESTful (OpenAPI 3.0)<br>
                    • Base URL: https://firewall.example.com/api<br>
                    • Authentication: API Key (Header: X-API-Key)<br>
                    • Rate Limit: 100 requests/minute<br>
                    <br>
                    <strong>Endpoints Discovered:</strong><br>
                    • <code>POST /firewalls</code> - Create firewall<br>
                    • <code>GET /firewalls</code> - List firewalls<br>
                    • <code>DELETE /firewalls/{id}</code> - Delete firewall<br>
                    • <code>POST /firewalls/{id}/rules</code> - Add rule<br>
                    • <code>GET /metrics</code> - Performance metrics<br>
                    <br>
                    <strong>Data Models:</strong> 5 schemas extracted<br>
                    <strong>→ Sending to UI_DESIGNER_AGENT...</strong>
                </div>
            </div>
            
            <div class="agent-step">
                <div class="agent-header">
                    <span class="agent-name">🎨 UI_DESIGNER_AGENT</span>
                    <span class="agent-status status-completed">UI Designed</span>
                </div>
                <div class="agent-content">
                    <strong>User Interface Design Complete:</strong><br>
                    <br>
                    <strong>UI Components Mapped:</strong><br>
                    ✅ Dashboard → Firewall list + metrics<br>
                    ✅ Create Form → Name, zone, size selection<br>
                    ✅ Rule Manager → DataGrid with CRUD<br>
                    ✅ Metrics View → Real-time charts<br>
                    ✅ Settings → API key management<br>
                    <br>
                    <strong>Design System:</strong><br>
                    • Framework: React 18 + TypeScript<br>
                    • Components: Material-UI v5<br>
                    • State: Redux Toolkit<br>
                    • Charts: Recharts<br>
                    <br>
                    <strong>→ Passing to FRONTEND_DEV_AGENT...</strong>
                </div>
            </div>
            
            <div class="agent-step">
                <div class="agent-header">
                    <span class="agent-name">💻 FRONTEND_DEV_AGENT</span>
                    <span class="agent-status status-completed">Frontend Generated</span>
                </div>
                <div class="agent-content">
                    <strong>Frontend Code Generation Complete:</strong><br>
                    <br>
                    <strong>Generated Components:</strong><br>
                    <code style="display: block; background: #0a0a0a; padding: 10px; margin: 10px 0;">
// FirewallForm.tsx
const FirewallForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '', zone: '', size: 'small'
  });
  
  const handleSubmit = async (e) => {
    const response = await api.createFirewall(formData);
    toast.success(\`Firewall \${response.name} created\`);
  };
  
  return (
    &lt;Form onSubmit={handleSubmit}&gt;
      &lt;TextField label="Name" required /&gt;
      &lt;Select label="Size" options={sizes} /&gt;
      &lt;Button type="submit"&gt;Create&lt;/Button&gt;
    &lt;/Form&gt;
  );
};
                    </code>
                    <strong>Files Generated:</strong> 23 components, 8 services<br>
                    <strong>→ Parallel with BACKEND_DEV_AGENT...</strong>
                </div>
            </div>
            
            <div class="agent-step">
                <div class="agent-header">
                    <span class="agent-name">⚙️ BACKEND_DEV_AGENT</span>
                    <span class="agent-status status-completed">Backend Generated</span>
                </div>
                <div class="agent-content">
                    <strong>Backend Code Generation Complete:</strong><br>
                    <br>
                    <strong>Generated API Client:</strong><br>
                    <code style="display: block; background: #0a0a0a; padding: 10px; margin: 10px 0;">
class FirewallClient:
    def __init__(self, api_key: str):
        self.session = requests.Session()
        self.session.headers['X-API-Key'] = api_key
        
    async def create_firewall(self, data: dict):
        response = await self.session.post(
            f"{BASE_URL}/firewalls", json=data
        )
        return response.json()
        
    # Retry logic, caching, error handling included
                    </code>
                    <strong>Features:</strong> Rate limiting, retry, caching<br>
                    <strong>→ Sending to DEVOPS_AGENT...</strong>
                </div>
            </div>
            
            <div class="agent-step">
                <div class="agent-header">
                    <span class="agent-name">🚀 DEVOPS_AGENT</span>
                    <span class="agent-status status-completed">Deployment Ready</span>
                </div>
                <div class="agent-content">
                    <strong>Deployment Configuration Generated:</strong><br>
                    <br>
                    <strong>Docker Configuration:</strong><br>
                    • Multi-stage Dockerfile created<br>
                    • Image size optimized: 142MB<br>
                    • Security scanning enabled<br>
                    <br>
                    <strong>Kubernetes Manifests:</strong><br>
                    • Deployment: 3 replicas, auto-scaling<br>
                    • Service: LoadBalancer type<br>
                    • ConfigMap: Environment configs<br>
                    • Secrets: API key management<br>
                    <br>
                    <strong>CI/CD Pipeline:</strong><br>
                    • GitHub Actions workflow<br>
                    • Test → Build → Deploy stages<br>
                    • Automated rollback on failure<br>
                    <br>
                    <strong>→ Finalizing with DOC_GENERATOR...</strong>
                </div>
            </div>
            
            <div class="agent-step" style="border: 2px solid #00ff88;">
                <div class="agent-header">
                    <span class="agent-name">🧠 CREATION_MRA</span>
                    <span class="agent-status status-completed">Portal Complete</span>
                </div>
                <div class="agent-content">
                    <strong>Master Reasoning Agent - Service Portal Ready</strong><br>
                    <br>
                    <strong>Generation Summary:</strong><br>
                    ✅ API fully parsed and understood<br>
                    ✅ UI components generated (23 files)<br>
                    ✅ Backend client created (Python + Node.js)<br>
                    ✅ Deployment configs ready (Docker + K8s)<br>
                    ✅ Documentation auto-generated<br>
                    ✅ Tests included (87% coverage)<br>
                    <br>
                    <strong>Project Structure:</strong><br>
                    <pre style="color: #00ff88; font-size: 11px;">
firewall-portal/
├── frontend/         (React + TypeScript)
├── backend/          (API Gateway + Client)
├── deployment/       (Docker + K8s)
├── docs/            (User + API docs)
└── tests/           (Unit + Integration)
                    </pre>
                    <br>
                    <strong>Ready for Deployment!</strong><br>
                    <div style="background: #001a0f; padding: 10px; border-radius: 5px;">
                        <strong>← Sending complete package to IO_AGENT...</strong>
                    </div>
                </div>
            </div>
            
            <div class="agent-step" style="border: 2px solid #00aaff;">
                <div class="agent-header">
                    <span class="agent-name">📥 IO_AGENT</span>
                    <span class="agent-status status-completed">Delivered to User</span>
                </div>
                <div class="agent-content">
                    <strong>Firewall Self-Service Portal Generated Successfully!</strong><br>
                    <br>
                    📦 <strong>Deliverables:</strong><br>
                    • Complete source code (GitHub repo)<br>
                    • Docker images (Registry pushed)<br>
                    • Deployment guide (PDF)<br>
                    • API documentation (Swagger UI)<br>
                    <br>
                    🚀 <strong>Quick Start:</strong><br>
                    <code style="background: #1a1a1a; padding: 5px;">
                    git clone https://github.com/org/firewall-portal<br>
                    docker-compose up -d<br>
                    # Portal available at http://localhost:3000
                    </code>
                    <br>
                    ⏱️ <strong>Generation Metrics:</strong><br>
                    • Total time: 4 minutes 28 seconds<br>
                    • Lines of code: 8,743<br>
                    • Test coverage: 87%<br>
                    • Agents involved: 8<br>
                    <br>
                    <strong>Portal Status:</strong> Ready to Deploy ✅
                </div>
            </div>
            
            <div class="metrics-grid">
                <div class="metric-card">
                    <div class="metric-title">Code Generated</div>
                    <div class="metric-value">8.7k</div>
                    <div class="metric-details">Lines of code</div>
                </div>
                <div class="metric-card">
                    <div class="metric-title">Generation Time</div>
                    <div class="metric-value">4:28</div>
                    <div class="metric-details">Minutes</div>
                </div>
                <div class="metric-card">
                    <div class="metric-title">Test Coverage</div>
                    <div class="metric-value">87%</div>
                    <div class="metric-details">Automated tests</div>
                </div>
                <div class="metric-card">
                    <div class="metric-title">Time Saved</div>
                    <div class="metric-value">3 weeks</div>
                    <div class="metric-details">vs Manual dev</div>
                </div>
            </div>
        </div>`
    ]
};