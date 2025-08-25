/**
 * TypeScript definitions for BusinessHours
 *
 * Generated from: BusinessHours.schema.json
 * Generated on: 2025-08-16T20:49:13.155Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for BusinessHours configuration
 */
export interface BUSINESSHOURSConfigurationSchema {
  /**
   * Start time (24h format, e.g., "09:00")
   */
  start_time?: string;
  /**
   * End time (24h format, e.g., "17:00")
   */
  end_time?: string;
  /**
   * Lunch break start
   */
  lunch_start?: string;
  /**
   * Lunch break end
   */
  lunch_end?: string;
  /**
   * Custom hours per day
   */
  custom_hours?: {
    [k: string]: DayHours;
  };
}
/**
 * Custom hours for specific days
 */
export interface DayHours {
  /**
   * Is this day available
   */
  available?: boolean;
  /**
   * Start time for this day
   */
  start_time?: string;
  /**
   * End time for this day
   */
  end_time?: string;
}
