/**
 * TypeScript definitions for CustomMetric
 *
 * Generated from: CustomMetric.schema.json
 * Generated on: 2025-08-16T20:49:13.345Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

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
 * JSON Schema for CustomMetric configuration
 */
export interface CUSTOMMETRICConfigurationSchema {
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
