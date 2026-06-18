import type { BlogPostModule } from './types'
import * as howToEditAPdfOnline from './posts/how-to-edit-a-pdf-online'

// slug → post module. Add an entry here (and to MIGRATED_BLOG_SLUGS) when a post is
// migrated to the locale-aware route. Static imports keep every post in the SSG bundle.
export const BLOG_POST_REGISTRY: Record<string, BlogPostModule> = {
  'how-to-edit-a-pdf-online': howToEditAPdfOnline,
}

export function getBlogPost(slug: string): BlogPostModule | undefined {
  return BLOG_POST_REGISTRY[slug]
}
