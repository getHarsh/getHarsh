/**
 * @fileoverview GTM Event Tracking Hook for Custom Analytics Events
 * @module hooks/useGTM
 * 
 * @description
 * Provides custom event tracking capabilities for Google Tag Manager.
 * Works alongside gatsby-plugin-google-tagmanager which handles script injection
 * and initialization. This hook provides component-level tracking functions
 * for custom events, conversions, and service interactions.
 * 
 * @design-philosophy
 * We use the Gatsby GTM plugin for initialization because:
 * - It's actively maintained and follows Gatsby best practices
 * - Handles script injection timing correctly
 * - Manages consent mode integration automatically
 * - Provides route change tracking out of the box
 * 
 * This hook complements the plugin by providing:
 * - Type-safe event tracking functions
 * - Consent-aware tracking (checks before sending)
 * - Service-specific event patterns
 * - Conversion tracking utilities
 * 
 * @why-hook-not-provider
 * - GTM plugin already handles global initialization
 * - Hooks allow selective usage where needed
 * - No unnecessary React context overhead
 * - Better tree-shaking and performance
 * - Follows modern React patterns (hooks > HOCs/providers)
 * 
 * @ecosystem-integration
 * - Used by: Service cards, contact forms, CTAs, navigation
 * - Data flow: Component → Hook → dataLayer → GTM → Analytics
 * - Consent: Checks window.__consent_granted before tracking
 * - Environment: Reads GATSBY_GTM_CONTAINER_ID for availability
 * 
 * @consent-awareness
 * All tracking functions check consent status before sending events.
 * Consent is managed by ConsentBanner component and stored in cookies.
 * Events are dropped silently if consent is not granted.
 * 
 * @event-patterns
 * Standard events follow Google's recommended naming:
 * - page_view (handled by plugin)
 * - click (with element details)
 * - scroll (with depth percentage)
 * - form_submit (with form ID)
 * - video_play, video_complete
 * 
 * Custom events for ecosystem:
 * - service_interaction (service cards)
 * - project_view (project pages)
 * - blog_read (article engagement)
 * - contact_intent (contact form interactions)
 * 
 * @configuration
 * - GTM Container ID: Set via GATSBY_GTM_CONTAINER_ID
 * - Consent mode: Configured in gatsby-config.ts
 * - Debug mode: Enable with localStorage.setItem('gtm_debug', 'true')
 * 
 * @best-practices
 * - DO: Always include descriptive event parameters
 * - DO: Use standard event names when possible
 * - DO: Test events with GTM Preview mode
 * - DON'T: Send PII in event parameters
 * - DON'T: Track without checking consent
 * - DON'T: Create duplicate events
 * 
 * @example
 * ```tsx
 * import { useGTM } from '@/hooks/useGTM'
 * 
 * const ServiceCard = ({ service }) => {
 *   const { trackServiceInteraction, isEnabled } = useGTM()
 *   
 *   const handleClick = () => {
 *     trackServiceInteraction(service.name, 'card_click', {
 *       service_category: service.category,
 *       service_id: service.id
 *     })
 *   }
 *   
 *   return (
 *     <button onClick={handleClick}>
 *       {service.name}
 *     </button>
 *   )
 * }
 * ```
 * 
 * @testing
 * Test with GTM Preview mode:
 * 1. Install GTM Chrome extension
 * 2. Connect to your container
 * 3. Navigate site and verify events
 * 4. Check event parameters in debug view
 * 
 * @see {@link file://./BUILD.md} - Build pipeline and GTM configuration
 * @see {@link file://./SERVICES.md#gtm-analytics-flow} - Service analytics flow
 * @see {@link file://./config/CONSENT-ARCHITECTURE.md} - Consent management system
 * @see {@link file://./gatsby-config.ts} - GTM plugin configuration
 * @see {@link file://./src/components/consent/ConsentBanner.tsx} - Consent UI
 * @see {@link file://./src/utils/gtm-services.ts} - Service-specific GTM utilities
 * @see {@link file://./src/utils/mappings.ts} - GTM event mappings
 * @see {@link https://developers.google.com/tag-platform/gtagjs/reference/events} - Standard events
 * 
 * @since 2.0.0
 */

import { useCallback, useEffect, useState } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { getGtmEventName, getGtmConversion, getGtmEntityParams } from '@/utils/mappings'
import { debugGTM } from '@/utils/debug'

/**
 * E-commerce item for GTM events
 */
interface GTMItem {
  item_id?: string
  item_name?: string
  affiliation?: string
  coupon?: string
  discount?: number
  index?: number
  item_brand?: string
  item_category?: string
  item_category2?: string
  item_category3?: string
  item_category4?: string
  item_category5?: string
  item_list_id?: string
  item_list_name?: string
  item_variant?: string
  location_id?: string
  price?: number
  quantity?: number
}

/// <reference path="../types/window.d.ts" />

/**
 * Extend Window interface for consent tracking
 */
declare global {
  interface Window {
    __consent_granted?: boolean
  }
}

/**
 * GTM event parameters interface
 * Standard parameters that can be included with any event
 */
interface GTMEventParams {
  [key: string]: string | number | boolean | undefined | null | GTMItem[] | GTMEventParams
  value?: number
  currency?: string
  transaction_id?: string
  items?: GTMItem[]
}

/**
 * Service interaction event parameters
 */
interface ServiceEventParams extends GTMEventParams {
  service_name: string
  service_category?: string
  service_id?: string
  interaction_type: string
}

/**
 * Page view event parameters
 */
interface PageViewParams extends GTMEventParams {
  page_title?: string
  page_location?: string
  page_path?: string
  page_referrer?: string
}

/**
 * Conversion event parameters
 */
interface ConversionParams extends GTMEventParams {
  conversion_type: string
  conversion_value?: number
  conversion_currency?: string
}

/**
 * GTM Hook return type
 */
interface UseGTMReturn {
  /** Track custom events */
  trackEvent: (eventNameOrData: string | GTMEventParams, parameters?: GTMEventParams) => void
  /** Track service-specific interactions */
  trackServiceInteraction: (serviceName: string, action: string, additionalParams?: Partial<ServiceEventParams>) => void
  /** Track conversion events */
  trackConversion: (conversionType: string, value?: number, currency?: string) => void
  /** Track enhanced page views with custom data */
  trackPageView: (params?: PageViewParams) => void
  /** Track scroll depth */
  trackScroll: (percentage: number) => void
  /** Track form submissions */
  trackFormSubmit: (formId: string, formName?: string) => void
  /** Track CTA clicks */
  trackCTA: (ctaText: string, ctaLocation: string, ctaDestination?: string) => void
  /** Check if GTM is enabled and consent granted */
  isEnabled: boolean
  /** Debug mode flag */
  isDebugMode: boolean
}

/**
 * Custom hook for GTM event tracking
 * 
 * @returns {UseGTMReturn} Tracking functions and status
 */
export const useGTM = (): UseGTMReturn => {
  const [consentGranted, setConsentGranted] = useState<boolean>(false)
  const [isDebugMode, setIsDebugMode] = useState<boolean>(false)

  // Query site metadata for domain and entity context
  const data = useStaticQuery(graphql`
    query GTMHookQuery {
      site {
        siteMetadata {
          domain
          entity
          analytics {
            gtm_container_id
          }
        }
      }
    }
  `)

  const siteMetadata = data?.site?.siteMetadata || {}
  const gtmContainerId = siteMetadata?.analytics?.gtm_container_id || process.env.GATSBY_GTM_CONTAINER_ID

  // Check for consent and debug mode on mount and when consent changes
  useEffect(() => {
    // Check consent status
    const checkConsent = () => {
      // Check for consent cookie
      const consentCookie = document.cookie
        .split('; ')
        .find(row => row.startsWith('analytics_consent='))
      
      if (consentCookie) {
        try {
          const consentValue = consentCookie.split('=')[1]
          const consent = JSON.parse(decodeURIComponent(consentValue))
          setConsentGranted(consent.analytics === 'granted')
        } catch (e) {
          console.error('Error parsing consent cookie:', e)
          setConsentGranted(false)
        }
      } else {
        // Check window flag set by ConsentBanner
        setConsentGranted(window.__consent_granted === true)
      }
    }

    // Check debug mode
    const debugMode = localStorage.getItem('gtm_debug') === 'true'
    setIsDebugMode(debugMode)

    checkConsent()
    
    // Listen for consent changes
    const handleConsentUpdate = () => checkConsent()
    window.addEventListener('consentUpdate', handleConsentUpdate)
    
    return () => {
      window.removeEventListener('consentUpdate', handleConsentUpdate)
    }
  }, [])

  const isEnabled = Boolean(gtmContainerId && consentGranted)

  /**
   * Push event to GTM dataLayer
   * Internal function that checks consent before sending
   */
  const pushToDataLayer = useCallback((data: Record<string, unknown>) => {
    if (!isEnabled) {
      if (isDebugMode) {
        debugGTM('Event blocked (consent not granted or GTM not configured):', data)
      }
      return
    }

    // Ensure dataLayer exists
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push(data)
      
      if (isDebugMode) {
        debugGTM('Event sent:', data)
      }
    }
  }, [isEnabled, isDebugMode])

  /**
   * Track custom events
   * Uses GTM mappings for consistent event naming
   * 
   * @param eventName - Name of the event
   * @param parameters - Optional event parameters
   */
  const trackEvent = useCallback((eventNameOrData: string | GTMEventParams, parameters?: GTMEventParams) => {
    // Get entity-specific parameters from mappings
    const entityParams = getGtmEntityParams(siteMetadata.entity || 'unknown')
    
    // Handle both string eventName and object formats
    if (typeof eventNameOrData === 'string') {
      pushToDataLayer({
        event: eventNameOrData,
        ...parameters,
        // Add context with entity-aware params
        domain: siteMetadata.domain,
        ...entityParams,
        timestamp: new Date().toISOString()
      })
    } else {
      // Object format with event property
      pushToDataLayer({
        ...eventNameOrData,
        // Add context with entity-aware params
        domain: siteMetadata.domain,
        ...entityParams,
        timestamp: new Date().toISOString()
      })
    }
  }, [pushToDataLayer, siteMetadata])

  /**
   * Track service interactions
   * Uses GTM mappings for event naming and entity params
   * 
   * @param serviceName - Name of the service
   * @param action - Action performed (view, click, submit, etc.)
   * @param additionalParams - Additional parameters
   */
  const trackServiceInteraction = useCallback((
    serviceName: string,
    action: string,
    additionalParams?: Partial<ServiceEventParams>
  ) => {
    // Get event configuration from mappings
    const eventConfig = getGtmEventName('service_interaction', action)
    const entityParams = getGtmEntityParams(siteMetadata.entity || 'unknown')
    
    pushToDataLayer({
      event: eventConfig.event,
      category: eventConfig.category || 'engagement',
      service_name: serviceName,
      interaction_type: action,
      ...additionalParams,
      domain: siteMetadata.domain,
      ...entityParams,
      timestamp: new Date().toISOString()
    })
  }, [pushToDataLayer, siteMetadata])

  /**
   * Track conversion events
   * Uses GTM mappings for conversion configuration
   * 
   * @param conversionType - Type of conversion
   * @param value - Monetary value
   * @param currency - Currency code (default: INR)
   */
  const trackConversion = useCallback((
    conversionType: string,
    value?: number,
    currency: string = 'INR'
  ) => {
    // Get conversion configuration from mappings
    const conversionConfig = getGtmConversion(conversionType)
    const entityParams = getGtmEntityParams(siteMetadata.entity || 'unknown')
    
    pushToDataLayer({
      event: conversionConfig.event,
      conversion_type: conversionType,
      value: value,
      currency: conversionConfig.value_currency || currency,
      domain: siteMetadata.domain,
      ...entityParams,
      timestamp: new Date().toISOString()
    })
  }, [pushToDataLayer, siteMetadata])

  /**
   * Track enhanced page views
   * 
   * @param params - Page view parameters
   */
  const trackPageView = useCallback((params?: PageViewParams) => {
    pushToDataLayer({
      event: 'page_view_enhanced',
      page_title: params?.page_title || document.title,
      page_location: params?.page_location || window.location.href,
      page_path: params?.page_path || window.location.pathname,
      page_referrer: params?.page_referrer || document.referrer,
      ...params,
      domain: siteMetadata.domain,
      entity: siteMetadata.entity,
      timestamp: new Date().toISOString()
    })
  }, [pushToDataLayer, siteMetadata])

  /**
   * Track scroll depth
   * 
   * @param percentage - Scroll depth percentage (25, 50, 75, 100)
   */
  const trackScroll = useCallback((percentage: number) => {
    pushToDataLayer({
      event: 'scroll',
      percent_scrolled: percentage,
      page_path: window.location.pathname,
      domain: siteMetadata.domain,
      timestamp: new Date().toISOString()
    })
  }, [pushToDataLayer, siteMetadata])

  /**
   * Track form submissions
   * 
   * @param formId - Form identifier
   * @param formName - Optional form name
   */
  const trackFormSubmit = useCallback((formId: string, formName?: string) => {
    pushToDataLayer({
      event: 'form_submit',
      form_id: formId,
      form_name: formName || formId,
      page_path: window.location.pathname,
      domain: siteMetadata.domain,
      timestamp: new Date().toISOString()
    })
  }, [pushToDataLayer, siteMetadata])

  /**
   * Track CTA clicks
   * Uses GTM mappings for consistent event tracking
   * 
   * @param ctaText - Text of the CTA
   * @param ctaLocation - Where the CTA is located
   * @param ctaDestination - Optional destination URL
   */
  const trackCTA = useCallback((
    ctaText: string,
    ctaLocation: string,
    ctaDestination?: string
  ) => {
    // Get event configuration from mappings
    const eventConfig = getGtmEventName('cta', 'click')
    const entityParams = getGtmEntityParams(siteMetadata.entity || 'unknown')
    
    pushToDataLayer({
      event: eventConfig.event || 'cta_click',
      category: eventConfig.category || 'engagement',
      cta_text: ctaText,
      cta_location: ctaLocation,
      cta_destination: ctaDestination,
      page_path: window.location.pathname,
      domain: siteMetadata.domain,
      ...entityParams,
      timestamp: new Date().toISOString()
    })
  }, [pushToDataLayer, siteMetadata])

  return {
    trackEvent,
    trackServiceInteraction,
    trackConversion,
    trackPageView,
    trackScroll,
    trackFormSubmit,
    trackCTA,
    isEnabled,
    isDebugMode
  }
}

/**
 * Import Window interface extensions from centralized types
 * This includes GTM dataLayer and other global objects
 */
import type {} from '@/types/window'

