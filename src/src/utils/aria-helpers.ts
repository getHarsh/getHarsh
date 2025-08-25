/**
 * @fileoverview ARIA Helper Utilities for Semantic HTML and Accessibility
 * @module utils/aria-helpers
 * 
 * @description
 * Pure utility functions for ARIA patterns and semantic HTML enhancement.
 * These helpers ensure proper accessibility implementation without relying
 * on React components or hooks. Each function is documented with its
 * WCAG criterion and rationale.
 * 
 * @principle
 * "The first rule of ARIA: Don't use ARIA unless you have to."
 * These utilities help determine when ARIA is necessary and implement
 * it correctly when it is.
 * 
 * @categories
 * 1. **Semantic HTML Validators**: Check if elements use proper semantics
 * 2. **ARIA Validators**: Ensure ARIA is used correctly
 * 3. **Focus Management**: Utilities for focus indicators and management
 * 4. **Screen Reader Utilities**: Helpers for screen reader announcements
 * 5. **Keyboard Navigation**: Utilities for keyboard interactions
 * 6. **Color Contrast**: Helpers for WCAG color contrast compliance
 * 
 * @wcag-coverage
 * These utilities help meet WCAG 2.1 Level AA criteria:
 * - 1.3.1 Info and Relationships (Level A)
 * - 1.4.3 Contrast (Minimum) (Level AA)
 * - 2.1.1 Keyboard (Level A)
 * - 2.4.3 Focus Order (Level A)
 * - 2.4.7 Focus Visible (Level AA)
 * - 3.3.2 Labels or Instructions (Level A)
 * - 4.1.2 Name, Role, Value (Level A)
 * 
 * @ecosystem-integration
 * - Used by: All components requiring accessibility features
 * - Dependencies: None (pure functions)
 * - Testing: Unit tests with jest
 * - Validation: axe-core for automated testing
 * - Components: All UI components use these utilities
 * - Search: Ensures search interface accessibility
 * - Navigation: Keyboard navigation patterns
 * 
 * @best-practices
 * - Always validate HTML semantics before adding ARIA
 * - Test with real assistive technologies
 * - Provide text alternatives for all non-text content
 * - Ensure all functionality is keyboard accessible
 * - Give users enough time to read and use content
 * 
 * @dos
 * - Use semantic HTML elements first (nav, header, main, etc.)
 * - Validate ARIA usage with validateARIA() before deployment
 * - Test with actual screen readers (NVDA, JAWS, VoiceOver)
 * - Ensure 4.5:1 contrast ratio for normal text (AA)
 * - Provide keyboard alternatives for all mouse interactions
 * - Use live regions for dynamic content updates
 * - Test tab order makes logical sense
 * 
 * @donts
 * - Don't use ARIA to fix bad HTML structure
 * - Don't hide focusable elements with aria-hidden="true"
 * - Don't use placeholder as a label replacement
 * - Don't remove focus indicators without alternatives
 * - Don't use aria-label when visible text exists
 * - Don't create keyboard traps
 * - Don't auto-focus without user expectation
 * 
 * @example
 * ```typescript
 * import { 
 *   isSemanticHTML, 
 *   validateARIA, 
 *   ensureFocusVisible,
 *   calculateContrastRatio,
 *   addKeyboardNavigation
 * } from '@/utils/aria-helpers'
 * 
 * // Check if element uses semantic HTML
 * if (!isSemanticHTML(element)) {
 *   console.warn('Consider using semantic HTML instead of ARIA')
 * }
 * 
 * // Validate ARIA usage
 * const errors = validateARIA(element)
 * if (errors.length > 0) {
 *   console.error('ARIA validation errors:', errors)
 * }
 * 
 * // Check color contrast
 * const ratio = calculateContrastRatio('#333333', '#ffffff')
 * if (!meetsContrastRequirements(ratio, 16, 'AA')) {
 *   console.warn('Insufficient color contrast')
 * }
 * 
 * // Add keyboard navigation
 * const menuItems = document.querySelectorAll('.menu-item')
 * addKeyboardNavigation(Array.from(menuItems), {
 *   orientation: 'vertical',
 *   wrap: true,
 *   onSelect: (item) => item.click()
 * })
 * ```
 * 
 * @see {@link file://./BUILD.md#accessibility} - Accessibility build configuration
 * @see {@link file://./README.md#wcag-compliance} - WCAG compliance documentation
 * @see {@link file://./src/hooks/useAccessibility.tsx} - React hook using these utilities
 * @see {@link file://./src/components/navigation/TopNavigation.tsx} - Navigation accessibility
 * @see {@link file://./src/components/search/SearchInterface.tsx} - Search accessibility
 * @see {@link https://www.w3.org/WAI/WCAG21/quickref/} - WCAG Quick Reference
 * @see {@link https://www.w3.org/WAI/ARIA/apg/} - ARIA Authoring Practices
 * @see {@link https://webaim.org/} - WebAIM accessibility resources
 * 
 * @since 2.0.0
 */

/**
 * Semantic HTML element mappings
 * Maps generic elements to their semantic equivalents
 */
const SEMANTIC_MAPPINGS: Record<string, string[]> = {
  navigation: ['nav'],
  header: ['header'],
  footer: ['footer'],
  main: ['main'],
  sidebar: ['aside'],
  article: ['article'],
  section: ['section'],
  list: ['ul', 'ol', 'dl'],
  button: ['button'],
  link: ['a'],
  heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
  form: ['form'],
  search: ['search'],
  figure: ['figure'],
  time: ['time']
}

/**
 * Valid ARIA roles
 * Based on WAI-ARIA 1.2 specification
 */
const VALID_ARIA_ROLES = [
  // Landmark roles
  'banner', 'complementary', 'contentinfo', 'form', 'main', 'navigation', 'region', 'search',
  // Widget roles
  'alert', 'alertdialog', 'button', 'checkbox', 'dialog', 'gridcell', 'link', 'log',
  'marquee', 'menuitem', 'menuitemcheckbox', 'menuitemradio', 'option', 'progressbar',
  'radio', 'scrollbar', 'searchbox', 'separator', 'slider', 'spinbutton', 'status',
  'switch', 'tab', 'tabpanel', 'textbox', 'timer', 'tooltip', 'treeitem',
  // Document structure roles
  'article', 'cell', 'columnheader', 'definition', 'directory', 'document', 'feed',
  'figure', 'group', 'heading', 'img', 'list', 'listitem', 'math', 'none', 'note',
  'presentation', 'row', 'rowgroup', 'rowheader', 'separator', 'table', 'term',
  // Abstract roles (should not be used directly)
  'command', 'composite', 'input', 'landmark', 'range', 'roletype', 'section',
  'sectionhead', 'select', 'structure', 'widget', 'window'
]

/**
 * WCAG color contrast ratios
 */
const CONTRAST_RATIOS = {
  AA_NORMAL: 4.5,
  AA_LARGE: 3,
  AAA_NORMAL: 7,
  AAA_LARGE: 4.5
}

/**
 * Check if an element uses semantic HTML
 * 
 * @param element - DOM element to check
 * @returns Whether the element uses semantic HTML appropriately
 * 
 * @wcag 1.3.1 Info and Relationships (Level A)
 */
export const isSemanticHTML = (element: HTMLElement): boolean => {
  const tagName = element.tagName.toLowerCase()
  
  // Check if it's already a semantic element
  const semanticTags = Object.values(SEMANTIC_MAPPINGS).flat()
  if (semanticTags.includes(tagName)) {
    return true
  }
  
  // Check if it's a div/span with a role that could be semantic HTML
  if (tagName === 'div' || tagName === 'span') {
    const role = element.getAttribute('role')
    if (role) {
      // Check if there's a semantic equivalent
      for (const [semanticRole, tags] of Object.entries(SEMANTIC_MAPPINGS)) {
        if (role === semanticRole || tags.includes(role)) {
          return false // Should use semantic HTML instead
        }
      }
    }
  }
  
  return true // Generic element without semantic alternative is fine
}

/**
 * Validate ARIA usage on an element
 * 
 * @param element - DOM element to validate
 * @returns Array of validation errors (empty if valid)
 * 
 * @wcag 4.1.2 Name, Role, Value (Level A)
 */
export const validateARIA = (element: HTMLElement): string[] => {
  const errors: string[] = []
  
  // Check role validity
  const role = element.getAttribute('role')
  if (role && !VALID_ARIA_ROLES.includes(role)) {
    errors.push(`Invalid ARIA role: ${role}`)
  }
  
  // Check for required aria-label or aria-labelledby
  if (role && ['button', 'link', 'textbox', 'checkbox', 'radio'].includes(role)) {
    const hasLabel = element.hasAttribute('aria-label') || 
                     element.hasAttribute('aria-labelledby') ||
                     element.textContent?.trim()
    if (!hasLabel) {
      errors.push(`Element with role="${role}" requires an accessible name`)
    }
  }
  
  // Check aria-hidden usage
  if (element.getAttribute('aria-hidden') === 'true') {
    // Check if it contains focusable elements
    const focusable = element.querySelectorAll(
      'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    if (focusable.length > 0) {
      errors.push('aria-hidden="true" should not contain focusable elements')
    }
  }
  
  // Check aria-live region usage
  const ariaLive = element.getAttribute('aria-live')
  if (ariaLive && !['polite', 'assertive', 'off'].includes(ariaLive)) {
    errors.push(`Invalid aria-live value: ${ariaLive}`)
  }
  
  // Check aria-expanded on appropriate elements
  if (element.hasAttribute('aria-expanded')) {
    const expandableRoles = ['button', 'combobox', 'link', 'menuitem', 'tab', 'treeitem']
    if (role && !expandableRoles.includes(role)) {
      errors.push(`aria-expanded is not valid on role="${role}"`)
    }
  }
  
  return errors
}

/**
 * Ensure element has focus visible styles
 * 
 * @param element - Element to check
 * @returns Whether element has proper focus styles
 * 
 * @wcag 2.4.7 Focus Visible (Level AA)
 */
export const ensureFocusVisible = (element: HTMLElement): boolean => {
  const styles = window.getComputedStyle(element)
  
  // Check for outline
  const hasOutline = styles.outlineStyle !== 'none' && 
                     styles.outlineWidth !== '0px'
  
  // Check for box-shadow (common alternative to outline)
  const hasBoxShadow = styles.boxShadow !== 'none'
  
  // Check for border changes
  const hasBorder = styles.borderStyle !== 'none' && 
                    styles.borderWidth !== '0px'
  
  return hasOutline || hasBoxShadow || hasBorder
}

/**
 * Calculate color contrast ratio
 * 
 * @param foreground - Foreground color (hex, rgb, or rgba)
 * @param background - Background color (hex, rgb, or rgba)
 * @returns Contrast ratio
 * 
 * @wcag 1.4.3 Contrast (Minimum) (Level AA)
 */
export const calculateContrastRatio = (foreground: string, background: string): number => {
  // Convert colors to RGB
  const getRGB = (color: string): [number, number, number] => {
    const hex = color.replace('#', '')
    if (hex.length === 3) {
      return [
        parseInt(hex[0] + hex[0], 16),
        parseInt(hex[1] + hex[1], 16),
        parseInt(hex[2] + hex[2], 16)
      ]
    }
    return [
      parseInt(hex.substr(0, 2), 16),
      parseInt(hex.substr(2, 2), 16),
      parseInt(hex.substr(4, 2), 16)
    ]
  }
  
  // Calculate relative luminance
  const getLuminance = (rgb: [number, number, number]): number => {
    const [r, g, b] = rgb.map(val => {
      val = val / 255
      return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4)
    })
    return 0.2126 * r + 0.7152 * g + 0.0722 * b
  }
  
  const l1 = getLuminance(getRGB(foreground))
  const l2 = getLuminance(getRGB(background))
  
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)
}

/**
 * Check if contrast ratio meets WCAG requirements
 * 
 * @param ratio - Contrast ratio
 * @param fontSize - Font size in pixels
 * @param level - WCAG level (AA or AAA)
 * @returns Whether contrast meets requirements
 */
export const meetsContrastRequirements = (
  ratio: number,
  fontSize: number,
  level: 'AA' | 'AAA' = 'AA'
): boolean => {
  const isLargeText = fontSize >= 18 || (fontSize >= 14 && fontSize < 18) // Bold 14px+ counts as large
  
  if (level === 'AA') {
    return ratio >= (isLargeText ? CONTRAST_RATIOS.AA_LARGE : CONTRAST_RATIOS.AA_NORMAL)
  } else {
    return ratio >= (isLargeText ? CONTRAST_RATIOS.AAA_LARGE : CONTRAST_RATIOS.AAA_NORMAL)
  }
}

/**
 * Get focusable elements within a container
 * 
 * @param container - Container element
 * @param includeDisabled - Include disabled elements
 * @returns Array of focusable elements
 * 
 * @wcag 2.1.1 Keyboard (Level A)
 */
export const getFocusableElements = (
  container: HTMLElement,
  includeDisabled = false
): HTMLElement[] => {
  const selector = includeDisabled
    ? 'a[href], button, input, select, textarea, [tabindex]'
    : 'a[href], button:not([disabled]), input:not([disabled]), ' +
      'select:not([disabled]), textarea:not([disabled]), ' +
      '[tabindex]:not([tabindex="-1"])'
  
  return Array.from(container.querySelectorAll<HTMLElement>(selector))
}

/**
 * Check if element is visible (not hidden from screen readers)
 * 
 * @param element - Element to check
 * @returns Whether element is visible to screen readers
 */
export const isScreenReaderVisible = (element: HTMLElement): boolean => {
  // Check aria-hidden
  if (element.getAttribute('aria-hidden') === 'true') {
    return false
  }
  
  // Check if any parent has aria-hidden
  let parent = element.parentElement
  while (parent) {
    if (parent.getAttribute('aria-hidden') === 'true') {
      return false
    }
    parent = parent.parentElement
  }
  
  // Check display and visibility
  const styles = window.getComputedStyle(element)
  if (styles.display === 'none' || styles.visibility === 'hidden') {
    return false
  }
  
  return true
}

/**
 * Create screen reader only text
 * 
 * @param text - Text content
 * @returns HTML string with sr-only class
 */
export const srOnly = (text: string): string => {
  return `<span class="sr-only">${text}</span>`
}

/**
 * Get text alternative for an element
 * 
 * @param element - Element to get text alternative for
 * @returns Text alternative or empty string
 * 
 * @wcag 1.1.1 Non-text Content (Level A)
 */
export const getTextAlternative = (element: HTMLElement): string => {
  // For images
  if (element instanceof HTMLImageElement) {
    return element.alt || element.getAttribute('aria-label') || ''
  }
  
  // For inputs
  if (element instanceof HTMLInputElement) {
    const label = element.labels?.[0]
    return label?.textContent || element.getAttribute('aria-label') || element.placeholder || ''
  }
  
  // For buttons and links
  if (element instanceof HTMLButtonElement || element instanceof HTMLAnchorElement) {
    return element.textContent || element.getAttribute('aria-label') || ''
  }
  
  // Generic elements
  return element.getAttribute('aria-label') || 
         element.getAttribute('title') || 
         element.textContent || ''
}

/**
 * Add keyboard navigation to a list of elements
 * 
 * @param elements - Elements to add navigation to
 * @param options - Navigation options
 * 
 * @wcag 2.1.1 Keyboard (Level A)
 */
export const addKeyboardNavigation = (
  elements: HTMLElement[],
  options: {
    orientation?: 'horizontal' | 'vertical' | 'both'
    wrap?: boolean
    onSelect?: (element: HTMLElement, index: number) => void
  } = {}
): void => {
  const { orientation = 'both', wrap = true, onSelect } = options
  
  elements.forEach((element, index) => {
    element.setAttribute('tabindex', index === 0 ? '0' : '-1')
    
    element.addEventListener('keydown', (e: KeyboardEvent) => {
      let nextIndex = index
      
      switch (e.key) {
        case 'ArrowUp':
          if (orientation === 'vertical' || orientation === 'both') {
            e.preventDefault()
            nextIndex = wrap ? (index - 1 + elements.length) % elements.length : Math.max(0, index - 1)
          }
          break
        case 'ArrowDown':
          if (orientation === 'vertical' || orientation === 'both') {
            e.preventDefault()
            nextIndex = wrap ? (index + 1) % elements.length : Math.min(elements.length - 1, index + 1)
          }
          break
        case 'ArrowLeft':
          if (orientation === 'horizontal' || orientation === 'both') {
            e.preventDefault()
            nextIndex = wrap ? (index - 1 + elements.length) % elements.length : Math.max(0, index - 1)
          }
          break
        case 'ArrowRight':
          if (orientation === 'horizontal' || orientation === 'both') {
            e.preventDefault()
            nextIndex = wrap ? (index + 1) % elements.length : Math.min(elements.length - 1, index + 1)
          }
          break
        case 'Home':
          e.preventDefault()
          nextIndex = 0
          break
        case 'End':
          e.preventDefault()
          nextIndex = elements.length - 1
          break
        case 'Enter':
        case ' ':
          e.preventDefault()
          onSelect?.(element, index)
          return
      }
      
      if (nextIndex !== index) {
        elements[index].setAttribute('tabindex', '-1')
        elements[nextIndex].setAttribute('tabindex', '0')
        elements[nextIndex].focus()
      }
    })
  })
}

/**
 * Debounce function for reducing announcement frequency
 * 
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds
 * @returns Debounced function
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Format time for screen readers
 * 
 * @param date - Date object or timestamp
 * @param format - Format type
 * @returns Formatted time string
 */
export const formatTimeForScreenReader = (
  date: Date | number,
  format: 'date' | 'time' | 'datetime' = 'datetime'
): string => {
  const d = date instanceof Date ? date : new Date(date)
  
  switch (format) {
    case 'date':
      return d.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    case 'time':
      return d.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit' 
      })
    case 'datetime':
    default:
      return d.toLocaleString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: 'numeric', 
        minute: '2-digit' 
      })
  }
}

/**
 * Create live region for dynamic announcements
 * 
 * @param id - ID for the live region
 * @param ariaLive - Live region politeness
 * @returns Created element
 */
export const createLiveRegion = (
  id: string,
  ariaLive: 'polite' | 'assertive' = 'polite'
): HTMLElement => {
  let region = document.getElementById(id)
  
  if (!region) {
    region = document.createElement('div')
    region.id = id
    region.className = 'sr-only'
    region.setAttribute('aria-live', ariaLive)
    region.setAttribute('aria-atomic', 'true')
    region.setAttribute('role', 'status')
    document.body.appendChild(region)
  }
  
  return region
}

/**
 * Remove live region
 * 
 * @param id - ID of the live region to remove
 */
export const removeLiveRegion = (id: string): void => {
  const region = document.getElementById(id)
  if (region) {
    region.remove()
  }
}