/**
 * TypeScript definitions for EventTracking
 *
 * Generated from: EventTracking.schema.json
 * Generated on: 2025-08-16T20:49:13.758Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

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
 * JSON Schema for EventTracking configuration
 */
export interface EVENTTRACKINGConfigurationSchema {
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
  type?: TriggerType;
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
