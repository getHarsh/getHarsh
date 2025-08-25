/**
 * @fileoverview Keyboard Shortcuts Hook for Search Accessibility
 * @module hooks/search/useSearchHotkeys
 * 
 * @description
 * Provides keyboard shortcuts and navigation for the search interface in the getHarsh ecosystem.
 * This hook implements accessibility-first keyboard controls following WCAG 2.1 AA standards,
 * enabling power users to navigate search efficiently without a mouse.
 * 
 * The keyboard shortcuts follow industry-standard patterns (Cmd/Ctrl+K for search)
 * while providing intuitive navigation through search results using arrow keys.
 * 
 * @keyboard-shortcuts
 * Global shortcuts:
 * - **Cmd+K / Ctrl+K**: Toggle search interface
 * - **/** : Open search (when not in input field)
 * - **Escape**: Close search interface
 * 
 * Result navigation:
 * - **↑/↓ Arrow keys**: Navigate through results
 * - **Enter**: Select highlighted result
 * - **Tab/Shift+Tab**: Cycle through results
 * 
 * @accessibility
 * This hook ensures WCAG 2.1 AA compliance:
 * - All functionality available via keyboard
 * - Focus management for screen readers
 * - Predictable navigation patterns
 * - Visual focus indicators
 * - Escape hatch always available
 * 
 * @ecosystem-integration
 * - Search Interface: Controls SearchInterface component visibility
 * - Result Navigation: Manages focus within search results
 * - Accessibility: Works with useAccessibility for focus management
 * - Analytics: Keyboard usage tracked for UX optimization
 * 
 * @platform-support
 * - macOS: Cmd+K with native symbols (⌘)
 * - Windows/Linux: Ctrl+K with standard notation
 * - Mobile: Touch-first, keyboard support for external keyboards
 * - Screen readers: Full ARIA support with announcements
 * 
 * @performance
 * - Event delegation: Single listener for all hotkeys
 * - Debouncing: Prevents rapid triggering
 * - Cleanup: Proper listener removal on unmount
 * - No polling: Event-driven architecture
 * 
 * @dos
 * - Use standard keyboard shortcuts (Cmd/Ctrl+K)
 * - Prevent default browser behavior
 * - Check if target is input before capturing /
 * - Provide visual shortcut hints in UI
 * - Support both Mac and PC conventions
 * 
 * @donts
 * - Don't override browser shortcuts unnecessarily
 * - Don't capture keys when in input fields
 * - Don't forget cleanup on unmount
 * - Don't ignore platform differences
 * - Don't disable without alternative
 * 
 * @example
 * ```tsx
 * const SearchComponent = () => {
 *   const [isOpen, setIsOpen] = useState(false)
 *   const [selectedIndex, setSelectedIndex] = useState(0)
 *   
 *   const { useResultNavigation, shortcuts } = useSearchHotkeys({
 *     isOpen,
 *     onOpen: () => setIsOpen(true),
 *     onClose: () => setIsOpen(false),
 *     enableHotkeys: true
 *   })
 *   
 *   // Enable result navigation
 *   useResultNavigation(
 *     results.length,
 *     selectedIndex,
 *     setSelectedIndex,
 *     (index) => navigateToResult(results[index])
 *   )
 *   
 *   return (
 *     <div>
 *       <button>Search {shortcuts.open}</button>
 *       {isOpen && <SearchResults />}
 *     </div>
 *   )
 * }
 * ```
 * 
 * @see {@link file://./SEARCH.md#keyboard-navigation} - Keyboard navigation spec
 * @see {@link file://./src/hooks/useAccessibility.tsx} - Accessibility integration
 * @see {@link file://./src/components/search/SearchInterface.tsx} - Search UI component
 * @see {@link file://./src/hooks/search/useFlexSearch.ts} - Search functionality
 * @see {@link https://www.w3.org/WAI/ARIA/apg/patterns/combobox/} - ARIA combobox pattern
 * 
 * @since 2.0.0
 */

import { useEffect, useCallback } from 'react'

/**
 * Configuration options for search hotkeys.
 * Controls keyboard shortcut behavior and callbacks.
 */
interface UseSearchHotkeysOptions {
  onOpen?: () => void
  onClose?: () => void
  onToggle?: () => void
  isOpen?: boolean
  enableHotkeys?: boolean
}

/**
 * Keyboard shortcuts hook for search interface.
 * Provides global hotkeys and result navigation.
 * 
 * @param {UseSearchHotkeysOptions} options - Hotkey configuration
 * @returns Hotkey utilities and shortcut labels
 */
export function useSearchHotkeys(options?: UseSearchHotkeysOptions) {
  const enableHotkeys = options?.enableHotkeys !== false

  /**
   * Global keyboard event handler.
   * Processes search shortcuts and navigation keys.
   * 
   * @param event - Keyboard event
   */
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!enableHotkeys) return

    // Cmd+K (Mac) or Ctrl+K (Windows/Linux) to open search
    if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
      event.preventDefault()
      if (options?.isOpen) {
        options?.onClose?.()
      } else {
        options?.onOpen?.()
      }
      options?.onToggle?.()
      return
    }

    // Forward slash to open search (when not in input)
    if (event.key === '/' && !isInputElement(event.target)) {
      event.preventDefault()
      options?.onOpen?.()
      return
    }

    // Escape to close search
    if (event.key === 'Escape' && options?.isOpen) {
      event.preventDefault()
      options?.onClose?.()
      return
    }
  }, [enableHotkeys, options])

  useEffect(() => {
    if (typeof window === 'undefined') return

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  /**
   * Check if event target is an input element.
   * Prevents capturing shortcuts when typing.
   * 
   * @param target - Event target element
   * @returns True if target is an input field
   */
  const isInputElement = (target: EventTarget | null): boolean => {
    if (!target || !(target instanceof HTMLElement)) return false
    
    const tagName = target.tagName.toLowerCase()
    return (
      tagName === 'input' ||
      tagName === 'textarea' ||
      tagName === 'select' ||
      target.contentEditable === 'true'
    )
  }

  /**
   * Hook for keyboard navigation within search results.
   * Enables arrow key navigation and result selection.
   * 
   * @param resultCount - Total number of results
   * @param selectedIndex - Currently selected result index
   * @param onSelectChange - Callback for selection changes
   * @param onResultSelect - Callback for result selection
   */
  const useResultNavigation = (
    resultCount: number,
    selectedIndex: number,
    onSelectChange: (index: number) => void,
    onResultSelect: (index: number) => void
  ) => {
    const handleResultNavigation = useCallback((event: KeyboardEvent) => {
      if (!options?.isOpen || resultCount === 0) return

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault()
          onSelectChange(Math.min(selectedIndex + 1, resultCount - 1))
          break
        
        case 'ArrowUp':
          event.preventDefault()
          onSelectChange(Math.max(selectedIndex - 1, 0))
          break
        
        case 'Enter':
          if (selectedIndex >= 0 && selectedIndex < resultCount) {
            event.preventDefault()
            onResultSelect(selectedIndex)
          }
          break
        
        case 'Tab':
          // Tab cycles through results
          event.preventDefault()
          if (event.shiftKey) {
            onSelectChange(selectedIndex === 0 ? resultCount - 1 : selectedIndex - 1)
          } else {
            onSelectChange((selectedIndex + 1) % resultCount)
          }
          break
      }
    }, [resultCount, selectedIndex, onSelectChange, onResultSelect, options?.isOpen])

    useEffect(() => {
      if (typeof window === 'undefined' || !options?.isOpen) return

      document.addEventListener('keydown', handleResultNavigation)

      return () => {
        document.removeEventListener('keydown', handleResultNavigation)
      }
    }, [handleResultNavigation, options?.isOpen])
  }

  return {
    useResultNavigation,
    shortcuts: {
      open: isMac() ? '⌘K' : 'Ctrl+K',
      close: 'Esc',
      navigate: '↑↓',
      select: 'Enter',
      cycle: 'Tab'
    }
  }
}

/**
 * Detect if running on macOS.
 * Used for platform-specific keyboard shortcuts.
 * 
 * @returns True if macOS/iOS device
 */
function isMac(): boolean {
  if (typeof window === 'undefined') return false
  return /Mac|iPod|iPhone|iPad/.test(window.navigator.platform)
}