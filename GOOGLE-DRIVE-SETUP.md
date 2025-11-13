# Google Drive API Setup Guide

## Prerequisites
You need a Google account to proceed.

## Step 1: Create a Google Cloud Project

1. Go to: https://console.cloud.google.com/
2. Click "Select a project" → "New Project"
3. Project Name: `Cisco AI Presentations`
4. Click "Create"

## Step 2: Enable Google Drive API

1. In Google Cloud Console, go to "APIs & Services" → "Library"
2. Search for "Google Drive API"
3. Click on it and click "Enable"
4. Also enable "Google Slides API" (for better integration)

## Step 3: Create Service Account (For Automation)

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "Service Account"
3. Service account name: `presentation-uploader`
4. Click "Create and Continue"
5. Role: Select "Editor" (or "Google Drive File Organizer")
6. Click "Done"

## Step 4: Generate Service Account Key

1. Click on the service account you just created
2. Go to "Keys" tab
3. Click "Add Key" → "Create new key"
4. Choose "JSON"
5. Click "Create"
6. **Download the JSON file** - Save it as `google-drive-credentials.json`

## Step 5: Create a Shared Google Drive Folder

1. Go to: https://drive.google.com/
2. Create a new folder: `Cisco AI Presentations`
3. Inside it, create subfolders:
   - `5g`
   - `migration`
   - `security`
   - `datacenter`
   - `automation`
   - `cloud`
4. **Share each folder** with the service account email:
   - Right-click folder → Share
   - Add the service account email (looks like: `presentation-uploader@cisco-ai-presentations.iam.gserviceaccount.com`)
   - Give "Editor" permission
5. **Get each folder's ID** from the URL:
   - Open the folder
   - URL looks like: `https://drive.google.com/drive/folders/1abc123xyz...`
   - The ID is the part after `/folders/`

## Step 6: Note Your Folder IDs

Create a mapping of category to Google Drive Folder ID:

```
5g:         <FOLDER_ID_1>
migration:  <FOLDER_ID_2>
security:   <FOLDER_ID_3>
datacenter: <FOLDER_ID_4>
automation: <FOLDER_ID_5>
cloud:      <FOLDER_ID_6>
```

## Step 7: Install Google Client Library

On your local machine or server:

```bash
pip3 install google-auth google-auth-oauthlib google-auth-httplib2 google-api-python-client
```

## Step 8: Move Credentials File

```bash
mv ~/Downloads/google-drive-credentials.json /home/kpanse/wsl-myprojects/AIsocdemov1/
```

**IMPORTANT:** Add this file to `.gitignore` so it doesn't get committed to GitHub!

```bash
echo "google-drive-credentials.json" >> .gitignore
```

---

## You're Ready!

Once you complete these steps:
1. You'll have API credentials
2. Folders are set up in Google Drive
3. Service account has access
4. You can run the hybrid upload script

---

## Next: Configure the Upload Script

After completing the above steps, I'll create a Python script that:
1. Uploads PPTX to the appropriate Google Drive folder
2. Converts it to Google Slides
3. Gets the embeddable presentation URL
4. Also uploads to S3 for direct download
5. Updates the presentations.html metadata

**Let me know when you've completed Steps 1-7, and I'll proceed with the script!**
