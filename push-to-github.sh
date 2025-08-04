#!/bin/bash

# GitHub Push Script for Cisco AI SOC Demo
echo "GitHub Push Script for ashmanpan/AIsocdemov1"
echo "=========================================="

# Check if we're in the right directory
if [ ! -f "Cisco-AI-SoC-Telco-v2.5.html" ]; then
    echo "Error: Not in the correct directory. Please run from the project root."
    exit 1
fi

echo "Current git status:"
git status --short

echo ""
echo "Please enter your GitHub Personal Access Token (PAT):"
echo "(To create one: GitHub → Settings → Developer settings → Personal access tokens → Generate new token with 'repo' scope)"
read -s GITHUB_TOKEN

echo ""
echo "Pushing to GitHub..."

# Push using the provided credentials
git push https://ashmanpan:${GITHUB_TOKEN}@github.com/ashmanpan/AIsocdemov1.git main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Successfully pushed to GitHub!"
    echo "Repository URL: https://github.com/ashmanpan/AIsocdemov1"
    echo ""
    echo "Next steps for AWS Amplify deployment:"
    echo "1. Go to https://console.aws.amazon.com/amplify/"
    echo "2. Click 'New app' → 'Host web app'"
    echo "3. Choose GitHub and select 'ashmanpan/AIsocdemov1'"
    echo "4. Amplify will auto-detect the configuration"
    echo "5. Click 'Save and deploy'"
else
    echo ""
    echo "❌ Push failed. Please check your token and try again."
    echo "Make sure your token has 'repo' scope permissions."
fi