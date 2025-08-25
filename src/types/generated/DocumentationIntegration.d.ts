/**
 * TypeScript definitions for DocumentationIntegration
 *
 * Generated from: DocumentationIntegration.schema.json
 * Generated on: 2025-08-16T20:49:13.459Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for DocumentationIntegration configuration
 */
export interface DOCUMENTATIONINTEGRATIONConfigurationSchema {
  /**
   * Include docs in Schema.org
   */
  include_docs?: boolean;
  /**
   * Documentation type
   */
  docs_type?: string;
  /**
   * Include API docs
   */
  include_api?: boolean;
  /**
   * Include tutorials
   */
  include_tutorials?: boolean;
}
