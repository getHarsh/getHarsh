/**
 * TypeScript definitions for CommunityStatusDefaults
 *
 * Generated from: CommunityStatusDefaults.schema.json
 * Generated on: 2025-08-16T20:49:13.191Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for CommunityStatusDefaults configuration
 */
export interface COMMUNITYSTATUSDEFAULTSConfigurationSchema {
  unspecified?: CommunityStatusMapping;
  forming?: CommunityStatusMapping1;
  active?: CommunityStatusMapping2;
  inactive?: CommunityStatusMapping3;
  dissolved?: CommunityStatusMapping4;
  merged?: CommunityStatusMapping5;
}
/**
 * COMMUNITY_STATUS_UNSPECIFIED  status_name: "" dissolution_state: "" activity_level: ""
 */
export interface CommunityStatusMapping {
  /**
   * Status name
   */
  status_name?: string;
  /**
   * Organization dissolution state
   */
  dissolution_state?: string;
  /**
   * Activity level
   */
  activity_level?: string;
}
/**
 * COMMUNITY_STATUS_FORMING  status_name: "Forming" dissolution_state: "Active" activity_level: "Growing"
 */
export interface CommunityStatusMapping1 {
  /**
   * Status name
   */
  status_name?: string;
  /**
   * Organization dissolution state
   */
  dissolution_state?: string;
  /**
   * Activity level
   */
  activity_level?: string;
}
/**
 * COMMUNITY_STATUS_ACTIVE  status_name: "Active" dissolution_state: "Active" activity_level: "High"
 */
export interface CommunityStatusMapping2 {
  /**
   * Status name
   */
  status_name?: string;
  /**
   * Organization dissolution state
   */
  dissolution_state?: string;
  /**
   * Activity level
   */
  activity_level?: string;
}
/**
 * COMMUNITY_STATUS_INACTIVE  status_name: "Inactive" dissolution_state: "Suspended" activity_level: "Low"
 */
export interface CommunityStatusMapping3 {
  /**
   * Status name
   */
  status_name?: string;
  /**
   * Organization dissolution state
   */
  dissolution_state?: string;
  /**
   * Activity level
   */
  activity_level?: string;
}
/**
 * COMMUNITY_STATUS_DISSOLVED  status_name: "Dissolved" dissolution_state: "Dissolved" activity_level: "None"
 */
export interface CommunityStatusMapping4 {
  /**
   * Status name
   */
  status_name?: string;
  /**
   * Organization dissolution state
   */
  dissolution_state?: string;
  /**
   * Activity level
   */
  activity_level?: string;
}
/**
 * COMMUNITY_STATUS_MERGED  status_name: "Merged" dissolution_state: "Merged" activity_level: "Redirected"
 */
export interface CommunityStatusMapping5 {
  /**
   * Status name
   */
  status_name?: string;
  /**
   * Organization dissolution state
   */
  dissolution_state?: string;
  /**
   * Activity level
   */
  activity_level?: string;
}
