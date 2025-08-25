/**
 * TypeScript definitions for AutomatedTesting
 *
 * Generated from: AutomatedTesting.schema.json
 * Generated on: 2025-08-16T20:49:13.106Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for AutomatedTesting configuration
 */
export interface AUTOMATEDTESTINGConfigurationSchema {
  /**
   * Enable automated tests
   */
  enabled?: boolean;
  /**
   * Testing tools
   */
  tools?: string[];
  /**
   * Test on build
   */
  test_on_build?: boolean;
  /**
   * Fail on errors
   */
  fail_on_errors?: boolean;
  /**
   * Error threshold
   */
  error_threshold?: number;
}
