/**
 * TypeScript definitions for ManifestFormatDefaults
 *
 * Generated from: ManifestFormatDefaults.schema.json
 * Generated on: 2025-08-16T20:49:13.907Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for ManifestFormatDefaults configuration
 */
export interface MANIFESTFORMATDEFAULTSConfigurationSchema {
  unspecified?: ManifestFormatMapping;
  json?: ManifestFormatMapping1;
  protobuf?: ManifestFormatMapping2;
}
/**
 * MANIFEST_FORMAT_UNSPECIFIED  format_name: "" mime_type: "" file_extension: "" schema_url: ""
 */
export interface ManifestFormatMapping {
  /**
   * Format name
   */
  format_name?: string;
  /**
   * MIME type
   */
  mime_type?: string;
  /**
   * File extension
   */
  file_extension?: string;
  /**
   * Schema URL
   */
  schema_url?: string;
}
/**
 * MANIFEST_FORMAT_JSON  format_name: "JSON" mime_type: "application/json" file_extension: ".json" schema_url: "https://json-schema.org/draft/2020-12/schema"
 */
export interface ManifestFormatMapping1 {
  /**
   * Format name
   */
  format_name?: string;
  /**
   * MIME type
   */
  mime_type?: string;
  /**
   * File extension
   */
  file_extension?: string;
  /**
   * Schema URL
   */
  schema_url?: string;
}
/**
 * MANIFEST_FORMAT_PROTOBUF  format_name: "Protocol Buffers" mime_type: "application/x-protobuf" file_extension: ".pb" schema_url: "https://protobuf.dev/"
 */
export interface ManifestFormatMapping2 {
  /**
   * Format name
   */
  format_name?: string;
  /**
   * MIME type
   */
  mime_type?: string;
  /**
   * File extension
   */
  file_extension?: string;
  /**
   * Schema URL
   */
  schema_url?: string;
}
