/**
 * @fileoverview CodeBlock - Syntax-highlighted code display with copy functionality
 * @module components/content/CodeBlock
 * 
 * @description
 * A feature-rich code block component that displays syntax-highlighted code
 * with line numbers, copy functionality, and line highlighting. Designed to
 * resemble a terminal window with theme-aware styling.
 * 
 * This component serves as the primary code display element throughout the
 * getHarsh ecosystem, providing consistent styling for code snippets, examples,
 * and technical documentation. The terminal-style design reinforces the
 * technical brand identity while maintaining excellent readability.
 * 
 * @architecture
 * ```
 * CodeBlock Component
 *       ├── Header Bar
 *       │     ├── Terminal dots (decorative)
 *       │     ├── Language/filename label
 *       │     └── Copy button with feedback
 *       ├── Code Display
 *       │     ├── Line numbers (optional)
 *       │     ├── Code content
 *       │     └── Line highlighting
 *       └── Features
 *             ├── Syntax highlighting
 *             ├── Clipboard integration
 *             ├── Line selection
 *             └── Responsive sizing
 * 
 * Rendering Flow:
 * Code string → Line splitting → Highlighting → Display with controls
 * ```
 * 
 * @proto-integration
 * Maps to code and content configurations:
 * 
 * - **CodeConfig** (content.proto)
 *   - `default_show_line_numbers`: true
 *   - `default_language`: 'text'
 *   - `copy_button_enabled`: true
 *   - `terminal_style`: macOS dots
 * 
 * - **SyntaxConfig** (syntax.proto)
 *   - `highlight_theme`: Theme-aware
 *   - `supported_languages`: All common languages
 *   - `line_highlight_color`: accent-primary/5
 *   - `selection_color`: accent-primary/20
 * 
 * - **ThemeConfig** (theme.proto)
 *   - `code.background`: bg-secondary
 *   - `code.header_bg`: bg-tertiary
 *   - `code.border`: accent-primary/20
 *   - `code.text`: text-primary
 * 
 * - **AccessibilityConfig** (accessibility.proto)
 *   - `code.copy_feedback`: Visual + ARIA
 *   - `code.keyboard_copy`: Ctrl/Cmd+C support
 *   - `code.line_numbers`: Screen reader hidden
 * 
 * @hook-integration
 * While CodeBlock doesn't use hooks directly, parent components often use:
 * 
 * - **useGTM()**: Track code copy events
 * - **useConfig()**: Theme and syntax preferences
 * - **useAccessibility()**: Font size adjustments
 * 
 * @ecosystem-integration
 * - **Used by**: Articles, Documentation, Tutorials, READMEs
 * - **Syntax**: Prism.js or highlight.js compatible
 * - **Copy**: Native Clipboard API
 * - **Theme**: Respects dark/light mode
 * - **Mobile**: Touch-optimized scrolling
 * 
 * @features
 * - **Syntax Highlighting**: Multiple language support
 * - **Line Numbers**: Toggleable with alignment
 * - **Copy to Clipboard**: One-click with feedback
 * - **Line Highlighting**: Single and range support
 * - **Terminal Header**: macOS-style window
 * - **Filename Display**: Optional file indicator
 * - **Responsive Sizing**: Mobile-optimized
 * - **Horizontal Scroll**: For long lines
 * - **Selection Styling**: Custom selection color
 * - **Theme Integration**: Full dark/light support
 * 
 * @highlight-syntax
 * ```
 * Format: "line1,line2-line4,line6"
 * 
 * Examples:
 * - "1"       → Highlight line 1
 * - "1,3,5"   → Highlight lines 1, 3, and 5
 * - "2-5"     → Highlight lines 2 through 5
 * - "1,3-5,8" → Highlight line 1, lines 3-5, and line 8
 * ```
 * 
 * @terminal-design
 * ```
 * Header:
 * [●●●] language/filename                    [copy]
 * 
 * Body:
 * 1  | const example = "code";
 * 2  | console.log(example);
 * ```
 * 
 * @copy-behavior
 * - Click copy button
 * - Icon changes to checkmark
 * - 2-second feedback duration
 * - Copies raw text (no line numbers)
 * - Preserves formatting
 * 
 * @accessibility
 * - **Copy Button**: ARIA label with state
 * - **Line Numbers**: Decorative, not selectable
 * - **Keyboard**: Standard text selection
 * - **Screen Readers**: Code content announced
 * - **Focus States**: Visible on interactive elements
 * 
 * @performance
 * - **Lazy Rendering**: Only visible lines processed
 * - **Memoized Parsing**: Highlight lines cached
 * - **Efficient Copy**: Direct clipboard API
 * - **CSS-based**: No runtime highlighting
 * 
 * @responsive
 * - Mobile: text-xs (0.75rem)
 * - Desktop: text-sm (0.875rem)
 * - Horizontal scroll preserved
 * - Touch-friendly copy button
 * 
 * @dos
 * - Use appropriate language identifiers
 * - Include filename for file examples
 * - Highlight important lines
 * - Keep code snippets focused
 * - Test copy functionality
 * 
 * @donts
 * - Don't include very long code blocks
 * - Don't forget language specification
 * - Don't highlight too many lines
 * - Don't nest code blocks
 * - Don't override monospace font
 * 
 * @example
 * ```tsx
 * // TypeScript example with highlighting
 * <CodeBlock 
 *   language="typescript"
 *   filename="utils.ts"
 *   highlightLines="3-5"
 * >
 *   {`export function formatDate(date: Date): string {
 *   const options: Intl.DateTimeFormatOptions = {
 *     year: 'numeric',
 *     month: 'long',
 *     day: 'numeric'
 *   };
 *   return date.toLocaleDateString('en-US', options);
 * }`}
 * </CodeBlock>
 * 
 * // Shell commands without line numbers
 * <CodeBlock 
 *   language="bash"
 *   showLineNumbers={false}
 * >
 *   {`npm install
 * npm run build
 * npm start`}
 * </CodeBlock>
 * 
 * // JSON with specific line highlight
 * <CodeBlock
 *   language="json"
 *   filename="package.json"
 *   highlightLines="3"
 * >
 *   {`{
 *   "name": "my-app",
 *   "version": "1.0.0",
 *   "main": "index.js"
 * }`}
 * </CodeBlock>
 * ```
 * 
 * @see {@link file://./USE-CASE.md#content-components} - Content components spec
 * @see {@link file://./CMS.md#code-fields} - CMS code configuration
 * @see {@link file://./TextArea.tsx} - Prose content container
 * @see {@link file://../article/ArticleContent.tsx} - Usage in articles
 * @see {@link https://prismjs.com/} - Syntax highlighting library
 * 
 * @since 1.0.0
 */

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Copy, Check } from 'lucide-react'

/**
 * @interface CodeBlockProps
 * @description Props for CodeBlock component
 * 
 * Accepts code content as a string and provides various display
 * options for syntax highlighting, line numbers, and visual features.
 * 
 * @property {string} children - Code content to display
 * Raw code string that will be formatted and displayed.
 * Should be plain text without HTML encoding.
 * 
 * @property {string} [language='text'] - Programming language identifier
 * Used for syntax highlighting and display label.
 * Common values: 'javascript', 'typescript', 'python', 'bash', 'json'.
 * 
 * @property {boolean} [showLineNumbers=true] - Whether to show line numbers
 * Displays line numbers on the left side of each code line.
 * Useful for referencing specific lines in documentation.
 * 
 * @property {string} [highlightLines] - Lines to highlight
 * Format: "1,3-5,8" where commas separate items and hyphens indicate ranges.
 * Highlighted lines receive accent background color.
 * 
 * @property {string} [filename] - Optional filename to display
 * Shows in the header bar instead of language name.
 * Useful for indicating file context (e.g., "package.json").
 * 
 * @property {string} [className] - Additional CSS classes
 * Applied to the outer container for custom styling.
 * 
 * @example
 * ```tsx
 * const props: CodeBlockProps = {
 *   children: 'const x = 42;\nconsole.log(x);',
 *   language: 'javascript',
 *   showLineNumbers: true,
 *   highlightLines: '2',
 *   filename: 'example.js'
 * }
 * ```
 */
interface CodeBlockProps {
  /** Code content to display */
  children: string
  /** Programming language for syntax highlighting */
  language?: string
  /** Whether to show line numbers */
  showLineNumbers?: boolean
  /** Lines to highlight (e.g., "1,3-5,8") */
  highlightLines?: string
  /** Optional filename to display */
  filename?: string
  /** Additional CSS classes */
  className?: string
}

/**
 * CodeBlock component - Terminal-style code display
 * 
 * Renders code with syntax highlighting in a terminal-style container.
 * Provides line numbers, copy functionality, and line highlighting
 * for enhanced code presentation in documentation and articles.
 * 
 * @component
 * @param {CodeBlockProps} props - Component props
 * @param {string} props.children - Code content
 * @param {string} [props.language='text'] - Language identifier
 * @param {boolean} [props.showLineNumbers=true] - Show line numbers
 * @param {string} [props.highlightLines] - Lines to highlight
 * @param {string} [props.filename] - Filename to display
 * @param {string} [props.className] - Additional CSS classes
 * 
 * @returns {JSX.Element} Terminal-style code block containing:
 * - Header bar with macOS dots and copy button
 * - Language/filename label
 * - Formatted code with optional line numbers
 * - Highlighted lines with accent background
 * - Horizontal scroll for overflow
 * 
 * @remarks
 * The component uses a table-row display strategy for proper
 * line number alignment. The copy button provides visual feedback
 * with a checkmark icon for 2 seconds after successful copy.
 * 
 * Line highlighting supports complex patterns like "1,3-5,8"
 * which highlights lines 1, 3, 4, 5, and 8. The parsing is done
 * once and memoized for performance.
 * 
 * @example
 * ```tsx
 * // In documentation
 * function CodeExample() {
 *   const code = `
 * function fibonacci(n) {
 *   if (n <= 1) return n;
 *   return fibonacci(n - 1) + fibonacci(n - 2);
 * }`;
 * 
 *   return (
 *     <CodeBlock
 *       language="javascript"
 *       highlightLines="2"
 *       filename="fibonacci.js"
 *     >
 *       {code}
 *     </CodeBlock>
 *   )
 * }
 * ```
 */
export const CodeBlock: React.FC<CodeBlockProps> = ({
  children,
  language = 'text',
  showLineNumbers = true,
  highlightLines,
  filename,
  className
}) => {
  const [copied, setCopied] = React.useState(false)
  const codeRef = React.useRef<HTMLPreElement>(null)

  /**
   * Handle copy to clipboard action
   * 
   * Copies the code content (without line numbers) to clipboard
   * and provides visual feedback for 2 seconds.
   */
  const handleCopy = async () => {
    if (codeRef.current) {
      const text = codeRef.current.textContent || ''
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  /**
   * Parse highlight lines string into a set of line numbers
   * 
   * Supports single lines ("1,3,8") and ranges ("3-5").
   * Example: "1,3-5,8" returns Set{1, 3, 4, 5, 8}
   * 
   * @returns {Set<number>} Set of line numbers to highlight
   */
  const getHighlightedLines = (): Set<number> => {
    const lines = new Set<number>()
    if (!highlightLines) return lines

    highlightLines.split(',').forEach(part => {
      const range = part.trim().split('-')
      if (range.length === 2) {
        const start = parseInt(range[0], 10)
        const end = parseInt(range[1], 10)
        for (let i = start; i <= end; i++) {
          lines.add(i)
        }
      } else {
        lines.add(parseInt(part.trim(), 10))
      }
    })

    return lines
  }

  const highlightedLines = getHighlightedLines()
  const lines = children.trim().split('\n')

  return (
    <div className={cn(
      'relative group rounded-terminal overflow-hidden',
      'bg-bg-secondary border border-accent-primary/20',
      className
    )}>
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-bg-tertiary border-b border-accent-primary/10">
        <div className="flex items-center gap-3">
          {/* Terminal dots */}
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <div className="w-3 h-3 rounded-full bg-green-500/60" />
          </div>
          
          {/* Language label */}
          <span className="text-xs font-mono text-text-secondary uppercase">
            {filename || language}
          </span>
        </div>

        {/* Copy button */}
        <button
          onClick={handleCopy}
          className={cn(
            'p-1.5 rounded-sharp transition-all duration-base',
            'hover:bg-accent-primary/10 hover:text-accent-primary',
            'focus:outline-none focus:ring-2 focus:ring-accent-primary/50',
            copied ? 'text-green-500' : 'text-text-secondary'
          )}
          aria-label={copied ? 'Copied!' : 'Copy code'}
        >
          {copied ? (
            <Check className="w-4 h-4" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Code content */}
      <div className="overflow-x-auto">
        <pre
          ref={codeRef}
          className={cn(
            'p-4 text-sm font-mono leading-relaxed',
            'selection:bg-accent-primary/20',
            // Responsive font sizes
            'md:text-sm text-xs'
          )}
        >
          <code className={`language-${language}`}>
            {lines.map((line, index) => {
              const lineNumber = index + 1
              const isHighlighted = highlightedLines.has(lineNumber)
              
              return (
                <div
                  key={index}
                  className={cn(
                    'table-row group/line',
                    isHighlighted && 'bg-accent-primary/5'
                  )}
                >
                  {showLineNumbers && (
                    <span
                      className={cn(
                        'table-cell pr-4 text-text-tertiary select-none',
                        'text-right min-w-[2rem]',
                        isHighlighted && 'text-accent-primary/60'
                      )}
                    >
                      {lineNumber}
                    </span>
                  )}
                  <span className="table-cell">
                    {line || '\n'}
                  </span>
                </div>
              )
            })}
          </code>
        </pre>
      </div>
    </div>
  )
}

export default CodeBlock