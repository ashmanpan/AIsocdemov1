# Scenario 1: Packet Loss Investigation - v6 Implementation Plan

## Current State (v5)
- **Compliance:** 45%
- **Ticket ID:** #67891 ✅
- **Has:** IO_AGENT, MRA, specialized agents, RCA
- **Missing:** IO questions, KG queries, RAG queries, agent collaboration, deployment, verification

## Target State (v6) - 100% Compliance

### Complete 25-Step Workflow

#### Phase 1: Alert & Intake (Steps 1-4)
1. **Alert/Ticket Generation**
   - Monitoring system detects packet loss
   - Auto-generates Ticket #67891
   - Shows alert details, severity, affected entity

2. **IO_AGENT Receives Ticket**
   - Ticket assigned to IO_AGENT
   - Initial problem statement received

3. **IO_AGENT Asks Clarifying Questions**
   - Q1: "Which specific sites are experiencing packet loss?"
   - A1: "All 5 remote sites connecting to primary DC"
   - Q2: "Are all applications affected or specific ones?"
   - A2: "All applications - CRM, Email, File sharing"
   - Q3: "When did the packet loss symptoms begin?"
   - A3: "Started at 09:15 AM, recurring every 30-45 minutes"
   - Q4: "What is the business impact?"
   - A4: "High - users experiencing slowdowns, some VoIP calls dropping"

4. **Problem Classification**
   - Type: Network Performance Issue
   - Category: Packet Loss
   - Priority: High
   - Transfer to MRA

#### Phase 2: Knowledge Gathering (Steps 5-9)
5. **MRA Deployment**
   - MASTER_REASONING_AGENT takes ownership
   - Initiates systematic investigation

6. **Knowledge Graph Queries**
   - Query: "Get topology for XYZ Corp network"
   - Results: 5 remote sites, DC routers, core switches, MPLS cloud
   - Query: "Get device configs for DC-RTR-01, DC-RTR-02, CORE-SW-01, CORE-SW-02"
   - Results: IOS-XE versions, interface configs, HSRP configs, buffer settings
   - Query: "Get protocol states: OSPF, BGP, HSRP"
   - Results: All protocols operational
   - Query: "Get interface statistics for past 7 days"
   - Results: Historical utilization, errors, drops data

7. **RAG System Queries**
   - Search: "packet loss + intermittent + buffer"
   - Found similar tickets:
     - TKT-45621 (89% similarity) - Buffer tuning resolved
     - TKT-39012 (76% similarity) - Traffic shaping applied
     - TKT-29834 (68% similarity) - QoS policy fixed
   - Retrieved documents:
     - Buffer_Tuning_Best_Practices.pdf
     - QoS_Design_Guide_Enterprise.pdf
     - Packet_Loss_Troubleshooting_Flowchart.pdf

8. **Three-Source Analysis**
   - Problem: Intermittent 5-8% packet loss every 30-45 minutes
   - KG Data: CORE-SW-01 buffer 64KB, HSRP active, utilization 85-95%
   - RAG Data: Historical cases resolved with buffer tuning + traffic shaping
   - MRA Decision: Deploy 6 specialized agents

9. **Agent Deployment Announcement**
   - "Deploying 6 specialized agents:"
   - 🗺️ TOPOLOGY_AGENT
   - 📊 TRAFFIC_ANALYSIS_AGENT
   - 🔌 INTERFACE_STATS_AGENT
   - 💾 BUFFER_ANALYSIS_AGENT
   - 🔧 ROOT_CAUSE_AGENT
   - 💡 RECOMMENDATIONS_AGENT

#### Phase 3: Specialized Investigation (Steps 10-14)
10. **TOPOLOGY_AGENT Execution**
    - Queries KG: Network topology
    - Queries MCP: Live routing tables via NETCONF
    - Working List: All routing paths established
    - Not Working List: (none)
    - Finding: Traffic flows through CORE-SW-01

11. **TRAFFIC_ANALYSIS_AGENT Execution**
    - Queries KG: Traffic patterns last 7 days
    - Queries MCP: Real-time NetFlow data via IPFIX
    - Queries RAG: "traffic patterns + packet loss"
    - Working List: Normal traffic 200-400 Mbps
    - Not Working List: Spikes to 950 Mbps at 09:00-11:00
    - Finding: Backup traffic correlates with packet loss

12. **INTERFACE_STATS_AGENT Execution**
    - Queries KG: Interface baseline statistics
    - Queries MCP: Interface counters via SNMP + NETCONF
    - Working List: GigE 0/1/1, GigE 0/1/2 clean
    - Not Working List: GigE 0/1/0 - Buffer overruns: 1,247
    - Finding: Interface errors on GigE 0/1/0

13. **BUFFER_ANALYSIS_AGENT Execution**
    - Queries KG: Buffer configurations
    - Queries MCP: Buffer utilization via CLI (SSH)
    - Queries RAG: "buffer sizing + overruns"
    - Working List: Buffers adequate for normal load
    - Not Working List: 64KB buffers insufficient for 950 Mbps bursts
    - Finding: Buffer exhaustion during traffic spikes

14. **Inter-Agent Collaboration**
    - TRAFFIC_ANALYSIS → INTERFACE_STATS: "Focus on GigE 0/1/0"
    - INTERFACE_STATS → BUFFER_ANALYSIS: "Check buffer config on CORE-SW-01"
    - BUFFER_ANALYSIS → TRAFFIC_ANALYSIS: "What's traffic volume during loss?"
    - TRAFFIC_ANALYSIS response: "950 Mbps backup traffic 09:00-11:00"
    - Agents adjust investigation: All converge on backup traffic + buffers

#### Phase 4: Root Cause Analysis (Steps 15-18)
15. **ROOT_CAUSE_AGENT Execution**
    - Collects findings from all 5 agents
    - Queries RAG: "backup traffic + buffer exhaustion + root cause"
    - Analysis: Correlation between backup schedule and packet loss
    - Identifies: Backup traffic consuming 95% bandwidth

16. **MRA Correlation Analysis**
    - Symptoms vs. Causes table:
      - Packet loss 5-8% → SYMPTOM
      - Buffer overruns → SYMPTOM
      - 950 Mbps on 1G link → CONTRIBUTING FACTOR
      - Backup schedule 09:00-11:00 → ROOT CAUSE
      - No traffic shaping → ROOT CAUSE
    - Root Cause: Uncontrolled backup traffic causing buffer exhaustion

17. **Additional Task Assignment** (if needed)
    - MRA: "No additional investigation needed - RCA confirmed"

18. **Clear RCA Statement**
    - Root Cause: Backup operations from remote sites scheduled during business hours consuming 95% of available bandwidth on CORE-SW-01 interface GigE 0/1/0, causing buffer exhaustion and packet drops

#### Phase 5: Resolution & Deployment (Steps 19-25)
19. **RECOMMENDATIONS_AGENT Execution**
    - Queries RAG: "traffic shaping + backup traffic + best practices"
    - Generates 3-phase remediation plan:
      - Immediate: Traffic shaping policy (limit backup to 70%)
      - Short-term: Reschedule backups to off-peak hours
      - Long-term: Buffer upgrades + comprehensive QoS

20. **Recommendations to IO_AGENT**
    - MRA → IO_AGENT: Complete resolution plan
    - Includes: Config changes, rollback plan, impact assessment

21. **User Permission Request**
    - IO_AGENT asks user:
      - "Approve traffic shaping policy on CORE-SW-01?"
      - "Maintenance window: Immediate (non-disruptive) or scheduled?"
      - "Notification recipients?"
    - User approves: Immediate deployment, notify noc-team@xyzcorp.com

22. **DEPLOYMENT_AGENT Execution**
    - Connects to CORE-SW-01 via NETCONF
    - Backs up current config
    - Applies traffic shaping policy:
      ```
      policy-map BACKUP-SHAPING
        class BACKUP-TRAFFIC
          police rate 700 mbps
      interface GigabitEthernet0/1/0
        service-policy output BACKUP-SHAPING
      ```
    - Confirms successful application

23. **VERIFICATION_AGENT Execution**
    - Config verification: Policy active on interface
    - Operational verification (15-min monitoring):
      - Packet loss: 8.2% → 0.01%
      - Buffer overruns: 1,247 → 0
      - Backup traffic: Controlled at 700 Mbps
    - Status: ✅ Issue Resolved

24. **Final Report Submission**
    - IO_AGENT generates complete report:
      - Ticket #67891 summary
      - Timeline: 09:15 AM report → 11:45 AM resolved
      - Root cause, resolution, verification
      - Short-term and long-term recommendations
    - Ticket Status: CLOSED

25. **User Notification**
    - Email sent to noc-team@xyzcorp.com
    - Report includes before/after metrics
    - Next steps for permanent fix

## Implementation Details

### New Agent Components Needed
1. **TICKET_SYSTEM** - Shows alert generation
2. **KNOWLEDGE_GRAPH_INTERFACE** - Shows KG queries
3. **RAG_SYSTEM_INTERFACE** - Shows RAG searches
4. **MCP_SERVER_INTERFACE** - Shows NETCONF/SNMP/CLI queries
5. **AGENT_COLLABORATION_DISPLAY** - Shows inter-agent messages
6. **DEPLOYMENT_AGENT** - Deploys configurations
7. **VERIFICATION_AGENT** - Post-deployment checks

### UI Elements to Add
- Question/Answer dialogue boxes for IO_AGENT
- KG query result displays with data tables
- RAG search results with similarity scores
- Three-source analysis comparison view
- Agent collaboration message threads
- Working/Not Working lists per agent
- MCP server connection status indicators
- Config deployment progress tracker
- Verification metrics dashboard
- User approval dialog boxes

### Data to Show
- Real device names, IPs, interface IDs
- Actual config snippets
- Realistic metrics and thresholds
- Historical data trends
- Before/after comparisons

## Estimated Implementation
- HTML structure: 500 lines
- Agent workflow steps: 25 steps
- Code snippets: 5 configuration blocks
- Data tables: 8 tables
- Metrics displays: 12 metric cards
- **Total size:** ~1,200 lines of HTML

## Success Criteria
✅ All 25 workflow steps present
✅ IO_AGENT asks 4 clarifying questions
✅ KG queries shown with results
✅ RAG queries shown with similarity scores
✅ 6 specialized agents deployed
✅ Agent collaboration demonstrated (5+ exchanges)
✅ Working/Not Working lists per agent
✅ MCP server queries shown (NETCONF, SNMP, CLI)
✅ MRA correlation analysis with symptom vs. cause table
✅ DEPLOYMENT_AGENT deploys config with user approval
✅ VERIFICATION_AGENT confirms resolution
✅ Final report with timeline and metrics

**Target Compliance: 100%**
