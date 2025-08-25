/**
 * TypeScript definitions for ValidationMessages
 *
 * Generated from: ValidationMessages.schema.json
 * Generated on: 2025-08-16T20:49:14.254Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for ValidationMessages configuration
 */
export interface VALIDATIONMESSAGESConfigurationSchema {
  /**
   * Custom messages
   */
  custom?: {
    [k: string]: string;
  };
  /**
   * Helpful messages
   */
  helpful_messages?: boolean;
  /**
   * Avoid technical jargon
   */
  avoid_jargon?: boolean;
}
