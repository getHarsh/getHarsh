/**
 * @fileoverview TextArea - Prose-optimized text container for long-form content
 * @module components/content/TextArea
 * 
 * @description
 * A versatile text container component optimized for long-form content with
 * multiple styling variants. Provides consistent typography, theme-aware colors,
 * and proper prose formatting for markdown-rendered content.
 * 
 * This component serves as the primary container for article content, documentation,
 * and any long-form text in the getHarsh ecosystem. It applies sophisticated
 * typography rules through Tailwind's typography plugin with custom overrides
 * that maintain the retrofuturistic design language.
 * 
 * @architecture
 * ```
 * TextArea Component
 *       ├── Variant System
 *       │     ├── default (basic text)
 *       │     ├── prose (Tailwind typography)
 *       │     └── compact (dense content)
 *       ├── Prose Overrides
 *       │     ├── Headings styling
 *       │     ├── Paragraph spacing
 *       │     ├── Link colors
 *       │     ├── List markers
 *       │     ├── Blockquotes
 *       │     ├── Code blocks
 *       │     └── HR elements
 *       └── Theme Integration
 *             ├── Color variables
 *             ├── Font families
 *             └── Spacing system
 * 
 * Content Flow:
 * Markdown → HTML → TextArea → Styled prose → Display
 * ```
 * 
 * @proto-integration
 * Maps to content and typography configurations:
 * 
 * - **TypographyConfig** (typography.proto)
 *   - `prose.base_size`: 'prose-lg' default
 *   - `prose.max_width`: 'max-w-none' for flexibility
 *   - `prose.heading_style`: uppercase with tracking
 *   - `prose.link_decoration`: no underline
 * 
 * - **ContentConfig** (content.proto)
 *   - `text_container.default_variant`: 'prose'
 *   - `text_container.compact_mode`: 'text-sm'
 *   - `text_container.spacing`: 'mb-6' paragraphs
 * 
 * - **ThemeConfig** (theme.proto)
 *   - `text_colors.primary`: text-text-primary
 *   - `text_colors.secondary`: text-text-secondary
 *   - `accent_colors.primary`: accent-primary
 *   - `background.tertiary`: bg-tertiary for code
 * 
 * - **AccessibilityConfig** (accessibility.proto)
 *   - `readable_line_length`: Controlled by parent
 *   - `contrast_ratios`: WCAG AA compliant
 *   - `font_sizes`: Responsive scaling
 * 
 * @hook-integration
 * While TextArea doesn't use hooks directly, parent components often use:
 * 
 * - **useConfig()**: Theme variant selection
 * - **useAccessibility()**: Font size preferences
 * - **useGTM()**: Track reading time and engagement
 * 
 * @ecosystem-integration
 * - **Used by**: ArticleContent, AboutPage, Documentation, Letters, ProjectDetails
 * - **Content Source**: Markdown from CMS or static files
 * - **Typography**: Tailwind Typography plugin with overrides
 * - **Theme**: Respects dark/light mode automatically
 * - **Responsiveness**: Font sizes scale with viewport
 * 
 * @features
 * - **3 Style Variants**: Default, prose, compact
 * - **Tailwind Typography**: Professional prose styling
 * - **Custom Overrides**: Theme-consistent styling
 * - **Heading Styles**: Uppercase with font-display
 * - **Link Styling**: Accent colors with transitions
 * - **Code Formatting**: Inline and block styles
 * - **List Markers**: Accent-colored bullets
 * - **Blockquotes**: Bordered with italics
 * - **Theme Aware**: Full dark/light support
 * - **Responsive**: Scales appropriately
 * 
 * @variant-specifications
 * ```
 * default:
 *   - text-base (1rem)
 *   - leading-relaxed (1.625)
 *   - Basic text styling
 *   - No prose enhancements
 * 
 * prose:
 *   - prose-lg (1.125rem base)
 *   - Tailwind typography
 *   - Custom overrides
 *   - Full prose features
 * 
 * compact:
 *   - text-sm (0.875rem)
 *   - leading-normal (1.5)
 *   - Dense information
 *   - Reduced spacing
 * ```
 * 
 * @prose-overrides
 * ```
 * Headings:
 *   - font-display family
 *   - uppercase transform
 *   - tracking-wide spacing
 *   - accent-primary color
 * 
 * Paragraphs:
 *   - text-primary color
 *   - mb-6 spacing
 *   - Inherit line height
 * 
 * Links:
 *   - accent-primary color
 *   - no-underline
 *   - hover:accent-secondary
 *   - transition-colors
 * 
 * Lists:
 *   - text-primary color
 *   - accent-primary markers
 *   - Standard spacing
 * 
 * Blockquotes:
 *   - border-l-accent-primary
 *   - text-secondary color
 *   - italic style
 * 
 * Code (inline):
 *   - accent-primary color
 *   - bg-tertiary background
 *   - px-1 py-0.5 padding
 *   - rounded-sharp corners
 * 
 * Code blocks:
 *   - bg-secondary background
 *   - border with accent/20
 *   - rounded-terminal style
 * ```
 * 
 * @accessibility
 * - **Line Length**: Parent controls max-width
 * - **Contrast**: WCAG AA compliant colors
 * - **Font Sizes**: Responsive scaling
 * - **Heading Hierarchy**: Semantic HTML
 * - **Link States**: Clear hover/focus
 * 
 * @performance
 * - **CSS Classes**: Tailwind JIT compilation
 * - **No JS**: Pure CSS styling
 * - **Reflow**: Minimal with fixed styles
 * - **Bundle**: Typography plugin tree-shaken
 * 
 * @seo
 * - Semantic HTML structure maintained
 * - Proper heading hierarchy
 * - Readable content formatting
 * - No layout shift
 * 
 * @dos
 * - Use prose variant for markdown content
 * - Control max-width at parent level
 * - Ensure proper heading hierarchy
 * - Test with long-form content
 * - Verify theme transitions
 * 
 * @donts
 * - Don't nest TextArea components
 * - Don't override prose classes directly
 * - Don't use for non-text content
 * - Don't forget parent max-width
 * - Don't mix variants in same context
 * 
 * @example
 * ```tsx
 * // Article content with prose
 * <article className="max-w-4xl mx-auto">
 *   <TextArea variant="prose">
 *     <h1>Article Title</h1>
 *     <p>Introduction paragraph...</p>
 *     <h2>Section Header</h2>
 *     <p>Content with <a href="#">links</a> and <code>code</code>.</p>
 *     <blockquote>
 *       Important quote from the article.
 *     </blockquote>
 *     <pre><code>
 *       const example = "code block";
 *     </code></pre>
 *   </TextArea>
 * </article>
 * 
 * // Compact variant for sidebar
 * <aside>
 *   <TextArea variant="compact">
 *     <p>Brief description text that needs less spacing.</p>
 *   </TextArea>
 * </aside>
 * 
 * // Default variant for simple text
 * <TextArea variant="default" className="mb-8">
 *   <p>Regular paragraph without prose enhancements.</p>
 * </TextArea>
 * 
 * // Documentation page
 * <div className="docs-content">
 *   <TextArea variant="prose">
 *     {parsedMarkdownContent}
 *   </TextArea>
 * </div>
 * ```
 * 
 * @see {@link file://./USE-CASE.md#content-components} - Content components spec
 * @see {@link file://./CMS.md#markdown-fields} - Markdown configuration
 * @see {@link file://./CodeBlock.tsx} - Code block component
 * @see {@link file://../article/ArticleContent.tsx} - Usage in articles
 * @see {@link https://tailwindcss.com/docs/typography-plugin} - Tailwind Typography
 * 
 * @since 1.0.0
 */

import * as React from 'react'
import { cn } from '@/lib/utils'

/**
 * @interface TextAreaProps
 * @description Props for TextArea component
 * 
 * Accepts rendered content (typically from markdown) and applies
 * consistent typography styling based on the selected variant.
 * 
 * @property {React.ReactNode} children - Content to display
 * Usually markdown-rendered HTML but can be any React content.
 * Should maintain semantic HTML structure for best results.
 * 
 * @property {'default' | 'prose' | 'compact'} [variant='prose'] - Style variant
 * Controls typography and spacing rules:
 * - 'default': Basic text styling without prose enhancements
 * - 'prose': Full Tailwind Typography with custom overrides
 * - 'compact': Reduced size and spacing for dense content
 * 
 * @property {string} [className] - Additional CSS classes
 * Applied to the container div for custom styling or spacing.
 * Common uses: 'max-w-4xl mx-auto', 'mb-8', 'px-4'.
 * 
 * @example
 * ```tsx
 * const props: TextAreaProps = {
 *   children: parsedMarkdownHTML,
 *   variant: 'prose',
 *   className: 'max-w-4xl mx-auto'
 * }
 * ```
 */
interface TextAreaProps {
  /** Content to display (usually markdown-rendered) */
  children: React.ReactNode
  /** Style variant - controls typography and spacing */
  variant?: 'default' | 'prose' | 'compact'
  /** Additional CSS classes for container */
  className?: string
}

/**
 * TextArea component - Prose-optimized text container
 * 
 * Provides consistent typography styling for long-form content with
 * support for multiple variants. Applies Tailwind Typography with
 * custom overrides to maintain the retrofuturistic design system.
 * 
 * @component
 * @param {TextAreaProps} props - Component props
 * @param {React.ReactNode} props.children - Content to display
 * @param {'default' | 'prose' | 'compact'} [props.variant='prose'] - Style variant
 * @param {string} [props.className] - Additional CSS classes
 * 
 * @returns {JSX.Element} Styled text container with:
 * - Variant-based typography rules
 * - Theme-aware color system
 * - Custom prose overrides
 * - Responsive text sizing
 * 
 * @remarks
 * The component uses Tailwind's typography plugin for the prose
 * variant, applying extensive custom overrides to ensure consistency
 * with the design system. These overrides cover:
 * - Heading styles (uppercase, font-display)
 * - Link colors and transitions
 * - Code block styling
 * - List marker colors
 * - Blockquote formatting
 * 
 * The prose variant is inverted by default (prose-invert) to work
 * with the dark theme, and max-width is set to none to allow
 * parent components to control the reading width.
 * 
 * @example
 * ```tsx
 * // In article component
 * function ArticleContent({ content }) {
 *   return (
 *     <TextArea variant="prose" className="article-content">
 *       <div dangerouslySetInnerHTML={{ __html: content }} />
 *     </TextArea>
 *   )
 * }
 * 
 * // With custom max-width
 * function DocumentationPage({ docs }) {
 *   return (
 *     <div className="max-w-3xl mx-auto">
 *       <TextArea variant="prose">
 *         {docs}
 *       </TextArea>
 *     </div>
 *   )
 * }
 * ```
 */
export const TextArea: React.FC<TextAreaProps> = ({
  children,
  variant = 'prose',
  className
}) => {
  /**
   * Variant class mappings
   * Maps variant props to Tailwind classes
   */
  const variantClasses = {
    default: 'text-base leading-relaxed',
    prose: 'prose prose-lg prose-invert max-w-none',
    compact: 'text-sm leading-normal'
  }

  return (
    <div
      className={cn(
        // Base styles
        'text-text-primary',
        
        // Variant styles
        variantClasses[variant],
        
        // Prose-specific overrides for theme consistency
        variant === 'prose' && [
          // Headings
          'prose-headings:font-display prose-headings:uppercase prose-headings:tracking-wide',
          'prose-headings:text-accent-primary',
          
          // Paragraphs
          'prose-p:text-text-primary prose-p:mb-6',
          
          // Links
          'prose-a:text-accent-primary prose-a:no-underline',
          'prose-a:hover:text-accent-secondary prose-a:transition-colors',
          
          // Strong/Bold
          'prose-strong:text-accent-primary prose-strong:font-semibold',
          
          // Lists
          'prose-ul:text-text-primary prose-ol:text-text-primary',
          'prose-li:marker:text-accent-primary',
          
          // Blockquotes
          'prose-blockquote:border-l-accent-primary prose-blockquote:text-text-secondary',
          'prose-blockquote:italic',
          
          // Code
          'prose-code:text-accent-primary prose-code:bg-bg-tertiary',
          'prose-code:px-1 prose-code:py-0.5 prose-code:rounded-sharp',
          'prose-code:before:content-none prose-code:after:content-none',
          
          // Pre (code blocks)
          'prose-pre:bg-bg-secondary prose-pre:border prose-pre:border-accent-primary/20',
          'prose-pre:rounded-terminal',
          
          // Horizontal rules
          'prose-hr:border-accent-primary/20'
        ],
        
        className
      )}
    >
      {children}
    </div>
  )
}

export default TextArea