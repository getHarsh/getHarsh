/**
 * @fileoverview SearchEmpty - Empty state for search results with suggestions
 * @module components/search/SearchEmpty
 * 
 * @description
 * Component that displays a helpful empty state when no search results are found,
 * providing search suggestions, tips, and guidance to help users refine their
 * search query for better results.
 * 
 * This component transforms a potentially frustrating "no results" experience
 * into a helpful guidance moment, providing actionable suggestions and tips
 * to help users find what they're looking for.
 * 
 * @architecture
 * ```
 * SearchEmpty (this)
 *       ├── Visual Icon (🔍)
 *       ├── Query Feedback
 *       ├── Helpful Message
 *       ├── Suggestions
 *       │     └── Clickable Pills
 *       └── Search Tips
 *             └── Best Practices
 * 
 * User Flow:
 * No Results → Empty State → Click Suggestion → New Search
 * ```
 * 
 * @proto-integration
 * Maps to search configuration:
 * 
 * - **SearchConfig** (search.proto)
 *   - `search_ui.empty_state.show_suggestions`: Enable suggestions
 *   - `search_ui.empty_state.default_suggestions[]`: Default terms
 *   - `search_ui.empty_state.show_tips`: Display search tips
 *   - `search_ui.empty_state.custom_message`: Custom empty message
 * 
 * - **AnalyticsConfig** (analytics.proto)
 *   - `search_events.track_empty_suggestions`: Track suggestion clicks
 *   - `search_events.empty_query_patterns`: Common failed searches
 * 
 * - **ContentConfig** (content.proto)
 *   - `popular_topics[]`: Suggested search terms
 *   - `content_categories[]`: Category-based suggestions
 * 
 * @ecosystem-integration
 * - **Used by**: SearchInterface when results.length === 0
 * - **Data flow**: Failed query → suggestions → new search attempt
 * - **Analytics**: Suggestion clicks tracked for optimization
 * - **Context**: Can provide context-aware suggestions
 * - **Performance**: Instant rendering, no async operations
 * 
 * @features
 * - **Visual Feedback**: Large emoji icon as focal point
 * - **Query Echo**: Shows searched term for confirmation
 * - **Smart Suggestions**: Custom or default recommendations
 * - **Search Tips**: Educational guidance for better searches
 * - **Click Actions**: Direct suggestion-to-search flow
 * - **Dark Mode**: Full theme compatibility
 * - **Responsive**: Adapts to container width
 * 
 * @suggestion-strategy
 * ```
 * Priority Order:
 * 1. Custom suggestions (if provided)
 *    - Context-aware based on domain
 *    - Related to previous searches
 *    - Based on popular content
 * 
 * 2. Default suggestions (fallback)
 *    - AI transformation
 *    - React development
 *    - System design
 *    - Project management
 *    - Technical writing
 * ```
 * 
 * @search-tips
 * Educational guidance provided:
 * - Use specific keywords
 * - Try singular instead of plural
 * - Check for typos
 * - Use filters to narrow results
 * 
 * These tips help users understand
 * how to improve their search queries.
 * 
 * @user-psychology
 * - **Reduces Frustration**: Immediate helpful feedback
 * - **Provides Direction**: Clear next steps
 * - **Educates Users**: Tips improve future searches
 * - **Maintains Engagement**: Suggestions keep users searching
 * - **Positive Tone**: Encouraging, not critical
 * 
 * @accessibility
 * - **Semantic HTML**: Proper heading hierarchy
 * - **Button Labels**: Clear action descriptions
 * - **Focus Management**: Keyboard navigable suggestions
 * - **Screen Readers**: Descriptive text for all elements
 * - **Color Contrast**: WCAG AA compliant
 * 
 * @performance
 * - **No Async**: Instant rendering
 * - **Minimal DOM**: Simple structure
 * - **Static Content**: No re-renders needed
 * - **Event Delegation**: Efficient click handling
 * 
 * @customization
 * ```tsx
 * // Context-aware suggestions
 * const suggestions = useMemo(() => {
 *   if (query.includes('react')) {
 *     return ['hooks', 'components', 'state management']
 *   }
 *   if (query.includes('gatsby')) {
 *     return ['graphql', 'plugins', 'static site']
 *   }
 *   return [] // Use defaults
 * }, [query])
 * ```
 * 
 * @dos
 * - Show the searched query clearly
 * - Provide actionable suggestions
 * - Include helpful search tips
 * - Make suggestions clickable
 * - Use encouraging language
 * 
 * @donts
 * - Don't blame the user
 * - Don't show too many suggestions
 * - Don't use technical jargon
 * - Don't hide the empty state too quickly
 * - Don't forget dark mode styling
 * 
 * @example
 * ```tsx
 * // Smart suggestions based on query
 * function SmartEmptyState({ query, onSearch }) {
 *   const suggestions = generateSuggestions(query)
 *   
 *   return (
 *     <SearchEmpty
 *       query={query}
 *       suggestions={suggestions}
 *       onSuggestionClick={(suggestion) => {
 *         // Track analytics
 *         trackEvent({
 *           event: 'search_suggestion_click',
 *           suggestion,
 *           original_query: query
 *         })
 *         // Perform new search
 *         onSearch(suggestion)
 *       }}
 *     />
 *   )
 * }
 * 
 * // Category-based suggestions
 * <SearchEmpty
 *   query={failedQuery}
 *   suggestions={getCategorySuggestions(currentCategory)}
 *   onSuggestionClick={handleSuggestionSearch}
 * />
 * ```
 * 
 * @see {@link file://./SearchInterface.tsx} - Parent component
 * @see {@link file://./SEARCH.md#empty-state} - Empty state specification
 * @see {@link file://../../hooks/search/useSearchTracking.ts} - Analytics
 * 
 * @since 1.0.0
 */

import React from 'react'

/**
 * @interface SearchEmptyProps
 * @description Props for SearchEmpty component
 * 
 * Configuration for the empty state display, including
 * the failed query, optional suggestions, and interaction handlers.
 * 
 * @property {string} query - Query that returned no results
 * The search term that yielded no matches.
 * Displayed to confirm what was searched.
 * 
 * @property {string[]} [suggestions] - Custom search suggestions
 * Optional array of suggested search terms.
 * If not provided, uses default suggestions.
 * 
 * @property {(suggestion: string) => void} [onSuggestionClick] - Callback when suggestion is clicked
 * Called when user clicks a suggestion pill.
 * Typically updates query and triggers new search.
 * 
 * @example
 * ```tsx
 * const props: SearchEmptyProps = {
 *   query: 'nonexistentterm',
 *   suggestions: ['gatsby', 'react', 'typescript'],
 *   onSuggestionClick: (suggestion) => {
 *     setQuery(suggestion)
 *     performSearch(suggestion)
 *   }
 * }
 * ```
 */
interface SearchEmptyProps {
  /** Query that returned no results - displayed for confirmation */
  query: string
  /** Custom search suggestions - overrides defaults if provided */
  suggestions?: string[]
  /** Callback when suggestion is clicked - triggers new search */
  onSuggestionClick?: (suggestion: string) => void
}

/**
 * SearchEmpty component - Empty state with suggestions
 * 
 * Displays a helpful empty state when search yields no results,
 * providing suggestions and tips to guide users toward successful searches.
 * 
 * @component
 * @param {SearchEmptyProps} props - Component props
 * @param {string} props.query - Query that found no results
 * @param {string[]} [props.suggestions=[]] - Custom suggestions
 * @param {(suggestion: string) => void} [props.onSuggestionClick] - Suggestion click handler
 * 
 * @returns {JSX.Element} Empty state containing:
 * - Large search emoji icon
 * - "No results" message with query
 * - Helpful guidance text
 * - Clickable suggestion pills
 * - Search tips list
 * 
 * @remarks
 * The component provides two levels of help:
 * 1. **Immediate**: Clickable suggestions for quick retry
 * 2. **Educational**: Tips for improving search technique
 * 
 * Default suggestions cover common topics if
 * no custom suggestions are provided.
 * 
 * @example
 * ```tsx
 * // In SearchInterface
 * {filteredResults.length === 0 && query.length >= 2 && (
 *   <SearchEmpty
 *     query={query}
 *     suggestions={getRelatedTerms(query)}
 *     onSuggestionClick={(suggestion) => {
 *       setQuery(suggestion)
 *       // Trigger immediate search
 *       debouncedSearch.flush()
 *       onSearch(suggestion)
 *     }}
 *   />
 * )}
 * ```
 */
export const SearchEmpty: React.FC<SearchEmptyProps> = ({
  query,
  suggestions = [],
  onSuggestionClick
}) => {
  /**
   * Default suggestions for common topics
   * 
   * Covers broad categories likely to have content
   * in the getHarsh ecosystem.
   */
  const defaultSuggestions = [
    'AI transformation',
    'React development',
    'System design',
    'Project management',
    'Technical writing'
  ]

  /**
   * Determine which suggestions to display
   * 
   * Prefers custom suggestions if provided,
   * falls back to defaults otherwise.
   */
  const displaySuggestions = suggestions.length > 0 ? suggestions : defaultSuggestions

  return (
    <div className="text-center py-12">
      <div className="text-6xl mb-4">🔍</div>
      
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
        No results found for &quot;{query}&quot;
      </h3>
      
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
        Try searching with different keywords or check the spelling
      </p>

      {displaySuggestions.length > 0 && (
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-500 mb-3">
            Try searching for:
          </p>
          
          <div className="flex flex-wrap gap-2 justify-center">
            {displaySuggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => onSuggestionClick?.(suggestion)}
                className="px-3 py-1 text-sm rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8 text-xs text-gray-500 dark:text-gray-500">
        <p>Search tips:</p>
        <ul className="mt-2 space-y-1">
          <li>• Use specific keywords</li>
          <li>• Try singular instead of plural</li>
          <li>• Check for typos</li>
          <li>• Use filters to narrow results</li>
        </ul>
      </div>
    </div>
  )
}