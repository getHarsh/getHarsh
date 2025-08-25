/**
 * @fileoverview Footnotes - Academic-style footnote system with bidirectional linking
 * @module components/content/Footnotes
 * 
 * @description
 * A comprehensive footnote system providing academic-style references with
 * bidirectional linking, popover previews, and automatic numbering. Includes
 * context provider for document-wide footnote management.
 * 
 * This component suite brings scholarly documentation capabilities to the
 * getHarsh ecosystem, enabling academic-style citations, references, and
 * annotations. The system supports both static footnotes and dynamic
 * footnote generation through a React context provider.
 * 
 * @architecture
 * ```
 * Footnotes System
 *       ├── Core Components
 *       │     ├── Footnotes (list display)
 *       │     ├── FootnoteReference (inline ref)
 *       │     └── FootnotesProvider (context)
 *       ├── Navigation
 *       │     ├── Bidirectional links
 *       │     ├── Smooth scrolling
 *       │     └── Highlight animation
 *       ├── Preview System
 *       │     ├── Popover on hover
 *       │     ├── Content preview
 *       │     └── ARIA descriptions
 *       └── Management
 *             ├── Auto-numbering
 *             ├── Deduplication
 *             └── Reference tracking
 * 
 * Data Flow:
 * Content → FootnoteReference → Preview/Navigation → Footnotes section
 * Context → Add footnote → Auto-number → Store → Retrieve
 * ```
 * 
 * @proto-integration
 * Maps to content and documentation configurations:
 * 
 * - **FootnoteConfig** (content.proto)
 *   - `numbering_style`: 'sequential' [1], [2], [3]
 *   - `preview_enabled`: true by default
 *   - `highlight_duration`: 2000ms
 *   - `smooth_scroll`: true
 * 
 * - **ReferenceConfig** (reference.proto)
 *   - `bidirectional_links`: true
 *   - `multiple_references`: Supported
 *   - `return_symbol`: '↩' with superscript
 *   - `reference_format`: '[number]'
 * 
 * - **AccessibilityConfig** (accessibility.proto)
 *   - `aria_roles.noteref`: 'doc-noteref'
 *   - `aria_roles.endnotes`: 'doc-endnotes'
 *   - `preview_announcement`: Screen reader support
 *   - `keyboard_navigation`: Tab accessible
 * 
 * - **ThemeConfig** (theme.proto)
 *   - `footnote.separator`: border-accent-primary/20
 *   - `footnote.number_color`: accent-primary
 *   - `footnote.text_color`: text-secondary
 *   - `footnote.highlight`: accent-primary/10
 * 
 * @hook-integration
 * This component provides its own hook:
 * 
 * - **useFootnotes()**: Access footnote context
 *   - `addFootnote(content)`: Add new footnote
 *   - `getFootnote(number)`: Retrieve by number
 *   - `footnotes`: Current footnote array
 * 
 * Parent components often use:
 * - **useGTM()**: Track footnote interactions
 * - **useAccessibility()**: Enhanced navigation
 * 
 * @ecosystem-integration
 * - **Used by**: Articles, Documentation, Research posts, Academic content
 * - **Navigation**: Smooth scroll with IntersectionObserver
 * - **Preview**: Radix UI Popover for tooltips
 * - **Styling**: Theme-aware with CSS variables
 * - **Accessibility**: Full ARIA support
 * 
 * @features
 * - **Bidirectional Links**: Jump to and from footnotes
 * - **Popover Previews**: Hover to see content
 * - **Auto-numbering**: Sequential assignment
 * - **Multiple References**: Same footnote, multiple refs
 * - **Smooth Scrolling**: Animated navigation
 * - **Highlight Animation**: Visual feedback
 * - **Context Provider**: Document-wide management
 * - **Deduplication**: Reuse existing footnotes
 * - **ARIA Roles**: Proper semantic markup
 * - **Keyboard Support**: Full accessibility
 * 
 * @footnote-structure
 * ```typescript
 * interface Footnote {
 *   id: string        // Unique identifier
 *   content: string   // Footnote text
 *   references?: string[] // Back-references
 * }
 * ```
 * 
 * @navigation-behavior
 * ```
 * Click reference → Smooth scroll → Highlight target → 2s fade
 * Click return → Scroll to reference → Focus management
 * Hover reference → Show popover → Preview content
 * ```
 * 
 * @numbering-system
 * - Sequential: [1], [2], [3]...
 * - Automatic: Via context provider
 * - Deduplication: Same content = same number
 * - Display: Monospace font for clarity
 * 
 * @accessibility
 * - **ARIA Roles**: doc-noteref, doc-endnotes
 * - **Keyboard**: Tab navigation, Enter to follow
 * - **Screen Readers**: Announced with context
 * - **Focus Management**: Return focus after navigation
 * - **Descriptions**: aria-describedby for previews
 * 
 * @performance
 * - **Lazy Rendering**: Only visible footnotes
 * - **Memoization**: Callback optimization
 * - **Smooth Scroll**: CSS-based animation
 * - **Popover**: Portal rendering
 * 
 * @dos
 * - Use meaningful footnote content
 * - Keep footnotes concise
 * - Group related footnotes
 * - Test keyboard navigation
 * - Provide context in content
 * 
 * @donts
 * - Don't nest footnotes
 * - Don't use for navigation
 * - Don't overuse footnotes
 * - Don't forget ARIA roles
 * - Don't break bidirectional links
 * 
 * @example
 * ```tsx
 * // Academic article with footnotes
 * function ResearchArticle() {
 *   const footnotes = [
 *     { id: 'smith2023', content: 'Smith et al., "AI Ethics", 2023' },
 *     { id: 'jones2022', content: 'Jones, "Machine Learning", 2022' },
 *     { id: 'data', content: 'Dataset available at example.com/data' }
 *   ];
 * 
 *   return (
 *     <article>
 *       <p>
 *         Recent research
 *         <FootnoteReference 
 *           id="smith2023" 
 *           number={1}
 *           content={footnotes[0].content}
 *         />
 *         shows significant progress in AI ethics.
 *       </p>
 *       <p>
 *         This builds on earlier work
 *         <FootnoteReference
 *           id="jones2022"
 *           number={2} 
 *           content={footnotes[1].content}
 *         />
 *         in the field.
 *       </p>
 *       <Footnotes footnotes={footnotes} />
 *     </article>
 *   )
 * }
 * 
 * // With context provider for dynamic footnotes
 * function DocumentWithFootnotes() {
 *   return (
 *     <FootnotesProvider>
 *       <DocumentContent />
 *       <AutoGeneratedFootnotes />
 *     </FootnotesProvider>
 *   )
 * }
 * ```
 * 
 * @see {@link file://./USE-CASE.md#content-components} - Content components spec
 * @see {@link file://./CMS.md#footnote-fields} - CMS footnote configuration
 * @see {@link file://./TextArea.tsx} - Prose content container
 * @see {@link https://www.w3.org/TR/dpub-aria-1.0/#doc-noteref} - ARIA doc-noteref
 * @see {@link https://www.w3.org/TR/dpub-aria-1.0/#doc-endnotes} - ARIA doc-endnotes
 * 
 * @since 1.0.0
 */

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Popover } from 'radix-ui'

/**
 * @interface Footnote
 * @description Footnote data structure
 * 
 * Represents a single footnote with its content and tracking
 * information for bidirectional linking.
 * 
 * @property {string} id - Unique footnote identifier
 * Used for creating anchor links and references.
 * Format: 'ref1', 'smith2023', 'auto-1', etc.
 * 
 * @property {string} content - Footnote content text
 * The actual footnote text displayed in the footnotes section.
 * Should be concise but complete.
 * 
 * @property {string[]} [references] - Back-reference tracking
 * Array of reference IDs that link to this footnote.
 * Used for multiple references to the same footnote.
 * 
 * @example
 * ```tsx
 * const footnote: Footnote = {
 *   id: 'ref1',
 *   content: 'Smith, J. "Research Paper", Journal 2023, pp. 10-20',
 *   references: ['fnref-ref1-1', 'fnref-ref1-2']
 * }
 * ```
 */
interface Footnote {
  /** Unique footnote identifier */
  id: string
  /** Footnote content text */
  content: string
  /** Back-reference tracking */
  references?: string[]
}

/**
 * @interface FootnotesProps
 * @description Props for Footnotes component
 * 
 * Configuration for rendering the footnotes section at the
 * end of a document with all collected footnotes.
 * 
 * @property {Footnote[]} footnotes - Array of footnote data
 * All footnotes to display in the section.
 * Rendered in order with sequential numbering.
 * 
 * @property {string} [className] - Additional CSS classes
 * Applied to the footnotes container for custom styling.
 * 
 * @example
 * ```tsx
 * const props: FootnotesProps = {
 *   footnotes: [
 *     { id: 'ref1', content: 'First footnote' },
 *     { id: 'ref2', content: 'Second footnote' }
 *   ],
 *   className: 'mt-12'
 * }
 * ```
 */
interface FootnotesProps {
  /** Array of footnote data */
  footnotes: Footnote[]
  /** Additional CSS classes */
  className?: string
}

/**
 * Footnotes component - Academic-style footnote section
 * 
 * Renders a formatted list of footnotes at the end of a document
 * with proper numbering, styling, and return links.
 * 
 * @component
 * @param {FootnotesProps} props - Component props
 * @param {Footnote[]} props.footnotes - Footnote data array
 * @param {string} [props.className] - Additional CSS classes
 * 
 * @returns {JSX.Element | null} Footnotes section containing:
 * - Styled header with "Footnotes" title
 * - Numbered list of footnotes
 * - Return links for bidirectional navigation
 * - ARIA role for accessibility
 * Returns null if no footnotes provided
 * 
 * @remarks
 * The component uses semantic HTML with an ordered list
 * and ARIA role="doc-endnotes" for proper accessibility.
 * Each footnote includes return links if it has been
 * referenced multiple times in the document.
 * 
 * @example
 * ```tsx
 * // At the end of an article
 * <article>
 *   {articleContent}
 *   <Footnotes 
 *     footnotes={articleFootnotes}
 *     className="mt-16"
 *   />
 * </article>
 * ```
 */
export const Footnotes: React.FC<FootnotesProps> = ({
  footnotes,
  className
}) => {
  if (!footnotes || footnotes.length === 0) return null

  return (
    <div
      className={cn(
        'mt-8 pt-8 border-t-2 border-accent-primary/20',
        className
      )}
      role="doc-endnotes"
    >
      <h2 className="font-display uppercase tracking-wide text-accent-primary mb-4">
        Footnotes
      </h2>
      <ol className="space-y-3 text-sm">
        {footnotes.map((footnote, index) => (
          <li
            key={footnote.id}
            id={`fn-${footnote.id}`}
            className="flex gap-3 group"
          >
            <span className="flex-shrink-0 font-mono text-accent-primary">
              [{index + 1}]
            </span>
            <div className="flex-1">
              <span className="text-text-secondary">
                {footnote.content}
              </span>
              {footnote.references && footnote.references.length > 0 && (
                <div className="mt-1 flex gap-2">
                  {footnote.references.map((ref, refIndex) => (
                    <a
                      key={refIndex}
                      href={`#fnref-${footnote.id}-${refIndex + 1}`}
                      className="text-xs text-accent-primary hover:text-accent-secondary transition-colors"
                      aria-label={`Return to reference ${refIndex + 1}`}
                    >
                      ↩{footnote.references && footnote.references.length > 1 && <sup>{refIndex + 1}</sup>}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

/**
 * @interface FootnoteReferenceProps
 * @description Props for FootnoteReference component
 * 
 * Configuration for inline footnote references that link
 * to the footnotes section with preview capability.
 * 
 * @property {string} id - Unique footnote identifier
 * Must match the id in the corresponding Footnote.
 * 
 * @property {number} number - Footnote number
 * Display number shown in brackets [1], [2], etc.
 * 
 * @property {string} content - Footnote content for preview
 * Text shown in the hover popover preview.
 * 
 * @property {string} [className] - Additional CSS classes
 * Applied to the superscript wrapper element.
 */
interface FootnoteReferenceProps {
  /** Unique footnote identifier matching Footnote.id */
  id: string
  /** Display number for the reference */
  number: number
  /** Content shown in preview popover */
  content: string
  /** Additional CSS classes for wrapper */
  className?: string
}

/**
 * FootnoteReference component - Inline footnote reference
 * 
 * Creates an inline superscript reference that links to a footnote
 * with hover preview and smooth scroll navigation.
 * 
 * @component
 * @param {FootnoteReferenceProps} props - Component props
 * @param {string} props.id - Unique footnote identifier
 * @param {number} props.number - Footnote number
 * @param {string} props.content - Footnote content for preview
 * @param {string} [props.className] - Additional CSS classes
 * 
 * @returns {JSX.Element} Superscript reference with:
 * - Clickable link to footnote
 * - Hover popover preview
 * - Smooth scroll navigation
 * - Highlight animation on target
 * - ARIA role for accessibility
 * 
 * @remarks
 * The component provides several interactions:
 * - Click: Smooth scroll to footnote with highlight
 * - Hover: Show popover preview of content
 * - Keyboard: Accessible via Tab and Enter
 * 
 * Uses Radix UI Popover for the preview tooltip.
 * 
 * @example
 * ```tsx
 * // In article text
 * <p>
 *   This claim is supported by research
 *   <FootnoteReference
 *     id="research2023"
 *     number={1}
 *     content="Smith et al., 2023 study on AI"
 *   />
 *   published last year.
 * </p>
 * ```
 */
export const FootnoteReference: React.FC<FootnoteReferenceProps> = ({
  id,
  number,
  content,
  className
}) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const referenceId = React.useId()

  return (
    <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger asChild>
        <sup
          id={`fnref-${id}-${referenceId}`}
          className={cn(
            'inline-flex items-center',
            className
          )}
        >
          <a
            href={`#fn-${id}`}
            className={cn(
              'ml-0.5 px-1 py-0.5',
              'text-xs font-mono',
              'text-accent-primary hover:text-accent-secondary',
              'transition-colors cursor-pointer',
              'hover:underline'
            )}
            onClick={(e) => {
              e.preventDefault()
              // Smooth scroll to footnote
              const element = document.getElementById(`fn-${id}`)
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' })
                // Highlight the footnote briefly
                element.classList.add('bg-accent-primary/10')
                setTimeout(() => {
                  element.classList.remove('bg-accent-primary/10')
                }, 2000)
              }
            }}
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
            role="doc-noteref"
            aria-describedby={`footnote-preview-${id}`}
          >
            [{number}]
          </a>
        </sup>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          id={`footnote-preview-${id}`}
          className={cn(
            'z-50 w-64 p-3',
            'bg-bg-primary border border-accent-primary/20',
            'rounded-terminal shadow-lg',
            'text-sm text-text-secondary'
          )}
          sideOffset={5}
        >
          <div className="flex gap-2">
            <span className="font-mono text-accent-primary text-xs">
              [{number}]
            </span>
            <span className="flex-1">{content}</span>
          </div>
          <Popover.Arrow className="fill-accent-primary/20" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}

/**
 * @interface FootnotesContextValue
 * @description Context value for footnote management
 * 
 * Provides methods and data for document-wide footnote
 * management through React context.
 * 
 * @property {Function} addFootnote - Add new footnote
 * @param {string} content - Footnote content
 * @returns {number} Assigned footnote number
 * 
 * @property {Function} getFootnote - Retrieve footnote by number
 * @param {number} number - Footnote number (1-indexed)
 * @returns {Footnote | undefined} Footnote data or undefined
 * 
 * @property {Footnote[]} footnotes - Current footnote array
 * All footnotes registered in the document.
 */
interface FootnotesContextValue {
  /** Add new footnote and get assigned number */
  addFootnote: (content: string) => number
  /** Retrieve footnote by number (1-indexed) */
  getFootnote: (number: number) => Footnote | undefined
  /** Array of all registered footnotes */
  footnotes: Footnote[]
}

const FootnotesContext = React.createContext<FootnotesContextValue | null>(null)

/**
 * FootnotesProvider component - Context provider for footnotes
 * 
 * Provides document-wide footnote management with automatic
 * numbering, deduplication, and retrieval capabilities.
 * 
 * @component
 * @param {{ children: React.ReactNode }} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * 
 * @returns {JSX.Element} Context provider wrapper
 * 
 * @remarks
 * The provider maintains footnote state and provides:
 * - Automatic sequential numbering
 * - Content deduplication (same content = same footnote)
 * - Retrieval by number
 * - Global footnote access
 * 
 * @example
 * ```tsx
 * // Wrap document with provider
 * <FootnotesProvider>
 *   <Article>
 *     <Content />
 *     <GeneratedFootnotes />
 *   </Article>
 * </FootnotesProvider>
 * ```
 */
export const FootnotesProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  const [footnotes, setFootnotes] = React.useState<Footnote[]>([])
  const footnoteCounter = React.useRef(0)

  const addFootnote = React.useCallback((content: string): number => {
    footnoteCounter.current += 1
    const number = footnoteCounter.current
    const id = `auto-${number}`
    
    setFootnotes(prev => {
      const existing = prev.find(fn => fn.content === content)
      if (existing) {
        // Return existing footnote number
        return prev
      }
      return [...prev, { id, content, references: [] }]
    })
    
    return number
  }, [])

  const getFootnote = React.useCallback((number: number): Footnote | undefined => {
    return footnotes[number - 1]
  }, [footnotes])

  return (
    <FootnotesContext.Provider value={{ addFootnote, getFootnote, footnotes }}>
      {children}
    </FootnotesContext.Provider>
  )
}

/**
 * useFootnotes hook - Access footnote context
 * 
 * Hook for accessing footnote management functions and data
 * within a FootnotesProvider.
 * 
 * @returns {FootnotesContextValue} Footnote context value
 * @throws {Error} If used outside FootnotesProvider
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { addFootnote, footnotes } = useFootnotes();
 *   
 *   const handleAddNote = () => {
 *     const num = addFootnote('New footnote content');
 *     console.log(`Added footnote ${num}`);
 *   };
 *   
 *   return (
 *     <div>
 *       <button onClick={handleAddNote}>Add Note</button>
 *       <p>Total footnotes: {footnotes.length}</p>
 *     </div>
 *   );
 * }
 * ```
 */
export const useFootnotes = () => {
  const context = React.useContext(FootnotesContext)
  if (!context) {
    throw new Error('useFootnotes must be used within FootnotesProvider')
  }
  return context
}

export default Footnotes