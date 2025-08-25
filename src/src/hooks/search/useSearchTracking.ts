/**
 * @fileoverview Search Analytics Tracking Hook
 * @module hooks/search/useSearchTracking
 * 
 * @description
 * Provides comprehensive analytics tracking for search interactions in the getHarsh ecosystem.
 * This hook captures all search-related events including queries, results, clicks, filters,
 * and federation to optimize search relevance and user experience.
 * 
 * Search analytics help understand:
 * - What users are searching for (query analysis)
 * - How effective search results are (click-through rates)
 * - Which filters are most useful (filter usage)
 * - Cross-domain discovery patterns (federation metrics)
 * - Search quality issues (empty results, errors)
 * 
 * @tracked-events
 * The hook tracks these search events:
 * - **search**: Query submitted with result count
 * - **search_result_click**: Result selected with position
 * - **search_filter**: Filter applied or removed
 * - **search_federation**: Cross-domain search results
 * - **search_empty**: No results found
 * - **search_error**: Search failure
 * - **search_suggestion_click**: Suggestion selected
 * 
 * @analytics-flow
 * 1. User enters search query → trackSearch()
 * 2. Results displayed → Result count tracked
 * 3. Filter applied → trackFilterApplied()
 * 4. Result clicked → trackSearchResultClick()
 * 5. Data sent to GTM → GA4 → Analysis
 * 
 * @ecosystem-integration
 * - GTM Integration: Extends useGTM for event tracking
 * - GA4 Analytics: Events flow to Google Analytics 4
 * - Search Interface: Used by SearchInterface component
 * - Federation: Tracks cross-domain search metrics
 * - Consent: Respects user tracking preferences
 * 
 * @metrics-collected
 * Key metrics for search optimization:
 * - **Query Volume**: Popular search terms
 * - **Result Quality**: Click-through rates by position
 * - **Filter Usage**: Most valuable filters
 * - **Federation Impact**: Cross-domain discovery
 * - **Search Failures**: Empty results and errors
 * - **Engagement**: Time to click, refinements
 * 
 * @privacy-compliance
 * - No PII in search terms
 * - Consent-aware tracking
 * - Anonymized user sessions
 * - Data retention policies
 * - GDPR/CCPA compliant
 * 
 * @dos
 * - Track all search interactions
 * - Include result position for CTR analysis
 * - Track filter combinations
 * - Monitor empty results for content gaps
 * - Track federation performance
 * 
 * @donts
 * - Don't track sensitive search terms
 * - Don't skip consent checks
 * - Don't track without user action
 * - Don't include PII in events
 * - Don't track in development
 * 
 * @example
 * ```tsx
 * const SearchComponent = () => {
 *   const {
 *     trackSearch,
 *     trackSearchResultClick,
 *     trackFilterApplied
 *   } = useSearchTracking()
 *   
 *   const handleSearch = (query: string, results: any[]) => {
 *     trackSearch(query, results.length)
 *     
 *     if (results.length === 0) {
 *       trackSearchEmpty(query)
 *     }
 *   }
 *   
 *   const handleResultClick = (result: any, index: number) => {
 *     trackSearchResultClick(
 *       index + 1,
 *       result.type,
 *       result.url,
 *       currentQuery
 *     )
 *     navigate(result.url)
 *   }
 *   
 *   const handleFilterChange = (type: string, value: string) => {
 *     trackFilterApplied(type, value)
 *     applyFilter(type, value)
 *   }
 * }
 * ```
 * 
 * @see {@link file://./SEARCH.md#analytics} - Search analytics documentation
 * @see {@link file://./src/hooks/useGTM.ts} - Base GTM tracking
 * @see {@link file://./src/utils/gtm.ts} - GTM utilities
 * @see {@link file://./src/components/search/SearchInterface.tsx} - Search UI
 * @see {@link https://developers.google.com/analytics/devguides/collection/ga4/search} - GA4 search tracking
 * 
 * @since 2.0.0
 */

import { useCallback } from 'react'
import { useGTM } from '@/hooks/useGTM'

/**
 * Search event data structure.
 * Contains all properties for search analytics.
 */
interface SearchEventData {
  event: string
  search_term?: string
  result_count?: number
  result_position?: number
  result_type?: string
  result_url?: string
  filter_type?: string
  filter_value?: string
  source_domain?: string
  federation_enabled?: boolean
  [key: string]: any
}

/**
 * Search analytics tracking hook.
 * Captures all search interactions for optimization.
 * 
 * @returns Search tracking methods
 */
export function useSearchTracking() {
  const { trackEvent } = useGTM()

  /**
   * Push search event to GTM dataLayer.
   * Adds search category and component context.
   * 
   * @param data - Event data to track
   */
  const pushEvent = useCallback((data: SearchEventData) => {
    trackEvent({
      ...data,
      category: 'Search',
      component: 'SearchInterface'
    })
  }, [trackEvent])

  /**
   * Track search query submission.
   * Captures query term and result count.
   * 
   * @param term - Search query
   * @param resultCount - Number of results found
   */
  const trackSearch = useCallback((term: string, resultCount: number) => {
    pushEvent({
      event: 'search',
      action: 'search_query',
      label: term,
      value: resultCount,
      search_term: term,
      result_count: resultCount,
      search_length: term.length,
      has_results: resultCount > 0
    })
  }, [pushEvent])

  /**
   * Track search result click.
   * Captures position for CTR analysis.
   * 
   * @param position - Result position (1-based)
   * @param type - Result type (article, project, etc.)
   * @param url - Result URL
   * @param term - Original search term
   */
  const trackSearchResultClick = useCallback((
    position: number,
    type: string,
    url: string,
    term?: string
  ) => {
    pushEvent({
      event: 'search_result_click',
      action: 'click_result',
      label: `${type}: ${url}`,
      value: position,
      result_position: position,
      result_type: type,
      result_url: url,
      search_term: term
    })
  }, [pushEvent])

  /**
   * Track search filter application.
   * Monitors filter usage patterns.
   * 
   * @param filterType - Type of filter (domain, type, etc.)
   * @param filterValue - Filter value applied
   */
  const trackFilterApplied = useCallback((
    filterType: string,
    filterValue: string
  ) => {
    pushEvent({
      event: 'search_filter',
      action: 'apply_filter',
      label: `${filterType}: ${filterValue}`,
      filter_type: filterType,
      filter_value: filterValue
    })
  }, [pushEvent])

  /**
   * Track federated search from external domain.
   * Measures cross-domain discovery.
   * 
   * @param sourceDomain - Domain providing results
   * @param resultCount - Number of federated results
   */
  const trackFederationSearch = useCallback((
    sourceDomain: string,
    resultCount: number
  ) => {
    pushEvent({
      event: 'search_federation',
      action: 'federated_search',
      label: sourceDomain,
      value: resultCount,
      source_domain: sourceDomain,
      result_count: resultCount,
      federation_enabled: true
    })
  }, [pushEvent])

  /**
   * Track empty search results.
   * Identifies content gaps.
   * 
   * @param term - Search term with no results
   */
  const trackSearchEmpty = useCallback((term: string) => {
    pushEvent({
      event: 'search_empty',
      action: 'empty_results',
      label: term,
      search_term: term,
      result_count: 0
    })
  }, [pushEvent])

  /**
   * Track search errors.
   * Monitors search reliability.
   * 
   * @param error - Error message
   * @param term - Search term that failed
   */
  const trackSearchError = useCallback((
    error: string,
    term?: string
  ) => {
    pushEvent({
      event: 'search_error',
      action: 'search_error',
      label: error,
      error_message: error,
      search_term: term
    })
  }, [pushEvent])

  /**
   * Track search suggestion click.
   * Measures suggestion effectiveness.
   * 
   * @param suggestion - Selected suggestion
   * @param originalTerm - Original search term
   */
  const trackSearchSuggestionClick = useCallback((
    suggestion: string,
    originalTerm: string
  ) => {
    pushEvent({
      event: 'search_suggestion_click',
      action: 'click_suggestion',
      label: suggestion,
      suggestion,
      original_term: originalTerm
    })
  }, [pushEvent])

  return {
    trackSearch,
    trackSearchResultClick,
    trackFilterApplied,
    trackFederationSearch,
    trackSearchEmpty,
    trackSearchError,
    trackSearchSuggestionClick
  }
}