/**
 * TypeScript definitions for GTMConfig
 *
 * Generated from: GTMConfig.schema.json
 * Generated on: 2025-08-16T20:49:13.791Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * Loading strategy for GTM
 */
export type LoadingStrategy = (string | number) &
  (
    | 'LOADING_STRATEGY_UNSPECIFIED'
    | 0
    | 'LOADING_STRATEGY_SYNC'
    | 1
    | 'LOADING_STRATEGY_ASYNC'
    | 2
    | 'LOADING_STRATEGY_DEFER'
    | 3
    | 'LOADING_STRATEGY_LAZY'
    | 4
  );
/**
 * Trigger types
 */
export type TriggerType = (string | number) &
  (
    | 'TRIGGER_TYPE_UNSPECIFIED'
    | 0
    | 'TRIGGER_TYPE_PAGE_VIEW'
    | 1
    | 'TRIGGER_TYPE_DOM_READY'
    | 2
    | 'TRIGGER_TYPE_WINDOW_LOADED'
    | 3
    | 'TRIGGER_TYPE_CLICK'
    | 4
    | 'TRIGGER_TYPE_FORM_SUBMIT'
    | 5
    | 'TRIGGER_TYPE_SCROLL'
    | 6
    | 'TRIGGER_TYPE_TIMER'
    | 7
    | 'TRIGGER_TYPE_CUSTOM'
    | 8
  );
/**
 * Parameter types
 */
export type ParameterType = (string | number) &
  (
    | 'PARAMETER_TYPE_UNSPECIFIED'
    | 0
    | 'PARAMETER_TYPE_STATIC'
    | 1
    | 'PARAMETER_TYPE_DYNAMIC'
    | 2
    | 'PARAMETER_TYPE_DOM'
    | 3
    | 'PARAMETER_TYPE_URL'
    | 4
    | 'PARAMETER_TYPE_COOKIE'
    | 5
    | 'PARAMETER_TYPE_JS_VARIABLE'
    | 6
  );
/**
 * Trigger types
 */
export type TriggerType1 = (string | number) &
  (
    | 'TRIGGER_TYPE_UNSPECIFIED'
    | 0
    | 'TRIGGER_TYPE_PAGE_VIEW'
    | 1
    | 'TRIGGER_TYPE_DOM_READY'
    | 2
    | 'TRIGGER_TYPE_WINDOW_LOADED'
    | 3
    | 'TRIGGER_TYPE_CLICK'
    | 4
    | 'TRIGGER_TYPE_FORM_SUBMIT'
    | 5
    | 'TRIGGER_TYPE_SCROLL'
    | 6
    | 'TRIGGER_TYPE_TIMER'
    | 7
    | 'TRIGGER_TYPE_CUSTOM'
    | 8
  );
/**
 * Condition operators
 */
export type ConditionOperator = (string | number) &
  (
    | 'CONDITION_OPERATOR_UNSPECIFIED'
    | 0
    | 'CONDITION_OPERATOR_EQUALS'
    | 1
    | 'CONDITION_OPERATOR_NOT_EQUALS'
    | 2
    | 'CONDITION_OPERATOR_CONTAINS'
    | 3
    | 'CONDITION_OPERATOR_NOT_CONTAINS'
    | 4
    | 'CONDITION_OPERATOR_STARTS_WITH'
    | 5
    | 'CONDITION_OPERATOR_ENDS_WITH'
    | 6
    | 'CONDITION_OPERATOR_MATCHES_REGEX'
    | 7
    | 'CONDITION_OPERATOR_GREATER_THAN'
    | 8
    | 'CONDITION_OPERATOR_LESS_THAN'
    | 9
  );
/**
 * Value types
 */
export type ValueType = (string | number) &
  (
    | 'VALUE_TYPE_UNSPECIFIED'
    | 0
    | 'VALUE_TYPE_STATIC'
    | 1
    | 'VALUE_TYPE_DYNAMIC'
    | 2
    | 'VALUE_TYPE_CALCULATED'
    | 3
  );
/**
 * Dimension scope
 */
export type DimensionScope = (string | number) &
  (
    | 'DIMENSION_SCOPE_UNSPECIFIED'
    | 0
    | 'DIMENSION_SCOPE_USER'
    | 1
    | 'DIMENSION_SCOPE_SESSION'
    | 2
    | 'DIMENSION_SCOPE_EVENT'
    | 3
    | 'DIMENSION_SCOPE_ITEM'
    | 4
  );
/**
 * Metric types
 */
export type MetricType = (string | number) &
  (
    | 'METRIC_TYPE_UNSPECIFIED'
    | 0
    | 'METRIC_TYPE_NUMBER'
    | 1
    | 'METRIC_TYPE_CURRENCY'
    | 2
    | 'METRIC_TYPE_TIME'
    | 3
    | 'METRIC_TYPE_PERCENTAGE'
    | 4
  );
/**
 * Consent state
 */
export type ConsentState = (string | number) &
  ('CONSENT_STATE_UNSPECIFIED' | 0 | 'CONSENT_STATE_GRANTED' | 1 | 'CONSENT_STATE_DENIED' | 2);
/**
 * Consent state
 */
export type ConsentState1 = (string | number) &
  ('CONSENT_STATE_UNSPECIFIED' | 0 | 'CONSENT_STATE_GRANTED' | 1 | 'CONSENT_STATE_DENIED' | 2);
/**
 * Consent state
 */
export type ConsentState2 = (string | number) &
  ('CONSENT_STATE_UNSPECIFIED' | 0 | 'CONSENT_STATE_GRANTED' | 1 | 'CONSENT_STATE_DENIED' | 2);
/**
 * Consent state
 */
export type ConsentState3 = (string | number) &
  ('CONSENT_STATE_UNSPECIFIED' | 0 | 'CONSENT_STATE_GRANTED' | 1 | 'CONSENT_STATE_DENIED' | 2);
/**
 * Consent state
 */
export type ConsentState4 = (string | number) &
  ('CONSENT_STATE_UNSPECIFIED' | 0 | 'CONSENT_STATE_GRANTED' | 1 | 'CONSENT_STATE_DENIED' | 2);
/**
 * Consent state
 */
export type ConsentState5 = (string | number) &
  ('CONSENT_STATE_UNSPECIFIED' | 0 | 'CONSENT_STATE_GRANTED' | 1 | 'CONSENT_STATE_DENIED' | 2);
/**
 * Consent state
 */
export type ConsentState6 = (string | number) &
  ('CONSENT_STATE_UNSPECIFIED' | 0 | 'CONSENT_STATE_GRANTED' | 1 | 'CONSENT_STATE_DENIED' | 2);
/**
 * Detection types
 */
export type DetectionType = (string | number) &
  (
    | 'DETECTION_TYPE_UNSPECIFIED'
    | 0
    | 'DETECTION_TYPE_IP_BASED'
    | 1
    | 'DETECTION_TYPE_TIMEZONE'
    | 2
    | 'DETECTION_TYPE_BROWSER_LOCALE'
    | 3
    | 'DETECTION_TYPE_CUSTOM'
    | 4
  );
/**
 * Transport method for server-side
 */
export type TransportMethod = (string | number) &
  (
    | 'TRANSPORT_METHOD_UNSPECIFIED'
    | 0
    | 'TRANSPORT_METHOD_GTAG'
    | 1
    | 'TRANSPORT_METHOD_GTM'
    | 2
    | 'TRANSPORT_METHOD_CUSTOM'
    | 3
  );
/**
 * Log levels
 */
export type LogLevel = (string | number) &
  (
    | 'LOG_LEVEL_UNSPECIFIED'
    | 0
    | 'LOG_LEVEL_ERROR'
    | 1
    | 'LOG_LEVEL_WARNING'
    | 2
    | 'LOG_LEVEL_INFO'
    | 3
    | 'LOG_LEVEL_DEBUG'
    | 4
    | 'LOG_LEVEL_VERBOSE'
    | 5
  );

/**
 * JSON Schema for GTMConfig configuration
 */
export interface GTMCONFIGConfigurationSchema {
  container?: GTMContainer;
  data_layer?: DataLayerConfig;
  events?: EventTracking;
  ecommerce?: EnhancedEcommerce;
  custom_dimensions?: CustomDimensions;
  consent_mode?: ConsentModeIntegration;
  cross_domain?: CrossDomainConfig;
  server_side?: ServerSideTagging;
  debug?: DebugSettings;
  /**
   * Entity-specific overrides
   */
  entity_configs?: {
    [k: string]: EntityGTMConfig;
  };
}
/**
 * GTM container configuration
 */
export interface GTMContainer {
  /**
   * Container ID (e.g., "GTM-XXXXXX")
   */
  container_id?: string;
  /**
   * Container environment (leave empty for production)
   */
  environment?: string;
  /**
   * Authentication token for preview mode
   */
  auth_token?: string;
  /**
   * Preview ID for testing
   */
  preview_id?: string;
  /**
   * Load GTM script in head vs body
   */
  load_in_head?: boolean;
  /**
   * Enable noscript fallback
   */
  enable_noscript?: boolean;
  /**
   * Custom domain for GTM script (for China, etc.)
   */
  custom_domain?: string;
  loading_strategy?: LoadingStrategy;
}
/**
 * Data layer configuration
 */
export interface DataLayerConfig {
  /**
   * Data layer variable name (default: "dataLayer")
   */
  variable_name?: string;
  /**
   * Initial data layer values
   */
  initial_values?: {
    [k: string]: string;
  };
  page_metadata?: PageMetadata;
  user_properties?: UserProperties;
  entity_properties?: EntityProperties;
  content_properties?: ContentProperties;
  /**
   * Enable enhanced link attribution
   */
  enhanced_link_attribution?: boolean;
  /**
   * Custom data layer pushes
   */
  custom_pushes?: DataLayerPush[];
}
/**
 * Page metadata to include
 */
export interface PageMetadata {
  /**
   * Include page title
   */
  include_title?: boolean;
  /**
   * Include page path
   */
  include_path?: boolean;
  /**
   * Include page type (from Schema.org)
   */
  include_type?: boolean;
  /**
   * Include page category
   */
  include_category?: boolean;
  /**
   * Include page author
   */
  include_author?: boolean;
  /**
   * Include publish date
   */
  include_publish_date?: boolean;
  /**
   * Include modified date
   */
  include_modified_date?: boolean;
  /**
   * Include tags
   */
  include_tags?: boolean;
  /**
   * Include language
   */
  include_language?: boolean;
  /**
   * Include breadcrumbs
   */
  include_breadcrumbs?: boolean;
}
/**
 * User properties to track
 */
export interface UserProperties {
  /**
   * Track user ID (hashed)
   */
  track_user_id?: boolean;
  /**
   * Track user type (visitor, member, etc.)
   */
  track_user_type?: boolean;
  /**
   * Track user segment
   */
  track_user_segment?: boolean;
  /**
   * Track login status
   */
  track_login_status?: boolean;
  /**
   * Track subscription status
   */
  track_subscription_status?: boolean;
  /**
   * Custom user properties
   */
  custom_properties?: {
    [k: string]: string;
  };
}
/**
 * Entity properties to track
 */
export interface EntityProperties {
  /**
   * Track legal entity (RTEPL, DSPL)
   */
  track_legal_entity?: boolean;
  /**
   * Track brand/domain
   */
  track_brand?: boolean;
  /**
   * Track project (if applicable)
   */
  track_project?: boolean;
  /**
   * Track content source (domain, blog, project)
   */
  track_content_source?: boolean;
  /**
   * Track cross-entity navigation
   */
  track_cross_entity?: boolean;
}
/**
 * Content properties to track
 */
export interface ContentProperties {
  /**
   * Track content length
   */
  track_content_length?: boolean;
  /**
   * Track read time
   */
  track_read_time?: boolean;
  /**
   * Track scroll depth
   */
  track_scroll_depth?: boolean;
  /**
   * Track content format (article, video, etc.)
   */
  track_content_format?: boolean;
  /**
   * Track content engagement
   */
  track_engagement?: boolean;
}
/**
 * Custom data layer push configuration
 */
export interface DataLayerPush {
  /**
   * Event name to push
   */
  event_name?: string;
  /**
   * Event parameters
   */
  parameters?: {
    [k: string]: string;
  };
  /**
   * Trigger conditions
   */
  triggers?: TriggerCondition[];
  /**
   * Delay in milliseconds
   */
  delay_ms?: number;
}
/**
 * Trigger condition for events
 */
export interface TriggerCondition {
  type?: TriggerType;
  /**
   * Trigger value (selector, URL pattern, etc.)
   */
  value?: string;
  /**
   * Additional conditions
   */
  conditions?: {
    [k: string]: string;
  };
}
/**
 * Event tracking configuration
 */
export interface EventTracking {
  standard_events?: StandardEvents;
  /**
   * Custom events configuration
   */
  custom_events?: CustomEvent[];
  /**
   * Conversion events
   */
  conversions?: ConversionEvent[];
  enhanced_measurement?: EnhancedMeasurement;
}
/**
 * Standard events configuration
 */
export interface StandardEvents {
  page_view?: PageViewTracking;
  engagement?: UserEngagementTracking;
  search?: SearchTracking;
  video?: VideoTracking;
  downloads?: FileDownloadTracking;
  outbound?: OutboundLinkTracking;
}
/**
 * Page view tracking
 */
export interface PageViewTracking {
  /**
   * Enable page view tracking
   */
  enabled?: boolean;
  /**
   * Track single page app navigation
   */
  track_spa_navigation?: boolean;
  /**
   * Include custom parameters
   */
  custom_parameters?: {
    [k: string]: string;
  };
}
/**
 * User engagement tracking
 */
export interface UserEngagementTracking {
  /**
   * Enable engagement tracking
   */
  enabled?: boolean;
  /**
   * Engagement time threshold (seconds)
   */
  engagement_threshold?: number;
  /**
   * Track rage clicks
   */
  track_rage_clicks?: boolean;
  /**
   * Track dead clicks
   */
  track_dead_clicks?: boolean;
}
/**
 * Search tracking
 */
export interface SearchTracking {
  /**
   * Enable search tracking
   */
  enabled?: boolean;
  /**
   * Search query parameter
   */
  query_parameter?: string;
  /**
   * Track search filters
   */
  track_filters?: boolean;
  /**
   * Track search results
   */
  track_results?: boolean;
}
/**
 * Video tracking
 */
export interface VideoTracking {
  /**
   * Enable video tracking
   */
  enabled?: boolean;
  /**
   * Track YouTube videos
   */
  track_youtube?: boolean;
  /**
   * Track HTML5 videos
   */
  track_html5?: boolean;
  /**
   * Video interaction thresholds (percentages)
   */
  progress_thresholds?: number[];
}
/**
 * File download tracking
 */
export interface FileDownloadTracking {
  /**
   * Enable download tracking
   */
  enabled?: boolean;
  /**
   * File extensions to track
   */
  tracked_extensions?: string[];
  /**
   * Track download source
   */
  track_source?: boolean;
}
/**
 * Outbound link tracking
 */
export interface OutboundLinkTracking {
  /**
   * Enable outbound tracking
   */
  enabled?: boolean;
  /**
   * Excluded domains (ecosystem domains)
   */
  excluded_domains?: string[];
  /**
   * Track link context
   */
  track_context?: boolean;
}
/**
 * Custom event configuration
 */
export interface CustomEvent {
  /**
   * Event name
   */
  event_name?: string;
  /**
   * Event category
   */
  category?: string;
  /**
   * Event parameters
   */
  parameters?: {
    [k: string]: EventParameter;
  };
  /**
   * Trigger configuration
   */
  triggers?: EventTrigger[];
  /**
   * Event conditions
   */
  conditions?: EventCondition[];
  /**
   * Send to GA4
   */
  send_to_ga4?: boolean;
  /**
   * Custom destinations
   */
  custom_destinations?: string[];
}
/**
 * Event parameter configuration
 */
export interface EventParameter {
  type?: ParameterType;
  /**
   * Parameter value or source
   */
  value?: string;
  /**
   * Required parameter
   */
  required?: boolean;
  /**
   * Default value if missing
   */
  default_value?: string;
}
/**
 * Event trigger configuration
 */
export interface EventTrigger {
  type?: TriggerType1;
  details?: TriggerDetails;
  /**
   * Debounce delay (ms)
   */
  debounce_ms?: number;
}
/**
 * Trigger details
 */
export interface TriggerDetails {
  /**
   * CSS selector for clicks
   */
  selector?: string;
  /**
   * URL pattern for page views
   */
  url_pattern?: string;
  /**
   * Scroll percentage
   */
  scroll_percentage?: number;
  /**
   * Timer interval (ms)
   */
  timer_interval?: number;
  /**
   * Custom JavaScript condition
   */
  js_condition?: string;
}
/**
 * Event condition
 */
export interface EventCondition {
  /**
   * Condition variable
   */
  variable?: string;
  operator?: ConditionOperator;
  /**
   * Condition value
   */
  value?: string;
}
/**
 * Conversion event configuration
 */
export interface ConversionEvent {
  /**
   * Conversion name
   */
  conversion_name?: string;
  value?: ConversionValue;
  /**
   * Conversion currency
   */
  currency?: string;
  /**
   * Send to Google Ads
   */
  send_to_google_ads?: boolean;
  /**
   * Google Ads conversion ID
   */
  google_ads_conversion_id?: string;
  /**
   * Google Ads conversion label
   */
  google_ads_conversion_label?: string;
  /**
   * Custom parameters
   */
  custom_parameters?: {
    [k: string]: string;
  };
}
/**
 * Conversion value
 */
export interface ConversionValue {
  type?: ValueType;
  /**
   * Static value
   */
  static_value?: number;
  /**
   * Dynamic value source
   */
  dynamic_source?: string;
  /**
   * Default value
   */
  default_value?: number;
}
/**
 * Enhanced measurement
 */
export interface EnhancedMeasurement {
  /**
   * Enable all enhanced measurements
   */
  enable_all?: boolean;
  scroll?: ScrollTracking;
  forms?: FormTracking;
  /**
   * Site search tracking
   */
  site_search?: boolean;
  /**
   * Video engagement
   */
  video_engagement?: boolean;
  /**
   * File downloads
   */
  file_downloads?: boolean;
}
/**
 * Scroll tracking
 */
export interface ScrollTracking {
  /**
   * Enable scroll tracking
   */
  enabled?: boolean;
  /**
   * Scroll depth thresholds (percentages)
   */
  thresholds?: number[];
  /**
   * Track time to scroll
   */
  track_time_to_scroll?: boolean;
}
/**
 * Form interaction tracking
 */
export interface FormTracking {
  /**
   * Enable form tracking
   */
  enabled?: boolean;
  /**
   * Track form starts
   */
  track_starts?: boolean;
  /**
   * Track form abandonment
   */
  track_abandonment?: boolean;
  /**
   * Track field interactions
   */
  track_field_interactions?: boolean;
  /**
   * Excluded form selectors
   */
  excluded_forms?: string[];
}
/**
 * Enhanced ecommerce configuration
 */
export interface EnhancedEcommerce {
  /**
   * Enable enhanced ecommerce
   */
  enabled?: boolean;
  /**
   * Data layer version (GA4 or UA)
   */
  data_layer_version?: string;
  /**
   * Currency code
   */
  currency_code?: string;
  products?: ProductTracking;
  cart?: CartTracking;
  checkout?: CheckoutTracking;
  purchase?: PurchaseTracking;
  refunds?: RefundTracking;
  promotions?: PromotionTracking;
}
/**
 * Product tracking
 */
export interface ProductTracking {
  /**
   * Track product impressions
   */
  track_impressions?: boolean;
  /**
   * Track product clicks
   */
  track_clicks?: boolean;
  /**
   * Track product details
   */
  track_details?: boolean;
  /**
   * Product list names
   */
  list_names?: {
    [k: string]: string;
  };
}
/**
 * Cart tracking
 */
export interface CartTracking {
  /**
   * Track add to cart
   */
  track_add_to_cart?: boolean;
  /**
   * Track remove from cart
   */
  track_remove_from_cart?: boolean;
  /**
   * Track cart views
   */
  track_cart_views?: boolean;
}
/**
 * Checkout tracking
 */
export interface CheckoutTracking {
  /**
   * Track checkout steps
   */
  track_steps?: boolean;
  /**
   * Checkout step names
   */
  step_names?: string[];
  /**
   * Track checkout options
   */
  track_options?: boolean;
}
/**
 * Purchase tracking
 */
export interface PurchaseTracking {
  /**
   * Track purchases
   */
  enabled?: boolean;
  /**
   * Include transaction details
   */
  include_transaction_details?: boolean;
  /**
   * Include product details
   */
  include_product_details?: boolean;
}
/**
 * Refund tracking
 */
export interface RefundTracking {
  /**
   * Track full refunds
   */
  track_full_refunds?: boolean;
  /**
   * Track partial refunds
   */
  track_partial_refunds?: boolean;
}
/**
 * Promotion tracking
 */
export interface PromotionTracking {
  /**
   * Track promotion impressions
   */
  track_impressions?: boolean;
  /**
   * Track promotion clicks
   */
  track_clicks?: boolean;
}
/**
 * Custom dimensions and metrics
 */
export interface CustomDimensions {
  /**
   * User-scoped dimensions
   */
  user_dimensions?: CustomDimension[];
  /**
   * Event-scoped dimensions
   */
  event_dimensions?: CustomDimension[];
  /**
   * Custom metrics
   */
  metrics?: CustomMetric[];
  entity_dimension?: EntityDimension;
}
/**
 * Custom dimension configuration
 */
export interface CustomDimension {
  /**
   * Dimension name
   */
  name?: string;
  /**
   * Dimension index (GA4)
   */
  index?: number;
  scope?: DimensionScope;
  /**
   * Value source
   */
  value_source?: string;
  /**
   * Default value
   */
  default_value?: string;
}
/**
 * Custom metric configuration
 */
export interface CustomMetric {
  /**
   * Metric name
   */
  name?: string;
  /**
   * Metric index
   */
  index?: number;
  type?: MetricType;
  /**
   * Unit of measurement
   */
  unit?: string;
}
/**
 * Entity tracking dimension
 */
export interface EntityDimension {
  /**
   * Legal entity dimension
   */
  legal_entity_dimension?: string;
  /**
   * Brand dimension
   */
  brand_dimension?: string;
  /**
   * Project dimension
   */
  project_dimension?: string;
  /**
   * Content source dimension
   */
  source_dimension?: string;
}
/**
 * Consent mode v2 integration
 */
export interface ConsentModeIntegration {
  /**
   * Enable consent mode
   */
  enabled?: boolean;
  default_state?: DefaultConsentState;
  update_triggers?: ConsentUpdateTriggers;
  /**
   * Regional consent settings
   */
  regional_settings?: RegionalConsent[];
  /**
   * Wait for consent update (ms)
   */
  wait_for_update_ms?: number;
  /**
   * URL passthrough
   */
  url_passthrough?: boolean;
  /**
   * Ads data redaction
   */
  ads_data_redaction?: boolean;
}
/**
 * Default consent state
 */
export interface DefaultConsentState {
  analytics_storage?: ConsentState;
  ad_storage?: ConsentState1;
  ad_user_data?: ConsentState2;
  ad_personalization?: ConsentState3;
  functionality_storage?: ConsentState4;
  personalization_storage?: ConsentState5;
  security_storage?: ConsentState6;
}
/**
 * Consent update triggers
 */
export interface ConsentUpdateTriggers {
  on_consent_given?: ConsentEventTrigger;
  on_consent_withdrawn?: ConsentEventTrigger1;
  on_consent_changed?: ConsentEventTrigger2;
}
/**
 * Update on consent given
 */
export interface ConsentEventTrigger {
  /**
   * GTM event name
   */
  event_name?: string;
  /**
   * Consent types to update
   */
  consent_types?: string[];
}
/**
 * Update on consent withdrawn
 */
export interface ConsentEventTrigger1 {
  /**
   * GTM event name
   */
  event_name?: string;
  /**
   * Consent types to update
   */
  consent_types?: string[];
}
/**
 * Update on consent changed
 */
export interface ConsentEventTrigger2 {
  /**
   * GTM event name
   */
  event_name?: string;
  /**
   * Consent types to update
   */
  consent_types?: string[];
}
/**
 * Regional consent configuration
 */
export interface RegionalConsent {
  /**
   * Region code (e.g., "EU", "US-CA")
   */
  region?: string;
  consent_state?: DefaultConsentState1;
  detection?: RegionDetection;
}
/**
 * Regional consent state
 */
export interface DefaultConsentState1 {
  analytics_storage?: ConsentState;
  ad_storage?: ConsentState1;
  ad_user_data?: ConsentState2;
  ad_personalization?: ConsentState3;
  functionality_storage?: ConsentState4;
  personalization_storage?: ConsentState5;
  security_storage?: ConsentState6;
}
/**
 * Region detection method
 */
export interface RegionDetection {
  type?: DetectionType;
  /**
   * Custom detection function
   */
  custom_function?: string;
}
/**
 * Cross-domain tracking configuration
 */
export interface CrossDomainConfig {
  /**
   * Enable cross-domain tracking
   */
  enabled?: boolean;
  /**
   * Auto link domains
   */
  auto_link_domains?: string[];
  linker?: LinkerConfig;
  /**
   * Exclude URL patterns
   */
  exclude_patterns?: string[];
  /**
   * Cookie domain
   */
  cookie_domain?: string;
  cookie_flags?: CookieFlags;
}
/**
 * Linker parameters
 */
export interface LinkerConfig {
  /**
   * Accept incoming linker
   */
  accept_incoming?: boolean;
  /**
   * Decorate forms
   */
  decorate_forms?: boolean;
  /**
   * URL position for linker  "query" or "fragment"
   */
  url_position?: string;
}
/**
 * Cookie flags
 */
export interface CookieFlags {
  /**
   * Cookie prefix
   */
  cookie_prefix?: string;
  /**
   * Cookie update
   */
  cookie_update?: boolean;
  /**
   * Cookie expires (days)
   */
  cookie_expires?: number;
  /**
   * Cookie path
   */
  cookie_path?: string;
  /**
   * Cookie samesite  "Strict", "Lax", "None"
   */
  cookie_samesite?: string;
  /**
   * Cookie secure
   */
  cookie_secure?: boolean;
}
/**
 * Server-side tagging configuration
 */
export interface ServerSideTagging {
  /**
   * Enable server-side tagging
   */
  enabled?: boolean;
  /**
   * Server container URL
   */
  server_container_url?: string;
  transport?: TransportMethod;
  first_party?: FirstPartyConfig;
  client_id?: ClientIdentification;
}
/**
 * First-party collection
 */
export interface FirstPartyConfig {
  /**
   * Collection endpoint
   */
  endpoint?: string;
  /**
   * Custom headers
   */
  headers?: {
    [k: string]: string;
  };
  /**
   * Batch requests
   */
  batch_requests?: boolean;
  /**
   * Batch size
   */
  batch_size?: number;
}
/**
 * Client identification
 */
export interface ClientIdentification {
  /**
   * Client ID cookie name
   */
  cookie_name?: string;
  /**
   * Generate if missing
   */
  generate_if_missing?: boolean;
  /**
   * Hash client ID
   */
  hash_client_id?: boolean;
}
/**
 * Debug and preview settings
 */
export interface DebugSettings {
  /**
   * Enable debug mode
   */
  enabled?: boolean;
  log_level?: LogLevel;
  /**
   * Console logging
   */
  console_logging?: boolean;
  /**
   * Debug events
   */
  debug_events?: string[];
  /**
   * Validation mode
   */
  validation_mode?: boolean;
  preview?: PreviewMode;
}
/**
 * Preview mode
 */
export interface PreviewMode {
  /**
   * Enable preview
   */
  enabled?: boolean;
  /**
   * Preview cookie name
   */
  cookie_name?: string;
  /**
   * Share preview URL
   */
  share_preview_url?: boolean;
}
/**
 * Entity-specific GTM configuration
 */
export interface EntityGTMConfig {
  /**
   * Entity name (e.g., "RTEPL", "DSPL")
   */
  entity_name?: string;
  /**
   * Override container ID
   */
  container_id_override?: string;
  /**
   * Entity-specific events
   */
  entity_events?: CustomEvent[];
  /**
   * Entity-specific dimensions
   */
  entity_dimensions?: {
    [k: string]: string;
  };
  /**
   * Entity-specific conversions
   */
  entity_conversions?: ConversionEvent[];
  /**
   * Google Ads account ID
   */
  google_ads_account?: string;
  /**
   * GA4 measurement ID override
   */
  ga4_measurement_id?: string;
}
