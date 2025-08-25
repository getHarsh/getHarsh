/**
 * TypeScript definitions for FocusManagement
 *
 * Generated from: FocusManagement.schema.json
 * Generated on: 2025-08-16T20:49:13.776Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for FocusManagement configuration
 */
export interface FOCUSMANAGEMENTConfigurationSchema {
  /**
   * Focus trap zones
   */
  focus_traps?: FocusTrap[];
  restoration?: FocusRestoration;
  order?: FocusOrder;
  announcements?: FocusAnnouncements;
}
/**
 * Focus trap configuration
 */
export interface FocusTrap {
  /**
   * Trap identifier
   */
  id?: string;
  /**
   * CSS selector
   */
  selector?: string;
  /**
   * Initial focus
   */
  initial_focus?: string;
  /**
   * Return focus on close
   */
  return_focus?: boolean;
  /**
   * Allow escape
   */
  allow_escape?: boolean;
}
/**
 * Focus restoration
 */
export interface FocusRestoration {
  /**
   * Enable restoration
   */
  enabled?: boolean;
  /**
   * Save focus on navigation
   */
  save_on_navigation?: boolean;
  /**
   * Restore on back
   */
  restore_on_back?: boolean;
  /**
   * Focus memory duration
   */
  memory_duration_ms?: number;
}
/**
 * Focus order
 */
export interface FocusOrder {
  /**
   * Reading order matches focus
   */
  match_reading_order?: boolean;
  /**
   * Group related elements
   */
  group_related?: boolean;
  /**
   * Focus regions
   */
  regions?: FocusRegion[];
}
/**
 * Focus region
 */
export interface FocusRegion {
  /**
   * Region name
   */
  name?: string;
  /**
   * CSS selector
   */
  selector?: string;
  /**
   * Tab behavior
   */
  tab_behavior?: string;
}
/**
 * Focus announcements
 */
export interface FocusAnnouncements {
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
