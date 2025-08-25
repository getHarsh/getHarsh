/**
 * TypeScript definitions for CopyrightSettings
 *
 * Generated from: CopyrightSettings.schema.json
 * Generated on: 2025-08-16T20:49:13.325Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for CopyrightSettings configuration
 */
export interface COPYRIGHTSETTINGSConfigurationSchema {
  /**
   * Copyright notice pattern (supports {year}, {entity} variables)
   */
  pattern?: string;
  /**
   * Starting year for copyright
   */
  start_year?: number;
}
