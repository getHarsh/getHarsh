/**
 * TypeScript definitions for VisualIndicators
 *
 * Generated from: VisualIndicators.schema.json
 * Generated on: 2025-08-16T20:49:14.269Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for VisualIndicators configuration
 */
export interface VISUALINDICATORSConfigurationSchema {
  loading?: LoadingIndicators;
  errors?: ErrorIndicators;
  success?: SuccessIndicators;
  progress?: ProgressIndicators;
}
/**
 * Loading indicators
 */
export interface LoadingIndicators {
  /**
   * Show loading state
   */
  show_loading?: boolean;
  /**
   * Loading text
   */
  loading_text?: string;
  /**
   * Spinner alternative
   */
  text_alternative?: boolean;
}
/**
 * Error indicators
 */
export interface ErrorIndicators {
  /**
   * Use icons with text
   */
  icons_with_text?: boolean;
  /**
   * Color coding only
   */
  avoid_color_only?: boolean;
  /**
   * Error patterns
   */
  use_patterns?: boolean;
}
/**
 * Success indicators
 */
export interface SuccessIndicators {
  /**
   * Success announcements
   */
  announce_success?: boolean;
  /**
   * Success patterns
   */
  use_patterns?: boolean;
}
/**
 * Progress indicators
 */
export interface ProgressIndicators {
  /**
   * Progress announcements
   */
  announce_progress?: boolean;
  /**
   * Text alternatives
   */
  text_alternatives?: boolean;
  /**
   * Determinate progress
   */
  show_percentage?: boolean;
}
