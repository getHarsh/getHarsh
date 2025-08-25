/**
 * TypeScript definitions for SupportTypeDefaults
 *
 * Generated from: SupportTypeDefaults.schema.json
 * Generated on: 2025-08-16T20:49:14.224Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for SupportTypeDefaults configuration
 */
export interface SUPPORTTYPEDEFAULTSConfigurationSchema {
  unspecified?: SupportTypeMapping;
  funding?: SupportTypeMapping1;
  infrastructure?: SupportTypeMapping2;
  advisory?: SupportTypeMapping3;
  technical?: SupportTypeMapping4;
  community?: SupportTypeMapping5;
  marketing?: SupportTypeMapping6;
  legal?: SupportTypeMapping7;
  mentorship?: SupportTypeMapping8;
  resources?: SupportTypeMapping9;
  partnership?: SupportTypeMapping10;
}
/**
 * SUPPORT_TYPE_UNSPECIFIED  schema_type: "Thing" funding_type: "" category: ""
 */
export interface SupportTypeMapping {
  /**
   * Schema.org type
   */
  schema_type?: string;
  /**
   * Funding type
   */
  funding_type?: string;
  /**
   * Support category
   */
  category?: string;
}
/**
 * SUPPORT_TYPE_FUNDING  schema_type: "MonetaryGrant" funding_type: "Financial" category: "Monetary"
 */
export interface SupportTypeMapping1 {
  /**
   * Schema.org type
   */
  schema_type?: string;
  /**
   * Funding type
   */
  funding_type?: string;
  /**
   * Support category
   */
  category?: string;
}
/**
 * SUPPORT_TYPE_INFRASTRUCTURE  schema_type: "Service" funding_type: "In-Kind" category: "Technical"
 */
export interface SupportTypeMapping2 {
  /**
   * Schema.org type
   */
  schema_type?: string;
  /**
   * Funding type
   */
  funding_type?: string;
  /**
   * Support category
   */
  category?: string;
}
/**
 * SUPPORT_TYPE_ADVISORY  schema_type: "ProfessionalService" funding_type: "In-Kind" category: "Expertise"
 */
export interface SupportTypeMapping3 {
  /**
   * Schema.org type
   */
  schema_type?: string;
  /**
   * Funding type
   */
  funding_type?: string;
  /**
   * Support category
   */
  category?: string;
}
/**
 * SUPPORT_TYPE_TECHNICAL  schema_type: "TechArticle" funding_type: "In-Kind" category: "Technical"
 */
export interface SupportTypeMapping4 {
  /**
   * Schema.org type
   */
  schema_type?: string;
  /**
   * Funding type
   */
  funding_type?: string;
  /**
   * Support category
   */
  category?: string;
}
/**
 * SUPPORT_TYPE_COMMUNITY  schema_type: "Organization" funding_type: "In-Kind" category: "Social"
 */
export interface SupportTypeMapping5 {
  /**
   * Schema.org type
   */
  schema_type?: string;
  /**
   * Funding type
   */
  funding_type?: string;
  /**
   * Support category
   */
  category?: string;
}
/**
 * SUPPORT_TYPE_MARKETING  schema_type: "MarketingCampaign" funding_type: "In-Kind" category: "Promotional"
 */
export interface SupportTypeMapping6 {
  /**
   * Schema.org type
   */
  schema_type?: string;
  /**
   * Funding type
   */
  funding_type?: string;
  /**
   * Support category
   */
  category?: string;
}
/**
 * SUPPORT_TYPE_LEGAL  schema_type: "LegalService" funding_type: "In-Kind" category: "Professional"
 */
export interface SupportTypeMapping7 {
  /**
   * Schema.org type
   */
  schema_type?: string;
  /**
   * Funding type
   */
  funding_type?: string;
  /**
   * Support category
   */
  category?: string;
}
/**
 * SUPPORT_TYPE_MENTORSHIP  schema_type: "EducationalOccupationalProgram" funding_type: "In-Kind" category: "Educational"
 */
export interface SupportTypeMapping8 {
  /**
   * Schema.org type
   */
  schema_type?: string;
  /**
   * Funding type
   */
  funding_type?: string;
  /**
   * Support category
   */
  category?: string;
}
/**
 * SUPPORT_TYPE_RESOURCES  schema_type: "Grant" funding_type: "In-Kind" category: "Material"
 */
export interface SupportTypeMapping9 {
  /**
   * Schema.org type
   */
  schema_type?: string;
  /**
   * Funding type
   */
  funding_type?: string;
  /**
   * Support category
   */
  category?: string;
}
/**
 * SUPPORT_TYPE_PARTNERSHIP  schema_type: "Organization" funding_type: "Strategic" category: "Collaborative"
 */
export interface SupportTypeMapping10 {
  /**
   * Schema.org type
   */
  schema_type?: string;
  /**
   * Funding type
   */
  funding_type?: string;
  /**
   * Support category
   */
  category?: string;
}
