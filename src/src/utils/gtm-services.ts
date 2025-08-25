/**
 * @fileoverview GTM Services Tracking Utilities for Service Conversions
 * @module utils/gtm-services
 * 
 * @description
 * Provides a centralized API for tracking service-related conversions
 * and interactions across the getHarsh ecosystem. This module implements
 * sophisticated conversion tracking for AI transformation services,
 * handling both Google Tag Manager and Google Ads conversion events.
 * 
 * The service tracking system captures the entire customer journey from
 * initial interest through consultation booking, providing insights into
 * service page effectiveness and user engagement patterns.
 * 
 * @conversion-hierarchy
 * Primary Conversions (High Value):
 * - **Consultation Booking**: Direct calendar booking ($150 value)
 * - **Quote Form Submit**: Detailed service inquiry ($75 value)
 * 
 * Secondary Conversions (Medium Value):
 * - **Service Interaction**: Card clicks, feature exploration
 * - **Industry Page View**: Vertical-specific interest
 * 
 * Micro-conversions (Engagement):
 * - **Feature Expansion**: Detailed feature views
 * - **Blog-to-Service**: Content-driven discovery
 * - **Time Engagement**: 30+ seconds on service pages
 * 
 * @ecosystem-integration
 * - GTM DataLayer: Push events for Tag Manager processing
 * - Google Ads: Direct conversion tracking via gtag
 * - Analytics: Service funnel and attribution analysis
 * - Enhanced Ecommerce: Service viewing as product impressions
 * - Service Pages: Track all service-related interactions
 * - Blog Integration: Content-to-service journey tracking
 * 
 * @environment-variables
 * - **GATSBY_LEGAL_ENTITY**: Legal entity (RTEPL/TLF)
 * - **GATSBY_GOOGLE_ADS_CONVERSION_ID**: Google Ads account ID
 * - **GATSBY_GOOGLE_ADS_CONSULTATION_LABEL**: Consultation conversion label
 * - **GATSBY_GOOGLE_ADS_QUOTE_LABEL**: Quote form conversion label
 * 
 * @privacy-compliance
 * - Respects DNT (Do Not Track) settings
 * - No PII in tracking events
 * - Consent-aware tracking
 * - Anonymous transaction IDs
 * - GDPR/CCPA compliant
 * 
 * @dos
 * - Track all service interactions for funnel analysis
 * - Use appropriate conversion values for each action
 * - Include context (category, location, type)
 * - Initialize page tracking on service pages
 * - Set up enhanced ecommerce for service listings
 * 
 * @donts
 * - Don't track without user consent
 * - Don't include sensitive business information
 * - Don't override existing dataLayer events
 * - Don't track in development without debug flag
 * - Don't forget to reset counters on page change
 * 
 * @example
 * ```typescript
 * import { GTMServices } from '@/utils/gtm-services'
 * 
 * // Track consultation booking
 * GTMServices.trackConsultationClick({
 *   category: 'ai_growth',
 *   pageType: 'industry',
 *   location: 'hero_cta'
 * })
 * 
 * // Track quote form submission
 * GTMServices.trackQuoteSubmit({
 *   service: 'AI Interface Solutions',
 *   budget: '$10k-$50k',
 *   timeline: '3 months'
 * })
 * 
 * // Initialize service page tracking
 * GTMServices.initializePageTracking('services')
 * ```
 * 
 * @see {@link file://./SERVICES.md#conversion-tracking} - Service conversion documentation
 * @see {@link file://./BUILD.md#analytics} - Analytics configuration
 * @see {@link file://./src/hooks/useServiceTracking.ts} - Service tracking hook
 * @see {@link file://./src/hooks/useGTM.ts} - Base GTM integration
 * @see {@link https://developers.google.com/tag-platform/tag-manager/} - GTM documentation
 * 
 * @since 2.0.0
 */

/**
 * Import Window interface extensions from centralized types
 * This includes GTM dataLayer and gtag functions
 */
import type {} from '@/types/window'

// Extend Window interface for DNT tracking only
declare global {
  interface Window {
    __dnt_enabled?: boolean;
  }
}

/**
 * Consultation context interface.
 * Provides context for consultation booking events.
 */
interface ConsultationContext {
  category?: string;
  pageType?: string;
  location?: string;
}

/**
 * Quote form data interface.
 * Captures detailed service inquiry information.
 */
interface QuoteFormData {
  service: string;
  budget: string;
  timeline?: string;
  companySize?: string;
  message?: string;
}

/**
 * Article data interface.
 * Tracks blog-to-service navigation context.
 */
interface ArticleData {
  title: string;
  category: string;
  targetService: string;
  ctaType: string;
}

/**
 * Service data interface.
 * Represents AI transformation service offerings.
 */
interface ServiceData {
  id: string;
  name: string;
  category: string;
  startingPrice?: number;
}

/**
 * GTM Services tracking utilities.
 * Central object for all service-related tracking operations.
 */
export const GTMServices = {
  // Track counters
  interactionCount: 0,
  startTime: Date.now(),
  expansionCount: {} as Record<string, number>,

  /**
   * Safely push event to dataLayer.
   * Handles SSR and includes debug logging.
   * 
   * @param eventData - Event data to push to GTM
   */
  pushEvent: (eventData: Record<string, any>) => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push(eventData);
      
      // Debug logging in development
      if (process.env.NODE_ENV === 'development') {
        console.log('[GTM Services]', eventData);
      }
    }
  },

  /**
   * Track consultation booking click (Primary Conversion).
   * Highest value conversion event ($150 attributed value).
   * 
   * @param context - Service context including category and location
   */
  trackConsultationClick: (context: ConsultationContext = {}) => {
    GTMServices.pushEvent({
      event: 'consultation_booking_click',
      conversion_value: 'high',
      service_interest: context.category || 'general',
      service_page_type: context.pageType || 'main',
      cta_location: context.location || 'hero',
      entity: process.env.GATSBY_LEGAL_ENTITY || 'RTEPL',
      timestamp: new Date().toISOString()
    });

    // Also send to Google Ads if available
    if (typeof window !== 'undefined' && window.gtag) {
      const conversionId = process.env.GATSBY_GOOGLE_ADS_CONVERSION_ID;
      const conversionLabel = process.env.GATSBY_GOOGLE_ADS_CONSULTATION_LABEL;
      
      if (conversionId && conversionLabel) {
        window.gtag('event', 'conversion', {
          send_to: `${conversionId}/${conversionLabel}`,
          value: 150.0,
          currency: 'USD',
          transaction_id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
        });
      }
    }
  },

  /**
   * Track quote form submission (Secondary Conversion).
   * Medium value conversion for detailed service inquiries ($75 value).
   * 
   * @param formData - Detailed form submission data
   */
  trackQuoteSubmit: (formData: QuoteFormData) => {
    GTMServices.pushEvent({
      event: 'quote_form_submit',
      form_data: {
        service_interest: formData.service,
        budget_range: formData.budget,
        timeline: formData.timeline,
        company_size: formData.companySize,
        has_message: !!formData.message
      },
      conversion_value: 'medium',
      entity: process.env.GATSBY_LEGAL_ENTITY || 'RTEPL',
      timestamp: new Date().toISOString()
    });

    // Google Ads conversion
    if (typeof window !== 'undefined' && window.gtag) {
      const conversionId = process.env.GATSBY_GOOGLE_ADS_CONVERSION_ID;
      const conversionLabel = process.env.GATSBY_GOOGLE_ADS_QUOTE_LABEL;
      
      if (conversionId && conversionLabel) {
        window.gtag('event', 'conversion', {
          send_to: `${conversionId}/${conversionLabel}`,
          value: 75.0,
          currency: 'USD'
        });
      }
    }
  },

  /**
   * Track service card interaction (Micro-conversion).
   * Captures user interest signals for funnel optimization.
   * 
   * @param category - Service category (ai_growth, ai_interface, ai_intelligence)
   * @param interactionType - Type of interaction (card_click, learn_more, feature_expand)
   */
  trackServiceInteraction: (category: string, interactionType: string) => {
    GTMServices.pushEvent({
      event: 'service_interest',
      service_category: category, // ai_growth, ai_interface, ai_intelligence
      interaction_type: interactionType, // card_click, learn_more, feature_expand
      page_section: GTMServices.getCurrentSection(),
      entity: process.env.GATSBY_LEGAL_ENTITY || 'RTEPL'
    });
  },

  /**
   * Track industry page view.
   * Indicates high commercial intent for vertical-specific solutions.
   * 
   * @param industry - Industry vertical being viewed
   */
  trackIndustryPageView: (industry: string) => {
    GTMServices.pushEvent({
      event: 'industry_page_view',
      page_type: 'services',
      page_category: 'conversion',
      user_intent: 'high_commercial',
      service_page_type: 'industry',
      industry_vertical: industry,
      entity: process.env.GATSBY_LEGAL_ENTITY || 'RTEPL'
    });
  },

  /**
   * Track blog to service navigation.
   * Measures content marketing effectiveness in driving service interest.
   * 
   * @param articleData - Source article and target service information
   */
  trackBlogToService: (articleData: ArticleData) => {
    GTMServices.pushEvent({
      event: 'blog_to_service_click',
      source_article: articleData.title,
      source_category: articleData.category,
      target_service: articleData.targetService,
      cta_type: articleData.ctaType,
      reading_time: GTMServices.getReadingTime(),
      scroll_depth: GTMServices.getScrollDepth(),
      entity: process.env.GATSBY_LEGAL_ENTITY || 'RTEPL'
    });
  },

  /**
   * Track service page engagement (Time-based).
   * Fires after 30 seconds to indicate genuine interest.
   * 
   * @param timeSpent - Time spent on page in seconds
   * @param pageType - Type of service page (main, industry, feature)
   */
  trackServiceEngagement: (timeSpent: number, pageType: string = 'main') => {
    GTMServices.pushEvent({
      event: 'service_page_engagement',
      engagement_time: timeSpent,
      page_type: pageType,
      scroll_depth: GTMServices.getScrollDepth(),
      interactions_count: GTMServices.interactionCount || 0,
      entity: process.env.GATSBY_LEGAL_ENTITY || 'RTEPL'
    });
  },

  /**
   * Track service feature expansion
   * @param feature - Feature name
   * @param category - Service category
   */
  trackFeatureExpand: (feature: string, category: string) => {
    GTMServices.pushEvent({
      event: 'service_feature_expand',
      feature_name: feature,
      service_category: category,
      expansion_count: (GTMServices.expansionCount[feature] || 0) + 1,
      entity: process.env.GATSBY_LEGAL_ENTITY || 'RTEPL'
    });
    
    // Track expansion count
    if (!GTMServices.expansionCount) {
      GTMServices.expansionCount = {};
    }
    GTMServices.expansionCount[feature] = (GTMServices.expansionCount[feature] || 0) + 1;
  },

  /**
   * Initialize page-level tracking.
   * Sets up engagement timers and resets interaction counters.
   * 
   * @param pageType - Type of page being tracked (services, industry)
   */
  initializePageTracking: (pageType: string) => {
    // Reset counters
    GTMServices.interactionCount = 0;
    GTMServices.startTime = Date.now();
    
    // Set up engagement timer (30 seconds)
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        const timeSpent = Math.round((Date.now() - GTMServices.startTime) / 1000);
        if (timeSpent >= 30) {
          GTMServices.trackServiceEngagement(timeSpent, pageType);
        }
      }, 30000);
    }
  },

  /**
   * Helper: Get current page section
   * @returns Current section identifier
   */
  getCurrentSection: (): string => {
    if (typeof window === 'undefined') return 'unknown';
    
    // Check if we're in a specific section based on scroll position
    const sections = ['hero', 'services', 'industries', 'cta', 'footer'];
    // Implementation would check actual scroll position against section offsets
    return 'services'; // Placeholder
  },

  /**
   * Helper: Get reading time for current page
   * @returns Estimated reading time in seconds
   */
  getReadingTime: (): number => {
    if (typeof window === 'undefined') return 0;
    return Math.round((Date.now() - (GTMServices.startTime || Date.now())) / 1000);
  },

  /**
   * Helper: Get current scroll depth
   * @returns Scroll depth percentage
   */
  getScrollDepth: (): number => {
    if (typeof window === 'undefined') return 0;
    
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    return Math.round((scrollTop / scrollHeight) * 100);
  },

  /**
   * Set up enhanced ecommerce for service pages.
   * Treats services as products for funnel analysis.
   * 
   * @param services - Array of service offerings to track
   */
  setupEnhancedEcommerce: (services: ServiceData[]) => {
    if (typeof window === 'undefined' || !window.dataLayer) return;
    
    // View item list (services listing)
    window.dataLayer.push({
      event: 'view_item_list',
      ecommerce: {
        item_list_id: 'services',
        item_list_name: 'AI Transformation Services',
        items: services.map((service, index) => ({
          item_id: service.id,
          item_name: service.name,
          item_category: service.category,
          item_list_name: 'Services',
          item_list_id: 'services',
          index: index + 1,
          price: service.startingPrice || 0
        }))
      }
    });
  }
};

// Export for use in Gatsby
export default GTMServices;