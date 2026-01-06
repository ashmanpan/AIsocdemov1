// AWS Amplify Configuration for Cisco AI Operations Center
// This file configures Amplify Auth for the application

// Amplify configuration
const amplifyConfig = {
    Auth: {
        // REQUIRED - Amazon Cognito Region
        region: 'us-east-1',

        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: 'us-east-1_lYlR3MFjJ',

        // OPTIONAL - Amazon Cognito Web Client ID
        userPoolWebClientId: '3lli4e0mpa6ptbpmusmjqosttj',

        // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
        mandatorySignIn: false,

        // OPTIONAL - Configuration for cookie storage
        cookieStorage: {
            // REQUIRED - Cookie domain
            domain: window.location.hostname,
            // OPTIONAL - Cookie path
            path: '/',
            // OPTIONAL - Cookie expiration in days
            expires: 365,
            // OPTIONAL - Cookie secure flag
            secure: window.location.protocol === 'https:',
            // OPTIONAL - See: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite
            sameSite: 'strict',
        },

        // OPTIONAL - Manually set the authentication flow type
        authenticationFlowType: 'USER_SRP_AUTH',

        // OAuth configuration with Cognito domain
        oauth: {
            domain: 'cisco-ai-ops-demo.auth.us-east-1.amazoncognito.com',
            scope: ['email', 'profile', 'openid'],
            redirectSignIn: window.location.origin + '/admin-videos.html',
            redirectSignOut: window.location.origin + '/index.html',
            responseType: 'code',
        },
    }
};

// Initialize Amplify when the script loads (using AWS CDN globals)
if (typeof window !== 'undefined' && window.aws_amplify_core) {
    // Configure Amplify core
    window.aws_amplify_core.Amplify.configure(amplifyConfig);
    console.log('Amplify configured successfully');
}

// Authentication helper functions (using AWS CDN auth global)
const AmplifyAuthService = {
    // Sign up a new user
    async signUp(email, password, attributes) {
        try {
            const { user } = await window.aws_amplify_auth.Auth.signUp({
                username: email,
                password,
                attributes: {
                    email,
                    name: `${attributes.firstName} ${attributes.lastName}`,
                    'custom:company': attributes.company || '',
                    'custom:jobTitle': attributes.jobTitle || '',
                }
            });
            return { success: true, user };
        } catch (error) {
            console.error('Error signing up:', error);
            return { success: false, error: error.message };
        }
    },

    // Confirm sign up with verification code
    async confirmSignUp(email, code) {
        try {
            await window.aws_amplify_auth.Auth.confirmSignUp(email, code);
            return { success: true };
        } catch (error) {
            console.error('Error confirming sign up:', error);
            return { success: false, error: error.message };
        }
    },

    // Sign in user
    async signIn(username, password) {
        try {
            const user = await window.aws_amplify_auth.Auth.signIn(username, password);
            return { success: true, user };
        } catch (error) {
            console.error('Error signing in:', error);
            return { success: false, error: error.message };
        }
    },

    // Sign out user
    async signOut() {
        try {
            await window.aws_amplify_auth.Auth.signOut();
            return { success: true };
        } catch (error) {
            console.error('Error signing out:', error);
            return { success: false, error: error.message };
        }
    },

    // Get current authenticated user
    async getCurrentUser() {
        try {
            const user = await window.aws_amplify_auth.Auth.currentAuthenticatedUser();
            const attributes = await window.aws_amplify_auth.Auth.userAttributes(user);
            const attributesMap = {};
            attributes.forEach(attr => {
                attributesMap[attr.Name] = attr.Value;
            });
            return { success: true, user, attributes: attributesMap };
        } catch (error) {
            console.error('No authenticated user:', error);
            return { success: false, error: error.message };
        }
    },

    // Check if user is authenticated
    async isAuthenticated() {
        try {
            await window.aws_amplify_auth.Auth.currentAuthenticatedUser();
            return true;
        } catch {
            return false;
        }
    },

    // Resend confirmation code
    async resendConfirmationCode(username) {
        try {
            await window.aws_amplify_auth.Auth.resendSignUp(username);
            return { success: true };
        } catch (error) {
            console.error('Error resending code:', error);
            return { success: false, error: error.message };
        }
    },

    // Forgot password - send reset code
    async forgotPassword(username) {
        try {
            await window.aws_amplify_auth.Auth.forgotPassword(username);
            return { success: true };
        } catch (error) {
            console.error('Error sending reset code:', error);
            return { success: false, error: error.message };
        }
    },

    // Reset password with code
    async forgotPasswordSubmit(username, code, newPassword) {
        try {
            await window.aws_amplify_auth.Auth.forgotPasswordSubmit(username, code, newPassword);
            return { success: true };
        } catch (error) {
            console.error('Error resetting password:', error);
            return { success: false, error: error.message };
        }
    },

    // Federated sign in (OAuth)
    async federatedSignIn(provider) {
        try {
            await window.aws_amplify_auth.Auth.federatedSignIn({ provider });
            return { success: true };
        } catch (error) {
            console.error('Error with federated sign in:', error);
            return { success: false, error: error.message };
        }
    }
};

// Make service available globally
window.AmplifyAuthService = AmplifyAuthService;