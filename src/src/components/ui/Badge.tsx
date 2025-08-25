/**
 * @fileoverview Badge - Semantic label component with variant styles
 * @module components/ui/Badge
 * 
 * @description
 * A flexible badge component for displaying labels, tags, and status indicators.
 * Built with class-variance-authority for consistent variant management and
 * retrofuturistic design patterns.
 * 
 * This component provides semantic status indicators throughout the getHarsh
 * ecosystem, from feature flags to version labels, status indicators to
 * category tags. Smaller and more subtle than Chip components.
 * 
 * @architecture
 * ```
 * Badge Component
 *       ├── CVA Variants
 *       │     ├── Style Variants (5 types)
 *       │     └── Fixed Size (small)
 *       ├── Focus Management
 *       │     ├── Ring on focus
 *       │     └── Offset for visibility
 *       └── Hover States
 *             └── 80% opacity on hover
 * 
 * Rendering:
 * props → CVA(variant) → cn(className) → <div>
 * ```
 * 
 * @proto-integration
 * Maps to UI and content configurations:
 * 
 * - **BadgeConfig** (ui.proto)
 *   - `default_variant`: Standard style
 *   - `pill_shape`: rounded-full
 *   - `fixed_size`: px-2.5 py-0.5
 *   - `focus_ring_width`: 2px
 * 
 * - **StatusConfig** (content.proto)
 *   - `status_badges`: Badge variant mappings
 *   - `version_display`: Version badge style
 *   - `feature_flags`: Feature badge indicators
 * 
 * - **ThemeConfig** (theme.proto)
 *   - `badge_colors`: Variant color mappings
 *   - `hover_opacity`: 0.8 (80%)
 *   - `focus_ring_color`: ring color
 * 
 * - **AccessibilityConfig** (accessibility.proto)
 *   - `focus_visible`: Ring visibility
 *   - `focus_offset`: 2px offset
 *   - `semantic_colors`: Meaning through color
 * 
 * @hook-integration
 * While Badge doesn't use hooks directly, parent components often use:
 * 
 * - **useConfig()**: Theme variant selection
 * - **useAccessibility()**: ARIA labels for status
 * - **useGTM()**: Track badge interactions
 * 
 * @ecosystem-integration
 * - **Used by**: ProjectCard, ServiceCard, ArticleHeader, LatestArticle
 * - **Purpose**: Status indicators, version labels, feature flags
 * - **Position**: Inline with content, card headers, navigation
 * - **Theme**: Respects dark/light mode automatically
 * - **Semantics**: Color conveys meaning (red=error, green=success)
 * 
 * @features
 * - **5 Style Variants**: Semantic visual styles
 * - **Fixed Size**: Consistent small sizing
 * - **Pill Shape**: Rounded-full borders
 * - **Focus Ring**: Accessibility support
 * - **Hover States**: 80% opacity feedback
 * - **Semantic Colors**: Meaningful variants
 * - **Inline Display**: Flows with text
 * - **Lightweight**: Minimal visual weight
 * 
 * @variant-specifications
 * ```
 * default:
 *   - Primary background/text
 *   - General purpose labels
 *   - Neutral information
 * 
 * secondary:
 *   - Muted colors
 *   - Less important info
 *   - Version numbers
 * 
 * destructive:
 *   - Red/error colors
 *   - Warnings, deprecations
 *   - Critical status
 * 
 * outline:
 *   - Border only
 *   - Subtle emphasis
 *   - Draft/beta states
 * 
 * accent:
 *   - Brand accent colors
 *   - Featured/new items
 *   - Positive emphasis
 * ```
 * 
 * @size-specifications
 * Fixed size for consistency:
 * - Padding: px-2.5 py-0.5
 * - Text: text-xs (0.75rem)
 * - Height: ~20px
 * - Min-width: auto (content-based)
 * 
 * @focus-management
 * ```
 * Focus state:
 * - Ring: 2px width
 * - Color: ring variable
 * - Offset: 2px for visibility
 * - Outline: none (replaced by ring)
 * ```
 * 
 * @accessibility
 * - **Focus Ring**: Visible keyboard focus
 * - **Color Contrast**: WCAG AA compliant
 * - **Semantic HTML**: Div with role implications
 * - **Screen Readers**: Content is announced
 * - **Keyboard Nav**: Tab-able when interactive
 * 
 * @performance
 * - **CVA Caching**: Variant classes cached
 * - **Single Element**: No nested components
 * - **CSS Transitions**: GPU-accelerated
 * - **Minimal Reflows**: Fixed dimensions
 * 
 * @semantic-usage
 * ```
 * Status:
 * - <Badge variant="accent">NEW</Badge>
 * - <Badge variant="destructive">DEPRECATED</Badge>
 * - <Badge variant="outline">BETA</Badge>
 * 
 * Versions:
 * - <Badge variant="secondary">v2.0.1</Badge>
 * - <Badge variant="default">Latest</Badge>
 * 
 * Categories:
 * - <Badge>Frontend</Badge>
 * - <Badge variant="accent">Featured</Badge>
 * ```
 * 
 * @dos
 * - Use for short labels (1-2 words)
 * - Choose semantic variants for meaning
 * - Maintain consistent usage patterns
 * - Test focus states for accessibility
 * - Use sparingly for emphasis
 * 
 * @donts
 * - Don't use for long text or sentences
 * - Don't mix variants randomly
 * - Don't override the fixed size
 * - Don't remove focus indicators
 * - Don't use as buttons (use Button/Chip)
 * 
 * @example
 * ```tsx
 * // Status indicator in card header
 * <CardHeader>
 *   <div className="flex items-center gap-2">
 *     <CardTitle>Project Name</CardTitle>
 *     <Badge variant="accent">NEW</Badge>
 *   </div>
 * </CardHeader>
 * 
 * // Version badge
 * <div className="flex items-center gap-1">
 *   <span>Current version:</span>
 *   <Badge variant="secondary">v3.2.1</Badge>
 * </div>
 * 
 * // Feature flags
 * <div className="flex gap-2">
 *   <Badge variant="outline">Beta</Badge>
 *   <Badge variant="destructive">Deprecated</Badge>
 *   <Badge>Stable</Badge>
 * </div>
 * 
 * // Article metadata
 * <ArticleHeader>
 *   {article.featured && (
 *     <Badge variant="accent">Featured</Badge>
 *   )}
 *   {article.sponsored && (
 *     <Badge variant="secondary">Sponsored</Badge>
 *   )}
 * </ArticleHeader>
 * ```
 * 
 * @see {@link file://./USE-CASE.md#ui-components} - UI components spec
 * @see {@link file://./Chip.tsx} - Larger tag component
 * @see {@link file://./Button.tsx} - Interactive component
 * @see {@link file://../article/ArticleHeader.tsx} - Usage example
 * @see {@link https://cva.style/docs} - Class Variance Authority
 * 
 * @since 1.0.0
 */

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

/**
 * Badge variant configuration using CVA
 * 
 * Defines all style variants for the badge component with a fixed
 * small size. Uses Class Variance Authority for efficient variant
 * management with compile-time optimization and type safety.
 * 
 * Base classes include rounded-full for pill shape, focus management
 * for accessibility, and smooth color transitions on hover.
 * 
 * @const {cva} badgeVariants
 */
const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        accent:
          "border-transparent bg-accent-primary text-white hover:bg-accent-primary/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

/**
 * @interface BadgeProps
 * @description Props for Badge component extending HTML div attributes
 * 
 * Combines native div props with CVA variant options for flexible
 * badge creation with consistent styling.
 * 
 * @extends {React.HTMLAttributes<HTMLDivElement>} - Native div props
 * @extends {VariantProps<typeof badgeVariants>} - CVA variant props
 * 
 * @property {string} [variant] - Visual style variant
 * Options: 'default' | 'secondary' | 'destructive' | 'outline' | 'accent'
 * 
 * @property {string} [className] - Additional CSS classes
 * Merged with variant classes using cn() utility.
 * 
 * @example
 * ```tsx
 * const props: BadgeProps = {
 *   variant: 'accent',
 *   className: 'ml-2',
 *   onClick: handleBadgeClick,
 *   role: 'status',
 *   'aria-label': 'New feature'
 * }
 * ```
 */
export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

/**
 * Badge component - Semantic label with variants
 * 
 * Small, inline status indicator with semantic color variants.
 * Provides consistent labeling for statuses, versions, and categories
 * throughout the application.
 * 
 * @component
 * @param {BadgeProps} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * @param {'default' | 'secondary' | 'destructive' | 'outline' | 'accent'} [props.variant='default'] - Style variant
 * 
 * @returns {JSX.Element} Styled badge element:
 * - Div element with pill shape
 * - Fixed small size
 * - Semantic color variant
 * - Focus ring for accessibility
 * - Hover state feedback
 * 
 * @remarks
 * The component uses a fixed size to ensure consistency
 * across different contexts. The pill shape (rounded-full)
 * provides a modern, friendly appearance.
 * 
 * Focus management includes:
 * - 2px focus ring
 * - Ring offset for visibility
 * - Smooth color transitions
 * 
 * @example
 * ```tsx
 * // Simple status badge
 * const StatusBadge = () => (
 *   <Badge variant="accent">Active</Badge>
 * )
 * 
 * // Conditional rendering
 * const FeatureBadge = ({ isNew, isBeta }) => (
 *   <>
 *     {isNew && <Badge variant="accent">NEW</Badge>}
 *     {isBeta && <Badge variant="outline">BETA</Badge>}
 *   </>
 * )
 * 
 * // With custom styling
 * const VersionBadge = ({ version }) => (
 *   <Badge 
 *     variant="secondary"
 *     className="font-mono"
 *   >
 *     v{version}
 *   </Badge>
 * )
 * ```
 */
function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }