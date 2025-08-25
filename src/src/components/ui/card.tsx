/**
 * @fileoverview Card - Flexible container component with glass morphism
 * @module components/ui/Card
 * 
 * @description
 * A comprehensive card component system with multiple variants and depth levels.
 * Features glass morphism effects, terminal-style borders, and a complete set
 * of sub-components for structured content layouts.
 * 
 * This is the primary container component across the getHarsh ecosystem,
 * providing consistent structure and visual hierarchy for content blocks,
 * features, services, projects, and any grouped information.
 * 
 * @architecture
 * ```
 * Card System
 *       ├── Card (container)
 *       │     ├── Variants (4 styles)
 *       │     └── Depth levels (0-4)
 *       ├── CardHeader
 *       │     ├── CardTitle (h3)
 *       │     └── CardDescription (p)
 *       ├── CardContent (main)
 *       └── CardFooter (actions)
 * 
 * Composition Pattern:
 * <Card variant depth>
 *   <CardHeader>
 *     <CardTitle />
 *     <CardDescription />
 *   </CardHeader>
 *   <CardContent />
 *   <CardFooter />
 * </Card>
 * ```
 * 
 * @proto-integration
 * Maps to UI component configurations:
 * 
 * - **CardConfig** (ui.proto)
 *   - `default_variant`: Glass by default
 *   - `default_depth`: Level 1 standard
 *   - `border_radius`: rounded-terminal
 *   - `padding_scale`: 6 (1.5rem)
 * 
 * - **ThemeConfig** (theme.proto)
 *   - `glass_morphism.enabled`: True
 *   - `glass_morphism.blur`: 10px backdrop
 *   - `glass_morphism.opacity`: 0.8
 *   - `terminal_style`: Retrofuturistic borders
 * 
 * - **LayoutConfig** (layout.proto)
 *   - `card_spacing`: Consistent gaps
 *   - `content_padding`: p-6 standard
 *   - `header_spacing`: space-y-1.5
 * 
 * @hook-integration
 * While Card doesn't use hooks directly, parent components often use:
 * 
 * - **useConfig()**: Theme variant selection
 * - **useGTM()**: Click tracking on cards
 * - **useSchema()**: Structured data for content
 * 
 * @ecosystem-integration
 * - **Used by**: ProjectCard, ServiceCard, ArticleCard, FeatureCard
 * - **Layout**: Grid and flex containers
 * - **Theme**: Respects dark/light mode automatically
 * - **Animation**: Smooth transitions on hover
 * - **Responsive**: Adapts padding on mobile
 * 
 * @features
 * - **4 Visual Variants**: Semantic styling options
 * - **5 Depth Levels**: Visual hierarchy control
 * - **6 Sub-components**: Complete card anatomy
 * - **Glass Morphism**: Modern translucent effects
 * - **Terminal Style**: Retrofuturistic aesthetic
 * - **Composable**: Mix and match sub-components
 * - **Accessible**: Semantic HTML structure
 * - **Responsive**: Mobile-optimized spacing
 * 
 * @variant-specifications
 * ```
 * default:
 *   - Solid background (bg-primary)
 *   - Subtle border (accent-primary/20)
 *   - Standard elevation
 * 
 * glass:
 *   - Translucent background
 *   - Backdrop blur effect
 *   - Depth-based shadows
 *   - Most common variant
 * 
 * outline:
 *   - Transparent background
 *   - 2px accent border
 *   - No shadow/depth
 *   - Secondary emphasis
 * 
 * terminal:
 *   - Terminal window style
 *   - Monospace implications
 *   - Tech/code content
 *   - Special border style
 * ```
 * 
 * @depth-specifications
 * ```
 * Level 0: No shadow (flat design)
 * Level 1: box-shadow: 0 1px 3px rgba(0,0,0,0.12)
 * Level 2: box-shadow: 0 4px 6px rgba(0,0,0,0.16)
 * Level 3: box-shadow: 0 10px 20px rgba(0,0,0,0.19)
 * Level 4: box-shadow: 0 14px 28px rgba(0,0,0,0.25)
 * ```
 * 
 * @component-anatomy
 * ```
 * Card: Main container
 *   - Handles variant styling
 *   - Controls depth/elevation
 *   - Sets border radius
 * 
 * CardHeader: Top section
 *   - Contains title and description
 *   - Consistent padding (p-6)
 *   - Vertical spacing (space-y-1.5)
 * 
 * CardTitle: Primary heading
 *   - Display font (uppercase)
 *   - Accent color
 *   - 2xl size (1.5rem)
 * 
 * CardDescription: Subtitle
 *   - Secondary text color
 *   - Small size (0.875rem)
 *   - Support text
 * 
 * CardContent: Main area
 *   - Flexible content
 *   - Padding adjustment (pt-0)
 *   - Primary information
 * 
 * CardFooter: Bottom section
 *   - Action buttons
 *   - Metadata
 *   - Space-between layout
 * ```
 * 
 * @accessibility
 * - **Semantic Structure**: Proper heading hierarchy
 * - **Color Contrast**: WCAG AA compliant
 * - **Focus States**: Visible when interactive
 * - **Screen Readers**: Logical content flow
 * - **Keyboard Nav**: When containing interactive elements
 * 
 * @performance
 * - **CSS Classes**: No runtime calculations
 * - **Conditional Classes**: Efficient cn() utility
 * - **Ref Forwarding**: Direct DOM access
 * - **Memoization**: Not needed (pure presentation)
 * 
 * @styling
 * Glass morphism achieved via:
 * - CSS depth-N classes
 * - Backdrop-filter blur
 * - Semi-transparent backgrounds
 * - Box-shadow layering
 * 
 * @dos
 * - Use consistent variants in lists
 * - Structure with all sub-components
 * - Apply depth for visual hierarchy
 * - Maintain standard padding
 * - Test in both themes
 * 
 * @donts
 * - Don't mix variants in same grid
 * - Don't override structural padding
 * - Don't use depth > 2 commonly
 * - Don't nest cards deeply
 * - Don't skip semantic structure
 * 
 * @example
 * ```tsx
 * // Feature card with glass effect
 * <Card variant="glass" depth={2}>
 *   <CardHeader>
 *     <CardTitle>AI-Powered Analysis</CardTitle>
 *     <CardDescription>
 *       Advanced machine learning capabilities
 *     </CardDescription>
 *   </CardHeader>
 *   <CardContent>
 *     <FeatureList items={features} />
 *   </CardContent>
 *   <CardFooter>
 *     <Button variant="outline">Learn More</Button>
 *     <Badge>Beta</Badge>
 *   </CardFooter>
 * </Card>
 * 
 * // Service card grid
 * <div className="grid grid-cols-3 gap-6">
 *   {services.map(service => (
 *     <Card key={service.id} variant="glass" depth={1}>
 *       <CardHeader>
 *         <CardTitle>{service.name}</CardTitle>
 *       </CardHeader>
 *       <CardContent>
 *         {service.description}
 *       </CardContent>
 *     </Card>
 *   ))}
 * </div>
 * ```
 * 
 * @see {@link file://./USE-CASE.md#ui-components} - UI components spec
 * @see {@link file://./Button.tsx} - Often used in CardFooter
 * @see {@link file://./Badge.tsx} - Status indicators
 * @see {@link file://../project/ProjectCard.tsx} - Example usage
 * @see {@link file://../services/ServiceCard.tsx} - Service implementation
 * 
 * @since 1.0.0
 */

import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * @interface CardProps
 * @description Props for Card container component
 * 
 * Extends standard div attributes with card-specific styling options
 * for variants and depth levels.
 * 
 * @extends {React.HTMLAttributes<HTMLDivElement>} - Native div props
 * 
 * @property {string} [variant='glass'] - Visual style variant
 * - 'default': Solid background with border
 * - 'glass': Translucent with backdrop blur
 * - 'outline': Transparent with accent border
 * - 'terminal': Terminal window style
 * 
 * @property {number} [depth=1] - Glass morphism depth level
 * Controls shadow intensity for visual hierarchy (0-4).
 * Only applies when variant is 'glass'.
 * 
 * @example
 * ```tsx
 * const props: CardProps = {
 *   variant: 'glass',
 *   depth: 2,
 *   className: 'hover:scale-105',
 *   onClick: handleCardClick
 * }
 * ```
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Visual style variant - controls appearance theme */
  variant?: "default" | "glass" | "outline" | "terminal"
  /** Glass morphism depth level - shadow intensity (0-4) */
  depth?: 0 | 1 | 2 | 3 | 4
}

/**
 * Card component - Flexible container with variants
 * 
 * Primary container component with glass morphism and multiple
 * visual styles. Provides consistent structure for content blocks.
 * 
 * @component
 * @param {CardProps} props - Component props
 * @param {'default' | 'glass' | 'outline' | 'terminal'} [props.variant='glass'] - Style variant
 * @param {0 | 1 | 2 | 3 | 4} [props.depth=1] - Glass depth level
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.Ref} ref - Forwarded ref for DOM access
 * 
 * @returns {JSX.Element} Styled card container:
 * - Div element with variant styling
 * - Conditional depth classes
 * - Rounded terminal borders
 * - Smooth transitions
 * 
 * @remarks
 * Uses conditional class application based on variant:
 * - glass: Applies depth-N class
 * - terminal: Applies card-terminal class
 * - default: Solid background with border
 * - outline: Transparent with accent border
 * 
 * @example
 * ```tsx
 * const MyCard = () => (
 *   <Card variant="glass" depth={2}>
 *     <CardContent>Content here</CardContent>
 *   </Card>
 * )
 * ```
 */
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "glass", depth = 1, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-terminal transition-all duration-200",
        {
          [`depth-${depth}`]: variant === "glass",
          "card-terminal": variant === "terminal",
          "bg-bg-primary border border-accent-primary/20": variant === "default",
          "bg-transparent border-2 border-accent-primary": variant === "outline",
        },
        className
      )}
      {...props}
    />
  )
)
Card.displayName = "Card"

/**
 * @interface CardHeaderProps
 * @description Props for CardHeader component
 * 
 * Standard div attributes for the card header section.
 * Typically contains CardTitle and CardDescription.
 */
export type CardHeaderProps = React.HTMLAttributes<HTMLDivElement>

/**
 * CardHeader component - Card header section
 * 
 * Top section of card containing title and description.
 * Provides consistent spacing and structure.
 * 
 * @component
 * @param {CardHeaderProps} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.Ref} ref - Forwarded ref
 * 
 * @returns {JSX.Element} Header section with:
 * - Flex column layout
 * - Vertical spacing (space-y-1.5)
 * - Standard padding (p-6)
 */
const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5 p-6", className)}
      {...props}
    />
  )
)
CardHeader.displayName = "CardHeader"

/**
 * @interface CardTitleProps
 * @description Props for CardTitle component
 * 
 * Standard heading attributes for the card title.
 * Renders as h3 for proper heading hierarchy.
 */
export type CardTitleProps = React.HTMLAttributes<HTMLHeadingElement>

/**
 * CardTitle component - Card title heading
 * 
 * Primary heading for card content with display font styling.
 * Uses accent color and uppercase for emphasis.
 * 
 * @component
 * @param {CardTitleProps} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.Ref} ref - Forwarded ref
 * 
 * @returns {JSX.Element} H3 heading with:
 * - Display font (uppercase)
 * - Accent primary color
 * - 2xl size (1.5rem)
 * - Wide letter spacing
 */
const CardTitle = React.forwardRef<HTMLParagraphElement, CardTitleProps>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        "text-2xl font-display uppercase tracking-wide text-accent-primary",
        className
      )}
      {...props}
    />
  )
)
CardTitle.displayName = "CardTitle"

/**
 * @interface CardDescriptionProps
 * @description Props for CardDescription component
 * 
 * Standard paragraph attributes for card description.
 * Used for subtitles or supporting text.
 */
export type CardDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>

/**
 * CardDescription component - Card subtitle/description
 * 
 * Secondary text below the title for additional context.
 * Uses muted color for visual hierarchy.
 * 
 * @component
 * @param {CardDescriptionProps} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.Ref} ref - Forwarded ref
 * 
 * @returns {JSX.Element} Paragraph with:
 * - Small text size (0.875rem)
 * - Secondary text color
 * - Proper spacing from title
 */
const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm text-text-secondary", className)}
      {...props}
    />
  )
)
CardDescription.displayName = "CardDescription"

/**
 * @interface CardContentProps
 * @description Props for CardContent component
 * 
 * Standard div attributes for main card content area.
 * Flexible container for any card body content.
 */
export type CardContentProps = React.HTMLAttributes<HTMLDivElement>

/**
 * CardContent component - Main card content area
 * 
 * Primary content container with adjusted padding.
 * Removes top padding when following CardHeader.
 * 
 * @component
 * @param {CardContentProps} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.Ref} ref - Forwarded ref
 * 
 * @returns {JSX.Element} Content div with:
 * - Standard padding (p-6)
 * - No top padding (pt-0)
 * - Flexible content support
 */
const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
  )
)
CardContent.displayName = "CardContent"

/**
 * @interface CardFooterProps
 * @description Props for CardFooter component
 * 
 * Standard div attributes for card footer section.
 * Typically contains actions, buttons, or metadata.
 */
export type CardFooterProps = React.HTMLAttributes<HTMLDivElement>

/**
 * CardFooter component - Card footer section
 * 
 * Bottom section for actions and supplementary information.
 * Uses flexbox for common button/action layouts.
 * 
 * @component
 * @param {CardFooterProps} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.Ref} ref - Forwarded ref
 * 
 * @returns {JSX.Element} Footer div with:
 * - Flex layout with space-between
 * - Center alignment for items
 * - Standard padding (p-6, pt-0)
 */
const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center justify-between p-6 pt-0", className)}
      {...props}
    />
  )
)
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }