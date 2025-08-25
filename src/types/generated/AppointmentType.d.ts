/**
 * TypeScript definitions for AppointmentType
 *
 * Generated from: AppointmentType.schema.json
 * Generated on: 2025-08-16T20:49:13.052Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for AppointmentType configuration
 */
export interface APPOINTMENTTYPEConfigurationSchema {
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
