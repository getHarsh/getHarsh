/**
 * TypeScript definitions for APISpecFormatDefaults
 *
 * Generated from: APISpecFormatDefaults.schema.json
 * Generated on: 2025-08-16T20:49:12.857Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for APISpecFormatDefaults configuration
 */
export interface APISPECFORMATDEFAULTSConfigurationSchema {
  unspecified?: APISpecFormatMapping;
  openapi?: APISpecFormatMapping1;
  graphql?: APISpecFormatMapping2;
  grpc?: APISpecFormatMapping3;
}
/**
 * API_SPEC_FORMAT_UNSPECIFIED  spec_name: "" spec_url: "" mime_type: "" file_extensions: []
 */
export interface APISpecFormatMapping {
  /**
   * Specification name
   */
  spec_name?: string;
  /**
   * Specification URL
   */
  spec_url?: string;
  /**
   * MIME type
   */
  mime_type?: string;
  /**
   * File extensions
   */
  file_extensions?: string[];
}
/**
 * API_SPEC_FORMAT_OPENAPI  spec_name: "OpenAPI" spec_url: "https://spec.openapis.org/oas/latest.html" mime_type: "application/vnd.oai.openapi+json" file_extensions: ["openapi.json", "openapi.yaml", "openapi.yml"]
 */
export interface APISpecFormatMapping1 {
  /**
   * Specification name
   */
  spec_name?: string;
  /**
   * Specification URL
   */
  spec_url?: string;
  /**
   * MIME type
   */
  mime_type?: string;
  /**
   * File extensions
   */
  file_extensions?: string[];
}
/**
 * API_SPEC_FORMAT_GRAPHQL  spec_name: "GraphQL" spec_url: "https://spec.graphql.org/" mime_type: "application/graphql" file_extensions: ["graphql", "gql", "graphqls"]
 */
export interface APISpecFormatMapping2 {
  /**
   * Specification name
   */
  spec_name?: string;
  /**
   * Specification URL
   */
  spec_url?: string;
  /**
   * MIME type
   */
  mime_type?: string;
  /**
   * File extensions
   */
  file_extensions?: string[];
}
/**
 * API_SPEC_FORMAT_GRPC  spec_name: "gRPC" spec_url: "https://grpc.io/docs/what-is-grpc/core-concepts/" mime_type: "application/x-protobuf" file_extensions: ["proto", "protobuf"]
 */
export interface APISpecFormatMapping3 {
  /**
   * Specification name
   */
  spec_name?: string;
  /**
   * Specification URL
   */
  spec_url?: string;
  /**
   * MIME type
   */
  mime_type?: string;
  /**
   * File extensions
   */
  file_extensions?: string[];
}
