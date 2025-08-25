/**
 * @fileoverview SearchHighlight - Query term highlighting in search results
 * @module components/search/SearchHighlight
 * 
 * @description
 * A utility component that highlights search query terms within text content,
 * providing visual feedback to users about matching terms. Handles case-insensitive
 * matching and special character escaping for safe regex operations.
 * 
 * This component is essential for search UX, helping users quickly identify
 * why a particular result matched their query by visually emphasizing the
 * matching terms within the result's title and description.
 * 
 * @architecture
 * ```
 * SearchHighlight (this)
 *       │
 *       ├── Text Processing
 *       │     ├── Query escaping
 *       │     ├── Regex creation
 *       │     └── Text splitting
 *       │
 *       └── Render Output
 *             ├── Normal text spans
 *             └── <mark> elements
 * 
 * Processing Flow:
 * text + query → escape → regex → split → map → render
 * ```
 * 
 * @proto-integration
 * Maps to search display configurations:
 * 
 * - **SearchDisplay** (search.proto)
 *   - `highlight_query_terms`: Enable/disable highlighting
 *   - `highlight_style`: Visual style for highlights
 *   - `highlight_whole_words`: Word boundary matching (future)
 * 
 * - **UIConfig** (ui.proto)
 *   - `semantic_elements.use_mark`: Use <mark> element
 *   - `theme.highlight_colors`: Theme-aware colors
 *   - `accessibility.announce_highlights`: Screen reader support
 * 
 * @algorithm
 * ```
 * 1. Escape special regex characters in query
 * 2. Create case-insensitive global regex
 * 3. Split text by regex matches
 * 4. Map parts to spans or marks
 * 5. Preserve original text casing
 * ```
 * 
 * @ecosystem-integration
 * - **Used by**: SearchResultItem for title/summary highlighting
 * - **Data flow**: Query term → regex → highlighted HTML
 * - **Performance**: O(n) where n is text length
 * - **Accessibility**: Semantic <mark> for screen readers
 * - **Theming**: Dark/light mode aware highlighting
 * 
 * @features
 * - **Case-Insensitive**: Matches regardless of case
 * - **Safe Escaping**: Handles special regex characters
 * - **Preserves Casing**: Original text case maintained
 * - **Custom Styling**: Fully customizable appearance
 * - **Dark Mode**: Theme-aware default colors
 * - **Empty Handling**: Graceful null/empty handling
 * - **Semantic HTML**: Uses <mark> element
 * 
 * @highlighting-behavior
 * ```
 * Input: "Building with Gatsby", query: "gatsby"
 * Process:
 * 1. Escape: "gatsby" (no special chars)
 * 2. Regex: /(gatsby)/gi
 * 3. Split: ["Building with ", "Gatsby"]
 * 4. Check: "Gatsby".toLowerCase() === "gatsby"
 * 5. Output: Building with <mark>Gatsby</mark>
 * ```
 * 
 * @special-character-handling
 * Characters escaped: . * + ? ^ $ { } ( ) | [ ] \
 * This prevents regex injection and ensures:
 * - Query "react.js" matches literal "react.js"
 * - Query "$100" matches literal "$100"
 * - Query "(test)" matches literal "(test)"
 * 
 * @styling
 * ```
 * Default (Light Mode):
 * - Background: yellow-200
 * - Font: semibold
 * 
 * Default (Dark Mode):
 * - Background: yellow-900
 * - Font: semibold
 * 
 * Custom:
 * - Any Tailwind/CSS classes via highlightClassName
 * ```
 * 
 * @accessibility
 * - **<mark> Element**: Semantic highlighting
 * - **Screen Readers**: Announced as "highlighted"
 * - **Color Contrast**: WCAG AA compliant defaults
 * - **Keyboard**: No interaction, display only
 * - **Focus**: N/A (non-interactive)
 * 
 * @performance
 * - **Regex Caching**: Consider memoizing for same query
 * - **Text Length**: Linear time complexity
 * - **DOM Nodes**: Minimal spans and marks
 * - **Re-renders**: Only on text/query change
 * 
 * @edge-cases
 * - Empty query: Returns plain text
 * - Empty text: Returns empty span
 * - Special chars: Properly escaped
 * - Multiple matches: All highlighted
 * - Adjacent matches: Handled correctly
 * 
 * @dos
 * - Always escape query for regex safety
 * - Use semantic <mark> elements
 * - Provide theme-aware defaults
 * - Preserve original text casing
 * - Handle empty inputs gracefully
 * 
 * @donts
 * - Don't use innerHTML (XSS risk)
 * - Don't modify original text case
 * - Don't skip regex escaping
 * - Don't use complex regex patterns
 * - Don't forget dark mode styling
 * 
 * @example
 * ```tsx
 * // Standard usage in SearchResultItem
 * <h3>
 *   <SearchHighlight
 *     text={result.title}
 *     query={searchQuery}
 *   />
 * </h3>
 * 
 * // Custom colors for different result types
 * <SearchHighlight
 *   text={result.summary}
 *   query={query}
 *   highlightClassName={
 *     result.type === 'post' 
 *       ? 'bg-blue-200 dark:bg-blue-800'
 *       : 'bg-green-200 dark:bg-green-800'
 *   }
 * />
 * 
 * // With wrapper styling
 * <SearchHighlight
 *   text={metadata.author}
 *   query={authorQuery}
 *   className="text-sm text-gray-600"
 *   highlightClassName="bg-purple-200 font-bold"
 * />
 * ```
 * 
 * @see {@link file://./SearchResultItem.tsx} - Primary consumer
 * @see {@link file://./SearchResults.tsx} - Parent context
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/mark} - <mark> spec
 * 
 * @since 1.0.0
 */

import React from 'react'

/**
 * @interface SearchHighlightProps
 * @description Props for SearchHighlight component
 * 
 * Configuration for text highlighting, specifying the text,
 * query to match, and optional styling customization.
 * 
 * @property {string} text - Text content to highlight within
 * The source text where query terms will be highlighted.
 * Can be any length, typically titles or descriptions.
 * 
 * @property {string} query - Search query to highlight
 * The search term(s) to find and highlight in the text.
 * Case-insensitive matching, special chars auto-escaped.
 * 
 * @property {string} [className] - CSS classes for wrapper span
 * Applied to the outer span container.
 * Use for text styling like font-size, color, etc.
 * 
 * @property {string} [highlightClassName] - CSS classes for highlighted marks
 * Applied to <mark> elements wrapping matched terms.
 * Defaults to yellow background with dark mode variant.
 * 
 * @example
 * ```tsx
 * const props: SearchHighlightProps = {
 *   text: 'Learn React and TypeScript fundamentals',
 *   query: 'react',
 *   className: 'text-lg font-medium',
 *   highlightClassName: 'bg-blue-200 dark:bg-blue-800 font-bold'
 * }
 * ```
 */
interface SearchHighlightProps {
  /** Text content to highlight within - source text for searching */
  text: string
  /** Search query to highlight - case-insensitive, auto-escaped */
  query: string
  /** CSS classes for wrapper span - text styling */
  className?: string
  /** CSS classes for highlighted marks - defaults to yellow background */
  highlightClassName?: string
}

/**
 * SearchHighlight component - Highlights query terms in text
 * 
 * Processes text to highlight matching query terms using semantic
 * HTML and theme-aware styling. Handles edge cases like empty
 * inputs and special regex characters safely.
 * 
 * @component
 * @param {SearchHighlightProps} props - Component props
 * @param {string} props.text - Text to search within
 * @param {string} props.query - Query terms to highlight
 * @param {string} [props.className=''] - Wrapper CSS classes
 * @param {string} [props.highlightClassName] - Highlight CSS classes
 * 
 * @returns {JSX.Element} Text with highlighted query terms:
 * - Wrapper <span> with optional className
 * - Normal text in <span> elements
 * - Matched terms in <mark> elements
 * - Preserves original text casing
 * 
 * @remarks
 * The component uses a three-step process:
 * 1. Escapes special regex characters in query
 * 2. Splits text by case-insensitive regex
 * 3. Wraps matches in <mark> elements
 * 
 * Default highlighting uses yellow background
 * with dark mode support for optimal visibility.
 * 
 * @example
 * ```tsx
 * // In a search result
 * function ResultTitle({ title, searchQuery }) {
 *   return (
 *     <h3 className="text-xl font-bold">
 *       <SearchHighlight
 *         text={title}
 *         query={searchQuery}
 *         highlightClassName="bg-blue-200 dark:bg-blue-700"
 *       />
 *     </h3>
 *   )
 * }
 * ```
 */
export const SearchHighlight: React.FC<SearchHighlightProps> = ({
  text,
  query,
  className = '',
  highlightClassName = 'bg-yellow-200 dark:bg-yellow-900 font-semibold'
}) => {
  /**
   * Handle empty inputs gracefully
   * Return plain text if no query or text
   */
  if (!query || !text) {
    return <span className={className}>{text}</span>
  }

  /**
   * Escape special regex characters in the query
   * Prevents regex injection and ensures literal matching
   * Characters escaped: . * + ? ^ $ { } ( ) | [ ] \
   */
  const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  
  /**
   * Create case-insensitive global regex
   * Captures matching segments for preservation
   */
  const regex = new RegExp(`(${escapedQuery})`, 'gi')
  
  /**
   * Split text by the query matches
   * Preserves both matched and non-matched segments
   */
  const parts = text.split(regex)

  return (
    <span className={className}>
      {parts.map((part, index) => {
        /**
         * Check if this part matches the query (case-insensitive)
         * Preserves original casing in the output
         */
        const isHighlight = part.toLowerCase() === query.toLowerCase()
        
        return isHighlight ? (
          <mark key={index} className={highlightClassName}>
            {part}
          </mark>
        ) : (
          <span key={index}>{part}</span>
        )
      })}
    </span>
  )
}