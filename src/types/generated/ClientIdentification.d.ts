/**
 * TypeScript definitions for ClientIdentification
 *
 * Generated from: ClientIdentification.schema.json
 * Generated on: 2025-08-16T20:49:13.167Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for ClientIdentification configuration
 */
export interface CLIENTIDENTIFICATIONConfigurationSchema {
  /**
   * Client ID cookie name
   */
  cookie_name?: string;
  /**
   * Generate if missing
   */
  generate_if_missing?: boolean;
  /**
   * Hash client ID
   */
  hash_client_id?: boolean;
}
