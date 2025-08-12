# GitHub Authentication Setup for Boxing Directory

This guide explains how to set up authentication for submitting boxers to the Boxing Directory.

## Overview

The Boxing Directory uses GitHub Pull Requests to manage submissions. When users submit a new boxer or edit an existing one, the system creates a PR with the changes for review.

Since this is a static site hosted on GitHub Pages, we use **Personal Access Tokens (PATs)** for authentication.

## For Users: How to Submit Boxers

### Step 1: Create a GitHub Personal Access Token

1. Go to the submission page: https://boxingundefeated.github.io/submit
2. Click the **"Create token"** link or go directly to: https://github.com/settings/tokens/new
3. Configure your token:
   - **Token name**: `Boxing Directory Submissions`
   - **Expiration**: Choose your preference (90 days recommended)
   - **Scopes**: Select only `public_repo` ✓
4. Click **"Generate token"** at the bottom
5. **IMPORTANT**: Copy the token immediately (it starts with `ghp_`)

### Step 2: Use Your Token

1. Return to the submission page
2. Paste your token in the "GitHub Personal Access Token" field
3. Press **Enter** to save it
4. You'll see your GitHub username appear, confirming authentication

### Step 3: Submit Your Boxer

1. Fill out the boxer information form
2. Review your submission
3. Click **"Create Pull Request"**
4. Your submission will create a PR for review

## For Developers: Implementation Details

### Current Implementation (Static Site)

The submission form (`apps/web/components/forms/submit-form.tsx`) uses Personal Access Tokens directly:

1. User enters their PAT
2. Token is stored in localStorage
3. Token is used to authenticate GitHub API calls
4. PRs are created directly using the GitHub API

### Optional: OAuth Implementation

If you want to implement proper OAuth flow, you'll need a backend service to exchange authorization codes for access tokens. Here's how:

#### 1. Create a GitHub OAuth App

1. Go to [GitHub Settings > Developer settings > OAuth Apps](https://github.com/settings/developers)
2. Click **"New OAuth App"**
3. Configure:
   - **Application name**: `Boxing Directory Submissions`
   - **Homepage URL**: `https://boxingundefeated.github.io`
   - **Authorization callback URL**: `https://boxingundefeated.github.io/submit`
4. Save your Client ID and Client Secret

#### 2. Set Up Token Exchange Service

Create a backend service (e.g., using Vercel Functions, Netlify Functions, or AWS Lambda) that:

```javascript
// Example endpoint: POST /api/github/token
async function exchangeToken(code) {
  const response = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code: code,
    }),
  });
  
  const data = await response.json();
  return data.access_token;
}
```

#### 3. Configure Environment Variables

```bash
# .env.local
NEXT_PUBLIC_GITHUB_CLIENT_ID=your_client_id
NEXT_PUBLIC_TOKEN_EXCHANGE_URL=https://your-service.com/api/github/token
```

## Security Considerations

### For Personal Access Tokens

- Tokens are stored in browser localStorage
- Never commit tokens to the repository
- Users can revoke tokens at: https://github.com/settings/tokens
- Tokens should have minimal scopes (only `public_repo`)

### For OAuth Implementation

- Client Secret must never be exposed in client-side code
- Use HTTPS for all token exchanges
- Implement CSRF protection using state parameters
- Consider token expiration and refresh mechanisms

## Troubleshooting

### "Bad credentials" error
- Token might be expired or revoked
- Verify token starts with `ghp_` or `github_pat_`
- Check token has `public_repo` scope

### "Not found" error when creating PR
- Ensure the repository is public
- Verify repository name: `boxingundefeated/boxingundefeated.github.io`

### Token not working
1. Go to https://github.com/settings/tokens
2. Check if your token is listed and active
3. Verify it has `public_repo` scope
4. Try regenerating the token

## Revoking Access

To revoke a Personal Access Token:
1. Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
2. Find your token
3. Click **"Delete"**

## Support

For issues or questions:
- Open an issue: https://github.com/boxingundefeated/boxingundefeated.github.io/issues
- Check existing PRs: https://github.com/boxingundefeated/boxingundefeated.github.io/pulls