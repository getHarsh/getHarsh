/**
 * TypeScript definitions for ManifestMeta
 *
 * Generated from: ManifestMeta.schema.json
 * Generated on: 2025-08-16T20:49:13.910Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * ============================================================================= MANIFEST ENUMS =============================================================================  Manifest format types
 */
export type MANIFESTENUMS = (string | number) &
  ('MANIFEST_FORMAT_UNSPECIFIED' | 0 | 'MANIFEST_FORMAT_JSON' | 1 | 'MANIFEST_FORMAT_PROTOBUF' | 2);

/**
 * JSON Schema for ManifestMeta configuration
 */
export interface MANIFESTMETAConfigurationSchema {
  /**
   * Manifest schema version
   */
  schema_version?: string;
  /**
   * When this manifest was generated
   */
  generated_at?: string;
  format?: MANIFESTENUMS;
  /**
   * Checksum of the manifest
   */
  checksum?: string;
}
