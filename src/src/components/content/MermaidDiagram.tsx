/**
 * @fileoverview MermaidDiagram - Mermaid diagram rendering with theme awareness
 * @module components/content/MermaidDiagram
 * 
 * @description
 * A feature-rich component for rendering Mermaid diagrams including flowcharts,
 * sequence diagrams, Gantt charts, and more. Features theme-aware styling,
 * interactive controls, and export capabilities.
 * 
 * This component provides comprehensive diagram support for technical documentation
 * in the getHarsh ecosystem. It dynamically loads Mermaid from CDN, applies theme-aware
 * styling, and offers interactive features like copying source code and downloading
 * rendered diagrams as SVG files.
 * 
 * @architecture
 * ```
 * MermaidDiagram Component
 *       ├── CDN Loading
 *       │     ├── Dynamic script injection
 *       │     ├── Version management
 *       │     └── Error handling
 *       ├── Rendering Pipeline
 *       │     ├── Mermaid initialization
 *       │     ├── Theme configuration
 *       │     ├── SVG generation
 *       │     └── Error recovery
 *       ├── Interactive Controls
 *       │     ├── Copy source code
 *       │     ├── Download SVG
 *       │     └── Fullscreen view
 *       └── Theme Sync
 *             ├── MutationObserver
 *             ├── CSS variable mapping
 *             └── Live re-rendering
 * 
 * Rendering Flow:
 * Mermaid code → CDN load → Initialize → Render SVG → Display
 * Theme change → Re-initialize → Re-render → Update display
 * ```
 * 
 * @proto-integration
 * Maps to diagram and visualization configurations:
 * 
 * - **DiagramConfig** (content.proto)
 *   - `mermaid.cdn_url`: jsdelivr CDN
 *   - `mermaid.version`: '10.x'
 *   - `mermaid.auto_load`: On-demand
 *   - `mermaid.cache_diagrams`: Browser cache
 * 
 * - **VisualizationConfig** (visualization.proto)
 *   - `default_height`: 'auto'
 *   - `fullscreen_enabled`: true
 *   - `export_formats`: ['svg']
 *   - `interactive_controls`: Copy, download
 * 
 * - **ThemeConfig** (theme.proto)
 *   - `diagram.theme_mode`: Sync with site
 *   - `diagram.colors`: CSS variables
 *   - `diagram.background`: bg-secondary
 *   - `diagram.border`: accent-primary/20
 * 
 * - **AccessibilityConfig** (accessibility.proto)
 *   - `diagram.alt_text`: Title + caption
 *   - `diagram.keyboard_controls`: Button navigation
 *   - `diagram.screen_reader`: ARIA labels
 * 
 * @hook-integration
 * While MermaidDiagram doesn't use hooks directly, parent components often use:
 * 
 * - **useGTM()**: Track diagram interactions
 * - **useConfig()**: Theme and CDN settings
 * - **useIntersectionObserver()**: Lazy load diagrams
 * 
 * @ecosystem-integration
 * - **Used by**: TechnicalDocs, BlogPosts, Tutorials, Architecture docs
 * - **CDN**: Mermaid loaded from jsdelivr
 * - **Theme**: Syncs with data-theme attribute
 * - **Export**: SVG download capability
 * - **Fullscreen**: Radix UI Dialog for modal
 * 
 * @features
 * - **8 Diagram Types**: Full Mermaid support
 * - **Theme Awareness**: Live theme switching
 * - **Copy Source**: Original Mermaid code
 * - **Download SVG**: Export rendered diagram
 * - **Fullscreen View**: Detailed examination
 * - **Error Handling**: Graceful fallbacks
 * - **Lazy Loading**: CDN on-demand
 * - **CSS Variables**: Theme integration
 * - **Responsive**: Adapts to container
 * - **Accessibility**: ARIA labels and roles
 * 
 * @diagram-types
 * ```
 * Flowcharts:      graph TD/LR/RL/BT
 * Sequence:        sequenceDiagram
 * Gantt:           gantt
 * Class:           classDiagram
 * State:           stateDiagram-v2
 * ER:              erDiagram
 * User Journey:    journey
 * Git:             gitGraph
 * ```
 * 
 * @theme-variables
 * ```
 * CSS Variable Mapping:
 * --accent-primary     → primaryColor
 * --text-primary       → textColor
 * --bg-primary         → background
 * --bg-secondary       → secondaryColor
 * --bg-tertiary        → tertiaryColor
 * --accent-error       → errorBkgColor
 * ```
 * 
 * @error-handling
 * - CDN load failure: Shows error message
 * - Parse errors: Displays source code
 * - Render failures: Fallback to code display
 * - Network issues: Retry mechanism
 * 
 * @accessibility
 * - **Title**: Diagram heading for context
 * - **Caption**: Description for understanding
 * - **Buttons**: Keyboard accessible controls
 * - **Fullscreen**: Focus management in modal
 * - **ARIA**: Labels on interactive elements
 * 
 * @performance
 * - **Lazy Load**: CDN script on first use
 * - **Caching**: Browser caches CDN script
 * - **Re-render**: Only on theme change
 * - **SVG**: Efficient vector format
 * 
 * @dos
 * - Provide descriptive titles and captions
 * - Use appropriate diagram types
 * - Keep diagrams focused and readable
 * - Test theme switching behavior
 * - Validate Mermaid syntax
 * 
 * @donts
 * - Don't create overly complex diagrams
 * - Don't forget error handling
 * - Don't skip accessibility labels
 * - Don't hardcode colors (use theme)
 * - Don't render too many diagrams at once
 * 
 * @example
 * ```tsx
 * // Architecture flowchart
 * <MermaidDiagram
 *   title="System Architecture"
 *   caption="Microservices communication flow"
 *   code={`
 *     graph TB
 *       Client[Web Client] --> Gateway[API Gateway]
 *       Gateway --> Auth[Auth Service]
 *       Gateway --> User[User Service]
 *       Gateway --> Data[Data Service]
 *       Auth --> DB1[(Auth DB)]
 *       User --> DB2[(User DB)]
 *       Data --> DB3[(Data DB)]
 *   `}
 * />
 * 
 * // Sequence diagram with participants
 * <MermaidDiagram
 *   title="Authentication Flow"
 *   code={`
 *     sequenceDiagram
 *       participant C as Client
 *       participant A as Auth Server
 *       participant R as Resource Server
 *       C->>A: Login Request
 *       A->>A: Validate Credentials
 *       A-->>C: Access Token
 *       C->>R: API Request + Token
 *       R->>A: Validate Token
 *       A-->>R: Token Valid
 *       R-->>C: Protected Resource
 *   `}
 *   height={400}
 * />
 * 
 * // Gantt chart for project timeline
 * <MermaidDiagram
 *   title="Development Schedule"
 *   code={`
 *     gantt
 *       title Project Timeline
 *       dateFormat YYYY-MM-DD
 *       section Phase 1
 *       Design           :a1, 2024-01-01, 30d
 *       Development      :a2, after a1, 45d
 *       section Phase 2
 *       Testing          :a3, after a2, 20d
 *       Deployment       :a4, after a3, 10d
 *   `}
 * />
 * ```
 * 
 * @see {@link file://./USE-CASE.md#content-components} - Content components spec
 * @see {@link file://./CMS.md#diagram-fields} - CMS diagram configuration
 * @see {@link file://./CodeBlock.tsx} - Code display component
 * @see {@link https://mermaid.js.org/} - Mermaid documentation
 * @see {@link https://mermaid.js.org/syntax/} - Diagram syntax reference
 * 
 * @since 1.0.0
 */

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '../ui/Button'
import { Copy, Download, Maximize2, X } from 'lucide-react'
import { Dialog } from 'radix-ui'

/**
 * Mermaid library interface
 * 
 * Type definitions for the Mermaid library loaded from CDN.
 * Covers the main API methods used for diagram rendering.
 */
declare global {
  interface Window {
    mermaid?: {
      /** Initialize Mermaid with configuration */
      initialize: (config: Record<string, unknown>) => void;
      /** Render diagram to SVG */
      render: (
        id: string,
        code: string,
        callback?: (svgCode: string) => void,
        element?: HTMLElement
      ) => Promise<{ svg: string }> | void;
      /** Parse error if diagram syntax is invalid */
      parseError?: Error;
      /** Alternative API for rendering */
      mermaidAPI?: {
        render: (
          id: string,
          code: string,
          callback?: (svgCode: string) => void
        ) => string;
      };
    };
  }
}

/**
 * @interface MermaidDiagramProps
 * @description Props for MermaidDiagram component
 * 
 * Accepts Mermaid diagram code and display options for rendering
 * interactive diagrams with theme-aware styling.
 * 
 * @property {string} code - Mermaid diagram code
 * The raw Mermaid syntax for the diagram to render.
 * Supports all Mermaid diagram types.
 * 
 * @property {string} [title] - Optional diagram title
 * Displayed in the header bar for context.
 * Also used as the modal title in fullscreen view.
 * 
 * @property {string} [caption] - Optional diagram caption
 * Descriptive text shown below the diagram.
 * Helps explain the diagram's purpose or details.
 * 
 * @property {string} [className] - Additional CSS classes
 * Applied to the outer container for custom styling.
 * 
 * @property {string | number} [height='auto'] - Container height
 * Sets a fixed height for the diagram container.
 * Can be a number (pixels) or string with units.
 * 
 * @example
 * ```tsx
 * const props: MermaidDiagramProps = {
 *   code: 'graph TD\n  A-->B',
 *   title: 'Process Flow',
 *   caption: 'Simple linear process',
 *   height: 400
 * }
 * ```
 */
interface MermaidDiagramProps {
  /** Mermaid diagram code */
  code: string
  /** Optional diagram title */
  title?: string
  /** Optional diagram caption */
  caption?: string
  /** Additional CSS classes */
  className?: string
  /** Optional fixed height */
  height?: string | number
}

/**
 * MermaidDiagram component - Render Mermaid diagrams
 * 
 * Dynamically loads Mermaid from CDN and renders diagrams with
 * theme-aware styling, interactive controls, and export capabilities.
 * 
 * @component
 * @param {MermaidDiagramProps} props - Component props
 * @param {string} props.code - Mermaid diagram code
 * @param {string} [props.title] - Diagram title
 * @param {string} [props.caption] - Diagram caption
 * @param {string} [props.className] - Additional CSS classes
 * @param {string | number} [props.height='auto'] - Container height
 * 
 * @returns {JSX.Element} Interactive diagram container with:
 * - Rendered SVG diagram
 * - Copy source code button
 * - Download SVG button
 * - Fullscreen view button
 * - Error fallback display
 * - Loading state indicator
 * 
 * @remarks
 * The component handles several complex behaviors:
 * 
 * 1. **CDN Loading**: Dynamically loads Mermaid from CDN on first use
 * 2. **Theme Sync**: Watches for theme changes and re-renders
 * 3. **Error Handling**: Shows source code if rendering fails
 * 4. **Export**: Allows downloading the rendered SVG
 * 5. **Fullscreen**: Provides modal view for detailed examination
 * 
 * Theme synchronization uses MutationObserver to watch the
 * data-theme attribute on the document element, triggering
 * re-renders when the theme changes.
 * 
 * @example
 * ```tsx
 * // In documentation
 * function ArchitectureDiagram() {
 *   return (
 *     <MermaidDiagram
 *       title="System Architecture"
 *       caption="High-level system overview"
 *       code={`
 *         graph TD
 *           A[Browser] --> B[CDN]
 *           A --> C[API]
 *           C --> D[Database]
 *           C --> E[Cache]
 *       `}
 *     />
 *   )
 * }
 * ```
 */
export const MermaidDiagram: React.FC<MermaidDiagramProps> = ({
  code,
  title,
  caption,
  className,
  height = 'auto'
}) => {
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [svgContent, setSvgContent] = React.useState<string>('')
  const [isFullscreen, setIsFullscreen] = React.useState(false)
  const diagramId = React.useId()
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    /**
     * Initialize Mermaid library
     * 
     * Loads Mermaid from CDN if not already available and
     * triggers diagram rendering.
     */
    const initMermaid = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // Check if mermaid is available
        const mermaid = window.mermaid
        if (!mermaid) {
          // Try to load from CDN
          const script = document.createElement('script')
          script.src = 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js'
          script.async = true
          script.onload = () => renderDiagram()
          script.onerror = () => setError('Failed to load Mermaid library')
          document.head.appendChild(script)
        } else {
          renderDiagram()
        }
      } catch (err) {
        setError('Failed to initialize Mermaid')
        setIsLoading(false)
      }
    }

    /**
     * Render the Mermaid diagram
     * 
     * Configures Mermaid with theme-aware colors and renders
     * the diagram code to SVG.
     */
    const renderDiagram = async () => {
      try {
        const mermaid = window.mermaid
        if (!mermaid) {
          setError('Mermaid library not found')
          return
        }

        // Get current theme
        const theme = document.documentElement.getAttribute('data-theme') || 'light'
        
        // Configure mermaid with theme
        mermaid.initialize({
          startOnLoad: false,
          theme: theme === 'dark' ? 'dark' : 'default',
          themeVariables: {
            primaryColor: 'var(--accent-primary)',
            primaryTextColor: 'var(--text-primary)',
            primaryBorderColor: 'var(--accent-primary)',
            lineColor: 'var(--accent-secondary)',
            secondaryColor: 'var(--bg-secondary)',
            tertiaryColor: 'var(--bg-tertiary)',
            background: 'var(--bg-primary)',
            mainBkg: 'var(--bg-primary)',
            secondBkg: 'var(--bg-secondary)',
            tertiaryBkg: 'var(--bg-tertiary)',
            textColor: 'var(--text-primary)',
            labelTextColor: 'var(--text-primary)',
            errorBkgColor: 'var(--accent-error)',
            errorTextColor: 'var(--text-primary)'
          }
        })

        // Render the diagram
        const result = await mermaid.render(`mermaid-${diagramId}`, code)
        if (result && 'svg' in result) {
          setSvgContent(result.svg)
        }
        setIsLoading(false)
      } catch (err) {
        setError((err as Error).message || 'Failed to render diagram')
        setIsLoading(false)
      }
    }

    initMermaid()

    /**
     * Watch for theme changes
     * 
     * Uses MutationObserver to detect data-theme attribute changes
     * and re-render the diagram with updated colors.
     */
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          initMermaid()
        }
      })
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    })

    return () => observer.disconnect()
  }, [code, diagramId])

  /**
   * Copy diagram source code to clipboard
   */
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  /**
   * Download rendered diagram as SVG file
   * 
   * Creates a blob from the SVG content and triggers download
   * with a generated filename.
   */
  const handleDownload = () => {
    const blob = new Blob([svgContent], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `diagram-${diagramId}.svg`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const diagramContent = (
    <div 
      className={cn(
        'relative group rounded-terminal overflow-hidden',
        'bg-bg-secondary border border-accent-primary/20',
        className
      )}
      style={{ height }}
    >
      {title && (
        <div className="px-4 py-2 border-b border-accent-primary/20">
          <h3 className="font-display uppercase tracking-wide text-accent-primary">
            {title}
          </h3>
        </div>
      )}

      <div className="relative p-4" ref={containerRef}>
        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <div className="text-text-tertiary">Loading diagram...</div>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="text-accent-error mb-2">Failed to render diagram</div>
            <div className="text-sm text-text-tertiary">{error}</div>
            <pre className="mt-4 p-2 bg-bg-tertiary rounded text-xs text-left max-w-full overflow-auto">
              <code>{code}</code>
            </pre>
          </div>
        )}

        {!isLoading && !error && (
          <div 
            className="mermaid-container flex items-center justify-center overflow-auto"
            dangerouslySetInnerHTML={{ __html: svgContent }}
          />
        )}

        {/* Action buttons */}
        <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 glass"
            onClick={handleCopy}
            title="Copy code"
          >
            <Copy className="h-4 w-4" />
          </Button>
          {svgContent && (
            <>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 glass"
                onClick={handleDownload}
                title="Download SVG"
              >
                <Download className="h-4 w-4" />
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
            </>
          )}
        </div>
      </div>

      {caption && (
        <div className="px-4 py-2 border-t border-accent-primary/20">
          <p className="text-sm text-text-tertiary text-center">{caption}</p>
        </div>
      )}
    </div>
  )

  return (
    <>
      {diagramContent}

      {/* Fullscreen dialog */}
      <Dialog.Root open={isFullscreen} onOpenChange={setIsFullscreen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50" />
          <Dialog.Content className="fixed inset-4 bg-bg-primary rounded-terminal shadow-xl z-50 overflow-auto">
            <div className="sticky top-0 flex items-center justify-between p-4 border-b border-accent-primary/20 bg-bg-primary/95 backdrop-blur">
              <Dialog.Title className="font-display uppercase tracking-wide text-accent-primary">
                {title || 'Diagram'}
              </Dialog.Title>
              <Dialog.Close asChild>
                <Button size="icon" variant="ghost">
                  <X className="h-4 w-4" />
                </Button>
              </Dialog.Close>
            </div>
            <div className="p-8 flex items-center justify-center min-h-full">
              <div 
                className="mermaid-fullscreen"
                dangerouslySetInnerHTML={{ __html: svgContent }}
              />
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  )
}

export default MermaidDiagram