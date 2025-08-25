/**
 * @fileoverview TypeScript Type Definitions for Global Mappings
 * @module types/mappings
 * 
 * @description
 * Provides comprehensive type definitions for Schema.org, ARIA, and GTM mappings
 * that are injected at build time via Webpack DefinePlugin. These types ensure
 * type safety when working with mapping dictionaries throughout the application.
 * 
 * @global-constants
 * The following global constants are injected at build time:
 * - __SCHEMA_MAPPINGS__: Schema.org type mappings
 * - __ARIA_MAPPINGS__: ARIA role and property mappings
 * - __GTM_MAPPINGS__: GTM event and parameter mappings
 * 
 * @usage
 * These types are automatically available when using the mapping utilities.
 * They can also be imported directly for type annotations:
 * 
 * ```typescript
 * import type { SchemaMappings, ContentType, ServiceType } from '@/types/mappings'
 * ```
 * 
 * @see {@link ../utils/mappings.ts} - Utility functions using these types
 * @see {@link ../../config/schema/schema-mappings.yml} - Source mapping files
 * 
 * @since 2.1.0
 */

/**
 * Schema.org Enum Types
 * These match the enum values in Proto schemas
 */
export type ContentType =
  | 'CONTENT_TYPE_UNSPECIFIED'
  | 'CONTENT_TYPE_ANNOUNCEMENT'
  | 'CONTENT_TYPE_TUTORIAL'
  | 'CONTENT_TYPE_DEEP_DIVE'
  | 'CONTENT_TYPE_UPDATE'
  | 'CONTENT_TYPE_OPINION'
  | 'CONTENT_TYPE_CASE_STUDY'
  | 'CONTENT_TYPE_REVIEW'
  | 'CONTENT_TYPE_GUIDE'
  | 'CONTENT_TYPE_INTERVIEW'
  | 'CONTENT_TYPE_RESEARCH'
  | 'CONTENT_TYPE_ANALYSIS'
  | 'CONTENT_TYPE_REFLECTION'
  | 'CONTENT_TYPE_EXPERIMENT'
  | 'CONTENT_TYPE_ROUNDUP'
  | 'CONTENT_TYPE_COMPARISON'
  | 'CONTENT_TYPE_CHECKLIST'
  | 'CONTENT_TYPE_FAQ'
  | 'CONTENT_TYPE_THOUGHT_PIECE'
  | 'CONTENT_TYPE_AUDIO_RECORDING'

export type ServiceType =
  | 'SERVICE_TYPE_UNSPECIFIED'
  | 'CONSULTING_SERVICE'
  | 'TECHNOLOGY_SERVICE'
  | 'AI_SERVICE'
  | 'RESEARCH_SERVICE'
  | 'SOFTWARE_SERVICE'
  | 'PROFESSIONAL_SERVICE'

export type EntityType =
  | 'ENTITY_TYPE_UNSPECIFIED'
  | 'ENTITY_TYPE_PERSON'
  | 'ENTITY_TYPE_LEGAL_ENTITY'
  | 'ENTITY_TYPE_ORGANIZATION'
  | 'ENTITY_TYPE_BRAND'
  | 'ENTITY_TYPE_PROJECT'
  | 'ENTITY_TYPE_COMMUNITY'
  | 'ENTITY_TYPE_DOMAIN'
  | 'ENTITY_TYPE_BLOG'

export type ProjectType =
  | 'PROJECT_TYPE_UNSPECIFIED'
  | 'PROJECT_TYPE_RESEARCH'
  | 'PROJECT_TYPE_TOOL'
  | 'PROJECT_TYPE_FRAMEWORK'
  | 'PROJECT_TYPE_LIBRARY'
  | 'PROJECT_TYPE_SERVICE'
  | 'PROJECT_TYPE_APPLICATION'
  | 'PROJECT_TYPE_PROTOCOL'
  | 'PROJECT_TYPE_PLATFORM'
  | 'PROJECT_TYPE_INFRASTRUCTURE'
  | 'PROJECT_TYPE_EDUCATIONAL'
  | 'PROJECT_TYPE_EXPERIMENTAL'

export type DiscussionPlatform =
  | 'DISCUSSION_PLATFORM_UNSPECIFIED'
  | 'DISCUSSION_PLATFORM_TWITTER'
  | 'DISCUSSION_PLATFORM_LINKEDIN'
  | 'DISCUSSION_PLATFORM_HACKERNEWS'
  | 'DISCUSSION_PLATFORM_REDDIT'
  | 'DISCUSSION_PLATFORM_MEDIUM'
  | 'DISCUSSION_PLATFORM_STACKOVERFLOW'
  | 'DISCUSSION_PLATFORM_GITHUB_ISSUES'
  | 'DISCUSSION_PLATFORM_GITHUB_DISCUSSIONS'
  | 'DISCUSSION_PLATFORM_YOUTUBE'
  | 'DISCUSSION_PLATFORM_PODCAST'
  | 'DISCUSSION_PLATFORM_SUBSTACK'
  | 'DISCUSSION_PLATFORM_DISCOURSE'
  | 'DISCUSSION_PLATFORM_SLACK'
  | 'DISCUSSION_PLATFORM_DISCORD'
  | 'DISCUSSION_PLATFORM_TELEGRAM'
  | 'DISCUSSION_PLATFORM_CHATGPT_CHATS'
  | 'DISCUSSION_PLATFORM_CLAUDE_CHATS'
  | 'DISCUSSION_PLATFORM_CLAUDE_ARTIFACTS'
  | 'DISCUSSION_PLATFORM_PERPLEXITY_THREADS'

/**
 * Schema.org Mapping Dictionary Structure
 */
export interface SchemaMappings {
  // Simple string mappings
  content_types: Record<ContentType, string>
  service_types: Record<ServiceType, string>
  entity_types: Record<EntityType, string>
  project_types: Record<ProjectType, string>
  discussion_platforms: Record<DiscussionPlatform, string>
  media_types: Record<string, string>
  payment_methods: Record<string, string>
  code_languages: Record<string, string>
  crypto_networks: Record<string, string>
  affiliation_types: Record<string, string>
  relationship_types: Record<string, string>
  schema_org_entity_types: Record<string, string>
  project_statuses: Record<string, string>
  project_development_statuses: Record<string, string>
  project_lifecycles: Record<string, string>
  license_types: Record<string, string>
  support_types: Record<string, string>
  dependency_types: Record<string, string>
  dependency_scopes: Record<string, string>
  industry_schema_types: Record<string, string>
  community_statuses: Record<string, string>
  api_spec_formats: Record<string, string>
  auth_types: Record<string, string>
  oauth2_flows: Record<string, string>
  person_roles: Record<string, string>
  schema_org_types: Record<string, string>
  
  // Complex mappings with metadata
  discussion_platform_providers: Record<string, {
    name: string
    url: string
    type: string
  }>
  media_type_properties: Record<string, {
    required: string[]
    recommended: string[]
  }>
  code_language_metadata: Record<string, {
    file_extensions: string[]
    mime_type: string
    highlight_js_id: string
  }>
  crypto_network_details: Record<string, {
    name: string
    blockchain: string
    explorer_url?: string
    network_type: string
  }>
  license_metadata: Record<string, {
    spdx_id: string
    name: string
    osi_approved: boolean
    license_type: string
  }>
  search_provider_features: Record<string, {
    instant_search?: boolean
    facets?: boolean
    analytics?: boolean
    ai_powered?: boolean
    offline?: boolean
    stemming?: boolean
    stop_words?: boolean
    client_side?: boolean
    fuzzy_search?: boolean
    lightweight?: boolean
  }>
}

/**
 * ARIA Role Configuration
 */
export interface AriaRoleConfig {
  role: string
  label?: string
  description?: string
  required_props?: string[]
  optional_props?: string[]
  allowed_children?: string[]
  required_children?: string[]
  allowed_parents?: string[]
  implicit_values?: Record<string, string>
}

/**
 * ARIA Landmark Configuration
 */
export interface AriaLandmarkConfig {
  role: string
  label?: string
  multiple?: boolean
  required?: boolean
}

/**
 * ARIA State Configuration
 */
export interface AriaStateConfig {
  default?: string
  values?: string[]
  description?: string
}

/**
 * ARIA Mapping Dictionary Structure
 */
export interface AriaMappings {
  // Role mappings
  roles: Record<string, AriaRoleConfig | string>
  
  // Property mappings
  properties: Record<string, string>
  
  // Landmark mappings
  landmarks: Record<string, AriaLandmarkConfig>
  
  // State mappings
  states: Record<string, AriaStateConfig>
  
  // Live region configurations
  live_regions: Record<string, {
    level: 'polite' | 'assertive' | 'off'
    atomic?: boolean
    relevant?: string
  }>
  
  // Component-specific patterns
  patterns: Record<string, {
    role: string
    properties: Record<string, string>
    states: Record<string, string>
    children?: string[]
  }>
  
  // Keyboard navigation patterns
  keyboard: Record<string, {
    keys: Record<string, string>
    description: string
  }>
  
  // Focus management patterns
  focus_patterns: Record<string, {
    trap?: boolean
    restore?: boolean
    initial?: string
    escape?: boolean
  }>
}

/**
 * GTM Event Configuration
 */
export interface GtmEventConfig {
  event: string
  category?: string
  action?: string
  label?: string
  value?: number
  required_params?: string[]
  optional_params?: string[]
  data_layer_name?: string
}

/**
 * GTM Conversion Configuration
 */
export interface GtmConversionConfig {
  event: string
  value_currency?: string
  value_required?: boolean
  parameters?: Record<string, any>
}

/**
 * GTM Entity Parameters
 */
export interface GtmEntityParams {
  entity: string
  entity_name?: string
  entity_domain?: string
  custom_dimensions?: Record<string, string>
}

/**
 * GTM Mapping Dictionary Structure
 */
export interface GtmMappings {
  // Event mappings
  events: Record<string, GtmEventConfig | string>
  
  // Conversion mappings
  conversions: Record<string, GtmConversionConfig>
  
  // Entity-specific parameters
  entity_params: Record<string, GtmEntityParams>
  
  // Standard event categories
  event_categories: Record<string, string>
  
  // Custom dimensions mapping
  custom_dimensions: Record<string, {
    index: number
    name: string
    scope: 'hit' | 'session' | 'user' | 'product'
  }>
  
  // Enhanced ecommerce mappings
  ecommerce: Record<string, {
    action: string
    category: string
    list?: string
    position?: number
  }>
  
  // User properties mapping
  user_properties: Record<string, {
    name: string
    type: string
    description?: string
  }>
  
  // Content groupings
  content_groups: Record<string, {
    index: number
    name: string
  }>
  
  // Interaction types
  interaction_types: Record<string, {
    non_interaction?: boolean
    bounce_rate_eligible?: boolean
  }>
}

/**
 * Global type declarations for injected constants
 */
declare global {
  /**
   * Schema.org mapping dictionary
   * Injected at build time via Webpack DefinePlugin
   */
  const __SCHEMA_MAPPINGS__: SchemaMappings
  
  /**
   * ARIA mapping dictionary
   * Injected at build time via Webpack DefinePlugin
   */
  const __ARIA_MAPPINGS__: AriaMappings
  
  /**
   * GTM mapping dictionary
   * Injected at build time via Webpack DefinePlugin
   */
  const __GTM_MAPPINGS__: GtmMappings
}

/**
 * Utility type for extracting mapping categories
 */
export type SchemaMappingCategory = keyof SchemaMappings
export type AriaMappingCategory = keyof AriaMappings
export type GtmMappingCategory = keyof GtmMappings

/**
 * Utility type for valid Schema.org types
 */
export type ValidSchemaOrgType = 
  | SchemaMappings['content_types'][ContentType]
  | SchemaMappings['service_types'][ServiceType]
  | SchemaMappings['entity_types'][EntityType]
  | SchemaMappings['project_types'][ProjectType]
  | string

/**
 * Export all types for external use
 */
export type {
  SchemaMappings,
  AriaMappings,
  GtmMappings,
  ValidSchemaOrgType
}