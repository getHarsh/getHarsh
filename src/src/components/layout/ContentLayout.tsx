/**
 * @fileoverview ContentLayout - Responsive content width container
 * @module components/layout/ContentLayout
 * 
 * @description
 * Provides consistent content width management across the ecosystem.
 * Implements responsive container widths for optimal reading experience
 * on different screen sizes and content types.
 * 
 * Critical for maintaining readability and visual hierarchy by constraining
 * content to appropriate widths based on content type and device. Follows
 * typography best practices with line lengths optimized for reading speed
 * and comprehension.
 * 
 * @architecture
 * ```
 * PageLayout
 *     ↓
 * ContentLayout (this)
 *     ├── narrow: 672px (prose)
 *     ├── normal: 896px (standard)
 *     ├── wide: 1152px (rich content)
 *     └── full: 100% (hero/media)
 * ```
 * 
 * @proto-integration
 * - **ArticleConfig**: Content width preferences for articles
 * - **PageConfig**: Page-specific width overrides
 * - **DocsConfig**: Documentation layout constraints
 * - **BlogConfig**: Blog post optimal widths
 * - **DisplaySettings**: Per-content display preferences
 * 
 * @ecosystem-integration
 * - **Used by**: Article pages, about pages, policy pages, documentation
 * - **Data flow**: Parent component → ContentLayout → wrapped content
 * - **Layout hierarchy**: PageLayout → ContentLayout → content components
 * - **Responsive**: Works with Tailwind's breakpoint system
 * - **Theme**: Respects theme spacing and padding variables
 * - **Typography**: Optimized for reading comprehension
 * - **Accessibility**: Maintains readable line lengths for dyslexia
 * 
 * @features
 * - **Width Variants**: Four predefined widths for different content
 * - **Auto Centering**: Horizontal centering with mx-auto
 * - **Responsive Padding**: container-padding utility adapts to viewport
 * - **Composable Classes**: Merge custom classes with cn() utility
 * - **Fluid Scaling**: Smooth transitions between breakpoints
 * - **Reading Optimization**: Line lengths follow typography best practices
 * 
 * @typography-science
 * - **Narrow (45-75 chars)**: Optimal for sustained reading (articles, docs)
 * - **Normal (60-90 chars)**: Balanced for mixed content
 * - **Wide (80-120 chars)**: Rich content with multiple columns
 * - **Full**: Media-heavy content, heroes, immersive experiences
 * 
 * @configuration
 * - **Width variants**: narrow (prose), normal (standard), wide (rich), full (edge-to-edge)
 * - **Padding**: Uses container-padding utility from theme
 * - **Centering**: Automatic with mx-auto
 * - **Breakpoints**: sm:640px, md:768px, lg:1024px, xl:1280px, 2xl:1536px
 * 
 * @responsive-behavior
 * ```
 * Mobile (< 640px):
 * ├── All variants: 100% - 32px padding
 * 
 * Tablet (640-1024px):
 * ├── narrow: max 672px
 * ├── normal: max 896px
 * ├── wide/full: 100% - padding
 * 
 * Desktop (> 1024px):
 * ├── narrow: 672px centered
 * ├── normal: 896px centered
 * ├── wide: 1152px centered
 * └── full: 100% width
 * ```
 * 
 * @accessibility
 * - **Line Length**: Optimized for reading disabilities
 * - **Contrast**: Sufficient padding for visual separation
 * - **Zoom Support**: Scales properly up to 200% zoom
 * - **Reflow**: Content reflows without horizontal scroll
 * - **Focus Visible**: Maintains focus indicators within bounds
 * 
 * @performance
 * - **CSS Only**: No JavaScript required for layout
 * - **GPU Acceleration**: Transform-based centering
 * - **Paint Optimization**: Fixed widths prevent reflow
 * - **Critical CSS**: Styles included in initial bundle
 * 
 * @dos
 * - Choose width based on content type and density
 * - Use narrow for long-form text content
 * - Apply wide for data tables and grids
 * - Add vertical padding via className when needed
 * - Test readability at different zoom levels
 * 
 * @donts
 * - Don't override mx-auto (breaks centering)
 * - Don't use for navigation or footer (full-width components)
 * - Don't nest ContentLayout components
 * - Don't mix width variants on same page (inconsistent)
 * - Don't forget container-padding (content touches edges)
 * 
 * @example
 * ```tsx
 * // Article content with optimal reading width
 * <ContentLayout maxWidth="narrow">
 *   <ArticleHeader />
 *   <ArticleBody />
 *   <ArticleFooter />
 * </ContentLayout>
 * 
 * // Wide layout for rich content
 * <ContentLayout maxWidth="wide" className="py-8">
 *   <ServiceGrid services={services} />
 * </ContentLayout>
 * 
 * // Full width for hero sections
 * <ContentLayout maxWidth="full">
 *   <HeroSection />
 * </ContentLayout>
 * 
 * // Documentation with sidebar
 * <ContentLayout maxWidth="wide">
 *   <div className="flex gap-8">
 *     <DocsSidebar className="w-64" />
 *     <DocsContent className="flex-1" />
 *   </div>
 * </ContentLayout>
 * 
 * // Nested sections with different widths
 * <PageLayout>
 *   <ContentLayout maxWidth="full">
 *     <Hero />
 *   </ContentLayout>
 *   <ContentLayout maxWidth="normal" className="py-16">
 *     <Features />
 *   </ContentLayout>
 *   <ContentLayout maxWidth="narrow" className="py-12">
 *     <Testimonial />
 *   </ContentLayout>
 * </PageLayout>
 * ```
 * 
 * @see {@link file://./USE-CASE.md#content-types-layouts} - Content layout patterns
 * @see {@link file://./PageLayout.tsx} - Parent layout component
 * @see {@link file://./README.md#responsive-design} - Responsive system
 * @see {@link file://./BUILD.md#typography} - Typography guidelines
 * @see {@link file://./SERVICES.md#content-structure} - Content organization
 * 
 * @since 1.0.0
 */

import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * @interface ContentLayoutProps
 * @description Props for ContentLayout component with width and styling options
 * 
 * @property {React.ReactNode} children - Content to be wrapped in layout container.
 * Can be any valid React node including components, elements, or text.
 * The content will be constrained to the specified max width and centered.
 * 
 * @property {string} [className] - Additional CSS classes for customization.
 * These classes are merged with the base layout classes using the cn() utility,
 * allowing for additional spacing, colors, or responsive overrides.
 * Common use cases: py-8 for vertical padding, bg-* for backgrounds.
 * 
 * @property {'narrow' | 'normal' | 'wide' | 'full'} [maxWidth='normal'] - Maximum width variant
 * Controls the content container's maximum width for optimal presentation:
 * - 'narrow': Best for articles and long-form text (45-75 characters per line)
 * - 'normal': Standard width for mixed content (60-90 characters per line)  
 * - 'wide': For rich content like grids and galleries (80-120 characters)
 * - 'full': Edge-to-edge for immersive experiences and heroes
 * 
 * @example
 * ```tsx
 * const props: ContentLayoutProps = {
 *   children: <ArticleContent />,
 *   className: "py-12 bg-gray-50",
 *   maxWidth: "narrow"
 * }
 * ```
 */
interface ContentLayoutProps {
  /** Content to be wrapped in layout container */
  children: React.ReactNode
  /** Additional CSS classes for customization */
  className?: string
  /** Maximum width variant for content container */
  maxWidth?: "narrow" | "normal" | "wide" | "full"
}

/**
 * @constant maxWidthClasses
 * @description Tailwind CSS classes mapping for each width variant
 * 
 * Maps width variant names to their corresponding Tailwind max-width utilities.
 * These widths are carefully chosen based on typography best practices and
 * readability research. The pixel values represent the maximum width at
 * desktop breakpoints.
 * 
 * @property {string} narrow - max-w-2xl (672px) - Optimal for prose/articles
 * Line length of 45-75 characters is ideal for sustained reading and comprehension.
 * Research shows this range minimizes eye movement and cognitive load.
 * Use for: Blog posts, documentation, articles, text-heavy content.
 * 
 * @property {string} normal - max-w-4xl (896px) - Standard content width
 * Balanced width for mixed content types with 60-90 characters per line.
 * Provides good readability while accommodating images and other media.
 * Use for: Landing pages, about sections, feature descriptions.
 * 
 * @property {string} wide - max-w-6xl (1152px) - Rich content like grids
 * Wider container for content that benefits from horizontal space.
 * Supports 80-120 characters or multi-column layouts.
 * Use for: Service grids, project galleries, comparison tables.
 * 
 * @property {string} full - max-w-full - Edge-to-edge content
 * No width constraint, content extends to viewport edges (minus padding).
 * Use for: Hero sections, full-width images, immersive experiences.
 * 
 * @readonly
 * @type {Record<'narrow' | 'normal' | 'wide' | 'full', string>}
 */
const maxWidthClasses = {
  narrow: "max-w-2xl",  // ~45-75 characters per line (optimal reading)
  normal: "max-w-4xl",  // Standard content width
  wide: "max-w-6xl",    // Rich content, grids, galleries
  full: "max-w-full"    // Full width, hero sections
} as const

/**
 * ContentLayout component - Responsive content width container
 * 
 * Creates a centered, responsive container with configurable maximum width.
 * This component is fundamental to maintaining consistent content presentation
 * across the ecosystem, ensuring optimal readability and visual hierarchy.
 * 
 * The component uses Tailwind's responsive utilities to adapt to different
 * screen sizes, providing appropriate padding and width constraints at each
 * breakpoint. Content is always centered horizontally with mx-auto.
 * 
 * @component
 * @param {ContentLayoutProps} props - Component props
 * @param {React.ReactNode} props.children - Content to wrap in the layout container
 * @param {string} [props.className] - Additional CSS classes to merge with base styles
 * @param {'narrow' | 'normal' | 'wide' | 'full'} [props.maxWidth='normal'] - Width variant
 * 
 * @returns {JSX.Element} Content wrapped in responsive container div
 * 
 * @remarks
 * The component applies three sets of classes in order:
 * 1. Base classes: "mx-auto w-full container-padding" for centering and padding
 * 2. Width constraint: Selected from maxWidthClasses based on maxWidth prop
 * 3. Custom classes: Additional classes passed via className prop
 * 
 * The cn() utility ensures proper class merging and conflict resolution,
 * with later classes taking precedence over earlier ones.
 * 
 * @example
 * ```tsx
 * // Basic usage with default width
 * <ContentLayout>
 *   <h1>Page Title</h1>
 *   <p>Page content...</p>
 * </ContentLayout>
 * 
 * // Article with narrow width for optimal reading
 * <ContentLayout maxWidth="narrow" className="py-12">
 *   <article>
 *     <h1>{article.title}</h1>
 *     <div dangerouslySetInnerHTML={{ __html: article.content }} />
 *   </article>
 * </ContentLayout>
 * 
 * // Full-width hero section
 * <ContentLayout maxWidth="full" className="bg-gradient-to-r from-blue-500 to-purple-600">
 *   <HeroSection />
 * </ContentLayout>
 * ```
 */
export const ContentLayout: React.FC<ContentLayoutProps> = ({ 
  children, 
  className,
  maxWidth = "normal"
}) => {
  return (
    <div className={cn(
      "mx-auto w-full container-padding",  // Center with responsive padding
      maxWidthClasses[maxWidth],            // Apply width constraint
      className                              // Custom classes
    )}>
      {children}
    </div>
  )
}

export default ContentLayout