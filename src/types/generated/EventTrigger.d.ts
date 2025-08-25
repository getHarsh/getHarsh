/**
 * TypeScript definitions for EventTrigger
 *
 * Generated from: EventTrigger.schema.json
 * Generated on: 2025-08-16T20:49:13.765Z
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
 * JSON Schema for EventTrigger configuration
 */
export interface EVENTTRIGGERConfigurationSchema {
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
