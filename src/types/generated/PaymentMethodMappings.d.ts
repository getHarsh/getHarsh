/**
 * TypeScript definitions for PaymentMethodMappings
 *
 * Generated from: PaymentMethodMappings.schema.json
 * Generated on: 2025-08-16T20:49:13.960Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for PaymentMethodMappings configuration
 */
export interface PAYMENTMETHODMAPPINGSConfigurationSchema {
  /**
   * Simple string mapping: enum name -> Schema.org type e.g., "PAYMENT_METHOD_PAYPAL" -> "PaymentService"
   */
  payment_to_schema?: {
    [k: string]: string;
  };
}
