/**
 * TypeScript definitions for DocsSection
 *
 * Generated from: DocsSection.schema.json
 * Generated on: 2025-08-16T20:49:13.449Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for DocsSection configuration
 */
export interface DOCSSECTIONConfigurationSchema {
  /**
   * Section identifier
   */
  id?: string;
  /**
   * Section title
   */
  title?: string;
  /**
   * Section description
   */
  description?: string;
  /**
   * Section icon
   */
  icon?: string;
  /**
   * Order in navigation
   */
  order?: number;
  /**
   * Pages in this section
   */
  pages?: DocsPage[];
}
/**
 * Documentation page reference
 */
export interface DocsPage {
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
