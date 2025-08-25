/**
 * @fileoverview ThemeToggleRadix - Accessible theme switcher with Radix UI
 * @module components/ui/ThemeToggleRadix
 * 
 * @description
 * An enhanced theme toggle component built with Radix UI Switch for superior
 * accessibility. Features proper ARIA states, keyboard navigation, and screen
 * reader support while maintaining the same theme switching functionality.
 * 
 * Key features:
 * - Radix UI Switch integration
 * - Full keyboard accessibility
 * - ARIA states and roles
 * - Screen reader support
 * - Sun/Moon icon indicators
 * - localStorage persistence
 * - System preference detection
 * 
 * @ecosystem-integration
 * - Used by: Navigation, settings (when accessibility priority)
 * - Data flow: Theme state → Radix Switch → localStorage
 * - Component: Radix UI Switch primitive
 * - Icons: Lucide React sun/moon
 * 
 * @configuration
 * - Storage: 'theme' in localStorage
 * - Document: data-theme attribute
 * - Default: System preference or light
 * - Switch: Radix UI Switch component
 * 
 * @accessibility-features
 * - Keyboard: Space/Enter to toggle
 * - ARIA: role="switch", aria-checked
 * - Focus: Visible focus ring
 * - Labels: aria-label for context
 * - State: Announces on/off to screen readers
 * 
 * @radix-integration
 * - Switch.Root: Container component
 * - Switch.Thumb: Moving toggle indicator
 * - Checked state: Maps to dark theme
 * - Styling: Tailwind classes
 * 
 * @visual-design
 * - Icons: Sun and moon indicators
 * - Colors: Theme-aware backgrounds
 * - Transition: Smooth thumb movement
 * - Focus ring: Accent color
 * 
 * @dos
 * - DO: Use when accessibility is critical
 * - DO: Include icon indicators
 * - DO: Maintain focus visibility
 * - DO: Test with screen readers
 * 
 * @donts
 * - DON'T: Hide focus indicators
 * - DON'T: Remove ARIA labels
 * - DON'T: Override Radix behaviors
 * - DON'T: Forget icon context
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <ThemeToggleRadix />
 * 
 * // With custom class
 * <ThemeToggleRadix className="mt-4" />
 * 
 * // In accessible settings
 * <AccessibleSettings>
 *   <label htmlFor="theme-toggle">
 *     Theme Preference
 *   </label>
 *   <ThemeToggleRadix />
 * </AccessibleSettings>
 * 
 * // With description
 * <div>
 *   <ThemeToggleRadix />
 *   <p className="text-sm mt-2">
 *     Toggle between light and dark themes
 *   </p>
 * </div>
 * ```
 * 
 * @comparison-with-basic
 * - ThemeToggle: Custom button implementation
 * - ThemeToggleRadix: Full accessibility support
 * - Use Radix version for: Forms, settings, a11y priority
 * - Use basic version for: Quick prototypes, minimal UI
 * 
 * @see {@link ../../../USE-CASE.md#accessibility} - Accessibility requirements
 * @see {@link ./ThemeToggle.tsx} - Basic theme toggle
 * @see {@link https://www.radix-ui.com/docs/primitives/components/switch} - Radix Switch docs
 * 
 * @since 1.0.0
 */

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Sun, Moon } from 'lucide-react'

import { Switch } from 'radix-ui'

/**
 * @interface ThemeToggleProps
 * @description Props for ThemeToggleRadix component
 */
interface ThemeToggleProps {
  /** Additional CSS classes */
  className?: string
}

/**
 * ThemeToggleRadix component - Accessible theme switcher
 * 
 * @param {ThemeToggleProps} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element} Accessible theme toggle with Radix Switch
 * 
 * @accessibility
 * - Keyboard: Space/Enter toggles theme
 * - Screen reader: Announces "Toggle theme" and state
 * - Focus: Visible ring on keyboard navigation
 * - ARIA: Proper switch role and checked state
 */
export const ThemeToggleRadix: React.FC<ThemeToggleProps> = ({ className }) => {
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light')

  React.useEffect(() => {
    // Check for saved theme preference or default to system preference
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light')
    
    setTheme(initialTheme)
    document.documentElement.setAttribute('data-theme', initialTheme)
  }, [])

  const handleThemeChange = (checked: boolean) => {
    const newTheme = checked ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Sun className="w-4 h-4 text-text-secondary" />
      <Switch.Root
        checked={theme === 'dark'}
        onCheckedChange={handleThemeChange}
        className={cn(
          'relative inline-flex h-6 w-11 items-center rounded-full',
          'bg-bg-tertiary data-[state=checked]:bg-accent-primary',
          'transition-colors duration-base',
          'focus:outline-none focus:ring-2 focus:ring-accent-primary/50'
        )}
        aria-label="Toggle theme"
      >
        <Switch.Thumb
          className={cn(
            'inline-block h-4 w-4 rounded-full bg-white',
            'transition-transform duration-base',
            'translate-x-1 data-[state=checked]:translate-x-6',
            'shadow-sm'
          )}
        />
      </Switch.Root>
      <Moon className="w-4 h-4 text-text-secondary" />
    </div>
  )
}

export default ThemeToggleRadix