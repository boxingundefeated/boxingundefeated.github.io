# Setting Up GitHub OAuth with Vercel

This guide explains how to deploy the OAuth token exchange function to Vercel for a seamless authentication experience.

## Quick Setup

### 1. Create a GitHub OAuth App

1. Go to [GitHub Settings > Developer settings > OAuth Apps](https://github.com/settings/developers)
2. Click **"New OAuth App"**
3. Fill in:
   - **Application name**: `Boxing Directory Submissions`
   - **Homepage URL**: `https://boxingundefeated.github.io`
   - **Authorization callback URL**: `https://boxingundefeated.github.io/submit`
4. Click **"Register application"**
5. Save your **Client ID**
6. Click **"Generate a new client secret"** and save it

### 2. Deploy to Vercel

You have two options:

#### Option A: Deploy the Token Exchange Function Only

If you want to keep the main site on GitHub Pages and only use Vercel for the OAuth token exchange:

1. Create a new Vercel project
2. Deploy only the `api` directory:
   ```bash
   # In the apps/web directory
   vercel --prod api/
   ```
3. Set environment variables in Vercel dashboard:
   ```
   GITHUB_CLIENT_ID=your_client_id
   GITHUB_CLIENT_SECRET=your_client_secret
   ```
4. Update your `.env.local`:
   ```
   NEXT_PUBLIC_TOKEN_EXCHANGE_URL=https://your-project.vercel.app/api/auth/token
   NEXT_PUBLIC_GITHUB_CLIENT_ID=your_client_id
   ```

#### Option B: Deploy the Entire Next.js App to Vercel

If you want to move the entire site to Vercel (recommended for OAuth):

1. Import your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard:
   ```
   GITHUB_CLIENT_ID=your_client_id
   GITHUB_CLIENT_SECRET=your_client_secret
   NEXT_PUBLIC_GITHUB_CLIENT_ID=your_client_id
   ```
3. Deploy!

### 3. Environment Variables in Vercel

Go to your Vercel project settings and add these environment variables:

| Variable | Value | Type |
|----------|-------|------|
| `GITHUB_CLIENT_ID` | Your GitHub OAuth App Client ID | Secret |
| `GITHUB_CLIENT_SECRET` | Your GitHub OAuth App Client Secret | Secret |
| `NEXT_PUBLIC_GITHUB_CLIENT_ID` | Your GitHub OAuth App Client ID | Public |

## How It Works

1. **User clicks "Sign in with GitHub"**
   - Redirected to GitHub OAuth authorization page
   
2. **User authorizes the app**
   - GitHub redirects back with an authorization code
   
3. **Token exchange via Vercel function**
   - Frontend sends code to `/api/auth/token`
   - Vercel function exchanges code for access token
   - Token returned to frontend
   
4. **Frontend stores token**
   - Token saved in localStorage
   - Used for all GitHub API calls

## Local Development

For local development with the OAuth flow:

1. Create `.env.local`:
   ```bash
   GITHUB_CLIENT_ID=your_client_id
   GITHUB_CLIENT_SECRET=your_client_secret
   NEXT_PUBLIC_GITHUB_CLIENT_ID=your_client_id
   ```

2. Run the development server:
   ```bash
   vercel dev
   ```
   This will run both the Next.js app and the serverless functions locally.

## Security Notes

- **Never expose `GITHUB_CLIENT_SECRET`** in client-side code
- The secret is only used in the Vercel serverless function
- Tokens are stored in browser localStorage
- Users can revoke OAuth app access at any time in GitHub settings

## Testing the OAuth Flow

1. Visit `/submit` page
2. Click "Sign in with GitHub OAuth"
3. Authorize the app on GitHub
4. You'll be redirected back and automatically authenticated
5. Fill out the boxer form
6. Submit to create a PR

## Fallback to Personal Access Tokens

If the OAuth flow fails or isn't configured, users can still use Personal Access Tokens:
1. The form will show instructions for creating a PAT
2. Users paste their token directly
3. Everything else works the same

## Troubleshooting

### "Failed to exchange code for token"
- Check `GITHUB_CLIENT_SECRET` is set correctly in Vercel
- Verify the redirect URI matches exactly

### CORS errors
- Make sure you're accessing the site from the correct domain
- Check that the Vercel function is deployed correctly

### Token not persisting
- Check browser localStorage isn't blocked
- Try clearing localStorage and re-authenticating

## Support

For issues with the OAuth setup:
1. Check Vercel function logs in the dashboard
2. Verify all environment variables are set
3. Ensure GitHub OAuth app settings match your URLs