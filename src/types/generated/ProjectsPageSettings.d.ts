/**
 * TypeScript definitions for ProjectsPageSettings
 *
 * Generated from: ProjectsPageSettings.schema.json
 * Generated on: 2025-08-16T20:49:14.060Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for ProjectsPageSettings configuration
 */
export interface PROJECTSPAGESETTINGSConfigurationSchema {
  /**
   * Enable projects page
   */
  enabled?: boolean;
  /**
   * Display string for projects page links (default: "Highlights") This is how the projects page is referenced in navigation and CTAs
   */
  display_string?: string;
  /**
   * Layout style ("grid", "list", "showcase")
   */
  layout?: string;
  /**
   * Number of items per row (for grid layout)
   */
  items_per_row?: number;
  /**
   * Show tech stack on cards
   */
  show_tech_stack?: boolean;
  /**
   * Show project status
   */
  show_status?: boolean;
  /**
   * Show project description
   */
  show_description?: boolean;
  /**
   * Enable filtering by status/tech
   */
  enable_filtering?: boolean;
}
