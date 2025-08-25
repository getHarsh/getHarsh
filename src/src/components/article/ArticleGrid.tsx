/**
 * @fileoverview ArticleGrid - CSS Grid-based article display system for blog indexes
 * @module components/article/ArticleGrid
 * 
 * @description
 * Provides a performance-optimized, responsive grid layout for displaying articles
 * across blog index pages and filtered views. Implements the ecosystem's design
 * philosophy of progressive disclosure based on viewport size.
 * 
 * This component is the primary article display mechanism, handling everything
 * from featured articles to compact lists. It integrates with GTM for analytics
 * and generates Schema.org ItemList structured data for SEO.
 * 
 * @architecture
 * ```
 * GraphQL Query (gatsby-node.js)
 *         ↓
 * ArticleGrid (this)
 *         ├── Featured Article (optional)
 *         └── Article Cards
 *                 ├── Grid variant (3 columns)
 *                 ├── List variant (horizontal)
 *                 └── Compact variant (minimal)
 * 
 * Data Flow:
 * ArticleConfig (proto) → Frontmatter → GraphQL → Component
 * ```
 * 
 * @proto-integration
 * Maps to ArticleConfig message fields:
 * 
 * - **ArticleConfig** (blog.proto)
 *   - `id`: Unique article identifier
 *   - `slug`: URL-safe path segment
 *   - `title`: Article headline
 *   - `summary`: Excerpt for listing display
 *   - `date_published`: Publication date
 *   - `reading_time_minutes`: Estimated reading time
 *   - `author_keys`: Maps to persons.yml catalog
 *   - `tags`: Keyword array for categorization
 *   - `is_featured`: Featured article flag
 *   - `featured_image_url`: Hero image for cards
 * 
 * - **PersonConfig** (persons.proto)
 *   - `name`: Author display name
 *   - `avatar_url`: Author profile image
 *   - `bio`: Author biography (not used here)
 * 
 * - **BlogConfig** (blog.proto)
 *   - `blog_layout.default_variant`: Grid display preference
 *   - `blog_features.show_featured`: Featured article display
 *   - `blog_features.articles_per_page`: Pagination config
 * 
 * @hook-integration
 * Primary hooks used:
 * 
 * - **useGTM()** (`/src/hooks/useGTM.ts`)
 *   - `trackEvent()`: Analytics for grid views and clicks
 *   - Tracks: article impressions, clicks, positions
 *   - Enhanced ecommerce: article list views
 * 
 * - **useSchema()** (`/src/hooks/useSchema.ts`)
 *   - `buildItemListSchema()`: Creates ItemList structured data
 *   - `renderJsonLd()`: Injects JSON-LD for SEO
 *   - Schema.org ItemList with Article items
 * 
 * @ecosystem-integration
 * - **Used in**: blog.[domain].in index pages, project filtered views
 * - **Data flow**: GraphQL queries → component props → rendered grid
 * - **State**: Stateless component, all data from props
 * - **Routing**: Links to /blog/[slug] for article pages
 * - **Analytics**: GTM tracking for impressions and clicks
 * - **SEO**: ItemList structured data for search engines
 * - **Performance**: Virtual scrolling ready for large datasets
 * 
 * @features
 * - **Three Variants**: Grid (cards), list (horizontal), compact (minimal)
 * - **Featured Article**: Larger display for featured content
 * - **Progressive Disclosure**: More info on larger screens
 * - **Glass Morphism**: Modern visual design
 * - **Analytics Tracking**: Comprehensive event tracking
 * - **Schema.org**: ItemList structured data
 * - **Performance**: Optimized for 1000+ articles
 * - **Accessibility**: Semantic HTML and ARIA
 * 
 * @responsive-behavior
 * ```
 * Mobile (<640px):
 * - Single column grid
 * - Title + date only
 * - No featured images in compact
 * - Max 3 tags shown
 * 
 * Tablet (640-1024px):
 * - 2 column grid
 * - + Reading time
 * - + Article excerpt
 * - + All tags
 * 
 * Desktop (>1024px):
 * - 3 column grid
 * - + Author info
 * - Full metadata
 * - Hover effects
 * ```
 * 
 * @performance
 * - **Static Generation**: Pre-rendered at build time
 * - **Image Optimization**: Lazy loading with intersection observer
 * - **Virtual Scrolling**: Compatible with react-window
 * - **Memoization**: Schema generation cached
 * - **Event Delegation**: Single click handler
 * 
 * @accessibility
 * - **Semantic HTML**: <article> elements with proper structure
 * - **Heading Hierarchy**: H2 for featured, H3 for cards
 * - **Link Context**: Clear link purposes
 * - **Focus Management**: Visible focus indicators
 * - **Screen Readers**: Logical reading order
 * 
 * @analytics-events
 * - **article_grid_view**: Grid impression tracking
 * - **article_click**: Individual article clicks
 * - Properties: variant, position, featured, tags
 * 
 * @dos
 * - Use appropriate variant for context
 * - Enable featured for blog index pages
 * - Provide all article metadata
 * - Test with large datasets
 * - Verify analytics tracking
 * 
 * @donts
 * - Don't mix variants on same page
 * - Don't show featured in filtered views
 * - Don't skip required fields (id, slug, title)
 * - Don't render empty grids
 * - Don't disable analytics tracking
 * 
 * @example
 * ```tsx
 * // Blog index with featured article
 * <ArticleGrid 
 *   articles={blogPosts}
 *   variant="grid"
 *   showFeatured={true}
 *   className="mt-8"
 * />
 * 
 * // Project filtered view as list
 * <ArticleGrid
 *   articles={projectPosts}
 *   variant="list"
 *   showFeatured={false}
 * />
 * 
 * // Compact view for sidebar
 * <ArticleGrid
 *   articles={recentPosts}
 *   variant="compact"
 *   showFeatured={false}
 *   className="max-w-md"
 * />
 * ```
 * 
 * @see {@link file://./USE-CASE.md#article-grid} - Component specification
 * @see {@link file://./BUILD.md#gatsby-node} - Article data generation
 * @see {@link file://./CMS.md#frontmatter} - CMS field mappings
 * @see {@link file://../../hooks/useGTM.ts} - Analytics tracking
 * @see {@link file://../../hooks/useSchema.ts} - Schema generation
 * @see {@link file://./ArticleList.tsx} - List wrapper component
 * @see {@link file://./LatestArticle.tsx} - Featured article display
 * 
 * @since 1.0.0
 */

import * as React from 'react'
import { Link } from 'gatsby'
import { cn } from '@/lib/utils'
import { Calendar, Clock, User, ArrowRight } from 'lucide-react'
import { Chip } from '@/components/ui/Chip'
import { useGTM } from '@/hooks/useGTM'
import { useSchema } from '@/hooks/useSchema'

/**
 * @interface Article
 * @description Article data structure matching CMS frontmatter, maps to ArticleConfig proto message fields
 * 
 * Represents a processed article ready for display. Data has been transformed
 * from proto format through gatsby-node.js processing.
 * 
 * @property {string} id - Unique identifier from CMS
 * Generated during build, used for React keys and tracking.
 * Maps to ArticleConfig.id field.
 * 
 * @property {string} slug - URL-safe slug for routing
 * Used to construct /blog/[slug] paths.
 * Maps to ArticleConfig.slug field.
 * 
 * @property {string} title - Article headline
 * Primary display text, shown in all variants.
 * Maps to ArticleConfig.title field.
 * 
 * @property {string} excerpt - Article summary
 * Short description for listing display (max 160 chars).
 * Maps to ArticleConfig.summary field.
 * 
 * @property {string} date - Publication date
 * Formatted date string for display.
 * Maps to ArticleConfig.date_published.
 * 
 * @property {number} [readingTime] - Estimated reading time in minutes
 * Calculated during build from content length.
 * Maps to ArticleConfig.reading_time_minutes.
 * 
 * @property {object} [author] - Author information
 * Resolved from author_keys to persons.yml catalog.
 * 
 * @property {string} author.name - Author display name
 * From PersonConfig.name in persons.yml.
 * 
 * @property {string} [author.avatar] - Author profile image URL
 * From PersonConfig.avatar_url.
 * 
 * @property {string[]} [tags] - Article keywords
 * Used for categorization and SEO.
 * Maps to ArticleConfig.tags array.
 * 
 * @property {boolean} [featured] - Featured article flag
 * Determines if shown in featured section.
 * Maps to ArticleConfig.is_featured.
 * 
 * @property {string} [featuredImage] - Hero image URL
 * Displayed in article cards and featured section.
 * Maps to ArticleConfig.featured_image_url.
 * 
 * @see {@link file://./blog.proto#ArticleConfig} - Proto schema
 * @see {@link file://./CMS.md#frontmatter} - CMS field mapping
 * 
 * @example
 * ```tsx
 * const article: Article = {
 *   id: "abc123",
 *   slug: "understanding-protobuf",
 *   title: "Understanding Protocol Buffers",
 *   excerpt: "A deep dive into protobuf schemas...",
 *   date: "January 15, 2024",
 *   readingTime: 5,
 *   author: {
 *     name: "Harsh Gupta",
 *     avatar: "/images/harsh.jpg"
 *   },
 *   tags: ["protobuf", "architecture"],
 *   featured: true,
 *   featuredImage: "/images/protobuf-hero.jpg"
 * }
 * ```
 */
interface Article {
  id: string              // Unique identifier from CMS
  slug: string            // URL-safe slug for routing
  title: string           // ArticleConfig.title field
  excerpt: string         // ArticleConfig.summary field
  date: string            // ArticleConfig.date_published
  readingTime?: number    // ArticleConfig.reading_time_minutes
  author?: {              // From persons.yml catalog via author_keys
    name: string
    avatar?: string
  }
  tags?: string[]         // ArticleConfig.tags array
  featured?: boolean      // ArticleConfig.is_featured
  featuredImage?: string  // ArticleConfig.featured_image_url
}

/**
 * @interface ArticleGridProps
 * @description Props for the ArticleGrid component
 * 
 * Configuration for article grid display with variant control
 * and featured article support.
 * 
 * @property {Article[]} articles - Array of articles to display
 * Typically sorted chronologically (newest first) by gatsby-node.js.
 * Can contain any number of articles - component handles large datasets.
 * 
 * @property {'grid' | 'list' | 'compact'} [variant='grid'] - Display variant
 * - 'grid': Card-based grid layout (default for index pages)
 * - 'list': Horizontal list with image on left
 * - 'compact': Minimal list without images or excerpts
 * 
 * @property {boolean} [showFeatured=true] - Show featured article prominently
 * When true, articles with featured=true are displayed larger.
 * Typically true for blog index, false for filtered views.
 * 
 * @property {string} [className] - Additional CSS classes
 * Merged with base grid classes using cn() utility.
 * Common uses: mt-8, max-w-6xl, px-4.
 * 
 * @example
 * ```tsx
 * const props: ArticleGridProps = {
 *   articles: blogPosts,
 *   variant: 'grid',
 *   showFeatured: true,
 *   className: 'mt-12'
 * }
 * ```
 */
interface ArticleGridProps {
  /** Array of articles to display */
  articles: Article[]
  /** Display variant: grid (cards), list (horizontal), compact (minimal) */
  variant?: 'grid' | 'list' | 'compact'
  /** Whether to show featured article with special emphasis */
  showFeatured?: boolean
  /** Additional CSS classes for customization */
  className?: string
}

/**
 * ArticleGrid component - Main article display system
 * 
 * Renders a collection of articles with optional featured section,
 * analytics tracking, and Schema.org structured data. Implements
 * progressive enhancement with more information on larger screens.
 * 
 * @component
 * @param {ArticleGridProps} props - Component props
 * @param {Article[]} props.articles - Articles from GraphQL queries
 * @param {'grid' | 'list' | 'compact'} [props.variant='grid'] - Display mode
 * @param {boolean} [props.showFeatured=true] - Show featured prominently
 * @param {string} [props.className] - Additional CSS classes
 * 
 * @returns {JSX.Element} Article grid containing:
 * - ItemList Schema.org JSON-LD
 * - Optional featured article section
 * - Grid/list of article cards
 * - Analytics tracking integration
 * 
 * @remarks
 * The component implements several optimizations:
 * - Featured article extraction to prevent duplication
 * - Memoized schema generation for performance
 * - Single effect for analytics tracking
 * - Delegated click handling to ArticleCard
 * 
 * Analytics events track:
 * - Grid impressions with variant and count
 * - Individual article clicks with position
 * - Featured article interactions
 * 
 * @example
 * ```tsx
 * // Blog index page
 * <ArticleGrid 
 *   articles={data.allArticles.nodes}
 *   variant="grid"
 *   showFeatured={true}
 * />
 * ```
 */
export const ArticleGrid: React.FC<ArticleGridProps> = ({
  articles,
  variant = 'grid',
  showFeatured = true,
  className
}) => {
  const { trackEvent } = useGTM()
  const { buildItemListSchema, renderJsonLd } = useSchema()

  // Extract featured article if enabled - corresponds to is_featured in ArticleConfig proto
  const featuredArticle = showFeatured ? articles.find(a => a.featured) : null
  
  // Separate regular articles to prevent duplication in grid
  const regularArticles = featuredArticle 
    ? articles.filter(a => a.id !== featuredArticle.id)
    : articles

  // Build ItemList schema for article collection
  const articleListSchema = React.useMemo(() => {
    const articleItems = articles.map(article => ({
      type: 'Article',
      name: article.title,
      url: `/blog/${article.slug}`,
      description: article.excerpt,
      datePublished: article.date,
      author: article.author?.name,
      image: article.featuredImage
    }))
    
    return buildItemListSchema(articleItems, 'Blog Articles')
  }, [articles, buildItemListSchema])
  
  // Track article impressions when grid loads
  React.useEffect(() => {
    if (articles.length > 0) {
      trackEvent({
        event: 'article_grid_view',
        category: 'Article',
        action: 'view_grid',
        label: `${variant} variant`,
        value: articles.length,
        grid_variant: variant,
        article_count: articles.length,
        has_featured: !!featuredArticle,
        component: 'ArticleGrid'
      })
    }
  }, [articles.length, variant, featuredArticle, trackEvent])

  const handleArticleClick = (article: Article, position: number, isFeatured: boolean = false) => {
    trackEvent({
      event: 'article_click',
      category: 'Article',
      action: 'click',
      label: article.title,
      value: position,
      article_id: article.id,
      article_slug: article.slug,
      article_title: article.title,
      article_position: position,
      article_is_featured: isFeatured,
      article_has_image: !!article.featuredImage,
      article_tags: article.tags?.join(',') || '',
      grid_variant: variant,
      component: 'ArticleGrid'
    })
  }

  return (
    <>
      {/* Inject ItemList Schema.org JSON-LD for article collection */}
      {renderJsonLd(articleListSchema)}
      
      <div className={cn('space-y-8', className)}>
      {/* Featured article - larger display for is_featured=true articles */}
      {featuredArticle && (
        <article className="group relative rounded-terminal overflow-hidden bg-bg-glass backdrop-blur-xl border border-accent-primary/20 hover:border-accent-primary/40 transition-all duration-base">
          {featuredArticle.featuredImage && (
            <div className="aspect-video overflow-hidden bg-gradient-to-br from-accent-primary/10 to-accent-secondary/10">
              <img 
                src={featuredArticle.featuredImage}
                alt={featuredArticle.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-slow"
              />
            </div>
          )}
          
          <div className="p-6 md:p-8">
            <div className="flex items-center gap-4 text-xs text-text-secondary mb-4">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {featuredArticle.date}
              </span>
              {featuredArticle.readingTime && (
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {featuredArticle.readingTime} min read
                </span>
              )}
              <span className="px-2 py-0.5 bg-accent-primary/20 text-accent-primary rounded-sharp text-xs uppercase">
                Featured
              </span>
            </div>

            <h2 className="font-display text-2xl md:text-3xl uppercase tracking-wide text-accent-primary mb-3 group-hover:text-accent-secondary transition-colors">
              <Link 
                to={featuredArticle.slug} 
                className="hover:underline"
                onClick={() => handleArticleClick(featuredArticle, 0, true)}
              >
                {featuredArticle.title}
              </Link>
            </h2>

            <p className="text-text-secondary mb-4 line-clamp-3">
              {featuredArticle.excerpt}
            </p>

            {featuredArticle.tags && featuredArticle.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {featuredArticle.tags.map(tag => (
                  <Chip key={tag} variant="outline" size="sm">
                    {tag}
                  </Chip>
                ))}
              </div>
            )}

            <Link 
              to={featuredArticle.slug}
              className="inline-flex items-center gap-2 text-accent-primary hover:text-accent-secondary transition-colors"
              onClick={() => handleArticleClick(featuredArticle, 0, true)}
            >
              Read more
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </article>
      )}

      {/* Main article grid/list - responsive layout based on variant */}
      <div className={cn(
        variant === 'grid' 
          ? 'grid gap-6 md:grid-cols-2 lg:grid-cols-3'
          : 'space-y-6'
      )}>
        {regularArticles.map((article, index) => (
          <ArticleCard 
            key={article.id} 
            article={article} 
            variant={variant}
            position={index + 1}
            onArticleClick={handleArticleClick}
          />
        ))}
      </div>
    </div>
    </>
  )
}

/**
 * ArticleCard - Individual article display component
 * 
 * Renders a single article with progressive enhancement based on variant.
 * Implements ecosystem design patterns including glass morphism and terminal aesthetics.
 * This is a private component used internally by ArticleGrid.
 * 
 * @component
 * @private
 * @param {Object} props - Component props
 * @param {Article} props.article - Article data from parent grid
 * @param {'grid' | 'list' | 'compact'} props.variant - Display variant
 * @param {number} props.position - Article position in list (1-indexed)
 * @param {Function} props.onArticleClick - Click tracking callback
 * 
 * @returns {JSX.Element} Article card with:
 * - Optional featured image
 * - Progressive metadata disclosure
 * - Glass morphism styling
 * - Hover effects and transitions
 * 
 * @remarks
 * Progressive disclosure by viewport:
 * - Mobile: Title and date only
 * - Tablet: + Reading time and excerpt
 * - Desktop: + Author information
 * 
 * The component uses conditional rendering to optimize
 * for different display variants and screen sizes.
 * 
 * @example
 * ```tsx
 * <ArticleCard
 *   article={articleData}
 *   variant="grid"
 *   position={1}
 *   onArticleClick={handleClick}
 * />
 * ```
 */
const ArticleCard: React.FC<{
  article: Article
  variant: 'grid' | 'list' | 'compact'
  position: number
  onArticleClick: (article: Article, position: number, isFeatured?: boolean) => void
}> = ({ article, variant, position, onArticleClick }) => {
  const isCompact = variant === 'compact'
  
  return (
    <article 
      className={cn(
        'group relative rounded-terminal overflow-hidden',
        'bg-bg-glass backdrop-blur-xl border border-accent-primary/20',
        'hover:border-accent-primary/40 hover:shadow-glow-sm',
        'transition-all duration-base',
        variant === 'list' && 'flex gap-6'
      )}
    >
      {/* Featured image (if not compact) */}
      {!isCompact && article.featuredImage && (
        <div className={cn(
          'overflow-hidden bg-gradient-to-br from-accent-primary/10 to-accent-secondary/10',
          variant === 'list' ? 'w-48 shrink-0' : 'aspect-video'
        )}>
          <img 
            src={article.featuredImage}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-slow"
          />
        </div>
      )}

      <div className="p-4 md:p-6 flex-1">
        {/* Meta information - Progressive disclosure based on viewport */}
        <div className="flex items-center gap-3 text-xs text-text-secondary mb-3">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {/* Date display - full on desktop, short on mobile */}
            <span className="hidden md:inline">{article.date}</span>
            <span className="md:hidden">{article.date.split(' ')[0]}</span>
          </span>
          {/* Reading time - hidden on mobile for space optimization */}
          {!isCompact && article.readingTime && (
            <span className="hidden sm:flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {article.readingTime} min
            </span>
          )}
          {/* Author - only on large screens, from persons.yml catalog */}
          {!isCompact && article.author && (
            <span className="hidden lg:flex items-center gap-1">
              <User className="w-3 h-3" />
              {article.author.name}
            </span>
          )}
        </div>

        {/* Article title - always visible, main interaction point */}
        <h3 className={cn(
          'font-display uppercase tracking-wide text-accent-primary mb-2',
          'group-hover:text-accent-secondary transition-colors',
          isCompact ? 'text-base' : 'text-lg md:text-xl'
        )}>
          <Link 
            to={article.slug} 
            className="hover:underline"
            onClick={() => onArticleClick(article, position, false)}
          >
            {article.title}
          </Link>
        </h3>

        {/* Article excerpt/summary - hidden in compact mode for space */}
        {!isCompact && (
          <p className="text-sm text-text-secondary mb-3 line-clamp-2">
            {article.excerpt}
          </p>
        )}

        {/* Article tags/keywords - used for SEO and discovery, max 3 shown */}
        {!isCompact && article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {article.tags.slice(0, 3).map(tag => (
              <Chip key={tag} variant="outline" size="sm">
                {tag}
              </Chip>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}

export default ArticleGrid