# Atomic Components - Molecules

Molecules are relatively simple groups of UI elements functioning together as a unit. They combine atoms to form distinct, reusable interface patterns.

## Component Specifications

For the complete list of all 24 molecules with their variants, inheritance paths, and implementation status, see:

**[COMPONENT-TABLE.md → Molecules Section](../COMPONENT-TABLE.md#molecules-24-components)**

This single source of truth includes:

- Component names and variants from items.md
- Complete inheritance paths showing Context → Core Systems → Theme → Molecules
- Links to individual molecule specifications  
- Context integration details showing what each molecule receives
- Current implementation status (Active/Planned)

## Molecule Principles

1. **Single Purpose**: Each molecule has ONE clear function
2. **Atom Composition**: Built from 2-5 atoms typically
3. **Context Aware**: Receives business context from Context Engine
4. **Reusable Pattern**: Used across multiple organisms
5. **Self-Contained**: All necessary atoms included

## Button Molecules

### `molecules/button.html`

Complete button with icon and text:

```liquid
<!-- molecules/button.html -->
{%- comment -%}
  Parameters:
  - text (required): Button text
  - variant: primary (default), secondary, danger, ghost, link
  - size: sm, md (default), lg
  - icon: Icon name (optional)
  - icon_position: left (default), right
  - type: button (default), submit, reset
  - disabled: Boolean
  - loading: Boolean - shows spinner
  - full_width: Boolean
  - class: Additional CSS classes
  - id: Button ID
  - data_attributes: Hash of data attributes
{%- endcomment -%}

{% include components/context-engine.html %}

{%- assign variant = include.variant | default: 'primary' -%}
{%- assign size = include.size | default: 'md' -%}
{%- assign icon_position = include.icon_position | default: 'left' -%}

<button 
  type="{{ include.type | default: 'button' }}"
  class="molecule-button molecule-button--{{ variant }} molecule-button--{{ size }}{% if include.full_width %} molecule-button--full{% endif %}{% if include.loading %} is-loading{% endif %}{% if include.class %} {{ include.class }}{% endif %}"
  {% if include.id %}id="{{ include.id }}"{% endif %}
  {% if include.disabled or include.loading %}disabled{% endif %}
  data-component="molecule-button"
  data-variant="{{ variant }}"
  data-business-context="{{ universal_context.business.conversionType }}"
  data-journey-stage="{{ universal_context.business.customerJourneyStage }}"
  data-lead-score="{{ universal_context.business.leadQualityScore }}"
  {% if include.data_attributes %}
    {% for attr in include.data_attributes %}
      data-{{ attr[0] }}="{{ attr[1] }}"
    {% endfor %}
  {% endif %}>
  
  <span class="molecule-button__content">
    {% if include.icon and icon_position == 'left' %}
      {% include atoms/icon.html 
         name=include.icon 
         size=size 
         decorative=true
         class="molecule-button__icon molecule-button__icon--left" %}
    {% endif %}
    
    {% include atoms/text.html 
       content=include.text 
       variant="button"
       element="span"
       class="molecule-button__text" %}
    
    {% if include.icon and icon_position == 'right' %}
      {% include atoms/icon.html 
         name=include.icon 
         size=size 
         decorative=true
         class="molecule-button__icon molecule-button__icon--right" %}
    {% endif %}
  </span>
  
  {% if include.loading %}
    {% include atoms/spinner.html 
       size=size 
       class="molecule-button__spinner" %}
  {% endif %}
</button>
```

### `molecules/button-group.html`

Group of related buttons:

```liquid
<!-- molecules/button-group.html -->
{%- comment -%}
  Parameters:
  - buttons (required): Array of button configs
  - variant: horizontal (default), vertical, toolbar
  - align: start (default), center, end, stretch
  - spacing: xs, sm (default), md, lg
  - class: Additional CSS classes
{%- endcomment -%}

{%- assign variant = include.variant | default: 'horizontal' -%}
{%- assign align = include.align | default: 'start' -%}
{%- assign spacing = include.spacing | default: 'sm' -%}

<div 
  class="molecule-button-group molecule-button-group--{{ variant }} molecule-button-group--{{ align }} molecule-button-group--spacing-{{ spacing }}{% if include.class %} {{ include.class }}{% endif %}"
  role="group"
  data-component="molecule-button-group">
  
  {% for button in include.buttons %}
    {% include molecules/button.html 
       text=button.text
       variant=button.variant
       size=button.size
       icon=button.icon
       type=button.type
       disabled=button.disabled
       data_attributes=button.data_attributes %}
  {% endfor %}
</div>
```

## Form Molecules

### `molecules/field.html`

Complete form field with label, input, and help:

```liquid
<!-- molecules/field.html -->
{%- comment -%}
  Parameters:
  - type: text (default), email, password, tel, url, number, date, etc.
  - id (required): Field ID
  - name (required): Field name
  - label (required): Field label
  - value: Current value
  - placeholder: Placeholder text
  - help: Help text
  - error: Error message
  - success: Success message
  - required: Boolean
  - disabled: Boolean
  - readonly: Boolean
  - class: Additional CSS classes
{%- endcomment -%}

{% include components/context-engine.html %}

<div 
  class="molecule-field molecule-field--{{ include.type | default: 'text' }}{% if include.error %} has-error{% endif %}{% if include.success %} has-success{% endif %}{% if include.class %} {{ include.class }}{% endif %}"
  data-component="molecule-field"
  data-field-type="{{ include.type | default: 'text' }}"
  data-validation-context="{{ universal_context.business.formContext }}">
  
  {% include atoms/label.html 
     for=include.id 
     text=include.label 
     required=include.required
     class="molecule-field__label" %}
  
  <div class="molecule-field__input-wrapper">
    {% include atoms/input.html 
       type=include.type
       id=include.id
       name=include.name
       value=include.value
       placeholder=include.placeholder
       required=include.required
       disabled=include.disabled
       readonly=include.readonly
       pattern=include.pattern
       min=include.min
       max=include.max
       autocomplete=include.autocomplete
       class="molecule-field__input" %}
    
    {% if include.type == 'password' %}
      {% include molecules/password-toggle.html for=include.id %}
    {% endif %}
  </div>
  
  {% if include.help and include.error == null %}
    {% include atoms/help-text.html 
       content=include.help 
       id=include.id | append: '-help'
       class="molecule-field__help" %}
  {% endif %}
  
  {% if include.error %}
    {% include atoms/error-text.html 
       content=include.error 
       id=include.id | append: '-error'
       class="molecule-field__error" %}
  {% endif %}
  
  {% if include.success %}
    {% include atoms/success-text.html 
       content=include.success 
       id=include.id | append: '-success'
       class="molecule-field__success" %}
  {% endif %}
</div>
```

### `molecules/select-field.html`

Dropdown field with label:

```liquid
<!-- molecules/select-field.html -->
{%- comment -%}
  Parameters:
  - id (required): Field ID
  - name (required): Field name
  - label (required): Field label
  - options (required): Array of options
  - placeholder: First option text
  - help: Help text
  - error: Error message
  - required: Boolean
  - disabled: Boolean
  - multiple: Boolean
  - class: Additional CSS classes
{%- endcomment -%}

<div 
  class="molecule-field molecule-field--select{% if include.error %} has-error{% endif %}{% if include.class %} {{ include.class }}{% endif %}"
  data-component="molecule-select-field">
  
  {% include atoms/label.html 
     for=include.id 
     text=include.label 
     required=include.required
     class="molecule-field__label" %}
  
  <div class="molecule-field__input-wrapper">
    {% include atoms/select.html 
       id=include.id
       name=include.name
       options=include.options
       placeholder=include.placeholder
       required=include.required
       disabled=include.disabled
       multiple=include.multiple
       class="molecule-field__input" %}
    
    {% include atoms/icon.html 
       name="chevron-down" 
       size="sm"
       decorative=true
       class="molecule-field__select-icon" %}
  </div>
  
  {% if include.help and include.error == null %}
    {% include atoms/help-text.html 
       content=include.help 
       id=include.id | append: '-help'
       class="molecule-field__help" %}
  {% endif %}
  
  {% if include.error %}
    {% include atoms/error-text.html 
       content=include.error 
       id=include.id | append: '-error'
       class="molecule-field__error" %}
  {% endif %}
</div>
```

### `molecules/checkbox.html`

Checkbox with label:

```liquid
<!-- molecules/checkbox.html -->
{%- comment -%}
  Parameters:
  - id (required): Checkbox ID
  - name (required): Checkbox name
  - label (required): Label text
  - value: Checkbox value
  - checked: Boolean
  - required: Boolean
  - disabled: Boolean
  - class: Additional CSS classes
{%- endcomment -%}

<div 
  class="molecule-checkbox{% if include.class %} {{ include.class }}{% endif %}"
  data-component="molecule-checkbox">
  
  <input 
    type="checkbox"
    id="{{ include.id }}"
    name="{{ include.name }}"
    {% if include.value %}value="{{ include.value }}"{% endif %}
    {% if include.checked %}checked{% endif %}
    {% if include.required %}required aria-required="true"{% endif %}
    {% if include.disabled %}disabled{% endif %}
    class="molecule-checkbox__input">
  
  <label 
    for="{{ include.id }}"
    class="molecule-checkbox__label">
    <span class="molecule-checkbox__box">
      {% include atoms/icon.html 
         name="check" 
         size="xs"
         decorative=true
         class="molecule-checkbox__checkmark" %}
    </span>
    {% include atoms/text.html 
       content=include.label
       element="span"
       class="molecule-checkbox__text" %}
  </label>
</div>
```

## Navigation Molecules

### `molecules/nav-link.html`

Navigation link with active state:

```liquid
<!-- molecules/nav-link.html -->
{%- comment -%}
  Parameters:
  - href (required): Link destination
  - text (required): Link text
  - icon: Icon name (optional)
  - badge: Badge count/text
  - active: Boolean - marks as active
  - external: Boolean
  - class: Additional CSS classes
{%- endcomment -%}

{% include components/context-engine.html %}

{%- assign is_active = include.active | default: false -%}
{%- if page.url == include.href -%}
  {%- assign is_active = true -%}
{%- endif -%}

<a 
  href="{{ include.href }}"
  class="molecule-nav-link{% if is_active %} is-active{% endif %}{% if include.class %} {{ include.class }}{% endif %}"
  {% if is_active %}aria-current="page"{% endif %}
  {% if include.external %}
    target="_blank" 
    rel="noopener noreferrer"
  {% endif %}
  data-component="molecule-nav-link"
  data-journey-section="{{ universal_context.business.navigationContext }}">
  
  {% if include.icon %}
    {% include atoms/icon.html 
       name=include.icon 
       size="sm"
       decorative=true
       class="molecule-nav-link__icon" %}
  {% endif %}
  
  {% include atoms/text.html 
     content=include.text
     element="span"
     class="molecule-nav-link__text" %}
  
  {% if include.badge %}
    {% include atoms/badge.html 
       content=include.badge
       variant="primary"
       class="molecule-nav-link__badge" %}
  {% endif %}
  
  {% if include.external %}
    {% include atoms/icon.html 
       name="external-link" 
       size="xs"
       decorative=true
       class="molecule-nav-link__external" %}
  {% endif %}
</a>
```

### `molecules/breadcrumb.html`

Breadcrumb navigation item:

```liquid
<!-- molecules/breadcrumb.html -->
{%- comment -%}
  Parameters:
  - items (required): Array of {text, href} objects
  - separator: Icon name (default: chevron-right)
  - class: Additional CSS classes
{%- endcomment -%}

<nav 
  aria-label="Breadcrumb"
  class="molecule-breadcrumb{% if include.class %} {{ include.class }}{% endif %}"
  data-component="molecule-breadcrumb">
  
  <ol class="molecule-breadcrumb__list">
    {% for item in include.items %}
      <li class="molecule-breadcrumb__item">
        {% if forloop.last %}
          <span 
            class="molecule-breadcrumb__current"
            aria-current="page">
            {{ item.text }}
          </span>
        {% else %}
          {% include atoms/link.html 
             href=item.href
             text=item.text
             class="molecule-breadcrumb__link" %}
          
          {% include atoms/icon.html 
             name=include.separator | default: 'chevron-right'
             size="xs"
             decorative=true
             class="molecule-breadcrumb__separator" %}
        {% endif %}
      </li>
    {% endfor %}
  </ol>
</nav>
```

## Content Molecules

### `molecules/card.html`

Basic content card:

```liquid
<!-- molecules/card.html -->
{%- comment -%}
  Parameters:
  - title (required): Card title
  - content: Card content/description
  - image: Image config {src, alt}
  - link: Link config {href, text}
  - variant: default, featured, compact
  - class: Additional CSS classes
{%- endcomment -%}

{% include components/context-engine.html %}

<article 
  class="molecule-card molecule-card--{{ include.variant | default: 'default' }}{% if include.class %} {{ include.class }}{% endif %}"
  data-component="molecule-card"
  data-content-type="{{ universal_context.semantics.contentType }}"
  data-engagement-value="{{ universal_context.business.contentValue }}">
  
  {% if include.image %}
    <div class="molecule-card__media">
      {% include atoms/image.html 
         src=include.image.src
         alt=include.image.alt
         loading="lazy"
         class="molecule-card__image" %}
    </div>
  {% endif %}
  
  <div class="molecule-card__content">
    {% include atoms/heading.html 
       text=include.title
       level=3
       class="molecule-card__title" %}
    
    {% if include.content %}
      {% include atoms/text.html 
         content=include.content
         element="p"
         class="molecule-card__description" %}
    {% endif %}
    
    {% if include.link %}
      {% include molecules/button.html 
         text=include.link.text | default: "Learn More"
         href=include.link.href
         variant="link"
         icon="arrow-right"
         icon_position="right"
         class="molecule-card__action" %}
    {% endif %}
  </div>
</article>
```

### `molecules/alert.html`

Alert message:

```liquid
<!-- molecules/alert.html -->
{%- comment -%}
  Parameters:
  - content (required): Alert message
  - variant: info (default), success, warning, error
  - title: Optional title
  - dismissible: Boolean
  - icon: Custom icon (uses default based on variant)
  - class: Additional CSS classes
{%- endcomment -%}

{%- assign variant = include.variant | default: 'info' -%}
{%- case variant -%}
  {%- when 'success' -%}
    {%- assign icon = 'check-circle' -%}
    {%- assign role = 'status' -%}
  {%- when 'warning' -%}
    {%- assign icon = 'alert-triangle' -%}
    {%- assign role = 'alert' -%}
  {%- when 'error' -%}
    {%- assign icon = 'alert-circle' -%}
    {%- assign role = 'alert' -%}
  {%- else -%}
    {%- assign icon = 'info-circle' -%}
    {%- assign role = 'status' -%}
{%- endcase -%}

<div 
  class="molecule-alert molecule-alert--{{ variant }}{% if include.class %} {{ include.class }}{% endif %}"
  role="{{ role }}"
  data-component="molecule-alert">
  
  <div class="molecule-alert__icon">
    {% include atoms/icon.html 
       name=include.icon | default: icon
       size="sm"
       label=variant | capitalize %}
  </div>
  
  <div class="molecule-alert__content">
    {% if include.title %}
      {% include atoms/heading.html 
         text=include.title
         level=4
         class="molecule-alert__title" %}
    {% endif %}
    
    {% include atoms/text.html 
       content=include.content
       element="div"
       class="molecule-alert__message" %}
  </div>
  
  {% if include.dismissible %}
    <button 
      type="button"
      class="molecule-alert__dismiss"
      aria-label="Dismiss alert">
      {% include atoms/icon.html 
         name="x"
         size="sm"
         decorative=true %}
    </button>
  {% endif %}
</div>
```

## Interactive Molecules

### `molecules/search-box.html`

Search input with button:

```liquid
<!-- molecules/search-box.html -->
{%- comment -%}
  Parameters:
  - placeholder: Placeholder text (default: "Search...")
  - action: Form action URL
  - method: Form method (default: "get")
  - name: Input name (default: "q")
  - value: Current search value
  - size: sm, md (default), lg
  - class: Additional CSS classes
{%- endcomment -%}

{% include components/context-engine.html %}

{%- assign size = include.size | default: 'md' -%}

<form 
  action="{{ include.action | default: '/search' }}"
  method="{{ include.method | default: 'get' }}"
  class="molecule-search-box molecule-search-box--{{ size }}{% if include.class %} {{ include.class }}{% endif %}"
  role="search"
  data-component="molecule-search-box"
  data-search-context="{{ universal_context.business.searchContext }}">
  
  <div class="molecule-search-box__wrapper">
    {% include atoms/icon.html 
       name="search"
       size=size
       decorative=true
       class="molecule-search-box__icon" %}
    
    {% include atoms/input.html 
       type="search"
       name=include.name | default: "q"
       id="search-" | append: include.name | default: "q"
       placeholder=include.placeholder | default: "Search..."
       value=include.value
       class="molecule-search-box__input" %}
    
    {% include atoms/button-base.html 
       type="submit"
       class="molecule-search-box__submit" %}
      {% include atoms/text.html 
         content="Search"
         element="span"
         class="sr-only" %}
      {% include atoms/icon.html 
         name="arrow-right"
         size=size
         decorative=true %}
    {% include atoms/button-base.html %}
  </div>
</form>
```

### `molecules/toggle.html`

Toggle switch:

```liquid
<!-- molecules/toggle.html -->
{%- comment -%}
  Parameters:
  - id (required): Toggle ID
  - name (required): Toggle name
  - label (required): Label text
  - checked: Boolean
  - disabled: Boolean
  - size: sm, md (default), lg
  - class: Additional CSS classes
{%- endcomment -%}

{%- assign size = include.size | default: 'md' -%}

<div 
  class="molecule-toggle molecule-toggle--{{ size }}{% if include.class %} {{ include.class }}{% endif %}"
  data-component="molecule-toggle">
  
  <input 
    type="checkbox"
    id="{{ include.id }}"
    name="{{ include.name }}"
    {% if include.checked %}checked{% endif %}
    {% if include.disabled %}disabled{% endif %}
    class="molecule-toggle__input"
    role="switch"
    aria-checked="{{ include.checked | default: false }}">
  
  <label 
    for="{{ include.id }}"
    class="molecule-toggle__label">
    <span class="molecule-toggle__track">
      <span class="molecule-toggle__thumb"></span>
    </span>
    {% include atoms/text.html 
       content=include.label
       element="span"
       class="molecule-toggle__text" %}
  </label>
</div>
```

### `molecules/share-button.html`

Social share button:

```liquid
<!-- molecules/share-button.html -->
{%- comment -%}
  Parameters:
  - platform (required): twitter, linkedin, facebook, email
  - url: URL to share (default: current page)
  - text: Share text
  - title: Share title
  - size: sm, md (default), lg
  - variant: icon, text, both (default)
  - class: Additional CSS classes
{%- endcomment -%}

{% include components/context-engine.html %}

{%- assign url = include.url | default: page.url | absolute_url | url_encode -%}
{%- assign text = include.text | default: page.title | url_encode -%}
{%- assign variant = include.variant | default: 'both' -%}

{%- case include.platform -%}
  {%- when 'twitter' -%}
    {%- assign share_url = 'https://twitter.com/intent/tweet?url=' | append: url | append: '&text=' | append: text -%}
    {%- assign platform_name = 'Twitter' -%}
    {%- assign icon = 'twitter' -%}
  {%- when 'linkedin' -%}
    {%- assign share_url = 'https://www.linkedin.com/sharing/share-offsite/?url=' | append: url -%}
    {%- assign platform_name = 'LinkedIn' -%}
    {%- assign icon = 'linkedin' -%}
  {%- when 'facebook' -%}
    {%- assign share_url = 'https://www.facebook.com/sharer/sharer.php?u=' | append: url -%}
    {%- assign platform_name = 'Facebook' -%}
    {%- assign icon = 'facebook' -%}
  {%- when 'email' -%}
    {%- assign share_url = 'mailto:?subject=' | append: include.title | default: page.title | url_encode | append: '&body=' | append: text | append: '%20' | append: url -%}
    {%- assign platform_name = 'Email' -%}
    {%- assign icon = 'mail' -%}
{%- endcase -%}

<a 
  href="{{ share_url }}"
  class="molecule-share-button molecule-share-button--{{ include.platform }} molecule-share-button--{{ include.size | default: 'md' }}{% if include.class %} {{ include.class }}{% endif %}"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Share on {{ platform_name }}"
  data-component="molecule-share-button"
  data-platform="{{ include.platform }}"
  data-content-value="{{ universal_context.business.shareValue }}">
  
  {% if variant == 'icon' or variant == 'both' %}
    {% include atoms/icon.html 
       name=icon
       size=include.size | default: 'md'
       decorative=variant == 'both'
       label="Share on " | append: platform_name %}
  {% endif %}
  
  {% if variant == 'text' or variant == 'both' %}
    {% include atoms/text.html 
       content="Share"
       element="span"
       class="molecule-share-button__text" %}
  {% endif %}
</a>
```

## Utility Molecules

### `molecules/logo.html`

Site logo/brand:

```liquid
<!-- molecules/logo.html -->
{%- comment -%}
  Parameters:
  - link: Logo link (default: "/")
  - image: Logo image config {src, alt, width, height}
  - text: Text fallback
  - variant: default, compact, full
  - class: Additional CSS classes
{%- endcomment -%}

<a 
  href="{{ include.link | default: '/' }}"
  class="molecule-logo molecule-logo--{{ include.variant | default: 'default' }}{% if include.class %} {{ include.class }}{% endif %}"
  aria-label="{{ site.title }} - Home"
  data-component="molecule-logo">
  
  {% if include.image %}
    {% include atoms/image.html 
       src=include.image.src
       alt=include.image.alt | default: site.title
       width=include.image.width
       height=include.image.height
       loading="eager"
       class="molecule-logo__image" %}
  {% endif %}
  
  {% if include.text %}
    {% include atoms/text.html 
       content=include.text
       element="span"
       variant="logo"
       class="molecule-logo__text" %}
  {% endif %}
</a>
```

### `molecules/badge.html`

Status/count badge:

```liquid
<!-- molecules/badge.html -->
{%- comment -%}
  Parameters:
  - content (required): Badge content
  - variant: default, primary, success, warning, error
  - size: xs, sm (default), md
  - pill: Boolean - rounded pill shape
  - class: Additional CSS classes
{%- endcomment -%}

{%- assign variant = include.variant | default: 'default' -%}
{%- assign size = include.size | default: 'sm' -%}

<span 
  class="molecule-badge molecule-badge--{{ variant }} molecule-badge--{{ size }}{% if include.pill %} molecule-badge--pill{% endif %}{% if include.class %} {{ include.class }}{% endif %}"
  data-component="molecule-badge">
  {% include atoms/text.html 
     content=include.content
     element="span"
     variant="badge" %}
</span>
```

## Molecule CSS Architecture

```scss
// _molecules.scss
.molecule-{name} {
  // Composition of atoms
  display: flex; // or grid, block, etc.
  position: relative;
  
  // Internal spacing only
  gap: var(--molecule-gap);
  
  // Size variants affect internal spacing
  &--sm { --molecule-gap: var(--space-xs); }
  &--md { --molecule-gap: var(--space-sm); }
  &--lg { --molecule-gap: var(--space-md); }
  
  // Atom styling
  &__atom {
    // Position atoms within molecule
  }
  
  // State management
  &.is-active,
  &.has-error {
    // State-based atom adjustments
  }
}
```

## Molecule JavaScript Module

```javascript
// molecules/molecule-enhancer.js
import { ContextConsumer } from '../core/context-consumer.js';

export class MoleculeEnhancer extends ContextConsumer {
  static enhance(element) {
    const componentType = element.dataset.component;
    const enhancer = this.enhancers[componentType];
    
    if (enhancer) {
      enhancer(element, window.universalContext);
    }
  }
  
  static enhancers = {
    'molecule-button': (element, context) => {
      // Apply business context
      element.dataset.leadScore = context.business.leadQualityScore;
      element.dataset.journeyStage = context.business.customerJourneyStage;
      
      // Track interactions
      element.addEventListener('click', () => {
        if (context.technical.consent.analyticsConsent) {
          window.analyticsInstance?.trackEvent('molecule_button_click', {
            variant: element.dataset.variant,
            journey_stage: context.business.customerJourneyStage,
            lead_score: context.business.leadQualityScore
          });
        }
      });
    },
    
    'molecule-field': (element, context) => {
      const input = element.querySelector('.molecule-field__input');
      if (!input) return;
      
      // Real-time validation
      input.addEventListener('blur', () => {
        MoleculeEnhancer.validateField(element, input);
      });
      
      // Track field interactions
      if (context.technical.consent.analyticsConsent) {
        input.addEventListener('focus', () => {
          window.analyticsInstance?.trackEvent('field_interaction', {
            field_type: element.dataset.fieldType,
            form_context: context.business.formContext
          });
        });
      }
    }
  };
  
  static validateField(fieldElement, input) {
    // Clear previous states
    fieldElement.classList.remove('has-error', 'has-success');
    
    // Validate
    if (!input.checkValidity()) {
      fieldElement.classList.add('has-error');
      // Show error message
    } else if (input.value) {
      fieldElement.classList.add('has-success');
    }
  }
}
```

## Key Benefits

1. **Focused Purpose**: Each molecule does one thing well
2. **Atom Reuse**: Same atoms used across molecules
3. **Context Integration**: Business logic from Context Engine
4. **Flexible Composition**: Easy to create variations
5. **Consistent Behavior**: Standardized patterns
6. **Theme Agnostic**: Structure separate from visuals
