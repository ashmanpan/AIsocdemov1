#!/usr/bin/env python3
"""Fix v7 titles and descriptions - make them cleaner"""

# Read the file
with open('Cisco-AI-NoC-Telco-v7.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix scenario descriptions
replacements = [
    # Packet Loss
    ("description: 'Complete 25-step workflow for packet loss investigation with KG, RAG, and 6 agents'",
     "description: 'Investigating intermittent packet loss on telco core network'"),
    ("title: 'AI-Driven Packet Loss Investigation'",
     "title: 'Packet Loss Investigation'"),
    ("<!-- SCENARIO 1: PACKET LOSS INVESTIGATION - v6 FULL COMPLIANCE -->",
     "<!-- SCENARIO 1: PACKET LOSS INVESTIGATION -->"),

    # Firewall
    ("description: 'ACL analysis and packet-tracer validation with deployment verification'",
     "description: 'Analyzing firewall ACL rules and traffic flow issues'"),
    ("title: 'Firewall Configuration Analysis'",
     "title: 'Firewall Configuration'"),

    # Latency
    ("description: 'QoS policy analysis and WAN link optimization (96% improvement)'",
     "description: 'Investigating high latency across WAN links'"),
    ("title: 'Network Latency Investigation'",
     "title: 'Network Latency'"),

    # Router
    ("description: 'BGP flapping root cause - SFP diagnostics and hardware replacement'",
     "description: 'BGP session flapping and connectivity issues'"),

    # App Performance
    ("description: 'LCM integration with historical performance analysis (81% faster)'",
     "description: 'Root cause analysis for slow application response times'"),
    ("title: 'Application Performance RCA'",
     "title: 'Application Performance'"),

    # Capacity Planning
    ("description: 'Traffic forecast and resource planning with utilization analysis'",
     "description: 'Proactive network capacity and growth planning'"),
    ("title: 'Proactive Capacity Planning'",
     "title: 'Capacity Planning'"),

    # SD-WAN
    ("description: 'Viptela SD-WAN path selection and application performance optimization'",
     "description: 'Optimizing SD-WAN path selection and performance'"),
    ("title: 'SD-WAN Path Optimization'",
     "title: 'SD-WAN Optimization'"),

    # Security
    ("description: 'Threat detection, forensics analysis, and security remediation workflow'",
     "description: 'Detecting and responding to network security incidents'"),
    ("title: 'Security Breach Investigation'",
     "title: 'Security Breach'"),
]

# Apply all replacements
for old, new in replacements:
    content = content.replace(old, new)

# Remove v6 comments from scenario content
content = content.replace('<!-- This is the complete 25-step workflow implementation -->', '')
content = content.replace('- v6 FULL COMPLIANCE', '')

# Fix the heading at the start of each scenario content
content = content.replace('<h3>Agentic AI - Packet Loss Investigation v6</h3>',
                         '<h3>Packet Loss Investigation</h3>')
content = content.replace('v6-FULL', '')
content = content.replace('v6 FULL', '')
content = content.replace('V6-FULL', '')
content = content.replace('V6 FULL', '')

# Write back
with open('Cisco-AI-NoC-Telco-v7.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ Fixed v7 titles and descriptions")
print("   - Removed long technical descriptions")
print("   - Removed 'v6' references")
print("   - Cleaned up scenario titles")
print("   - Made descriptions user-friendly")
