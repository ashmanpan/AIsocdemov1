#!/usr/bin/env python3
"""
Script to integrate v6-FULL scenarios into v7 master file
Preserves v5 UI/animations while updating content to v6-FULL
"""

import re
import json

# Scenario mapping - Updated with correct keys from v7
scenarios = {
    'packet-loss': {
        'file': 'scenario-1-packet-loss-v6-FULL.html',
        'title': 'AI-Driven Packet Loss Investigation',
        'icon': '📊',
        'description': 'Complete 25-step workflow for packet loss investigation with KG, RAG, and 6 agents'
    },
    'firewall-config': {
        'file': 'scenario-2-firewall-config-v6-FULL.html',
        'title': 'Firewall Configuration Analysis',
        'icon': '🔥',
        'description': 'ACL analysis and packet-tracer validation with deployment verification'
    },
    'network-latency': {
        'file': 'scenario-3-network-latency-v6-FULL.html',
        'title': 'Network Latency Investigation',
        'icon': '🐌',
        'description': 'QoS policy analysis and WAN link optimization (96% improvement)'
    },
    'router-troubleshooting': {
        'file': 'scenario-4-router-troubleshooting-v6-FULL.html',
        'title': 'Router Troubleshooting',
        'icon': '🔧',
        'description': 'BGP flapping root cause - SFP diagnostics and hardware replacement'
    },
    'app-performance': {
        'file': 'scenario-5-app-performance-v6-FULL.html',
        'title': 'Application Performance RCA',
        'icon': '📈',
        'description': 'LCM integration with historical performance analysis (81% faster)'
    },
    'capacity-planning': {
        'file': 'scenario-6-capacity-planning-v6-FULL.html',
        'title': 'Proactive Capacity Planning',
        'icon': '📊',
        'description': 'Traffic forecast and resource planning with utilization analysis'
    },
    'sdwan-optimization': {
        'file': 'scenario-7-sdwan-optimization-v6-FULL.html',
        'title': 'SD-WAN Path Optimization',
        'icon': '🌐',
        'description': 'Viptela SD-WAN path selection and application performance optimization'
    },
    'security-breach': {
        'file': 'scenario-8-security-breach-v6-FULL.html',
        'title': 'Security Breach Investigation',
        'icon': '🔒',
        'description': 'Threat detection, forensics analysis, and security remediation workflow'
    }
}

def read_scenario_content(filename):
    """Read v6-FULL scenario content"""
    try:
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
            # Remove any leading/trailing whitespace
            content = content.strip()
            return content
    except FileNotFoundError:
        print(f"Warning: {filename} not found")
        return None

def escape_for_js_template(content):
    """Escape content for JavaScript template literal"""
    # Replace backticks with escaped version
    content = content.replace('`', '\\`')
    # Replace ${} with escaped version
    content = content.replace('${', '\\${')
    return content

def integrate_scenario(v7_lines, scenario_key, scenario_info):
    """Replace old scenario content with new v6-FULL content"""
    print(f"\n🔄 Integrating {scenario_key}...")

    # Read new content
    new_content = read_scenario_content(scenario_info['file'])
    if not new_content:
        print(f"  ❌ Skipping {scenario_key} - file not found")
        return v7_lines

    # Escape for JavaScript
    escaped_content = escape_for_js_template(new_content)

    # Find the scenario definition
    start_pattern = f"'{scenario_key}':"
    responses_pattern = "responses: ["

    # Find start of scenario
    start_idx = None
    for i, line in enumerate(v7_lines):
        if start_pattern in line:
            start_idx = i
            break

    if start_idx is None:
        print(f"  ❌ Could not find scenario '{scenario_key}'")
        return v7_lines

    # Find responses array start
    responses_idx = None
    for i in range(start_idx, min(start_idx + 10, len(v7_lines))):
        if responses_pattern in v7_lines[i]:
            responses_idx = i
            break

    if responses_idx is None:
        print(f"  ❌ Could not find responses array for '{scenario_key}'")
        return v7_lines

    # Find the end of this scenario (next },)
    end_idx = None
    for i in range(responses_idx, len(v7_lines)):
        if v7_lines[i].strip() == '},':
            # Check if this is scenario end (not nested)
            indent_count = len(v7_lines[i]) - len(v7_lines[i].lstrip())
            if indent_count <= 12:  # Top-level scenario end
                end_idx = i
                break

    if end_idx is None:
        print(f"  ❌ Could not find end of scenario '{scenario_key}'")
        return v7_lines

    # Create new scenario block
    new_scenario_lines = []
    new_scenario_lines.append(f"            '{scenario_key}': {{\n")
    new_scenario_lines.append(f"                title: '{scenario_info['title']}',\n")
    new_scenario_lines.append(f"                icon: '{scenario_info['icon']}',\n")
    new_scenario_lines.append(f"                description: '{scenario_info['description']}',\n")
    new_scenario_lines.append(f"                initialQuery: 'Show {scenario_info['title']}',\n")
    new_scenario_lines.append(f"                responses: [\n")
    new_scenario_lines.append(f"                    `{escaped_content}`\n")
    new_scenario_lines.append(f"                ]\n")
    new_scenario_lines.append(f"            }},\n")

    # Replace old with new
    result = v7_lines[:start_idx] + new_scenario_lines + v7_lines[end_idx + 1:]

    print(f"  ✅ Integrated {scenario_key} ({len(escaped_content)} chars)")
    return result

def main():
    print("🚀 v7 Integration Script")
    print("=" * 50)

    # Read v7 file
    print("\n📖 Reading Cisco-AI-NoC-Telco-v7.html...")
    with open('Cisco-AI-NoC-Telco-v7.html', 'r', encoding='utf-8') as f:
        v7_lines = f.readlines()
    print(f"  ✅ Read {len(v7_lines)} lines")

    # Integrate each scenario
    for scenario_key, scenario_info in scenarios.items():
        v7_lines = integrate_scenario(v7_lines, scenario_key, scenario_info)

    # Write updated v7 file
    print("\n💾 Writing updated v7 file...")
    with open('Cisco-AI-NoC-Telco-v7.html', 'w', encoding='utf-8') as f:
        f.writelines(v7_lines)
    print("  ✅ File written successfully")

    print("\n✅ Integration complete!")
    print("\n📝 Next steps:")
    print("  1. Open Cisco-AI-NoC-Telco-v7.html in browser")
    print("  2. Test each scenario for animations and content")
    print("  3. Commit to v7-integration branch")
    print("  4. Merge to main when ready")

if __name__ == '__main__':
    main()
