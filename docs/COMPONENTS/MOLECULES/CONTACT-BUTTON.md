# Contact Button Component Specification

## Overview

The **Contact Button** is a specialized CTA button molecule optimized for lead generation and consultation inquiries. It leverages the Universal Context Engine to automatically generate appropriate analytics tracking, ARIA labels, and business context.

**Component Type**: Molecule
**Inherits From**: Button → Theme Base
**Context Integration**: Full (Analytics, ARIA, SEO, Business)

## Context Consumption

The Contact Button receives and transforms universal context:

```javascript
{
  // Business context for lead generation
  business: {
    conversionType: 'consultation_inquiry',
    customerJourneyStage: 'decision|consideration|awareness',
    leadQualityScore: number,
    expertiseArea: string
  },
  
  // Analytics context
  analytics: {
    trackingEnabled: boolean,
    conversionValue: number,
    engagementLevel: string
  },
  
  // Theme context
  theme: {
    variant: 'primary|secondary|ghost'
  }
}
```

## Component API

### Input Parameters

```liquid
{% include components/contact-button.html 
   text="Get Expert Help"           // Required: Button text
   style="primary"                  // Optional: primary|secondary|ghost
   size="medium"                    // Optional: small|medium|large
   icon="phone"                     // Optional: Icon name
   custom_class=""                  // Optional: Additional CSS classes
%}
```

### Generated Output Structure

The component transforms input into a comprehensive button with:

1. **Business Intelligence Attributes**
   - Lead generation tracking
   - Journey stage awareness
   - Conversion optimization

2. **Accessibility Features**
   - Context-aware ARIA labels
   - Help text generation
   - Focus management

3. **Analytics Integration**
   - GDPR-compliant tracking
   - Event categorization
   - Conversion value attribution

4. **SEO Enhancement**
   - Schema.org ContactAction
   - Structured data markup

## Implementation Reference

The actual implementation lives in:
- Template: `_includes/components/contact-button.html`
- Styles: `_sass/molecules/_contact-button.scss`
- JavaScript: `assets/js/components/contact-button.js`

## Context Transformation

The Contact Button applies these transformations:

```liquid
<!-- From Context Engine -->
{% assign journey_stage = universal_context.business.customerJourneyStage %}
{% assign lead_score = universal_context.business.leadQualityScore %}

<!-- Transform to Component Output -->
data-journey-stage="{{ journey_stage }}"
data-lead-quality-score="{{ lead_score }}"
aria-label="{{ text }}, consultation inquiry, {{ journey_stage }} stage"
```

## Responsive Behavior

- **Mobile**: Full width, larger touch target (48px minimum)
- **Tablet+**: Inline-block, standard sizing
- **All viewports**: Maintains WCAG 2.2 AA compliance

## Business Optimization

The Contact Button automatically optimizes based on:
- Customer journey stage
- Page intent (awareness → conversion)
- User engagement level
- Historical conversion data

## Related Components

- [BUTTON.md](./BUTTON.md) - Base button component
- [CTA-BUTTON.md](./CTA-BUTTON.md) - General CTA variant
- [APPOINTMENT-CALENDAR.md](../ORGANISMS/APPOINTMENT-CALENDAR.md) - Full booking widget

## Example Usage

```liquid
<!-- Simple usage -->
{% include components/contact-button.html 
   text="Book Free Consultation" %}

<!-- With options -->
{% include components/contact-button.html 
   text="Get Expert Help"
   style="primary"
   icon="calendar" %}

<!-- In hero section -->
<div class="hero__cta">
  {% include components/contact-button.html 
     text="Start Your Project"
     size="large" %}
</div>
```

This specification defines the Contact Button's role as a pure transformation component that receives universal context and outputs sophisticated, business-optimized markup.