/**
 * TypeScript definitions for PageSection
 *
 * Generated from: PageSection.schema.json
 * Generated on: 2025-08-16T20:49:13.952Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for PageSection configuration
 */
export interface PAGESECTIONConfigurationSchema {
  id?: string;
  title?: string;
  /**
   * Markdown/HTML
   */
  content?: string;
  /**
   * For custom React components
   */
  component_type?: string;
  /**
   * Component props
   */
  props?: {
    [k: string]: string;
  };
  display_order?: number;
}
