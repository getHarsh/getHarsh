/**
 * TypeScript definitions for ProjectInfo
 *
 * Generated from: ProjectInfo.schema.json
 * Generated on: 2025-08-16T20:49:14.025Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * Project types for type-safe project categorization
 */
export type ProjectType = (string | number) &
  (
    | 'PROJECT_TYPE_UNSPECIFIED'
    | 0
    | 'PROJECT_TYPE_RESEARCH'
    | 1
    | 'PROJECT_TYPE_TOOL'
    | 2
    | 'PROJECT_TYPE_FRAMEWORK'
    | 3
    | 'PROJECT_TYPE_LIBRARY'
    | 4
    | 'PROJECT_TYPE_SERVICE'
    | 5
    | 'PROJECT_TYPE_APPLICATION'
    | 6
    | 'PROJECT_TYPE_PROTOCOL'
    | 7
    | 'PROJECT_TYPE_PLATFORM'
    | 8
    | 'PROJECT_TYPE_INFRASTRUCTURE'
    | 9
    | 'PROJECT_TYPE_EDUCATIONAL'
    | 10
    | 'PROJECT_TYPE_EXPERIMENTAL'
    | 11
  );
/**
 * Project development status (different from lifecycle) Maps to CreativeWork status properties in Schema.org
 */
export type ProjectDevelopmentStatus = (string | number) &
  (
    | 'PROJECT_STATUS_UNSPECIFIED'
    | 0
    | 'PROJECT_STATUS_CONCEPT'
    | 1
    | 'PROJECT_STATUS_ALPHA'
    | 2
    | 'PROJECT_STATUS_BETA'
    | 3
    | 'PROJECT_STATUS_STABLE'
    | 4
    | 'PROJECT_STATUS_DEPRECATED'
    | 5
    | 'PROJECT_STATUS_ARCHIVED'
    | 6
  );
/**
 * License types for projects and content Only supporting: MIT, Apache 2.0, GPL 3.0, Creative Commons with attribution, and Proprietary
 */
export type LicenseType = (string | number) &
  (
    | 'LICENSE_TYPE_UNSPECIFIED'
    | 0
    | 'LICENSE_TYPE_MIT'
    | 1
    | 'LICENSE_TYPE_APACHE_2_0'
    | 2
    | 'LICENSE_TYPE_GPL_3'
    | 3
    | 'LICENSE_TYPE_PROPRIETARY'
    | 4
    | 'LICENSE_TYPE_CC_BY_4_0'
    | 5
  );
/**
 * Project lifecycle stages based on ecosystem philosophy From what_is_getHarsh.md: emerge, scale, stagnate, pivot, accelerate
 */
export type ProjectLifecycle = (string | number) &
  (
    | 'PROJECT_LIFECYCLE_UNSPECIFIED'
    | 0
    | 'PROJECT_LIFECYCLE_EMERGE'
    | 1
    | 'PROJECT_LIFECYCLE_SCALE'
    | 2
    | 'PROJECT_LIFECYCLE_STAGNATE'
    | 3
    | 'PROJECT_LIFECYCLE_PIVOT'
    | 4
    | 'PROJECT_LIFECYCLE_ACCELERATE'
    | 5
    | 'PROJECT_LIFECYCLE_MAINTAIN'
    | 6
    | 'PROJECT_LIFECYCLE_SUNSET'
    | 7
    | 'PROJECT_LIFECYCLE_ARCHIVED'
    | 8
  );

/**
 * JSON Schema for ProjectInfo configuration
 */
export interface PROJECTINFOConfigurationSchema {
  /**
   * Project name (e.g., "HENA", "JARVIS") - REQUIRED
   */
  name?: string;
  type?: ProjectType;
  /**
   * Short description (one line) - REQUIRED
   */
  description?: string;
  /**
   * Detailed description (markdown supported)
   */
  detailed_description?: string;
  status?: ProjectDevelopmentStatus;
  /**
   * Start date (YYYY-MM-DD)
   */
  start_date?: string;
  /**
   * Version (if applicable)
   */
  version?: string;
  license?: LicenseType;
  /**
   * Primary tech stack (for display in project cards)
   */
  tech_stack?: string[];
  /**
   * Primary tools/platforms used
   */
  tools_stack?: string[];
  /**
   * Project aliases (other names/domains that refer to this project) These become Schema.org sameAs URLs Examples: ["jarvis-ai.com", "jarvis.dev", "projectjarvis.org"]
   */
  domain_aliases?: string[];
  lifecycle?: ProjectLifecycle;
}
