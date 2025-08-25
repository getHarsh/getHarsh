/**
 * TypeScript definitions for PlaygroundProviderDefaults
 *
 * Generated from: PlaygroundProviderDefaults.schema.json
 * Generated on: 2025-08-16T20:49:13.971Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for PlaygroundProviderDefaults configuration
 */
export interface PLAYGROUNDPROVIDERDEFAULTSConfigurationSchema {
  unspecified?: PlaygroundProviderMapping;
  codepen?: PlaygroundProviderMapping1;
  codesandbox?: PlaygroundProviderMapping2;
  stackblitz?: PlaygroundProviderMapping3;
  custom?: PlaygroundProviderMapping4;
}
/**
 * PLAYGROUND_PROVIDER_UNSPECIFIED  name: "" embed_url_pattern: "" supported_languages: [] features: {}
 */
export interface PlaygroundProviderMapping {
  /**
   * Provider name
   */
  name?: string;
  /**
   * Embed URL pattern
   */
  embed_url_pattern?: string;
  /**
   * Supported languages
   */
  supported_languages?: string[];
  /**
   * Features
   */
  features?: {
    [k: string]: boolean;
  };
}
/**
 * PLAYGROUND_PROVIDER_CODEPEN  name: "CodePen" embed_url_pattern: "https://codepen.io/{user}/embed/{pen}" supported_languages: ["html", "css", "javascript"] features: { "live_preview": "true", "console": "true", "assets": "true" }
 */
export interface PlaygroundProviderMapping1 {
  /**
   * Provider name
   */
  name?: string;
  /**
   * Embed URL pattern
   */
  embed_url_pattern?: string;
  /**
   * Supported languages
   */
  supported_languages?: string[];
  /**
   * Features
   */
  features?: {
    [k: string]: boolean;
  };
}
/**
 * PLAYGROUND_PROVIDER_CODESANDBOX  name: "CodeSandbox" embed_url_pattern: "https://codesandbox.io/embed/{sandbox_id}" supported_languages: ["javascript", "typescript", "react", "vue", "angular"] features: { "live_preview": "true", "console": "true", "npm": "true", "github_import": "true" }
 */
export interface PlaygroundProviderMapping2 {
  /**
   * Provider name
   */
  name?: string;
  /**
   * Embed URL pattern
   */
  embed_url_pattern?: string;
  /**
   * Supported languages
   */
  supported_languages?: string[];
  /**
   * Features
   */
  features?: {
    [k: string]: boolean;
  };
}
/**
 * PLAYGROUND_PROVIDER_STACKBLITZ  name: "StackBlitz" embed_url_pattern: "https://stackblitz.com/edit/{project_id}" supported_languages: ["javascript", "typescript", "angular", "react", "vue"] features: { "live_preview": "true", "terminal": "true", "npm": "true", "vscode": "true" }
 */
export interface PlaygroundProviderMapping3 {
  /**
   * Provider name
   */
  name?: string;
  /**
   * Embed URL pattern
   */
  embed_url_pattern?: string;
  /**
   * Supported languages
   */
  supported_languages?: string[];
  /**
   * Features
   */
  features?: {
    [k: string]: boolean;
  };
}
/**
 * PLAYGROUND_PROVIDER_CUSTOM  name: "Custom Playground" embed_url_pattern: "" supported_languages: [] features: {}
 */
export interface PlaygroundProviderMapping4 {
  /**
   * Provider name
   */
  name?: string;
  /**
   * Embed URL pattern
   */
  embed_url_pattern?: string;
  /**
   * Supported languages
   */
  supported_languages?: string[];
  /**
   * Features
   */
  features?: {
    [k: string]: boolean;
  };
}
