/**
 * TypeScript definitions for SchemaOrgEntityTypeDefaults
 *
 * Generated from: SchemaOrgEntityTypeDefaults.schema.json
 * Generated on: 2025-08-16T20:49:14.111Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for SchemaOrgEntityTypeDefaults configuration
 */
export interface SCHEMAORGENTITYTYPEDEFAULTSConfigurationSchema {
  unspecified?: SchemaOrgEntityTypeMapping;
  person?: SchemaOrgEntityTypeMapping1;
  organization?: SchemaOrgEntityTypeMapping2;
  corporation?: SchemaOrgEntityTypeMapping3;
  local_business?: SchemaOrgEntityTypeMapping4;
  educational_organization?: SchemaOrgEntityTypeMapping5;
  research_organization?: SchemaOrgEntityTypeMapping6;
  consortium?: SchemaOrgEntityTypeMapping7;
  creative_work?: SchemaOrgEntityTypeMapping8;
  article?: SchemaOrgEntityTypeMapping9;
  blog_posting?: SchemaOrgEntityTypeMapping10;
  news_article?: SchemaOrgEntityTypeMapping11;
  scholarly_article?: SchemaOrgEntityTypeMapping12;
  tech_article?: SchemaOrgEntityTypeMapping13;
  software_application?: SchemaOrgEntityTypeMapping14;
  web_application?: SchemaOrgEntityTypeMapping15;
  mobile_application?: SchemaOrgEntityTypeMapping16;
  web_site?: SchemaOrgEntityTypeMapping17;
  blog?: SchemaOrgEntityTypeMapping18;
  research_project?: SchemaOrgEntityTypeMapping19;
  service?: SchemaOrgEntityTypeMapping20;
  collection_page?: SchemaOrgEntityTypeMapping21;
  about_page?: SchemaOrgEntityTypeMapping22;
  contact_page?: SchemaOrgEntityTypeMapping23;
  web_page?: SchemaOrgEntityTypeMapping24;
}
/**
 * SCHEMA_ORG_ENTITY_TYPE_UNSPECIFIED  type_url: "https://schema.org/Thing" parent_type: "" required_properties: ["@type"] recommended_properties: ["name", "description"]
 */
export interface SchemaOrgEntityTypeMapping {
  /**
   * Full Schema.org type URL
   */
  type_url?: string;
  /**
   * Parent type
   */
  parent_type?: string;
  /**
   * Required properties for this type
   */
  required_properties?: string[];
  /**
   * Recommended properties
   */
  recommended_properties?: string[];
}
/**
 * SCHEMA_ORG_PERSON  type_url: "https://schema.org/Person" parent_type: "Thing" required_properties: ["@type", "name"] recommended_properties: ["givenName", "familyName", "email", "jobTitle", "image"]
 */
export interface SchemaOrgEntityTypeMapping1 {
  /**
   * Full Schema.org type URL
   */
  type_url?: string;
  /**
   * Parent type
   */
  parent_type?: string;
  /**
   * Required properties for this type
   */
  required_properties?: string[];
  /**
   * Recommended properties
   */
  recommended_properties?: string[];
}
/**
 * SCHEMA_ORG_ORGANIZATION  type_url: "https://schema.org/Organization" parent_type: "Thing" required_properties: ["@type", "name"] recommended_properties: ["url", "logo", "description", "sameAs", "contactPoint"]
 */
export interface SchemaOrgEntityTypeMapping2 {
  /**
   * Full Schema.org type URL
   */
  type_url?: string;
  /**
   * Parent type
   */
  parent_type?: string;
  /**
   * Required properties for this type
   */
  required_properties?: string[];
  /**
   * Recommended properties
   */
  recommended_properties?: string[];
}
/**
 * SCHEMA_ORG_CORPORATION  type_url: "https://schema.org/Corporation" parent_type: "Organization" required_properties: ["@type", "name", "legalName"] recommended_properties: ["tickerSymbol", "taxID", "vatID"]
 */
export interface SchemaOrgEntityTypeMapping3 {
  /**
   * Full Schema.org type URL
   */
  type_url?: string;
  /**
   * Parent type
   */
  parent_type?: string;
  /**
   * Required properties for this type
   */
  required_properties?: string[];
  /**
   * Recommended properties
   */
  recommended_properties?: string[];
}
/**
 * SCHEMA_ORG_LOCAL_BUSINESS  type_url: "https://schema.org/LocalBusiness" parent_type: "Organization" required_properties: ["@type", "name", "address"] recommended_properties: ["telephone", "openingHours", "priceRange", "geo"]
 */
export interface SchemaOrgEntityTypeMapping4 {
  /**
   * Full Schema.org type URL
   */
  type_url?: string;
  /**
   * Parent type
   */
  parent_type?: string;
  /**
   * Required properties for this type
   */
  required_properties?: string[];
  /**
   * Recommended properties
   */
  recommended_properties?: string[];
}
/**
 * SCHEMA_ORG_EDUCATIONAL_ORGANIZATION  type_url: "https://schema.org/EducationalOrganization" parent_type: "Organization" required_properties: ["@type", "name"] recommended_properties: ["alumni", "accreditation", "areaServed"]
 */
export interface SchemaOrgEntityTypeMapping5 {
  /**
   * Full Schema.org type URL
   */
  type_url?: string;
  /**
   * Parent type
   */
  parent_type?: string;
  /**
   * Required properties for this type
   */
  required_properties?: string[];
  /**
   * Recommended properties
   */
  recommended_properties?: string[];
}
/**
 * SCHEMA_ORG_RESEARCH_ORGANIZATION  type_url: "https://schema.org/ResearchOrganization" parent_type: "Organization" required_properties: ["@type", "name"] recommended_properties: ["researchField", "fundingSource", "publication"]
 */
export interface SchemaOrgEntityTypeMapping6 {
  /**
   * Full Schema.org type URL
   */
  type_url?: string;
  /**
   * Parent type
   */
  parent_type?: string;
  /**
   * Required properties for this type
   */
  required_properties?: string[];
  /**
   * Recommended properties
   */
  recommended_properties?: string[];
}
/**
 * SCHEMA_ORG_CONSORTIUM  type_url: "https://schema.org/Consortium" parent_type: "Organization" required_properties: ["@type", "name", "member"] recommended_properties: ["foundingDate", "dissolutionDate"]
 */
export interface SchemaOrgEntityTypeMapping7 {
  /**
   * Full Schema.org type URL
   */
  type_url?: string;
  /**
   * Parent type
   */
  parent_type?: string;
  /**
   * Required properties for this type
   */
  required_properties?: string[];
  /**
   * Recommended properties
   */
  recommended_properties?: string[];
}
/**
 * SCHEMA_ORG_CREATIVE_WORK  type_url: "https://schema.org/CreativeWork" parent_type: "Thing" required_properties: ["@type", "name", "author"] recommended_properties: ["datePublished", "publisher", "license"]
 */
export interface SchemaOrgEntityTypeMapping8 {
  /**
   * Full Schema.org type URL
   */
  type_url?: string;
  /**
   * Parent type
   */
  parent_type?: string;
  /**
   * Required properties for this type
   */
  required_properties?: string[];
  /**
   * Recommended properties
   */
  recommended_properties?: string[];
}
/**
 * SCHEMA_ORG_ARTICLE  type_url: "https://schema.org/Article" parent_type: "CreativeWork" required_properties: ["@type", "headline", "author", "datePublished"] recommended_properties: ["articleBody", "articleSection", "wordCount"]
 */
export interface SchemaOrgEntityTypeMapping9 {
  /**
   * Full Schema.org type URL
   */
  type_url?: string;
  /**
   * Parent type
   */
  parent_type?: string;
  /**
   * Required properties for this type
   */
  required_properties?: string[];
  /**
   * Recommended properties
   */
  recommended_properties?: string[];
}
/**
 * SCHEMA_ORG_BLOG_POSTING  type_url: "https://schema.org/BlogPosting" parent_type: "Article" required_properties: ["@type", "headline", "author", "datePublished"] recommended_properties: ["blogPost", "articleBody", "keywords"]
 */
export interface SchemaOrgEntityTypeMapping10 {
  /**
   * Full Schema.org type URL
   */
  type_url?: string;
  /**
   * Parent type
   */
  parent_type?: string;
  /**
   * Required properties for this type
   */
  required_properties?: string[];
  /**
   * Recommended properties
   */
  recommended_properties?: string[];
}
/**
 * SCHEMA_ORG_NEWS_ARTICLE  type_url: "https://schema.org/NewsArticle" parent_type: "Article" required_properties: ["@type", "headline", "author", "datePublished", "dateline"] recommended_properties: ["articleSection", "printPage", "printEdition"]
 */
export interface SchemaOrgEntityTypeMapping11 {
  /**
   * Full Schema.org type URL
   */
  type_url?: string;
  /**
   * Parent type
   */
  parent_type?: string;
  /**
   * Required properties for this type
   */
  required_properties?: string[];
  /**
   * Recommended properties
   */
  recommended_properties?: string[];
}
/**
 * SCHEMA_ORG_SCHOLARLY_ARTICLE  type_url: "https://schema.org/ScholarlyArticle" parent_type: "Article" required_properties: ["@type", "headline", "author", "datePublished"] recommended_properties: ["abstract", "citation", "academicField"]
 */
export interface SchemaOrgEntityTypeMapping12 {
  /**
   * Full Schema.org type URL
   */
  type_url?: string;
  /**
   * Parent type
   */
  parent_type?: string;
  /**
   * Required properties for this type
   */
  required_properties?: string[];
  /**
   * Recommended properties
   */
  recommended_properties?: string[];
}
/**
 * SCHEMA_ORG_TECH_ARTICLE  type_url: "https://schema.org/TechArticle" parent_type: "Article" required_properties: ["@type", "headline", "author", "datePublished"] recommended_properties: ["proficiencyLevel", "dependencies", "techStack"]
 */
export interface SchemaOrgEntityTypeMapping13 {
  /**
   * Full Schema.org type URL
   */
  type_url?: string;
  /**
   * Parent type
   */
  parent_type?: string;
  /**
   * Required properties for this type
   */
  required_properties?: string[];
  /**
   * Recommended properties
   */
  recommended_properties?: string[];
}
/**
 * SCHEMA_ORG_SOFTWARE_APPLICATION  type_url: "https://schema.org/SoftwareApplication" parent_type: "CreativeWork" required_properties: ["@type", "name", "applicationCategory"] recommended_properties: ["operatingSystem", "softwareVersion", "downloadUrl"]
 */
export interface SchemaOrgEntityTypeMapping14 {
  /**
   * Full Schema.org type URL
   */
  type_url?: string;
  /**
   * Parent type
   */
  parent_type?: string;
  /**
   * Required properties for this type
   */
  required_properties?: string[];
  /**
   * Recommended properties
   */
  recommended_properties?: string[];
}
/**
 * SCHEMA_ORG_WEB_APPLICATION  type_url: "https://schema.org/WebApplication" parent_type: "SoftwareApplication" required_properties: ["@type", "name", "applicationCategory", "url"] recommended_properties: ["browserRequirements", "permissions"]
 */
export interface SchemaOrgEntityTypeMapping15 {
  /**
   * Full Schema.org type URL
   */
  type_url?: string;
  /**
   * Parent type
   */
  parent_type?: string;
  /**
   * Required properties for this type
   */
  required_properties?: string[];
  /**
   * Recommended properties
   */
  recommended_properties?: string[];
}
/**
 * SCHEMA_ORG_MOBILE_APPLICATION  type_url: "https://schema.org/MobileApplication" parent_type: "SoftwareApplication" required_properties: ["@type", "name", "applicationCategory", "operatingSystem"] recommended_properties: ["carrierRequirements", "permissions"]
 */
export interface SchemaOrgEntityTypeMapping16 {
  /**
   * Full Schema.org type URL
   */
  type_url?: string;
  /**
   * Parent type
   */
  parent_type?: string;
  /**
   * Required properties for this type
   */
  required_properties?: string[];
  /**
   * Recommended properties
   */
  recommended_properties?: string[];
}
/**
 * SCHEMA_ORG_WEB_SITE  type_url: "https://schema.org/WebSite" parent_type: "CreativeWork" required_properties: ["@type", "name", "url"] recommended_properties: ["potentialAction", "siteNavigationElement"]
 */
export interface SchemaOrgEntityTypeMapping17 {
  /**
   * Full Schema.org type URL
   */
  type_url?: string;
  /**
   * Parent type
   */
  parent_type?: string;
  /**
   * Required properties for this type
   */
  required_properties?: string[];
  /**
   * Recommended properties
   */
  recommended_properties?: string[];
}
/**
 * SCHEMA_ORG_BLOG  type_url: "https://schema.org/Blog" parent_type: "CreativeWork" required_properties: ["@type", "name", "url", "blogPost"] recommended_properties: ["author", "issn", "about"]
 */
export interface SchemaOrgEntityTypeMapping18 {
  /**
   * Full Schema.org type URL
   */
  type_url?: string;
  /**
   * Parent type
   */
  parent_type?: string;
  /**
   * Required properties for this type
   */
  required_properties?: string[];
  /**
   * Recommended properties
   */
  recommended_properties?: string[];
}
/**
 * SCHEMA_ORG_RESEARCH_PROJECT  type_url: "https://schema.org/ResearchProject" parent_type: "Project" required_properties: ["@type", "name", "researcher"] recommended_properties: ["fundingScheme", "researchOutput", "studySubject"]
 */
export interface SchemaOrgEntityTypeMapping19 {
  /**
   * Full Schema.org type URL
   */
  type_url?: string;
  /**
   * Parent type
   */
  parent_type?: string;
  /**
   * Required properties for this type
   */
  required_properties?: string[];
  /**
   * Recommended properties
   */
  recommended_properties?: string[];
}
/**
 * SCHEMA_ORG_SERVICE  type_url: "https://schema.org/Service" parent_type: "Intangible" required_properties: ["@type", "name", "provider"] recommended_properties: ["serviceType", "areaServed", "availableChannel"]
 */
export interface SchemaOrgEntityTypeMapping20 {
  /**
   * Full Schema.org type URL
   */
  type_url?: string;
  /**
   * Parent type
   */
  parent_type?: string;
  /**
   * Required properties for this type
   */
  required_properties?: string[];
  /**
   * Recommended properties
   */
  recommended_properties?: string[];
}
/**
 * SCHEMA_ORG_COLLECTION_PAGE  type_url: "https://schema.org/CollectionPage" parent_type: "WebPage" required_properties: ["@type", "name", "url", "mainEntity"] recommended_properties: ["hasPart", "numberOfItems"]
 */
export interface SchemaOrgEntityTypeMapping21 {
  /**
   * Full Schema.org type URL
   */
  type_url?: string;
  /**
   * Parent type
   */
  parent_type?: string;
  /**
   * Required properties for this type
   */
  required_properties?: string[];
  /**
   * Recommended properties
   */
  recommended_properties?: string[];
}
/**
 * SCHEMA_ORG_ABOUT_PAGE  type_url: "https://schema.org/AboutPage" parent_type: "WebPage" required_properties: ["@type", "name", "url", "about"] recommended_properties: ["mainEntity"]
 */
export interface SchemaOrgEntityTypeMapping22 {
  /**
   * Full Schema.org type URL
   */
  type_url?: string;
  /**
   * Parent type
   */
  parent_type?: string;
  /**
   * Required properties for this type
   */
  required_properties?: string[];
  /**
   * Recommended properties
   */
  recommended_properties?: string[];
}
/**
 * SCHEMA_ORG_CONTACT_PAGE  type_url: "https://schema.org/ContactPage" parent_type: "WebPage" required_properties: ["@type", "name", "url"] recommended_properties: ["contactPoint", "mainEntity"]
 */
export interface SchemaOrgEntityTypeMapping23 {
  /**
   * Full Schema.org type URL
   */
  type_url?: string;
  /**
   * Parent type
   */
  parent_type?: string;
  /**
   * Required properties for this type
   */
  required_properties?: string[];
  /**
   * Recommended properties
   */
  recommended_properties?: string[];
}
/**
 * SCHEMA_ORG_WEB_PAGE  type_url: "https://schema.org/WebPage" parent_type: "CreativeWork" required_properties: ["@type", "name", "url"] recommended_properties: ["datePublished", "dateModified", "author"]
 */
export interface SchemaOrgEntityTypeMapping24 {
  /**
   * Full Schema.org type URL
   */
  type_url?: string;
  /**
   * Parent type
   */
  parent_type?: string;
  /**
   * Required properties for this type
   */
  required_properties?: string[];
  /**
   * Recommended properties
   */
  recommended_properties?: string[];
}
