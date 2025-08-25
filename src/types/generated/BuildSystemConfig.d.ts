/**
 * TypeScript definitions for BuildSystemConfig
 *
 * Generated from: BuildSystemConfig.schema.json
 * Generated on: 2025-08-16T20:49:13.153Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for BuildSystemConfig configuration
 */
export interface BUILDSYSTEMCONFIGConfigurationSchema {
  /**
   * Enable automatic JSON-LD generation
   */
  auto_generate_jsonld?: boolean;
  /**
   * Output directory for generated Schema.org files
   */
  output_directory?: string;
  validation?: ValidationConfig;
  /**
   * Transformation rules
   */
  transformation_rules?: TransformationRule[];
}
/**
 * Validation settings
 */
export interface ValidationConfig {
  /**
   * Validate against Schema.org vocabulary
   */
  validate_schema_org?: boolean;
  /**
   * Validate required properties
   */
  validate_required_properties?: boolean;
  /**
   * Fail build on validation errors
   */
  fail_on_error?: boolean;
  /**
   * Schema.org validator URL
   */
  validator_url?: string;
}
/**
 * Transformation rule for build system
 */
export interface TransformationRule {
  /**
   * Source enum type
   */
  enum_type?: string;
  /**
   * Target Schema.org context
   */
  target_context?: string;
  /**
   * Custom transformation function (if needed)
   */
  transform_function?: string;
  /**
   * Apply to specific fields only
   */
  apply_to_fields?: string[];
}
