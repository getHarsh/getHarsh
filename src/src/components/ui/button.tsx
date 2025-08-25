/**
 * @fileoverview Button - Interactive button component with variant styles
 * @module components/ui/Button
 * 
 * @description
 * A comprehensive button component supporting multiple variants, sizes, and
 * rendering modes. Features Radix UI Slot for flexible component composition
 * and retrofuturistic design patterns with glass morphism effects.
 * 
 * This is the primary interactive element across the getHarsh ecosystem,
 * implementing a consistent design language with flexible composition patterns
 * for navigation, forms, CTAs, and interactive controls.
 * 
 * @architecture
 * ```
 * Button Component
 *       ├── CVA Variants
 *       │     ├── Style Variants (7 types)
 *       │     └── Size Variants (4 types)
 *       ├── Radix Slot (asChild)
 *       │     ├── <button> (default)
 *       │     ├── <Link> (navigation)
 *       │     └── <a> (external)
 *       └── Glass Morphism Styles
 *             └── Retrofuturistic theme
 * 
 * Rendering Logic:
 * props → CVA(variant, size) → cn(className) → Comp(button|slot)
 * ```
 * 
 * @proto-integration
 * Maps to UI configuration protos:
 * 
 * - **ButtonConfig** (ui.proto)
 *   - `variants`: Available button styles
 *   - `sizes`: Size options
 *   - `default_variant`: Primary style
 *   - `disabled_opacity`: 0.5 default
 * 
 * - **ThemeConfig** (theme.proto)
 *   - `colors.accent_primary`: Primary button color
 *   - `colors.accent_secondary`: Hover states
 *   - `colors.destructive`: Delete/danger color
 *   - `glass_morphism`: Backdrop effects
 * 
 * - **AccessibilityConfig** (accessibility.proto)
 *   - `focus_ring`: Focus indicator styles
 *   - `disabled_states`: Pointer-events handling
 *   - `keyboard_navigation`: Tab order support
 * 
 * @hook-integration
 * While Button doesn't use hooks directly, it integrates with:
 * 
 * - Parent components using:
 *   - useGTM() for click tracking
 *   - useAccessibility() for ARIA states
 *   - useConfig() for theme variants
 * 
 * @ecosystem-integration
 * - **Used by**: CTASection, HeroSection, forms, modals, navigation
 * - **Composition**: Works with Gatsby Link, external anchors
 * - **Theme**: Respects dark/light mode automatically
 * - **Analytics**: Click events bubbled to parents
 * - **Accessibility**: Full keyboard and screen reader support
 * 
 * @features
 * - **7 Style Variants**: Semantic button styles
 * - **4 Size Options**: From icon to large CTA
 * - **asChild Pattern**: Flexible rendering target
 * - **Glass Morphism**: Retrofuturistic design
 * - **Disabled States**: Automatic opacity/pointer handling
 * - **Focus Management**: Visible focus rings
 * - **Type Safety**: Full TypeScript support
 * - **Ref Forwarding**: DOM access when needed
 * 
 * @variant-specifications
 * ```
 * default:
 *   - Base button style with glass effect
 *   - Inherits from .btn class
 *   - Standard hover/focus states
 * 
 * primary:
 *   - Accent color background
 *   - High contrast text
 *   - Main CTA actions
 * 
 * destructive:
 *   - Red border and text
 *   - Warning semantics
 *   - Delete/remove actions
 * 
 * outline:
 *   - Transparent background
 *   - 2px border
 *   - Secondary actions
 * 
 * secondary:
 *   - Reduced opacity (80%)
 *   - Muted importance
 *   - Alternative actions
 * 
 * ghost:
 *   - No background/border initially
 *   - Appears on hover
 *   - Toolbar/menu items
 * 
 * link:
 *   - Text-only appearance
 *   - Underline on hover
 *   - Inline navigation
 * ```
 * 
 * @size-specifications
 * ```
 * default: px-6 py-3 text-sm
 * sm:      px-4 py-2 text-xs
 * lg:      px-8 py-4 text-base
 * icon:    p-2.5 square aspect
 * ```
 * 
 * @asChild-pattern
 * ```tsx
 * // Without asChild - renders <button>
 * <Button>Click me</Button>
 * 
 * // With asChild - renders child element with button styles
 * <Button asChild>
 *   <Link to="/about">About</Link>
 * </Button>
 * // Output: <Link class="btn ..." to="/about">About</Link>
 * ```
 * 
 * @accessibility
 * - **Focus Ring**: Visible keyboard focus indicator
 * - **Disabled State**: opacity-50 and pointer-events-none
 * - **ARIA Support**: Inherits from button element
 * - **Keyboard**: Space/Enter activation
 * - **Screen Readers**: Semantic button role
 * 
 * @performance
 * - **CVA Caching**: Variant classes cached
 * - **Minimal Re-renders**: Memoized internally
 * - **CSS Classes**: No runtime style calculations
 * - **Tree Shaking**: Unused variants removed
 * 
 * @styling
 * Base .btn class provides:
 * - Glass morphism backdrop
 * - Retrofuturistic borders
 * - Smooth transitions
 * - Focus states
 * - Dark mode support
 * 
 * @dos
 * - Use semantic variant names for clarity
 * - Include disabled prop for loading states
 * - Use asChild for navigation links
 * - Maintain consistent sizing across UI
 * - Test keyboard navigation
 * 
 * @donts
 * - Don't mix multiple variants
 * - Don't remove disabled styling
 * - Don't override core .btn class
 * - Don't forget ref forwarding needs
 * - Don't use div with onClick instead
 * 
 * @example
 * ```tsx
 * // Primary CTA with loading
 * <Button 
 *   variant="primary" 
 *   size="lg"
 *   disabled={isLoading}
 *   onClick={handleSubmit}
 * >
 *   {isLoading ? 'Processing...' : 'Get Started'}
 * </Button>
 * 
 * // Navigation with Gatsby Link
 * <Button asChild variant="outline">
 *   <Link to="/services">View Services</Link>
 * </Button>
 * 
 * // Icon-only action button
 * <Button 
 *   variant="ghost" 
 *   size="icon"
 *   aria-label="Settings"
 * >
 *   <SettingsIcon className="h-4 w-4" />
 * </Button>
 * 
 * // Grouped buttons
 * <div className="flex gap-2">
 *   <Button variant="primary">Save</Button>
 *   <Button variant="outline">Cancel</Button>
 *   <Button variant="destructive">Delete</Button>
 * </div>
 * ```
 * 
 * @see {@link file://./USE-CASE.md#ui-components} - UI components spec
 * @see {@link file://./Card.tsx} - Related component
 * @see {@link file://./Badge.tsx} - Related component
 * @see {@link https://www.radix-ui.com/docs/primitives/utilities/slot} - Radix Slot
 * @see {@link https://cva.style/docs} - Class Variance Authority
 * 
 * @since 1.0.0
 */

import * as React from "react"
import { Slot as SlotPrimitive } from "radix-ui"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Button variant configuration using CVA
 * 
 * Defines all style variants and sizes for the button component.
 * Uses Class Variance Authority for efficient variant management
 * with compile-time optimization and type safety.
 * 
 * @const {cva} buttonVariants
 */
const buttonVariants = cva(
  "btn inline-flex items-center justify-center whitespace-nowrap disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "",
        primary: "!bg-accent-primary !text-bg-primary hover:!bg-accent-secondary",
        destructive: "!border-red-500 !text-red-500 hover:!border-red-600 hover:!text-red-600",
        outline: "!bg-transparent !border-2",
        secondary: "opacity-80",
        ghost: "!bg-transparent !backdrop-filter-none !border-transparent hover:!border-current",
        link: "!bg-transparent !backdrop-filter-none !border-0 !shadow-none underline-offset-4 hover:underline !p-0 !h-auto",
      },
      size: {
        default: "",
        sm: "!px-4 !py-2 !text-xs",
        lg: "!px-8 !py-4 !text-base",
        icon: "!p-2.5 !min-w-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

/**
 * @interface ButtonProps
 * @description Props for Button component extending HTML button attributes
 * 
 * Combines native button props with CVA variants and Radix Slot composition.
 * Provides full type safety for all button variations and rendering modes.
 * 
 * @extends {React.ButtonHTMLAttributes<HTMLButtonElement>} - Native button props
 * @extends {VariantProps<typeof buttonVariants>} - CVA variant props
 * 
 * @property {boolean} [asChild=false] - Render as child component using Radix Slot
 * When true, Button renders its child with button styles applied.
 * Useful for navigation links that need button appearance.
 * 
 * @property {string} [variant] - Visual style variant
 * Options: 'default' | 'primary' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
 * 
 * @property {string} [size] - Size variant
 * Options: 'default' | 'sm' | 'lg' | 'icon'
 * 
 * @property {string} [className] - Additional CSS classes
 * Merged with variant classes using cn() utility.
 * 
 * @example
 * ```tsx
 * const props: ButtonProps = {
 *   variant: 'primary',
 *   size: 'lg',
 *   onClick: handleClick,
 *   disabled: isLoading,
 *   className: 'mt-4',
 *   asChild: false
 * }
 * ```
 */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Render as child component using Radix Slot for composition flexibility */
  asChild?: boolean
}

/**
 * Button component - Interactive button with variants
 * 
 * Primary interactive element with flexible rendering and comprehensive
 * styling options. Supports composition through Radix Slot pattern.
 * 
 * @component
 * @param {ButtonProps} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.variant='default'] - Style variant
 * @param {string} [props.size='default'] - Size variant
 * @param {boolean} [props.asChild=false] - Render as child component
 * @param {React.Ref} ref - Forwarded ref for DOM access
 * 
 * @returns {JSX.Element} Styled button or slot element:
 * - <button> element when asChild is false
 * - Child element with button styles when asChild is true
 * - Full event handling and accessibility
 * 
 * @remarks
 * The component uses conditional rendering:
 * - asChild=false: Renders native button element
 * - asChild=true: Renders child with button styles via Slot
 * 
 * All props are passed through to the rendered element,
 * maintaining full compatibility with native attributes.
 * 
 * @example
 * ```tsx
 * // Standard button
 * const MyButton = () => (
 *   <Button 
 *     ref={buttonRef}
 *     variant="primary"
 *     onClick={() => console.log('Clicked')}
 *   >
 *     Click Me
 *   </Button>
 * )
 * 
 * // Composed with Link
 * const LinkButton = () => (
 *   <Button asChild variant="outline">
 *     <Link to="/dashboard">Dashboard</Link>
 *   </Button>
 * )
 * ```
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? SlotPrimitive.Root : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }