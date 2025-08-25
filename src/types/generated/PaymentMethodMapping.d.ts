/**
 * TypeScript definitions for PaymentMethodMapping
 *
 * Generated from: PaymentMethodMapping.schema.json
 * Generated on: 2025-08-16T20:49:13.960Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for PaymentMethodMapping configuration
 */
export interface PAYMENTMETHODMAPPINGConfigurationSchema {
  /**
   * Schema.org type
   */
  schema_type?: string;
  service_info?: PaymentServiceInfo;
  /**
   * Accepted actions
   */
  accepted_actions?: string[];
}
/**
 * Payment service properties
 */
export interface PaymentServiceInfo {
  name?: string;
  url?: string;
  provider_type?: string;
  additional_properties?: {
    [k: string]: string;
  };
}
