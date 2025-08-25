/**
 * ============================================================================
 * GATSBY-CONFIG.TS - Site Configuration & Plugin Setup
 * ============================================================================
 * 
 * PURPOSE:
 * Central configuration file that defines site metadata, feature flags, and
 * plugin configuration for the multi-domain getHarsh ecosystem. This file is
 * the primary control point for site behavior and third-party integrations.
 * 
 * RESPONSIBILITIES:
 * 1. Site metadata for SEO and identification
 * 2. Feature flag management (services, consent, analytics)
 * 3. Plugin configuration (CMS, analytics, filesystem)
 * 4. Environment variable processing
 * 5. Cross-domain configuration
 * 6. Legal compliance settings (GDPR, cookie consent)
 * 
 * EXECUTION CONTEXT:
 * - Loaded once at build start by Gatsby
 * - Environment variables set by wrapper.sh from config.yml
 * - Domain-specific values from process-configs.sh
 * - Consumed by all pages and components via GraphQL
 * 
 * RELATED FILES:
 * - gatsby-node.js: Build-time page generation
 * - gatsby-node.ts: TypeScript webpack configuration
 * - gatsby-browser.js: Client-side behavior
 * - gatsby-ssr.js: Server-side rendering
 * - wrapper.sh: Environment variable setup
 * 
 * ECOSYSTEM REFERENCES:
 * @see ../src/CMS.md#decap-integration - CMS plugin configuration
 * @see ../src/SERVICES.md#configuration-deep-dive - Services feature flag
 * @see ../CONSENT-ARCHITECTURE.md#google-consent-mode-v2 - Consent settings
 * @see ../GUARDRAILS.md#configuration-hierarchy - Config precedence
 * 
 * ENVIRONMENT VARIABLES:
 * Primary sources (set by wrapper.sh):
 * - GATSBY_DOMAIN: Current domain being built
 * - GATSBY_ENTITY_KEY: Legal entity (RTEPL/DSPL)
 * - GATSBY_SERVICES_ENABLED: Services feature flag
 * - GATSBY_GTM_CONTAINER_ID: Google Tag Manager ID
 * - GATSBY_CONSENT_*: Cookie consent configuration
 * 
 * @module gatsby-config
 * @see {@link https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/}
 * ============================================================================
 */

import type { GatsbyConfig } from "gatsby"
import { getCurrentTheme, getSiteUrl, getDomainUrl, isBlogBuild } from "./src/config/themes"
import path from "path"

/**
 * PROTO-DRIVEN TYPE SYSTEM PATHS
 * ===============================
 * These paths map to the generated TypeScript definitions and schemas
 * from the proto-driven architecture. Used by webpack aliases.
 * 
 * Generated artifacts:
 * - 381 JSON schemas from 77+ protobuf definitions
 * - 689 TypeScript type definitions
 * - 300+ Schema.org mappings
 * 
 * @see gatsby-node.ts#onPreInit - Type generation on build
 * @see ../config/tools/proto2ts.js - TypeScript generation script
 */
export const typeSystemPaths = {
  "@schemas": path.resolve(__dirname, "../build/schemas"),
  "@types": path.resolve(__dirname, "../build/types"),
  "@proto": path.resolve(__dirname, "../config/proto"),
  "@mappings": path.resolve(__dirname, "../config/mappings"),
  "@widgets": path.resolve(__dirname, "static/admin/widgets"),
  "@cms": path.resolve(__dirname, "static/admin"),
}

/**
 * THEME & DOMAIN CONFIGURATION
 * ============================
 * Theme utilities determine colors, chakra alignment, and entity ownership
 * based on the current domain being built.
 * 
 * @see ./src/config/themes.ts - Theme definitions and utilities
 */
const theme = getCurrentTheme()
const siteUrl = getSiteUrl()
const domainUrl = getDomainUrl()
const isBlog = isBlogBuild()

/**
 * ECOSYSTEM PATHS
 * ===============
 * Content paths are relative to the ecosystem root, not the engine.
 * These are symlinks to Google Drive folders in production.
 * 
 * Path structure:
 * - master_posts/posts/ - Blog content (tagged distribution)
 * - master_posts/pages/[entity]/ - Marketing pages per entity
 * - templates/ - Policy and layout templates
 * 
 * IMPORTANT: Projects use internal paths like causality.in/PROJECTS/HENA
 * for engine discovery, but deploy to subdomains like HENA.causality.in.
 * The build system handles this path-to-subdomain transformation.
 * 
 * @see ../GUARDRAILS.md#symlinks-and-paths - Symlink handling
 */
const MASTER_POSTS_DIR = process.env.MASTER_POSTS_DIR || `${__dirname}/../master_posts`
const TEMPLATES_DIR = process.env.TEMPLATES_DIR || `${__dirname}/../templates`
const DOMAIN = process.env.WEBSITE_DOMAIN || process.env.GATSBY_DOMAIN || ''

// Ensure we have a domain
if (!DOMAIN) {
  console.error('ERROR: No domain specified. Please run via ecosystem wrapper scripts.')
  console.error('Example: ../serve.sh --domain=getharsh.in')
  process.exit(1)
}

/**
 * UTILITY FUNCTIONS
 * =================
 * Environment variables come as strings from wrapper.sh.
 * These helpers ensure type safety and provide defaults.
 */

/**
 * Parse boolean environment variable with fallback
 * @param val - Environment variable value (string)
 * @param defaultVal - Default if not set or invalid
 * @returns Parsed boolean value
 */
const parseBool = (val: string | undefined, defaultVal: boolean = false): boolean => {
  if (!val) return defaultVal
  return val.toLowerCase() === 'true'
}

/**
 * Parse numeric environment variable with fallback
 * @param val - Environment variable value (string)
 * @param defaultVal - Default if not set or invalid
 * @returns Parsed integer value
 */
const parseNum = (val: string | undefined, defaultVal: number): number => {
  if (!val) return defaultVal
  const num = parseInt(val, 10)
  return isNaN(num) ? defaultVal : num
}

/**
 * GATSBY CONFIGURATION OBJECT
 * ===========================
 * This object is consumed by Gatsby at build time and made available
 * to all components via GraphQL queries.
 * 
 * Structure:
 * - siteMetadata: Available in GraphQL queries
 * - graphqlTypegen: TypeScript type generation
 * - plugins: Third-party integrations
 * 
 * @see ../src/SERVICES.md#navigation-integration - Services feature usage
 * @see ../src/CMS.md#configuration - CMS metadata usage
 */
const config: GatsbyConfig = {
  /**
   * SITE METADATA
   * =============
   * Core site information exposed via GraphQL to all components.
   * Query with: { site { siteMetadata { ... } } }
   */
  siteMetadata: {
    // SEO & Identity
    title: isBlog ? `${theme.name} Blog` : theme.name,
    description: `${theme.description} - ${isBlog ? 'Thoughts and Ideas' : 'Digital Presence'}`,
    author: process.env.WEBSITE_AUTHOR || 'Harsh Joshi',
    siteUrl,
    domainUrl,
    isBlog,
    domain: DOMAIN,
    entity: process.env.WEBSITE_ENTITY || theme.entity,
    
    // Theme configuration for runtime styling
    theme: {
      name: theme.name,
      chakra: theme.chakra,
      entity: theme.entity,
    },
    
    /**
     * Legal Entity Information
     * Used for policy pages and compliance
     * @see ../src/SERVICES.md#schema-org-configuration-flow - Provider info
     */
    legal_entity: {
      name: process.env.WEBSITE_ENTITY_NAME || process.env.WEBSITE_ENTITY || '',
      abbreviation: process.env.WEBSITE_ENTITY || '',
    },
    
    // Domain context for multi-domain navigation
    domain_info: {
      domain: DOMAIN,
      title: theme.name,
      entity: process.env.WEBSITE_ENTITY || theme.entity,
    },
    
    /**
     * Feature Flags
     * Control which features are enabled for this domain
     * @see ../src/SERVICES.md#enable-services - Services activation
     */
    features: {
      services_enabled: parseBool(process.env.WEBSITE_SERVICES_ENABLED, false),
    },
    // Sponsor configuration
    sponsor: {
      enabled: parseBool(process.env.WEBSITE_SPONSOR_ENABLED, false),
    },
    // Policy configuration
    policies: {
      privacy: {
        enabled: parseBool(process.env.GATSBY_POLICY_PRIVACY_ENABLED, true),
        url: process.env.GATSBY_POLICY_PRIVACY_URL || '/privacy',
      },
      terms: {
        enabled: parseBool(process.env.GATSBY_POLICY_TERMS_ENABLED, true),
        url: process.env.GATSBY_POLICY_TERMS_URL || '/terms',
      },
      cookies: {
        enabled: parseBool(process.env.GATSBY_POLICY_COOKIES_ENABLED, true),
        url: process.env.GATSBY_POLICY_COOKIES_URL || '/cookies',
      },
    },
    // Ecosystem configuration
    ecosystem: {
      default_domain_url: process.env.WEBSITE_ECOSYSTEM_URL || 'https://getharsh.in',
      learn_more_url: process.env.WEBSITE_ECOSYSTEM_LEARN_MORE || 'https://github.com/getHarsh/Website',
    },
    // Social links
    social: {
      twitter: process.env.WEBSITE_SOCIAL_TWITTER || '',
      github: process.env.WEBSITE_SOCIAL_GITHUB || '',
      linkedin: process.env.WEBSITE_SOCIAL_LINKEDIN || '',
      instagram: process.env.WEBSITE_SOCIAL_INSTAGRAM || '',
      youtube: process.env.WEBSITE_SOCIAL_YOUTUBE || '',
    },
    // Project configuration (if applicable)
    project: {
      name: process.env.WEBSITE_PROJECT_NAME || '',
      docs_enabled: parseBool(process.env.WEBSITE_PROJECT_DOCS_ENABLED, false),
    },
    /**
     * CONSENT SETTINGS
     * ================
     * GDPR & Cookie Law compliance configuration.
     * Implements Google Consent Mode v2 with regional defaults.
     * 
     * Flow:
     * 1. Banner appears based on regional detection
     * 2. User makes choice (accept/decline/granular)
     * 3. Choice stored in cookie for duration
     * 4. Analytics tools respect consent state
     * 
     * @see ../CONSENT-ARCHITECTURE.md#google-consent-mode-v2 - Implementation
     * @see ../CONSENT-ARCHITECTURE.md#regional-detection - Regional defaults
     * @see ../CONSENT-ARCHITECTURE.md#granular-consent-ui - Category control
     */
    consent_settings: {
      // Master switch for consent system
      enable_consent_banner: parseBool(process.env.GATSBY_CONSENT_ENABLED, true),
      
      // Cookie persistence settings
      consent_cookie_name: process.env.GATSBY_CONSENT_COOKIE_NAME || 'analytics_consent',
      consent_duration_days: parseNum(process.env.GATSBY_CONSENT_DURATION_DAYS, 365),
      
      // Google Consent Mode v2 activation
      google_consent_mode_v2: parseBool(process.env.GATSBY_CONSENT_MODE_V2, true),
      
      // UI text configuration
      banner_text: process.env.GATSBY_CONSENT_BANNER_TEXT || 'We use cookies and similar technologies to analyze site usage and improve your experience. Some features may not work properly without cookies.',
      accept_button_text: process.env.GATSBY_CONSENT_ACCEPT_TEXT || 'Accept All',
      decline_button_text: process.env.GATSBY_CONSENT_DECLINE_TEXT || 'Decline All',
      
      // Policy page links
      privacy_policy_url: process.env.GATSBY_CONSENT_PRIVACY_URL || '/privacy',
      cookie_policy_url: process.env.GATSBY_CONSENT_COOKIE_URL || '/cookies',
      
      /**
       * Google Consent Mode v2 Settings
       * Advanced configuration for consent signals
       */
      consent_mode_v2: {
        ad_user_data_default: parseBool(process.env.GATSBY_CONSENT_MODE_AD_USER_DATA, false),
        ad_personalization_default: parseBool(process.env.GATSBY_CONSENT_MODE_AD_PERSONALIZATION, false),
        implementation_mode: 'advanced',
        enable_cookieless_pings: true,
        enable_data_modeling: true,
        wait_for_update_ms: parseNum(process.env.GATSBY_CONSENT_MODE_WAIT_MS, 500),
      },
      enable_cross_domain_consent: parseBool(process.env.GATSBY_CONSENT_CROSS_DOMAIN, true),
      consent_domains: process.env.GATSBY_CONSENT_DOMAINS ? process.env.GATSBY_CONSENT_DOMAINS.split(',') : [],
      entity_domains: process.env.GATSBY_ENTITY_DOMAINS ? process.env.GATSBY_ENTITY_DOMAINS.split(',') : [],
      banner_position: process.env.GATSBY_CONSENT_BANNER_POSITION || 'bottom',
      banner_theme: process.env.GATSBY_CONSENT_BANNER_THEME || 'auto',
      // Regional defaults - Implementation: CONSENT-ARCHITECTURE.md#regional-detection
      region_defaults: process.env.GATSBY_CONSENT_REGION_DEFAULTS ? 
        process.env.GATSBY_CONSENT_REGION_DEFAULTS.split(',') : 
        ['EU:denied', 'US-CA:denied', 'IN:granted', 'DEFAULT:granted'],
      // Granular control - Implementation: CONSENT-ARCHITECTURE.md#granular-consent-ui
      enable_granular_control: parseBool(process.env.GATSBY_CONSENT_GRANULAR, true),
      settings_button_text: process.env.GATSBY_CONSENT_SETTINGS_TEXT || 'Manage Settings',
      categories_config: {
        analytics: {
          enabled: parseBool(process.env.GATSBY_CONSENT_CAT_ANALYTICS_ENABLED, true),
          default: process.env.GATSBY_CONSENT_CAT_ANALYTICS_DEFAULT || 'denied',
          description: process.env.GATSBY_CONSENT_CAT_ANALYTICS_DESC || 
            'Website analytics and performance monitoring',
        },
        marketing: {
          enabled: parseBool(process.env.GATSBY_CONSENT_CAT_MARKETING_ENABLED, true),
          default: process.env.GATSBY_CONSENT_CAT_MARKETING_DEFAULT || 'denied',
          description: process.env.GATSBY_CONSENT_CAT_MARKETING_DESC || 
            'Personalized advertising and remarketing',
        },
        functional: {
          enabled: parseBool(process.env.GATSBY_CONSENT_CAT_FUNCTIONAL_ENABLED, true),
          default: process.env.GATSBY_CONSENT_CAT_FUNCTIONAL_DEFAULT || 'denied',
          description: process.env.GATSBY_CONSENT_CAT_FUNCTIONAL_DESC || 
            'Enhanced functionality and personalization',
        },
      },
    },
    // Analytics configuration
    analytics: {
      ga_tracking_id: process.env.GATSBY_GA_TRACKING_ID || '',
      gtm_container_id: process.env.GATSBY_GTM_CONTAINER_ID || '',
      meta_pixel_id: process.env.GATSBY_META_PIXEL_ID || '',
      twitter_pixel_id: process.env.GATSBY_TWITTER_PIXEL_ID || '',
      linkedin_partner_id: process.env.GATSBY_LINKEDIN_PARTNER_ID || '',
      cross_domain_tracking: true,
      linked_domains: [
        'getHarsh.in',
        'causality.in',
        'rawThoughts.in',
        'sleepwalker.in',
        'daostudio.in',
      ],
    },
    // Security headers for meta tags
    security: {
      csp_policy: process.env.GATSBY_CSP_POLICY || '',
      referrer_policy: process.env.GATSBY_REFERRER_POLICY || 'strict-origin-when-cross-origin',
      frame_options: process.env.GATSBY_FRAME_OPTIONS || 'SAMEORIGIN',
    },
  },
  /**
   * GRAPHQL TYPE GENERATION
   * =======================
   * Automatically generates TypeScript types for all GraphQL queries.
   * Types are written to gatsby-types.d.ts for IDE support.
   */
  graphqlTypegen: true,
  
  /**
   * GATSBY PLUGINS
   * ==============
   * Third-party integrations and data transformations.
   * Order matters for some plugins (filesystem before transformers).
   * 
   * Categories:
   * 1. Head management (SEO, meta tags)
   * 2. Styling (CSS processing)
   * 3. Analytics (consent-aware)
   * 4. Content management (CMS)
   * 5. Data sources (filesystem)
   * 6. Transformers (markdown, images)
   */
  plugins: [
    /**
     * HEAD MANAGEMENT
     * Manages document head for SEO and meta tags
     */
    `gatsby-plugin-react-helmet`,
    
    /**
     * CSS PROCESSING
     * PostCSS with Tailwind for utility-first styling
     * Config: postcss.config.js, tailwind.config.js
     */
    `gatsby-plugin-postcss`,
    
    /**
     * GOOGLE TAG MANAGER
     * Analytics integration with consent mode support.
     * Only loads if GTM ID is configured and consent is not disabled.
     * 
     * @see ../CONSENT-ARCHITECTURE.md#analytics-blocking - Consent integration
     * @see ../src/SERVICES.md#gtm-analytics-flow - Event tracking
     */
    ...(process.env.GATSBY_GTM_CONTAINER_ID && 
        process.env.GATSBY_CONSENT_ENABLED !== 'false' ? [{
      resolve: `gatsby-plugin-google-tagmanager`,
      options: {
        id: process.env.GATSBY_GTM_CONTAINER_ID,
        includeInDevelopment: false,
        defaultDataLayer: { 
          platform: "gatsby",
          consent_mode: "default",
          // Set default consent state (will be updated by ConsentBanner)
          ad_storage: "denied",
          analytics_storage: "denied",
          functionality_storage: "denied",
          personalization_storage: "denied",
          security_storage: "granted",
        },
        // GTM will respect consent mode set by ConsentBanner
        enableWebVitalsTracking: true,
        // Don't load GTM until consent is handled
        gtmAuth: process.env.GATSBY_GTM_AUTH || undefined,
        gtmPreview: process.env.GATSBY_GTM_PREVIEW || undefined,
      },
    }] : []),
    
    /**
     * DECAP CMS (formerly Netlify CMS)
     * Git-based content management system.
     * Configuration is generated by builder.sh from config.yml.
     * 
     * @see ../src/CMS.md#decap-integration - CMS setup and configuration
     * @see ../static/admin/config.yml - Generated CMS config (after build)
     */
    {
      resolve: `gatsby-plugin-decap-cms`,
      options: {
        // Use default configuration - no manual init needed
        enableIdentityWidget: false, // Disable if not using Netlify Identity
        publicPath: `admin`,
        htmlTitle: `Content Manager`,
      },
    },
    
    /**
     * FILESYSTEM SOURCES
     * ==================
     * Define where Gatsby should look for content.
     * These create nodes in GraphQL for querying.
     */
    
    /**
     * Blog Posts Source
     * Located in master_posts/posts/ with tag-based distribution
     * @see ../GUARDRAILS.md#content-pipeline - Content flow
     */
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${MASTER_POSTS_DIR}/posts`,
      },
    },
    
    /**
     * Marketing Pages Source
     * Entity-specific pages in master_posts/pages/[entity]/
     * @see gatsby-node.js - Policy page creation logic
     */
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${MASTER_POSTS_DIR}/pages`,
      },
    },
    
    /**
     * Template Source
     * Policy and layout templates shared across domains
     */
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `templates`,
        path: `${TEMPLATES_DIR}`,
      },
    },
    
    /**
     * Static Images
     * Local images for site assets and defaults
     */
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/static/img`,
      },
    },
    
    /**
     * CONTENT TRANSFORMERS
     * ====================
     * Process source content into usable formats
     */
    
    /**
     * Markdown Transformer
     * Converts .md files to HTML with frontmatter extraction
     */
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          // Add remark plugins here if needed
          // e.g., gatsby-remark-images, gatsby-remark-prismjs
        ],
      },
    },
    
    /**
     * IMAGE OPTIMIZATION
     * Sharp-based image processing for performance
     */
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
  ],
}

export default config