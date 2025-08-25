/**
 * TypeScript definitions for AudioAccessibility
 *
 * Generated from: AudioAccessibility.schema.json
 * Generated on: 2025-08-16T20:49:13.091Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for AudioAccessibility configuration
 */
export interface AUDIOACCESSIBILITYConfigurationSchema {
  captions?: CaptionsSubtitles;
  descriptions?: AudioDescriptions;
  volume?: VolumeControls;
  transcripts?: Transcripts;
}
/**
 * Captions and subtitles
 */
export interface CaptionsSubtitles {
  /**
   * Provide captions
   */
  provide_captions?: boolean;
  /**
   * Auto-generate captions
   */
  auto_generate?: boolean;
  /**
   * Caption controls
   */
  show_controls?: boolean;
  /**
   * Multiple languages
   */
  multi_language?: boolean;
}
/**
 * Audio descriptions
 */
export interface AudioDescriptions {
  /**
   * Provide descriptions
   */
  provide_descriptions?: boolean;
  /**
   * Description track
   */
  separate_track?: boolean;
  /**
   * Inline descriptions
   */
  inline_descriptions?: boolean;
}
/**
 * Volume controls
 */
export interface VolumeControls {
  /**
   * Show volume controls
   */
  show_controls?: boolean;
  /**
   * Keyboard control
   */
  keyboard_control?: boolean;
  /**
   * Remember volume
   */
  remember_preference?: boolean;
}
/**
 * Transcripts
 */
export interface Transcripts {
  /**
   * Provide transcripts
   */
  provide_transcripts?: boolean;
  /**
   * Interactive transcripts
   */
  interactive?: boolean;
  /**
   * Download option
   */
  allow_download?: boolean;
}
