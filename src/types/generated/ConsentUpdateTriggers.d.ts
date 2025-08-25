/**
 * TypeScript definitions for ConsentUpdateTriggers
 *
 * Generated from: ConsentUpdateTriggers.schema.json
 * Generated on: 2025-08-16T20:49:13.292Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for ConsentUpdateTriggers configuration
 */
export interface CONSENTUPDATETRIGGERSConfigurationSchema {
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
