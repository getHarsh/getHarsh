/**
 * @fileoverview Page Preview Template for Decap CMS
 * Real-time preview renderer for custom pages within the CMS editor.
 * Provides accurate visual representation of page appearance using production components.
 * 
 * @module static/admin/templates/page-preview
 * @description
 * Renders page content in the CMS preview pane with:
 * - Production-identical component rendering
 * - Live SEO metadata preview
 * - Entity and page type indicators
 * - Glass morphism and terminal card variants
 * - Responsive layout with animations
 * 
 * @architecture
 * ```
 * PageConfig (Proto)
 *      ↓
 * CMS Editor → PagePreview (React)
 *      ↓
 * Production Components
 *   ├── PageLayout (container)
 *   ├── Card (content wrapper)
 *   └── Chip (metadata display)
 * ```
 * 
 * @proto-integration
 * - **Source**: page.proto → PageConfig
 * - **Fields**: title, description, entity, page_type, body, seo
 * - **Immutable.js**: entry.get("data") returns Immutable Map
 * - **Widget Integration**: widgetFor("body") renders markdown
 * 
 * @ecosystem-integration
 * - **Components**: Reuses production UI components
 * - **Styles**: Imports global CSS for consistent theming
 * - **Layout**: PageLayout provides standard container
 * - **Typography**: Prose classes for content formatting
 * - **Animations**: Fade-in animations with delays
 * 
 * @page-types
 * - **custom**: Generic custom page
 * - **landing**: Marketing landing page
 * - **about**: About/team page
 * - **contact**: Contact information
 * - **legal**: Terms, privacy, policies
 * 
 * @seo-preview
 * Shows actual meta title and description as they would appear in:
 * - Search engine results
 * - Social media cards
 * - Browser tabs
 * 
 * @dos
 * - Import production components for accuracy
 * - Handle missing fields gracefully with defaults
 * - Show SEO preview only when data exists
 * - Use Immutable.js methods for data access
 * - Apply production styling classes
 * 
 * @donts
 * - Don't modify production component behavior
 * - Don't skip null checks for optional fields
 * - Don't assume field existence
 * - Don't use preview-only styles
 * - Don't forget animation delays
 * 
 * @example
 * ```yaml
 * # CMS configuration
 * collections:
 *   - name: pages
 *     preview_path: /{{slug}}
 *     fields:
 *       - name: title
 *         widget: string
 *       - name: description
 *         widget: text
 *       - name: entity
 *         widget: select
 *       - name: page_type
 *         widget: select
 *       - name: body
 *         widget: markdown
 *       - name: seo
 *         widget: object
 * ```
 * 
 * @see {@link file://./CMS.md#preview-templates} - Preview system docs
 * @see {@link file://./BUILD.md#page-generation} - Page build process
 * @see {@link file://./USE-CASE.md#custom-pages} - Page use cases
 * @see {@link file://./README.md#pages} - Page documentation
 * 
 * @since 1.0.0
 */

import React from "react"
import { PreviewTemplateComponentProps } from "decap-cms-core"
import { PageLayout } from "../../../src/components/layout/PageLayout"
import { Card, CardContent, CardHeader, CardTitle } from "../../../src/components/ui/Card"
import { Chip } from "../../../src/components/ui/Chip"
import "../../../src/styles/global.css"

export const PagePreview: React.FC<PreviewTemplateComponentProps> = ({ entry, widgetFor }) => {
  // Get field values
  const data = entry.get("data").toJS()
  const body = widgetFor("body")
  
  return (
    <PageLayout>
      <div className="container mx-auto max-w-4xl px-4 py-12">
        {/* Page Header */}
        <header className="text-center mb-12 animate-fadeInUp">
          <h1 className="text-5xl font-display uppercase tracking-wider text-gradient mb-4">
            {data.title || "Untitled Page"}
          </h1>
          
          {data.description && (
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              {data.description}
            </p>
          )}
          
          <div className="flex justify-center gap-4 mt-6">
            <Chip variant="domain" size="sm">
              {data.entity || "Domain"}
            </Chip>
            <Chip variant="secondary" size="sm">
              {data.page_type || "custom"}
            </Chip>
          </div>
        </header>
        
        {/* Page Content */}
        <Card variant="glass" depth={2} className="animate-fadeInUp animation-delay-200">
          <CardContent className="prose prose-invert max-w-none">
            {body}
          </CardContent>
        </Card>
        
        {/* SEO Preview */}
        {(data.seo?.meta_title || data.seo?.meta_description) && (
          <Card variant="terminal" className="mt-8 animate-fadeInUp animation-delay-400">
            <CardHeader>
              <CardTitle className="text-sm">SEO Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 font-mono text-sm">
                {data.seo.meta_title && (
                  <div>
                    <span className="text-accent-secondary">Title:</span>{" "}
                    <span className="text-text-primary">{data.seo.meta_title}</span>
                  </div>
                )}
                {data.seo.meta_description && (
                  <div>
                    <span className="text-accent-secondary">Description:</span>{" "}
                    <span className="text-text-primary">{data.seo.meta_description}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </PageLayout>
  )
}