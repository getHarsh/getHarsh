/**
 * TypeScript definitions for AuditSettings
 *
 * Generated from: AuditSettings.schema.json
 * Generated on: 2025-08-16T20:49:13.099Z
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
 * JSON Schema for AuditSettings configuration
 */
export interface AUDITSETTINGSConfigurationSchema {
  /**
   * Enable audit logging
   */
  enabled?: boolean;
  /**
   * Log consent events
   */
  log_consent_events?: boolean;
  /**
   * Log preference changes
   */
  log_preference_changes?: boolean;
  /**
   * Log page views
   */
  log_page_views?: boolean;
  /**
   * Retention period (days)
   */
  retention_days?: number;
  export?: AuditExport;
  /**
   * Anonymization
   */
  anonymize_ip?: boolean;
}
/**
 * Export settings
 */
export interface AuditExport {
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
