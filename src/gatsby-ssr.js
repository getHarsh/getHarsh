/**
 * ============================================================================
 * GATSBY-SSR.JS - Server-Side Rendering Configuration
 * ============================================================================
 * 
 * PURPOSE:
 * Controls server-side rendering behavior during build.
 * Sets up critical CSS variables, theme configuration, and accessibility
 * attributes before client loads. Prevents flash of unstyled content (FOUC)
 * and ensures proper semantic HTML structure.
 * 
 * RESPONSIBILITIES:
 * 1. Inject theme CSS variables into <head>
 * 2. Set HTML attributes for domain identification
 * 3. Add theme persistence script (runs before hydration)
 * 4. Define CSS custom properties for theming
 * 5. Prevent dark mode flash
 * 6. Add ARIA landmarks and lang attribute for accessibility
 * 
 * ARCHITECTURAL DECISIONS (v2.0.0):
 * - GTM: Handled by gatsby-plugin-google-tagmanager (not here)
 * - ARIA: Basic HTML attributes only (semantic HTML first)
 * - Theme: Inline critical CSS to prevent flash
 * 
 * WHY NO REACT WRAPPERS:
 * - GTM plugin injects scripts automatically
 * - ARIA is about HTML semantics, not React components
 * - Performance: SSR should be minimal and fast
 * - SEO: Clean HTML structure without wrapper divs
 * 
 * EXECUTION CONTEXT:
 * - Runs during build time (gatsby build)
 * - Generates static HTML with inline styles
 * - Scripts execute before React hydration
 * - No access to browser APIs (window, document)
 * 
 * RELATED FILES:
 * - gatsby-browser.js: Client-side theme handling
 * - themes.ts: Theme definitions and colors
 * - gatsby-config.ts: GTM plugin configuration
 * - hooks/useAccessibility.ts: Client-side ARIA features
 * 
 * ECOSYSTEM REFERENCES:
 * @see ./src/config/themes.ts - Theme color definitions
 * @see ./src/hooks/useAccessibility.ts - Accessibility utilities
 * @see ../GUARDRAILS.md#theme-architecture - Theme system
 * 
 * @module gatsby-ssr
 * @see {@link https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/}
 * ============================================================================
 */

import React from 'react'
import { domainThemes } from './src/config/themes'

/**
 * ON RENDER BODY API
 * ==================
 * Called after every page is rendered during build.
 * Injects critical styles and scripts into the HTML.
 * 
 * @param {Function} setHeadComponents - Add elements to <head>
 * @param {Function} setHtmlAttributes - Set attributes on <html>
 * 
 * @see {@link https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/#onRenderBody}
 */
export const onRenderBody = ({ setHeadComponents, setHtmlAttributes }) => {
  // Get current domain and theme configuration
  const domain = process.env.GATSBY_DOMAIN || 'getharsh'
  const theme = domainThemes[domain]
  
  // Fallback if theme not found
  if (!theme) {
    console.warn(`No theme found for domain: ${domain}`)
    return
  }
  
  /**
   * HTML ATTRIBUTES
   * Sets data attributes for CSS targeting and JavaScript access
   * Used by components to determine domain-specific behavior
   * 
   * Site types:
   * - domain: Main marketing sites (getharsh.in, causality.in)
   * - blog: Blog subdomains (blog.rawthoughts.in)
   * - project: Project subdomains (HENA.causality.in, jarvisMCP.rawthoughts.in)
   * 
   * NOTE: Internal folder structure (causality.in/PROJECTS/HENA) is for
   * engine discovery only. Production URLs are proper subdomains.
   * The build system transforms paths to subdomains during deployment.
   */
  let siteType = 'domain'
  if (process.env.GATSBY_IS_BLOG === 'true') {
    siteType = 'blog'
  } else if (process.env.GATSBY_IS_PROJECT === 'true' || process.env.WEBSITE_PROJECT_NAME) {
    siteType = 'project'
  }
  
  /**
   * SET HTML ATTRIBUTES FOR ACCESSIBILITY AND IDENTIFICATION
   * =========================================================
   * 
   * @wcag 3.1.1 Language of Page (Level A)
   * The lang attribute helps screen readers pronounce content correctly
   * 
   * data-* attributes are for CSS/JS targeting, not accessibility
   */
  setHtmlAttributes({ 
    lang: 'en', // Required for screen readers
    'data-domain': domain,
    'data-site-type': siteType
  })
  
  setHeadComponents([
    /**
     * THEME PERSISTENCE SCRIPT
     * ========================
     * Runs immediately before page renders to prevent flash.
     * Checks localStorage for saved theme preference.
     * Falls back to system preference if no saved value.
     * 
     * CRITICAL: This must be inline and run synchronously
     * to prevent flash of wrong theme on page load.
     */
    <script
      key="theme-persistence"
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            // Check for saved theme preference or default to system preference
            var savedTheme = localStorage.getItem('theme');
            var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            var theme = savedTheme || (prefersDark ? 'dark' : 'light');
            
            // Apply theme immediately to prevent flash
            document.documentElement.setAttribute('data-theme', theme);
          })();
        `,
      }}
    />,
    /**
     * CSS CUSTOM PROPERTIES
     * =====================
     * Defines all theme variables as CSS custom properties.
     * These are the source of truth for all component styling.
     * 
     * Structure:
     * 1. Domain metadata (name, chakra, entity)
     * 2. Color palette (light/dark modes)
     * 3. Design tokens (blur, shadows, glows)
     * 4. Typography settings
     * 5. Spacing and animation
     * 
     * @see ./src/config/themes.ts - Color definitions
     */
    <style
      key="theme-css-variables"
      dangerouslySetInnerHTML={{
        __html: `
          :root {
            /* Domain Metadata - Used for conditional styling */
            --domain-name: "${theme.name}";
            --domain-chakra: "${theme.chakra}";
            --domain-entity: "${theme.entity}";
            
            /* Light Mode Colors (Default) */
            --color-bg-primary: ${theme.palette.light.bgPrimary};
            --color-bg-glass: ${theme.palette.light.bgGlass};
            --color-accent-primary: ${theme.palette.light.accentPrimary};
            --color-accent-secondary: ${theme.palette.light.accentSecondary};
            --color-text-primary: ${theme.palette.light.textPrimary};
            --color-text-secondary: ${theme.palette.light.textSecondary};
            
            /**
             * Retrofuturistic Design Tokens
             * Glassmorphism and glow effects for modern UI
             */
            --glass-blur: 10px;
            --glass-blur-heavy: 20px;
            --glass-border: 1px solid rgba(255, 255, 255, 0.1);
            --glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
            --glow-sm: 0 0 10px;
            --glow-md: 0 0 20px;
            --glow-lg: 0 0 40px;
            
            /* Typography - Branded fonts with fallbacks */
            --font-display: "Space Grotesk", "Inter", system-ui, sans-serif;
            --font-mono: "JetBrains Mono", "Fira Code", monospace;
            --letter-spacing-tight: -0.02em;
            --letter-spacing-wide: 0.05em;
            
            /* Spacing & Radius */
            --radius-sharp: 2px;
            --radius-medium: 6px;
            --radius-large: 12px;
            
            /* Animation */
            --transition-fast: 150ms ease-in-out;
            --transition-base: 300ms ease-in-out;
            --transition-slow: 500ms ease-in-out;
          }
          
          /**
           * DARK MODE OVERRIDE
           * Applied when data-theme="dark" is set on <html>
           * Overrides all color variables with dark palette
           */
          [data-theme="dark"] {
            --color-bg-primary: ${theme.palette.dark.bgPrimary};
            --color-bg-glass: ${theme.palette.dark.bgGlass};
            --color-accent-primary: ${theme.palette.dark.accentPrimary};
            --color-accent-secondary: ${theme.palette.dark.accentSecondary};
            --color-text-primary: ${theme.palette.dark.textPrimary};
            --color-text-secondary: ${theme.palette.dark.textSecondary};
            
            /* Adjust glass effect for dark mode - more subtle borders */
            --glass-border: 1px solid rgba(255, 255, 255, 0.05);
            --glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.24);
          }
          
          /**
           * AUTOMATIC DARK MODE
           * Applies dark theme based on system preference
           * Only when user hasn't explicitly chosen light mode
           */
          @media (prefers-color-scheme: dark) {
            :root:not([data-theme="light"]) {
              --color-bg-primary: ${theme.palette.dark.bgPrimary};
              --color-bg-glass: ${theme.palette.dark.bgGlass};
              --color-accent-primary: ${theme.palette.dark.accentPrimary};
              --color-accent-secondary: ${theme.palette.dark.accentSecondary};
              --color-text-primary: ${theme.palette.dark.textPrimary};
              --color-text-secondary: ${theme.palette.dark.textSecondary};
              
              /* Adjust glass effect for dark mode */
              --glass-border: 1px solid rgba(255, 255, 255, 0.05);
              --glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.24);
            }
          }
          
          /**
           * BASE RESET & DEFAULTS
           * Global styles applied to all elements
           * Uses CSS variables for consistent theming
           */
          * {
            box-sizing: border-box;
          }
          
          html {
            font-family: var(--font-display);
            background-color: var(--color-bg-primary);
            color: var(--color-text-primary);
          }
          
          /* Text selection styling for brand consistency */
          ::selection {
            background-color: var(--color-accent-primary);
            color: var(--color-bg-primary);
          }
        `,
      }}
    />,
  ])
}