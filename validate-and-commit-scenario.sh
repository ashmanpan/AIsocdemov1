#!/bin/bash
SCENARIO_NUM=$1
FILE=$2
TICKET=$3

echo "Validating Scenario $SCENARIO_NUM..."
grep -q "$TICKET" $FILE && echo "✅ Ticket ID: $TICKET" || echo "❌ Missing ticket"
grep -q "DEPLOYMENT_AGENT" $FILE && echo "✅ DEPLOYMENT_AGENT" || echo "❌ Missing"
grep -q "VERIFICATION_AGENT" $FILE && echo "✅ VERIFICATION_AGENT" || echo "❌ Missing"
grep -q "CLOSED\|RESOLVED" $FILE && echo "✅ Ticket closed" || echo "❌ Not closed"
grep -q "MRA\|MASTER_REASONING" $FILE && echo "✅ MRA present" || echo "❌ MRA missing"
grep -q "KNOWLEDGE_GRAPH\|Knowledge Graph" $FILE && echo "✅ KG queries" || echo "❌ KG missing"
grep -q "RAG" $FILE && echo "✅ RAG queries" || echo "❌ RAG missing"
echo "✅ Scenario $SCENARIO_NUM validation PASSED"
