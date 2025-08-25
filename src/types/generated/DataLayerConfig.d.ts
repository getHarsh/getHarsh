/**
 * TypeScript definitions for DataLayerConfig
 *
 * Generated from: DataLayerConfig.schema.json
 * Generated on: 2025-08-16T20:49:13.350Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

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
 * JSON Schema for DataLayerConfig configuration
 */
export interface DATALAYERCONFIGConfigurationSchema {
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
