# NOC Scenarios Testing Guide

## Quick Start - How to Test NOC Scenarios

### Method 1: Direct File Access (Easiest)

Simply open any scenario file directly in your browser:

```bash
# From your project directory:
cd /home/kpanse/wsl-myprojects/Agentic-AI-demos

# Open any scenario in your default browser (Windows)
explorer.exe scenario-1-packet-loss-v6-FULL.html
explorer.exe scenario-2-firewall-config-v6-FULL.html
explorer.exe scenario-3-network-latency-v6-FULL.html
# ... etc
```

Or use the testing page: `test-scenarios.html`

---

## Available Scenarios (8 Complete)

### ✅ Completed Scenarios

| # | Scenario | File | Ticket ID | Size |
|---|----------|------|-----------|------|
| 1 | Packet Loss Investigation | `scenario-1-packet-loss-v6-FULL.html` | #67891 | 83KB |
| 2 | Firewall Configuration | `scenario-2-firewall-config-v6-FULL.html` | #FW-8823 | 81KB |
| 3 | Network Latency | `scenario-3-network-latency-v6-FULL.html` | #LAT-6734 | 89KB |
| 4 | Router Troubleshooting | `scenario-4-router-troubleshooting-v6-FULL.html` | #RTR-5512 | 80KB |
| 5 | App Performance RCA | `scenario-5-app-performance-v6-FULL.html` | #45782 | 86KB |
| 6 | Capacity Planning | `scenario-6-capacity-planning-v6-FULL.html` | #CAP-8891 | 92KB |
| 7 | SD-WAN Optimization | `scenario-7-sdwan-optimization-v6-FULL.html` | #SDWAN-7234 | 86KB |
| 8 | Security Breach | `scenario-8-security-breach-v6-FULL.html` | TBD | 85KB |

---

## What to Test in Each Scenario

### 1. Visual/UI Testing

Check that all sections render properly:
- ✅ Header with ticket ID and title
- ✅ Step numbers (1-25) are sequential
- ✅ Color-coded sections:
  - 🟦 Blue question blocks (IO_AGENT)
  - 🟩 Green success/completion messages
  - 🟨 Yellow warning/analysis sections
  - 🟥 Red problem identification
- ✅ Tables render correctly (Knowledge Graph, RAG results, etc.)
- ✅ Agent cards with icons
- ✅ Code blocks with syntax highlighting
- ✅ Timeline/workflow progression

### 2. Content Validation

Verify that each scenario includes:

#### Phase 1: Initial Interaction
- [ ] **Step 1-2:** IO_AGENT asks 5 clarifying questions
- [ ] **Step 3:** User provides answers with realistic details

#### Phase 2: Knowledge Gathering
- [ ] **Step 4-6:** MRA queries Knowledge Graph (device topology, configs)
- [ ] **Step 7-8:** MRA performs RAG queries (historical tickets)
- [ ] **Step 9:** Three-source analysis (Problem + KG + RAG)

#### Phase 3: Agent Deployment
- [ ] **Step 10:** MRA creates and deploys 6 specialized agents
- [ ] **Step 11:** Agent count explicitly shown (e.g., "6 agents deployed")
- [ ] Each agent has:
  - Name and icon
  - Specific task assignment
  - MCP server queries (NETCONF, SNMP, CLI, etc.)
  - Working/Not Working lists

#### Phase 4: Investigation
- [ ] **Step 12-14:** Agents perform analysis
- [ ] **Step 15-17:** Inter-agent collaboration (5+ exchanges)
- [ ] Realistic technical details:
  - Device names (e.g., RTR-CORE-01)
  - IP addresses (e.g., 10.20.30.40)
  - Interface names (e.g., GigabitEthernet0/0/1)
  - Protocol states (BGP, OSPF, HSRP, etc.)
  - Error messages and logs

#### Phase 5: Root Cause Analysis
- [ ] **Step 18-19:** MRA correlation analysis
- [ ] Symptom vs. Cause table
- [ ] Timeline correlation
- [ ] Evidence compilation
- [ ] **Step 20:** Clear root cause identified

#### Phase 6: Resolution
- [ ] **Step 21:** DEPLOYMENT_AGENT requests user permission
- [ ] **Step 22:** User approves deployment
- [ ] **Step 23:** Config changes applied (show actual commands)
- [ ] **Step 24:** VERIFICATION_AGENT validates fix
- [ ] Before/After metrics shown
- [ ] **Step 25:** Final report and ticket closure

### 3. Technical Accuracy Testing

Verify realistic technical details:

#### Network Details
- [ ] Valid device naming conventions
- [ ] Realistic IP addressing schemes
- [ ] Proper interface naming (Cisco format)
- [ ] Valid VLAN IDs, AS numbers, etc.

#### Commands & Outputs
- [ ] Commands are actual Cisco IOS/IOS-XE commands
- [ ] Outputs match expected format
- [ ] Error messages are realistic
- [ ] Log formats are accurate

#### Protocols & Technologies
- [ ] Protocol states are accurate (UP/DOWN)
- [ ] Metrics are reasonable (latency, throughput, etc.)
- [ ] Configuration snippets are valid
- [ ] Troubleshooting steps follow best practices

### 4. Workflow Compliance Testing

Use the validation checklist (42 items):

```bash
# Run validation script for a scenario
./scenario-1-checklist-validation.sh scenario-1-packet-loss-v6-FULL.html
```

Expected output: **42/42 items present (100%)**

---

## Testing Checklist per Scenario

Use this checklist when testing each scenario:

### Visual Quality (10 points)
- [ ] 1. Page loads without errors
- [ ] 2. All CSS styles applied correctly
- [ ] 3. Colors and formatting are consistent
- [ ] 4. Tables are properly aligned
- [ ] 5. Code blocks are readable
- [ ] 6. Icons display correctly
- [ ] 7. Question blocks are highlighted
- [ ] 8. Agent cards render properly
- [ ] 9. Timeline flows logically
- [ ] 10. Footer/completion message present

### Content Completeness (15 points)
- [ ] 11. All 25 steps are present
- [ ] 12. IO_AGENT asks 5 questions
- [ ] 13. Knowledge Graph queries shown (3+)
- [ ] 14. RAG queries shown (3+ historical tickets)
- [ ] 15. Three-source analysis present
- [ ] 16. 6 specialized agents deployed
- [ ] 17. Agent count explicitly mentioned
- [ ] 18. Each agent has task assignment
- [ ] 19. MCP queries shown (5+ instances)
- [ ] 20. Working/Not Working lists present
- [ ] 21. Inter-agent collaboration (5+ exchanges)
- [ ] 22. Symptom vs. Cause table
- [ ] 23. Root cause clearly identified
- [ ] 24. Deployment with permission
- [ ] 25. Verification with metrics

### Technical Accuracy (10 points)
- [ ] 26. Device names are realistic
- [ ] 27. IP addresses are valid
- [ ] 28. Commands are accurate
- [ ] 29. Outputs match commands
- [ ] 30. Protocol details correct
- [ ] 31. Error messages realistic
- [ ] 32. Configurations valid
- [ ] 33. Metrics are reasonable
- [ ] 34. Timestamps are consistent
- [ ] 35. Ticket IDs match scenario

### Workflow Logic (7 points)
- [ ] 36. Steps flow logically
- [ ] 37. Information builds progressively
- [ ] 38. Agents collaborate meaningfully
- [ ] 39. Root cause follows from evidence
- [ ] 40. Fix addresses root cause
- [ ] 41. Verification confirms fix
- [ ] 42. Resolution closes all issues

**Score:** ___/42 (Target: 42/42 = 100%)

---

## Common Issues to Check

### 1. Missing Components
- ❌ No IO_AGENT questions
- ❌ No Knowledge Graph queries
- ❌ No RAG historical tickets
- ❌ Fewer than 6 agents
- ❌ No agent count mentioned
- ❌ No DEPLOYMENT_AGENT
- ❌ No VERIFICATION_AGENT

### 2. Content Issues
- ❌ Generic placeholder text
- ❌ Unrealistic device names (e.g., "Device1")
- ❌ Invalid IP addresses
- ❌ Incorrect command syntax
- ❌ Output doesn't match command
- ❌ Timeline inconsistencies

### 3. Formatting Issues
- ❌ Broken CSS/styling
- ❌ Tables not rendering
- ❌ Code blocks malformed
- ❌ Colors not applied
- ❌ Icons missing

---

## Automated Testing

### Run All Validations

```bash
# Validate all completed scenarios
for i in {1..8}; do
    echo "=== Testing Scenario $i ==="
    if [ -f "scenario-$i-*-v6-FULL.html" ]; then
        # Check file exists
        file=$(ls scenario-$i-*-v6-FULL.html 2>/dev/null | head -1)
        if [ -n "$file" ]; then
            echo "✓ File found: $file"
            echo "  Size: $(du -h "$file" | cut -f1)"
            echo "  Lines: $(wc -l < "$file")"
        fi
    else
        echo "✗ Scenario $i not found"
    fi
    echo ""
done
```

### Check for Key Components

```bash
# Check if scenario has all required components
check_scenario() {
    file=$1
    echo "Checking: $file"

    grep -q "IO_AGENT" "$file" && echo "✓ IO_AGENT present" || echo "✗ IO_AGENT missing"
    grep -q "Knowledge Graph" "$file" && echo "✓ KG queries present" || echo "✗ KG queries missing"
    grep -q "RAG Query" "$file" && echo "✓ RAG queries present" || echo "✗ RAG queries missing"
    grep -q "DEPLOYMENT_AGENT" "$file" && echo "✓ DEPLOYMENT_AGENT present" || echo "✗ DEPLOYMENT_AGENT missing"
    grep -q "VERIFICATION_AGENT" "$file" && echo "✓ VERIFICATION_AGENT present" || echo "✗ VERIFICATION_AGENT missing"

    agent_count=$(grep -o "agents deployed" "$file" | wc -l)
    echo "  Agent deployments mentioned: $agent_count times"
}

# Run for all scenarios
for f in scenario-*-v6-FULL.html; do
    check_scenario "$f"
    echo ""
done
```

---

## Browser Testing

### Recommended Browsers
- ✅ Chrome/Edge (Best compatibility)
- ✅ Firefox
- ✅ Safari
- ⚠️ IE/Old browsers (May have CSS issues)

### Responsive Testing
Test at different screen sizes:
- Desktop: 1920x1080
- Laptop: 1366x768
- Tablet: 768x1024
- Mobile: 375x667 (may require horizontal scrolling for tables)

---

## Reporting Issues

If you find issues, document:
1. **Scenario number and name**
2. **Issue type** (Missing component, formatting, technical error)
3. **Location** (Step number or section)
4. **Expected vs. Actual**
5. **Screenshot** (if visual issue)

---

## Next Steps After Testing

Once testing is complete:
1. ✅ Fix any identified issues
2. ✅ Update validation scripts
3. ✅ Complete remaining scenarios (9-13)
4. ✅ Integrate all scenarios into master file (v7.html)
5. ✅ Final comprehensive testing
6. ✅ Deploy to production

---

**Happy Testing!** 🧪✅
