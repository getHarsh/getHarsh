/**
 * TypeScript definitions for ErrorMessage
 *
 * Generated from: ErrorMessage.schema.json
 * Generated on: 2025-08-16T20:49:13.752Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for ErrorMessage configuration
 */
export interface ERRORMESSAGEConfigurationSchema {
  /**
   * Error code (404, 500, etc.)
   */
  code?: number;
  /**
   * Primary message
   */
  message?: string;
  /**
   * Secondary/explanation text
   */
  explanation?: string;
  /**
   * Quirky variations
   */
  variations?: string[];
  /**
   * Custom image/illustration URL
   */
  image_url?: string;
  /**
   * Tone ("playful", "apologetic", "technical")
   */
  tone?: string;
}
