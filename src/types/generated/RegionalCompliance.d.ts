/**
 * TypeScript definitions for RegionalCompliance
 *
 * Generated from: RegionalCompliance.schema.json
 * Generated on: 2025-08-16T20:49:14.070Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * Compliance law
 */
export type ComplianceLaw = (
  | 'COMPLIANCE_LAW_UNSPECIFIED'
  | 0
  | 'COMPLIANCE_LAW_GDPR'
  | 1
  | 'COMPLIANCE_LAW_CCPA'
  | 2
  | 'COMPLIANCE_LAW_LGPD'
  | 3
  | 'COMPLIANCE_LAW_PIPEDA'
  | 4
  | 'COMPLIANCE_LAW_POPI'
  | 5
  | 'COMPLIANCE_LAW_PDPA'
  | 6
  | 'COMPLIANCE_LAW_DPA'
  | 7
)[];
/**
 * Prominence level
 */
export type ProminenceLevel = (string | number) &
  (
    | 'PROMINENCE_LEVEL_UNSPECIFIED'
    | 0
    | 'PROMINENCE_LEVEL_STANDARD'
    | 1
    | 'PROMINENCE_LEVEL_PROMINENT'
    | 2
    | 'PROMINENCE_LEVEL_VERY_PROMINENT'
    | 3
  );
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
 * JSON Schema for RegionalCompliance configuration
 */
export interface REGIONALCOMPLIANCEConfigurationSchema {
  /**
   * Region identifier
   */
  region?: string;
  laws?: ComplianceLaw;
  /**
   * Required disclosures
   */
  disclosures?: RequiredDisclosure[];
  age_restrictions?: AgeRestrictions;
  retention?: DataRetention;
  rights?: DataSubjectRights;
  /**
   * Special requirements
   */
  special_requirements?: {
    [k: string]: string;
  };
}
/**
 * Required disclosure
 */
export interface RequiredDisclosure {
  /**
   * Disclosure type
   */
  type?: string;
  /**
   * Disclosure text
   */
  text?: string;
  prominence?: ProminenceLevel;
  /**
   * Required location
   */
  location?: string;
}
/**
 * Age restrictions
 */
export interface AgeRestrictions {
  /**
   * Minimum age
   */
  minimum_age?: number;
  /**
   * Require age verification
   */
  require_verification?: boolean;
  /**
   * Parental consent age
   */
  parental_consent_age?: number;
  /**
   * Age verification method
   */
  verification_method?: string;
}
/**
 * Data retention
 */
export interface DataRetention {
  /**
   * Default retention period (days)
   */
  default_period_days?: number;
  /**
   * Category-specific retention
   */
  category_retention?: {
    [k: string]: number;
  };
  /**
   * Auto-delete enabled
   */
  auto_delete?: boolean;
  /**
   * Retention policy URL
   */
  policy_url?: string;
}
/**
 * Rights and requests
 */
export interface DataSubjectRights {
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
