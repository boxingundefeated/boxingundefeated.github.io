import { Breadcrumb } from '@boxingundefeated/design-system/breadcrumb'
import { Card, CardContent, CardHeader, CardTitle } from '@boxingundefeated/design-system/card'
import { getBaseUrl } from '@boxingundefeated/utils/get-base-url'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getBlogPosts } from '@/lib/blog-loader'

export const metadata: Metadata = {
  title: 'Blog - Boxing Directory',
  description: 'Latest news, insights, and stories from the world of professional boxing'
}

export default async function BlogPage() {
  const posts = await getBlogPosts()
  const baseUrl = getBaseUrl()

  const breadcrumbItems = [{ name: 'Blog', href: '/blog' }]

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumb items={breadcrumbItems} baseUrl={baseUrl} />

      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Boxing Blog</h1>
        <p className="text-lg text-muted-foreground">
          Latest news, insights, and stories from the world of professional boxing
        </p>
      </div>

      <div className="space-y-6">
        {posts.map(post => (
          <Card key={post.slug} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl mb-2">
                    <Link href={post.slug} className="hover:underline">
                      {post.title}
                    </Link>
                  </CardTitle>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <span>
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                    {post.author && <span>by {post.author}</span>}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{post.description}</p>
              {post.tags && post.tags.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                  {post.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 text-xs bg-secondary rounded-md">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {posts.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-muted-foreground">No blog posts yet. Check back soon!</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
