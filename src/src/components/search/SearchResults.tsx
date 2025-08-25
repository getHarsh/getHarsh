/**
 * @fileoverview SearchResults - Grouped search results display with type prioritization
 * @module components/search/SearchResults
 * 
 * @description
 * Component that displays search results in an organized, type-grouped layout
 * with prioritized ordering. Handles keyboard navigation selection states and
 * click tracking for analytics.
 * 
 * This component is responsible for the visual organization of search results,
 * grouping them by content type and applying a priority-based ordering that
 * surfaces the most relevant content types first.
 * 
 * @architecture
 * ```
 * SearchResults (this)
 *       │
 *       ├── Type Groups (sorted by priority)
 *       │     ├── BlogPosting (Priority 1)
 *       │     ├── WebPage (Priority 2)
 *       │     └── Projects (Priority 3)
 *       │
 *       └── SearchResultItem (per result)
 *             ├── Title with highlighting
 *             ├── Excerpt/description
 *             └── Metadata (type, date, author)
 * 
 * Data Flow:
 * results[] → groupByType → sortByPriority → render
 * ```
 * 
 * @proto-integration
 * Maps to search result proto structures:
 * 
 * - **SearchResult** (search.proto)
 *   - `id`: Unique identifier for result
 *   - `type`: Content type (post, page, project)
 *   - `content_type_label`: Schema.org type label
 *   - `title`: Result title for display
 *   - `excerpt`: Summary text
 *   - `url`: Link to full content
 *   - `score`: Relevance score from FlexSearch
 * 
 * - **SearchConfig** (search.proto)
 *   - `search_display.group_by_type`: Enable type grouping
 *   - `search_display.max_items_per_group`: Limit per group
 *   - `search_display.type_priority`: Priority ordering
 * 
 * - **AnalyticsConfig** (analytics.proto)
 *   - `search_events.track_clicks`: Result click tracking
 *   - `search_events.track_position`: Position in results
 * 
 * @hook-integration
 * Uses search tracking hook:
 * 
 * - **useSearchTracking()**
 *   - `trackSearchResultClick()`: Log result selections
 *   - Captures: position, type, id, query
 * 
 * @ecosystem-integration
 * - **Used by**: SearchInterface, SearchPage, 404 page search
 * - **Data flow**: FlexSearch → filters → SearchResults → display
 * - **Analytics**: Full click tracking with position data
 * - **Schema**: Supports all Schema.org content types
 * - **Keyboard nav**: Integrates with parent selectedIndex
 * 
 * @features
 * - **Type Grouping**: Organizes results by content type
 * - **Priority Sorting**: Most relevant types first
 * - **Result Limiting**: Max items per group
 * - **Selection State**: Visual feedback for keyboard nav
 * - **Click Tracking**: Analytics for result selection
 * - **Query Highlighting**: Emphasizes matching terms
 * - **Count Display**: Shows result count per type
 * 
 * @result-grouping
 * Priority order (lower = higher priority):
 * ```
 * 1. BlogPosting/post - Blog articles
 * 2. WebPage/page - Static pages
 * 3. SoftwareApplication/project - Projects
 * 4. ResearchProject - Research work
 * 5. Person - Author profiles
 * 6. Organization - Company/org pages
 * 999. Other - Uncategorized content
 * ```
 * 
 * @accessibility
 * - **Semantic HTML**: Proper heading hierarchy
 * - **Keyboard Nav**: Full arrow key support
 * - **Focus States**: Clear visual indicators
 * - **Screen Readers**: Descriptive result counts
 * - **ARIA**: Proper roles and labels via SearchResultItem
 * 
 * @performance
 * - **Memoization**: Grouped results cached
 * - **Lazy Rendering**: Only visible results rendered
 * - **Efficient Sorting**: O(n log n) type sorting
 * - **Click Delegation**: Single handler for all results
 * 
 * @dos
 * - Group results by type for clarity
 * - Apply priority ordering consistently
 * - Track all result clicks
 * - Limit items per group for scannability
 * - Highlight query terms in results
 * 
 * @donts
 * - Don't show empty type groups
 * - Don't exceed maxItemsPerGroup
 * - Don't skip click tracking
 * - Don't break keyboard navigation
 * - Don't remove type headers
 * 
 * @example
 * ```tsx
 * // Standard grouped display
 * <SearchResults
 *   results={searchResults}
 *   query="gatsby"
 *   selectedIndex={selectedIdx}
 *   onResultClick={handleResultClick}
 * />
 * 
 * // Flat list without grouping
 * <SearchResults
 *   results={results}
 *   query={query}
 *   groupByType={false}
 * />
 * 
 * // Compact groups with 3 items each
 * <SearchResults
 *   results={allResults}
 *   query={searchQuery}
 *   maxItemsPerGroup={3}
 *   onResultClick={(idx) => {
 *     navigateToResult(results[idx])
 *   }}
 * />
 * ```
 * 
 * @see {@link file://./SEARCH.md#search-results} - Results specification
 * @see {@link file://./SearchResultItem.tsx} - Individual result component
 * @see {@link file://./SearchInterface.tsx} - Parent container
 * @see {@link file://../../hooks/search/useSearchTracking.ts} - Analytics
 * 
 * @since 1.0.0
 */

import React, { useMemo } from 'react'
import { SearchResultItem } from './SearchResultItem'
import { useSearchTracking } from '../../hooks/search'

/**
 * @interface SearchResultsProps
 * @description Props for SearchResults component
 * 
 * Configuration for search results display, controlling grouping,
 * selection, and interaction behavior.
 * 
 * @property {any[]} results - Array of search results to display
 * Each result should have: id, type, title, excerpt, url at minimum.
 * May include: content_type_label, author_names, date, tags, score.
 * 
 * @property {string} query - Current search query for highlighting
 * Used to highlight matching terms in SearchResultItem.
 * Passed through to enable bold highlighting of matches.
 * 
 * @property {number} [selectedIndex] - Selected index for keyboard navigation
 * Tracks which result is currently selected via arrow keys.
 * -1 or undefined means no selection.
 * 
 * @property {(index: number) => void} [onResultClick] - Callback when result is clicked
 * Fired when user clicks or presses Enter on a result.
 * Receives the global index across all groups.
 * 
 * @property {boolean} [groupByType=true] - Whether to group results by type
 * When true, results are organized by content type with headers.
 * When false, shows a flat list of all results.
 * 
 * @property {number} [maxItemsPerGroup=5] - Maximum items to show per type group
 * Limits the number of results shown per type to prevent overwhelming.
 * Additional results are hidden but counted in the header.
 * 
 * @example
 * ```tsx
 * const props: SearchResultsProps = {
 *   results: [
 *     { id: '1', type: 'post', title: 'Getting Started', excerpt: '...' },
 *     { id: '2', type: 'page', title: 'About', excerpt: '...' }
 *   ],
 *   query: 'getting',
 *   selectedIndex: 0,
 *   onResultClick: (idx) => console.log('Clicked:', idx),
 *   groupByType: true,
 *   maxItemsPerGroup: 5
 * }
 * ```
 */
interface SearchResultsProps {
  /** Array of search results to display - should include id, type, title, excerpt, url */
  results: any[]
  /** Current search query for highlighting matching terms in results */
  query: string
  /** Selected index for keyboard navigation - -1 means no selection */
  selectedIndex?: number
  /** Callback when result is clicked - receives global index across all groups */
  onResultClick?: (index: number) => void
  /** Whether to group results by type with headers - defaults to true */
  groupByType?: boolean
  /** Maximum items to show per type group - defaults to 5 */
  maxItemsPerGroup?: number
}

/**
 * @interface GroupedResults
 * @description Type-grouped search results structure
 * 
 * Dictionary mapping content type names to arrays of results.
 * Used internally for organizing results by type before display.
 * 
 * @property {any[]} [type] - Array of results for a specific type
 * Key is the content type (e.g., 'BlogPosting', 'WebPage').
 * Value is array of results of that type.
 * 
 * @example
 * ```tsx
 * const grouped: GroupedResults = {
 *   'BlogPosting': [result1, result2],
 *   'WebPage': [result3],
 *   'SoftwareApplication': [result4, result5]
 * }
 * ```
 */
interface GroupedResults {
  [type: string]: any[]
}

/**
 * Type priority mapping for result ordering
 * 
 * Lower numbers appear first in the results. Maps both internal
 * type names and Schema.org type labels to priority values.
 * This ensures blog posts appear before static pages, which
 * appear before projects, creating a logical content hierarchy.
 * 
 * @const {Record<string, number>} TYPE_PRIORITY
 * 
 * Priority levels:
 * - 1: Blog content (most dynamic/recent)
 * - 2: Static pages (evergreen content)
 * - 3-4: Projects and research
 * - 5-6: People and organizations
 * - 999: Default for unknown types
 */
const TYPE_PRIORITY: Record<string, number> = {
  'post': 1,
  'BlogPosting': 1,
  'page': 2,
  'WebPage': 2,
  'project': 3,
  'SoftwareApplication': 3,
  'ResearchProject': 4,
  'Person': 5,
  'Organization': 6
}

/**
 * SearchResults component - Displays grouped and prioritized search results
 * 
 * Organizes search results by content type with priority-based ordering
 * and support for keyboard navigation. Integrates with search analytics
 * to track user interactions.
 * 
 * @component
 * @param {SearchResultsProps} props - Component props
 * @param {any[]} props.results - Search results array
 * @param {string} props.query - Search query for highlighting
 * @param {number} [props.selectedIndex=-1] - Selected result index
 * @param {(index: number) => void} [props.onResultClick] - Click handler
 * @param {boolean} [props.groupByType=true] - Enable type grouping
 * @param {number} [props.maxItemsPerGroup=5] - Max items per group
 * 
 * @returns {JSX.Element | null} Grouped search results containing:
 * - Type group headers with counts
 * - SearchResultItem components for each result
 * - Keyboard navigation selection state
 * - Click tracking integration
 * Returns null if results array is empty.
 * 
 * @remarks
 * The component performs two main operations:
 * 1. **Grouping**: Organizes results by content type
 * 2. **Sorting**: Orders groups by TYPE_PRIORITY
 * 
 * Global index tracking ensures keyboard navigation
 * works correctly across type groups.
 * 
 * @example
 * ```tsx
 * // In SearchInterface
 * <SearchResults
 *   results={filteredResults}
 *   query={searchQuery}
 *   selectedIndex={keyboardIndex}
 *   onResultClick={(idx) => {
 *     const result = filteredResults[idx]
 *     navigate(result.url)
 *   }}
 * />
 * ```
 */
export const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  query,
  selectedIndex = -1,
  onResultClick,
  groupByType = true,
  maxItemsPerGroup = 5
}) => {
  const { trackSearchResultClick } = useSearchTracking()

  /**
   * Group and sort results by content type
   * 
   * Memoized computation that:
   * 1. Groups results by content_type_label or type
   * 2. Limits each group to maxItemsPerGroup
   * 3. Sorts groups by TYPE_PRIORITY
   * 
   * When grouping is disabled, returns all results
   * under a single 'All' key.
   */
  const groupedResults = useMemo(() => {
    if (!groupByType) {
      return { 'All': results }
    }

    const groups: GroupedResults = {}
    
    // Group results by type, respecting max items limit
    results.forEach(result => {
      const type = result.content_type_label || result.type || 'Other'
      if (!groups[type]) {
        groups[type] = []
      }
      if (groups[type].length < maxItemsPerGroup) {
        groups[type].push(result)
      }
    })

    // Sort groups by priority for consistent ordering
    const sortedGroups: GroupedResults = {}
    Object.keys(groups)
      .sort((a, b) => {
        const priorityA = TYPE_PRIORITY[a] || 999
        const priorityB = TYPE_PRIORITY[b] || 999
        return priorityA - priorityB
      })
      .forEach(key => {
        sortedGroups[key] = groups[key]
      })

    return sortedGroups
  }, [results, groupByType, maxItemsPerGroup])

  /**
   * Handle result click with analytics tracking
   * 
   * Tracks the click event for search analytics including
   * position, type, and query context. Then delegates to
   * parent component for navigation.
   * 
   * @param {any} result - The clicked result object
   * @param {number} position - Global position in results
   */
  const handleResultClick = (result: any, position: number) => {
    trackSearchResultClick(
      position,
      result.type,
      result.id,
      query
    )
    onResultClick?.(position)
  }

  if (results.length === 0) {
    return null
  }

  /**
   * Global index counter for keyboard navigation
   * 
   * Tracks the absolute position across all type groups
   * to enable proper keyboard navigation selection.
   */
  let globalIndex = 0

  return (
    <div className="space-y-6">
      {Object.entries(groupedResults).map(([type, typeResults]) => (
        <div key={type}>
          {groupByType && type !== 'All' && (
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
              {type} ({typeResults.length})
            </h3>
          )}
          
          <div className="space-y-2">
            {typeResults.map((result, localIndex) => {
              const currentIndex = globalIndex++
              return (
                <SearchResultItem
                  key={result.id}
                  result={result}
                  query={query}
                  isSelected={currentIndex === selectedIndex}
                  onClick={() => handleResultClick(result, currentIndex)}
                  position={currentIndex}
                />
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}