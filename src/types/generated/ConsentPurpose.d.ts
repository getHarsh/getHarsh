/**
 * TypeScript definitions for ConsentPurpose
 *
 * Generated from: ConsentPurpose.schema.json
 * Generated on: 2025-08-16T20:49:13.285Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * Legal basis for processing
 */
export type LegalBasis = (string | number) &
  (
    | 'LEGAL_BASIS_UNSPECIFIED'
    | 0
    | 'LEGAL_BASIS_CONSENT'
    | 1
    | 'LEGAL_BASIS_LEGITIMATE_INTEREST'
    | 2
    | 'LEGAL_BASIS_CONTRACT'
    | 3
    | 'LEGAL_BASIS_LEGAL_OBLIGATION'
    | 4
    | 'LEGAL_BASIS_VITAL_INTERESTS'
    | 5
    | 'LEGAL_BASIS_PUBLIC_TASK'
    | 6
  );

/**
 * JSON Schema for ConsentPurpose configuration
 */
export interface CONSENTPURPOSEConfigurationSchema {
  /**
   * Purpose ID
   */
  id?: string;
  /**
   * Purpose name
   */
  name?: string;
  /**
   * Purpose description
   */
  description?: string;
  legal_basis?: LegalBasis;
}
