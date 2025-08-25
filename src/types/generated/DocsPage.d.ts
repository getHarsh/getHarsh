/**
 * TypeScript definitions for DocsPage
 *
 * Generated from: DocsPage.schema.json
 * Generated on: 2025-08-16T20:49:13.448Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for DocsPage configuration
 */
export interface DOCSPAGEConfigurationSchema {
  /**
   * Page identifier
   */
  id?: string;
  /**
   * Page title
   */
  title?: string;
  /**
   * Page path (relative to docs/)
   */
  path?: string;
  /**
   * Order within section
   */
  order?: number;
  /**
   * Hide from navigation
   */
  hidden?: boolean;
  /**
   * External link (if not a local page)
   */
  external?: boolean;
}
