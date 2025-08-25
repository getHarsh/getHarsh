/**
 * @fileoverview Accessibility Hook for WCAG 2.1 AA Compliance
 * @module hooks/useAccessibility
 * 
 * @description
 * Provides accessibility utilities and patterns following W3C ARIA best practices.
 * Implements the principle of "semantic HTML first, ARIA only when necessary."
 * This hook provides composable accessibility features that can be used
 * selectively in components that need them, avoiding unnecessary wrappers.
 * 
 * @design-philosophy
 * Our accessibility approach follows these principles:
 * 1. **Semantic HTML First**: Use proper HTML elements (<nav>, <main>, <article>)
 * 2. **ARIA as Enhancement**: Only add ARIA when HTML semantics aren't sufficient
 * 3. **Progressive Enhancement**: Basic functionality works without JavaScript
 * 4. **No Unnecessary Wrappers**: Hooks over providers for better performance
 * 5. **Composable Features**: Use only what you need, where you need it
 * 
 * @wcag-compliance
 * Target: WCAG 2.1 Level AA
 * - Perceivable: Text alternatives, adaptable content, distinguishable
 * - Operable: Keyboard accessible, seizure safe, navigable
 * - Understandable: Readable, predictable, input assistance
 * - Robust: Compatible with assistive technologies
 * 
 * @pattern-rationale
 * Why hooks instead of provider wrapper:
 * - **Performance**: No context overhead or extra DOM nodes
 * - **Flexibility**: Components opt-in to features they need
 * - **Semantic Purity**: HTML structure isn't altered by wrappers
 * - **Tree-shaking**: Unused features are eliminated at build time
 * - **Testing**: Easier to test individual features in isolation
 * 
 * @accessibility-features
 * This hook provides:
 * - Skip navigation links for keyboard users
 * - Focus management for modals and dynamic content
 * - Live region announcements for screen readers
 * - Keyboard navigation utilities
 * - ARIA relationship helpers
 * - Screen reader only content utilities
 * 
 * @browser-support
 * - Modern browsers (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
 * - Screen readers (NVDA, JAWS, VoiceOver, TalkBack)
 * - Keyboard navigation (all browsers)
 * - Touch + screen reader (iOS VoiceOver, Android TalkBack)
 * 
 * @ecosystem-integration
 * - Used by: Layout, Modal, Form components, Navigation
 * - Data flow: Component → Hook → DOM manipulation
 * - Dependencies: None (pure React hooks)
 * - Testing: Jest + React Testing Library + axe-core
 * 
 * @configuration
 * - Compliance level: From GATSBY_ARIA_COMPLIANCE_LEVEL env var
 * - Skip links: Enabled by default
 * - Focus visible: Uses :focus-visible CSS pseudo-class
 * - Reduced motion: Respects prefers-reduced-motion
 * 
 * @best-practices
 * - DO: Use semantic HTML elements first
 * - DO: Test with actual screen readers
 * - DO: Provide keyboard alternatives for all interactions
 * - DO: Include focus indicators for keyboard navigation
 * - DON'T: Use ARIA to fix bad HTML
 * - DON'T: Remove focus outlines without alternatives
 * - DON'T: Auto-focus without user intent
 * - DON'T: Use placeholder as label replacement
 * 
 * @example
 * ```tsx
 * import { useAccessibility } from '@/hooks/useAccessibility'
 * 
 * const Modal = ({ isOpen, onClose, children }) => {
 *   const { 
 *     trapFocus, 
 *     releaseFocus, 
 *     announce,
 *     getSkipLinks 
 *   } = useAccessibility()
 *   
 *   useEffect(() => {
 *     if (isOpen) {
 *       trapFocus(modalRef.current)
 *       announce('Dialog opened')
 *     } else {
 *       releaseFocus()
 *     }
 *   }, [isOpen])
 *   
 *   return (
 *     <div role="dialog" aria-modal="true" ref={modalRef}>
 *       {children}
 *     </div>
 *   )
 * }
 * ```
 * 
 * @testing
 * ```typescript
 * // Test with React Testing Library
 * import { renderHook } from '@testing-library/react-hooks'
 * import { axe } from 'jest-axe'
 * 
 * test('announces message to screen readers', () => {
 *   const { result } = renderHook(() => useAccessibility())
 *   act(() => {
 *     result.current.announce('Test message')
 *   })
 *   expect(screen.getByRole('status')).toHaveTextContent('Test message')
 * })
 * ```
 * 
 * @see {@link file://./src/utils/aria-helpers.ts} - ARIA utility functions
 * @see {@link file://./src/utils/mappings.ts} - ARIA role and property mappings
 * @see {@link file://./BUILD.md#accessibility} - Accessibility build configuration
 * @see {@link file://./USE-CASE.md#accessibility-requirements} - Accessibility requirements
 * @see {@link https://www.w3.org/WAI/ARIA/apg/} - ARIA Authoring Practices
 * @see {@link https://webaim.org/resources/contrastchecker/} - Color contrast checker
 * @see {@link https://www.w3.org/WAI/WCAG21/quickref/} - WCAG Quick Reference
 * 
 * @since 2.0.0
 */

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { getAriaRole, getAriaProperty, getAriaLandmark } from '@/utils/mappings'

/**
 * Skip link configuration interface
 * Defines navigation shortcuts for keyboard users
 */
interface SkipLink {
  /** Unique identifier for the link */
  id: string
  /** Display text for the link */
  label: string
  /** Target element selector (e.g., '#main', '#nav') */
  target: string
  /** Optional keyboard shortcut */
  shortcut?: string
}

/**
 * Accessibility configuration options
 */
interface AccessibilityConfig {
  /** WCAG compliance level (A, AA, AAA) */
  complianceLevel?: 'A' | 'AA' | 'AAA'
  /** Enable skip navigation links */
  enableSkipLinks?: boolean
  /** Enable focus trap for modals */
  enableFocusTrap?: boolean
  /** Enable live region announcements */
  enableAnnouncements?: boolean
  /** Announce page changes to screen readers */
  announcePageChanges?: boolean
}

/**
 * Focus trap options
 */
interface FocusTrapOptions {
  /** Initial element to focus */
  initialFocus?: HTMLElement
  /** Element to return focus to when trap is released */
  returnFocus?: HTMLElement
  /** Allow escape key to release trap */
  allowEscape?: boolean
  /** Callback when trap is released */
  onRelease?: () => void
}

/**
 * Accessibility hook return type
 */
interface UseAccessibilityReturn {
  /** Get skip links for current page context */
  getSkipLinks: (pageType?: string) => SkipLink[]
  /** Trap focus within an element (for modals) */
  trapFocus: (element: HTMLElement, options?: FocusTrapOptions) => void
  /** Release focus trap */
  releaseFocus: () => void
  /** Announce message to screen readers */
  announce: (message: string, priority?: 'polite' | 'assertive') => void
  /** Clear announcements */
  clearAnnouncements: () => void
  /** Check if user prefers reduced motion */
  prefersReducedMotion: boolean
  /** Check if user is navigating with keyboard */
  isKeyboardNav: boolean
  /** Set element as current page in navigation */
  setCurrentPage: (element: HTMLElement) => void
  /** Add landmark role to element */
  addLandmark: (element: HTMLElement, role: string, label?: string) => void
  /** Create ID for ARIA relationship */
  generateAriaId: (prefix: string) => string
  /** Set up ARIA relationship between elements */
  setupAriaRelationship: (controller: HTMLElement, target: HTMLElement, relationship: 'labelledby' | 'describedby' | 'controls') => void
  /** Check if element is visible to screen readers */
  isAriaVisible: (element: HTMLElement) => boolean
  /** Get accessible name of element */
  getAccessibleName: (element: HTMLElement) => string
  /** Current compliance level */
  complianceLevel: string
}

/**
 * Custom hook for accessibility features
 * 
 * @param {AccessibilityConfig} config - Optional configuration
 * @returns {UseAccessibilityReturn} Accessibility utilities
 */
export const useAccessibility = (config?: AccessibilityConfig): UseAccessibilityReturn => {
  // Configuration with defaults
  const complianceLevel = config?.complianceLevel || 
    (process.env.GATSBY_ARIA_COMPLIANCE_LEVEL as 'A' | 'AA' | 'AAA') || 'AA'
  const enableSkipLinks = config?.enableSkipLinks !== false
  const enableFocusTrap = config?.enableFocusTrap !== false
  const enableAnnouncements = config?.enableAnnouncements !== false
  const announcePageChanges = config?.announcePageChanges !== false

  // State
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [isKeyboardNav, setIsKeyboardNav] = useState(false)
  
  // Refs
  const focusTrapRef = useRef<HTMLElement | null>(null)
  const returnFocusRef = useRef<HTMLElement | null>(null)
  const announcementRef = useRef<HTMLDivElement | null>(null)
  const idCounterRef = useRef(0)

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }
    
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Detect keyboard navigation
  useEffect(() => {
    let lastInteraction = 'mouse'
    
    const handleMouseDown = () => {
      lastInteraction = 'mouse'
      setIsKeyboardNav(false)
    }
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        lastInteraction = 'keyboard'
        setIsKeyboardNav(true)
      }
    }
    
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('keydown', handleKeyDown)
    
    return () => {
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  /**
   * Get skip links based on page context
   * Uses ARIA mappings for consistent labeling
   * 
   * @param pageType - Type of page (home, blog, services, etc.)
   * @returns Array of skip links
   */
  const getSkipLinks = useCallback((pageType?: string): SkipLink[] => {
    if (!enableSkipLinks) return []
    
    // Get base skip link labels from ARIA mappings
    const mainLabel = getAriaProperty('label', 'skip_main') || 'Skip to main content'
    const navLabel = getAriaProperty('label', 'skip_nav') || 'Skip to navigation'
    
    const baseLinks: SkipLink[] = [
      { id: 'skip-main', label: mainLabel, target: '#main' },
      { id: 'skip-nav', label: navLabel, target: '#nav' }
    ]
    
    // Add contextual skip links based on page type
    switch (pageType) {
      case 'blog':
      case 'article': {
        const articleLabel = getAriaProperty('label', 'skip_article') || 'Skip to article'
        const commentsLabel = getAriaProperty('label', 'skip_comments') || 'Skip to discussion'
        baseLinks.push(
          { id: 'skip-article', label: articleLabel, target: '#article' },
          { id: 'skip-comments', label: commentsLabel, target: '#comments' }
        )
        break
      }
      case 'services': {
        const servicesLabel = getAriaProperty('label', 'skip_services') || 'Skip to services list'
        baseLinks.push(
          { id: 'skip-services', label: servicesLabel, target: '#services' }
        )
        break
      }
      case 'docs': {
        const tocLabel = getAriaProperty('label', 'skip_toc') || 'Skip to table of contents'
        const docsNavLabel = getAriaProperty('label', 'skip_docs_nav') || 'Skip to docs navigation'
        baseLinks.push(
          { id: 'skip-toc', label: tocLabel, target: '#toc' },
          { id: 'skip-docs-nav', label: docsNavLabel, target: '#docs-nav' }
        )
        break
      }
      case 'contact': {
        const formLabel = getAriaProperty('label', 'skip_form') || 'Skip to contact form'
        baseLinks.push(
          { id: 'skip-form', label: formLabel, target: '#contact-form' }
        )
        break
      }
      case 'search': {
        const searchLabel = getAriaProperty('label', 'skip_search') || 'Skip to search results'
        baseLinks.push(
          { id: 'skip-search', label: searchLabel, target: '#search-results' }
        )
        break
      }
    }
    
    return baseLinks
  }, [enableSkipLinks])

  /**
   * Trap focus within an element (typically for modals)
   * 
   * @param element - Element to trap focus within
   * @param options - Focus trap options
   */
  const trapFocus = useCallback((element: HTMLElement, options?: FocusTrapOptions) => {
    if (!enableFocusTrap || !element) return
    
    // Store current focus for restoration
    returnFocusRef.current = options?.returnFocus || (document.activeElement as HTMLElement)
    focusTrapRef.current = element
    
    // Get focusable elements
    const focusableElements = element.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea:not([disabled]), ' +
      'input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), ' +
      'input[type="checkbox"]:not([disabled]), select:not([disabled]), ' +
      '[tabindex]:not([tabindex="-1"])'
    )
    
    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]
    
    // Focus initial element
    const initialFocus = options?.initialFocus || firstElement
    if (initialFocus) {
      initialFocus.focus()
    }
    
    // Handle tab key for focus trap
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault()
          lastElement?.focus()
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault()
          firstElement?.focus()
        }
      } else if (e.key === 'Escape' && options?.allowEscape) {
        releaseFocus()
        options.onRelease?.()
      }
    }
    
    element.addEventListener('keydown', handleKeyDown)
    
    // Store cleanup function
    ;(element as any).__focusTrapCleanup = () => {
      element.removeEventListener('keydown', handleKeyDown)
    }
  }, [enableFocusTrap])

  /**
   * Release focus trap and restore focus
   */
  const releaseFocus = useCallback(() => {
    if (focusTrapRef.current) {
      // Clean up event listener
      const cleanup = (focusTrapRef.current as any).__focusTrapCleanup
      if (cleanup) {
        cleanup()
        delete (focusTrapRef.current as any).__focusTrapCleanup
      }
      
      focusTrapRef.current = null
    }
    
    // Restore focus
    if (returnFocusRef.current) {
      returnFocusRef.current.focus()
      returnFocusRef.current = null
    }
  }, [])

  /**
   * Announce message to screen readers
   * Uses ARIA mappings for live region configuration
   * 
   * @param message - Message to announce
   * @param priority - Priority level (polite or assertive)
   */
  const announce = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    if (!enableAnnouncements || !message) return
    
    // Get live region role from mappings
    const liveRegionRole = getAriaRole('live_region', priority)
    
    // Create or get announcement container
    let container = document.getElementById('aria-live-region')
    if (!container) {
      container = document.createElement('div')
      container.id = 'aria-live-region'
      container.className = 'sr-only'
      container.setAttribute('aria-live', priority)
      container.setAttribute('aria-atomic', 'true')
      container.setAttribute('role', liveRegionRole.role || 'status')
      document.body.appendChild(container)
    }
    
    // Update priority if different
    if (container.getAttribute('aria-live') !== priority) {
      container.setAttribute('aria-live', priority)
    }
    
    // Announce message
    container.textContent = message
    
    // Clear after delay to allow re-announcement
    setTimeout(() => {
      if (container) {
        container.textContent = ''
      }
    }, 1000)
  }, [enableAnnouncements])

  /**
   * Clear all announcements
   */
  const clearAnnouncements = useCallback(() => {
    const container = document.getElementById('aria-live-region')
    if (container) {
      container.textContent = ''
    }
  }, [])

  /**
   * Set element as current page in navigation
   * 
   * @param element - Navigation element for current page
   */
  const setCurrentPage = useCallback((element: HTMLElement) => {
    element.setAttribute('aria-current', 'page')
  }, [])

  /**
   * Add landmark role to element
   * Uses ARIA mappings for proper landmark configuration
   * 
   * @param element - Element to add landmark to
   * @param role - ARIA landmark role
   * @param label - Optional aria-label
   */
  const addLandmark = useCallback((element: HTMLElement, role: string, label?: string) => {
    // Get landmark configuration from mappings
    const landmarkConfig = getAriaLandmark(role)
    
    element.setAttribute('role', landmarkConfig.role)
    
    // Use provided label or get from mappings
    const finalLabel = label || landmarkConfig.label
    if (finalLabel) {
      element.setAttribute('aria-label', finalLabel)
    }
  }, [])

  /**
   * Generate unique ID for ARIA relationships
   * 
   * @param prefix - ID prefix
   * @returns Unique ID
   */
  const generateAriaId = useCallback((prefix: string): string => {
    idCounterRef.current += 1
    return `${prefix}-${idCounterRef.current}-${Math.random().toString(36).substr(2, 9)}`
  }, [])

  /**
   * Set up ARIA relationship between elements
   * 
   * @param controller - Controller element
   * @param target - Target element
   * @param relationship - Type of relationship
   */
  const setupAriaRelationship = useCallback((
    controller: HTMLElement,
    target: HTMLElement,
    relationship: 'labelledby' | 'describedby' | 'controls'
  ) => {
    // Ensure target has an ID
    if (!target.id) {
      target.id = generateAriaId('aria-target')
    }
    
    controller.setAttribute(`aria-${relationship}`, target.id)
  }, [generateAriaId])

  /**
   * Check if element is visible to screen readers
   * 
   * @param element - Element to check
   * @returns Whether element is visible to screen readers
   */
  const isAriaVisible = useCallback((element: HTMLElement): boolean => {
    return !element.hasAttribute('aria-hidden') && 
           element.getAttribute('aria-hidden') !== 'true' &&
           !element.closest('[aria-hidden="true"]')
  }, [])

  /**
   * Get accessible name of element
   * 
   * @param element - Element to get name from
   * @returns Accessible name
   */
  const getAccessibleName = useCallback((element: HTMLElement): string => {
    // Check aria-label first
    const ariaLabel = element.getAttribute('aria-label')
    if (ariaLabel) return ariaLabel
    
    // Check aria-labelledby
    const labelledBy = element.getAttribute('aria-labelledby')
    if (labelledBy) {
      const labelElement = document.getElementById(labelledBy)
      if (labelElement) return labelElement.textContent || ''
    }
    
    // Check for associated label (for form controls)
    if (element instanceof HTMLInputElement || 
        element instanceof HTMLSelectElement || 
        element instanceof HTMLTextAreaElement) {
      const id = element.id
      if (id) {
        const label = document.querySelector(`label[for="${id}"]`)
        if (label) return label.textContent || ''
      }
    }
    
    // Fall back to text content
    return element.textContent || ''
  }, [])

  // Set up page change announcements
  useEffect(() => {
    if (!announcePageChanges) return
    
    const handleRouteChange = () => {
      const pageTitle = document.title
      announce(`Navigated to ${pageTitle}`)
    }
    
    // Listen for Gatsby route changes
    if (typeof window !== 'undefined' && (window as any).___navigate) {
      const originalNavigate = (window as any).___navigate
      ;(window as any).___navigate = (pathname: string, options: any) => {
        const result = originalNavigate(pathname, options)
        handleRouteChange()
        return result
      }
    }
  }, [announcePageChanges, announce])

  return {
    getSkipLinks,
    trapFocus,
    releaseFocus,
    announce,
    clearAnnouncements,
    prefersReducedMotion,
    isKeyboardNav,
    setCurrentPage,
    addLandmark,
    generateAriaId,
    setupAriaRelationship,
    isAriaVisible,
    getAccessibleName,
    complianceLevel
  }
}

/**
 * Skip to content component for keyboard navigation
 * Can be used directly in Layout components
 * 
 * @example
 * ```tsx
 * import { SkipToContent } from '@/hooks/useAccessibility'
 * 
 * const Layout = ({ children }) => (
 *   <>
 *     <SkipToContent />
 *     <nav id="nav">...</nav>
 *     <main id="main">{children}</main>
 *   </>
 * )
 * ```
 */
export const SkipToContent = ({ pageType }: { pageType?: string }) => {
  const { getSkipLinks } = useAccessibility()
  const links = getSkipLinks(pageType)
  
  if (links.length === 0) return null
  
  return (
    <div className="sr-only focus-within:not-sr-only focus-within:absolute focus-within:top-0 focus-within:left-0 focus-within:z-50 focus-within:bg-white focus-within:p-4 focus-within:shadow-lg">
      {links.map(link => (
        <a
          key={link.id}
          href={link.target}
          className="block px-4 py-2 text-blue-700 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {link.label}
          {link.shortcut && <span className="ml-2 text-sm text-gray-500">({link.shortcut})</span>}
        </a>
      ))}
    </div>
  )
}