/**
 * TypeScript definitions for CodeSnippet
 *
 * Generated from: CodeSnippet.schema.json
 * Generated on: 2025-08-16T20:49:13.179Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * Programming languages for code blocks and snippets Maps to Schema.org SoftwareSourceCode with programmingLanguage property
 */
export type CodeLanguage = (string | number) &
  (
    | 'CODE_LANGUAGE_UNSPECIFIED'
    | 0
    | 'CODE_LANGUAGE_JAVASCRIPT'
    | 1
    | 'CODE_LANGUAGE_TYPESCRIPT'
    | 2
    | 'CODE_LANGUAGE_PYTHON'
    | 3
    | 'CODE_LANGUAGE_C'
    | 4
    | 'CODE_LANGUAGE_CPP'
    | 5
    | 'CODE_LANGUAGE_SHELL'
    | 6
    | 'CODE_LANGUAGE_YAML'
    | 7
    | 'CODE_LANGUAGE_JSON'
    | 8
    | 'CODE_LANGUAGE_MARKDOWN'
    | 9
    | 'CODE_LANGUAGE_PROTOBUF'
    | 10
    | 'CODE_LANGUAGE_OTHER'
    | 99
  );

/**
 * JSON Schema for CodeSnippet configuration
 */
export interface CODESNIPPETConfigurationSchema {
  /**
   * GitHub Gist URL or ID
   */
  gist_url?: string;
  language?: CodeLanguage;
  /**
   * Snippet title
   */
  title?: string;
  /**
   * Show line numbers
   */
  show_line_numbers?: boolean;
  /**
   * Highlighted lines (e.g., "3-5,8,10-12")
   */
  highlight_lines?: string;
  /**
   * Inline code (if not using Gist)
   */
  inline_code?: string;
  /**
   * File name (if applicable)
   */
  filename?: string;
}
