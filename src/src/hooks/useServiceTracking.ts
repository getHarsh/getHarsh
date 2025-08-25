/**
 * @fileoverview Service-Specific GTM Tracking Extension
 * @module hooks/useServiceTracking
 * 
 * @description
 * Extends the base useGTM hook with service-specific tracking capabilities.
 * This hook wraps around useGTM to maintain architectural consistency while
 * providing specialized methods for service interactions, conversions, and
 * enhanced ecommerce tracking.
 * 
 * @architecture
 * - Wraps useGTM for all base tracking functionality
 * - Adds service-specific conversion tracking
 * - Implements enhanced ecommerce for service listings
 * - Provides form interaction tracking utilities
 * - Maintains consistency with ecosystem tracking patterns
 * 
 * @ecosystem-integration
 * - Base tracking: Extends useGTM hook for core functionality
 * - Service system: Tracks all service interactions and conversions
 * - Form system: Monitors form field interactions and abandonment
 * - Blog integration: Tracks blog-to-service conversion paths
 * - Analytics: Sends data to GTM → GA4 for conversion optimization
 * 
 * @dos
 * - Track all service interactions (view, expand, click)
 * - Monitor form field interactions for optimization
 * - Use debouncing for rapid interaction events
 * - Track conversion paths from blog to services
 * - Include service context in all events
 * 
 * @donts
 * - Don't track PII in form submissions
 * - Don't skip form abandonment tracking
 * - Don't duplicate events already tracked by useGTM
 * - Don't track without checking consent
 * - Don't forget to clean up timeouts
 * 
 * @usage
 * ```tsx
 * const { trackConsultation, trackQuoteForm } = useServiceTracking({
 *   pageType: 'industry',
 *   industry: 'fintech'
 * })
 * ```
 * 
 * @see {@link file://./SERVICES.md} - Services system documentation
 * @see {@link file://./BUILD.md#gtm-configuration} - GTM setup and configuration
 * @see {@link file://./config/schema/services.proto} - ServicesConfig proto definition
 * @see {@link file://./src/hooks/useGTM.ts} - Base GTM tracking hook
 * @see {@link file://./src/utils/gtm-services.ts} - Service tracking utilities
 * @see {@link file://./src/utils/mappings.ts} - GTM event mappings
 * @see {@link file://./src/components/services/ServiceCard.tsx} - Service card component
 * 
 * @since 2.0.0
 */

import { useEffect, useCallback, useRef } from 'react';
import { useGTM } from './useGTM';

/**
 * Service tracking options interface
 */
interface ServiceTrackingOptions {
  pageType?: 'main' | 'industry';
  industry?: string;
  serviceCategory?: string;
}

/**
 * Form data interface for quote tracking
 */
interface QuoteFormData {
  service: string;
  budget: string;
  timeline?: string;
  companySize?: string;
  message?: string;
}

/**
 * Article data interface for blog CTA tracking
 */
interface ArticleData {
  title: string;
  category: string;
  targetService: string;
  ctaType: 'inline' | 'sidebar' | 'footer';
}

/**
 * Service data interface for enhanced ecommerce
 */
interface ServiceData {
  id: string;
  name: string;
  category: string;
  startingPrice?: number;
}

/**
 * Service tracking return interface
 */
interface UseServiceTrackingReturn {
  trackConsultation: (location?: string) => void;
  trackQuoteForm: (formData: QuoteFormData) => void;
  trackInteraction: (category: string, type: string) => void;
  trackFeature: (feature: string, category: string) => void;
  trackBlogCTA: (articleData: ArticleData) => void;
  setupServiceListing: (services: ServiceData[]) => void;
}

/**
 * Form tracking return interface
 */
interface UseServiceFormTrackingReturn {
  trackFormStart: () => void;
  trackFieldInteraction: (fieldName: string) => void;
  trackFormSubmit: (formData: any) => void;
  trackFormAbandon: () => void;
}

/**
 * Custom hook for service tracking
 * Wraps useGTM and extends it with service-specific functionality
 * 
 * @param options - Tracking options
 * @returns Tracking methods
 */
export const useServiceTracking = (options: ServiceTrackingOptions = {}): UseServiceTrackingReturn => {
  const { pageType = 'main', industry, serviceCategory } = options;
  const hasInitialized = useRef(false);
  const interactionTimeouts = useRef<Record<string, NodeJS.Timeout>>({});
  const expansionCounts = useRef<Record<string, number>>({});
  
  // Use base GTM hook for core functionality
  const { 
    trackEvent, 
    trackConversion, 
    trackPageView,
    isEnabled 
  } = useGTM();

  // Initialize page tracking using base hook
  useEffect(() => {
    if (!hasInitialized.current && isEnabled) {
      // Track service page view with enhanced data
      trackPageView({
        page_title: `Services - ${pageType === 'industry' ? industry : 'Main'}`,
        page_path: window.location.pathname,
        page_type: 'services',
        service_page_type: pageType,
        service_industry: industry
      });
      
      hasInitialized.current = true;
    }
  }, [pageType, industry, trackPageView, isEnabled]);

  // Track consultation click using base conversion tracking
  const trackConsultation = useCallback((location: string = 'hero') => {
    if (!isEnabled) return;
    
    // Use base conversion tracking with service context
    trackConversion('consultation_booking', undefined, 'INR');
    
    // Add service-specific context
    trackEvent('service_consultation_click', {
      service_category: serviceCategory || 'general',
      service_page_type: pageType,
      cta_location: location,
      service_industry: industry,
      interaction_type: 'primary_cta'
    });
  }, [pageType, serviceCategory, industry, trackConversion, trackEvent, isEnabled]);

  // Track quote form submission
  const trackQuoteForm = useCallback((formData: QuoteFormData) => {
    if (!isEnabled) return;
    
    // Validate required fields
    if (!formData.service || !formData.budget) {
      console.warn('[Service Tracking] Missing required form fields');
      return;
    }
    
    // Track as conversion
    trackConversion('quote_submission', undefined, 'INR');
    
    // Track detailed form data
    trackEvent('service_quote_submit', {
      service_requested: formData.service,
      budget_range: formData.budget,
      timeline: formData.timeline || 'not_specified',
      company_size: formData.companySize || 'not_specified',
      has_message: Boolean(formData.message),
      form_type: 'quote',
      service_category: serviceCategory
    });
  }, [trackConversion, trackEvent, serviceCategory, isEnabled]);

  // Track service interaction with debouncing
  const trackInteraction = useCallback((category: string, type: string) => {
    if (!isEnabled) return;
    
    // Debounce rapid clicks
    const key = `${category}-${type}`;
    if (interactionTimeouts.current[key]) {
      clearTimeout(interactionTimeouts.current[key]);
    }
    
    interactionTimeouts.current[key] = setTimeout(() => {
      // Use base event tracking
      trackEvent('service_interaction', {
        service_category: category,
        interaction_type: type,
        service_page_type: pageType,
        service_industry: industry
      });
      delete interactionTimeouts.current[key];
    }, 300);
  }, [trackEvent, pageType, industry, isEnabled]);

  // Track feature expansion
  const trackFeature = useCallback((feature: string, category: string) => {
    if (!isEnabled) return;
    
    // Increment expansion count
    expansionCounts.current[feature] = (expansionCounts.current[feature] || 0) + 1;
    
    trackEvent('service_feature_expand', {
      feature_name: feature,
      service_category: category,
      service_page_type: pageType,
      expansion_count: expansionCounts.current[feature]
    });
  }, [trackEvent, pageType, isEnabled]);

  // Track blog CTA click
  const trackBlogCTA = useCallback((articleData: ArticleData) => {
    if (!isEnabled) return;
    
    trackEvent('blog_to_service_cta', {
      article_title: articleData.title,
      article_category: articleData.category,
      target_service: articleData.targetService,
      cta_type: articleData.ctaType,
      cta_position: articleData.ctaType,
      conversion_path: 'blog_to_service'
    });
  }, [trackEvent, isEnabled]);

  // Setup enhanced ecommerce for service listings
  const setupServiceListing = useCallback((services: ServiceData[]) => {
    if (!isEnabled || !services.length) return;
    
    // Track service impressions
    trackEvent('view_item_list', {
      item_list_id: 'services',
      item_list_name: `Services - ${pageType}`,
      items: services.map((service, index) => ({
        item_id: service.id,
        item_name: service.name,
        item_category: service.category,
        item_list_position: index + 1,
        price: service.startingPrice || 0,
        currency: 'INR'
      }))
    });
  }, [trackEvent, pageType, isEnabled]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      // Clear any pending timeouts
      Object.values(interactionTimeouts.current).forEach(timeout => {
        clearTimeout(timeout);
      });
    };
  }, []);

  return {
    trackConsultation,
    trackQuoteForm,
    trackInteraction,
    trackFeature,
    trackBlogCTA,
    setupServiceListing
  };
};

/**
 * Hook for tracking service form interactions
 * Extends useGTM for form-specific tracking
 * 
 * @param formType - Type of form (quote, contact)
 * @returns Form tracking methods
 */
export const useServiceFormTracking = (formType: 'quote' | 'contact' = 'quote'): UseServiceFormTrackingReturn => {
  const fieldInteractions = useRef<Record<string, boolean>>({});
  const formStartTime = useRef<number | null>(null);
  
  // Use base GTM hook
  const { trackEvent, trackFormSubmit: baseTrackFormSubmit, isEnabled } = useGTM();

  // Track form start
  const trackFormStart = useCallback(() => {
    if (!isEnabled) return;
    
    formStartTime.current = Date.now();
    
    trackEvent('form_start', {
      form_type: formType,
      form_location: 'services',
      form_id: `service_${formType}_form`
    });
  }, [formType, trackEvent, isEnabled]);

  // Track field interaction
  const trackFieldInteraction = useCallback((fieldName: string) => {
    if (!isEnabled || fieldInteractions.current[fieldName]) return;
    
    fieldInteractions.current[fieldName] = true;
    
    trackEvent('form_field_interaction', {
      form_type: formType,
      field_name: fieldName,
      fields_interacted: Object.keys(fieldInteractions.current).length,
      form_id: `service_${formType}_form`
    });
  }, [formType, trackEvent, isEnabled]);

  // Track form abandonment
  const trackFormAbandon = useCallback(() => {
    if (!isEnabled) return;
    
    const timeSpent = formStartTime.current 
      ? Math.round((Date.now() - formStartTime.current) / 1000)
      : 0;
    
    trackEvent('form_abandon', {
      form_type: formType,
      time_spent: timeSpent,
      fields_completed: Object.keys(fieldInteractions.current).length,
      form_id: `service_${formType}_form`,
      abandonment_reason: 'user_left'
    });
  }, [formType, trackEvent, isEnabled]);

  // Track form submission
  const trackFormSubmit = useCallback((formData: any) => {
    if (!isEnabled) return;
    
    const timeSpent = formStartTime.current 
      ? Math.round((Date.now() - formStartTime.current) / 1000)
      : 0;
    
    // Use base form submit tracking
    baseTrackFormSubmit(`service_${formType}_form`, formType);
    
    // Track detailed completion metrics
    trackEvent('form_complete', {
      form_type: formType,
      time_to_complete: timeSpent,
      fields_completed: Object.keys(fieldInteractions.current).length,
      form_id: `service_${formType}_form`
    });
    
    // Track service-specific data for quote forms
    if (formType === 'quote' && formData.service) {
      trackEvent('service_quote_details', {
        service_requested: formData.service,
        budget_range: formData.budget,
        has_timeline: Boolean(formData.timeline),
        has_company_size: Boolean(formData.companySize)
      });
    }
  }, [formType, baseTrackFormSubmit, trackEvent, isEnabled]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      // Check if form was abandoned
      if (formStartTime.current && Object.keys(fieldInteractions.current).length > 0) {
        trackFormAbandon();
      }
    };
  }, [trackFormAbandon]);

  return {
    trackFormStart,
    trackFieldInteraction,
    trackFormSubmit,
    trackFormAbandon
  };
};

export default useServiceTracking;

/**
 * Re-export types for convenience
 */
export type {
  ServiceTrackingOptions,
  QuoteFormData,
  ArticleData,
  ServiceData,
  UseServiceTrackingReturn,
  UseServiceFormTrackingReturn
};