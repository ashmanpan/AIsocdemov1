# Multi-Agent Cloud Service Testing System

## Overview
Agentic AI system that discovers services and tests their complete lifecycle (Deploy → Modify → Delete) using coordinated agents.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    ORCHESTRATOR AGENT                        │
│          (Coordinates all agents & manages workflow)         │
└───────────────┬─────────────────────────────────────────────┘
                │
                ├──→ 🔍 DISCOVERY AGENT
                │    • Scans DynamoDB for services
                │    • Reads S3 for service configs
                │    • Returns list of testable services
                │
                ├──→ 🚀 DEPLOYMENT AGENT
                │    • Creates test deployment plan
                │    • Executes service deployment
                │    • Validates deployment success
                │    • Reports metrics (time, resources, status)
                │
                ├──→ ⚙️ MODIFICATION AGENT
                │    • Identifies modifiable parameters
                │    • Applies configuration changes
                │    • Tests modified service
                │    • Validates changes applied correctly
                │
                └──→ 🗑️ DELETION AGENT
                     • Creates deletion plan
                     • Executes service teardown
                     • Validates complete cleanup
                     • Reports final status
```

## Agent Definitions

### 1. **Orchestrator Agent** (Master)
**Role**: Coordinates all testing agents and manages workflow

**Responsibilities**:
- Receives user test request
- Calls Discovery Agent to find services
- Delegates tasks to specialist agents
- Aggregates results
- Provides streaming updates to UI

**Input**: Service name or "test all"
**Output**: Complete test report with all agent results

### 2. **Discovery Agent**
**Role**: Finds and catalogs all available services

**Tasks**:
- Query DynamoDB `CloudServiceCreator` table
- List services with metadata
- Check S3 for generated code
- Return service inventory

**Output**:
```json
{
  "services": [
    {
      "service_id": "uuid",
      "service_type": "vFirewall",
      "vendor": "Cisco",
      "status": "ready_for_test",
      "code_files": ["backend.py", "api.py", ...]
    }
  ]
}
```

### 3. **Deployment Agent**
**Role**: Test service deployment

**Tasks**:
1. Create deployment environment (Docker/K8s simulation)
2. Deploy service code
3. Validate APIs are accessible
4. Run health checks
5. Measure deployment time

**Output**:
```json
{
  "deployment_status": "success",
  "time_taken": "45s",
  "endpoints_validated": 12,
  "health_check": "passed",
  "issues": []
}
```

### 4. **Modification Agent**
**Role**: Test service configuration changes

**Tasks**:
1. Identify modifiable parameters
2. Apply configuration change
3. Validate change propagated
4. Test service still works
5. Rollback if needed

**Test Scenarios**:
- Scale up/down instances
- Change firewall rules
- Update API rate limits
- Modify logging levels

**Output**:
```json
{
  "modification_status": "success",
  "changes_applied": ["scale: 5→10", "rules: +3"],
  "validation": "passed",
  "rollback_tested": true
}
```

### 5. **Deletion Agent**
**Role**: Test service cleanup

**Tasks**:
1. Create deletion plan
2. Remove service resources
3. Validate no orphaned resources
4. Check database cleanup
5. Verify S3 cleanup (optional)

**Output**:
```json
{
  "deletion_status": "success",
  "resources_removed": 15,
  "orphaned_resources": 0,
  "cleanup_verified": true
}
```

## UI Design (Matching Existing Style)

### Page: `service-tester.html`

**Same styling as `service-creator.html`**:
- Dark background (#0a0a0a)
- Gradient animations
- Chat-based interface
- Streaming agent updates
- Progress indicators

### Layout:

```
┌─────────────────────────────────────────────────────────┐
│  🤖 Cisco Cloud Service Tester                         │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  [Chat Area - Streaming Agent Updates]                  │
│                                                          │
│  🤖: Starting service discovery...                       │
│  🔍 Discovery Agent: Found 5 services                    │
│  🚀 Deployment Agent: Testing vFirewall-001...           │
│  ✅ Deployment: PASSED (45s)                             │
│  ⚙️ Modification Agent: Scaling 5→10...                 │
│  ✅ Modification: PASSED (12s)                           │
│  🗑️ Deletion Agent: Cleaning up...                      │
│  ✅ Deletion: PASSED (8s)                                │
│                                                          │
├─────────────────────────────────────────────────────────┤
│  [Action Panel]                                          │
│  • Test All Services                                     │
│  • Test Specific Service (dropdown)                      │
│  • Test Type: [Deploy] [Modify] [Delete] [Full Cycle]  │
│  [▶ Start Testing]                                      │
└─────────────────────────────────────────────────────────┘
```

### Agent Status Panel (Right Side):

```
┌──────────────────────┐
│  Agent Status        │
├──────────────────────┤
│ 🔍 Discovery         │
│    ✓ Active          │
│                      │
│ 🚀 Deployment        │
│    ⏳ Running...     │
│                      │
│ ⚙️ Modification      │
│    ⏸ Pending         │
│                      │
│ 🗑️ Deletion          │
│    ⏸ Pending         │
└──────────────────────┘
```

## Message Streaming Format

**Same as existing chat interface:**

```javascript
// Agent messages stream in real-time
addMessage("🔍 Discovery Agent", false);
await sleep(500);
addMessage("Scanning DynamoDB table: CloudServiceCreator...", false);
await sleep(800);
addMessage("✅ Found 5 services ready for testing", false);
await sleep(300);
addMessage("📋 Services:\n• vFirewall-Cisco-001\n• vRouter-Cisco-002\n...", false);
```

## API Endpoints (Same Lambda)

### POST /conversation
```json
// New action: "test"
{
  "action": "test",
  "test_type": "full_cycle",  // or "deploy", "modify", "delete"
  "service_id": "uuid" // or "all"
}
```

**Response (streaming)**:
```json
{
  "agent": "discovery",
  "status": "running",
  "message": "Found 5 services...",
  "data": {...}
}
```

## Data Storage

### DynamoDB Schema (reuse existing table)

**New items for test results**:
```
pk: TEST#{test_id}
sk: RESULT#{timestamp}
{
  "test_id": "uuid",
  "service_id": "uuid",
  "test_type": "full_cycle",
  "agents": {
    "discovery": {"status": "success", "duration": "2s"},
    "deployment": {"status": "success", "duration": "45s"},
    "modification": {"status": "success", "duration": "12s"},
    "deletion": {"status": "success", "duration": "8s"}
  },
  "overall_status": "passed",
  "created_at": "2025-10-07T12:00:00Z"
}
```

## Agent Coordination Logic

```python
async def orchestrator(test_request):
    # 1. Discovery Phase
    services = await discovery_agent.find_services()
    stream_update("🔍 Discovery Agent: Found {len(services)} services")

    # 2. For each service
    for service in services:
        # Deploy
        deploy_result = await deployment_agent.test(service)
        stream_update(f"🚀 Deployment: {deploy_result.status}")

        # Modify
        modify_result = await modification_agent.test(service)
        stream_update(f"⚙️ Modification: {modify_result.status}")

        # Delete
        delete_result = await deletion_agent.test(service)
        stream_update(f"🗑️ Deletion: {delete_result.status}")

    # 3. Summary
    return test_summary
```

## Implementation Files

1. **`service-tester.html`** - UI (same style as service-creator.html)
2. **`backend/lambda/testing_agents.py`** - Multi-agent implementation
3. **`backend/lambda/orchestrator.py`** - Agent coordination
4. **Integration with existing Lambda** - Add new action handlers

## Features

### Phase 1 (MVP)
- ✅ Service discovery from DynamoDB
- ✅ Simulated deployment testing
- ✅ Simulated modification testing
- ✅ Simulated deletion testing
- ✅ Streaming UI updates
- ✅ Test results stored in DynamoDB

### Phase 2 (Advanced)
- Real Docker container deployment tests
- Integration with AWS services (EC2, ECS)
- Performance benchmarking
- Load testing capabilities
- Automated rollback testing

## User Experience

1. User opens `service-tester.html`
2. Clicks "Test All Services"
3. Watches agents work in real-time:
   - Discovery finds services
   - Each agent tests in sequence
   - Streaming updates show progress
   - Green checkmarks for success
   - Red alerts for failures
4. Summary report at end
5. Option to view detailed logs
6. Download test report

## Benefits

✅ **Automated testing** of all cloud services
✅ **Multi-agent coordination** visible to user
✅ **Same UI/UX** as service creator
✅ **Real-time streaming** updates
✅ **Complete lifecycle** testing
✅ **Stored results** for audit trail

---

Ready to build? This will create a professional testing dashboard that matches your existing design!
