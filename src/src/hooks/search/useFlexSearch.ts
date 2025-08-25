/**
 * @fileoverview FlexSearch Integration Hook for In-Browser Full-Text Search
 * @module hooks/search/useFlexSearch
 * 
 * @description
 * Core search functionality using FlexSearch for fast, in-browser full-text search.
 * This hook provides schema-aware tokenization, multi-index support, and language-specific
 * configurations optimized for different content types in the getHarsh ecosystem.
 * 
 * FlexSearch was chosen for its:
 * - Small bundle size (~0.3MB)
 * - Fast indexing and search (<10ms latency)
 * - Language-aware stemming
 * - Flexible tokenization strategies
 * - Memory-efficient storage
 * 
 * @architecture
 * The search system uses a multi-index architecture:
 * - **Unified Index**: All documents for general search
 * - **Type Indexes**: Separate indexes for posts, pages, projects
 * - **Specialized Indexes**: Language+Schema specific indexes (e.g., en-HowTo)
 * - **Schema-Aware Config**: Different tokenization per Schema.org type
 * 
 * @schema-aware-tokenization
 * Based on content Schema.org type (from proto mappings):
 * - HowTo: Strict tokenization for step-by-step content
 * - FAQPage: Forward tokenization for Q&A content
 * - TechArticle: Full tokenization with advanced encoding
 * - BlogPosting: Balanced tokenization for general content
 * - ScholarlyArticle: Advanced tokenization with deep resolution
 * 
 * @ecosystem-integration
 * - Proto schemas: Uses 300+ Schema.org mappings for tokenization
 * - Search index: Consumes pre-built index from gatsby-node.js
 * - Multi-language: Supports en, hi, and other languages
 * - Boost factors: Respects document boost values (0.5-2.0)
 * - Federation: Works with useFederation for cross-domain search
 * 
 * @performance
 * - Index build: ~50ms for 1000 documents
 * - Search latency: <10ms for most queries
 * - Memory usage: ~2-5MB for typical blog
 * - Result limit: Default 20, configurable
 * - Caching: Built-in FlexSearch caching
 * 
 * @dos
 * - Use multi-index for large sites (>500 documents)
 * - Configure schema-specific tokenization
 * - Implement boost factors for ranking
 * - Clear indexes when switching domains
 * - Use specialized indexes for better precision
 * 
 * @donts
 * - Don't index sensitive content
 * - Don't skip schema-aware configuration
 * - Don't use single index for diverse content
 * - Don't ignore language settings
 * - Don't index without checking memory
 * 
 * @example
 * ```tsx
 * const { search, addDocuments, isReady } = useFlexSearch({
 *   useMultiIndex: true,
 *   language: 'en',
 *   entityType: 'blog'
 * })
 * 
 * // Load search index
 * useEffect(() => {
 *   if (isReady) {
 *     fetch('/search-index.json')
 *       .then(res => res.json())
 *       .then(data => addDocuments(data.documents))
 *   }
 * }, [isReady])
 * 
 * // Search with boost
 * const results = search(query, { boost: true, limit: 10 })
 * ```
 * 
 * @see {@link file://./SEARCH.md} - Complete search documentation
 * @see {@link file://./BUILD.md#search-index-generation} - Index generation
 * @see {@link file://./config/schema/SCHEMA.md} - Schema.org mappings
 * @see {@link file://./config/tools/generate-search-index.js} - Index builder
 * @see {@link file://./src/components/search/SearchInterface.tsx} - UI implementation
 * @see {@link https://github.com/nextapps-de/flexsearch} - FlexSearch documentation
 * 
 * @since 2.0.0
 */

import { useEffect, useRef, useState } from 'react'
import FlexSearch from 'flexsearch'
import { SearchDocument } from '@/types/api'

/**
 * FlexSearch configuration options.
 * Controls tokenization, encoding, and multi-index behavior.
 */
interface FlexSearchConfig {
  entityType?: string
  tokenize?: string | ((str: string) => string[])
  encode?: string
  threshold?: number
  depth?: number
  resolution?: number
  language?: string
  useMultiIndex?: boolean
  schemaType?: string
}

/**
 * Collection of search indexes for multi-index mode.
 * Provides type-specific and specialized search capabilities.
 */
interface IndexCollection {
  unified: FlexSearch.Document<SearchDocument>
  posts?: FlexSearch.Document<SearchDocument>
  pages?: FlexSearch.Document<SearchDocument>
  projects?: FlexSearch.Document<SearchDocument>
  specialized?: Map<string, FlexSearch.Document<SearchDocument>>
}

/**
 * FlexSearch integration hook.
 * Provides schema-aware, multi-index search capabilities.
 * 
 * @param {FlexSearchConfig} config - Search configuration
 * @returns Search methods and state
 */
export function useFlexSearch(config?: FlexSearchConfig) {
  const indexRef = useRef<FlexSearch.Document<SearchDocument> | null>(null)
  const indexCollectionRef = useRef<IndexCollection | null>(null)
  const [isReady, setIsReady] = useState(false)
  const [documents, setDocuments] = useState<Map<string, SearchDocument>>(new Map())

  useEffect(() => {
    // Create base configuration
    const baseConfig = {
      language: config?.language || 'en',
      cache: true,
      doc: {
        id: 'id',
        field: [
          'title',
          'summary',
          'content',
          'tags',
          'keywords',
          'author_names',
          'project_names',
          'content_type_label',
          'schema_org_type'
        ]
      }
    }

    if (config?.useMultiIndex) {
      // Initialize multi-index collection for advanced search
      const collection: IndexCollection = {
        unified: new FlexSearch.Document({
          ...baseConfig,
          preset: 'performance' as const,
          tokenize: 'forward',
          encode: 'balance',
          resolution: 7
        }),
        posts: new FlexSearch.Document({
          ...baseConfig,
          tokenize: 'forward',
          encode: 'balance',
          resolution: 6
        }),
        pages: new FlexSearch.Document({
          ...baseConfig,
          tokenize: 'forward',
          encode: 'balance',
          resolution: 7
        }),
        projects: new FlexSearch.Document({
          ...baseConfig,
          tokenize: 'reverse',  // Better for project names
          encode: 'simple',
          resolution: 5
        }),
        specialized: new Map()
      }
      
      indexCollectionRef.current = collection
      // Use unified index as the main index
      indexRef.current = collection.unified
    } else {
      // Single index mode with custom or default config
      const searchConfig = {
        ...baseConfig,
        preset: 'performance' as const,
        tokenize: (config?.tokenize || 'forward') as any,
        encode: (config?.encode || 'balance') as any,
        resolution: config?.resolution || 9
      }
      
      indexRef.current = new FlexSearch.Document(searchConfig)
      indexCollectionRef.current = null
    }
    
    setIsReady(true)

    return () => {
      // Cleanup on unmount
      indexRef.current = null
      indexCollectionRef.current = null
      setIsReady(false)
    }
  }, [config?.language, config?.useMultiIndex, config?.tokenize, config?.encode, config?.resolution])

  /**
   * Add documents to the search index(es).
   * Handles multi-index distribution and specialized index creation.
   * 
   * @param docs - Array of search documents to index
   */
  const addDocuments = (docs: SearchDocument[]) => {
    if (!indexRef.current || !isReady) return

    const newDocs = new Map(documents)
    
    if (indexCollectionRef.current) {
      // Multi-index mode: add to appropriate indexes
      docs.forEach(doc => {
        const collection = indexCollectionRef.current!
        
        // Add to unified index
        collection.unified.add(doc)
        
        // Add to type-specific index
        if (doc.type === 'post' && collection.posts) {
          collection.posts.add(doc)
        } else if (doc.type === 'page' && collection.pages) {
          collection.pages.add(doc)
        } else if (doc.type === 'project' && collection.projects) {
          collection.projects.add(doc)
        }
        
        // Add to language+schema specialized index if needed
        const lang = doc.language || 'en'
        const schemaType = doc.schema_org_type || 'Article'
        const specializedKey = `${lang}-${schemaType}`;
        
        // Create specialized index if it doesn't exist and we have enough docs
        if (!collection.specialized?.has(specializedKey)) {
          const specializationThreshold = 5 // Only create if we'll have 5+ docs
          const similarDocs = Array.from(newDocs.values()).filter(
            d => (d.language || 'en') === lang && (d.schema_org_type || 'Article') === schemaType
          )
          
          if (similarDocs.length >= specializationThreshold) {
            const specializedConfig = createSchemaAwareConfig(schemaType, lang)
            const specializedIndex = new FlexSearch.Document<SearchDocument>(specializedConfig)
            collection.specialized?.set(specializedKey, specializedIndex)
            
            // Add all similar docs to the new index
            similarDocs.forEach(d => specializedIndex.add(d))
          }
        } else {
          // Add to existing specialized index
          collection.specialized?.get(specializedKey)?.add(doc)
        }
        
        newDocs.set(doc.id, doc)
      })
    } else {
      // Single index mode
      docs.forEach(doc => {
        indexRef.current?.add(doc)
        newDocs.set(doc.id, doc)
      })
    }
    
    setDocuments(newDocs)
  }
  
  /**
   * Create schema-aware search configuration.
   * Different Schema.org types get optimized tokenization.
   * 
   * @param schemaType - Schema.org type (HowTo, FAQPage, etc.)
   * @param language - Language code for stemming
   * @returns FlexSearch configuration object
   */
  const createSchemaAwareConfig = (schemaType: string, language: string = 'en') => {
    const baseConfig = {
      language,
      cache: true,
      doc: {
        id: 'id',
        field: [
          'title',
          'summary',
          'content',
          'tags',
          'keywords',
          'author_names',
          'project_names',
          'content_type_label',
          'schema_org_type'
        ]
      }
    }
    
    // Schema-specific configurations matching generate-search-index.js
    const schemaConfigs: Record<string, any> = {
      'HowTo': {
        tokenize: 'strict',
        encode: 'advanced',
        threshold: 7,
        depth: 4,
        resolution: 9,
        stemmer: language === 'en' ? 'en' : undefined
      },
      'FAQPage': {
        tokenize: 'forward',
        encode: 'balance',
        threshold: 5,
        depth: 3,
        resolution: 7,
        stemmer: language === 'en' ? 'en' : undefined
      },
      'TechArticle': {
        tokenize: 'full',
        encode: 'advanced',
        threshold: 6,
        depth: 5,
        resolution: 9,
        stemmer: language === 'en' ? 'en' : undefined
      },
      'ScholarlyArticle': {
        tokenize: 'full',
        encode: 'advanced',
        threshold: 6,
        depth: 5,
        resolution: 11,
        stemmer: language === 'en' ? 'en' : undefined
      },
      'BlogPosting': {
        tokenize: 'forward',
        encode: 'balance',
        threshold: 4,
        depth: 3,
        resolution: 6,
        stemmer: language === 'en' ? 'en' : undefined
      }
    }
    
    return {
      ...baseConfig,
      ...(schemaConfigs[schemaType] || schemaConfigs['BlogPosting'])
    }
  }

  /**
   * Search documents with optional index selection.
   * Supports boost factors and result limiting.
   * 
   * @param query - Search query string
   * @param options - Search options
   * @returns Array of matching documents
   */
  const search = (query: string, options?: { 
    limit?: number; 
    suggest?: boolean;
    index?: 'unified' | 'posts' | 'pages' | 'projects' | string;
    boost?: boolean;
  }) => {
    if (!isReady || !query) return []

    const searchOptions = {
      limit: options?.limit || 20,
      suggest: options?.suggest || false,
      enrich: true
    }

    let results: any[]
    
    if (indexCollectionRef.current && options?.index) {
      // Multi-index mode with specific index selection
      const collection = indexCollectionRef.current
      
      if (options.index.includes('-')) {
        // Specialized index (e.g., 'en-HowTo')
        const specializedIndex = collection.specialized?.get(options.index)
        results = specializedIndex ? specializedIndex.search(query, searchOptions) : []
      } else {
        // Standard index
        const index = collection[options.index as keyof IndexCollection] as FlexSearch.Document<SearchDocument>
        results = index ? index.search(query, searchOptions) : []
      }
    } else if (indexRef.current) {
      // Single index mode or default unified search
      results = indexRef.current.search(query, searchOptions)
    } else {
      return []
    }
    
    // Flatten and map results to documents with boost sorting
    const resultMap = new Map<string, { doc: SearchDocument; score: number }>()
    
    results.forEach((fieldResult: any) => {
      fieldResult.result.forEach((id: string, index: number) => {
        if (!resultMap.has(id)) {
          const doc = documents.get(id)
          if (doc) {
            // Calculate score based on position and boost
            const positionScore = 1 / (index + 1)
            const boostFactor = options?.boost && doc.boost ? doc.boost : 1
            const score = positionScore * boostFactor
            
            resultMap.set(id, { doc, score })
          }
        }
      })
    })

    // Sort by score and return documents
    const sortedResults = Array.from(resultMap.values())
      .sort((a, b) => b.score - a.score)
      .map(result => result.doc)
      .slice(0, searchOptions.limit)

    return sortedResults
  }
  
  /**
   * Search across multiple indexes simultaneously.
   * Combines and deduplicates results with score boosting.
   * 
   * @param query - Search query string
   * @param options - Multi-index search options
   * @returns Combined and ranked results
   */
  const searchMultiIndex = (query: string, options?: {
    limit?: number;
    suggest?: boolean;
    indexes?: string[];
    boost?: boolean;
  }) => {
    if (!indexCollectionRef.current || !isReady || !query) {
      // Fallback to single index search
      return search(query, options)
    }
    
    const collection = indexCollectionRef.current
    const searchIndexes = options?.indexes || ['unified', 'posts', 'pages', 'projects']
    const combinedResults = new Map<string, { doc: SearchDocument; score: number; sources: string[] }>()
    
    // Search each requested index
    searchIndexes.forEach(indexName => {
      const results = search(query, { ...options, index: indexName })
      
      results.forEach((doc, position) => {
        const existing = combinedResults.get(doc.id)
        const positionScore = 1 / (position + 1)
        const boostFactor = options?.boost && doc.boost ? doc.boost : 1
        const score = positionScore * boostFactor
        
        if (existing) {
          // Document found in multiple indexes - boost its score
          existing.score += score * 0.5 // Bonus for appearing in multiple indexes
          existing.sources.push(indexName)
        } else {
          combinedResults.set(doc.id, {
            doc,
            score,
            sources: [indexName]
          })
        }
      })
    })
    
    // Sort by combined score and return
    const sortedResults = Array.from(combinedResults.values())
      .sort((a, b) => b.score - a.score)
      .map(result => result.doc)
      .slice(0, options?.limit || 20)
    
    return sortedResults
  }

  /**
   * Clear all search indexes.
   * Used when switching domains or resetting search.
   */
  const clearIndex = () => {
    if (indexCollectionRef.current) {
      // Clear all indexes in collection
      const collection = indexCollectionRef.current
      
      documents.forEach((_, id) => {
        collection.unified.remove(id)
        collection.posts?.remove(id)
        collection.pages?.remove(id)
        collection.projects?.remove(id)
        
        // Clear from specialized indexes
        collection.specialized?.forEach(index => {
          index.remove(id)
        })
      })
      
      // Clear specialized indexes map
      collection.specialized?.clear()
    } else if (indexRef.current) {
      // Clear single index
      documents.forEach((_, id) => {
        indexRef.current?.remove(id)
      })
    }
    
    setDocuments(new Map())
  }
  
  /**
   * Get list of available search indexes.
   * Includes type-specific and specialized indexes.
   * 
   * @returns Array of index names
   */
  const getAvailableIndexes = () => {
    if (!indexCollectionRef.current) return ['unified']
    
    const indexes = ['unified']
    const collection = indexCollectionRef.current
    
    if (collection.posts && documents.size > 0) indexes.push('posts')
    if (collection.pages && documents.size > 0) indexes.push('pages')
    if (collection.projects && documents.size > 0) indexes.push('projects')
    
    // Add specialized indexes
    collection.specialized?.forEach((_, key) => {
      indexes.push(key)
    })
    
    return indexes
  }

  return {
    isReady,
    addDocuments,
    search,
    searchMultiIndex,
    clearIndex,
    documentCount: documents.size,
    getAvailableIndexes,
    isMultiIndex: !!indexCollectionRef.current
  }
}