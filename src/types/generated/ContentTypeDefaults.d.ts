/**
 * TypeScript definitions for ContentTypeDefaults
 *
 * Generated from: ContentTypeDefaults.schema.json
 * Generated on: 2025-08-16T20:49:13.313Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for ContentTypeDefaults configuration
 */
export interface CONTENTTYPEDEFAULTSConfigurationSchema {
  article?: ContentTypeMapping;
  update?: ContentTypeMapping1;
  research?: ContentTypeMapping2;
  case_study?: ContentTypeMapping3;
  announcement?: ContentTypeMapping4;
}
/**
 * CONTENT_TYPE_ARTICLE  schema_type: "Article" required_properties: ["headline", "datePublished", "author"]
 */
export interface ContentTypeMapping {
  /**
   * Schema.org Article subtype
   */
  schema_type?: string;
  /**
   * Required properties for this content type
   */
  required_properties?: string[];
  word_count?: WordCountRange;
  /**
   * Default article section
   */
  default_section?: string;
}
/**
 * Typical word count range
 */
export interface WordCountRange {
  min?: number;
  max?: number;
}
/**
 * CONTENT_TYPE_UPDATE  schema_type: "NewsArticle" required_properties: ["headline", "datePublished", "dateline"] default_section: "Updates"
 */
export interface ContentTypeMapping1 {
  /**
   * Schema.org Article subtype
   */
  schema_type?: string;
  /**
   * Required properties for this content type
   */
  required_properties?: string[];
  word_count?: WordCountRange;
  /**
   * Default article section
   */
  default_section?: string;
}
/**
 * CONTENT_TYPE_RESEARCH  schema_type: "ScholarlyArticle" required_properties: ["headline", "datePublished", "author", "abstract"] word_count: { min: 2000, max: 10000 }
 */
export interface ContentTypeMapping2 {
  /**
   * Schema.org Article subtype
   */
  schema_type?: string;
  /**
   * Required properties for this content type
   */
  required_properties?: string[];
  word_count?: WordCountRange;
  /**
   * Default article section
   */
  default_section?: string;
}
/**
 * CONTENT_TYPE_CASE_STUDY  schema_type: "TechArticle" required_properties: ["headline", "datePublished", "author", "about"]
 */
export interface ContentTypeMapping3 {
  /**
   * Schema.org Article subtype
   */
  schema_type?: string;
  /**
   * Required properties for this content type
   */
  required_properties?: string[];
  word_count?: WordCountRange;
  /**
   * Default article section
   */
  default_section?: string;
}
/**
 * CONTENT_TYPE_ANNOUNCEMENT  schema_type: "NewsArticle" default_section: "Announcements"
 */
export interface ContentTypeMapping4 {
  /**
   * Schema.org Article subtype
   */
  schema_type?: string;
  /**
   * Required properties for this content type
   */
  required_properties?: string[];
  word_count?: WordCountRange;
  /**
   * Default article section
   */
  default_section?: string;
}
