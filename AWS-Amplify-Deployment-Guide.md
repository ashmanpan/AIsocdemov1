# AWS Amplify Deployment Guide for Cisco AI SOC Telco Demo

## Prerequisites
- AWS Account with appropriate permissions
- Git repository (GitHub, GitLab, Bitbucket, or AWS CodeCommit)
- AWS CLI configured (optional, for manual deployment)

## Files Prepared for Deployment
1. `Cisco-AI-SoC-Telco-v2.5.html` - Main demo application
2. `index.html` - Landing page that redirects to main demo
3. `amplify.yml` - AWS Amplify build configuration
4. `package.json` - Project metadata
5. `ciscologo.jpg` - Cisco logo asset (if available)

## Option 1: Deploy via AWS Console (Recommended)

### Step 1: Push to Git Repository
```bash
git add .
git commit -m "Prepare Cisco AI SOC Telco Demo v2.5 for AWS Amplify deployment"
git push origin main
```

### Step 2: Create Amplify App
1. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
2. Click "New app" → "Host web app"
3. Choose your Git provider and authorize AWS Amplify
4. Select your repository and branch (main)
5. Review the build settings (amplify.yml will be auto-detected)
6. Click "Save and deploy"

### Step 3: Configure Domain (Optional)
1. In Amplify Console, go to "Domain management"
2. Add a custom domain or use the provided amplifyapp.com URL

## Option 2: Deploy via AWS CLI

### Step 1: Install Amplify CLI
```bash
npm install -g @aws-amplify/cli
amplify configure
```

### Step 2: Initialize and Deploy
```bash
# Initialize Amplify in your project
amplify init

# Answer the prompts:
# - Enter a name for the project: cisco-ai-soc-telco
# - Enter a name for the environment: prod
# - Choose your default editor
# - Choose the type of app: javascript
# - What javascript framework: none
# - Source Directory Path: /
# - Distribution Directory Path: /
# - Build Command: echo "No build"
# - Start Command: echo "No start"

# Add hosting
amplify add hosting

# Choose:
# - Hosting with Amplify Console
# - Manual deployment

# Publish
amplify publish
```

## Option 3: Direct Upload (Quick Test)

### Step 1: Create S3 Bucket with Static Hosting
```bash
# Create bucket
aws s3 mb s3://cisco-ai-soc-telco-demo-[unique-suffix]

# Enable static website hosting
aws s3 website s3://cisco-ai-soc-telco-demo-[unique-suffix] \
  --index-document index.html

# Upload files
aws s3 sync . s3://cisco-ai-soc-telco-demo-[unique-suffix] \
  --exclude ".git/*" \
  --exclude "*.md" \
  --exclude ".gitignore"

# Set bucket policy for public access
aws s3api put-bucket-policy \
  --bucket cisco-ai-soc-telco-demo-[unique-suffix] \
  --policy '{
    "Version": "2012-10-17",
    "Statement": [{
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::cisco-ai-soc-telco-demo-[unique-suffix]/*"
    }]
  }'
```

## Post-Deployment Configuration

### Environment Variables (if needed)
In Amplify Console:
1. Go to "App settings" → "Environment variables"
2. Add any required variables

### Redirects and Rewrites
Already configured via index.html redirect. If needed, add to amplify.yml:
```yaml
customHeaders:
  - pattern: '**/*'
    headers:
      - key: 'X-Frame-Options'
        value: 'SAMEORIGIN'
      - key: 'X-Content-Type-Options'
        value: 'nosniff'
```

### Performance Optimization
The demo is already optimized as a single-page application with:
- Inline CSS and JavaScript
- No external dependencies
- Minimal asset loading

## Monitoring and Analytics

### Enable Amplify Monitoring
1. In Amplify Console, go to "Monitoring"
2. View metrics for:
   - Page views
   - Unique visitors
   - Error rates
   - Performance metrics

### CloudWatch Integration
Amplify automatically sends logs to CloudWatch for debugging.

## Security Considerations

1. **Content Security Policy**: Add CSP headers if needed
2. **HTTPS**: Amplify provides HTTPS by default
3. **Access Control**: Use Amplify auth if restricted access is needed

## Troubleshooting

### Common Issues:
1. **Build Fails**: Check amplify.yml syntax
2. **404 Errors**: Ensure index.html redirect is working
3. **Logo Not Loading**: Verify ciscologo.jpg is in the repository

### Debug Commands:
```bash
# View Amplify app status
amplify status

# View build logs
amplify console

# Test locally
npx http-server -p 8080
```

## Cost Estimation
- Amplify Hosting: ~$0.15 per GB served
- Build minutes: 1000 free minutes/month
- Storage: $0.023 per GB/month

For this static demo, costs should be minimal (<$1/month for moderate traffic).

## Next Steps
1. Set up CI/CD pipeline for automatic deployments
2. Add authentication if needed
3. Configure custom domain
4. Set up monitoring alerts
5. Enable Amplify Analytics for usage insights