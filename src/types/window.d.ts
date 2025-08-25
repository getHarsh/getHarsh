/**
 * @fileoverview Window Interface Extensions for Third-Party Integrations
 * @module types/window
 * 
 * @description
 * Type definitions for global Window interface augmentations used throughout
 * the getHarsh ecosystem. These types enable TypeScript support for:
 * - Google Tag Manager (GTM) and Google Analytics
 * - Social media SDKs (Twitter, Facebook, LinkedIn)
 * - Third-party analytics and tracking services
 * - Browser-level integrations and APIs
 * 
 * These augmentations ensure type safety when interacting with external
 * services loaded via script tags or CDNs.
 * 
 * @ecosystem-integration
 * - GTM Integration: dataLayer and gtag for analytics tracking
 * - Social Widgets: Twitter, Facebook, LinkedIn embeds
 * - Analytics: Google Analytics 4 and consent mode
 * - Components: Used by SocialEmbed, GTM utilities, ConsentBanner
 * 
 * @dos
 * - Check for SDK existence before using (e.g., window.twttr?.widgets)
 * - Use proper type guards for runtime safety
 * - Follow SDK documentation for initialization
 * - Handle loading states appropriately
 * 
 * @donts
 * - Don't assume SDKs are immediately available
 * - Don't bypass TypeScript checks with 'any'
 * - Don't load SDKs multiple times
 * - Don't expose sensitive data to global scope
 * 
 * @see {@link file://./src/utils/gtm.ts} - GTM utilities
 * @see {@link file://./src/components/content/SocialEmbed.tsx} - Social embeds
 * @see {@link file://./config/CONSENT-ARCHITECTURE.md} - Consent mode
 * @see {@link https://developers.google.com/tag-platform/gtagjs/reference} - gtag.js reference
 */

// ============================================================================
// GOOGLE TAG MANAGER TYPES
// ============================================================================
/**
 * Data layer object for Google Tag Manager.
 * Represents a single event or data push to the dataLayer.
 * 
 * @see {@link https://developers.google.com/tag-platform/tag-manager/datalayer} - dataLayer docs
 */
interface GTMDataLayerObject {
  /** Event name for triggering GTM tags */
  event?: string;
  /** Additional event parameters and data */
  [key: string]: any;
}

/**
 * Google Tag Manager dataLayer array with custom push method.
 * Extends Array to maintain compatibility with GTM's implementation.
 * 
 * @see {@link file://./src/utils/gtm.ts} - GTM push utilities
 */
interface GTMDataLayer extends Array<GTMDataLayerObject> {
  /** Push one or more objects to the dataLayer */
  push: (...args: GTMDataLayerObject[]) => number;
}

// ============================================================================
// SOCIAL MEDIA SDK TYPES
// ============================================================================

/**
 * Twitter widgets SDK interface.
 * Provides methods for embedding tweets and timelines.
 * 
 * @see {@link https://developer.twitter.com/en/docs/twitter-for-websites/javascript-api/overview} - Twitter JS API
 */
interface TwitterWidgets {
  load: () => void;
  createTweet?: (id: string, container: HTMLElement, options?: any) => void;
  createTimeline?: (source: any, container: HTMLElement, options?: any) => void;
}

/**
 * Facebook SDK interface.
 * Provides methods for social plugins and analytics.
 * 
 * @see {@link https://developers.facebook.com/docs/javascript/reference} - Facebook JS SDK
 */
interface FacebookSDK {
  init: (params: {
    appId?: string;
    xfbml?: boolean;
    version?: string;
  }) => void;
  XFBML: {
    parse: (element?: HTMLElement) => void;
  };
  Event: {
    subscribe: (event: string, callback: Function) => void;
  };
}

/**
 * LinkedIn SDK interface.
 * Provides methods for embedded content and social features.
 * 
 * @see {@link https://docs.microsoft.com/en-us/linkedin/consumer/integrations/self-serve/plugins} - LinkedIn plugins
 */
interface LinkedInSDK {
  parse: (element?: HTMLElement) => void;
  Event: {
    on: (element: HTMLElement, event: string, callback: Function) => void;
  };
}

// ============================================================================
// GLOBAL WINDOW AUGMENTATION
// ============================================================================

/**
 * Global Window interface augmentations.
 * Extends the browser's Window object with third-party integrations.
 * 
 * @example
 * ```ts
 * // Check and use GTM
 * if (window.dataLayer) {
 *   window.dataLayer.push({
 *     event: 'page_view',
 *     page_path: '/services'
 *   });
 * }
 * 
 * // Check and use Twitter widgets
 * if (window.twttr?.widgets) {
 *   window.twttr.widgets.load();
 * }
 * ```
 */
declare global {
  interface Window {
    // Google Tag Manager and Analytics
    /** GTM dataLayer for event tracking */
    dataLayer: GTMDataLayer;
    
    /**
     * Google Analytics gtag function.
     * Used for analytics events and consent management.
     * 
     * @param command - Command type (event, consent, config)
     * @param action - Action name or consent settings
     * @param params - Additional parameters
     * 
     * @see {@link file://./config/CONSENT-ARCHITECTURE.md#google-consent-mode-v2} - Consent mode
     */
    gtag?: (
      command: 'event' | 'consent' | 'config',
      action: string | Record<string, string>,
      params?: Record<string, unknown>
    ) => void;
    
    // Social media SDKs
    /**
     * Twitter widgets SDK global object.
     * Loaded asynchronously via Twitter's widgets.js.
     */
    twttr?: {
      widgets?: TwitterWidgets;
      ready?: (callback: Function) => void;
    };
    /** Facebook SDK global object */
    FB?: FacebookSDK;
    
    /** LinkedIn SDK global object */
    IN?: LinkedInSDK;
    
    // Other common global objects
    /** Intercom customer messaging platform (if integrated) */
    Intercom?: any;
    
    /** Segment analytics.js library (if integrated) */
    analytics?: any;
  }
}

/**
 * Export empty object to make this a module.
 * Required for TypeScript to treat this as a module file.
 */
export {};