/**
 * TypeScript definitions for EntityConsent
 *
 * Generated from: EntityConsent.schema.json
 * Generated on: 2025-08-16T20:49:13.728Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * Provider type
 */
export type ProviderType = (string | number) &
  (
    | 'PROVIDER_TYPE_UNSPECIFIED'
    | 0
    | 'PROVIDER_TYPE_ANALYTICS'
    | 1
    | 'PROVIDER_TYPE_ADVERTISING'
    | 2
    | 'PROVIDER_TYPE_SOCIAL_MEDIA'
    | 3
    | 'PROVIDER_TYPE_FUNCTIONAL'
    | 4
    | 'PROVIDER_TYPE_SECURITY'
    | 5
  );
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
 * Cookie type
 */
export type CookieType = (string | number) &
  (
    | 'COOKIE_TYPE_UNSPECIFIED'
    | 0
    | 'COOKIE_TYPE_FIRST_PARTY'
    | 1
    | 'COOKIE_TYPE_THIRD_PARTY'
    | 2
    | 'COOKIE_TYPE_SESSION'
    | 3
    | 'COOKIE_TYPE_PERSISTENT'
    | 4
  );
/**
 * Storage type
 */
export type StorageType = (
  | 'STORAGE_TYPE_UNSPECIFIED'
  | 0
  | 'STORAGE_TYPE_COOKIE'
  | 1
  | 'STORAGE_TYPE_LOCAL_STORAGE'
  | 2
  | 'STORAGE_TYPE_SESSION_STORAGE'
  | 3
  | 'STORAGE_TYPE_INDEXED_DB'
  | 4
  | 'STORAGE_TYPE_CACHE'
  | 5
)[];

/**
 * JSON Schema for EntityConsent configuration
 */
export interface ENTITYCONSENTConfigurationSchema {
  /**
   * Entity name (RTEPL, DSPL)
   */
  entity_name?: string;
  legal_info?: LegalEntity;
  contacts?: PrivacyContacts;
  text_overrides?: TextOverrides;
  /**
   * Entity-specific categories
   */
  entity_categories?: ConsentCategory[];
  /**
   * Jurisdiction
   */
  jurisdiction?: string;
  /**
   * Special compliance requirements
   */
  compliance_requirements?: {
    [k: string]: string;
  };
}
/**
 * Legal entity information
 */
export interface LegalEntity {
  /**
   * Full legal name
   */
  full_name?: string;
  /**
   * Registration number
   */
  registration_number?: string;
  /**
   * Registered address
   */
  registered_address?: string;
  /**
   * Data controller
   */
  is_data_controller?: boolean;
  /**
   * Data processor
   */
  is_data_processor?: boolean;
  /**
   * Joint controller
   */
  joint_controller?: string;
}
/**
 * Privacy contacts
 */
export interface PrivacyContacts {
  /**
   * Privacy email
   */
  privacy_email?: string;
  /**
   * DPO email
   */
  dpo_email?: string;
  /**
   * Privacy phone
   */
  privacy_phone?: string;
  /**
   * Privacy address
   */
  privacy_address?: string;
  /**
   * Support URL
   */
  support_url?: string;
}
/**
 * Entity-specific text overrides
 */
export interface TextOverrides {
  /**
   * Banner text override
   */
  banner_text?: string;
  /**
   * Privacy policy URL
   */
  privacy_url?: string;
  /**
   * Cookie policy URL
   */
  cookie_url?: string;
  /**
   * Terms URL
   */
  terms_url?: string;
  /**
   * Custom text replacements
   */
  replacements?: {
    [k: string]: string;
  };
}
/**
 * Consent category configuration
 */
export interface ConsentCategory {
  /**
   * Category ID
   */
  id?: string;
  /**
   * Category name
   */
  name?: string;
  /**
   * Category description
   */
  description?: string;
  /**
   * Required category
   */
  required?: boolean;
  /**
   * Pre-selected by default
   */
  pre_selected?: boolean;
  /**
   * Linked categories (auto-enable)
   */
  linked_categories?: string[];
  /**
   * Providers/vendors
   */
  providers?: ConsentProvider[];
  /**
   * Purposes
   */
  purposes?: ConsentPurpose[];
  /**
   * Cookies used
   */
  cookies?: CookieInfo[];
  storage_types?: StorageType;
  /**
   * Category icon
   */
  icon?: string;
}
/**
 * Consent provider/vendor
 */
export interface ConsentProvider {
  /**
   * Provider name
   */
  name?: string;
  /**
   * Provider description
   */
  description?: string;
  /**
   * Privacy policy URL
   */
  privacy_url?: string;
  type?: ProviderType;
  /**
   * Purposes
   */
  purposes?: string[];
}
/**
 * Consent purpose
 */
export interface ConsentPurpose {
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
/**
 * Cookie information
 */
export interface CookieInfo {
  /**
   * Cookie name
   */
  name?: string;
  /**
   * Cookie domain
   */
  domain?: string;
  /**
   * Cookie path
   */
  path?: string;
  /**
   * Expiry time
   */
  expiry?: string;
  type?: CookieType;
  /**
   * Cookie description
   */
  description?: string;
}
