/**
 * @fileoverview Footer - Legacy footer component with policy and technical links
 * @module components/navigation/Footer
 * @deprecated Use UniversalFooter for new implementations
 * 
 * @description
 * Legacy footer component that displays copyright, policy links, technical links,
 * and ecosystem links. This component is configuration-driven and adapts to
 * different legal entities and domain configurations.
 * 
 * This component is being replaced by UniversalFooter which has better
 * consistency and feature support.
 * 
 * Key features:
 * - Dynamic copyright with legal entity name
 * - Policy links (Privacy, Terms, Cookies) based on config
 * - Technical links (RSS, Sitemap, AI Manifest)
 * - Ecosystem links (external ecosystem references)
 * - Responsive layout with mobile optimization
 * 
 * @ecosystem-integration
 * - Used by: Legacy Layout component
 * - Data flow: useConfig hook → footer content
 * - Legal entity: From config.legal_entity.name
 * - Policies: From config.policies configuration
 * 
 * @configuration
 * - Legal entity: config.legal_entity.name for copyright
 * - Domain info: config.domain_info.title as fallback
 * - Policies: config.policies.{privacy,terms,cookies}
 * - Ecosystem: config.ecosystem.{default_domain_url,learn_more_url}
 * 
 * @link-categories
 * - Policy Links: Privacy, Terms, Cookies (if enabled)
 * - Technical Links: RSS feed, Sitemap, AI Manifest (llms.txt)
 * - Ecosystem Links: External ecosystem domain and documentation
 * 
 * @responsive-behavior
 * - Desktop: Horizontal layout with sections
 * - Mobile: Vertical stacking with proper spacing
 * - Separators: Dot separators between links
 * 
 * @example
 * ```tsx
 * // Used in Layout component
 * <Layout>
 *   <MainContent />
 *   <Footer />
 * </Layout>
 * ```
 * 
 * @see {@link ./UniversalFooter.tsx} - Modern footer component (preferred)
 * @see {@link ../../../USE-CASE.md#bottom-footer-universal} - Footer specification
 * @see {@link ../layout/Layout.tsx} - Legacy layout using this component
 * @see {@link ../../../../config/CONFIG.md#legal-configuration} - Legal entity config
 * 
 * @since 1.0.0
 * @deprecated Since 1.1.0 - Use UniversalFooter instead
 */

import React from 'react'
import { Link } from 'gatsby'
import { useConfig } from '@/hooks/useConfig'
import { useSchema } from '@/hooks/useSchema'

/**
 * Footer component - Legacy footer with configuration-driven content
 * 
 * @deprecated Use UniversalFooter for new implementations
 * @returns {JSX.Element} Footer with copyright, policy, and technical links
 */
export const Footer: React.FC = () => {
  // Load configuration for dynamic content
  const config = useConfig()
  
  // Get schema utilities from hook
  const { buildOrganizationSchema, renderJsonLd } = useSchema()
  
  // Get current year for copyright
  const currentYear = new Date().getFullYear()
  
  // Destructure config for footer content
  const {
    legal_entity,   // Legal entity for copyright
    domain_info,    // Domain info as fallback
    policies,       // Policy configuration
    ecosystem = {},  // Ecosystem links
    social          // Social links for sameAs
  } = config

  /**
   * Policy links - Dynamically generated from config
   * Only shows enabled policies
   */
  const policyLinks = [
    policies?.privacy?.enabled && { 
      label: 'Privacy', 
      href: policies.privacy.url || '/privacy' 
    },
    policies?.terms?.enabled && { 
      label: 'Terms', 
      href: policies.terms.url || '/terms' 
    },
    policies?.cookies?.enabled && { 
      label: 'Cookies', 
      href: policies.cookies.url || '/cookies' 
    }
  ].filter((link): link is { label: string; href: string } => Boolean(link))

  /**
   * Technical links - Discovery and feed files
   * Always shown for transparency
   */
  const technicalLinks = [
    { label: 'RSS', href: '/feed.xml' },
    { label: 'Sitemap', href: '/sitemap.xml' },
    { label: 'AI Manifest', href: '/llms.txt' }
  ]

  /**
   * Ecosystem links - External ecosystem references
   * Links to parent ecosystem and documentation
   */
  const ecosystemLinks = [
    ecosystem.default_domain_url && {
      label: 'Ecosystem',
      href: ecosystem.default_domain_url
    },
    ecosystem.learn_more_url && {
      label: 'Learn more',
      href: ecosystem.learn_more_url
    }
  ].filter((link): link is { label: string; href: string } => Boolean(link))
  
  // Build Organization schema for SEO and rich snippets
  const organizationSchema = React.useMemo(() => {
    // Collect social links for sameAs
    const socialLinks = []
    if (social?.github) socialLinks.push(social.github)
    if (social?.twitter) socialLinks.push(`https://twitter.com/${social.twitter}`)
    if (social?.linkedin) socialLinks.push(social.linkedin)
    if (social?.youtube) socialLinks.push(social.youtube)
    
    return buildOrganizationSchema({
      name: legal_entity?.name || domain_info?.title,
      description: domain_info?.description,
      sameAs: socialLinks.length > 0 ? socialLinks : undefined
    })
  }, [legal_entity, domain_info, social, buildOrganizationSchema])

  return (
    <>
      {/* Inject Organization Schema.org JSON-LD for SEO */}
      {renderJsonLd(organizationSchema)}
      
      <footer className="bg-bg-glass backdrop-blur-xl border-t border-accent-primary/20 mt-auto">
      <div className="container mx-auto px-4 py-8">
        {/* Main footer container with responsive layout */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          {/* Copyright section with legal entity name */}
          <div className="font-mono text-sm text-text-secondary">
            © {currentYear} {legal_entity?.name || domain_info?.title}
          </div>

          {/* Links container with three sections */}
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-8">
            {/* Policy Links */}
            {policyLinks.length > 0 && (
              <div className="flex items-center space-x-4">
                {policyLinks.map((link, index) => (
                  <React.Fragment key={link.href}>
                    <Link
                      to={link.href}
                      className="font-mono text-sm text-text-secondary hover:text-accent-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                    {index < policyLinks.length - 1 && (
                      <span className="text-accent-primary/40">·</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}

            {/* Technical Links */}
            <div className="flex items-center space-x-4">
              {technicalLinks.map((link, index) => (
                <React.Fragment key={link.href}>
                  <Link
                    to={link.href}
                    className="font-mono text-sm text-text-secondary hover:text-accent-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                  {index < technicalLinks.length - 1 && (
                    <span className="text-accent-primary/40">·</span>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Ecosystem Links */}
            {ecosystemLinks.length > 0 && (
              <div className="flex items-center space-x-4">
                {ecosystemLinks.map((link, index) => (
                  <React.Fragment key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-sm text-text-secondary hover:text-accent-primary transition-colors"
                    >
                      {link.label}
                    </a>
                    {index < ecosystemLinks.length - 1 && (
                      <span className="text-accent-primary/40">·</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
    </>
  )
}