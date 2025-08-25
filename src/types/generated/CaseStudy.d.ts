/**
 * TypeScript definitions for CaseStudy
 *
 * Generated from: CaseStudy.schema.json
 * Generated on: 2025-08-16T20:49:13.166Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for CaseStudy configuration
 */
export interface CASESTUDYConfigurationSchema {
  title?: string;
  client?: string;
  challenge?: string;
  solution?: string;
  outcome?: string;
  /**
   * e.g., "50% cost reduction"
   */
  metrics?: string[];
  testimonial?: string;
  logo_url?: string;
}
