/**
 * TypeScript definitions for ErrorPageContent
 *
 * Generated from: ErrorPageContent.schema.json
 * Generated on: 2025-08-16T20:49:13.753Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for ErrorPageContent configuration
 */
export interface ERRORPAGECONTENTConfigurationSchema {
  /**
   * Error code to message mapping
   */
  error_messages?: {
    [k: string]: ErrorMessage;
  };
  /**
   * Default error message template
   */
  default_template?: string;
  /**
   * Learn more URL suffix
   */
  learn_more_suffix?: string;
  /**
   * Enable quirky messages
   */
  enable_quirky_messages?: boolean;
  /**
   * Rotation strategy for multiple messages  "random", "sequential", "time-based"
   */
  rotation_strategy?: string;
  /**
   * Custom CTA buttons for error pages
   */
  cta_buttons?: ErrorPageCTA[];
}
/**
 * Individual error message configuration
 */
export interface ErrorMessage {
  /**
   * Error code (404, 500, etc.)
   */
  code?: number;
  /**
   * Primary message
   */
  message?: string;
  /**
   * Secondary/explanation text
   */
  explanation?: string;
  /**
   * Quirky variations
   */
  variations?: string[];
  /**
   * Custom image/illustration URL
   */
  image_url?: string;
  /**
   * Tone ("playful", "apologetic", "technical")
   */
  tone?: string;
}
/**
 * Error page CTA configuration
 */
export interface ErrorPageCTA {
  /**
   * Button text
   */
  text?: string;
  /**
   * Button URL
   */
  url?: string;
  /**
   * Button style ("primary", "secondary", "ghost")
   */
  style?: string;
  /**
   * Icon (optional)
   */
  icon?: string;
}
