/**
 * TypeScript definitions for EndpointSettings
 *
 * Generated from: EndpointSettings.schema.json
 * Generated on: 2025-08-16T20:49:13.724Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for EndpointSettings configuration
 */
export interface ENDPOINTSETTINGSConfigurationSchema {
  /**
   * Include all endpoints
   */
  include_all?: boolean;
  /**
   * Group by resource
   */
  group_by_resource?: boolean;
  /**
   * Include deprecated
   */
  include_deprecated?: boolean;
  /**
   * Authentication info
   */
  include_auth?: boolean;
}
