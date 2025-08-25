/**
 * @fileoverview Proto-Aware Base Widget for Decap CMS Custom Widgets
 * @module static/admin/widgets/base-widget
 * 
 * @description
 * Foundation abstract class for all custom CMS widgets in the getHarsh ecosystem.
 * This base class provides proto-awareness, schema validation, discovery data access,
 * and mapping integration for all custom widgets. It bridges the gap between
 * the 77+ protobuf definitions and the CMS editing interface.
 * 
 * Every custom widget extends ProtoAwareWidget to gain access to:
 * - 381 JSON schemas for field validation
 * - Discovery manifest with domains, blogs, projects
 * - 300+ Schema.org and ARIA mappings
 * - GTM tracking for analytics
 * - Type-safe value handling
 * 
 * @architecture
 * The widget architecture follows a hierarchical pattern:
 * 1. **ProtoAwareWidget** (this class) - Base functionality
 * 2. **Custom Widgets** - Extend base for specific proto types
 * 3. **React Components** - Render UI with proto awareness
 * 4. **Schema Validation** - Ensure data integrity
 * 5. **Discovery Integration** - Dynamic options from manifest
 * 
 * @proto-integration
 * Each widget maps to specific protobuf message types:
 * - **CrossPosting** → CrossPostingConfig (blog.proto)
 * - **ProjectRelationships** → ProjectRelationships (project.proto)
 * - **MediaAttachments** → MediaAttachments (media.proto)
 * - **DiscussionPlatforms** → DiscussionPlatforms (social.proto)
 * - **Sponsor** → SponsorInfo (sponsor.proto)
 * - **Series** → SeriesInfo (series.proto)
 * - **SchemaOrgOverride** → SchemaOrgOverride (schema.proto)
 * - **FeatureOverrides** → FeatureOverrides (features.proto)
 * - **DisplaySettings** → DisplaySettings (display.proto)
 * 
 * @widget-lifecycle
 * 1. Constructor loads discovery data, schema, and mappings
 * 2. Subclass implements render() method
 * 3. Widget validates values against schema
 * 4. Changes tracked via GTM
 * 5. Values saved to YAML/Markdown
 * 
 * @ecosystem-integration
 * - Discovery System: Accesses global __DECAP_DISCOVERY__ data
 * - Schema System: Validates against __DECAP_SCHEMAS__
 * - Mapping System: Uses __DECAP_MAPPINGS__ for display names
 * - GTM System: Tracks interactions via dataLayer
 * - Type System: Enforces TypeScript types from protos
 * - CMS System: Integrates with Decap CMS lifecycle
 * 
 * @data-flow
 * 1. CMS loads widget for field
 * 2. Widget loads schema from window.__DECAP_SCHEMAS__
 * 3. Widget loads discovery from window.__DECAP_DISCOVERY__
 * 4. Widget renders UI with options
 * 5. User interacts with widget
 * 6. Widget validates against schema
 * 7. Widget tracks interaction with GTM
 * 8. Widget calls onChange with new value
 * 9. CMS saves to content file
 * 
 * @validation-rules
 * The base class provides comprehensive validation:
 * - Type checking (string, number, boolean, array, object)
 * - Enum validation against allowed values
 * - Pattern matching with regex
 * - Length constraints (min/max)
 * - Numeric bounds (minimum/maximum)
 * - Required field checking
 * 
 * @dos
 * - Extend ProtoAwareWidget for all custom widgets
 * - Load schema and discovery data in constructor
 * - Validate values before onChange
 * - Track interactions with GTM
 * - Provide ARIA labels for accessibility
 * - Use discovery data for dynamic options
 * 
 * @donts
 * - Don't hardcode entity lists
 * - Don't skip schema validation
 * - Don't forget GTM tracking
 * - Don't ignore accessibility
 * - Don't bypass type checking
 * - Don't modify props directly
 * 
 * @example
 * ```typescript
 * // Creating a custom widget
 * export class MyCustomWidget extends ProtoAwareWidget<string> {
 *   render() {
 *     const options = this.getDomainOptions() // From discovery
 *     const label = this.getAriaLabel('my_field') // From mappings
 *     
 *     return (
 *       <select 
 *         value={this.props.value}
 *         onChange={(e) => this.handleChange(e.target.value)}
 *         aria-label={label}
 *       >
 *         {options.map(opt => (
 *           <option key={opt.value} value={opt.value}>
 *             {opt.label}
 *           </option>
 *         ))}
 *       </select>
 *     )
 *   }
 * }
 * ```
 * 
 * @see {@link file://./CMS.md#custom-widgets} - Widget documentation
 * @see {@link file://./BUILD.md#phase-4} - Widget generation
 * @see {@link file://./config/schema/blog.proto} - Proto definitions
 * @see {@link file://./config/CONFIG.md#widget-schema-mapping} - Schema mapping
 * @see {@link file://./src/types/decap-cms.d.ts} - CMS type definitions
 * 
 * @since 1.0.0
 */

import React, { Component, ReactNode } from 'react';
import { CmsWidgetControlProps } from 'decap-cms-core';

// Type alias for backward compatibility
type WidgetProps<T = any> = CmsWidgetControlProps<T>;

// Schema types (will be replaced with generated types when available)
interface SchemaField {
  type: string;
  description?: string;
  enum?: string[];
  items?: SchemaField | SchemaField[];
  properties?: Record<string, SchemaField>;
  required?: string[];
  default?: string | number | boolean | null;
  pattern?: string;
  minimum?: number;
  maximum?: number;
  minLength?: number;
  maxLength?: number;
}

interface PersonData {
  name: string;
  full_name?: string;
  role?: string;
  avatar?: string;
  [key: string]: unknown;
}

interface DiscoveryData {
  domains: string[];
  blogs: string[];
  projects: string[];
  persons: Record<string, PersonData>;
  entityType?: string;
  entityName?: string;
}

interface SchemaMapping {
  protoEnum: string;
  schemaOrgType: string;
  displayName: string;
  description?: string;
  ariaLabel?: string;
  gtmEvent?: string;
}

/**
 * Base class for all proto-aware widgets.
 * Provides schema validation, discovery data, and mapping integration.
 * 
 * @template T - The value type this widget manages (string, object, array, etc.)
 * @template S - The state type for the widget (default: empty object)
 * @abstract
 * @extends {Component<WidgetProps<T>, S>}
 */
export abstract class ProtoAwareWidget<T = unknown, S = {}> extends Component<WidgetProps<T>, S> {
  protected discoveryData: DiscoveryData | null = null;
  protected schema: SchemaField | null = null;
  protected mappings: Record<string, SchemaMapping> = {};

  constructor(props: WidgetProps<T>) {
    super(props);
    this.loadDiscoveryData();
    this.loadSchema();
    this.loadMappings();
  }

  /**
   * Load discovery data from window object (injected by CMS).
   * Discovery data includes all domains, blogs, projects, and persons.
   * 
   * @protected
   * @returns {void}
   */
  protected loadDiscoveryData(): void {
    if (typeof window !== 'undefined') {
      const globalWindow = window as Window & { __DECAP_DISCOVERY__?: DiscoveryData };
      if (globalWindow.__DECAP_DISCOVERY__) {
        this.discoveryData = globalWindow.__DECAP_DISCOVERY__;
      }
    }
  }

  /**
   * Load JSON schema for this widget's field.
   * Schema provides validation rules and field metadata.
   * 
   * @protected
   * @returns {void}
   */
  protected loadSchema(): void {
    if (typeof window !== 'undefined') {
      const globalWindow = window as Window & { __DECAP_SCHEMAS__?: Record<string, SchemaField> };
      if (globalWindow.__DECAP_SCHEMAS__) {
        const schemas = globalWindow.__DECAP_SCHEMAS__;
        const fieldName = this.props.field.get('name');
        const schemaName = this.props.field.get('schema') || this.inferSchemaName(fieldName);
        
        if (schemaName && schemas[schemaName]) {
          this.schema = schemas[schemaName];
        }
      }
    }
  }

  /**
   * Load Schema.org and ARIA mappings.
   * Mappings provide display names and semantic metadata.
   * 
   * @protected
   * @returns {void}
   */
  protected loadMappings(): void {
    if (typeof window !== 'undefined') {
      const globalWindow = window as Window & { __DECAP_MAPPINGS__?: Record<string, SchemaMapping> };
      if (globalWindow.__DECAP_MAPPINGS__) {
        this.mappings = globalWindow.__DECAP_MAPPINGS__;
      }
    }
  }

  /**
   * Infer schema name from field name.
   * Maps common field names to their corresponding schema types.
   * 
   * @protected
   * @param {string} fieldName - The field name to map
   * @returns {string | null} The schema name or null if not found
   */
  protected inferSchemaName(fieldName: string): string | null {
    // Map common field names to schema types
    const fieldToSchema: Record<string, string> = {
      'content_type': 'ContentTypeMappings',
      'discussion_platform': 'DiscussionPlatformMappings',
      'project_type': 'ProjectTypeMappings',
      'license_type': 'LicenseTypeMappings',
      'media_type': 'MediaTypeMappings',
      'author_role': 'PersonRoleMappings',
      'affiliation_type': 'AffiliationTypeMappings'
    };

    return fieldToSchema[fieldName] || null;
  }

  /**
   * Get display name for an enum value using mappings.
   * Falls back to humanized enum name if mapping not found.
   * 
   * @protected
   * @param {string} enumValue - The enum value (e.g., "CONTENT_TYPE_TUTORIAL")
   * @param {string} enumType - The enum type (e.g., "ContentType")
   * @returns {string} Human-readable display name
   */
  protected getEnumDisplayName(enumValue: string, enumType: string): string {
    const mappingKey = `${enumType}.${enumValue}`;
    const mapping = this.mappings[mappingKey];
    
    if (mapping) {
      return mapping.displayName;
    }

    // Fallback: Convert enum to readable format
    // CONTENT_TYPE_TUTORIAL -> Tutorial
    return enumValue
      .replace(/^[A-Z_]+_/, '')
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

  /**
   * Get ARIA label for an element.
   * Provides accessibility labels from mappings or schema.
   * 
   * @protected
   * @param {string} fieldName - The field name
   * @param {string} [enumValue] - Optional enum value for specific labels
   * @returns {string | undefined} ARIA label or undefined
   */
  protected getAriaLabel(fieldName: string, enumValue?: string): string | undefined {
    if (enumValue) {
      const mappingKey = `${fieldName}.${enumValue}`;
      return this.mappings[mappingKey]?.ariaLabel;
    }

    // Return field-level ARIA label
    return this.schema?.description;
  }

  /**
   * Get GTM event object for analytics tracking.
   * Includes widget type, field name, action, and entity context.
   * 
   * @protected
   * @param {string} action - The action being tracked (e.g., "change", "focus")
   * @param {string} fieldName - The field name being interacted with
   * @param {*} [value] - The value being set
   * @returns {object} GTM event object for dataLayer
   */
  protected getGTMEvent(action: string, fieldName: string, value?: string | number | boolean | null): object {
    return {
      event: 'cms_widget_interaction',
      widget_type: this.constructor.name,
      field_name: fieldName,
      action: action,
      value: value,
      entity_type: this.discoveryData?.entityType,
      entity_name: this.discoveryData?.entityName
    };
  }

  /**
   * Track widget interaction with Google Tag Manager.
   * Pushes event to dataLayer for analytics.
   * 
   * @protected
   * @param {string} action - The action to track
   * @param {*} [value] - The value associated with the action
   * @returns {void}
   */
  protected trackInteraction(action: string, value?: string | number | boolean | null): void {
    if (typeof window !== 'undefined') {
      const globalWindow = window as Window & { dataLayer?: unknown[] };
      if (globalWindow.dataLayer) {
        const event = this.getGTMEvent(
          action,
          this.props.field.get('name'),
          value
        );
        globalWindow.dataLayer.push(event);
      }
    }
  }

  /**
   * Get domain options from discovery data.
   * Returns all configured domains for selection.
   * 
   * @protected
   * @returns {Array<{label: string; value: string}>} Domain options
   */
  protected getDomainOptions(): Array<{ label: string; value: string }> {
    if (!this.discoveryData) {
      return [];
    }

    return this.discoveryData.domains.map(domain => ({
      label: domain,
      value: domain
    }));
  }

  /**
   * Get blog options from discovery data
   */
  protected getBlogOptions(): Array<{ label: string; value: string }> {
    if (!this.discoveryData) {
      return [];
    }

    return this.discoveryData.blogs.map(blog => ({
      label: `Blog: ${blog}`,
      value: blog
    }));
  }

  /**
   * Get project options from discovery data
   */
  protected getProjectOptions(): Array<{ label: string; value: string }> {
    if (!this.discoveryData) {
      return [];
    }

    return this.discoveryData.projects.map(project => {
      // Extract project name from path
      const parts = project.split('/');
      const projectName = parts[parts.length - 1];
      const domain = parts[0];
      
      return {
        label: `${projectName} (${domain})`,
        value: project
      };
    });
  }

  /**
   * Get person options from discovery data
   */
  protected getPersonOptions(): Array<{ label: string; value: string }> {
    if (!this.discoveryData || !this.discoveryData.persons) {
      return [];
    }

    return Object.entries(this.discoveryData.persons).map(([key, person]) => ({
      label: person.full_name || person.name || key,
      value: key
    }));
  }

  /**
   * Validate field value against JSON schema.
   * Checks type, enum, pattern, length, and numeric constraints.
   * 
   * @protected
   * @param {unknown} value - The value to validate
   * @returns {string | null} Error message or null if valid
   */
  protected validateValue(value: unknown): string | null {
    if (!this.schema) {
      return null;
    }

    // Type validation
    if (this.schema.type) {
      const valueType = Array.isArray(value) ? 'array' : typeof value;
      if (valueType !== this.schema.type && !(this.schema.type === 'integer' && valueType === 'number')) {
        return `Expected ${this.schema.type} but got ${valueType}`;
      }
    }

    // Enum validation
    if (this.schema.enum && typeof value === 'string' && !this.schema.enum.includes(value)) {
      return `Value must be one of: ${this.schema.enum.join(', ')}`;
    }

    // Pattern validation
    if (this.schema.pattern && typeof value === 'string') {
      const regex = new RegExp(this.schema.pattern);
      if (!regex.test(value)) {
        return `Value must match pattern: ${this.schema.pattern}`;
      }
    }

    // Length validation
    if (typeof value === 'string') {
      if (this.schema.minLength && value.length < this.schema.minLength) {
        return `Minimum length is ${this.schema.minLength}`;
      }
      if (this.schema.maxLength && value.length > this.schema.maxLength) {
        return `Maximum length is ${this.schema.maxLength}`;
      }
    }

    // Numeric validation
    if (typeof value === 'number') {
      if (this.schema.minimum !== undefined && value < this.schema.minimum) {
        return `Minimum value is ${this.schema.minimum}`;
      }
      if (this.schema.maximum !== undefined && value > this.schema.maximum) {
        return `Maximum value is ${this.schema.maximum}`;
      }
    }

    return null;
  }

  /**
   * Handle value change with validation and tracking.
   * Validates, tracks with GTM, and calls onChange.
   * 
   * @protected
   * @param {T} value - The new value
   * @returns {void}
   */
  protected handleChange(value: T): void {
    const error = this.validateValue(value);
    
    if (error) {
      console.warn(`Validation error for ${this.props.field.get('name')}: ${error}`);
    }

    // Track the change
    this.trackInteraction('change', String(value));

    // Call the onChange handler
    this.props.onChange(value);
  }

  /**
   * Render error state
   */
  protected renderError(message: string): ReactNode {
    return (
      <div className="decap-widget-error" role="alert" aria-live="polite">
        <span className="error-icon">⚠️</span>
        <span className="error-message">{message}</span>
      </div>
    );
  }

  /**
   * Render loading state
   */
  protected renderLoading(): ReactNode {
    return (
      <div className="decap-widget-loading" aria-busy="true" aria-label="Loading widget data">
        <span className="spinner"></span>
        <span>Loading...</span>
      </div>
    );
  }

  /**
   * Render help text
   */
  protected renderHelp(): ReactNode {
    const description = this.schema?.description || this.props.field.get('hint');
    
    if (!description) {
      return null;
    }

    return (
      <div className="decap-widget-help" role="note">
        <span className="help-icon">ℹ️</span>
        <span className="help-text">{description}</span>
      </div>
    );
  }

  /**
   * Abstract render method - must be implemented by subclasses.
   * Renders the widget UI using React components.
   * 
   * @abstract
   * @returns {ReactNode} The widget UI
   */
  abstract render(): ReactNode;
}

/**
 * Higher-order component to create proto-aware widgets.
 * Wraps a component with proto awareness capabilities.
 * 
 * @template P - The props type extending WidgetProps
 * @param {React.ComponentType<P>} WrappedComponent - Component to wrap
 * @returns {React.ComponentType<P>} Proto-aware component
 */
export function withProtoAwareness<P extends WidgetProps>(
  WrappedComponent: React.ComponentType<P>
): React.ComponentType<P> {
  return (class extends ProtoAwareWidget {
    render() {
      // Inject proto-aware props
      const enhancedProps = {
        ...this.props,
        discoveryData: this.discoveryData,
        schema: this.schema,
        mappings: this.mappings,
        getEnumDisplayName: this.getEnumDisplayName.bind(this),
        getAriaLabel: this.getAriaLabel.bind(this),
        trackInteraction: this.trackInteraction.bind(this),
        validateValue: this.validateValue.bind(this)
      };

      return <WrappedComponent {...(enhancedProps as unknown as P)} />;
    }
  }) as any;
}

/**
 * Utility function to register widget with Decap CMS.
 * Wraps widget with proto awareness and registers with CMS.
 * 
 * @param {any} cms - Decap CMS instance
 * @param {string} name - Widget name for registration
 * @param {React.ComponentType<any>} WidgetComponent - Widget component
 * @returns {void}
 */
export function registerProtoWidget(
  cms: any,
  name: string,
  WidgetComponent: React.ComponentType<any>
): void {
  // Wrap component with proto awareness
  const ProtoAwareComponent = withProtoAwareness(WidgetComponent);
  
  // Register with CMS
  cms.registerWidget(name, ProtoAwareComponent);
  
  console.log(`✓ Registered proto-aware widget: ${name}`);
}

/**
 * Example simple widget using the base class.
 * Demonstrates basic text input with proto awareness.
 * 
 * @extends {ProtoAwareWidget<string>}
 * @example
 * // Register this widget
 * CMS.registerWidget('simple-proto', SimpleProtoWidget)
 */
export class SimpleProtoWidget extends ProtoAwareWidget<string> {
  render() {
    const { value = '', field } = this.props;
    const fieldName = field.get('name');
    const isRequired = field.get('required', false);
    
    return (
      <div className="decap-widget-proto-simple">
        <label htmlFor={fieldName}>
          {field.get('label')}
          {isRequired && <span className="required">*</span>}
        </label>
        
        <input
          id={fieldName}
          type="text"
          value={value}
          onChange={(e) => this.handleChange(e.target.value)}
          aria-label={this.getAriaLabel(fieldName)}
          aria-required={isRequired}
          aria-describedby={`${fieldName}-help`}
        />
        
        {this.renderHelp()}
      </div>
    );
  }
}