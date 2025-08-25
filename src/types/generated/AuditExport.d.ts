/**
 * TypeScript definitions for AuditExport
 *
 * Generated from: AuditExport.schema.json
 * Generated on: 2025-08-16T20:49:13.098Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * Export format
 */
export type ExportFormat = (string | number) &
  (
    | 'EXPORT_FORMAT_UNSPECIFIED'
    | 0
    | 'EXPORT_FORMAT_JSON'
    | 1
    | 'EXPORT_FORMAT_CSV'
    | 2
    | 'EXPORT_FORMAT_PARQUET'
    | 3
  );

/**
 * JSON Schema for AuditExport configuration
 */
export interface AUDITEXPORTConfigurationSchema {
  /**
   * Enable export
   */
  enabled?: boolean;
  format?: ExportFormat;
  /**
   * Export endpoint
   */
  endpoint?: string;
  /**
   * Export frequency
   */
  frequency?: string;
}
