/**
 * ============================================================================
 * GATSBY-NODE.JS - Build-Time Page Generation & Configuration
 * ============================================================================
 * 
 * PURPOSE:
 * This file controls Gatsby's build-time behavior, creating pages dynamically
 * based on configuration and content. It's the heart of the static site
 * generation process for the getHarsh ecosystem.
 * 
 * RESPONSIBILITIES:
 * 1. TypeScript type generation from Proto schemas
 * 2. Policy page generation (privacy, cookies, terms) from markdown
 * 3. Services page creation with Schema.org transformation
 * 4. Industry-specific service pages
 * 5. Webpack configuration with TypeScript support and mapping injection
 * 6. Markdown node field creation
 * 7. Post-build Decap CMS config copying
 * 
 * RELATED FILES:
 * - proto2ts.js: Generates TypeScript types from schemas
 * - gatsby-config.ts: Site configuration and plugins
 * - gatsby-browser.js: Client-side initialization
 * - gatsby-ssr.js: Server-side rendering setup
 * - wrapper.sh: Sets environment variables consumed here
 * - process-configs.sh: Generates config files we read
 * 
 * ECOSYSTEM REFERENCES:
 * @see ../src/SERVICES.md#page-generation - Service page creation logic
 * @see ../src/CMS.md#decap-integration - CMS configuration details
 * @see ../GUARDRAILS.md#build-system - Build system guardrails
 * 
 * ENVIRONMENT VARIABLES:
 * Set by wrapper.sh from config.yml:
 * - GATSBY_DOMAIN: Current domain being built
 * - GATSBY_ENTITY_KEY: Legal entity (RTEPL/DSPL)
 * - GATSBY_SERVICES_ENABLED: Enable services pages
 * - GATSBY_POLICY_*: Policy page configuration
 * 
 * @module gatsby-node
 * @see {@link https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/}
 * ============================================================================
 */

const path = require('path')
const fs = require('fs-extra')
const { execSync } = require('child_process')

/**
 * CREATE PAGES API
 * ================
 * Main page generation function called during build.
 * Creates static pages based on markdown content and configuration.
 * 
 * EXECUTION FLOW:
 * 1. Query markdown files from master_posts/
 * 2. Load environment configuration
 * 3. Create policy pages if enabled
 * 4. Create service pages if services_enabled
 * 5. Create industry-specific service pages
 * 
 * @param {Object} actions - Gatsby actions (createPage, etc.)
 * @param {Function} graphql - GraphQL query function
 * @param {Object} reporter - Build logging utilities
 * 
 * @see ../src/SERVICES.md#page-generation - Services logic documentation
 */

/**
 * PRE-INIT API
 * ============
 * Generates TypeScript definitions from JSON schemas before build starts.
 * This ensures all proto-driven types are available during compilation.
 * Consolidated from gatsby-node.ts for single source of truth.
 * 
 * EXECUTION FLOW:
 * 1. Check for schema directory from build process
 * 2. Run proto2ts.js to generate TypeScript definitions
 * 3. Output type files for use by CMS widgets and components
 * 
 * @param {Object} reporter - Build logging utilities
 * 
 * @see ../config/tools/proto2ts.js - Type generation script
 * @see ../build/types/ - Generated TypeScript definitions
 */
exports.onPreInit = async ({ reporter }) => {
  reporter.info("🔧 Generating TypeScript types from Proto schemas...")
  
  const schemasDir = path.resolve(__dirname, "../build/schemas")
  const typesDir = path.resolve(__dirname, "../build/types")
  
  // Check if schemas exist
  if (!fs.existsSync(schemasDir)) {
    reporter.warn("⚠️ Schemas directory not found. Run proto2schema.sh first.")
    return
  }
  
  // Create types directory if it doesn't exist
  if (!fs.existsSync(typesDir)) {
    fs.mkdirSync(typesDir, { recursive: true })
  }
  
  try {
    // Run the TypeScript generation script
    const proto2tsPath = path.resolve(__dirname, "../config/tools/proto2ts.js")
    
    if (fs.existsSync(proto2tsPath)) {
      reporter.info("📝 Running proto2ts.js to generate TypeScript definitions...")
      
      execSync(`node "${proto2tsPath}" --schemas-dir "${schemasDir}" --output-dir "${typesDir}"`, {
        stdio: "inherit",
        cwd: path.resolve(__dirname, "../config/tools")
      })
      
      // Count generated types
      const typeFiles = fs.readdirSync(typesDir).filter(f => f.endsWith(".d.ts"))
      reporter.success(`✅ Generated ${typeFiles.length} TypeScript definitions from schemas`)
    } else {
      reporter.warn("⚠️ proto2ts.js not found. Skipping type generation.")
    }
  } catch (error) {
    reporter.error("❌ Failed to generate TypeScript types:", error)
  }
}

/**
 * PRE-BOOTSTRAP API
 * =================
 * Runs before Gatsby starts its bootstrap process.
 * Used to load global mapping files that will be injected via Webpack.
 * 
 * EXECUTION FLOW:
 * 1. Check for mapping JSON files from environment variables
 * 2. Load and validate each mapping file
 * 3. Store in global variables for webpack injection
 * 
 * @param {Object} reporter - Build logging utilities
 * 
 * @see ../config/tools/process-mappings.sh - Mapping generation
 * @see ../wrapper.sh - Environment variable setup
 */
exports.onPreBootstrap = async ({ reporter }) => {
  reporter.info('Loading global mapping files for build-time integration...')
  
  // Mapping file paths from environment (set by wrapper.sh)
  const schemaMappingsPath = process.env.GATSBY_SCHEMA_MAPPINGS
  const ariaMappingsPath = process.env.GATSBY_ARIA_MAPPINGS
  const gtmMappingsPath = process.env.GATSBY_GTM_MAPPINGS
  
  // Initialize global mapping objects
  global.__SCHEMA_MAPPINGS__ = {}
  global.__ARIA_MAPPINGS__ = {}
  global.__GTM_MAPPINGS__ = {}
  
  // Load Schema.org mappings
  if (schemaMappingsPath && await fs.pathExists(schemaMappingsPath)) {
    try {
      const mappings = await fs.readJson(schemaMappingsPath)
      global.__SCHEMA_MAPPINGS__ = mappings
      reporter.success(`Loaded Schema.org mappings: ${Object.keys(mappings).length} categories`)
    } catch (error) {
      reporter.warn(`Failed to load Schema.org mappings: ${error.message}`)
    }
  } else {
    reporter.info('No Schema.org mappings found - using defaults')
  }
  
  // Load ARIA mappings
  if (ariaMappingsPath && await fs.pathExists(ariaMappingsPath)) {
    try {
      const mappings = await fs.readJson(ariaMappingsPath)
      global.__ARIA_MAPPINGS__ = mappings
      reporter.success(`Loaded ARIA mappings: ${Object.keys(mappings).length} categories`)
    } catch (error) {
      reporter.warn(`Failed to load ARIA mappings: ${error.message}`)
    }
  } else {
    reporter.info('No ARIA mappings found - using defaults')
  }
  
  // Load GTM mappings
  if (gtmMappingsPath && await fs.pathExists(gtmMappingsPath)) {
    try {
      const mappings = await fs.readJson(gtmMappingsPath)
      global.__GTM_MAPPINGS__ = mappings
      reporter.success(`Loaded GTM mappings: ${Object.keys(mappings).length} categories`)
    } catch (error) {
      reporter.warn(`Failed to load GTM mappings: ${error.message}`)
    }
  } else {
    reporter.info('No GTM mappings found - using defaults')
  }
}

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions
  
  /* ==========================================================================
   * STEP 1: QUERY MARKDOWN CONTENT
   * Fetch all markdown files that could become pages
   * These come from master_posts/pages/[entity]/ directories
   * ========================================================================== */
  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            id
            frontmatter {
              title
              permalink
              layout
              entity
              legal_name
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `)
  
  if (result.errors) {
    reporter.panicOnBuild('Error while running GraphQL query for pages.')
    return
  }
  
  /* ==========================================================================
   * STEP 2: LOAD CONFIGURATION FROM ENVIRONMENT
   * Environment variables are set by wrapper.sh from config.yml
   * This determines which features are enabled for this domain
   * ========================================================================== */
  
  /** @type {string} Current domain being built (e.g., "rawthoughts.in") */
  const currentDomain = process.env.GATSBY_DOMAIN || process.env.WEBSITE_DOMAIN
  
  /** @type {string} Entity key for this domain (e.g., "RTEPL", "DSPL") */
  const currentEntityKey = process.env.GATSBY_ENTITY_KEY || process.env.WEBSITE_ENTITY_KEY
  
  /**
   * Policy configuration from config.yml PolicyOverrides section
   * Determines which legal pages to generate
   */
  const policyConfig = {
    privacy: {
      enabled: process.env.GATSBY_POLICY_PRIVACY_ENABLED !== 'false',
      url: process.env.GATSBY_POLICY_PRIVACY_URL || '/privacy/'
    },
    cookies: {
      enabled: process.env.GATSBY_POLICY_COOKIES_ENABLED !== 'false', 
      url: process.env.GATSBY_POLICY_COOKIES_URL || '/cookies/'
    },
    terms: {
      enabled: process.env.GATSBY_POLICY_TERMS_ENABLED !== 'false',
      url: process.env.GATSBY_POLICY_TERMS_URL || '/terms/'
    }
  }
  
  /**
   * Cross-domain entity configuration
   * Used for consent management across domains owned by same entity
   */
  const entityDomains = process.env.GATSBY_ENTITY_DOMAINS ? 
    process.env.GATSBY_ENTITY_DOMAINS.split(',') : []
  
  /**
   * Analytics feature flags
   * Controls which tracking pixels and analytics services are enabled
   */
  const featureFlags = {
    gaEnabled: process.env.GATSBY_GA_ENABLED === 'true',
    metaPixelEnabled: process.env.GATSBY_META_ENABLED === 'true',
    twitterPixelEnabled: process.env.GATSBY_TWITTER_ENABLED === 'true',
    linkedinEnabled: process.env.GATSBY_LINKEDIN_ENABLED === 'true',
    crossDomainConsent: process.env.GATSBY_CONSENT_CROSS_DOMAIN === 'true'
  }
  
  /**
   * GTM and ARIA configuration notes
   * ---------------------------------
   * GTM is now handled by gatsby-plugin-google-tagmanager in gatsby-config.ts
   * ARIA/accessibility is handled via useAccessibility hook and semantic HTML
   * 
   * @deprecated GTM/ARIA configuration objects removed in v2.0.0
   * @see ../src/hooks/useGTM.ts - For custom GTM tracking
   * @see ../src/hooks/useAccessibility.ts - For ARIA/WCAG support
   */
  
  /* ==========================================================================
   * STEP 3: CREATE POLICY PAGES
   * Policy pages (privacy, cookies, terms) use entity-specific templates
   * Only created if enabled in configuration
   * ========================================================================== */
  
  const policyPageTemplate = path.resolve('./src/templates/policy-page.tsx')
  const createdPolicies = new Set() // Track created pages to avoid duplicates
  
  // Process each markdown file
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    const { permalink, layout, entity } = node.frontmatter
    
    // Only create pages with layout: page and permalink set
    if (layout === 'page' && permalink) {
      // Map of standard policy URLs to policy types
      const policyTypeMap = {
        '/privacy/': 'privacy',
        '/cookies/': 'cookies',
        '/terms/': 'terms'
      }
      
      const policyType = policyTypeMap[permalink]
      
      if (policyType) {
        // This is a policy page - check configuration to see if we should create it
        const policy = policyConfig[policyType]
        
        // Check if this policy is enabled in configuration
        if (!policy.enabled) {
          reporter.info(`Skipping ${policyType} policy - disabled in configuration`)
          return
        }
        
        // Check if the configured URL matches this page's permalink
        if (policy.url !== permalink) {
          reporter.info(`Skipping ${permalink} - configuration uses ${policy.url} for ${policyType}`)
          return
        }
        
        // Check if we've already created this policy page
        if (createdPolicies.has(permalink)) {
          return
        }
        
        // For policy pages, we need to determine which entity's content to use
        // Policy templates are stored in entity directories (RTEPL, DSPL)
        // and we only create pages from the current entity's templates
        let shouldCreatePage = false
        let policyEntity = entity
        let policyLegalName = node.frontmatter.legal_name
        
        // Only create policy pages from the current entity's templates
        if (currentEntityKey && entity === currentEntityKey) {
          shouldCreatePage = true
          reporter.info(`Creating ${policyType} policy page at ${permalink} using ${entity} template`)
        } else if (!currentEntityKey) {
          // Fallback for development/testing when entity_key isn't set
          shouldCreatePage = true
          reporter.warn(`No entity_key configured - using ${entity} policy pages`)
        } else {
          // Skip policy pages from other entities
          reporter.info(`Skipping ${policyType} from ${entity} - current entity is ${currentEntityKey}`)
        }
        
        if (shouldCreatePage) {
          createPage({
            path: permalink,
            component: policyPageTemplate,
            context: {
              id: node.id,
              entity: policyEntity,
              legalName: policyLegalName,
              currentDomain: currentDomain,
              policyType: policyType,
              // Pass template variables for processing
              entityDomains: entityDomains,
              featureFlags: featureFlags,
              // GTM and ARIA are now handled via plugin and hooks
              // @see ../src/hooks/useGTM.ts
              // @see ../src/hooks/useAccessibility.ts
              templateVariables: {
                ENTITY_LEGAL_NAME: policyLegalName,
                ENTITY_ABBREVIATION: policyEntity,
                CURRENT_DOMAIN: currentDomain,
                LAST_UPDATED: new Date().toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                }),
                // These will be filled by wrapper.sh environment variables
                DATA_CONTROLLER_EMAIL: process.env.GATSBY_DATA_CONTROLLER_EMAIL || `privacy@${currentDomain}`,
                DPO_CONTACT: process.env.GATSBY_DPO_CONTACT || `dpo@${currentDomain}`,
                CONSENT_COOKIE_NAME: process.env.GATSBY_CONSENT_COOKIE_NAME || 'analytics_consent',
                CONSENT_DURATION_DAYS: process.env.GATSBY_CONSENT_DURATION_DAYS || '365',
                PRIVACY_POLICY_URL: process.env.GATSBY_CONSENT_PRIVACY_URL || '/privacy',
                COOKIE_POLICY_URL: process.env.GATSBY_CONSENT_COOKIE_URL || '/cookies',
                ENTITY_ADDRESS: process.env.GATSBY_ENTITY_ADDRESS || '',
                JURISDICTION: process.env.GATSBY_JURISDICTION || 'India',
                ENTITY_DOMAIN: currentDomain
              }
            },
          })
          
          createdPolicies.add(permalink)
        }
      } else {
        // Not a policy page - create normally
        createPage({
          path: permalink,
          component: policyPageTemplate,
          context: {
            id: node.id,
          },
        })
      }
    }
  })
  
  // Log policy page status
  reporter.info(`Policy pages created: ${Array.from(createdPolicies).join(', ') || 'none'}`)
  reporter.info(`Policy configuration: privacy=${policyConfig.privacy.enabled}, cookies=${policyConfig.cookies.enabled}, terms=${policyConfig.terms.enabled}`)
  
  /* ==========================================================================
   * STEP 4: CREATE SERVICE PAGES (if enabled)
   * Services are only created if:
   * 1. services_enabled: true in config.yml
   * 2. config_services.yml exists and has enabled: true
   * 3. Build system has processed the configuration
   * 
   * @see ../src/SERVICES.md#page-generation - Detailed service page flow
   * @see ../src/SERVICES.md#schema-org-configuration-flow - Schema.org transformation
   * ========================================================================== */
  
  const servicesEnabled = process.env.GATSBY_SERVICES_ENABLED === 'true'
  const searchEnabled = process.env.GATSBY_SEARCH_ENABLED === 'true'
  
  if (servicesEnabled) {
    reporter.info('Services are enabled, checking for service configuration...')
    
    const fs = require('fs-extra')
    const buildDir = process.env.BUILD_DIR || 'build'
    const mode = process.env.GATSBY_MODE || 'LOCAL'
    const domain = process.env.GATSBY_DOMAIN || 'localhost'
    
    // Path to processed services config
    const servicesConfigPath = path.join(buildDir, 'configs', domain, mode, 'config_services.json')
    
    // Use global schema mappings loaded in onPreBootstrap
    const schemaMappings = global.__SCHEMA_MAPPINGS__ || {}
    
    if (await fs.pathExists(servicesConfigPath)) {
      try {
        const servicesConfig = await fs.readJson(servicesConfigPath)
        
        if (servicesConfig.enabled) {
          // Transform services config with Schema.org mappings
          const transformedConfig = { ...servicesConfig }
          
          /* =====================================================================
           * SCHEMA.ORG TRANSFORMATION (Build-Time)
           * This is where we transform configuration enums to Schema.org types
           * Everything is configuration-driven - NO HARDCODING!
           * 
           * Process:
           * 1. Read schema_settings from config_services.yml
           * 2. Map service enums to Schema.org types via schema-mappings.yml
           * 3. Build complete JSON-LD objects with OfferCatalog
           * 4. Pass to components as pre-built props
           * 
           * Components are "dumb consumers" - they just render what we give them
           * 
           * @see ../src/SERVICES.md#schema-org-configuration-flow - Details
           * @see ../config/schema/schema-mappings.yml - Enum mappings
           * ===================================================================== */
          
          // Transform service schema types
          if (transformedConfig.services && schemaMappings.service_types) {
            // Get schema settings from config (NEVER hardcode!)
            const schemaSettings = transformedConfig.schema_settings || {}
            
            transformedConfig.services = transformedConfig.services.map(service => {
              const schemaType = service.schema_type || 'PROFESSIONAL_SERVICE'
              const mappedType = schemaMappings.service_types[schemaType] || 
                               schemaMappings.service_types['SERVICE_TYPE_UNSPECIFIED'] || 
                               'Service'
              
              // Build complete Schema.org JSON-LD for individual service
              const schemaJson = {
                "@context": "https://schema.org",
                "@type": mappedType,
                "@id": `https://${domain}/services/#${service.id}`,
                "name": service.title,
                "description": service.description,
                "serviceType": service.tagline,
                "provider": {
                  "@type": schemaSettings.provider_type || "Organization",
                  "name": schemaSettings.provider_name || process.env.GATSBY_LEGAL_ENTITY || domain,
                  "url": `https://${domain}`
                }
              }
              
              // Add area served from config
              if (schemaSettings.area_served) {
                schemaJson.areaServed = {
                  "@type": "Place",
                  "name": schemaSettings.area_served
                }
              }
              
              // Add price range if configured
              if (service.price_range) {
                schemaJson.priceRange = service.price_range
              }
              
              // Add available languages from config
              if (schemaSettings.available_languages && schemaSettings.available_languages.length > 0) {
                schemaJson.availableLanguage = schemaSettings.available_languages
              }
              
              // Add custom properties if configured
              if (schemaSettings.custom_properties) {
                Object.assign(schemaJson, schemaSettings.custom_properties)
              }
              
              return {
                ...service,
                schemaJson // Pre-built Schema.org JSON
              }
            })
            
            // Also create a comprehensive service page schema with OfferCatalog
            if (schemaSettings) {
              transformedConfig.pageSchemaJson = {
                "@context": "https://schema.org",
                "@type": "ProfessionalService",
                "name": transformedConfig.main_page?.hero_title || "Services",
                "description": transformedConfig.main_page?.meta_description || "",
                "provider": {
                  "@type": schemaSettings.provider_type || "Organization",
                  "name": schemaSettings.provider_name || process.env.GATSBY_LEGAL_ENTITY || domain,
                  "url": `https://${domain}`
                }
              }
              
              // Add service types from all services
              if (transformedConfig.services && transformedConfig.services.length > 0) {
                const serviceTypes = [...new Set(transformedConfig.services
                  .map(s => s.tagline)
                  .filter(Boolean))]
                if (serviceTypes.length > 0) {
                  transformedConfig.pageSchemaJson.serviceType = serviceTypes
                }
              }
              
              // Add area served from config
              if (schemaSettings.area_served) {
                transformedConfig.pageSchemaJson.areaServed = schemaSettings.area_served
              }
              
              // Add available languages from config
              if (schemaSettings.available_languages && schemaSettings.available_languages.length > 0) {
                transformedConfig.pageSchemaJson.availableLanguage = schemaSettings.available_languages
              }
              
              // Build offer catalog from services
              if (transformedConfig.services && transformedConfig.services.length > 0) {
                transformedConfig.pageSchemaJson.hasOfferCatalog = {
                  "@type": "OfferCatalog",
                  "name": schemaSettings.offer_catalog_name || "Services",
                  "itemListElement": transformedConfig.services.map(service => ({
                    "@type": "Offer",
                    "@id": `https://${domain}/services/#${service.id}`,
                    "itemOffered": {
                      "@type": schemaMappings.service_types[service.schema_type] || "Service",
                      "name": service.title,
                      "description": service.description
                    }
                  }))
                }
              }
              
              // Add custom properties if configured
              if (schemaSettings.custom_properties) {
                Object.assign(transformedConfig.pageSchemaJson, schemaSettings.custom_properties)
              }
            }
          }
          
          // Transform industry page schema types
          if (transformedConfig.industry_pages && schemaMappings.industry_schema_types) {
            transformedConfig.industry_pages = transformedConfig.industry_pages.map(industry => {
              const schemaType = industry.industry_schema_type || 'INDUSTRY_TYPE_UNSPECIFIED'
              const mappedType = schemaMappings.industry_schema_types[schemaType] || 
                               schemaMappings.industry_schema_types['INDUSTRY_TYPE_UNSPECIFIED'] || 
                               'WebPage'
              
              // Build complete Schema.org JSON-LD for industry page
              const schemaJson = {
                "@context": "https://schema.org",
                "@type": mappedType,
                "name": industry.meta_title || industry.hero_title,
                "description": industry.meta_description || industry.hero_subtitle,
                "provider": {
                  "@type": "Organization",
                  "name": process.env.GATSBY_LEGAL_ENTITY || domain
                }
              }
              
              return {
                ...industry,
                schemaJson // Pre-built Schema.org JSON
              }
            })
          }
          
          // Pass services config to context for the services page
          // The page component will handle the rendering
          reporter.info('Services configuration found and enabled')
          
          // Services config is now available via GraphQL through sourceNodes API
          // No longer using global.__SERVICES_CONFIG__ hack
          
          // Create industry-specific pages if configured
          if (transformedConfig.industry_pages && transformedConfig.industry_pages.length > 0) {
            const industryTemplate = path.resolve('./src/templates/service-industry.tsx')
            
            for (const industry of transformedConfig.industry_pages) {
              const pagePath = `/services/${industry.slug}/`
              
              reporter.info(`Creating industry page: ${pagePath}`)
              
              createPage({
                path: pagePath,
                component: industryTemplate,
                context: {
                  industry, // Now includes schemaJson
                  servicesConfig: transformedConfig, // Pass transformed config
                  domainConfig: {
                    domain: currentDomain,
                    entity_key: currentEntityKey,
                    domain_info: {
                      entity_name: process.env.GATSBY_LEGAL_ENTITY
                    }
                  }
                }
              })
            }
            
            reporter.success(`Created ${transformedConfig.industry_pages.length} industry service pages`)
          }
        } else {
          reporter.info('Services configuration exists but is disabled')
        }
      } catch (error) {
        reporter.warn(`Failed to read services configuration: ${error.message}`)
      }
    } else {
      reporter.info(`No services configuration found at ${servicesConfigPath}`)
    }
  } else {
    reporter.info('Services are not enabled for this domain')
  }
}

/**
 * WEBPACK CONFIGURATION API
 * =========================
 * Modify Gatsby's webpack configuration with:
 * 1. TypeScript support for CMS admin widgets
 * 2. Environment variable injection
 * 3. Global mapping constants for zero-runtime overhead
 * Consolidated from gatsby-node.ts for single source of truth.
 * 
 * @param {string} stage - Build stage (develop, build-javascript, etc.)
 * @param {Object} actions - Gatsby actions
 * @param {Object} plugins - Webpack plugins
 */
exports.onCreateWebpackConfig = ({ stage, actions, plugins }) => {
  /**
   * ENHANCED WEBPACK CONFIGURATION
   * ==============================
   * Combines TypeScript compilation with mapping injection.
   * TypeScript support enables CMS widgets written in .tsx files.
   * Mappings are injected as compile-time constants for zero runtime overhead.
   * 
   * The mappings are loaded in onPreBootstrap and stored in global variables,
   * then injected here as webpack constants available to all components.
   * 
   * @see ../config/tools/process-mappings.sh - Where mappings are generated
   * @see ../src/utils/mappings.ts - Utility functions to access mappings
   * @see static/admin/widgets/*.tsx - TypeScript CMS widgets
   */
  
  // Webpack is available when this function is called
  const webpack = require('webpack')
  
  actions.setWebpackConfig({
    // TypeScript module rules for CMS admin panel
    module: {
      rules: [
        {
          // Match TypeScript files in the admin directory
          test: /\.tsx?$/,
          include: [path.resolve(__dirname, "static/admin")],
          use: [
            {
              loader: "ts-loader",
              options: {
                // Skip type checking for faster builds (rely on IDE for type checking)
                transpileOnly: true,
                compilerOptions: {
                  jsx: "react",           // Support JSX in .tsx files
                  module: "esnext",       // Use ES modules
                  target: "es2015",       // Target ES2015 for broader compatibility
                  lib: ["es2015", "dom"], // Include DOM and ES2015 types
                  allowJs: true,          // Allow importing .js files
                  skipLibCheck: true,     // Skip checking .d.ts files
                  esModuleInterop: true,  // Better CommonJS interop
                  moduleResolution: "node" // Node-style module resolution
                }
              }
            }
          ]
        }
      ]
    },
    
    // Resolve configuration for TypeScript and path aliases
    resolve: {
      // Add TypeScript extensions to webpack's resolution
      extensions: [".ts", ".tsx", ".js", ".jsx"],
      alias: {
        // Create @ alias for cleaner imports (e.g., @/components/...)
        "@": path.resolve(__dirname, "src"),
        // Add specific alias for types directory (window.d.ts, etc.)
        "@/types": path.resolve(__dirname, "types"),
        // Proto-driven architecture aliases
        "@schemas": path.resolve(__dirname, "../build/schemas"),
        "@types": path.resolve(__dirname, "../build/types"),
        "@proto": path.resolve(__dirname, "../config/proto"),
        "@mappings": path.resolve(__dirname, "../config/mappings"),
        "@widgets": path.resolve(__dirname, "static/admin/widgets"),
        "@cms": path.resolve(__dirname, "static/admin"),
      }
    },
    
    // Webpack plugins for React provision and environment injection
    plugins: [
      // Automatically provide React in scope for JSX in CMS components
      // This prevents "React is not defined" errors
      new webpack.ProvidePlugin({
        React: "react",
      }),
      
      // Define plugin for environment variables and mapping constants
      plugins.define({
        // Environment variables
        'process.env.GATSBY_DOMAIN': JSON.stringify(process.env.GATSBY_DOMAIN),
        'process.env.GATSBY_IS_BLOG': JSON.stringify(process.env.GATSBY_IS_BLOG),
        'process.env.GATSBY_ENTITY_KEY': JSON.stringify(process.env.GATSBY_ENTITY_KEY),
        'process.env.GATSBY_GTM_CONTAINER_ID': JSON.stringify(process.env.GATSBY_GTM_CONTAINER_ID),
        'process.env.GATSBY_GA_TRACKING_ID': JSON.stringify(process.env.GATSBY_GA_TRACKING_ID),
        'process.env.GATSBY_META_PIXEL_ID': JSON.stringify(process.env.GATSBY_META_PIXEL_ID),
        'process.env.GATSBY_TWITTER_PIXEL_ID': JSON.stringify(process.env.GATSBY_TWITTER_PIXEL_ID),
        'process.env.GATSBY_LINKEDIN_PARTNER_ID': JSON.stringify(process.env.GATSBY_LINKEDIN_PARTNER_ID),
        'process.env.GATSBY_SEARCH_ENABLED': JSON.stringify(process.env.GATSBY_SEARCH_ENABLED),
        
        // Global mapping constants (loaded in onPreBootstrap)
        // These become compile-time constants with zero runtime overhead
        '__SCHEMA_MAPPINGS__': JSON.stringify(global.__SCHEMA_MAPPINGS__ || {}),
        '__ARIA_MAPPINGS__': JSON.stringify(global.__ARIA_MAPPINGS__ || {}),
        '__GTM_MAPPINGS__': JSON.stringify(global.__GTM_MAPPINGS__ || {}),
      }),
    ],
  })
}

/**
 * NODE CREATION API
 * =================
 * Called when a new node is created
 * We use this to add a slug field to markdown nodes for URL generation
 * 
 * @param {Object} node - The node being created
 * @param {Function} getNode - Function to get other nodes
 * @param {Object} actions - Gatsby actions
 */
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  
  if (node.internal.type === 'MarkdownRemark') {
    // Create a slug from the file path
    const fileNode = getNode(node.parent)
    const parsedFilePath = path.parse(fileNode.relativePath)
    
    let slug = ''
    if (parsedFilePath.name !== 'index' && parsedFilePath.dir !== '') {
      slug = `/${parsedFilePath.dir}/${parsedFilePath.name}/`
    } else if (parsedFilePath.dir === '') {
      slug = `/${parsedFilePath.name}/`
    } else {
      slug = `/${parsedFilePath.dir}/`
    }
    
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    })
  }
}

/**
 * POST-BUILD API
 * ==============
 * Runs after the build is complete
 * Copies Decap CMS configuration to public directory
 * 
 * The Decap config is generated by builder.sh and needs to be
 * copied to public/admin/ for the CMS to work
 * 
 * @param {Object} reporter - Build logging utilities
 * 
 * @see ../src/CMS.md#decap-integration - CMS setup details
 */
/**
 * SOURCE NODES API
 * ================
 * Creates custom GraphQL nodes from processed configuration files.
 * This allows services configuration to be accessed via GraphQL queries
 * instead of using window.__SERVICES_CONFIG__ hack.
 * 
 * @param {Object} actions - Gatsby actions
 * @param {Function} createNodeId - Create unique node ID
 * @param {Function} createContentDigest - Create content digest for caching
 * 
 * @see ../src/SERVICES.md#graphql-integration - Services GraphQL flow
 */
/**
 * SOURCE NODES API - Create Custom GraphQL Nodes
 * ===============================================
 * Creates nodes that can be queried via GraphQL.
 * This is where we load services configuration from the build directory.
 * 
 * @rationale
 * GTM and ARIA configurations are now handled differently:
 * - GTM: Uses gatsby-plugin-google-tagmanager (configured in gatsby-config.ts)
 *        Custom tracking via useGTM hook (no GraphQL nodes needed)
 * - ARIA: Uses useAccessibility hook and aria-helpers utilities
 *        No global configuration needed (follows semantic HTML first principle)
 * 
 * We only create nodes for services configuration which needs to be
 * available via GraphQL for dynamic page generation.
 * 
 * @see ../src/hooks/useGTM.ts - GTM tracking implementation
 * @see ../src/hooks/useAccessibility.ts - ARIA/WCAG implementation
 * @see ../src/SERVICES.md#graphql-integration - Services GraphQL flow
 */
exports.sourceNodes = async ({ 
  actions, 
  createNodeId, 
  createContentDigest,
  reporter 
}) => {
  const { createNode } = actions
  const fs = require('fs-extra')
  
  const buildDir = process.env.BUILD_DIR || 'build'
  const mode = process.env.GATSBY_MODE || 'LOCAL'
  const domain = process.env.GATSBY_DOMAIN || 'localhost'
  
  // Load services configuration if it exists
  const servicesConfigPath = path.join(
    buildDir, 'configs', domain, mode, 'config_services.json'
  )
  
  if (await fs.pathExists(servicesConfigPath)) {
    try {
      const servicesConfig = await fs.readJson(servicesConfigPath)
      
      // Use global schema mappings loaded in onPreBootstrap
      const schemaMappings = global.__SCHEMA_MAPPINGS__ || {}
      
      // Transform services config with Schema.org mappings (same logic as in createPages)
      const transformedConfig = { ...servicesConfig }
      
      // Transform service schema types
      if (transformedConfig.services && schemaMappings.service_types) {
        const schemaSettings = transformedConfig.schema_settings || {}
        
        transformedConfig.services = transformedConfig.services.map(service => {
          const schemaType = service.schema_type || 'PROFESSIONAL_SERVICE'
          const mappedType = schemaMappings.service_types[schemaType] || 
                           schemaMappings.service_types['SERVICE_TYPE_UNSPECIFIED'] || 
                           'Service'
          
          // Build complete Schema.org JSON-LD for individual service
          const schemaJson = {
            "@context": "https://schema.org",
            "@type": mappedType,
            "@id": `https://${domain}/services/#${service.id}`,
            "name": service.title,
            "description": service.description,
            "serviceType": service.tagline,
            "provider": {
              "@type": schemaSettings.provider_type || "Organization",
              "name": schemaSettings.provider_name || process.env.GATSBY_LEGAL_ENTITY || domain,
              "url": `https://${domain}`
            }
          }
          
          // Add area served from config
          if (schemaSettings.area_served) {
            schemaJson.areaServed = {
              "@type": "Place",
              "name": schemaSettings.area_served
            }
          }
          
          // Add price range if configured
          if (service.price_range) {
            schemaJson.priceRange = service.price_range
          }
          
          // Add available languages from config
          if (schemaSettings.available_languages && schemaSettings.available_languages.length > 0) {
            schemaJson.availableLanguage = schemaSettings.available_languages
          }
          
          // Add custom properties if configured
          if (schemaSettings.custom_properties) {
            Object.assign(schemaJson, schemaSettings.custom_properties)
          }
          
          return {
            ...service,
            schemaJson // Pre-built Schema.org JSON
          }
        })
        
        // Also create a comprehensive service page schema with OfferCatalog
        if (schemaSettings) {
          transformedConfig.pageSchemaJson = {
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "name": transformedConfig.main_page?.hero_title || "Services",
            "description": transformedConfig.main_page?.meta_description || "",
            "provider": {
              "@type": schemaSettings.provider_type || "Organization",
              "name": schemaSettings.provider_name || process.env.GATSBY_LEGAL_ENTITY || domain,
              "url": `https://${domain}`
            }
          }
          
          // Add service types from all services
          if (transformedConfig.services && transformedConfig.services.length > 0) {
            const serviceTypes = [...new Set(transformedConfig.services
              .map(s => s.tagline)
              .filter(Boolean))]
            if (serviceTypes.length > 0) {
              transformedConfig.pageSchemaJson.serviceType = serviceTypes
            }
          }
          
          // Add area served from config
          if (schemaSettings.area_served) {
            transformedConfig.pageSchemaJson.areaServed = schemaSettings.area_served
          }
          
          // Add available languages from config
          if (schemaSettings.available_languages && schemaSettings.available_languages.length > 0) {
            transformedConfig.pageSchemaJson.availableLanguage = schemaSettings.available_languages
          }
          
          // Build offer catalog from services
          if (transformedConfig.services && transformedConfig.services.length > 0) {
            transformedConfig.pageSchemaJson.hasOfferCatalog = {
              "@type": "OfferCatalog",
              "name": schemaSettings.offer_catalog_name || "Services",
              "itemListElement": transformedConfig.services.map(service => ({
                "@type": "Offer",
                "@id": `https://${domain}/services/#${service.id}`,
                "itemOffered": {
                  "@type": schemaMappings.service_types[service.schema_type] || "Service",
                  "name": service.title,
                  "description": service.description
                }
              }))
            }
          }
          
          // Add custom properties if configured
          if (schemaSettings.custom_properties) {
            Object.assign(transformedConfig.pageSchemaJson, schemaSettings.custom_properties)
          }
        }
      }
      
      // Transform industry page schema types
      if (transformedConfig.industry_pages && schemaMappings.industry_schema_types) {
        transformedConfig.industry_pages = transformedConfig.industry_pages.map(industry => {
          const schemaType = industry.industry_schema_type || 'INDUSTRY_TYPE_UNSPECIFIED'
          const mappedType = schemaMappings.industry_schema_types[schemaType] || 
                           schemaMappings.industry_schema_types['INDUSTRY_TYPE_UNSPECIFIED'] || 
                           'WebPage'
          
          // Build complete Schema.org JSON-LD for industry page
          const schemaJson = {
            "@context": "https://schema.org",
            "@type": mappedType,
            "name": industry.meta_title || industry.hero_title,
            "description": industry.meta_description || industry.hero_subtitle,
            "provider": {
              "@type": "Organization",
              "name": process.env.GATSBY_LEGAL_ENTITY || domain
            }
          }
          
          return {
            ...industry,
            schemaJson // Pre-built Schema.org JSON
          }
        })
      }
      
      // Create GraphQL node for services configuration
      createNode({
        ...transformedConfig,
        id: createNodeId('ServicesConfig'),
        internal: {
          type: 'ServicesConfig',
          contentDigest: createContentDigest(transformedConfig),
        },
      })
      
      reporter.success('Services configuration loaded into GraphQL')
    } catch (error) {
      reporter.warn(`Failed to load services configuration: ${error.message}`)
    }
  }
}

exports.onPostBuild = async ({ reporter }) => {
  const fs = require('fs-extra')
  
  reporter.info('Copying Decap CMS configuration...')
  
  // Source paths - the generated config should already be in static/admin from builder.sh
  const staticAdminPath = path.join(__dirname, 'static', 'admin', 'config.yml')
  const staticLocalConfigPath = path.join(__dirname, 'static', 'admin', 'config.local.yml')
  
  // Destination in public directory
  const publicAdminPath = path.join(__dirname, '..', 'public', 'admin')
  
  try {
    // Ensure admin directory exists in public
    await fs.ensureDir(publicAdminPath)
    
    // Copy main config if it exists
    if (await fs.pathExists(staticAdminPath)) {
      await fs.copy(staticAdminPath, path.join(publicAdminPath, 'config.yml'))
      reporter.success('Copied Decap config.yml to public/admin/')
    } else {
      reporter.warn('No generated Decap config found at static/admin/config.yml')
    }
    
    // Copy local config if it exists (for LOCAL mode)
    if (await fs.pathExists(staticLocalConfigPath)) {
      await fs.copy(staticLocalConfigPath, path.join(publicAdminPath, 'config.local.yml'))
      reporter.info('Copied local development config')
    }
    
    // Copy other admin assets
    const adminAssets = ['index.html', 'cms.ts', 'templates', 'widgets']
    for (const asset of adminAssets) {
      const sourcePath = path.join(__dirname, 'static', 'admin', asset)
      if (await fs.pathExists(sourcePath)) {
        await fs.copy(sourcePath, path.join(publicAdminPath, asset))
      }
    }
    
    reporter.success('Decap CMS configuration copied successfully')
  } catch (error) {
    reporter.error('Failed to copy Decap configuration:', error)
  }
}