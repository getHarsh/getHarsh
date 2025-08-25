/**
 * TypeScript definitions for AssistiveTechnology
 *
 * Generated from: AssistiveTechnology.schema.json
 * Generated on: 2025-08-16T20:49:13.089Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for AssistiveTechnology configuration
 */
export interface ASSISTIVETECHNOLOGYConfigurationSchema {
  screen_readers?: ScreenReaderSupport;
  voice_control?: VoiceControlSupport;
  switch_devices?: SwitchDeviceSupport;
  magnification?: MagnificationSupport;
}
/**
 * Screen reader optimization
 */
export interface ScreenReaderSupport {
  /**
   * Optimize for screen readers
   */
  optimize?: boolean;
  /**
   * Tested screen readers
   */
  tested_with?: string[];
  announcements?: ScreenReaderAnnouncements;
  /**
   * Virtual cursor support
   */
  virtual_cursor?: boolean;
}
/**
 * Announcements
 */
export interface ScreenReaderAnnouncements {
  /**
   * Dynamic content
   */
  announce_dynamic?: boolean;
  /**
   * State changes
   */
  announce_states?: boolean;
  /**
   * Page changes
   */
  announce_pages?: boolean;
  /**
   * Custom announcements
   */
  custom?: {
    [k: string]: string;
  };
}
/**
 * Voice control support
 */
export interface VoiceControlSupport {
  /**
   * Voice navigation
   */
  voice_navigation?: boolean;
  /**
   * Voice commands
   */
  commands?: VoiceCommand[];
  /**
   * Number overlays
   */
  number_overlays?: boolean;
}
/**
 * Voice command
 */
export interface VoiceCommand {
  /**
   * Command phrase
   */
  phrase?: string;
  /**
   * Action
   */
  action?: string;
  /**
   * Context
   */
  context?: string;
}
/**
 * Switch device support
 */
export interface SwitchDeviceSupport {
  /**
   * Switch scanning
   */
  switch_scanning?: boolean;
  /**
   * Scanning speed
   */
  scan_speed_ms?: number;
  /**
   * Scanning patterns
   */
  patterns?: string[];
}
/**
 * Magnification support
 */
export interface MagnificationSupport {
  /**
   * Reflow content
   */
  reflow_content?: boolean;
  /**
   * High resolution images
   */
  high_res_images?: boolean;
  /**
   * Avoid horizontal scroll
   */
  avoid_horizontal?: boolean;
}
