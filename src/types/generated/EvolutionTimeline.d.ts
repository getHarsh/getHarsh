/**
 * TypeScript definitions for EvolutionTimeline
 *
 * Generated from: EvolutionTimeline.schema.json
 * Generated on: 2025-08-16T20:49:13.766Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for EvolutionTimeline configuration
 */
export interface EVOLUTIONTIMELINEConfigurationSchema {
  eras?: TimelineEra[];
}
export interface TimelineEra {
  /**
   * e.g., "2000s"
   */
  period?: string;
  /**
   * e.g., "SEO Era"
   */
  title?: string;
  description?: string;
  key_points?: string[];
  is_current?: boolean;
}
