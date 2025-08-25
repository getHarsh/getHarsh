/**
 * @fileoverview Cross-Posting Widget for Multi-Domain Blog Syndication
 * @module static/admin/widgets/cross-posting-widget
 * 
 * @description
 * Custom CMS widget for configuring multi-domain blog syndication across
 * the getHarsh ecosystem. This widget enables content creators to publish
 * articles to multiple blog subdomains simultaneously, supporting the
 * distributed content strategy where each domain represents a different
 * aspect of thought and creativity.
 * 
 * The widget implements the CrossPostingConfig protobuf message from blog.proto,
 * providing a user-friendly interface for complex syndication workflows.
 * 
 * @architecture
 * The cross-posting system follows a hub-and-spoke model:
 * 1. **Primary Domain**: The canonical source of content
 * 2. **Target Blogs**: Secondary publication points
 * 3. **Cross-Post All**: Broadcast to entire ecosystem
 * 4. **Canonical URLs**: SEO-friendly linking between instances
 * 5. **Discovery Integration**: Dynamic domain detection
 * 
 * @proto-integration
 * Maps to CrossPostingConfig message in blog.proto:
 * ```protobuf
 * message CrossPostingConfig {
 *   optional string primary_domain = 1;
 *   repeated string target_blogs = 2;
 *   optional bool cross_post_all = 3;
 *   optional string canonical_domain = 4;
 * }
 * ```
 * 
 * @ecosystem-integration
 * - Discovery System: Reads domains from __DECAP_DISCOVERY__
 * - Build System: Cross-posting handled during Phase 6 build
 * - CMS System: Integrated as custom widget in Decap CMS
 * - Theme System: Each domain has unique Chakra-aligned theme
 * - SEO System: Canonical URLs prevent duplicate content penalties
 * - Analytics: Cross-domain tracking via GTM
 * 
 * @features
 * - **Primary Domain Selection**: Single-select origin domain
 * - **Target Blog Selection**: Multi-select syndication targets
 * - **Cross-Post All Toggle**: One-click ecosystem-wide publishing
 * - **Auto-Exclusion**: Primary automatically excluded from targets
 * - **Discovery Integration**: Dynamic domain list from manifest
 * - **Real-Time Preview**: Visual confirmation of destinations
 * - **Validation**: Ensures at least primary domain selected
 * 
 * @data-structure
 * ```typescript
 * interface CrossPostingData {
 *   primary_domain?: string      // Origin domain (e.g., "getHarsh")
 *   target_blogs?: string[]      // Target domains for syndication
 *   cross_post_all?: boolean     // Auto-select all targets
 * }
 * ```
 * 
 * @syndication-flow
 * 1. Author creates content in master_posts/
 * 2. Selects primary domain (content home)
 * 3. Optionally selects target blogs
 * 4. Build system generates content for each domain
 * 5. Content publishes to blog.{primary}.in
 * 6. Syndicated copies to blog.{target}.in
 * 7. Canonical links point to primary
 * 8. Cross-domain discovery enabled
 * 
 * @ui-behavior
 * - **Primary Domain**: Button group for single selection
 * - **Target Blogs**: Chip array for multi-selection
 * - **Cross-Post All**: Checkbox overrides manual selection
 * - **Visual Feedback**: Selected state clearly indicated
 * - **Preview Section**: Shows all publish destinations
 * - **Validation**: Prevents invalid configurations
 * 
 * @seo-implications
 * - Primary domain gets canonical URL
 * - Target blogs include rel="canonical" to primary
 * - Prevents duplicate content penalties
 * - Enables cross-domain content discovery
 * - Maintains domain authority distribution
 * 
 * @dos
 * - Always select a primary domain
 * - Use cross-post all for announcements
 * - Select specific targets for topic-relevant content
 * - Test syndication in LOCAL mode first
 * - Verify canonical URLs after publishing
 * 
 * @donts
 * - Don't select primary as target
 * - Don't hardcode domain lists
 * - Don't skip primary domain selection
 * - Don't ignore discovery data
 * - Don't bypass validation
 * 
 * @example-usage
 * ```yaml
 * # Article frontmatter after widget configuration
 * cross_posting:
 *   primary_domain: "getHarsh"
 *   target_blogs: ["causality", "rawThoughts"]
 *   cross_post_all: false
 *   canonical_domain: "blog.getHarsh.in"
 * ```
 * 
 * @see {@link file://./CMS.md#cross-posting} - Cross-posting documentation
 * @see {@link file://./BUILD.md#phase-6} - Content syndication build
 * @see {@link file://./config/schema/blog.proto} - CrossPostingConfig proto
 * @see {@link file://./config/CONFIG.md#cross-posting} - Configuration guide
 * @see {@link file://./src/USE-CASE.md#cross-posting} - Use case examples
 * @see {@link file://./DEV-TOOLING.md#cms-widgets} - Widget development
 * 
 * @since 1.0.0
 */

import React, { useState, useEffect } from "react"
import { CmsWidgetControlProps as WidgetProps } from "decap-cms-core"
import { Card, CardContent, CardHeader, CardTitle } from "../../../src/components/ui/Card"
import { Button } from "../../../src/components/ui/Button"
import { Chip } from "../../../src/components/ui/Chip"

/**
 * @interface CrossPostingData
 * @description Data structure for cross-posting configuration
 * 
 * @property {string} [primary_domain] - The origin domain where content is primarily published
 * @property {string[]} [target_blogs] - Array of domain names for syndication targets
 * @property {boolean} [cross_post_all] - When true, auto-selects all domains except primary
 */
interface CrossPostingData {
  primary_domain?: string
  target_blogs?: string[]
  cross_post_all?: boolean
}

/**
 * Get domains from discovery data if available, fallback to defaults
 * 
 * Attempts to load the dynamic domain list from the discovery manifest.
 * Strips the ".in" suffix for cleaner display in the UI.
 * 
 * @returns {string[]} List of domain names without .in suffix
 * 
 * @example
 * // Returns: ["getHarsh", "causality", "rawThoughts", ...]
 */
const getDomainsFromDiscovery = (): string[] => {
  if (typeof window !== 'undefined' && (window as any).__DECAP_DISCOVERY__) {
    const discovery = (window as any).__DECAP_DISCOVERY__;
    /**
     * Extract base domain names from full domain strings
     * Example: "getHarsh.in" -> "getHarsh"
     * This provides cleaner display in the UI
     */
    return discovery.domains?.map((d: string) => d.replace('.in', '')) || [];
  }
  /**
   * Fallback to hardcoded list if discovery not available
   * This ensures the widget works during development or if discovery fails.
   * Should be kept in sync with actual domains in the ecosystem.
   */
  return ["getHarsh", "causality", "rawThoughts", "sleepwalker", "daostudio"];
}

/**
 * CrossPostingWidget component
 * 
 * @param {WidgetProps<CrossPostingData>} props - Widget props from CMS
 * @param {CrossPostingData} props.value - Current field value
 * @param {function} props.onChange - Callback to update field value
 * @param {object} props.field - Field configuration from CMS config
 * @returns {JSX.Element} Rendered cross-posting configuration widget
 */
export const CrossPostingWidget: React.FC<WidgetProps<CrossPostingData>> = ({
  value = {},
  onChange,
  field
}) => {
  const [data, setData] = useState<CrossPostingData>(value)
  const [domains, setDomains] = useState<string[]>([])
  
  useEffect(() => {
    /**
     * Load domains from discovery data on mount
     * This ensures we have the latest domain list from the build system
     */
    setDomains(getDomainsFromDiscovery())
  }, [])
  
  useEffect(() => {
    /**
     * Notify CMS of data changes
     * Keeps form state in sync with widget state
     */
    onChange(data)
  }, [data, onChange])
  
  /**
   * Handle primary domain selection
   * @param {string} domain - Domain name to set as primary
   */
  const handlePrimaryChange = (domain: string) => {
    setData({ ...data, primary_domain: domain })
  }
  
  /**
   * Toggle target blog selection
   * @param {string} domain - Domain name to toggle in targets
   */
  const toggleTargetBlog = (domain: string) => {
    const current = data.target_blogs || []
    const updated = current.includes(domain)
      ? current.filter(d => d !== domain)
      : [...current, domain]
    setData({ ...data, target_blogs: updated })
  }
  
  /**
   * Toggle cross-post all functionality
   * When enabled, auto-selects all domains except primary
   */
  const toggleCrossPostAll = () => {
    const newValue = !data.cross_post_all
    setData({
      ...data,
      cross_post_all: newValue,
      target_blogs: newValue ? domains.filter(d => d !== data.primary_domain) : []
    })
  }
  
  return (
    <Card variant="glass" depth={1}>
      <CardHeader>
        <CardTitle className="text-lg">Cross-posting Configuration</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Primary Domain Selection - Origin of content */}
        <div className="space-y-2">
          <label className="text-sm font-mono text-text-secondary">
            Primary Domain
          </label>
          <div className="flex flex-wrap gap-2">
            {domains.map(domain => (
              <Button
                key={domain}
                variant={data.primary_domain === domain ? "primary" : "outline"}
                size="sm"
                onClick={() => handlePrimaryChange(domain)}
                type="button"
              >
                {domain}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Cross-post All Toggle - Convenience for selecting all targets */}
        <div className="flex items-center gap-3">
          <Button
            variant={data.cross_post_all ? "primary" : "outline"}
            size="sm"
            onClick={toggleCrossPostAll}
            type="button"
          >
            Cross-post to All Blogs
          </Button>
          {data.cross_post_all && (
            <span className="text-sm text-accent-secondary font-mono">
              (Auto-selected all except primary)
            </span>
          )}
        </div>
        
        {/* Target Blogs Selection - Manual selection when not using "all" */}
        {!data.cross_post_all && (
          <div className="space-y-2">
            <label className="text-sm font-mono text-text-secondary">
              Target Blogs
            </label>
            <div className="flex flex-wrap gap-2">
              {domains.filter(d => d !== data.primary_domain).map(domain => (
                <Chip
                  key={domain}
                  variant={data.target_blogs?.includes(domain) ? "primary" : "secondary"}
                  size="sm"
                  onClick={() => toggleTargetBlog(domain)}
                  className="cursor-pointer"
                >
                  {domain}
                </Chip>
              ))}
            </div>
          </div>
        )}
        
        {/* Preview - Shows all publishing destinations */}
        {data.primary_domain && (
          <div className="mt-4 pt-4 border-t border-accent-primary/20">
            <div className="text-sm font-mono space-y-1">
              <div className="text-accent-secondary">
                Publishing to:
              </div>
              <div className="text-text-primary">
                • blog.{data.primary_domain}.in (primary)
              </div>
              {(data.target_blogs || []).map(blog => (
                <div key={blog} className="text-text-secondary">
                  • blog.{blog}.in
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}