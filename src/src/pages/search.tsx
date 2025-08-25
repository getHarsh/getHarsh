/**
 * @fileoverview Search - Full-featured search page with FlexSearch integration
 * @module pages/search
 * 
 * @description
 * A comprehensive search page implementing privacy-conscious client-side search
 * using FlexSearch. Features filters, federated search across domains, empty
 * states with suggestions, and Schema.org SearchAction markup.
 * 
 * Key features:
 * - FlexSearch integration
 * - Real-time search results
 * - Advanced filtering (type, tags, authors, domains)
 * - Federated cross-domain search
 * - Empty state suggestions
 * - Search tracking
 * - Schema.org SearchAction
 * 
 * @ecosystem-integration
 * - Search: FlexSearch index hooks
 * - Components: SearchInput, SearchResults, SearchFilters
 * - Federation: FederatedSearch component
 * - Tracking: Search analytics hooks
 * 
 * @configuration
 * - Min query: 2 characters
 * - Filters: Dynamic from results
 * - Federation: Enabled by default
 * - Schema: SearchAction markup
 * 
 * @search-flow
 * - User types query (min 2 chars)
 * - FlexSearch performs local search
 * - Results filtered by active filters
 * - Empty states show suggestions
 * - Federation searches other domains
 * 
 * @filter-system
 * - Types: Content type filtering
 * - Tags: Tag-based filtering
 * - Authors: Author filtering
 * - Domains: Domain filtering
 * 
 * @dos
 * - DO: Debounce search input
 * - DO: Show loading states
 * - DO: Track search analytics
 * - DO: Include Schema markup
 * 
 * @donts
 * - DON'T: Search with < 2 chars
 * - DON'T: Block UI during search
 * - DON'T: Forget empty states
 * - DON'T: Skip federation
 * 
 * @example
 * ```tsx
 * // Search flow:
 * // 1. User types "AI transformation"
 * // 2. FlexSearch returns local results
 * // 3. Filters extracted from results
 * // 4. User applies "articles" filter
 * // 5. Results updated
 * // 6. Federation shows cross-domain results
 * 
 * // Empty state:
 * // Shows suggestions based on query
 * // Clicking suggestion updates search
 * ```
 * 
 * @see {@link ../../../PRD_SEARCH.md} - Search system PRD
 * @see {@link ../../../SEARCH.md} - Search architecture
 * @see {@link ../hooks/search.ts} - Search hooks
 * 
 * @since 1.0.0
 */

import React, { useState } from 'react'
import { HeadFC, PageProps } from 'gatsby'
import { PageLayout } from '../components/layout'
import { SearchInput } from '../components/search/SearchInput'
import { SearchResults } from '../components/search/SearchResults'
import { SearchEmpty } from '../components/search/SearchEmpty'
import { SearchFilters } from '../components/search/SearchFilters'
import { FederatedSearch } from '../components/search/FederatedSearch'
import {
  useSearchIndex,
  useSearchFilters,
  useSearchTracking
} from '../hooks/search'
import { useGTM } from '@/hooks/useGTM'
import { useSchema } from '@/hooks/useSchema'
import { getSiteType, getProjectName } from '@/config/themes'
import { getSchemaType } from '@/utils/mappings'

/**
 * SearchPage component - Full-text search with filtering
 * 
 * @param {PageProps} props - Gatsby page props
 * @returns {JSX.Element} Search page with results and filters
 */
const SearchPage: React.FC<PageProps> = ({ data, pageContext }) => {
  const [query, setQuery] = useState('')
  
  const { search, isReady, isLoading, documentCount } = useSearchIndex()
  const { filters, applyFilters, updateFilter } = useSearchFilters()
  const { trackSearch, trackSearchEmpty, trackSearchSuggestionClick } = useSearchTracking()
  const { trackPageView } = useGTM()
  const { getBaseSchema, buildSearchActionSchema, mergeSchemas, renderJsonLd } = useSchema()
  const siteType = getSiteType()
  const projectName = getProjectName()
  const isProject = siteType === 'project'

  // Perform search
  const rawResults = query.length >= 2 ? search(query) : []
  const filteredResults = applyFilters(rawResults)

  // Track search page view
  React.useEffect(() => {
    trackPageView({
      page_title: 'Search',
      page_path: '/search',
      page_type: 'search',
      document_count: documentCount,
      site_type: siteType,
      ...(isProject && { project_name: projectName })
    })
  }, [documentCount, siteType, isProject, projectName, trackPageView])
  
  // Track search
  React.useEffect(() => {
    if (query.length >= 2) {
      if (filteredResults.length > 0) {
        trackSearch(query, filteredResults.length)
      } else {
        trackSearchEmpty(query)
      }
    }
  }, [query, filteredResults.length])

  const handleSuggestionClick = (suggestion: string) => {
    trackSearchSuggestionClick(suggestion, query)
    setQuery(suggestion)
  }

  // Extract available filter options from results
  const availableFilters = {
    types: [...new Set(rawResults.map(r => r.content_type_label || r.type))],
    tags: [...new Set(rawResults.flatMap(r => r.tags || []))],
    authors: [...new Set(rawResults.flatMap(r => r.author_names || []))],
    domains: [...new Set(rawResults.map(r => r.domain || r.cross_posting?.canonical_domain).filter(Boolean))]
  }
  
  // Build page-level Schema.org for search page
  const searchPageSchema = React.useMemo(() => {
    const baseSchema = getBaseSchema()
    const searchActionSchema = buildSearchActionSchema()
    
    const pageSchema = {
      '@context': 'https://schema.org',
      '@type': getSchemaType('page_types', 'PAGE_TYPE_SEARCH', 'WebPage'),
      '@id': `${baseSchema.url}/search#webpage`,
      url: `${baseSchema.url}/search`,
      name: 'Search',
      description: `Search across ${documentCount} documents in the ecosystem`,
      isPartOf: {
        '@id': `${baseSchema.url}#website`
      },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: baseSchema.url
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Search',
            item: `${baseSchema.url}/search`
          }
        ]
      },
      potentialAction: searchActionSchema.potentialAction
    }
    
    return mergeSchemas(baseSchema, pageSchema)
  }, [documentCount, getBaseSchema, buildSearchActionSchema, mergeSchemas])

  return (
    <>
      {/* Page-level Schema.org JSON-LD */}
      {renderJsonLd(searchPageSchema)}
      
      <PageLayout>
      <main className="container mx-auto px-4 py-8 max-w-6xl" role="main" aria-label="Search page">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Search
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Search across {documentCount} documents in the ecosystem
          </p>
        </header>

        {/* Search Bar */}
        <section className="max-w-2xl mx-auto mb-8" role="search" aria-label="Search form">
          <SearchInput
            value={query}
            onChange={setQuery}
            onSearch={setQuery}
            placeholder="Search for content, projects, or people..."
            autoFocus
            showShortcut
          />
        </section>

        {/* Content */}
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          {rawResults.length > 0 && (
            <aside className="w-64 flex-shrink-0" role="region" aria-label="Search filters">
              <div className="sticky top-4">
                <SearchFilters
                  filters={filters}
                  onFilterChange={(newFilters) => {
                    Object.keys(newFilters).forEach(key => {
                      updateFilter(key as any, newFilters[key as keyof typeof newFilters])
                    })
                  }}
                  availableFilters={availableFilters}
                />
              </div>
            </aside>
          )}

          {/* Results */}
          <section className="flex-1 min-w-0" role="region" aria-label="Search results">
            {isLoading ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
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
                  Loading search index...
                </div>
              </div>
            ) : query.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Start your search
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Type in the search box above to find content
                </p>
              </div>
            ) : query.length < 2 ? (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                Type at least 2 characters to search
              </div>
            ) : filteredResults.length > 0 ? (
              <>
                <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                  Found {filteredResults.length} result{filteredResults.length !== 1 ? 's' : ''} for &quot;{query}&quot;
                </div>
                
                <SearchResults
                  results={filteredResults}
                  query={query}
                  onResultClick={(index) => {
                    const result = filteredResults[index]
                    if (result) {
                      window.location.href = `/${result.type}/${result.id}/`
                    }
                  }}
                />
                
                {/* Federation Results */}
                <section className="mt-12 pt-12 border-t dark:border-gray-700" aria-label="Federated search results">
                  <FederatedSearch
                    query={query}
                    enabled={true}
                  />
                </section>
              </>
            ) : (
              <SearchEmpty
                query={query}
                onSuggestionClick={handleSuggestionClick}
              />
            )}
          </section>
        </div>
      </main>
    </PageLayout>
    </>
  )
}

export default SearchPage

/**
 * Head component for search page SEO
 * 
 * @returns {JSX.Element} SEO meta tags for search page
 */
export const Head: HeadFC = () => (
  <>
    <title>Search | getHarsh Ecosystem</title>
    <meta name="description" content="Search across the entire getHarsh ecosystem - articles, projects, documentation, and more." />
    <meta property="og:title" content="Search | getHarsh Ecosystem" />
    <meta property="og:description" content="Search across the entire getHarsh ecosystem - articles, projects, documentation, and more." />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="Search | getHarsh Ecosystem" />
    <meta name="twitter:description" content="Search across the entire getHarsh ecosystem" />
  </>
)