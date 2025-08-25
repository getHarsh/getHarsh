/**
 * @fileoverview PolicyPage - Legal policy page template
 * @module templates/policy-page
 * 
 * @description
 * Template for rendering legal policy pages (privacy, cookies, terms) from
 * markdown content stored in master_posts/pages/[entity]/. Supports template
 * variable substitution and entity-specific content selection.
 * 
 * Key features:
 * - Entity-aware content selection
 * - Template variable substitution
 * - Markdown content rendering
 * - Legal compliance formatting
 * - Cross-domain entity information
 * - Responsive layout
 * 
 * @ecosystem-integration
 * - Used by: gatsby-node.js for policy page generation
 * - Data flow: Markdown → GraphQL → Template → Rendered page
 * - Entity selection: Based on domain_info.entity_key
 * - Variables: From PolicySettings.template_variables
 * 
 * @configuration
 * - Policy content: master_posts/pages/[entity]/*.md
 * - Entity key: domain_info.entity_key in config.yml
 * - Template vars: PolicySettings.template_variables map
 * - Policy overrides: PolicyOverrides for enable/disable
 * 
 * @content-structure
 * - Frontmatter: title, permalink, layout, entity, legal_name
 * - Body: Markdown with {VARIABLE} placeholders (single braces)
 * - Variables: Substituted from template_variables map
 * - Entity filtering: Only current entity's policies used
 * 
 * @template-variables
 * - {ENTITY_LEGAL_NAME}: Full legal entity name
 * - {ENTITY_ABBREVIATION}: Entity abbreviation (RTEPL/DSPL)
 * - {CURRENT_DOMAIN}: Current domain being built
 * - {LAST_UPDATED}: Policy update date
 * - {DATA_CONTROLLER_EMAIL}: GDPR data controller
 * - Additional vars from PolicySettings.template_variables
 * 
 * @visual-design
 * - Clean, readable legal document layout
 * - Proper heading hierarchy
 * - Accessible typography
 * - Print-friendly styling
 * - Mobile-responsive
 * 
 * @dos
 * - DO: Use semantic HTML for accessibility
 * - DO: Ensure proper heading hierarchy
 * - DO: Support print media queries
 * - DO: Validate all template variables exist
 * 
 * @donts
 * - DON'T: Hard-code entity names
 * - DON'T: Skip variable substitution
 * - DON'T: Mix entity policies
 * - DON'T: Ignore accessibility
 * 
 * @example
 * ```tsx
 * // Context from gatsby-node.js
 * {
 *   id: "markdown-node-id",
 *   entity: "RTEPL",
 *   legalName: "Raw Thoughts Enterprises Private Limited",
 *   policyType: "privacy",
 *   templateVariables: {
 *     "ENTITY_LEGAL_NAME": "Raw Thoughts...",
 *     "DATA_CONTROLLER_EMAIL": "privacy@rawthoughts.in"
 *   }
 * }
 * ```
 * 
 * @see {@link ../gatsby-node.js} - Page creation logic
 * @see {@link ../../config/schema/domain.proto} - PolicySettings schema
 * @see {@link ../../CMS.md} - Content management flow
 * @see {@link ../../USE-CASE.md#policy-pages} - Policy page requirements
 * 
 * @since 1.0.0
 */

import * as React from "react"
import { graphql, PageProps } from "gatsby"
import { PageLayout } from "@/components/layout"
import { cn } from "@/lib/utils"

/**
 * Context passed from gatsby-node.js during page creation
 */
interface PolicyPageContext {
  /** GraphQL node ID for the markdown content */
  id: string
  
  /** Entity key (RTEPL/DSPL) from domain config */
  entity: string
  
  /** Full legal entity name */
  legalName: string
  
  /** Current domain being built */
  currentDomain: string
  
  /** Type of policy (privacy/cookies/terms) */
  policyType: string
  
  /** All domains owned by this entity */
  entityDomains: string[]
  
  /** Feature flags for analytics and tracking */
  featureFlags: Record<string, boolean>
  
  /** Google Tag Manager configuration */
  gtmConfig: any
  
  /** Template variables for substitution */
  templateVariables: Record<string, string>
}

/**
 * GraphQL query result shape
 */
interface PolicyPageData {
  markdownRemark: {
    html: string
    frontmatter: {
      title: string
      permalink: string
      layout: string
      entity: string
      legal_name: string
    }
  }
}

/**
 * PolicyPageTemplate component
 * 
 * Renders legal policy pages with template variable substitution.
 * Content comes from markdown files organized by entity.
 * 
 * @param data - GraphQL query result with markdown content
 * @param pageContext - Context from gatsby-node.js with variables
 * @returns Rendered policy page with substituted variables
 */
const PolicyPageTemplate: React.FC<PageProps<PolicyPageData, PolicyPageContext>> = ({
  data,
  pageContext
}) => {
  const { html, frontmatter } = data.markdownRemark
  const { 
    templateVariables, 
    policyType, 
    currentDomain,
    legalName,
    entity
  } = pageContext
  
  /**
   * Substitute template variables in HTML content
   * Replaces {VARIABLE} placeholders with actual values (single braces as per actual markdown files)
   */
  const processedHtml = React.useMemo(() => {
    let processed = html
    
    // Replace all {VARIABLE} placeholders with values from templateVariables
    Object.entries(templateVariables).forEach(([key, value]) => {
      const regex = new RegExp(`{${key}}`, 'g')
      processed = processed.replace(regex, value || '')
    })
    
    // Also replace any {VARIABLE} that might not be in templateVariables
    // but are in pageContext directly
    processed = processed.replace(/{CURRENT_DOMAIN}/g, currentDomain)
    processed = processed.replace(/{ENTITY}/g, entity)
    processed = processed.replace(/{LEGAL_NAME}/g, legalName)
    
    return processed
  }, [html, templateVariables, currentDomain, entity, legalName])
  
  /**
   * Generate meta description based on policy type
   */
  const metaDescription = React.useMemo(() => {
    const descriptions: Record<string, string> = {
      privacy: `Privacy policy for ${legalName}. Learn how we collect, use, and protect your personal data.`,
      cookies: `Cookie policy for ${legalName}. Understand how we use cookies and similar technologies.`,
      terms: `Terms of service for ${legalName}. Read our terms and conditions for using our services.`
    }
    return descriptions[policyType] || `Legal policy for ${legalName}`
  }, [policyType, legalName])
  
  return (
    <PageLayout>
      <article className="policy-page">
        {/* Policy Header */}
        <header className="policy-header py-12 px-4 border-b">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {frontmatter.title}
            </h1>
            <div className="text-sm text-muted-foreground">
              <span>{legalName}</span>
              {entity && (
                <>
                  <span className="mx-2">•</span>
                  <span>{entity}</span>
                </>
              )}
            </div>
          </div>
        </header>
        
        {/* Policy Content */}
        <main className="policy-content py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <div 
              className={cn(
                "prose prose-lg max-w-none",
                "prose-headings:font-semibold",
                "prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4",
                "prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3",
                "prose-p:text-base prose-p:leading-relaxed",
                "prose-ul:my-4 prose-li:my-2",
                "prose-strong:font-semibold",
                "prose-a:text-primary prose-a:underline hover:prose-a:no-underline",
                "print:prose-a:text-black print:prose-a:no-underline"
              )}
              dangerouslySetInnerHTML={{ __html: processedHtml }}
            />
          </div>
        </main>
        
        {/* Policy Footer */}
        <footer className="policy-footer py-8 px-4 border-t">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
              <div>
                © {new Date().getFullYear()} {legalName}. All rights reserved.
              </div>
              <div className="flex gap-4">
                {policyType !== 'privacy' && (
                  <a href="/privacy/" className="hover:text-primary transition-colors">
                    Privacy Policy
                  </a>
                )}
                {policyType !== 'cookies' && (
                  <a href="/cookies/" className="hover:text-primary transition-colors">
                    Cookie Policy
                  </a>
                )}
                {policyType !== 'terms' && (
                  <a href="/terms/" className="hover:text-primary transition-colors">
                    Terms of Service
                  </a>
                )}
              </div>
            </div>
          </div>
        </footer>
      </article>
      
      {/* Print Styles */}
      <style>{`
        @media print {
          .policy-header,
          .policy-footer {
            page-break-inside: avoid;
          }
          
          .policy-content {
            page-break-before: auto;
            page-break-after: auto;
          }
          
          .policy-content h2 {
            page-break-after: avoid;
          }
          
          .policy-content h3 {
            page-break-after: avoid;
          }
        }
      `}</style>
    </PageLayout>
  )
}

export default PolicyPageTemplate

/**
 * GraphQL query for fetching markdown content
 * The $id parameter is passed from gatsby-node.js context
 */
export const query = graphql`
  query PolicyPageQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        permalink
        layout
        entity
        legal_name
      }
    }
  }
`