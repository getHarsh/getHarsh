/**
 * TypeScript definitions for EntityConsolidation
 *
 * Generated from: EntityConsolidation.schema.json
 * Generated on: 2025-08-16T20:49:13.734Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for EntityConsolidation configuration
 */
export interface ENTITYCONSOLIDATIONConfigurationSchema {
  /**
   * Consolidate organizations
   */
  consolidate_orgs?: boolean;
  /**
   * Consolidate persons
   */
  consolidate_persons?: boolean;
  /**
   * Consolidate brands
   */
  consolidate_brands?: boolean;
  /**
   * Use @id references
   */
  use_id_references?: boolean;
  /**
   * ID generation pattern
   */
  id_pattern?: string;
}
