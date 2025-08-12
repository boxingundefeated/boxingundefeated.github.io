'use client'

import { Button } from '@boxingundefeated/design-system/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@boxingundefeated/design-system/card'
import { Input } from '@boxingundefeated/design-system/input'
import { Label } from '@boxingundefeated/design-system/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@boxingundefeated/design-system/select'
import { Textarea } from '@boxingundefeated/design-system/textarea'
import { AlertCircle, CheckCircle, ExternalLink, Github, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

type SubmissionType = 'new' | 'edit'

interface BoxerFormData {
  // Basic Info
  name: string
  birthName?: string
  nicknames?: string
  dateOfBirth?: string
  nationality?: string

  // Physical Attributes
  height?: string
  reach?: string
  stance?: string

  // Location
  birthPlace?: string
  residence?: string

  // Career Info
  proDivision?: string
  proStatus?: string
  proWins?: number
  proWinsByKnockout?: number
  proLosses?: number
  proDraws?: number

  // Additional
  bio?: string
  avatarImageUrl?: string

  // For edits
  existingBoxerSlug?: string
}

const DIVISIONS = [
  'Heavyweight',
  'Cruiserweight',
  'Light Heavyweight',
  'Super Middleweight',
  'Middleweight',
  'Super Welterweight',
  'Welterweight',
  'Super Lightweight',
  'Lightweight',
  'Super Featherweight',
  'Featherweight',
  'Super Bantamweight',
  'Bantamweight',
  'Super Flyweight',
  'Flyweight',
  'Light Flyweight',
  'Minimumweight'
]

const STANCES = ['Orthodox', 'Southpaw', 'Switch']
const PRO_STATUS = ['Active', 'Inactive', 'Retired', 'Deceased']

// GitHub OAuth Configuration
const GITHUB_CLIENT_ID = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID || 'Ov23liUq0yH0LslGJmJ2'
const TOKEN_EXCHANGE_URL =
  process.env.NEXT_PUBLIC_TOKEN_EXCHANGE_URL ||
  (process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/auth/token`
    : typeof window !== 'undefined' && window.location.hostname !== 'localhost'
      ? '/api/auth/token'
      : 'http://localhost:3000/api/auth/token')
const GITHUB_SCOPE = 'public_repo'

export function SubmitForm() {
  const [submissionType, setSubmissionType] = useState<SubmissionType>('new')
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [prUrl, setPrUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [githubToken, setGithubToken] = useState<string | null>(null)
  const [githubUser, setGithubUser] = useState<any>(null)

  const [formData, setFormData] = useState<BoxerFormData>({
    name: '',
    nationality: ''
  })

  // Handle GitHub OAuth callback or check for existing token
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get('code')

    if (code && !githubToken) {
      // If we have a token exchange service, use it
      if (TOKEN_EXCHANGE_URL) {
        exchangeCodeForToken(code)
      } else {
        // For static sites, we can't exchange the code
        // Clean up URL and show instructions
        window.history.replaceState({}, document.title, '/submit')
        setError('Please use a Personal Access Token for authentication (see instructions below)')
      }
    } else {
      // Check for existing token
      const storedToken = localStorage.getItem('github_token')
      if (storedToken) {
        setGithubToken(storedToken)
        fetchGithubUser(storedToken)
      }
    }
  }, [githubToken])

  const exchangeCodeForToken = async (code: string) => {
    try {
      const response = await fetch(TOKEN_EXCHANGE_URL!, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code })
      })

      if (response.ok) {
        const data = await response.json()
        if (data.access_token) {
          localStorage.setItem('github_token', data.access_token)
          setGithubToken(data.access_token)
          fetchGithubUser(data.access_token)
        }
      } else {
        setError(
          'Failed to exchange authorization code. Please use a Personal Access Token instead.'
        )
      }
    } catch (error) {
      console.error('Failed to exchange code:', error)
      setError('Failed to exchange authorization code. Please use a Personal Access Token instead.')
    }
  }

  const fetchGithubUser = async (token: string) => {
    try {
      const response = await fetch('https://api.github.com/user', {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.v3+json'
        }
      })

      if (response.ok) {
        const user = await response.json()
        setGithubUser(user)
        setError(null) // Clear any previous errors
      } else {
        // Token might be invalid
        localStorage.removeItem('github_token')
        setGithubToken(null)
        setError('Invalid token. Please check your Personal Access Token.')
      }
    } catch (error) {
      console.error('Failed to fetch GitHub user:', error)
      setError('Failed to verify GitHub token.')
    }
  }

  const handleGithubAuth = () => {
    if (!GITHUB_CLIENT_ID) {
      setError('GitHub OAuth is not configured. Please use a Personal Access Token.')
      return
    }
    const redirectUri = `${window.location.origin}/submit`
    const authUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${GITHUB_SCOPE}`
    window.location.href = authUrl
  }

  const handleLogout = () => {
    localStorage.removeItem('github_token')
    localStorage.removeItem('github_auth_code')
    setGithubToken(null)
    setGithubUser(null)
  }

  const handleInputChange = (field: keyof BoxerFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const validateStep1 = () => {
    if (!formData.name.trim()) {
      setError('Boxer name is required')
      return false
    }
    setError(null)
    return true
  }

  const validateStep2 = () => {
    if (!formData.nationality?.trim()) {
      setError('Nationality is required')
      return false
    }
    setError(null)
    return true
  }

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2)
    } else if (step === 2 && validateStep2()) {
      setStep(3)
    }
  }

  const handleBack = () => {
    setError(null)
    setStep(Math.max(1, step - 1))
  }

  const createGitHubPR = async () => {
    if (!githubToken) {
      setError('Please authenticate with GitHub first')
      return null
    }

    const repoOwner = 'boxingundefeated'
    const repoName = 'boxingundefeated.github.io'
    const baseBranch = 'main'

    // Generate slug from name
    const slug = formData.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')

    // Create boxer data object
    const boxerData = {
      id: slug,
      slug: slug,
      name: formData.name,
      birthName: formData.birthName || null,
      nicknames: formData.nicknames || null,
      dateOfBirth: formData.dateOfBirth || null,
      nationality: formData.nationality,
      height: formData.height || null,
      reach: formData.reach || null,
      stance: formData.stance || null,
      birthPlace: formData.birthPlace || null,
      residence: formData.residence || null,
      proDivision: formData.proDivision || null,
      proStatus: formData.proStatus || null,
      proWins: formData.proWins || 0,
      proWinsByKnockout: formData.proWinsByKnockout || 0,
      proLosses: formData.proLosses || 0,
      proDraws: formData.proDraws || 0,
      bio: formData.bio || null,
      avatarImage: formData.avatarImageUrl || null,
      proTotalBouts: (formData.proWins || 0) + (formData.proLosses || 0) + (formData.proDraws || 0)
    }

    try {
      // 1. Get the base branch reference
      const refResponse = await fetch(
        `https://api.github.com/repos/${repoOwner}/${repoName}/git/ref/heads/${baseBranch}`,
        {
          headers: {
            Authorization: `Bearer ${githubToken}`,
            Accept: 'application/vnd.github.v3+json'
          }
        }
      )

      if (!refResponse.ok) {
        throw new Error('Failed to get base branch reference')
      }

      const refData = await refResponse.json()
      const baseSha = refData.object.sha

      // 2. Create a new branch
      const branchName = `boxer-${slug}-${Date.now()}`
      const createBranchResponse = await fetch(
        `https://api.github.com/repos/${repoOwner}/${repoName}/git/refs`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${githubToken}`,
            Accept: 'application/vnd.github.v3+json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ref: `refs/heads/${branchName}`,
            sha: baseSha
          })
        }
      )

      if (!createBranchResponse.ok) {
        throw new Error('Failed to create branch')
      }

      // 3. Create/update the boxer JSON file
      const filePath = `apps/web/public/data/boxers/${slug}.json`
      const fileContent = JSON.stringify(boxerData, null, 2)
      const encodedContent = btoa(unescape(encodeURIComponent(fileContent)))

      // Check if file exists (for updates)
      let existingSha = null
      if (submissionType === 'edit') {
        const existingFileResponse = await fetch(
          `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`,
          {
            headers: {
              Authorization: `Bearer ${githubToken}`,
              Accept: 'application/vnd.github.v3+json'
            }
          }
        )

        if (existingFileResponse.ok) {
          const existingFile = await existingFileResponse.json()
          existingSha = existingFile.sha
        }
      }

      // Create or update file
      const fileResponse = await fetch(
        `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${githubToken}`,
            Accept: 'application/vnd.github.v3+json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            message: `${submissionType === 'new' ? 'Add' : 'Update'} boxer: ${formData.name}`,
            content: encodedContent,
            branch: branchName,
            ...(existingSha && { sha: existingSha })
          })
        }
      )

      if (!fileResponse.ok) {
        throw new Error('Failed to create/update file')
      }

      // 4. Create pull request
      const prResponse = await fetch(
        `https://api.github.com/repos/${repoOwner}/${repoName}/pulls`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${githubToken}`,
            Accept: 'application/vnd.github.v3+json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            title: `${submissionType === 'new' ? '[New Boxer]' : '[Update]'} ${formData.name}`,
            head: branchName,
            base: baseBranch,
            body: `## Boxer Submission

**Type:** ${submissionType === 'new' ? '🆕 New Boxer' : '✏️ Update Existing Boxer'}
**Name:** ${formData.name}
**Nationality:** ${formData.nationality}
${formData.proDivision ? `**Division:** ${formData.proDivision}` : ''}
${formData.proStatus ? `**Status:** ${formData.proStatus}` : ''}
${formData.proWins || formData.proLosses || formData.proDraws ? `**Record:** ${formData.proWins || 0}-${formData.proLosses || 0}-${formData.proDraws || 0} (${formData.proWinsByKnockout || 0} KOs)` : ''}

### Data File
- \`${filePath}\`

### Checklist
- [ ] Boxer information is accurate
- [ ] Data format is correct
- [ ] No duplicate entries
${formData.avatarImageUrl ? '- [ ] Image URL is valid' : ''}

---
*Submitted by @${githubUser?.login || 'unknown'} via the Boxing Directory submission form.*`
          })
        }
      )

      if (!prResponse.ok) {
        const errorData = await prResponse.json()
        throw new Error(errorData.message || 'Failed to create pull request')
      }

      const prData = await prResponse.json()
      return prData.html_url
    } catch (err) {
      console.error('Error creating PR:', err)
      throw err
    }
  }

  const handleSubmit = async () => {
    if (!githubToken) {
      setError('Please sign in with GitHub to submit')
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const url = await createGitHubPR()
      if (url) {
        setPrUrl(url)
        setStep(4) // Success step
      }
    } catch (err: any) {
      setError(err.message || 'Failed to create submission. Please try again.')
      console.error('Submission error:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setFormData({ name: '', nationality: '' })
    setStep(1)
    setPrUrl(null)
    setError(null)
    setSubmissionType('new')
  }

  // GitHub Auth required screen
  if (!githubToken && step === 1) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Sign in with GitHub</CardTitle>
          <CardDescription>To submit boxers, you need to authenticate with GitHub</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            We use GitHub to manage submissions. Your PR will be reviewed by our team before being
            merged.
          </p>

          <div className="bg-amber-50 dark:bg-amber-950 p-4 rounded-lg">
            <p className="text-sm font-semibold mb-2">For GitHub Pages Users:</p>
            <p className="text-sm mb-2">
              Since this is a static site, you'll need to use a Personal Access Token:
            </p>
            <ol className="text-sm ml-4 list-decimal space-y-1">
              <li>Click "Create token" below to go to GitHub</li>
              <li>Name it "Boxing Directory Submissions"</li>
              <li>
                Select the{' '}
                <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">public_repo</code> scope
              </li>
              <li>Generate the token and copy it</li>
              <li>Paste it in the field below and press Enter</li>
            </ol>
          </div>

          <div className="space-y-2">
            <Label htmlFor="github-token">GitHub Personal Access Token</Label>
            <Input
              id="github-token"
              type="password"
              placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
              onKeyDown={e => {
                if (e.key === 'Enter' && e.currentTarget.value) {
                  const token = e.currentTarget.value.trim()
                  if (!token.startsWith('ghp_') && !token.startsWith('github_pat_')) {
                    setError('Invalid token format. GitHub tokens start with ghp_ or github_pat_')
                    return
                  }
                  localStorage.setItem('github_token', token)
                  setGithubToken(token)
                  fetchGithubUser(token)
                  e.currentTarget.value = '' // Clear the input after saving
                }
              }}
            />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Press Enter to save token</span>
              <Link
                href="https://github.com/settings/tokens/new?scopes=public_repo&description=Boxing%20Directory%20Submissions"
                target="_blank"
                className="text-blue-600 hover:underline inline-flex items-center gap-1"
              >
                Create token <ExternalLink className="h-3 w-3" />
              </Link>
            </div>
          </div>

          {GITHUB_CLIENT_ID && TOKEN_EXCHANGE_URL && (
            <>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or</span>
                </div>
              </div>

              <Button onClick={handleGithubAuth} className="w-full" variant="outline">
                <Github className="mr-2 h-4 w-4" />
                Sign in with GitHub OAuth
              </Button>
            </>
          )}

          <div className="text-xs text-muted-foreground space-y-1">
            <p>Your token is stored locally in your browser.</p>
            <p>We never send it to our servers.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Success state
  if (step === 4) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle className="h-5 w-5" />
            <CardTitle>Pull Request Created!</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Your submission has been successfully created as a pull request.</p>
          <p className="text-sm text-muted-foreground">
            Our team will review your submission and merge it if everything looks good.
          </p>
          {prUrl && (
            <Link
              href={prUrl}
              target="_blank"
              className="inline-flex items-center gap-2 text-blue-600 hover:underline"
            >
              View Pull Request <ExternalLink className="h-4 w-4" />
            </Link>
          )}
          <div className="flex gap-4 pt-4">
            <Button onClick={resetForm}>Submit Another Boxer</Button>
            <Button variant="outline" asChild>
              <Link href="/boxers">View Boxers Directory</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>
              {step === 1 && 'Submission Type & Basic Info'}
              {step === 2 && 'Boxer Details'}
              {step === 3 && 'Review & Submit'}
            </CardTitle>
            <CardDescription>Step {step} of 3</CardDescription>
          </div>
          {githubUser && (
            <div className="flex items-center gap-2 text-sm">
              <img
                src={githubUser.avatar_url}
                alt={githubUser.login}
                className="w-6 h-6 rounded-full"
              />
              <span className="text-muted-foreground">{githubUser.login}</span>
              <Button variant="ghost" size="sm" onClick={handleLogout} className="text-xs">
                Sign out
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {error && (
          <div className="flex items-center gap-2 text-red-600 text-sm">
            <AlertCircle className="h-4 w-4" />
            {error}
          </div>
        )}

        {/* Step 1: Type & Basic Info */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <Label>Submission Type</Label>
              <Select
                value={submissionType}
                onValueChange={(value: SubmissionType) => setSubmissionType(value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New Boxer</SelectItem>
                  <SelectItem value="edit">Edit Existing Boxer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {submissionType === 'edit' && (
              <div>
                <Label htmlFor="existingBoxer">Existing Boxer Name or Slug</Label>
                <Input
                  id="existingBoxer"
                  placeholder="e.g., muhammad-ali or Muhammad Ali"
                  value={formData.existingBoxerSlug || ''}
                  onChange={e => handleInputChange('existingBoxerSlug', e.target.value)}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Enter the name or URL slug of the boxer you want to edit
                </p>
              </div>
            )}

            <div>
              <Label htmlFor="name">Boxer Name *</Label>
              <Input
                id="name"
                placeholder="e.g., Muhammad Ali"
                value={formData.name}
                onChange={e => handleInputChange('name', e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="birthName">Birth Name</Label>
              <Input
                id="birthName"
                placeholder="e.g., Cassius Marcellus Clay Jr."
                value={formData.birthName || ''}
                onChange={e => handleInputChange('birthName', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="nicknames">Nicknames</Label>
              <Input
                id="nicknames"
                placeholder="e.g., The Greatest, The People's Champion"
                value={formData.nicknames || ''}
                onChange={e => handleInputChange('nicknames', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={formData.dateOfBirth || ''}
                onChange={e => handleInputChange('dateOfBirth', e.target.value)}
              />
            </div>
          </div>
        )}

        {/* Step 2: Details */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nationality">Nationality *</Label>
                <Input
                  id="nationality"
                  placeholder="e.g., USA"
                  value={formData.nationality || ''}
                  onChange={e => handleInputChange('nationality', e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="birthPlace">Birth Place</Label>
                <Input
                  id="birthPlace"
                  placeholder="e.g., Louisville, Kentucky"
                  value={formData.birthPlace || ''}
                  onChange={e => handleInputChange('birthPlace', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="residence">Residence</Label>
                <Input
                  id="residence"
                  placeholder="e.g., Phoenix, Arizona"
                  value={formData.residence || ''}
                  onChange={e => handleInputChange('residence', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="proDivision">Division</Label>
                <Select
                  value={formData.proDivision || ''}
                  onValueChange={value => handleInputChange('proDivision', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select division" />
                  </SelectTrigger>
                  <SelectContent>
                    {DIVISIONS.map(division => (
                      <SelectItem key={division} value={division}>
                        {division}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="height">Height</Label>
                <Input
                  id="height"
                  placeholder="e.g., 6′ 3″"
                  value={formData.height || ''}
                  onChange={e => handleInputChange('height', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="reach">Reach</Label>
                <Input
                  id="reach"
                  placeholder="e.g., 78″"
                  value={formData.reach || ''}
                  onChange={e => handleInputChange('reach', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="stance">Stance</Label>
                <Select
                  value={formData.stance || ''}
                  onValueChange={value => handleInputChange('stance', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select stance" />
                  </SelectTrigger>
                  <SelectContent>
                    {STANCES.map(stance => (
                      <SelectItem key={stance} value={stance}>
                        {stance}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="proStatus">Professional Status</Label>
              <Select
                value={formData.proStatus || ''}
                onValueChange={value => handleInputChange('proStatus', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {PRO_STATUS.map(status => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div>
                <Label htmlFor="proWins">Wins</Label>
                <Input
                  id="proWins"
                  type="number"
                  min="0"
                  value={formData.proWins || ''}
                  onChange={e => handleInputChange('proWins', parseInt(e.target.value) || 0)}
                />
              </div>

              <div>
                <Label htmlFor="proWinsByKnockout">KOs</Label>
                <Input
                  id="proWinsByKnockout"
                  type="number"
                  min="0"
                  value={formData.proWinsByKnockout || ''}
                  onChange={e =>
                    handleInputChange('proWinsByKnockout', parseInt(e.target.value) || 0)
                  }
                />
              </div>

              <div>
                <Label htmlFor="proLosses">Losses</Label>
                <Input
                  id="proLosses"
                  type="number"
                  min="0"
                  value={formData.proLosses || ''}
                  onChange={e => handleInputChange('proLosses', parseInt(e.target.value) || 0)}
                />
              </div>

              <div>
                <Label htmlFor="proDraws">Draws</Label>
                <Input
                  id="proDraws"
                  type="number"
                  min="0"
                  value={formData.proDraws || ''}
                  onChange={e => handleInputChange('proDraws', parseInt(e.target.value) || 0)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="bio">Biography</Label>
              <Textarea
                id="bio"
                placeholder="Brief biography or notable achievements..."
                value={formData.bio || ''}
                onChange={e => handleInputChange('bio', e.target.value)}
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="avatarImageUrl">Avatar Image URL</Label>
              <Input
                id="avatarImageUrl"
                type="url"
                placeholder="https://example.com/boxer-image.jpg"
                value={formData.avatarImageUrl || ''}
                onChange={e => handleInputChange('avatarImageUrl', e.target.value)}
              />
            </div>
          </div>
        )}

        {/* Step 3: Review */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg space-y-2">
              <h3 className="font-semibold">Review Your Submission</h3>

              <div className="text-sm space-y-1">
                <p>
                  <strong>Type:</strong> {submissionType === 'new' ? 'New Boxer' : 'Edit Existing'}
                </p>
                {submissionType === 'edit' && formData.existingBoxerSlug && (
                  <p>
                    <strong>Editing:</strong> {formData.existingBoxerSlug}
                  </p>
                )}
                <p>
                  <strong>Name:</strong> {formData.name}
                </p>
                {formData.birthName && (
                  <p>
                    <strong>Birth Name:</strong> {formData.birthName}
                  </p>
                )}
                {formData.nicknames && (
                  <p>
                    <strong>Nicknames:</strong> {formData.nicknames}
                  </p>
                )}
                <p>
                  <strong>Nationality:</strong> {formData.nationality}
                </p>
                {formData.proDivision && (
                  <p>
                    <strong>Division:</strong> {formData.proDivision}
                  </p>
                )}
                {formData.proStatus && (
                  <p>
                    <strong>Status:</strong> {formData.proStatus}
                  </p>
                )}
                {(formData.proWins || formData.proLosses || formData.proDraws) && (
                  <p>
                    <strong>Record:</strong> {formData.proWins || 0}-{formData.proLosses || 0}-
                    {formData.proDraws || 0} ({formData.proWinsByKnockout || 0} KOs)
                  </p>
                )}
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
              <p className="text-sm">
                <strong>What happens next?</strong>
                <br />
                When you click submit:
              </p>
              <ol className="text-sm mt-2 ml-4 list-decimal">
                <li>A new branch will be created in the repository</li>
                <li>Your boxer data will be added/updated</li>
                <li>A pull request will be opened for review</li>
                <li>Our team will review and merge if approved</li>
              </ol>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between">
          {step > 1 && (
            <Button type="button" variant="outline" onClick={handleBack} disabled={isSubmitting}>
              Back
            </Button>
          )}

          <div className="ml-auto flex gap-2">
            {step < 3 ? (
              <Button type="button" onClick={handleNext} disabled={isSubmitting}>
                Next
              </Button>
            ) : (
              <Button type="button" onClick={handleSubmit} disabled={isSubmitting || !githubToken}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Pull Request...
                  </>
                ) : (
                  'Create Pull Request'
                )}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
