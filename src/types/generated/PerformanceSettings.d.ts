/**
 * TypeScript definitions for PerformanceSettings
 *
 * Generated from: PerformanceSettings.schema.json
 * Generated on: 2025-08-16T20:49:13.962Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for PerformanceSettings configuration
 */
export interface PERFORMANCESETTINGSConfigurationSchema {
  /**
   * Maximum page size in KB before warning  default: 500
   */
  max_page_size_kb?: number;
  /**
   * Target page load time in milliseconds  default: 3000
   */
  target_load_time_ms?: number;
  /**
   * Enable lazy loading for images and iframes
   */
  enable_lazy_loading?: boolean;
  /**
   * Enable automatic image optimization
   */
  enable_image_optimization?: boolean;
  /**
   * Preload critical resources
   */
  preload_resources?: string[];
  /**
   * Enable resource hints (dns-prefetch, preconnect)
   */
  enable_resource_hints?: boolean;
  /**
   * Critical CSS inline threshold in KB
   */
  critical_css_threshold_kb?: number;
}
