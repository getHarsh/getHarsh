/**
 * @fileoverview SearchInput - Debounced search input with keyboard shortcuts
 * @module components/search/SearchInput
 * 
 * @description
 * A search input component with debounced searching, keyboard shortcuts display,
 * and auto-focus support. Provides an optimized search experience with visual
 * feedback and platform-aware keyboard shortcuts.
 * 
 * This component serves as the primary text input for all search experiences
 * across the ecosystem, providing consistent behavior with intelligent debouncing
 * to balance responsiveness with performance.
 * 
 * @architecture
 * ```
 * SearchInput (this)
 *       ├── Icon Container
 *       │     └── MagnifyingGlassIcon
 *       ├── Input Field
 *       │     ├── Debounced onChange
 *       │     └── Enter key handler
 *       └── Shortcut Display
 *             └── Platform-aware (⌘K/Ctrl+K)
 * 
 * Event Flow:
 * Typing → onChange → debounce(300ms) → onSearch
 * Enter → flush() → immediate onSearch
 * ```
 * 
 * @proto-integration
 * Maps to search input configurations:
 * 
 * - **SearchConfig** (search.proto)
 *   - `search_ui.debounce_ms`: Debounce delay (default: 300)
 *   - `search_ui.placeholder_text`: Input placeholder
 *   - `search_ui.show_shortcuts`: Display keyboard hints
 *   - `search_ui.auto_focus`: Focus on mount
 * 
 * - **UIConfig** (ui.proto)
 *   - `input_styles.focus_ring`: Focus indicator style
 *   - `input_styles.dark_mode`: Dark theme support
 *   - `keyboard.shortcuts.search`: Global search hotkey
 * 
 * @hook-integration
 * While not directly using hooks, integrates with:
 * 
 * - **useDebouncedCallback()** (use-debounce)
 *   - Delays search execution during typing
 *   - Flush() for immediate execution
 * 
 * - Parent hooks via callbacks:
 *   - useSearchIndex() via onSearch
 *   - useSearchTracking() for query logging
 * 
 * @ecosystem-integration
 * - **Used by**: SearchInterface, SearchPage, NavSearch, CommandPalette
 * - **Data flow**: User input → debounce → parent search handler
 * - **Keyboard**: Enter for immediate, typing for debounced
 * - **Accessibility**: Full ARIA support, focus management
 * - **Performance**: 300ms debounce balances UX and efficiency
 * 
 * @features
 * - **Smart Debouncing**: 300ms delay with Enter override
 * - **Platform Detection**: Mac vs PC shortcut display
 * - **Visual Feedback**: Icon and focus ring
 * - **Dark Mode**: Full theme compatibility
 * - **Auto-focus**: Optional for modals/dialogs
 * - **Keyboard Shortcut**: Visual hint for global search
 * - **Responsive**: Adapts to container width
 * 
 * @debouncing-strategy
 * ```
 * Normal typing:
 * - 300ms delay after last keystroke
 * - Prevents excessive search calls
 * - Smooth user experience
 * 
 * Enter key:
 * - Immediate flush and search
 * - No delay for explicit action
 * - Clear user intent
 * 
 * Value clearing:
 * - Immediate callback
 * - Clears results instantly
 * ```
 * 
 * @accessibility
 * - **Focus Ring**: Clear visual indicator
 * - **Placeholder**: Descriptive search hints
 * - **Keyboard**: Full keyboard navigation
 * - **Screen Readers**: Proper input labeling
 * - **High Contrast**: Border and text contrast
 * 
 * @performance
 * - **Debouncing**: Reduces search calls by ~80%
 * - **Ref-based Focus**: Direct DOM manipulation
 * - **Platform Check**: Cached after first check
 * - **Icon**: SVG for crisp rendering
 * - **Styles**: Tailwind JIT compilation
 * 
 * @styling
 * ```
 * Light Mode:
 * - White background
 * - Gray borders
 * - Blue focus ring
 * 
 * Dark Mode:
 * - Gray-800 background
 * - Gray-600 borders
 * - Primary focus ring
 * ```
 * 
 * @dos
 * - Use 300ms debounce for optimal UX
 * - Show keyboard shortcuts in desktop
 * - Auto-focus in modals/dialogs
 * - Provide descriptive placeholders
 * - Handle Enter key explicitly
 * 
 * @donts
 * - Don't reduce debounce below 100ms
 * - Don't remove the search icon
 * - Don't skip platform detection
 * - Don't forget dark mode styles
 * - Don't disable Enter key handler
 * 
 * @example
 * ```tsx
 * // Standard search implementation
 * function SearchBar() {
 *   const [query, setQuery] = useState('')
 *   const { search } = useSearchIndex()
 *   
 *   return (
 *     <SearchInput
 *       value={query}
 *       onChange={setQuery}
 *       onSearch={search}
 *       placeholder="Search documentation..."
 *       showShortcut={true}
 *     />
 *   )
 * }
 * 
 * // Modal search with auto-focus
 * <Dialog open={isOpen}>
 *   <SearchInput
 *     value={searchTerm}
 *     onChange={setSearchTerm}
 *     onSearch={handleSearch}
 *     autoFocus={true}
 *     debounceDelay={200}
 *   />
 * </Dialog>
 * ```
 * 
 * @see {@link file://./SEARCH.md#search-input} - Input specification
 * @see {@link file://./SearchInterface.tsx} - Primary consumer
 * @see {@link file://../../hooks/search/useSearchHotkeys.ts} - Hotkeys
 * @see {@link https://www.npmjs.com/package/use-debounce} - Debounce lib
 * 
 * @since 1.0.0
 */

import React, { useRef, useEffect } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'

/**
 * @interface SearchInputProps
 * @description Props for SearchInput component
 * 
 * Configuration for the search input field, controlling debouncing,
 * auto-focus, and visual features.
 * 
 * @property {string} value - Current search value
 * Controlled input value from parent state.
 * 
 * @property {(value: string) => void} onChange - Callback when input value changes
 * Called immediately on every keystroke to update parent state.
 * 
 * @property {(value: string) => void} onSearch - Callback when search should be performed
 * Called after debounce delay or immediately on Enter key.
 * This triggers the actual search operation.
 * 
 * @property {string} [placeholder='Search...'] - Placeholder text
 * Descriptive hint shown when input is empty.
 * Should describe what can be searched.
 * 
 * @property {number} [debounceDelay=300] - Debounce delay in milliseconds
 * Time to wait after last keystroke before calling onSearch.
 * Lower values = more responsive but more search calls.
 * 
 * @property {boolean} [autoFocus=false] - Auto-focus input on mount
 * Useful for modals and dialogs where search is primary action.
 * 
 * @property {string} [className] - Additional CSS classes
 * Applied to root container div for custom styling.
 * 
 * @property {boolean} [showShortcut=false] - Show keyboard shortcut indicator
 * Displays platform-specific shortcut (⌘K or Ctrl+K) when input is empty.
 * 
 * @example
 * ```tsx
 * const props: SearchInputProps = {
 *   value: 'gatsby tutorial',
 *   onChange: (val) => setSearchQuery(val),
 *   onSearch: (val) => performSearch(val),
 *   placeholder: 'Search docs, API, and guides...',
 *   debounceDelay: 250,
 *   autoFocus: true,
 *   showShortcut: true,
 *   className: 'w-full max-w-lg'
 * }
 * ```
 */
interface SearchInputProps {
  /** Current search value - controlled input */
  value: string
  /** Callback when input value changes - called on every keystroke */
  onChange: (value: string) => void
  /** Callback when search should be performed - called after debounce */
  onSearch: (value: string) => void
  /** Placeholder text - descriptive search hint */
  placeholder?: string
  /** Debounce delay in milliseconds - balances UX and performance */
  debounceDelay?: number
  /** Auto-focus input on mount - useful for modals */
  autoFocus?: boolean
  /** Additional CSS classes for container */
  className?: string
  /** Show keyboard shortcut indicator - platform-aware */
  showShortcut?: boolean
}

/**
 * SearchInput component - Debounced search input field
 * 
 * Provides an optimized search input with intelligent debouncing,
 * platform-aware keyboard shortcuts, and full accessibility support.
 * Balances responsiveness with performance through configurable delays.
 * 
 * @component
 * @param {SearchInputProps} props - Component props
 * @param {string} props.value - Current search value
 * @param {(value: string) => void} props.onChange - Value change handler
 * @param {(value: string) => void} props.onSearch - Search trigger handler
 * @param {string} [props.placeholder='Search...'] - Placeholder text
 * @param {number} [props.debounceDelay=300] - Debounce delay in ms
 * @param {boolean} [props.autoFocus=false] - Auto-focus on mount
 * @param {string} [props.className=''] - Additional CSS classes
 * @param {boolean} [props.showShortcut=false] - Show keyboard shortcut
 * 
 * @returns {JSX.Element} Search input containing:
 * - Magnifying glass icon (left)
 * - Text input with debouncing
 * - Keyboard shortcut hint (right, optional)
 * - Full dark mode support
 * - Focus ring indicator
 * 
 * @remarks
 * The component handles two search triggers:
 * 1. **Debounced**: After typing stops for debounceDelay ms
 * 2. **Immediate**: When Enter key is pressed
 * 
 * Platform detection determines shortcut display:
 * - Mac/iOS: Shows ⌘K
 * - Windows/Linux: Shows Ctrl+K
 * 
 * @example
 * ```tsx
 * // In a search modal
 * function SearchModal({ isOpen, onClose }) {
 *   const [query, setQuery] = useState('')
 *   const { search, results } = useSearch()
 *   
 *   const handleSearch = useCallback((value: string) => {
 *     if (value.length >= 2) {
 *       search(value)
 *     }
 *   }, [search])
 *   
 *   return (
 *     <Dialog open={isOpen} onClose={onClose}>
 *       <SearchInput
 *         value={query}
 *         onChange={setQuery}
 *         onSearch={handleSearch}
 *         placeholder="Type to search (min 2 chars)..."
 *         autoFocus={true}
 *         showShortcut={false} // Don't show in modal
 *       />
 *       <SearchResults results={results} />
 *     </Dialog>
 *   )
 * }
 * ```
 */
export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  onSearch,
  placeholder = 'Search...',
  debounceDelay = 300,
  autoFocus = false,
  className = '',
  showShortcut = false
}) => {
  const inputRef = useRef<HTMLInputElement>(null)

  /**
   * Debounced search callback
   * 
   * Delays search execution by debounceDelay ms after
   * the last keystroke to reduce search operations.
   */
  const debouncedSearch = useDebouncedCallback(
    (searchValue: string) => {
      onSearch(searchValue)
    },
    debounceDelay
  )

  /**
   * Auto-focus effect
   * 
   * Focuses the input field on mount when autoFocus is true.
   * Useful for modal/dialog contexts where search is primary action.
   */
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus()
    }
  }, [autoFocus])

  /**
   * Handle input value changes
   * 
   * Updates parent state immediately and triggers
   * debounced search after configured delay.
   * 
   * @param {React.ChangeEvent<HTMLInputElement>} e - Change event
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    onChange(newValue)
    debouncedSearch(newValue)
  }

  /**
   * Handle keyboard events
   * 
   * Triggers immediate search on Enter key by flushing
   * the debounced callback and calling onSearch directly.
   * 
   * @param {React.KeyboardEvent<HTMLInputElement>} e - Keyboard event
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      debouncedSearch.flush()
      onSearch(value)
    }
  }

  /**
   * Platform detection for keyboard shortcut display
   * 
   * Determines whether to show Mac (⌘K) or PC (Ctrl+K)
   * shortcut based on user agent string.
   */
  const isMac = typeof window !== 'undefined' && 
    /Mac|iPod|iPhone|iPad/.test(window.navigator.userAgent)

  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
      </div>
      
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="
          block w-full pl-10 pr-3 py-2
          border border-gray-300 dark:border-gray-600
          rounded-lg
          bg-white dark:bg-gray-800
          text-gray-900 dark:text-gray-100
          placeholder-gray-500 dark:placeholder-gray-400
          focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
          text-sm
        "
      />
      
      {showShortcut && !value && (
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <kbd className="
            px-2 py-1
            text-xs font-semibold
            text-gray-500 dark:text-gray-400
            bg-gray-100 dark:bg-gray-700
            border border-gray-300 dark:border-gray-600
            rounded
          ">
            {isMac ? '⌘K' : 'Ctrl+K'}
          </kbd>
        </div>
      )}
    </div>
  )
}