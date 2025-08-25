/**
 * @fileoverview Search Components Barrel Export
 * @module components/search
 * 
 * @description
 * Centralized export for all search-related components, providing a clean
 * API for consuming search functionality throughout the application.
 * 
 * This module exports a complete search system including the main interface,
 * input controls, results display, filtering, federation, and utility components
 * for building comprehensive search experiences.
 * 
 * @architecture
 * ```
 * Search Components
 *       ├── SearchInterface (main modal/container)
 *       ├── SearchInput (debounced input field)
 *       ├── SearchResults (grouped results list)
 *       ├── SearchResultItem (individual result)
 *       ├── SearchFilters (filtering sidebar)
 *       ├── SearchEmpty (no results state)
 *       ├── FederatedSearch (cross-domain search)
 *       └── SearchHighlight (query term highlighting)
 * 
 * Component Hierarchy:
 * SearchInterface
 *       ├── SearchInput
 *       ├── SearchFilters
 *       ├── SearchResults
 *       │     └── SearchResultItem
 *       │           └── SearchHighlight
 *       ├── SearchEmpty
 *       └── FederatedSearch
 *             └── SearchResults
 * ```
 * 
 * @proto-integration
 * Search components map to proto configurations:
 * 
 * - **SearchConfig** (search.proto)
 *   - Component visibility and behavior
 *   - Search index configuration
 *   - Federation settings
 * 
 * - **SearchDisplay** (search.proto)
 *   - Result grouping and display
 *   - Highlighting configuration
 *   - Empty state settings
 * 
 * @ecosystem-integration
 * - **SearchInterface**: Full search experience with modal
 * - **SearchInput**: Standalone search input for custom implementations
 * - **SearchResults**: Reusable results display
 * - **SearchFilters**: Advanced filtering controls
 * - **FederatedSearch**: Cross-domain search aggregation
 * - **SearchHighlight**: Query term emphasis utility
 * - **SearchEmpty**: Helpful no-results guidance
 * - **SearchResultItem**: Individual result rendering
 * 
 * @usage-patterns
 * ```tsx
 * // Full search modal
 * import { SearchInterface } from '@/components/search'
 * 
 * // Custom search implementation
 * import { 
 *   SearchInput, 
 *   SearchResults, 
 *   SearchFilters 
 * } from '@/components/search'
 * 
 * // Utility components
 * import { 
 *   SearchHighlight, 
 *   SearchEmpty 
 * } from '@/components/search'
 * ```
 * 
 * @component-summary
 * - **SearchInterface**: Complete search modal with all features
 * - **SearchInput**: Debounced input with keyboard shortcuts
 * - **SearchResults**: Type-grouped, prioritized results display
 * - **SearchResultItem**: Rich result with metadata and image
 * - **SearchFilters**: Multi-category filtering sidebar
 * - **SearchEmpty**: Empty state with suggestions and tips
 * - **FederatedSearch**: Cross-domain search aggregation
 * - **SearchHighlight**: Query term highlighting utility
 * 
 * @see {@link file://./SEARCH.md} - Search system documentation
 * @see {@link file://../../hooks/search} - Search hooks
 * @see {@link file://./SearchInterface.tsx} - Main search component
 * 
 * @since 1.0.0
 */

// Main search interface - complete modal experience
export { SearchInterface } from './SearchInterface'

// Input components
export { SearchInput } from './SearchInput'

// Results display components
export { SearchResults } from './SearchResults'
export { SearchResultItem } from './SearchResultItem'

// Filtering components
export { SearchFilters } from './SearchFilters'

// Empty state component
export { SearchEmpty } from './SearchEmpty'

// Federation component
export { FederatedSearch } from './FederatedSearch'

// Utility components
export { SearchHighlight } from './SearchHighlight'