/**
 * TypeScript definitions for ScreenReaderAnnouncements
 *
 * Generated from: ScreenReaderAnnouncements.schema.json
 * Generated on: 2025-08-16T20:49:14.135Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for ScreenReaderAnnouncements configuration
 */
export interface SCREENREADERANNOUNCEMENTSConfigurationSchema {
  /**
   * Dynamic content
   */
  announce_dynamic?: boolean;
  /**
   * State changes
   */
  announce_states?: boolean;
  /**
   * Page changes
   */
  announce_pages?: boolean;
  /**
   * Custom announcements
   */
  custom?: {
    [k: string]: string;
  };
}
