/**
 * @fileoverview Table - Comprehensive table components with theme-aware styling
 * @module components/content/Table
 * 
 * @description
 * A complete set of table components providing accessible, responsive tables
 * with multiple style variants. Includes support for markdown-generated tables
 * and comprehensive customization options for headers, cells, and layout.
 * 
 * This component suite provides all the building blocks needed for creating
 * data tables in the getHarsh ecosystem. From simple markdown tables to
 * complex data grids, these components ensure consistent styling and
 * accessibility throughout the application.
 * 
 * @architecture
 * ```
 * Table Component Suite
 *       ├── Main Components
 *       │     ├── Table (container)
 *       │     ├── TableHeader (thead)
 *       │     ├── TableBody (tbody)
 *       │     ├── TableFooter (tfoot)
 *       │     ├── TableRow (tr)
 *       │     ├── TableHead (th)
 *       │     ├── TableCell (td)
 *       │     └── TableCaption (caption)
 *       ├── Variants
 *       │     ├── default (minimal)
 *       │     ├── striped (alternating rows)
 *       │     ├── bordered (full borders)
 *       │     └── terminal (monospace)
 *       └── Features
 *             ├── Responsive wrapper
 *             ├── Cell alignment
 *             ├── Hover states
 *             └── Markdown support
 * 
 * Rendering Flow:
 * Data → Table → Responsive wrapper → Styled components → Display
 * Markdown → MarkdownTable → Auto-mapped components → Display
 * ```
 * 
 * @proto-integration
 * Maps to table and content configurations:
 * 
 * - **TableConfig** (ui.proto)
 *   - `default_variant`: 'striped' for readability
 *   - `responsive_default`: true for mobile
 *   - `hover_rows`: true for interactivity
 *   - `cell_padding`: 'p-4' standard
 * 
 * - **ContentConfig** (content.proto)
 *   - `table.markdown_variant`: 'striped'
 *   - `table.alignment_default`: 'left'
 *   - `table.numeric_font`: 'font-mono'
 *   - `table.header_style`: uppercase
 * 
 * - **ThemeConfig** (theme.proto)
 *   - `table.header_bg`: accent-primary/5
 *   - `table.stripe_bg`: bg-secondary/30
 *   - `table.border_color`: accent-primary/20
 *   - `table.hover_bg`: accent-primary/5
 * 
 * - **AccessibilityConfig** (accessibility.proto)
 *   - `table.semantic_html`: Proper structure
 *   - `table.caption_position`: Configurable
 *   - `table.responsive_scroll`: Horizontal
 *   - `table.focus_visible`: Ring on cells
 * 
 * @hook-integration
 * While Table components don't use hooks directly, parent components often use:
 * 
 * - **useConfig()**: Theme variant selection
 * - **useGTM()**: Track table interactions
 * - **useAccessibility()**: Screen reader announcements
 * 
 * @ecosystem-integration
 * - **Used by**: BlogPosts, Documentation, DataDisplays, ComparisonTables
 * - **Data Sources**: API responses, markdown, static data
 * - **Responsiveness**: Horizontal scroll on mobile
 * - **Theme**: Respects dark/light mode automatically
 * - **Markdown**: Automatic table processing
 * 
 * @features
 * - **4 Style Variants**: Visual differentiation
 * - **3 Size Options**: Density control
 * - **Responsive Wrapper**: Mobile optimization
 * - **Cell Alignment**: Left, center, right
 * - **Cell Variants**: Default, numeric, highlight
 * - **Striped Rows**: Better readability
 * - **Hover States**: Interactive feedback
 * - **Markdown Support**: Auto-processing
 * - **Caption Positioning**: Top or bottom
 * - **Theme Integration**: Full color system
 * 
 * @variant-specifications
 * ```
 * default:
 *   - Minimal styling
 *   - Clean appearance
 *   - Focus on content
 * 
 * striped:
 *   - Alternating row colors
 *   - Improved readability
 *   - bg-secondary/30 stripes
 * 
 * bordered:
 *   - Full border grid
 *   - Clear cell separation
 *   - accent-primary/20 borders
 * 
 * terminal:
 *   - Monospace font
 *   - Code/data display
 *   - Technical appearance
 * ```
 * 
 * @size-specifications
 * ```
 * sm:  Compact padding, smaller text
 * md:  Standard padding (p-4), regular text
 * lg:  Generous padding, larger text
 * ```
 * 
 * @cell-specifications
 * ```
 * Alignment:
 *   - left: Default, text content
 *   - center: Centered content
 *   - right: Numbers, actions
 * 
 * Variants:
 *   - default: Regular text
 *   - numeric: Monospace, tabular
 *   - highlight: Accent color, bold
 * ```
 * 
 * @accessibility
 * - **Semantic HTML**: Proper table structure
 * - **Caption**: Describes table purpose
 * - **Headers**: th elements with scope
 * - **Responsive**: Horizontal scroll preserves layout
 * - **Focus States**: Visible focus indicators
 * - **Screen Readers**: Proper table navigation
 * 
 * @performance
 * - **Component Composition**: Minimal overhead
 * - **Conditional Rendering**: Responsive wrapper only when needed
 * - **CSS Classes**: Tailwind JIT compilation
 * - **React.forwardRef**: Ref forwarding for all components
 * 
 * @markdown-integration
 * The MarkdownTable component automatically:
 * - Detects HTML table elements
 * - Maps to styled components
 * - Applies striped variant
 * - Adds responsive wrapper
 * - Maintains semantic structure
 * 
 * @dos
 * - Use semantic table structure
 * - Include table captions for context
 * - Apply appropriate cell variants
 * - Test responsive behavior
 * - Use striped for better readability
 * 
 * @donts
 * - Don't use tables for layout
 * - Don't skip table headers
 * - Don't nest tables unnecessarily
 * - Don't override responsive wrapper
 * - Don't mix incompatible variants
 * 
 * @example
 * ```tsx
 * // Data table with full features
 * <Table variant="striped" size="md" responsive>
 *   <TableCaption>Monthly Revenue Report</TableCaption>
 *   <TableHeader>
 *     <TableRow>
 *       <TableHead>Month</TableHead>
 *       <TableHead align="right">Revenue</TableHead>
 *       <TableHead align="right">Growth</TableHead>
 *     </TableRow>
 *   </TableHeader>
 *   <TableBody>
 *     <TableRow>
 *       <TableCell>January</TableCell>
 *       <TableCell align="right" variant="numeric">$10,000</TableCell>
 *       <TableCell align="right" variant="highlight">+15%</TableCell>
 *     </TableRow>
 *     <TableRow>
 *       <TableCell>February</TableCell>
 *       <TableCell align="right" variant="numeric">$12,000</TableCell>
 *       <TableCell align="right" variant="highlight">+20%</TableCell>
 *     </TableRow>
 *   </TableBody>
 *   <TableFooter>
 *     <TableRow>
 *       <TableCell>Total</TableCell>
 *       <TableCell align="right" variant="numeric">$22,000</TableCell>
 *       <TableCell align="right" variant="highlight">+17.5%</TableCell>
 *     </TableRow>
 *   </TableFooter>
 * </Table>
 * 
 * // Markdown table processing
 * <MarkdownTable>
 *   <table>
 *     <thead>
 *       <tr>
 *         <th>Feature</th>
 *         <th>Status</th>
 *       </tr>
 *     </thead>
 *     <tbody>
 *       <tr>
 *         <td>Dark Mode</td>
 *         <td>✓ Complete</td>
 *       </tr>
 *     </tbody>
 *   </table>
 * </MarkdownTable>
 * 
 * // Terminal style for code/logs
 * <Table variant="terminal" size="sm">
 *   <TableBody>
 *     <TableRow>
 *       <TableCell variant="numeric">2024-01-15 10:30:45</TableCell>
 *       <TableCell>INFO</TableCell>
 *       <TableCell>Server started</TableCell>
 *     </TableRow>
 *   </TableBody>
 * </Table>
 * ```
 * 
 * @see {@link file://./USE-CASE.md#content-components} - Content components spec
 * @see {@link file://./CMS.md#table-fields} - CMS table configuration
 * @see {@link file://./TextArea.tsx} - Prose content container
 * @see {@link file://../article/ArticleContent.tsx} - Usage in articles
 * @see {@link https://www.w3.org/WAI/tutorials/tables/} - Accessible tables
 * 
 * @since 1.0.0
 */

import * as React from 'react'
import { cn } from '@/lib/utils'

/**
 * @interface TableProps
 * @description Props for main Table component
 * 
 * Extends native table element props with additional styling
 * and behavior options for consistent table rendering.
 * 
 * @extends {React.HTMLAttributes<HTMLTableElement>} - Native table props
 * 
 * @property {'default' | 'striped' | 'bordered' | 'terminal'} [variant='default'] - Visual style
 * Controls the overall appearance of the table:
 * - 'default': Minimal styling
 * - 'striped': Alternating row backgrounds
 * - 'bordered': Full border grid
 * - 'terminal': Monospace font for technical data
 * 
 * @property {'sm' | 'md' | 'lg'} [size='md'] - Table density
 * Controls padding and text size:
 * - 'sm': Compact for dense data
 * - 'md': Standard spacing
 * - 'lg': Generous padding
 * 
 * @property {boolean} [responsive=true] - Enable responsive wrapper
 * Wraps table in horizontal scroll container for mobile.
 * 
 * @example
 * ```tsx
 * const props: TableProps = {
 *   variant: 'striped',
 *   size: 'md',
 *   responsive: true,
 *   className: 'my-4'
 * }
 * ```
 */
interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  /** Visual style variant */
  variant?: 'default' | 'striped' | 'bordered' | 'terminal'
  /** Table size/density */
  size?: 'sm' | 'md' | 'lg'
  /** Enable responsive horizontal scroll */
  responsive?: boolean
}

/**
 * Table component - Main table container
 * 
 * Primary table container that provides variant styling and optional
 * responsive wrapper. Forms the foundation of the table component system.
 * 
 * @component
 * @param {TableProps} props - Component props
 * @param {'default' | 'striped' | 'bordered' | 'terminal'} [props.variant='default'] - Style variant
 * @param {'sm' | 'md' | 'lg'} [props.size='md'] - Size/density
 * @param {boolean} [props.responsive=true] - Enable responsive wrapper
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.Ref} ref - Forwarded ref for table element
 * 
 * @returns {JSX.Element} Table element with:
 * - Variant-based styling
 * - Optional responsive wrapper
 * - Theme-aware colors
 * - Full width by default
 * 
 * @remarks
 * The responsive wrapper adds horizontal scroll on small screens,
 * preserving the table layout instead of stacking or hiding columns.
 * The terminal variant applies monospace font for technical data.
 * 
 * @example
 * ```tsx
 * // Responsive striped table
 * <Table variant="striped" responsive>
 *   <TableHeader>...</TableHeader>
 *   <TableBody>...</TableBody>
 * </Table>
 * ```
 */
const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, variant = 'default', size = 'md', responsive = true, ...props }, ref) => {
    const table = (
      <table
        ref={ref}
        className={cn(
          'w-full caption-bottom text-sm',
          'border-collapse',
          variant === 'bordered' && 'border border-accent-primary/20',
          variant === 'terminal' && 'font-mono',
          className
        )}
        {...props}
      />
    )

    if (responsive) {
      return (
        <div className="w-full overflow-auto">
          {table}
        </div>
      )
    }

    return table
  }
)
Table.displayName = 'Table'

/**
 * @interface TableHeaderProps
 * @description Props for TableHeader component
 * @extends {React.HTMLAttributes<HTMLTableSectionElement>} - Native thead props
 */
type TableHeaderProps = React.HTMLAttributes<HTMLTableSectionElement>

/**
 * TableHeader component - Table header section
 * 
 * Wraps header rows with consistent styling including accent background
 * and bottom border. Maps to HTML thead element.
 * 
 * @component
 * @param {TableHeaderProps} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.Ref} ref - Forwarded ref
 * 
 * @returns {JSX.Element} Styled thead element
 */
const TableHeader = React.forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ className, ...props }, ref) => (
    <thead 
      ref={ref} 
      className={cn(
        'border-b-2 border-accent-primary/30',
        'bg-accent-primary/5',
        className
      )} 
      {...props} 
    />
  )
)
TableHeader.displayName = 'TableHeader'

/**
 * @interface TableBodyProps
 * @description Props for TableBody component
 * 
 * @extends {React.HTMLAttributes<HTMLTableSectionElement>} - Native tbody props
 * 
 * @property {boolean} [striped] - Enable row striping
 * Applies alternating background colors to even rows.
 */
interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  /** Enable alternating row backgrounds */
  striped?: boolean
}

/**
 * TableBody component - Table body section
 * 
 * Contains data rows with optional striping for improved readability.
 * Maps to HTML tbody element.
 * 
 * @component
 * @param {TableBodyProps} props - Component props
 * @param {boolean} [props.striped] - Enable row striping
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.Ref} ref - Forwarded ref
 * 
 * @returns {JSX.Element} Styled tbody element
 */
const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, striped, ...props }, ref) => (
    <tbody
      ref={ref}
      className={cn(
        '[&_tr:last-child]:border-0',
        striped && '[&_tr:nth-child(even)]:bg-bg-secondary/30',
        className
      )}
      {...props}
    />
  )
)
TableBody.displayName = 'TableBody'

type TableFooterProps = React.HTMLAttributes<HTMLTableSectionElement>

const TableFooter = React.forwardRef<HTMLTableSectionElement, TableFooterProps>(
  ({ className, ...props }, ref) => (
    <tfoot
      ref={ref}
      className={cn(
        'border-t-2 border-accent-primary/30',
        'bg-accent-primary/5',
        'font-medium',
        className
      )}
      {...props}
    />
  )
)
TableFooter.displayName = 'TableFooter'

/**
 * @interface TableRowProps
 * @description Props for TableRow component
 * 
 * @extends {React.HTMLAttributes<HTMLTableRowElement>} - Native tr props
 * 
 * @property {boolean} [hoverable=true] - Enable hover state
 * Adds background color change on hover for better interactivity.
 */
interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  /** Enable hover background change */
  hoverable?: boolean
}

/**
 * TableRow component - Table row
 * 
 * Individual table row with hover states and border styling.
 * Maps to HTML tr element.
 * 
 * @component
 * @param {TableRowProps} props - Component props
 * @param {boolean} [props.hoverable=true] - Enable hover state
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.Ref} ref - Forwarded ref
 * 
 * @returns {JSX.Element} Styled tr element
 */
const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, hoverable = true, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(
        'border-b border-accent-primary/10',
        'transition-colors',
        hoverable && 'hover:bg-accent-primary/5',
        className
      )}
      {...props}
    />
  )
)
TableRow.displayName = 'TableRow'

/**
 * @interface TableHeadProps
 * @description Props for TableHead component (header cell)
 * 
 * @extends {React.ThHTMLAttributes<HTMLTableCellElement>} - Native th props
 * 
 * @property {'left' | 'center' | 'right'} [align='left'] - Text alignment
 * Controls horizontal alignment of header content.
 */
interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  /** Text alignment within header cell */
  align?: 'left' | 'center' | 'right'
}

/**
 * TableHead component - Table header cell
 * 
 * Header cell with uppercase styling and accent color.
 * Maps to HTML th element.
 * 
 * @component
 * @param {TableHeadProps} props - Component props
 * @param {'left' | 'center' | 'right'} [props.align='left'] - Text alignment
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.Ref} ref - Forwarded ref
 * 
 * @returns {JSX.Element} Styled th element with font-display
 */
const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, align = 'left', ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        'h-10 px-4 text-left align-middle',
        'font-display uppercase tracking-wide',
        'text-accent-primary',
        align === 'center' && 'text-center',
        align === 'right' && 'text-right',
        className
      )}
      {...props}
    />
  )
)
TableHead.displayName = 'TableHead'

/**
 * @interface TableCellProps
 * @description Props for TableCell component (data cell)
 * 
 * @extends {React.TdHTMLAttributes<HTMLTableCellElement>} - Native td props
 * 
 * @property {'left' | 'center' | 'right'} [align='left'] - Text alignment
 * Controls horizontal alignment of cell content.
 * 
 * @property {'default' | 'numeric' | 'highlight'} [variant='default'] - Cell style
 * - 'default': Regular text styling
 * - 'numeric': Monospace font with tabular numbers
 * - 'highlight': Accent color with bold text
 */
interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  /** Text alignment within cell */
  align?: 'left' | 'center' | 'right'
  /** Cell content style variant */
  variant?: 'default' | 'numeric' | 'highlight'
}

/**
 * TableCell component - Table data cell
 * 
 * Data cell with alignment and variant options for different content types.
 * Maps to HTML td element.
 * 
 * @component
 * @param {TableCellProps} props - Component props
 * @param {'left' | 'center' | 'right'} [props.align='left'] - Text alignment
 * @param {'default' | 'numeric' | 'highlight'} [props.variant='default'] - Cell variant
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.Ref} ref - Forwarded ref
 * 
 * @returns {JSX.Element} Styled td element
 */
const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, align = 'left', variant = 'default', ...props }, ref) => (
    <td
      ref={ref}
      className={cn(
        'p-4 align-middle',
        'text-text-secondary',
        align === 'center' && 'text-center',
        align === 'right' && 'text-right',
        variant === 'numeric' && 'font-mono tabular-nums',
        variant === 'highlight' && 'font-semibold text-accent-primary',
        className
      )}
      {...props}
    />
  )
)
TableCell.displayName = 'TableCell'

/**
 * @interface TableCaptionProps
 * @description Props for TableCaption component
 * 
 * @extends {React.HTMLAttributes<HTMLTableCaptionElement>} - Native caption props
 * 
 * @property {'top' | 'bottom'} [position='bottom'] - Caption position
 * Controls whether caption appears above or below the table.
 */
interface TableCaptionProps extends React.HTMLAttributes<HTMLTableCaptionElement> {
  /** Position of caption relative to table */
  position?: 'top' | 'bottom'
}

/**
 * TableCaption component - Table caption
 * 
 * Provides accessible description of table purpose and content.
 * Maps to HTML caption element.
 * 
 * @component
 * @param {TableCaptionProps} props - Component props
 * @param {'top' | 'bottom'} [props.position='bottom'] - Caption position
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.Ref} ref - Forwarded ref
 * 
 * @returns {JSX.Element} Styled caption element
 */
const TableCaption = React.forwardRef<HTMLTableCaptionElement, TableCaptionProps>(
  ({ className, position = 'bottom', ...props }, ref) => (
    <caption
      ref={ref}
      className={cn(
        'mt-4 text-sm text-text-tertiary',
        position === 'top' && 'caption-top mb-4 mt-0',
        className
      )}
      {...props}
    />
  )
)
TableCaption.displayName = 'TableCaption'

/**
 * MarkdownTable component - Markdown table processor
 * 
 * Convenience wrapper that automatically maps markdown-generated HTML table
 * elements to styled table components. Applies striped variant and responsive
 * wrapper by default for optimal readability.
 * 
 * @component
 * @param {{ children: React.ReactNode }} props - Component props
 * @param {React.ReactNode} props.children - Markdown-generated table HTML
 * 
 * @returns {JSX.Element} Processed table with styled components
 * 
 * @remarks
 * This component recursively processes the table HTML tree, replacing:
 * - <table> → <Table variant="striped" responsive>
 * - <thead> → <TableHeader>
 * - <tbody> → <TableBody striped>
 * - <tr> → <TableRow>
 * - <th> → <TableHead>
 * - <td> → <TableCell>
 * 
 * @example
 * ```tsx
 * // Process markdown table
 * <MarkdownTable>
 *   {markdownToHTML(tableMarkdown)}
 * </MarkdownTable>
 * ```
 */
export const MarkdownTable: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  /**
   * Recursively process React elements to map HTML table elements
   * to styled components
   * 
   * @param {React.ReactNode} element - Element to process
   * @returns {React.ReactNode} Processed element with styled components
   */
  const processElement = (element: React.ReactNode): React.ReactNode => {
    if (!React.isValidElement(element)) return element

    const { type, props } = element

    if (type === 'table') {
      return <Table variant="striped" responsive>{props.children}</Table>
    }
    if (type === 'thead') {
      return <TableHeader>{React.Children.map(props.children, processElement)}</TableHeader>
    }
    if (type === 'tbody') {
      return <TableBody striped>{React.Children.map(props.children, processElement)}</TableBody>
    }
    if (type === 'tr') {
      return <TableRow>{React.Children.map(props.children, processElement)}</TableRow>
    }
    if (type === 'th') {
      return <TableHead>{props.children}</TableHead>
    }
    if (type === 'td') {
      return <TableCell>{props.children}</TableCell>
    }

    return React.cloneElement(element, {
      ...props,
      children: React.Children.map(props.children, processElement)
    })
  }

  return <>{React.Children.map(children, processElement)}</>
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption
}