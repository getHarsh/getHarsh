/**
 * TypeScript definitions for ScreenReaderSupport
 *
 * Generated from: ScreenReaderSupport.schema.json
 * Generated on: 2025-08-16T20:49:14.136Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for ScreenReaderSupport configuration
 */
export interface SCREENREADERSUPPORTConfigurationSchema {
  /**
   * Optimize for screen readers
   */
  optimize?: boolean;
  /**
   * Tested screen readers
   */
  tested_with?: string[];
  announcements?: ScreenReaderAnnouncements;
  /**
   * Virtual cursor support
   */
  virtual_cursor?: boolean;
}
/**
 * Announcements
 */
export interface ScreenReaderAnnouncements {
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
