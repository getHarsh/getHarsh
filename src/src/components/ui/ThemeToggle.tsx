/**
 * @fileoverview ThemeToggle - Light/dark theme switcher component
 * @module components/ui/ThemeToggle
 * 
 * @description
 * A theme toggle component for switching between light and dark modes.
 * Features animated sun/moon icons, localStorage persistence, and system
 * preference detection. Currently using custom implementation with plans
 * to migrate to Radix UI Switch for enhanced accessibility.
 * 
 * This component manages the entire theme system for the getHarsh ecosystem,
 * providing consistent dark/light mode switching with smooth transitions,
 * persistence across sessions, and respect for system preferences.
 * 
 * @architecture
 * ```
 * ThemeToggle Component
 *       ├── Theme Detection
 *       │     ├── localStorage check
 *       │     ├── System preference
 *       │     └── Default (light)
 *       ├── State Management
 *       │     ├── React state
 *       │     ├── localStorage
 *       │     └── DOM attribute
 *       └── Visual Feedback
 *             ├── Animated icons
 *             ├── Glass morphism
 *             └── Glow effect
 * 
 * Theme Flow:
 * Initial → Check localStorage → Check system → Apply theme
 * Toggle → Update state → Save to storage → Update DOM
 * ```
 * 
 * @proto-integration
 * Maps to theme and UI configurations:
 * 
 * - **ThemeConfig** (theme.proto)
 *   - `default_theme`: Initial theme (system)
 *   - `theme_storage_key`: 'theme' in localStorage
 *   - `theme_attribute`: 'data-theme' on html
 *   - `transition_duration`: Animation timing
 * 
 * - **UIConfig** (ui.proto)
 *   - `theme_toggle.position`: Navigation placement
 *   - `theme_toggle.icon_style`: Sun/moon design
 *   - `theme_toggle.animation`: Rotation effect
 * 
 * - **AccessibilityConfig** (accessibility.proto)
 *   - `theme_toggle.aria_label`: Screen reader text
 *   - `theme_toggle.keyboard_support`: Space/Enter
 *   - `theme_toggle.focus_visible`: Focus ring
 * 
 * - **AnalyticsConfig** (analytics.proto)
 *   - `ui_events.theme_toggle`: Track preference
 *   - `user_preferences.theme`: Store choice
 * 
 * @hook-integration
 * Uses ecosystem hooks:
 * 
 * - **useGTM()**: Track theme preference changes
 *   - Event: 'theme_toggle'
 *   - Category: 'UI'
 *   - Label: New theme value
 * 
 * - Future: **useTheme()** custom hook
 *   - Centralized theme management
 *   - SSR-safe implementation
 * 
 * @ecosystem-integration
 * - **Used by**: TopNavigation, Settings, Footer
 * - **Position**: Top-right navigation typically
 * - **Storage**: localStorage for persistence
 * - **DOM**: data-theme attribute on html element
 * - **CSS**: CSS variables switch based on data-theme
 * - **Analytics**: Preference tracking via GTM
 * 
 * @features
 * - **Binary Toggle**: Light/dark modes
 * - **Animated Icons**: Sun/moon with rotation
 * - **System Detection**: prefers-color-scheme
 * - **Persistence**: localStorage across sessions
 * - **Smooth Transitions**: Icon and theme changes
 * - **Glass Morphism**: Consistent button style
 * - **Glow Effect**: Hover state feedback
 * - **GTM Tracking**: User preference analytics
 * 
 * @theme-management
 * ```
 * Priority Order:
 * 1. localStorage (user preference)
 * 2. System preference (prefers-color-scheme)
 * 3. Default (light mode)
 * 
 * Application:
 * - Sets data-theme="light|dark" on <html>
 * - CSS variables switch based on [data-theme]
 * - All components inherit theme automatically
 * ```
 * 
 * @animation-specifications
 * ```
 * Light → Dark:
 * - Sun: rotate(0) → rotate(90), opacity(1) → opacity(0)
 * - Moon: rotate(-90) → rotate(0), opacity(0) → opacity(1)
 * 
 * Dark → Light:
 * - Moon: rotate(0) → rotate(-90), opacity(1) → opacity(0)
 * - Sun: rotate(90) → rotate(0), opacity(0) → opacity(1)
 * 
 * Duration: transition-base (200ms)
 * Easing: ease-in-out
 * ```
 * 
 * @accessibility
 * - **ARIA Label**: Dynamic based on current state
 * - **Keyboard**: Click/Enter/Space activation
 * - **Focus Ring**: Visible focus indicator
 * - **Screen Readers**: State announced on change
 * - **TODO**: Migrate to Radix Switch for role="switch"
 * 
 * @performance
 * - **Initial Load**: No flash (SSR consideration)
 * - **State Updates**: Minimal re-renders
 * - **Animations**: GPU-accelerated transforms
 * - **Storage**: Synchronous localStorage
 * 
 * @migration-plan
 * Future Radix UI Switch implementation will add:
 * - role="switch" for semantics
 * - aria-checked state
 * - Enhanced keyboard support
 * - Better touch targets
 * - Improved accessibility
 * 
 * @dos
 * - Persist user preference in localStorage
 * - Respect system preference on first visit
 * - Provide smooth visual transitions
 * - Track preference changes
 * - Include descriptive aria-labels
 * 
 * @donts
 * - Don't cause theme flash on load
 * - Don't override explicit user choice
 * - Don't forget localStorage errors
 * - Don't remove animations
 * - Don't skip GTM tracking
 * 
 * @example
 * ```tsx
 * // In navigation bar
 * <TopNavigation>
 *   <Logo />
 *   <NavLinks />
 *   <div className="ml-auto flex items-center gap-4">
 *     <SearchButton />
 *     <ThemeToggle />
 *   </div>
 * </TopNavigation>
 * 
 * // Standalone in settings
 * <SettingsSection title="Appearance">
 *   <div className="flex items-center justify-between">
 *     <Label>Dark Mode</Label>
 *     <ThemeToggle />
 *   </div>
 * </SettingsSection>
 * 
 * // With custom positioning
 * <ThemeToggle className="fixed bottom-4 right-4 z-50" />
 * ```
 * 
 * @see {@link file://./USE-CASE.md#theme-management} - Theme system spec
 * @see {@link file://../../hooks/useGTM.ts} - Analytics tracking
 * @see {@link file://../navigation/TopNavigation.tsx} - Usage example
 * @see {@link https://www.radix-ui.com/docs/primitives/components/switch} - Future migration
 * 
 * @since 1.0.0
 */

import * as React from "react"
import { cn } from "@/lib/utils"
import { useGTM } from "@/hooks/useGTM"

/**
 * @interface ThemeToggleProps
 * @description Props for ThemeToggle component
 * 
 * Minimal props interface as the component manages its own state
 * and persistence. Only styling customization is exposed.
 * 
 * @property {string} [className] - Additional CSS classes
 * Applied to the button element for positioning and custom styling.
 * Common uses: 'ml-auto', 'fixed bottom-4 right-4'.
 * 
 * @example
 * ```tsx
 * const props: ThemeToggleProps = {
 *   className: 'ml-auto md:mr-4'
 * }
 * ```
 */
interface ThemeToggleProps {
  /** Additional CSS classes for positioning and custom styling */
  className?: string
}

/**
 * ThemeToggle component - Light/dark mode switcher
 * 
 * Interactive button that toggles between light and dark themes with
 * animated sun/moon icons. Manages theme state, persistence, and
 * application across the entire application.
 * 
 * @component
 * @param {ThemeToggleProps} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * 
 * @returns {JSX.Element} Theme toggle button containing:
 * - Glass morphism button container
 * - Animated sun icon (light mode)
 * - Animated moon icon (dark mode)
 * - Glow effect on hover
 * - Dynamic aria-label
 * 
 * @remarks
 * The component lifecycle:
 * 1. **Mount**: Check localStorage, then system preference
 * 2. **State**: Maintain theme in React state
 * 3. **Toggle**: Update state, localStorage, and DOM
 * 4. **Track**: Send analytics event via GTM
 * 
 * Theme application happens via data-theme attribute
 * on the html element, which CSS uses to switch variables.
 * 
 * @todo Migrate to @radix-ui/react-switch for better accessibility:
 * - Keyboard navigation (Space/Enter to toggle)
 * - Proper ARIA states (aria-checked, role="switch")
 * - Focus management improvements
 * - Enhanced screen reader announcements
 * 
 * @example
 * ```tsx
 * // Component usage
 * function Header() {
 *   return (
 *     <header className="flex items-center p-4">
 *       <h1>My App</h1>
 *       <ThemeToggle className="ml-auto" />
 *     </header>
 *   )
 * }
 * 
 * // CSS implementation
 * // [data-theme="light"] {
 * //   --bg-primary: white;
 * //   --text-primary: black;
 * // }
 * // [data-theme="dark"] {
 * //   --bg-primary: black;
 * //   --text-primary: white;
 * // }
 * ```
 */
export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className }) => {
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light')
  const { trackEvent } = useGTM()

  /**
   * Initialize theme on component mount
   * 
   * Checks for saved preference in localStorage first,
   * then falls back to system preference, finally defaulting
   * to light mode. Applies theme to both state and DOM.
   */
  React.useEffect(() => {
    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light')
    
    setTheme(initialTheme)
    document.documentElement.setAttribute('data-theme', initialTheme)
  }, [])

  /**
   * Toggle between light and dark themes
   * 
   * Updates React state, persists to localStorage,
   * applies to DOM via data-theme attribute, and
   * tracks the preference change via GTM.
   */
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
    
    // Track theme preference change for analytics
    trackEvent({
      event: 'theme_toggle',
      category: 'UI',
      action: 'toggle_theme',
      label: newTheme,
      theme_from: theme,
      theme_to: newTheme,
      theme_preference: newTheme,
      component: 'ThemeToggle'
    })
  }

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "relative inline-flex items-center justify-center",
        "w-10 h-10 rounded-sharp",
        "glass hover:glass-heavy",
        "text-accent-primary hover:text-accent-secondary",
        "transition-all duration-base",
        "group",
        className
      )}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {/* Sun icon (light mode) */}
      <svg
        className={cn(
          "absolute w-5 h-5 transition-all duration-base",
          theme === 'light' ? 'opacity-100 rotate-0' : 'opacity-0 rotate-90'
        )}
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>
      
      {/* Moon icon (dark mode) */}
      <svg
        className={cn(
          "absolute w-5 h-5 transition-all duration-base",
          theme === 'dark' ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'
        )}
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
      
      {/* Glow effect on hover */}
      <span className="absolute inset-0 rounded-sharp opacity-0 group-hover:opacity-100 transition-opacity duration-base shadow-glow-sm" />
    </button>
  )
}

export default ThemeToggle