/**
 * TypeScript definitions for PolicyLinks
 *
 * Generated from: PolicyLinks.schema.json
 * Generated on: 2025-08-16T20:49:13.974Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for PolicyLinks configuration
 */
export interface POLICYLINKSConfigurationSchema {
  /**
   * Privacy policy URL
   */
  privacy_policy_url?: string;
  /**
   * Terms of service URL
   */
  terms_of_service_url?: string;
  /**
   * Cookie policy URL
   */
  cookie_policy_url?: string;
  /**
   * Terms of use URL
   */
  terms_of_use_url?: string;
  /**
   * Acceptable use policy URL
   */
  acceptable_use_policy_url?: string;
  /**
   * Data processing agreement URL
   */
  data_processing_agreement_url?: string;
  /**
   * Refund policy URL
   */
  refund_policy_url?: string;
  /**
   * Disclaimer URL
   */
  disclaimer_url?: string;
  /**
   * Additional policy links
   */
  additional_policies?: {
    [k: string]: string;
  };
}
