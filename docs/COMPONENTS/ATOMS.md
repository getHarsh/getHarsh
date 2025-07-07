# Atomic Components - Atoms

Atoms are the basic building blocks of the component system - the smallest functional units that cannot be broken down further while maintaining meaning.

## Component Specifications

For the complete list of all 15 atoms with their variants, inheritance paths, and implementation status, see:

**[COMPONENT-TABLE.md → Atoms Section](../COMPONENT-TABLE.md#atoms-15-components)**

This single source of truth includes:

- Component names and variants from items.md
- Complete inheritance paths showing Context → Core Systems → Theme → Atom
- Links to individual atom specifications
- Context integration details
- Current implementation status

## Atom Principles

1. **Single Responsibility**: Each atom does ONE thing well
2. **Context Agnostic**: Works in any molecule/organism
3. **No Dependencies**: Never includes other components
4. **Pure Structure**: Minimal styling, theme-agnostic
5. **Accessibility First**: ARIA labels, roles built-in

## Text Atoms

### `atoms/text.html`

Basic text element with semantic awareness:

```liquid
<!-- atoms/text.html -->
{%- comment -%}
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

### `atoms/heading.html`

Semantic heading with automatic hierarchy:

```liquid
<!-- atoms/heading.html -->
{%- comment -%}
  Parameters:
  - text (required): Heading text
  - level: 1-6 (required)
  - class: Additional CSS classes
  - id: Element ID for anchoring
  - icon: Optional icon name
{%- endcomment -%}

{% include components/context-engine.html %}

<h{{ include.level }} 
  class="atom-heading atom-heading--{{ include.level }}{% if include.class %} {{ include.class }}{% endif %}"
  {% if include.id %}id="{{ include.id }}"{% endif %}
  data-component="atom-heading"
  data-level="{{ include.level }}">
  
  {% if include.icon %}
    {% include atoms/icon.html 
       name=include.icon 
       size="sm" 
       decorative=true %}
  {% endif %}
  
  {{ include.text }}
  
  {% if include.id %}
    <a href="#{{ include.id }}" class="atom-heading__anchor" aria-label="Link to this section">
      {% include atoms/icon.html name="link" size="xs" decorative=true %}
    </a>
  {% endif %}
</h{{ include.level }}>
```

## Form Atoms

### `atoms/input.html`

Base input element with validation support:

```liquid
<!-- atoms/input.html -->
{%- comment -%}
  Parameters:
  - type: text (default), email, password, tel, url, number, date, etc.
  - id (required): Input ID
  - name (required): Input name
  - value: Current value
  - placeholder: Placeholder text
  - required: Boolean
  - disabled: Boolean
  - readonly: Boolean
  - pattern: Validation pattern
  - min/max: For number/date inputs
  - autocomplete: Autocomplete attribute
  - class: Additional CSS classes
{%- endcomment -%}

<input 
  type="{{ include.type | default: 'text' }}"
  id="{{ include.id }}"
  name="{{ include.name }}"
  class="atom-input atom-input--{{ include.type | default: 'text' }}{% if include.class %} {{ include.class }}{% endif %}"
  {% if include.value %}value="{{ include.value }}"{% endif %}
  {% if include.placeholder %}placeholder="{{ include.placeholder }}"{% endif %}
  {% if include.required %}required aria-required="true"{% endif %}
  {% if include.disabled %}disabled{% endif %}
  {% if include.readonly %}readonly{% endif %}
  {% if include.pattern %}pattern="{{ include.pattern }}"{% endif %}
  {% if include.min %}min="{{ include.min }}"{% endif %}
  {% if include.max %}max="{{ include.max }}"{% endif %}
  {% if include.autocomplete %}autocomplete="{{ include.autocomplete }}"{% endif %}
  data-component="atom-input"
  data-input-type="{{ include.type | default: 'text' }}">
```

### `atoms/label.html`

Form label with required indicator:

```liquid
<!-- atoms/label.html -->
{%- comment -%}
  Parameters:
  - for (required): ID of associated input
  - text (required): Label text
  - required: Boolean - shows required indicator
  - class: Additional CSS classes
{%- endcomment -%}

<label 
  for="{{ include.for }}"
  class="atom-label{% if include.required %} atom-label--required{% endif %}{% if include.class %} {{ include.class }}{% endif %}"
  data-component="atom-label">
  {{ include.text }}
  {% if include.required %}
    <span class="atom-label__required" aria-label="required field">*</span>
  {% endif %}
</label>
```

### `atoms/textarea.html`

Multi-line text input:

```liquid
<!-- atoms/textarea.html -->
{%- comment -%}
  Parameters:
  - id (required): Textarea ID
  - name (required): Textarea name
  - rows: Number of visible rows (default: 4)
  - cols: Number of columns
  - value: Current value
  - placeholder: Placeholder text
  - required: Boolean
  - disabled: Boolean
  - readonly: Boolean
  - maxlength: Maximum character length
  - class: Additional CSS classes
{%- endcomment -%}

<textarea 
  id="{{ include.id }}"
  name="{{ include.name }}"
  rows="{{ include.rows | default: 4 }}"
  {% if include.cols %}cols="{{ include.cols }}"{% endif %}
  class="atom-textarea{% if include.class %} {{ include.class }}{% endif %}"
  {% if include.placeholder %}placeholder="{{ include.placeholder }}"{% endif %}
  {% if include.required %}required aria-required="true"{% endif %}
  {% if include.disabled %}disabled{% endif %}
  {% if include.readonly %}readonly{% endif %}
  {% if include.maxlength %}maxlength="{{ include.maxlength }}"{% endif %}
  data-component="atom-textarea">{{ include.value }}</textarea>
```

### `atoms/select.html`

Dropdown selection:

```liquid
<!-- atoms/select.html -->
{%- comment -%}
  Parameters:
  - id (required): Select ID
  - name (required): Select name
  - options (required): Array of options [{value, text, selected}]
  - placeholder: First option text
  - required: Boolean
  - disabled: Boolean
  - multiple: Boolean - allow multiple selection
  - class: Additional CSS classes
{%- endcomment -%}

<select 
  id="{{ include.id }}"
  name="{{ include.name }}"
  class="atom-select{% if include.class %} {{ include.class }}{% endif %}"
  {% if include.required %}required aria-required="true"{% endif %}
  {% if include.disabled %}disabled{% endif %}
  {% if include.multiple %}multiple{% endif %}
  data-component="atom-select">
  
  {% if include.placeholder %}
    <option value="" disabled selected>{{ include.placeholder }}</option>
  {% endif %}
  
  {% for option in include.options %}
    <option 
      value="{{ option.value }}"
      {% if option.selected %}selected{% endif %}
      {% if option.disabled %}disabled{% endif %}>
      {{ option.text }}
    </option>
  {% endfor %}
</select>
```

## Interactive Atoms

### `atoms/button-base.html`

Base button without content (used by molecules):

```liquid
<!-- atoms/button-base.html -->
{%- comment -%}
  Parameters:
  - type: button (default), submit, reset
  - disabled: Boolean
  - pressed: Boolean - for toggle buttons
  - class: Additional CSS classes
  - id: Button ID
  - data_attributes: Hash of data attributes
{%- endcomment -%}

<button 
  type="{{ include.type | default: 'button' }}"
  class="atom-button{% if include.class %} {{ include.class }}{% endif %}"
  {% if include.id %}id="{{ include.id }}"{% endif %}
  {% if include.disabled %}disabled{% endif %}
  {% if include.pressed %}aria-pressed="{{ include.pressed }}"{% endif %}
  data-component="atom-button"
  {% if include.data_attributes %}
    {% for attr in include.data_attributes %}
      data-{{ attr[0] }}="{{ attr[1] }}"
    {% endfor %}
  {% endif %}>
  {{ include.content }}
</button>
```

### `atoms/link.html`

Accessible link element:

```liquid
<!-- atoms/link.html -->
{%- comment -%}
  Parameters:
  - href (required): Link destination
  - text (required): Link text
  - external: Boolean - opens in new tab
  - download: Boolean or filename
  - class: Additional CSS classes
  - id: Link ID
  - current: Boolean - marks current page
{%- endcomment -%}

<a 
  href="{{ include.href }}"
  class="atom-link{% if include.class %} {{ include.class }}{% endif %}"
  {% if include.id %}id="{{ include.id }}"{% endif %}
  {% if include.external %}
    target="_blank" 
    rel="noopener noreferrer"
    aria-label="{{ include.text }} (opens in new tab)"
  {% endif %}
  {% if include.download %}
    download{% if include.download != true %}="{{ include.download }}"{% endif %}
  {% endif %}
  {% if include.current %}aria-current="page"{% endif %}
  data-component="atom-link">
  {{ include.text }}
  {% if include.external %}
    {% include atoms/icon.html name="external-link" size="xs" decorative=true %}
  {% endif %}
</a>
```

## Visual Atoms

### `atoms/icon.html`

SVG icon with accessibility:

```liquid
<!-- atoms/icon.html -->
{%- comment -%}
  Parameters:
  - name (required): Icon name from sprite
  - size: xs, sm, md (default), lg, xl
  - decorative: Boolean - if true, hidden from screen readers
  - label: Accessible label (required if not decorative)
  - class: Additional CSS classes
{%- endcomment -%}

{%- assign size = include.size | default: 'md' -%}
{%- assign decorative = include.decorative | default: false -%}

<svg 
  class="atom-icon atom-icon--{{ size }} atom-icon--{{ include.name }}{% if include.class %} {{ include.class }}{% endif %}"
  {% if decorative %}
    aria-hidden="true"
  {% else %}
    role="img"
    aria-label="{{ include.label | default: include.name | replace: '-', ' ' | capitalize }}"
  {% endif %}
  data-component="atom-icon"
  data-icon="{{ include.name }}">
  <use href="#icon-{{ include.name }}"></use>
</svg>
```

### `atoms/image.html`

Responsive image with lazy loading:

```liquid
<!-- atoms/image.html -->
{%- comment -%}
  Parameters:
  - src (required): Image source
  - alt (required): Alt text
  - width: Image width
  - height: Image height
  - loading: lazy (default), eager
  - sizes: Responsive sizes attribute
  - srcset: Responsive srcset
  - class: Additional CSS classes
  - decorative: Boolean - marks as decorative
{%- endcomment -%}

{% include components/context-engine.html %}

<img 
  src="{{ include.src }}"
  alt="{{ include.alt }}"
  {% if include.width %}width="{{ include.width }}"{% endif %}
  {% if include.height %}height="{{ include.height }}"{% endif %}
  loading="{{ include.loading | default: 'lazy' }}"
  {% if include.sizes %}sizes="{{ include.sizes }}"{% endif %}
  {% if include.srcset %}srcset="{{ include.srcset }}"{% endif %}
  class="atom-image{% if include.class %} {{ include.class }}{% endif %}"
  {% if include.decorative %}role="presentation"{% endif %}
  data-component="atom-image"
  data-performance-mode="{{ universal_context.technical.performance.mode | default: 'balanced' }}">
```

### `atoms/spinner.html`

Loading spinner:

```liquid
<!-- atoms/spinner.html -->
{%- comment -%}
  Parameters:
  - size: xs, sm, md (default), lg
  - label: Screen reader label (default: "Loading")
  - class: Additional CSS classes
{%- endcomment -%}

{%- assign size = include.size | default: 'md' -%}

<div 
  class="atom-spinner atom-spinner--{{ size }}{% if include.class %} {{ include.class }}{% endif %}"
  role="status"
  aria-label="{{ include.label | default: 'Loading' }}"
  data-component="atom-spinner">
  <span class="atom-spinner__dot"></span>
  <span class="atom-spinner__dot"></span>
  <span class="atom-spinner__dot"></span>
  <span class="sr-only">{{ include.label | default: 'Loading' }}</span>
</div>
```

## Feedback Atoms

### `atoms/help-text.html`

Helpful text for form fields:

```liquid
<!-- atoms/help-text.html -->
{%- comment -%}
  Parameters:
  - content (required): Help text
  - id: Element ID (for aria-describedby)
  - class: Additional CSS classes
{%- endcomment -%}

<small 
  {% if include.id %}id="{{ include.id }}"{% endif %}
  class="atom-help-text{% if include.class %} {{ include.class }}{% endif %}"
  data-component="atom-help-text">
  {{ include.content }}
</small>
```

### `atoms/error-text.html`

Error message display:

```liquid
<!-- atoms/error-text.html -->
{%- comment -%}
  Parameters:
  - content (required): Error message
  - id: Element ID (for aria-describedby)
  - class: Additional CSS classes
{%- endcomment -%}

<div 
  {% if include.id %}id="{{ include.id }}"{% endif %}
  class="atom-error-text{% if include.class %} {{ include.class }}{% endif %}"
  role="alert"
  data-component="atom-error-text">
  {% include atoms/icon.html name="alert-circle" size="xs" label="Error" %}
  {{ include.content }}
</div>
```

### `atoms/success-text.html`

Success message display:

```liquid
<!-- atoms/success-text.html -->
{%- comment -%}
  Parameters:
  - content (required): Success message
  - id: Element ID
  - class: Additional CSS classes
{%- endcomment -%}

<div 
  {% if include.id %}id="{{ include.id }}"{% endif %}
  class="atom-success-text{% if include.class %} {{ include.class }}{% endif %}"
  role="status"
  data-component="atom-success-text">
  {% include atoms/icon.html name="check-circle" size="xs" label="Success" %}
  {{ include.content }}
</div>
```

## Layout Atoms

### `atoms/separator.html`

Visual separator:

```liquid
<!-- atoms/separator.html -->
{%- comment -%}
  Parameters:
  - variant: horizontal (default), vertical
  - decorative: Boolean (default: true)
  - class: Additional CSS classes
{%- endcomment -%}

{%- assign variant = include.variant | default: 'horizontal' -%}
{%- assign decorative = include.decorative | default: true -%}

<hr 
  class="atom-separator atom-separator--{{ variant }}{% if include.class %} {{ include.class }}{% endif %}"
  {% if decorative %}role="presentation"{% else %}role="separator"{% endif %}
  data-component="atom-separator">
```

### `atoms/spacer.html`

Spacing element:

```liquid
<!-- atoms/spacer.html -->
{%- comment -%}
  Parameters:
  - size: xs, sm, md (default), lg, xl
  - axis: vertical (default), horizontal, both
  - class: Additional CSS classes
{%- endcomment -%}

{%- assign size = include.size | default: 'md' -%}
{%- assign axis = include.axis | default: 'vertical' -%}

<div 
  class="atom-spacer atom-spacer--{{ size }} atom-spacer--{{ axis }}{% if include.class %} {{ include.class }}{% endif %}"
  aria-hidden="true"
  data-component="atom-spacer"></div>
```

## Atom CSS Architecture

All atoms follow the same CSS pattern:

```scss
// _atoms.scss
.atom-{name} {
  // Base structural styles only
  display: {appropriate-display};
  position: relative;
  
  // Size variants use CSS variables
  &--xs { --atom-size: var(--size-xs); }
  &--sm { --atom-size: var(--size-sm); }
  &--md { --atom-size: var(--size-md); }
  &--lg { --atom-size: var(--size-lg); }
  &--xl { --atom-size: var(--size-xl); }
  
  // State variants
  &--disabled {
    cursor: not-allowed;
    pointer-events: none;
  }
  
  // NO visual styling - handled by theme layer
}
```

## Atom JavaScript Module

```javascript
// atoms/atom-enhancer.js
export class AtomEnhancer {
  static enhance(element) {
    const componentType = element.dataset.component;
    const enhancer = this.enhancers[componentType];
    
    if (enhancer) {
      enhancer(element);
    }
  }
  
  static enhancers = {
    'atom-input': (element) => {
      // Add input validation feedback
      element.addEventListener('invalid', (e) => {
        e.preventDefault();
        AtomEnhancer.showError(element, element.validationMessage);
      });
    },
    
    'atom-textarea': (element) => {
      // Add character counter if maxlength
      if (element.hasAttribute('maxlength')) {
        AtomEnhancer.addCharacterCounter(element);
      }
    },
    
    'atom-select': (element) => {
      // Enhance keyboard navigation
      element.addEventListener('keydown', (e) => {
        AtomEnhancer.enhanceSelectKeyboard(element, e);
      });
    }
  };
}
```

## Usage in Molecules

Atoms are designed to be composed into molecules:

```liquid
<!-- molecules/button.html using atoms -->
<button class="molecule-button">
  {% include atoms/icon.html name=include.icon %}
  {% include atoms/text.html content=include.text variant="button" %}
  {% if include.badge %}
    {% include atoms/badge.html count=include.badge %}
  {% endif %}
</button>

<!-- molecules/field.html using atoms -->
<div class="molecule-field">
  {% include atoms/label.html for=include.id text=include.label %}
  {% include atoms/input.html id=include.id name=include.name %}
  {% include atoms/help-text.html content=include.help %}
</div>
```

## Key Benefits

1. **True Reusability**: Each atom used in many contexts
2. **Consistency**: Same atom = same behavior everywhere
3. **Maintainability**: Fix atom once, fixed everywhere
4. **Performance**: Small, cacheable units
5. **Accessibility**: ARIA built into every atom
6. **Testability**: Test atoms in complete isolation
