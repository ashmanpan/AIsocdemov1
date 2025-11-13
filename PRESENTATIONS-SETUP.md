# Cisco AI Demo - Presentations Library Setup Guide

## 🎉 Setup Complete!

Your presentation hosting infrastructure is now fully operational.

---

## 📋 What's Been Created

### 1. **AWS S3 Bucket**
- **Bucket Name:** `ciscoaidemo-presentations`
- **Region:** `ap-south-1` (Mumbai)
- **Public Access:** Enabled (read-only)
- **CORS:** Configured for web access

### 2. **CloudFront Distribution**
- **Distribution ID:** `E2W1VWYOB3FXIM`
- **Domain:** `d1vmgkc8kwdpn5.cloudfront.net`
- **Status:** In Progress (will be active in ~15 minutes)
- **HTTPS:** Enabled
- **Caching:** 24 hours default TTL

### 3. **Presentation Gallery Page**
- **URL:** `https://ciscoaidemo.com/presentations.html`
- **Features:**
  - Search functionality
  - Category filtering
  - Responsive design
  - Download tracking
  - Mobile-friendly

### 4. **Upload Script**
- **File:** `upload-presentation.sh`
- **Purpose:** Easy command-line uploads to S3

---

## 🚀 How to Upload Presentations

### Method 1: Using the Upload Script (Recommended)

```bash
# Make the script executable (already done)
chmod +x upload-presentation.sh

# Upload a presentation
./upload-presentation.sh my-presentation.pdf 5g

# Available categories:
# - 5g          (5G & Mobile Networks)
# - migration   (Network Migration)
# - security    (Security Operations)
# - datacenter  (Data Center)
# - automation  (AI & Automation)
# - cloud       (Cloud & NFV)
```

### Method 2: Using AWS CLI Directly

```bash
# Upload to specific category
aws s3 cp presentation.pdf s3://ciscoaidemo-presentations/5g/

# Upload with proper content type
aws s3 cp presentation.pdf s3://ciscoaidemo-presentations/migration/ \
    --content-type "application/pdf"

# List all presentations
aws s3 ls s3://ciscoaidemo-presentations/ --recursive
```

### Method 3: Using AWS Console

1. Go to: https://console.aws.amazon.com/s3/
2. Navigate to bucket: `ciscoaidemo-presentations`
3. Select category folder (e.g., `5g/`)
4. Click "Upload"
5. Drag and drop your PDF files
6. Click "Upload"

---

## 🔗 Access URLs

### CloudFront URLs (Recommended)
Fast global delivery via CDN:
```
https://d1vmgkc8kwdpn5.cloudfront.net/<category>/<filename>

Examples:
https://d1vmgkc8kwdpn5.cloudfront.net/5g/5g-core-migration-v2.pdf
https://d1vmgkc8kwdpn5.cloudfront.net/migration/ran-consolidation.pdf
```

### S3 Direct URLs
Direct access (slower, but immediate after upload):
```
https://ciscoaidemo-presentations.s3.ap-south-1.amazonaws.com/<category>/<filename>
```

### Gallery Page
Browse all presentations:
```
https://ciscoaidemo.com/presentations.html
```

---

## 📁 Folder Structure

```
s3://ciscoaidemo-presentations/
├── 5g/                    # 5G & Mobile Networks
├── migration/             # Network Migration
├── security/              # Security Operations
├── datacenter/            # Data Center
├── automation/            # AI & Automation
└── cloud/                 # Cloud & NFV
```

---

## 🎨 Updating the Gallery

The gallery page (`presentations.html`) displays presentations dynamically. To add new presentations to the gallery:

1. **Upload the PDF** to S3 (using any method above)

2. **Edit presentations.html** and add your presentation to the `presentations` array:

```javascript
{
    id: 9,
    title: "Your Presentation Title",
    description: "Brief description of the presentation",
    category: "5g",                    // Choose appropriate category
    date: "2025-01-10",                // Upload date
    size: "10.5 MB",                   // File size
    filename: "your-file.pdf",         // Exact filename in S3
    badge: "New",                      // Optional: "New" or "Popular"
    icon: "📡"                         // Choose appropriate emoji
}
```

3. **Deploy the updated HTML** to your website

---

## 🔒 Security & Access Control

### Current Setup (Public Read Access)
- ✅ Anyone can view/download presentations
- ✅ Perfect for customer-facing content
- ❌ No access tracking per user

### Optional: Restricted Access with Signed URLs

If you need to restrict access to specific presentations:

```bash
# Generate a presigned URL (expires in 7 days)
aws s3 presign s3://ciscoaidemo-presentations/5g/secret-presentation.pdf \
    --expires-in 604800
```

This generates a temporary URL that expires after the specified time.

---

## 💰 Cost Estimation

### Current Setup Costs (Approximate)

**S3 Storage:**
- 100 presentations × 10MB each = 1GB
- Cost: ~$0.023/month

**Data Transfer (CloudFront):**
- 1,000 downloads/month × 10MB = 10GB
- Cost: ~$0.85/month

**CloudFront Requests:**
- 1,000 requests/month
- Cost: ~$0.01/month

**Total: ~$1-2/month** (very affordable!)

---

## 📊 Monitoring & Analytics

### View S3 Bucket Metrics
```bash
# Get bucket size
aws s3 ls s3://ciscoaidemo-presentations --recursive --human-readable --summarize

# View recent uploads
aws s3api list-objects-v2 --bucket ciscoaidemo-presentations \
    --query 'sort_by(Contents, &LastModified)[-10:][].{Key:Key,Size:Size,Modified:LastModified}'
```

### CloudFront Metrics
View in AWS Console:
- https://console.aws.amazon.com/cloudfront/
- Select distribution: `E2W1VWYOB3FXIM`
- View "Monitoring" tab

---

## 🛠️ Maintenance Tasks

### Invalidate CloudFront Cache
When you update a presentation with the same filename:

```bash
aws cloudfront create-invalidation \
    --distribution-id E2W1VWYOB3FXIM \
    --paths "/5g/your-file.pdf"

# Invalidate entire category
aws cloudfront create-invalidation \
    --distribution-id E2W1VWYOB3FXIM \
    --paths "/5g/*"

# Invalidate everything (use sparingly)
aws cloudfront create-invalidation \
    --distribution-id E2W1VWYOB3FXIM \
    --paths "/*"
```

### Delete a Presentation
```bash
# Delete from S3
aws s3 rm s3://ciscoaidemo-presentations/5g/old-presentation.pdf

# Invalidate CloudFront cache
aws cloudfront create-invalidation \
    --distribution-id E2W1VWYOB3FXIM \
    --paths "/5g/old-presentation.pdf"

# Remove from presentations.html array
# (Edit the JavaScript array in presentations.html)
```

### Backup Presentations
```bash
# Sync entire bucket to local directory
aws s3 sync s3://ciscoaidemo-presentations/ ./presentations-backup/

# Sync specific category
aws s3 sync s3://ciscoaidemo-presentations/5g/ ./backup/5g/
```

---

## 🔗 Custom Domain (Optional)

To use a custom domain like `slides.ciscoaidemo.com`:

### Step 1: Request SSL Certificate
```bash
# Request certificate in us-east-1 (required for CloudFront)
aws acm request-certificate \
    --domain-name slides.ciscoaidemo.com \
    --validation-method DNS \
    --region us-east-1
```

### Step 2: Update CloudFront Distribution
1. Go to CloudFront console
2. Edit distribution `E2W1VWYOB3FXIM`
3. Add alternate domain name: `slides.ciscoaidemo.com`
4. Select the SSL certificate
5. Save changes

### Step 3: Update DNS
Add CNAME record in your DNS:
```
slides.ciscoaidemo.com  CNAME  d1vmgkc8kwdpn5.cloudfront.net
```

---

## 📝 Sample Presentations Included

The gallery page comes with 8 sample presentations:

1. 5G Core Network Migration Strategy
2. Multi-Vendor RAN Consolidation
3. AI-Powered Security Operations
4. Segment Routing for 5G Transport
5. Data Center ACI Migration
6. NFV to CNF Transformation
7. Agentic AI for Network Operations
8. Network Slicing Business Models

**Note:** These are sample entries. Upload actual PDF files to S3 to make them accessible.

---

## 🆘 Troubleshooting

### Issue: File not accessible after upload
**Solution:** Wait 5-10 minutes for CloudFront cache to update, or create an invalidation.

### Issue: PDF downloads instead of opening in browser
**Solution:** Set proper Content-Type when uploading:
```bash
aws s3 cp file.pdf s3://ciscoaidemo-presentations/category/ \
    --content-disposition "inline" \
    --content-type "application/pdf"
```

### Issue: Changes not reflecting on the gallery page
**Solution:** Clear browser cache or add a version parameter to the URL.

### Issue: Access Denied error
**Solution:** Check bucket policy is correctly applied:
```bash
aws s3api get-bucket-policy --bucket ciscoaidemo-presentations
```

---

## 📞 Support

For questions or issues:
- Email: apj-sp-cto@cisco.com
- Check AWS CloudWatch logs for errors
- Review S3 bucket access logs

---

## ✅ Next Steps

1. **Upload your first presentation:**
   ```bash
   ./upload-presentation.sh my-presentation.pdf 5g
   ```

2. **Update presentations.html** with your actual presentation metadata

3. **Share the gallery URL** with customers:
   ```
   https://ciscoaidemo.com/presentations.html
   ```

4. **(Optional) Set up custom domain** `slides.ciscoaidemo.com`

5. **(Optional) Enable S3 access logging** for analytics

---

## 🎯 Key Benefits

✅ **Fast Global Delivery** - CloudFront CDN with edge caching
✅ **Scalable** - Handles unlimited downloads
✅ **Cost-Effective** - ~$1-2/month for typical usage
✅ **Professional URLs** - Branded presentation links
✅ **Easy Management** - Simple upload script
✅ **Secure** - HTTPS by default
✅ **Searchable Gallery** - Beautiful presentation library

---

**Setup completed on:** 2025-01-10
**CloudFront Status:** In Progress (will be active in ~15 minutes)
**Gallery URL:** https://ciscoaidemo.com/presentations.html
**CloudFront URL:** https://d1vmgkc8kwdpn5.cloudfront.net/
