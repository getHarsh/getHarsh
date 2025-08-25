/**
 * TypeScript definitions for PublisherConfig
 *
 * Generated from: PublisherConfig.schema.json
 * Generated on: 2025-08-16T20:49:14.065Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for PublisherConfig configuration
 */
export interface PUBLISHERCONFIGConfigurationSchema {
  /**
   * Publisher type ("Organization" or "Person")
   */
  type?: string;
  /**
   * Use domain entity as publisher
   */
  use_domain_entity?: boolean;
  /**
   * Include logo
   */
  include_logo?: boolean;
  /**
   * Publisher name override
   */
  name_override?: string;
}
