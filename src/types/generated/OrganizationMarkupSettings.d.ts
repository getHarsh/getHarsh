/**
 * TypeScript definitions for OrganizationMarkupSettings
 *
 * Generated from: OrganizationMarkupSettings.schema.json
 * Generated on: 2025-08-16T20:49:13.942Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for OrganizationMarkupSettings configuration
 */
export interface ORGANIZATIONMARKUPSETTINGSConfigurationSchema {
  /**
   * Use legal entity as organization
   */
  use_legal_entity?: boolean;
  /**
   * Include founders in organization markup
   */
  include_founders?: boolean;
  /**
   * Include all contact points
   */
  include_all_contacts?: boolean;
  /**
   * Include social profiles
   */
  include_social_profiles?: boolean;
  /**
   * Organization type override
   */
  organization_type?: string;
}
