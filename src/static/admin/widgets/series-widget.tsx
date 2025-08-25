/**
 * @fileoverview Series Widget for Multi-Part Content Management
 * @module static/admin/widgets/series-widget
 * 
 * @description
 * Custom CMS widget for managing article series and multi-part content.
 * This widget enables content creators to organize related articles into
 * cohesive series with navigation, progress tracking, and discoverability
 * features, supporting educational and narrative content strategies.
 * 
 * The widget implements the ArticleSeries protobuf message from blog.proto,
 * providing structured navigation through sequential content.
 * 
 * @architecture
 * The series system uses a linked-list approach:
 * 1. **Series Identity**: Unique key and title for the series
 * 2. **Part Navigation**: Previous/next article linking
 * 3. **Progress Tracking**: Part number and total parts
 * 4. **Landing Pages**: Dedicated series overview pages
 * 5. **Discovery**: Series-based content recommendations
 * 
 * @proto-integration
 * Maps to ArticleSeries message in blog.proto:
 * ```protobuf
 * message ArticleSeries {
 *   optional string series_key = 1;
 *   optional string series_title = 2;
 *   optional int32 part_number = 3;
 *   optional int32 total_parts = 4;
 *   optional string previous_slug = 5;
 *   optional string next_slug = 6;
 *   optional string description = 7;
 *   optional string landing_url = 8;
 * }
 * ```
 * 
 * @ecosystem-integration
 * - Navigation: Series navigation component in articles
 * - Discovery: Series recommendations in search
 * - Schema.org: Maps to Article series metadata
 * - Analytics: Track series completion rates
 * - SEO: Series structure enhances content authority
 * - RSS: Series-specific RSS feeds available
 * 
 * @features
 * - **Series Creation**: Define new series with key and title
 * - **Part Management**: Number articles within series
 * - **Navigation Links**: Connect previous/next articles
 * - **Progress Indicator**: Visual series completion
 * - **Landing Pages**: Overview pages for entire series
 * - **Templates**: Common series patterns (tutorial, guide, course)
 * - **Auto-suggestion**: Smart series key generation
 * 
 * @series-types
 * - **Tutorial Series**: Step-by-step educational content
 * - **Complete Guides**: Comprehensive topic coverage
 * - **Courses/Lessons**: Structured learning paths
 * - **Journey/Story**: Narrative content sequences
 * - **Deep Dives**: In-depth technical explorations
 * - **Experiments**: Challenge or experiment series
 * 
 * @navigation-flow
 * 1. Reader discovers series through search/recommendations
 * 2. Lands on any article in the series
 * 3. Sees series navigation with progress
 * 4. Can navigate to previous/next parts
 * 5. Can jump to series landing page
 * 6. Tracks progress through series
 * 
 * @content-strategy
 * Series enable:
 * - Breaking complex topics into digestible parts
 * - Building reader engagement over time
 * - Creating learning paths
 * - Establishing content authority
 * - Improving content discoverability
 * 
 * @ui-components
 * - Series key input with slug validation
 * - Title field for display name
 * - Part number selector
 * - Total parts input
 * - Previous/next article slug fields
 * - Description textarea
 * - Template selector for common patterns
 * 
 * @seo-benefits
 * - Improved content structure signals
 * - Enhanced internal linking
 * - Topic authority building
 * - Reduced bounce rate
 * - Increased time on site
 * 
 * @dos
 * - Plan series structure before starting
 * - Use consistent series keys
 * - Number parts sequentially
 * - Link all parts bidirectionally
 * - Create compelling series descriptions
 * - Test navigation flow
 * 
 * @donts
 * - Don't break series navigation chains
 * - Don't change series keys after publishing
 * - Don't skip part numbers
 * - Don't forget landing pages
 * - Don't mix unrelated content in series
 * 
 * @example
 * ```yaml
 * series:
 *   series_key: "gatsby-tutorial"
 *   series_title: "Complete Gatsby Tutorial"
 *   part_number: 3
 *   total_parts: 10
 *   previous_slug: "gatsby-tutorial-part-2"
 *   next_slug: "gatsby-tutorial-part-4"
 *   description: "Learn Gatsby from scratch with this comprehensive tutorial series"
 *   landing_url: "/series/gatsby-tutorial"
 * ```
 * 
 * @see {@link file://./CMS.md#series-management} - Series documentation
 * @see {@link file://./config/schema/blog.proto#ArticleSeries} - Proto definition
 * @see {@link file://./src/components/article/ArticleNavigation.tsx} - Series navigation
 * @see {@link file://./src/USE-CASE.md#content-series} - Series use cases
 * @see {@link file://./SEARCH.md#series-discovery} - Series in search
 * 
 * @since 1.0.0
 */

import React from 'react';
import { CmsWidgetControlProps as WidgetProps } from 'decap-cms-core';
import { ProtoAwareWidget } from './base-widget';

// Type definition based on ArticleSeries schema
interface ArticleSeries {
  series_key?: string;
  series_title?: string;
  part_number?: number;
  total_parts?: number;
  previous_slug?: string;
  next_slug?: string;
  description?: string;
  landing_url?: string;
}

// Common series patterns
const SERIES_TEMPLATES = [
  { 
    key: 'tutorial', 
    title: 'Tutorial Series',
    icon: '📚',
    example: 'building-a-blog',
    description: 'Step-by-step tutorial series'
  },
  { 
    key: 'guide', 
    title: 'Complete Guide',
    icon: '📖',
    example: 'complete-guide-to-gatsby',
    description: 'Comprehensive guide series'
  },
  { 
    key: 'course', 
    title: 'Course/Lessons',
    icon: '🎓',
    example: 'javascript-fundamentals',
    description: 'Educational course content'
  },
  { 
    key: 'journey', 
    title: 'Journey/Story',
    icon: '🚀',
    example: 'startup-journey',
    description: 'Narrative or journey series'
  },
  { 
    key: 'deepdive', 
    title: 'Deep Dive',
    icon: '🔍',
    example: 'react-internals',
    description: 'In-depth exploration series'
  },
  { 
    key: 'experiment', 
    title: 'Experiment Series',
    icon: '🧪',
    example: '30-day-challenge',
    description: 'Experimental or challenge series'
  }
];

/**
 * Series Widget Component
 */
export class SeriesWidget extends ProtoAwareWidget<ArticleSeries> {
  state = {
    isInSeries: false,
    showSuggestions: false,
    suggestedKey: '',
    validationErrors: {} as Record<string, string>
  };

  componentDidMount() {
    const series = this.props.value || {};
    this.setState({ 
      isInSeries: !!(series.series_key || series.series_title)
    });
  }

  /**
   * Toggle series mode
   */
  toggleSeriesMode = () => {
    const newIsInSeries = !this.state.isInSeries;
    
    if (!newIsInSeries) {
      // Clear all series data when disabling
      this.handleChange({});
      this.trackInteraction('disable_series', null);
    } else {
      // Initialize with defaults
      this.handleChange({
        part_number: 1,
        total_parts: undefined
      });
      this.trackInteraction('enable_series', null);
    }
    
    this.setState({ isInSeries: newIsInSeries });
  };

  /**
   * Update series field
   */
  updateField = (field: keyof ArticleSeries, value: any) => {
    const current = this.props.value || {};
    const updated = { ...current, [field]: value };
    
    // Auto-generate series key from title if not set
    if (field === 'series_title' && value && !current.series_key) {
      updated.series_key = this.generateSeriesKey(value);
    }
    
    // Validate part numbers
    if (field === 'part_number' || field === 'total_parts') {
      this.validatePartNumbers(updated);
    }
    
    this.handleChange(updated);
    this.trackInteraction(`update_${field}`, value);
  };

  /**
   * Generate series key from title
   */
  generateSeriesKey = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  };

  /**
   * Validate part numbers
   */
  validatePartNumbers = (series: ArticleSeries) => {
    const errors: Record<string, string> = {};
    
    if (series.part_number && series.part_number < 1) {
      errors.part_number = 'Part number must be at least 1';
    }
    
    if (series.total_parts && series.total_parts < 1) {
      errors.total_parts = 'Total parts must be at least 1';
    }
    
    if (series.part_number && series.total_parts && series.part_number > series.total_parts) {
      errors.part_number = 'Part number cannot exceed total parts';
    }
    
    this.setState({ validationErrors: errors });
  };

  /**
   * Apply series template
   */
  applyTemplate = (template: typeof SERIES_TEMPLATES[0]) => {
    const current = this.props.value || {};
    
    this.updateField('series_key', template.example);
    this.updateField('description', template.description);
    
    this.setState({ 
      showSuggestions: false,
      suggestedKey: template.example 
    });
    
    this.trackInteraction('apply_template', template.key);
  };

  /**
   * Render series progress indicator
   */
  renderProgressIndicator = () => {
    const series = this.props.value || {};
    const { part_number, total_parts } = series;
    
    if (!part_number) return null;
    
    const percentage = total_parts 
      ? Math.round((part_number / total_parts) * 100)
      : 0;
    
    return (
      <div className="progress-indicator">
        <div className="progress-header">
          <span className="progress-label">Series Progress</span>
          {total_parts && (
            <span className="progress-text">
              Part {part_number} of {total_parts} ({percentage}%)
            </span>
          )}
        </div>
        
        {total_parts && (
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${percentage}%` }}
            />
            {/* Part markers */}
            {Array.from({ length: total_parts }, (_, i) => (
              <div
                key={i}
                className={`part-marker ${i + 1 === part_number ? 'current' : ''} ${i + 1 < part_number ? 'completed' : ''}`}
                style={{ left: `${((i + 1) / total_parts) * 100}%` }}
                title={`Part ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  /**
   * Render navigation preview
   */
  renderNavigationPreview = () => {
    const series = this.props.value || {};
    const { previous_slug, next_slug, part_number } = series;
    
    if (!previous_slug && !next_slug) return null;
    
    return (
      <div className="navigation-preview">
        <div className="nav-title">Article Navigation</div>
        <div className="nav-links">
          {previous_slug ? (
            <div className="nav-link previous">
              <span className="nav-arrow">←</span>
              <div className="nav-content">
                <div className="nav-label">Previous</div>
                <div className="nav-slug">{previous_slug}</div>
                {part_number && part_number > 1 && (
                  <div className="nav-part">Part {part_number - 1}</div>
                )}
              </div>
            </div>
          ) : (
            <div className="nav-link disabled">
              <span className="nav-arrow">←</span>
              <div className="nav-content">
                <div className="nav-label">First Article</div>
              </div>
            </div>
          )}
          
          {next_slug ? (
            <div className="nav-link next">
              <div className="nav-content">
                <div className="nav-label">Next</div>
                <div className="nav-slug">{next_slug}</div>
                {part_number && (
                  <div className="nav-part">Part {part_number + 1}</div>
                )}
              </div>
              <span className="nav-arrow">→</span>
            </div>
          ) : (
            <div className="nav-link disabled">
              <div className="nav-content">
                <div className="nav-label">Last Article</div>
              </div>
              <span className="nav-arrow">→</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  /**
   * Main render method
   */
  render() {
    const { isInSeries, showSuggestions, validationErrors } = this.state;
    const series = this.props.value || {};

    return (
      <div className="decap-widget-series">
        <style>{`
          .decap-widget-series {
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
          }
          
          .widget-title {
            font-size: 16px;
            font-weight: 600;
            color: #0f172a;
            display: flex;
            align-items: center;
            gap: 8px;
          }
          
          .series-badge {
            background: #8b5cf6;
            color: white;
            padding: 2px 8px;
            border-radius: 12px;
            font-size: 11px;
            font-weight: 500;
            text-transform: uppercase;
          }
          
          .toggle-button {
            padding: 6px 12px;
            background: white;
            border: 1px solid #e2e8f0;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            color: #475569;
            transition: all 0.2s;
          }
          
          .toggle-button:hover {
            background: #f1f5f9;
            border-color: #cbd5e1;
          }
          
          .toggle-button.active {
            background: #8b5cf6;
            color: white;
            border-color: #8b5cf6;
          }
          
          .series-content {
            background: white;
            border: 1px solid #e2e8f0;
            border-radius: 6px;
            padding: 16px;
          }
          
          .field-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
            margin-bottom: 16px;
          }
          
          .field-group {
            margin-bottom: 16px;
          }
          
          .field-label {
            display: block;
            font-size: 14px;
            font-weight: 500;
            color: #475569;
            margin-bottom: 6px;
          }
          
          .required-mark {
            color: #ef4444;
            margin-left: 4px;
          }
          
          .field-input {
            width: 100%;
            padding: 8px 12px;
            border: 1px solid #e2e8f0;
            border-radius: 4px;
            font-size: 14px;
          }
          
          .field-input:focus {
            outline: none;
            border-color: #8b5cf6;
            box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
          }
          
          .field-input.error {
            border-color: #ef4444;
          }
          
          .field-error {
            font-size: 12px;
            color: #ef4444;
            margin-top: 4px;
          }
          
          .field-hint {
            font-size: 12px;
            color: #64748b;
            margin-top: 4px;
          }
          
          .template-section {
            margin-bottom: 16px;
            padding-bottom: 16px;
            border-bottom: 1px solid #e2e8f0;
          }
          
          .template-label {
            font-size: 13px;
            font-weight: 500;
            color: #64748b;
            margin-bottom: 8px;
          }
          
          .template-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 8px;
          }
          
          .template-button {
            padding: 8px;
            background: white;
            border: 1px solid #e2e8f0;
            border-radius: 6px;
            cursor: pointer;
            transition: all 0.2s;
            text-align: center;
          }
          
          .template-button:hover {
            background: #f8f4ff;
            border-color: #8b5cf6;
            transform: translateY(-1px);
          }
          
          .template-icon {
            font-size: 20px;
            margin-bottom: 4px;
          }
          
          .template-name {
            font-size: 12px;
            color: #475569;
          }
          
          .progress-indicator {
            margin: 20px 0;
            padding: 16px;
            background: #f8f4ff;
            border: 1px solid #ddd6fe;
            border-radius: 6px;
          }
          
          .progress-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 12px;
          }
          
          .progress-label {
            font-size: 13px;
            font-weight: 600;
            color: #6b21a8;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }
          
          .progress-text {
            font-size: 13px;
            color: #7c3aed;
            font-weight: 500;
          }
          
          .progress-bar {
            position: relative;
            height: 8px;
            background: #e9d5ff;
            border-radius: 4px;
            overflow: visible;
          }
          
          .progress-fill {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            background: linear-gradient(90deg, #8b5cf6, #7c3aed);
            border-radius: 4px;
            transition: width 0.3s ease;
          }
          
          .part-marker {
            position: absolute;
            top: -4px;
            width: 16px;
            height: 16px;
            background: white;
            border: 2px solid #e9d5ff;
            border-radius: 50%;
            transform: translateX(-50%);
            transition: all 0.2s;
          }
          
          .part-marker.current {
            background: #8b5cf6;
            border-color: #8b5cf6;
            box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.2);
          }
          
          .part-marker.completed {
            background: #a78bfa;
            border-color: #a78bfa;
          }
          
          .navigation-preview {
            margin-top: 20px;
            padding: 16px;
            background: #f0f9ff;
            border: 1px solid #bae6fd;
            border-radius: 6px;
          }
          
          .nav-title {
            font-size: 13px;
            font-weight: 600;
            color: #0369a1;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 12px;
          }
          
          .nav-links {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
          }
          
          .nav-link {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 12px;
            background: white;
            border: 1px solid #e0f2fe;
            border-radius: 6px;
            transition: all 0.2s;
          }
          
          .nav-link:hover:not(.disabled) {
            background: #e0f2fe;
            transform: translateX(2px);
          }
          
          .nav-link.previous:hover:not(.disabled) {
            transform: translateX(-2px);
          }
          
          .nav-link.disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }
          
          .nav-arrow {
            font-size: 18px;
            color: #0284c7;
          }
          
          .nav-content {
            flex: 1;
          }
          
          .nav-label {
            font-size: 11px;
            font-weight: 600;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }
          
          .nav-slug {
            font-size: 13px;
            color: #0c4a6e;
            font-family: monospace;
            margin-top: 2px;
          }
          
          .nav-part {
            font-size: 11px;
            color: #0284c7;
            margin-top: 2px;
          }
          
          .empty-state {
            text-align: center;
            padding: 32px;
            color: #64748b;
          }
          
          .empty-state-icon {
            font-size: 48px;
            margin-bottom: 12px;
            opacity: 0.5;
          }
          
          .empty-state-text {
            font-size: 14px;
          }
        `}</style>

        {/* Widget Header */}
        <div className="widget-header">
          <h3 className="widget-title">
            Article Series
            {isInSeries && series.series_title && (
              <span className="series-badge">{series.series_title}</span>
            )}
          </h3>
          <button
            type="button"
            onClick={this.toggleSeriesMode}
            className={`toggle-button ${isInSeries ? 'active' : ''}`}
          >
            {isInSeries ? 'Part of Series' : 'Not in Series'}
          </button>
        </div>

        {!isInSeries ? (
          // Empty State
          <div className="empty-state">
            <div className="empty-state-icon">📄</div>
            <div className="empty-state-text">
              This article is not part of a series.
              <br />
              Toggle above to add it to a series.
            </div>
          </div>
        ) : (
          // Series Form
          <div className="series-content">
            {/* Template Suggestions */}
            {!series.series_key && (
              <div className="template-section">
                <div className="template-label">Quick Templates:</div>
                <div className="template-grid">
                  {SERIES_TEMPLATES.map(template => (
                    <button
                      key={template.key}
                      type="button"
                      onClick={() => this.applyTemplate(template)}
                      className="template-button"
                    >
                      <div className="template-icon">{template.icon}</div>
                      <div className="template-name">{template.title}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Series Identification */}
            <div className="field-row">
              <div className="field-group">
                <label className="field-label">
                  Series Key
                  <span className="required-mark">*</span>
                </label>
                <input
                  type="text"
                  value={series.series_key || ''}
                  onChange={(e) => this.updateField('series_key', e.target.value)}
                  className="field-input"
                  placeholder="my-tutorial-series"
                  aria-required="true"
                />
                <div className="field-hint">
                  URL-friendly identifier for this series
                </div>
              </div>

              <div className="field-group">
                <label className="field-label">
                  Series Title
                  <span className="required-mark">*</span>
                </label>
                <input
                  type="text"
                  value={series.series_title || ''}
                  onChange={(e) => this.updateField('series_title', e.target.value)}
                  className="field-input"
                  placeholder="Building a Blog with Gatsby"
                  aria-required="true"
                />
              </div>
            </div>

            {/* Part Numbers */}
            <div className="field-row">
              <div className="field-group">
                <label className="field-label">
                  Part Number
                  <span className="required-mark">*</span>
                </label>
                <input
                  type="number"
                  value={series.part_number || ''}
                  onChange={(e) => this.updateField('part_number', parseInt(e.target.value))}
                  className={`field-input ${validationErrors.part_number ? 'error' : ''}`}
                  placeholder="1"
                  min="1"
                  aria-required="true"
                />
                {validationErrors.part_number && (
                  <div className="field-error">{validationErrors.part_number}</div>
                )}
              </div>

              <div className="field-group">
                <label className="field-label">
                  Total Parts
                </label>
                <input
                  type="number"
                  value={series.total_parts || ''}
                  onChange={(e) => this.updateField('total_parts', e.target.value ? parseInt(e.target.value) : undefined)}
                  className={`field-input ${validationErrors.total_parts ? 'error' : ''}`}
                  placeholder="10 (optional)"
                  min="1"
                />
                {validationErrors.total_parts && (
                  <div className="field-error">{validationErrors.total_parts}</div>
                )}
                <div className="field-hint">
                  Leave empty if total is unknown
                </div>
              </div>
            </div>

            {/* Series Description */}
            <div className="field-group">
              <label className="field-label">
                Series Description
              </label>
              <input
                type="text"
                value={series.description || ''}
                onChange={(e) => this.updateField('description', e.target.value)}
                className="field-input"
                placeholder="A comprehensive guide to building modern blogs"
              />
              <div className="field-hint">
                Brief description of the series purpose
              </div>
            </div>

            {/* Navigation Links */}
            <div className="field-row">
              <div className="field-group">
                <label className="field-label">
                  Previous Article Slug
                </label>
                <input
                  type="text"
                  value={series.previous_slug || ''}
                  onChange={(e) => this.updateField('previous_slug', e.target.value)}
                  className="field-input"
                  placeholder="introduction-to-gatsby"
                />
                <div className="field-hint">
                  Slug of the previous article in series
                </div>
              </div>

              <div className="field-group">
                <label className="field-label">
                  Next Article Slug
                </label>
                <input
                  type="text"
                  value={series.next_slug || ''}
                  onChange={(e) => this.updateField('next_slug', e.target.value)}
                  className="field-input"
                  placeholder="setting-up-gatsby-project"
                />
                <div className="field-hint">
                  Slug of the next article in series
                </div>
              </div>
            </div>

            {/* Landing Page */}
            <div className="field-group">
              <label className="field-label">
                Series Landing Page URL
              </label>
              <input
                type="url"
                value={series.landing_url || ''}
                onChange={(e) => this.updateField('landing_url', e.target.value)}
                className="field-input"
                placeholder="https://example.com/series/gatsby-tutorial"
              />
              <div className="field-hint">
                Optional landing page that lists all series articles
              </div>
            </div>

            {/* Progress Indicator */}
            {this.renderProgressIndicator()}

            {/* Navigation Preview */}
            {this.renderNavigationPreview()}
          </div>
        )}

        {/* Help text */}
        {this.renderHelp()}
      </div>
    );
  }
}