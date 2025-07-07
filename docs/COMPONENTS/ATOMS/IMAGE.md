# Atom: IMAGE

## Purpose

The IMAGE atom provides responsive, performant image display with Context Engine-provided lazy loading settings, multiple format support, and Context Engine optimization for different device capabilities.

## Context Engine Integration

```javascript
// Automatically receives from Context Engine:
{
  performance: {
    mode: 'balanced',             // aggressive, balanced, quality
    lazyLoadOffset: '50px',       // Intersection observer margin
    webpSupport: true,            // Browser capability
    adaptiveLoading: true         // Network-aware loading
  },
  viewport: {
    devicePixelRatio: 2,          // For srcset generation
    connectionSpeed: '4g',        // Network quality
    saveData: false               // Data saver mode
  },
  accessibility: {
    announceImages: true,         // Screen reader behavior
    altTextRequired: true         // Enforce alt text
  }
}
```

## Multi-Layer Inheritance

```
Context Engine
    ↓
Core Systems (PERFORMANCE.md for loading strategy)
    ↓
Theme System (aspect ratios, borders)
    ↓
IMAGE Atom
    ↓
Molecules (cards, avatars, thumbnails)
    ↓
Organisms (hero images, galleries, articles)
```

## Implementation

### Liquid Template

```liquid
<!-- atoms/image.html -->
{%- comment -%}
  IMAGE Atom - Responsive performant images
  
  Parameters:
  - src (required): Image source URL
  - alt (required): Alternative text
  - width: Image width (recommended for CLS)
  - height: Image height (recommended for CLS)
  - loading: lazy (default), eager
  - sizes: Responsive sizes attribute
  - srcset: Responsive srcset (auto-generated if not provided)
  - aspectRatio: Aspect ratio class (16-9, 4-3, 1-1, etc)
  - objectFit: cover (default), contain, fill
  - class: Additional CSS classes
  - decorative: Boolean - marks as decorative
  - caption: Image caption text
{%- endcomment -%}

{% include components/context-engine.html %}

{%- assign loading = include.loading | default: 'lazy' -%}
{%- assign fit = include.objectFit | default: 'cover' -%}

{%- comment -%} Auto-generate srcset if not provided {%- endcomment -%}
{%- unless include.srcset -%}
  {%- assign base_url = include.src | split: '.' | first -%}
  {%- assign extension = include.src | split: '.' | last -%}
  {%- capture srcset -%}
    {{ base_url }}-320w.{{ extension }} 320w,
    {{ base_url }}-640w.{{ extension }} 640w,
    {{ base_url }}-1024w.{{ extension }} 1024w,
    {{ base_url }}-1440w.{{ extension }} 1440w
  {%- endcapture -%}
{%- else -%}
  {%- assign srcset = include.srcset -%}
{%- endunless -%}

{%- comment -%} Network-aware loading {%- endcomment -%}
{%- if universal_context.viewport.saveData -%}
  {%- assign loading = 'lazy' -%}
  {%- assign srcset = nil -%}
{%- endif -%}

<figure class="atom-image-wrapper{% if include.aspectRatio %} atom-image-wrapper--{{ include.aspectRatio }}{% endif %}{% if include.class %} {{ include.class }}{% endif %}"
  data-component="atom-image-wrapper">
  
  <img 
    src="{{ include.src }}"
    alt="{{ include.alt }}"
    {% if include.width %}width="{{ include.width }}"{% endif %}
    {% if include.height %}height="{{ include.height }}"{% endif %}
    loading="{{ loading }}"
    {% if include.sizes %}sizes="{{ include.sizes }}"{% endif %}
    {% if srcset %}srcset="{{ srcset }}"{% endif %}
    class="atom-image atom-image--{{ fit }}"
    {% if include.decorative %}role="presentation"{% endif %}
    data-component="atom-image"
    data-performance-mode="{{ universal_context.performance.mode }}">
  
  {% if universal_context.performance.adaptiveLoading %}
    <noscript>
      <img src="{{ include.src }}" alt="{{ include.alt }}" class="atom-image">
    </noscript>
  {% endif %}
  
  {% if include.caption %}
    <figcaption class="atom-image__caption">
      {% include atoms/text.html 
         content=include.caption
         variant="caption"
         element="p" %}
    </figcaption>
  {% endif %}
</figure>
```

### SCSS Structure

```scss
// atoms/_image.scss
.atom-image-wrapper {
  // Wrapper for aspect ratio and loading states
  display: block;
  position: relative;
  overflow: hidden;
  
  // Aspect ratio variants
  &--16-9 { aspect-ratio: 16 / 9; }
  &--4-3 { aspect-ratio: 4 / 3; }
  &--1-1 { aspect-ratio: 1 / 1; }
  &--21-9 { aspect-ratio: 21 / 9; }
  
  // Loading skeleton
  &[data-loading="true"] {
    background: var(--color-skeleton);
    
    @keyframes skeleton-pulse {
      0% { opacity: 1; }
      50% { opacity: 0.7; }
      100% { opacity: 1; }
    }
    
    animation: skeleton-pulse 1.5s ease-in-out infinite;
  }
}

.atom-image {
  // Base image styles
  display: block;
  max-width: 100%;
  height: auto;
  
  // Object fit variants
  &--cover { object-fit: cover; }
  &--contain { object-fit: contain; }
  &--fill { object-fit: fill; }
  
  // When in aspect ratio container
  .atom-image-wrapper--16-9 &,
  .atom-image-wrapper--4-3 &,
  .atom-image-wrapper--1-1 &,
  .atom-image-wrapper--21-9 & {
    width: 100%;
    height: 100%;
  }
  
  // Loading fade-in
  opacity: 0;
  transition: opacity var(--transition-normal);
  
  &[data-loaded="true"] {
    opacity: 1;
  }
  
  // Caption spacing
  &__caption {
    margin-top: var(--space-xs);
    text-align: center;
  }
}
```

### JavaScript Enhancement

```javascript
// atoms/image-enhancer.js
export class ImageEnhancer {
  static enhance(element) {
    const context = window.universalContext;
    const wrapper = element.closest('.atom-image-wrapper');
    
    // Set up lazy loading
    if (element.loading === 'lazy') {
      this.setupLazyLoading(element, wrapper, context);
    }
    
    // WebP support with fallback
    if (context.performance.webpSupport) {
      this.addWebPSource(element);
    }
    
    // Network-aware quality
    if (context.performance.adaptiveLoading) {
      this.adjustQuality(element, context);
    }
    
    // Loading state
    wrapper?.setAttribute('data-loading', 'true');
    element.addEventListener('load', () => {
      element.setAttribute('data-loaded', 'true');
      wrapper?.removeAttribute('data-loading');
    });
  }
  
  static setupLazyLoading(element, wrapper, context) {
    const options = {
      rootMargin: context.performance.lazyLoadOffset || '50px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.loadImage(element);
          observer.unobserve(element);
        }
      });
    }, options);
    
    observer.observe(element);
  }
  
  static adjustQuality(element, context) {
    const connection = context.viewport.connectionSpeed;
    
    if (connection === '2g' || connection === 'slow-2g') {
      // Load smaller image
      const src = element.src.replace(/(-\d+w)?\./, '-640w.');
      element.src = src;
      element.removeAttribute('srcset');
    }
  }
  
  static addWebPSource(element) {
    const picture = document.createElement('picture');
    const webpSource = document.createElement('source');
    
    webpSource.type = 'image/webp';
    webpSource.srcset = element.srcset?.replace(/\.(jpg|png)/g, '.webp');
    
    element.parentNode.insertBefore(picture, element);
    picture.appendChild(webpSource);
    picture.appendChild(element);
  }
}
```

## Usage Examples

### In Molecules

```liquid
<!-- molecules/card.html -->
<article class="molecule-card">
  {% include atoms/image.html 
     src="/assets/images/project-thumbnail.jpg"
     alt="Project screenshot showing dashboard"
     aspectRatio="16-9"
     sizes="(min-width: 768px) 33vw, 100vw" %}
</article>

<!-- molecules/avatar.html -->
<div class="molecule-avatar">
  {% include atoms/image.html 
     src=include.avatar
     alt=include.name
     aspectRatio="1-1"
     objectFit="cover"
     loading="eager" %}
</div>
```

### Direct Usage

```liquid
<!-- Hero image -->
{% include atoms/image.html 
   src="/assets/images/hero-background.jpg"
   alt="Modern office workspace"
   aspectRatio="21-9"
   loading="eager"
   sizes="100vw" %}

<!-- Article image with caption -->
{% include atoms/image.html 
   src="/assets/images/diagram.png"
   alt="System architecture diagram"
   width="800"
   height="600"
   caption="Figure 1: Microservices architecture"
   sizes="(min-width: 768px) 66vw, 100vw" %}

<!-- Decorative image -->
{% include atoms/image.html 
   src="/assets/images/pattern.svg"
   alt=""
   decorative=true
   class="background-pattern" %}
```

## Responsive Images

The atom receives responsive srcset configuration from Context Engine:

```liquid
<!-- Input -->
{% include atoms/image.html 
   src="/assets/images/photo.jpg"
   alt="Description" %}

<!-- Output -->
<img 
  src="/assets/images/photo.jpg"
  srcset="/assets/images/photo-320w.jpg 320w,
          /assets/images/photo-640w.jpg 640w,
          /assets/images/photo-1024w.jpg 1024w,
          /assets/images/photo-1440w.jpg 1440w"
  alt="Description">
```

## Performance Features

- Automatic lazy loading with Intersection Observer
- Network-aware quality adjustment
- WebP format with fallback
- Responsive images with srcset
- Aspect ratio to prevent layout shift
- Loading skeleton animation
- Progressive enhancement

## Accessibility

- Required alt text parameter
- Decorative image support
- Figure/figcaption semantic structure
- Screen reader friendly markup
- Proper role attributes

## Testing Checklist

- [ ] Images load at correct sizes
- [ ] Lazy loading works properly
- [ ] Network adaptation functions
- [ ] WebP fallback works
- [ ] Aspect ratios prevent layout shift
- [ ] Loading states display correctly
- [ ] Alt text properly announced
- [ ] Responsive images load correctly
- [ ] Caption displays when provided