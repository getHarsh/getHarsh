/**
 * TypeScript definitions for SearchEngineTools
 *
 * Generated from: SearchEngineTools.schema.json
 * Generated on: 2025-08-16T20:49:14.140Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for SearchEngineTools configuration
 */
export interface SEARCHENGINETOOLSConfigurationSchema {
  google_search_console?: GoogleSearchConsole;
  bing_webmaster_tools?: BingWebmasterTools;
  ai_search_optimization?: AISearchOptimization;
}
/**
 * Google Search Console settings
 */
export interface GoogleSearchConsole {
  /**
   * Site verification HTML tag content
   */
  site_verification?: string;
  /**
   * Auto-submit sitemap on build
   */
  auto_submit_sitemap?: boolean;
  /**
   * Enable Index API for instant indexing
   */
  enable_indexing_api?: boolean;
  /**
   * Service account JSON key path (for API)
   */
  service_account_key?: string;
}
/**
 * Bing Webmaster Tools settings
 */
export interface BingWebmasterTools {
  /**
   * Site verification HTML tag content
   */
  site_verification?: string;
  /**
   * Auto-submit sitemap on build
   */
  auto_submit_sitemap?: boolean;
  /**
   * Enable Clarity integration
   */
  enable_clarity_integration?: boolean;
  /**
   * API key for programmatic access
   */
  api_key?: string;
}
/**
 * AI search optimization settings
 */
export interface AISearchOptimization {
  /**
   * Enable specific AI crawlers
   */
  enable_chatgpt_bot?: boolean;
  enable_perplexity_bot?: boolean;
  enable_claude_bot?: boolean;
  enable_bard_bot?: boolean;
  /**
   * Custom AI user agents to allow
   */
  custom_ai_agents?: string[];
  /**
   * Generate AI-friendly content summaries
   */
  generate_ai_summaries?: boolean;
  /**
   * Include structured QA pairs for AI
   */
  include_qa_pairs?: boolean;
}
