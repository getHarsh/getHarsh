/**
 * TypeScript definitions for SchemaOrgChild
 *
 * Generated from: SchemaOrgChild.schema.json
 * Generated on: 2025-08-16T20:49:14.098Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for SchemaOrgChild configuration
 */
export interface SCHEMAORGCHILDConfigurationSchema {
  /**
   * Child entity ID/URL
   */
  id?: string;
  /**
   * Relationship type  e.g., "owns", "subOrganization", "hasPart"
   */
  relationship?: string;
  /**
   * Child type  e.g., "ResearchProject", "SoftwareApplication"
   */
  type?: string;
}
