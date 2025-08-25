/**
 * TypeScript definitions for GoogleServices
 *
 * Generated from: GoogleServices.schema.json
 * Generated on: 2025-08-16T20:49:13.848Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for GoogleServices configuration
 */
export interface GOOGLESERVICESConfigurationSchema {
  calendar?: CalendarService;
  drive?: DriveService;
  maps?: MapsService;
}
/**
 * Calendar service settings
 */
export interface CalendarService {
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
/**
 * Drive service settings
 */
export interface DriveService {
  /**
   * Enable Drive integration
   */
  enabled?: boolean;
  /**
   * Shared folder IDs
   */
  shared_folders?: string[];
  /**
   * Enable direct downloads
   */
  enable_direct_downloads?: boolean;
}
/**
 * Maps service settings (if needed)
 */
export interface MapsService {
  /**
   * Enable Maps integration
   */
  enabled?: boolean;
  /**
   * API key
   */
  api_key?: string;
  default_location?: Location;
}
/**
 * Default location
 */
export interface Location {
  /**
   * Latitude
   */
  latitude?: number;
  /**
   * Longitude
   */
  longitude?: number;
  /**
   * Address
   */
  address?: string;
}
