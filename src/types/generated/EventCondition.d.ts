/**
 * TypeScript definitions for EventCondition
 *
 * Generated from: EventCondition.schema.json
 * Generated on: 2025-08-16T20:49:13.755Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * Condition operators
 */
export type ConditionOperator = (string | number) &
  (
    | 'CONDITION_OPERATOR_UNSPECIFIED'
    | 0
    | 'CONDITION_OPERATOR_EQUALS'
    | 1
    | 'CONDITION_OPERATOR_NOT_EQUALS'
    | 2
    | 'CONDITION_OPERATOR_CONTAINS'
    | 3
    | 'CONDITION_OPERATOR_NOT_CONTAINS'
    | 4
    | 'CONDITION_OPERATOR_STARTS_WITH'
    | 5
    | 'CONDITION_OPERATOR_ENDS_WITH'
    | 6
    | 'CONDITION_OPERATOR_MATCHES_REGEX'
    | 7
    | 'CONDITION_OPERATOR_GREATER_THAN'
    | 8
    | 'CONDITION_OPERATOR_LESS_THAN'
    | 9
  );

/**
 * JSON Schema for EventCondition configuration
 */
export interface EVENTCONDITIONConfigurationSchema {
  /**
   * Condition variable
   */
  variable?: string;
  operator?: ConditionOperator;
  /**
   * Condition value
   */
  value?: string;
}
