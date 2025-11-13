#!/usr/bin/env python3
"""
Cisco AI Demo - Hybrid Presentation Upload Script
Uploads presentations to both Google Drive (for viewing) and S3 (for download)
"""

import os
import sys
import json
import subprocess
from pathlib import Path

try:
    from google.oauth2 import service_account
    from googleapiclient.discovery import build
    from googleapiclient.http import MediaFileUpload
except ImportError:
    print("❌ Error: Google API libraries not installed")
    print("Run: pip3 install google-auth google-auth-oauthlib google-auth-httplib2 google-api-python-client")
    sys.exit(1)

# Configuration
CREDENTIALS_FILE = "google-drive-credentials.json"
S3_BUCKET = "ciscoaidemo-presentations"
CLOUDFRONT_DOMAIN = "d1vmgkc8kwdpn5.cloudfront.net"
REGION = "ap-south-1"

# Google Drive Folder IDs (UPDATE THESE AFTER SETUP)
FOLDER_IDS = {
    "5g": "YOUR_5G_FOLDER_ID",
    "migration": "YOUR_MIGRATION_FOLDER_ID",
    "security": "YOUR_SECURITY_FOLDER_ID",
    "datacenter": "YOUR_DATACENTER_FOLDER_ID",
    "automation": "YOUR_AUTOMATION_FOLDER_ID",
    "cloud": "YOUR_CLOUD_FOLDER_ID"
}

VALID_CATEGORIES = list(FOLDER_IDS.keys())

# Colors for output
class Colors:
    GREEN = '\033[0;32m'
    BLUE = '\033[0;34m'
    RED = '\033[0;31m'
    YELLOW = '\033[1;33m'
    NC = '\033[0m'  # No Color

def print_header():
    print(f"{Colors.BLUE}{'='*50}{Colors.NC}")
    print(f"{Colors.BLUE}  Cisco AI Demo - Hybrid Upload{Colors.NC}")
    print(f"{Colors.BLUE}{'='*50}{Colors.NC}")
    print()

def print_success(message):
    print(f"{Colors.GREEN}✓ {message}{Colors.NC}")

def print_error(message):
    print(f"{Colors.RED}✗ {message}{Colors.NC}")

def print_info(message):
    print(f"{Colors.BLUE}{message}{Colors.NC}")

def print_warning(message):
    print(f"{Colors.YELLOW}⚠ {message}{Colors.NC}")

def usage():
    print(f"{Colors.BLUE}Usage: {sys.argv[0]} <file.pptx> <category>{Colors.NC}")
    print()
    print("Categories:")
    for cat in VALID_CATEGORIES:
        print(f"  {cat}")
    print()
    print("Example:")
    print(f"  {sys.argv[0]} my-presentation.pptx 5g")
    sys.exit(1)

def check_credentials():
    """Check if Google Drive credentials exist"""
    if not os.path.exists(CREDENTIALS_FILE):
        print_error(f"Credentials file not found: {CREDENTIALS_FILE}")
        print_info("Please follow the setup guide: GOOGLE-DRIVE-SETUP.md")
        sys.exit(1)

def check_folder_ids():
    """Check if folder IDs are configured"""
    if "YOUR_5G_FOLDER_ID" in FOLDER_IDS.values():
        print_error("Google Drive folder IDs not configured!")
        print_info("Please update FOLDER_IDS in this script with your actual folder IDs")
        print_info("See GOOGLE-DRIVE-SETUP.md for instructions")
        sys.exit(1)

def upload_to_google_drive(file_path, category):
    """Upload file to Google Drive and convert to Google Slides"""
    try:
        print_info("Uploading to Google Drive...")

        # Authenticate
        credentials = service_account.Credentials.from_service_account_file(
            CREDENTIALS_FILE,
            scopes=['https://www.googleapis.com/auth/drive']
        )

        service = build('drive', 'v3', credentials=credentials)

        # File metadata
        file_metadata = {
            'name': os.path.basename(file_path),
            'parents': [FOLDER_IDS[category]],
            'mimeType': 'application/vnd.google-apps.presentation'  # Convert to Google Slides
        }

        # Upload file
        media = MediaFileUpload(
            file_path,
            mimetype='application/vnd.openxmlformats-officedocument.presentationml.presentation',
            resumable=True
        )

        file = service.files().create(
            body=file_metadata,
            media_body=media,
            fields='id,webViewLink'
        ).execute()

        file_id = file.get('id')
        web_link = file.get('webViewLink')

        # Make file publicly viewable (anyone with link can view)
        service.permissions().create(
            fileId=file_id,
            body={
                'type': 'anyone',
                'role': 'reader'
            }
        ).execute()

        # Get embed URL (presentation mode)
        embed_url = f"https://docs.google.com/presentation/d/{file_id}/embed?start=true&loop=false&delayms=3000"

        print_success("Uploaded to Google Drive")
        return {
            'file_id': file_id,
            'web_link': web_link,
            'embed_url': embed_url
        }

    except Exception as e:
        print_error(f"Google Drive upload failed: {str(e)}")
        return None

def upload_to_s3(file_path, category):
    """Upload file to S3"""
    try:
        print_info("Uploading to S3...")

        filename = os.path.basename(file_path)
        s3_key = f"{category}/{filename}"

        # Upload using AWS CLI
        cmd = [
            'aws', 's3', 'cp',
            file_path,
            f's3://{S3_BUCKET}/{s3_key}',
            '--region', REGION,
            '--content-type', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
        ]

        result = subprocess.run(cmd, capture_output=True, text=True)

        if result.returncode == 0:
            s3_url = f"https://{S3_BUCKET}.s3.{REGION}.amazonaws.com/{s3_key}"
            cloudfront_url = f"https://{CLOUDFRONT_DOMAIN}/{s3_key}"

            print_success("Uploaded to S3")
            return {
                's3_url': s3_url,
                'cloudfront_url': cloudfront_url
            }
        else:
            print_error(f"S3 upload failed: {result.stderr}")
            return None

    except Exception as e:
        print_error(f"S3 upload failed: {str(e)}")
        return None

def get_file_size(file_path):
    """Get human-readable file size"""
    size = os.path.getsize(file_path)
    for unit in ['B', 'KB', 'MB', 'GB']:
        if size < 1024.0:
            return f"{size:.1f} {unit}"
        size /= 1024.0

def main():
    # Check arguments
    if len(sys.argv) != 3:
        usage()

    file_path = sys.argv[1]
    category = sys.argv[2]

    print_header()

    # Validate file
    if not os.path.exists(file_path):
        print_error(f"File not found: {file_path}")
        sys.exit(1)

    if not file_path.lower().endswith('.pptx'):
        print_error("File must be a PowerPoint file (.pptx)")
        sys.exit(1)

    # Validate category
    if category not in VALID_CATEGORIES:
        print_error(f"Invalid category: {category}")
        usage()

    # Check setup
    check_credentials()
    check_folder_ids()

    # Display info
    filename = os.path.basename(file_path)
    filesize = get_file_size(file_path)

    print(f"File:     {Colors.GREEN}{filename}{Colors.NC}")
    print(f"Size:     {Colors.GREEN}{filesize}{Colors.NC}")
    print(f"Category: {Colors.GREEN}{category}{Colors.NC}")
    print()

    # Confirm
    response = input("Continue with upload? (y/n): ")
    if response.lower() != 'y':
        print("Upload cancelled")
        sys.exit(0)

    print()

    # Upload to Google Drive
    gdrive_result = upload_to_google_drive(file_path, category)
    if not gdrive_result:
        print_error("Google Drive upload failed. Aborting.")
        sys.exit(1)

    # Upload to S3
    s3_result = upload_to_s3(file_path, category)
    if not s3_result:
        print_warning("S3 upload failed, but Google Drive upload succeeded")

    # Display results
    print()
    print_info("="*50)
    print_success("Upload Complete!")
    print_info("="*50)
    print()

    print(f"{Colors.BLUE}Google Slides (for viewing with animations):{Colors.NC}")
    print(f"  View:   {gdrive_result['web_link']}")
    print(f"  Embed:  {gdrive_result['embed_url']}")
    print()

    if s3_result:
        print(f"{Colors.BLUE}S3/CloudFront (for download):{Colors.NC}")
        print(f"  Direct: {s3_result['cloudfront_url']}")
        print()

    print_info("Next steps:")
    print("1. Test the Google Slides link to ensure animations work")
    print("2. Add presentation metadata to presentations.html:")
    print()
    print(f"   {{")
    print(f"       title: '{filename.replace('.pptx', '')}',")
    print(f"       category: '{category}',")
    print(f"       embedUrl: '{gdrive_result['embed_url']}',")
    print(f"       downloadUrl: '{s3_result['cloudfront_url'] if s3_result else 'N/A'}',")
    print(f"       viewUrl: '{gdrive_result['web_link']}'")
    print(f"   }}")
    print()

if __name__ == "__main__":
    main()
