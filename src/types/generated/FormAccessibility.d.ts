/**
 * TypeScript definitions for FormAccessibility
 *
 * Generated from: FormAccessibility.schema.json
 * Generated on: 2025-08-16T20:49:13.782Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for FormAccessibility configuration
 */
export interface FORMACCESSIBILITYConfigurationSchema {
  labels?: LabelRequirements;
  errors?: FormErrorHandling;
  grouping?: FieldGrouping;
  instructions?: FormInstructions;
  validation?: FormValidation;
}
/**
 * Label requirements
 */
export interface LabelRequirements {
  /**
   * Require labels
   */
  required?: boolean;
  /**
   * Visible labels
   */
  visible_labels?: boolean;
  /**
   * Placeholder as label
   */
  placeholder_not_label?: boolean;
  /**
   * Required field indication
   */
  required_indication?: string;
}
/**
 * Error handling
 */
export interface FormErrorHandling {
  /**
   * Inline errors
   */
  inline_errors?: boolean;
  /**
   * Error summary
   */
  error_summary?: boolean;
  /**
   * Field association
   */
  associate_errors?: boolean;
  /**
   * Success messages
   */
  success_messages?: boolean;
}
/**
 * Field grouping
 */
export interface FieldGrouping {
  /**
   * Use fieldsets
   */
  use_fieldsets?: boolean;
  /**
   * Group related fields
   */
  group_related?: boolean;
  /**
   * Legend requirement
   */
  require_legend?: boolean;
}
/**
 * Instructions
 */
export interface FormInstructions {
  /**
   * Provide instructions
   */
  provide_instructions?: boolean;
  /**
   * Associate with fields
   */
  associate_with_fields?: boolean;
  /**
   * Format requirements
   */
  format_hints?: boolean;
}
/**
 * Validation
 */
export interface FormValidation {
  /**
   * Client-side validation
   */
  client_validation?: boolean;
  /**
   * Real-time validation
   */
  realtime?: boolean;
  /**
   * Success indication
   */
  indicate_success?: boolean;
  messages?: ValidationMessages;
}
/**
 * Validation messages
 */
export interface ValidationMessages {
  /**
   * Custom messages
   */
  custom?: {
    [k: string]: string;
  };
  /**
   * Helpful messages
   */
  helpful_messages?: boolean;
  /**
   * Avoid technical jargon
   */
  avoid_jargon?: boolean;
}
