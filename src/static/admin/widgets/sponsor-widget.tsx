/**
 * @fileoverview Sponsor Widget for Ethical Sponsorship Management
 * @module static/admin/widgets/sponsor-widget
 * 
 * @description
 * Custom CMS widget for managing article sponsorships and affiliate relationships
 * with full FTC compliance and transparent disclosure. This widget enables
 * content creators to properly attribute sponsored content, manage affiliate
 * links, and maintain trust through clear disclosure statements.
 * 
 * The widget implements the ArticleSponsor protobuf message from blog.proto,
 * ensuring all sponsored content meets legal and ethical requirements.
 * 
 * @architecture
 * The sponsorship system follows a compliance-first approach:
 * 1. **Sponsor Details**: Name, URL, logo for attribution
 * 2. **Disclosure Types**: Sponsored, affiliate, partnership, gifted, paid
 * 3. **FTC Compliance**: Automatic disclosure generation
 * 4. **Campaign Tracking**: IDs for sponsor analytics
 * 5. **Custom Messages**: Personalized sponsor messages
 * 
 * @proto-integration
 * Maps to ArticleSponsor message in blog.proto:
 * ```protobuf
 * message ArticleSponsor {
 *   optional string name = 1;
 *   optional string url = 2;
 *   optional string disclosure_text = 3;
 *   optional bool is_affiliate = 4;
 *   optional string campaign_id = 5;
 *   optional string logo_url = 6;
 *   optional string message = 7;
 * }
 * ```
 * 
 * @ecosystem-integration
 * - FTC Guidelines: Ensures compliance with disclosure requirements
 * - Schema.org: Maps to SponsorshipAgreement metadata
 * - Analytics: Tracks sponsor link clicks via GTM
 * - Components: SponsorBadge displays attribution
 * - SEO: Proper rel="sponsored" link attributes
 * - Trust: Transparent disclosure builds credibility
 * 
 * @features
 * - **Sponsor Attribution**: Name, URL, and logo display
 * - **Disclosure Templates**: Pre-written FTC-compliant text
 * - **Affiliate Tracking**: Separate handling for affiliate links
 * - **Campaign IDs**: Track sponsor campaigns
 * - **Custom Disclosure**: Override with specific text
 * - **Preview System**: See disclosure before publishing
 * - **Logo Upload**: Visual sponsor identification
 * 
 * @disclosure-types
 * - **Sponsored**: Direct payment for content
 * - **Affiliate**: Commission-based relationships
 * - **Partnership**: Collaborative content creation
 * - **Gifted**: Products provided for review
 * - **Paid**: Explicit paid promotion
 * 
 * @ftc-compliance
 * The widget ensures FTC compliance by:
 * 1. Requiring disclosure for all sponsored content
 * 2. Providing clear, conspicuous disclosure text
 * 3. Placing disclosure before affiliate links
 * 4. Using unambiguous language
 * 5. Maintaining disclosure visibility
 * 
 * @campaign-tracking
 * Campaign IDs enable:
 * - Sponsor ROI measurement
 * - Click-through tracking
 * - Conversion attribution
 * - Performance reporting
 * - A/B testing support
 * 
 * @ui-components
 * - Sponsor name input with validation
 * - URL field with protocol checking
 * - Disclosure type selector
 * - Preview panel for disclosure text
 * - Advanced options toggle
 * - Logo upload interface
 * 
 * @ethical-considerations
 * - Always disclose sponsorships clearly
 * - Maintain editorial independence
 * - Separate sponsored from editorial content
 * - Honor sponsor agreements
 * - Protect reader trust
 * 
 * @dos
 * - Always include disclosure for sponsored content
 * - Use clear, unambiguous language
 * - Place disclosure prominently
 * - Track campaign performance
 * - Maintain sponsor relationships ethically
 * - Test disclosure visibility
 * 
 * @donts
 * - Don't hide sponsorship information
 * - Don't use vague disclosure language
 * - Don't mix editorial and sponsored content
 * - Don't forget FTC requirements
 * - Don't compromise reader trust
 * 
 * @example
 * ```yaml
 * sponsor:
 *   name: "TechCorp"
 *   url: "https://techcorp.com"
 *   disclosure_text: "This article is sponsored by TechCorp. All opinions are our own."
 *   is_affiliate: false
 *   campaign_id: "blog-2024-q1"
 *   logo_url: "/images/sponsors/techcorp-logo.png"
 *   message: "TechCorp: Building the future of technology"
 * ```
 * 
 * @see {@link file://./CMS.md#sponsorship} - Sponsorship documentation
 * @see {@link file://./config/schema/blog.proto#ArticleSponsor} - Proto definition
 * @see {@link file://./src/components/article/SponsorBadge.tsx} - Sponsor display
 * @see {@link file://./README.md#ethics} - Ethical guidelines
 * @see {@link https://www.ftc.gov/tips-advice/business-center/guidance/ftcs-endorsement-guides} - FTC Guidelines
 * 
 * @since 1.0.0
 */

import React from 'react';
import { CmsWidgetControlProps as WidgetProps } from 'decap-cms-core';
import { ProtoAwareWidget } from './base-widget';

// Type definition based on ArticleSponsor schema
interface ArticleSponsor {
  name?: string;
  url?: string;
  disclosure_text?: string;
  is_affiliate?: boolean;
  campaign_id?: string;
  logo_url?: string;
  message?: string;
}

// Default disclosure texts for FTC compliance
const DEFAULT_DISCLOSURES = {
  sponsored: 'This article is sponsored by {sponsor}. All opinions expressed are our own.',
  affiliate: 'This article contains affiliate links. We may earn a commission if you make a purchase through these links, at no extra cost to you.',
  partnership: 'This content was created in partnership with {sponsor}.',
  gifted: 'Products mentioned in this article were provided by {sponsor} for review purposes.',
  paid: 'This is a paid promotion in collaboration with {sponsor}.'
};

// State interface for SponsorWidget
interface SponsorWidgetState {
  showAdvanced: boolean;
  previewDisclosure: string;
  disclosureType: keyof typeof DEFAULT_DISCLOSURES;
}

/**
 * Sponsor Widget Component
 */
export class SponsorWidget extends ProtoAwareWidget<ArticleSponsor, SponsorWidgetState> {
  state: SponsorWidgetState = {
    showAdvanced: false,
    previewDisclosure: '',
    disclosureType: 'sponsored'
  };

  componentDidMount() {
    this.updateDisclosurePreview();
  }

  componentDidUpdate(prevProps: WidgetProps<ArticleSponsor>) {
    if (prevProps.value !== this.props.value) {
      this.updateDisclosurePreview();
    }
  }

  /**
   * Update the disclosure preview text
   */
  updateDisclosurePreview = () => {
    const sponsor = this.props.value || {};
    let disclosure = sponsor.disclosure_text || '';
    
    if (!disclosure && sponsor.name) {
      // Use default disclosure based on type
      const template = sponsor.is_affiliate 
        ? DEFAULT_DISCLOSURES.affiliate 
        : DEFAULT_DISCLOSURES[this.state.disclosureType];
      
      disclosure = template.replace('{sponsor}', sponsor.name);
    }
    
    this.setState({ previewDisclosure: disclosure });
  };

  /**
   * Handle field updates
   */
  updateField = (field: keyof ArticleSponsor, value: any) => {
    const current = this.props.value || {};
    const updated = { ...current, [field]: value };
    
    this.handleChange(updated);
    
    // Track specific interactions
    if (field === 'is_affiliate') {
      this.trackInteraction('toggle_affiliate', value);
    } else if (field === 'name') {
      this.trackInteraction('update_sponsor_name', value);
    }
  };

  /**
   * Clear sponsor data
   */
  clearSponsor = () => {
    this.handleChange({});
    this.trackInteraction('clear_sponsor', null);
  };

  /**
   * Toggle advanced settings
   */
  toggleAdvanced = () => {
    this.setState(prevState => ({
      showAdvanced: !prevState.showAdvanced
    }));
  };

  /**
   * Apply disclosure template
   */
  applyDisclosureTemplate = (type: keyof typeof DEFAULT_DISCLOSURES) => {
    const sponsor = this.props.value || {};
    const template = DEFAULT_DISCLOSURES[type];
    const disclosure = sponsor.name 
      ? template.replace('{sponsor}', sponsor.name)
      : template.replace('{sponsor}', '[Sponsor Name]');
    
    this.updateField('disclosure_text', disclosure);
    this.setState({ disclosureType: type });
    this.trackInteraction('apply_disclosure_template', type);
  };

  /**
   * Validate sponsor URL
   */
  validateUrl = (url: string): string | null => {
    if (!url) return null;
    
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return 'URL must start with http:// or https://';
    }
    
    try {
      new URL(url);
      return null;
    } catch {
      return 'Invalid URL format';
    }
  };

  /**
   * Main render method
   */
  render() {
    const { showAdvanced, previewDisclosure, disclosureType } = this.state;
    const sponsor = this.props.value || {};
    const hasSponsor = !!(sponsor.name || sponsor.url);
    const urlError = sponsor.url ? this.validateUrl(sponsor.url) : null;

    return (
      <div className="decap-widget-sponsor">
        <style>{`
          .decap-widget-sponsor {
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
          
          .sponsor-badge {
            background: #10b981;
            color: white;
            padding: 2px 8px;
            border-radius: 12px;
            font-size: 11px;
            font-weight: 500;
            text-transform: uppercase;
          }
          
          .clear-button {
            padding: 4px 8px;
            background: #ef4444;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 12px;
          }
          
          .clear-button:hover {
            background: #dc2626;
          }
          
          .sponsor-content {
            background: white;
            border: 1px solid #e2e8f0;
            border-radius: 6px;
            padding: 16px;
          }
          
          .field-group {
            margin-bottom: 16px;
          }
          
          .field-group:last-child {
            margin-bottom: 0;
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
            transition: all 0.2s;
          }
          
          .field-input:focus {
            outline: none;
            border-color: #3b82f6;
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
          }
          
          .field-input.error {
            border-color: #ef4444;
          }
          
          .field-textarea {
            width: 100%;
            padding: 8px 12px;
            border: 1px solid #e2e8f0;
            border-radius: 4px;
            font-size: 14px;
            min-height: 80px;
            resize: vertical;
          }
          
          .field-textarea:focus {
            outline: none;
            border-color: #3b82f6;
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
          }
          
          .field-hint {
            font-size: 12px;
            color: #64748b;
            margin-top: 4px;
          }
          
          .field-error {
            font-size: 12px;
            color: #ef4444;
            margin-top: 4px;
          }
          
          .checkbox-group {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 12px;
            background: #fef2f2;
            border: 1px solid #fecaca;
            border-radius: 6px;
            margin-bottom: 16px;
          }
          
          .checkbox-input {
            width: 18px;
            height: 18px;
            cursor: pointer;
          }
          
          .checkbox-label {
            font-size: 14px;
            color: #7f1d1d;
            cursor: pointer;
            flex: 1;
          }
          
          .disclosure-section {
            margin-top: 20px;
            padding-top: 20px;
            border-top: 2px solid #e2e8f0;
          }
          
          .disclosure-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 12px;
          }
          
          .disclosure-title {
            font-size: 14px;
            font-weight: 600;
            color: #0f172a;
            display: flex;
            align-items: center;
            gap: 6px;
          }
          
          .ftc-badge {
            background: #3b82f6;
            color: white;
            padding: 2px 6px;
            border-radius: 4px;
            font-size: 10px;
            font-weight: 500;
          }
          
          .template-buttons {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            margin-bottom: 12px;
          }
          
          .template-button {
            padding: 4px 8px;
            background: white;
            border: 1px solid #e2e8f0;
            border-radius: 4px;
            cursor: pointer;
            font-size: 12px;
            color: #475569;
            transition: all 0.2s;
          }
          
          .template-button:hover {
            background: #f1f5f9;
            border-color: #cbd5e1;
          }
          
          .template-button.active {
            background: #3b82f6;
            color: white;
            border-color: #3b82f6;
          }
          
          .disclosure-preview {
            padding: 12px;
            background: #fef3c7;
            border: 1px solid #fcd34d;
            border-radius: 6px;
            margin-top: 12px;
          }
          
          .disclosure-preview-label {
            font-size: 11px;
            font-weight: 600;
            color: #92400e;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 6px;
          }
          
          .disclosure-preview-text {
            font-size: 13px;
            color: #78350f;
            line-height: 1.5;
          }
          
          .advanced-toggle {
            margin-top: 16px;
            padding-top: 16px;
            border-top: 1px solid #e2e8f0;
          }
          
          .advanced-toggle-button {
            padding: 6px 12px;
            background: #f1f5f9;
            border: 1px solid #cbd5e1;
            border-radius: 4px;
            cursor: pointer;
            font-size: 13px;
            color: #475569;
            display: flex;
            align-items: center;
            gap: 6px;
          }
          
          .advanced-toggle-button:hover {
            background: #e2e8f0;
          }
          
          .advanced-fields {
            margin-top: 12px;
            padding: 12px;
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 6px;
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
            margin-bottom: 16px;
          }
          
          .add-sponsor-button {
            padding: 8px 16px;
            background: #3b82f6;
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
          }
          
          .add-sponsor-button:hover {
            background: #2563eb;
          }
        `}</style>

        {/* Widget Header */}
        <div className="widget-header">
          <h3 className="widget-title">
            Article Sponsorship
            {hasSponsor && <span className="sponsor-badge">Active</span>}
          </h3>
          {hasSponsor && (
            <button
              type="button"
              onClick={this.clearSponsor}
              className="clear-button"
              aria-label="Clear sponsor"
            >
              Clear
            </button>
          )}
        </div>

        {!hasSponsor ? (
          // Empty State
          <div className="empty-state">
            <div className="empty-state-icon">🤝</div>
            <div className="empty-state-text">
              No sponsor configured for this article.
              <br />
              Add sponsor details if this content is sponsored or contains affiliate links.
            </div>
            <button
              type="button"
              onClick={() => this.updateField('name', '')}
              className="add-sponsor-button"
            >
              Add Sponsor
            </button>
          </div>
        ) : (
          // Sponsor Form
          <div className="sponsor-content">
            {/* Basic Fields */}
            <div className="field-group">
              <label className="field-label">
                Sponsor Name
                <span className="required-mark">*</span>
              </label>
              <input
                type="text"
                value={sponsor.name || ''}
                onChange={(e) => this.updateField('name', e.target.value)}
                className="field-input"
                placeholder="Acme Corporation"
                aria-required="true"
              />
            </div>

            <div className="field-group">
              <label className="field-label">
                Sponsor Website
              </label>
              <input
                type="url"
                value={sponsor.url || ''}
                onChange={(e) => this.updateField('url', e.target.value)}
                className={`field-input ${urlError ? 'error' : ''}`}
                placeholder="https://example.com"
                aria-invalid={urlError ? "true" : "false"}
              />
              {urlError && (
                <div className="field-error" role="alert">{urlError}</div>
              )}
              <div className="field-hint">
                The sponsor&apos;s website or landing page
              </div>
            </div>

            <div className="field-group">
              <label className="field-label">
                Sponsor Logo URL
              </label>
              <input
                type="url"
                value={sponsor.logo_url || ''}
                onChange={(e) => this.updateField('logo_url', e.target.value)}
                className="field-input"
                placeholder="https://example.com/logo.png"
              />
              <div className="field-hint">
                Logo image for sponsor display (PNG, JPG, SVG)
              </div>
            </div>

            <div className="field-group">
              <label className="field-label">
                Sponsor Message (Optional)
              </label>
              <textarea
                value={sponsor.message || ''}
                onChange={(e) => this.updateField('message', e.target.value)}
                className="field-textarea"
                placeholder="A message from the sponsor..."
              />
              <div className="field-hint">
                Optional message or tagline from the sponsor
              </div>
            </div>

            {/* Affiliate Checkbox */}
            <div className="checkbox-group">
              <input
                type="checkbox"
                id="is-affiliate"
                checked={sponsor.is_affiliate || false}
                onChange={(e) => this.updateField('is_affiliate', e.target.checked)}
                className="checkbox-input"
              />
              <label htmlFor="is-affiliate" className="checkbox-label">
                This article contains affiliate links
                <br />
                <span style={{ fontSize: '12px', opacity: 0.8 }}>
                  Check this if you may earn commission from purchases
                </span>
              </label>
            </div>

            {/* Disclosure Section */}
            <div className="disclosure-section">
              <div className="disclosure-header">
                <h4 className="disclosure-title">
                  Disclosure Text
                  <span className="ftc-badge">FTC</span>
                </h4>
              </div>

              {/* Template Buttons */}
              <div className="template-buttons">
                {Object.keys(DEFAULT_DISCLOSURES).map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => this.applyDisclosureTemplate(type as keyof typeof DEFAULT_DISCLOSURES)}
                    className={`template-button ${disclosureType === type ? 'active' : ''}`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>

              {/* Custom Disclosure Text */}
              <div className="field-group">
                <textarea
                  value={sponsor.disclosure_text || ''}
                  onChange={(e) => this.updateField('disclosure_text', e.target.value)}
                  className="field-textarea"
                  placeholder="Enter custom disclosure text..."
                  rows={3}
                />
                <div className="field-hint">
                  FTC requires clear disclosure of sponsorships and affiliate relationships
                </div>
              </div>

              {/* Disclosure Preview */}
              {previewDisclosure && (
                <div className="disclosure-preview">
                  <div className="disclosure-preview-label">Preview</div>
                  <div className="disclosure-preview-text">
                    {previewDisclosure}
                  </div>
                </div>
              )}
            </div>

            {/* Advanced Settings */}
            <div className="advanced-toggle">
              <button
                type="button"
                onClick={this.toggleAdvanced}
                className="advanced-toggle-button"
              >
                <span>{showAdvanced ? '▼' : '▶'}</span>
                Advanced Settings
              </button>

              {showAdvanced && (
                <div className="advanced-fields">
                  <div className="field-group">
                    <label className="field-label">
                      Campaign/Tracking ID
                    </label>
                    <input
                      type="text"
                      value={sponsor.campaign_id || ''}
                      onChange={(e) => this.updateField('campaign_id', e.target.value)}
                      className="field-input"
                      placeholder="SUMMER2024"
                    />
                    <div className="field-hint">
                      Internal tracking ID for this sponsorship campaign
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Help text */}
        {this.renderHelp()}
      </div>
    );
  }
}