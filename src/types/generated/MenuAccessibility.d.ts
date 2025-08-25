/**
 * TypeScript definitions for MenuAccessibility
 *
 * Generated from: MenuAccessibility.schema.json
 * Generated on: 2025-08-16T20:49:13.921Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for MenuAccessibility configuration
 */
export interface MENUACCESSIBILITYConfigurationSchema {
  /**
   * Keyboard navigation
   */
  keyboard_navigation?: boolean;
  structure?: MenuStructure;
  mobile?: MobileMenu;
  /**
   * Menu announcements
   */
  announce_changes?: boolean;
}
/**
 * Menu structure
 */
export interface MenuStructure {
  /**
   * Use proper roles
   */
  proper_roles?: boolean;
  /**
   * Nested menus
   */
  nested_indication?: boolean;
  /**
   * Current page
   */
  current_indication?: boolean;
}
/**
 * Mobile menu
 */
export interface MobileMenu {
  /**
   * Accessible toggle
   */
  accessible_toggle?: boolean;
  /**
   * Focus management
   */
  focus_management?: boolean;
  /**
   * Escape to close
   */
  escape_close?: boolean;
}
