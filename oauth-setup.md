# OAuth and SSO Setup Guide

## Google Sign-In Setup

### Step 1: Create Google OAuth 2.0 Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Navigate to **APIs & Services** > **Credentials**
4. Click **Create Credentials** > **OAuth 2.0 Client ID**
5. Configure OAuth consent screen:
   - App name: Cisco AI Operations Center
   - User support email: your-email@domain.com
   - Authorized domains: amplifyapp.com
6. Create OAuth 2.0 Client ID:
   - Application type: Web application
   - Name: Cisco AI Ops Web
   - Authorized JavaScript origins:
     - https://d2r6fxflmsuxy2.amplifyapp.com
     - http://localhost:8080
   - Authorized redirect URIs:
     - https://cisco-ai-ops-demo.auth.us-east-1.amazoncognito.com/oauth2/idpresponse
7. Save the Client ID and Client Secret

### Step 2: Configure Google Provider in Cognito

```bash
# Add Google as identity provider in Cognito
aws cognito-idp create-identity-provider \
  --user-pool-id us-east-1_lYlR3MFjJ \
  --provider-name Google \
  --provider-type Google \
  --provider-details '{
    "client_id": "YOUR_GOOGLE_CLIENT_ID",
    "client_secret": "YOUR_GOOGLE_CLIENT_SECRET",
    "authorize_scopes": "profile email openid"
  }' \
  --attribute-mapping '{
    "email": "email",
    "name": "name",
    "given_name": "given_name",
    "family_name": "family_name",
    "picture": "picture"
  }' \
  --region us-east-1
```

### Step 3: Update App Client to Support Google

```bash
aws cognito-idp update-user-pool-client \
  --user-pool-id us-east-1_lYlR3MFjJ \
  --client-id 3lli4e0mpa6ptbpmusmjqosttj \
  --supported-identity-providers COGNITO Google \
  --region us-east-1
```

## Webex (Cisco) SSO Setup

### Option 1: SAML-based SSO with Webex

#### Step 1: Register Application in Webex Control Hub

1. Log in to [Webex Control Hub](https://admin.webex.com)
2. Navigate to **Management** > **Organization Settings**
3. Under **Authentication**, select **Single Sign-On**
4. Click **Configure** or **Manage SSO and IdP**
5. Add new SAML application:
   - Name: Cisco AI Operations Center
   - Entity ID: urn:amazon:cognito:sp:us-east-1_lYlR3MFjJ
   - ACS URL: https://cisco-ai-ops-demo.auth.us-east-1.amazoncognito.com/saml2/idpresponse
   - Start URL: https://d2r6fxflmsuxy2.amplifyapp.com
6. Download the IdP metadata XML file

#### Step 2: Configure SAML Provider in Cognito

```bash
# Create SAML identity provider in Cognito
aws cognito-idp create-identity-provider \
  --user-pool-id us-east-1_lYlR3MFjJ \
  --provider-name Webex \
  --provider-type SAML \
  --provider-details '{
    "MetadataURL": "https://idbroker.webex.com/idb/saml2/metadata/YOUR_ORG_ID"
  }' \
  --attribute-mapping '{
    "email": "email",
    "name": "displayName",
    "given_name": "firstName",
    "family_name": "lastName"
  }' \
  --region us-east-1
```

### Option 2: OAuth 2.0 with Webex Teams

#### Step 1: Create Webex Integration

1. Go to [Webex for Developers](https://developer.webex.com)
2. Click **My Webex Apps** > **Create a New App**
3. Select **Create an Integration**
4. Fill in the details:
   - Integration Name: Cisco AI Operations Center
   - Icon: Upload your logo
   - Description: AI-powered operations center
   - Redirect URI(s):
     - https://cisco-ai-ops-demo.auth.us-east-1.amazoncognito.com/oauth2/idpresponse
     - https://d2r6fxflmsuxy2.amplifyapp.com/callback
   - Scopes: Select:
     - spark:people_read
     - spark:kms
5. Save and note the Client ID and Client Secret

#### Step 2: Configure as Custom OIDC Provider

Since Cognito doesn't have native Webex support, we'll use a Lambda function to handle the OAuth flow:

```javascript
// lambda-webex-auth.js
exports.handler = async (event) => {
    const { code } = event.queryStringParameters;

    // Exchange code for token with Webex
    const tokenResponse = await fetch('https://webexapis.com/v1/access_token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            grant_type: 'authorization_code',
            client_id: process.env.WEBEX_CLIENT_ID,
            client_secret: process.env.WEBEX_CLIENT_SECRET,
            code: code,
            redirect_uri: process.env.REDIRECT_URI
        })
    });

    const tokens = await tokenResponse.json();

    // Get user info from Webex
    const userResponse = await fetch('https://webexapis.com/v1/people/me', {
        headers: {
            'Authorization': `Bearer ${tokens.access_token}`
        }
    });

    const user = await userResponse.json();

    // Create or update Cognito user
    // ... cognito user creation logic

    return {
        statusCode: 302,
        headers: {
            Location: `https://d2r6fxflmsuxy2.amplifyapp.com/admin-videos.html?token=${tokens.id_token}`
        }
    };
};
```

## Microsoft/Azure AD Setup

### Step 1: Register Application in Azure Portal

1. Go to [Azure Portal](https://portal.azure.com)
2. Navigate to **Azure Active Directory** > **App registrations**
3. Click **New registration**:
   - Name: Cisco AI Operations Center
   - Supported account types: Accounts in any organizational directory
   - Redirect URI: Web - https://cisco-ai-ops-demo.auth.us-east-1.amazoncognito.com/oauth2/idpresponse
4. After creation, note the Application (client) ID
5. Go to **Certificates & secrets** > **New client secret**
6. Note the secret value

### Step 2: Configure in Cognito

```bash
aws cognito-idp create-identity-provider \
  --user-pool-id us-east-1_lYlR3MFjJ \
  --provider-name Microsoft \
  --provider-type OIDC \
  --provider-details '{
    "client_id": "YOUR_AZURE_CLIENT_ID",
    "client_secret": "YOUR_AZURE_CLIENT_SECRET",
    "attributes_request_method": "GET",
    "oidc_issuer": "https://login.microsoftonline.com/YOUR_TENANT_ID/v2.0",
    "authorize_scopes": "openid profile email"
  }' \
  --attribute-mapping '{
    "email": "email",
    "name": "name",
    "given_name": "given_name",
    "family_name": "family_name"
  }' \
  --region us-east-1
```

## Implementation in Application

### Update amplify-config.js

```javascript
const amplifyConfig = {
    Auth: {
        region: 'us-east-1',
        userPoolId: 'us-east-1_lYlR3MFjJ',
        userPoolWebClientId: '3lli4e0mpa6ptbpmusmjqosttj',
        oauth: {
            domain: 'cisco-ai-ops-demo.auth.us-east-1.amazoncognito.com',
            scope: ['email', 'profile', 'openid'],
            redirectSignIn: window.location.origin + '/admin-videos.html',
            redirectSignOut: window.location.origin + '/index.html',
            responseType: 'code',
            // Social providers
            social: {
                google: {
                    clientId: 'YOUR_GOOGLE_CLIENT_ID'
                },
                microsoft: {
                    clientId: 'YOUR_AZURE_CLIENT_ID'
                }
            }
        }
    }
};
```

### Custom Webex Login Button

```javascript
function loginWithWebex() {
    const clientId = 'YOUR_WEBEX_CLIENT_ID';
    const redirectUri = encodeURIComponent('https://d2r6fxflmsuxy2.amplifyapp.com/webex-callback');
    const scope = 'spark:people_read spark:kms';

    const authUrl = `https://webexapis.com/v1/authorize?` +
        `client_id=${clientId}&` +
        `response_type=code&` +
        `redirect_uri=${redirectUri}&` +
        `scope=${scope}&` +
        `state=${generateRandomState()}`;

    window.location.href = authUrl;
}
```

## Testing OAuth Flows

### Test Google Sign-In
1. Click "Sign in with Google" button
2. Authenticate with Google account
3. Grant permissions
4. Redirected to application

### Test Webex SSO
1. Click "Sign in with Webex" button
2. Enter Webex credentials
3. Authorize application
4. Redirected to application

### Test Microsoft Sign-In
1. Click "Sign in with Microsoft" button
2. Authenticate with Microsoft account
3. Grant permissions
4. Redirected to application

## Security Considerations

1. **Store secrets securely**: Use AWS Secrets Manager or Parameter Store
2. **Validate tokens**: Always validate JWT tokens on the backend
3. **Use HTTPS**: Ensure all redirect URLs use HTTPS
4. **Implement PKCE**: Use Proof Key for Code Exchange for additional security
5. **Set appropriate scopes**: Only request necessary permissions

## Troubleshooting

### Common Issues

1. **Redirect URI mismatch**: Ensure redirect URIs match exactly in all configurations
2. **Invalid client secret**: Regenerate if expired
3. **CORS errors**: Configure CORS properly in API Gateway if using Lambda
4. **Token expiration**: Implement token refresh logic

### Debug URLs

- Cognito Hosted UI: https://cisco-ai-ops-demo.auth.us-east-1.amazoncognito.com/login
- Test OAuth flow: https://cisco-ai-ops-demo.auth.us-east-1.amazoncognito.com/oauth2/authorize?client_id=3lli4e0mpa6ptbpmusmjqosttj&response_type=code&scope=email+openid+profile&redirect_uri=https://d2r6fxflmsuxy2.amplifyapp.com/admin-videos.html