/**
 * TypeScript definitions for GlobalARIA
 *
 * Generated from: GlobalARIA.schema.json
 * Generated on: 2025-08-16T20:49:13.835Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for GlobalARIA configuration
 */
export interface GLOBALARIAConfigurationSchema {
  /**
   * Auto-generate ARIA labels
   */
  auto_labels?: boolean;
  /**
   * Use ARIA describedby
   */
  use_describedby?: boolean;
  hidden_handling?: ARIAHiddenHandling;
  /**
   * ARIA label format
   */
  label_format?: string;
}
/**
 * ARIA hidden handling
 */
export interface ARIAHiddenHandling {
  /**
   * Hide decorative images
   */
  hide_decorative?: boolean;
  /**
   * Hide icon fonts
   */
  hide_icons?: boolean;
  /**
   * Respect explicit hidden
   */
  respect_explicit?: boolean;
}
