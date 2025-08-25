/**
 * @fileoverview Search Filtering Hook for Faceted Search
 * @module hooks/search/useSearchFilters
 * 
 * @description
 * Provides comprehensive filtering capabilities for search results in the getHarsh ecosystem.
 * This hook implements faceted search with filters for domains, content types, date ranges,
 * tags, authors, and languages. All filters work together to provide precise result refinement.
 * 
 * The filtering system respects the proto-driven architecture, using field mappings from
 * ArticleConfig and other proto schemas to ensure consistent filtering across all content types.
 * 
 * @architecture
 * The filtering system uses a multi-faceted approach:
 * - **Domain Filters**: Filter by source domain (blog.*, project.*)
 * - **Type Filters**: Content type filtering (article, project, page)
 * - **Date Range**: Time-based filtering with start/end dates
 * - **Tag Filters**: Topic-based filtering using article tags
 * - **Author Filters**: Filter by content creators
 * - **Language Filters**: Multi-language content filtering
 * 
 * @ecosystem-integration
 * - Search Results: Filters SearchDocument arrays from FlexSearch
 * - Cross-Domain: Works with federated results from multiple domains
 * - Proto Fields: Uses fields from ArticleConfig proto schema
 * - Discovery: Integrates with discovery manifest for available options
 * - Analytics: Filter usage tracked for search optimization
 * 
 * @filter-logic
 * Filters use AND logic between categories, OR logic within:
 * - Different filter types: AND (must match all)
 * - Same filter type: OR (match any)
 * - Example: (domain1 OR domain2) AND (tag1 OR tag2) AND dateRange
 * 
 * @performance
 * - Filter application: O(n) where n = result count
 * - State updates: Optimized with useCallback
 * - Active count: Memoized with useMemo
 * - No server roundtrips: All filtering client-side
 * 
 * @dos
 * - Apply filters after search for best performance
 * - Use toggleArrayFilter for multi-select filters
 * - Track filter usage for analytics
 * - Provide filter counts in UI
 * - Clear filters when changing search context
 * 
 * @donts
 * - Don't filter before searching (reduces index efficiency)
 * - Don't apply filters to federated results twice
 * - Don't forget to handle empty filter arrays
 * - Don't ignore language filters for i18n
 * - Don't filter sensitive fields
 * 
 * @example
 * ```tsx
 * const { 
 *   filters, 
 *   toggleArrayFilter, 
 *   applyFilters,
 *   activeFilterCount 
 * } = useSearchFilters({
 *   onFilterChange: (filters) => {
 *     // Track filter changes
 *     analytics.track('search_filter_change', filters)
 *   }
 * })
 * 
 * // Apply filters to search results
 * const filteredResults = applyFilters(searchResults)
 * 
 * // Toggle a domain filter
 * toggleArrayFilter('domains', 'blog.getharsh.in')
 * ```
 * 
 * @see {@link file://./SEARCH.md#faceted-search} - Faceted search documentation
 * @see {@link file://./config/schema/blog.proto} - ArticleConfig fields used for filtering
 * @see {@link file://./src/hooks/search/useFlexSearch.ts} - Primary search hook
 * @see {@link file://./src/components/search/SearchFilters.tsx} - Filter UI component
 * @see {@link file://./src/types/api.d.ts#SearchDocument} - SearchDocument type
 * 
 * @since 2.0.0
 */

import { useState, useMemo, useCallback } from 'react'

/**
 * Search filter configuration.
 * Defines all available filter dimensions.
 */
export interface SearchFilters {
  domains: string[]
  types: string[]
  dateRange: {
    start?: string
    end?: string
  }
  tags: string[]
  authors: string[]
  language: string
}

/**
 * Options for useSearchFilters hook.
 * Configure initial state and change handlers.
 */
interface UseSearchFiltersOptions {
  initialFilters?: Partial<SearchFilters>
  onFilterChange?: (filters: SearchFilters) => void
}

/**
 * Search filtering hook for faceted search.
 * Provides filter state management and result filtering.
 * 
 * @param {UseSearchFiltersOptions} options - Filter configuration
 * @returns Filter state and control methods
 */
export function useSearchFilters(options?: UseSearchFiltersOptions) {
  const [filters, setFilters] = useState<SearchFilters>({
    domains: options?.initialFilters?.domains || [],
    types: options?.initialFilters?.types || [],
    dateRange: options?.initialFilters?.dateRange || {},
    tags: options?.initialFilters?.tags || [],
    authors: options?.initialFilters?.authors || [],
    language: options?.initialFilters?.language || 'en'
  })

  /**
   * Update a specific filter value.
   * Triggers onFilterChange callback if provided.
   * 
   * @param key - Filter key to update
   * @param value - New filter value
   */
  const updateFilter = useCallback(<K extends keyof SearchFilters>(
    key: K,
    value: SearchFilters[K]
  ) => {
    setFilters(prev => {
      const newFilters = { ...prev, [key]: value }
      options?.onFilterChange?.(newFilters)
      return newFilters
    })
  }, [options])

  /**
   * Toggle a value in an array filter.
   * Adds if not present, removes if present.
   * 
   * @param key - Array filter key
   * @param value - Value to toggle
   */
  const toggleArrayFilter = useCallback((
    key: 'domains' | 'types' | 'tags' | 'authors',
    value: string
  ) => {
    setFilters(prev => {
      const currentValues = prev[key]
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value]
      
      const newFilters = { ...prev, [key]: newValues }
      options?.onFilterChange?.(newFilters)
      return newFilters
    })
  }, [options])

  /**
   * Clear all active filters.
   * Resets to default state.
   */
  const clearFilters = useCallback(() => {
    const clearedFilters: SearchFilters = {
      domains: [],
      types: [],
      dateRange: {},
      tags: [],
      authors: [],
      language: 'en'
    }
    setFilters(clearedFilters)
    options?.onFilterChange?.(clearedFilters)
  }, [options])

  /**
   * Apply active filters to search results.
   * Uses AND logic between filter types, OR within.
   * 
   * @param results - Array of search results
   * @returns Filtered results array
   */
  const applyFilters = useCallback((results: any[]) => {
    if (!results || results.length === 0) return []

    return results.filter(item => {
      // Domain filter
      if (filters.domains.length > 0) {
        const itemDomain = item.domain || item.cross_posting?.canonical_domain
        if (!itemDomain || !filters.domains.includes(itemDomain)) {
          return false
        }
      }

      // Type filter
      if (filters.types.length > 0) {
        if (!item.type || !filters.types.includes(item.type)) {
          return false
        }
      }

      // Date range filter
      if (filters.dateRange.start || filters.dateRange.end) {
        const itemDate = item.date_published
        if (itemDate) {
          const date = new Date(itemDate)
          if (filters.dateRange.start && date < new Date(filters.dateRange.start)) {
            return false
          }
          if (filters.dateRange.end && date > new Date(filters.dateRange.end)) {
            return false
          }
        }
      }

      // Tags filter
      if (filters.tags.length > 0) {
        const itemTags = item.tags || []
        const hasMatchingTag = filters.tags.some(tag => itemTags.includes(tag))
        if (!hasMatchingTag) {
          return false
        }
      }

      // Authors filter
      if (filters.authors.length > 0) {
        const itemAuthors = item.author_names || []
        const hasMatchingAuthor = filters.authors.some(author => 
          itemAuthors.includes(author)
        )
        if (!hasMatchingAuthor) {
          return false
        }
      }

      // Language filter
      if (filters.language && filters.language !== 'all') {
        if (item.language && item.language !== filters.language) {
          return false
        }
      }

      return true
    })
  }, [filters])

  /**
   * Calculate count of active filters.
   * Used for UI indicators and analytics.
   */
  const activeFilterCount = useMemo(() => {
    let count = 0
    if (filters.domains.length > 0) count += filters.domains.length
    if (filters.types.length > 0) count += filters.types.length
    if (filters.tags.length > 0) count += filters.tags.length
    if (filters.authors.length > 0) count += filters.authors.length
    if (filters.dateRange.start || filters.dateRange.end) count++
    if (filters.language && filters.language !== 'en') count++
    return count
  }, [filters])

  return {
    filters,
    updateFilter,
    toggleArrayFilter,
    clearFilters,
    applyFilters,
    activeFilterCount,
    hasActiveFilters: activeFilterCount > 0
  }
}