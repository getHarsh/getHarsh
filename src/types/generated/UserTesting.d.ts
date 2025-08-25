/**
 * TypeScript definitions for UserTesting
 *
 * Generated from: UserTesting.schema.json
 * Generated on: 2025-08-16T20:49:14.252Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for UserTesting configuration
 */
export interface USERTESTINGConfigurationSchema {
  /**
   * Include users with disabilities
   */
  include_pwd?: boolean;
  /**
   * Testing frequency
   */
  frequency?: string;
  /**
   * Feedback collection
   */
  collect_feedback?: boolean;
}
