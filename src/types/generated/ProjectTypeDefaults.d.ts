/**
 * TypeScript definitions for ProjectTypeDefaults
 *
 * Generated from: ProjectTypeDefaults.schema.json
 * Generated on: 2025-08-16T20:49:14.055Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for ProjectTypeDefaults configuration
 */
export interface PROJECTTYPEDEFAULTSConfigurationSchema {
  unspecified?: ProjectTypeMapping;
  research?: ProjectTypeMapping1;
  tool?: ProjectTypeMapping2;
  framework?: ProjectTypeMapping3;
  library?: ProjectTypeMapping4;
  service?: ProjectTypeMapping5;
  application?: ProjectTypeMapping6;
  protocol?: ProjectTypeMapping7;
  platform?: ProjectTypeMapping8;
  infrastructure?: ProjectTypeMapping9;
  educational?: ProjectTypeMapping10;
  experimental?: ProjectTypeMapping11;
}
/**
 * PROJECT_TYPE_UNSPECIFIED  schema_type: "Project" application_category: "" additional_types: [] properties: {}
 */
export interface ProjectTypeMapping {
  /**
   * Schema.org type (SoftwareApplication, Service, etc.)
   */
  schema_type?: string;
  /**
   * Application category
   */
  application_category?: string;
  /**
   * Additional types
   */
  additional_types?: string[];
  /**
   * Type-specific properties
   */
  properties?: {
    [k: string]: string;
  };
}
/**
 * PROJECT_TYPE_RESEARCH  schema_type: "ResearchProject" application_category: "Research" additional_types: ["CreativeWork", "ScholarlyArticle"] properties: { "@type": "ResearchProject", "studySubject": "Computer Science" }
 */
export interface ProjectTypeMapping1 {
  /**
   * Schema.org type (SoftwareApplication, Service, etc.)
   */
  schema_type?: string;
  /**
   * Application category
   */
  application_category?: string;
  /**
   * Additional types
   */
  additional_types?: string[];
  /**
   * Type-specific properties
   */
  properties?: {
    [k: string]: string;
  };
}
/**
 * PROJECT_TYPE_TOOL  schema_type: "SoftwareApplication" application_category: "DeveloperTools" additional_types: ["SoftwareSourceCode"] properties: { "@type": "SoftwareApplication", "applicationSubCategory": "Tool" }
 */
export interface ProjectTypeMapping2 {
  /**
   * Schema.org type (SoftwareApplication, Service, etc.)
   */
  schema_type?: string;
  /**
   * Application category
   */
  application_category?: string;
  /**
   * Additional types
   */
  additional_types?: string[];
  /**
   * Type-specific properties
   */
  properties?: {
    [k: string]: string;
  };
}
/**
 * PROJECT_TYPE_FRAMEWORK  schema_type: "SoftwareApplication" application_category: "Framework" additional_types: ["SoftwareSourceCode", "APIReference"] properties: { "@type": "SoftwareApplication", "applicationSubCategory": "Framework" }
 */
export interface ProjectTypeMapping3 {
  /**
   * Schema.org type (SoftwareApplication, Service, etc.)
   */
  schema_type?: string;
  /**
   * Application category
   */
  application_category?: string;
  /**
   * Additional types
   */
  additional_types?: string[];
  /**
   * Type-specific properties
   */
  properties?: {
    [k: string]: string;
  };
}
/**
 * PROJECT_TYPE_LIBRARY  schema_type: "SoftwareSourceCode" application_category: "Library" additional_types: ["CreativeWork"] properties: { "@type": "SoftwareSourceCode", "codeRepository": "{repo_url}" }
 */
export interface ProjectTypeMapping4 {
  /**
   * Schema.org type (SoftwareApplication, Service, etc.)
   */
  schema_type?: string;
  /**
   * Application category
   */
  application_category?: string;
  /**
   * Additional types
   */
  additional_types?: string[];
  /**
   * Type-specific properties
   */
  properties?: {
    [k: string]: string;
  };
}
/**
 * PROJECT_TYPE_SERVICE  schema_type: "WebApplication" application_category: "WebService" additional_types: ["Service", "SoftwareApplication"] properties: { "@type": "WebApplication", "serviceType": "SaaS" }
 */
export interface ProjectTypeMapping5 {
  /**
   * Schema.org type (SoftwareApplication, Service, etc.)
   */
  schema_type?: string;
  /**
   * Application category
   */
  application_category?: string;
  /**
   * Additional types
   */
  additional_types?: string[];
  /**
   * Type-specific properties
   */
  properties?: {
    [k: string]: string;
  };
}
/**
 * PROJECT_TYPE_APPLICATION  schema_type: "SoftwareApplication" application_category: "Application" additional_types: ["CreativeWork"] properties: { "@type": "SoftwareApplication" }
 */
export interface ProjectTypeMapping6 {
  /**
   * Schema.org type (SoftwareApplication, Service, etc.)
   */
  schema_type?: string;
  /**
   * Application category
   */
  application_category?: string;
  /**
   * Additional types
   */
  additional_types?: string[];
  /**
   * Type-specific properties
   */
  properties?: {
    [k: string]: string;
  };
}
/**
 * PROJECT_TYPE_PROTOCOL  schema_type: "TechArticle" application_category: "Protocol" additional_types: ["Specification", "CreativeWork"] properties: { "@type": "TechArticle", "about": "Protocol Specification" }
 */
export interface ProjectTypeMapping7 {
  /**
   * Schema.org type (SoftwareApplication, Service, etc.)
   */
  schema_type?: string;
  /**
   * Application category
   */
  application_category?: string;
  /**
   * Additional types
   */
  additional_types?: string[];
  /**
   * Type-specific properties
   */
  properties?: {
    [k: string]: string;
  };
}
/**
 * PROJECT_TYPE_PLATFORM  schema_type: "WebApplication" application_category: "Platform" additional_types: ["Service", "Organization"] properties: { "@type": "WebApplication", "applicationCategory": "Platform" }
 */
export interface ProjectTypeMapping8 {
  /**
   * Schema.org type (SoftwareApplication, Service, etc.)
   */
  schema_type?: string;
  /**
   * Application category
   */
  application_category?: string;
  /**
   * Additional types
   */
  additional_types?: string[];
  /**
   * Type-specific properties
   */
  properties?: {
    [k: string]: string;
  };
}
/**
 * PROJECT_TYPE_INFRASTRUCTURE  schema_type: "SoftwareApplication" application_category: "Infrastructure" additional_types: ["Service"] properties: { "@type": "SoftwareApplication", "applicationSubCategory": "Infrastructure" }
 */
export interface ProjectTypeMapping9 {
  /**
   * Schema.org type (SoftwareApplication, Service, etc.)
   */
  schema_type?: string;
  /**
   * Application category
   */
  application_category?: string;
  /**
   * Additional types
   */
  additional_types?: string[];
  /**
   * Type-specific properties
   */
  properties?: {
    [k: string]: string;
  };
}
/**
 * PROJECT_TYPE_EDUCATIONAL  schema_type: "Course" application_category: "Educational" additional_types: ["CreativeWork", "LearningResource"] properties: { "@type": "Course", "educationalUse": "Teaching" }
 */
export interface ProjectTypeMapping10 {
  /**
   * Schema.org type (SoftwareApplication, Service, etc.)
   */
  schema_type?: string;
  /**
   * Application category
   */
  application_category?: string;
  /**
   * Additional types
   */
  additional_types?: string[];
  /**
   * Type-specific properties
   */
  properties?: {
    [k: string]: string;
  };
}
/**
 * PROJECT_TYPE_EXPERIMENTAL  schema_type: "ResearchProject" application_category: "Experimental" additional_types: ["CreativeWork"] properties: { "@type": "ResearchProject", "status": "Experimental" }
 */
export interface ProjectTypeMapping11 {
  /**
   * Schema.org type (SoftwareApplication, Service, etc.)
   */
  schema_type?: string;
  /**
   * Application category
   */
  application_category?: string;
  /**
   * Additional types
   */
  additional_types?: string[];
  /**
   * Type-specific properties
   */
  properties?: {
    [k: string]: string;
  };
}
