/**
 * TypeScript definitions for ABTesting
 *
 * Generated from: ABTesting.schema.json
 * Generated on: 2025-08-16T20:49:12.760Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for ABTesting configuration
 */
export interface ABTESTINGConfigurationSchema {
  /**
   * Enable A/B testing
   */
  enabled?: boolean;
  /**
   * Test variants
   */
  variants?: TestVariant[];
  /**
   * Traffic allocation
   */
  traffic_allocation?: {
    [k: string]: number;
  };
  /**
   * Success metrics
   */
  success_metrics?: string[];
}
/**
 * Test variant
 */
export interface TestVariant {
  /**
   * Variant ID
   */
  id?: string;
  /**
   * Variant name
   */
  name?: string;
  /**
   * Configuration overrides
   */
  overrides?: {
    [k: string]: string;
  };
}
