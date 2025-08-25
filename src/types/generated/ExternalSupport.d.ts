/**
 * TypeScript definitions for ExternalSupport
 *
 * Generated from: ExternalSupport.schema.json
 * Generated on: 2025-08-16T20:49:13.770Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * Support types for external entity support
 */
export type SupportType = (string | number) &
  (
    | 'SUPPORT_TYPE_UNSPECIFIED'
    | 0
    | 'SUPPORT_TYPE_FUNDING'
    | 1
    | 'SUPPORT_TYPE_INFRASTRUCTURE'
    | 2
    | 'SUPPORT_TYPE_ADVISORY'
    | 3
    | 'SUPPORT_TYPE_TECHNICAL'
    | 4
    | 'SUPPORT_TYPE_COMMUNITY'
    | 5
    | 'SUPPORT_TYPE_MARKETING'
    | 6
    | 'SUPPORT_TYPE_LEGAL'
    | 7
    | 'SUPPORT_TYPE_MENTORSHIP'
    | 8
    | 'SUPPORT_TYPE_RESOURCES'
    | 9
    | 'SUPPORT_TYPE_PARTNERSHIP'
    | 10
  );

/**
 * JSON Schema for ExternalSupport configuration
 */
export interface EXTERNALSUPPORTConfigurationSchema {
  /**
   * Entity key from organizations or legal_entities catalog
   */
  entity_key?: string;
  support_type?: SupportType;
  /**
   * Description of the support provided
   */
  description?: string;
  /**
   * Start date of support (ISO 8601)
   */
  start_date?: string;
  /**
   * End date of support (ISO 8601, omit if ongoing)
   */
  end_date?: string;
  /**
   * Whether support is currently active
   */
  is_active?: boolean;
  /**
   * Support value/amount (if applicable, e.g., "$10k", "100 GPU hours/month")
   */
  value?: string;
  /**
   * Additional metadata
   */
  metadata?: {
    [k: string]: string;
  };
}
