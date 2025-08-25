/**
 * TypeScript definitions for TriggerDetails
 *
 * Generated from: TriggerDetails.schema.json
 * Generated on: 2025-08-16T20:49:14.249Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for TriggerDetails configuration
 */
export interface TRIGGERDETAILSConfigurationSchema {
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
