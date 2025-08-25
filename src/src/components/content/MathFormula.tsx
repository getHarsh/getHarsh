/**
 * @fileoverview MathFormula - Mathematical notation rendering with KaTeX
 * @module components/content/MathFormula
 * 
 * @description
 * A comprehensive component for rendering mathematical formulas using KaTeX,
 * supporting both inline and display modes with features like fullscreen view,
 * LaTeX copying, and error handling.
 * 
 * This component brings professional mathematical typesetting to the getHarsh
 * ecosystem, enabling technical documentation, scientific articles, and
 * educational content with beautifully rendered mathematical notation.
 * 
 * @architecture
 * ```
 * MathFormula Component
 *       ├── KaTeX Integration
 *       │     ├── CDN loading
 *       │     ├── CSS injection
 *       │     └── Rendering engine
 *       ├── Display Modes
 *       │     ├── Inline (text flow)
 *       │     └── Block (centered)
 *       ├── Interactive Features
 *       │     ├── Copy LaTeX source
 *       │     ├── Fullscreen view
 *       │     └── Error display
 *       └── Convenience Wrappers
 *             ├── InlineMath
 *             └── BlockMath
 * 
 * Rendering Flow:
 * LaTeX string → CDN check → KaTeX.render() → DOM injection
 * Error → Fallback display → Show source code
 * ```
 * 
 * @proto-integration
 * Maps to mathematical content and visualization configurations:
 * 
 * - **MathConfig** (content.proto)
 *   - `renderer`: 'katex' (vs mathjax)
 *   - `cdn_version`: '0.16.9'
 *   - `auto_load`: true on demand
 *   - `default_display`: 'block'
 * 
 * - **FormulaConfig** (formula.proto)
 *   - `trust_mode`: true for advanced
 *   - `strict_mode`: false for flexibility
 *   - `error_color`: var(--accent-error)
 *   - `display_size`: Larger for block mode
 * 
 * - **ThemeConfig** (theme.proto)
 *   - `formula.text_color`: accent-primary
 *   - `formula.background`: bg-secondary
 *   - `formula.border`: accent-primary/20
 *   - `formula.fullscreen_bg`: bg-primary
 * 
 * - **AccessibilityConfig** (accessibility.proto)
 *   - `math.alt_text`: Title attribute
 *   - `math.screen_reader`: MathML when available
 *   - `math.copy_source`: LaTeX source access
 *   - `math.error_announce`: Clear messaging
 * 
 * @hook-integration
 * While MathFormula doesn't use hooks directly, parent components often use:
 * 
 * - **useGTM()**: Track formula interactions
 * - **useConfig()**: Math rendering preferences
 * - **useIntersectionObserver()**: Lazy load formulas
 * 
 * @ecosystem-integration
 * - **Used by**: Technical articles, Documentation, Tutorials, Research
 * - **CDN**: KaTeX loaded from jsdelivr
 * - **Styling**: KaTeX CSS + theme overrides
 * - **Fullscreen**: Radix UI Dialog modal
 * - **Copy**: Native Clipboard API
 * 
 * @features
 * - **LaTeX Rendering**: Full KaTeX support
 * - **Display Modes**: Inline and block
 * - **Copy Source**: One-click LaTeX copy
 * - **Fullscreen View**: Expanded display
 * - **Error Handling**: Graceful fallbacks
 * - **CDN Loading**: On-demand resources
 * - **Theme Integration**: Color consistency
 * - **Convenience Components**: InlineMath, BlockMath
 * - **Trust Mode**: Advanced LaTeX features
 * - **Responsive**: Adapts to container
 * 
 * @display-modes
 * ```
 * inline:
 *   - Flows with text
 *   - Smaller size
 *   - No line breaks
 *   - Example: $x^2$
 * 
 * block:
 *   - Centered display
 *   - Larger size
 *   - Own line
 *   - Example: $$\int_0^1 x dx$$
 * ```
 * 
 * @katex-configuration
 * ```javascript
 * {
 *   displayMode: true/false,
 *   throwOnError: false,
 *   errorColor: 'var(--accent-error)',
 *   trust: true,
 *   strict: false
 * }
 * ```
 * 
 * @error-states
 * - CDN load failure: Shows source code
 * - Parse error: Displays LaTeX with message
 * - Missing library: Helpful error text
 * - Render failure: Fallback to monospace
 * 
 * @accessibility
 * - **Title Attribute**: Formula description
 * - **Error Messages**: Clear explanations
 * - **Source Access**: Copy LaTeX button
 * - **Keyboard**: Tab to controls
 * - **Screen Readers**: Alternative text
 * 
 * @performance
 * - **Lazy Loading**: CDN on first use
 * - **Caching**: Browser caches resources
 * - **Single Load**: KaTeX loaded once
 * - **Efficient Render**: Direct DOM injection
 * 
 * @dos
 * - Provide titles for complex formulas
 * - Use inline for simple expressions
 * - Use block for important equations
 * - Test formula rendering
 * - Include fallback descriptions
 * 
 * @donts
 * - Don't use unsupported LaTeX
 * - Don't nest formulas
 * - Don't forget error handling
 * - Don't override KaTeX styles
 * - Don't load KaTeX multiple times
 * 
 * @example
 * ```tsx
 * // Scientific article with formulas
 * function QuantumArticle() {
 *   return (
 *     <article>
 *       <p>
 *         The Schrödinger equation
 *         <InlineMath math="i\\hbar\\frac{\\partial}{\\partial t}\\Psi = \\hat{H}\\Psi" />
 *         describes quantum state evolution.
 *       </p>
 *       
 *       <BlockMath
 *         title="Time-Independent Schrödinger Equation"
 *         math="-\\frac{\\hbar^2}{2m}\\nabla^2\\psi + V\\psi = E\\psi"
 *       />
 *       
 *       <p>
 *         Where <InlineMath math="\\hbar" /> is the reduced Planck constant.
 *       </p>
 *     </article>
 *   )
 * }
 * 
 * // Statistical formulas
 * <BlockMath
 *   title="Normal Distribution"
 *   math="f(x) = \\frac{1}{\\sigma\\sqrt{2\\pi}}e^{-\\frac{1}{2}\\left(\\frac{x-\\mu}{\\sigma}\\right)^2}"
 * />
 * 
 * // Matrix notation
 * <BlockMath
 *   title="Matrix Multiplication"
 *   math="\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix} \\begin{bmatrix} x \\\\ y \\end{bmatrix} = \\begin{bmatrix} ax + by \\\\ cx + dy \\end{bmatrix}"
 * />
 * ```
 * 
 * @see {@link file://./USE-CASE.md#content-components} - Content components spec
 * @see {@link file://./CMS.md#math-fields} - CMS math configuration
 * @see {@link file://./CodeBlock.tsx} - Code display component
 * @see {@link https://katex.org/} - KaTeX documentation
 * @see {@link https://katex.org/docs/supported.html} - Supported LaTeX commands
 * 
 * @since 1.0.0
 */

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '../ui/Button'
import { Copy, Maximize2, X } from 'lucide-react'
import { Dialog } from 'radix-ui'

/**
 * KaTeX library interface
 * 
 * Type definitions for the KaTeX library loaded from CDN.
 * Covers the main API methods used for formula rendering.
 */
declare global {
  interface Window {
    katex?: {
      /** Render LaTeX to DOM element */
      render: (
        math: string,
        element: HTMLElement,
        options?: {
          /** Display mode (centered, larger) */
          displayMode?: boolean;
          /** Throw errors vs display them */
          throwOnError?: boolean;
          /** Color for error messages */
          errorColor?: string;
          /** Enable trust mode for advanced features */
          trust?: boolean;
          /** Strict mode for parsing */
          strict?: boolean | string;
          /** Additional KaTeX options */
          [key: string]: unknown;
        }
      ) => void;
      /** Render LaTeX to HTML string */
      renderToString?: (math: string, options?: Record<string, unknown>) => string;
    };
  }
}

/**
 * @interface MathFormulaProps
 * @description Props for MathFormula component
 * 
 * Configuration for rendering mathematical formulas with
 * KaTeX, supporting various display modes and features.
 * 
 * @property {string} math - LaTeX math expression
 * The LaTeX source code for the formula to render.
 * Supports full KaTeX syntax.
 * 
 * @property {'inline' | 'block'} [display='block'] - Display mode
 * - 'inline': Renders within text flow, smaller size
 * - 'block': Centered on own line, larger size
 * 
 * @property {string} [title] - Optional formula title
 * Displayed above the formula in block mode.
 * Also used as the fullscreen dialog title.
 * 
 * @property {string} [className] - Additional CSS classes
 * Applied to the container for custom styling.
 * 
 * @example
 * ```tsx
 * const props: MathFormulaProps = {
 *   math: 'E = mc^2',
 *   display: 'block',
 *   title: 'Mass-Energy Equivalence',
 *   className: 'my-8'
 * }
 * ```
 */
interface MathFormulaProps {
  /** LaTeX math expression */
  math: string
  /** Display mode: inline or block */
  display?: 'inline' | 'block'
  /** Optional formula title */
  title?: string
  /** Additional CSS classes */
  className?: string
}

/**
 * MathFormula component - Render mathematical notation
 * 
 * Renders LaTeX mathematical expressions using KaTeX with support
 * for inline and block display modes, interactive controls, and
 * error handling.
 * 
 * @component
 * @param {MathFormulaProps} props - Component props
 * @param {string} props.math - LaTeX expression
 * @param {'inline' | 'block'} [props.display='block'] - Display mode
 * @param {string} [props.title] - Formula title
 * @param {string} [props.className] - Additional CSS classes
 * 
 * @returns {JSX.Element} Rendered formula containing:
 * - KaTeX-rendered mathematical notation
 * - Copy LaTeX button (block mode)
 * - Fullscreen button (block mode)
 * - Error fallback display
 * - Loading state indicator
 * 
 * @remarks
 * The component handles several scenarios:
 * 
 * 1. **CDN Loading**: Dynamically loads KaTeX on first use
 * 2. **Error Handling**: Shows LaTeX source if rendering fails
 * 3. **Display Modes**: Different rendering for inline vs block
 * 4. **Fullscreen**: Modal view for detailed examination
 * 
 * Inline mode renders as a span element that flows with text,
 * while block mode renders in a styled container with controls.
 * 
 * @example
 * ```tsx
 * // In technical documentation
 * function PhysicsExample() {
 *   return (
 *     <div>
 *       <p>
 *         Newton's second law states that
 *         <MathFormula 
 *           math="F = ma" 
 *           display="inline"
 *         />
 *         where force equals mass times acceleration.
 *       </p>
 *       
 *       <MathFormula
 *         math="\\vec{F} = \\frac{d\\vec{p}}{dt}"
 *         display="block"
 *         title="Newton's Second Law (Vector Form)"
 *       />
 *     </div>
 *   )
 * }
 * ```
 */
export const MathFormula: React.FC<MathFormulaProps> = ({
  math,
  display = 'block',
  title,
  className
}) => {
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [isFullscreen, setIsFullscreen] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    /**
     * Initialize and render the mathematical formula
     * 
     * Loads KaTeX from CDN if needed and renders the LaTeX.
     */
    const renderMath = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // Check if KaTeX is available
        const katex = window.katex
        if (!katex) {
          // Load KaTeX from CDN
          const link = document.createElement('link')
          link.rel = 'stylesheet'
          link.href = 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css'
          document.head.appendChild(link)

          const script = document.createElement('script')
          script.src = 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js'
          script.async = true
          script.onload = () => renderFormula()
          script.onerror = () => setError('Failed to load KaTeX library')
          document.head.appendChild(script)
        } else {
          renderFormula()
        }
      } catch (err) {
        setError('Failed to initialize KaTeX')
        setIsLoading(false)
      }
    }

    /**
     * Render the formula using KaTeX
     * 
     * Calls KaTeX.render() with appropriate options for the
     * display mode and error handling.
     */
    const renderFormula = () => {
      try {
        const katex = window.katex
        if (!katex || !containerRef.current) {
          setError('KaTeX library not found')
          return
        }

        // Clear container
        containerRef.current.innerHTML = ''

        // Render the math
        katex.render(math, containerRef.current, {
          displayMode: display === 'block',
          throwOnError: false,
          errorColor: 'var(--accent-error)',
          trust: true,
          strict: false
        })

        setIsLoading(false)
      } catch (err) {
        setError((err as Error).message || 'Failed to render formula')
        setIsLoading(false)
      }
    }

    renderMath()
  }, [math, display])

  /**
   * Copy LaTeX source to clipboard
   */
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(math)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  if (display === 'inline') {
    return (
      <span
        ref={containerRef}
        className={cn(
          'inline-block align-middle mx-1',
          'text-accent-primary',
          isLoading && 'opacity-50',
          error && 'text-accent-error',
          className
        )}
        title={error || undefined}
      >
        {isLoading && <span className="text-text-tertiary">...</span>}
        {error && <span className="font-mono text-xs">{math}</span>}
      </span>
    )
  }

  const blockContent = (
    <div
      className={cn(
        'relative group rounded-terminal overflow-hidden',
        'bg-bg-secondary border border-accent-primary/20',
        'my-4',
        className
      )}
    >
      {title && (
        <div className="px-4 py-2 border-b border-accent-primary/20">
          <h3 className="font-display uppercase tracking-wide text-accent-primary text-sm">
            {title}
          </h3>
        </div>
      )}

      <div className="relative p-6">
        {isLoading && (
          <div className="flex items-center justify-center">
            <div className="text-text-tertiary">Loading formula...</div>
          </div>
        )}

        {error && (
          <div className="text-center">
            <div className="text-accent-error mb-2">Failed to render formula</div>
            <pre className="mt-2 p-2 bg-bg-tertiary rounded text-xs overflow-auto">
              <code>{math}</code>
            </pre>
          </div>
        )}

        <div
          ref={containerRef}
          className={cn(
            'katex-display text-center',
            'text-accent-primary',
            '[&_.katex-html]:text-lg',
            '[&_.katex-display]:my-0'
          )}
        />

        {/* Action buttons */}
        {!isLoading && !error && (
          <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 glass"
              onClick={handleCopy}
              title="Copy LaTeX"
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 glass"
              onClick={() => setIsFullscreen(true)}
              title="Fullscreen"
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )

  return (
    <>
      {blockContent}

      {/* Fullscreen dialog */}
      <Dialog.Root open={isFullscreen} onOpenChange={setIsFullscreen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50" />
          <Dialog.Content className="fixed inset-8 bg-bg-primary rounded-terminal shadow-xl z-50 flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-accent-primary/20">
              <Dialog.Title className="font-display uppercase tracking-wide text-accent-primary">
                {title || 'Mathematical Formula'}
              </Dialog.Title>
              <Dialog.Close asChild>
                <Button size="icon" variant="ghost">
                  <X className="h-4 w-4" />
                </Button>
              </Dialog.Close>
            </div>
            <div className="flex-1 flex items-center justify-center p-8 overflow-auto">
              <div className="katex-display text-2xl text-accent-primary">
                <div dangerouslySetInnerHTML={{ 
                  __html: containerRef.current?.innerHTML || '' 
                }} />
              </div>
            </div>
            <div className="p-4 border-t border-accent-primary/20">
              <pre className="p-3 bg-bg-secondary rounded text-sm overflow-auto">
                <code>{math}</code>
              </pre>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  )
}

/**
 * InlineMath component - Convenience wrapper for inline math
 * 
 * Simplified component for rendering inline mathematical expressions
 * that flow within text content.
 * 
 * @component
 * @param {{ math: string; className?: string }} props - Component props
 * @param {string} props.math - LaTeX expression
 * @param {string} [props.className] - Additional CSS classes
 * 
 * @returns {JSX.Element} Inline math formula
 * 
 * @example
 * ```tsx
 * <p>
 *   The Pythagorean theorem is <InlineMath math="a^2 + b^2 = c^2" />.
 * </p>
 * ```
 */
export const InlineMath: React.FC<{ math: string; className?: string }> = ({ 
  math, 
  className 
}) => (
  <MathFormula math={math} display="inline" className={className} />
)

/**
 * BlockMath component - Convenience wrapper for display math
 * 
 * Simplified component for rendering block-level mathematical expressions
 * with optional titles and fullscreen support.
 * 
 * @component
 * @param {{ math: string; title?: string; className?: string }} props - Component props
 * @param {string} props.math - LaTeX expression
 * @param {string} [props.title] - Formula title
 * @param {string} [props.className] - Additional CSS classes
 * 
 * @returns {JSX.Element} Block math formula
 * 
 * @example
 * ```tsx
 * <BlockMath
 *   title="Euler's Identity"
 *   math="e^{i\\pi} + 1 = 0"
 * />
 * ```
 */
export const BlockMath: React.FC<{ 
  math: string; 
  title?: string; 
  className?: string 
}> = ({ 
  math, 
  title, 
  className 
}) => (
  <MathFormula math={math} display="block" title={title} className={className} />
)

export default MathFormula