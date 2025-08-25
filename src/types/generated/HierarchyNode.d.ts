/**
 * TypeScript definitions for HierarchyNode
 *
 * Generated from: HierarchyNode.schema.json
 * Generated on: 2025-08-16T20:49:13.850Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * Hierarchy node types
 */
export type NodeType = (string | number) &
  (
    | 'NODE_TYPE_UNSPECIFIED'
    | 0
    | 'NODE_TYPE_PAGE'
    | 1
    | 'NODE_TYPE_SECTION'
    | 2
    | 'NODE_TYPE_EXTERNAL'
    | 3
  );

/**
 * Hierarchy node (for complex sites)
 */
export interface HierarchyNode {
  /**
   * Node path
   */
  path?: string;
  /**
   * Node title
   */
  title?: string;
  type?: NodeType;
  /**
   * Child nodes
   */
  children?: HierarchyNode1[];
}
/**
 * Hierarchy node (for complex sites)
 */
export interface HierarchyNode1 {
  /**
   * Node path
   */
  path?: string;
  /**
   * Node title
   */
  title?: string;
  type?: NodeType;
  /**
   * Child nodes
   */
  children?: HierarchyNode1[];
}
