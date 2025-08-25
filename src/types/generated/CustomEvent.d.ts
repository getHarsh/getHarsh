/**
 * TypeScript definitions for CustomEvent
 *
 * Generated from: CustomEvent.schema.json
 * Generated on: 2025-08-16T20:49:13.341Z
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
 * JSON Schema for CustomEvent configuration
 */
export interface CUSTOMEVENTConfigurationSchema {
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
