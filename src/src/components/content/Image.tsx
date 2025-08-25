/**
 * @fileoverview Image - Responsive image component with caption support
 * @module components/content/Image
 * 
 * @description
 * A responsive image component that provides consistent image display with
 * support for captions, aspect ratios, and various object-fit modes. Includes
 * lazy loading by default and hover effects for enhanced user experience.
 * 
 * This component serves as the primary image display element throughout the
 * getHarsh ecosystem, providing consistent styling, performance optimization,
 * and accessibility features for all image content.
 * 
 * @architecture
 * ```
 * Image Component
 *       ├── <figure> (semantic container)
 *       │     ├── <div> (aspect ratio wrapper)
 *       │     │     └── <img> (actual image)
 *       │     └── <figcaption> (optional caption)
 *       └── Features
 *             ├── Aspect ratio control
 *             ├── Object fit modes
 *             ├── Lazy loading
 *             └── Hover effects
 * 
 * Rendering Flow:
 * src + alt → aspect wrapper → img element → optional caption
 * ```
 * 
 * @proto-integration
 * Maps to content and media configurations:
 * 
 * - **ImageConfig** (media.proto)
 *   - `default_aspect_ratio`: 'auto' standard
 *   - `default_object_fit`: 'cover' for most cases
 *   - `lazy_loading`: Enabled by default
 *   - `hover_effects`: Scale on hover
 * 
 * - **MediaAttachment** (content.proto)
 *   - `url`: Image source path
 *   - `alt_text`: Accessibility description
 *   - `caption`: Optional image caption
 *   - `aspect_ratio`: Display ratio
 * 
 * - **AccessibilityConfig** (accessibility.proto)
 *   - `images.require_alt`: Alt text mandatory
 *   - `images.figure_semantics`: Use figure/figcaption
 *   - `images.loading_strategy`: 'lazy' default
 * 
 * - **ThemeConfig** (theme.proto)
 *   - `border_radius`: rounded-terminal style
 *   - `transition_duration`: duration-slow for hover
 *   - `hover_scale`: 1.05 zoom factor
 * 
 * @hook-integration
 * While Image doesn't use hooks directly, parent components often use:
 * 
 * - **useGTM()**: Track image interactions
 * - **useIntersectionObserver()**: Custom lazy loading
 * - **useImageError()**: Handle broken images
 * 
 * @ecosystem-integration
 * - **Used by**: Articles, galleries, cards, hero sections, documentation
 * - **CDN**: Works with image CDN URLs
 * - **CMS**: Integrated with Decap CMS image widget
 * - **Performance**: Native lazy loading support
 * - **SEO**: Alt text for image SEO
 * 
 * @features
 * - **4 Aspect Ratios**: Square, video, portrait, auto
 * - **5 Object Fit Modes**: Contain, cover, fill, none, scale-down
 * - **Lazy Loading**: Native browser support
 * - **Captions**: Semantic figcaption
 * - **Hover Effects**: Smooth zoom transition
 * - **Rounded Corners**: Theme-aware borders
 * - **Responsive**: Fluid width sizing
 * - **Accessible**: Required alt text
 * 
 * @aspect-ratio-specifications
 * ```
 * square:   aspect-square (1:1)
 *   - Profile pictures
 *   - Thumbnails
 *   - Icons
 * 
 * video:    aspect-video (16:9)
 *   - Screenshots
 *   - Hero images
 *   - YouTube thumbnails
 * 
 * portrait: aspect-[3/4] (3:4)
 *   - Book covers
 *   - Mobile screenshots
 *   - Vertical images
 * 
 * auto:     No constraint
 *   - Natural dimensions
 *   - Variable content
 * ```
 * 
 * @object-fit-specifications
 * ```
 * contain:    Fit entire image, may show background
 * cover:      Fill container, may crop image (default)
 * fill:       Stretch to fill, may distort
 * none:       Original size, may overflow
 * scale-down: Smaller of contain or none
 * ```
 * 
 * @performance
 * - **Lazy Loading**: loading="lazy" by default
 * - **Intersection Observer**: Browser native
 * - **Hover Transform**: GPU-accelerated scale
 * - **Aspect Ratio**: CSS-based, no JS
 * 
 * @accessibility
 * - **Alt Text**: Required prop for screen readers
 * - **Figure/Figcaption**: Semantic HTML5
 * - **Loading States**: Native browser handling
 * - **Focus States**: Inherited from parent links
 * - **Caption Association**: Proper labeling
 * 
 * @seo
 * - Alt text improves image SEO
 * - Lazy loading improves page speed
 * - Proper aspect ratios prevent CLS
 * - Semantic HTML structure
 * 
 * @dos
 * - Always provide meaningful alt text
 * - Use appropriate aspect ratios
 * - Include captions for complex images
 * - Test with slow connections
 * - Optimize image files before upload
 * 
 * @donts
 * - Don't use generic alt text
 * - Don't disable lazy loading unnecessarily
 * - Don't use fill mode for photos (distorts)
 * - Don't forget mobile testing
 * - Don't use unoptimized images
 * 
 * @example
 * ```tsx
 * // Article hero image
 * <Image
 *   src="/images/ai-transformation.jpg"
 *   alt="Diagram showing AI transformation process"
 *   caption="The three stages of AI transformation"
 *   aspectRatio="video"
 * />
 * 
 * // Profile picture
 * <Image
 *   src={author.avatar}
 *   alt={`${author.name} profile picture`}
 *   aspectRatio="square"
 *   className="w-24 h-24"
 * />
 * 
 * // Screenshot with contain
 * <Image
 *   src="/screenshots/dashboard.png"
 *   alt="Dashboard showing analytics metrics"
 *   aspectRatio="video"
 *   objectFit="contain"
 *   className="bg-gray-100"
 * />
 * 
 * // Gallery image
 * <div className="grid grid-cols-3 gap-4">
 *   {images.map(img => (
 *     <Image
 *       key={img.id}
 *       src={img.url}
 *       alt={img.description}
 *       aspectRatio="square"
 *       objectFit="cover"
 *     />
 *   ))}
 * </div>
 * ```
 * 
 * @see {@link file://./USE-CASE.md#content-components} - Content spec
 * @see {@link file://./CMS.md#image-fields} - CMS configuration
 * @see {@link file://./MermaidDiagram.tsx} - Diagram component
 * @see {@link https://web.dev/lazy-loading-images/} - Lazy loading
 * 
 * @since 1.0.0
 */

import * as React from 'react'
import { cn } from '@/lib/utils'

/**
 * @interface ImageProps
 * @description Props for Image component
 * 
 * Extends native img attributes with additional controls for
 * aspect ratio, object fit, captions, and styling.
 * 
 * @extends {React.ImgHTMLAttributes<HTMLImageElement>} - Native img props
 * 
 * @property {string} src - Image source URL
 * Can be relative path, absolute URL, or CDN link.
 * Required for image display.
 * 
 * @property {string} alt - Alt text for accessibility
 * Required prop for screen reader support.
 * Should describe image content meaningfully.
 * 
 * @property {string} [caption] - Optional caption text
 * Displayed below image in figcaption element.
 * Use for image descriptions or credits.
 * 
 * @property {'square' | 'video' | 'portrait' | 'auto'} [aspectRatio='auto'] - Aspect ratio preset
 * Controls image container proportions.
 * - 'square': 1:1 ratio
 * - 'video': 16:9 ratio
 * - 'portrait': 3:4 ratio
 * - 'auto': Natural dimensions
 * 
 * @property {'contain' | 'cover' | 'fill' | 'none' | 'scale-down'} [objectFit='cover'] - Object fit mode
 * Controls how image fills its container.
 * - 'contain': Fit entire image
 * - 'cover': Fill container (may crop)
 * - 'fill': Stretch to fill
 * - 'none': Original size
 * - 'scale-down': Smaller of contain/none
 * 
 * @property {boolean} [rounded=true] - Whether to apply rounded corners
 * Uses theme's rounded-terminal style when true.
 * 
 * @property {string} [className] - Additional CSS classes
 * Applied to figure container for custom styling.
 * 
 * @example
 * ```tsx
 * const props: ImageProps = {
 *   src: '/images/hero.jpg',
 *   alt: 'Hero image showing product dashboard',
 *   caption: 'Product dashboard overview',
 *   aspectRatio: 'video',
 *   objectFit: 'cover',
 *   rounded: true,
 *   loading: 'lazy',
 *   className: 'shadow-lg'
 * }
 * ```
 */
interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** Image source URL - relative, absolute, or CDN */
  src: string
  /** Alt text for accessibility - required for screen readers */
  alt: string
  /** Optional caption text - displayed in figcaption */
  caption?: string
  /** Aspect ratio preset - controls container proportions */
  aspectRatio?: 'square' | 'video' | 'portrait' | 'auto'
  /** Object fit mode - how image fills container */
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
  /** Whether to apply rounded corners - uses theme style */
  rounded?: boolean
  /** Additional CSS classes for figure container */
  className?: string
}

/**
 * Image component - Responsive image with caption
 * 
 * Provides consistent image display with performance optimization,
 * accessibility features, and flexible styling options. Uses semantic
 * HTML5 figure/figcaption structure.
 * 
 * @component
 * @param {ImageProps} props - Component props
 * @param {string} props.src - Image source URL
 * @param {string} props.alt - Alt text (required)
 * @param {string} [props.caption] - Optional caption
 * @param {'square' | 'video' | 'portrait' | 'auto'} [props.aspectRatio='auto'] - Aspect ratio
 * @param {'contain' | 'cover' | 'fill' | 'none' | 'scale-down'} [props.objectFit='cover'] - Object fit
 * @param {boolean} [props.rounded=true] - Apply rounded corners
 * @param {string} [props.loading='lazy'] - Loading strategy
 * @param {string} [props.className] - Additional CSS classes
 * 
 * @returns {JSX.Element} Responsive image containing:
 * - Figure wrapper for semantic structure
 * - Aspect ratio container div
 * - Img element with lazy loading
 * - Optional figcaption for caption
 * - Hover zoom effect
 * 
 * @remarks
 * The component uses a wrapper div for aspect ratio
 * control, allowing consistent dimensions regardless
 * of actual image size. The hover effect provides
 * subtle zoom feedback for interactive contexts.
 * 
 * Native lazy loading is used by default for
 * performance, deferring image loads until needed.
 * 
 * @example
 * ```tsx
 * // In article content
 * function ArticleImage({ image }) {
 *   return (
 *     <Image
 *       src={image.url}
 *       alt={image.altText}
 *       caption={image.caption}
 *       aspectRatio="video"
 *       className="my-8"
 *     />
 *   )
 * }
 * 
 * // Profile image
 * function Avatar({ user }) {
 *   return (
 *     <Image
 *       src={user.avatarUrl}
 *       alt={`${user.name} profile picture`}
 *       aspectRatio="square"
 *       objectFit="cover"
 *       className="w-32 h-32"
 *     />
 *   )
 * }
 * ```
 */
export const Image: React.FC<ImageProps> = ({
  src,
  alt,
  caption,
  aspectRatio = 'auto',
  objectFit = 'cover',
  rounded = true,
  loading = 'lazy',
  className,
  ...props
}) => {
  /**
   * Aspect ratio CSS class mappings
   * Maps aspect ratio props to Tailwind classes
   */
  const aspectRatioClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]',
    auto: ''
  }

  /**
   * Object fit CSS class mappings
   * Maps object fit props to Tailwind classes
   */
  const objectFitClasses = {
    contain: 'object-contain',
    cover: 'object-cover',
    fill: 'object-fill',
    none: 'object-none',
    'scale-down': 'object-scale-down'
  }

  return (
    <figure className={cn('relative', className)}>
      <div className={cn(
        'overflow-hidden',
        aspectRatioClasses[aspectRatio],
        rounded && 'rounded-terminal'
      )}>
        <img
          src={src}
          alt={alt}
          loading={loading}
          className={cn(
            'w-full h-full',
            objectFitClasses[objectFit],
            'transition-transform duration-slow hover:scale-105'
          )}
          {...props}
        />
      </div>
      
      {caption && (
        <figcaption className="mt-2 text-sm text-text-secondary text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

export default Image