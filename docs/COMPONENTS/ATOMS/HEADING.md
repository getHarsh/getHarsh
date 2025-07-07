# Atom: HEADING

## Purpose

The HEADING atom provides semantic HTML headings (H1-H6) with automatic hierarchy management, Context Engine integration, and optional anchor links for navigation.

## Context Engine Integration

```javascript
// Automatically receives from Context Engine:
{
  semantics: {
    documentOutline: 'auto',      // Heading hierarchy management
    contentDepth: 3,              // Maximum heading levels
    anchorLinks: true             // Auto-generate anchors
  },
  seo: {
    structuredData: true,         // Schema.org markup
    keywordDensity: 'balanced'    // SEO optimization
  },
  accessibility: {
    skipLinks: true,              // Skip navigation support
    ariaLabels: true              // Enhanced labeling
  }
}
```

## Multi-Layer Inheritance

```
Context Engine
    ↓
Core Systems (SEO.md for structured data, ARIA.md for landmarks)
    ↓
Theme System (typography scales, spacing)
    ↓
HEADING Atom
    ↓
Molecules (card titles, section headers)
    ↓
Organisms (article headers, hero titles)
```

## Implementation

### Liquid Template

```liquid
<!-- atoms/heading.html -->
{%- comment -%}
  HEADING Atom - Semantic headings with hierarchy management
  
  Parameters:
  - text (required): Heading text
  - level: 1-6 (required) - semantic level
  - class: Additional CSS classes
  - id: Element ID for anchoring
  - icon: Optional icon name
  - visualLevel: Override visual appearance while maintaining semantics
{%- endcomment -%}

{% include components/context-engine.html %}

{%- assign visual_level = include.visualLevel | default: include.level -%}

<h{{ include.level }} 
  class="atom-heading atom-heading--{{ visual_level }}{% if include.class %} {{ include.class }}{% endif %}"
  {% if include.id %}id="{{ include.id }}"{% endif %}
  data-component="atom-heading"
  data-level="{{ include.level }}"
  data-visual-level="{{ visual_level }}">
  
  {% if include.icon %}
    {% include atoms/icon.html 
       name=include.icon 
       size="sm" 
       decorative=true
       class="atom-heading__icon" %}
  {% endif %}
  
  <span class="atom-heading__text">{{ include.text }}</span>
  
  {% if include.id and universal_context.semantics.anchorLinks %}
    <a href="#{{ include.id }}" 
       class="atom-heading__anchor" 
       aria-label="Link to {{ include.text }}">
      {% include atoms/icon.html 
         name="link" 
         size="xs" 
         decorative=true %}
    </a>
  {% endif %}
</h{{ include.level }}>
```

### SCSS Structure

```scss
// atoms/_heading.scss
.atom-heading {
  // Structure only - visual styles from theme
  display: block;
  position: relative;
  
  // Visual level sizing (CSS variables from theme)
  &--1 { --heading-scale: var(--h1-scale, 2.5); }
  &--2 { --heading-scale: var(--h2-scale, 2); }
  &--3 { --heading-scale: var(--h3-scale, 1.5); }
  &--4 { --heading-scale: var(--h4-scale, 1.25); }
  &--5 { --heading-scale: var(--h5-scale, 1.1); }
  &--6 { --heading-scale: var(--h6-scale, 1); }
  
  // Apply scale
  font-size: calc(var(--base-font-size) * var(--heading-scale));
  
  // Icon positioning
  &__icon {
    display: inline-flex;
    vertical-align: middle;
    margin-inline-end: var(--space-xs);
  }
  
  // Anchor link (hidden by default)
  &__anchor {
    display: inline-flex;
    margin-inline-start: var(--space-xs);
    opacity: 0;
    transition: opacity var(--transition-fast);
    
    // Show on hover/focus
    .atom-heading:hover &,
    .atom-heading:focus-within & {
      opacity: 1;
    }
  }
  
  // Responsive adjustments from system
  @include mobile {
    --heading-scale: calc(var(--heading-scale) * 0.85);
  }
}
```

### JavaScript Enhancement

```javascript
// atoms/heading-enhancer.js
export class HeadingEnhancer {
  static enhance(element) {
    const context = window.universalContext;
    const level = element.dataset.level;
    
    // Auto-generate ID if missing
    if (!element.id && context.semantics.anchorLinks) {
      element.id = this.generateId(element.textContent);
      this.addAnchorLink(element);
    }
    
    // Add to document outline for navigation
    if (context.accessibility.skipLinks) {
      this.registerInOutline(element, level);
    }
    
    // SEO structured data
    if (context.seo.structuredData) {
      this.addStructuredData(element, level);
    }
  }
  
  static generateId(text) {
    return text.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }
  
  static addAnchorLink(element) {
    const anchor = document.createElement('a');
    anchor.href = `#${element.id}`;
    anchor.className = 'atom-heading__anchor';
    anchor.setAttribute('aria-label', `Link to ${element.textContent}`);
    anchor.innerHTML = '<svg>...</svg>'; // Link icon
    element.appendChild(anchor);
  }
  
  static registerInOutline(element, level) {
    // Register with table of contents generator
    window.documentOutline?.register({
      element,
      level,
      text: element.textContent,
      id: element.id
    });
  }
}
```

## Usage Examples

### In Molecules

```liquid
<!-- molecules/card.html -->
<article class="molecule-card">
  {% include atoms/heading.html 
     text=include.title
     level=3
     class="molecule-card__title" %}
</article>

<!-- molecules/section-header.html -->
<header class="molecule-section-header">
  {% include atoms/heading.html 
     text=include.title
     level=2
     icon="star"
     id=include.id %}
</header>
```

### Direct Usage

```liquid
<!-- Page title -->
{% include atoms/heading.html 
   text=page.title
   level=1
   id="page-title" %}

<!-- Section with visual override -->
{% include atoms/heading.html 
   text="Technical Details"
   level=3
   visualLevel=2
   icon="code" %}

<!-- Simple subsection -->
{% include atoms/heading.html 
   text="Prerequisites"
   level=3 %}
```

## Semantic vs Visual Levels

The atom supports semantic HTML structure while allowing visual flexibility:

```liquid
<!-- Semantic h3, looks like h2 -->
{% include atoms/heading.html 
   text="Visually Prominent"
   level=3
   visualLevel=2 %}
```

This maintains proper document outline while achieving desired visual hierarchy.

## Accessibility Features

- Proper heading hierarchy for screen readers
- Automatic anchor link generation
- Keyboard-accessible anchor links
- ARIA labels for anchor links
- Skip navigation support
- Focus indicators on interactive elements

## Performance Considerations

- Anchor links generated on-demand
- No JavaScript required for basic functionality
- Progressive enhancement for advanced features
- Efficient ID generation algorithm
- Minimal DOM manipulation

## SEO Benefits

- Semantic HTML structure
- Auto-generated IDs for deep linking
- Structured data support
- Proper document outline
- Search engine friendly anchors

## Testing Checklist

- [ ] All heading levels (1-6) render correctly
- [ ] Visual level overrides work properly
- [ ] Anchor links generate and function
- [ ] Icons display correctly when provided
- [ ] Responsive scaling applies properly
- [ ] Screen readers announce headings correctly
- [ ] Keyboard navigation works for anchors
- [ ] Document outline builds correctly
- [ ] No visual styles leak from theme