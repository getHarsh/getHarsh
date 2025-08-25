/**
 * @fileoverview Feature Overrides Widget for Granular Article Control
 * @module static/admin/widgets/feature-overrides-widget
 * 
 * @description
 * Custom CMS widget for managing article-specific feature flags, enabling
 * content creators to selectively disable features on a per-article basis.
 * This widget provides fine-grained control over article presentation,
 * allowing optimization for different content types and reading experiences.
 * 
 * The widget implements the ArticleFeatureOverrides protobuf message from
 * blog.proto, providing a visual interface for toggling 10+ feature flags.
 * 
 * @architecture
 * The feature override system uses a hierarchical approach:
 * 1. **Global Defaults**: Domain-wide feature configuration
 * 2. **Article Overrides**: Per-article feature flags
 * 3. **Category Grouping**: Logical feature organization
 * 4. **Impact Preview**: Visual feedback on changes
 * 5. **Runtime Application**: Features disabled during render
 * 
 * @proto-integration
 * Maps to ArticleFeatureOverrides message in blog.proto:
 * ```protobuf
 * message ArticleFeatureOverrides {
 *   optional bool disable_comments = 1;
 *   optional bool disable_share = 2;
 *   optional bool disable_toc = 3;
 *   optional bool disable_related = 4;
 *   optional bool disable_author_bio = 5;
 *   optional bool disable_series_nav = 6;
 *   optional bool disable_math = 7;
 *   optional bool disable_syntax_highlighting = 8;
 *   optional bool disable_mermaid = 9;
 *   optional bool disable_discussion = 10;
 *   optional bool disable_breadcrumbs = 11;
 *   optional bool disable_search = 12;
 * }
 * ```
 * 
 * @ecosystem-integration
 * - Component System: Features map to React components
 * - Theme System: Respects theme-specific defaults
 * - Analytics: Tracks feature usage patterns
 * - Performance: Disabled features skip rendering
 * - SEO: Some features affect structured data
 * - Accessibility: Maintains WCAG compliance
 * 
 * @features
 * - **Categorical Organization**: Grouped by function
 * - **Visual Toggle Interface**: Clear on/off states
 * - **Impact Preview**: See what gets disabled
 * - **Batch Operations**: Toggle entire categories
 * - **Disabled Count**: Real-time override tracking
 * - **Warning System**: Alert for active overrides
 * - **Expandable UI**: Collapsible category panels
 * 
 * @feature-categories
 * **Social & Engagement**:
 * - Comments: Article comment section
 * - Share: Social sharing buttons
 * - Discussions: External discussion links
 * 
 * **Navigation & Structure**:
 * - TOC: Table of contents sidebar
 * - Related: Related articles section
 * - Series Nav: Multi-part navigation
 * - Breadcrumbs: Navigation trail
 * 
 * **Content Enhancement**:
 * - Syntax Highlighting: Code colorization
 * - Math: LaTeX/KaTeX rendering
 * - Mermaid: Diagram rendering
 * 
 * **Author & Attribution**:
 * - Author Bio: Writer information section
 * 
 * **Discovery**:
 * - Search: In-page search functionality
 * 
 * @use-cases
 * Feature overrides enable:
 * - Minimal reading mode for focus
 * - Performance optimization for mobile
 * - Custom layouts for special content
 * - A/B testing feature impact
 * - Accessibility accommodations
 * 
 * @ui-behavior
 * - Category headers toggle expansion
 * - Checkboxes control feature state
 * - Red highlighting for disabled features
 * - Warning banner shows override count
 * - Reset button clears all overrides
 * - Preview shows component impact
 * 
 * @performance-impact
 * Disabled features:
 * - Skip component rendering
 * - Reduce JavaScript bundle size
 * - Lower memory usage
 * - Faster page load
 * - Improved Core Web Vitals
 * 
 * @dos
 * - Consider reader experience first
 * - Test with disabled features
 * - Document why features are disabled
 * - Monitor engagement metrics
 * - Use sparingly and intentionally
 * 
 * @donts
 * - Don't disable accessibility features
 * - Don't remove essential navigation
 * - Don't break content flow
 * - Don't forget mobile impact
 * - Don't ignore SEO implications
 * 
 * @example
 * ```yaml
 * feature_overrides:
 *   disable_comments: true     # Focus article, no distractions
 *   disable_share: false        # Keep sharing enabled
 *   disable_toc: true          # Short article, no TOC needed
 *   disable_related: false      # Show related content
 *   disable_author_bio: false   # Keep author attribution
 *   disable_series_nav: false   # Part of a series
 *   disable_math: true         # No math content
 *   disable_syntax_highlighting: false  # Has code examples
 *   disable_mermaid: true      # No diagrams
 *   disable_discussion: false   # Allow discussions
 * ```
 * 
 * @see {@link file://./CMS.md#feature-overrides} - Feature override docs
 * @see {@link file://./config/schema/blog.proto#ArticleFeatureOverrides} - Proto definition
 * @see {@link file://./src/components/article/ArticleFeatures.tsx} - Feature components
 * @see {@link file://./src/USE-CASE.md#feature-flags} - Feature flag patterns
 * @see {@link file://./README.md#performance} - Performance optimization
 * 
 * @since 1.0.0
 */
 * 
 * @since 1.0.0
 */

import React from 'react';
import { CmsWidgetControlProps as WidgetProps } from 'decap-cms-core';
import { ProtoAwareWidget } from './base-widget';

/**
 * @interface ArticleFeatureOverrides
 * @description Type definition based on ArticleFeatureOverrides protobuf schema
 * Each boolean flag, when true, disables the corresponding feature for the article
 */
interface ArticleFeatureOverrides {
  disable_comments?: boolean;
  disable_share?: boolean;
  disable_toc?: boolean;
  disable_related?: boolean;
  disable_author_bio?: boolean;
  disable_series_nav?: boolean;
  disable_math?: boolean;
  disable_syntax_highlighting?: boolean;
  disable_mermaid?: boolean;
  disable_discussion?: boolean;
}

/**
 * @constant FEATURES
 * @description Feature definitions with metadata for UI rendering
 * Organized by category with icons, descriptions, and impact statements
 */
const FEATURES = [
  {
    category: 'Social & Engagement',
    icon: '💬',
    features: [
      {
        key: 'disable_comments',
        label: 'Comments',
        description: 'Reader comments and discussion section',
        impact: 'Removes comment form and existing comments from display',
        icon: '💭'
      },
      {
        key: 'disable_share',
        label: 'Social Sharing',
        description: 'Social media share buttons',
        impact: 'Removes Twitter, LinkedIn, Facebook share buttons',
        icon: '📢'
      },
      {
        key: 'disable_discussion',
        label: 'Discussion Links',
        description: 'External discussion platform links',
        impact: 'Hides GitHub, Reddit, Twitter discussion links',
        icon: '🔗'
      }
    ]
  },
  {
    category: 'Navigation & Structure',
    icon: '🧭',
    features: [
      {
        key: 'disable_toc',
        label: 'Table of Contents',
        description: 'Automatic table of contents generation',
        impact: 'Removes the floating TOC sidebar and in-content TOC',
        icon: '📑'
      },
      {
        key: 'disable_related',
        label: 'Related Articles',
        description: 'Related/recommended articles section',
        impact: 'Removes "You might also like" section at article end',
        icon: '📚'
      },
      {
        key: 'disable_series_nav',
        label: 'Series Navigation',
        description: 'Previous/Next navigation for series',
        impact: 'Removes series navigation even if article is part of series',
        icon: '⏭️'
      }
    ]
  },
  {
    category: 'Content Enhancement',
    icon: '✨',
    features: [
      {
        key: 'disable_syntax_highlighting',
        label: 'Syntax Highlighting',
        description: 'Code syntax highlighting with Prism.js',
        impact: 'Code blocks will render as plain monospace text',
        icon: '🎨'
      },
      {
        key: 'disable_math',
        label: 'Math Rendering',
        description: 'KaTeX/MathJax math formula rendering',
        impact: 'Math formulas will display as raw LaTeX code',
        icon: '🔢'
      },
      {
        key: 'disable_mermaid',
        label: 'Mermaid Diagrams',
        description: 'Mermaid diagram rendering',
        impact: 'Mermaid code blocks will not render as diagrams',
        icon: '📊'
      }
    ]
  },
  {
    category: 'Author & Attribution',
    icon: '👤',
    features: [
      {
        key: 'disable_author_bio',
        label: 'Author Bio',
        description: 'Author biography and social links',
        impact: 'Removes author card with photo, bio, and links',
        icon: '🪪'
      }
    ]
  }
];

/**
 * FeatureOverridesWidget class
 * @extends {ProtoAwareWidget<ArticleFeatureOverrides>}
 * 
 * @description
 * Widget component for managing article-specific feature overrides.
 * Extends ProtoAwareWidget for integration with the proto-driven system.
 */
// State interface for FeatureOverridesWidget
interface FeatureOverridesState {
  expandedCategories: Record<string, boolean>;
  showImpactPreview: boolean;
  searchFilter: string;
}

export class FeatureOverridesWidget extends ProtoAwareWidget<ArticleFeatureOverrides, FeatureOverridesState> {
  state: FeatureOverridesState = {
    expandedCategories: {},
    showImpactPreview: false,
    searchFilter: ''
  };

  componentDidMount() {
    // Expand categories that have disabled features
    const overrides = this.props.value || {};
    const expandedCategories: Record<string, boolean> = {};
    
    FEATURES.forEach(category => {
      const hasDisabled = category.features.some(f => overrides[f.key as keyof ArticleFeatureOverrides]);
      if (hasDisabled) {
        expandedCategories[category.category] = true;
      }
    });
    
    this.setState({ expandedCategories });
  }

  /**
   * Toggle feature override
   * @param {keyof ArticleFeatureOverrides} featureKey - Feature key to toggle
   * @description Toggles a feature between enabled and disabled state
   */
  toggleFeature = (featureKey: keyof ArticleFeatureOverrides) => {
    const current = this.props.value || {};
    const newValue = !current[featureKey];
    
    const updated = { ...current };
    if (newValue) {
      updated[featureKey] = true;
    } else {
      delete updated[featureKey];
    }
    
    this.handleChange(updated);
    this.trackInteraction('toggle_feature', JSON.stringify({ feature: featureKey, disabled: newValue }));
  };

  /**
   * Toggle category expansion
   * @param {string} category - Category name to expand/collapse
   * @description Controls the expanded state of feature categories
   */
  toggleCategory = (category: string) => {
    this.setState(prevState => ({
      expandedCategories: {
        ...prevState.expandedCategories,
        [category]: !prevState.expandedCategories[category]
      }
    }));
  };

  /**
   * Enable all features in category
   * @param {typeof FEATURES[0]} category - Category object
   * @description Batch operation to enable all features in a category
   */
  enableCategoryFeatures = (category: typeof FEATURES[0]) => {
    const current = this.props.value || {};
    const updated = { ...current };
    
    category.features.forEach(feature => {
      delete updated[feature.key as keyof ArticleFeatureOverrides];
    });
    
    this.handleChange(updated);
    this.trackInteraction('enable_category', category.category);
  };

  /**
   * Disable all features in category
   * @param {typeof FEATURES[0]} category - Category object
   * @description Batch operation to disable all features in a category
   */
  disableCategoryFeatures = (category: typeof FEATURES[0]) => {
    const current = this.props.value || {};
    const updated = { ...current };
    
    category.features.forEach(feature => {
      updated[feature.key as keyof ArticleFeatureOverrides] = true;
    });
    
    this.handleChange(updated);
    this.trackInteraction('disable_category', category.category);
  };

  /**
   * Reset all overrides
   * @description Clears all feature overrides, returning to default state
   */
  resetAll = () => {
    this.handleChange({});
    this.trackInteraction('reset_all_overrides', null);
  };

  /**
   * Get count of disabled features
   * @returns {number} Number of features currently disabled
   * @description Counts active overrides for UI indicators
   */
  getDisabledCount = (): number => {
    const overrides = this.props.value || {};
    return Object.values(overrides).filter(v => v === true).length;
  };

  /**
   * Check if any features in category are disabled
   * @param {typeof FEATURES[0]} category - Category to check
   * @returns {boolean} True if any feature in category is disabled
   * @description Used for visual styling of category headers
   */
  categoryHasDisabled = (category: typeof FEATURES[0]): boolean => {
    const overrides = this.props.value || {};
    return category.features.some(f => overrides[f.key as keyof ArticleFeatureOverrides]);
  };

  /**
   * Check if all features in category are disabled
   * @param {typeof FEATURES[0]} category - Category to check
   * @returns {boolean} True if all features in category are disabled
   * @description Used to determine batch action availability
   */
  categoryAllDisabled = (category: typeof FEATURES[0]): boolean => {
    const overrides = this.props.value || {};
    return category.features.every(f => overrides[f.key as keyof ArticleFeatureOverrides]);
  };

  /**
   * Render impact preview
   * @returns {JSX.Element} Impact preview component
   * @description Shows visual summary of disabled features and their effects
   */
  renderImpactPreview = () => {
    const overrides = this.props.value || {};
    const disabledFeatures = Object.entries(overrides)
      .filter(([_, disabled]) => disabled)
      .map(([key]) => {
        for (const category of FEATURES) {
          const feature = category.features.find(f => f.key === key);
          if (feature) return feature;
        }
        return null;
      })
      .filter(Boolean);

    if (disabledFeatures.length === 0) {
      return (
        <div className="impact-empty">
          All features are enabled. No overrides applied.
        </div>
      );
    }

    return (
      <div className="impact-list">
        {disabledFeatures.map((feature: any) => (
          <div key={feature.key} className="impact-item">
            <span className="impact-icon">{feature.icon}</span>
            <div className="impact-content">
              <div className="impact-label">{feature.label} disabled</div>
              <div className="impact-description">{feature.impact}</div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  /**
   * Main render method
   * @returns {JSX.Element} Complete widget UI
   * @description Renders the feature overrides widget with all interactive elements
   */
  render() {
    const { expandedCategories, showImpactPreview, searchFilter } = this.state;
    const overrides = this.props.value || {};
    const disabledCount = this.getDisabledCount();

    return (
      <div className="decap-widget-feature-overrides">
        <style>{`
          .decap-widget-feature-overrides {
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
          
          .disabled-count {
            background: #ef4444;
            color: white;
            padding: 2px 8px;
            border-radius: 12px;
            font-size: 12px;
            font-weight: 500;
          }
          
          .header-actions {
            display: flex;
            gap: 8px;
          }
          
          .reset-button {
            padding: 4px 8px;
            background: #f97316;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 12px;
          }
          
          .reset-button:hover {
            background: #ea580c;
          }
          
          .reset-button:disabled {
            background: #cbd5e1;
            cursor: not-allowed;
          }
          
          .preview-button {
            padding: 4px 8px;
            background: #3b82f6;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 12px;
          }
          
          .preview-button:hover {
            background: #2563eb;
          }
          
          .category-section {
            background: white;
            border: 1px solid #e2e8f0;
            border-radius: 6px;
            margin-bottom: 12px;
            overflow: hidden;
          }
          
          .category-header {
            display: flex;
            align-items: center;
            padding: 12px;
            background: #f8fafc;
            cursor: pointer;
            user-select: none;
            transition: background 0.2s;
          }
          
          .category-header:hover {
            background: #f1f5f9;
          }
          
          .category-header.has-disabled {
            background: #fef2f2;
          }
          
          .category-header.all-disabled {
            background: #fee2e2;
          }
          
          .category-icon {
            font-size: 20px;
            margin-right: 12px;
          }
          
          .category-info {
            flex: 1;
          }
          
          .category-title {
            font-size: 14px;
            font-weight: 600;
            color: #0f172a;
          }
          
          .category-badge {
            display: inline-block;
            background: #ef4444;
            color: white;
            padding: 1px 6px;
            border-radius: 10px;
            font-size: 10px;
            margin-left: 8px;
          }
          
          .category-actions {
            display: flex;
            gap: 6px;
          }
          
          .category-action {
            padding: 3px 6px;
            background: white;
            border: 1px solid #e2e8f0;
            border-radius: 3px;
            cursor: pointer;
            font-size: 11px;
            color: #475569;
          }
          
          .category-action:hover {
            background: #f1f5f9;
          }
          
          .expand-icon {
            margin-left: 8px;
            transition: transform 0.2s;
          }
          
          .expand-icon.expanded {
            transform: rotate(90deg);
          }
          
          .category-features {
            padding: 12px;
            background: white;
          }
          
          .feature-item {
            display: flex;
            align-items: flex-start;
            padding: 10px;
            margin-bottom: 8px;
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 6px;
            transition: all 0.2s;
          }
          
          .feature-item:last-child {
            margin-bottom: 0;
          }
          
          .feature-item.disabled {
            background: #fef2f2;
            border-color: #fecaca;
          }
          
          .feature-checkbox {
            margin-right: 12px;
            margin-top: 2px;
          }
          
          .feature-checkbox input {
            width: 18px;
            height: 18px;
            cursor: pointer;
          }
          
          .feature-content {
            flex: 1;
          }
          
          .feature-header {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 4px;
          }
          
          .feature-icon {
            font-size: 16px;
          }
          
          .feature-label {
            font-size: 14px;
            font-weight: 500;
            color: #0f172a;
          }
          
          .feature-disabled-badge {
            background: #ef4444;
            color: white;
            padding: 1px 6px;
            border-radius: 3px;
            font-size: 10px;
            font-weight: 500;
          }
          
          .feature-description {
            font-size: 12px;
            color: #64748b;
            margin-bottom: 4px;
          }
          
          .feature-impact {
            font-size: 11px;
            color: #ef4444;
            font-style: italic;
          }
          
          .impact-preview {
            margin-top: 20px;
            padding: 16px;
            background: #fff7ed;
            border: 1px solid #fed7aa;
            border-radius: 6px;
          }
          
          .impact-title {
            font-size: 14px;
            font-weight: 600;
            color: #9a3412;
            margin-bottom: 12px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }
          
          .impact-empty {
            text-align: center;
            color: #92400e;
            font-size: 13px;
            padding: 12px;
          }
          
          .impact-list {
            space-y: 8px;
          }
          
          .impact-item {
            display: flex;
            align-items: flex-start;
            gap: 8px;
            padding: 8px;
            background: white;
            border: 1px solid #fed7aa;
            border-radius: 4px;
            margin-bottom: 8px;
          }
          
          .impact-item:last-child {
            margin-bottom: 0;
          }
          
          .impact-icon {
            font-size: 16px;
          }
          
          .impact-content {
            flex: 1;
          }
          
          .impact-label {
            font-size: 13px;
            font-weight: 500;
            color: #92400e;
          }
          
          .impact-description {
            font-size: 12px;
            color: #b45309;
            margin-top: 2px;
          }
          
          .warning-banner {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 12px;
            background: #fef2f2;
            border: 1px solid #fecaca;
            border-radius: 6px;
            margin-bottom: 16px;
          }
          
          .warning-icon {
            font-size: 20px;
          }
          
          .warning-text {
            flex: 1;
            font-size: 13px;
            color: #991b1b;
          }
        `}</style>

        {/* Widget Header - Title, count, and actions */}
        <div className="widget-header">
          <h3 className="widget-title">
            Feature Overrides
            {disabledCount > 0 && (
              <span className="disabled-count">{disabledCount} disabled</span>
            )}
          </h3>
          <div className="header-actions">
            <button
              type="button"
              onClick={this.resetAll}
              className="reset-button"
              disabled={disabledCount === 0}
            >
              Reset All
            </button>
            <button
              type="button"
              onClick={() => this.setState({ showImpactPreview: !showImpactPreview })}
              className="preview-button"
            >
              {showImpactPreview ? 'Hide' : 'Show'} Impact
            </button>
          </div>
        </div>

        {/* Warning Banner - Shows when features are disabled */}
        {disabledCount > 0 && (
          <div className="warning-banner">
            <span className="warning-icon">⚠️</span>
            <span className="warning-text">
              {disabledCount} {disabledCount === 1 ? 'feature is' : 'features are'} disabled for this article.
              These overrides only affect this specific article, not the entire site.
            </span>
          </div>
        )}

        {/* Feature Categories - Grouped feature toggles */}
        {FEATURES.map(category => {
          const isExpanded = expandedCategories[category.category];
          const hasDisabled = this.categoryHasDisabled(category);
          const allDisabled = this.categoryAllDisabled(category);
          const disabledInCategory = category.features.filter(
            f => overrides[f.key as keyof ArticleFeatureOverrides]
          ).length;

          return (
            <div key={category.category} className="category-section">
              <div
                className={`category-header ${hasDisabled ? 'has-disabled' : ''} ${allDisabled ? 'all-disabled' : ''}`}
                onClick={() => this.toggleCategory(category.category)}
              >
                <span className="category-icon">{category.icon}</span>
                <div className="category-info">
                  <span className="category-title">
                    {category.category}
                    {disabledInCategory > 0 && (
                      <span className="category-badge">{disabledInCategory}</span>
                    )}
                  </span>
                </div>
                <div className="category-actions" onClick={(e) => e.stopPropagation()}>
                  {hasDisabled && !allDisabled && (
                    <button
                      type="button"
                      onClick={() => this.disableCategoryFeatures(category)}
                      className="category-action"
                    >
                      Disable All
                    </button>
                  )}
                  {hasDisabled && (
                    <button
                      type="button"
                      onClick={() => this.enableCategoryFeatures(category)}
                      className="category-action"
                    >
                      Enable All
                    </button>
                  )}
                </div>
                <span className={`expand-icon ${isExpanded ? 'expanded' : ''}`}>▶</span>
              </div>

              {isExpanded && (
                <div className="category-features">
                  {category.features.map(feature => {
                    const isDisabled = overrides[feature.key as keyof ArticleFeatureOverrides];
                    
                    return (
                      <div
                        key={feature.key}
                        className={`feature-item ${isDisabled ? 'disabled' : ''}`}
                      >
                        <div className="feature-checkbox">
                          <input
                            type="checkbox"
                            checked={!isDisabled}
                            onChange={() => this.toggleFeature(feature.key as keyof ArticleFeatureOverrides)}
                            id={feature.key}
                          />
                        </div>
                        <div className="feature-content">
                          <div className="feature-header">
                            <span className="feature-icon">{feature.icon}</span>
                            <label htmlFor={feature.key} className="feature-label">
                              {feature.label}
                            </label>
                            {isDisabled && (
                              <span className="feature-disabled-badge">DISABLED</span>
                            )}
                          </div>
                          <div className="feature-description">
                            {feature.description}
                          </div>
                          {isDisabled && (
                            <div className="feature-impact">
                              Impact: {feature.impact}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        {/* Impact Preview - Visual summary of disabled features */}
        {showImpactPreview && (
          <div className="impact-preview">
            <div className="impact-title">Impact Preview</div>
            {this.renderImpactPreview()}
          </div>
        )}

        {/* Help text - Additional guidance for users */}
        {this.renderHelp()}
      </div>
    );
  }
}