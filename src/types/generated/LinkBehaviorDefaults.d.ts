/**
 * TypeScript definitions for LinkBehaviorDefaults
 *
 * Generated from: LinkBehaviorDefaults.schema.json
 * Generated on: 2025-08-16T20:49:13.890Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for LinkBehaviorDefaults configuration
 */
export interface LINKBEHAVIORDEFAULTSConfigurationSchema {
  unspecified?: LinkBehaviorMapping;
  new_tab?: LinkBehaviorMapping1;
  same_tab?: LinkBehaviorMapping2;
}
/**
 * LINK_BEHAVIOR_UNSPECIFIED  target: "" rel: "" security_attrs: {}
 */
export interface LinkBehaviorMapping {
  /**
   * Target attribute
   */
  target?: string;
  /**
   * Rel attribute
   */
  rel?: string;
  /**
   * Security attributes
   */
  security_attrs?: {
    [k: string]: string;
  };
}
/**
 * LINK_BEHAVIOR_NEW_TAB  target: "_blank" rel: "noopener noreferrer" security_attrs: { "data-external": "true" }
 */
export interface LinkBehaviorMapping1 {
  /**
   * Target attribute
   */
  target?: string;
  /**
   * Rel attribute
   */
  rel?: string;
  /**
   * Security attributes
   */
  security_attrs?: {
    [k: string]: string;
  };
}
/**
 * LINK_BEHAVIOR_SAME_TAB  target: "_self" rel: "" security_attrs: {}
 */
export interface LinkBehaviorMapping2 {
  /**
   * Target attribute
   */
  target?: string;
  /**
   * Rel attribute
   */
  rel?: string;
  /**
   * Security attributes
   */
  security_attrs?: {
    [k: string]: string;
  };
}
