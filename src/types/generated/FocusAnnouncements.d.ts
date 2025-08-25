/**
 * TypeScript definitions for FocusAnnouncements
 *
 * Generated from: FocusAnnouncements.schema.json
 * Generated on: 2025-08-16T20:49:13.775Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for FocusAnnouncements configuration
 */
export interface FOCUSANNOUNCEMENTSConfigurationSchema {
  /**
   * Announce focus changes
   */
  enabled?: boolean;
  /**
   * Context announcements
   */
  announce_context?: boolean;
  /**
   * Landmark announcements
   */
  announce_landmarks?: boolean;
  /**
   * Custom announcements
   */
  custom?: {
    [k: string]: string;
  };
}
