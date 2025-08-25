/**
 * TypeScript definitions for ProjectLifecycleDefaults
 *
 * Generated from: ProjectLifecycleDefaults.schema.json
 * Generated on: 2025-08-16T20:49:14.029Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for ProjectLifecycleDefaults configuration
 */
export interface PROJECTLIFECYCLEDEFAULTSConfigurationSchema {
  unspecified?: ProjectLifecycleMapping;
  emerge?: ProjectLifecycleMapping1;
  scale?: ProjectLifecycleMapping2;
  stagnate?: ProjectLifecycleMapping3;
  pivot?: ProjectLifecycleMapping4;
  accelerate?: ProjectLifecycleMapping5;
  maintain?: ProjectLifecycleMapping6;
  sunset?: ProjectLifecycleMapping7;
  archived?: ProjectLifecycleMapping8;
}
/**
 * PROJECT_LIFECYCLE_UNSPECIFIED  stage_name: "" description: "" typical_duration: "" next_stages: []
 */
export interface ProjectLifecycleMapping {
  /**
   * Lifecycle stage name
   */
  stage_name?: string;
  /**
   * Stage description
   */
  description?: string;
  /**
   * Typical duration
   */
  typical_duration?: string;
  /**
   * Next possible stages
   */
  next_stages?: string[];
}
/**
 * PROJECT_LIFECYCLE_EMERGE  stage_name: "Emerge" description: "New project emerging with initial ideas and exploration" typical_duration: "1-3 months" next_stages: ["scale", "pivot", "stagnate"]
 */
export interface ProjectLifecycleMapping1 {
  /**
   * Lifecycle stage name
   */
  stage_name?: string;
  /**
   * Stage description
   */
  description?: string;
  /**
   * Typical duration
   */
  typical_duration?: string;
  /**
   * Next possible stages
   */
  next_stages?: string[];
}
/**
 * PROJECT_LIFECYCLE_SCALE  stage_name: "Scale" description: "Growing and expanding project reach and features" typical_duration: "6-12 months" next_stages: ["accelerate", "maintain", "stagnate"]
 */
export interface ProjectLifecycleMapping2 {
  /**
   * Lifecycle stage name
   */
  stage_name?: string;
  /**
   * Stage description
   */
  description?: string;
  /**
   * Typical duration
   */
  typical_duration?: string;
  /**
   * Next possible stages
   */
  next_stages?: string[];
}
/**
 * PROJECT_LIFECYCLE_STAGNATE  stage_name: "Stagnate" description: "Development has slowed or paused" typical_duration: "Variable" next_stages: ["pivot", "accelerate", "sunset"]
 */
export interface ProjectLifecycleMapping3 {
  /**
   * Lifecycle stage name
   */
  stage_name?: string;
  /**
   * Stage description
   */
  description?: string;
  /**
   * Typical duration
   */
  typical_duration?: string;
  /**
   * Next possible stages
   */
  next_stages?: string[];
}
/**
 * PROJECT_LIFECYCLE_PIVOT  stage_name: "Pivot" description: "Changing direction or focus" typical_duration: "2-6 months" next_stages: ["emerge", "scale", "stagnate"]
 */
export interface ProjectLifecycleMapping4 {
  /**
   * Lifecycle stage name
   */
  stage_name?: string;
  /**
   * Stage description
   */
  description?: string;
  /**
   * Typical duration
   */
  typical_duration?: string;
  /**
   * Next possible stages
   */
  next_stages?: string[];
}
/**
 * PROJECT_LIFECYCLE_ACCELERATE  stage_name: "Accelerate" description: "Rapid growth and development phase" typical_duration: "3-6 months" next_stages: ["scale", "maintain", "stagnate"]
 */
export interface ProjectLifecycleMapping5 {
  /**
   * Lifecycle stage name
   */
  stage_name?: string;
  /**
   * Stage description
   */
  description?: string;
  /**
   * Typical duration
   */
  typical_duration?: string;
  /**
   * Next possible stages
   */
  next_stages?: string[];
}
/**
 * PROJECT_LIFECYCLE_MAINTAIN  stage_name: "Maintain" description: "Stable maintenance mode with occasional updates" typical_duration: "Ongoing" next_stages: ["accelerate", "sunset", "archived"]
 */
export interface ProjectLifecycleMapping6 {
  /**
   * Lifecycle stage name
   */
  stage_name?: string;
  /**
   * Stage description
   */
  description?: string;
  /**
   * Typical duration
   */
  typical_duration?: string;
  /**
   * Next possible stages
   */
  next_stages?: string[];
}
/**
 * PROJECT_LIFECYCLE_SUNSET  stage_name: "Sunset" description: "Winding down and preparing for archival" typical_duration: "1-3 months" next_stages: ["archived"]
 */
export interface ProjectLifecycleMapping7 {
  /**
   * Lifecycle stage name
   */
  stage_name?: string;
  /**
   * Stage description
   */
  description?: string;
  /**
   * Typical duration
   */
  typical_duration?: string;
  /**
   * Next possible stages
   */
  next_stages?: string[];
}
/**
 * PROJECT_LIFECYCLE_ARCHIVED  stage_name: "Archived" description: "No longer actively maintained" typical_duration: "Permanent" next_stages: []
 */
export interface ProjectLifecycleMapping8 {
  /**
   * Lifecycle stage name
   */
  stage_name?: string;
  /**
   * Stage description
   */
  description?: string;
  /**
   * Typical duration
   */
  typical_duration?: string;
  /**
   * Next possible stages
   */
  next_stages?: string[];
}
