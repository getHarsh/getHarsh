/**
 * TypeScript definitions for MediaTypeDefaults
 *
 * Generated from: MediaTypeDefaults.schema.json
 * Generated on: 2025-08-16T20:49:13.917Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for MediaTypeDefaults configuration
 */
export interface MEDIATYPEDEFAULTSConfigurationSchema {
  image?: MediaTypeMapping;
  video?: MediaTypeMapping1;
  audio?: MediaTypeMapping2;
  code?: MediaTypeMapping3;
  gist?: MediaTypeMapping4;
  diagram?: MediaTypeMapping5;
}
/**
 * MEDIA_TYPE_IMAGE  schema_type: "ImageObject" required_properties: ["contentUrl", "name"] recommended_properties: ["caption", "width", "height", "thumbnail"] mime_types: ["image/jpeg", "image/png", "image/webp", "image/svg+xml"]
 */
export interface MediaTypeMapping {
  /**
   * Primary Schema.org type
   */
  schema_type?: string;
  /**
   * Required properties
   */
  required_properties?: string[];
  /**
   * Recommended properties
   */
  recommended_properties?: string[];
  /**
   * MIME types
   */
  mime_types?: string[];
  /**
   * File extensions
   */
  file_extensions?: string[];
}
/**
 * MEDIA_TYPE_VIDEO  schema_type: "VideoObject" required_properties: ["contentUrl", "name", "uploadDate"] recommended_properties: ["duration", "thumbnail", "embedUrl", "description"] mime_types: ["video/mp4", "video/webm"]
 */
export interface MediaTypeMapping1 {
  /**
   * Primary Schema.org type
   */
  schema_type?: string;
  /**
   * Required properties
   */
  required_properties?: string[];
  /**
   * Recommended properties
   */
  recommended_properties?: string[];
  /**
   * MIME types
   */
  mime_types?: string[];
  /**
   * File extensions
   */
  file_extensions?: string[];
}
/**
 * MEDIA_TYPE_AUDIO  schema_type: "AudioObject" required_properties: ["contentUrl", "name"] recommended_properties: ["duration", "transcript", "encodingFormat"] mime_types: ["audio/mpeg", "audio/ogg", "audio/wav"]
 */
export interface MediaTypeMapping2 {
  /**
   * Primary Schema.org type
   */
  schema_type?: string;
  /**
   * Required properties
   */
  required_properties?: string[];
  /**
   * Recommended properties
   */
  recommended_properties?: string[];
  /**
   * MIME types
   */
  mime_types?: string[];
  /**
   * File extensions
   */
  file_extensions?: string[];
}
/**
 * MEDIA_TYPE_CODE  schema_type: "SoftwareSourceCode" required_properties: ["text", "programmingLanguage"] recommended_properties: ["codeRepository", "runtimePlatform"]
 */
export interface MediaTypeMapping3 {
  /**
   * Primary Schema.org type
   */
  schema_type?: string;
  /**
   * Required properties
   */
  required_properties?: string[];
  /**
   * Recommended properties
   */
  recommended_properties?: string[];
  /**
   * MIME types
   */
  mime_types?: string[];
  /**
   * File extensions
   */
  file_extensions?: string[];
}
/**
 * MEDIA_TYPE_GIST  schema_type: "SoftwareSourceCode" additional_properties: ["codeRepository"] required_properties: ["text", "programmingLanguage", "url"]
 */
export interface MediaTypeMapping4 {
  /**
   * Primary Schema.org type
   */
  schema_type?: string;
  /**
   * Required properties
   */
  required_properties?: string[];
  /**
   * Recommended properties
   */
  recommended_properties?: string[];
  /**
   * MIME types
   */
  mime_types?: string[];
  /**
   * File extensions
   */
  file_extensions?: string[];
}
/**
 * MEDIA_TYPE_DIAGRAM  schema_type: "ImageObject" additional_types: ["CreativeWork"] required_properties: ["contentUrl", "name", "encodingFormat"]
 */
export interface MediaTypeMapping5 {
  /**
   * Primary Schema.org type
   */
  schema_type?: string;
  /**
   * Required properties
   */
  required_properties?: string[];
  /**
   * Recommended properties
   */
  recommended_properties?: string[];
  /**
   * MIME types
   */
  mime_types?: string[];
  /**
   * File extensions
   */
  file_extensions?: string[];
}
