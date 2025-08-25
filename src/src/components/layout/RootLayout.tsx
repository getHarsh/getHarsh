/**
 * @fileoverview RootLayout - Root application wrapper with theme and consent management
 * @module components/layout/RootLayout
 * 
 * @description
 * The root layout component that wraps the entire application, providing
 * foundational features including theme colors, animated backgrounds,
 * z-index layering, and GDPR/CCPA consent management.
 * 
 * This component sits at the top of the component hierarchy and ensures
 * consistent theming and legal compliance across all pages. It's the primary
 * integration point for global features that must be present on every page.
 * 
 * @architecture
 * ```
 * gatsby-browser.js / gatsby-ssr.js
 *            ↓
 *      RootLayout (this)
 *            ├── Theme Layer (bg-bg-primary, text-text-primary)
 *            ├── Background Animation (gradient-animated)
 *            ├── Content Layer (z-base stacking)
 *            └── ConsentBanner (GDPR/CCPA compliance)
 *                    ↓
 *              PageLayout
 *                    ↓
 *              Page Content
 * ```
 * 
 * @proto-integration
 * Maps to multiple proto configurations:
 * 
 * - **ConsentConfig** (consent.proto)
 *   - `consent_categories`: Analytics, functional, marketing
 *   - `default_consent_state`: Regional defaults (EU vs US)
 *   - `google_consent_mode`: Mode v2 integration
 *   - `cookie_storage`: Storage preferences
 * 
 * - **ThemeConfig** (theme.proto)
 *   - `colors`: Theme color definitions (bg-primary, text-primary)
 *   - `animations`: Gradient animation settings
 *   - `dark_mode_support`: Dark/light theme detection
 * 
 * - **DomainConfig** (domain.proto)
 *   - `legal_entity`: Determines consent requirements
 *   - `privacy_policy_url`: Links in consent banner
 *   - `cookie_policy_url`: Cookie policy reference
 * 
 * - **GTMConfig** (gtm.proto)
 *   - `consent_mode_v2`: Google consent integration
 *   - `default_consent`: Initial consent states
 *   - `wait_for_update`: Consent update timing
 * 
 * @hook-integration
 * While RootLayout doesn't directly use hooks, it enables:
 * 
 * - **useConfig()** - Access to theme and domain configuration
 * - **useGTM()** - GTM consent mode updates from ConsentBanner
 * - **useAccessibility()** - ARIA announcements for consent changes
 * - **useSchema()** - WebSite schema includes consent policy URLs
 * 
 * @ecosystem-integration
 * - **Used by**: PageLayout and all root-level wrappers
 * - **Data flow**: Gatsby → RootLayout → PageLayout → Page content
 * - **Theme Source**: `/src/config/themes.ts` → Tailwind CSS variables
 * - **Consent Flow**: ConsentBanner → localStorage → GTM dataLayer
 * - **Z-Index Stack**: gradient (z-0) → content (z-base/10) → consent (z-50)
 * 
 * @features
 * - **Theme Management**: Provides consistent colors via CSS variables
 * - **Animated Background**: GPU-accelerated gradient animation
 * - **Stacking Context**: Establishes z-index hierarchy for overlays
 * - **Legal Compliance**: GDPR/CCPA consent banner on all pages
 * - **Performance**: Static generation with minimal runtime overhead
 * - **Accessibility**: High contrast support, reduced motion respect
 * 
 * @configuration
 * Theme colors resolved from build configuration:
 * - **bg-bg-primary**: Main background color from theme
 * - **text-text-primary**: Main text color from theme
 * - **gradient-animated**: CSS animation defined in global.css
 * - **z-base**: Z-index 10 for content layer
 * 
 * @build-time
 * - **Static Generation**: Pre-rendered with Gatsby SSR
 * - **Theme Resolution**: Colors from `/build/configs/[domain]/theme.json`
 * - **Consent Config**: Legal requirements from domain.proto
 * - **CSS Variables**: Injected via gatsby-ssr.js
 * 
 * @legal-compliance
 * Implements comprehensive privacy compliance:
 * 
 * - **GDPR (EU)**:
 *   - Explicit consent required before cookies
 *   - Granular consent categories
 *   - Right to withdraw consent
 *   - Data processing transparency
 * 
 * - **CCPA (California)**:
 *   - Opt-out of sale of personal information
 *   - Do Not Sell My Personal Information link
 *   - Privacy rights disclosure
 * 
 * - **Google Consent Mode v2**:
 *   - `ad_storage`: Advertising cookies
 *   - `analytics_storage`: Analytics cookies
 *   - `functionality_storage`: Functional cookies
 *   - `personalization_storage`: Personalization
 *   - `security_storage`: Security (always granted)
 * 
 * @accessibility
 * - **Reduced Motion**: Respects prefers-reduced-motion for animations
 * - **High Contrast**: Theme colors meet WCAG AA contrast ratios
 * - **Screen Readers**: Consent banner properly announced
 * - **Keyboard Nav**: Full keyboard support in consent UI
 * - **Focus Management**: Focus trapped in consent modal
 * 
 * @performance
 * - **Static Shell**: Pre-rendered HTML with minimal JS
 * - **CSS Animation**: GPU-accelerated gradient animation
 * - **Lazy Consent**: ConsentBanner loaded only when needed
 * - **Local Storage**: Consent cached to avoid repeated prompts
 * 
 * @dos
 * - Always wrap PageLayout with RootLayout
 * - Let RootLayout handle global concerns
 * - Ensure ConsentBanner is last child (z-index)
 * - Use theme CSS variables for consistency
 * - Test consent flow in EU and US regions
 * 
 * @donts
 * - Don't add duplicate theme providers
 * - Don't override min-h-screen (breaks layout)
 * - Don't position elements above z-50 (consent)
 * - Don't modify consent without legal review
 * - Don't disable animations without fallback
 * 
 * @example
 * ```tsx
 * // Standard usage via PageLayout (recommended)
 * <PageLayout>
 *   <YourPageContent />
 * </PageLayout>
 * // PageLayout internally uses RootLayout
 * 
 * // Direct usage for custom layouts (rare)
 * <RootLayout>
 *   <CustomNavigation />
 *   <main>{content}</main>
 *   <CustomFooter />
 * </RootLayout>
 * 
 * // With custom theme overrides
 * <RootLayout>
 *   <div className="bg-brand-primary">
 *     <SpecialLayout />
 *   </div>
 * </RootLayout>
 * ```
 * 
 * @see {@link file://./PageLayout.tsx} - Primary consumer of RootLayout
 * @see {@link file://./SEO.tsx} - SEO meta tags component
 * @see {@link file://../consent/ConsentBanner.tsx} - Consent management UI
 * @see {@link file://../../hooks/useConfig.ts} - Theme configuration hook
 * @see {@link file://../../hooks/useGTM.ts} - GTM consent integration
 * @see {@link file://../../config/themes.ts} - Theme definitions
 * @see {@link file://./BUILD.md#theme-system} - Theme build process
 * @see {@link file://./CMS.md#consent-management} - Consent configuration
 * 
 * @since 1.0.0
 */

import * as React from "react"
import { ConsentBanner } from "../consent"

/**
 * @interface RootLayoutProps
 * @description Props for RootLayout component
 * 
 * Minimal props interface as RootLayout is designed to be a transparent wrapper
 * that provides global functionality without requiring configuration.
 * 
 * @property {React.ReactNode} children - Application content to render
 * The entire component tree that makes up the page content. This typically
 * includes navigation, main content, and footer components. RootLayout wraps
 * this content with theme, background, and consent management layers.
 * 
 * @example
 * ```tsx
 * const props: RootLayoutProps = {
 *   children: (
 *     <>
 *       <TopNavigation />
 *       <main>{pageContent}</main>
 *       <Footer />
 *     </>
 *   )
 * }
 * ```
 */
interface RootLayoutProps {
  /** Application content to render */
  children: React.ReactNode
}

/**
 * RootLayout component - Root application wrapper with theme and consent
 * 
 * The foundational layout component that establishes the visual and legal
 * framework for the entire application. This component creates a three-layer
 * structure: background animation, main content, and consent overlay.
 * 
 * @component
 * @param {RootLayoutProps} props - Component props
 * @param {React.ReactNode} props.children - Application content to wrap
 * 
 * @returns {JSX.Element} Root wrapper div containing:
 * - Theme-aware container with min-h-screen for full viewport coverage
 * - Animated gradient background layer (z-index: 0)
 * - Content layer with z-base stacking (z-index: 10)
 * - ConsentBanner overlay (z-index: 50)
 * 
 * @remarks
 * Component Structure:
 * 1. **Outer Container**: Establishes viewport height and theme colors
 *    - `min-h-screen`: Ensures footer stays at bottom on short pages
 *    - `bg-bg-primary`: Theme-aware background color
 *    - `text-text-primary`: Theme-aware text color
 * 
 * 2. **Gradient Background**: Visual enhancement layer
 *    - `gradient-animated`: CSS animation for visual interest
 *    - Positioned absolutely behind content
 *    - GPU-accelerated for performance
 * 
 * 3. **Content Wrapper**: Main application content
 *    - `relative`: Establishes positioning context
 *    - `z-base`: Z-index 10 for proper stacking
 *    - Contains all page components
 * 
 * 4. **Consent Banner**: Legal compliance overlay
 *    - Renders conditionally based on consent state
 *    - Positioned above all content (z-50)
 *    - Manages Google Consent Mode v2
 * 
 * @example
 * ```tsx
 * // Basic usage
 * export const App = () => (
 *   <RootLayout>
 *     <Navigation />
 *     <MainContent />
 *     <Footer />
 *   </RootLayout>
 * )
 * 
 * // With PageLayout (recommended pattern)
 * export const ModernPage = () => (
 *   <PageLayout> // PageLayout internally uses RootLayout
 *     <HeroSection />
 *     <FeaturesSection />
 *   </PageLayout>
 * )
 * ```
 * 
 * @see ConsentBanner - GDPR/CCPA compliance component
 * @see PageLayout - Higher-level layout that uses RootLayout
 */
export const RootLayout: React.FC<RootLayoutProps> = ({ 
  children
}) => {
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      {/* Animated gradient background for visual interest 
          Uses CSS keyframe animation defined in global.css
          Provides subtle movement without distraction */}
      <div className="gradient-animated" />
      
      {/* Main content with proper z-index layering
          z-base (10) ensures content appears above background
          but below modals and consent banner */}
      <div className="relative z-base">
        {children}
      </div>
      
      {/* GDPR/CCPA Consent Banner - Required for legal compliance
          Positioned last to ensure it appears above all content (z-50)
          Manages cookie consent and Google Consent Mode v2 integration
          Only renders on first visit or when consent needs updating */}
      <ConsentBanner />
    </div>
  )
}

export default RootLayout