/**
 * TypeScript definitions for VisualAccessibility
 *
 * Generated from: VisualAccessibility.schema.json
 * Generated on: 2025-08-16T20:49:14.262Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * Color filter types
 */
export type ColorFilterType = (string | number) &
  (
    | 'COLOR_FILTER_TYPE_UNSPECIFIED'
    | 0
    | 'COLOR_FILTER_TYPE_PROTANOPIA'
    | 1
    | 'COLOR_FILTER_TYPE_DEUTERANOPIA'
    | 2
    | 'COLOR_FILTER_TYPE_TRITANOPIA'
    | 3
    | 'COLOR_FILTER_TYPE_ACHROMATOPSIA'
    | 4
  );

/**
 * JSON Schema for VisualAccessibility configuration
 */
export interface VISUALACCESSIBILITYConfigurationSchema {
  contrast?: ColorContrast;
  scaling?: TextScaling;
  motion?: MotionSettings;
  images?: ImagesMedia;
  indicators?: VisualIndicators;
}
/**
 * Color contrast
 */
export interface ColorContrast {
  ratios?: ContrastRatios;
  high_contrast?: HighContrastMode;
  color_blind?: ColorBlindSupport;
  /**
   * Contrast checking
   */
  enable_checking?: boolean;
}
/**
 * Minimum contrast ratios
 */
export interface ContrastRatios {
  /**
   * Normal text (AA: 4.5:1)
   */
  normal_text?: number;
  /**
   * Large text (AA: 3:1)
   */
  large_text?: number;
  /**
   * UI components (3:1)
   */
  ui_components?: number;
  /**
   * Enhanced ratios (AAA)
   */
  use_enhanced?: boolean;
}
/**
 * High contrast mode
 */
export interface HighContrastMode {
  /**
   * Enable high contrast
   */
  enabled?: boolean;
  /**
   * Auto-detect system setting
   */
  auto_detect?: boolean;
  /**
   * Toggle button
   */
  show_toggle?: boolean;
  /**
   * Custom schemes
   */
  schemes?: ContrastScheme[];
}
/**
 * Contrast scheme
 */
export interface ContrastScheme {
  /**
   * Scheme name
   */
  name?: string;
  /**
   * Background color
   */
  background?: string;
  /**
   * Foreground color
   */
  foreground?: string;
  /**
   * Accent color
   */
  accent?: string;
}
/**
 * Color blind friendly
 */
export interface ColorBlindSupport {
  /**
   * Enable support
   */
  enabled?: boolean;
  /**
   * Safe color palette
   */
  use_safe_palette?: boolean;
  /**
   * Pattern alternatives
   */
  use_patterns?: boolean;
  /**
   * Color filters
   */
  filters?: ColorFilter[];
}
/**
 * Color filter
 */
export interface ColorFilter {
  /**
   * Filter name
   */
  name?: string;
  type?: ColorFilterType;
  /**
   * CSS filter
   */
  css_filter?: string;
}
/**
 * Text scaling
 */
export interface TextScaling {
  /**
   * Enable text scaling
   */
  enabled?: boolean;
  controls?: ScalingControls;
  /**
   * Responsive sizing
   */
  responsive_sizing?: boolean;
  /**
   * Line height scaling
   */
  scale_line_height?: boolean;
  /**
   * Maximum scale
   */
  max_scale?: number;
}
/**
 * Scaling controls
 */
export interface ScalingControls {
  /**
   * Show controls
   */
  show_controls?: boolean;
  /**
   * Control position
   */
  position?: string;
  /**
   * Scaling steps
   */
  steps?: number[];
  /**
   * Remember preference
   */
  remember?: boolean;
}
/**
 * Motion and animation
 */
export interface MotionSettings {
  /**
   * Respect prefers-reduced-motion
   */
  respect_preference?: boolean;
  controls?: AnimationControls;
  /**
   * Auto-play prevention
   */
  prevent_autoplay?: boolean;
  /**
   * Parallax effects
   */
  disable_parallax?: boolean;
  /**
   * Smooth scrolling
   */
  optional_smooth_scroll?: boolean;
}
/**
 * Animation controls
 */
export interface AnimationControls {
  /**
   * Pause animations
   */
  allow_pause?: boolean;
  /**
   * Animation speed
   */
  speed_control?: boolean;
  /**
   * Disable all animations
   */
  disable_option?: boolean;
}
/**
 * Images and media
 */
export interface ImagesMedia {
  alt_text?: AltTextRequirements;
  /**
   * Image descriptions
   */
  long_descriptions?: boolean;
  decorative?: DecorativeImages;
  complex?: ComplexImages;
}
/**
 * Alt text requirements
 */
export interface AltTextRequirements {
  /**
   * Require alt text
   */
  required?: boolean;
  /**
   * Minimum length
   */
  min_length?: number;
  /**
   * Maximum length
   */
  max_length?: number;
  /**
   * Quality checking
   */
  quality_check?: boolean;
  /**
   * Empty alt for decorative
   */
  empty_for_decorative?: boolean;
}
/**
 * Decorative images
 */
export interface DecorativeImages {
  /**
   * Mark as decorative
   */
  allow_marking?: boolean;
  /**
   * Auto-detect decorative
   */
  auto_detect?: boolean;
  /**
   * Hide from screen readers
   */
  hide_from_sr?: boolean;
}
/**
 * Complex images
 */
export interface ComplexImages {
  /**
   * Require descriptions
   */
  require_description?: boolean;
  /**
   * Description format
   */
  description_format?: string;
  /**
   * Link to description
   */
  link_to_description?: boolean;
}
/**
 * Visual indicators
 */
export interface VisualIndicators {
  loading?: LoadingIndicators;
  errors?: ErrorIndicators;
  success?: SuccessIndicators;
  progress?: ProgressIndicators;
}
/**
 * Loading indicators
 */
export interface LoadingIndicators {
  /**
   * Show loading state
   */
  show_loading?: boolean;
  /**
   * Loading text
   */
  loading_text?: string;
  /**
   * Spinner alternative
   */
  text_alternative?: boolean;
}
/**
 * Error indicators
 */
export interface ErrorIndicators {
  /**
   * Use icons with text
   */
  icons_with_text?: boolean;
  /**
   * Color coding only
   */
  avoid_color_only?: boolean;
  /**
   * Error patterns
   */
  use_patterns?: boolean;
}
/**
 * Success indicators
 */
export interface SuccessIndicators {
  /**
   * Success announcements
   */
  announce_success?: boolean;
  /**
   * Success patterns
   */
  use_patterns?: boolean;
}
/**
 * Progress indicators
 */
export interface ProgressIndicators {
  /**
   * Progress announcements
   */
  announce_progress?: boolean;
  /**
   * Text alternatives
   */
  text_alternatives?: boolean;
  /**
   * Determinate progress
   */
  show_percentage?: boolean;
}
