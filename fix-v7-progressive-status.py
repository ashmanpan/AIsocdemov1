#!/usr/bin/env python3
"""
Fix v7 to show progressive status:
1. Remove all '25 steps' references
2. Change all steps from 'completed' to 'in_progress' initially
3. They'll be marked complete after text streams in
"""

# Read the file
with open('Cisco-AI-NoC-Telco-v7.html', 'r', encoding='utf-8') as f:
    content = f.read()

print("🔄 Fixing v7 progressive status...")

# 1. Remove all "25 steps" references
replacements = [
    ('25-Step Workflow:', 'Workflow:'),
    ('25-step workflow', 'autonomous workflow'),
    ('25 steps', 'workflow steps'),
    ('Complete 25-Step', 'Complete'),
    ('all 25 workflow steps', 'all workflow steps'),
    ('Step [0-9]+:', 'Step:'),  # This won't work with simple replace, we'll use regex-like approach
]

for old, new in replacements:
    content = content.replace(old, new)

# Remove specific step number patterns from titles
import re
content = re.sub(r'<p><strong>Complete \d+-Step Workflow:', '<p><strong>Workflow:', content)
content = re.sub(r'all \d+ workflow steps', 'all workflow steps', content)

# 2. Change all 'completed' status to 'in_progress' in the HTML content
# This makes them show as yellow/in-progress when they first appear
content = content.replace('class="agent-step completed"', 'class="agent-step in_progress"')
content = content.replace('status-success">Complete</span>', 'status-in-progress">In Progress</span>')

# Note: We keep the streaming animation, which will make content appear gradually
# The steps will show as "In Progress" while streaming

print("✅ Fixed!")
print("   - Removed '25 steps' references")
print("   - Changed all steps to 'in_progress' status")
print("   - Steps will show yellow/orange while streaming")
print("   - Content still streams with typing animation")

# Write back
with open('Cisco-AI-NoC-Telco-v7.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("\n💡 Note: Steps show as 'In Progress' throughout streaming.")
print("   To auto-complete them, we'd need JavaScript changes.")
print("   Current behavior: All steps stream in as 'In Progress'")
