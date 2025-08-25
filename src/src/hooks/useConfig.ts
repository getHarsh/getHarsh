/**
 * @fileoverview Configuration Access Hook for Site Metadata
 * @module hooks/useConfig
 * 
 * @description
 * Provides centralized access to all site configuration through GraphQL.
 * This hook queries Gatsby's siteMetadata at build time and makes it available
 * to components throughout the application. Configuration is processed from
 * YAML files by the ecosystem build pipeline and injected into gatsby-config.ts.
 * 
 * @design-philosophy
 * Configuration follows a hierarchical, domain-driven approach:
 * - All configuration originates from domain config.yml files
 * - Processed by ecosystem scripts (validate.sh, process-configs.sh)
 * - Merged with environment variables from wrapper.sh
 * - Made available via GraphQL at build time
 * - Accessed by components through this hook
 * 
 * This ensures:
 * - Single source of truth for all configuration
 * - Type-safe access to configuration data
 * - Build-time optimization (no runtime config fetching)
 * - Consistent configuration across all components
 * 
 * @ecosystem-integration
 * - Used by: Navigation, Footer, ConsentBanner, SEO, Layout components
 * - Data source: gatsby-config.ts siteMetadata (from processed configs)
 * - Build pipeline: config.yml → process-configs.sh → gatsby-config.ts → GraphQL
 * - Environment: Reads from BUILD_DIR/configs/[domain]/[mode]/config.json
 * 
 * @configuration-structure
 * The configuration object contains:
 * - Basic metadata (title, description, author)
 * - Domain information (domain, entity, legal_entity)
 * - Feature flags (services_enabled, sponsor.enabled)
 * - Policies (privacy, terms, cookies URLs and status)
 * - Consent settings (GDPR, Google Consent Mode v2)
 * - Analytics config (GTM, Meta Pixel, cross-domain)
 * - Theme settings (colors, dark mode)
 * - Social links (twitter, github, linkedin, etc.)
 * - Project metadata (for project sites)
 * 
 * @why-hook-not-context
 * - GraphQL data is static at build time (no updates needed)
 * - useStaticQuery provides optimal performance
 * - No need for provider wrapper overhead
 * - Components can import and use directly
 * - Better tree-shaking of unused config fields
 * 
 * @dos
 * - Use optional chaining when accessing nested properties
 * - Provide sensible defaults for missing configuration
 * - Check feature flags before rendering features
 * - Handle both LOCAL and PRODUCTION configurations
 * - Cache config results in component state if needed
 * 
 * @donts
 * - Don't modify returned configuration (it's read-only)
 * - Don't assume all fields exist (they're nullable)
 * - Don't make runtime API calls for config (use build-time data)
 * - Don't use in non-React contexts (it requires React hooks)
 * - Don't bypass feature flags
 * 
 * @usage-patterns
 * Basic usage:
 * ```tsx
 * const config = useConfig()
 * const { domain, social, policies } = config
 * ```
 * 
 * Consent checking:
 * ```tsx
 * const { consent_settings } = useConfig()
 * if (consent_settings.enable_consent_banner) {
 *   // Show consent banner
 * }
 * ```
 * 
 * Feature flags:
 * ```tsx
 * const { features, sponsor } = useConfig()
 * if (features.services_enabled) {
 *   // Render services navigation
 * }
 * ```
 * 
 * @graphql-query
 * The GraphQL query fetches all available siteMetadata fields.
 * Fields are nullable - components should handle missing data gracefully.
 * The query is executed once at build time and cached.
 * 
 * @type-safety
 * While the return type is currently 'any', components should defensively
 * access nested properties using optional chaining (?.) and nullish
 * coalescing (??).
 * 
 * Future enhancement: Generate TypeScript types from Proto schemas.
 * 
 * @performance
 * - Build-time query execution (no runtime overhead)
 * - Static query result cached by Gatsby
 * - No network requests needed
 * - Minimal bundle size impact
 * 
 * @error-handling
 * Returns empty object ({}) if query fails or data is unavailable.
 * Components should provide sensible defaults for missing config.
 * 
 * @example
 * ```tsx
 * // In Footer component
 * import { useConfig } from '@/hooks/useConfig'
 * 
 * const Footer = () => {
 *   const config = useConfig()
 *   const { social, policies, legal_entity } = config
 *   
 *   return (
 *     <footer>
 *       <div>{legal_entity?.name ?? 'Company'}</div>
 *       {policies?.privacy?.enabled && (
 *         <Link to={policies.privacy.url}>Privacy Policy</Link>
 *       )}
 *       {social?.twitter && (
 *         <a href={social.twitter}>Twitter</a>
 *       )}
 *     </footer>
 *   )
 * }
 * ```
 * 
 * @see {@link file://./BUILD.md} - Build pipeline and configuration processing
 * @see {@link file://./config/CONFIG.md} - Configuration system documentation
 * @see {@link file://./config/schema/domain.proto} - DomainConfig proto definition
 * @see {@link file://./config/schema/consent.proto} - ConsentSettings proto definition
 * @see {@link file://./config/tools/process-configs.sh} - Config processing script
 * @see {@link file://./gatsby-config.ts} - Gatsby configuration with siteMetadata
 * @see {@link file://./src/components/consent/ConsentBanner.tsx} - Primary consumer
 * @see {@link file://./src/components/navigation/UniversalFooter.tsx} - Uses for policies/social
 * @see {@link file://./src/components/navigation/TopNavigation.tsx} - Uses for navigation
 * 
 * @since 1.0.0
 */

import { useStaticQuery, graphql } from 'gatsby';

/**
 * Configuration object interface
 * Note: This is a partial type definition. The actual config object
 * contains many more fields based on the domain's config.yml.
 * 
 * @interface ConfigData
 */
interface ConfigData {
  title?: string;
  description?: string;
  siteUrl?: string;
  author?: string;
  domain?: string;
  entity?: string;
  legal_entity?: {
    name?: string;
    abbreviation?: string;
  };
  domain_info?: {
    domain?: string;
    title?: string;
    entity?: string;
    description?: string;
  };
  features?: {
    services_enabled?: boolean;
  };
  sponsor?: {
    enabled?: boolean;
  };
  policies?: {
    privacy?: {
      enabled?: boolean;
      url?: string;
    };
    terms?: {
      enabled?: boolean;
      url?: string;
    };
    cookies?: {
      enabled?: boolean;
      url?: string;
    };
  };
  ecosystem?: {
    default_domain_url?: string;
    learn_more_url?: string;
  };
  consent_settings?: {
    enable_consent_banner?: boolean;
    consent_cookie_name?: string;
    consent_duration_days?: number;
    google_consent_mode_v2?: boolean;
    banner_text?: string;
    accept_button_text?: string;
    decline_button_text?: string;
    privacy_policy_url?: string;
    cookie_policy_url?: string;
    consent_mode_v2?: {
      ad_user_data_default?: string;
      ad_personalization_default?: string;
      implementation_mode?: string;
      enable_cookieless_pings?: boolean;
      enable_data_modeling?: boolean;
      wait_for_update_ms?: number;
    };
    enable_cross_domain_consent?: boolean;
    consent_domains?: string[];
    entity_domains?: string[];
    banner_position?: string;
    banner_theme?: string;
    // Added missing fields from generated ConsentSettings type
    region_defaults?: string[];
    enable_granular_control?: boolean;
    settings_button_text?: string;
    categories_config?: {
      analytics?: {
        title?: string;
        description?: string;
        providers?: string[];
        required?: boolean;
        pre_selected?: boolean;
      };
      marketing?: {
        title?: string;
        description?: string;
        providers?: string[];
        required?: boolean;
        pre_selected?: boolean;
      };
      functional?: {
        title?: string;
        description?: string;
        providers?: string[];
        required?: boolean;
        pre_selected?: boolean;
      };
      necessary?: {
        title?: string;
        description?: string;
        providers?: string[];
        required?: boolean;
        pre_selected?: boolean;
      };
    };
  };
  analytics?: {
    ga_tracking_id?: string;
    meta_pixel_id?: string;
    cross_domain_tracking?: boolean;
    linked_domains?: string[];
  };
  theme?: {
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
      enable_dark_mode?: boolean;
      default_mode?: string;
      show_mode_toggle?: boolean;
      dark_mode_class?: string;
      toggle_position?: string;
    };
  };
  social?: {
    twitter?: string;
    github?: string;
    linkedin?: string;
    instagram?: string;
    youtube?: string;
  };
  project?: {
    name?: string;
    docs_enabled?: boolean;
  };
  project_info?: {
    name?: string;
    links?: {
      repository?: string;
      documentation?: string;
      demo?: string;
    };
  };
}

/**
 * Hook to access site configuration from GraphQL
 * 
 * @returns {ConfigData} Site configuration object with all metadata
 * 
 * @example
 * ```tsx
 * const config = useConfig()
 * console.log(config.domain) // "getharsh.in"
 * ```
 */
export const useConfig = (): ConfigData => {
  const data = useStaticQuery(graphql`
    query ConfigQuery {
      site {
        siteMetadata {
          title
          description
          siteUrl
          author
          domain
          entity
          legal_entity {
            name
            abbreviation
          }
          domain_info {
            domain
            title
            entity
          }
          features {
            services_enabled
          }
          sponsor {
            enabled
          }
          policies {
            privacy {
              enabled
              url
            }
            terms {
              enabled
              url
            }
            cookies {
              enabled
              url
            }
          }
          ecosystem {
            default_domain_url
            learn_more_url
          }
          consent_settings {
            enable_consent_banner
            consent_cookie_name
            consent_duration_days
            google_consent_mode_v2
            banner_text
            accept_button_text
            decline_button_text
            privacy_policy_url
            cookie_policy_url
            consent_mode_v2 {
              ad_user_data_default
              ad_personalization_default
              implementation_mode
              enable_cookieless_pings
              enable_data_modeling
              wait_for_update_ms
            }
            enable_cross_domain_consent
            consent_domains
            entity_domains
            banner_position
            banner_theme
          }
          analytics {
            ga_tracking_id
            meta_pixel_id
            cross_domain_tracking
            linked_domains
          }
          theme {
            entity
            colors {
              primary
              secondary
              background
              text
              accent
              error
              success
            }
            theme_mode {
              enable_dark_mode
              default_mode
              show_mode_toggle
              dark_mode_class
              toggle_position
            }
          }
          social {
            twitter
            github
            linkedin
            instagram
            youtube
          }
          project {
            name
            docs_enabled
          }
        }
      }
    }
  `);

  // Return siteMetadata or empty object if query fails
  return data?.site?.siteMetadata || {};
};