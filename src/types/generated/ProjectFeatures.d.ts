/**
 * TypeScript definitions for ProjectFeatures
 *
 * Generated from: ProjectFeatures.schema.json
 * Generated on: 2025-08-16T20:49:14.021Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * API documentation generators (moved from docs.proto)
 */
export type APIDocGenerator = (string | number) &
  (
    | 'API_DOC_GENERATOR_UNSPECIFIED'
    | 0
    | 'API_DOC_GENERATOR_SWAGGER_UI'
    | 1
    | 'API_DOC_GENERATOR_REDOC'
    | 2
    | 'API_DOC_GENERATOR_GRAPHDOC'
    | 3
    | 'API_DOC_GENERATOR_CUSTOM'
    | 4
  );
/**
 * Code playground providers
 */
export type PlaygroundProvider = (string | number) &
  (
    | 'PLAYGROUND_PROVIDER_UNSPECIFIED'
    | 0
    | 'PLAYGROUND_PROVIDER_CODEPEN'
    | 1
    | 'PLAYGROUND_PROVIDER_CODESANDBOX'
    | 2
    | 'PLAYGROUND_PROVIDER_STACKBLITZ'
    | 3
    | 'PLAYGROUND_PROVIDER_CUSTOM'
    | 4
  );
/**
 * Search providers
 */
export type SearchProvider = (string | number) &
  (
    | 'SEARCH_PROVIDER_UNSPECIFIED'
    | 0
    | 'SEARCH_PROVIDER_ALGOLIA'
    | 1
    | 'SEARCH_PROVIDER_LUNR'
    | 2
    | 'SEARCH_PROVIDER_FUSE'
    | 3
    | 'SEARCH_PROVIDER_CUSTOM'
    | 4
  );

/**
 * JSON Schema for ProjectFeatures configuration
 */
export interface PROJECTFEATURESConfigurationSchema {
  /**
   * Enable API documentation
   */
  api_docs?: boolean;
  api_docs_generator?: APIDocGenerator;
  /**
   * Enable interactive demos
   */
  interactive_demos?: boolean;
  /**
   * Enable code playground
   */
  code_playground?: boolean;
  playground_provider?: PlaygroundProvider;
  /**
   * Enable documentation search
   */
  docs_search?: boolean;
  search_provider?: SearchProvider;
  /**
   * Enable version switcher
   */
  version_switcher?: boolean;
  /**
   * Enable contribution guide
   */
  contribution_guide?: boolean;
  /**
   * Enable changelog display
   */
  changelog_display?: boolean;
  /**
   * Enable dependency graph
   */
  dependency_graph?: boolean;
  /**
   * Custom project features
   */
  custom?: {
    [k: string]: boolean;
  };
}
