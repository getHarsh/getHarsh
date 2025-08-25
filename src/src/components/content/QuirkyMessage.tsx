/**
 * @fileoverview QuirkyMessage - Personality-filled error and empty state messages
 * @module components/content/QuirkyMessage
 * 
 * @description
 * A fun, personality-driven component for displaying error pages, empty states,
 * and loading messages with retrofuturistic styling and randomized quirky content.
 * Provides memorable user experiences during typically frustrating moments.
 * 
 * This component transforms error states and empty content scenarios into
 * delightful moments by injecting personality and humor into the getHarsh
 * ecosystem. It maintains brand voice while reducing user frustration through
 * engaging, memorable messages that align with the retrofuturistic aesthetic.
 * 
 * @architecture
 * ```
 * QuirkyMessage System
 *       ├── Message Database
 *       │     ├── 404 messages (3)
 *       │     ├── 500 messages (3)
 *       │     ├── Offline messages (2)
 *       │     ├── Empty messages (2)
 *       │     └── Loading messages (2)
 *       ├── Visual Components
 *       │     ├── Animated icon
 *       │     ├── Title + message
 *       │     ├── ASCII decoration
 *       │     └── Error code
 *       ├── Actions
 *       │     ├── Home button
 *       │     └── Retry button
 *       └── Helper Components
 *             ├── NotFoundPage
 *             ├── ServerErrorPage
 *             ├── EmptyState
 *             └── LoadingState
 * 
 * Message Flow:
 * Variant → Random selection → Icon + text → Animated display
 * Custom → Override messages → User content → Display
 * ```
 * 
 * @proto-integration
 * Maps to error handling and UX configurations:
 * 
 * - **ErrorConfig** (errors.proto)
 *   - `error_pages.404`: Custom not found
 *   - `error_pages.500`: Server error
 *   - `error_pages.offline`: Connection lost
 *   - `error_pages.personality`: Quirky enabled
 * 
 * - **UXConfig** (ux.proto)
 *   - `empty_states.style`: 'quirky'
 *   - `loading_states.messages`: true
 *   - `error_recovery.retry`: Button enabled
 *   - `navigation.home_button`: true
 * 
 * - **BrandConfig** (brand.proto)
 *   - `voice.tone`: 'friendly-technical'
 *   - `humor.level`: 'moderate'
 *   - `references.tech`: true
 *   - `references.gaming`: true
 * 
 * - **ThemeConfig** (theme.proto)
 *   - `animations.float`: Icon floating
 *   - `animations.pulse`: Glow effect
 *   - `decorations.ascii`: Terminal style
 *   - `colors.error`: accent-primary
 * 
 * @hook-integration
 * While QuirkyMessage doesn't use external hooks, parent components often use:
 * 
 * - **useGTM()**: Track error page views
 * - **useRouter()**: Navigation context
 * - **useRetry()**: Retry logic patterns
 * 
 * @ecosystem-integration
 * - **Used by**: 404.tsx, 500.tsx, SearchEmpty, LoadingScreens
 * - **Navigation**: Gatsby Link for routing
 * - **Icons**: Lucide React for visuals
 * - **Animations**: CSS keyframes (float, pulse)
 * - **Error Tracking**: GTM events for errors
 * 
 * @features
 * - **6 Message Variants**: Different scenarios
 * - **Random Selection**: Fresh experience
 * - **Custom Override**: User messages
 * - **Animated Icons**: Visual interest
 * - **Action Buttons**: Recovery options
 * - **ASCII Art**: Terminal aesthetic
 * - **Error Codes**: Technical detail
 * - **Helper Components**: Pre-built pages
 * - **Responsive**: Mobile-friendly
 * - **Personality**: Brand voice
 * 
 * @message-variants
 * ```
 * 404 (Not Found):
 *   - Digital void theme
 *   - Parallel universe jokes
 *   - Mario castle reference
 * 
 * 500 (Server Error):
 *   - Hamster wheel servers
 *   - Coffee-powered infrastructure
 *   - Binary communication
 * 
 * Offline:
 *   - Digital detox philosophy
 *   - Floating packets metaphor
 * 
 * Empty:
 *   - Zen garden minimalism
 *   - Future awesomeness placeholder
 * 
 * Loading:
 *   - Speed of thought vs light
 *   - Digital realm summoning
 * 
 * Custom:
 *   - User-provided content
 *   - Full control over messaging
 * ```
 * 
 * @humor-guidelines
 * - Keep it light and friendly
 * - Tech-savvy but accessible
 * - Never blame the user
 * - Offer helpful suggestions
 * - Maintain brand voice
 * 
 * @visual-design
 * ```
 * Layout:
 *   [Floating Icon]
 *   TITLE IN CAPS
 *   Message text
 *   Suggestion
 *   < / / / / / >
 *   [Buttons]
 *   ERROR_CODE
 * ```
 * 
 * @accessibility
 * - **ARIA Hidden**: ASCII decoration
 * - **Button Labels**: Clear actions
 * - **Focus Management**: Button focus
 * - **Screen Readers**: Full content
 * - **Keyboard Nav**: Tab through actions
 * 
 * @performance
 * - **Random Selection**: Once on mount
 * - **Lightweight**: No heavy deps
 * - **CSS Animations**: GPU-accelerated
 * - **Lazy Icons**: Tree-shaken imports
 * 
 * @dos
 * - Use appropriate variant for context
 * - Provide helpful suggestions
 * - Keep messages friendly
 * - Test random message selection
 * - Include recovery actions
 * 
 * @donts
 * - Don't blame users for errors
 * - Don't use technical jargon only
 * - Don't remove personality
 * - Don't forget mobile testing
 * - Don't override humor unnecessarily
 * 
 * @example
 * ```tsx
 * // In Gatsby 404 page
 * export default function NotFound() {
 *   return (
 *     <Layout>
 *       <QuirkyMessage 
 *         variant="404"
 *         showHomeButton={true}
 *       />
 *     </Layout>
 *   )
 * }
 * 
 * // Custom error boundary
 * class ErrorBoundary extends React.Component {
 *   render() {
 *     if (this.state.hasError) {
 *       return (
 *         <QuirkyMessage
 *           variant="500"
 *           showRetryButton
 *           onRetry={() => window.location.reload()}
 *         />
 *       )
 *     }
 *     return this.props.children
 *   }
 * }
 * 
 * // Search results empty state
 * {results.length === 0 && (
 *   <QuirkyMessage
 *     variant="custom"
 *     title="No matches found"
 *     message="Your search skills are too advanced for our simple database"
 *     suggestion="Try broader terms or browse categories"
 *     showHomeButton={false}
 *   />
 * )}
 * ```
 * 
 * @see {@link file://./USE-CASE.md#error-pages} - Error page specifications
 * @see {@link file://./SearchEmpty.tsx} - Search empty state
 * @see {@link file://../ui/Button.tsx} - Button component
 * @see {@link https://www.nngroup.com/articles/error-message-guidelines/} - Error message UX
 * 
 * @since 1.0.0
 */

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '../ui/Button'
import { Link } from 'gatsby'
import { 
  AlertCircle, 
  Coffee, 
  Zap, 
  Ghost, 
  Sparkles,
  Terminal,
  Cpu,
  Binary,
  Code,
  RefreshCw,
  Home
} from 'lucide-react'

/**
 * @interface QuirkyMessageProps
 * @description Props for QuirkyMessage component
 * 
 * Configuration for displaying error and empty state messages
 * with personality and helpful recovery options.
 * 
 * @property {'404' | '500' | 'offline' | 'empty' | 'loading' | 'custom'} [variant='404'] - Message variant
 * Determines which set of quirky messages to use.
 * 'custom' allows full control over content.
 * 
 * @property {string} [title] - Custom title
 * Overrides the randomly selected quirky title.
 * 
 * @property {string} [message] - Custom message
 * Overrides the randomly selected quirky message.
 * 
 * @property {string} [suggestion] - Custom suggestion text
 * Additional helpful text below the main message.
 * 
 * @property {boolean} [showHomeButton=true] - Show home navigation
 * Displays button to return to homepage.
 * 
 * @property {boolean} [showRetryButton=false] - Show retry button
 * Displays button to retry the failed action.
 * 
 * @property {() => void} [onRetry] - Retry callback
 * Function called when retry button is clicked.
 * 
 * @property {string} [className] - Additional CSS classes
 * Applied to the outer container.
 * 
 * @example
 * ```tsx
 * const props: QuirkyMessageProps = {
 *   variant: '404',
 *   showHomeButton: true,
 *   showRetryButton: false,
 *   className: 'my-8'
 * }
 * ```
 */
interface QuirkyMessageProps {
  /** Message variant type */
  variant?: '404' | '500' | 'offline' | 'empty' | 'loading' | 'custom'
  /** Custom title (overrides quirky message) */
  title?: string
  /** Custom message (overrides quirky message) */
  message?: string
  /** Custom suggestion text */
  suggestion?: string
  /** Show button to navigate home */
  showHomeButton?: boolean
  /** Show retry button */
  showRetryButton?: boolean
  /** Retry callback function */
  onRetry?: () => void
  /** Additional CSS classes */
  className?: string
}

/**
 * Quirky messages database for different error states
 * 
 * Collection of humorous, personality-filled messages for various
 * error and empty states. Each variant has multiple options for
 * random selection to keep the experience fresh.
 * 
 * @const {Object} quirkyMessages
 */
const quirkyMessages = {
  '404': [
    {
      icon: Ghost,
      title: "404: Page got lost in the digital void",
      message: "This page decided to take an interdimensional vacation. We're still waiting for its postcard.",
      suggestion: "Maybe try the navigation menu? It's more reliable than quantum teleportation."
    },
    {
      icon: Terminal,
      title: "Error 404: Reality.exe has stopped responding",
      message: "The page you're looking for exists in a parallel universe where this link actually works.",
      suggestion: "Have you tried turning the internet off and on again?"
    },
    {
      icon: Cpu,
      title: "404: This page is in another castle",
      message: "Our princess... err, page... seems to have been moved by a particularly mischievous Bowser.",
      suggestion: "The home page is a safe place. No Koopa Troopas there."
    }
  ],
  '500': [
    {
      icon: Zap,
      title: "500: The hamsters powering our servers need a break",
      message: "They've been running on their wheels all day. Give them a moment to catch their breath.",
      suggestion: "A quick refresh might wake them up from their power nap."
    },
    {
      icon: Coffee,
      title: "Error 500: Server needs more coffee",
      message: "Our server is having an existential crisis. It's questioning whether it's a teapot or a coffee maker.",
      suggestion: "Try again in a moment. We're brewing a fresh pot of solutions."
    },
    {
      icon: Binary,
      title: "500: Server speaks only in 1s and 0s right now",
      message: "01010011 01101111 01110010 01110010 01111001... Translation: 'Sorry, having a binary moment.'",
      suggestion: "Human-readable responses will resume shortly."
    }
  ],
  'offline': [
    {
      icon: Sparkles,
      title: "You're offline, but your imagination isn't",
      message: "The internet can't reach you here, but that's okay. Sometimes disconnection is connection.",
      suggestion: "Check your WiFi, or enjoy this moment of digital detox."
    },
    {
      icon: AlertCircle,
      title: "Connection lost in the æther",
      message: "Your packets are floating somewhere between here and the cloud. We've sent a search party.",
      suggestion: "Reconnect to continue your digital journey."
    }
  ],
  'empty': [
    {
      icon: Code,
      title: "Nothing here but elegant emptiness",
      message: "Like a zen garden of data, this space is intentionally blank. Or maybe we forgot to add content.",
      suggestion: "Check back later, or enjoy the minimalism."
    },
    {
      icon: Sparkles,
      title: "This space reserved for future awesomeness",
      message: "We're still painting the pixels and arranging the bits. Great things take time.",
      suggestion: "Come back soon for the grand reveal!"
    }
  ],
  'loading': [
    {
      icon: RefreshCw,
      title: "Loading at the speed of thought",
      message: "Which, admittedly, is slower than the speed of light. We're working on it.",
      suggestion: "Patience is a virtue, especially in the digital realm."
    },
    {
      icon: Cpu,
      title: "Summoning data from the digital realm",
      message: "The bytes are assembling themselves into something meaningful. Almost there...",
      suggestion: "Great things come to those who wait (just a few more nanoseconds)."
    }
  ]
}

/**
 * QuirkyMessage component - Personality-filled error and empty states
 * 
 * Displays error messages, empty states, and loading indicators with
 * humor and personality to improve user experience during frustrating moments.
 * 
 * @component
 * @param {QuirkyMessageProps} props - Component props
 * @param {'404' | '500' | 'offline' | 'empty' | 'loading' | 'custom'} [props.variant='404'] - Message type
 * @param {string} [props.title] - Custom title
 * @param {string} [props.message] - Custom message
 * @param {string} [props.suggestion] - Custom suggestion
 * @param {boolean} [props.showHomeButton=true] - Show home button
 * @param {boolean} [props.showRetryButton=false] - Show retry button
 * @param {() => void} [props.onRetry] - Retry callback
 * @param {string} [props.className] - Additional CSS classes
 * 
 * @returns {JSX.Element} Error/empty state display containing:
 * - Animated floating icon
 * - Quirky title and message
 * - Optional suggestion text
 * - ASCII art decoration
 * - Action buttons (home/retry)
 * - Terminal-style error code
 * 
 * @remarks
 * The component randomly selects one message from the variant's
 * collection on mount, ensuring variety across page loads.
 * Custom messages override the quirky selections.
 * 
 * @example
 * ```tsx
 * // 404 page
 * function NotFound() {
 *   return (
 *     <QuirkyMessage 
 *       variant="404"
 *       showHomeButton={true}
 *     />
 *   )
 * }
 * ```
 */
export const QuirkyMessage: React.FC<QuirkyMessageProps> = ({
  variant = '404',
  title: customTitle,
  message: customMessage,
  suggestion: customSuggestion,
  showHomeButton = true,
  showRetryButton = false,
  onRetry,
  className
}) => {
  /**
   * Get random quirky message for the variant
   * 
   * Selects a random message from the variant's collection.
   * Returns null for custom variant.
   */
  const getRandomMessage = React.useCallback(() => {
    if (variant === 'custom') return null
    const messages = quirkyMessages[variant] || quirkyMessages['404']
    return messages[Math.floor(Math.random() * messages.length)]
  }, [variant])

  const [quirkyMsg] = React.useState(getRandomMessage)
  
  const Icon = quirkyMsg?.icon || AlertCircle
  const displayTitle = customTitle || quirkyMsg?.title || 'Oops!'
  const displayMessage = customMessage || quirkyMsg?.message || 'Something unexpected happened.'
  const displaySuggestion = customSuggestion || quirkyMsg?.suggestion

  return (
    <div className={cn(
      'flex flex-col items-center justify-center',
      'min-h-[400px] p-8 text-center',
      className
    )}>
      {/* Animated icon */}
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-accent-primary/20 blur-xl rounded-full animate-pulse" />
        <Icon className="relative w-16 h-16 text-accent-primary animate-float" />
      </div>

      {/* Title */}
      <h1 className="font-display uppercase text-2xl sm:text-3xl text-accent-primary mb-4 tracking-wide">
        {displayTitle}
      </h1>

      {/* Message */}
      <p className="text-text-secondary max-w-md mb-4">
        {displayMessage}
      </p>

      {/* Suggestion */}
      {displaySuggestion && (
        <p className="text-sm text-text-tertiary mb-8 max-w-sm">
          {displaySuggestion}
        </p>
      )}

      {/* ASCII art decoration */}
      <pre className="font-mono text-xs text-accent-primary/30 mb-6 select-none" aria-hidden="true">
        {`< / / / / / / / / / / / / / / / >`}
      </pre>

      {/* Action buttons */}
      <div className="flex gap-4">
        {showHomeButton && (
          <Button asChild variant="primary">
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Link>
          </Button>
        )}
        
        {showRetryButton && onRetry && (
          <Button onClick={onRetry} variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        )}
      </div>

      {/* Terminal-style error code */}
      {variant !== 'custom' && variant !== 'loading' && (
        <div className="mt-8 px-4 py-2 bg-bg-secondary rounded-terminal border border-accent-primary/20">
          <code className="font-mono text-xs text-text-tertiary">
            ERROR_CODE: {variant.toUpperCase()}_
            {Math.random().toString(36).substring(2, 8).toUpperCase()}
          </code>
        </div>
      )}
    </div>
  )
}

/**
 * NotFoundPage component - Pre-built 404 error page
 * 
 * Complete 404 page with quirky messaging and home navigation.
 * 
 * @component
 * @returns {JSX.Element} Full-screen 404 error page
 * 
 * @example
 * ```tsx
 * // In Gatsby pages/404.tsx
 * export { NotFoundPage as default } from '@/components/content/QuirkyMessage'
 * ```
 */
export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-primary">
      <QuirkyMessage variant="404" />
    </div>
  )
}

/**
 * ServerErrorPage component - Pre-built 500 error page
 * 
 * Complete server error page with retry functionality.
 * 
 * @component
 * @returns {JSX.Element} Full-screen 500 error page
 * 
 * @example
 * ```tsx
 * // In error boundary
 * if (hasError) return <ServerErrorPage />
 * ```
 */
export const ServerErrorPage: React.FC = () => {
  const handleRetry = () => {
    window.location.reload()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-primary">
      <QuirkyMessage 
        variant="500" 
        showRetryButton 
        onRetry={handleRetry}
      />
    </div>
  )
}

/**
 * EmptyState component - Helper for empty content scenarios
 * 
 * Simplified wrapper for displaying empty state messages.
 * 
 * @component
 * @param {{ title?: string; message?: string; className?: string }} props - Component props
 * @param {string} [props.title] - Empty state title
 * @param {string} [props.message] - Empty state message
 * @param {string} [props.className] - Additional CSS classes
 * 
 * @returns {JSX.Element} Empty state display
 * 
 * @example
 * ```tsx
 * <EmptyState 
 *   title="No results"
 *   message="Try different filters"
 * />
 * ```
 */
export const EmptyState: React.FC<{
  title?: string
  message?: string
  className?: string
}> = ({ title, message, className }) => {
  return (
    <QuirkyMessage
      variant="empty"
      title={title}
      message={message}
      showHomeButton={false}
      className={className}
    />
  )
}

/**
 * LoadingState component - Helper for loading indicators
 * 
 * Simplified wrapper for displaying loading messages.
 * 
 * @component
 * @param {{ message?: string; className?: string }} props - Component props
 * @param {string} [props.message] - Loading message
 * @param {string} [props.className] - Additional CSS classes
 * 
 * @returns {JSX.Element} Loading state display
 * 
 * @example
 * ```tsx
 * <LoadingState message="Fetching data..." />
 * ```
 */
export const LoadingState: React.FC<{
  message?: string
  className?: string
}> = ({ message, className }) => {
  return (
    <QuirkyMessage
      variant="loading"
      message={message}
      showHomeButton={false}
      className={className}
    />
  )
}

export default QuirkyMessage