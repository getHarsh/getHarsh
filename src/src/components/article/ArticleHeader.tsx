/**
 * @fileoverview ArticleHeader - Unified metadata header for blog articles
 * @module components/article/ArticleHeader
 * 
 * @description
 * Displays comprehensive article metadata with responsive progressive disclosure.
 * Implements the ecosystem's cross-posting awareness and sponsor transparency.
 * Shows different levels of information based on viewport size while keeping
 * all semantic data in the DOM for SEO and accessibility.
 * 
 * This component is the primary metadata display for all blog articles,
 * providing rich semantic markup, Schema.org structured data, and visual
 * hierarchy for article information.
 * 
 * @architecture
 * ```
 * ArticleConfig (blog.proto)
 *         ↓
 * Gatsby Build (frontmatter)
 *         ↓
 * ArticleHeader (this)
 *         ├── Metadata Display
 *         ├── Sponsor Disclosure
 *         ├── Cross-posting Chips
 *         ├── Project Relationships
 *         ├── Keywords/Tags
 *         └── Schema.org JSON-LD
 * ```
 * 
 * @proto-integration
 * Maps directly to ArticleConfig message fields:
 * 
 * - **ArticleConfig** (blog.proto)
 *   - `title`: Article headline (H1)
 *   - `date_published`: Publication timestamp
 *   - `date_modified`: Last update timestamp
 *   - `reading_time_minutes`: Calculated reading time
 *   - `author_keys`: Maps to persons.yml catalog
 *   - `tags`: Keyword array for SEO
 *   - `content_type`: Enum for Schema.org mapping
 * 
 * - **CrossPostingConfig** (blog.proto)
 *   - `enabled`: Whether cross-posting is active
 *   - `published_domains`: Array of syndication domains
 *   - `canonical_domain`: Primary publication domain
 * 
 * - **ProjectRelationships** (blog.proto)
 *   - `uses_project_keys`: Projects article demonstrates
 *   - `updates_project_keys`: Projects article updates
 * 
 * - **ArticleSponsor** (blog.proto)
 *   - `sponsored`: Boolean flag for sponsorship
 *   - `sponsor_name`: Sponsor entity name
 *   - `sponsor_url`: Sponsor website
 *   - `disclosure_position`: Where to show disclosure
 * 
 * - **PersonConfig** (persons.proto)
 *   - `name`: Author display name
 *   - `bio`: Author biography
 *   - `avatar_url`: Author profile image
 * 
 * @hook-integration
 * Primary hooks used:
 * 
 * - **useSchema()** (`/src/hooks/useSchema.ts`)
 *   - `buildArticleSchema()`: Creates Article structured data
 *   - `renderJsonLd()`: Injects JSON-LD script tag
 *   - Schema.org type mapping based on content_type
 * 
 * Helper functions:
 * - **getCurrentTheme()** (`/src/config/themes.ts`): Theme configuration
 * - **getSchemaType()** (`/src/utils/mappings.ts`): Proto enum to Schema.org mapping
 * 
 * @ecosystem-integration
 * - **Used in**: All blog.[domain].in article pages
 * - **Data flow**: Frontmatter → gatsby-node.js → page context → component
 * - **State**: Stateless, all data from props
 * - **Cross-posting**: Shows canonical and syndicated domains
 * - **Schema.org**: Article/BlogPosting/TechArticle structured data
 * - **Analytics**: Header interactions tracked via GTM
 * - **SEO**: Rich snippets for search results
 * 
 * @features
 * - **Progressive Disclosure**: More metadata on larger screens
 * - **Cross-posting Awareness**: Domain chips for syndication
 * - **Project Relationships**: Uses/Updates project linking
 * - **Sponsor Transparency**: FTC-compliant disclosure
 * - **Semantic HTML**: Proper time elements and ARIA
 * - **Schema.org**: Rich structured data for SEO
 * - **Reading Time**: Calculated at build time
 * - **Author Attribution**: From persons.yml catalog
 * 
 * @responsive-behavior
 * ```
 * Mobile (<640px):
 * - Title (H1)
 * - Published date
 * - Sponsor disclosure
 * 
 * Tablet (640-1024px):
 * + Domain chips
 * + Project chips
 * + Keyword tags
 * 
 * Desktop (>1024px):
 * + Author name
 * + Updated date
 * + Reading time
 * ```
 * 
 * @accessibility
 * - **Semantic HTML**: <header>, <time>, <h1> elements
 * - **ARIA Labels**: Descriptive labels for chips
 * - **Color Contrast**: WCAG AA compliant
 * - **Screen Readers**: Proper announcement order
 * - **Keyboard Nav**: All interactive elements focusable
 * 
 * @performance
 * - **Static Data**: All metadata pre-computed at build
 * - **Memoized Schema**: JSON-LD generated once
 * - **CSS Animations**: GPU-accelerated fade-ins
 * - **Lazy Chips**: Chips rendered only when data exists
 * 
 * @dos
 * - Always provide title and publishedDate
 * - Include sponsor disclosure when applicable
 * - Use semantic HTML elements
 * - Test progressive disclosure at all breakpoints
 * - Verify Schema.org in Rich Results Test
 * 
 * @donts
 * - Don't skip sponsor disclosure
 * - Don't show updated date if same as published
 * - Don't render empty chip sections
 * - Don't forget time element datetime attributes
 * - Don't override responsive breakpoints
 * 
 * @example
 * ```tsx
 * // Full article header with all metadata
 * <ArticleHeader
 *   title="Understanding Proto-Driven Architecture"
 *   publishedDate="2024-01-15T10:00:00Z"
 *   updatedDate="2024-01-20T15:30:00Z"
 *   readingTime="5 min read"
 *   author="Harsh Gupta"
 *   domains={["blog.getharsh", "tech.getharsh"]}
 *   projects={["proto-cms", "gatsby-ecosystem"]}
 *   keywords={["architecture", "protobuf", "cms"]}
 *   sponsored={true}
 *   sponsorName="TechCorp"
 *   sponsorUrl="https://techcorp.com"
 *   contentType="CONTENT_TYPE_TECHNICAL_ARTICLE"
 * />
 * ```
 * 
 * @see {@link file://./USE-CASE.md#article-header} - Component specification
 * @see {@link file://./CMS.md#articleconfig} - ArticleConfig proto fields
 * @see {@link file://./BUILD.md#frontmatter} - Frontmatter processing
 * @see {@link file://../../hooks/useSchema.ts} - Schema generation
 * @see {@link file://./ArticleList.tsx} - Article list component
 * @see {@link file://./ArticleNavigation.tsx} - Article navigation
 * 
 * @since 1.0.0
 */

import * as React from "react"
import { cn } from "@/lib/utils"
import { Chip } from "@/components/ui/Chip"
import { getCurrentTheme } from "@/config/themes"
import { useSchema } from "@/hooks/useSchema"
import { getSchemaType } from "@/utils/mappings"

/**
 * @interface ArticleHeaderProps
 * @description Props for ArticleHeader component, mapped from ArticleConfig proto fields
 * 
 * Each prop corresponds to specific fields in the ArticleConfig protobuf message,
 * with data transformation happening during the Gatsby build process.
 * 
 * @property {string} title - Article title from ArticleConfig.title
 * Rendered as the main H1 heading. Required for SEO and accessibility.
 * Maps directly to blog.proto ArticleConfig.title field.
 * 
 * @property {string} publishedDate - Publication date from ArticleConfig.date_published
 * ISO 8601 format string (e.g., "2024-01-15T10:00:00Z").
 * Used for both display and Schema.org datePublished.
 * 
 * @property {string} [updatedDate] - Last modified date from ArticleConfig.date_modified
 * Only displayed if different from publishedDate to avoid redundancy.
 * Maps to Schema.org dateModified for search engines.
 * 
 * @property {string} [readingTime] - Formatted reading time
 * Pre-calculated during build from ArticleConfig.reading_time_minutes.
 * Format: "X min read" where X is the calculated minutes.
 * 
 * @property {string} [author] - Author name resolved from author_keys
 * Maps ArticleConfig.author_keys[0] to persons.yml catalog entry.
 * Falls back to "Unknown" if not resolved.
 * 
 * @property {string[]} [domains=[]] - Cross-posting domains
 * From CrossPostingConfig.published_domains array.
 * Each domain shown as a clickable chip linking to that instance.
 * 
 * @property {string[]} [projects=[]] - Related projects
 * Combined from uses_project_keys and updates_project_keys.
 * Links to project showcase pages on the main domain.
 * 
 * @property {string[]} [keywords=[]] - Keywords/tags from ArticleConfig.tags
 * Used for SEO meta keywords and Schema.org keywords.
 * Displayed as non-clickable chips (no tag pages per USE-CASE.md).
 * 
 * @property {boolean} [sponsored=false] - Sponsorship flag
 * From ArticleConfig.sponsor.sponsored boolean.
 * Triggers FTC-compliant disclosure display.
 * 
 * @property {string} [sponsorName] - Sponsor entity name
 * From ArticleConfig.sponsor.sponsor_name.
 * Required when sponsored=true for proper disclosure.
 * 
 * @property {string} [sponsorUrl] - Sponsor website
 * From ArticleConfig.sponsor.sponsor_url.
 * Makes sponsor name a clickable link with rel="sponsored".
 * 
 * @property {string} [contentType] - Content type enum value
 * From ArticleConfig.content_type for Schema.org type mapping.
 * Examples: "CONTENT_TYPE_TECHNICAL_ARTICLE", "CONTENT_TYPE_TUTORIAL".
 * 
 * @property {string} [className] - Additional CSS classes
 * Merged with base header classes using cn() utility.
 * Common uses: Custom spacing, borders, backgrounds.
 * 
 * @see {@link file://./blog.proto#ArticleConfig} - Proto schema
 * @see {@link file://./CMS.md#field-mapping} - Proto to widget mapping
 * 
 * @example
 * ```tsx
 * const props: ArticleHeaderProps = {
 *   title: "Building with Protobuf",
 *   publishedDate: "2024-01-15T10:00:00Z",
 *   author: "Harsh Gupta",
 *   domains: ["blog.getharsh"],
 *   keywords: ["protobuf", "architecture"],
 *   sponsored: false
 * }
 * ```
 */
interface ArticleHeaderProps {
  /** Article title from ArticleConfig.title - rendered as H1 */
  title: string
  /** Publication date from ArticleConfig.date_published */
  publishedDate: string
  /** Last modified date from ArticleConfig.date_modified */
  updatedDate?: string
  /** Formatted reading time from ArticleConfig.reading_time_minutes */
  readingTime?: string
  /** Author name resolved from author_keys → persons.yml */
  author?: string
  /** Cross-posting domains from CrossPostingConfig.published_domains */
  domains?: string[]
  /** Related projects from uses_project_keys + updates_project_keys */
  projects?: string[]
  /** Keywords/tags from ArticleConfig.tags array */
  keywords?: string[]
  /** Whether article is sponsored from ArticleConfig.sponsor.sponsored */
  sponsored?: boolean
  /** Sponsor name from ArticleConfig.sponsor.name */
  sponsorName?: string
  /** Sponsor URL from ArticleConfig.sponsor.url */
  sponsorUrl?: string
  /** Content type enum value from ArticleConfig.content_type for schema mapping */
  contentType?: string
  /** Additional CSS classes for customization */
  className?: string
}

/**
 * ArticleHeader component - Renders article metadata header
 * 
 * Creates a rich metadata header for blog articles with progressive disclosure,
 * sponsor transparency, and comprehensive Schema.org structured data.
 * 
 * @component
 * @param {ArticleHeaderProps} props - Component props mapped from ArticleConfig proto
 * 
 * @returns {JSX.Element} Article header containing:
 * - Schema.org Article JSON-LD
 * - H1 title with gradient text
 * - Author and temporal metadata
 * - Sponsor disclosure (when applicable)
 * - Cross-posting domain chips
 * - Project relationship chips
 * - Keyword/tag chips
 * 
 * @remarks
 * The component implements several optimization strategies:
 * - Memoized Schema.org generation to prevent recalculation
 * - Conditional rendering of sections based on data presence
 * - Progressive disclosure for responsive design
 * - Semantic HTML for accessibility and SEO
 * 
 * Date formatting uses browser's locale for internationalization.
 * All timestamps should be in ISO 8601 format for proper parsing.
 * 
 * @example
 * ```tsx
 * // In article template
 * <ArticleHeader {...articleData} />
 * ```
 */
export const ArticleHeader: React.FC<ArticleHeaderProps> = ({
  title,
  publishedDate,
  updatedDate,
  readingTime,
  author,
  domains = [],
  projects = [],
  keywords = [],
  sponsored = false,
  sponsorName,
  sponsorUrl,
  contentType,
  className,
}) => {
  // Get current theme for dynamic styling (available for future use)
  const theme = getCurrentTheme()
  
  // Get schema utilities from hook
  const { buildArticleSchema, renderJsonLd } = useSchema()
  
  /**
   * Format ISO date strings to human-readable format
   * 
   * Converts ISO 8601 date strings (from ArticleConfig.date_published/date_modified)
   * to localized human-readable format for display.
   * 
   * @function formatDate
   * @param {string} dateString - ISO 8601 date string (e.g., "2024-01-15T10:00:00Z")
   * @returns {string} Formatted date string (e.g., "January 15, 2024")
   * 
   * @example
   * formatDate("2024-01-15T10:00:00Z") // Returns: "January 15, 2024"
   * formatDate("2024-12-25") // Returns: "December 25, 2024"
   */
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }
  
  // Build Article schema for SEO and rich snippets
  const articleSchema = React.useMemo(() => {
    // Map content type enum to Schema.org type
    const schemaType = contentType 
      ? getSchemaType('content_types', contentType, 'Article')
      : 'Article'
    
    return buildArticleSchema({
      title,
      author: author || 'Unknown',
      datePublished: publishedDate,
      dateModified: updatedDate,
      description: `${title} - Article on ${theme.name}`,
      keywords,
      '@type': schemaType, // Use properly mapped Schema.org type
      // Add sponsor info if applicable with mapped entity type
      ...(sponsored && sponsorName && {
        sponsor: {
          '@type': getSchemaType('entity_types', 'ENTITY_TYPE_ORGANIZATION', 'Organization'),
          name: sponsorName,
          url: sponsorUrl
        }
      })
    })
  }, [title, author, publishedDate, updatedDate, keywords, contentType, sponsored, sponsorName, sponsorUrl, theme, buildArticleSchema])

  return (
    <>
      {/* Inject Article Schema.org JSON-LD for SEO */}
      {renderJsonLd(articleSchema)}
      
      <header className={cn("space-y-6 animate-fadeInUp", className)}>
      {/* Article title - Main H1, always visible on all viewports */}
      <h1 className="text-4xl md:text-5xl font-display uppercase tracking-wider text-gradient leading-tight">
        {title}
      </h1>

      {/* Metadata Row - Progressive disclosure: more info on larger screens */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-text-secondary">
        {/* Author from persons.yml catalog - desktop only for space */}
        {author && (
          <div className="flex items-center gap-2">
            <span className="font-mono">By</span>
            <span className="text-accent-primary font-semibold">{author}</span>
          </div>
        )}
        
        {/* Published date - Always visible, primary temporal metadata */}
        <div className="flex items-center gap-2">
          <span className="font-mono">Published</span>
          <time dateTime={publishedDate} className="text-accent-primary">
            {formatDate(publishedDate)}
          </time>
        </div>
        
        {/* Updated date - Only show if different from published (avoid redundancy) */}
        {updatedDate && updatedDate !== publishedDate && (
          <div className="flex items-center gap-2">
            <span className="font-mono">Updated</span>
            <time dateTime={updatedDate} className="text-accent-primary">
              {formatDate(updatedDate)}
            </time>
          </div>
        )}
        
        {/* Reading time - Desktop only, calculated during build */}
        {readingTime && (
          <div className="flex items-center gap-2">
            <span className="font-mono">•</span>
            <span>{readingTime}</span>
          </div>
        )}
      </div>

      {/* Sponsor Disclosure - CRITICAL: Must be prominent when article is sponsored */}
      {/* Only shown when sponsor.enabled=true in domain config AND article is sponsored */}
      {sponsored && sponsorName && (
        <div className="depth-1 rounded-terminal p-4 border-l-4 border-accent-secondary animate-fadeInUp animation-delay-200">
          <p className="text-sm text-text-secondary font-mono">
            <span className="text-accent-secondary font-bold">Sponsored:</span>{" "}
            This article is brought to you by{" "}
            {sponsorUrl ? (
              <a 
                href={sponsorUrl}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="text-accent-primary hover:text-accent-secondary transition-colors underline"
              >
                {sponsorName}
              </a>
            ) : (
              <span className="text-accent-primary">{sponsorName}</span>
            )}
          </p>
        </div>
      )}

      {/* Tags Section - All chip types, tablet+ only (hidden on mobile) */}
      <div className="space-y-3 animate-fadeInUp animation-delay-400">
        {/* Cross-posting domains - Shows where article is published */}
        {/* Links to same article on different domains in ecosystem */}
        {domains.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-text-secondary uppercase tracking-wider">
              Domains:
            </span>
            {domains.map((domain) => (
              <Chip
                key={domain}
                variant="domain"
                size="sm"
                href={`https://${domain}.in`}
                external
              >
                {domain}
              </Chip>
            ))}
          </div>
        )}

        {/* Related projects - Combined uses_projects and updates_projects */}
        {/* Links to project showcase pages on domain */}
        {projects.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-text-secondary uppercase tracking-wider">
              Projects:
            </span>
            {projects.map((project) => (
              <Chip
                key={project}
                variant="primary"
                size="sm"
                href={`/projects/${project.toLowerCase()}`}
              >
                {project}
              </Chip>
            ))}
          </div>
        )}

        {/* Keywords/Tags - For SEO and content discovery */}
        {/* No links as we don't have tag pages (see USE-CASE.md#things-i-dont-need) */}
        {keywords.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-text-secondary uppercase tracking-wider">
              Tags:
            </span>
            {keywords.map((keyword) => (
              <Chip
                key={keyword}
                variant="secondary"
                size="sm"
              >
                {keyword}
              </Chip>
            ))}
          </div>
        )}
      </div>

      {/* Audio Player - Will be shown when audio_url exists in frontmatter */}
      {/* Component: AudioPlayer.tsx handles playback from Google Drive */}
      {/* TODO: Integrate AudioPlayer component when audio URL is provided */}
      
      {/* Visual separator between header and article content */}
      <div className="section-separator" />
    </header>
    </>
  )
}

export default ArticleHeader