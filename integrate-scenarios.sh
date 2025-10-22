#!/bin/bash

# Script to integrate v6-FULL scenario content into v5 master file
# This will replace the old scenario content with new 100% compliant versions

echo "🔄 NOC Scenarios Integration Script"
echo "====================================="
echo ""
echo "This script will integrate v6-FULL scenarios into the v5 master file"
echo "while preserving the UI, animations, and typing effects."
echo ""

# Function to read scenario file content
read_scenario_content() {
    local scenario_file=$1
    if [ -f "$scenario_file" ]; then
        # Read the entire file content and escape for JavaScript
        cat "$scenario_file"
    else
        echo "Error: File $scenario_file not found" >&2
        return 1
    fi
}

# List available scenarios
echo "📋 Available v6-FULL Scenarios:"
echo ""
for i in {1..8}; do
    file=$(ls scenario-${i}-*-v6-FULL.html 2>/dev/null | head -1)
    if [ -n "$file" ]; then
        echo "  ✅ Scenario $i: $file"
    else
        echo "  ⏳ Scenario $i: Not found"
    fi
done
echo ""

# Create backup
echo "📦 Creating backup of v5 master file..."
cp Cisco-AI-NoC-Telco-v5.html Cisco-AI-NoC-Telco-v5-backup-$(date +%Y%m%d-%H%M%S).html
echo "  ✅ Backup created"
echo ""

echo "⚠️  MANUAL INTEGRATION REQUIRED"
echo ""
echo "Due to the complexity of JavaScript escaping and the scenario data structure,"
echo "we need to integrate the scenarios manually or create a new v7 file."
echo ""
echo "Options:"
echo ""
echo "1. Manual Integration (Recommended for testing):"
echo "   - Open Cisco-AI-NoC-Telco-v5.html"
echo "   - Find the 'packet-loss' scenario at line ~934"
echo "   - Replace the responses array content with scenario-1 content"
echo "   - Repeat for other scenarios"
echo ""
echo "2. Automated v7 Creation (Recommended for production):"
echo "   - Create new Cisco-AI-NoC-Telco-v7.html"
echo "   - Copy v5 structure (navbar, sidebar, animations, functions)"
echo "   - Replace all scenario responses with v6-FULL content"
echo "   - Add new scenarios 6-8"
echo ""
echo "Would you like me to create the v7 file? (This is the recommended approach)"
echo ""
