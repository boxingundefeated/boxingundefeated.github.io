# Setting Up GitHub OAuth for Boxing Directory Submissions

## Create a GitHub OAuth App

### For Production

1. Go to [GitHub Settings > Developer settings > OAuth Apps](https://github.com/settings/developers)
2. Click **"New OAuth App"**
3. Fill in the following:
   - **Application name**: `Boxing Directory Submissions`
   - **Homepage URL**: `https://boxingundefeated.github.io`
   - **Authorization callback URL**: `https://boxingundefeated.github.io/submit`
   - **Description** (optional): `Submit and update boxer information in the Boxing Directory`
4. Click **"Register application"**
5. You'll see your **Client ID** (public)
6. Click **"Generate a new client secret"** to get your Client Secret (keep this private!)

### For Local Development

1. Create a separate OAuth app for local testing
2. Use these URLs instead:
   - **Homepage URL**: `http://localhost:3000`
   - **Authorization callback URL**: `http://localhost:3000/submit`

## Configure the App

### Environment Variables

Create `.env.local` in the `apps/web` directory:

```bash
# GitHub OAuth
NEXT_PUBLIC_GITHUB_CLIENT_ID=your_client_id_here
NEXT_PUBLIC_GITHUB_REDIRECT_URI=http://localhost:3000/submit

# For production, use:
# NEXT_PUBLIC_GITHUB_REDIRECT_URI=https://boxingundefeated.github.io/submit
```

## How the OAuth Flow Works

1. **User clicks "Sign in with GitHub"**
   - Redirected to: `https://github.com/login/oauth/authorize`
   - With your Client ID and requested scopes

2. **User authorizes the app**
   - GitHub asks user to grant `public_repo` access
   - User approves

3. **GitHub redirects back**
   - Returns to your callback URL with a `code` parameter
   - Example: `https://boxingundefeated.github.io/submit?code=abc123`

4. **Exchange code for token**
   - Since we're using a static site, users need to:
   - Either use a personal access token
   - Or use a service like Vercel Functions to exchange the code

## Permissions Required

The app only requests `public_repo` scope, which allows:
- Read access to public repositories
- Write access to public repositories
- Create branches, commits, and pull requests

## Security Best Practices

1. **Never expose your Client Secret** in client-side code
2. **Use environment variables** for configuration
3. **Validate the OAuth state parameter** to prevent CSRF attacks
4. **Store tokens securely** (we use localStorage for simplicity)
5. **Allow users to revoke access** easily

## Troubleshooting

### "Bad credentials" error
- Token might be expired or revoked
- Check token permissions include `public_repo`

### "Not found" error when creating PR
- User might not have fork of the repository
- Repository name or owner might be incorrect

### OAuth redirect not working
- Check callback URL matches exactly (including http/https)
- Make sure Client ID is correct

## Revoking Access

Users can revoke access at any time:
1. Go to [GitHub Settings > Applications > Authorized OAuth Apps](https://github.com/settings/applications)
2. Find "Boxing Directory Submissions"
3. Click "Revoke"
