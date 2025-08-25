/**
 * @fileoverview Theme Loader for Chakra-Aligned Multi-Domain System
 * @module config/theme-loader
 * 
 * @description
 * Loads and manages theme configurations for the multi-domain ecosystem.
 * Combines visual theme palettes (defined in code) with configuration data
 * (from environment variables) to create complete theme objects. Each domain
 * has a theme aligned with Chakra energy centers, creating a unique visual
 * identity that reflects the domain's purpose and energy.
 * 
 * This loader is central to the visual identity system, bridging the gap
 * between proto-driven configuration and runtime theme application.
 * 
 * @architecture
 * Theme loading follows a layered approach:
 * 1. **Proto Layer**: ThemeConfig defines theme structure
 * 2. **Palette Layer**: Visual palettes defined in code (this file)
 * 3. **Config Layer**: Theme selection via domain_info.theme_id
 * 4. **Environment Layer**: Variables set by wrapper.sh
 * 5. **Runtime Layer**: CSS variables injected in browser
 * 
 * @ecosystem-integration
 * - Gatsby Config: Provides theme metadata for SSG
 * - Gatsby Browser: Injects CSS variables at runtime
 * - Tailwind CSS: Maps CSS variables to utility classes
 * - React Components: Use theme via ThemeContext
 * - Dark Mode: System preference detection and toggle
 * - Analytics: Theme preference tracking
 * - Accessibility: High contrast mode support
 * 
 * @configuration-flow
 * 1. Domain config specifies theme_id (e.g., "getharsh")
 * 2. process-configs.sh validates and processes theme
 * 3. wrapper.sh exports theme variables to environment
 * 4. This loader reads environment and selects palette
 * 5. gatsby-browser.js injects CSS variables
 * 6. Components use CSS variables via Tailwind
 * 
 * @environment-variables
 * - **WEBSITE_THEME_ID**: Selected theme identifier
 * - **WEBSITE_DOMAIN**: Current domain for fallback
 * - **WEBSITE_ENTITY**: Legal entity (RTEPL/DSPL)
 * - **WEBSITE_URL_ECOSYSTEM**: Main ecosystem URL
 * - **WEBSITE_URL_ECOSYSTEM_LEARN**: Documentation URL
 * - **WEBSITE_URL_PAYPAL**: Donation URL
 * - **WEBSITE_SOCIAL_***: Social media links
 * 
 * @theme-philosophy
 * Each domain aligns with a Chakra energy center:
 * - **getHarsh**: Manipura (Solar Plexus) - Personal power, gold/amber
 * - **rawThoughts**: Muladhara + Svadhisthana (Root + Sacral) - Grounding, terra/rose
 * - **causality**: Vishuddha (Throat) - Communication, sky/blue
 * - **sleepwalker**: Sahasrara (Crown) - Consciousness, violet/lavender
 * - **daoStudio**: Anahata (Heart) - Connection, sage/mint
 * 
 * @design-system
 * Color palette structure:
 * - **bgPrimary**: Main background color
 * - **bgGlass**: Glass morphism effect background
 * - **accentPrimary**: Primary brand color
 * - **accentSecondary**: Secondary brand color
 * - **textPrimary**: Main text color
 * - **textSecondary**: Muted text color
 * 
 * @accessibility
 * - All color combinations meet WCAG AA contrast ratios
 * - Dark mode reduces eye strain in low light
 * - System preference detection for automatic mode
 * - High contrast mode override available
 * 
 * @dos
 * - Keep palettes in sync with design system
 * - Provide fallbacks for missing config
 * - Use semantic color names
 * - Support both light and dark modes
 * - Test color contrast ratios
 * - Document chakra alignments
 * 
 * @donts
 * - Don't define colors in configuration files
 * - Don't skip theme validation
 * - Don't mix themes across domains
 * - Don't hardcode theme selection
 * - Don't ignore accessibility requirements
 * - Don't use colors directly (use CSS variables)
 * 
 * @example
 * ```typescript
 * import { 
 *   loadThemeFromEnvironment, 
 *   getCurrentThemeWithFallback,
 *   DomainTheme 
 * } from '@/config/theme-loader'
 * 
 * // Load theme based on configuration
 * const theme = loadThemeFromEnvironment()
 * console.log(theme.name) // "getHarsh"
 * console.log(theme.chakra) // "Manipura"
 * console.log(theme.palette.light.accentPrimary) // "#C19A6B"
 * 
 * // Get theme with fallback
 * const themeWithFallback = getCurrentThemeWithFallback()
 * 
 * // Use in components
 * const styles = {
 *   backgroundColor: 'var(--bg-primary)',
 *   color: 'var(--text-primary)'
 * }
 * ```
 * 
 * @see {@link file://./BUILD.md#themes} - Theme build process
 * @see {@link file://./README.md#visual-identity} - Visual identity documentation
 * @see {@link file://./src/config/themes.ts} - Theme utilities and helpers
 * @see {@link file://./gatsby-browser.js} - CSS variable injection
 * @see {@link file://./tailwind.config.js} - Tailwind CSS variable mapping
 * @see {@link file://./config/schema/domain.proto} - Theme configuration schema
 * @see {@link file://./src/components/ui/ThemeToggle.tsx} - Theme switching component
 * 
 * @since 1.0.0
 */

/**
 * Theme palette structure for light and dark modes.
 * Each mode has distinct colors for backgrounds, accents, and text.
 * All colors must meet WCAG AA contrast requirements.
 */
export interface ThemePalette {
  /** Light mode color scheme */
  light: {
    /** Primary background color */
    bgPrimary: string
    /** Glass morphism background */
    bgGlass: string
    /** Primary accent color */
    accentPrimary: string
    /** Secondary accent color */
    accentSecondary: string
    /** Primary text color */
    textPrimary: string
    /** Secondary/muted text color */
    textSecondary: string
  }
  /** Dark mode color scheme */
  dark: {
    /** Primary background color */
    bgPrimary: string
    /** Glass morphism background */
    bgGlass: string
    /** Primary accent color */
    accentPrimary: string
    /** Secondary accent color */
    accentSecondary: string
    /** Primary text color */
    textPrimary: string
    /** Secondary/muted text color */
    textSecondary: string
  }
}

/**
 * Complete domain theme configuration.
 * Combines visual palette with metadata and ecosystem links.
 * Generated from ThemeConfig proto and environment variables.
 */
export interface DomainTheme {
  /** Domain name (e.g., "getHarsh") */
  name: string
  /** Chakra energy center alignment */
  chakra: string
  /** Theme description with energy center */
  description: string
  /** Legal entity abbreviation (RTEPL/DSPL) */
  entity: string
  /** Color palette for light/dark modes */
  palette: ThemePalette
  /** Optional URL configurations */
  urls?: {
    /** Main ecosystem URL */
    ecosystem?: string
    /** Learn more documentation URL */
    ecosystemLearnMore?: string
    /** PayPal donation URL */
    paypal?: string
  }
  /** Optional social media links */
  social?: {
    /** GitHub profile */
    github?: string
    /** Twitter/X handle */
    twitter?: string
    /** LinkedIn profile */
    linkedin?: string
    /** YouTube channel */
    youtube?: string
    /** Contact email */
    email?: string
    /** Sponsorship email */
    sponsorEmail?: string
  }
}

/**
 * Default theme structure with neutral colors.
 * Used as base for merging with actual theme palettes.
 * Provides fallback values for missing configuration.
 */
const DEFAULT_THEME_STRUCTURE: DomainTheme = {
  name: 'Domain',
  chakra: 'Energy Center',
  description: 'Description',
  entity: 'Entity Name',
  palette: {
    light: {
      bgPrimary: '#FFFFFF',
      bgGlass: 'rgba(255, 255, 255, 0.8)',
      accentPrimary: '#000000',
      accentSecondary: '#666666',
      textPrimary: '#000000',
      textSecondary: '#666666',
    },
    dark: {
      bgPrimary: '#000000',
      bgGlass: 'rgba(0, 0, 0, 0.8)',
      accentPrimary: '#FFFFFF',
      accentSecondary: '#999999',
      textPrimary: '#FFFFFF',
      textSecondary: '#999999',
    },
  },
}

/**
 * Load theme from environment variables.
 * These are set by wrapper.sh based on ecosystem configuration.
 * Combines visual palette with configuration metadata.
 * 
 * @returns Complete domain theme with palette and metadata
 */
export const loadThemeFromEnvironment = (): DomainTheme => {
  // Get theme ID to select the visual palette
  const themeId = process.env.WEBSITE_THEME_ID || ''
  const domain = process.env.WEBSITE_DOMAIN || process.env.GATSBY_DOMAIN || ''
  const domainBase = domain.replace(/\.in$/, '').replace(/^blog\./, '')
  
  // Get the visual theme palette based on theme ID or domain
  const paletteKey = themeId || domainBase
  const visualTheme = THEME_PALETTES[paletteKey] || THEME_PALETTES[domainBase] || {}
  
  // Build complete theme by merging visual theme with config data
  const theme: DomainTheme = {
    ...DEFAULT_THEME_STRUCTURE,
    ...visualTheme,
    // Entity comes from config
    entity: process.env.WEBSITE_ENTITY || '',
  }
  
  // Load URLs from config (not hardcoded)
  theme.urls = {
    ecosystem: process.env.WEBSITE_URL_ECOSYSTEM || '',
    ecosystemLearnMore: process.env.WEBSITE_URL_ECOSYSTEM_LEARN || '',
    paypal: process.env.WEBSITE_URL_PAYPAL || '',
  }
  
  // Load social links from config (not hardcoded)
  theme.social = {
    github: process.env.WEBSITE_SOCIAL_GITHUB || '',
    twitter: process.env.WEBSITE_SOCIAL_TWITTER || '',
    linkedin: process.env.WEBSITE_SOCIAL_LINKEDIN || '',
    youtube: process.env.WEBSITE_SOCIAL_YOUTUBE || '',
    email: process.env.WEBSITE_CONTACT_EMAIL || '',
    sponsorEmail: process.env.WEBSITE_CONTACT_SPONSOR || '',
  }
  
  return theme
}

/**
 * Visual theme palettes aligned with Chakra energy centers.
 * These stay in src/ as part of the theme engine.
 * Only contains visual/UI aspects, no configuration data.
 * Each palette is carefully designed for accessibility and brand identity.
 */
const THEME_PALETTES: Record<string, Partial<DomainTheme>> = {
  getharsh: {
    name: 'getHarsh',
    chakra: 'Manipura',
    description: 'Solar Plexus • Personal Power & Confidence',
    palette: {
      light: {
        bgPrimary: '#FBF8F3',
        bgGlass: 'rgba(251, 248, 243, 0.8)',
        accentPrimary: '#C19A6B',
        accentSecondary: '#D4AF37',
        textPrimary: '#3A3530',
        textSecondary: '#6B645C',
      },
      dark: {
        bgPrimary: '#1A1815',
        bgGlass: 'rgba(26, 24, 21, 0.8)',
        accentPrimary: '#E5C07B',
        accentSecondary: '#98834B',
        textPrimary: '#F5F2ED',
        textSecondary: '#A8A29E',
      },
    },
  },
  rawthoughts: {
    name: 'rawThoughts',
    chakra: 'Muladhara + Svadhisthana',
    description: 'Root + Sacral • Grounding & Creativity',
    palette: {
      light: {
        bgPrimary: '#FDF5F3',
        bgGlass: 'rgba(253, 245, 243, 0.8)',
        accentPrimary: '#A85C5C',
        accentSecondary: '#C97064',
        textPrimary: '#3C2E2A',
        textSecondary: '#6B5651',
      },
      dark: {
        bgPrimary: '#1A1514',
        bgGlass: 'rgba(26, 21, 20, 0.8)',
        accentPrimary: '#D98E8E',
        accentSecondary: '#9E6B5C',
        textPrimary: '#F5EDED',
        textSecondary: '#B8A5A0',
      },
    },
  },
  daostudio: {
    name: 'daoStudio',
    chakra: 'Anahata',
    description: 'Heart • Love & Compassion',
    palette: {
      light: {
        bgPrimary: '#F5F9F5',
        bgGlass: 'rgba(245, 249, 245, 0.8)',
        accentPrimary: '#7A9E7E',
        accentSecondary: '#93B5A1',
        textPrimary: '#2D3A2D',
        textSecondary: '#546B54',
      },
      dark: {
        bgPrimary: '#151A15',
        bgGlass: 'rgba(21, 26, 21, 0.8)',
        accentPrimary: '#9ECAA6',
        accentSecondary: '#5C7C60',
        textPrimary: '#EDF5ED',
        textSecondary: '#A0B8A0',
      },
    },
  },
  causality: {
    name: 'causality',
    chakra: 'Vishuddha',
    description: 'Throat • Truth & Communication',
    palette: {
      light: {
        bgPrimary: '#F3F7FB',
        bgGlass: 'rgba(243, 247, 251, 0.8)',
        accentPrimary: '#6B8CAE',
        accentSecondary: '#8FA7C4',
        textPrimary: '#2A3441',
        textSecondary: '#516170',
      },
      dark: {
        bgPrimary: '#14171A',
        bgGlass: 'rgba(20, 23, 26, 0.8)',
        accentPrimary: '#8EBED9',
        accentSecondary: '#5C7A9E',
        textPrimary: '#EDF3F8',
        textSecondary: '#A0B4C8',
      },
    },
  },
  sleepwalker: {
    name: 'sleepwalker',
    chakra: 'Sahasrara',
    description: 'Crown • Spiritual Connection',
    palette: {
      light: {
        bgPrimary: '#F8F5FB',
        bgGlass: 'rgba(248, 245, 251, 0.8)',
        accentPrimary: '#8B7A9E',
        accentSecondary: '#A694B8',
        textPrimary: '#312E3A',
        textSecondary: '#5E546B',
      },
      dark: {
        bgPrimary: '#18151A',
        bgGlass: 'rgba(24, 21, 26, 0.8)',
        accentPrimary: '#B8A6CA',
        accentSecondary: '#6B5C7C',
        textPrimary: '#F3EDF8',
        textSecondary: '#B0A0C0',
      },
    },
  },
}

/**
 * Get current theme with fallback handling.
 * Always loads from environment for consistency.
 * Logs warnings for missing critical configuration.
 * 
 * @returns Complete theme with all required properties
 */
export const getCurrentThemeWithFallback = (): DomainTheme => {
  // Always load from environment - no hardcoded fallbacks
  const theme = loadThemeFromEnvironment()
  
  // Log if critical data is missing (for debugging)
  if (!theme.entity) {
    console.warn('No entity found in environment - ensure config is processed')
  }
  
  if (!theme.urls?.ecosystem) {
    console.warn('No ecosystem URL found in environment - ensure config is processed')
  }
  
  return theme
}