# AWS Amplify Auth Setup Guide

## Prerequisites
- AWS Account with appropriate permissions
- Access to AWS Console
- Your Amplify App ID

## Step 1: Create Cognito User Pool

### Option A: Using AWS Console

1. Go to AWS Cognito Console: https://console.aws.amazon.com/cognito/
2. Click "Create user pool"
3. Configure sign-in options:
   - Select "Email" as sign-in option
   - Click "Next"

4. Configure security requirements:
   - Password policy:
     - Minimum length: 8
     - Require uppercase letters
     - Require lowercase letters
     - Require numbers
     - Require special characters
   - Multi-factor authentication: Optional (recommended)
   - Click "Next"

5. Configure sign-up experience:
   - Enable self-registration
   - Allow Cognito to automatically send verification emails
   - Required attributes:
     - email (required)
     - name
   - Custom attributes (add these):
     - company (string)
     - jobTitle (string)
     - industry (string)
   - Click "Next"

6. Configure message delivery:
   - Email provider: Cognito default
   - FROM email address: no-reply@verificationemail.com
   - Click "Next"

7. Integrate your app:
   - User pool name: `cisco-ai-ops-users`
   - App client name: `cisco-ai-ops-web`
   - Don't generate client secret (for public clients)
   - Enable "ALLOW_USER_SRP_AUTH" authentication flow
   - Click "Next"

8. Review and create
   - Click "Create user pool"

### Option B: Using AWS CLI

```bash
# Create user pool
aws cognito-idp create-user-pool \
  --pool-name cisco-ai-ops-users \
  --policies '{
    "PasswordPolicy": {
      "MinimumLength": 8,
      "RequireUppercase": true,
      "RequireLowercase": true,
      "RequireNumbers": true,
      "RequireSymbols": true
    }
  }' \
  --auto-verified-attributes email \
  --username-attributes email \
  --schema '[
    {
      "Name": "email",
      "AttributeDataType": "String",
      "Required": true,
      "Mutable": true
    },
    {
      "Name": "name",
      "AttributeDataType": "String",
      "Required": false,
      "Mutable": true
    },
    {
      "Name": "company",
      "AttributeDataType": "String",
      "DeveloperOnlyAttribute": false,
      "Mutable": true
    },
    {
      "Name": "jobTitle",
      "AttributeDataType": "String",
      "DeveloperOnlyAttribute": false,
      "Mutable": true
    },
    {
      "Name": "industry",
      "AttributeDataType": "String",
      "DeveloperOnlyAttribute": false,
      "Mutable": true
    }
  ]' \
  --region us-east-1

# Create app client (note the user pool ID from above)
aws cognito-idp create-user-pool-client \
  --user-pool-id YOUR_USER_POOL_ID \
  --client-name cisco-ai-ops-web \
  --no-generate-secret \
  --explicit-auth-flows ALLOW_USER_SRP_AUTH ALLOW_REFRESH_TOKEN_AUTH \
  --region us-east-1
```

## Step 2: Configure OAuth (Optional - for Social Sign-in)

1. In Cognito User Pool, go to "App Integration" tab
2. Create a domain:
   - Domain prefix: `cisco-ai-ops` (or your choice)
   - Save

3. Configure app client settings:
   - Enable identity providers:
     - Cognito User Pool
     - Google (if configured)
     - Microsoft (if configured)
   - Callback URLs:
     - https://your-amplify-domain/admin-videos.html
     - http://localhost:8080/admin-videos.html (for testing)
   - Sign out URLs:
     - https://your-amplify-domain/index.html
     - http://localhost:8080/index.html (for testing)
   - OAuth 2.0 Grant Types:
     - Authorization code grant
   - OpenID Connect scopes:
     - email
     - openid
     - profile

## Step 3: Update amplify-config.js

1. Get your User Pool ID:
   - Found in Cognito Console > User pools > cisco-ai-ops-users > General settings

2. Get your App Client ID:
   - Found in Cognito Console > User pools > cisco-ai-ops-users > App clients

3. Update the configuration in `amplify-config.js`:

```javascript
const amplifyConfig = {
    Auth: {
        region: 'us-east-1',
        userPoolId: 'us-east-1_XXXXXXXXX', // Your User Pool ID
        userPoolWebClientId: 'XXXXXXXXXXXXXXXXXXXXXXXXXX', // Your App Client ID
        oauth: {
            domain: 'cisco-ai-ops.auth.us-east-1.amazoncognito.com', // Your Cognito domain
            // ... rest of OAuth config
        }
    }
};
```

## Step 4: Create Admin Users

### Via Console:
1. Go to Cognito Console > User pools > cisco-ai-ops-users > Users
2. Click "Create user"
3. Enter details:
   - Username: admin@cisco.com
   - Email: admin@cisco.com
   - Temporary password: TempPass123!
   - Mark as verified

### Via CLI:
```bash
aws cognito-idp admin-create-user \
  --user-pool-id YOUR_USER_POOL_ID \
  --username admin@cisco.com \
  --user-attributes Name=email,Value=admin@cisco.com Name=email_verified,Value=true \
  --temporary-password TempPass123! \
  --message-action SUPPRESS \
  --region us-east-1
```

## Step 5: Set Up User Groups (for Role-Based Access)

```bash
# Create admin group
aws cognito-idp create-group \
  --group-name admins \
  --user-pool-id YOUR_USER_POOL_ID \
  --description "Admin users with full access" \
  --region us-east-1

# Create video-admin group
aws cognito-idp create-group \
  --group-name video-admins \
  --user-pool-id YOUR_USER_POOL_ID \
  --description "Video administrators" \
  --region us-east-1

# Create users group
aws cognito-idp create-group \
  --group-name users \
  --user-pool-id YOUR_USER_POOL_ID \
  --description "Regular users with view access" \
  --region us-east-1

# Add user to admin group
aws cognito-idp admin-add-user-to-group \
  --user-pool-id YOUR_USER_POOL_ID \
  --username admin@cisco.com \
  --group-name admins \
  --region us-east-1
```

## Step 6: Deploy and Test

1. Commit and push your changes:
```bash
git add .
git commit -m "Add Amplify Auth integration"
git push
```

2. Amplify will automatically deploy the changes

3. Test the authentication:
   - Visit https://your-amplify-domain/register.html
   - Sign up with a test account
   - Check email for verification code
   - Login at https://your-amplify-domain/admin-login.html

## Environment Variables for Amplify Console

In Amplify Console, add these environment variables:
1. Go to Amplify Console > App settings > Environment variables
2. Add:
   - `VITE_USER_POOL_ID`: Your Cognito User Pool ID
   - `VITE_USER_POOL_CLIENT_ID`: Your App Client ID
   - `VITE_COGNITO_DOMAIN`: Your Cognito domain

## Troubleshooting

### CORS Issues
If you encounter CORS errors, ensure your Amplify app domain is whitelisted in Cognito app client settings.

### Email Verification
- For production, configure SES for custom email domains
- Default Cognito emails have a daily limit of 50 emails

### Social Sign-in
- Google: Set up OAuth 2.0 credentials in Google Cloud Console
- Microsoft: Register app in Azure AD

## Security Best Practices

1. **Enable MFA**: Configure multi-factor authentication for admin accounts
2. **Password Policy**: Enforce strong password requirements
3. **Token Expiration**: Configure appropriate token expiration times
4. **API Throttling**: Set up AWS WAF rules to prevent brute force
5. **Monitoring**: Enable CloudWatch logs for authentication events

## Cost Estimation

- First 50,000 MAUs free
- $0.0055 per MAU after free tier
- Additional charges for MFA and advanced security features

## Support

For issues, check:
- AWS Cognito documentation: https://docs.aws.amazon.com/cognito/
- Amplify Auth documentation: https://docs.amplify.aws/lib/auth/getting-started/