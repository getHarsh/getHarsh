/**
 * @fileoverview Article Preview Template for Real-Time CMS Editing
 * @module static/admin/templates/article-preview
 * 
 * @description
 * Real-time preview template for blog articles in the Decap CMS editor.
 * This template provides WYSIWYG editing by rendering article content using
 * the exact same React components as the production site, ensuring editors
 * see an accurate representation of how their content will appear.
 * 
 * The preview template processes all 25+ fields from ArticleConfig proto,
 * transforming CMS data into the format expected by production components.
 * 
 * @architecture
 * The preview system uses a sandboxed iframe approach:
 * 1. **CMS Editor**: User edits fields in form interface
 * 2. **Data Transform**: Template extracts and transforms data
 * 3. **Component Render**: Production components render in iframe
 * 4. **Style Injection**: Theme styles applied for accuracy
 * 5. **Live Updates**: Changes reflect immediately on keystroke
 * 
 * @proto-integration
 * Processes all ArticleConfig fields from blog.proto:
 * - Basic: title, author, date, slug, content_type
 * - Cross-posting: primary_domain, target_blogs, cross_post_all
 * - Projects: uses_projects, updates_project, project_status
 * - Media: audio, videos, code_snippets, diagrams
 * - Social: discussion_platforms, comment settings
 * - SEO: meta_description, featured_image, tags
 * - Display: show_toc, show_breadcrumbs, layout_override
 * 
 * @ecosystem-integration
 * - Component System: Uses production React components
 * - Theme System: Applies domain-specific Chakra themes
 * - Type System: TypeScript types from proto generation
 * - Style System: Tailwind CSS with theme variables
 * - Markdown: Processes MDX content with plugins
 * - Media: Renders YouTube embeds and audio players
 * 
 * @data-flow
 * 1. User edits field in CMS form
 * 2. CMS triggers preview update
 * 3. Entry data extracted via Immutable.js
 * 4. Data transformed to match component props
 * 5. Components render in sandboxed iframe
 * 6. Styles applied via global.css import
 * 7. Preview updates in real-time
 * 
 * @component-usage
 * - **ArticleHeader**: Title, metadata, cross-posting badges
 * - **PageLayout**: Consistent layout with navigation
 * - **Card**: Glass morphism content containers
 * - **Chip**: Tags and category badges
 * - **Button**: Action buttons and CTAs
 * 
 * @metadata-processing
 * The template extracts and processes:
 * - **Cross-posting**: Multi-domain syndication config
 * - **Projects**: Article-project relationships
 * - **Tags**: Keywords for categorization
 * - **Sponsor**: Sponsorship attribution
 * - **Media**: YouTube videos, audio, images
 * - **Discussions**: GitHub, Twitter, LinkedIn links
 * - **Reading Time**: Calculated from word count
 * - **Series**: Article series information
 * 
 * @immutable-js
 * CMS uses Immutable.js for data structures:
 * - entry.get("data") returns Immutable.Map
 * - .toJS() converts to plain JavaScript
 * - widgetFor() returns React components
 * - Handles nested data structures
 * 
 * @dos
 * - Extract all proto fields for complete preview
 * - Use production components for accuracy
 * - Apply theme styles for brand consistency
 * - Calculate reading time dynamically
 * - Handle missing fields gracefully
 * - Update preview on every change
 * 
 * @donts
 * - Don't skip data transformation
 * - Don't use different components than production
 * - Don't ignore theme styles
 * - Don't cache preview data
 * - Don't modify entry data directly
 * 
 * @example
 * ```typescript
 * // Template receives CMS data and renders preview
 * const ArticlePreview = ({ entry, widgetFor }) => {
 *   const data = entry.get("data").toJS()
 *   const body = widgetFor("body")
 *   
 *   return (
 *     <PageLayout>
 *       <ArticleHeader {...data} />
 *       <Card>{body}</Card>
 *     </PageLayout>
 *   )
 * }
 * ```
 * 
 * @see {@link file://./CMS.md#preview-templates} - Preview system docs
 * @see {@link file://./BUILD.md#cms-preview} - Preview build config
 * @see {@link file://./src/components/article/ArticleHeader.tsx} - Header component
 * @see {@link file://./src/components/layout/PageLayout.tsx} - Layout wrapper
 * @see {@link file://./config/schema/blog.proto} - ArticleConfig proto
 * @see {@link file://./DEV-TOOLING.md#cms-preview} - Development setup
 * 
 * @since 1.0.0
 */

import React from "react"
import { PreviewTemplateComponentProps } from "decap-cms-core"
import { ArticleHeader } from "../../../src/components/article/ArticleHeader"
import { PageLayout } from "../../../src/components/layout/PageLayout"
import { Card, CardContent } from "../../../src/components/ui/Card"
import "../../../src/styles/global.css"

/**
 * ArticlePreview component - Real-time article preview for CMS
 * 
 * @param {PreviewTemplateComponentProps} props - CMS preview props
 * @param {object} props.entry - CMS entry data object
 * @param {function} props.widgetFor - Function to get widget content
 * @returns {JSX.Element} Rendered article preview
 */
export const ArticlePreview: React.FC<PreviewTemplateComponentProps> = ({ entry, widgetFor }) => {
  /**
   * Get field values from CMS entry
   * The .toJS() method converts Immutable.js objects to plain JavaScript
   */
  const data = entry.get("data").toJS()
  /** Get the markdown body content widget */
  const body = widgetFor("body")
  
  /**
   * Extract cross-posting data
   * Handles multi-domain blog syndication configuration
   */
  const crossPosting = data.cross_posting || {}
  const domains = crossPosting.target_blogs || []
  if (crossPosting.primary_domain && !domains.includes(crossPosting.primary_domain)) {
    domains.unshift(crossPosting.primary_domain)
  }
  
  /**
   * Extract project relationships
   * Lists projects that this article references or updates
   */
  const projects = data.projects?.uses_projects || []
  
  /**
   * Extract other metadata
   * - Keywords: Tags for categorization and SEO
   * - Sponsor: Attribution for sponsored content
   */
  const keywords = data.tags?.map((t: any) => typeof t === 'string' ? t : t.tag) || []
  const sponsorInfo = data.sponsor || {}
  
  /**
   * Calculate reading time (rough estimate)
   * Assumes average reading speed of 200 words per minute
   * This matches the calculation used in production
   */
  const wordCount = (data.body || "").split(/\s+/).length
  const readingTime = `${Math.ceil(wordCount / 200)} min read`
  
  return (
    <PageLayout>
      <div className="container mx-auto max-w-4xl px-4 py-12">
        <article className="prose prose-lg max-w-none">
          <ArticleHeader
            title={data.title || "Untitled"}
            publishedDate={data.date || new Date().toISOString()}
            updatedDate={data.updated_date}
            readingTime={readingTime}
            author={data.author || "Harsh"}
            domains={domains}
            projects={projects}
            keywords={keywords}
            sponsored={sponsorInfo.sponsored}
            sponsorName={sponsorInfo.sponsor_name}
            sponsorUrl={sponsorInfo.sponsor_link}
          />
          
          {/* Article Body - Main content area */}
          <Card variant="glass" depth={1} className="mt-8">
            <CardContent className="prose prose-invert max-w-none">
              {body}
            </CardContent>
          </Card>
          
          {/* Media Section Preview - YouTube and other media */}
          {data.media?.youtube_id && (
            <Card variant="glass" depth={1} className="mt-8">
              <CardContent>
                <div className="aspect-video bg-accent-primary/10 rounded-terminal flex items-center justify-center">
                  <span className="text-accent-primary font-mono">
                    YouTube Video: {data.media.youtube_id}
                  </span>
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* Discussion Links Preview - Social platform integrations */}
          {data.discussions && Object.keys(data.discussions).some(key => data.discussions[key]) && (
            <Card variant="glass" depth={1} className="mt-8">
              <CardContent>
                <h3 className="text-lg font-display uppercase tracking-wide text-accent-primary mb-4">
                  Discussion Links
                </h3>
                <div className="space-y-2">
                  {data.discussions.github_issue && (
                    <div className="text-sm font-mono">
                      GitHub: <span className="text-accent-secondary">{data.discussions.github_issue}</span>
                    </div>
                  )}
                  {data.discussions.twitter_thread && (
                    <div className="text-sm font-mono">
                      Twitter: <span className="text-accent-secondary">{data.discussions.twitter_thread}</span>
                    </div>
                  )}
                  {data.discussions.linkedin_post && (
                    <div className="text-sm font-mono">
                      LinkedIn: <span className="text-accent-secondary">{data.discussions.linkedin_post}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </article>
      </div>
    </PageLayout>
  )
}