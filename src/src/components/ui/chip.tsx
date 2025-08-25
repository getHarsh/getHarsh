/**
 * @fileoverview Chip - Interactive tag component with link support
 * @module components/ui/Chip
 * 
 * @description
 * A versatile chip/tag component for displaying metadata, categories, and
 * interactive labels. Supports both static display and clickable links with
 * external link indicators.
 * 
 * This component serves as the primary way to display tags, categories,
 * domains, and other metadata across the getHarsh ecosystem. It bridges
 * the gap between static labels and interactive navigation elements.
 * 
 * @architecture
 * ```
 * Chip Component
 *       ├── CVA Variants
 *       │     ├── Style Variants (5 types)
 *       │     └── Size Variants (3 types)
 *       ├── Render Logic
 *       │     ├── <span> (no href)
 *       │     └── <a> (with href)
 *       └── External Indicator
 *             └── SVG icon (conditional)
 * 
 * Rendering Decision:
 * href? → <a> with link props : <span> with ref
 * external? → target="_blank" + icon : normal link
 * ```
 * 
 * @proto-integration
 * Maps to UI and content configurations:
 * 
 * - **ChipConfig** (ui.proto)
 *   - `default_variant`: Standard style
 *   - `default_size`: Standard size
 *   - `external_indicator`: Icon display
 *   - `hover_scale`: 1.05 default
 * 
 * - **TagConfig** (content.proto)
 *   - `tag_display_style`: Chip variant mapping
 *   - `max_tag_length`: Character limit
 *   - `tag_click_action`: Navigation behavior
 * 
 * - **NavigationConfig** (navigation.proto)
 *   - `external_link_behavior`: New tab settings
 *   - `domain_chip_style`: Domain variant
 * 
 * - **ThemeConfig** (theme.proto)
 *   - `chip_depth`: Glass morphism level
 *   - `chip_animation`: Fade-in and hover
 * 
 * @hook-integration
 * While Chip doesn't use hooks directly, parent components often use:
 * 
 * - **useGTM()**: Track chip clicks
 * - **useConfig()**: Theme variant selection
 * - **useAccessibility()**: ARIA labels
 * 
 * @ecosystem-integration
 * - **Used by**: ArticleCard (tags), Navigation (domains), Filters (categories)
 * - **Links**: Internal routing or external navigation
 * - **Analytics**: Click tracking via parent components
 * - **Theme**: Respects dark/light mode automatically
 * - **Animation**: Smooth scale and shadow transitions
 * 
 * @features
 * - **5 Style Variants**: Semantic visual styles
 * - **3 Size Options**: From compact to prominent
 * - **Link Support**: Optional navigation
 * - **External Indicator**: Visual cue for external links
 * - **Hover Effects**: Scale and shadow animations
 * - **Glass Morphism**: Depth-based styling
 * - **Uppercase Display**: Consistent typography
 * - **Fade-in Animation**: Smooth appearance
 * 
 * @variant-specifications
 * ```
 * default:
 *   - Glass morphism (depth-1)
 *   - Hover: scale(1.05) + shadow-depth-2
 *   - General purpose tags
 * 
 * primary:
 *   - Accent background
 *   - High contrast text
 *   - Important/featured tags
 * 
 * secondary:
 *   - Muted accent (20% opacity)
 *   - Subtle emphasis
 *   - Secondary metadata
 * 
 * outline:
 *   - Transparent with border
 *   - Hover: adds depth-1
 *   - Alternative style
 * 
 * domain:
 *   - Left accent border
 *   - Bold text
 *   - Domain/site indicators
 * ```
 * 
 * @size-specifications
 * ```
 * sm:      px-2 py-0.5 text-[10px]
 * default: px-3 py-1 text-xs
 * lg:      px-4 py-1.5 text-sm
 * ```
 * 
 * @link-behavior
 * ```
 * No href:
 *   - Renders as <span>
 *   - Static display only
 *   - No cursor pointer
 * 
 * Internal link (href without external):
 *   - Standard <a> tag
 *   - Same-tab navigation
 *   - Cursor pointer
 * 
 * External link (href with external):
 *   - target="_blank"
 *   - rel="noopener noreferrer"
 *   - External icon indicator
 *   - Opens in new tab
 * ```
 * 
 * @accessibility
 * - **Semantic HTML**: Proper element choice (span/a)
 * - **Keyboard Nav**: Tab-able when clickable
 * - **Focus States**: Visible focus ring
 * - **Screen Readers**: Descriptive content
 * - **External Links**: rel attribute for security
 * 
 * @performance
 * - **CVA Caching**: Variant classes cached
 * - **Conditional Rendering**: Efficient element choice
 * - **SVG Icon**: Inline for performance
 * - **CSS Transitions**: GPU-accelerated
 * 
 * @security
 * External links include:
 * - target="_blank" for new tab
 * - rel="noopener noreferrer" for security
 * - Visual indicator for user awareness
 * 
 * @dos
 * - Use for short labels (1-3 words)
 * - Include external prop for outside links
 * - Use semantic variants for meaning
 * - Group chips with consistent sizing
 * - Test hover states
 * 
 * @donts
 * - Don't use for long text or sentences
 * - Don't nest other interactive elements
 * - Don't remove hover feedback
 * - Don't mix sizes in same row
 * - Don't forget external indicators
 * 
 * @example
 * ```tsx
 * // Tag list for article
 * <div className="flex gap-2 flex-wrap">
 *   {article.tags.map(tag => (
 *     <Chip 
 *       key={tag}
 *       href={`/tags/${tag}`}
 *       variant="default"
 *       size="sm"
 *     >
 *       {tag}
 *     </Chip>
 *   ))}
 * </div>
 * 
 * // Domain indicator
 * <Chip variant="domain" size="lg">
 *   blog.getHarsh.in
 * </Chip>
 * 
 * // External resource
 * <Chip 
 *   href="https://github.com/harsh"
 *   external
 *   variant="outline"
 * >
 *   GitHub Profile
 * </Chip>
 * 
 * // Status indicator
 * <Chip variant="primary" size="sm">
 *   NEW
 * </Chip>
 * 
 * // Category filter
 * <Chip 
 *   onClick={() => filterByCategory('react')}
 *   variant={isActive ? 'primary' : 'outline'}
 * >
 *   React
 * </Chip>
 * ```
 * 
 * @see {@link file://./USE-CASE.md#ui-components} - UI components spec
 * @see {@link file://./Badge.tsx} - Related badge component
 * @see {@link file://./Button.tsx} - Button component
 * @see {@link file://../article/ArticleCard.tsx} - Usage in articles
 * @see {@link https://cva.style/docs} - Class Variance Authority
 * 
 * @since 1.0.0
 */

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

/**
 * Chip variant configuration using CVA
 * 
 * Defines all style variants and sizes for the chip component.
 * Uses Class Variance Authority for efficient variant management
 * with compile-time optimization and type safety.
 * 
 * Base classes include retrofuturistic styling with rounded-terminal
 * borders and fade-in animation for smooth appearance.
 * 
 * @const {cva} chipVariants
 */
const chipVariants = cva(
  "inline-flex items-center rounded-terminal px-3 py-1 text-xs font-display uppercase tracking-wider transition-all duration-200 animate-fadeIn",
  {
    variants: {
      variant: {
        default: "depth-1 hover:scale-105 hover:shadow-depth-2",
        primary: "bg-accent-primary text-bg-primary hover:bg-accent-secondary hover:scale-105",
        secondary: "bg-accent-secondary/20 text-accent-secondary hover:bg-accent-secondary/30 hover:scale-105",
        outline: "border border-accent-primary bg-transparent text-accent-primary hover:depth-1 hover:scale-105",
        domain: "depth-1 border-l-2 border-l-accent-primary text-accent-primary font-bold hover:shadow-depth-2",
      },
      size: {
        sm: "px-2 py-0.5 text-[10px]",
        default: "px-3 py-1 text-xs",
        lg: "px-4 py-1.5 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

/**
 * @interface ChipProps
 * @description Props for Chip component extending HTML span attributes
 * 
 * Combines native span props with CVA variants and optional link functionality.
 * Provides flexibility for both static and interactive chip usage.
 * 
 * @extends {React.HTMLAttributes<HTMLSpanElement>} - Native span props
 * @extends {VariantProps<typeof chipVariants>} - CVA variant props
 * 
 * @property {string} [href] - Optional link URL
 * When provided, chip renders as anchor tag instead of span.
 * Can be internal (/path) or external (https://).
 * 
 * @property {boolean} [external=false] - Whether link opens in new tab
 * Adds target="_blank" and security attributes.
 * Shows external link icon when true.
 * 
 * @property {string} [variant] - Visual style variant
 * Options: 'default' | 'primary' | 'secondary' | 'outline' | 'domain'
 * 
 * @property {string} [size] - Size variant
 * Options: 'sm' | 'default' | 'lg'
 * 
 * @property {string} [className] - Additional CSS classes
 * Merged with variant classes using cn() utility.
 * 
 * @example
 * ```tsx
 * const props: ChipProps = {
 *   variant: 'primary',
 *   size: 'sm',
 *   href: '/tags/react',
 *   external: false,
 *   className: 'ml-2',
 *   onClick: handleClick
 * }
 * ```
 */
export interface ChipProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof chipVariants> {
  /** Optional link URL - renders as anchor when provided */
  href?: string
  /** Whether link opens in new tab - adds security attributes and icon */
  external?: boolean
}

/**
 * Chip component - Interactive tag with link support
 * 
 * Versatile tag component that can render as either a static label
 * or an interactive link. Supports multiple visual styles and sizes
 * with smooth hover animations.
 * 
 * @component
 * @param {ChipProps} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.variant='default'] - Style variant
 * @param {string} [props.size='default'] - Size variant
 * @param {string} [props.href] - Optional link URL
 * @param {boolean} [props.external] - External link flag
 * @param {React.ReactNode} props.children - Chip content
 * @param {React.Ref} ref - Forwarded ref for DOM access
 * 
 * @returns {JSX.Element} Styled chip element:
 * - <span> when no href provided (static)
 * - <a> when href provided (interactive)
 * - External icon when external=true
 * - Full hover and animation effects
 * 
 * @remarks
 * The component uses conditional rendering:
 * - With href: Renders as anchor with link behavior
 * - Without href: Renders as span for display only
 * - External links include security attributes
 * 
 * External links automatically receive:
 * - target="_blank" for new tab
 * - rel="noopener noreferrer" for security
 * - Visual icon indicator
 * 
 * @example
 * ```tsx
 * // Static tag
 * const Tag = () => (
 *   <Chip variant="secondary" size="sm">
 *     JavaScript
 *   </Chip>
 * )
 * 
 * // Interactive link
 * const CategoryLink = () => (
 *   <Chip 
 *     href="/categories/frontend"
 *     variant="outline"
 *   >
 *     Frontend
 *   </Chip>
 * )
 * 
 * // External link with icon
 * const ExternalResource = () => (
 *   <Chip
 *     href="https://docs.example.com"
 *     external
 *     variant="primary"
 *   >
 *     Documentation
 *   </Chip>
 * )
 * ```
 */
const Chip = React.forwardRef<HTMLSpanElement, ChipProps>(
  ({ className, variant, size, href, external, children, ...props }, ref) => {
    const chipClasses = cn(chipVariants({ variant, size, className }))
    
    if (href) {
      const linkProps = external 
        ? { target: "_blank", rel: "noopener noreferrer" } 
        : {}
      
      return (
        <a
          href={href}
          className={cn(chipClasses, "no-underline hover:no-underline cursor-pointer")}
          {...linkProps}
        >
          {children}
          {external && (
            <svg
              className="ml-1 h-3 w-3 inline-block"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          )}
        </a>
      )
    }
    
    return (
      <span
        ref={ref}
        className={chipClasses}
        {...props}
      >
        {children}
      </span>
    )
  }
)
Chip.displayName = "Chip"

export { Chip, chipVariants }