#!/bin/bash
# Script to update videos-data.json from localStorage and commit to GitHub
# Usage: Run this after adding videos via admin panel

echo "📹 Cisco Video Library - GitHub Sync Tool"
echo "=========================================="

# Check if videos-data.json exists
if [ ! -f "videos-data.json" ]; then
    echo "[]" > videos-data.json
    echo "✅ Created videos-data.json"
fi

# Display current video count
CURRENT_COUNT=$(cat videos-data.json | jq 'length' 2>/dev/null || echo "0")
echo "📊 Current videos in database: $CURRENT_COUNT"

echo ""
echo "To sync videos from your browser:"
echo "1. Open admin panel: https://allinone.ciscoaidemo.com/admin-videos.html"
echo "2. Go to Import/Export tab"
echo "3. Click 'Export All Videos'"
echo "4. Save the downloaded JSON file as: videos-data.json"
echo "5. Run this script again to commit to GitHub"
echo ""

read -p "Have you exported the videos? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    # Add and commit
    git add videos-data.json
    git commit -m "Update video library database

🎬 Updated videos: $(cat videos-data.json | jq 'length')
📅 Updated: $(date '+%Y-%m-%d %H:%M:%S')

🤖 Generated with Cisco Video Sync Tool"

    echo "✅ Videos committed to Git"
    echo ""
    read -p "Push to GitHub? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git push
        echo "✅ Videos pushed to GitHub!"
        echo "🌐 Videos will be live in 1-2 minutes"
    fi
else
    echo "ℹ️  Please export videos first and run this script again"
fi
