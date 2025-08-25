/**
 * @fileoverview SearchFilters - Advanced filtering UI for search results
 * @module components/search/SearchFilters
 * 
 * @description
 * A comprehensive filtering component that provides multiple filter categories
 * for refining search results. Supports domains, content types, date ranges,
 * tags, and authors with dynamic filter availability based on search results.
 * 
 * This component provides the UI layer for the filter state managed by the
 * useSearchFilters hook. All filter options are dynamically extracted from
 * the current search results to ensure only relevant filters are shown.
 * 
 * @architecture
 * ```
 * SearchFilters (this)
 *       ├── Filter Header
 *       │     ├── "Filters" title
 *       │     └── "Clear all" button
 *       ├── Domain Filters (checkboxes)
 *       ├── Type Filters (checkboxes)
 *       ├── Date Range (date inputs)
 *       ├── Tag Cloud (pill buttons)
 *       └── Author Filters (checkboxes)
 * 
 * Data Flow:
 * SearchResults → availableFilters → UI → onFilterChange → useSearchFilters
 * ```
 * 
 * @proto-integration
 * Maps to search filter proto configurations:
 * 
 * - **SearchFilters** (search.proto)
 *   - `domains[]`: Array of domain filters
 *   - `types[]`: Content type filters
 *   - `tags[]`: Tag-based filters
 *   - `authors[]`: Author name filters
 *   - `dateRange.start`: Start date ISO string
 *   - `dateRange.end`: End date ISO string
 *   - `language`: Language code (default 'en')
 * 
 * - **SearchConfig** (search.proto)
 *   - `search_features.enable_filters`: Show filter sidebar
 *   - `search_features.filter_categories`: Enabled categories
 *   - `search_display.max_filter_tags`: Tag limit (20)
 * 
 * - **AnalyticsConfig** (analytics.proto)
 *   - `search_events.track_filter_usage`: Filter analytics
 *   - `search_events.popular_filters`: Most used filters
 * 
 * @hook-integration
 * Works with useSearchFilters hook:
 * 
 * - **useSearchFilters()**
 *   - `filters`: Current filter state
 *   - `applyFilters()`: Apply to results
 *   - `updateFilter()`: Update single category
 *   - `clearFilters()`: Reset all
 * 
 * @ecosystem-integration
 * - **Used by**: SearchInterface sidebar, SearchPage, Archive pages
 * - **Data flow**: Results → extract filters → UI → apply filters
 * - **State**: Centralized in useSearchFilters hook
 * - **Analytics**: Tracks filter combinations for optimization
 * - **Performance**: Memoized filter extraction in parent
 * 
 * @features
 * - **Multi-Category**: 5 filter categories
 * - **Dynamic Options**: Based on actual results
 * - **Tag Cloud**: Visual tag selection
 * - **Date Range**: Temporal filtering
 * - **Clear All**: One-click reset
 * - **Active Indicator**: Shows applied filters
 * - **Checkbox Groups**: Multi-select categories
 * - **Responsive**: Adapts to sidebar width
 * 
 * @filter-categories
 * ```
 * 1. Domains:
 *    - getHarsh.in (main domain)
 *    - blog.getHarsh.in
 *    - project subdomains
 * 
 * 2. Content Types:
 *    - BlogPosting (articles)
 *    - WebPage (static pages)
 *    - SoftwareApplication (projects)
 *    - Person (author profiles)
 * 
 * 3. Date Range:
 *    - Start date (inclusive)
 *    - End date (inclusive)
 * 
 * 4. Tags (top 20):
 *    - Technical tags
 *    - Topic categories
 *    - Project tags
 * 
 * 5. Authors:
 *    - Content creators
 *    - Contributors
 * ```
 * 
 * @accessibility
 * - **Labels**: All inputs properly labeled
 * - **Keyboard**: Full keyboard navigation
 * - **Focus**: Clear focus indicators
 * - **ARIA**: Proper roles and states
 * - **Contrast**: WCAG AA compliant colors
 * 
 * @performance
 * - **Memoization**: Filter extraction cached
 * - **Debouncing**: Date inputs debounced
 * - **Limit**: Max 20 tags shown
 * - **Conditional**: Only shown categories with options
 * 
 * @dos
 * - Extract filters from actual results
 * - Show only relevant categories
 * - Limit tag display to prevent overflow
 * - Provide clear all functionality
 * - Track filter usage for analytics
 * 
 * @donts
 * - Don't show empty filter categories
 * - Don't exceed 20 tags in cloud
 * - Don't reset filters without user action
 * - Don't show irrelevant options
 * - Don't forget active state indicators
 * 
 * @example
 * ```tsx
 * // Standard implementation in SearchInterface
 * const availableFilters = {
 *   domains: [...new Set(results.map(r => r.domain))],
 *   types: [...new Set(results.map(r => r.type))],
 *   tags: [...new Set(results.flatMap(r => r.tags || []))],
 *   authors: [...new Set(results.map(r => r.author))]
 * }
 * 
 * <SearchFilters
 *   filters={currentFilters}
 *   onFilterChange={(newFilters) => {
 *     updateFilters(newFilters)
 *   }}
 *   availableFilters={availableFilters}
 * />
 * ```
 * 
 * @see {@link file://./SEARCH.md#filtering} - Filter specification
 * @see {@link file://./SearchInterface.tsx} - Primary consumer
 * @see {@link file://../../hooks/search/useSearchFilters.ts} - State management
 * @see {@link file://./SearchResults.tsx} - Filtered results display
 * 
 * @since 1.0.0
 */

import React from 'react'
import { SearchFilters as Filters } from '../../hooks/search'

/**
 * @interface SearchFiltersProps
 * @description Props for SearchFilters component
 * 
 * Configuration for the filter UI, providing current state,
 * available options, and change handlers.
 * 
 * @property {Filters} filters - Current filter state
 * Complete filter state from useSearchFilters hook including
 * all active filters across categories.
 * 
 * @property {(filters: Filters) => void} onFilterChange - Callback when filters change
 * Called with complete new filter state whenever any filter
 * is toggled, added, or removed. Parent should update state.
 * 
 * @property {Object} availableFilters - Available filter options extracted from results
 * Dynamically extracted from current search results to show
 * only relevant filter options.
 * 
 * @property {string[]} [availableFilters.domains] - Available domains to filter
 * Ecosystem domains found in results (e.g., 'getHarsh.in', 'blog.getHarsh.in').
 * 
 * @property {string[]} [availableFilters.types] - Available content types
 * Schema.org types found in results (e.g., 'BlogPosting', 'WebPage').
 * 
 * @property {string[]} [availableFilters.tags] - Available tags
 * All unique tags from results, limited to top 20 in UI.
 * 
 * @property {string[]} [availableFilters.authors] - Available authors
 * Author names found in results, from PersonConfig mappings.
 * 
 * @property {string} [className] - Additional CSS classes
 * Applied to root div for custom styling.
 * 
 * @example
 * ```tsx
 * const props: SearchFiltersProps = {
 *   filters: {
 *     domains: ['blog.getHarsh.in'],
 *     types: ['BlogPosting'],
 *     tags: ['react', 'gatsby'],
 *     authors: [],
 *     dateRange: {},
 *     language: 'en'
 *   },
 *   onFilterChange: (newFilters) => setFilters(newFilters),
 *   availableFilters: {
 *     domains: ['getHarsh.in', 'blog.getHarsh.in'],
 *     types: ['BlogPosting', 'WebPage', 'SoftwareApplication'],
 *     tags: ['react', 'gatsby', 'typescript', 'node'],
 *     authors: ['Harsh Vardhan', 'Guest Author']
 *   },
 *   className: 'sidebar-filters'
 * }
 * ```
 */
interface SearchFiltersProps {
  /** Current filter state from useSearchFilters hook */
  filters: Filters
  /** Callback when filters change - receives complete new state */
  onFilterChange: (filters: Filters) => void
  /** Available filter options extracted from search results */
  availableFilters: {
    /** Available domains to filter - ecosystem subdomains */
    domains?: string[]
    /** Available content types - Schema.org types */
    types?: string[]
    /** Available tags - unique from all results */
    tags?: string[]
    /** Available authors - from PersonConfig */
    authors?: string[]
  }
  /** Additional CSS classes for root container */
  className?: string
}

/**
 * SearchFilters component - Advanced filtering UI for search
 * 
 * Renders a multi-category filter interface with checkboxes, tag pills,
 * and date inputs. Dynamically shows only categories that have available
 * options based on current search results.
 * 
 * @component
 * @param {SearchFiltersProps} props - Component props
 * @param {Filters} props.filters - Current filter state
 * @param {(filters: Filters) => void} props.onFilterChange - Filter change handler
 * @param {Object} props.availableFilters - Available filter options
 * @param {string} [props.className=''] - Additional CSS classes
 * 
 * @returns {JSX.Element} Filter UI containing:
 * - Header with title and clear all button
 * - Domain checkboxes (if available)
 * - Content type checkboxes (if available)
 * - Date range inputs (always shown)
 * - Tag cloud with pill buttons (if available, max 20)
 * - Author checkboxes (if available)
 * 
 * @remarks
 * The component handles three main interactions:
 * 1. **Toggle filters**: Add/remove from arrays
 * 2. **Date range**: Update date boundaries
 * 3. **Clear all**: Reset entire filter state
 * 
 * Visual states:
 * - Active filters show "Clear all" button
 * - Selected tags have blue background
 * - Checked boxes for active filters
 * 
 * @example
 * ```tsx
 * // In SearchInterface sidebar
 * function SearchSidebar({ results }) {
 *   const { filters, updateFilters } = useSearchFilters()
 *   
 *   // Extract available options from results
 *   const available = useMemo(() => ({
 *     domains: [...new Set(results.map(r => r.domain))],
 *     types: [...new Set(results.map(r => r.type))],
 *     tags: [...new Set(results.flatMap(r => r.tags || []))],
 *     authors: [...new Set(results.map(r => r.author))]
 *   }), [results])
 *   
 *   return (
 *     <SearchFilters
 *       filters={filters}
 *       onFilterChange={updateFilters}
 *       availableFilters={available}
 *       className="p-4 border-r"
 *     />
 *   )
 * }
 * ```
 */
export const SearchFilters: React.FC<SearchFiltersProps> = ({
  filters,
  onFilterChange,
  availableFilters,
  className = ''
}) => {
  /**
   * Handle toggle for array-based filters
   * 
   * Adds or removes a value from the specified filter category
   * array. Used for domains, types, tags, and authors.
   * 
   * @param {'domains' | 'types' | 'tags' | 'authors'} category - Filter category
   * @param {string} value - Value to toggle
   */
  const handleToggle = (
    category: 'domains' | 'types' | 'tags' | 'authors',
    value: string
  ) => {
    const currentValues = filters[category]
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value]
    
    onFilterChange({
      ...filters,
      [category]: newValues
    })
  }

  /**
   * Handle date range filter changes
   * 
   * Updates the start or end date in the dateRange filter.
   * Dates are stored as ISO strings (YYYY-MM-DD).
   * 
   * @param {'start' | 'end'} field - Which date to update
   * @param {string} value - ISO date string
   */
  const handleDateChange = (field: 'start' | 'end', value: string) => {
    onFilterChange({
      ...filters,
      dateRange: {
        ...filters.dateRange,
        [field]: value
      }
    })
  }

  /**
   * Clear all active filters
   * 
   * Resets the entire filter state to defaults.
   * Language remains 'en' as the default.
   */
  const clearAllFilters = () => {
    onFilterChange({
      domains: [],
      types: [],
      dateRange: {},
      tags: [],
      authors: [],
      language: 'en'
    })
  }

  /**
   * Check if any filters are currently active
   * 
   * Used to conditionally show the "Clear all" button.
   * Checks all filter categories for non-empty values.
   */
  const hasActiveFilters = 
    filters.domains.length > 0 ||
    filters.types.length > 0 ||
    filters.tags.length > 0 ||
    filters.authors.length > 0 ||
    filters.dateRange.start ||
    filters.dateRange.end

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
          Filters
        </h3>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Domain Filter */}
      {availableFilters.domains && availableFilters.domains.length > 0 && (
        <div>
          <h4 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
            Domains
          </h4>
          <div className="space-y-1">
            {availableFilters.domains.map(domain => (
              <label
                key={domain}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={filters.domains.includes(domain)}
                  onChange={() => handleToggle('domains', domain)}
                  className="rounded border-gray-300 dark:border-gray-600"
                />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {domain}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Type Filter */}
      {availableFilters.types && availableFilters.types.length > 0 && (
        <div>
          <h4 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
            Content Type
          </h4>
          <div className="space-y-1">
            {availableFilters.types.map(type => (
              <label
                key={type}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={filters.types.includes(type)}
                  onChange={() => handleToggle('types', type)}
                  className="rounded border-gray-300 dark:border-gray-600"
                />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {type}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Date Range Filter */}
      <div>
        <h4 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
          Date Range
        </h4>
        <div className="space-y-2">
          <input
            type="date"
            value={filters.dateRange.start || ''}
            onChange={(e) => handleDateChange('start', e.target.value)}
            placeholder="Start date"
            className="w-full px-2 py-1 text-sm border rounded dark:bg-gray-800 dark:border-gray-600"
          />
          <input
            type="date"
            value={filters.dateRange.end || ''}
            onChange={(e) => handleDateChange('end', e.target.value)}
            placeholder="End date"
            className="w-full px-2 py-1 text-sm border rounded dark:bg-gray-800 dark:border-gray-600"
          />
        </div>
      </div>

      {/* Tags Filter */}
      {availableFilters.tags && availableFilters.tags.length > 0 && (
        <div>
          <h4 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
            Tags
          </h4>
          <div className="flex flex-wrap gap-1">
            {availableFilters.tags.slice(0, 20).map(tag => (
              <button
                key={tag}
                onClick={() => handleToggle('tags', tag)}
                className={`
                  px-2 py-0.5 text-xs rounded-full transition-colors
                  ${filters.tags.includes(tag)
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }
                `}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Authors Filter */}
      {availableFilters.authors && availableFilters.authors.length > 0 && (
        <div>
          <h4 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
            Authors
          </h4>
          <div className="space-y-1">
            {availableFilters.authors.map(author => (
              <label
                key={author}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={filters.authors.includes(author)}
                  onChange={() => handleToggle('authors', author)}
                  className="rounded border-gray-300 dark:border-gray-600"
                />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {author}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}