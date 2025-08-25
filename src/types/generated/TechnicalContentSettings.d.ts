/**
 * TypeScript definitions for TechnicalContentSettings
 *
 * Generated from: TechnicalContentSettings.schema.json
 * Generated on: 2025-08-16T20:49:14.237Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for TechnicalContentSettings configuration
 */
export interface TECHNICALCONTENTSETTINGSConfigurationSchema {
  /**
   * Enable math formula rendering (LaTeX/KaTeX)
   */
  enable_math?: boolean;
  /**
   * Math rendering engine ("katex", "mathjax")
   */
  math_engine?: string;
  /**
   * Enable Mermaid diagrams
   */
  enable_mermaid?: boolean;
  /**
   * Mermaid theme ("default", "dark", "forest", "neutral")
   */
  mermaid_theme?: string;
  /**
   * Enable footnotes
   */
  enable_footnotes?: boolean;
  /**
   * Footnote style ("numeric", "symbolic")
   */
  footnote_style?: string;
  /**
   * Enable table of contents
   */
  enable_table_of_contents?: boolean;
  /**
   * TOC max depth (e.g., 3 for H1-H3)
   */
  toc_max_depth?: number;
  /**
   * TOC position ("left", "right", "top")
   */
  toc_position?: string;
  /**
   * Enable citations/bibliography
   */
  enable_citations?: boolean;
  /**
   * Citation style ("apa", "mla", "chicago", "ieee")
   */
  citation_style?: string;
  /**
   * Enable glossary/definitions
   */
  enable_definitions?: boolean;
  /**
   * Enable interactive examples
   */
  enable_interactive?: boolean;
}
