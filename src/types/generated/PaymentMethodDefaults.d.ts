/**
 * TypeScript definitions for PaymentMethodDefaults
 *
 * Generated from: PaymentMethodDefaults.schema.json
 * Generated on: 2025-08-16T20:49:13.958Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for PaymentMethodDefaults configuration
 */
export interface PAYMENTMETHODDEFAULTSConfigurationSchema {
  paypal?: PaymentMethodMapping;
  github_sponsors?: PaymentMethodMapping1;
  youtube_membership?: PaymentMethodMapping2;
  crypto?: PaymentMethodMapping3;
}
/**
 * PAYMENT_METHOD_PAYPAL  schema_type: "PaymentService" service_info: { name: "PayPal", url: "https://paypal.com", provider_type: "FinancialService" } accepted_actions: ["DonateAction", "PayAction"]
 */
export interface PaymentMethodMapping {
  /**
   * Schema.org type
   */
  schema_type?: string;
  service_info?: PaymentServiceInfo;
  /**
   * Accepted actions
   */
  accepted_actions?: string[];
}
/**
 * Payment service properties
 */
export interface PaymentServiceInfo {
  name?: string;
  url?: string;
  provider_type?: string;
  additional_properties?: {
    [k: string]: string;
  };
}
/**
 * PAYMENT_METHOD_GITHUB_SPONSORS  schema_type: "DonateAction" service_info: { name: "GitHub Sponsors", url: "https://github.com/sponsors" } additional_properties: { "fundingScheme": "FundingScheme" }
 */
export interface PaymentMethodMapping1 {
  /**
   * Schema.org type
   */
  schema_type?: string;
  service_info?: PaymentServiceInfo;
  /**
   * Accepted actions
   */
  accepted_actions?: string[];
}
/**
 * PAYMENT_METHOD_YOUTUBE_MEMBERSHIP  schema_type: "PaymentService" service_info: { name: "YouTube Channel Membership", provider_type: "Subscription" }
 */
export interface PaymentMethodMapping2 {
  /**
   * Schema.org type
   */
  schema_type?: string;
  service_info?: PaymentServiceInfo;
  /**
   * Accepted actions
   */
  accepted_actions?: string[];
}
/**
 * PAYMENT_METHOD_CRYPTO  schema_type: "PaymentMethod" additional_properties: { "paymentMethodType": "DigitalWallet" }
 */
export interface PaymentMethodMapping3 {
  /**
   * Schema.org type
   */
  schema_type?: string;
  service_info?: PaymentServiceInfo;
  /**
   * Accepted actions
   */
  accepted_actions?: string[];
}
