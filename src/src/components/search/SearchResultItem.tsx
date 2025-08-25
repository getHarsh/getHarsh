/**
 * @fileoverview SearchResultItem - Individual search result display component
 * @module components/search/SearchResultItem
 * 
 * @description
 * A rich search result item component that displays comprehensive information
 * about each search result including title, summary, metadata, tags, and
 * optional featured image. Supports query highlighting and keyboard navigation.
 * 
 * This component is the atomic unit of search results display, rendering
 * individual results with full metadata, visual hierarchy, and interactive
 * states for an optimal search experience.
 * 
 * @architecture
 * ```
 * SearchResultItem (this)
 *       ├── Link Container (Gatsby routing)
 *       │     ├── Type Icon (emoji)
 *       │     ├── Content Area
 *       │     │     ├── Title with highlighting
 *       │     │     ├── Summary with highlighting
 *       │     │     ├── Metadata line
 *       │     │     └── Tag pills
 *       │     └── Featured Image (optional)
 *       └── Selection State (keyboard nav)
 * 
 * Data Flow:
 * result object → format → highlight query → render
 * ```
 * 
 * @proto-integration
 * Maps to search result proto structures:
 * 
 * - **SearchResult** (search.proto)
 *   - `id`: Unique content identifier
 *   - `type`: Content type (post, page, project)
 *   - `title`: Result title
 *   - `summary`: Excerpt or description
 *   - `content_type_label`: Schema.org type label
 *   - `date_published`: ISO date string
 *   - `reading_time_minutes`: Estimated read time
 *   - `tags[]`: Associated keywords
 *   - `author_names[]`: Content authors
 *   - `featured_image_url`: Thumbnail image
 * 
 * - **FederatedResult** (search.proto)
 *   - `_federationDomain`: Source domain
 *   - Inherits all SearchResult fields
 * 
 * - **SearchDisplay** (search.proto)
 *   - `highlight_query_terms`: Enable highlighting
 *   - `show_metadata`: Display date/author/tags
 *   - `show_featured_images`: Display thumbnails
 *   - `max_tags_per_result`: Tag display limit (5)
 * 
 * @hook-integration
 * While not directly using hooks, integrates with:
 * 
 * - Parent SearchResults tracking:
 *   - Click position tracking
 *   - Keyboard navigation state
 * 
 * - SearchHighlight component:
 *   - Query term highlighting
 *   - Bold formatting for matches
 * 
 * @ecosystem-integration
 * - **Used by**: SearchResults for every result
 * - **Data source**: FlexSearch results or federated data
 * - **Navigation**: Gatsby Link for SPA routing
 * - **Federation**: Displays source domain for cross-domain
 * - **Analytics**: Click tracking via data-position
 * - **Accessibility**: Full keyboard and screen reader support
 * 
 * @features
 * - **Query Highlighting**: Bold matching terms
 * - **Type Icons**: Visual content type indicators
 * - **Rich Metadata**: Date, time, authors, tags
 * - **Featured Images**: Optional thumbnails
 * - **Federation Badge**: Source domain display
 * - **Selection State**: Keyboard nav feedback
 * - **Responsive**: Adapts to container width
 * - **Dark Mode**: Full theme support
 * 
 * @content-type-mapping
 * ```
 * Icon Mapping:
 * 📝 BlogPosting - Blog articles
 * 📄 WebPage - Static pages  
 * 🚀 SoftwareApplication - Projects
 * 👤 Person - People profiles
 * 🏢 Organization - Companies
 * 🔬 ResearchProject - Research
 * 📋 Default - Other content
 * ```
 * 
 * @metadata-display
 * ```
 * Line 1: Title + Type Label
 * Line 2-3: Summary (2-line clamp)
 * Line 4: Date | Reading Time | Authors | Domain
 * Line 5: Tag pills (max 5)
 * ```
 * 
 * @visual-hierarchy
 * - **Title**: Large, bold, primary color
 * - **Summary**: Medium, regular, secondary color
 * - **Metadata**: Small, light, tertiary color
 * - **Tags**: Extra small, pills, quaternary
 * - **Selection**: Background highlight
 * 
 * @accessibility
 * - **Semantic HTML**: <h3> for title hierarchy
 * - **ARIA Labels**: Icon descriptions for screen readers
 * - **Focus States**: Visible focus ring
 * - **Keyboard Nav**: Arrow key selection
 * - **Alt Text**: Empty for decorative images
 * - **Color Contrast**: WCAG AA compliant
 * 
 * @performance
 * - **Image Loading**: Lazy loading for thumbnails
 * - **Text Clamping**: CSS-based line limiting
 * - **Link Prefetch**: Gatsby Link optimization
 * - **Emoji Icons**: No external dependencies
 * - **Conditional Rendering**: Only shown elements
 * 
 * @dos
 * - Highlight query terms in title/summary
 * - Show appropriate type icon
 * - Display all available metadata
 * - Limit tags to prevent overflow
 * - Indicate federated source
 * 
 * @donts
 * - Don't show more than 5 tags
 * - Don't skip query highlighting
 * - Don't use external navigation
 * - Don't forget selection state
 * - Don't remove accessibility features
 * 
 * @example
 * ```tsx
 * // Standard search result
 * <SearchResultItem
 *   result={{
 *     id: 'getting-started',
 *     type: 'post',
 *     title: 'Getting Started with Gatsby',
 *     summary: 'Learn how to build blazing fast websites with Gatsby and React.',
 *     content_type_label: 'BlogPosting',
 *     date_published: '2024-01-15T10:00:00Z',
 *     reading_time_minutes: 5,
 *     author_names: ['Harsh Vardhan'],
 *     tags: ['gatsby', 'react', 'tutorial', 'javascript', 'static-site'],
 *     featured_image_url: '/images/gatsby-tutorial.jpg'
 *   }}
 *   query="gatsby"
 *   isSelected={false}
 *   position={0}
 *   onClick={() => trackClick(0)}
 * />
 * 
 * // Federated result
 * <SearchResultItem
 *   result={{
 *     ...baseResult,
 *     _federationDomain: 'blog.causality.in'
 *   }}
 *   query={searchQuery}
 *   isSelected={selectedIndex === 2}
 *   position={2}
 * />
 * ```
 * 
 * @see {@link file://./SearchResults.tsx} - Parent container
 * @see {@link file://./SearchHighlight.tsx} - Query highlighting
 * @see {@link file://./SEARCH.md#result-display} - Result specification
 * @see {@link file://../../hooks/search/useSearchTracking.ts} - Analytics
 * 
 * @since 1.0.0
 */

import React from 'react'
import { Link } from 'gatsby'
import { SearchHighlight } from './SearchHighlight'

/**
 * @interface SearchResultItemProps
 * @description Props for SearchResultItem component
 * 
 * Configuration for individual search result display, including
 * the result data, query for highlighting, and interaction state.
 * 
 * @property {Object} result - Search result data
 * Complete result object from FlexSearch or federation.
 * 
 * @property {string} result.id - Unique result identifier
 * Used to construct the result URL path.
 * 
 * @property {string} result.type - Content type (post, page, project, etc.)
 * Determines the URL structure and icon display.
 * 
 * @property {string} result.title - Result title
 * Primary display text, highlighted if matches query.
 * 
 * @property {string} result.summary - Result summary/description
 * Secondary text, clamped to 2 lines, highlighted if matches.
 * 
 * @property {string} [result.content_type_label] - Human-readable content type label
 * Schema.org type name for display (e.g., 'BlogPosting').
 * 
 * @property {string} [result.date_published] - Publication date ISO string
 * Displayed in localized format in metadata line.
 * 
 * @property {number} [result.reading_time_minutes] - Estimated reading time in minutes
 * Shown as "X min read" in metadata.
 * 
 * @property {string[]} [result.tags] - Associated tags
 * Displayed as pills, maximum 5 shown.
 * 
 * @property {string[]} [result.author_names] - Author names
 * Displayed as comma-separated list in metadata.
 * 
 * @property {string} [result.featured_image_url] - Featured image URL
 * Thumbnail image shown on right side, 64x64px.
 * 
 * @property {string} [result._federationDomain] - Source domain for federated results
 * Shows "from domain.com" for cross-domain results.
 * 
 * @property {string} query - Search query for highlighting
 * Used to bold matching terms in title and summary.
 * 
 * @property {boolean} [isSelected=false] - Whether item is selected (keyboard nav)
 * Shows visual selection state for keyboard navigation.
 * 
 * @property {() => void} [onClick] - Click handler callback
 * Called when result is clicked, used for analytics.
 * 
 * @property {number} position - Position in results list
 * Zero-based index for analytics tracking.
 * 
 * @example
 * ```tsx
 * const props: SearchResultItemProps = {
 *   result: {
 *     id: 'intro-to-graphql',
 *     type: 'post',
 *     title: 'Introduction to GraphQL',
 *     summary: 'Learn the basics of GraphQL...',
 *     content_type_label: 'BlogPosting',
 *     date_published: '2024-01-20T12:00:00Z',
 *     reading_time_minutes: 8,
 *     tags: ['graphql', 'api', 'tutorial'],
 *     author_names: ['John Doe'],
 *     featured_image_url: '/images/graphql.jpg'
 *   },
 *   query: 'graphql',
 *   isSelected: false,
 *   onClick: () => console.log('Clicked'),
 *   position: 0
 * }
 * ```
 */
interface SearchResultItemProps {
  /** Search result data from FlexSearch or federation */
  result: {
    /** Unique result identifier for URL construction */
    id: string
    /** Content type (post, page, project, etc.) for routing and icon */
    type: string
    /** Result title - highlighted if matches query */
    title: string
    /** Result summary/description - 2-line clamp with highlighting */
    summary: string
    /** Human-readable content type label (Schema.org type) */
    content_type_label?: string
    /** Publication date ISO string for metadata display */
    date_published?: string
    /** Estimated reading time in minutes */
    reading_time_minutes?: number
    /** Associated tags - max 5 displayed as pills */
    tags?: string[]
    /** Author names - shown as comma-separated list */
    author_names?: string[]
    /** Featured image URL - 64x64px thumbnail */
    featured_image_url?: string
    /** Source domain for federated results */
    _federationDomain?: string
  }
  /** Search query for highlighting matching terms */
  query: string
  /** Whether item is selected via keyboard navigation */
  isSelected?: boolean
  /** Click handler callback for analytics tracking */
  onClick?: () => void
  /** Position in results list for analytics */
  position: number
}

/**
 * Get emoji icon for content type
 * 
 * Maps content types to visual emoji indicators for quick
 * recognition of result types. Supports both internal type
 * names and Schema.org type labels.
 * 
 * @param {string} type - Content type identifier
 * @returns {string} Emoji icon character
 * 
 * @example
 * getTypeIcon('BlogPosting') // Returns '📝'
 * getTypeIcon('project') // Returns '🚀'
 */
const getTypeIcon = (type: string): string => {
  switch (type) {
    case 'post':
    case 'BlogPosting':
      return '📝' // Memo - blog posts
    case 'page':
    case 'WebPage':
      return '📄' // Page facing up - static pages
    case 'project':
    case 'SoftwareApplication':
      return '🚀' // Rocket - projects
    case 'Person':
      return '👤' // Bust in silhouette - people
    case 'Organization':
      return '🏢' // Office building - organizations
    case 'ResearchProject':
      return '🔬' // Microscope - research
    default:
      return '📋' // Clipboard - generic content
  }
}

/**
 * SearchResultItem component - Individual search result display
 * 
 * Renders a rich search result with title, summary, metadata, tags,
 * and optional image. Supports query highlighting and keyboard
 * navigation selection states.
 * 
 * @component
 * @param {SearchResultItemProps} props - Component props
 * @param {Object} props.result - Search result data
 * @param {string} props.query - Query for highlighting
 * @param {boolean} [props.isSelected=false] - Selection state
 * @param {() => void} [props.onClick] - Click handler
 * @param {number} props.position - Result position
 * 
 * @returns {JSX.Element} Search result item containing:
 * - Gatsby Link wrapper for SPA navigation
 * - Type emoji icon
 * - Title with query highlighting
 * - Summary with 2-line clamp
 * - Metadata line (date, time, authors)
 * - Tag pills (max 5)
 * - Optional featured image
 * - Federation domain indicator
 * 
 * @remarks
 * The component uses Gatsby Link for internal routing,
 * ensuring SPA navigation without full page reloads.
 * Query highlighting is applied to title and summary
 * to help users identify matching content.
 * 
 * Visual states:
 * - Default: Transparent background
 * - Hover: Light gray background
 * - Selected: Primary color tint
 * 
 * @example
 * ```tsx
 * // In SearchResults
 * {results.map((result, index) => (
 *   <SearchResultItem
 *     key={result.id}
 *     result={result}
 *     query={searchQuery}
 *     isSelected={index === selectedIndex}
 *     onClick={() => handleResultClick(index)}
 *     position={index}
 *   />
 * ))}
 * ```
 */
export const SearchResultItem: React.FC<SearchResultItemProps> = ({
  result,
  query,
  isSelected = false,
  onClick,
  position
}) => {
  /**
   * Construct URL path from type and ID
   * Format: /[type]/[id]/
   */
  const url = `/${result.type}/${result.id}/`
  
  /**
   * Get appropriate emoji icon for content type
   */
  const typeIcon = getTypeIcon(result.type)

  return (
    <Link
      to={url}
      className={`
        block p-4 rounded-lg transition-colors
        ${isSelected 
          ? 'bg-primary/10 border-primary' 
          : 'hover:bg-gray-50 dark:hover:bg-gray-800'
        }
        border border-transparent hover:border-gray-200 dark:hover:border-gray-700
      `}
      onClick={onClick}
      data-position={position}
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl mt-1" role="img" aria-label={result.type}>
          {typeIcon}
        </span>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              <SearchHighlight text={result.title} query={query} />
            </h3>
            {result.content_type_label && (
              <span className="px-2 py-0.5 text-xs rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                {result.content_type_label}
              </span>
            )}
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
            <SearchHighlight text={result.summary} query={query} />
          </p>

          <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-500">
            {result.date_published && (
              <span>
                {new Date(result.date_published).toLocaleDateString()}
              </span>
            )}
            
            {result.reading_time_minutes && (
              <span>{result.reading_time_minutes} min read</span>
            )}
            
            {result.author_names && result.author_names.length > 0 && (
              <span>by {result.author_names.join(', ')}</span>
            )}
            
            {result._federationDomain && (
              <span className="text-blue-600 dark:text-blue-400">
                from {result._federationDomain}
              </span>
            )}
          </div>

          {result.tags && result.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {result.tags.slice(0, 5).map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-0.5 text-xs rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {result.featured_image_url && (
          <img
            src={result.featured_image_url}
            alt=""
            className="w-16 h-16 rounded object-cover"
            loading="lazy"
          />
        )}
      </div>
    </Link>
  )
}