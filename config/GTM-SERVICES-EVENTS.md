# GTM Services Conversion Events Implementation Guide

This guide provides a comprehensive implementation plan for adding Google Tag Manager (GTM) conversion events for services pages across the getHarsh ecosystem.

## Overview

Services represent THE primary business conversion goal (alongside sponsorship). This guide implements the GTM tracking strategy outlined in PRD_SERVICE.md, leveraging the existing GTM infrastructure.

## Conversion Events Hierarchy

### Primary Conversions (High Value)
1. **Consultation Booking Click** - User clicks "Book a Free AI Strategy Session"
2. **Quote Form Submission** - User submits detailed service quote form

### Secondary Conversions (Medium Value)
3. **Service Card Interaction** - User explores specific service offerings
4. **Industry Page View** - User visits industry-specific service page

### Micro-conversions (Low Value)
5. **Time on Service Page** - User spends >30 seconds on services
6. **Service Feature Expand** - User explores service details

## Implementation

### 1. Environment Variables

Add to `.env` file:

```bash
# GTM Container IDs (Entity-specific)
GATSBY_GTM_CONTAINER_ID="GTM-GETHARSH"  # Default container
RTEPL_GTM_CONTAINER_ID="GTM-RTEPL"      # RawThoughts Enterprises
DSPL_GTM_CONTAINER_ID="GTM-DSPL"        # DAO Studio

# Google Ads Conversion Tracking
GOOGLE_ADS_CONVERSION_ID="AW-123456789"
GOOGLE_ADS_CONSULTATION_LABEL="CONSULTATION_BOOK"
GOOGLE_ADS_QUOTE_LABEL="QUOTE_REQUEST"
GOOGLE_ADS_SERVICE_VIEW_LABEL="SERVICE_INTEREST"

# Conversion Values (USD)
CONSULTATION_VALUE="150"
QUOTE_VALUE="75"
SERVICE_INTERACTION_VALUE="10"
```

### 2. Domain Configuration

Add to `config.yml` for each domain:

```yaml
# Services GTM Configuration
# Note: ConversionEvent type is from website.config.gtm.ConversionEvent
gtm_config:
  # Entity-specific container
  container:
    container_id: "${RTEPL_GTM_CONTAINER_ID}"  # or DSPL_GTM_CONTAINER_ID
    
  # Service conversion events
  events:
    conversions:
      # Primary: Consultation Booking
      - conversion_name: "consultation_booking_click"
        value:
          type: "STATIC"
          static_value: 150.0
        currency: "USD"
        send_to_google_ads: true
        google_ads_conversion_id: "${GOOGLE_ADS_CONVERSION_ID}"
        google_ads_conversion_label: "${GOOGLE_ADS_CONSULTATION_LABEL}"
        custom_parameters:
          conversion_type: "primary"
          service_category: "ai_transformation"
          entity: "${LEGAL_ENTITY}"
          
      # Secondary: Quote Form Submit
      - conversion_name: "quote_form_submit"
        value:
          type: "STATIC"
          static_value: 75.0
        currency: "USD"
        send_to_google_ads: true
        google_ads_conversion_id: "${GOOGLE_ADS_CONVERSION_ID}"
        google_ads_conversion_label: "${GOOGLE_ADS_QUOTE_LABEL}"
        custom_parameters:
          conversion_type: "secondary"
          
    # Service interaction events
    custom_events:
      # Service card interactions
      - event_name: "service_interest"
        category: "engagement"
        triggers:
          - type: "CLICK"
            details:
              selector: ".service-card, .service-learn-more"
        parameters:
          - name: "service_category"
            type: "DATA_ATTRIBUTE"
            attribute: "data-service-category"
          - name: "interaction_type"
            type: "DATA_ATTRIBUTE"
            attribute: "data-interaction-type"
            
      # Industry page views
      - event_name: "industry_page_view"
        category: "page_view"
        triggers:
          - type: "PAGE_VIEW"
            details:
              path_pattern: "/services/industries/*"
        parameters:
          - name: "industry"
            type: "URL_PATH"
            path_index: 3
            
      # Time-based engagement
      - event_name: "service_page_engagement"
        category: "engagement"
        triggers:
          - type: "TIMER"
            details:
              interval: 30000  # 30 seconds
              limit: 1
              selector: "[data-page-type='services']"
```

### 3. Services Configuration

Add to `config_services.yml`:

```yaml
# Analytics configuration for services
analytics:
  # Primary conversion events
  primary_conversion_event: "consultation_booking_click"
  secondary_conversion_event: "quote_form_submit"
  
  # Event tracking settings
  track_service_interactions: true
  track_industry_views: true
  track_blog_to_service: true
  
  # Attribution settings
  attribution_model: "data-driven"
  lookback_window: 30  # days
  
  # Custom dimensions for GA4
  custom_dimensions:
    - dimension_name: "service_category"
      scope: "event"
      description: "AI Growth, AI Interface, or AI Intelligence"
    - dimension_name: "user_intent"
      scope: "session"
      description: "Commercial, Informational, or Navigational"
    - dimension_name: "industry_vertical"
      scope: "event"
      description: "Target industry for services"
```

### 4. React Component Implementation

Create reusable tracking utilities:

```javascript
// utils/gtm-services.js
export const GTMServices = {
  // Push event to dataLayer
  pushEvent: (eventData) => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push(eventData);
    }
  },

  // Track consultation booking click
  trackConsultationClick: (serviceContext = {}) => {
    GTMServices.pushEvent({
      event: 'consultation_booking_click',
      conversion_value: 'high',
      service_interest: serviceContext.category || 'general',
      service_page_type: serviceContext.pageType || 'main',
      cta_location: serviceContext.location || 'hero',
      entity: process.env.GATSBY_LEGAL_ENTITY || 'RTEPL'
    });

    // Also send to Google Ads
    if (window.gtag) {
      window.gtag('event', 'conversion', {
        send_to: `${process.env.GATSBY_GOOGLE_ADS_CONVERSION_ID}/${process.env.GATSBY_GOOGLE_ADS_CONSULTATION_LABEL}`,
        value: 150.0,
        currency: 'USD'
      });
    }
  },

  // Track quote form submission
  trackQuoteSubmit: (formData) => {
    GTMServices.pushEvent({
      event: 'quote_form_submit',
      form_data: {
        service_interest: formData.service,
        budget_range: formData.budget,
        timeline: formData.timeline,
        company_size: formData.companySize
      },
      conversion_value: 'medium',
      entity: process.env.GATSBY_LEGAL_ENTITY || 'RTEPL'
    });
  },

  // Track service card interaction
  trackServiceInteraction: (category, interactionType) => {
    GTMServices.pushEvent({
      event: 'service_interest',
      service_category: category, // ai_growth, ai_interface, ai_intelligence
      interaction_type: interactionType // card_click, learn_more, feature_expand
    });
  },

  // Track industry page view
  trackIndustryPageView: (industry) => {
    GTMServices.pushEvent({
      event: 'industry_page_view',
      page_type: 'services',
      page_category: 'conversion',
      user_intent: 'high_commercial',
      service_page_type: 'industry',
      industry_vertical: industry
    });
  },

  // Track blog to service navigation
  trackBlogToService: (articleData) => {
    GTMServices.pushEvent({
      event: 'blog_to_service_click',
      source_article: articleData.title,
      source_category: articleData.category,
      target_service: articleData.targetService,
      cta_type: articleData.ctaType // inline, sidebar, footer
    });
  }
};
```

### 5. Component Usage Examples

```jsx
// In consultation CTA button
<Button
  onClick={() => {
    GTMServices.trackConsultationClick({
      category: 'ai_transformation',
      pageType: 'main',
      location: 'hero'
    });
    // Navigate to booking
    navigate('/contact#appointment');
  }}
>
  Book Your Free AI Strategy Session
</Button>

// In service cards
<ServiceCard
  onClick={() => {
    GTMServices.trackServiceInteraction(
      service.category,
      'card_click'
    );
  }}
  data-service-category={service.category}
  data-interaction-type="card_click"
>
  {/* Card content */}
</ServiceCard>

// In quote form
<QuoteForm
  onSubmit={(formData) => {
    GTMServices.trackQuoteSubmit(formData);
    // Submit form logic
  }}
/>
```

### 6. Blog Integration Tracking

For smart service CTAs in blog posts:

```jsx
// In blog post component
<ServiceCTA
  service={recommendedService}
  onClick={() => {
    GTMServices.trackBlogToService({
      title: post.title,
      category: post.category,
      targetService: recommendedService,
      ctaType: 'inline'
    });
  }}
/>
```

## GTM Container Configuration

### Tags to Create

1. **GA4 Configuration Tag**
   - Tag Type: Google Analytics: GA4 Configuration
   - Measurement ID: `G-XXXXXXXXXX`
   - Fields to Set:
     - `user_properties.entity`: {{Legal Entity}}
     - `user_properties.domain`: {{Page Hostname}}

2. **Consultation Booking Conversion Tag**
   - Tag Type: Google Ads Conversion Tracking
   - Conversion ID: {{Google Ads Conversion ID}}
   - Conversion Label: {{Consultation Label}}
   - Conversion Value: 150
   - Currency: USD
   - Trigger: Custom Event - consultation_booking_click

3. **Quote Form Conversion Tag**
   - Tag Type: Google Ads Conversion Tracking
   - Conversion ID: {{Google Ads Conversion ID}}
   - Conversion Label: {{Quote Label}}
   - Conversion Value: 75
   - Currency: USD
   - Trigger: Form Submission - Quote Form

### Variables to Create

1. **Legal Entity Variable**
   - Variable Type: Data Layer Variable
   - Data Layer Variable Name: entity

2. **Service Category Variable**
   - Variable Type: Data Layer Variable
   - Data Layer Variable Name: service_category

3. **Conversion Value Variable**
   - Variable Type: Data Layer Variable
   - Data Layer Variable Name: conversion_value

### Triggers to Create

1. **Consultation Click Trigger**
   - Trigger Type: Custom Event
   - Event Name: consultation_booking_click

2. **Quote Form Submit Trigger**
   - Trigger Type: Custom Event
   - Event Name: quote_form_submit

3. **Service Interaction Trigger**
   - Trigger Type: Click - All Elements
   - Click Classes: contains "service-card" OR contains "service-learn-more"

## Testing & Validation

### 1. GTM Preview Mode
- Enable GTM Preview mode
- Navigate through services pages
- Verify events fire correctly
- Check variable population

### 2. Google Analytics Debugger
- Install GA Debugger Chrome extension
- Monitor event firing in console
- Verify event parameters

### 3. Conversion Testing
- Use Google Ads Tag Assistant
- Test conversion tracking
- Verify conversion values

## Performance Considerations

1. **Lazy Loading**: GTM loads asynchronously after consent
2. **Event Batching**: Group related events to reduce requests
3. **Data Minimization**: Only track necessary parameters
4. **Consent Mode**: All tracking respects user consent

## Multi-Entity Considerations

Each legal entity (RTEPL/DSPL) should have:
- Separate GTM containers
- Entity-specific conversion IDs
- Distinct conversion values
- Separate Google Ads accounts

## Success Metrics

Track these KPIs in GA4:
1. Consultation booking rate
2. Quote form completion rate
3. Service page engagement time
4. Blog-to-service conversion rate
5. Industry page performance

## Implementation Checklist

- [ ] Set up GTM containers for each entity
- [ ] Configure environment variables
- [ ] Add GTM configuration to domain configs
- [ ] Implement tracking utilities
- [ ] Add tracking to service components
- [ ] Configure GTM tags and triggers
- [ ] Test in GTM Preview mode
- [ ] Verify Google Ads conversion tracking
- [ ] Monitor in GA4 real-time reports
- [ ] Set up conversion value tracking

This implementation ensures comprehensive tracking of all service-related conversions while maintaining clean separation between configuration and code, respecting user consent, and supporting multi-entity operations.