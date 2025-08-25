/**
 * TypeScript definitions for PolicyOverrides
 *
 * Generated from: PolicyOverrides.schema.json
 * Generated on: 2025-08-16T20:49:13.975Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for PolicyOverrides configuration
 */
export interface POLICYOVERRIDESConfigurationSchema {
  /**
   * Enable/disable specific policy pages at this level Example: {"privacy_policy": true, "refund_policy": false}
   */
  enabled_policies?: {
    [k: string]: boolean;
  };
  /**
   * Override policy URLs for this entity Example: {"terms_of_service": "/custom-terms"}
   */
  policy_urls?: {
    [k: string]: string;
  };
  /**
   * Custom policy pages unique to this entity Example: {"api_terms": "/api/terms"} for API projects
   */
  custom_policies?: {
    [k: string]: string;
  };
  /**
   * Hide policies from navigation/footer while keeping them accessible Example: ["refund_policy", "dpa"] for non-commerce sites
   */
  hidden_policies?: string[];
  /**
   * Whether to inherit parent's policy configuration (default: true) Set to false to completely override parent settings
   */
  inherit_parent_policies?: boolean;
}
