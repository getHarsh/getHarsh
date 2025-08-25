/**
 * TypeScript definitions for DataSubjectRights
 *
 * Generated from: DataSubjectRights.schema.json
 * Generated on: 2025-08-16T20:49:13.355Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * Data rights
 */
export type DataRight = (
  | 'DATA_RIGHT_UNSPECIFIED'
  | 0
  | 'DATA_RIGHT_ACCESS'
  | 1
  | 'DATA_RIGHT_RECTIFICATION'
  | 2
  | 'DATA_RIGHT_ERASURE'
  | 3
  | 'DATA_RIGHT_PORTABILITY'
  | 4
  | 'DATA_RIGHT_RESTRICTION'
  | 5
  | 'DATA_RIGHT_OBJECTION'
  | 6
  | 'DATA_RIGHT_AUTOMATED_DECISION'
  | 7
)[];

/**
 * JSON Schema for DataSubjectRights configuration
 */
export interface DATASUBJECTRIGHTSConfigurationSchema {
  /**
   * Enable rights portal
   */
  enable_portal?: boolean;
  /**
   * Portal URL
   */
  portal_url?: string;
  supported_rights?: DataRight;
  /**
   * Response time (days)
   */
  response_time_days?: number;
  /**
   * Verification required
   */
  verification_required?: boolean;
}
