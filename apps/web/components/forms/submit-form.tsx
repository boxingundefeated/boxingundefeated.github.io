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
import { AlertCircle, CheckCircle, ExternalLink, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

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

export function SubmitForm() {
  const [submissionType, setSubmissionType] = useState<SubmissionType>('new')
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [issueUrl, setIssueUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState<BoxerFormData>({
    name: '',
    nationality: ''
  })

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

  const createGitHubIssue = async () => {
    const repoOwner = 'boxingundefeated'
    const repoName = 'boxingundefeated.github.io'

    // Format the issue body with all the boxer data
    const issueTitle =
      submissionType === 'new' ? `[New Boxer] ${formData.name}` : `[Update Boxer] ${formData.name}`

    const issueBody = `
## Submission Type
${submissionType === 'new' ? '🆕 New Boxer' : '✏️ Update Existing Boxer'}

${submissionType === 'edit' ? `**Existing Boxer:** ${formData.existingBoxerSlug}` : ''}

## Boxer Information

### Basic Information
- **Name:** ${formData.name}
- **Birth Name:** ${formData.birthName || 'Not provided'}
- **Nicknames:** ${formData.nicknames || 'Not provided'}
- **Date of Birth:** ${formData.dateOfBirth || 'Not provided'}
- **Nationality:** ${formData.nationality}

### Physical Attributes
- **Height:** ${formData.height || 'Not provided'}
- **Reach:** ${formData.reach || 'Not provided'}
- **Stance:** ${formData.stance || 'Not provided'}

### Location
- **Birth Place:** ${formData.birthPlace || 'Not provided'}
- **Residence:** ${formData.residence || 'Not provided'}

### Professional Record
- **Division:** ${formData.proDivision || 'Not provided'}
- **Status:** ${formData.proStatus || 'Not provided'}
- **Wins:** ${formData.proWins || 0}
- **Wins by KO:** ${formData.proWinsByKnockout || 0}
- **Losses:** ${formData.proLosses || 0}
- **Draws:** ${formData.proDraws || 0}

### Additional Information
- **Bio:** ${formData.bio || 'Not provided'}
- **Avatar Image URL:** ${formData.avatarImageUrl || 'Not provided'}

---
*This submission was created via the Boxing Directory submission form.*
`

    // Create the GitHub issue URL (users will need to be logged in to GitHub)
    const params = new URLSearchParams({
      title: issueTitle,
      body: issueBody,
      labels: submissionType === 'new' ? 'new-boxer' : 'update-boxer'
    })

    const githubIssueUrl = `https://github.com/${repoOwner}/${repoName}/issues/new?${params.toString()}`

    // Open in new tab
    window.open(githubIssueUrl, '_blank')

    return githubIssueUrl
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setError(null)

    try {
      const url = await createGitHubIssue()
      setIssueUrl(url)
      setStep(4) // Success step
    } catch (err) {
      setError('Failed to create submission. Please try again.')
      console.error('Submission error:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setFormData({ name: '', nationality: '' })
    setStep(1)
    setIssueUrl(null)
    setError(null)
    setSubmissionType('new')
  }

  // Success state
  if (step === 4) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle className="h-5 w-5" />
            <CardTitle>Submission Created!</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Your submission has been created as a GitHub issue for review.</p>
          <p className="text-sm text-muted-foreground">
            Please complete the submission by clicking "Submit new issue" on the GitHub page that
            opened. If the page didn't open, you can use the link below:
          </p>
          {issueUrl && (
            <Link
              href={issueUrl}
              target="_blank"
              className="inline-flex items-center gap-2 text-blue-600 hover:underline"
            >
              View your submission <ExternalLink className="h-4 w-4" />
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
        <CardTitle>
          {step === 1 && 'Submission Type & Basic Info'}
          {step === 2 && 'Boxer Details'}
          {step === 3 && 'Review & Submit'}
        </CardTitle>
        <CardDescription>Step {step} of 3</CardDescription>
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
                Your submission will open a GitHub issue for review. You'll need to:
              </p>
              <ol className="text-sm mt-2 ml-4 list-decimal">
                <li>Sign in to GitHub (if not already)</li>
                <li>Review the pre-filled issue</li>
                <li>Click "Submit new issue"</li>
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
              <Button type="button" onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Submission...
                  </>
                ) : (
                  'Create Submission'
                )}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
