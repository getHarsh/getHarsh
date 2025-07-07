# Atom: TEXT

## Purpose

The TEXT atom is the fundamental text display unit that provides semantic awareness and Context Engine integration for all text content in the component system.

## Context Engine Integration

```javascript
// Automatically receives from Context Engine:
{
  semantics: {
    textLevel: 'p',               // Semantic importance
    readingLevel: 'intermediate',  // Content complexity
    contentType: 'technical'       // Content classification
  },
  accessibility: {
    highContrast: false,          // User preference
    reduceMotion: false,          // Animation preference
    fontSize: '100%'              // Text scaling
  },
  business: {
    contentValue: 'informational', // Business value
    engagementType: 'passive'     // Interaction type
  }
}
```

## Multi-Layer Inheritance

```
Context Engine
    ↓
Core Systems (RESPONSIVE.md, ARIA.md, SEO.md)
    ↓
Theme System (typography, colors)
    ↓
TEXT Atom
    ↓
Molecules (button text, card descriptions, field labels)
    ↓
Organisms (article content, hero descriptions)
```

## Implementation

### Liquid Template

```liquid
<!-- atoms/text.html -->
{%- comment -%}
  TEXT Atom - Semantic text with Context Engine awareness
  
  Parameters:
  - content (required): Text content to display
  - variant: body (default), small, large, caption, code
  - element: span (default), p, div
  - class: Additional CSS classes
  - id: Element ID
  - semantics: Override semantic level from Context Engine
{%- endcomment -%}

{% include components/context-engine.html %}

{%- assign el = include.element | default: 'span' -%}
{%- assign variant = include.variant | default: 'body' -%}

<{{ el }} 
  class="atom-text atom-text--{{ variant }}{% if include.class %} {{ include.class }}{% endif %}"
  {% if include.id %}id="{{ include.id }}"{% endif %}
  data-component="atom-text"
  data-variant="{{ variant }}"
  data-semantic-level="{{ include.semantics | default: universal_context.semantics.textLevel | default: 'p' }}">
  {{ include.content }}
</{{ el }}>
```

### SCSS Structure

```scss
// atoms/_text.scss
.atom-text {
  // Structural styles only - NO visual design
  display: inline;
  position: relative;
  
  // Block variants
  &--body,
  &--large,
  &--caption {
    display: block;
  }
  
  // Size variants use CSS variables
  &--small { --text-scale: 0.875; }
  &--body { --text-scale: 1; }
  &--large { --text-scale: 1.25; }
  &--caption { --text-scale: 0.8; }
  &--code { 
    --text-scale: 0.9;
    font-family: var(--font-family-mono);
  }
  
  // Responsive scaling inherits from system
  font-size: calc(var(--base-font-size) * var(--text-scale));
  
  // High contrast mode support
  @media (prefers-contrast: high) {
    font-weight: var(--text-weight-high-contrast);
  }
}
```

### JavaScript Enhancement

```javascript
// atoms/text-enhancer.js
export class TextEnhancer {
  static enhance(element) {
    const context = window.universalContext;
    
    // Apply reading level adjustments
    if (context.semantics.readingLevel === 'simple') {
      element.style.setProperty('--text-scale', '1.1');
      element.style.setProperty('--line-height', '1.8');
    }
    
    // Apply user preferences
    if (context.accessibility.fontSize !== '100%') {
      const scale = parseInt(context.accessibility.fontSize) / 100;
      element.style.setProperty('--user-text-scale', scale);
    }
  }
}
```

## Usage Examples

### In Molecules

```liquid
<!-- molecules/button.html -->
<button class="molecule-button">
  {% include atoms/text.html 
     content=include.text 
     variant="button"
     element="span" %}
</button>

<!-- molecules/field.html -->
<div class="molecule-field">
  {% include atoms/label.html for=include.id %}
    {% include atoms/text.html 
       content=include.label
       element="span" %}
  {% endinclude %}
  {% include atoms/text.html 
     content=include.help
     variant="small"
     element="p" %}
</div>
```

### Direct Usage

```liquid
<!-- Simple paragraph -->
{% include atoms/text.html 
   content="This is a paragraph of text."
   element="p" %}

<!-- Caption text -->
{% include atoms/text.html 
   content="Figure 1: System architecture"
   variant="caption"
   element="figcaption" %}

<!-- Inline code -->
{% include atoms/text.html 
   content="const result = compute();"
   variant="code"
   element="code" %}
```

## Variations

### By Variant
- **body**: Standard paragraph text
- **small**: Smaller text for help, captions
- **large**: Larger text for emphasis
- **caption**: Figure/table captions
- **code**: Monospace code snippets

### By Element
- **span**: Inline text (default)
- **p**: Paragraph blocks
- **div**: Generic block containers
- **figcaption**: Figure captions
- **cite**: Citations
- **em/strong**: Semantic emphasis

## Accessibility

- Semantic HTML elements for proper structure
- Inherits language from page context
- Respects user font size preferences
- High contrast mode support
- Screen reader optimized markup
- No decorative elements that interfere with AT

## Performance

- Zero JavaScript for basic rendering
- CSS-only responsive scaling
- Minimal DOM footprint
- Efficient reuse across components
- No external dependencies

## Testing Checklist

- [ ] Renders all variant types correctly
- [ ] Responsive scaling works at all breakpoints
- [ ] High contrast mode displays properly
- [ ] User font size preferences applied
- [ ] Screen readers announce content correctly
- [ ] No visual styles leak from theme
- [ ] Works in all supported browsers
- [ ] RTL text displays correctly