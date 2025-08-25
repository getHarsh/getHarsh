/**
 * @fileoverview useSchema - Centralized Schema.org structured data management
 * @module hooks/useSchema
 * 
 * @description
 * Provides type-safe Schema.org structured data generation for SEO and rich snippets.
 * This hook centralizes all Schema.org logic, ensuring consistency across the ecosystem
 * and alignment with Proto → Schema.org mappings defined in the build system.
 * 
 * Key features:
 * - Type-safe schema builders for all content types
 * - Context-aware base schemas (domain/blog/project)
 * - Schema composition and merging utilities
 * - JSON-LD rendering helpers
 * - Integration with build-time schema generation
 * 
 * @ecosystem-integration
 * - Proto schemas: 300+ field mappings from config/schema/
 * - Build system: Works with gatsby-node.js schema generation
 * - Site context: Detects domain/blog/project for appropriate base schema
 * - Configuration: Pulls from useConfig for dynamic values
 * 
 * @dos
 * - Use appropriate schema type based on content
 * - Include all required Schema.org properties
 * - Leverage proto-to-Schema.org mappings
 * - Test with Google's Rich Results Test
 * - Merge multiple schemas when needed
 * 
 * @donts
 * - Don't hardcode Schema.org types - use mappings
 * - Don't duplicate schema across pages
 * - Don't include PII in public schemas
 * - Don't forget dateModified for updates
 * - Don't skip schema validation
 * 
 * @schema-types
 * - WebSite: Base schema for domain sites
 * - Blog: BlogPosting collection for blog sites
 * - SoftwareApplication: Project documentation sites
 * - Article/BlogPosting: Individual content pages
 * - Organization: Company/entity information
 * - Service/Offer: Service offerings
 * - SearchAction: Site search functionality
 * - ItemList: Content collections
 * - Person: Author information
 * - SiteNavigationElement: Navigation structure
 * 
 * @usage
 * ```tsx
 * const { buildArticleSchema, renderJsonLd } = useSchema()
 * 
 * const schema = buildArticleSchema({
 *   title: article.title,
 *   author: article.author,
 *   datePublished: article.date,
 *   description: article.excerpt
 * })
 * 
 * return (
 *   <>
 *     {renderJsonLd(schema)}
 *     <article>...</article>
 *   </>
 * )
 * ```
 * 
 * @see {@link file://./config/schema/SCHEMA.md} - Proto to Schema.org mappings
 * @see {@link file://./BUILD.md#gatsby-integration-points} - Build-time schema generation
 * @see {@link file://./SEARCH.md#schema-aware-tokenization} - Schema-aware search
 * @see {@link file://./config/schema/blog.proto} - ArticleConfig proto
 * @see {@link file://./config/schema/services.proto} - ServicesConfig proto
 * @see {@link file://./src/hooks/useConfig.ts} - Configuration access
 * @see {@link file://./src/config/themes.ts} - Site type detection
 * @see {@link file://./src/utils/mappings.ts} - Schema type mappings
 * @see {@link https://developers.google.com/search/docs/appearance/structured-data} - Google structured data docs
 * 
 * @since 1.0.0
 */

import * as React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { useConfig } from './useConfig'
import { getSiteType, getProjectName } from '@/config/themes'
import { getSchemaType, transformWithSchema } from '@/utils/mappings'

/**
 * Article schema data structure
 */
interface ArticleSchemaData {
  title: string
  author?: string | { name: string; url?: string }
  datePublished: string
  dateModified?: string
  description?: string
  image?: string | string[]
  keywords?: string[]
  url?: string
  publisher?: OrganizationSchemaData
  contentType?: string // For dynamic Schema.org type mapping
  '@type'?: string // Allow explicit Schema.org type override
  sponsor?: { // Allow sponsor information
    '@type': string
    name: string
    url?: string
  }
}

/**
 * Organization schema data structure
 */
interface OrganizationSchemaData {
  name: string
  url?: string
  logo?: string
  description?: string
  email?: string
  sameAs?: string[]
  address?: {
    streetAddress?: string
    addressLocality?: string
    addressRegion?: string
    postalCode?: string
    addressCountry?: string
  }
}

/**
 * Software application schema data structure
 */
interface SoftwareApplicationSchemaData {
  name: string
  description?: string
  url?: string
  version?: string
  applicationCategory?: string
  projectType?: string // For dynamic Schema.org type mapping
  operatingSystem?: string
  author?: string | OrganizationSchemaData
  datePublished?: string
  dateModified?: string
  downloadUrl?: string
  screenshot?: string | string[]
  softwareRequirements?: string
  offers?: {
    price?: string | number
    priceCurrency?: string
  }
}

/**
 * Service/Offer schema data structure
 */
interface ServiceSchemaData {
  name: string
  description?: string
  provider?: OrganizationSchemaData
  serviceType?: string
  schemaType?: string // For dynamic Schema.org type mapping
  areaServed?: string | string[]
  url?: string
  offers?: {
    price?: string
    priceCurrency?: string
    availability?: string
  }
}

/**
 * Search action schema data structure
 */
interface SearchActionSchemaData {
  target: {
    urlTemplate: string
    entryPoint?: string
  }
  queryInput?: string
}

/**
 * useSchema hook - Centralized Schema.org management
 * 
 * @returns {Object} Schema builders and utilities
 */
export const useSchema = () => {
  // Get site metadata from GraphQL
  const { site } = useStaticQuery(graphql`
    query SchemaQuery {
      site {
        siteMetadata {
          title
          description
          siteUrl
          author
          domain
          theme {
            entity
          }
          legal_entity {
            name
          }
          social {
            github
            twitter
            linkedin
            youtube
          }
        }
      }
    }
  `)

  // Get configuration and context
  const config = useConfig()
  const siteType = getSiteType()
  const projectName = getProjectName()
  const siteMetadata = site.siteMetadata

  /**
   * Get base schema based on site type
   */
  const getBaseSchema = React.useCallback(() => {
    const baseUrl = siteMetadata.siteUrl || ''
    
    switch (siteType) {
      case 'project':
        // Try to get project type from configuration
        const projectType = 'PROJECT_TYPE_UNSPECIFIED' // Default project type
        const schemaType = getSchemaType('project_types', projectType, 'SoftwareApplication')
        
        return {
          '@context': 'https://schema.org',
          '@type': schemaType,
          name: projectName || siteMetadata.title,
          url: baseUrl,
          author: {
            '@type': 'Organization',
            name: siteMetadata.theme?.entity || siteMetadata.legal_entity?.name
          }
        }
      
      case 'blog':
        return {
          '@context': 'https://schema.org',
          '@type': 'Blog',
          name: `${siteMetadata.title} Blog`,
          url: baseUrl,
          description: siteMetadata.description,
          publisher: {
            '@type': 'Organization',
            name: siteMetadata.theme?.entity || siteMetadata.legal_entity?.name
          }
        }
      
      default: // domain
        return {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: siteMetadata.title,
          url: baseUrl,
          description: siteMetadata.description,
          publisher: {
            '@type': 'Organization',
            name: siteMetadata.theme?.entity || siteMetadata.legal_entity?.name
          }
        }
    }
  }, [siteType, projectName, siteMetadata])

  /**
   * Build Article/BlogPosting schema
   */
  const buildArticleSchema = React.useCallback((data: ArticleSchemaData) => {
    const author = typeof data.author === 'string' 
      ? { '@type': 'Person', name: data.author }
      : data.author 
        ? { '@type': 'Person', ...data.author }
        : { '@type': 'Person', name: siteMetadata.author || 'Unknown' }

    const publisher = data.publisher || {
      '@type': 'Organization',
      name: siteMetadata.theme?.entity || siteMetadata.legal_entity?.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteMetadata.siteUrl}/logo.png`
      }
    }

    // Determine Schema.org type based on content type enum or site type
    let schemaType: string
    if (data.contentType) {
      schemaType = getSchemaType('content_types', data.contentType, 'Article')
    } else {
      schemaType = siteType === 'blog' ? 'BlogPosting' : 'Article'
    }
    
    return {
      '@context': 'https://schema.org',
      '@type': schemaType,
      headline: data.title,
      description: data.description,
      author,
      publisher,
      datePublished: data.datePublished,
      dateModified: data.dateModified || data.datePublished,
      image: data.image,
      keywords: data.keywords?.join(', '),
      url: data.url || `${siteMetadata.siteUrl}/${data.title.toLowerCase().replace(/\s+/g, '-')}`,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': data.url || siteMetadata.siteUrl
      }
    }
  }, [siteType, siteMetadata])

  /**
   * Build Organization schema
   */
  const buildOrganizationSchema = React.useCallback((data?: Partial<OrganizationSchemaData>) => {
    const social = siteMetadata.social || {}
    const sameAs = [
      social.github,
      social.twitter,
      social.linkedin,
      social.youtube
    ].filter(Boolean)

    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: data?.name || siteMetadata.legal_entity?.name || siteMetadata.theme?.entity,
      url: data?.url || siteMetadata.siteUrl,
      logo: data?.logo || `${siteMetadata.siteUrl}/logo.png`,
      description: data?.description || siteMetadata.description,
      email: data?.email || undefined,
      sameAs: data?.sameAs || sameAs,
      ...(data?.address && {
        address: {
          '@type': 'PostalAddress',
          ...data.address
        }
      })
    }
  }, [siteMetadata, config])

  /**
   * Build SoftwareApplication schema for projects
   */
  const buildSoftwareApplicationSchema = React.useCallback((data: SoftwareApplicationSchemaData) => {
    // Determine Schema.org type based on project type enum
    const schemaType = data.projectType 
      ? getSchemaType('project_types', data.projectType, 'SoftwareApplication')
      : 'SoftwareApplication'
    
    return {
      '@context': 'https://schema.org',
      '@type': schemaType,
      name: data.name,
      description: data.description,
      url: data.url || siteMetadata.siteUrl,
      applicationCategory: data.applicationCategory || 'DeveloperApplication',
      operatingSystem: data.operatingSystem || 'Any',
      author: data.author || buildOrganizationSchema(),
      datePublished: data.datePublished,
      dateModified: data.dateModified || data.datePublished,
      version: data.version,
      downloadUrl: data.downloadUrl,
      screenshot: data.screenshot,
      softwareRequirements: data.softwareRequirements,
      ...(data.offers && {
        offers: {
          '@type': 'Offer',
          price: data.offers.price || '0',
          priceCurrency: data.offers.priceCurrency || 'USD'
        }
      })
    }
  }, [siteMetadata, buildOrganizationSchema])

  /**
   * Build Service/Offer schema
   */
  const buildServiceSchema = React.useCallback((data: ServiceSchemaData) => {
    // Determine Schema.org type based on service type enum
    const schemaType = data.schemaType 
      ? getSchemaType('service_types', data.schemaType, 'Service')
      : 'Service'
    
    return {
      '@context': 'https://schema.org',
      '@type': schemaType,
      name: data.name,
      description: data.description,
      provider: data.provider || buildOrganizationSchema(),
      serviceType: data.serviceType,
      areaServed: data.areaServed,
      url: data.url,
      ...(data.offers && {
        offers: {
          '@type': 'Offer',
          ...data.offers,
          availability: data.offers.availability || 'https://schema.org/InStock'
        }
      })
    }
  }, [buildOrganizationSchema])

  /**
   * Build SearchAction schema
   */
  const buildSearchActionSchema = React.useCallback((data?: Partial<SearchActionSchemaData>) => {
    const searchUrl = `${siteMetadata.siteUrl}/search?q={search_term_string}`
    
    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      url: siteMetadata.siteUrl,
      potentialAction: {
        '@type': 'SearchAction',
        target: data?.target || {
          '@type': 'EntryPoint',
          urlTemplate: searchUrl
        },
        'query-input': data?.queryInput || 'required name=search_term_string'
      }
    }
  }, [siteMetadata])

  /**
   * Build ItemList schema for collections
   */
  const buildItemListSchema = React.useCallback((items: any[], listName?: string) => {
    return {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: listName,
      numberOfItems: items.length,
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': item.type || 'Thing',
          name: item.name || item.title,
          url: item.url,
          ...item
        }
      }))
    }
  }, [])

  /**
   * Build SiteNavigationElement schema
   */
  const buildNavigationSchema = React.useCallback((navItems: Array<{ name: string; url: string }>) => {
    return {
      '@context': 'https://schema.org',
      '@type': 'SiteNavigationElement',
      name: 'Main Navigation',
      hasPart: navItems.map((item, index) => ({
        '@type': 'WebPage',
        name: item.name,
        url: item.url,
        position: index + 1
      }))
    }
  }, [])

  /**
   * Merge multiple schemas
   */
  const mergeSchemas = React.useCallback((...schemas: any[]) => {
    return schemas.filter(Boolean).reduce((merged, schema) => {
      if (!merged['@context']) {
        return schema
      }
      // If both have @context, create @graph
      if (!merged['@graph']) {
        return {
          '@context': 'https://schema.org',
          '@graph': [merged, schema]
        }
      }
      // Add to existing @graph
      merged['@graph'].push(schema)
      return merged
    }, {})
  }, [])

  /**
   * Generate JSON-LD string for script element
   * Components using this hook should render the script tag themselves
   */
  const renderJsonLd = React.useCallback((schema: Record<string, unknown> | null): string | null => {
    if (!schema) return null
    
    return JSON.stringify(schema, null, 2)
  }, [])

  return {
    // Base schema
    getBaseSchema,
    
    // Schema builders
    buildArticleSchema,
    buildOrganizationSchema,
    buildSoftwareApplicationSchema,
    buildServiceSchema,
    buildSearchActionSchema,
    buildItemListSchema,
    buildNavigationSchema,
    
    // Utilities
    mergeSchemas,
    renderJsonLd
  }
}