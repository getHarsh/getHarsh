/**
 * TypeScript definitions for EntityContacts
 *
 * Generated from: EntityContacts.schema.json
 * Generated on: 2025-08-16T20:49:13.735Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for EntityContacts configuration
 */
export interface ENTITYCONTACTSConfigurationSchema {
  /**
   * Registered email
   */
  registered_email?: string;
  /**
   * Official phone number
   */
  phone?: string;
  /**
   * GST/Tax number
   */
  tax_number?: string;
  /**
   * PAN number (India specific)
   */
  pan_number?: string;
  /**
   * Legal/compliance email
   */
  legal_email?: string;
  /**
   * Accounts/finance email
   */
  accounts_email?: string;
}
