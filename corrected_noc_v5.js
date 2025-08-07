// Rich text response for Packet Loss Investigation
const toxicFactorHTML = `<div class="root-container">
  <h3>Agentic AI - Packet Loss Investigation</h3>
  <p><strong>Investigating Intermittent Packet Loss on XYZ Corp Core Network (Ticket #67891)</strong></p>
  
  <div class="agent-workflow">
    <div class="agent-step completed">
      <div class="agent-header">
        <span class="agent-icon">⚙️</span>
        <span class="agent-name">IO_AGENT</span>
        <span class="status-tag status-success">Complete</span>
      </div>
      <div class="agent-content">
        <p>Ticket #67891 received from XYZ Corp NOC. Reports of 5-8% packet loss occurring every 30-45 minutes across multiple sites connecting to primary data center since 09:15 AM today.</p>
        <div class="agent-transfer">
          <span class="arrow">→</span> Transferring to <strong>MASTER_REASONING_AGENT</strong>
        </div>
      </div>
    </div>
    
    <div class="agent-step completed">
      <div class="agent-header">
        <span class="agent-icon">🧠</span>
        <span class="agent-name">MASTER_REASONING_AGENT</span>
        <span class="status-tag status-success">Complete</span>
      </div>
      <div class="agent-content">
        <p>Analyzing packet loss pattern. Intermittent issues with regular intervals often indicate resource constraints or scheduled processes. Need comprehensive topology and loss pattern data.</p>
        <div class="agent-transfer">
          <span class="arrow">→</span> Requesting network topology from <strong>TOPOLOGY_AGENT</strong>
        </div>
      </div>
    </div>
    
    <div class="agent-step completed">
      <div class="agent-header">
        <span class="agent-icon">🗺️</span>
        <span class="agent-name">TOPOLOGY_AGENT</span>
        <span class="status-tag status-success">Complete</span>
      </div>
      <div class="agent-content">
        <p>Topology mapping complete. XYZ Corp network architecture:</p>
        <ul class="compact-list">
          <li>5 Remote sites connected via MPLS cloud</li>
          <li>Primary data center with redundant WAN routers (DC-RTR-01, DC-RTR-02)</li>
          <li>Core switches (CORE-SW-01, CORE-SW-02) in HSRP configuration</li>
          <li>All affected traffic passes through CORE-SW-01 (active)</li>
        </ul>
        <div class="agent-transfer">
          <span class="arrow">→</span> Reporting back to <strong>MASTER_REASONING_AGENT</strong>
        </div>
      </div>
    </div>
    
    <div class="agent-step completed">
      <div class="agent-header">
        <span class="agent-icon">📊</span>
        <span class="agent-name">TRAFFIC_ANALYSIS_AGENT</span>
        <span class="status-tag status-success">Complete</span>
      </div>
      <div class="agent-content">
        <p>Traffic pattern analysis complete:</p>
        <ul class="compact-list">
          <li>Packet loss observed across all protocols and applications</li>
          <li>Loss occurs simultaneously at all remote sites</li>
          <li>Clear 35-40 minute cycle in packet loss pattern</li>
          <li>Loss events last approximately 3-5 minutes each time</li>
        </ul>
        <div class="finding-summary">
          <span class="finding-tag finding-issue">Periodic Loss Pattern Detected</span>
        </div>
        <div class="agent-transfer">
          <span class="arrow">→</span> Reporting back to <strong>MASTER_REASONING_AGENT</strong>
        </div>
      </div>
    </div>
    
    <div class="agent-step completed highlight-step">
      <div class="agent-header">
        <span class="agent-icon">📈</span>
        <span class="agent-name">RESOURCE_MONITOR_AGENT</span>
        <span class="status-tag status-success">Complete</span>
      </div>
      <div class="agent-content">
        <p>Resource utilization analysis complete. <strong>Critical finding</strong>:</p>
        <ul class="metric-list">
          <li>CORE-SW-01 CPU utilization spikes to <span class="problem-value">98%</span> every 40 minutes</li>
          <li>Spike duration: 3-4 minutes</li>
          <li>Process name: <code>SNMP_BULKWALK</code> consuming CPU during spikes</li>
          <li>Packet drops perfectly correlate with CPU utilization spikes</li>
        </ul>
        <div class="finding-summary">
          <span class="finding-tag finding-critical">Root Cause Identified</span>
        </div>
        <div class="agent-transfer">
          <span class="arrow">→</span> Reporting back to <strong>MASTER_REASONING_AGENT</strong>
        </div>
      </div>
    </div>
    
    <div class="agent-step completed">
      <div class="agent-header">
        <span class="agent-icon">🚨</span>
        <span class="agent-name">ERROR_DETECTION_AGENT</span>
        <span class="status-tag status-success">Complete</span>
      </div>
      <div class="agent-content">
        <p>Error counter analysis complete:</p>
        <ul class="compact-list">
          <li>No input/output errors on interfaces</li>
          <li>Buffer allocation failures detected on CORE-SW-01</li>
          <li>Log entries show "Process not running" errors during high CPU events</li>
        </ul>
        <div class="finding-summary">
          <span class="finding-tag finding-issue">Resource Exhaustion Evidence</span>
        </div>
        <div class="agent-transfer">
          <span class="arrow">→</span> Reporting back to <strong>MASTER_REASONING_AGENT</strong>
        </div>
      </div>
    </div>
    
    <div class="agent-step completed">
      <div class="agent-header">
        <span class="agent-icon">📝</span>
        <span class="agent-name">LCM_AGENT</span>
        <span class="status-tag status-success">Complete</span>
      </div>
      <div class="agent-content">
        <p>Change management analysis complete:</p>
        <ul class="compact-list">
          <li>New monitoring system (SolarWinds) deployed yesterday at 15:30</li>
          <li>SNMP polling interval configured for every 40 minutes</li>
          <li>No other relevant changes in the past 72 hours</li>
        </ul>
        <div class="finding-summary">
          <span class="finding-tag finding-issue">Relevant Change Identified</span>
        </div>
        <div class="agent-transfer">
          <span class="arrow">→</span> Reporting back to <strong>MASTER_REASONING_AGENT</strong>
        </div>
      </div>
    </div>
    
    <div class="agent-step completed">
      <div class="agent-header">
        <span class="agent-icon">🧠</span>
        <span class="agent-name">MASTER_REASONING_AGENT</span>
        <span class="status-tag status-success">Complete</span>
      </div>
      <div class="agent-content">
        <p>Correlating all diagnostic findings to determine root cause:</p>
        <ul class="finding-list">
          <li>Packet loss occurs at regular 40-minute intervals</li>
          <li>CPU utilization on CORE-SW-01 spikes to 98% during loss events</li>
          <li>SNMP_BULKWALK process consuming resources during spikes</li>
          <li>New monitoring system deployed with 40-minute polling interval</li>
        </ul>
        <p>Root cause identified: Aggressive SNMP polling from new monitoring system causing CPU exhaustion on CORE-SW-01, leading to packet drops.</p>
        <div class="agent-transfer">
          <span class="arrow">→</span> Requesting remediation plan from <strong>RECOMMENDATIONS_AGENT</strong>
        </div>
      </div>
    </div>
    
    <div class="agent-step completed">
      <div class="agent-header">
        <span class="agent-icon">📋</span>
        <span class="agent-name">RECOMMENDATIONS_AGENT</span>
        <span class="status-tag status-success">Complete</span>
      </div>
      <div class="agent-content">
        <p>Detailed remediation plan generated:</p>
        <div class="remediation-phase">
          <h5><span class="phase-tag">IMMEDIATE</span> (Within 15 minutes)</h5>
          <ol class="action-list">
            <li>Reduce SNMP polling frequency to every 120 minutes</li>
            <li>Implement rate limiting on SNMP requests</li>
            <li>Temporarily disable non-critical OIDs from collection</li>
          </ol>
        </div>
        <div class="remediation-phase">
          <h5><span class="phase-tag">SHORT-TERM</span> (Within 24 hours)</h5>
          <ol class="action-list">
            <li>Distribute SNMP load across multiple polling cycles</li>
            <li>Configure polling only for essential MIBs</li>
            <li>Implement SNMP process rate limiting on CORE switches</li>
          </ol>
        </div>
        <div class="remediation-phase">
          <h5><span class="phase-tag">LONG-TERM</span> (Within 1 week)</h5>
          <ol class="action-list">
            <li>Redesign monitoring architecture to use distributed collectors</li>
            <li>Implement SNMPv3 with optimization for resource constraints</li>
            <li>Test and validate monitoring impact before full deployment</li>
          </ol>
        </div>
        <div class="agent-transfer">
          <span class="arrow">→</span> Reporting back to <strong>MASTER_REASONING_AGENT</strong>
        </div>
      </div>
    </div>
    
    <div class="agent-step completed">
      <div class="agent-header">
        <span class="agent-icon">🧠</span>
        <span class="agent-name">MASTER_REASONING_AGENT</span>
        <span class="status-tag status-success">Complete</span>
      </div>
      <div class="agent-content">
        <p>Root cause analysis and remediation plan complete. Transferring to IO_AGENT for customer communication.</p>
        <div class="agent-transfer">
          <span class="arrow">→</span> Transferring to <strong>IO_AGENT</strong>
        </div>
      </div>
    </div>
  </div>
  
  <h4 class="section-header">Final Analysis Report</h4>
  
  <div class="table-container">
    <table class="data-table">
      <thead>
        <tr>
          <th>Investigation Component</th>
          <th>Status</th>
          <th>Findings</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Physical Interfaces</td>
          <td><span class="status-tag status-success">Healthy</span></td>
          <td>No physical errors or interface flaps detected</td>
        </tr>
        <tr>
          <td>Traffic Patterns</td>
          <td><span class="status-tag status-warning">Issue Detected</span></td>
          <td>Periodic packet loss occurring every 40 minutes</td>
        </tr>
        <tr>
          <td>Resource Utilization</td>
          <td><span class="status-tag status-error">Critical Issue</span></td>
          <td>CPU spikes to 98% on CORE-SW-01 during loss events</td>
        </tr>
        <tr>
          <td>Error Counters</td>
          <td><span class="status-tag status-warning">Issue Detected</span></td>
          <td>Buffer allocation failures during high CPU events</td>
        </tr>
        <tr>
          <td>Recent Changes</td>
          <td><span class="status-tag status-warning">Relevant Change</span></td>
          <td>New monitoring system deployed with 40-minute polling</td>
        </tr>
      </tbody>
    </table>
  </div>
  
  <div class="rca-container">
    <h4>Root Cause Analysis <span class="confidence-tag">98% Confidence</span></h4>
    <p>The intermittent packet loss occurring on the XYZ Corp network is caused by <strong>aggressive SNMP polling</strong> from the newly deployed SolarWinds monitoring system. Every 40 minutes, the system initiates bulk SNMP walks that cause CPU utilization on CORE-SW-01 to spike to 98% for 3-4 minutes. During these resource exhaustion periods, the switch cannot properly process all packets, resulting in 5-8% packet loss across all connected sites.</p>
    
    <div class="timeline">
      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-content">
          <span class="timeline-time">09:15 AM</span>
          <p>First packet loss event occurs</p>
        </div>
      </div>
      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-content">
          <span class="timeline-time">09:55 AM</span>
          <p>Second packet loss event occurs</p>
        </div>
      </div>
      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-content">
          <span class="timeline-time">10:35 AM</span>
          <p>Third packet loss event occurs</p>
        </div>
      </div>
      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-content">
          <span class="timeline-time">11:15 AM</span>
          <p>Fourth packet loss event occurs</p>
        </div>
      </div>
    </div>
    
    <p>The timing of these events precisely matches the 40-minute SNMP polling interval configured in the monitoring system deployed yesterday. All diagnostic evidence confirms this correlation.</p>
  </div>
  
  <div class="remediation-container">
    <h4>Recommended Actions</h4>
    
    <div class="remediation-phase">
      <h5><span class="phase-tag">IMMEDIATE</span> (Within 15 minutes)</h5>
      <ol class="action-list">
        <li>Reduce SNMP polling frequency to every 120 minutes</li>
        <li>Implement rate limiting on SNMP requests using command:<br>
        <code>snmp-server rate-limit 1</code></li>
        <li>Temporarily disable non-critical OIDs from collection</li>
        <li>Verify resolution by monitoring CPU utilization and packet loss</li>
      </ol>
    </div>
    
    <div class="remediation-phase">
      <h5><span class="phase-tag">SHORT-TERM</span> (Within 24 hours)</h5>
      <ol class="action-list">
        <li>Distribute SNMP load across multiple polling cycles</li>
        <li>Configure polling only for essential MIBs</li>
        <li>Implement SNMP process rate limiting on CORE switches using:<br>
        <code>process cpu threshold type total rising 80 interval 5 falling 20 interval 5</code></li>
        <li>Create CPU monitoring alert for proactive detection</li>
      </ol>
    </div>
    
    <div class="remediation-phase">
      <h5><span class="phase-tag">LONG-TERM</span> (Within 1 week)</h5>
      <ol class="action-list">
        <li>Redesign monitoring architecture to use distributed collectors</li>
        <li>Implement SNMPv3 with optimization for resource constraints</li>
        <li>Test and validate monitoring impact in lab environment before deployment</li>
        <li>Create monitoring design document with best practices for future implementation</li>
      </ol>
    </div>
  </div>
  
  
  <style>
    .root-container {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f9f9f9;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    h3, h4 {
      color: #2c3e50;
      border-bottom: 2px solid #3498db;
      padding-bottom: 10px;
      margin-top: 0;
    }
    
    .agent-workflow {
      margin: 20px 0;
    }
    
    .agent-step {
      margin-bottom: 15px;
      border: 1px solid #e0e0e0;
      border-radius: 6px;
      overflow: hidden;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
      background-color: #ffffff;
    }
    
    .highlight-step {
      border: 2px solid #e74c3c;
      box-shadow: 0 2px 5px rgba(231, 76, 60, 0.2);
    }
    
    .agent-header {
      display: flex;
      align-items: center;
      padding: 10px 15px;
      background-color: #f5f7fa;
      border-bottom: 1px solid #e0e0e0;
    }
    
    .agent-icon {
      font-size: 1.2em;
      margin-right: 8px;
    }
    
    .agent-name {
      font-weight: bold;
      flex-grow: 1;
      color: #34495e;
    }
    
    .agent-content {
      padding: 15px;
    }
    
    .agent-transfer {
      margin-top: 10px;
      color: #7f8c8d;
      font-size: 0.9em;
      font-style: italic;
    }
    
    .multi-transfer {
      display: flex;
      flex-direction: column;
      gap: 5px;
      margin-top: 10px;
    }
    
    .arrow {
      display: inline-block;
      font-weight: bold;
      margin-right: 5px;
      color: #3498db;
    }
    
    .status-tag {
      display: inline-block;
      padding: 3px 8px;
      border-radius: 12px;
      font-size: 0.8em;
      font-weight: bold;
      margin-left: 10px;
    }
    
    .status-success {
      background-color: #d4edda;
      color: #155724;
    }
    
    .status-warning {
      background-color: #fff3cd;
      color: #856404;
    }
    
    .status-error {
      background-color: #f8d7da;
      color: #721c24;
    }
    
    .status-info {
      background-color: #d1ecf1;
      color: #0c5460;
    }
    
    .compact-list {
      margin: 10px 0;
      padding-left: 20px;
    }
    
    .compact-list li {
      margin-bottom: 5px;
    }
    
    .metric-list {
      margin: 10px 0;
      padding-left: 20px;
    }
    
    .normal-value {
      color: #27ae60;
      font-weight: bold;
    }
    
    .problem-value {
      color: #e74c3c;
      font-weight: bold;
    }
    
    .finding-summary {
      margin-top: 10px;
    }
    
    .finding-tag {
      display: inline-block;
      padding: 4px 10px;
      border-radius: 4px;
      font-weight: bold;
      font-size: 0.85em;
    }
    
    .finding-good {
      background-color: #d4edda;
      color: #155724;
    }
    
    .finding-issue {
      background-color: #fff3cd;
      color: #856404;
    }
    
    .finding-critical {
      background-color: #f8d7da;
      color: #721c24;
    }
    
    .change-details {
      background-color: #fef2f2;
      border-left: 3px solid #e74c3c;
      padding: 10px;
      margin: 10px 0;
    }
    
    .completed {
      position: relative;
    }
    
    .completed::after {
      content: "✓";
      position: absolute;
      top: 10px;
      right: 10px;
      width: 20px;
      height: 20px;
      background-color: #2ecc71;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: bold;
    }
    
    .table-container {
      margin: 20px 0;
      overflow-x: auto;
    }
    
    .data-table {
      width: 100%;
      border-collapse: collapse;
    }
    
    .data-table th, .data-table td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #e0e0e0;
    }
    
    .data-table th {
      background-color: #f2f2f2;
      font-weight: 600;
    }
    
    .data-table tr:hover {
      background-color: #f5f5f5;
    }
    
    .section-header {
      margin-top: 25px;
      color: #2c3e50;
      border-left: 4px solid #3498db;
      padding-left: 10px;
    }
    
    .rca-container {
      background-color: #e8f4fd;
      padding: 15px;
      border-radius: 6px;
      margin-bottom: 20px;
    }
    
    .rca-container h4 {
      border: none;
      margin-top: 0;
      padding-bottom: 5px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    
    .confidence-tag {
      background-color: #3498db;
      color: white;
      padding: 2px 8px;
      border-radius: 12px;
      font-size: 0.8em;
    }
    
    .timeline {
      margin: 20px 0;
      position: relative;
    }
    
    .timeline::before {
      content: '';
      position: absolute;
      top: 0;
      left: 15px;
      height: 100%;
      width: 2px;
      background-color: #3498db;
    }
    
    .timeline-item {
      position: relative;
      padding-left: 40px;
      margin-bottom: 15px;
    }
    
    .timeline-dot {
      position: absolute;
      left: 9px;
      top: 5px;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background-color: #3498db;
      border: 2px solid #fff;
    }
    
    .timeline-content {
      padding: 3px 0;
    }
    
    .timeline-time {
      font-weight: bold;
      color: #34495e;
    }
    
    .timeline-content p {
      margin: 2px 0 0 0;
    }
    
    .remediation-container {
      margin-bottom: 20px;
    }
    
    .remediation-phase {
      margin-bottom: 15px;
      padding: 10px;
      border-left: 3px solid #3498db;
      background-color: #f8f9fa;
    }
    
    .phase-tag {
      background-color: #34495e;
      color: white;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 0.8em;
      font-weight: normal;
    }
    
    .action-list {
      margin-top: 8px;
      padding-left: 25px;
    }
    
    .action-list li {
      margin-bottom: 6px;
    }
    
    code {
      background-color: #f1f1f1;
      padding: 2px 4px;
      border-radius: 4px;
      font-family: monospace;
      font-size: 0.9em;
    }
    
    .action-request {
      background-color: #f9f9f9;
      border: 1px solid #e0e0e0;
      padding: 15px;
      border-radius: 6px;
      margin-top: 20px;
    }
    
    .action-buttons {
      display: flex;
      gap: 10px;
      margin-top: 15px;
    }
    
    .action-button {
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      font-weight: bold;
      cursor: pointer;
      transition: background-color 0.2s;
    }
    
    .approve {
      background-color: #2ecc71;
      color: white;
    }
    
    .schedule {
      background-color: #3498db;
      color: white;
    }
    
    .more-info {
      background-color: #95a5a6;
      color: white;
    }
    
    .approve:hover {
      background-color: #27ae60;
    }
    
    .schedule:hover {
      background-color: #2980b9;
    }
    
    .more-info:hover {
      background-color: #7f8c8d;
    }
    
    .finding-list {
      margin: 10px 0;
      padding-left: 20px;
    }
    
    .finding-list li {
      margin-bottom: 6px;
    }
  </style>
</div>`;

// Rich text response for Firewall Configuration
const firewallConfigHTML = `<h3>Firewall Configuration Analysis</h3>
<p><strong>Analyzing your current firewall configuration...</strong></p>

<div class="progress-container">
    <div class="progress-bar">
        <div class="progress-fill" style="width: 100%;"></div>
    </div>
</div>

<p>Analysis complete. <span class="status-tag status-warning">5 Issues Found</span></p>

<p>Found <span class="highlight">23 active rules</span> with <span class="warning">5 potential conflicts</span> in zone policies:</p>

<div class="table-container">
    <table class="data-table">
        <thead>
            <tr>
                <th>Rule #</th>
                <th>Conflict Type</th>
                <th>Severity</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>#17 & #22</td>
                <td>Overlapping address spaces</td>
                <td><span class="status-tag status-critical">Critical</span></td>
            </tr>
            <tr>
                <td>#08 & #15</td>
                <td>Contradicting actions</td>
                <td><span class="status-tag status-warning">Medium</span></td>
            </tr>
            <tr>
                <td>#31</td>
                <td>Overly permissive</td>
                <td><span class="status-tag status-warning">Medium</span></td>
            </tr>
        </tbody>
    </table>
</div>

<p>Security posture assessment:</p>
<ul>
    <li><span class="warning">Detected 3 overly permissive rules</span> that could be tightened for improved security</li>
    <li>Rule #31 allows <span class="highlight">ALL traffic from DMZ to Internal</span> without inspection</li>
    <li>Rules #12-14 could be consolidated into a single rule for better management</li>
</ul>

<p><strong class="success">Recommendation:</strong> Consider implementing a zero-trust approach with more granular access controls and implement the following changes:</p>
<ul>
    <li>Modify rule #17 to exclude the subnet covered by rule #22</li>
    <li>Enable application-layer inspection for DMZ traffic</li>
    <li>Implement time-based access controls for administrative protocols</li>
</ul>`;

// Rich text response for Network Latency Analysis
const networkLatencyHTML = `<h3>Network Latency Analysis Report</h3>
<p><strong>Running network latency analysis across all monitored segments...</strong></p>

<div class="progress-container">
    <div class="progress-bar">
        <div class="progress-fill" style="width: 100%;"></div>
    </div>
</div>

<p>Analysis complete. <span class="status-tag status-critical">Critical Issue Detected</span></p>

<p>Detected <span class="warning">abnormal latency spikes</span> between HQ and East Branch office occurring daily at <span class="highlight">14:00-15:30</span>:</p>

<div class="chart-container">
    <div class="chart-bar" style="height: 30px; left: 10px;"></div>
    <div class="chart-label" style="left: 10px;">9:00</div>
    <div class="chart-bar" style="height: 25px; left: 44px;"></div>
    <div class="chart-label" style="left: 44px;">10:00</div>
    <div class="chart-bar" style="height: 40px; left: 78px;"></div>
    <div class="chart-label" style="left: 78px;">11:00</div>
    <div class="chart-bar" style="height: 45px; left: 112px;"></div>
    <div class="chart-label" style="left: 112px;">12:00</div>
    <div class="chart-bar" style="height: 50px; left: 146px;"></div>
    <div class="chart-label" style="left: 146px;">13:00</div>
    <div class="chart-bar" style="height: 110px; left: 180px; background-color: #d32f2f;"></div>
    <div class="chart-label" style="left: 180px;">14:00</div>
    <div class="chart-bar" style="height: 100px; left: 214px; background-color: #d32f2f;"></div>
    <div class="chart-label" style="left: 214px;">15:00</div>
    <div class="chart-bar" style="height: 40px; left: 248px;"></div>
    <div class="chart-label" style="left: 248px;">16:00</div>
    <div class="chart-bar" style="height: 30px; left: 282px;"></div>
    <div class="chart-label" style="left: 282px;">17:00</div>
</div>

<p>Performance metrics during issue periods:</p>
<ul>
    <li>Average latency increased from <span class="success">45ms</span> to <span class="warning">320ms</span></li>
    <li>Packet loss rate: <span class="highlight">2.7%</span></li>
    <li>Jitter: <span class="highlight">18ms</span></li>
</ul>

<p>Root cause analysis:</p>
<ul>
    <li>Scheduled backup processes consuming <span class="warning">87% of available bandwidth</span></li>
    <li>QoS policies not applied to backup traffic</li>
    <li>Recommend implementing bandwidth management and scheduling backups during off-peak hours</li>
</ul>`;

// Rich text response for Router Troubleshooting
const routerTroubleshootingHTML = `<h3>Router Troubleshooting Analysis</h3>
<p><strong>Investigating router BR-RTR-03 performance issues...</strong></p>

<div class="progress-container">
    <div class="progress-bar">
        <div class="progress-fill" style="width: 100%;"></div>
    </div>
</div>

<p>Diagnostic complete. <span class="status-tag status-error">Critical Issues Found</span></p>

<p>Device status: <span class="warning">BR-RTR-03</span> experiencing severe performance degradation</p>

<div class="table-container">
    <table class="data-table">
        <thead>
            <tr>
                <th>Component</th>
                <th>Status</th>
                <th>Details</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>CPU Utilization</td>
                <td><span class="status-tag status-error">Critical</span></td>
                <td>94% average (process: BGP Scanner)</td>
            </tr>
            <tr>
                <td>Memory Usage</td>
                <td><span class="status-tag status-warning">High</span></td>
                <td>82% utilized, fragmentation detected</td>
            </tr>
            <tr>
                <td>Interface Errors</td>
                <td><span class="status-tag status-warning">Increasing</span></td>
                <td>Input errors on Gi0/0/1 - 234 CRC errors</td>
            </tr>
            <tr>
                <td>Routing Table</td>
                <td><span class="status-tag status-error">Unstable</span></td>
                <td>Excessive route flapping detected</td>
            </tr>
        </tbody>
    </table>
</div>

<p>Root cause findings:</p>
<ul>
    <li>BGP receiving <span class="warning">full internet routing table</span> without proper filtering</li>
    <li>Physical layer issues on uplink causing CRC errors</li>
    <li>Memory leak in IOS version 15.2(4)M3 - known bug CSCvd12345</li>
</ul>

<p><strong>Immediate actions required:</strong></p>
<ol>
    <li>Implement BGP prefix filtering to accept only necessary routes</li>
    <li>Replace cable on Gi0/0/1 interface</li>
    <li>Schedule IOS upgrade to recommended version 15.6(3)M5</li>
    <li>Clear BGP sessions and monitor for stability</li>
</ol>`;

// Rich text response for Application Performance RCA (default)
const defaultResponseHTML = `<div class="root-container">
  <h3>Agentic AI - Application Performance Root Cause Analysis</h3>
  <p><strong>Analyzing Performance Degradation for Cloud-Native Banking Application</strong></p>
  
  <div class="agent-workflow">
    <div class="agent-step completed">
      <div class="agent-header">
        <span class="agent-icon">⚙️</span>
        <span class="agent-name">IO_AGENT</span>
        <span class="status-tag status-success">Complete</span>
      </div>
      <div class="agent-content">
        <p>Performance degradation alert received. Users reporting 5-10 second delays in transaction processing since 08:30 AM. Normal response time: <200ms.</p>
        <div class="agent-transfer">
          <span class="arrow">→</span> Transferring to <strong>MASTER_REASONING_AGENT</strong>
        </div>
      </div>
    </div>
    
    <div class="agent-step completed">
      <div class="agent-header">
        <span class="agent-icon">🧠</span>
        <span class="agent-name">MASTER_REASONING_AGENT</span>
        <span class="status-tag status-success">Complete</span>
      </div>
      <div class="agent-content">
        <p>Initiating comprehensive performance analysis. Sudden degradation suggests infrastructure or code deployment issue. Dispatching specialized agents for parallel investigation.</p>
        <div class="multi-transfer">
          <span class="arrow">→</span> Dispatching <strong>APM_AGENT</strong> for application metrics
          <span class="arrow">→</span> Dispatching <strong>INFRASTRUCTURE_AGENT</strong> for system resources
          <span class="arrow">→</span> Dispatching <strong>DATABASE_AGENT</strong> for query performance
        </div>
      </div>
    </div>
    
    <div class="agent-step completed">
      <div class="agent-header">
        <span class="agent-icon">📊</span>
        <span class="agent-name">APM_AGENT</span>
        <span class="status-tag status-success">Complete</span>
      </div>
      <div class="agent-content">
        <p>Application Performance Monitoring analysis complete:</p>
        <ul class="metric-list">
          <li>API response time: <span class="problem-value">8.2 seconds</span> (baseline: 180ms)</li>
          <li>Error rate: <span class="normal-value">0.02%</span> (normal)</li>
          <li>Throughput: <span class="normal-value">1,250 req/min</span> (normal)</li>
          <li>Bottleneck identified in <code>PaymentService.processTransaction()</code></li>
        </ul>
        <div class="finding-summary">
          <span class="finding-tag finding-critical">Service Latency Detected</span>
        </div>
        <div class="agent-transfer">
          <span class="arrow">→</span> Reporting back to <strong>MASTER_REASONING_AGENT</strong>
        </div>
      </div>
    </div>
    
    <div class="agent-step completed">
      <div class="agent-header">
        <span class="agent-icon">🖥️</span>
        <span class="agent-name">INFRASTRUCTURE_AGENT</span>
        <span class="status-tag status-success">Complete</span>
      </div>
      <div class="agent-content">
        <p>Infrastructure health check results:</p>
        <ul class="metric-list">
          <li>CPU utilization: <span class="normal-value">42%</span> across cluster</li>
          <li>Memory usage: <span class="normal-value">68%</span> average</li>
          <li>Network latency: <span class="normal-value"><1ms</span> between services</li>
          <li>Disk I/O: <span class="normal-value">Normal</span> patterns</li>
        </ul>
        <div class="finding-summary">
          <span class="finding-tag finding-good">Infrastructure Healthy</span>
        </div>
        <div class="agent-transfer">
          <span class="arrow">→</span> Reporting back to <strong>MASTER_REASONING_AGENT</strong>
        </div>
      </div>
    </div>
    
    <div class="agent-step completed highlight-step">
      <div class="agent-header">
        <span class="agent-icon">🗄️</span>
        <span class="agent-name">DATABASE_AGENT</span>
        <span class="status-tag status-success">Complete</span>
      </div>
      <div class="agent-content">
        <p>Database performance analysis reveals critical issues:</p>
        <ul class="metric-list">
          <li>Query execution time: <span class="problem-value">7.8 seconds</span> for transaction lookup</li>
          <li>Active connections: <span class="problem-value">298/300</span> (connection pool near exhaustion)</li>
          <li>Lock wait time: <span class="problem-value">4.2 seconds average</span></li>
          <li>Missing index on <code>transactions.customer_id</code> column</li>
        </ul>
        <div class="finding-summary">
          <span class="finding-tag finding-critical">Database Bottleneck Identified</span>
        </div>
        <div class="agent-transfer">
          <span class="arrow">→</span> Reporting back to <strong>MASTER_REASONING_AGENT</strong>
        </div>
      </div>
    </div>
    
    <div class="agent-step completed">
      <div class="agent-header">
        <span class="agent-icon">📝</span>
        <span class="agent-name">CHANGE_ANALYSIS_AGENT</span>
        <span class="status-tag status-success">Complete</span>
      </div>
      <div class="agent-content">
        <p>Recent change analysis:</p>
        <div class="change-details">
          <p><strong>07:45 AM</strong> - Database migration completed</p>
          <ul>
            <li>Added 2.5M historical transaction records</li>
            <li>Table <code>transactions</code> grew from 5M to 7.5M rows</li>
            <li>No index optimization performed post-migration</li>
          </ul>
        </div>
        <div class="agent-transfer">
          <span class="arrow">→</span> Reporting back to <strong>MASTER_REASONING_AGENT</strong>
        </div>
      </div>
    </div>
    
    <div class="agent-step completed">
      <div class="agent-header">
        <span class="agent-icon">🧠</span>
        <span class="agent-name">MASTER_REASONING_AGENT</span>
        <span class="status-tag status-success">Complete</span>
      </div>
      <div class="agent-content">
        <p>Root cause identified: Database performance degradation due to missing index after large data migration. The PaymentService queries are performing full table scans on 7.5M records.</p>
        <div class="agent-transfer">
          <span class="arrow">→</span> Requesting remediation plan from <strong>REMEDIATION_AGENT</strong>
        </div>
      </div>
    </div>
    
    <div class="agent-step completed">
      <div class="agent-header">
        <span class="agent-icon">🔧</span>
        <span class="agent-name">REMEDIATION_AGENT</span>
        <span class="status-tag status-success">Complete</span>
      </div>
      <div class="agent-content">
        <p>Remediation plan prepared:</p>
        <ol class="action-list">
          <li><strong>Immediate:</strong> Create index on <code>transactions.customer_id</code>
            <br><code>CREATE INDEX idx_customer_id ON transactions(customer_id);</code></li>
          <li><strong>Immediate:</strong> Increase connection pool size temporarily to 400</li>
          <li><strong>Short-term:</strong> Analyze and optimize other slow queries</li>
          <li><strong>Long-term:</strong> Implement database partitioning for transactions table</li>
        </ol>
        <p>Estimated resolution time: <strong>15 minutes</strong> after index creation</p>
        <div class="agent-transfer">
          <span class="arrow">→</span> Transferring to <strong>IO_AGENT</strong> for execution approval
        </div>
      </div>
    </div>
  </div>
  
  <h4 class="section-header">Performance Impact Summary</h4>
  
  <div class="table-container">
    <table class="data-table">
      <thead>
        <tr>
          <th>Metric</th>
          <th>Current</th>
          <th>Expected After Fix</th>
          <th>Target SLA</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>API Response Time</td>
          <td><span class="problem-value">8.2s</span></td>
          <td><span class="normal-value">180ms</span></td>
          <td>< 200ms</td>
        </tr>
        <tr>
          <td>Database Query Time</td>
          <td><span class="problem-value">7.8s</span></td>
          <td><span class="normal-value">15ms</span></td>
          <td>< 50ms</td>
        </tr>
        <tr>
          <td>User Experience Score</td>
          <td><span class="problem-value">12%</span></td>
          <td><span class="normal-value">98%</span></td>
          <td>> 95%</td>
        </tr>
      </tbody>
    </table>
  </div>
  
  <div class="action-request">
    <p><strong>Action Required:</strong> Database index creation will be performed during live operations. Expected brief lock during index build (~2-3 minutes).</p>
    <div class="action-buttons">
      <button class="action-button approve">Execute Remediation</button>
      <button class="action-button schedule">Schedule for Maintenance Window</button>
      <button class="action-button more-info">Request More Analysis</button>
    </div>
  </div>
</div>`;