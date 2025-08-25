/**
 * TypeScript definitions for EntityPerson
 *
 * Generated from: EntityPerson.schema.json
 * Generated on: 2025-08-16T20:49:13.740Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for EntityPerson configuration
 */
export interface ENTITYPERSONConfigurationSchema {
  /**
   * Person's name
   */
  name?: string;
  /**
   * Role in the entity
   */
  role?: string;
  /**
   * Start date in role
   */
  start_date?: string;
  /**
   * End date (if applicable)
   */
  end_date?: string;
  /**
   * Person's Schema.org URL (if they have a domain)
   */
  person_url?: string;
}
