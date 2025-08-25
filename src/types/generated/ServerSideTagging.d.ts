/**
 * TypeScript definitions for ServerSideTagging
 *
 * Generated from: ServerSideTagging.schema.json
 * Generated on: 2025-08-16T20:49:14.151Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * Transport method for server-side
 */
export type TransportMethod = (string | number) &
  (
    | 'TRANSPORT_METHOD_UNSPECIFIED'
    | 0
    | 'TRANSPORT_METHOD_GTAG'
    | 1
    | 'TRANSPORT_METHOD_GTM'
    | 2
    | 'TRANSPORT_METHOD_CUSTOM'
    | 3
  );

/**
 * JSON Schema for ServerSideTagging configuration
 */
export interface SERVERSIDETAGGINGConfigurationSchema {
  /**
   * Enable server-side tagging
   */
  enabled?: boolean;
  /**
   * Server container URL
   */
  server_container_url?: string;
  transport?: TransportMethod;
  first_party?: FirstPartyConfig;
  client_id?: ClientIdentification;
}
/**
 * First-party collection
 */
export interface FirstPartyConfig {
  /**
   * Collection endpoint
   */
  endpoint?: string;
  /**
   * Custom headers
   */
  headers?: {
    [k: string]: string;
  };
  /**
   * Batch requests
   */
  batch_requests?: boolean;
  /**
   * Batch size
   */
  batch_size?: number;
}
/**
 * Client identification
 */
export interface ClientIdentification {
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
