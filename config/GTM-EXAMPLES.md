# Google Tag Manager Configuration Examples

This guide provides comprehensive examples for configuring Google Tag Manager (GTM) in the getHarsh ecosystem, with entity-aware tracking, multi-touch attribution, and consent mode v2 integration.

## Table of Contents

1. [Overview](#overview)
2. [Basic Configuration](#basic-configuration)
3. [Entity-Aware Tracking](#entity-aware-tracking)
4. [Event Tracking](#event-tracking)
5. [Cross-Domain Tracking](#cross-domain-tracking)
6. [Consent Mode v2](#consent-mode-v2)
7. [Enhanced Ecommerce](#enhanced-ecommerce)
8. [Custom Dimensions](#custom-dimensions)
9. [Server-Side Tagging](#server-side-tagging)
10. [Debug Configuration](#debug-configuration)

## Overview

The GTM configuration system enables sophisticated tracking across the multi-entity ecosystem while respecting user consent and maintaining data privacy. Key features:

- **Entity Separation**: RTEPL and DSPL have separate GTM containers
- **Cross-Domain Tracking**: Seamless user journey tracking across all domains
- **Consent Integration**: Full Google Consent Mode v2 support
- **Multi-Touch Attribution**: Track user interactions across the entire ecosystem
- **Schema.org Aware**: Leverages semantic markup for enhanced tracking

## Basic Configuration

### Minimal GTM Setup

```yaml
# Domain config (e.g., getHarsh.in/config.yml)
# Note: GTMConfig is from website.config.gtm.GTMConfig namespace
gtm_config:
  container:
    container_id: "${RTEPL_GTM_CONTAINER_ID}"  # e.g., "GTM-ABC123"
    load_in_head: true
    enable_noscript: true
    loading_strategy: "async"
  
  data_layer:
    variable_name: "dataLayer"
    page_metadata:
      include_title: true
      include_path: true
      include_type: true  # Uses Schema.org type
```

### Entity-Specific Configuration

```yaml
# For RTEPL domains (getHarsh.in, causality.in, etc.)
gtm_config:
  container:
    container_id: "${RTEPL_GTM_CONTAINER_ID}"
  
  entity_configs:
    RTEPL:
      entity_name: "RawThoughts Enterprises Private Limited"
      ga4_measurement_id: "${RTEPL_GA4_ID}"
      google_ads_account: "${RTEPL_GOOGLE_ADS}"

# For DSPL domains (daostudio.in)
gtm_config:
  container:
    container_id: "${DSPL_GTM_CONTAINER_ID}"
  
  entity_configs:
    DSPL:
      entity_name: "DAO Studio Private Limited"
      ga4_measurement_id: "${DSPL_GA4_ID}"
      google_ads_account: "${DSPL_GOOGLE_ADS}"
```

## Entity-Aware Tracking

### Data Layer Configuration

```yaml
gtm_config:
  data_layer:
    page_metadata:
      include_title: true
      include_path: true
      include_type: true
      include_author: true
      include_category: true
      include_tags: true
      include_breadcrumbs: true
    
    user_properties:
      track_user_id: true  # Hashed for privacy
      track_user_type: true
      track_login_status: true
      custom_properties:
        newsletter_subscriber: "userNewsletterStatus"
        engagement_level: "userEngagementLevel"
    
    entity_properties:
      track_legal_entity: true  # RTEPL or DSPL
      track_brand: true         # Domain brand
      track_project: true       # If on project page
      track_content_source: true
      track_cross_entity: true  # Cross-entity navigation
    
    content_properties:
      track_content_length: true
      track_read_time: true
      track_scroll_depth: true
      track_content_format: true
      track_engagement: true
```

### Initial Data Layer Push

```yaml
gtm_config:
  data_layer:
    initial_values:
      site_name: "${SITE_NAME}"
      site_version: "${SITE_VERSION}"
      environment: "${ENVIRONMENT}"
    
    custom_pushes:
      - event_name: "site_loaded"
        parameters:
          entity: "${LEGAL_ENTITY}"
          brand: "${BRAND}"
          domain: "${DOMAIN}"
        triggers:
          - type: "DOM_READY"
```

## Event Tracking

### Standard Events Configuration

```yaml
gtm_config:
  events:
    standard_events:
      page_view:
        enabled: true
        track_spa_navigation: true  # For Gatsby sites
        custom_parameters:
          content_group: "pageCategory"
          author: "pageAuthor"
      
      engagement:
        enabled: true
        engagement_threshold: 30  # seconds
        track_rage_clicks: true
        track_dead_clicks: true
      
      search:
        enabled: true
        query_parameter: "q"
        track_filters: true
        track_results: true
      
      video:
        enabled: true
        track_youtube: true
        track_html5: true
        progress_thresholds: [10, 25, 50, 75, 90, 100]
      
      downloads:
        enabled: true
        tracked_extensions: 
          - "pdf"
          - "doc"
          - "docx"
          - "xls"
          - "xlsx"
          - "zip"
          - "dmg"
          - "exe"
        track_source: true
      
      outbound:
        enabled: true
        excluded_domains:  # Ecosystem domains
          - "getHarsh.in"
          - "causality.in"
          - "rawThoughts.in"
          - "sleepwalker.in"
          - "daostudio.in"
        track_context: true
```

### Custom Events

```yaml
gtm_config:
  events:
    custom_events:
      - event_name: "newsletter_signup"
        category: "engagement"
        parameters:
          method:
            type: "STATIC"
            value: "footer_form"
          email_domain:
            type: "DYNAMIC"
            value: "emailDomain"
        triggers:
          - type: "FORM_SUBMIT"
            details:
              selector: "form.newsletter-form"
        send_to_ga4: true
      
      - event_name: "contact_form_submit"
        category: "lead_generation"
        parameters:
          form_type:
            type: "DOM"
            value: "form[data-form-type]"
          entity:
            type: "DYNAMIC"
            value: "entityLegal"
        triggers:
          - type: "FORM_SUBMIT"
            details:
              selector: "form.contact-form"
        send_to_ga4: true
        custom_destinations:
          - "${GOOGLE_ADS_TAG}"
      
      - event_name: "project_interaction"
        category: "projects"
        parameters:
          project_name:
            type: "DYNAMIC"
            value: "projectName"
          interaction_type:
            type: "DYNAMIC"
            value: "interactionType"
        triggers:
          - type: "CLICK"
            details:
              selector: ".project-card a"
        conditions:
          - variable: "clickURL"
            operator: "CONTAINS"
            value: "/PROJECTS/"
```

### Conversion Events

```yaml
# Note: When referencing in proto files, use website.config.gtm.ConversionEvent
gtm_config:
  events:
    conversions:
      - conversion_name: "form_submission"
        value:
          type: "STATIC"
          static_value: 10.0
        currency: "USD"
        send_to_google_ads: true
        google_ads_conversion_id: "${GOOGLE_ADS_CONVERSION_ID}"
        google_ads_conversion_label: "CONTACT_FORM"
        custom_parameters:
          form_type: "contact"
          entity: "${LEGAL_ENTITY}"
      
      - conversion_name: "high_value_engagement"
        value:
          type: "CALCULATED"
          dynamic_source: "calculateEngagementValue()"
          default_value: 5.0
        currency: "USD"
        send_to_google_ads: true
        google_ads_conversion_label: "HIGH_ENGAGEMENT"
```

## Cross-Domain Tracking

### Configuration for Ecosystem

```yaml
gtm_config:
  cross_domain:
    enabled: true
    auto_link_domains:
      - "getHarsh.in"
      - "blog.getHarsh.in"
      - "causality.in"
      - "blog.causality.in"
      - "rawThoughts.in"
      - "blog.rawThoughts.in"
      - "sleepwalker.in"
      - "blog.sleepwalker.in"
      - "daostudio.in"
      - "blog.daostudio.in"
    
    linker:
      accept_incoming: true
      decorate_forms: true
      url_position: "query"
    
    exclude_patterns:
      - "*/admin/*"
      - "*/api/*"
      - "*.pdf"
    
    cookie_domain: "auto"
    cookie_flags:
      cookie_prefix: "_gcl_"
      cookie_update: true
      cookie_expires: 365
      cookie_path: "/"
      cookie_samesite: "Lax"
      cookie_secure: true
```

### Cross-Entity Navigation Tracking

```yaml
gtm_config:
  data_layer:
    custom_pushes:
      - event_name: "cross_entity_navigation"
        parameters:
          from_entity: "${CURRENT_ENTITY}"
          to_entity: "${TARGET_ENTITY}"
          from_domain: "${CURRENT_DOMAIN}"
          to_domain: "${TARGET_DOMAIN}"
          navigation_type: "ecosystem_nav"
        triggers:
          - type: "CLICK"
            details:
              selector: "a[href*='getHarsh.in'], a[href*='causality.in'], a[href*='rawThoughts.in'], a[href*='sleepwalker.in'], a[href*='daostudio.in']"
```

## Consent Mode v2

### Basic Consent Configuration

```yaml
gtm_config:
  consent_mode:
    enabled: true
    default_state:
      analytics_storage: "denied"
      ad_storage: "denied"
      ad_user_data: "denied"
      ad_personalization: "denied"
      functionality_storage: "granted"
      personalization_storage: "granted"
      security_storage: "granted"
    
    wait_for_update_ms: 500
    url_passthrough: true
    ads_data_redaction: true
```

### Regional Consent Settings

```yaml
gtm_config:
  consent_mode:
    regional_settings:
      - region: "EU"
        consent_state:
          analytics_storage: "denied"
          ad_storage: "denied"
          ad_user_data: "denied"
          ad_personalization: "denied"
        detection:
          type: "IP_BASED"
      
      - region: "US-CA"  # California
        consent_state:
          analytics_storage: "granted"
          ad_storage: "denied"
          ad_user_data: "denied"
          ad_personalization: "denied"
        detection:
          type: "IP_BASED"
      
      - region: "US"  # Other US states
        consent_state:
          analytics_storage: "granted"
          ad_storage: "granted"
          ad_user_data: "granted"
          ad_personalization: "granted"
        detection:
          type: "IP_BASED"
```

### Consent Update Triggers

```yaml
gtm_config:
  consent_mode:
    update_triggers:
      on_consent_given:
        event_name: "consent_update"
        consent_types:
          - "analytics_storage"
          - "ad_storage"
          - "ad_user_data"
          - "ad_personalization"
      
      on_consent_withdrawn:
        event_name: "consent_revoked"
        consent_types:
          - "analytics_storage"
          - "ad_storage"
      
      on_consent_changed:
        event_name: "consent_modified"
        consent_types:
          - "analytics_storage"
          - "ad_storage"
          - "ad_user_data"
          - "ad_personalization"
```

## Enhanced Ecommerce

### Product Tracking (for Digital Products/Services)

```yaml
gtm_config:
  ecommerce:
    enabled: true
    data_layer_version: "GA4"  # Use GA4 format
    currency_code: "USD"
    
    products:
      track_impressions: true
      track_clicks: true
      track_details: true
      list_names:
        homepage: "Homepage Featured"
        projects: "Projects Gallery"
        services: "Services Listing"
    
    # For service inquiries
    cart:
      track_add_to_cart: true  # Track "Get Quote" clicks
      track_cart_views: true   # Track quote review
    
    # For consultation booking
    checkout:
      track_steps: true
      step_names:
        - "Service Selection"
        - "Contact Information"
        - "Schedule Selection"
        - "Confirmation"
      track_options: true
    
    # For successful bookings
    purchase:
      enabled: true
      include_transaction_details: true
      include_product_details: true
```

### Digital Product Example

```yaml
# For tracking digital product engagement
gtm_config:
  data_layer:
    custom_pushes:
      - event_name: "view_item"
        parameters:
          currency: "USD"
          value: "0"
          items:
            - item_id: "HENA_PROJECT"
              item_name: "HENA - Humanoid Robot"
              item_category: "AI Projects"
              item_brand: "Causality"
              item_list_name: "Featured Projects"
              index: 1
        triggers:
          - type: "PAGE_VIEW"
            details:
              url_pattern: "/PROJECTS/HENA"
```

## Multi-Touch Attribution (MTA)

### Content Discovery Phase Tracking

```yaml
# Track how users discover content
gtm_config:
  events:
    - name: "view_item"
      trigger_type: "pageview"
      conditions:
        - field: "Page Type"
          operator: "equals"
          value: "article"
      parameters:
        - name: "item_id"
          type: "dataLayer"
          value: "article.slug"
        - name: "item_name"
          type: "dataLayer"
          value: "article.title"
        - name: "item_category"
          type: "dataLayer"
          value: "article.content_type"  # From ContentType enum
        - name: "item_brand"
          type: "dataLayer"
          value: "domain.brand"  # From BrandCatalog enum
        - name: "content_type"
          type: "dataLayer"
          value: "article.content_type"
    
    - name: "view_item_list"
      trigger_type: "pageview"
      conditions:
        - field: "Page Type"
          operator: "equals"
          value: "blog_index"
      parameters:
        - name: "item_list_id"
          type: "dataLayer"
          value: "blog.domain"
        - name: "item_list_name"
          type: "dataLayer"
          value: "blog.title"
        - name: "items"
          type: "dataLayer"
          value: "visible_articles"
```

### Engagement Quality Tracking

```yaml
# True engagement = scroll + time combination
gtm_config:
  events:
    - name: "engaged_reader"
      trigger_type: "custom"
      conditions:
        - field: "Scroll Depth"
          operator: "greater_than"
          value: "50"
        - field: "Time on Page"
          operator: "greater_than"
          value: "30"
      parameters:
        - name: "engagement_type"
          type: "static"
          value: "true_read"
        - name: "content_group"
          type: "dataLayer"
          value: "article.content_type"
        - name: "author"
          type: "dataLayer"
          value: "article.author"  # From PersonCatalog
        - name: "scroll_depth"
          type: "variable"
          value: "{{Scroll Depth}}"
        - name: "time_engaged"
          type: "variable"
          value: "{{Time on Page}}"
```

### Social Proof Events

```yaml
# Track share intent AND completion
gtm_config:
  events:
    - name: "share"  # GA4 recommended event
      trigger_type: "click"
      conditions:
        - field: "Click Classes"
          operator: "contains"
          value: "share-button"
      parameters:
        - name: "method"
          type: "dataAttribute"
          value: "data-platform"  # From DiscussionPlatform enum
        - name: "content_type"
          type: "dataLayer"
          value: "article.content_type"
        - name: "item_id"
          type: "dataLayer"
          value: "article.slug"
    
    - name: "share_complete"  # Custom for completed shares
      trigger_type: "custom"
      conditions:
        - field: "Event"
          operator: "equals"
          value: "shareConfirmed"
      parameters:
        - name: "method"
          type: "dataLayer"
          value: "share.platform"
        - name: "share_url"
          type: "dataLayer"
          value: "share.generated_url"  # With UTM params
        - name: "content_type"
          type: "dataLayer"
          value: "article.content_type"
```

### Cross-Entity Journey Tracking

```yaml
# Track movement between legal entities
gtm_config:
  events:
    - name: "cross_entity_navigation"
      trigger_type: "click"
      conditions:
        - field: "Click URL Hostname"
          operator: "not_equals"
          value: "{{Page Hostname}}"
      parameters:
        - name: "from_entity"
          type: "dataLayer"
          value: "entity.current"  # From EntityCatalog
        - name: "to_entity"
          type: "lookup"
          value: "{{Click URL Hostname}} → entity"
        - name: "from_domain"
          type: "variable"
          value: "{{Page Hostname}}"
        - name: "to_domain"
          type: "variable"
          value: "{{Click URL Hostname}}"
        - name: "navigation_type"
          type: "computed"
          value: "{{Navigation Pattern}}"  # blog_to_domain, etc.
```

### Appointment/Lead Generation

```yaml
# Track appointment booking funnel
gtm_config:
  events:
    - name: "generate_lead"  # GA4 recommended
      trigger_type: "visibility"
      conditions:
        - field: "Element ID"
          operator: "equals"
          value: "google-calendar-widget"
      parameters:
        - name: "value"
          type: "static"
          value: "100"  # Appointment value
        - name: "currency"
          type: "static"
          value: "USD"
        - name: "lead_source"
          type: "dataLayer"
          value: "traffic.source"
        - name: "interested_service"
          type: "dataLayer"
          value: "viewed_services"  # From ServiceType enum
    
    - name: "appointment_interaction"
      trigger_type: "custom"
      conditions:
        - field: "Event"
          operator: "equals"
          value: "calendarInteraction"
      parameters:
        - name: "interaction_type"
          type: "dataLayer"
          value: "calendar.action"
        - name: "available_slots"
          type: "dataLayer"
          value: "calendar.slots_shown"
```

### Journey Stage Tracking

```yaml
# Track user progression through customer journey
gtm_config:
  custom_dimensions:
    - index: 10
      name: "journey_stage"
      scope: "session"
      description: "Discovery/Engagement/Consideration/Conversion"
  
  computed_metrics:
    journey_stage:
      rules:
        - condition: "page_views == 1 AND time_on_site < 60"
          value: "Discovery"
        - condition: "engaged_reader > 0 OR share > 0"
          value: "Engagement"
        - condition: "service_pages_viewed > 0 OR about_page_viewed"
          value: "Consideration"
        - condition: "generate_lead > 0 OR contact_form_submit"
          value: "Conversion"
```

## Custom Dimensions

### Entity Tracking Dimensions

```yaml
gtm_config:
  custom_dimensions:
    entity_dimension:
      legal_entity_dimension: "dimension1"
      brand_dimension: "dimension2"
      project_dimension: "dimension3"
      source_dimension: "dimension4"
    
    user_dimensions:
      - name: "user_type"
        index: 5
        scope: "USER"
        value_source: "userType"
        default_value: "visitor"
      
      - name: "engagement_level"
        index: 6
        scope: "USER"
        value_source: "userEngagementLevel"
        default_value: "low"
    
    event_dimensions:
      - name: "content_author"
        index: 7
        scope: "EVENT"
        value_source: "pageAuthor"
        default_value: "Harsh"
      
      - name: "content_category"
        index: 8
        scope: "EVENT"
        value_source: "pageCategory"
      
      - name: "interaction_type"
        index: 9
        scope: "EVENT"
        value_source: "interactionType"
    
    metrics:
      - name: "engagement_score"
        index: 1
        type: "NUMBER"
        unit: "points"
      
      - name: "content_depth"
        index: 2
        type: "PERCENTAGE"
        unit: "percent"
```

## Server-Side Tagging

### Configuration for First-Party Data

```yaml
gtm_config:
  server_side:
    enabled: true
    server_container_url: "https://collect.${DOMAIN}"
    transport: "GTM"
    
    first_party:
      endpoint: "/gtm/collect"
      headers:
        X-Forwarded-For: "client_ip"
        X-GTM-Server-Preview: "preview_header"
      batch_requests: true
      batch_size: 10
    
    client_id:
      cookie_name: "_gaClientId"
      generate_if_missing: true
      hash_client_id: false
```

## Debug Configuration

### Development Settings

```yaml
gtm_config:
  debug:
    enabled: ${GTM_DEBUG_MODE}
    log_level: "DEBUG"
    console_logging: true
    debug_events:
      - "page_view"
      - "user_engagement"
      - "consent_update"
      - "cross_entity_navigation"
      - "form_submit"
    
    validation_mode: true
    
    preview:
      enabled: true
      cookie_name: "gtm_preview"
      share_preview_url: true
```

### Enhanced Measurement

```yaml
gtm_config:
  events:
    enhanced_measurement:
      enable_all: false  # Configure individually
      
      scroll:
        enabled: true
        thresholds: [25, 50, 75, 90, 100]
        track_time_to_scroll: true
      
      forms:
        enabled: true
        track_starts: true
        track_abandonment: true
        track_field_interactions: true
        excluded_forms:
          - "form.search-form"
          - "form.comment-form"
      
      site_search: true
      video_engagement: true
      file_downloads: true
```

## Complete Example Configuration

### Full Domain Configuration

```yaml
# getHarsh.in/config.yml (excerpt)
gtm_config:
  container:
    container_id: "${RTEPL_GTM_CONTAINER_ID}"
    load_in_head: true
    enable_noscript: true
    loading_strategy: "async"
  
  data_layer:
    variable_name: "dataLayer"
    initial_values:
      site_name: "getHarsh"
      legal_entity: "RTEPL"
      environment: "${ENVIRONMENT}"
    
    page_metadata:
      include_title: true
      include_path: true
      include_type: true
      include_category: true
      include_author: true
      include_tags: true
    
    user_properties:
      track_user_id: true
      track_user_type: true
      track_login_status: true
    
    entity_properties:
      track_legal_entity: true
      track_brand: true
      track_project: true
      track_content_source: true
      track_cross_entity: true
    
    content_properties:
      track_content_length: true
      track_read_time: true
      track_scroll_depth: true
  
  events:
    standard_events:
      page_view:
        enabled: true
        track_spa_navigation: true
      
      engagement:
        enabled: true
        engagement_threshold: 30
      
      search:
        enabled: true
        query_parameter: "q"
      
      downloads:
        enabled: true
        tracked_extensions: ["pdf", "doc", "zip"]
      
      outbound:
        enabled: true
        excluded_domains: ${ecosystem_domains}
    
    custom_events:
      - event_name: "newsletter_signup"
        category: "engagement"
        triggers:
          - type: "FORM_SUBMIT"
            details:
              selector: "form.newsletter"
        send_to_ga4: true
    
    conversions:
      - conversion_name: "contact_form"
        value:
          type: "STATIC"
          static_value: 10.0
        currency: "USD"
        send_to_google_ads: true
  
  consent_mode:
    enabled: true
    default_state:
      analytics_storage: "denied"
      ad_storage: "denied"
    wait_for_update_ms: 500
    url_passthrough: true
    regional_settings:
      - region: "EU"
        consent_state:
          analytics_storage: "denied"
          ad_storage: "denied"
  
  cross_domain:
    enabled: true
    auto_link_domains: ${ecosystem_domains}
    linker:
      accept_incoming: true
      decorate_forms: true
    cookie_domain: "auto"
  
  custom_dimensions:
    entity_dimension:
      legal_entity_dimension: "dimension1"
      brand_dimension: "dimension2"
  
  entity_configs:
    RTEPL:
      entity_name: "RawThoughts Enterprises Private Limited"
      ga4_measurement_id: "${RTEPL_GA4_ID}"
      entity_events:
        - event_name: "rtepl_interaction"
          category: "entity_specific"
```

## Best Practices

1. **Entity Separation**: Always use separate GTM containers for RTEPL and DSPL
2. **Consent First**: Implement consent mode before any tracking
3. **Test Thoroughly**: Use GTM preview mode and GA4 DebugView
4. **Document Tags**: Keep detailed documentation in GTM interface
5. **Version Control**: Export GTM container regularly to Git
6. **Performance**: Use async loading and minimize custom JavaScript
7. **Privacy**: Hash all PII, respect consent choices
8. **Cross-Domain**: Test linker functionality across all domains

## Troubleshooting

### Common Issues

1. **Cross-domain tracking not working**
   - Check auto_link_domains includes all ecosystem domains
   - Verify linker accept_incoming is true
   - Test with GTM preview across domains

2. **Consent mode blocking data**
   - Check regional settings
   - Verify consent update triggers fire
   - Use GA4 DebugView to see consent state

3. **Custom dimensions not appearing**
   - Ensure dimensions are registered in GA4
   - Check value_source matches dataLayer variable
   - Verify scope is correct

4. **Server-side not receiving hits**
   - Check server container URL
   - Verify transport method
   - Test with curl to endpoint

## See Also

- [GTM Schema Definition](schema/gtm.proto)
- [GTM Mappings](schema/gtm-mappings.yml)
- [Consent Configuration](CONSENT-EXAMPLES.md)
- [Google Tag Manager Documentation](https://developers.google.com/tag-platform/tag-manager)
- [GA4 Documentation](https://developers.google.com/analytics/devguides/collection/ga4)