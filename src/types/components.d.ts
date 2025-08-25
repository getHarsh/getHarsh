/**
 * @fileoverview Component Prop Type Definitions for the getHarsh Ecosystem
 * @module types/components
 * 
 * @description
 * Centralized type definitions for all React component props, variants, and interfaces
 * used throughout the getHarsh ecosystem. These types ensure consistency across:
 * - Layout and navigation components
 * - Service and project display components
 * - Search and discovery interfaces
 * - Schema.org structured data components
 * - Analytics and consent management
 * - Theme and visualization systems
 * 
 * All component types follow React best practices and maintain compatibility
 * with the proto-driven architecture and ecosystem-wide patterns.
 * 
 * @ecosystem-integration
 * - Layout types: Used by PageLayout, ContentLayout, RootLayout
 * - Service types: Powers ServiceCard, ServiceGrid components
 * - Search types: Enables FlexSearch integration
 * - Schema types: Implements structured data for SEO
 * - Consent types: GDPR/CCPA compliance components
 * 
 * @dos
 * - Use these types for all component prop definitions
 * - Extend interfaces when adding new props
 * - Keep variants consistent across similar components
 * - Document any component-specific extensions
 * 
 * @donts
 * - Don't use inline prop types when these exist
 * - Don't create duplicate variant definitions
 * - Don't mix concerns (keep types focused)
 * - Don't use 'any' for component props
 * 
 * @see {@link file://./USE-CASE.md} - Component requirements and specifications
 * @see {@link file://./src/components/} - Component implementations
 * @see {@link file://./api.d.ts} - API types used by components
 * @see {@link file://./config/schema/} - Proto schemas defining data structures
 */

import { ReactNode } from 'react';
import { Service, ServiceCTA, Project, ConfigData, DomainConfig } from './api';

// ============================================================================
// LAYOUT TYPES
// ============================================================================
/**
 * Props for the main PageLayout wrapper component.
 * Provides consistent structure across all page types.
 * 
 * @see {@link file://./src/components/layout/PageLayout.tsx} - Implementation
 */
export interface PageLayoutProps {
  /** Page content to render within the layout */
  children: ReactNode;
  /** Optional CSS class for custom styling */
  className?: string;
}

/**
 * Props for the TopNavigation component.
 * Variant determines navigation structure and links.
 * 
 * @see {@link file://./src/components/navigation/TopNavigation.tsx} - Implementation
 * @see {@link file://./USE-CASE.md#navigation-patterns-summary} - Navigation patterns
 */
export interface TopNavProps {
  /** Navigation variant based on entity type */
  variant: 'blog' | 'project' | 'domain' | 'sponsor' | 'docs';
}

// ============================================================================
// SERVICE COMPONENT TYPES
// ============================================================================

/**
 * Extended service data with required fields for display.
 * Extends base Service type with mandatory name and category.
 * 
 * @see {@link file://./SERVICES.md} - Services system documentation
 * @see {@link file://./src/components/services/ServiceCard.tsx} - Service rendering
 */
export interface ServiceData extends Service {
  name: string;
  category: string;
}

// ============================================================================
// HERO SECTION TYPES
// ============================================================================

/**
 * Visualization intensity variants for hero sections.
 * - prominent: Full dynamic visualization for landing pages
 * - subtle: Muted background for content-heavy pages
 * 
 * @see {@link file://./src/components/hero/DynamicVisualization.tsx} - Implementation
 */
export type HeroVisualizationVariant = 'prominent' | 'subtle';

// ============================================================================
// SEARCH TYPES
// ============================================================================

/**
 * Schema.org SearchAction structured data.
 * Enables search box in search results (sitelinks searchbox).
 * 
 * @see {@link https://schema.org/SearchAction} - Schema.org specification
 * @see {@link file://./SEARCH.md} - Search system architecture
 */
export interface SearchActionSchemaData {
  '@context': string;
  '@type': string;
  url: string;
  target: {
    '@type': string;
    urlTemplate: string;
    actionType: string;
  };
  'query-input': string;
  searchUrl?: string; // Making this optional as it seems to be a custom field
}

// ============================================================================
// UI PRIMITIVE TYPES
// ============================================================================

/**
 * Button size variants for consistent sizing across the UI.
 * @see {@link file://./src/components/ui/Button.tsx} - Button component
 */
export type ButtonSize = 'default' | 'sm' | 'lg';

/**
 * Button style variants for different visual emphasis.
 * Maps to theme-aware color schemes from config.
 * 
 * @see {@link file://./src/components/ui/Button.tsx} - Button component
 */
export type ButtonVariant = 'default' | 'primary' | 'secondary' | 'outline' | 'link' | 'destructive' | 'ghost';

// ============================================================================
// SCHEMA.ORG TYPES
// ============================================================================

/**
 * Schema.org Article structured data.
 * Used for blog posts and content pages for rich results.
 * 
 * @see {@link https://schema.org/Article} - Schema.org specification
 * @see {@link file://./config/schema/SCHEMA.md} - Schema mapping system
 */
export interface ArticleSchemaData {
  '@context': string;
  '@type': string;
  headline: string;
  description?: string;
  author?: {
    '@type': string;
    name: string;
  };
  datePublished?: string;
  dateModified?: string;
  image?: string | string[];
  publisher?: {
    '@type': string;
    name: string;
    logo?: {
      '@type': string;
      url: string;
    };
  };
}

// ============================================================================
// TYPE UTILITIES
// ============================================================================

/**
 * Subdomain type detection for routing and navigation.
 * Determines component behavior based on URL structure.
 * 
 * @see {@link file://./src/utils/paths.ts} - Path utilities
 */
export type SubdomainType = 'blog' | 'project' | 'domain' | undefined;

/**
 * Grid display variants for flexible content layouts.
 * - grid: Card-based grid layout
 * - list: Vertical list layout
 * - compact: Space-efficient display
 */
export type GridVariant = 'grid' | 'list' | 'compact';

/**
 * Page type variants for layout and styling decisions.
 * Each variant applies specific design patterns.
 */
export type PageVariant = 'blog' | 'domain' | 'about' | 'error' | 'policy';

// ============================================================================
// THEME TYPES
// ============================================================================

/**
 * Domain-specific theme configuration.
 * Loaded from config.yml and applied across components.
 * 
 * @see {@link file://./src/config/theme-loader.ts} - Theme loading
 * @see {@link file://./BUILD.md#theme-system} - Theme processing
 */
export interface DomainTheme {
  name: string;
  chakra: string;
  entity?: string;
  colors?: {
    primary?: string;
    secondary?: string;
    background?: string;
    text?: string;
    accent?: string;
  };
}

// ============================================================================
// FLEXSEARCH TYPES
// ============================================================================

/**
 * FlexSearch index configuration options.
 * Controls tokenization, encoding, and search behavior.
 * 
 * @see {@link file://./SEARCH.md#flexsearch-configuration} - Search configuration
 * @see {@link file://./src/hooks/search/useFlexSearch.ts} - Search hook
 */
export interface SearchIndexOptions {
  preset?: string;
  tokenize?: string | ((str: string) => string[]);
  encode?: string;
  threshold?: number;
  depth?: number;
  resolution?: number;
  language?: string;
  cache?: boolean;
  doc?: {
    id: string;
    field: string[];
  };
}

// ============================================================================
// ACCESSIBILITY TYPES
// ============================================================================

/**
 * ARIA role configuration for accessibility compliance.
 * Ensures WCAG 2.1 AA standards across components.
 * 
 * @see {@link file://./src/utils/mappings.ts} - ARIA mappings
 */
export interface AriaRoleConfig {
  role: string;
  properties?: Record<string, any>;
  states?: Record<string, any>;
}

// ============================================================================
// ANALYTICS TYPES
// ============================================================================

/**
 * Google Tag Manager event configuration.
 * Tracks user interactions and conversions.
 * 
 * @see {@link file://./src/utils/gtm.ts} - GTM utilities
 * @see {@link file://./src/utils/gtm-services.ts} - Service-specific tracking
 */
export interface GtmEventConfig {
  event: string;
  category?: string;
  action?: string;
  label?: string;
  value?: number;
  [key: string]: any;
}

// ============================================================================
// CONSENT TYPES
// ============================================================================

/**
 * Props for the GDPR/CCPA consent banner.
 * Manages cookie consent and privacy preferences.
 * 
 * @see {@link file://./config/CONSENT-ARCHITECTURE.md} - Consent system
 * @see {@link file://./src/components/consent/ConsentBanner.tsx} - Implementation
 */
export interface ConsentBannerProps {
  config?: DomainConfig;
}

/** Type alias for backward compatibility */
export { ConsentBannerProps as ConsentBannerPropsType };