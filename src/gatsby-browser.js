/**
 * ============================================================================
 * GATSBY-BROWSER.JS - Client-Side Runtime Configuration
 * ============================================================================
 * 
 * PURPOSE:
 * Controls browser-side behavior after the static site loads.
 * Handles theme persistence, consent management, and analytics initialization.
 * 
 * RESPONSIBILITIES:
 * 1. Theme persistence across navigation
 * 2. Google Consent Mode v2 initialization
 * 3. Analytics script loading (consent-aware)
 * 4. CSS variable injection for theming
 * 5. Dark mode toggle handling
 * 6. Accessibility enhancements (focus management)
 * 
 * ARCHITECTURAL DECISIONS (v2.0.0):
 * - GTM: Using gatsby-plugin-google-tagmanager (not custom provider)
 * - ARIA: Using useAccessibility hook (not provider wrapper)
 * - Consent: Handled here + ConsentBanner component
 * 
 * WHY NO WRAPPERS:
 * We don't use wrapPageElement or wrapRootElement because:
 * - GTM plugin handles script injection automatically
 * - ARIA should be semantic HTML, not React wrappers
 * - Consent banner is rendered by Layout components
 * - Performance: Avoid unnecessary wrapper components
 * 
 * EXECUTION CONTEXT:
 * - Runs in the browser after page load
 * - APIs called on route changes and initial load
 * - Has access to localStorage and DOM
 * 
 * RELATED FILES:
 * - gatsby-ssr.js: Server-side theme setup
 * - gatsby-config.ts: GTM plugin configuration
 * - ConsentBanner.tsx: Consent UI component
 * - themes.ts: Theme definitions
 * - hooks/useGTM.ts: Custom tracking events
 * - hooks/useAccessibility.ts: ARIA utilities
 * 
 * ECOSYSTEM REFERENCES:
 * @see ../CONSENT-ARCHITECTURE.md#analytics-blocking - Consent implementation
 * @see ../src/hooks/useGTM.ts - Custom GTM tracking
 * @see ../src/hooks/useAccessibility.ts - Accessibility features
 * 
 * @module gatsby-browser
 * @see {@link https://www.gatsbyjs.com/docs/reference/config-files/gatsby-browser/}
 * ============================================================================
 */

import './src/styles/global.css'
import './design-system-variables.css'

/**
 * THEME VARIABLE INJECTION
 * ========================
 * Dynamically injects CSS variables based on theme mode.
 * Called on initial load and route changes to maintain consistency.
 * 
 * @param {string} mode - Theme mode ('light' or 'dark')
 */
const injectThemeVariables = (mode) => {
  const root = document.documentElement
  
  // Get theme palette from environment (set by ecosystem wrapper)
  const themeData = {
    light: {
      bgPrimary: process.env.GATSBY_THEME_LIGHT_BG_PRIMARY,
      bgGlass: process.env.GATSBY_THEME_LIGHT_BG_GLASS,
      accentPrimary: process.env.GATSBY_THEME_LIGHT_ACCENT_PRIMARY,
      accentSecondary: process.env.GATSBY_THEME_LIGHT_ACCENT_SECONDARY,
      textPrimary: process.env.GATSBY_THEME_LIGHT_TEXT_PRIMARY,
      textSecondary: process.env.GATSBY_THEME_LIGHT_TEXT_SECONDARY,
    },
    dark: {
      bgPrimary: process.env.GATSBY_THEME_DARK_BG_PRIMARY,
      bgGlass: process.env.GATSBY_THEME_DARK_BG_GLASS,
      accentPrimary: process.env.GATSBY_THEME_DARK_ACCENT_PRIMARY,
      accentSecondary: process.env.GATSBY_THEME_DARK_ACCENT_SECONDARY,
      textPrimary: process.env.GATSBY_THEME_DARK_TEXT_PRIMARY,
      textSecondary: process.env.GATSBY_THEME_DARK_TEXT_SECONDARY,
    }
  }
  
  // Apply the appropriate color scheme
  const colors = themeData[mode] || themeData.light
  
  if (colors.bgPrimary) {
    root.style.setProperty('--color-bg-primary', colors.bgPrimary)
    root.style.setProperty('--color-bg-glass', colors.bgGlass)
    root.style.setProperty('--color-accent-primary', colors.accentPrimary)
    root.style.setProperty('--color-accent-secondary', colors.accentSecondary)
    root.style.setProperty('--color-text-primary', colors.textPrimary)
    root.style.setProperty('--color-text-secondary', colors.textSecondary)
  }
}

/**
 * GOOGLE CONSENT MODE V2 INITIALIZATION
 * ======================================
 * Sets up consent mode before any analytics scripts load.
 * Must run before GTM/GA to ensure proper consent handling.
 * 
 * Flow:
 * 1. Check browser's Do Not Track setting
 * 2. Initialize dataLayer for GTM
 * 3. Set default consent state (deny by default)
 * 4. ConsentBanner component updates based on user choice
 * 
 * @see ../CONSENT-ARCHITECTURE.md#analytics-blocking - Full implementation
 * @see ../CONSENT-ARCHITECTURE.md#regional-detection - Regional defaults
 */
const initializeConsentMode = () => {
  // Initialize GTM dataLayer
  window.dataLayer = window.dataLayer || []
  function gtag() { window.dataLayer.push(arguments) }
  window.gtag = gtag
  
  // Respect browser Do Not Track preference
  const dnt = navigator.doNotTrack || window.doNotTrack || navigator.msDoNotTrack
  const dntEnabled = dnt === '1' || dnt === 'yes'
  
  /**
   * Default consent state - conservative approach
   * All tracking denied until explicit user consent
   * Regional overrides handled by ConsentBanner
   */
  gtag('consent', 'default', {
    'analytics_storage': dntEnabled ? 'denied' : 'denied',
    'ad_storage': 'denied',
    'ad_user_data': 'denied',
    'ad_personalization': 'denied',
    'functionality_storage': 'granted',
    'personalization_storage': 'granted',
    'security_storage': 'granted',
    'wait_for_update': parseInt(process.env.GATSBY_CONSENT_MODE_WAIT_MS) || 500
  })
  
  // Store DNT status for ConsentBanner to use
  if (dntEnabled) {
    window.__dnt_enabled = true
  }
}

/**
 * CLIENT ENTRY API
 * ================
 * Called once when the browser first loads the page.
 * Sets up initial state for theme, consent, and analytics.
 * 
 * Execution order:
 * 1. Initialize consent mode (before analytics)
 * 2. Restore theme preference from localStorage
 * 3. Apply theme CSS variables
 * 4. Set up consent event listeners
 * 
 * @see {@link https://www.gatsbyjs.com/docs/reference/config-files/gatsby-browser/#onClientEntry}
 */
export const onClientEntry = () => {
  // Initialize consent mode first (before any analytics)
  initializeConsentMode()
  
  // Check for saved theme preference or default to system preference
  const savedTheme = localStorage.getItem('theme')
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const theme = savedTheme || (prefersDark ? 'dark' : 'light')
  
  // Apply theme to document root
  document.documentElement.setAttribute('data-theme', theme)
  
  // Inject CSS variables for the theme
  injectThemeVariables(theme)
  
  /**
   * INITIAL PAGE VIEW TRACKING
   * ==========================
   * Track the initial page load (not handled by onRouteUpdate).
   * This ensures the first page view is captured.
   */
  window.addEventListener('load', () => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      // Check consent status
      const consentGranted = localStorage.getItem('gatsby-cookie-consent') === 'true' ||
                            localStorage.getItem('consent_analytics') === 'granted'
      
      if (consentGranted) {
        window.dataLayer.push({
          event: 'page_view',
          page_path: window.location.pathname,
          page_location: window.location.href,
          page_search: window.location.search || undefined,
          page_hash: window.location.hash || undefined,
          page_title: document.title,
          page_referrer: document.referrer,
          page_hostname: window.location.hostname,
          is_initial_load: true,
          timestamp: new Date().toISOString()
        })
      }
    }
  })
  
  /**
   * Consent Event Listener
   * Fired by ConsentBanner when user accepts tracking
   * Loads additional analytics scripts dynamically
   */
  window.addEventListener('consentGranted', () => {
    // Consent mode will be updated by ConsentBanner component
    console.log('Consent granted - analytics will be enabled')
    
    // Load additional analytics scripts if needed
    loadAnalyticsScripts()
    
    // Track current page if not already tracked
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'page_view',
        page_path: window.location.pathname,
        page_location: window.location.href,
        page_search: window.location.search || undefined,
        page_hash: window.location.hash || undefined,
        page_title: document.title,
        page_referrer: document.referrer,
        page_hostname: window.location.hostname,
        is_consent_triggered: true,
        timestamp: new Date().toISOString()
      })
    }
  })
}

/**
 * ROUTE UPDATE API
 * ================
 * Called on every route change within the app.
 * Ensures theme persistence and accessibility during navigation.
 * 
 * RESPONSIBILITIES:
 * 1. Maintain theme across routes
 * 2. Reset focus for keyboard users
 * 3. Announce page changes to screen readers (via useAccessibility hook in components)
 * 
 * @see {@link https://www.gatsbyjs.com/docs/reference/config-files/gatsby-browser/#onRouteUpdate}
 * @see ../src/hooks/useAccessibility.ts - Page announcement implementation
 */
export const onRouteUpdate = ({ location, prevLocation }) => {
  // Maintain theme persistence
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme)
    injectThemeVariables(savedTheme)
  }
  
  /**
   * PAGE VIEW TRACKING
   * ==================
   * Track all page views and route changes for analytics.
   * This ensures we have complete visit-level tracking across the site.
   * 
   * Tracks:
   * - Page path and full URL
   * - Page title
   * - Referrer (previous page or external)
   * - Search parameters
   * - Hash fragments
   */
  if (typeof window !== 'undefined' && window.dataLayer) {
    // Only track if consent is granted
    const consentGranted = localStorage.getItem('gatsby-cookie-consent') === 'true' ||
                          localStorage.getItem('consent_analytics') === 'granted'
    
    if (consentGranted) {
      window.dataLayer.push({
        event: 'page_view',
        page_path: location.pathname,
        page_location: location.href,
        page_search: location.search || undefined,
        page_hash: location.hash || undefined,
        page_title: document.title,
        page_referrer: prevLocation ? prevLocation.pathname : document.referrer,
        page_hostname: location.hostname,
        is_route_change: !!prevLocation,
        timestamp: new Date().toISOString()
      })
    }
  }
  
  /**
   * ACCESSIBILITY: Focus Management
   * ================================
   * Reset focus to the top of the page on route change for keyboard users.
   * This ensures keyboard navigation starts from a predictable location.
   * 
   * Note: Screen reader announcements are handled by useAccessibility hook
   * in Layout components, not here, to avoid duplicate announcements.
   * 
   * @wcag 2.4.3 Focus Order (Level A)
   */
  if (prevLocation && location.pathname !== prevLocation.pathname) {
    // Try to focus the main content area first
    const main = document.querySelector('main') || document.querySelector('[role="main"]')
    if (main && main instanceof HTMLElement) {
      // Set tabindex temporarily to make it focusable
      const originalTabIndex = main.getAttribute('tabindex')
      main.setAttribute('tabindex', '-1')
      main.focus()
      
      // Remove tabindex after focus to maintain natural tab order
      setTimeout(() => {
        if (originalTabIndex === null) {
          main.removeAttribute('tabindex')
        } else {
          main.setAttribute('tabindex', originalTabIndex)
        }
      }, 0)
    } else {
      // Fallback: focus the body
      document.body.focus()
    }
  }
}

/**
 * ANALYTICS SCRIPT LOADER
 * =======================
 * Dynamically loads third-party analytics scripts after consent.
 * Only called when user explicitly grants consent.
 * 
 * Scripts loaded:
 * - Meta (Facebook) Pixel
 * - Twitter (X) Pixel
 * - LinkedIn Insight Tag
 * 
 * Each script checks for:
 * 1. Environment variable with ID
 * 2. Script not already loaded
 * 
 * @see ../src/SERVICES.md#gtm-analytics-flow - Analytics event tracking
 */
const loadAnalyticsScripts = () => {
  /**
   * META PIXEL
   * Facebook/Instagram advertising and conversion tracking
   */
  if (process.env.GATSBY_META_PIXEL_ID && !window.fbq) {
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', process.env.GATSBY_META_PIXEL_ID);
    window.fbq('track', 'PageView');
  }
  
  /**
   * TWITTER (X) PIXEL
   * Conversion tracking for Twitter/X advertising
   */
  if (process.env.GATSBY_TWITTER_PIXEL_ID && !window.twq) {
    !function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);
    },s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='https://static.ads-twitter.com/uwt.js',
    a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');
    window.twq('config', process.env.GATSBY_TWITTER_PIXEL_ID);
  }
  
  /**
   * LINKEDIN INSIGHT TAG
   * B2B conversion tracking and audience building
   */
  if (process.env.GATSBY_LINKEDIN_PARTNER_ID) {
    window._linkedin_partner_id = process.env.GATSBY_LINKEDIN_PARTNER_ID;
    window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
    window._linkedin_data_partner_ids.push(window._linkedin_partner_id);
    (function(l) {
      if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
      window.lintrk.q=[]}
      var s = document.getElementsByTagName("script")[0];
      var b = document.createElement("script");
      b.type = "text/javascript";b.async = true;
      b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
      s.parentNode.insertBefore(b, s);})(window.lintrk);
  }
}

/**
 * DEVELOPMENT LOGGING
 * ===================
 * Helpful debug information in development mode.
 * Shows which domain and site type is being served.
 * 
 * Site types:
 * - Domain: Main marketing sites (getharsh.in, causality.in)
 * - Blog: Blog subdomains (blog.rawthoughts.in)
 * - Project: Project subdomains (HENA.causality.in, jarvisMCP.rawthoughts.in)
 * 
 * IMPORTANT: The internal folder structure (causality.in/PROJECTS/HENA) is 
 * just how the engine discovers and builds projects, but the production URLs
 * are proper subdomains. The build system handles this transformation during
 * deployment.
 */
if (process.env.NODE_ENV === 'development') {
  let siteType = 'Domain'
  if (process.env.GATSBY_IS_BLOG === 'true') {
    siteType = 'Blog'
  } else if (process.env.GATSBY_IS_PROJECT === 'true' || process.env.WEBSITE_PROJECT_NAME) {
    siteType = 'Project'
  }
  
  console.log(`🎨 Theme loaded for domain: ${process.env.GATSBY_DOMAIN || 'getharsh'}`)
  console.log(`📄 Site type: ${siteType}`)
  if (siteType === 'Project' && process.env.WEBSITE_PROJECT_NAME) {
    console.log(`📦 Project: ${process.env.WEBSITE_PROJECT_NAME}`)
  }
}