/**
 * TypeScript definitions for BannerBehavior
 *
 * Generated from: BannerBehavior.schema.json
 * Generated on: 2025-08-16T20:49:13.109Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for BannerBehavior configuration
 */
export interface BANNERBEHAVIORConfigurationSchema {
  /**
   * Auto-hide after accept
   */
  auto_hide?: boolean;
  /**
   * Remember dismiss action
   */
  remember_dismiss?: boolean;
  /**
   * Dismiss duration (days)
   */
  dismiss_duration_days?: number;
  /**
   * Re-show on policy update
   */
  reshow_on_update?: boolean;
  /**
   * Close on backdrop click
   */
  close_on_backdrop?: boolean;
  /**
   * Close on ESC key
   */
  close_on_escape?: boolean;
  /**
   * Focus trap in banner
   */
  focus_trap?: boolean;
}
