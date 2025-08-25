/**
 * @fileoverview Decap CMS Initialization with Proto-Driven Architecture
 * @module static/admin/cms
 * 
 * @description
 * Central initialization module for Decap CMS (formerly Netlify CMS) that
 * bridges the proto-driven configuration system with the content editing interface.
 * This module orchestrates the entire CMS setup, loading discovery data,
 * registering custom widgets, and applying domain-specific theming.
 * 
 * The CMS is the primary interface for content creation in the getHarsh ecosystem,
 * enabling authors to create semantically rich content that flows through the
 * 77+ proto → 381 JSON schema → 689 TypeScript type pipeline.
 * 
 * @architecture
 * The CMS initialization follows a layered architecture:
 * 1. **Discovery Layer**: Load entity manifest (domains, blogs, projects)
 * 2. **Widget Layer**: Register 10 proto-aware custom widgets
 * 3. **Preview Layer**: Register real-time preview templates
 * 4. **Theme Layer**: Apply domain-specific styling
 * 5. **Runtime Layer**: Initialize CMS with all configurations
 * 
 * @proto-integration
 * - **ArticleConfig**: 25+ fields for blog posts (blog.proto)
 * - **PageConfig**: Static page configuration (page.proto)
 * - **CrossPosting**: Multi-domain syndication (blog.proto)
 * - **ProjectRelationships**: Project linkage (project.proto)
 * - **MediaAttachments**: Media management (media.proto)
 * - **DiscussionPlatforms**: Social integration (social.proto)
 * - **SponsorInfo**: Sponsor metadata (sponsor.proto)
 * - **SeriesInfo**: Content series (series.proto)
 * - **SchemaOrgOverride**: SEO customization (schema.proto)
 * - **FeatureOverrides**: Feature flags (features.proto)
 * 
 * @ecosystem-integration
 * - Discovery System: Loads from discovery-manifest.json
 * - Widget System: 10 custom widgets with proto validation
 * - Theme System: Chakra-aligned domain themes
 * - Schema System: 381 JSON schemas for validation
 * - Type System: 689 TypeScript types for type safety
 * - Build System: Phase 4 CMS configuration generation
 * - Preview System: Real-time content preview
 * - Analytics: GTM event tracking for CMS actions
 * 
 * @configuration-flow
 * 1. Load discovery manifest (domains, blogs, projects)
 * 2. Make discovery data globally available
 * 3. Register preview templates for real-time preview
 * 4. Register custom widgets with proto awareness
 * 5. Apply theme styles to CMS interface
 * 6. Initialize CMS with all configurations
 * 
 * @custom-widgets
 * Each widget corresponds to a protobuf message type:
 * - **CrossPostingWidget**: Multi-domain blog syndication
 * - **ProjectRelationshipsWidget**: Project linkage and updates
 * - **MediaAttachmentsWidget**: YouTube, images, audio management
 * - **DiscussionPlatformsWidget**: GitHub, Twitter, LinkedIn integration
 * - **SponsorWidget**: Sponsor metadata and attribution
 * - **SeriesWidget**: Blog series management
 * - **SchemaOrgOverrideWidget**: Schema.org customization
 * - **FeatureOverridesWidget**: Feature flag management
 * - **DisplaySettingsWidget**: Layout and visibility controls
 * - **BaseWidget**: Abstract base class for all widgets
 * 
 * @theme-integration
 * Domain-specific theming based on Chakra energy centers:
 * - **getHarsh**: Manipura (Solar Plexus) - Gold/Amber
 * - **rawThoughts**: Muladhara + Svadhisthana - Terra/Rose
 * - **causality**: Vishuddha (Throat) - Sky/Blue
 * - **sleepwalker**: Sahasrara (Crown) - Violet/Lavender
 * - **daoStudio**: Anahata (Heart) - Sage/Mint
 * 
 * @dos
 * - Load discovery manifest before widget registration
 * - Register all widgets before CMS.init()
 * - Apply theme styles for consistent branding
 * - Use proto-aware widgets for complex fields
 * - Validate against JSON schemas
 * - Track CMS events with GTM
 * 
 * @donts
 * - Don't hardcode entity lists (use discovery)
 * - Don't skip widget registration
 * - Don't initialize before DOM ready
 * - Don't modify generated config.yml
 * - Don't bypass proto validation
 * - Don't ignore theme consistency
 * 
 * @example
 * ```typescript
 * // The CMS is automatically initialized when /admin/ is accessed
 * // No manual initialization required - this module self-initializes
 * 
 * // Widgets access discovery data globally:
 * const domains = window.__DECAP_DISCOVERY__?.domains || []
 * const blogs = window.__DECAP_DISCOVERY__?.blogs || []
 * const projects = window.__DECAP_DISCOVERY__?.projects || []
 * ```
 * 
 * @see {@link file://./CMS.md} - Complete CMS documentation
 * @see {@link file://./BUILD.md#phase-4} - CMS configuration generation
 * @see {@link file://./src/CMS.md#architecture} - CMS architecture diagrams
 * @see {@link file://./config/CONFIG.md#cms-configuration} - Configuration system
 * @see {@link file://./config/schema/SCHEMA.md#cms-widgets} - Widget proto mapping
 * @see {@link file://./DEV-TOOLING.md#cms-integration} - Development setup
 * @see {@link file://./config/schema/blog.proto} - ArticleConfig proto definition
 * 
 * @since 1.0.0
 */

import CMS from "decap-cms-app"
import { getCurrentTheme } from "../../src/config/themes"
import { ArticlePreview } from "./templates/article-preview"
import { PagePreview } from "./templates/page-preview"

// Simple debug utility for CMS context
const debug = {
  log: (message: string, ...args: any[]) => {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log(`[CMS] ${message}`, ...args)
    }
  },
  warn: (message: string, ...args: any[]) => {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`[CMS] ${message}`, ...args)
    }
  },
  error: (message: string, ...args: any[]) => {
    console.error(`[CMS] ${message}`, ...args)
  }
}

/**
 * @interface Window.__DECAP_DISCOVERY__
 * @description Global discovery data made available to CMS widgets
 * 
 * This data is generated by getHarsh/config/tools/generate-manifests.sh
 * and provides widgets with knowledge of all entities in the ecosystem.
 * 
 * @property {string[]} domains - All configured domains (e.g., ["getHarsh.in", "causality.in"])
 * @property {string[]} blogs - All blog subdomains (e.g., ["blog.getHarsh.in"])
 * @property {string[]} projects - All projects with paths (e.g., ["causality.in/PROJECTS/HENA"])
 * @property {object} schemas - JSON schema information
 * @property {number} schemas.count - Number of generated schemas (381)
 * @property {string} schemas.location - Path to schemas directory
 * @property {object} types - TypeScript type information
 * @property {number} types.count - Number of generated types (689)
 * @property {string} types.location - Path to types directory
 */
declare global {
  interface Window {
    __DECAP_DISCOVERY__?: {
      domains?: string[]
      blogs?: string[]
      projects?: string[]
      schemas?: { count: number; location: string }
      types?: { count: number; location: string }
    }
  }
}

/**
 * Import all proto-aware custom widgets
 * Each widget corresponds to a specific protobuf message type
 * and provides a rich editing interface for that data structure.
 * 
 * @see {@link ./widgets/} - Widget implementations
 * @see {@link ../../../getHarsh/protos/} - Source protobuf definitions
 */
import { CrossPostingWidget } from "./widgets/cross-posting-widget"
import { ProjectRelationshipsWidget } from "./widgets/project-relationships-widget"
import { MediaAttachmentsWidget } from "./widgets/media-attachments-widget"
import { DiscussionPlatformsWidget } from "./widgets/discussion-platforms-widget"
import { SponsorWidget } from "./widgets/sponsor-widget"
import { SeriesWidget } from "./widgets/series-widget"
import { SchemaOrgOverrideWidget } from "./widgets/schema-org-override-widget"
import { FeatureOverridesWidget } from "./widgets/feature-overrides-widget"
import { DisplaySettingsWidget } from "./widgets/display-settings-widget"

/**
 * Initialize Decap CMS with custom configuration
 * 
 * This function orchestrates the entire CMS initialization process:
 * 1. Loads discovery data for entity awareness
 * 2. Registers custom preview templates
 * 3. Registers proto-aware widgets
 * 4. Applies theme-specific styling
 * 5. Initializes the CMS
 * 
 * @async
 * @function initCMS
 * @returns {Promise<void>}
 * 
 * @fires CMS.init - Initializes Decap CMS after configuration
 * @fires window.__DECAP_DISCOVERY__ - Sets global discovery data
 */
const initCMS = async () => {
  /**
   * Get current theme for styling
   * Theme is determined by domain (getHarsh, causality, rawThoughts, etc.)
   * Each theme has specific color palettes and typography settings
   * 
   * @see {@link ../../src/config/themes.ts} - Theme definitions
   */
  const theme = getCurrentTheme()
  
  /**
   * Load discovery data for widgets to use
   * This manifest is generated during build by generate-manifests.sh
   * and contains all discovered entities (domains, blogs, projects)
   * 
   * @see {@link ../../../getHarsh/config/tools/generate-manifests.sh}
   */
  try {
    const response = await fetch('/discovery-manifest.json')
    if (response.ok) {
      const discovery = await response.json()
      // Make discovery data available globally for widgets
      window.__DECAP_DISCOVERY__ = discovery
      debug.log('✅ Loaded discovery data:', {
        domains: discovery.domains?.length || 0,
        blogs: discovery.blogs?.length || 0,
        projects: discovery.projects?.length || 0,
        schemas: discovery.schemas?.count || 0,
        types: discovery.types?.count || 0
      })
    }
  } catch (error) {
    debug.warn('⚠️ Could not load discovery manifest:', error)
    // Widgets will fall back to defaults
  }
  
  /**
   * Register custom preview templates
   * These templates provide real-time preview of content as it's edited,
   * using the same React components that render the actual site.
   * 
   * @see {@link ./templates/article-preview.tsx} - Article preview template
   * @see {@link ./templates/page-preview.tsx} - Page preview template
   */
  CMS.registerPreviewTemplate("posts", ArticlePreview)
  CMS.registerPreviewTemplate("pages", PagePreview)
  
  /**
   * Register all proto-aware custom widgets
   * These widgets leverage the 381 JSON schemas and discovery data
   * to provide rich, type-safe editing interfaces for complex data structures.
   * 
   * Each widget maps to specific protobuf message types and ensures
   * data consistency across the entire ecosystem.
   * 
   * @see {@link ../../../getHarsh/config/schema/SCHEMA.md#widget-proto-mapping}
   */
  CMS.registerWidget("cross-posting", CrossPostingWidget)
  CMS.registerWidget("project-relationships", ProjectRelationshipsWidget)
  CMS.registerWidget("media-attachments", MediaAttachmentsWidget)
  CMS.registerWidget("discussion-platforms", DiscussionPlatformsWidget)
  CMS.registerWidget("sponsor", SponsorWidget)
  CMS.registerWidget("series", SeriesWidget)
  CMS.registerWidget("schema-org-override", SchemaOrgOverrideWidget)
  CMS.registerWidget("feature-overrides", FeatureOverridesWidget)
  CMS.registerWidget("display-settings", DisplaySettingsWidget)
  
  /**
   * Inject theme-aware styles
   * Applies domain-specific color palettes and typography to the CMS interface
   * to maintain brand consistency even in the editing environment.
   * 
   * Supports both light and dark mode based on user preferences.
   */
  const styleElement = document.createElement("style")
  styleElement.innerHTML = `
    /* Import Tailwind and theme styles */
    @import url('/styles/global.css');
    
    /* Apply theme variables to CMS interface */
    .nc-app-root {
      --bg-primary: ${theme.palette.light.bgPrimary};
      --bg-glass: ${theme.palette.light.bgGlass};
      --accent-primary: ${theme.palette.light.accentPrimary};
      --accent-secondary: ${theme.palette.light.accentSecondary};
      --text-primary: ${theme.palette.light.textPrimary};
      --text-secondary: ${theme.palette.light.textSecondary};
    }
    
    @media (prefers-color-scheme: dark) {
      .nc-app-root {
        --bg-primary: ${theme.palette.dark.bgPrimary};
        --bg-glass: ${theme.palette.dark.bgGlass};
        --accent-primary: ${theme.palette.dark.accentPrimary};
        --accent-secondary: ${theme.palette.dark.accentSecondary};
        --text-primary: ${theme.palette.dark.textPrimary};
        --text-secondary: ${theme.palette.dark.textSecondary};
      }
    }
    
    /* Theme CMS interface with domain colors */
    .nc-app-root {
      background-color: var(--bg-primary);
      color: var(--text-primary);
    }
    
    /* Theme form elements */
    .nc-app-root input,
    .nc-app-root textarea,
    .nc-app-root select {
      background-color: var(--bg-glass);
      border-color: var(--accent-primary);
      color: var(--text-primary);
    }
    
    /* Theme buttons */
    .nc-app-root button {
      background-color: var(--accent-primary);
      color: var(--bg-primary);
    }
    
    .nc-app-root button:hover {
      background-color: var(--accent-secondary);
    }
    
    /* Theme preview pane */
    .nc-app-root .nc-preview-pane {
      background-color: var(--bg-primary);
      color: var(--text-primary);
    }
    
    /* Apply retrofuturistic font styles */
    .nc-app-root {
      font-family: 'Roboto Mono', monospace;
    }
    
    .nc-app-root h1,
    .nc-app-root h2,
    .nc-app-root h3,
    .nc-app-root h4,
    .nc-app-root h5,
    .nc-app-root h6 {
      font-family: 'Orbitron', sans-serif;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }
  `
  
  document.head.appendChild(styleElement)
  
  /**
   * Initialize CMS
   * This must be called after all widgets and templates are registered
   */
  CMS.init()
  
  /**
   * Log initialization
   * Useful for debugging and confirming successful setup
   */
  debug.log(`Decap CMS initialized with ${theme.name} theme`)
}

/**
 * Initialize when DOM is ready
 * Ensures all DOM elements are available before CMS initialization
 */
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initCMS)
} else {
  initCMS()
}

export default CMS