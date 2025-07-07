# Molecule: BUTTON

## Purpose

The BUTTON molecule combines text, optional icons, and interaction states to create a complete, reusable button component with Context Engine awareness for business optimization and accessibility.

## Context Engine Integration

```javascript
// Automatically receives from Context Engine:
{
  business: {
    conversionType: 'appointment_booking',    // Primary conversion goal
    customerJourneyStage: 'decision',        // Current journey stage
    leadQualityScore: 75,                    // Lead scoring
    buttonValue: 'high'                       // Business value
  },
  analytics: {
    trackClicks: true,                        // Click tracking
    conversionTracking: true,                 // Conversion events
    enhancedEcommerce: false                  // E-commerce tracking
  },
  accessibility: {
    announceButtons: true,                    // Screen reader behavior
    keyboardShortcuts: true                   // Keyboard enhancement
  }
}
```

## Multi-Layer Inheritance

```
Context Engine
    ↓
Core Systems (ANALYTICS.md for tracking, ARIA.md for accessibility)
    ↓
Theme System (button styles, colors, animations)
    ↓
Atoms (TEXT, ICON, SPINNER)
    ↓
BUTTON Molecule
    ↓
Organisms (forms, CTAs, navigation)
```

## Implementation

### Liquid Template

```liquid
<!-- molecules/button.html -->
{%- comment -%}
  BUTTON Molecule - Complete button with icon and loading states
  
  Parameters:
  - text (required): Button text
  - href: Link URL (creates anchor-styled button)
  - variant: primary (default), secondary, danger, ghost, link
  - size: sm, md (default), lg
  - icon: Icon name (optional)
  - iconPosition: left (default), right
  - type: button (default), submit, reset
  - disabled: Boolean
  - loading: Boolean - shows spinner
  - fullWidth: Boolean
  - class: Additional CSS classes
  - id: Button ID
  - dataAttributes: Hash of data attributes
  - ariaLabel: Override accessible label
  - ariaPressed: For toggle buttons
  - ariaExpanded: For disclosure buttons
{%- endcomment -%}

{% include components/context-engine.html %}

{%- assign variant = include.variant | default: 'primary' -%}
{%- assign size = include.size | default: 'md' -%}
{%- assign iconPosition = include.iconPosition | default: 'left' -%}
{%- assign element = 'button' -%}
{%- if include.href -%}
  {%- assign element = 'a' -%}
{%- endif -%}

<{{ element }} 
  {% if element == 'button' %}
    type="{{ include.type | default: 'button' }}"
  {% else %}
    href="{{ include.href }}"
    {% if include.external %}
      target="_blank"
      rel="noopener noreferrer"
    {% endif %}
  {% endif %}
  class="molecule-button molecule-button--{{ variant }} molecule-button--{{ size }}{% if include.fullWidth %} molecule-button--full{% endif %}{% if include.loading %} is-loading{% endif %}{% if include.disabled %} is-disabled{% endif %}{% if include.class %} {{ include.class }}{% endif %}"
  {% if include.id %}id="{{ include.id }}"{% endif %}
  {% if include.disabled or include.loading %}
    {% if element == 'button' %}disabled{% endif %}
    aria-disabled="true"
  {% endif %}
  {% if include.ariaLabel %}aria-label="{{ include.ariaLabel }}"{% endif %}
  {% if include.ariaPressed %}aria-pressed="{{ include.ariaPressed }}"{% endif %}
  {% if include.ariaExpanded %}aria-expanded="{{ include.ariaExpanded }}"{% endif %}
  data-component="molecule-button"
  data-variant="{{ variant }}"
  data-business-context="{{ universal_context.business.conversionType }}"
  data-journey-stage="{{ universal_context.business.customerJourneyStage }}"
  data-lead-score="{{ universal_context.business.leadQualityScore }}"
  data-button-value="{{ universal_context.business.buttonValue }}"
  {% if include.dataAttributes %}
    {% for attr in include.dataAttributes %}
      data-{{ attr[0] }}="{{ attr[1] }}"
    {% endfor %}
  {% endif %}>
  
  <span class="molecule-button__content">
    {% if include.icon and iconPosition == 'left' %}
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
    
    {% if include.icon and iconPosition == 'right' %}
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
</{{ element }}>
```

### SCSS Structure

```scss
// molecules/_button.scss
.molecule-button {
  // Structure and layout
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  text-decoration: none;
  cursor: pointer;
  border: none;
  outline: none;
  user-select: none;
  vertical-align: middle;
  
  // Content wrapper
  &__content {
    display: inline-flex;
    align-items: center;
    gap: var(--button-icon-gap);
  }
  
  // Size variants (structure only)
  &--sm {
    --button-padding-y: var(--space-xs);
    --button-padding-x: var(--space-sm);
    --button-icon-gap: var(--space-xs);
    min-height: var(--button-height-sm);
  }
  
  &--md {
    --button-padding-y: var(--space-sm);
    --button-padding-x: var(--space-md);
    --button-icon-gap: var(--space-sm);
    min-height: var(--button-height-md);
  }
  
  &--lg {
    --button-padding-y: var(--space-md);
    --button-padding-x: var(--space-lg);
    --button-icon-gap: var(--space-sm);
    min-height: var(--button-height-lg);
  }
  
  // Apply padding
  padding: var(--button-padding-y) var(--button-padding-x);
  
  // Full width variant
  &--full {
    width: 100%;
  }
  
  // Loading state
  &.is-loading {
    .molecule-button__content {
      opacity: 0;
    }
  }
  
  &__spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  
  // Disabled state
  &.is-disabled,
  &:disabled {
    cursor: not-allowed;
    pointer-events: none;
  }
  
  // Icon positioning
  &__icon {
    flex-shrink: 0;
    
    &--left {
      margin-inline-end: 0; // Gap handles spacing
    }
    
    &--right {
      margin-inline-start: 0; // Gap handles spacing
    }
  }
  
  // Focus visible (accessibility)
  &:focus-visible {
    outline: 2px solid var(--color-focus);
    outline-offset: 2px;
  }
  
  // Theme will handle visual styles for variants
}
```

### JavaScript Enhancement

```javascript
// molecules/button-enhancer.js
import { ContextConsumer } from '../core/context-consumer.js';

export class ButtonEnhancer extends ContextConsumer {
  constructor(element, context) {
    super(element, context);
    this.isLoading = false;
  }
  
  init() {
    // Apply business context
    this.applyBusinessContext();
    
    // Set up click tracking
    if (this.context.analytics.trackClicks) {
      this.setupClickTracking();
    }
    
    // Keyboard enhancements
    if (this.context.accessibility.keyboardShortcuts) {
      this.setupKeyboardHandling();
    }
    
    // Loading state management
    this.setupLoadingState();
  }
  
  applyBusinessContext() {
    const value = this.context.business.buttonValue;
    const stage = this.context.business.customerJourneyStage;
    
    // High-value CTAs get priority styling
    if (value === 'high' && stage === 'decision') {
      this.element.classList.add('molecule-button--high-value');
    }
  }
  
  setupClickTracking() {
    this.element.addEventListener('click', (e) => {
      if (this.isLoading || this.element.disabled) return;
      
      // Track interaction
      window.analyticsInstance?.trackEvent('button_click', {
        variant: this.element.dataset.variant,
        text: this.element.textContent.trim(),
        journey_stage: this.context.business.customerJourneyStage,
        lead_score: this.context.business.leadQualityScore,
        button_value: this.element.dataset.buttonValue,
        conversion_type: this.context.business.conversionType
      });
      
      // Track conversion if applicable
      if (this.context.analytics.conversionTracking && 
          this.element.dataset.conversionAction) {
        window.analyticsInstance?.trackConversion({
          action: this.element.dataset.conversionAction,
          value: this.element.dataset.conversionValue,
          category: 'button_interaction'
        });
      }
    });
  }
  
  setupKeyboardHandling() {
    // Space/Enter for anchor buttons
    if (this.element.tagName === 'A') {
      this.element.addEventListener('keydown', (e) => {
        if (e.key === ' ') {
          e.preventDefault();
          this.element.click();
        }
      });
    }
    
    // Escape to cancel loading
    this.element.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isLoading) {
        this.setLoading(false);
        this.element.dispatchEvent(new CustomEvent('loading:cancelled'));
      }
    });
  }
  
  setupLoadingState() {
    // API for setting loading state
    this.element.setLoading = (loading) => this.setLoading(loading);
  }
  
  setLoading(loading) {
    this.isLoading = loading;
    this.element.classList.toggle('is-loading', loading);
    this.element.setAttribute('aria-busy', loading);
    
    if (this.element.tagName === 'BUTTON') {
      this.element.disabled = loading;
    } else {
      this.element.setAttribute('aria-disabled', loading);
    }
  }
}
```

## Usage Examples

### Primary Actions

```liquid
<!-- High-value CTA -->
{% include molecules/button.html 
   text="Book Free Consultation"
   variant="primary"
   size="lg"
   icon="calendar"
   dataAttributes={
     "track-conversion": "booking_initiated",
     "conversion-value": "500"
   } %}

<!-- Form submission -->
{% include molecules/button.html 
   text="Send Message"
   type="submit"
   variant="primary"
   icon="send"
   iconPosition="right"
   fullWidth=true %}
```

### Secondary Actions

```liquid
<!-- Learn more link -->
{% include molecules/button.html 
   text="Learn More"
   href="/services"
   variant="secondary"
   icon="arrow-right"
   iconPosition="right" %}

<!-- Download button -->
{% include molecules/button.html 
   text="Download PDF"
   variant="ghost"
   icon="download"
   dataAttributes={
     "track-download": "brochure_pdf"
   } %}
```

### State Examples

```liquid
<!-- Loading state -->
{% include molecules/button.html 
   text="Processing..."
   variant="primary"
   loading=true %}

<!-- Disabled state -->
{% include molecules/button.html 
   text="Currently Unavailable"
   variant="secondary"
   disabled=true %}

<!-- Toggle button -->
{% include molecules/button.html 
   text="Notifications"
   variant="ghost"
   icon="bell"
   ariaPressed="false"
   id="notification-toggle" %}
```

## Business Optimization

The button receives optimization parameters from Context Engine:

1. **High-Value CTAs**: Enhanced visual prominence
2. **Journey Stage**: Different styling for awareness vs decision stage
3. **Lead Scoring**: Priority animation for qualified leads
4. **Conversion Tracking**: Automatic event firing
5. **A/B Testing**: Built-in variant tracking

## Accessibility Features

- Full keyboard navigation
- ARIA states (pressed, expanded, busy)
- Focus indicators
- Screen reader announcements
- Loading state communication
- Disabled state handling
- Color contrast compliance

## Testing Checklist

- [ ] All variants render correctly
- [ ] Sizes scale appropriately
- [ ] Icons position correctly
- [ ] Loading state displays spinner
- [ ] Disabled state prevents interaction
- [ ] Click tracking fires events
- [ ] Keyboard navigation works
- [ ] Focus states visible
- [ ] Screen reader announces correctly
- [ ] Mobile touch targets adequate