/**
 * @fileoverview Debug Utility - Environment-aware logging system
 * @module utils/debug
 * 
 * @description
 * Centralized debug logging utility that respects environment settings
 * and provides typed logging functions for different contexts. This
 * replaces direct console usage throughout the codebase while maintaining
 * existing debug functionality.
 * 
 * Key features:
 * - Environment-aware (respects NODE_ENV)
 * - Context-specific logging (GTM, consent, errors)
 * - Type-safe logging interfaces
 * - Performance optimized (no-op in production)
 * - Preserves existing debug mode checks
 * 
 * @architecture
 * The debug system follows a hierarchical approach:
 * 1. **Environment Detection**: Check NODE_ENV and DEBUG flags
 * 2. **Context Filtering**: Enable specific debug contexts (GTM, consent)
 * 3. **Level Selection**: Route to appropriate console method
 * 4. **Format & Output**: Timestamp and context labels for clarity
 * 
 * @environment-variables
 * - **NODE_ENV**: development enables all debug output
 * - **DEBUG**: Force debug mode in any environment
 * - **GATSBY_GTM_DEBUG**: Enable GTM-specific debugging
 * - **GATSBY_CONSENT_DEBUG**: Enable consent-specific debugging
 * 
 * @ecosystem-integration
 * - GTM Tracking: Debug GTM events and data layer pushes
 * - Consent Management: Track consent state changes and cookie operations
 * - Error Tracking: Structured error logging with context
 * - Performance Monitoring: Track build times and runtime metrics
 * - Search Operations: Debug index loading and query processing
 * - Schema.org: Debug structured data generation
 * 
 * @performance
 * - Production: All debug calls become no-ops (zero overhead)
 * - Development: Minimal overhead with context filtering
 * - Timestamp generation: Cached for efficiency
 * - No string concatenation in production builds
 * 
 * @dos
 * - Use context-specific functions (gtm, consent, error)
 * - Check isEnabled() before expensive debug operations
 * - Include structured data as additional arguments
 * - Use group/groupEnd for related debug statements
 * - Time critical operations with time/timeEnd
 * 
 * @donts
 * - Don't use console.log directly in components
 * - Don't log sensitive information (PII, tokens)
 * - Don't leave debug statements in production code
 * - Don't create debug strings if disabled
 * - Don't debug in tight loops without checking isEnabled
 * 
 * @example
 * ```typescript
 * import { debug } from '@/utils/debug'
 * 
 * // GTM debugging
 * debug.gtm('Event sent', { event: 'page_view', data })
 * 
 * // Consent debugging
 * debug.consent('Consent updated', { analytics: true, marketing: false })
 * 
 * // Error logging
 * debug.error('API call failed', error, { endpoint: '/api/data' })
 * 
 * // Performance tracking
 * debug.time('IndexLoad')
 * await loadSearchIndex()
 * debug.timeEnd('IndexLoad')
 * 
 * // Grouped logging
 * debug.group('Component Lifecycle')
 * debug.log('Mounting', { props })
 * debug.log('Rendered', { state })
 * debug.groupEnd()
 * ```
 * 
 * @see {@link file://./BUILD.md#debugging} - Build-time debugging configuration
 * @see {@link file://./SERVICES.md#analytics} - GTM debugging documentation
 * @see {@link file://./src/utils/gtm-services.ts} - GTM service utilities
 * @see {@link file://./src/hooks/useGTM.ts} - GTM tracking hook
 * @see {@link file://./src/components/consent/ConsentBanner.tsx} - Consent debugging
 * 
 * @since 1.0.0
 */

/**
 * Debug configuration from environment.
 * Determines which debug contexts are active.
 */
const IS_DEBUG = process.env.NODE_ENV === 'development' || process.env.DEBUG === 'true'
const GTM_DEBUG = process.env.GATSBY_GTM_DEBUG === 'true'
const CONSENT_DEBUG = process.env.GATSBY_CONSENT_DEBUG === 'true'

/**
 * Debug context types for structured logging.
 * Each context can be independently enabled/disabled.
 */
export type DebugContext = 'gtm' | 'consent' | 'error' | 'performance' | 'general'

/**
 * Debug log level.
 * Maps to corresponding console methods.
 */
export type DebugLevel = 'log' | 'info' | 'warn' | 'error'

/**
 * Base debug function type.
 * Accepts message and optional structured data.
 */
type DebugFunction = (message: string, ...args: any[]) => void

/**
 * Debug utility interface.
 * Provides context-specific logging and utility functions.
 */
interface DebugUtility {
  // Context-specific debug functions
  gtm: DebugFunction
  consent: DebugFunction
  error: DebugFunction
  performance: DebugFunction
  log: DebugFunction
  info: DebugFunction
  warn: DebugFunction
  
  // Utility functions
  isEnabled: (context?: DebugContext) => boolean
  group: (label: string) => void
  groupEnd: () => void
  time: (label: string) => void
  timeEnd: (label: string) => void
  table: (data: any) => void
}

/**
 * Format debug message with context and timestamp.
 * Provides consistent log formatting across all contexts.
 * 
 * @param context - Debug context for categorization
 * @param message - Log message to format
 * @returns Formatted message with timestamp and context label
 */
const formatMessage = (context: DebugContext, message: string): string => {
  const timestamp = new Date().toISOString().slice(11, 23)
  const contextLabel = context.toUpperCase()
  return `[${timestamp}] [${contextLabel}] ${message}`
}

/**
 * No-op functions for production.
 * Zero overhead when debugging is disabled.
 */
const noop: DebugFunction = () => {}
const noopVoid = () => {}

/**
 * Create context-aware debug function.
 * Returns no-op in production or when context is disabled.
 * 
 * @param context - Debug context to check
 * @param level - Console method to use
 * @returns Debug function or no-op
 */
const createDebugFunction = (
  context: DebugContext,
  level: DebugLevel = 'log'
): DebugFunction => {
  // Check if debugging is enabled for this context
  const isEnabled = (): boolean => {
    if (!IS_DEBUG) return false
    
    switch (context) {
      case 'gtm':
        return GTM_DEBUG
      case 'consent':
        return CONSENT_DEBUG
      case 'error':
        return true // Always log errors in debug mode
      default:
        return true
    }
  }
  
  // Return no-op if debugging is disabled
  if (!isEnabled()) {
    return noop
  }
  
  // Return actual logging function
  return (message: string, ...args: any[]): void => {
    const formattedMessage = formatMessage(context, message)
    
    switch (level) {
      case 'error':
        console.error(formattedMessage, ...args)
        break
      case 'warn':
        console.warn(formattedMessage, ...args)
        break
      case 'info':
        console.info(formattedMessage, ...args)
        break
      default:
        console.log(formattedMessage, ...args)
    }
  }
}

/**
 * Main debug utility object.
 * Central access point for all debug operations.
 * In production, all methods become no-ops for zero overhead.
 */
export const debug: DebugUtility = {
  // Context-specific functions
  gtm: createDebugFunction('gtm'),
  consent: createDebugFunction('consent'),
  error: createDebugFunction('error', 'error'),
  performance: createDebugFunction('performance'),
  log: createDebugFunction('general'),
  info: createDebugFunction('general', 'info'),
  warn: createDebugFunction('general', 'warn'),
  
  // Utility functions
  isEnabled: (context?: DebugContext): boolean => {
    if (!IS_DEBUG) return false
    if (!context) return true
    
    switch (context) {
      case 'gtm':
        return GTM_DEBUG
      case 'consent':
        return CONSENT_DEBUG
      default:
        return true
    }
  },
  
  group: IS_DEBUG ? console.group.bind(console) : noop,
  groupEnd: IS_DEBUG ? console.groupEnd.bind(console) : noopVoid,
  time: IS_DEBUG ? console.time.bind(console) : noop,
  timeEnd: IS_DEBUG ? console.timeEnd.bind(console) : noop,
  table: IS_DEBUG ? console.table.bind(console) : noop
}

/**
 * Export individual debug functions for convenience.
 * Allows direct imports of specific debug contexts.
 */
export const debugGTM = debug.gtm
export const debugConsent = debug.consent
export const debugError = debug.error
export const debugPerformance = debug.performance
export const debugLog = debug.log

/**
 * Default export.
 * Provides full debug utility object.
 */
export default debug