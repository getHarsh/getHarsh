/**
 * TypeScript definitions for BlogFeatures
 *
 * Generated from: BlogFeatures.schema.json
 * Generated on: 2025-08-16T20:49:13.132Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for BlogFeatures configuration
 */
export interface BLOGFEATURESConfigurationSchema {
  /**
   * Enable comments system
   */
  comments?: boolean;
  /**
   * Comments provider ("disqus", "giscus", "utterances")
   */
  comments_provider?: string;
  /**
   * Show reading time estimate
   */
  reading_time?: boolean;
  /**
   * Show table of contents for long posts
   */
  table_of_contents?: boolean;
  /**
   * TOC threshold (min headings)
   */
  toc_min_headings?: number;
  /**
   * Enable math rendering (KaTeX/MathJax)
   */
  enable_math?: boolean;
  /**
   * Math renderer ("katex", "mathjax")
   */
  math_renderer?: string;
  /**
   * Enable Graphviz diagram rendering
   */
  graphviz?: boolean;
  /**
   * Enable code syntax highlighting
   */
  syntax_highlighting?: boolean;
  /**
   * Syntax theme ("github", "monokai", "dracula", etc.)
   */
  syntax_theme?: string;
  /**
   * Show related posts
   */
  related_posts?: boolean;
  /**
   * Number of related posts to show
   */
  related_posts_count?: number;
  /**
   * Enable post series navigation
   */
  series_navigation?: boolean;
  /**
   * Custom blog features
   */
  custom?: {
    [k: string]: boolean;
  };
}
