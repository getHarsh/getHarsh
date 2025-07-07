# Appointment Calendar Component Specification

## Overview

The **Appointment Calendar** is a complex organism that integrates third-party calendar services (Calendly, Google Calendar) for consultation booking. It provides responsive behavior, GDPR-compliant tracking, and business model optimization for lead generation.

**Component Type**: Organism
**Context Integration**: Full (Analytics, ARIA, SEO, Performance, Legal)
**Business Model**: Appointment booking & consultation scheduling

## Context Consumption

The Appointment Calendar receives and transforms universal context:

```javascript
{
  // Business context
  business: {
    conversionType: 'appointment_booking',
    consultationValue: 500, // USD
    vertical: 'technical_consulting'
  },
  
  // Legal context
  legal: {
    consentState: {
      analytics: boolean,
      marketing: boolean
    },
    gdprRegion: boolean
  },
  
  // Theme context
  theme: {
    palette: {
      primary: string // For calendar theming
    }
  },
  
  // Performance context
  performance: {
    loadingStrategy: 'lazy|eager'
  }
}
```

## Component API

### Input Parameters

```liquid
{% include components/appointment-calendar.html 
   calendar_url="https://calendly.com/consultation"  // Required
   height="600"                                      // Optional: Default 600
   title="Book a Consultation"                       // Optional
   description="Technical assessment included"       // Optional
   loading="lazy"                                   // Optional: lazy|eager
%}
```

### Responsive Behavior

- **Mobile (< 768px)**: 
  - Reduced height (400px)
  - Simplified UI
  - Touch-optimized
  
- **Tablet (768px - 1023px)**:
  - Standard height (600px)
  - Full calendar view
  
- **Desktop (1024px+)**:
  - Full height (600px+)
  - Side-by-side week view
  - Enhanced navigation

## GDPR Compliance

The component implements consent-aware tracking:

1. **No Consent**: Calendar loads but no tracking
2. **Analytics Consent**: Basic view tracking enabled
3. **Marketing Consent**: Full conversion tracking

```javascript
// Consent checking before tracking
if (window.analyticsInstance?.getConsentState('analytics')) {
  // Track calendar view
}
```

## Business Intelligence

Automatic tracking includes:
- Calendar load events
- Appointment booking initiation
- Conversion value attribution
- Consultation type categorization

## Accessibility Features

- **ARIA Application Role**: For complex widget
- **Keyboard Navigation**: Full support
- **Screen Reader Instructions**: Clear guidance
- **Focus Management**: Proper tab order

## Performance Optimization

- **Lazy Loading**: Default for below-fold placement
- **Eager Loading**: For above-fold CTAs
- **Iframe Sandboxing**: Security isolation
- **Error Boundaries**: Graceful failure handling

## Implementation Reference

The actual implementation lives in:
- Template: `_includes/components/appointment-calendar.html`
- Styles: `_sass/organisms/_appointment-calendar.scss`
- JavaScript: `assets/js/components/appointment-calendar.js`

## Context Transformation

```liquid
<!-- From Context Engine -->
{% assign primary_color = universal_context.theme.palette.primary %}
{% assign consent_state = universal_context.legal.consentState %}

<!-- Transform to Calendar Parameters -->
src="{{ calendar_url }}?embed_domain={{ site.domain }}&primary_color={{ primary_color }}"

<!-- Conditional Analytics -->
{% if consent_state.analytics %}
  data-track-impression="appointment_calendar_view"
{% endif %}
```

## Error Handling

The component includes robust error handling:
- Calendar service unavailability
- Network failures
- Consent state changes
- Cross-origin issues

## Related Components

- [CONTACT-BUTTON.md](../MOLECULES/CONTACT-BUTTON.md) - CTA to open calendar
- [GOOGLE-APPOINTMENT.md](./GOOGLE-APPOINTMENT.md) - Alternative Google Calendar
- [CONSENT-BANNER.md](./CONSENT-BANNER.md) - GDPR consent management

## Example Usage

```liquid
<!-- Basic calendar -->
{% include components/appointment-calendar.html 
   calendar_url="https://calendly.com/harsh-tech/consultation" %}

<!-- With customization -->
{% include components/appointment-calendar.html 
   calendar_url="https://calendly.com/harsh-tech/consultation"
   title="Schedule Your Technical Assessment"
   description="45-minute consultation includes project review"
   height="700" %}

<!-- Hero section integration -->
<section class="hero hero--conversion">
  <h1>Get Expert Guidance</h1>
  <p>Book a free consultation to discuss your project</p>
  
  {% include components/appointment-calendar.html 
     calendar_url="{{ site.calendly_url }}"
     loading="eager" %}
</section>
```

This specification defines the Appointment Calendar as a sophisticated organism that transforms universal context into a business-optimized, compliant booking experience.