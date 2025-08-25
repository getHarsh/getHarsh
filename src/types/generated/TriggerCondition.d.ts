/**
 * TypeScript definitions for TriggerCondition
 *
 * Generated from: TriggerCondition.schema.json
 * Generated on: 2025-08-16T20:49:14.248Z
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
 * JSON Schema for TriggerCondition configuration
 */
export interface TRIGGERCONDITIONConfigurationSchema {
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
