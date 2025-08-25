/**
 * TypeScript definitions for CalendarService
 *
 * Generated from: CalendarService.schema.json
 * Generated on: 2025-08-16T20:49:13.163Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for CalendarService configuration
 */
export interface CALENDARSERVICEConfigurationSchema {
  /**
   * Appointment calendar ID
   */
  appointment_calendar_id?: string;
  /**
   * Booking URL
   */
  booking_url?: string;
  /**
   * Enable embedding
   */
  embed_enabled?: boolean;
  /**
   * Embed height
   */
  embed_height?: number;
  /**
   * Time zone
   */
  time_zone?: string;
}
