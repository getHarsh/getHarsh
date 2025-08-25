/**
 * TypeScript definitions for ProjectGTMConfig
 *
 * Generated from: ProjectGTMConfig.schema.json
 * Generated on: 2025-08-16T20:49:14.023Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

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
 * JSON Schema for ProjectGTMConfig configuration
 */
export interface PROJECTGTMCONFIGConfigurationSchema {
  doc_tracking?: DocumentationTracking;
  api_tracking?: APIUsageTracking;
  download_tracking?: DownloadTracking;
  /**
   * Demo interaction tracking
   */
  track_demo_interactions?: boolean;
  /**
   * Code example copy tracking
   */
  track_code_copy?: boolean;
  /**
   * Project-specific conversion events
   */
  project_conversions?: ConversionEvent[];
  /**
   * Custom project dimensions
   */
  project_dimensions?: {
    [k: string]: string;
  };
}
/**
 * Documentation interaction tracking
 */
export interface DocumentationTracking {
  /**
   * Track documentation navigation
   */
  track_navigation?: boolean;
  /**
   * Track search queries
   */
  track_search?: boolean;
  /**
   * Track version switching
   */
  track_version_switch?: boolean;
  /**
   * Track time on page
   */
  track_time_on_page?: boolean;
}
/**
 * API usage tracking
 */
export interface APIUsageTracking {
  /**
   * Track API key generation
   */
  track_key_generation?: boolean;
  /**
   * Track API endpoint usage (from docs)
   */
  track_endpoint_clicks?: boolean;
  /**
   * Track SDK downloads
   */
  track_sdk_downloads?: boolean;
  /**
   * Custom API events
   */
  custom_events?: string[];
}
/**
 * Download tracking configuration
 */
export interface DownloadTracking {
  /**
   * Track all downloads
   */
  enabled?: boolean;
  /**
   * File types to track
   */
  tracked_extensions?: string[];
  /**
   * Track by version
   */
  track_version?: boolean;
  /**
   * Track by platform
   */
  track_platform?: boolean;
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
