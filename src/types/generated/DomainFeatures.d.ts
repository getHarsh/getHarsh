/**
 * TypeScript definitions for DomainFeatures
 *
 * Generated from: DomainFeatures.schema.json
 * Generated on: 2025-08-16T20:49:13.649Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for DomainFeatures configuration
 */
export interface DOMAINFEATURESConfigurationSchema {
  /**
   * Enable portfolio/projects section
   */
  portfolio?: boolean;
  /**
   * Enable contact form
   */
  contact_form?: boolean;
  /**
   * Enable newsletter signup
   */
  newsletter?: boolean;
  /**
   * Enable services pages (requires config_services.yml)
   */
  services_enabled?: boolean;
  /**
   * Custom features specific to this domain
   */
  custom?: {
    [k: string]: boolean;
  };
}
