/**
 * @fileoverview Decap CMS Type Definitions and Module Augmentations
 * @module types/decap-cms
 * 
 * @description
 * Type definitions for Decap CMS (formerly Netlify CMS) integration in the getHarsh ecosystem.
 * These types enable TypeScript support for:
 * - Custom widget development with proto-aware validation
 * - Preview template components for live editing
 * - CMS initialization and configuration
 * - Widget registration and lifecycle management
 * 
 * The CMS is configured via a proto-driven pipeline that generates config.yml
 * from 77+ protobuf definitions, ensuring type safety from schema to UI.
 * 
 * @ecosystem-integration
 * - CMS Configuration: Generated from blog.proto via generate-decap-config.js
 * - Custom Widgets: 10 proto-aware widgets in static/admin/widgets/
 * - Schema Validation: All fields validated against 381 JSON schemas
 * - Build Pipeline: Phase 4 of builder.sh generates CMS config
 * 
 * @dos
 * - Use these types when creating custom widgets
 * - Extend interfaces for widget-specific props
 * - Type all CMS interactions properly
 * - Follow proto schema definitions
 * 
 * @donts
 * - Don't bypass type checking with 'any'
 * - Don't modify without updating widgets
 * - Don't ignore widget lifecycle methods
 * - Don't skip schema validation
 * 
 * @see {@link file://./CMS.md} - Complete CMS documentation
 * @see {@link file://./config/schema/blog.proto} - ArticleConfig proto
 * @see {@link file://./config/tools/generate-decap-config.js} - Config generation
 * @see {@link file://./static/admin/widgets/} - Custom widget implementations
 * @see {@link file://./BUILD.md#phase-4-decap-cms} - CMS build phase
 */

declare module "decap-cms-app" {
  /**
   * Props for preview template components in the CMS editor.
   * Provides access to entry data and widget rendering functions.
   * 
   * @see {@link file://./static/admin/preview-templates/} - Preview templates
   */
  export interface PreviewTemplateComponentProps {
    /** Entry data accessor object */
    entry: {
      /** Get a top-level field value by key */
      get(key: string): any
      /** Get a nested field value by path array */
      getIn(path: string[]): any
    }
    /** Render a single widget for the specified field */
    widgetFor(field: string): React.ReactElement
    /** Render multiple widgets for a list field */
    widgetsFor(field: string): React.ReactElement[]
    /** Get the URL for an uploaded asset */
    getAsset(path: string): string
  }
  
  /**
   * Props for custom CMS widget components.
   * Used when creating proto-aware widgets for ArticleConfig fields.
   * 
   * @template T - The type of the widget's value
   * 
   * @example
   * ```tsx
   * export const CrossPostingWidget: React.FC<WidgetProps<CrossPostingConfig>> = ({
   *   value,
   *   onChange,
   *   field
   * }) => { ... }
   * ```
   * 
   * @see {@link file://./static/admin/widgets/cross-posting-widget.tsx} - Example widget
   */
  export interface WidgetProps<T = any> {
    /** Current value of the field */
    value: T
    /** Callback to update the field value */
    onChange: (value: T) => void
    /** Field configuration from config.yml */
    field: any
    /** Unique identifier for the field instance */
    forID: string
    /** CSS class for the widget wrapper */
    classNameWrapper: string
    /** Set active state styling */
    setActiveStyle: () => void
    /** Set inactive state styling */
    setInactiveStyle: () => void
  }
  
  /**
   * Main CMS object for initialization and registration.
   * Used in static/admin/cms.ts to configure the CMS.
   * 
   * @see {@link file://./static/admin/cms.ts} - CMS initialization
   */
  const CMS: {
    /** Initialize the CMS with config.yml settings */
    init(): void
    /**
     * Register a custom preview template for a collection.
     * @param collection - Name of the collection (e.g., "posts")
     * @param component - React component for preview rendering
     */
    registerPreviewTemplate(collection: string, component: React.ComponentType<PreviewTemplateComponentProps>): void
    /**
     * Register a custom widget for field editing.
     * @param name - Widget name (must match widget field in config.yml)
     * @param component - React component implementing WidgetProps
     * 
     * @example
     * ```ts
     * CMS.registerWidget("cross-posting", CrossPostingWidget)
     * ```
     */
    registerWidget(name: string, component: React.ComponentType<WidgetProps>): void
    /**
     * Register custom styles for the preview pane.
     * @param style - CSS string or file path
     * @param options - Options object with raw flag for inline CSS
     */
    registerPreviewStyle(style: string, options?: { raw?: boolean }): void
  }
  
  export default CMS
}

/**
 * Decap CMS Core module re-export.
 * Provides same types as decap-cms-app for compatibility.
 */
declare module "decap-cms-core" {
  export * from "decap-cms-app"
}