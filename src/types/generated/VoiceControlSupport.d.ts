/**
 * TypeScript definitions for VoiceControlSupport
 *
 * Generated from: VoiceControlSupport.schema.json
 * Generated on: 2025-08-16T20:49:14.270Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for VoiceControlSupport configuration
 */
export interface VOICECONTROLSUPPORTConfigurationSchema {
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
