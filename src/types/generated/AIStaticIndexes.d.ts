/**
 * TypeScript definitions for AIStaticIndexes
 *
 * Generated from: AIStaticIndexes.schema.json
 * Generated on: 2025-08-16T20:49:12.817Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for AIStaticIndexes configuration
 */
export interface AISTATICINDEXESConfigurationSchema {
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
