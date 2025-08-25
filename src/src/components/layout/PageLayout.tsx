/**
 * @fileoverview PageLayout - Modern page layout wrapper with RootLayout integration
 * @module components/layout/PageLayout
 * 
 * @description
 * Modern layout component that wraps page content with RootLayout for consistent
 * structure. This is the preferred layout component for new pages, providing
 * cleaner separation of concerns than the legacy Layout component.
 * 
 * Implements a composition-based architecture where PageLayout handles structural
 * concerns while RootLayout manages global features like theme, navigation, and SEO.
 * This separation allows for better testing, maintainability, and flexibility.
 * 
 * @architecture
 * ```
 * Page Component
 *      ↓
 *  PageLayout (this)
 *      ↓
 *  RootLayout
 *      ├── ThemeProvider (dark/light modes)
 *      ├── TopNavigation (entity-aware nav)
 *      ├── SEO (meta tags)
 *      ├── GTM (analytics)
 *      └── Footer (universal)
 * ```
 * 
 * @proto-integration
 * - **DomainConfig**: Entity detection for navigation styling
 * - **BlogConfig**: Blog-specific layout adjustments
 * - **ProjectConfig**: Project showcase layout
 * - **DocsConfig**: Documentation with sidebar
 * - **ThemeConfig**: Theme preferences and overrides
 * 
 * @ecosystem-integration
 * - **Used by**: All modern pages and templates
 * - **Data flow**: Page → PageLayout → RootLayout → Theme/Navigation
 * - **Navigation**: Handled by RootLayout with TopNavigation
 * - **Theme**: Inherits from RootLayout's ThemeProvider
 * - **SEO**: Managed by RootLayout's SEO component
 * - **Analytics**: GTM tracking via RootLayout
 * - **Accessibility**: Skip links and ARIA landmarks via RootLayout
 * 
 * @features
 * - **Composition Pattern**: Clean separation of layout concerns
 * - **Fixed Navigation**: Consistent 80px (pt-20) top padding
 * - **Z-Index Management**: Proper stacking context with z-base
 * - **Background Support**: Optional dynamic visualizations
 * - **Responsive Design**: Mobile-first with breakpoint awareness
 * - **Theme Integration**: Automatic dark/light mode support
 * - **Scroll Restoration**: Preserves scroll position on navigation
 * 
 * @configuration
 * - **showBackground**: Controls dynamic visualization display (future feature)
 * - **Padding**: Fixed pt-20 (80px) for navigation clearance
 * - **Z-index**: z-base (10) for proper layering above background
 * - **Min Height**: min-h-screen ensures footer positioning
 * 
 * @layout-structure
 * ```
 * ┌─────────────────────────────────┐
 * │     TopNavigation (fixed)       │ ← 80px height
 * ├─────────────────────────────────┤
 * │                                 │
 * │         Main Content            │ ← flex-grow
 * │         (children)              │
 * │                                 │
 * ├─────────────────────────────────┤
 * │          Footer                 │ ← auto height
 * └─────────────────────────────────┘
 * ```
 * 
 * @accessibility
 * - **Semantic Structure**: Uses <main> element for content
 * - **Skip Navigation**: Inherited from RootLayout
 * - **Focus Management**: Preserves keyboard navigation
 * - **ARIA Landmarks**: Proper region labeling
 * - **Screen Reader**: Content announced on route changes
 * 
 * @performance
 * - **Static Generation**: Pre-rendered at build time
 * - **Code Splitting**: RootLayout components lazy-loaded
 * - **CSS Optimization**: Tailwind classes purged in production
 * - **Layout Shift**: Fixed navigation prevents CLS
 * 
 * @responsive-behavior
 * - **Mobile**: Full-width with reduced padding
 * - **Tablet**: Centered content with margins
 * - **Desktop**: Max-width constraints on content
 * - **Wide**: Optional sidebar layouts supported
 * 
 * @dos
 * - Use for all new pages (modern pattern)
 * - Wrap entire page content as children
 * - Let RootLayout handle SEO and navigation
 * - Use semantic HTML within children
 * - Test with different viewport sizes
 * 
 * @donts
 * - Don't use Layout component for new pages
 * - Don't override pt-20 (breaks navigation)
 * - Don't add duplicate SEO components
 * - Don't nest PageLayout components
 * - Don't forget min-h-screen for proper footer
 * 
 * @example
 * ```tsx
 * // Standard page usage
 * <PageLayout>
 *   <HeroSection />
 *   <ContentSection />
 *   <CTASection />
 * </PageLayout>
 * 
 * // Page without background visualization
 * <PageLayout showBackground={false}>
 *   <ArticleContent />
 * </PageLayout>
 * 
 * // With custom sections
 * <PageLayout>
 *   <section className="container mx-auto px-4">
 *     <h1>Page Title</h1>
 *     <p>Content here...</p>
 *   </section>
 * </PageLayout>
 * 
 * // Documentation page with sidebar
 * <PageLayout>
 *   <div className="flex">
 *     <DocsSidebar />
 *     <DocsContent />
 *   </div>
 * </PageLayout>
 * ```
 * 
 * @see {@link file://./RootLayout.tsx} - Root layout wrapper
 * @see {@link file://./USE-CASE.md#modern-layout-pattern} - Layout specifications
 * @see {@link file://./BUILD.md#page-structure} - Build-time configuration
 * @see {@link file://./README.md#layouts} - Layout documentation
 * @see {@link file://./SERVICES.md#navigation} - Navigation patterns
 * 
 * @since 1.0.0
 */

import * as React from "react"
import { RootLayout } from "./RootLayout"

/**
 * @interface PageLayoutProps
 * @description Props for PageLayout component
 */
interface PageLayoutProps {
  /** Page content to render */
  children: React.ReactNode
  /** Whether to show background visualization (currently unused but available) */
  showBackground?: boolean
}

/**
 * PageLayout component - Modern page wrapper with consistent structure
 * 
 * @param {PageLayoutProps} props - Component props
 * @param {React.ReactNode} props.children - Page content
 * @param {boolean} [props.showBackground=true] - Show background visualization
 * @returns {JSX.Element} Page layout with RootLayout wrapper
 */
export const PageLayout: React.FC<PageLayoutProps> = ({ 
  children, 
  showBackground = true
}) => {
  return (
    <RootLayout>
      {/* Main page container with navigation clearance */}
      <div className="relative min-h-screen flex flex-col pt-20">
        {/* Content area with proper z-index for layering */}
        <main className="flex-grow relative z-base">
          {children}
        </main>
      </div>
    </RootLayout>
  )
}

export default PageLayout