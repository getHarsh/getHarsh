/**
 * TypeScript definitions for BookStructureMappings
 *
 * Generated from: BookStructureMappings.schema.json
 * Generated on: 2025-08-16T20:49:13.142Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for BookStructureMappings configuration
 */
export interface BOOKSTRUCTUREMAPPINGSConfigurationSchema {
  /**
   * Simple string mapping: enum name -> Schema.org type e.g., "BOOK_STRUCTURE_CHAPTER" -> "Chapter"
   */
  book_to_schema?: {
    [k: string]: string;
  };
}
