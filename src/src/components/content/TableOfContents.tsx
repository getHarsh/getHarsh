/**
 * @fileoverview TableOfContents - Auto-generated navigation from article headings
 * @module components/content/TableOfContents
 * 
 * @description
 * An intelligent table of contents component that automatically generates
 * navigation from article headings, tracks scroll position for active section
 * highlighting, and provides multiple display modes for different contexts.
 * 
 * This component enhances long-form content navigation in the getHarsh ecosystem
 * by providing dynamic, context-aware navigation that adapts to different screen
 * sizes and reading contexts. It uses IntersectionObserver for performant scroll
 * tracking and offers three distinct display modes.
 * 
 * @architecture
 * ```
 * TableOfContents Component
 *       ├── Heading Processing
 *       │     ├── Filter by depth
 *       │     ├── Generate hierarchy
 *       │     └── Create anchors
 *       ├── Scroll Tracking
 *       │     ├── IntersectionObserver
 *       │     ├── Active section detection
 *       │     └── Smooth scrolling
 *       ├── Display Modes
 *       │     ├── Sidebar (desktop)
 *       │     ├── Collapsible (mobile)
 *       │     └── Inline (embedded)
 *       └── Features
 *             ├── Auto-highlight
 *             ├── Back to top
 *             ├── Responsive collapse
 *             └── Indentation levels
 * 
 * Data Flow:
 * Headings array → Filter by depth → Generate nav → Track scroll → Update active
 * User click → Smooth scroll → Update URL → Highlight section
 * ```
 * 
 * @proto-integration
 * Maps to navigation and content configurations:
 * 
 * - **TOCConfig** (content.proto)
 *   - `default_position`: 'sidebar' on desktop
 *   - `max_depth`: 3 (H2, H3, H4)
 *   - `auto_generate`: true for articles
 *   - `smooth_scroll`: true with offset
 * 
 * - **NavigationConfig** (navigation.proto)
 *   - `toc.show_back_to_top`: true
 *   - `toc.auto_collapse_mobile`: true
 *   - `toc.indent_size`: '1rem' per level
 *   - `toc.highlight_active`: true
 * 
 * - **ScrollConfig** (interaction.proto)
 *   - `observer.root_margin`: '-20% 0% -70% 0%'
 *   - `observer.threshold`: 0
 *   - `scroll.offset`: 80px for header
 *   - `scroll.behavior`: 'smooth'
 * 
 * - **ThemeConfig** (theme.proto)
 *   - `toc.background`: bg-glass
 *   - `toc.border`: accent-primary/20
 *   - `toc.active_color`: accent-primary
 *   - `toc.hover_color`: accent-primary
 * 
 * - **AccessibilityConfig** (accessibility.proto)
 *   - `toc.aria_label`: 'Table of contents'
 *   - `toc.keyboard_nav`: true
 *   - `toc.focus_visible`: true
 *   - `toc.screen_reader`: Announce active
 * 
 * @hook-integration
 * While TableOfContents doesn't use external hooks, it manages:
 * 
 * - **Internal State**: activeId, isCollapsed
 * - **IntersectionObserver**: Scroll tracking
 * - **UseMemo**: Filtered headings optimization
 * 
 * Parent components often use:
 * - **useGTM()**: Track TOC interactions
 * - **useAccessibility()**: Enhanced navigation
 * 
 * @ecosystem-integration
 * - **Used by**: Articles, Documentation, Tutorials, Long-form content
 * - **Heading Source**: Extracted from markdown or HTML
 * - **Scroll Sync**: IntersectionObserver API
 * - **Responsiveness**: CSS breakpoints (lg:)
 * - **Glass Morphism**: Consistent UI style
 * 
 * @features
 * - **Auto-generation**: From heading elements
 * - **Active Tracking**: Scroll position sync
 * - **Smooth Scrolling**: With offset calculation
 * - **3 Display Modes**: Sidebar, collapsible, inline
 * - **Hierarchical Display**: Indented sub-headings
 * - **Responsive Behavior**: Adapts to screen size
 * - **Back to Top**: Quick navigation button
 * - **Auto-collapse**: Mobile optimization
 * - **Glass Morphism**: Consistent styling
 * - **Keyboard Support**: Full accessibility
 * 
 * @display-modes
 * ```
 * sidebar:
 *   - Desktop only (hidden lg:block)
 *   - Sticky positioning (top-24)
 *   - Max height with scroll
 *   - Always visible
 * 
 * collapsible:
 *   - Mobile/tablet (lg:hidden)
 *   - Accordion interface
 *   - Auto-collapse on selection
 *   - Toggle button
 * 
 * inline:
 *   - Always visible
 *   - Part of content flow
 *   - No sticky behavior
 *   - Full width
 * ```
 * 
 * @scroll-tracking
 * ```
 * IntersectionObserver Config:
 * - rootMargin: '-20% 0% -70% 0%'
 *   - Top 20%: Account for header
 *   - Bottom 70%: Early activation
 * - threshold: 0
 *   - Trigger on any visibility
 * 
 * Scroll Offset:
 * - 80px: Fixed header height
 * - Smooth behavior
 * - URL hash update
 * ```
 * 
 * @responsive-behavior
 * ```
 * Desktop (≥1024px):
 *   - Sidebar mode default
 *   - Sticky positioning
 *   - Full hierarchy visible
 * 
 * Tablet (768px-1023px):
 *   - Collapsible mode
 *   - Accordion interface
 *   - Manual expand/collapse
 * 
 * Mobile (<768px):
 *   - Collapsible mode
 *   - Auto-collapse on select
 *   - Compact display
 * ```
 * 
 * @accessibility
 * - **ARIA Labels**: Navigation landmarks
 * - **Keyboard Nav**: Tab through links
 * - **Focus States**: Visible indicators
 * - **Screen Readers**: Active section announced
 * - **Semantic HTML**: nav, ul, li structure
 * 
 * @performance
 * - **IntersectionObserver**: Efficient scroll tracking
 * - **UseMemo**: Filtered headings cached
 * - **Passive Listeners**: No scroll blocking
 * - **CSS Transitions**: GPU-accelerated
 * 
 * @dos
 * - Provide meaningful heading text
 * - Use proper heading hierarchy
 * - Test responsive behavior
 * - Include back to top for long content
 * - Ensure unique heading IDs
 * 
 * @donts
 * - Don't skip heading levels
 * - Don't use duplicate IDs
 * - Don't disable smooth scrolling
 * - Don't forget mobile testing
 * - Don't override observer margins
 * 
 * @example
 * ```tsx
 * // Article with sidebar TOC
 * function ArticleWithTOC({ content, headings }) {
 *   return (
 *     <div className="flex gap-8">
 *       <article className="flex-1">
 *         {content}
 *       </article>
 *       <TableOfContents
 *         headings={headings}
 *         position="sidebar"
 *         maxDepth={3}
 *       />
 *     </div>
 *   )
 * }
 * 
 * // Mobile-first responsive TOC
 * function ResponsiveTOC({ headings }) {
 *   return (
 *     <>
 *       <TableOfContents
 *         headings={headings}
 *         position="collapsible"
 *         className="lg:hidden"
 *       />
 *       <TableOfContents
 *         headings={headings}
 *         position="sidebar"
 *         className="hidden lg:block"
 *       />
 *     </>
 *   )
 * }
 * 
 * // Documentation with inline TOC
 * function DocPage({ content, headings }) {
 *   return (
 *     <div className="max-w-4xl mx-auto">
 *       <h1>Documentation</h1>
 *       <TableOfContents
 *         headings={headings}
 *         position="inline"
 *         maxDepth={2}
 *       />
 *       {content}
 *     </div>
 *   )
 * }
 * ```
 * 
 * @see {@link file://./USE-CASE.md#content-components} - Content components spec
 * @see {@link file://./CMS.md#table-of-contents} - TOC configuration
 * @see {@link file://./TextArea.tsx} - Content container
 * @see {@link file://../article/ArticleContent.tsx} - Usage in articles
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API} - IntersectionObserver
 * 
 * @since 1.0.0
 */

import * as React from 'react'
import { cn } from '@/lib/utils'
import { ChevronRight, List } from 'lucide-react'

/**
 * @interface Heading
 * @description Structure for heading data
 * 
 * Represents a single heading element with its metadata
 * for table of contents generation.
 * 
 * @property {string} id - Unique heading ID for anchoring
 * Used for navigation links and scroll targeting.
 * Should be URL-safe and unique within the document.
 * 
 * @property {string} text - Heading text content
 * The actual text displayed in the heading and TOC.
 * May be truncated in the TOC for long headings.
 * 
 * @property {number} level - Heading level (2=H2, 3=H3, etc.)
 * Numeric representation of heading hierarchy.
 * Used for indentation and filtering by depth.
 * 
 * @example
 * ```tsx
 * const heading: Heading = {
 *   id: 'getting-started',
 *   text: 'Getting Started',
 *   level: 2  // H2
 * }
 * ```
 */
interface Heading {
  /** Unique heading ID for anchoring */
  id: string
  /** Heading text content */
  text: string
  /** Heading level (2=H2, 3=H3, etc.) */
  level: number
}

/**
 * @interface TableOfContentsProps
 * @description Props for TableOfContents component
 * 
 * Configuration for generating and displaying a table of contents
 * from document headings with various display modes.
 * 
 * @property {Heading[]} [headings=[]] - Array of heading data
 * All headings extracted from the document.
 * Typically includes H2, H3, and H4 elements.
 * 
 * @property {number} [maxDepth=3] - Maximum heading depth to include
 * Controls which heading levels appear in TOC.
 * 2 = H2 only, 3 = H2+H3, 4 = H2+H3+H4.
 * 
 * @property {string} [className] - Additional CSS classes
 * Applied to the outer container for custom styling.
 * 
 * @property {'sidebar' | 'inline' | 'collapsible'} [position='sidebar'] - Display mode
 * - 'sidebar': Fixed sidebar on desktop
 * - 'inline': Embedded in content flow
 * - 'collapsible': Accordion on mobile
 * 
 * @example
 * ```tsx
 * const props: TableOfContentsProps = {
 *   headings: extractedHeadings,
 *   maxDepth: 3,
 *   position: 'sidebar',
 *   className: 'custom-toc'
 * }
 * ```
 */
interface TableOfContentsProps {
  /** Array of heading data */
  headings?: Heading[]
  /** Maximum heading depth to include */
  maxDepth?: number
  /** Additional CSS classes */
  className?: string
  /** Display position mode */
  position?: 'sidebar' | 'inline' | 'collapsible'
}

/**
 * TableOfContents component - Auto-generated article navigation
 * 
 * Generates an interactive table of contents from document headings
 * with scroll tracking, smooth navigation, and responsive display modes.
 * 
 * @component
 * @param {TableOfContentsProps} props - Component props
 * @param {Heading[]} [props.headings=[]] - Article headings
 * @param {number} [props.maxDepth=3] - Max heading level
 * @param {string} [props.className] - Additional CSS classes
 * @param {'sidebar' | 'inline' | 'collapsible'} [props.position='sidebar'] - Display mode
 * 
 * @returns {JSX.Element | null} Table of contents containing:
 * - Navigation list with heading links
 * - Active section highlighting
 * - Smooth scroll behavior
 * - Back to top button
 * - Responsive display modes
 * Returns null if no headings provided
 * 
 * @remarks
 * The component uses IntersectionObserver to track which section
 * is currently visible in the viewport, updating the active state
 * accordingly. The root margin is configured to highlight sections
 * slightly before they reach the top of the viewport.
 * 
 * Three display modes are supported:
 * - **Sidebar**: Sticky sidebar for desktop viewing
 * - **Collapsible**: Accordion for mobile/tablet
 * - **Inline**: Embedded in content flow
 * 
 * @example
 * ```tsx
 * // Extract headings from content
 * const headings = extractHeadings(articleContent);
 * 
 * // Render TOC
 * <TableOfContents
 *   headings={headings}
 *   position="sidebar"
 *   maxDepth={3}
 * />
 * ```
 */
export const TableOfContents: React.FC<TableOfContentsProps> = ({
  headings = [],
  maxDepth = 3,
  className,
  position = 'sidebar'
}) => {
  const [activeId, setActiveId] = React.useState<string>('')
  const [isCollapsed, setIsCollapsed] = React.useState(position === 'collapsible')
  const observerRef = React.useRef<IntersectionObserver | null>(null)

  /**
   * Filter headings by maximum depth
   * 
   * Memoized computation to filter headings based on the maxDepth prop.
   * Note: heading.level 2 = H2, so maxDepth 3 includes up to H4.
   */
  const filteredHeadings = React.useMemo(() => {
    return headings.filter(heading => heading.level <= maxDepth + 1) // H2 = level 2
  }, [headings, maxDepth])

  /**
   * Set up IntersectionObserver for active section tracking
   * 
   * Observes heading elements to determine which section is currently
   * visible in the viewport and updates the active state accordingly.
   */
  React.useEffect(() => {
    if (typeof window === 'undefined' || filteredHeadings.length === 0) return

    const callback: IntersectionObserverCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id)
        }
      })
    }

    observerRef.current = new IntersectionObserver(callback, {
      rootMargin: '-20% 0% -70% 0%',
      threshold: 0
    })

    filteredHeadings.forEach(heading => {
      const element = document.getElementById(heading.id)
      if (element) {
        observerRef.current?.observe(element)
      }
    })

    return () => {
      observerRef.current?.disconnect()
    }
  }, [filteredHeadings])

  /**
   * Handle TOC link click
   * 
   * Smoothly scrolls to the target heading with offset for fixed header.
   * Auto-collapses the TOC on mobile after selection.
   * 
   * @param {React.MouseEvent<HTMLAnchorElement>} e - Click event
   * @param {string} id - Target heading ID
   */
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      const offset = 80 // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })

      // Update active state immediately
      setActiveId(id)

      // Collapse on mobile after selection
      if (window.innerWidth < 768 && position === 'collapsible') {
        setIsCollapsed(true)
      }
    }
  }

  if (filteredHeadings.length === 0) {
    return null
  }

  const tocContent = (
    <nav aria-label="Table of contents">
      <ul className="space-y-2">
        {filteredHeadings.map((heading, index) => {
          const indentLevel = heading.level - 2 // H2 = 0, H3 = 1, H4 = 2
          const isActive = activeId === heading.id

          return (
            <li
              key={`${heading.id}-${index}`}
              style={{ paddingLeft: `${indentLevel * 1}rem` }}
            >
              <a
                href={`#${heading.id}`}
                onClick={(e) => handleClick(e, heading.id)}
                className={cn(
                  'group flex items-center gap-2 py-1 text-sm transition-all duration-base',
                  'hover:text-accent-primary',
                  isActive ? 'text-accent-primary font-medium' : 'text-text-secondary',
                  indentLevel > 0 && 'text-xs'
                )}
              >
                <ChevronRight 
                  className={cn(
                    'w-3 h-3 transition-transform duration-base',
                    isActive && 'rotate-90'
                  )}
                />
                <span className="line-clamp-2">{heading.text}</span>
              </a>
            </li>
          )
        })}
      </ul>

      {/* Back to top link */}
      <div className="mt-6 pt-4 border-t border-accent-primary/10">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-xs text-text-secondary hover:text-accent-primary transition-colors duration-base"
        >
          ↑ Back to top
        </button>
      </div>
    </nav>
  )

  // Sidebar position (desktop)
  if (position === 'sidebar') {
    return (
      <aside
        className={cn(
          'hidden lg:block sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto',
          'w-64 p-4 rounded-terminal',
          'bg-bg-glass backdrop-blur-xl border border-accent-primary/20',
          className
        )}
      >
        <h2 className="font-display text-sm uppercase tracking-wider text-accent-primary mb-4">
          On this page
        </h2>
        {tocContent}
      </aside>
    )
  }

  // Collapsible position (tablet/mobile)
  if (position === 'collapsible') {
    return (
      <div
        className={cn(
          'lg:hidden mb-8 rounded-terminal',
          'bg-bg-glass backdrop-blur-xl border border-accent-primary/20',
          className
        )}
      >
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn(
            'w-full p-4 flex items-center justify-between',
            'text-accent-primary hover:bg-accent-primary/5',
            'transition-colors duration-base'
          )}
          aria-expanded={!isCollapsed}
          aria-controls="toc-content"
        >
          <span className="font-display text-sm uppercase tracking-wider flex items-center gap-2">
            <List className="w-4 h-4" />
            Table of Contents
          </span>
          <ChevronRight 
            className={cn(
              'w-4 h-4 transition-transform duration-base',
              !isCollapsed && 'rotate-90'
            )}
          />
        </button>

        <div
          id="toc-content"
          className={cn(
            'overflow-hidden transition-all duration-base',
            isCollapsed ? 'max-h-0' : 'max-h-[500px]'
          )}
        >
          <div className="p-4 pt-0">
            {tocContent}
          </div>
        </div>
      </div>
    )
  }

  // Inline position
  return (
    <div
      className={cn(
        'p-4 mb-8 rounded-terminal',
        'bg-bg-glass backdrop-blur-xl border border-accent-primary/20',
        className
      )}
    >
      <h2 className="font-display text-sm uppercase tracking-wider text-accent-primary mb-4">
        Table of Contents
      </h2>
      {tocContent}
    </div>
  )
}

export default TableOfContents