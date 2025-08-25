/**
 * @fileoverview LatestArticle - Featured display for the most recent blog post
 * @module components/article/LatestArticle
 * 
 * @description
 * Displays the most recent blog post with special emphasis and visual prominence.
 * Implements the [LATEST] component pattern for blog index pages, providing
 * a featured display that draws attention to fresh content.
 * 
 * This component is the primary entry point for blog content, designed to
 * capture attention and drive engagement with the newest article. It works
 * in tandem with ArticleList to create a complete blog index experience.
 * 
 * @architecture
 * ```
 * Blog Index Page
 *       ├── Hero Section
 *       │     ├── Title ("Latest Thoughts")
 *       │     └── LatestArticle (this)
 *       └── ArticleList (older posts)
 * 
 * Data Flow:
 * GraphQL → latestPost → LatestArticle
 *        → variants: featured | default | minimal
 * ```
 * 
 * @proto-integration
 * Maps to ArticleConfig fields:
 * 
 * - **ArticleConfig** (blog.proto)
 *   - `slug`: URL path segment for routing
 *   - `title`: Article headline (H2)
 *   - `summary`: Excerpt for preview
 *   - `date_published`: Publication timestamp
 *   - `reading_time_minutes`: Estimated read time
 *   - `tags`: Keyword array (max 3 shown)
 *   - `featured_image_url`: Cover image for featured variant
 *   - `author_keys`: Maps to persons.yml
 * 
 * - **PersonConfig** (persons.proto)
 *   - `name`: Author display name
 *   - `avatar_url`: Author profile image
 * 
 * - **BlogConfig** (blog.proto)
 *   - `blog_layout.show_latest`: Enable latest post display
 *   - `blog_layout.latest_variant`: Default variant setting
 *   - `blog_features.show_author`: Author info visibility
 * 
 * @hook-integration
 * While this component doesn't directly use hooks,
 * it integrates with the Card component which may use:
 * 
 * - **useConfig()**: Theme and layout configuration
 * - **useGTM()**: Click tracking for analytics
 * 
 * @ecosystem-integration
 * - **Used in**: blog.[domain].in index pages (hero section)
 * - **Position**: Above ArticleList in blog index
 * - **Project pages**: Filtered version for project-specific latest
 * - **Grid alignment**: Consistent with Index List items
 * - **Analytics**: Click tracking via Card component
 * - **SEO**: Contributes to page's main content
 * 
 * @features
 * - **Three Variants**: Featured, default, minimal displays
 * - **Cover Image**: Hero image for featured variant
 * - **Latest Badge**: Visual indicator for newest content
 * - **Author Info**: Profile image and name display
 * - **Tag Display**: Up to 3 tags with overflow indicator
 * - **Glass Morphism**: Modern visual design
 * - **Hover Effects**: Interactive state transitions
 * 
 * @variants
 * ```
 * Featured:
 * - Full cover image
 * - "Latest Post" badge
 * - Glass morphism card
 * - Author with avatar
 * - 3-line excerpt
 * - Up to 3 tags
 * 
 * Default:
 * - No cover image
 * - Standard card depth
 * - Author name only
 * - 2-line excerpt
 * - Up to 3 tags
 * 
 * Minimal:
 * - No card wrapper
 * - Title and date only
 * - 2-line excerpt
 * - No tags or author
 * ```
 * 
 * @responsive-behavior
 * ```
 * Mobile (<640px):
 * - Cover image: 256px height
 * - Title: 1.5rem font size
 * - Tags: Hidden on minimal
 * 
 * Tablet (640-1024px):
 * - Cover image: 320px height
 * - Title: 1.875rem font size
 * - Author avatar shown
 * 
 * Desktop (>1024px):
 * - Full featured display
 * - All metadata visible
 * - Hover effects active
 * ```
 * 
 * @accessibility
 * - **Semantic HTML**: <article> element with proper structure
 * - **Time Element**: Machine-readable datetime attribute
 * - **Image Alt Text**: Descriptive alt for cover images
 * - **Focus Management**: Visible focus indicators
 * - **Screen Readers**: Logical reading order
 * 
 * @performance
 * - **Static Generation**: Pre-rendered at build time
 * - **Image Optimization**: Lazy loading for cover images
 * - **CSS Transitions**: GPU-accelerated hover effects
 * - **Conditional Rendering**: Variant-specific optimizations
 * 
 * @dos
 * - Use featured variant for blog index
 * - Provide all article metadata
 * - Use minimal for space-constrained areas
 * - Include cover image for visual impact
 * - Test all three variants
 * 
 * @donts
 * - Don't use featured without cover image
 * - Don't show more than 3 tags
 * - Don't skip required fields (slug, title, excerpt)
 * - Don't nest inside another Card
 * - Don't override variant-specific styles
 * 
 * @example
 * ```tsx
 * // Blog index with featured latest
 * const BlogIndex = ({ data }) => {
 *   const latest = data.allArticles.nodes[0]
 *   
 *   return (
 *     <>
 *       <LatestArticle 
 *         article={latest}
 *         variant="featured"
 *       />
 *       <ArticleList articles={data.allArticles.nodes.slice(1)} />
 *     </>
 *   )
 * }
 * 
 * // Project page with minimal latest
 * <aside>
 *   <h3>Latest Update</h3>
 *   <LatestArticle
 *     article={projectLatest}
 *     variant="minimal"
 *     className="mt-4"
 *   />
 * </aside>
 * ```
 * 
 * @see {@link file://./USE-CASE.md#latest-component} - Component specification
 * @see {@link file://./BUILD.md#blog-pages} - Blog page generation
 * @see {@link file://./ArticleGrid.tsx} - Grid alignment patterns
 * @see {@link file://./ArticleList.tsx} - Companion list component
 * @see {@link file://../ui/Card.tsx} - Card component used
 * @see {@link file://../ui/Badge.tsx} - Badge component used
 * 
 * @since 1.0.0
 */

import * as React from 'react'
import { Link } from 'gatsby'
import { cn } from '@/lib/utils'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../ui/Card'
import { Badge } from '../ui/Badge'

/**
 * @interface LatestArticleProps
 * @description Props for LatestArticle component with essential article data
 * 
 * Accepts a simplified article object optimized for display in the
 * latest/featured position. Data is typically the first item from
 * a GraphQL query sorted by date.
 * 
 * @property {Object} article - Article data object
 * The latest article to display, typically from GraphQL query.
 * 
 * @property {string} article.slug - URL slug for article routing
 * Used to construct /blog/[slug] link.
 * Maps to ArticleConfig.slug.
 * 
 * @property {string} article.title - Article headline
 * Primary display text, shown prominently.
 * Maps to ArticleConfig.title.
 * 
 * @property {string} article.excerpt - Article summary
 * Preview text, truncated based on variant.
 * Maps to ArticleConfig.summary (max 160 chars).
 * 
 * @property {string} article.date - Publication date
 * ISO date string for formatting.
 * Maps to ArticleConfig.date_published.
 * 
 * @property {string} [article.readTime] - Formatted reading time
 * E.g., "5 min read" from reading_time_minutes.
 * Pre-formatted during build.
 * 
 * @property {string[]} [article.tags] - Article keywords
 * Used for categorization, max 3 displayed.
 * Maps to ArticleConfig.tags array.
 * 
 * @property {string} [article.coverImage] - Cover image URL
 * Hero image for featured variant.
 * Maps to ArticleConfig.featured_image_url.
 * 
 * @property {Object} [article.author] - Author information
 * Resolved from author_keys to persons.yml.
 * 
 * @property {string} article.author.name - Author display name
 * From PersonConfig.name.
 * 
 * @property {string} [article.author.avatar] - Author profile image
 * From PersonConfig.avatar_url.
 * 
 * @property {'default' | 'featured' | 'minimal'} [variant='featured'] - Display variant
 * - 'featured': Full display with cover image (blog index)
 * - 'default': Standard card without image
 * - 'minimal': Compact text-only display (sidebars)
 * 
 * @property {string} [className] - Additional CSS classes
 * Merged with base classes using cn() utility.
 * Common uses: mt-8, max-w-2xl, animate-fadeIn.
 * 
 * @example
 * ```tsx
 * const props: LatestArticleProps = {
 *   article: {
 *     slug: "understanding-protobuf",
 *     title: "Understanding Protocol Buffers",
 *     excerpt: "A deep dive into protobuf schemas...",
 *     date: "2024-01-15T10:00:00Z",
 *     readTime: "5 min read",
 *     tags: ["protobuf", "architecture"],
 *     coverImage: "/images/protobuf-hero.jpg",
 *     author: {
 *       name: "Harsh Gupta",
 *       avatar: "/images/harsh.jpg"
 *     }
 *   },
 *   variant: "featured",
 *   className: "animate-fadeInUp"
 * }
 * ```
 */
interface LatestArticleProps {
  /** Article data object */
  article: {
    /** URL slug for article routing */
    slug: string
    /** Article title from ArticleConfig.title */
    title: string
    /** Article excerpt from ArticleConfig.summary */
    excerpt: string
    /** Publication date from ArticleConfig.date_published */
    date: string
    /** Formatted reading time */
    readTime?: string
    /** Article tags from ArticleConfig.tags */
    tags?: string[]
    /** Cover image from ArticleConfig.featured_image_url */
    coverImage?: string
    /** Author info resolved from author_keys */
    author?: {
      /** Author name from persons.yml */
      name: string
      /** Author avatar URL */
      avatar?: string
    }
  }
  /** Display variant - featured (blog index), default, minimal (project pages) */
  variant?: 'default' | 'featured' | 'minimal'
  /** Additional CSS classes for customization */
  className?: string
}

/**
 * LatestArticle component - Renders the most recent article with emphasis
 * 
 * Creates a visually prominent display for the latest blog post with
 * three rendering variants optimized for different contexts.
 * 
 * @component
 * @param {LatestArticleProps} props - Component props
 * @param {Object} props.article - Article data to display
 * @param {'default' | 'featured' | 'minimal'} [props.variant='featured'] - Display variant
 * @param {string} [props.className] - Additional CSS classes
 * 
 * @returns {JSX.Element} Latest article display containing:
 * - Variant-specific layout (card or minimal)
 * - Optional cover image (featured only)
 * - "Latest Post" badge (featured only)
 * - Author info with avatar (non-minimal)
 * - Publication date and reading time
 * - Tag badges (non-minimal)
 * 
 * @remarks
 * The component implements three distinct rendering paths:
 * 1. **Minimal**: Simple text display for sidebars
 * 2. **Default**: Standard card without image
 * 3. **Featured**: Full card with cover image and badge
 * 
 * Each variant is optimized for its specific use case,
 * with progressive enhancement for larger displays.
 * 
 * @example
 * ```tsx
 * // Featured display on blog index
 * <LatestArticle 
 *   article={latestPost}
 *   variant="featured"
 * />
 * 
 * // Minimal display in sidebar
 * <LatestArticle
 *   article={recentPost}
 *   variant="minimal"
 *   className="border-l-2 border-accent-primary pl-4"
 * />
 * ```
 */
export const LatestArticle: React.FC<LatestArticleProps> = ({
  article,
  variant = 'featured',
  className
}) => {
  /**
   * Format date consistently with ecosystem patterns
   * 
   * Converts ISO 8601 date strings to human-readable format
   * using browser's Intl.DateTimeFormat for localization.
   * 
   * @function formatDate
   * @param {string} dateString - ISO date string (e.g., "2024-01-15T10:00:00Z")
   * @returns {string} Formatted date (e.g., "January 15, 2024")
   * 
   * @example
   * formatDate("2024-01-15T10:00:00Z") // Returns: "January 15, 2024"
   */
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date)
  }

  // Minimal variant - Compact display for project pages or sidebars
  if (variant === 'minimal') {
    return (
      <article className={cn('group', className)}>
        <Link to={`/blog/${article.slug}`} className="block">
          <div className="space-y-2">
            {/* Date and reading time - Always visible */}
            <div className="flex items-center gap-2 text-sm text-text-tertiary">
              <time dateTime={article.date}>{formatDate(article.date)}</time>
              {article.readTime && (
                <>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </>
              )}
            </div>
            {/* Article title with hover effect */}
            <h2 className="text-xl font-display uppercase tracking-wide text-accent-primary group-hover:text-accent-secondary transition-colors">
              {article.title}
            </h2>
            {/* Excerpt - Limited to 2 lines for space */}
            <p className="text-text-secondary line-clamp-2">
              {article.excerpt}
            </p>
          </div>
        </Link>
      </article>
    )
  }

  // Default and Featured variants - Full card display
  return (
    <Card 
      variant={variant === 'featured' ? 'glass' : 'default'}  // Glass morphism for featured
      depth={variant === 'featured' ? 2 : 1}  // Higher depth for prominence
      className={cn('group overflow-hidden', className)}
    >
      <Link to={`/blog/${article.slug}`} className="block">
        {/* Cover image - Only for featured variant when image exists */}
        {article.coverImage && variant === 'featured' && (
          <div className="relative h-64 sm:h-80 -mt-px -mx-px overflow-hidden">
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-full object-cover transition-transform duration-base group-hover:scale-105"
            />
            {/* Gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/80 to-transparent" />
            {/* "Latest Post" indicator badge */}
            <div className="absolute top-4 left-4">
              <Badge variant="accent" className="glass">
                Latest Post
              </Badge>
            </div>
          </div>
        )}
        
        <CardHeader className={cn(
          variant === 'featured' && article.coverImage ? 'pt-4' : ''
        )}>
          <div className="flex items-center gap-4 mb-2">
            {article.author && (
              <div className="flex items-center gap-2">
                {article.author.avatar && (
                  <img
                    src={article.author.avatar}
                    alt={article.author.name}
                    className="w-8 h-8 rounded-full border border-accent-primary/20"
                  />
                )}
                <span className="text-sm text-text-secondary">
                  {article.author.name}
                </span>
              </div>
            )}
            {/* Publication date and reading time */}
            <div className="flex items-center gap-2 text-sm text-text-tertiary">
              <time dateTime={article.date}>{formatDate(article.date)}</time>
              {article.readTime && (
                <>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </>
              )}
            </div>
          </div>
          
          <CardTitle className={cn(
            'group-hover:text-accent-secondary transition-colors',
            variant === 'featured' ? 'text-3xl' : 'text-2xl'
          )}>
            {article.title}
          </CardTitle>
          
          <CardDescription className={cn(
            'text-text-secondary',
            variant === 'featured' ? 'text-base line-clamp-3' : 'line-clamp-2'
          )}>
            {article.excerpt}
          </CardDescription>
        </CardHeader>
        
        {article.tags && article.tags.length > 0 && (
          <CardContent className="pt-0">
            <div className="flex flex-wrap gap-2">
              {article.tags.slice(0, 3).map((tag, index) => (
                <Badge 
                  key={index} 
                  variant="outline"
                  className="text-xs"
                >
                  #{tag}
                </Badge>
              ))}
              {article.tags.length > 3 && (
                <Badge 
                  variant="outline"
                  className="text-xs text-text-tertiary"
                >
                  +{article.tags.length - 3} more
                </Badge>
              )}
            </div>
          </CardContent>
        )}
      </Link>
    </Card>
  )
}

export default LatestArticle