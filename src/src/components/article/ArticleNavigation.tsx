/**
 * @fileoverview ArticleNavigation - Smart Previous/Next navigation for blog articles
 * @module components/article/ArticleNavigation
 * 
 * @description
 * Provides contextual navigation between blog articles with intelligent
 * Previous/Next logic based on chronological order. Implements responsive
 * behavior with different display variants based on viewport size.
 * 
 * Navigation logic follows chronological ordering where "Previous" means
 * older article and "Next" means newer article. This creates an intuitive
 * reading flow through the blog archive.
 * 
 * @architecture
 * ```
 * gatsby-node.js (build time)
 *        ↓
 * Article Context (prev/next)
 *        ↓
 * ArticleNavigation (this)
 *        ├── Compact (mobile)
 *        ├── Default (tablet)
 *        └── Detailed (desktop)
 * 
 * Navigation Flow:
 * Oldest ← Previous | Current | Next → Newest
 * ```
 * 
 * @proto-integration
 * Article data maps to:
 * 
 * - **ArticleConfig** (blog.proto)
 *   - `slug`: URL path for navigation
 *   - `title`: Display title in navigation
 *   - `excerpt`: Summary for detailed view
 *   - `date_published`: Article date display
 * 
 * - **BlogConfig** (blog.proto)
 *   - `blog_features.article_navigation`: Enable/disable
 *   - `blog_layout.navigation_variant`: Default variant
 *   - `blog_features.show_home_link`: Home button visibility
 * 
 * @hook-integration
 * While this component doesn't directly use hooks,
 * the parent template may use:
 * 
 * - **useConfig()**: Navigation configuration
 * - **useGTM()**: Track navigation clicks
 * - **useSchema()**: BreadcrumbList structured data
 * 
 * @ecosystem-integration
 * - **Used in**: Bottom of all blog.[domain].in article pages
 * - **Data flow**: gatsby-node.js generates prev/next → page context → component
 * - **Routing**: Links to /blog/[slug] for article navigation
 * - **CTAs**: Part of unified article bottom navigation system
 * - **Analytics**: Navigation clicks tracked as events
 * - **SEO**: Contributes to internal linking structure
 * 
 * @features
 * - **Smart Display**: Only shows available navigation directions
 * - **Three Variants**: Compact, default, and detailed views
 * - **Responsive Design**: Adapts to viewport size
 * - **Home Link**: Optional "All Posts" navigation
 * - **Empty State Handling**: Maintains layout when missing prev/next
 * - **Glass Morphism**: Modern visual design
 * - **Hover Effects**: Interactive state feedback
 * 
 * @navigation-logic
 * ```
 * Latest Article:
 * [Empty] | Current | [← Previous]
 * 
 * Middle Article:
 * [Next →] | Current | [← Previous]
 * 
 * Oldest Article:
 * [Next →] | Current | [Empty]
 * ```
 * 
 * @responsive-behavior
 * ```
 * Mobile (<640px): Compact
 * - Simple Previous/Next buttons
 * - No article titles
 * - Minimal spacing
 * 
 * Tablet (640-1024px): Default
 * - Article titles visible
 * - Horizontal layout
 * - Medium spacing
 * 
 * Desktop (>1024px): Detailed
 * - Full article cards
 * - Excerpts and dates
 * - Rich hover effects
 * ```
 * 
 * @cta-integration
 * Unified article bottom CTAs:
 * - **"Top"**: Scroll to top (external)
 * - **"Back"**: Browser history.back() (external)
 * - **"Previous Thought"**: Older article (this component)
 * - **"Next Thought"**: Newer article (this component)
 * - **"Other Thoughts"**: Blog index (showHome option)
 * - **"Connect"**: Contact page (external)
 * 
 * @accessibility
 * - **Semantic Navigation**: <nav> with aria-label
 * - **Link Purpose**: Clear link text and context
 * - **Keyboard Support**: Full keyboard navigation
 * - **Focus Indicators**: Visible focus states
 * - **Screen Readers**: Logical reading order
 * 
 * @performance
 * - **Static Links**: Pre-generated at build time
 * - **Prefetching**: Gatsby Link prefetches on hover
 * - **CSS Transitions**: GPU-accelerated animations
 * - **Conditional Rendering**: Only renders available links
 * 
 * @dos
 * - Use appropriate variant for viewport
 * - Provide both prev and next when available
 * - Include meaningful excerpts for detailed view
 * - Test empty states (first/last articles)
 * - Maintain consistent date formatting
 * 
 * @donts
 * - Don't show both directions if only one exists
 * - Don't forget aria-label on nav element
 * - Don't override responsive breakpoints
 * - Don't show excerpts on mobile (space constraint)
 * - Don't break chronological ordering
 * 
 * @example
 * ```tsx
 * // Article template with navigation
 * const ArticleTemplate = ({ data, pageContext }) => {
 *   return (
 *     <>
 *       <ArticleHeader {...data.article} />
 *       <ArticleContent />
 *       <ArticleNavigation
 *         previous={pageContext.previous}
 *         next={pageContext.next}
 *         variant="detailed"
 *         showHome={true}
 *       />
 *     </>
 *   )
 * }
 * 
 * // Compact mobile navigation
 * <ArticleNavigation
 *   previous={prevArticle}
 *   next={nextArticle}
 *   variant="compact"
 * />
 * ```
 * 
 * @see {@link file://./USE-CASE.md#article-navigation} - Navigation specification
 * @see {@link file://./BUILD.md#gatsby-node} - Previous/Next generation
 * @see {@link file://./ArticleHeader.tsx} - Article header component
 * @see {@link file://../ui/Button.tsx} - Button component
 * 
 * @since 1.0.0
 */

import * as React from 'react'
import { Link } from 'gatsby'
import { cn } from '@/lib/utils'
import { Button } from '../ui/Button'
import { ChevronLeft, ChevronRight, ArrowLeft, ArrowRight } from 'lucide-react'

/**
 * @interface Article
 * @description Minimal article data structure for navigation
 * 
 * Subset of ArticleConfig proto fields needed for prev/next navigation.
 * Generated by gatsby-node.js during build process.
 * 
 * @property {string} slug - URL slug for article routing
 * From ArticleConfig.slug, used to construct /blog/[slug] links.
 * 
 * @property {string} title - Article title for display
 * From ArticleConfig.title, shown in navigation links.
 * 
 * @property {string} [excerpt] - Optional excerpt for detailed variant
 * From ArticleConfig.excerpt, displayed in detailed view only.
 * Limited to ~160 characters for optimal display.
 * 
 * @property {string} [date] - Optional date for detailed variant
 * From ArticleConfig.date_published, ISO 8601 format.
 * Formatted for display using Intl.DateTimeFormat.
 * 
 * @example
 * ```tsx
 * const article: Article = {
 *   slug: "understanding-protobuf",
 *   title: "Understanding Protocol Buffers",
 *   excerpt: "A deep dive into protobuf schemas...",
 *   date: "2024-01-15T10:00:00Z"
 * }
 * ```
 */
interface Article {
  /** URL slug for article routing */
  slug: string
  /** Article title for display */
  title: string
  /** Optional excerpt for detailed variant */
  excerpt?: string
  /** Optional date for detailed variant */
  date?: string
}

/**
 * @interface ArticleNavigationProps
 * @description Props for ArticleNavigation component
 * 
 * Configuration for article navigation with responsive variants
 * and optional home link.
 * 
 * @property {Article | null} [previous] - Chronologically previous (older) article
 * Generated by gatsby-node.js based on date_published.
 * Null for the oldest article in the blog.
 * 
 * @property {Article | null} [next] - Chronologically next (newer) article
 * Generated by gatsby-node.js based on date_published.
 * Null for the newest/latest article in the blog.
 * 
 * @property {'default' | 'compact' | 'detailed'} [variant='default'] - Display variant
 * - 'compact': Mobile view with minimal buttons
 * - 'default': Tablet view with titles
 * - 'detailed': Desktop view with full cards
 * 
 * @property {boolean} [showHome=true] - Whether to show "All Posts" link
 * Displays a center link to blog index page.
 * Text varies by variant: "All Posts" or "View All Posts".
 * 
 * @property {string} [className] - Additional CSS classes
 * Merged with base navigation classes using cn() utility.
 * Common uses: mt-8, border-t-2, bg-surface-secondary.
 * 
 * @example
 * ```tsx
 * const props: ArticleNavigationProps = {
 *   previous: olderArticle,
 *   next: newerArticle,
 *   variant: 'detailed',
 *   showHome: true,
 *   className: 'mt-12'
 * }
 * ```
 */
interface ArticleNavigationProps {
  /** Chronologically previous (older) article */
  previous?: Article | null
  /** Chronologically next (newer) article */
  next?: Article | null
  /** Display variant - compact (mobile), default (tablet), detailed (desktop) */
  variant?: 'default' | 'compact' | 'detailed'
  /** Whether to show "All Posts" / "Other Thoughts" link */
  showHome?: boolean
  /** Additional CSS classes for customization */
  className?: string
}

/**
 * ArticleNavigation component - Renders Previous/Next article navigation
 * 
 * Creates responsive navigation between blog articles with three
 * distinct variants optimized for different viewport sizes.
 * Handles empty states gracefully and maintains layout stability.
 * 
 * @component
 * @param {ArticleNavigationProps} props - Component props
 * @param {Article | null} [props.previous] - Previous (older) article
 * @param {Article | null} [props.next] - Next (newer) article
 * @param {'default' | 'compact' | 'detailed'} [props.variant='default'] - Display variant
 * @param {boolean} [props.showHome=true] - Show blog index link
 * @param {string} [props.className] - Additional CSS classes
 * 
 * @returns {JSX.Element} Navigation element with:
 * - Previous/Next article links (when available)
 * - Optional home/index link
 * - Responsive layout based on variant
 * - Empty state placeholders for layout stability
 * 
 * @remarks
 * The component implements three rendering paths:
 * 1. **Compact**: Simple buttons for mobile
 * 2. **Detailed**: Rich cards with excerpts for desktop
 * 3. **Default**: Balanced view with titles for tablet
 * 
 * Empty states (first/last article) are handled by
 * rendering empty <div /> placeholders to maintain layout.
 * 
 * @example
 * ```tsx
 * // In article template
 * <ArticleNavigation
 *   previous={pageContext.previous}
 *   next={pageContext.next}
 *   variant="detailed"
 * />
 * ```
 */
export const ArticleNavigation: React.FC<ArticleNavigationProps> = ({
  previous,
  next,
  variant = 'default',
  showHome = true,
  className
}) => {
  /**
   * Format date consistently across ecosystem
   * 
   * Converts ISO 8601 date strings to localized short format
   * for display in navigation cards.
   * 
   * @function formatDate
   * @param {string} [dateString] - ISO date string to format
   * @returns {string | null} Formatted date (e.g., "Jan 15, 2024") or null
   * 
   * @example
   * formatDate("2024-01-15T10:00:00Z") // Returns: "Jan 15, 2024"
   */
  const formatDate = (dateString?: string) => {
    if (!dateString) return null
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date)
  }

  if (variant === 'compact') {
    return (
      <nav 
        className={cn('flex items-center justify-between gap-4', className)}
        aria-label="Article navigation"
      >
        {previous ? (
          <Button asChild variant="outline" size="sm">
            <Link to={`/blog/${previous.slug}`}>
              <ChevronLeft className="mr-1 h-4 w-4" />
              Previous
            </Link>
          </Button>
        ) : (
          <div />
        )}
        
        {showHome && (
          <Button asChild variant="ghost" size="sm">
            <Link to="/blog">All Posts</Link>
          </Button>
        )}
        
        {next ? (
          <Button asChild variant="outline" size="sm">
            <Link to={`/blog/${next.slug}`}>
              Next
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        ) : (
          <div />
        )}
      </nav>
    )
  }

  if (variant === 'detailed') {
    return (
      <nav 
        className={cn(
          'border-t border-accent-primary/10 pt-8',
          className
        )}
        aria-label="Article navigation"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {previous ? (
            <Link 
              to={`/blog/${previous.slug}`}
              className="group flex gap-4 p-4 rounded-terminal glass hover:glass-heavy transition-all"
            >
              <div className="flex-shrink-0 flex items-center">
                <ArrowLeft className="w-6 h-6 text-accent-primary group-hover:text-accent-secondary transition-colors" />
              </div>
              <div className="flex-1 text-left">
                <div className="text-sm text-text-tertiary mb-1">Previous Post</div>
                <h3 className="font-display uppercase text-accent-primary group-hover:text-accent-secondary transition-colors">
                  {previous.title}
                </h3>
                {previous.excerpt && (
                  <p className="text-sm text-text-secondary line-clamp-2 mt-1">
                    {previous.excerpt}
                  </p>
                )}
                {previous.date && (
                  <time className="text-xs text-text-tertiary mt-2 block">
                    {formatDate(previous.date)}
                  </time>
                )}
              </div>
            </Link>
          ) : (
            <div />
          )}
          
          {next ? (
            <Link 
              to={`/blog/${next.slug}`}
              className="group flex gap-4 p-4 rounded-terminal glass hover:glass-heavy transition-all md:flex-row-reverse md:text-right"
            >
              <div className="flex-shrink-0 flex items-center">
                <ArrowRight className="w-6 h-6 text-accent-primary group-hover:text-accent-secondary transition-colors" />
              </div>
              <div className="flex-1">
                <div className="text-sm text-text-tertiary mb-1">Next Post</div>
                <h3 className="font-display uppercase text-accent-primary group-hover:text-accent-secondary transition-colors">
                  {next.title}
                </h3>
                {next.excerpt && (
                  <p className="text-sm text-text-secondary line-clamp-2 mt-1">
                    {next.excerpt}
                  </p>
                )}
                {next.date && (
                  <time className="text-xs text-text-tertiary mt-2 block">
                    {formatDate(next.date)}
                  </time>
                )}
              </div>
            </Link>
          ) : (
            <div />
          )}
        </div>
        
        {showHome && (
          <div className="mt-8 text-center">
            <Button asChild variant="outline">
              <Link to="/blog">
                View All Posts
              </Link>
            </Button>
          </div>
        )}
      </nav>
    )
  }

  // Default variant
  return (
    <nav 
      className={cn(
        'flex flex-col sm:flex-row items-center justify-between gap-4 py-8 border-t border-accent-primary/10',
        className
      )}
      aria-label="Article navigation"
    >
      <div className="flex-1 w-full sm:w-auto">
        {previous && (
          <Link 
            to={`/blog/${previous.slug}`}
            className="group flex items-center gap-2 text-text-secondary hover:text-accent-primary transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <div className="text-left">
              <div className="text-xs text-text-tertiary">Previous</div>
              <div className="font-display uppercase tracking-wide group-hover:text-accent-secondary transition-colors">
                {previous.title}
              </div>
            </div>
          </Link>
        )}
      </div>
      
      {showHome && (
        <div className="flex-shrink-0">
          <Button asChild variant="ghost" size="icon" className="rounded-full">
            <Link to="/blog" aria-label="All posts">
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <rect x="4" y="4" width="7" height="7" strokeWidth="2" />
                <rect x="13" y="4" width="7" height="7" strokeWidth="2" />
                <rect x="4" y="13" width="7" height="7" strokeWidth="2" />
                <rect x="13" y="13" width="7" height="7" strokeWidth="2" />
              </svg>
            </Link>
          </Button>
        </div>
      )}
      
      {/* Next article with title */}
      <div className="flex-1 w-full sm:w-auto">
        {next && (
          <Link 
            to={`/blog/${next.slug}`}
            className="group flex items-center justify-end gap-2 text-text-secondary hover:text-accent-primary transition-colors"
          >
            <div className="text-right">
              <div className="text-xs text-text-tertiary">Next</div>
              <div className="font-display uppercase tracking-wide group-hover:text-accent-secondary transition-colors">
                {next.title}
              </div>
            </div>
            <ChevronRight className="w-5 h-5" />
          </Link>
        )}
      </div>
    </nav>
  )
}

export default ArticleNavigation