/**
 * TypeScript definitions for AffiliationTypeDefaults
 *
 * Generated from: AffiliationTypeDefaults.schema.json
 * Generated on: 2025-08-16T20:49:13.032Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for AffiliationTypeDefaults configuration
 */
export interface AFFILIATIONTYPEDEFAULTSConfigurationSchema {
  unspecified?: AffiliationTypeMapping;
  employee?: AffiliationTypeMapping1;
  founder?: AffiliationTypeMapping2;
  advisor?: AffiliationTypeMapping3;
  member?: AffiliationTypeMapping4;
  alumni?: AffiliationTypeMapping5;
  board_member?: AffiliationTypeMapping6;
  investor?: AffiliationTypeMapping7;
  consultant?: AffiliationTypeMapping8;
  volunteer?: AffiliationTypeMapping9;
  mentor?: AffiliationTypeMapping10;
  partner?: AffiliationTypeMapping11;
  contractor?: AffiliationTypeMapping12;
}
/**
 * AFFILIATION_TYPE_UNSPECIFIED  schema_role_type: "Role" additional_types: [] role_properties: {}
 */
export interface AffiliationTypeMapping {
  /**
   * Schema.org role type
   */
  schema_role_type?: string;
  /**
   * Additional type refinements
   */
  additional_types?: string[];
  /**
   * Role properties
   */
  role_properties?: {
    [k: string]: string;
  };
}
/**
 * AFFILIATION_EMPLOYEE  schema_role_type: "EmployeeRole" additional_types: ["OrganizationRole"] role_properties: { "roleName": "Employee", "@type": "EmployeeRole" }
 */
export interface AffiliationTypeMapping1 {
  /**
   * Schema.org role type
   */
  schema_role_type?: string;
  /**
   * Additional type refinements
   */
  additional_types?: string[];
  /**
   * Role properties
   */
  role_properties?: {
    [k: string]: string;
  };
}
/**
 * AFFILIATION_FOUNDER  schema_role_type: "OrganizationRole" additional_types: ["Role"] role_properties: { "roleName": "Founder", "@type": "OrganizationRole" } Note: Use with founder property on Organization
 */
export interface AffiliationTypeMapping2 {
  /**
   * Schema.org role type
   */
  schema_role_type?: string;
  /**
   * Additional type refinements
   */
  additional_types?: string[];
  /**
   * Role properties
   */
  role_properties?: {
    [k: string]: string;
  };
}
/**
 * AFFILIATION_ADVISOR  schema_role_type: "OrganizationRole" additional_types: ["Role"] role_properties: { "roleName": "Advisor", "@type": "OrganizationRole" }
 */
export interface AffiliationTypeMapping3 {
  /**
   * Schema.org role type
   */
  schema_role_type?: string;
  /**
   * Additional type refinements
   */
  additional_types?: string[];
  /**
   * Role properties
   */
  role_properties?: {
    [k: string]: string;
  };
}
/**
 * AFFILIATION_MEMBER  schema_role_type: "OrganizationRole" additional_types: ["Role"] role_properties: { "roleName": "Member", "@type": "OrganizationRole" } Note: Use with member/memberOf properties
 */
export interface AffiliationTypeMapping4 {
  /**
   * Schema.org role type
   */
  schema_role_type?: string;
  /**
   * Additional type refinements
   */
  additional_types?: string[];
  /**
   * Role properties
   */
  role_properties?: {
    [k: string]: string;
  };
}
/**
 * AFFILIATION_ALUMNI  schema_role_type: "OrganizationRole" additional_types: ["Role"] role_properties: { "roleName": "Alumni", "@type": "OrganizationRole" } Note: Use with alumniOf property
 */
export interface AffiliationTypeMapping5 {
  /**
   * Schema.org role type
   */
  schema_role_type?: string;
  /**
   * Additional type refinements
   */
  additional_types?: string[];
  /**
   * Role properties
   */
  role_properties?: {
    [k: string]: string;
  };
}
/**
 * AFFILIATION_BOARD_MEMBER  schema_role_type: "OrganizationRole" additional_types: ["Role"] role_properties: { "roleName": "Board Member", "@type": "OrganizationRole" }
 */
export interface AffiliationTypeMapping6 {
  /**
   * Schema.org role type
   */
  schema_role_type?: string;
  /**
   * Additional type refinements
   */
  additional_types?: string[];
  /**
   * Role properties
   */
  role_properties?: {
    [k: string]: string;
  };
}
/**
 * AFFILIATION_INVESTOR  schema_role_type: "OrganizationRole" additional_types: ["Role"] role_properties: { "roleName": "Investor", "@type": "OrganizationRole" } Note: Use with funder property when applicable
 */
export interface AffiliationTypeMapping7 {
  /**
   * Schema.org role type
   */
  schema_role_type?: string;
  /**
   * Additional type refinements
   */
  additional_types?: string[];
  /**
   * Role properties
   */
  role_properties?: {
    [k: string]: string;
  };
}
/**
 * AFFILIATION_CONSULTANT  schema_role_type: "OrganizationRole" additional_types: ["Role", "Service"] role_properties: { "roleName": "Consultant", "@type": "OrganizationRole" }
 */
export interface AffiliationTypeMapping8 {
  /**
   * Schema.org role type
   */
  schema_role_type?: string;
  /**
   * Additional type refinements
   */
  additional_types?: string[];
  /**
   * Role properties
   */
  role_properties?: {
    [k: string]: string;
  };
}
/**
 * AFFILIATION_VOLUNTEER  schema_role_type: "OrganizationRole" additional_types: ["Role"] role_properties: { "roleName": "Volunteer", "@type": "OrganizationRole" }
 */
export interface AffiliationTypeMapping9 {
  /**
   * Schema.org role type
   */
  schema_role_type?: string;
  /**
   * Additional type refinements
   */
  additional_types?: string[];
  /**
   * Role properties
   */
  role_properties?: {
    [k: string]: string;
  };
}
/**
 * AFFILIATION_MENTOR  schema_role_type: "OrganizationRole" additional_types: ["Role", "EducationalRole"] role_properties: { "roleName": "Mentor", "@type": "OrganizationRole" }
 */
export interface AffiliationTypeMapping10 {
  /**
   * Schema.org role type
   */
  schema_role_type?: string;
  /**
   * Additional type refinements
   */
  additional_types?: string[];
  /**
   * Role properties
   */
  role_properties?: {
    [k: string]: string;
  };
}
/**
 * AFFILIATION_PARTNER  schema_role_type: "OrganizationRole" additional_types: ["Role"] role_properties: { "roleName": "Partner", "@type": "OrganizationRole" }
 */
export interface AffiliationTypeMapping11 {
  /**
   * Schema.org role type
   */
  schema_role_type?: string;
  /**
   * Additional type refinements
   */
  additional_types?: string[];
  /**
   * Role properties
   */
  role_properties?: {
    [k: string]: string;
  };
}
/**
 * AFFILIATION_CONTRACTOR  schema_role_type: "OrganizationRole" additional_types: ["Role", "Service"] role_properties: { "roleName": "Contractor", "@type": "OrganizationRole" }
 */
export interface AffiliationTypeMapping12 {
  /**
   * Schema.org role type
   */
  schema_role_type?: string;
  /**
   * Additional type refinements
   */
  additional_types?: string[];
  /**
   * Role properties
   */
  role_properties?: {
    [k: string]: string;
  };
}
