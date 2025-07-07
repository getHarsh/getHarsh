# Atom: ICON

## Purpose

The ICON atom provides accessible SVG icons with automatic ARIA labeling, size variants, and theme-aware styling. Icons are loaded from a sprite sheet for optimal performance.

## Context Engine Integration

```javascript
// Automatically receives from Context Engine:
{
  accessibility: {
    announceIcons: true,          // Screen reader behavior
    highContrast: false,          // Contrast adjustments
    reduceMotion: false           // Animation preferences
  },
  performance: {
    lazyLoadIcons: true,          // Deferred sprite loading
    inlineFrequent: true          // Inline common icons
  },
  theme: {
    iconStyle: 'outline',         // outline, filled, duotone
    iconWeight: 'normal'          // light, normal, bold
  }
}
```

## Multi-Layer Inheritance

```
Context Engine
    ↓
Core Systems (PERFORMANCE.md for sprite optimization)
    ↓
Theme System (icon library, colors)
    ↓
ICON Atom
    ↓
Molecules (buttons, links, navigation)
    ↓
Organisms (headers, cards, alerts)
```

## Implementation

### Liquid Template

```liquid
<!-- atoms/icon.html -->
{%- comment -%}
  ICON Atom - Accessible SVG icons from sprite
  
  Parameters:
  - name (required): Icon name from sprite
  - size: xs, sm, md (default), lg, xl
  - decorative: Boolean - if true, hidden from screen readers
  - label: Accessible label (required if not decorative)
  - class: Additional CSS classes
  - animate: Boolean - enable hover animations
{%- endcomment -%}

{% include components/context-engine.html %}

{%- assign size = include.size | default: 'md' -%}
{%- assign decorative = include.decorative | default: false -%}

{%- if decorative == false and include.label == nil -%}
  {%- assign label = include.name | replace: '-', ' ' | capitalize -%}
{%- else -%}
  {%- assign label = include.label -%}
{%- endif -%}

<svg 
  class="atom-icon atom-icon--{{ size }} atom-icon--{{ include.name }}{% if include.animate %} atom-icon--animate{% endif %}{% if include.class %} {{ include.class }}{% endif %}"
  {% if decorative %}
    aria-hidden="true"
  {% else %}
    role="img"
    aria-label="{{ label }}"
  {% endif %}
  data-component="atom-icon"
  data-icon="{{ include.name }}"
  data-size="{{ size }}">
  <use href="{{ site.baseurl }}/assets/icons/sprite.svg#icon-{{ include.name }}"></use>
</svg>
```

### SCSS Structure

```scss
// atoms/_icon.scss
.atom-icon {
  // Base structure
  display: inline-flex;
  flex-shrink: 0;
  fill: currentColor;
  vertical-align: middle;
  
  // Size variants with consistent scaling
  &--xs { 
    width: var(--icon-size-xs, 0.75rem);
    height: var(--icon-size-xs, 0.75rem);
  }
  &--sm { 
    width: var(--icon-size-sm, 1rem);
    height: var(--icon-size-sm, 1rem);
  }
  &--md { 
    width: var(--icon-size-md, 1.25rem);
    height: var(--icon-size-md, 1.25rem);
  }
  &--lg { 
    width: var(--icon-size-lg, 1.5rem);
    height: var(--icon-size-lg, 1.5rem);
  }
  &--xl { 
    width: var(--icon-size-xl, 2rem);
    height: var(--icon-size-xl, 2rem);
  }
  
  // Animation support
  &--animate {
    transition: transform var(--transition-fast);
    
    @media (prefers-reduced-motion: no-preference) {
      &:hover {
        transform: scale(1.1);
      }
    }
  }
  
  // High contrast mode
  @media (prefers-contrast: high) {
    stroke: currentColor;
    stroke-width: 2;
  }
}
```

### JavaScript Enhancement

```javascript
// atoms/icon-enhancer.js
export class IconEnhancer {
  static spriteLoaded = false;
  static iconQueue = new Set();
  
  static enhance(element) {
    const context = window.universalContext;
    const iconName = element.dataset.icon;
    
    // Load sprite if needed
    if (!this.spriteLoaded && context.performance.lazyLoadIcons) {
      this.loadSprite();
    }
    
    // Inline frequent icons
    if (context.performance.inlineFrequent && this.isFrequent(iconName)) {
      this.inlineIcon(element, iconName);
    }
    
    // Apply theme-specific styling
    if (context.theme.iconStyle !== 'outline') {
      element.classList.add(`atom-icon--${context.theme.iconStyle}`);
    }
  }
  
  static loadSprite() {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = '/assets/icons/sprite.svg';
    document.head.appendChild(link);
    this.spriteLoaded = true;
  }
  
  static isFrequent(iconName) {
    const frequentIcons = ['arrow-right', 'check', 'x', 'menu', 'search'];
    return frequentIcons.includes(iconName);
  }
  
  static async inlineIcon(element, iconName) {
    // Cache frequently used icons inline
    if (this.iconQueue.has(iconName)) return;
    
    this.iconQueue.add(iconName);
    const svg = await this.fetchIcon(iconName);
    if (svg) {
      element.innerHTML = svg;
    }
  }
}
```

## Icon Library

Common icons available in the sprite:

### Navigation
- `arrow-right`, `arrow-left`, `arrow-up`, `arrow-down`
- `chevron-right`, `chevron-left`, `chevron-up`, `chevron-down`
- `menu`, `x`, `home`, `back`

### Actions
- `search`, `filter`, `sort`, `refresh`
- `download`, `upload`, `share`, `print`
- `edit`, `delete`, `save`, `cancel`

### UI Elements
- `check`, `check-circle`, `x-circle`
- `info`, `info-circle`, `help-circle`
- `alert-triangle`, `alert-circle`
- `star`, `star-filled`, `heart`, `heart-filled`

### Social
- `twitter`, `linkedin`, `github`, `facebook`
- `youtube`, `instagram`, `email`, `rss`

### Misc
- `calendar`, `clock`, `location`, `phone`
- `user`, `users`, `settings`, `lock`
- `external-link`, `link`, `code`, `terminal`

## Usage Examples

### In Molecules

```liquid
<!-- molecules/button.html -->
<button class="molecule-button">
  {% include atoms/icon.html 
     name="arrow-right" 
     size="sm"
     decorative=true
     class="molecule-button__icon" %}
  <span>Continue</span>
</button>

<!-- molecules/alert.html -->
<div class="molecule-alert" role="alert">
  {% include atoms/icon.html 
     name="alert-circle"
     label="Warning"
     size="md" %}
  <p>Important message</p>
</div>
```

### Direct Usage

```liquid
<!-- Decorative icon -->
{% include atoms/icon.html 
   name="star"
   decorative=true
   size="sm" %}

<!-- Semantic icon with label -->
{% include atoms/icon.html 
   name="download"
   label="Download PDF"
   size="lg"
   animate=true %}

<!-- Icon in text -->
<p>
  Follow us on 
  {% include atoms/icon.html 
     name="twitter"
     label="Twitter"
     size="sm" %}
</p>
```

## Accessibility Features

- Automatic ARIA labeling for non-decorative icons
- Decorative icons hidden from assistive technology
- High contrast mode support
- Respects reduced motion preferences
- Semantic role="img" for meaningful icons
- Keyboard focus indicators when interactive

## Performance Optimization

- SVG sprite for optimal caching
- Lazy loading of sprite sheet
- Inline rendering for frequent icons
- Minimal DOM footprint
- CSS-only animations
- No JavaScript required for basic usage

## Theme Integration

Icons automatically adapt to:
- Current text color via `currentColor`
- Theme icon style (outline, filled, duotone)
- High contrast mode adjustments
- Dark/light mode transitions

## Testing Checklist

- [ ] All icon sizes render correctly
- [ ] Decorative icons hidden from screen readers
- [ ] Non-decorative icons announced properly
- [ ] High contrast mode displays correctly
- [ ] Animations respect motion preferences
- [ ] Sprite sheet loads efficiently
- [ ] Icons scale responsively
- [ ] Color inheritance works properly
- [ ] Focus states display when interactive