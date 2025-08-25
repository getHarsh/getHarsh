/**
 * TypeScript definitions for MapsService
 *
 * Generated from: MapsService.schema.json
 * Generated on: 2025-08-16T20:49:13.913Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for MapsService configuration
 */
export interface MAPSSERVICEConfigurationSchema {
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
