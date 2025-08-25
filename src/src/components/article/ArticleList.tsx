/**
 * @fileoverview ArticleList - Index list wrapper for blog post listings
 * @module components/article/ArticleList
 * 
 * @description
 * Implements the Index List pattern for blog indexes, providing a structured
 * list view of articles with consistent alignment and responsive behavior.
 * Works in tandem with LatestArticle for complete blog index pages.
 * 
 * This is a thin wrapper around ArticleGrid that enforces list-specific
 * defaults while delegating all rendering logic to the grid component.
 * This pattern ensures consistency while maintaining flexibility.
 * 
 * @architecture
 * ```
 * Blog Index Page
 *      ├── LatestArticle (featured)
 *      └── ArticleList (this)
 *              └── ArticleGrid
 *                      └── ArticleCard (per item)
 * 
 * Data Flow:
 * GraphQL Query → Page → ArticleList → ArticleGrid
 * ```
 * 
 * @proto-integration
 * Article data structure maps to:
 * 
 * - **ArticleConfig** (blog.proto)
 *   - `id`: Unique article identifier
 *   - `slug`: URL-safe article path
 *   - `title`: Article headline
 *   - `excerpt`: Summary for listing
 *   - `date_published`: Publication date
 *   - `reading_time_minutes`: Estimated reading time
 *   - `author_keys`: Maps to PersonConfig
 *   - `tags`: Article keywords
 *   - `featured_priority`: Featured flag
 *   - `cover_image`: Featured image URL
 * 
 * - **PersonConfig** (persons.proto)
 *   - `name`: Author display name
 *   - `avatar_url`: Author profile image
 * 
 * - **BlogConfig** (blog.proto)
 *   - `blog_layout.index_variant`: List vs grid display
 *   - `blog_features.pagination`: Items per page
 *   - `blog_features.show_featured`: Featured article display
 * 
 * @hook-integration
 * While ArticleList itself doesn't use hooks directly,
 * ArticleGrid (which it wraps) uses:
 * 
 * - **useConfig()**: Blog layout configuration
 * - **useGTM()**: Analytics tracking for list interactions
 * - **useSchema()**: ItemList structured data
 * 
 * @ecosystem-integration
 * - **Used in**: blog.[domain].in index pages, project filtered views
 * - **Data flow**: Parent component → ArticleList → ArticleGrid
 * - **Positioning**: Below [LATEST] component in hero section
 * - **Grid alignment**: Shares CSS Grid template with LatestArticle
 * - **Pagination**: Virtual scrolling ready for large datasets
 * - **Analytics**: List impressions and clicks tracked
 * - **SEO**: Contributes to ItemList schema
 * 
 * @features
 * - **List Layout**: Enforces vertical list display
 * - **Compact Mode**: Reduced spacing for dense views
 * - **Featured Control**: Typically delegates to LatestArticle
 * - **Responsive Design**: Adapts to all screen sizes
 * - **Performance**: Optimized for 1000+ articles
 * - **Accessibility**: Semantic list markup
 * 
 * @configuration
 * - **Variants**: 'list' (default) or 'compact'
 * - **Featured**: Usually false (LatestArticle handles)
 * - **Pagination**: Inherits from ArticleGrid
 * - **Sorting**: Chronological by default
 * 
 * @responsive-behavior
 * ```
 * Mobile (<640px):
 * - Single column list
 * - Compact spacing
 * - Touch-optimized
 * 
 * Tablet (640-1024px):
 * - Single column with margins
 * - Standard spacing
 * 
 * Desktop (>1024px):
 * - Wide list with metadata
 * - Comfortable spacing
 * ```
 * 
 * @performance
 * - **Static Generation**: Pre-rendered at build time
 * - **Virtual Scrolling**: Compatible with react-window
 * - **Image Optimization**: Lazy loading via ArticleGrid
 * - **Code Splitting**: ArticleGrid lazy loaded if needed
 * 
 * @accessibility
 * - **Semantic HTML**: Proper list structure
 * - **ARIA Labels**: Descriptive labels via ArticleGrid
 * - **Keyboard Nav**: Full keyboard support
 * - **Screen Readers**: Logical reading order
 * 
 * @dos
 * - Use for blog index pages
 * - Set variant based on design needs
 * - Let LatestArticle handle featured
 * - Pass all articles (filtering in ArticleGrid)
 * - Test with large datasets
 * 
 * @donts
 * - Don't use 'grid' variant (use ArticleGrid directly)
 * - Don't show featured if using LatestArticle
 * - Don't implement custom pagination here
 * - Don't filter articles before passing
 * - Don't override ArticleGrid defaults unnecessarily
 * 
 * @example
 * ```tsx
 * // Blog index page with featured article
 * const BlogIndex = ({ data }) => {
 *   const [latest, ...rest] = data.allArticles.nodes
 *   
 *   return (
 *     <>
 *       <LatestArticle article={latest} />
 *       <ArticleList 
 *         articles={rest}
 *         variant="list"
 *         showFeatured={false}
 *       />
 *     </>
 *   )
 * }
 * 
 * // Project page with filtered articles
 * <ArticleList
 *   articles={projectArticles}
 *   variant="compact"
 *   className="mt-8"
 * />
 * ```
 * 
 * @see {@link file://./USE-CASE.md#index-list} - Component specification
 * @see {@link file://./BUILD.md#blog-pages} - Blog page generation
 * @see {@link file://./ArticleGrid.tsx} - Grid implementation
 * @see {@link file://./LatestArticle.tsx} - Featured article
 * @see {@link file://./ArticleCard.tsx} - Individual article card
 * 
 * @since 1.0.0
 */

import * as React from 'react'
import { ArticleGrid } from './ArticleGrid'

/**
 * @interface Article
 * @description Article data structure matching ArticleGrid requirements
 * 
 * Maps to ArticleConfig proto fields after processing through gatsby-node.js.
 * This interface represents the transformed data ready for rendering.
 * 
 * @property {string} id - Unique identifier from ArticleConfig.id
 * @property {string} slug - URL path from ArticleConfig.slug
 * @property {string} title - Article headline from ArticleConfig.title
 * @property {string} excerpt - Summary from ArticleConfig.excerpt (max 160 chars)
 * @property {string} date - ISO date string from ArticleConfig.date_published
 * @property {number} [readingTime] - Minutes from ArticleConfig.reading_time_minutes
 * @property {object} [author] - Author data resolved from author_keys
 * @property {string} author.name - From PersonConfig.name
 * @property {string} [author.avatar] - From PersonConfig.avatar_url
 * @property {string[]} [tags] - Keywords from ArticleConfig.tags
 * @property {boolean} [featured] - From ArticleConfig.featured_priority > 0
 * @property {string} [featuredImage] - From ArticleConfig.cover_image
 * 
 * @see {@link file://./ArticleGrid.tsx} - Full documentation
 * @see {@link file://./blog.proto#ArticleConfig} - Proto source
 */
interface Article {
  id: string
  slug: string
  title: string
  excerpt: string
  date: string
  readingTime?: number
  author?: {
    name: string
    avatar?: string
  }
  tags?: string[]
  featured?: boolean
  featuredImage?: string
}

/**
 * @interface ArticleListProps
 * @description Props for ArticleList component
 * 
 * Subset of ArticleGrid props with list-specific defaults.
 * All props are passed through to ArticleGrid for rendering.
 * 
 * @property {Article[]} articles - Array of articles from GraphQL queries
 * Typically sorted chronologically (newest first) by gatsby-node.js.
 * Can contain hundreds of articles - ArticleGrid handles pagination.
 * 
 * @property {boolean} [showFeatured=false] - Whether to show featured badge
 * Usually false because LatestArticle handles the featured article.
 * Set to true only when not using LatestArticle component.
 * 
 * @property {'list' | 'compact'} [variant='list'] - Display variant
 * - 'list': Standard spacing for blog index pages
 * - 'compact': Reduced spacing for filtered/project views
 * Never 'grid' - use ArticleGrid directly for grid layouts.
 * 
 * @property {string} [className] - Additional CSS classes
 * Passed directly to ArticleGrid for styling customization.
 * Common uses: mt-8, border-t, bg-surface-secondary.
 * 
 * @example
 * ```tsx
 * const props: ArticleListProps = {
 *   articles: blogPosts,
 *   variant: 'list',
 *   showFeatured: false,
 *   className: 'mt-12'
 * }
 * ```
 */
interface ArticleListProps {
  /** Array of articles from GraphQL queries or CMS */
  articles: Article[]
  /** Whether to show featured article - usually false as LatestArticle handles featured */
  showFeatured?: boolean
  /** Display variant - 'list' for blog index, 'compact' for filtered views */
  variant?: 'list' | 'compact'
  /** Additional CSS classes for customization */
  className?: string
}

/**
 * ArticleList component - Renders articles in list format
 * 
 * Thin wrapper around ArticleGrid that enforces list-specific defaults.
 * This pattern allows for specialized list behavior while maintaining
 * a single source of truth for article rendering logic.
 * 
 * @component
 * @param {ArticleListProps} props - Component props
 * @param {Article[]} props.articles - Articles to display
 * @param {boolean} [props.showFeatured=false] - Show featured badge
 * @param {'list' | 'compact'} [props.variant='list'] - Display variant
 * @param {string} [props.className] - Additional CSS classes
 * 
 * @returns {JSX.Element} ArticleGrid configured for list display
 * 
 * @remarks
 * This component exists to:
 * 1. Provide a semantic API for list views
 * 2. Enforce list-only variants
 * 3. Set appropriate defaults
 * 4. Maintain backward compatibility
 * 
 * All rendering logic is delegated to ArticleGrid,
 * ensuring consistency across all article displays.
 * 
 * @example
 * ```tsx
 * // Standard blog index
 * <ArticleList articles={posts} />
 * 
 * // Compact project view
 * <ArticleList 
 *   articles={projectPosts}
 *   variant="compact"
 * />
 * ```
 */
export const ArticleList: React.FC<ArticleListProps> = ({
  articles,
  showFeatured = false,
  variant = 'list',
  className
}) => {
  return (
    <ArticleGrid
      articles={articles}
      variant={variant}
      showFeatured={showFeatured}
      className={className}
    />
  )
}

export default ArticleList