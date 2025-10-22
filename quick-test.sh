#!/bin/bash

# Quick Test Script for NOC Scenarios
# Usage: ./quick-test.sh [scenario_number]

echo "🧪 NOC Scenarios Quick Test Script"
echo "===================================="
echo ""

# If scenario number provided, test that specific scenario
if [ "$1" ]; then
    scenario_num=$1
    echo "Testing Scenario $scenario_num..."

    # Find the scenario file
    file=$(ls scenario-${scenario_num}-*-v6-FULL.html 2>/dev/null | head -1)

    if [ -z "$file" ]; then
        echo "❌ Scenario $scenario_num not found"
        exit 1
    fi

    echo "✓ Found: $file"
    echo "  Size: $(du -h "$file" | cut -f1)"
    echo "  Lines: $(wc -l < "$file")"
    echo ""

    # Check for key components
    echo "Checking components..."
    grep -q "IO_AGENT" "$file" && echo "  ✓ IO_AGENT present" || echo "  ✗ IO_AGENT missing"
    grep -q "Knowledge Graph" "$file" && echo "  ✓ Knowledge Graph present" || echo "  ✗ KG missing"
    grep -q "RAG Query" "$file" && echo "  ✓ RAG queries present" || echo "  ✗ RAG missing"
    grep -q "DEPLOYMENT_AGENT" "$file" && echo "  ✓ DEPLOYMENT_AGENT present" || echo "  ✗ DEPLOYMENT_AGENT missing"
    grep -q "VERIFICATION_AGENT" "$file" && echo "  ✓ VERIFICATION_AGENT present" || echo "  ✗ VERIFICATION_AGENT missing"

    # Count steps
    step_count=$(grep -o "Step [0-9]\+:" "$file" | wc -l)
    echo "  ℹ Steps found: $step_count/25"

    echo ""
    echo "Opening scenario in browser..."

    # Open in browser (Windows WSL)
    if command -v explorer.exe &> /dev/null; then
        explorer.exe "$file"
    # Open in browser (Linux)
    elif command -v xdg-open &> /dev/null; then
        xdg-open "$file"
    # Open in browser (Mac)
    elif command -v open &> /dev/null; then
        open "$file"
    else
        echo "⚠ Could not detect browser command"
        echo "Please open manually: $file"
    fi

    exit 0
fi

# No scenario number provided, show all scenarios
echo "Available Scenarios:"
echo ""

for i in {1..13}; do
    file=$(ls scenario-${i}-*-v6-FULL.html 2>/dev/null | head -1)

    if [ -n "$file" ]; then
        size=$(du -h "$file" | cut -f1)
        lines=$(wc -l < "$file")
        echo "✓ Scenario $i: $(basename "$file" | sed 's/scenario-[0-9]*-//' | sed 's/-v6-FULL.html//')"
        echo "  File: $file"
        echo "  Size: $size | Lines: $lines"
    else
        echo "⏳ Scenario $i: Not yet completed"
    fi
    echo ""
done

echo "===================================="
echo ""
echo "Usage:"
echo "  ./quick-test.sh           - Show all scenarios"
echo "  ./quick-test.sh 1         - Test specific scenario"
echo "  ./quick-test.sh 2         - Test scenario 2"
echo ""
echo "Or open the testing dashboard:"
echo "  test-scenarios.html"
echo ""
