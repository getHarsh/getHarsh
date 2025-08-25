/**
 * TypeScript definitions for EnvironmentVar
 *
 * Generated from: EnvironmentVar.schema.json
 * Generated on: 2025-08-16T20:49:13.749Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * Security classification for environment variables
 */
export type SecurityLevel = (string | number) & ('PUBLIC' | 0 | 'SENSITIVE' | 1 | 'SECRET' | 2);
/**
 * How to redact sensitive values before publishing
 */
export type RedactionStrategy = (string | number) &
  ('NONE' | 0 | 'PARTIAL' | 1 | 'REMOVE' | 2 | 'PLACEHOLDER' | 3);

/**
 * JSON Schema for EnvironmentVar configuration
 */
export interface ENVIRONMENTVARConfigurationSchema {
  /**
   * Description of what this variable is for
   */
  description?: string;
  /**
   * Whether this variable is required
   */
  required?: boolean;
  /**
   * Default value if not set (optional)
   */
  default_value?: string;
  /**
   * Example value for documentation
   */
  example?: string;
  security_level?: SecurityLevel;
  redaction_strategy?: RedactionStrategy;
}
