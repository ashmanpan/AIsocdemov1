# Quick Start Guide - Presentations Library

## ✅ System is Ready!

Your presentation hosting infrastructure is fully operational.

---

## 🚀 Upload Your First Presentation (3 Easy Steps)

### Step 1: Prepare Your PDF
Make sure your presentation is in PDF format.

### Step 2: Choose a Category
- **5g** - 5G & Mobile Networks
- **migration** - Network Migration
- **security** - Security Operations
- **datacenter** - Data Center
- **automation** - AI & Automation
- **cloud** - Cloud & NFV

### Step 3: Upload

```bash
./upload-presentation.sh your-presentation.pdf 5g
```

That's it! Your presentation is now live.

---

## 🔗 Access Your Presentations

### View in Gallery
```
https://ciscoaidemo.com/presentations.html
```

### Direct CloudFront URL
```
https://d1vmgkc8kwdpn5.cloudfront.net/<category>/<filename>
```

### Example
If you uploaded `5g-migration.pdf` to the `5g` category:
```
https://d1vmgkc8kwdpn5.cloudfront.net/5g/5g-migration.pdf
```

---

## 📤 Sharing with Customers

### Option 1: Share Gallery Link
Send customers to the full library:
```
https://ciscoaidemo.com/presentations.html
```

### Option 2: Share Direct Link
Copy the CloudFront URL for a specific presentation:
```
https://d1vmgkc8kwdpn5.cloudfront.net/5g/your-presentation.pdf
```

### Option 3: Share with Email Template
```
Hi [Customer],

I'm sharing our latest presentation on 5G Core Migration:

📎 https://d1vmgkc8kwdpn5.cloudfront.net/5g/5g-core-migration.pdf

You can also browse our complete library:
🌐 https://ciscoaidemo.com/presentations.html

Best regards,
[Your Name]
```

---

## 🛠️ Common Tasks

### List All Presentations
```bash
aws s3 ls s3://ciscoaidemo-presentations/ --recursive --human-readable
```

### Delete a Presentation
```bash
aws s3 rm s3://ciscoaidemo-presentations/5g/old-presentation.pdf
```

### Download from S3
```bash
aws s3 cp s3://ciscoaidemo-presentations/5g/presentation.pdf ./
```

### Update a Presentation
Just upload with the same filename - it will overwrite:
```bash
./upload-presentation.sh updated-presentation.pdf 5g
```

---

## 📊 What's Available

### Infrastructure
✅ S3 Bucket: `ciscoaidemo-presentations`
✅ CloudFront CDN: `d1vmgkc8kwdpn5.cloudfront.net`
✅ Gallery Page: `presentations.html`
✅ Upload Script: `upload-presentation.sh`

### Categories Created
✅ 5g/
✅ migration/
✅ security/
✅ datacenter/
✅ automation/
✅ cloud/

### Documentation
📚 Full Setup Guide: `PRESENTATIONS-SETUP.md`
📚 Quick Start: `QUICK-START-PRESENTATIONS.md` (this file)

---

## ⚡ Pro Tips

1. **File Naming**: Use descriptive names without spaces
   - ✅ Good: `5g-core-migration-v2.pdf`
   - ❌ Bad: `Presentation 1 (final).pdf`

2. **File Size**: Keep PDFs under 20MB for faster loading
   - Compress images in PowerPoint before exporting
   - Use "Save As PDF" with reduced quality if needed

3. **Version Control**: Include version numbers in filenames
   - `network-migration-v1.pdf`
   - `network-migration-v2.pdf`

4. **Update Gallery**: After uploading, edit `presentations.html` to add metadata

5. **Cache Invalidation**: If you replace a file with the same name, invalidate CloudFront cache:
   ```bash
   aws cloudfront create-invalidation \
       --distribution-id E2W1VWYOB3FXIM \
       --paths "/5g/your-file.pdf"
   ```

---

## 🆘 Need Help?

- **Full Documentation**: See `PRESENTATIONS-SETUP.md`
- **AWS Console**: https://console.aws.amazon.com/s3/
- **CloudFront Console**: https://console.aws.amazon.com/cloudfront/
- **Support**: apj-sp-cto@cisco.com

---

## 📈 Next Steps

1. ✅ Upload your first presentation
2. ✅ Share the gallery link with a customer
3. ✅ Update `presentations.html` with real presentation metadata
4. ⬜ (Optional) Set up custom domain `slides.ciscoaidemo.com`
5. ⬜ (Optional) Enable S3 access logging for analytics

---

**Ready to go!** Upload your first presentation now:
```bash
./upload-presentation.sh your-presentation.pdf 5g
```
