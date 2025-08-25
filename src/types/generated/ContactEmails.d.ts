/**
 * TypeScript definitions for ContactEmails
 *
 * Generated from: ContactEmails.schema.json
 * Generated on: 2025-08-16T20:49:13.295Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for ContactEmails configuration
 */
export interface CONTACTEMAILSConfigurationSchema {
  /**
   * General information email - REQUIRED
   */
  info?: string;
  /**
   * Business proposals email - REQUIRED
   */
  proposal?: string;
  /**
   * Accounts/billing email - REQUIRED
   */
  accounts?: string;
  /**
   * Technical support email (optional)
   */
  support?: string;
  /**
   * Legal/compliance email (optional)
   */
  legal?: string;
  /**
   * Sponsorship/funding email (optional)
   */
  sponsorship?: string;
  /**
   * Media/press inquiries email (optional)
   */
  media?: string;
  /**
   * Partnership inquiries email (optional)
   */
  partnership?: string;
  /**
   * Careers/HR email (optional)
   */
  careers?: string;
  appointment_booking?: AppointmentSettings;
}
/**
 * Appointment booking settings Maps to Schema.org ScheduleAction
 */
export interface AppointmentSettings {
  /**
   * Enable appointment booking
   */
  enabled?: boolean;
  /**
   * Google Calendar ID for appointments
   */
  google_calendar_id?: string;
  /**
   * Public booking URL
   */
  booking_url?: string;
  /**
   * Time zone for appointments
   */
  time_zone?: string;
  /**
   * Available days of week (e.g., ["Monday", "Wednesday", "Friday"])
   */
  available_days?: string[];
  /**
   * Default appointment duration (ISO 8601, e.g., "PT30M")
   */
  default_duration?: string;
  /**
   * Minimum advance booking time (hours)
   */
  min_advance_hours?: number;
  /**
   * Maximum advance booking time (days)
   */
  max_advance_days?: number;
  /**
   * Buffer time between appointments (minutes)
   */
  buffer_minutes?: number;
  business_hours?: BusinessHours;
  /**
   * Appointment types available
   */
  appointment_types?: AppointmentType[];
  embed_settings?: CalendarEmbed;
}
/**
 * Business hours
 */
export interface BusinessHours {
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
/**
 * Appointment type configuration
 */
export interface AppointmentType {
  /**
   * Type name (e.g., "Consultation", "Technical Review")
   */
  name?: string;
  /**
   * Duration for this type (ISO 8601)
   */
  duration?: string;
  /**
   * Description
   */
  description?: string;
  /**
   * Price (if applicable)
   */
  price?: string;
  /**
   * Color for calendar display
   */
  color?: string;
}
/**
 * Calendar embed settings
 */
export interface CalendarEmbed {
  /**
   * Enable calendar embedding
   */
  enabled?: boolean;
  /**
   * Embed height in pixels
   */
  height?: number;
  /**
   * Embed width (percentage or pixels)
   */
  width?: string;
  /**
   * Show only free/busy
   */
  free_busy_only?: boolean;
  /**
   * Default view ("week", "month", "agenda")
   */
  default_view?: string;
}
