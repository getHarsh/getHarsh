/**
 * TypeScript definitions for CustomDimensions
 *
 * Generated from: CustomDimensions.schema.json
 * Generated on: 2025-08-16T20:49:13.339Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * Dimension scope
 */
export type DimensionScope = (string | number) &
  (
    | 'DIMENSION_SCOPE_UNSPECIFIED'
    | 0
    | 'DIMENSION_SCOPE_USER'
    | 1
    | 'DIMENSION_SCOPE_SESSION'
    | 2
    | 'DIMENSION_SCOPE_EVENT'
    | 3
    | 'DIMENSION_SCOPE_ITEM'
    | 4
  );
/**
 * Metric types
 */
export type MetricType = (string | number) &
  (
    | 'METRIC_TYPE_UNSPECIFIED'
    | 0
    | 'METRIC_TYPE_NUMBER'
    | 1
    | 'METRIC_TYPE_CURRENCY'
    | 2
    | 'METRIC_TYPE_TIME'
    | 3
    | 'METRIC_TYPE_PERCENTAGE'
    | 4
  );

/**
 * JSON Schema for CustomDimensions configuration
 */
export interface CUSTOMDIMENSIONSConfigurationSchema {
  /**
   * User-scoped dimensions
   */
  user_dimensions?: CustomDimension[];
  /**
   * Event-scoped dimensions
   */
  event_dimensions?: CustomDimension[];
  /**
   * Custom metrics
   */
  metrics?: CustomMetric[];
  entity_dimension?: EntityDimension;
}
/**
 * Custom dimension configuration
 */
export interface CustomDimension {
  /**
   * Dimension name
   */
  name?: string;
  /**
   * Dimension index (GA4)
   */
  index?: number;
  scope?: DimensionScope;
  /**
   * Value source
   */
  value_source?: string;
  /**
   * Default value
   */
  default_value?: string;
}
/**
 * Custom metric configuration
 */
export interface CustomMetric {
  /**
   * Metric name
   */
  name?: string;
  /**
   * Metric index
   */
  index?: number;
  type?: MetricType;
  /**
   * Unit of measurement
   */
  unit?: string;
}
/**
 * Entity tracking dimension
 */
export interface EntityDimension {
  /**
   * Legal entity dimension
   */
  legal_entity_dimension?: string;
  /**
   * Brand dimension
   */
  brand_dimension?: string;
  /**
   * Project dimension
   */
  project_dimension?: string;
  /**
   * Content source dimension
   */
  source_dimension?: string;
}
