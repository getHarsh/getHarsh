/**
 * TypeScript definitions for BannerDisplay
 *
 * Generated from: BannerDisplay.schema.json
 * Generated on: 2025-08-16T20:49:13.115Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * Banner position
 */
export type BannerPosition = (string | number) &
  (
    | 'BANNER_POSITION_UNSPECIFIED'
    | 0
    | 'BANNER_POSITION_TOP'
    | 1
    | 'BANNER_POSITION_BOTTOM'
    | 2
    | 'BANNER_POSITION_CENTER'
    | 3
    | 'BANNER_POSITION_TOP_LEFT'
    | 4
    | 'BANNER_POSITION_TOP_RIGHT'
    | 5
    | 'BANNER_POSITION_BOTTOM_LEFT'
    | 6
    | 'BANNER_POSITION_BOTTOM_RIGHT'
    | 7
  );

/**
 * JSON Schema for BannerDisplay configuration
 */
export interface BANNERDISPLAYConfigurationSchema {
  position?: BannerPosition;
  /**
   * Display on first visit
   */
  show_on_first_visit?: boolean;
  /**
   * Display delay (ms)
   */
  display_delay_ms?: number;
  /**
   * Z-index for layering
   */
  z_index?: number;
  /**
   * Show backdrop overlay
   */
  show_backdrop?: boolean;
  /**
   * Backdrop opacity (0-1)
   */
  backdrop_opacity?: number;
}
