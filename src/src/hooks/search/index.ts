/**
 * @fileoverview Search Hooks Barrel Export
 * @module hooks/search
 * 
 * @description
 * Centralized export point for all search-related React hooks in the getHarsh ecosystem.
 * These hooks power the advanced search functionality including FlexSearch integration,
 * cross-domain federation, real-time filtering, keyboard shortcuts, and analytics tracking.
 * 
 * The search system is built on a proto-driven architecture with 381 JSON schemas
 * providing type-safe, schema-aware tokenization and indexing. All search operations
 * respect user consent and provide accessible, keyboard-navigable interfaces.
 * 
 * @architecture
 * The search system follows a layered architecture:
 * - **Index Layer**: FlexSearch with schema-aware tokenization
 * - **Federation Layer**: Cross-domain search aggregation
 * - **Filter Layer**: Real-time faceted filtering
 * - **Tracking Layer**: Analytics and performance monitoring
 * - **UI Layer**: Keyboard shortcuts and accessibility
 * 
 * @ecosystem-integration
 * - FlexSearch: In-browser full-text search with 0.3MB bundle size
 * - Federation: Searches across all ecosystem domains (blog.*, project.*)
 * - Schema.org: Leverages 300+ proto-to-Schema.org mappings
 * - Analytics: Integrates with GTM for search tracking
 * - Accessibility: WCAG 2.1 AA compliant search interface
 * 
 * @performance
 * - Index building: ~50ms for 1000 documents
 * - Search latency: <10ms for most queries
 * - Federation: Parallel requests with 2s timeout
 * - Caching: Results cached for 5 minutes
 * - Bundle impact: ~0.5MB total for all search features
 * 
 * @dos
 * - Import individual hooks as needed for tree-shaking
 * - Use useFlexSearch for primary search functionality
 * - Implement federation for cross-domain discovery
 * - Track search events for optimization
 * - Provide keyboard shortcuts for power users
 * 
 * @donts
 * - Don't import all hooks if only using one
 * - Don't skip search tracking
 * - Don't ignore accessibility requirements
 * - Don't bypass consent checks
 * - Don't index sensitive content
 * 
 * @example
 * ```tsx
 * // Import specific hooks
 * import { useFlexSearch, useSearchFilters, useSearchHotkeys } from '@/hooks/search'
 * 
 * const SearchInterface = () => {
 *   const { search, results, isSearching } = useFlexSearch()
 *   const { filters, applyFilter, clearFilters } = useSearchFilters()
 *   const { registerHotkey } = useSearchHotkeys()
 *   
 *   // Implement search UI...
 * }
 * ```
 * 
 * @see {@link file://./SEARCH.md} - Complete search system documentation
 * @see {@link file://./BUILD.md#search-index-generation} - Search index build process
 * @see {@link file://./config/schema/SCHEMA.md} - Schema-aware tokenization
 * @see {@link file://./src/components/search/SearchInterface.tsx} - Search UI implementation
 * @see {@link file://./src/hooks/search/useFlexSearch.ts} - Primary search hook
 * @see {@link file://./src/hooks/search/useFederation.ts} - Cross-domain search
 * 
 * @since 2.0.0
 */

// ============================================================================
// SEARCH HOOKS
// ============================================================================

/**
 * Primary search hook with FlexSearch integration.
 * Provides full-text search with schema-aware tokenization.
 * 
 * @see {@link file://./useFlexSearch.ts}
 */
export { useFlexSearch } from './useFlexSearch'

/**
 * Search index management hook.
 * Handles index initialization, updates, and persistence.
 * 
 * @see {@link file://./useSearchIndex.ts}
 */
export { useSearchIndex } from './useSearchIndex'

/**
 * Search filtering hook.
 * Provides faceted filtering with real-time updates.
 * 
 * @see {@link file://./useSearchFilters.ts}
 */
export { useSearchFilters } from './useSearchFilters'

/**
 * Search analytics tracking hook.
 * Monitors search queries, clicks, and conversions.
 * 
 * @see {@link file://./useSearchTracking.ts}
 */
export { useSearchTracking } from './useSearchTracking'

/**
 * Cross-domain federation hook.
 * Aggregates search results from multiple ecosystem domains.
 * 
 * @see {@link file://./useFederation.ts}
 */
export { useFederation } from './useFederation'

/**
 * Search keyboard shortcuts hook.
 * Provides accessible keyboard navigation for search.
 * 
 * @see {@link file://./useSearchHotkeys.ts}
 */
export { useSearchHotkeys } from './useSearchHotkeys'

// ============================================================================
// TYPE EXPORTS
// ============================================================================

/**
 * Search filter configuration type.
 * Defines available filters and their options.
 */
export type { SearchFilters } from './useSearchFilters'