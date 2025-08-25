/**
 * TypeScript definitions for FormValidation
 *
 * Generated from: FormValidation.schema.json
 * Generated on: 2025-08-16T20:49:13.786Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for FormValidation configuration
 */
export interface FORMVALIDATIONConfigurationSchema {
  /**
   * Client-side validation
   */
  client_validation?: boolean;
  /**
   * Real-time validation
   */
  realtime?: boolean;
  /**
   * Success indication
   */
  indicate_success?: boolean;
  messages?: ValidationMessages;
}
/**
 * Validation messages
 */
export interface ValidationMessages {
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
