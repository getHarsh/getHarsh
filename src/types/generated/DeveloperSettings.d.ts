/**
 * TypeScript definitions for DeveloperSettings
 *
 * Generated from: DeveloperSettings.schema.json
 * Generated on: 2025-08-16T20:49:13.392Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for DeveloperSettings configuration
 */
export interface DEVELOPERSETTINGSConfigurationSchema {
  /**
   * Debug mode
   */
  debug?: boolean;
  /**
   * Console logging
   */
  console_logging?: boolean;
  /**
   * Test mode
   */
  test_mode?: boolean;
  /**
   * Mock responses
   */
  mock_responses?: boolean;
  /**
   * Developer email
   */
  developer_email?: string;
}
