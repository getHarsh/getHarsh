/**
 * @fileoverview API Type Definitions for the getHarsh Ecosystem
 * @module types/api
 * 
 * @description
 * Comprehensive type definitions for API responses, data structures, and configurations
 * used throughout the getHarsh ecosystem. These types ensure type safety across:
 * - Search and federation systems
 * - Service management and CTAs
 * - Project metadata and relationships
 * - Domain configurations and consent
 * - Schema.org structured data
 * - Form submissions and user interactions
 * 
 * All types are derived from the proto-driven architecture (77+ protobuf definitions
 * generating 381 JSON schemas) and maintain consistency with the backend systems.
 * 
 * @ecosystem-integration
 * - Search types: Used by FlexSearch integration (SEARCH.md)
 * - Service types: Powers the services system (SERVICES.md)
 * - Config types: Derived from processed YAML configs (BUILD.md)
 * - Schema.org types: Implements 300+ proto-to-Schema.org mappings
 * 
 * @dos
 * - Use these types for all API interactions
 * - Extend interfaces when adding new fields
 * - Keep in sync with proto definitions
 * - Document any custom extensions
 * 
 * @donts
 * - Don't duplicate these types elsewhere
 * - Don't use 'any' when these types exist
 * - Don't modify without updating proto schemas
 * - Don't remove optional markers without checking usage
 * 
 * @see {@link file://./BUILD.md} - Build pipeline and configuration processing
 * @see {@link file://./SEARCH.md} - Search system architecture
 * @see {@link file://./SERVICES.md} - Services configuration and rendering
 * @see {@link file://./CMS.md} - CMS integration and content types
 * @see {@link file://./config/schema/blog.proto} - ArticleConfig proto definition
 * @see {@link file://./config/schema/services.proto} - ServicesConfig proto definition
 */

// ============================================================================
// SEARCH TYPES
// ============================================================================

/**
 * Represents a searchable document in the FlexSearch index.
 * Derived from ArticleConfig proto with additional search-specific fields.
 * 
 * @see {@link file://./config/schema/blog.proto} - ArticleConfig message
 * @see {@link file://./SEARCH.md#schema-aware-tokenization} - Search tokenization
 */
export interface SearchDocument {
  /** Unique identifier for the document (typically slug or ID) */
  id: string;
  /** Document title from ArticleConfig.title */
  title: string;
  /** Main content body (markdown converted to text for indexing) */
  content: string;
  /** Full URL path to the document */
  url?: string;
  /** Document type (article, page, project, service) */
  type: string;
  /** Content category for filtering */
  category?: string;
  /** Tags array from ArticleConfig.tags */
  tags?: string[];
  /** ISO date string of publication */
  date?: string;
  /** Primary author key from persons catalog */
  author?: string;
  /** Content excerpt for search results display */
  excerpt?: string;
  /** Featured image URL for visual results */
  image?: string;
  
  // Cross-domain federation fields
  /** Source domain for federated search results */
  domain?: string;
  /** Cross-posting configuration from ArticleConfig */
  cross_posting?: any;
  
  // FlexSearch-specific fields from processing
  /** Article summary from frontmatter */
  summary?: string;
  /** SEO keywords for enhanced matching */
  keywords?: string[];
  /** Resolved author names from persons catalog */
  author_names?: string[];
  /** Resolved project names from projects catalog */
  project_names?: string[];
  /** Content type enum from ArticleConfig */
  content_type?: string;
  /** Human-readable content type label */
  content_type_label?: string;
  /** Schema.org type from 300+ mappings */
  schema_org_type?: string;
  /** Published date in ISO format */
  date_published?: string;
  /** Featured image for rich results */
  featured_image_url?: string;
  /** Language code (en, hi, etc.) for language-specific indexes */
  language?: string;
  /** Featured flag for priority display */
  is_featured?: boolean;
  /** Estimated reading time in minutes */
  reading_time_minutes?: number;
  /** Relevance boost factor (0.5-2.0) for ranking */
  boost?: number;
  /** Relationship mappings for GraphQL integration */
  relationships?: {
    /** Cross-posted domain relationships */
    crossPosting?: string[];
    /** Related project keys */
    projects?: string[];
  };
  /** Canonical URL path for deduplication */
  url_path?: string;
}

/**
 * Search result item returned from FlexSearch queries.
 * Includes scoring and highlighting for relevance display.
 * 
 * @see {@link file://./src/components/search/SearchResultItem.tsx} - Result rendering
 */
export interface SearchResult {
  id: string;
  title: string;
  content: string;
  url: string;
  type: string;
  score?: number;
  highlights?: {
    title?: string;
    content?: string;
  };
}

/**
 * Federated search result from cross-domain queries.
 * Enables ecosystem-wide content discovery.
 * 
 * @see {@link file://./SEARCH.md#cross-domain-federation} - Federation architecture
 * @see {@link file://./src/components/search/FederatedSearch.tsx} - Federation component
 */
export interface FederationResult {
  source: string;
  domain: string;
  results: SearchResult[];
  error?: string;
  timestamp?: number;
}

/**
 * Complete search response with pagination and federation support.
 * Used by search API endpoints and client-side search.
 */
export interface SearchResponse {
  results: SearchResult[];
  total: number;
  page?: number;
  pageSize?: number;
  federatedResults?: FederationResult[];
}

// ============================================================================
// SERVICE TYPES
// ============================================================================

/**
 * Service definition from config_services.yml.
 * Represents AI transformation and consulting services.
 * 
 * @see {@link file://./config/schema/services.proto} - Service message
 * @see {@link file://./SERVICES.md} - Services system documentation
 * @see {@link file://./src/components/services/ServiceCard.tsx} - Service rendering
 */
export interface Service {
  id: string;
  name?: string;
  title: string;
  tagline: string;
  description: string;
  category?: string;
  price?: string | number;
  priceRange?: string;
  features?: string[];
  outcomes?: string[];
  deliverables?: string[];
  icon?: string;
  accent_color?: string;
  schema_type?: string;
  is_active?: boolean;
  display_order?: number;
  status?: 'active' | 'beta' | 'deprecated';
}

/**
 * Service call-to-action configuration.
 * Drives conversion funnels and user engagement.
 * 
 * @see {@link file://./src/components/services/ServiceCTASection.tsx} - CTA rendering
 */
export interface ServiceCTA {
  text: string;
  url: string;
  action: string;
  target: '_blank' | '_self';
  variant?: 'primary' | 'secondary' | 'outline';
}

// ============================================================================
// PROJECT TYPES
// ============================================================================

/**
 * Project metadata from projects catalog.
 * Represents ecosystem projects and their relationships.
 * 
 * @see {@link file://./config/catalogs/projects.yml} - Projects catalog
 * @see {@link file://./src/components/project/ProjectCard.tsx} - Project display
 */
export interface Project {
  id: string;
  name: string;
  title: string;
  description: string;
  category: string;
  status: string;
  technologies: string[];
  links?: {
    demo?: string;
    repository?: string;
    documentation?: string;
  };
}

// ============================================================================
// CONFIGURATION TYPES
// ============================================================================

/**
 * Base configuration data structure.
 * Processed from domain config.yml files by the build pipeline.
 * 
 * @see {@link file://./config/schema/domain.proto} - DomainConfig message
 * @see {@link file://./BUILD.md#configuration-processing} - Config pipeline
 * @see {@link file://./src/hooks/useConfig.ts} - Config access hook
 */
export interface ConfigData {
  domain_info?: {
    domain?: string;
    title?: string;
    entity?: string;
    description?: string;
  };
  theme?: {
    entity?: string;
    colors?: {
      primary?: string;
      secondary?: string;
      background?: string;
      text?: string;
      accent?: string;
      error?: string;
      success?: string;
    };
    theme_mode?: {
      default?: 'light' | 'dark';
      allow_toggle?: boolean;
    };
  };
  project_info?: {
    name?: string;
    links?: {
      repository?: string;
      documentation?: string;
      demo?: string;
    };
  };
  contact?: {
    email?: string;
    phone?: string;
    address?: string;
  };
  features?: {
    services_enabled?: boolean;
    search?: boolean;
  };
  nav?: {
    home?: string;
    about?: string;
    thoughts?: string;
    highlights?: string;
    connect?: string;
    docs?: string;
    github?: string;
  };
}

/**
 * Extended domain configuration with consent management.
 * Includes GDPR/CCPA compliance and Google Consent Mode v2.
 * 
 * @see {@link file://./config/CONSENT-ARCHITECTURE.md} - Consent system
 * @see {@link file://./src/components/consent/ConsentBanner.tsx} - Consent UI
 */
export interface DomainConfig extends ConfigData {
  consent?: {
    enable_consent_banner?: boolean;
    consent_cookie_name?: string;
    consent_duration_days?: number;
    google_consent_mode_v2?: boolean;
    banner_theme?: string;
    // Extended consent fields from errors
    region_defaults?: Record<string, any>;
    enable_granular_control?: boolean;
    settings_button_text?: string;
    categories_config?: Record<string, any>;
  };
}

/**
 * Generic call-to-action configuration.
 * Used across hero sections, service pages, and marketing components.
 */
export interface CTAConfig {
  text: string;
  url: string;
  variant?: 'primary' | 'secondary' | 'outline';
}

// ============================================================================
// SCHEMA.ORG TYPES
// ============================================================================

/**
 * Schema.org JSON-LD structured data.
 * Implements 300+ proto-to-Schema.org mappings for rich results.
 * 
 * @see {@link file://./config/schema/SCHEMA.md} - Schema mapping system
 * @see {@link file://./src/utils/schema-org.ts} - Schema utilities
 */
export interface SchemaOrgJsonLd {
  '@context': string;
  '@type': string;
  '@id'?: string;
  [key: string]: any;
}

// ============================================================================
// FORM DATA TYPES
// ============================================================================

/**
 * Quote form submission data.
 * Used for service inquiries and lead generation.
 * 
 * @see {@link file://./src/components/services/ServiceCTASection.tsx} - Quote form
 */
export interface QuoteFormData {
  name: string;
  email: string;
  message: string;
  service?: string;
  source?: string;
}