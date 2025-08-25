/**
 * TypeScript definitions for ProjectLinks
 *
 * Generated from: ProjectLinks.schema.json
 * Generated on: 2025-08-16T20:49:14.032Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for ProjectLinks configuration
 */
export interface PROJECTLINKSConfigurationSchema {
  /**
   * Main repository URL - REQUIRED if open source
   */
  repository?: string;
  /**
   * Documentation URL (if separate from project site)
   */
  documentation?: string;
  /**
   * Live demo URL
   */
  demo?: string;
  /**
   * Download/releases URL
   */
  downloads?: string;
  /**
   * Issue tracker URL
   */
  issues?: string;
  /**
   * Discussion forum URL
   */
  discussions?: string;
  /**
   * Wiki URL
   */
  wiki?: string;
  /**
   * Custom links
   */
  custom?: {
    [k: string]: string;
  };
}
