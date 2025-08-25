/**
 * @fileoverview Schema.org Override Widget for SEO and Structured Data
 * @module static/admin/widgets/schema-org-override-widget
 * 
 * @description
 * Custom CMS widget for managing Schema.org structured data overrides,
 * enabling fine-grained control over how content appears in search results
 * and knowledge graphs. This widget allows content creators to optimize
 * articles for rich snippets, featured snippets, and enhanced SERP display.
 * 
 * The widget implements the SchemaOrgEntity protobuf message, leveraging
 * the 300+ proto-to-Schema.org mappings for semantic richness.
 * 
 * @architecture
 * The Schema.org system follows a layered approach:
 * 1. **Automatic Mapping**: Proto enums map to Schema.org types
 * 2. **Type Selection**: Choose appropriate article subtype
 * 3. **Property Override**: Customize specific properties
 * 4. **JSON-LD Generation**: Build structured data output
 * 5. **Validation**: Ensure Schema.org compliance
 * 
 * @proto-integration
 * Maps to SchemaOrgEntity message in schema.proto:
 * ```protobuf
 * message SchemaOrgEntity {
 *   optional string type = 1;
 *   optional SchemaOrgType type_enum = 2;
 *   optional string custom_type = 3;
 *   map<string, google.protobuf.Any> properties = 4;
 * }
 * 
 * enum SchemaOrgType {
 *   SCHEMA_ORG_UNKNOWN = 0;
 *   SCHEMA_ORG_BLOG_POSTING = 1;
 *   SCHEMA_ORG_ARTICLE = 2;
 *   SCHEMA_ORG_TECH_ARTICLE = 3;
 *   SCHEMA_ORG_SCHOLARLY_ARTICLE = 4;
 *   SCHEMA_ORG_NEWS_ARTICLE = 5;
 *   SCHEMA_ORG_HOW_TO = 6;
 *   SCHEMA_ORG_FAQ_PAGE = 7;
 *   SCHEMA_ORG_RECIPE = 8;
 *   SCHEMA_ORG_REVIEW = 9;
 * }
 * ```
 * 
 * @ecosystem-integration
 * - Mapping System: 300+ proto-to-Schema.org mappings
 * - SEO Components: Generates JSON-LD in document head
 * - Search Console: Validates structured data
 * - Rich Snippets: Enables enhanced SERP features
 * - Knowledge Graph: Contributes to entity recognition
 * - Analytics: Tracks rich snippet performance
 * 
 * @features
 * - **Type Selection**: Choose from 9+ article types
 * - **Property Customization**: Override specific fields
 * - **Auto-mapping**: Leverage proto enum mappings
 * - **JSON-LD Preview**: See generated structured data
 * - **Validation**: Check Schema.org compliance
 * - **Rich Snippets**: Enable featured snippets
 * - **FAQ Support**: Structure FAQ content
 * 
 * @schema-types
 * - **BlogPosting**: Standard blog articles
 * - **Article**: General articles
 * - **TechArticle**: Technical documentation
 * - **ScholarlyArticle**: Academic content
 * - **NewsArticle**: News and announcements
 * - **HowTo**: Step-by-step guides
 * - **FAQPage**: Frequently asked questions
 * - **Recipe**: Recipe content (if applicable)
 * - **Review**: Product or service reviews
 * 
 * @seo-benefits
 * Schema.org markup enables:
 * - Rich snippets in search results
 * - Featured snippets eligibility
 * - Knowledge panel inclusion
 * - Voice search optimization
 * - Better click-through rates
 * - Enhanced mobile display
 * 
 * @property-customization
 * Common properties to override:
 * - **headline**: Article title optimization
 * - **alternativeHeadline**: Subtitle for clarity
 * - **abstract**: Summary for snippets
 * - **articleSection**: Category specification
 * - **proficiencyLevel**: Skill level for tutorials
 * - **dependencies**: Technical requirements
 * 
 * @json-ld-output
 * The widget generates JSON-LD like:
 * ```json
 * {
 *   "@context": "https://schema.org",
 *   "@type": "TechArticle",
 *   "headline": "Building with Proto Schemas",
 *   "proficiencyLevel": "Intermediate",
 *   "dependencies": "Node.js, TypeScript"
 * }
 * ```
 * 
 * @dos
 * - Choose the most specific schema type
 * - Provide complete property values
 * - Test with Google's Rich Results Test
 * - Monitor Search Console for errors
 * - Update schema for content changes
 * - Use appropriate proficiency levels
 * 
 * @donts
 * - Don't use misleading schema types
 * - Don't leave required properties empty
 * - Don't duplicate automatic mappings
 * - Don't ignore validation warnings
 * - Don't mix incompatible types
 * 
 * @example
 * ```yaml
 * article_schema:
 *   type_enum: "SCHEMA_ORG_TECH_ARTICLE"
 *   properties:
 *     proficiencyLevel: "Intermediate"
 *     dependencies: "React, TypeScript, Gatsby"
 *     alternativeHeadline: "A comprehensive guide to proto-driven development"
 * ```
 * 
 * @see {@link file://./CMS.md#schema-org} - Schema.org documentation
 * @see {@link file://./BUILD.md#schema-mappings} - Mapping system
 * @see {@link file://./config/schema/schema-mappings.yml} - Proto mappings
 * @see {@link file://./src/hooks/useSchema.ts} - Schema generation hook
 * @see {@link https://schema.org/Article} - Schema.org Article types
 * @see {@link https://search.google.com/test/rich-results} - Rich Results Test
 * 
 * @since 1.0.0
 */

import React from 'react';
import { CmsWidgetControlProps as WidgetProps } from 'decap-cms-core';
import { ProtoAwareWidget } from './base-widget';

// Type definition based on SchemaOrgEntity schema
interface SchemaOrgEntity {
  type?: string;
  type_enum?: string;
  custom_type?: string;
  properties?: Record<string, any>;
}

// Common Schema.org article types with their properties
const SCHEMA_TYPES = [
  {
    key: 'SCHEMA_ORG_BLOG_POSTING',
    label: 'BlogPosting',
    icon: '📝',
    description: 'A blog post',
    properties: ['headline', 'alternativeHeadline', 'abstract', 'backstory', 'discussionUrl']
  },
  {
    key: 'SCHEMA_ORG_ARTICLE',
    label: 'Article',
    icon: '📄',
    description: 'General article',
    properties: ['headline', 'alternativeHeadline', 'abstract', 'articleSection', 'wordCount']
  },
  {
    key: 'TechArticle',
    label: 'TechArticle',
    icon: '💻',
    description: 'Technical article',
    properties: ['headline', 'alternativeHeadline', 'abstract', 'dependencies', 'proficiencyLevel']
  },
  {
    key: 'ScholarlyArticle',
    label: 'ScholarlyArticle',
    icon: '🎓',
    description: 'Academic or research article',
    properties: ['headline', 'alternativeHeadline', 'abstract', 'citation', 'funding']
  },
  {
    key: 'NewsArticle',
    label: 'NewsArticle',
    icon: '📰',
    description: 'News article',
    properties: ['headline', 'alternativeHeadline', 'dateline', 'printEdition', 'printSection']
  },
  {
    key: 'HowTo',
    label: 'HowTo',
    icon: '🔧',
    description: 'How-to guide',
    properties: ['name', 'totalTime', 'prepTime', 'performTime', 'supply', 'tool', 'step']
  },
  {
    key: 'SCHEMA_ORG_FAQ_PAGE',
    label: 'FAQPage',
    icon: '❓',
    description: 'Frequently asked questions',
    properties: ['mainEntity']
  },
  {
    key: 'SCHEMA_ORG_COURSE',
    label: 'Course',
    icon: '🎓',
    description: 'Educational course',
    properties: ['name', 'description', 'provider', 'courseCode', 'coursePrerequisites']
  },
  {
    key: 'Review',
    label: 'Review',
    icon: '⭐',
    description: 'Product or service review',
    properties: ['itemReviewed', 'reviewRating', 'reviewAspect', 'positiveNotes', 'negativeNotes']
  },
  {
    key: 'SCHEMA_ORG_DATASET',
    label: 'Dataset',
    icon: '📊',
    description: 'Data or dataset',
    properties: ['name', 'description', 'distribution', 'measurementTechnique', 'variableMeasured']
  }
];

// Common properties that can be overridden
const COMMON_PROPERTIES = [
  { key: 'headline', label: 'Headline', type: 'text', hint: 'Main headline (max 110 chars for Google)' },
  { key: 'alternativeHeadline', label: 'Alternative Headline', type: 'text', hint: 'Subtitle or alternative title' },
  { key: 'abstract', label: 'Abstract', type: 'textarea', hint: 'Brief abstract or summary' },
  { key: 'description', label: 'Description', type: 'textarea', hint: 'Detailed description' },
  { key: 'keywords', label: 'Keywords', type: 'text', hint: 'Comma-separated keywords' },
  { key: 'articleSection', label: 'Article Section', type: 'text', hint: 'Section or category' },
  { key: 'wordCount', label: 'Word Count', type: 'number', hint: 'Total word count' },
  { key: 'timeRequired', label: 'Time Required', type: 'text', hint: 'Reading/completion time (PT10M)' },
  { key: 'proficiencyLevel', label: 'Proficiency Level', type: 'select', options: ['Beginner', 'Intermediate', 'Advanced'] },
  { key: 'educationalLevel', label: 'Educational Level', type: 'text', hint: 'Target education level' },
  { key: 'audience', label: 'Audience', type: 'text', hint: 'Target audience' },
  { key: 'inLanguage', label: 'Language', type: 'text', hint: 'Language code (en-US)' },
  { key: 'genre', label: 'Genre', type: 'text', hint: 'Content genre' },
  { key: 'award', label: 'Awards', type: 'text', hint: 'Any awards received' },
  { key: 'citation', label: 'Citations', type: 'textarea', hint: 'Academic citations' }
];

// State interface for SchemaOrgOverrideWidget
interface SchemaOrgOverrideState {
  selectedType: string;
  customProperties: Record<string, any>;
  showJsonPreview: boolean;
  jsonError: string | null;
}

/**
 * Schema.org Override Widget Component
 */
export class SchemaOrgOverrideWidget extends ProtoAwareWidget<SchemaOrgEntity, SchemaOrgOverrideState> {
  state: SchemaOrgOverrideState = {
    selectedType: '',
    customProperties: {},
    showJsonPreview: false,
    jsonError: null
  };

  componentDidMount() {
    const schema = this.props.value || {};
    this.setState({
      selectedType: schema.type_enum || schema.type || 'SCHEMA_ORG_BLOG_POSTING',
      customProperties: schema.properties || {}
    });
  }

  /**
   * Update schema type
   */
  updateType = (typeKey: string) => {
    const current = this.props.value || {};
    const typeInfo = SCHEMA_TYPES.find(t => t.key === typeKey);
    
    this.handleChange({
      ...current,
      type_enum: typeKey,
      type: typeInfo?.label || typeKey,
      custom_type: undefined
    });
    
    this.setState({ selectedType: typeKey });
    this.trackInteraction('change_schema_type', typeKey);
  };

  /**
   * Update custom type
   */
  updateCustomType = (customType: string) => {
    const current = this.props.value || {};
    
    this.handleChange({
      ...current,
      custom_type: customType,
      type_enum: undefined,
      type: customType
    });
    
    this.trackInteraction('set_custom_type', customType);
  };

  /**
   * Update property value
   */
  updateProperty = (key: string, value: any) => {
    const customProperties = { ...this.state.customProperties };
    
    if (value === '' || value === null || value === undefined) {
      delete customProperties[key];
    } else {
      customProperties[key] = value;
    }
    
    this.setState({ customProperties });
    
    const current = this.props.value || {};
    this.handleChange({
      ...current,
      properties: customProperties
    });
    
    this.trackInteraction('update_property', JSON.stringify({ key, value }));
  };

  /**
   * Add custom property
   */
  addCustomProperty = () => {
    const key = prompt('Enter property name (e.g., customField):');
    if (!key) return;
    
    const value = prompt('Enter property value:');
    if (value === null) return;
    
    this.updateProperty(key, value);
    this.trackInteraction('add_custom_property', key);
  };

  /**
   * Remove custom property
   */
  removeProperty = (key: string) => {
    const customProperties = { ...this.state.customProperties };
    delete customProperties[key];
    
    this.setState({ customProperties });
    
    const current = this.props.value || {};
    this.handleChange({
      ...current,
      properties: customProperties
    });
    
    this.trackInteraction('remove_property', key);
  };

  /**
   * Generate JSON-LD preview
   */
  generateJsonLdPreview = (): string => {
    const schema = this.props.value || {};
    const typeInfo = SCHEMA_TYPES.find(t => t.key === schema.type_enum);
    
    const jsonLd: any = {
      '@context': 'https://schema.org',
      '@type': schema.custom_type || typeInfo?.label || 'BlogPosting',
      ...this.state.customProperties
    };
    
    // Add default properties that would come from article metadata
    const defaults = {
      headline: '{{article.title}}',
      datePublished: '{{article.date_published}}',
      dateModified: '{{article.date_modified}}',
      author: {
        '@type': 'Person',
        name: '{{article.author}}'
      },
      publisher: {
        '@type': 'Organization',
        name: '{{site.name}}',
        logo: {
          '@type': 'ImageObject',
          url: '{{site.logo}}'
        }
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': '{{article.url}}'
      }
    };
    
    // Merge defaults with custom properties
    Object.entries(defaults).forEach(([key, value]) => {
      if (!jsonLd[key]) {
        jsonLd[key] = value;
      }
    });
    
    return JSON.stringify(jsonLd, null, 2);
  };

  /**
   * Toggle JSON preview
   */
  toggleJsonPreview = () => {
    this.setState(prevState => ({
      showJsonPreview: !prevState.showJsonPreview
    }));
    this.trackInteraction('toggle_json_preview', !this.state.showJsonPreview);
  };

  /**
   * Render property input
   */
  renderPropertyInput = (prop: typeof COMMON_PROPERTIES[0], value: any) => {
    const inputId = `prop-${prop.key}`;
    
    switch (prop.type) {
      case 'textarea':
        return (
          <textarea
            id={inputId}
            value={value || ''}
            onChange={(e) => this.updateProperty(prop.key, e.target.value)}
            className="property-textarea"
            placeholder={prop.hint}
            rows={3}
          />
        );
      
      case 'number':
        return (
          <input
            id={inputId}
            type="number"
            value={value || ''}
            onChange={(e) => this.updateProperty(prop.key, e.target.value ? parseInt(e.target.value) : '')}
            className="property-input"
            placeholder={prop.hint}
          />
        );
      
      case 'select':
        return (
          <select
            id={inputId}
            value={value || ''}
            onChange={(e) => this.updateProperty(prop.key, e.target.value)}
            className="property-select"
          >
            <option value="">Select...</option>
            {prop.options?.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        );
      
      default:
        return (
          <input
            id={inputId}
            type="text"
            value={value || ''}
            onChange={(e) => this.updateProperty(prop.key, e.target.value)}
            className="property-input"
            placeholder={prop.hint}
          />
        );
    }
  };

  /**
   * Main render method
   */
  render() {
    const { selectedType, customProperties, showJsonPreview } = this.state;
    const schema = this.props.value || {};
    const selectedTypeInfo = SCHEMA_TYPES.find(t => t.key === selectedType);

    return (
      <div className="decap-widget-schema-org">
        <style>{`
          .decap-widget-schema-org {
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 16px;
            background: #f8fafc;
          }
          
          .widget-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 16px;
            padding-bottom: 12px;
            border-bottom: 2px solid #e2e8f0;
          }
          
          .widget-title {
            font-size: 16px;
            font-weight: 600;
            color: #0f172a;
            display: flex;
            align-items: center;
            gap: 8px;
          }
          
          .schema-badge {
            background: #059669;
            color: white;
            padding: 2px 8px;
            border-radius: 12px;
            font-size: 11px;
            font-weight: 500;
          }
          
          .preview-button {
            padding: 6px 12px;
            background: #3b82f6;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 13px;
          }
          
          .preview-button:hover {
            background: #2563eb;
          }
          
          .schema-content {
            background: white;
            border: 1px solid #e2e8f0;
            border-radius: 6px;
            padding: 16px;
          }
          
          .type-section {
            margin-bottom: 20px;
          }
          
          .type-label {
            font-size: 14px;
            font-weight: 500;
            color: #475569;
            margin-bottom: 8px;
          }
          
          .type-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            gap: 8px;
            margin-bottom: 12px;
          }
          
          .type-button {
            display: flex;
            align-items: center;
            gap: 6px;
            padding: 8px 12px;
            background: white;
            border: 1px solid #e2e8f0;
            border-radius: 6px;
            cursor: pointer;
            transition: all 0.2s;
            font-size: 13px;
          }
          
          .type-button:hover {
            background: #f0f9ff;
            border-color: #0ea5e9;
            transform: translateY(-1px);
          }
          
          .type-button.selected {
            background: #0ea5e9;
            color: white;
            border-color: #0ea5e9;
          }
          
          .type-icon {
            font-size: 16px;
          }
          
          .custom-type-input {
            display: flex;
            gap: 8px;
            margin-top: 8px;
          }
          
          .custom-type-input input {
            flex: 1;
            padding: 8px;
            border: 1px solid #e2e8f0;
            border-radius: 4px;
            font-size: 14px;
          }
          
          .properties-section {
            margin-top: 20px;
            padding-top: 20px;
            border-top: 1px solid #e2e8f0;
          }
          
          .properties-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 16px;
          }
          
          .properties-title {
            font-size: 14px;
            font-weight: 600;
            color: #0f172a;
          }
          
          .add-property-button {
            padding: 4px 8px;
            background: #10b981;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 12px;
          }
          
          .add-property-button:hover {
            background: #059669;
          }
          
          .property-item {
            margin-bottom: 16px;
            padding: 12px;
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 6px;
          }
          
          .property-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 8px;
          }
          
          .property-label {
            font-size: 13px;
            font-weight: 500;
            color: #475569;
          }
          
          .property-remove {
            padding: 2px 6px;
            background: #ef4444;
            color: white;
            border: none;
            border-radius: 3px;
            cursor: pointer;
            font-size: 11px;
          }
          
          .property-remove:hover {
            background: #dc2626;
          }
          
          .property-input,
          .property-textarea,
          .property-select {
            width: 100%;
            padding: 8px;
            border: 1px solid #e2e8f0;
            border-radius: 4px;
            font-size: 14px;
          }
          
          .property-textarea {
            font-family: inherit;
            resize: vertical;
          }
          
          .property-hint {
            font-size: 11px;
            color: #64748b;
            margin-top: 4px;
          }
          
          .custom-property {
            background: #fef3c7;
            border-color: #fcd34d;
          }
          
          .custom-property .property-label {
            color: #92400e;
          }
          
          .json-preview {
            margin-top: 20px;
            padding: 16px;
            background: #1e293b;
            border-radius: 6px;
            overflow-x: auto;
          }
          
          .json-preview pre {
            margin: 0;
            color: #e2e8f0;
            font-size: 12px;
            font-family: 'Monaco', 'Courier New', monospace;
            line-height: 1.5;
          }
          
          .json-preview .json-key {
            color: #7dd3fc;
          }
          
          .json-preview .json-string {
            color: #86efac;
          }
          
          .json-preview .json-placeholder {
            color: #fbbf24;
            font-style: italic;
          }
          
          .type-description {
            font-size: 12px;
            color: #64748b;
            margin-top: 12px;
            padding: 8px;
            background: #f1f5f9;
            border-radius: 4px;
          }
          
          .recommended-badge {
            display: inline-block;
            background: #10b981;
            color: white;
            padding: 2px 6px;
            border-radius: 3px;
            font-size: 10px;
            font-weight: 500;
            margin-left: 6px;
            text-transform: uppercase;
          }
        `}</style>

        {/* Widget Header */}
        <div className="widget-header">
          <h3 className="widget-title">
            Schema.org Configuration
            <span className="schema-badge">JSON-LD</span>
          </h3>
          <button
            type="button"
            onClick={this.toggleJsonPreview}
            className="preview-button"
          >
            {showJsonPreview ? 'Hide' : 'Show'} JSON-LD Preview
          </button>
        </div>

        {/* Schema Content */}
        <div className="schema-content">
          {/* Type Selection */}
          <div className="type-section">
            <div className="type-label">Schema Type</div>
            <div className="type-grid">
              {SCHEMA_TYPES.map(type => (
                <button
                  key={type.key}
                  type="button"
                  onClick={() => this.updateType(type.key)}
                  className={`type-button ${selectedType === type.key ? 'selected' : ''}`}
                  title={type.description}
                >
                  <span className="type-icon">{type.icon}</span>
                  <span>{type.label}</span>
                  {type.key === 'SCHEMA_ORG_BLOG_POSTING' && (
                    <span className="recommended-badge">Default</span>
                  )}
                </button>
              ))}
            </div>
            
            {/* Custom Type Input */}
            <div className="custom-type-input">
              <input
                type="text"
                value={schema.custom_type || ''}
                onChange={(e) => this.updateCustomType(e.target.value)}
                placeholder="Or enter custom Schema.org type..."
              />
            </div>
            
            {/* Type Description */}
            {selectedTypeInfo && (
              <div className="type-description">
                <strong>{selectedTypeInfo.label}:</strong> {selectedTypeInfo.description}
                {selectedTypeInfo.properties.length > 0 && (
                  <div style={{ marginTop: '4px' }}>
                    <em>Recommended properties:</em> {selectedTypeInfo.properties.join(', ')}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Properties Section */}
          <div className="properties-section">
            <div className="properties-header">
              <h4 className="properties-title">Custom Properties</h4>
              <button
                type="button"
                onClick={this.addCustomProperty}
                className="add-property-button"
              >
                + Add Property
              </button>
            </div>

            {/* Common Properties */}
            {COMMON_PROPERTIES.map(prop => {
              const value = customProperties[prop.key];
              const hasValue = value !== undefined && value !== '';
              
              if (!hasValue && !selectedTypeInfo?.properties.includes(prop.key)) {
                return null; // Don't show empty non-recommended properties
              }
              
              return (
                <div key={prop.key} className="property-item">
                  <div className="property-header">
                    <label htmlFor={`prop-${prop.key}`} className="property-label">
                      {prop.label}
                      {selectedTypeInfo?.properties.includes(prop.key) && (
                        <span className="recommended-badge">Recommended</span>
                      )}
                    </label>
                    {hasValue && (
                      <button
                        type="button"
                        onClick={() => this.removeProperty(prop.key)}
                        className="property-remove"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  {this.renderPropertyInput(prop, value)}
                  {prop.hint && (
                    <div className="property-hint">{prop.hint}</div>
                  )}
                </div>
              );
            })}

            {/* Custom Properties */}
            {Object.entries(customProperties).map(([key, value]) => {
              // Skip if it's a common property
              if (COMMON_PROPERTIES.some(p => p.key === key)) {
                return null;
              }
              
              return (
                <div key={key} className="property-item custom-property">
                  <div className="property-header">
                    <span className="property-label">{key} (custom)</span>
                    <button
                      type="button"
                      onClick={() => this.removeProperty(key)}
                      className="property-remove"
                    >
                      Remove
                    </button>
                  </div>
                  <input
                    type="text"
                    value={value || ''}
                    onChange={(e) => this.updateProperty(key, e.target.value)}
                    className="property-input"
                    aria-label={`Value for ${key}`}
                  />
                </div>
              );
            })}

            {/* Empty State */}
            {Object.keys(customProperties).length === 0 && (
              <div style={{ textAlign: 'center', padding: '24px', color: '#64748b' }}>
                No custom properties configured.
                <br />
                Add properties to override default Schema.org values.
              </div>
            )}
          </div>
        </div>

        {/* JSON-LD Preview */}
        {showJsonPreview && (
          <div className="json-preview">
            <pre dangerouslySetInnerHTML={{ 
              __html: this.generateJsonLdPreview()
                .replace(/"(@\w+)":/g, '<span class="json-key">"$1":</span>')
                .replace(/: "(.*?)"/g, (match, p1) => {
                  if (p1.includes('{{')) {
                    return `: <span class="json-placeholder">"${p1}"</span>`;
                  }
                  return `: <span class="json-string">"${p1}"</span>`;
                })
            }} />
          </div>
        )}

        {/* Help text */}
        {this.renderHelp()}
      </div>
    );
  }
}