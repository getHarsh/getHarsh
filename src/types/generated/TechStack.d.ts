/**
 * TypeScript definitions for TechStack
 *
 * Generated from: TechStack.schema.json
 * Generated on: 2025-08-16T20:49:14.234Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for TechStack configuration
 */
export interface TECHSTACKConfigurationSchema {
  /**
   * Primary language(s)
   */
  languages?: string[];
  /**
   * Frameworks used
   */
  frameworks?: string[];
  /**
   * Major dependencies
   */
  dependencies?: Dependency[];
  /**
   * Development tools
   */
  dev_tools?: string[];
  /**
   * Deployment/infrastructure
   */
  infrastructure?: string[];
}
/**
 * Dependency information
 */
export interface Dependency {
  /**
   * Dependency name
   */
  name?: string;
  /**
   * Version or version range
   */
  version?: string;
  /**
   * Purpose/description
   */
  purpose?: string;
  /**
   * Link to dependency
   */
  url?: string;
}
