/**
 * @fileoverview Event Handler Type Definitions for the getHarsh Ecosystem
 * @module types/events
 * 
 * @description
 * Comprehensive type definitions for all event handlers and event data structures
 * used throughout the getHarsh ecosystem. These types ensure type-safe event handling for:
 * - React synthetic events (click, keyboard, form, etc.)
 * - Google Tag Manager analytics events
 * - Search and federation events
 * - Navigation and routing events
 * - Consent management events
 * - Social sharing interactions
 * - Service and article interactions
 * - Theme toggling events
 * 
 * All event types follow consistent patterns and integrate with the ecosystem's
 * analytics and tracking infrastructure.
 * 
 * @ecosystem-integration
 * - GTM Events: Tracked via gtm.ts and gtm-services.ts utilities
 * - Search Events: Powers search analytics in useSearchTracking hook
 * - Consent Events: Manages GDPR/CCPA compliance state
 * - Service Events: Tracks conversion funnel interactions
 * - Article Events: Monitors content engagement metrics
 * 
 * @dos
 * - Use typed event handlers for all interactions
 * - Include proper event data for analytics
 * - Follow consistent event naming conventions
 * - Track all user-initiated actions
 * 
 * @donts
 * - Don't use untyped event handlers
 * - Don't skip analytics tracking
 * - Don't create duplicate event types
 * - Don't track sensitive user data
 * 
 * @see {@link file://./src/utils/gtm.ts} - GTM utilities
 * @see {@link file://./src/utils/gtm-services.ts} - Service-specific tracking
 * @see {@link file://./src/hooks/useServiceTracking.ts} - Service tracking hook
 * @see {@link file://./src/hooks/search/useSearchTracking.ts} - Search tracking
 * @see {@link file://./SERVICES.md#gtm-analytics-flow} - Analytics documentation
 */

import { MouseEvent, KeyboardEvent, ChangeEvent, FormEvent, FocusEvent } from 'react';

// ============================================================================
// REACT EVENT HANDLERS
// ============================================================================
/**
 * Click event handler for interactive elements.
 * @template T - The HTML element type (defaults to HTMLElement)
 */
export type ClickHandler<T = HTMLElement> = (event: MouseEvent<T>) => void;

/**
 * Keyboard event handler for accessibility and shortcuts.
 * @template T - The HTML element type (defaults to HTMLElement)
 */
export type KeyHandler<T = HTMLElement> = (event: KeyboardEvent<T>) => void;

/**
 * Change event handler for form inputs and controls.
 * @template T - The HTML element type (defaults to HTMLElement)
 */
export type ChangeHandler<T = HTMLElement> = (event: ChangeEvent<T>) => void;

/**
 * Form submission handler for data collection.
 */
export type SubmitHandler = (event: FormEvent<HTMLFormElement>) => void;

/**
 * Focus event handler for accessibility and UX.
 * @template T - The HTML element type (defaults to HTMLElement)
 */
export type FocusHandler<T = HTMLElement> = (event: FocusEvent<T>) => void;

/**
 * Generic event handler for custom event types.
 * @template T - The event type (defaults to Event)
 */
export type EventHandler<T = Event> = (event: T) => void;

// ============================================================================
// ANALYTICS EVENT TYPES
// ============================================================================

/**
 * Google Tag Manager event data structure.
 * Used for tracking user interactions and conversions.
 * 
 * @see {@link file://./src/utils/gtm.ts} - GTM push implementation
 * @see {@link file://./SERVICES.md#conversion-events} - Event tracking guide
 */
export interface GTMEventData {
  event: string;
  category?: string;
  action?: string;
  label?: string;
  value?: number;
  [key: string]: any;
}

/** Handler for GTM analytics events */
export type GTMEventHandler = (data: GTMEventData) => void;

// ============================================================================
// SEARCH EVENT TYPES
// ============================================================================

/**
 * Search interaction event data.
 * Tracks search queries and result interactions.
 * 
 * @see {@link file://./SEARCH.md#search-event-tracking} - Search analytics
 */
export interface SearchEventData {
  query: string;
  results: number;
  filters?: Record<string, any>;
  source?: string;
}

/** Handler for search-related events */
export type SearchEventHandler = (data: SearchEventData) => void;

// ============================================================================
// NAVIGATION EVENT TYPES
// ============================================================================

/**
 * Navigation event data for routing analytics.
 * Tracks how users move through the ecosystem.
 */
export interface NavigationEventData {
  from: string;
  to: string;
  method: 'click' | 'keyboard' | 'programmatic';
}

/** Handler for navigation events */
export type NavigationEventHandler = (data: NavigationEventData) => void;

// ============================================================================
// CONSENT EVENT TYPES
// ============================================================================

/**
 * Consent preference event data.
 * Manages GDPR/CCPA compliance state changes.
 * 
 * @see {@link file://./config/CONSENT-ARCHITECTURE.md} - Consent system
 * @see {@link file://./src/components/consent/ConsentBanner.tsx} - Consent UI
 */
export interface ConsentEventData {
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
  necessary: boolean;
  timestamp?: number;
}

/** Handler for consent preference changes */
export type ConsentEventHandler = (data: ConsentEventData) => void;

// ============================================================================
// SOCIAL EVENT TYPES
// ============================================================================

/**
 * Social sharing event data.
 * Tracks content sharing across platforms.
 * 
 * @see {@link file://./src/components/social/SocialShare.tsx} - Share component
 */
export interface SocialShareEventData {
  platform: 'twitter' | 'facebook' | 'linkedin' | 'email';
  url: string;
  title?: string;
  tags?: string[];
}

/** Handler for social sharing events */
export type SocialShareEventHandler = (data: SocialShareEventData) => void;

// ============================================================================
// SERVICE EVENT TYPES
// ============================================================================

/**
 * Service interaction event data.
 * Tracks conversion funnel for AI transformation services.
 * 
 * @see {@link file://./SERVICES.md#gtm-analytics-flow} - Service analytics
 * @see {@link file://./src/hooks/useServiceTracking.ts} - Tracking hook
 */
export interface ServiceEventData {
  serviceId: string;
  action: 'view' | 'click' | 'inquire' | 'purchase';
  category?: string;
  value?: number;
}

/** Handler for service interaction events */
export type ServiceEventHandler = (data: ServiceEventData) => void;

// ============================================================================
// CONTENT EVENT TYPES
// ============================================================================

/**
 * Article interaction event data.
 * Tracks content engagement and reading behavior.
 */
export interface ArticleEventData {
  articleId: string;
  action: 'view' | 'read' | 'share' | 'comment';
  readingTime?: number;
  scrollDepth?: number;
}

/** Handler for article interaction events */
export type ArticleEventHandler = (data: ArticleEventData) => void;

// ============================================================================
// THEME EVENT TYPES
// ============================================================================

/**
 * Theme toggle event data.
 * Tracks user theme preferences and changes.
 * 
 * @see {@link file://./src/hooks/useTheme.ts} - Theme management hook
 */
export interface ThemeEventData {
  from: 'light' | 'dark';
  to: 'light' | 'dark';
  method: 'toggle' | 'system' | 'manual';
}

/** Handler for theme change events */
export type ThemeEventHandler = (data: ThemeEventData) => void;

// ============================================================================
// COMPONENT EVENT MAP
// ============================================================================

/**
 * Unified event map for component event handlers.
 * Provides type-safe event handler access by event name.
 * 
 * @example
 * ```tsx
 * const handleEvent: ComponentEventMap['click'] = (event) => {
 *   // Type-safe click handler
 * }
 * ```
 */
export interface ComponentEventMap {
  click: ClickHandler;
  change: ChangeHandler;
  submit: SubmitHandler;
  gtmEvent: GTMEventHandler;
  search: SearchEventHandler;
  navigate: NavigationEventHandler;
  consent: ConsentEventHandler;
  share: SocialShareEventHandler;
  service: ServiceEventHandler;
  article: ArticleEventHandler;
  theme: ThemeEventHandler;
}