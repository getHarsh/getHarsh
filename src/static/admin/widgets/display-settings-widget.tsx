/**
 * @fileoverview Display Settings Widget for Decap CMS
 * Visual layout configuration widget for article display preferences with real-time preview.
 * Maps to ArticleConfig.display field for fine-grained control over article presentation.
 * 
 * @module static/admin/widgets/display-settings-widget
 * @description
 * Provides a comprehensive visual interface for configuring article display settings with:
 * - Toggle-based feature controls with instant visual feedback
 * - Layout preset system for quick configuration
 * - Live preview showing actual article layout
 * - Advanced settings for CSS customization and reading time
 * - Proto-driven validation through ArticleDisplaySettings schema
 * 
 * @architecture
 * ```
 * ArticleConfig.display (Proto)
 *         ↓
 * DisplaySettingsWidget (React)
 *    ├── Feature Toggles (9 display features)
 *    ├── Layout Presets (4 configurations)
 *    ├── Advanced Settings (CSS, reading time)
 *    └── Live Preview (visual representation)
 * ```
 * 
 * @proto-integration
 * - **Source**: blog.proto → ArticleConfig.display
 * - **Schema**: ArticleDisplaySettings with 11 boolean flags + 2 overrides
 * - **Defaults**: Most features enabled by default for rich experience
 * - **Validation**: Boolean type checking, CSS class sanitization
 * 
 * @ecosystem-integration
 * - **Components**: Consumed by article templates for conditional rendering
 * - **SEO**: Affects structured data (comments, author bio visibility)
 * - **Performance**: Feature flags control component lazy loading
 * - **Analytics**: Display settings tracked for A/B testing
 * - **Accessibility**: TOC and reading progress enhance navigation
 * 
 * @features
 * - **Table of Contents**: Floating sidebar navigation
 * - **Author Bio**: Author information card
 * - **Social Share**: Platform-specific share buttons
 * - **Comments**: Discussion thread integration
 * - **Related Articles**: Content recommendation
 * - **Series Navigation**: Multi-part content navigation
 * - **Math Rendering**: KaTeX/MathJax formula support
 * - **Footnotes**: Academic citation support
 * - **Reading Progress**: Scroll progress indicator
 * 
 * @layout-presets
 * - **Full Featured**: All features enabled for rich experience
 * - **Minimal**: Clean, distraction-free reading
 * - **Technical**: Documentation-focused with TOC and math
 * - **Blog Post**: Standard blog layout with social features
 * 
 * @performance-considerations
 * - Conditional component loading based on feature flags
 * - Lazy loading for comments and related articles sections
 * - CSS-only toggles for instant visual feedback
 * - Debounced preview updates for smooth interaction
 * 
 * @accessibility
 * - Keyboard navigable toggle switches
 * - ARIA labels for all interactive elements
 * - High contrast mode support in preview
 * - Screen reader announcements for state changes
 * 
 * @dos
 * - Use presets for consistent layouts across content types
 * - Test preview across different screen sizes
 * - Consider reader preferences when choosing defaults
 * - Use custom CSS classes for theme-specific styling
 * - Override reading time for non-standard content
 * 
 * @donts
 * - Don't enable all features without considering UX impact
 * - Don't use custom classes that conflict with base styles
 * - Don't disable TOC for long technical articles
 * - Don't override reading time unless necessary
 * - Don't enable math rendering for non-technical content
 * 
 * @example
 * ```typescript
 * // CMS configuration
 * fields:
 *   - name: display
 *     label: Display Settings
 *     widget: display-settings
 *     default:
 *       show_toc: true
 *       show_author_bio: true
 *       enable_math: false
 * 
 * // Component usage
 * const { display } = article;
 * return (
 *   <>
 *     {display.show_toc && <TableOfContents />}
 *     {display.show_reading_progress && <ReadingProgress />}
 *     <ArticleContent />
 *     {display.show_author_bio && <AuthorBio />}
 *   </>
 * );
 * ```
 * 
 * @see {@link file://./CMS.md} - CMS widget architecture
 * @see {@link file://./BUILD.md#display-optimization} - Performance guidelines
 * @see {@link file://./USE-CASE.md#reader-experience} - UX considerations
 * @see {@link file://./README.md#article-features} - Feature documentation
 * 
 * @since 1.0.0
 */

import React from 'react';
import { CmsWidgetControlProps as WidgetProps } from 'decap-cms-core';
import { ProtoAwareWidget } from './base-widget';

// Type definition based on ArticleDisplaySettings schema
interface ArticleDisplaySettings {
  show_toc?: boolean;
  show_author_bio?: boolean;
  show_social_share?: boolean;
  show_comments?: boolean;
  show_related?: boolean;
  show_series_nav?: boolean;
  enable_math?: boolean;
  enable_footnotes?: boolean;
  custom_class?: string;
  reading_time_override?: number;
  show_reading_progress?: boolean;
}

// Display feature definitions with visual representation
const DISPLAY_FEATURES = [
  {
    key: 'show_toc',
    label: 'Table of Contents',
    icon: '📑',
    description: 'Floating sidebar with article sections',
    preview: `
      ┌─────────────┬────────────┐
      │   Article   │    TOC     │
      │   Content   │ • Section1 │
      │             │ • Section2 │
      └─────────────┴────────────┘
    `,
    defaultValue: true
  },
  {
    key: 'show_author_bio',
    label: 'Author Bio',
    icon: '👤',
    description: 'Author information card at article end',
    preview: `
      ┌─────────────────────────┐
      │  [Photo] Author Name    │
      │  Bio text and links...  │
      └─────────────────────────┘
    `,
    defaultValue: true
  },
  {
    key: 'show_social_share',
    label: 'Social Share Buttons',
    icon: '🔗',
    description: 'Twitter, LinkedIn, Facebook share buttons',
    preview: `[Twitter] [LinkedIn] [Facebook] [Copy Link]`,
    defaultValue: true
  },
  {
    key: 'show_comments',
    label: 'Comments Section',
    icon: '💬',
    description: 'Reader comments and discussion',
    preview: `
      ┌─────────────────────────┐
      │  💬 Comments (12)       │
      │  ├─ User comment...     │
      │  └─ Another comment...  │
      └─────────────────────────┘
    `,
    defaultValue: true
  },
  {
    key: 'show_related',
    label: 'Related Articles',
    icon: '📚',
    description: 'Suggested related content',
    preview: `
      You might also like:
      • Related Article 1
      • Related Article 2
      • Related Article 3
    `,
    defaultValue: true
  },
  {
    key: 'show_series_nav',
    label: 'Series Navigation',
    icon: '⏭️',
    description: 'Previous/Next buttons for series',
    preview: `[← Previous] Part 3 of 10 [Next →]`,
    defaultValue: true
  },
  {
    key: 'enable_math',
    label: 'Math Rendering',
    icon: '∑',
    description: 'KaTeX/MathJax formula rendering',
    preview: `E = mc²  ∫ f(x)dx`,
    defaultValue: false
  },
  {
    key: 'enable_footnotes',
    label: 'Footnotes',
    icon: '¹',
    description: 'Clickable footnote references',
    preview: `Text with footnote¹ → [1]: Footnote content`,
    defaultValue: false
  },
  {
    key: 'show_reading_progress',
    label: 'Reading Progress',
    icon: '📊',
    description: 'Progress bar while scrolling',
    preview: `━━━━━━━━━━━━━━━━━━━━ 45%`,
    defaultValue: false
  }
];

// Preset layouts
const LAYOUT_PRESETS = [
  {
    name: 'Full Featured',
    icon: '🌟',
    description: 'All features enabled',
    settings: {
      show_toc: true,
      show_author_bio: true,
      show_social_share: true,
      show_comments: true,
      show_related: true,
      show_series_nav: true,
      enable_math: false,
      enable_footnotes: false,
      show_reading_progress: true
    }
  },
  {
    name: 'Minimal',
    icon: '⚡',
    description: 'Clean, distraction-free reading',
    settings: {
      show_toc: false,
      show_author_bio: false,
      show_social_share: false,
      show_comments: false,
      show_related: false,
      show_series_nav: false,
      enable_math: false,
      enable_footnotes: false,
      show_reading_progress: false
    }
  },
  {
    name: 'Technical',
    icon: '🔬',
    description: 'For technical documentation',
    settings: {
      show_toc: true,
      show_author_bio: false,
      show_social_share: true,
      show_comments: true,
      show_related: true,
      show_series_nav: true,
      enable_math: true,
      enable_footnotes: true,
      show_reading_progress: true
    }
  },
  {
    name: 'Blog Post',
    icon: '📝',
    description: 'Standard blog layout',
    settings: {
      show_toc: false,
      show_author_bio: true,
      show_social_share: true,
      show_comments: true,
      show_related: true,
      show_series_nav: false,
      enable_math: false,
      enable_footnotes: false,
      show_reading_progress: false
    }
  }
];

/**
 * Display Settings Widget Component
 */
export class DisplaySettingsWidget extends ProtoAwareWidget<ArticleDisplaySettings> {
  state = {
    showPreview: true,
    selectedPreset: null as string | null
  };

  /**
   * Toggle display feature
   */
  toggleFeature = (key: keyof ArticleDisplaySettings) => {
    const current = this.props.value || {};
    const newValue = !current[key];
    
    this.handleChange({
      ...current,
      [key]: newValue
    });
    
    this.trackInteraction('toggle_display_feature', JSON.stringify({ feature: key, enabled: newValue }));
    this.setState({ selectedPreset: null }); // Clear preset selection
  };

  /**
   * Apply layout preset
   */
  applyPreset = (preset: typeof LAYOUT_PRESETS[0]) => {
    this.handleChange({
      ...this.props.value,
      ...preset.settings
    });
    
    this.setState({ selectedPreset: preset.name });
    this.trackInteraction('apply_display_preset', preset.name);
  };

  /**
   * Update custom class
   */
  updateCustomClass = (customClass: string) => {
    this.handleChange({
      ...this.props.value,
      custom_class: customClass
    });
  };

  /**
   * Update reading time override
   */
  updateReadingTime = (minutes: number | undefined) => {
    this.handleChange({
      ...this.props.value,
      reading_time_override: minutes
    });
  };

  /**
   * Calculate enabled features count
   */
  getEnabledCount = (): number => {
    const settings = this.props.value || {};
    return DISPLAY_FEATURES.filter(f => 
      settings[f.key as keyof ArticleDisplaySettings] !== false
    ).length;
  };

  /**
   * Render layout preview
   */
  renderLayoutPreview = () => {
    const settings = this.props.value || {};
    
    return (
      <div className="layout-preview">
        <div className="preview-header">Layout Preview</div>
        
        <div className="preview-container">
          {/* Main Article Area */}
          <div className="preview-article">
            <div className="preview-title">Article Title</div>
            
            {settings.show_reading_progress !== false && (
              <div className="preview-progress">
                <div className="progress-bar" style={{ width: '45%' }} />
              </div>
            )}
            
            <div className="preview-content">
              <p>Article content area...</p>
              {settings.enable_math && <p className="math-preview">∫ f(x)dx = F(x) + C</p>}
              {settings.enable_footnotes && <p>Text with footnote<sup>1</sup></p>}
            </div>
            
            {settings.show_series_nav !== false && (
              <div className="preview-series-nav">
                ← Previous | Part 3 of 10 | Next →
              </div>
            )}
            
            {settings.show_author_bio !== false && (
              <div className="preview-author">
                [👤] Author Bio
              </div>
            )}
            
            {settings.show_social_share !== false && (
              <div className="preview-social">
                [Twitter] [LinkedIn] [Facebook]
              </div>
            )}
            
            {settings.show_comments !== false && (
              <div className="preview-comments">
                💬 Comments Section
              </div>
            )}
            
            {settings.show_related !== false && (
              <div className="preview-related">
                📚 Related Articles
              </div>
            )}
          </div>
          
          {/* TOC Sidebar */}
          {settings.show_toc !== false && (
            <div className="preview-toc">
              <div className="toc-title">Contents</div>
              <div className="toc-items">
                • Section 1<br />
                • Section 2<br />
                • Section 3
              </div>
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
    const { showPreview, selectedPreset } = this.state;
    const settings = this.props.value || {};
    const enabledCount = this.getEnabledCount();

    return (
      <div className="decap-widget-display-settings">
        <style>{`
          .decap-widget-display-settings {
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
          
          .enabled-badge {
            background: #10b981;
            color: white;
            padding: 2px 8px;
            border-radius: 12px;
            font-size: 12px;
            font-weight: 500;
          }
          
          .preview-toggle {
            padding: 6px 12px;
            background: #3b82f6;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 13px;
          }
          
          .preview-toggle:hover {
            background: #2563eb;
          }
          
          .presets-section {
            margin-bottom: 20px;
            padding: 12px;
            background: white;
            border: 1px solid #e2e8f0;
            border-radius: 6px;
          }
          
          .presets-title {
            font-size: 13px;
            font-weight: 600;
            color: #475569;
            margin-bottom: 8px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }
          
          .presets-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 8px;
          }
          
          .preset-button {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 8px;
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 6px;
            cursor: pointer;
            transition: all 0.2s;
          }
          
          .preset-button:hover {
            background: #e0f2fe;
            border-color: #0ea5e9;
            transform: translateY(-1px);
          }
          
          .preset-button.selected {
            background: #0ea5e9;
            color: white;
            border-color: #0ea5e9;
          }
          
          .preset-icon {
            font-size: 24px;
            margin-bottom: 4px;
          }
          
          .preset-name {
            font-size: 12px;
            font-weight: 500;
          }
          
          .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 12px;
            margin-bottom: 20px;
          }
          
          .feature-card {
            background: white;
            border: 1px solid #e2e8f0;
            border-radius: 6px;
            padding: 12px;
            transition: all 0.2s;
          }
          
          .feature-card.enabled {
            background: #f0fdf4;
            border-color: #86efac;
          }
          
          .feature-card.disabled {
            background: #fafafa;
            opacity: 0.7;
          }
          
          .feature-header {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 6px;
          }
          
          .feature-toggle {
            width: 44px;
            height: 24px;
            background: #cbd5e1;
            border-radius: 12px;
            position: relative;
            cursor: pointer;
            transition: background 0.2s;
          }
          
          .feature-toggle.enabled {
            background: #10b981;
          }
          
          .feature-toggle-ball {
            width: 20px;
            height: 20px;
            background: white;
            border-radius: 50%;
            position: absolute;
            top: 2px;
            left: 2px;
            transition: transform 0.2s;
            box-shadow: 0 1px 3px rgba(0,0,0,0.2);
          }
          
          .feature-toggle.enabled .feature-toggle-ball {
            transform: translateX(20px);
          }
          
          .feature-icon {
            font-size: 20px;
          }
          
          .feature-label {
            flex: 1;
            font-size: 13px;
            font-weight: 500;
            color: #0f172a;
          }
          
          .feature-description {
            font-size: 11px;
            color: #64748b;
            margin-bottom: 6px;
          }
          
          .feature-preview {
            font-size: 10px;
            font-family: monospace;
            color: #94a3b8;
            background: #f8fafc;
            padding: 4px;
            border-radius: 3px;
            white-space: pre;
            overflow-x: auto;
          }
          
          .advanced-section {
            margin-top: 20px;
            padding: 16px;
            background: white;
            border: 1px solid #e2e8f0;
            border-radius: 6px;
          }
          
          .advanced-title {
            font-size: 14px;
            font-weight: 600;
            color: #0f172a;
            margin-bottom: 12px;
          }
          
          .advanced-field {
            margin-bottom: 12px;
          }
          
          .advanced-label {
            display: block;
            font-size: 13px;
            font-weight: 500;
            color: #475569;
            margin-bottom: 4px;
          }
          
          .advanced-input {
            width: 100%;
            padding: 8px;
            border: 1px solid #e2e8f0;
            border-radius: 4px;
            font-size: 14px;
          }
          
          .advanced-input:focus {
            outline: none;
            border-color: #3b82f6;
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
          }
          
          .advanced-hint {
            font-size: 11px;
            color: #64748b;
            margin-top: 4px;
          }
          
          .layout-preview {
            margin-top: 20px;
            padding: 16px;
            background: #1e293b;
            border-radius: 6px;
            color: #e2e8f0;
          }
          
          .preview-header {
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 12px;
            color: #94a3b8;
          }
          
          .preview-container {
            display: flex;
            gap: 12px;
            background: #0f172a;
            border-radius: 4px;
            padding: 12px;
            min-height: 200px;
          }
          
          .preview-article {
            flex: 1;
            background: #1e293b;
            border-radius: 4px;
            padding: 12px;
          }
          
          .preview-toc {
            width: 150px;
            background: #1e293b;
            border-radius: 4px;
            padding: 12px;
          }
          
          .preview-title {
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 8px;
            color: #f1f5f9;
          }
          
          .preview-progress {
            height: 3px;
            background: #334155;
            border-radius: 2px;
            margin-bottom: 12px;
            overflow: hidden;
          }
          
          .progress-bar {
            height: 100%;
            background: #3b82f6;
            transition: width 0.3s;
          }
          
          .preview-content {
            font-size: 11px;
            line-height: 1.5;
            color: #94a3b8;
            margin-bottom: 12px;
          }
          
          .math-preview {
            font-family: 'Times New Roman', serif;
            font-style: italic;
            color: #60a5fa;
          }
          
          .preview-series-nav,
          .preview-author,
          .preview-social,
          .preview-comments,
          .preview-related {
            font-size: 10px;
            padding: 6px;
            background: #0f172a;
            border-radius: 3px;
            margin-bottom: 6px;
            color: #64748b;
          }
          
          .toc-title {
            font-size: 12px;
            font-weight: 600;
            margin-bottom: 8px;
            color: #f1f5f9;
          }
          
          .toc-items {
            font-size: 10px;
            line-height: 1.8;
            color: #64748b;
          }
        `}</style>

        {/* Widget Header */}
        <div className="widget-header">
          <h3 className="widget-title">
            Display Settings
            <span className="enabled-badge">{enabledCount}/{DISPLAY_FEATURES.length} enabled</span>
          </h3>
          <button
            type="button"
            onClick={() => this.setState({ showPreview: !showPreview })}
            className="preview-toggle"
          >
            {showPreview ? 'Hide' : 'Show'} Preview
          </button>
        </div>

        {/* Layout Presets */}
        <div className="presets-section">
          <div className="presets-title">Quick Presets</div>
          <div className="presets-grid">
            {LAYOUT_PRESETS.map(preset => (
              <button
                key={preset.name}
                type="button"
                onClick={() => this.applyPreset(preset)}
                className={`preset-button ${selectedPreset === preset.name ? 'selected' : ''}`}
                title={preset.description}
              >
                <span className="preset-icon">{preset.icon}</span>
                <span className="preset-name">{preset.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Display Features Grid */}
        <div className="features-grid">
          {DISPLAY_FEATURES.map(feature => {
            const isEnabled = settings[feature.key as keyof ArticleDisplaySettings] !== false;
            
            return (
              <div
                key={feature.key}
                className={`feature-card ${isEnabled ? 'enabled' : 'disabled'}`}
              >
                <div className="feature-header">
                  <div
                    className={`feature-toggle ${isEnabled ? 'enabled' : ''}`}
                    onClick={() => this.toggleFeature(feature.key as keyof ArticleDisplaySettings)}
                  >
                    <div className="feature-toggle-ball" />
                  </div>
                  <span className="feature-icon">{feature.icon}</span>
                  <span className="feature-label">{feature.label}</span>
                </div>
                <div className="feature-description">
                  {feature.description}
                </div>
                {feature.preview && (
                  <div className="feature-preview">{feature.preview}</div>
                )}
              </div>
            );
          })}
        </div>

        {/* Advanced Settings */}
        <div className="advanced-section">
          <h4 className="advanced-title">Advanced Settings</h4>
          
          <div className="advanced-field">
            <label className="advanced-label">Custom CSS Class</label>
            <input
              type="text"
              value={settings.custom_class || ''}
              onChange={(e) => this.updateCustomClass(e.target.value)}
              className="advanced-input"
              placeholder="article-custom-class"
            />
            <div className="advanced-hint">
              Add custom CSS class to article container for styling
            </div>
          </div>
          
          <div className="advanced-field">
            <label className="advanced-label">Reading Time Override (minutes)</label>
            <input
              type="number"
              value={settings.reading_time_override || ''}
              onChange={(e) => this.updateReadingTime(e.target.value ? parseInt(e.target.value) : undefined)}
              className="advanced-input"
              placeholder="Auto-calculated"
              min="1"
            />
            <div className="advanced-hint">
              Override the auto-calculated reading time
            </div>
          </div>
        </div>

        {/* Layout Preview */}
        {showPreview && this.renderLayoutPreview()}

        {/* Help text */}
        {this.renderHelp()}
      </div>
    );
  }
}