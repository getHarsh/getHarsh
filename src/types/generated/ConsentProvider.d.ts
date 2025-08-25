/**
 * TypeScript definitions for ConsentProvider
 *
 * Generated from: ConsentProvider.schema.json
 * Generated on: 2025-08-16T20:49:13.284Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * Provider type
 */
export type ProviderType = (string | number) &
  (
    | 'PROVIDER_TYPE_UNSPECIFIED'
    | 0
    | 'PROVIDER_TYPE_ANALYTICS'
    | 1
    | 'PROVIDER_TYPE_ADVERTISING'
    | 2
    | 'PROVIDER_TYPE_SOCIAL_MEDIA'
    | 3
    | 'PROVIDER_TYPE_FUNCTIONAL'
    | 4
    | 'PROVIDER_TYPE_SECURITY'
    | 5
  );

/**
 * JSON Schema for ConsentProvider configuration
 */
export interface CONSENTPROVIDERConfigurationSchema {
  /**
   * Provider name
   */
  name?: string;
  /**
   * Provider description
   */
  description?: string;
  /**
   * Privacy policy URL
   */
  privacy_url?: string;
  type?: ProviderType;
  /**
   * Purposes
   */
  purposes?: string[];
}
