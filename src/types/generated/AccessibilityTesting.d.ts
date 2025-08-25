/**
 * TypeScript definitions for AccessibilityTesting
 *
 * Generated from: AccessibilityTesting.schema.json
 * Generated on: 2025-08-16T20:49:13.022Z
 *
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

/**
 * JSON Schema for AccessibilityTesting configuration
 */
export interface ACCESSIBILITYTESTINGConfigurationSchema {
  automated?: AutomatedTesting;
  manual?: ManualTesting;
  user?: UserTesting;
  reporting?: AccessibilityReporting;
}
/**
 * Automated testing
 */
export interface AutomatedTesting {
  /**
   * Enable automated tests
   */
  enabled?: boolean;
  /**
   * Testing tools
   */
  tools?: string[];
  /**
   * Test on build
   */
  test_on_build?: boolean;
  /**
   * Fail on errors
   */
  fail_on_errors?: boolean;
  /**
   * Error threshold
   */
  error_threshold?: number;
}
/**
 * Manual testing
 */
export interface ManualTesting {
  /**
   * Checklist URL
   */
  checklist_url?: string;
  /**
   * Testing schedule
   */
  schedule?: string;
  /**
   * Key workflows
   */
  key_workflows?: string[];
}
/**
 * User testing
 */
export interface UserTesting {
  /**
   * Include users with disabilities
   */
  include_pwd?: boolean;
  /**
   * Testing frequency
   */
  frequency?: string;
  /**
   * Feedback collection
   */
  collect_feedback?: boolean;
}
/**
 * Reporting
 */
export interface AccessibilityReporting {
  /**
   * Generate reports
   */
  generate_reports?: boolean;
  /**
   * Report format
   */
  format?: string;
  /**
   * Public reporting
   */
  public_reports?: boolean;
  /**
   * Report URL
   */
  report_url?: string;
}
