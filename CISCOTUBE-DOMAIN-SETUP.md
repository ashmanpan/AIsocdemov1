# CiscoTube Domain Setup Guide

## Overview
This guide explains how to configure `ciscotube.ciscoaidemo.com` to point to the video portal page.

## Files Created
- **ciscotube.html** - Dedicated landing page for CiscoTube video portal

## Domain Configuration Steps

### Option 1: AWS Amplify Domain Management (Recommended)

1. **Add Custom Domain in AWS Amplify Console**
   ```
   Go to AWS Amplify Console → Your App → Domain Management
   Click "Add domain"
   Enter: ciscotube.ciscoaidemo.com
   ```

2. **Configure DNS with Custom Subdomain**
   ```
   Type: CNAME
   Host: ciscotube
   Value: [Your Amplify App Domain].amplifyapp.com
   TTL: 300
   ```

3. **Set up Rewrites and Redirects**
   In Amplify Console → Rewrites and redirects:
   ```
   Source: https://ciscotube.ciscoaidemo.com
   Target: /ciscotube.html
   Type: 200 (Rewrite)
   ```

   Alternative rewrite rules:
   ```
   Source: https://ciscotube.ciscoaidemo.com/*
   Target: /ciscotube.html
   Type: 200 (Rewrite)
   ```

### Option 2: CloudFront Distribution (If using CloudFront)

1. **Add Alternate Domain Name (CNAME)**
   - Go to CloudFront Console
   - Edit your distribution
   - Add `ciscotube.ciscoaidemo.com` to Alternate Domain Names

2. **Update DNS**
   ```
   Type: CNAME
   Host: ciscotube
   Value: [Your CloudFront Distribution].cloudfront.net
   ```

3. **Add Custom Error Response**
   - Error Code: 404
   - Response Page Path: /ciscotube.html
   - HTTP Response Code: 200

### Option 3: Simple DNS Redirect

If you want a simple redirect from ciscotube.ciscoaidemo.com to the video page:

1. **DNS Configuration**
   ```
   Type: CNAME
   Host: ciscotube
   Value: allinone.ciscoaidemo.com
   ```

2. **Add Redirect Rule in Amplify**
   ```
   Source: https://ciscotube.ciscoaidemo.com
   Target: /ciscotube.html
   Type: 301 (Permanent Redirect)
   ```

## AWS CLI Commands (Alternative Method)

### Update Amplify App with Custom Domain

```bash
# Get your Amplify App ID
aws amplify list-apps

# Add custom domain
aws amplify create-domain-association \
  --app-id <YOUR_APP_ID> \
  --domain-name ciscoaidemo.com \
  --sub-domain-settings prefix=ciscotube,branchName=main

# Check domain status
aws amplify get-domain-association \
  --app-id <YOUR_APP_ID> \
  --domain-name ciscoaidemo.com
```

### Add Rewrite Rule via AWS CLI

```bash
aws amplify update-app \
  --app-id <YOUR_APP_ID> \
  --custom-rules \
    source=https://ciscotube.ciscoaidemo.com,target=/ciscotube.html,status=200
```

## Testing

After DNS propagation (can take up to 48 hours, usually 5-10 minutes):

1. Test the domain:
   ```bash
   nslookup ciscotube.ciscoaidemo.com
   ```

2. Test in browser:
   ```
   https://ciscotube.ciscoaidemo.com
   ```

3. Verify SSL certificate is working

## Features of CiscoTube Page

✅ Standalone video portal branding
✅ Uses same video library as demo-videos.html
✅ Shared localStorage for video management
✅ Search, filter, and category functionality
✅ Responsive design
✅ Direct Vimeo video embedding
✅ Clean, YouTube-like interface

## URL Structure

- **Main Portal:** https://allinone.ciscoaidemo.com
- **Video Portal:** https://ciscotube.ciscoaidemo.com
- **Admin Portal:** https://allinone.ciscoaidemo.com/admin-videos.html

## Additional Notes

- The ciscotube.html page reads from the same localStorage as demo-videos.html
- Videos added via admin-videos.html will automatically appear on CiscoTube
- The domain is a subdomain of ciscoaidemo.com, so SSL/TLS certificates should automatically cover it
- If using AWS Certificate Manager, ensure the cert includes *.ciscoaidemo.com

## Troubleshooting

**Issue: Domain not resolving**
- Check DNS propagation: https://dnschecker.org
- Verify CNAME record is correctly configured
- Wait up to 48 hours for global DNS propagation

**Issue: SSL certificate error**
- Ensure ACM certificate includes *.ciscoaidemo.com or ciscotube.ciscoaidemo.com
- Wait for certificate validation (can take a few minutes)

**Issue: 404 Not Found**
- Verify the rewrite rule is configured correctly
- Check that ciscotube.html is deployed to Amplify
- Clear browser cache and try again

**Issue: Videos not showing**
- Check browser console for errors
- Verify localStorage has video data
- Try adding videos via admin-videos.html

## Quick Setup Script

If you have AWS CLI configured:

```bash
#!/bin/bash

# Variables
APP_ID="your-app-id-here"
DOMAIN="ciscoaidemo.com"
SUBDOMAIN="ciscotube"

# Add domain
aws amplify create-domain-association \
  --app-id $APP_ID \
  --domain-name $DOMAIN \
  --sub-domain-settings prefix=$SUBDOMAIN,branchName=main

# Add rewrite rule
aws amplify update-app \
  --app-id $APP_ID \
  --custom-rules \
    source=https://$SUBDOMAIN.$DOMAIN,target=/ciscotube.html,status=200

echo "Domain configuration complete!"
echo "Please update your DNS records:"
echo "Type: CNAME"
echo "Host: $SUBDOMAIN"
echo "Value: [Your Amplify Domain]"
```

## Support

For issues or questions:
1. Check AWS Amplify Console logs
2. Verify DNS configuration
3. Test with direct file URL first: https://allinone.ciscoaidemo.com/ciscotube.html
