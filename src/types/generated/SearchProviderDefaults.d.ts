/**
 * TypeScript definitions for SearchProviderDefaults
 *
 * Generated from: SearchProviderDefaults.schema.json
 * Generated on: 2025-08-16T20:49:14.142Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for SearchProviderDefaults configuration
 */
export interface SEARCHPROVIDERDEFAULTSConfigurationSchema {
  unspecified?: SearchProviderMapping;
  algolia?: SearchProviderMapping1;
  lunr?: SearchProviderMapping2;
  fuse?: SearchProviderMapping3;
  custom?: SearchProviderMapping4;
}
/**
 * SEARCH_PROVIDER_UNSPECIFIED  name: "" service_url: "" client_library: "" index_config: {} features: {}
 */
export interface SearchProviderMapping {
  /**
   * Provider name
   */
  name?: string;
  /**
   * Service URL
   */
  service_url?: string;
  /**
   * Client library
   */
  client_library?: string;
  /**
   * Index configuration
   */
  index_config?: {
    [k: string]: string;
  };
  /**
   * Features
   */
  features?: {
    [k: string]: boolean;
  };
}
/**
 * SEARCH_PROVIDER_ALGOLIA  name: "Algolia" service_url: "https://www.algolia.com/" client_library: "algoliasearch" index_config: { "attributesToIndex": "title,content,tags", "attributesToHighlight": "title,content" } features: { "instant_search": "true", "facets": "true", "analytics": "true", "ai_powered": "true" }
 */
export interface SearchProviderMapping1 {
  /**
   * Provider name
   */
  name?: string;
  /**
   * Service URL
   */
  service_url?: string;
  /**
   * Client library
   */
  client_library?: string;
  /**
   * Index configuration
   */
  index_config?: {
    [k: string]: string;
  };
  /**
   * Features
   */
  features?: {
    [k: string]: boolean;
  };
}
/**
 * SEARCH_PROVIDER_LUNR  name: "Lunr.js" service_url: "https://lunrjs.com/" client_library: "lunr" index_config: { "fields": "title,content,tags", "boost": "title^10" } features: { "offline": "true", "stemming": "true", "stop_words": "true", "client_side": "true" }
 */
export interface SearchProviderMapping2 {
  /**
   * Provider name
   */
  name?: string;
  /**
   * Service URL
   */
  service_url?: string;
  /**
   * Client library
   */
  client_library?: string;
  /**
   * Index configuration
   */
  index_config?: {
    [k: string]: string;
  };
  /**
   * Features
   */
  features?: {
    [k: string]: boolean;
  };
}
/**
 * SEARCH_PROVIDER_FUSE  name: "Fuse.js" service_url: "https://fusejs.io/" client_library: "fuse.js" index_config: { "keys": "title,content,tags", "threshold": "0.3" } features: { "fuzzy_search": "true", "offline": "true", "lightweight": "true" }
 */
export interface SearchProviderMapping3 {
  /**
   * Provider name
   */
  name?: string;
  /**
   * Service URL
   */
  service_url?: string;
  /**
   * Client library
   */
  client_library?: string;
  /**
   * Index configuration
   */
  index_config?: {
    [k: string]: string;
  };
  /**
   * Features
   */
  features?: {
    [k: string]: boolean;
  };
}
/**
 * SEARCH_PROVIDER_CUSTOM  name: "Custom Search" service_url: "" client_library: "" index_config: {} features: {}
 */
export interface SearchProviderMapping4 {
  /**
   * Provider name
   */
  name?: string;
  /**
   * Service URL
   */
  service_url?: string;
  /**
   * Client library
   */
  client_library?: string;
  /**
   * Index configuration
   */
  index_config?: {
    [k: string]: string;
  };
  /**
   * Features
   */
  features?: {
    [k: string]: boolean;
  };
}
