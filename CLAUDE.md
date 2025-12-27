# Cisco AI Demo Hub - Project Notes

## AWS Account Structure

| Profile | Account ID | Purpose |
|---------|------------|---------|
| `default` | 567097740753 | DNS (Route 53), some Amplify apps |
| `personal-dont-use` | 264314137331 | Main hosting, Cognito User Pool |

## Amplify Hosting

**App Name:** `cisco-ai-soc-demo-v25`
**App ID:** `d362xpmwzeu6f3`
**Region:** `ap-southeast-1` (Singapore)
**Account:** Personal (264314137331)
**Repository:** https://github.com/ashmanpan/AIsocdemov1

### Subdomains (all on main branch)
- allinone.ciscoaidemo.com (Main hub)
- aisoc.ciscoaidemo.com
- ainoc.ciscoaidemo.com
- aidcnoc.ciscoaidemo.com
- marketplace.ciscoaidemo.com
- pc-ai.ciscoaidemo.com
- ciscotube.ciscoaidemo.com

### Commands
```bash
# List branches
aws amplify list-branches --app-id d362xpmwzeu6f3 --profile personal-dont-use --region ap-southeast-1

# Disable Basic Auth
aws amplify update-branch --app-id d362xpmwzeu6f3 --branch-name main --no-enable-basic-auth --profile personal-dont-use --region ap-southeast-1

# Enable Basic Auth (if needed)
aws amplify update-branch --app-id d362xpmwzeu6f3 --branch-name main --enable-basic-auth --basic-auth-credentials "base64-encoded-user:pass" --profile personal-dont-use --region ap-southeast-1
```

## AWS Cognito Authentication

**User Pool ID:** `us-east-1_lYlR3MFjJ`
**User Pool Name:** `cisco-ai-ops-users`
**App Client ID:** `3lli4e0mpa6ptbpmusmjqosttj`
**Region:** `us-east-1`
**Account:** Personal (264314137331)
**Domain:** `cisco-ai-ops-demo.auth.us-east-1.amazoncognito.com`

### Features
- Self-registration enabled
- Email verification (6-digit code)
- Password policy: 8+ chars, upper, lower, number, special
- Password recovery via email

### Callback URLs (configured for all subdomains)
- https://allinone.ciscoaidemo.com/admin-videos.html
- https://aisoc.ciscoaidemo.com/admin-videos.html
- https://ainoc.ciscoaidemo.com/admin-videos.html
- https://aidcnoc.ciscoaidemo.com/admin-videos.html
- https://marketplace.ciscoaidemo.com/admin-videos.html
- https://pc-ai.ciscoaidemo.com/admin-videos.html
- https://ciscotube.ciscoaidemo.com/admin-videos.html

### Commands
```bash
# List users
aws cognito-idp list-users --user-pool-id us-east-1_lYlR3MFjJ --profile personal-dont-use --region us-east-1

# Describe user pool
aws cognito-idp describe-user-pool --user-pool-id us-east-1_lYlR3MFjJ --profile personal-dont-use --region us-east-1

# Update app client callback URLs
aws cognito-idp update-user-pool-client --user-pool-id us-east-1_lYlR3MFjJ --client-id 3lli4e0mpa6ptbpmusmjqosttj --callback-urls "URL1" "URL2" --profile personal-dont-use --region us-east-1
```

## Authentication Pages

| Page | Purpose |
|------|---------|
| `register-amplify.html` | Cognito user registration |
| `admin-login-amplify.html` | Cognito user login |
| `register.html` | OLD - localStorage based (deprecated) |
| `admin-login.html` | OLD - hardcoded credentials (deprecated) |

## OAuth Status
- **Google:** Code ready, NOT configured in Cognito
- **Webex:** NOT configured, shows error message
- Both buttons currently disabled (commented out)

## Configuration Files
- `amplify-config.js` - Cognito configuration for frontend
- `amplify.yml` - AWS Amplify build settings
