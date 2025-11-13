#!/bin/bash

# Cisco AI Demo - Presentation Upload Script
# Usage: ./upload-presentation.sh <file> <category>
# Categories: 5g, migration, security, datacenter, automation, cloud

set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Configuration
BUCKET_NAME="ciscoaidemo-presentations"
CLOUDFRONT_DOMAIN="d1vmgkc8kwdpn5.cloudfront.net"
REGION="ap-south-1"

# Valid categories
VALID_CATEGORIES=("5g" "migration" "security" "datacenter" "automation" "cloud")

# Function to display usage
usage() {
    echo -e "${BLUE}Usage: $0 <file> <category>${NC}"
    echo ""
    echo "Categories:"
    echo "  5g          - 5G & Mobile Networks"
    echo "  migration   - Network Migration"
    echo "  security    - Security Operations"
    echo "  datacenter  - Data Center"
    echo "  automation  - AI & Automation"
    echo "  cloud       - Cloud & NFV"
    echo ""
    echo "Example:"
    echo "  $0 my-presentation.pdf 5g"
    exit 1
}

# Check arguments
if [ $# -ne 2 ]; then
    usage
fi

FILE="$1"
CATEGORY="$2"

# Check if file exists
if [ ! -f "$FILE" ]; then
    echo -e "${RED}Error: File '$FILE' not found${NC}"
    exit 1
fi

# Validate category
if [[ ! " ${VALID_CATEGORIES[@]} " =~ " ${CATEGORY} " ]]; then
    echo -e "${RED}Error: Invalid category '$CATEGORY'${NC}"
    usage
fi

# Get file info
FILENAME=$(basename "$FILE")
FILESIZE=$(du -h "$FILE" | cut -f1)

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  Cisco AI Demo - Upload Presentation${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""
echo -e "File:     ${GREEN}$FILENAME${NC}"
echo -e "Size:     ${GREEN}$FILESIZE${NC}"
echo -e "Category: ${GREEN}$CATEGORY${NC}"
echo -e "Bucket:   ${GREEN}s3://$BUCKET_NAME/$CATEGORY/${NC}"
echo ""
read -p "Continue with upload? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Upload cancelled"
    exit 0
fi

# Upload to S3
echo ""
echo -e "${BLUE}Uploading to S3...${NC}"
aws s3 cp "$FILE" "s3://$BUCKET_NAME/$CATEGORY/" \
    --region "$REGION" \
    --content-type "application/pdf" \
    --metadata "uploaded-by=upload-script,uploaded-at=$(date -u +%Y-%m-%dT%H:%M:%SZ)"

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Upload successful!${NC}"
    echo ""
    echo -e "${BLUE}Access URLs:${NC}"
    echo -e "S3 Direct:   https://$BUCKET_NAME.s3.$REGION.amazonaws.com/$CATEGORY/$FILENAME"
    echo -e "CloudFront:  https://$CLOUDFRONT_DOMAIN/$CATEGORY/$FILENAME"
    echo ""
    echo -e "${GREEN}✓ Presentation is now available in the gallery!${NC}"
    echo -e "View at: https://ciscoaidemo.com/presentations.html"
else
    echo -e "${RED}✗ Upload failed${NC}"
    exit 1
fi

# Invalidate CloudFront cache (optional)
read -p "Invalidate CloudFront cache? (y/n) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${BLUE}Creating CloudFront invalidation...${NC}"
    DISTRIBUTION_ID="E2W1VWYOB3FXIM"
    aws cloudfront create-invalidation \
        --distribution-id "$DISTRIBUTION_ID" \
        --paths "/$CATEGORY/$FILENAME"

    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ Cache invalidation requested${NC}"
        echo -e "Note: It may take 5-10 minutes for changes to propagate"
    fi
fi

echo ""
echo -e "${GREEN}Done!${NC}"
