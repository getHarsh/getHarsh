/**
 * @fileoverview FederatedSearch - Cross-domain search aggregation component
 * @module components/search/FederatedSearch
 * 
 * @description
 * Component that performs federated search across multiple ecosystem domains,
 * aggregating results from different sites into a unified view. Enables
 * ecosystem-wide content discovery while maintaining privacy through client-side
 * search.
 * 
 * This component orchestrates parallel searches across all configured ecosystem
 * domains, merges results, handles deduplication, and provides a unified display
 * with proper error handling and loading states.
 * 
 * @architecture
 * ```
 * FederatedSearch (this)
 *       ├── useFederation() hook
 *       │     ├── Domain Discovery
 *       │     ├── Parallel Searches
 *       │     └── Result Merging
 *       ├── Loading State
 *       ├── Results Header
 *       ├── SearchResults (merged)
 *       └── Error Notification
 * 
 * Federation Flow:
 * Query → [Domain1, Domain2, ...] → Parallel Fetch → Merge → Display
 * ```
 * 
 * @proto-integration
 * Maps to federation proto configurations:
 * 
 * - **FederationConfig** (search.proto)
 *   - `enabled`: Master toggle for federation
 *   - `domains[]`: List of searchable domains
 *   - `timeout_ms`: Per-domain timeout (default: 3000)
 *   - `max_results_per_domain`: Result limit per domain
 *   - `deduplication`: Enable result deduplication
 * 
 * - **SearchConfig** (search.proto)
 *   - `search_features.enable_federated`: Feature flag
 *   - `search_index.federated_endpoints`: Domain endpoints
 *   - `search_display.show_domain_source`: Show result source
 * 
 * - **DomainConfig** (domain.proto)
 *   - `subdomain`: Domain identifier (e.g., 'blog')
 *   - `federation.searchable`: Is domain searchable
 *   - `federation.search_endpoint`: Search API path
 * 
 * @hook-integration
 * Uses the useFederation hook:
 * 
 * - **useFederation()**
 *   - `federatedResults`: Array of domain results
 *   - `searchFederated()`: Trigger parallel searches
 *   - `isLoading`: Loading state across all domains
 *   - `hasFederation`: Whether federation is available
 *   - `getMergedResults()`: Deduplicated merged results
 * 
 * - **useAccessibility()**
 *   - `announce()`: Screen reader announcements
 * 
 * @ecosystem-integration
 * - **Used by**: SearchInterface for ecosystem-wide search
 * - **Domains**: blog.getHarsh.in, blog.causality.in, blog.daostudio.in
 * - **Projects**: Individual project documentation sites
 * - **Data flow**: Client-side fetch → JSON index → FlexSearch
 * - **Privacy**: Zero server-side search, all client-side
 * - **Performance**: Parallel fetching with 3s timeout
 * 
 * @features
 * - **Parallel Search**: Concurrent domain searches
 * - **Result Merging**: Combines results from all domains
 * - **Deduplication**: Removes duplicate content
 * - **Loading States**: Per-domain and aggregate
 * - **Error Handling**: Graceful partial failures
 * - **Statistics**: Shows domain and result counts
 * - **Accessibility**: ARIA announcements for results
 * 
 * @federation-architecture
 * ```
 * 1. Discovery Phase:
 *    - Auto-detect ecosystem domains
 *    - Check federation.searchable flag
 *    - Build endpoint list
 * 
 * 2. Search Phase:
 *    - Parallel fetch to all endpoints
 *    - 3-second timeout per domain
 *    - Continue on partial failures
 * 
 * 3. Merge Phase:
 *    - Combine all results
 *    - Deduplicate by URL/ID
 *    - Sort by relevance score
 * 
 * 4. Display Phase:
 *    - Show merged results
 *    - Display statistics
 *    - Error notifications
 * ```
 * 
 * @cross-domain-behavior
 * ```
 * Searchable Domains:
 * - blog.getHarsh.in: Personal blog content
 * - blog.causality.in: Causality research
 * - blog.daostudio.in: DAO Studio updates
 * - *.getHarsh.in: Project subdomains
 * 
 * Each domain maintains:
 * - /search-index.json: FlexSearch index
 * - CORS headers for cross-origin
 * - Consistent result schema
 * ```
 * 
 * @error-handling
 * - **Network Errors**: Continue with partial results
 * - **Timeouts**: 3s timeout, show available results
 * - **CORS Issues**: Skip domain, notify user
 * - **Parse Errors**: Log and skip malformed data
 * - **Empty Results**: Hide component entirely
 * 
 * @accessibility
 * - **Loading State**: aria-busy and live region
 * - **Result Count**: Announced to screen readers
 * - **Error Messages**: role="alert" for issues
 * - **Region Labels**: Proper ARIA labeling
 * - **Focus Management**: Maintains focus context
 * 
 * @performance
 * - **Parallel Fetching**: All domains concurrently
 * - **Timeout**: 3s max per domain
 * - **Caching**: Session-level result cache
 * - **Deduplication**: O(n) merge algorithm
 * - **Lazy Loading**: Only when federation enabled
 * 
 * @dos
 * - Enable for ecosystem-wide search
 * - Handle partial failures gracefully
 * - Show domain statistics
 * - Announce results to screen readers
 * - Cache results during session
 * 
 * @donts
 * - Don't wait for all domains to complete
 * - Don't fail entirely on single domain error
 * - Don't search with <2 character queries
 * - Don't show if no federation available
 * - Don't duplicate local domain results
 * 
 * @example
 * ```tsx
 * // Standard implementation in SearchInterface
 * <FederatedSearch
 *   query={searchQuery}
 *   enabled={enableFederation}
 *   onResultClick={(result) => {
 *     // Track cross-domain click
 *     trackEvent({
 *       event: 'federated_result_click',
 *       domain: result.domain,
 *       query: searchQuery
 *     })
 *     // Navigate to result
 *     window.location.href = result.url
 *   }}
 * />
 * 
 * // Conditional based on user preference
 * {userPreferences.searchAcrossDomains && (
 *   <FederatedSearch
 *     query={query}
 *     enabled={query.length >= 2}
 *   />
 * )}
 * ```
 * 
 * @see {@link file://./SEARCH.md#federated-search} - Federation specification
 * @see {@link file://./SearchInterface.tsx} - Parent component
 * @see {@link file://../../hooks/search/useFederation.ts} - Federation hook
 * @see {@link file://./SearchResults.tsx} - Results display component
 * 
 * @since 1.0.0
 */

import React, { useEffect } from 'react'
import { useFederation } from '../../hooks/search'
import { SearchResults } from './SearchResults'
import { getAriaProperty } from '@/utils/mappings'
import { useAccessibility } from '@/hooks/useAccessibility'

/**
 * @interface FederatedSearchProps
 * @description Props for FederatedSearch component
 * 
 * Configuration for cross-domain federated search, controlling
 * when and how to search across ecosystem domains.
 * 
 * @property {string} query - Search query to federate
 * Must be at least 2 characters to trigger federation.
 * Passed to all domain search endpoints.
 * 
 * @property {boolean} [enabled=true] - Enable/disable federation
 * Master toggle for federation feature. When false, component
 * returns null without performing any searches.
 * 
 * @property {(result: any) => void} [onResultClick] - Callback when federated result is clicked
 * Called when user clicks on a federated search result.
 * Receives the complete result object including domain source.
 * 
 * @property {string} [className] - Additional CSS classes
 * Applied to root container div for custom styling.
 * 
 * @example
 * ```tsx
 * const props: FederatedSearchProps = {
 *   query: 'gatsby tutorial',
 *   enabled: true,
 *   onResultClick: (result) => {
 *     console.log(`Clicked: ${result.title} from ${result.domain}`)
 *     window.location.href = result.url
 *   },
 *   className: 'mt-8 border-t pt-8'
 * }
 * ```
 */
interface FederatedSearchProps {
  /** Search query to federate - minimum 2 characters */
  query: string
  /** Enable/disable federation - master toggle */
  enabled?: boolean
  /** Callback when federated result is clicked - receives full result object */
  onResultClick?: (result: any) => void
  /** Additional CSS classes for root container */
  className?: string
}

/**
 * FederatedSearch component - Cross-domain search aggregation
 * 
 * Orchestrates parallel searches across ecosystem domains and displays
 * merged results. Handles loading states, errors, and accessibility
 * announcements for a complete federated search experience.
 * 
 * @component
 * @param {FederatedSearchProps} props - Component props
 * @param {string} props.query - Search query to federate
 * @param {boolean} [props.enabled=true] - Enable federation
 * @param {(result: any) => void} [props.onResultClick] - Result click handler
 * @param {string} [props.className=''] - Additional CSS classes
 * 
 * @returns {JSX.Element | null} Federated search UI containing:
 * - Loading spinner during search
 * - Results header with statistics
 * - SearchResults component with merged results
 * - Error notification for partial failures
 * Returns null if disabled, no federation, or no results.
 * 
 * @remarks
 * The component lifecycle:
 * 1. Checks if federation is enabled and available
 * 2. Triggers parallel searches when query changes
 * 3. Shows loading state during fetch
 * 4. Displays merged, deduplicated results
 * 5. Announces results to screen readers
 * 6. Shows error notification for partial failures
 * 
 * @example
 * ```tsx
 * // In SearchInterface
 * function SearchModal() {
 *   const [query, setQuery] = useState('')
 *   const [enableFederation, setEnableFederation] = useState(true)
 *   
 *   return (
 *     <>
 *       <SearchInput value={query} onChange={setQuery} />
 *       <SearchResults results={localResults} query={query} />
 *       
 *       {/* Federated results below local */}
 *       <FederatedSearch
 *         query={query}
 *         enabled={enableFederation}
 *         onResultClick={(result) => {
 *           // Navigate to external domain
 *           window.location.href = result.url
 *         }}
 *         className="mt-8 pt-8 border-t"
 *       />
 *     </>
 *   )
 * }
 * ```
 */
export const FederatedSearch: React.FC<FederatedSearchProps> = ({
  query,
  enabled = true,
  onResultClick,
  className = ''
}) => {
  const {
    federatedResults,
    searchFederated,
    isLoading,
    hasFederation,
    getMergedResults
  } = useFederation()
  
  const { announce } = useAccessibility()

  /**
   * Trigger federated search when conditions are met
   * 
   * Initiates parallel searches across all configured domains
   * when federation is enabled, query is valid, and federation
   * endpoints are available.
   */
  useEffect(() => {
    if (enabled && query && query.length >= 2 && hasFederation) {
      searchFederated(query)
    }
  }, [query, enabled, hasFederation, searchFederated])

  /**
   * Get merged and deduplicated results from all domains
   */
  const mergedResults = getMergedResults()
  
  /**
   * Announce federated search results to screen readers
   * 
   * Provides accessibility feedback when federated results
   * are loaded, announcing the count for screen reader users.
   */
  useEffect(() => {
    if (enabled && hasFederation && !isLoading && mergedResults.length > 0) {
      const message = getAriaProperty('FederatedSearchPatterns', 'announcements.results', 
        'Found {count} results in {time}ms')
        .replace('{count}', mergedResults.length.toString())
        .replace('{time}', '500') // Approximate time
      announce(message, 'polite')
    }
  }, [enabled, hasFederation, isLoading, mergedResults.length, announce])

  if (!enabled || !hasFederation) {
    return null
  }

  if (isLoading) {
    return (
      <div className={`text-center py-8 ${className}`} aria-live="polite" aria-busy="true">
        <div className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span aria-hidden="true">Searching across domains...</span>
          <span className="sr-only">{getAriaProperty('FederatedSearchPatterns', 'announcements.searching', 'Searching {scope}...').replace('{scope}', 'ecosystem domains')}</span>
        </div>
      </div>
    )
  }

  if (mergedResults.length === 0) {
    return null
  }

  return (
    <div className={className}>
      <div className="mb-4">
        <h3 
          className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider"
          id="federated-results-heading"
        >
          Results from other domains
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
          Found {mergedResults.length} results across {federatedResults.length} domains
        </p>
      </div>
      
      <div 
        role="region"
        aria-labelledby="federated-results-heading"
        aria-live="polite"
      >
        <SearchResults
          results={mergedResults}
          query={query}
          onResultClick={(index) => onResultClick?.(mergedResults[index])}
          groupByType={false}
        />
      </div>

      {federatedResults.some(r => r.error) && (
        <div 
          className="mt-4 text-xs text-orange-600 dark:text-orange-400"
          role="alert"
          aria-live="polite"
        >
          Some domains could not be searched due to connectivity issues
        </div>
      )}
    </div>
  )
}