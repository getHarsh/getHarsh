/**
 * TypeScript definitions for CodeLanguageDefaults
 *
 * Generated from: CodeLanguageDefaults.schema.json
 * Generated on: 2025-08-16T20:49:13.175Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for CodeLanguageDefaults configuration
 */
export interface CODELANGUAGEDEFAULTSConfigurationSchema {
  javascript?: CodeLanguageMapping;
  typescript?: CodeLanguageMapping1;
  python?: CodeLanguageMapping2;
  c?: CodeLanguageMapping3;
  cpp?: CodeLanguageMapping4;
}
/**
 * CODE_LANGUAGE_JAVASCRIPT  name: "JavaScript" alternate_names: ["JS", "ECMAScript"] url: "https://www.ecma-international.org/publications-and-standards/standards/ecma-262/" file_extensions: [".js", ".mjs", ".cjs"] mime_type: "application/javascript"
 */
export interface CodeLanguageMapping {
  /**
   * Language name for Schema.org
   */
  name?: string;
  /**
   * Alternative names
   */
  alternate_names?: string[];
  /**
   * Language specification URL
   */
  url?: string;
  /**
   * File extensions
   */
  file_extensions?: string[];
  /**
   * MIME type
   */
  mime_type?: string;
  /**
   * Syntax highlighting identifier
   */
  highlight_js_id?: string;
}
/**
 * CODE_LANGUAGE_TYPESCRIPT  name: "TypeScript" alternate_names: ["TS"] url: "https://www.typescriptlang.org/" file_extensions: [".ts", ".tsx"] mime_type: "application/typescript"
 */
export interface CodeLanguageMapping1 {
  /**
   * Language name for Schema.org
   */
  name?: string;
  /**
   * Alternative names
   */
  alternate_names?: string[];
  /**
   * Language specification URL
   */
  url?: string;
  /**
   * File extensions
   */
  file_extensions?: string[];
  /**
   * MIME type
   */
  mime_type?: string;
  /**
   * Syntax highlighting identifier
   */
  highlight_js_id?: string;
}
/**
 * CODE_LANGUAGE_PYTHON  name: "Python" url: "https://www.python.org/" file_extensions: [".py", ".pyi"] mime_type: "text/x-python"
 */
export interface CodeLanguageMapping2 {
  /**
   * Language name for Schema.org
   */
  name?: string;
  /**
   * Alternative names
   */
  alternate_names?: string[];
  /**
   * Language specification URL
   */
  url?: string;
  /**
   * File extensions
   */
  file_extensions?: string[];
  /**
   * MIME type
   */
  mime_type?: string;
  /**
   * Syntax highlighting identifier
   */
  highlight_js_id?: string;
}
/**
 * CODE_LANGUAGE_C  name: "C" url: "https://www.iso.org/standard/74528.html" file_extensions: [".c", ".h"] mime_type: "text/x-c"
 */
export interface CodeLanguageMapping3 {
  /**
   * Language name for Schema.org
   */
  name?: string;
  /**
   * Alternative names
   */
  alternate_names?: string[];
  /**
   * Language specification URL
   */
  url?: string;
  /**
   * File extensions
   */
  file_extensions?: string[];
  /**
   * MIME type
   */
  mime_type?: string;
  /**
   * Syntax highlighting identifier
   */
  highlight_js_id?: string;
}
/**
 * CODE_LANGUAGE_CPP  name: "C++" alternate_names: ["CPP", "CXX"] url: "https://isocpp.org/" file_extensions: [".cpp", ".cc", ".cxx", ".hpp", ".h"] mime_type: "text/x-c++"
 */
export interface CodeLanguageMapping4 {
  /**
   * Language name for Schema.org
   */
  name?: string;
  /**
   * Alternative names
   */
  alternate_names?: string[];
  /**
   * Language specification URL
   */
  url?: string;
  /**
   * File extensions
   */
  file_extensions?: string[];
  /**
   * MIME type
   */
  mime_type?: string;
  /**
   * Syntax highlighting identifier
   */
  highlight_js_id?: string;
}
