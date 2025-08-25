/**
 * TypeScript definitions for PurchaseTracking
 *
 * Generated from: PurchaseTracking.schema.json
 * Generated on: 2025-08-16T20:49:14.065Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for PurchaseTracking configuration
 */
export interface PURCHASETRACKINGConfigurationSchema {
  /**
   * Track purchases
   */
  enabled?: boolean;
  /**
   * Include transaction details
   */
  include_transaction_details?: boolean;
  /**
   * Include product details
   */
  include_product_details?: boolean;
}
