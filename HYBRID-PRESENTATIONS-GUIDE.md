# Hybrid Presentations System with Admin Controls

## Overview

This system provides:
1. **Google Slides viewing** - Full presentation mode with animations
2. **S3 downloads** - Direct PPTX downloads (controlled access)
3. **Admin controls** - Manage view/download permissions per presentation
4. **Single upload** - One command uploads to both Google Drive and S3

---

## Architecture

```
Upload PPTX
    ↓
┌───┴────┐
│        │
↓        ↓
Google   S3
Drive    Bucket
  ↓        ↓
Convert  Store
to       PPTX
Slides
  ↓        ↓
Embed    Download
View     Link
```

---

## Features

### For Viewers (Customers)
- ✅ View presentations with animations (Google Slides)
- ✅ Full-screen presentation mode
- ✅ Download PPTX (if enabled by admin)
- ❌ Cannot download if admin disabled

### For Admins
- ✅ Control view access per presentation
- ✅ Control download access per presentation
- ✅ Mark presentations as "Admin Only"
- ✅ Single upload to both systems
- ✅ Admin panel to manage permissions

---

## Setup Steps

### Step 1: Google Drive API Setup

Follow `GOOGLE-DRIVE-SETUP.md` to:
1. Create Google Cloud project
2. Enable Google Drive API
3. Create service account
4. Download credentials JSON
5. Create folder structure in Google Drive
6. Get folder IDs

### Step 2: Install Python Dependencies

```bash
pip3 install google-auth google-auth-oauthlib google-auth-httplib2 google-api-python-client
```

### Step 3: Configure Folder IDs

Edit `upload-presentation-hybrid.py` and update:

```python
FOLDER_IDS = {
    "5g": "YOUR_ACTUAL_FOLDER_ID_HERE",
    "migration": "YOUR_ACTUAL_FOLDER_ID_HERE",
    "security": "YOUR_ACTUAL_FOLDER_ID_HERE",
    "datacenter": "YOUR_ACTUAL_FOLDER_ID_HERE",
    "automation": "YOUR_ACTUAL_FOLDER_ID_HERE",
    "cloud": "YOUR_ACTUAL_FOLDER_ID_HERE"
}
```

### Step 4: Set Admin Password

Edit `presentations-admin.html` or `presentations-config.json`:

```json
{
  "settings": {
    "adminPassword": "YOUR_SECURE_PASSWORD_HERE"
  }
}
```

---

## Usage

### Upload a Presentation

```bash
chmod +x upload-presentation-hybrid.py
./upload-presentation-hybrid.py my-presentation.pptx 5g
```

**What happens:**
1. Uploads PPTX to Google Drive folder
2. Google Drive converts it to Google Slides
3. Sets sharing to "anyone with link can view"
4. Uploads same PPTX to S3 bucket
5. Returns both URLs

**Output:**
```
Google Slides (for viewing):
  View:   https://docs.google.com/presentation/d/ABC123/edit
  Embed:  https://docs.google.com/presentation/d/ABC123/embed?start=true

S3/CloudFront (for download):
  Direct: https://d1vmgkc8kwdpn5.cloudfront.net/5g/my-presentation.pptx
```

### Manage Permissions

1. Go to: `https://ciscoaidemo.com/presentations-admin.html`
2. Login with admin password
3. Toggle permissions for each presentation:
   - **View Enabled**: Show presentation in gallery
   - **Download Enabled**: Show download button
   - **Admin Only**: Hide from public (admin login required)
4. Click "Save Changes"

---

## Permission Matrix

| View | Download | Admin Only | Result |
|------|----------|------------|--------|
| ✅ | ✅ | ❌ | Public can view AND download |
| ✅ | ❌ | ❌ | Public can view, NO download button |
| ✅ | ❌ | ✅ | Admin only, can view, no download |
| ❌ | ❌ | ✅ | Hidden from public, admin can access |
| ❌ | ✅ | ❌ | Not shown, but download link works (if known) |

---

## File Structure

```
/home/kpanse/wsl-myprojects/AIsocdemov1/
├── presentations.html                  # Public gallery
├── presentations-admin.html            # Admin panel
├── presentations-config.json           # Permissions config
├── upload-presentation-hybrid.py       # Hybrid upload script
├── google-drive-credentials.json       # API credentials (gitignored)
├── GOOGLE-DRIVE-SETUP.md              # Setup guide
└── HYBRID-PRESENTATIONS-GUIDE.md      # This file
```

---

## Security Considerations

### Google Slides
- ✅ Embedded viewing (can't download from embed)
- ✅ "Anyone with link" = not searchable/indexed
- ❌ If someone has the link, they can view
- ❌ Can be shared by viewers

### S3 Downloads
- ✅ Direct URLs not shown in UI (unless download enabled)
- ❌ If someone has CloudFront URL, they can download
- ⚠️  Consider using S3 presigned URLs for sensitive content

### Admin Panel
- ⚠️  Currently uses client-side password (demo)
- 🔒 **Production:** Should use proper backend authentication
- 🔒 **Production:** Store config in database, not localStorage

---

## Upgrading to Production

### Current (Demo)
- Client-side admin password
- Config stored in JavaScript/localStorage
- No backend API

### Production Ready
1. **Backend API** (Node.js/Python/Go)
   - Store presentations config in database
   - Proper authentication (JWT, OAuth)
   - API endpoints for CRUD operations

2. **Signed URLs**
   - Generate time-limited S3 presigned URLs
   - Expires after X hours/days
   - Track downloads

3. **User Authentication**
   - Integrate with SSO (Okta, Azure AD)
   - Role-based access (Admin, Viewer, etc.)
   - Audit logging

---

## Workflow Example

### Scenario: Upload a customer presentation

1. **Create presentation** in PowerPoint with animations

2. **Upload**:
   ```bash
   ./upload-presentation-hybrid.py customer-5g-demo.pptx 5g
   ```

3. **Configure permissions** (admin panel):
   - View Enabled: ✅
   - Download Enabled: ❌ (view only)
   - Admin Only: ❌ (public)

4. **Share with customer**:
   - Send gallery link: `https://ciscoaidemo.com/presentations.html`
   - Or direct Google Slides link for embedding

5. **Customer experience**:
   - Opens presentations.html
   - Sees presentation in 5G category
   - Clicks "View" button
   - Opens in full-screen Google Slides
   - All animations work perfectly
   - ❌ No download button (disabled by admin)

---

## Updating a Presentation

1. **Upload new version**:
   ```bash
   ./upload-presentation-hybrid.py customer-5g-demo-v2.pptx 5g
   ```

2. **Update presentations-config.json**:
   - Change the embed URL to new Google Slides ID
   - Keep same download URL or update to v2

3. **Deploy changes** (git push to trigger Amplify)

---

## Troubleshooting

### Google Drive upload fails
- Check `google-drive-credentials.json` exists
- Verify folder IDs are correct
- Ensure service account has access to folders

### S3 upload fails
- Check AWS credentials: `aws configure list`
- Verify bucket exists: `aws s3 ls s3://ciscoaidemo-presentations/`

### Animations don't work
- Make sure you uploaded PPTX (not PDF)
- Check Google Slides conversion was successful
- Some complex PowerPoint animations may not convert perfectly

### Download link doesn't work
- Check CloudFront distribution is deployed
- Verify file exists in S3: `aws s3 ls s3://ciscoaidemo-presentations/category/`
- Wait 5-10 minutes for CloudFront cache

---

## Cost Estimate

### Google Drive
- ✅ **FREE** (up to 15GB per account)
- For more storage: Google Workspace (~$6/user/month)

### AWS S3 + CloudFront
- Storage: ~$0.02/GB/month
- CloudFront: ~$0.85/GB transfer
- **Total: ~$1-2/month** for typical usage

---

## Next Steps

1. ✅ Complete Google Drive API setup
2. ✅ Upload your first presentation
3. ✅ Test admin panel
4. ⬜ Integrate with your authentication system (optional)
5. ⬜ Add analytics tracking (optional)

---

## Support

For issues:
- Check `GOOGLE-DRIVE-SETUP.md` for API setup
- Review `PRESENTATIONS-SETUP.md` for S3/CloudFront
- Email: apj-sp-cto@cisco.com

---

**System Status:**
- ✅ S3 Bucket: Ready
- ✅ CloudFront: Deployed
- ✅ Upload Script: Created
- ⬜ Google Drive API: Requires setup
- ✅ Admin Panel: Ready
- ✅ Permissions System: Implemented
