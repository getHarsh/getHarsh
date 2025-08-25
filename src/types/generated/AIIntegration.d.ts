/**
 * TypeScript definitions for AIIntegration
 *
 * Generated from: AIIntegration.schema.json
 * Generated on: 2025-08-16T20:49:12.808Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for AIIntegration configuration
 */
export interface AIINTEGRATIONConfigurationSchema {
  /**
   * LLMs.txt location (static file)
   */
  llms_txt_url?: string;
  /**
   * robots.txt location
   */
  robots_txt_url?: string;
  /**
   * Whether the site has AI-friendly structured data
   */
  ai_friendly_structured_data?: boolean;
  /**
   * Static data files available for AI consumption
   */
  structured_data_files?: string[];
  /**
   * Recommended crawl patterns
   */
  crawl_patterns?: string[];
  static_indexes?: AIStaticIndexes;
}
/**
 * Static indexes for AI processing
 */
export interface AIStaticIndexes {
  /**
   * Full content dump (e.g., /ai/content.json)
   */
  full_content?: string;
  /**
   * Post summaries with embeddings-friendly text (e.g., /ai/summaries.json)
   */
  summaries?: string;
  /**
   * Structured navigation (e.g., /ai/navigation.json)
   */
  navigation?: string;
  /**
   * Knowledge graph relationships (e.g., /ai/graph.json)
   */
  knowledge_graph?: string;
  /**
   * Q&A pairs if available (e.g., /ai/qa.json)
   */
  qa_pairs?: string;
}
