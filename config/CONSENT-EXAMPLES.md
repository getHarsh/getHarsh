# Consent Management Configuration Examples

This guide provides comprehensive examples for configuring consent management across the getHarsh ecosystem, ensuring GDPR compliance, Google Consent Mode v2 integration, and cross-domain consent synchronization.

## Table of Contents

1. [Overview](#overview)
2. [Basic Configuration](#basic-configuration)
3. [Banner Configuration](#banner-configuration)
4. [Consent Categories](#consent-categories)
5. [Google Consent Mode v2](#google-consent-mode-v2)
6. [Regional Compliance](#regional-compliance)
7. [Cross-Domain Synchronization](#cross-domain-synchronization)
8. [Entity-Specific Configuration](#entity-specific-configuration)
9. [Advanced Features](#advanced-features)
10. [Implementation Checklist](#implementation-checklist)

## Overview

The consent management system provides:

- **€1.34M GDPR Fine Prevention**: Comprehensive compliance features
- **Google Consent Mode v2**: Full integration with regional defaults
- **Multi-Entity Support**: Separate configurations for RTEPL and DSPL
- **Cross-Domain Sync**: Consent state shared across all ecosystem domains
- **Regional Compliance**: EU, US, California, India specific rules
- **Audit Trail**: Complete consent history and logging

## Basic Configuration

### Minimal Setup

```yaml
# Domain config (e.g., getHarsh.in/config.yml)
consent_config:
  core:
    enabled: true
    version: "1.0"
    expiry_days: 365
    require_explicit_consent: true
    enable_granular_control: true
    
  banner:
    display:
      position: "bottom"
      show_on_first_visit: true
    content:
      text: "We use cookies to analyze site usage and improve your experience."
      privacy_url: "/privacy"
      cookie_url: "/cookies"
```

### Full Core Configuration

```yaml
consent_config:
  core:
    enabled: true
    version: "1.0"  # Increment to re-show banner
    default_state:
      analytics: "denied"
      marketing: "denied"
      functional: "granted"
      necessary: "granted"  # Always granted
    expiry_days: 365
    require_explicit_consent: true
    enable_granular_control: true
    refresh_period_days: 90  # Re-ask after 90 days
    block_until_consent: false  # Don't block content
```

## Banner Configuration

### Complete Banner Setup

```yaml
consent_config:
  banner:
    # Display settings
    display:
      position: "bottom"
      show_on_first_visit: true
      display_delay_ms: 1000
      z_index: 9999
      show_backdrop: true
      backdrop_opacity: 0.8
    
    # Content
    content:
      text: "We value your privacy. We use cookies and similar technologies to analyze site usage, improve your experience, and deliver personalized content. Some features may not work properly without cookies."
      privacy_link_text: "Privacy Policy"
      privacy_url: "${entity:privacy_url}"
      cookie_link_text: "Cookie Policy"
      cookie_url: "${entity:cookie_url}"
      legitimate_interest_text: "We have a legitimate interest in analyzing usage patterns."
      vendor_list_url: "/vendors"
      enable_html: true
    
    # Styling
    styling:
      theme: "auto"  # Follow system dark/light mode
      css_class: "consent-banner-custom"
      max_width: 1200
      border_radius: 8
      padding: 24
      font_family: "Inter, system-ui, sans-serif"
      colors:
        background: "#ffffff"
        text: "#1e293b"
        link: "#2563eb"
        button_primary: "#2563eb"
        button_secondary: "#64748b"
        border: "#e2e8f0"
    
    # Behavior
    behavior:
      auto_hide: true
      remember_dismiss: true
      dismiss_duration_days: 30
      reshow_on_update: true
      close_on_backdrop: false
      close_on_escape: true
      focus_trap: true
    
    # Buttons
    buttons:
      accept_all:
        text: "Accept All"
        show: true
        style: "primary"
        aria_label: "Accept all cookies"
      reject_all:
        text: "Reject All"
        show: true
        style: "secondary"
        aria_label: "Reject all non-essential cookies"
      settings:
        text: "Cookie Settings"
        show: true
        style: "text"
        aria_label: "Manage cookie preferences"
      save:
        text: "Save Preferences"
        show: true
        style: "primary"
        aria_label: "Save cookie preferences"
      close:
        text: "×"
        show: true
        style: "text"
        css_class: "close-button"
        aria_label: "Close consent banner"
      button_order:
        - "settings"
        - "reject_all"
        - "accept_all"
    
    # Animations
    animations:
      enabled: true
      entry: "slide"
      exit: "fade"
      duration_ms: 300
      easing: "ease-in-out"
```

### Mobile-Optimized Banner

```yaml
consent_config:
  banner:
    display:
      position: "bottom"
      z_index: 10000
    styling:
      max_width: 600  # Smaller for mobile
      border_radius: 16  # Rounded corners on mobile
      padding: 16
    buttons:
      # Simplified for mobile
      button_order:
        - "reject_all"
        - "accept_all"
      settings:
        show: false  # Hide on mobile
```

## Consent Categories

### Standard Categories Configuration

```yaml
consent_config:
  categories:
    # Necessary cookies (always enabled)
    - id: "necessary"
      name: "Necessary"
      description: "Required for the website to function properly. These cookies cannot be disabled."
      required: true
      pre_selected: true
      providers:
        - name: "Authentication System"
          description: "Manages user sessions"
          type: "security"
        - name: "Load Balancer"
          description: "Distributes traffic"
          type: "functional"
      cookies:
        - name: "consent_state"
          domain: ".${domain}"
          expiry: "1 year"
          type: "first_party"
          description: "Stores your consent preferences"
        - name: "session_id"
          domain: "${domain}"
          expiry: "session"
          type: "session"
          description: "Maintains your session"
      purposes:
        - id: "security"
          name: "Security"
          description: "Protect against unauthorized access"
          legal_basis: "legal_obligation"
    
    # Analytics cookies
    - id: "analytics"
      name: "Analytics"
      description: "Help us understand how visitors interact with our websites by collecting and reporting information anonymously."
      required: false
      pre_selected: false
      linked_categories: []  # No dependencies
      providers:
        - name: "Google Analytics"
          description: "Website analytics service"
          type: "analytics"
          privacy_url: "https://policies.google.com/privacy"
          purposes: ["usage_analytics", "performance_monitoring"]
        - name: "Microsoft Clarity"
          description: "User behavior analytics"
          type: "analytics"
          privacy_url: "https://privacy.microsoft.com"
      cookies:
        - name: "_ga"
          domain: ".${domain}"
          expiry: "2 years"
          type: "first_party"
          description: "Distinguishes unique users"
        - name: "_gid"
          domain: ".${domain}"
          expiry: "24 hours"
          type: "first_party"
          description: "Distinguishes users"
      storage_types:
        - "cookie"
        - "localStorage"
      purposes:
        - id: "usage_analytics"
          name: "Usage Analytics"
          description: "Understand how visitors use our site"
          legal_basis: "consent"
    
    # Marketing cookies
    - id: "marketing"
      name: "Marketing"
      description: "Used to track visitors across websites to display ads that are relevant and engaging."
      required: false
      pre_selected: false
      linked_categories:
        - "analytics"  # Marketing requires analytics
      providers:
        - name: "Meta Pixel"
          description: "Facebook advertising"
          type: "advertising"
          privacy_url: "https://www.facebook.com/privacy"
        - name: "Twitter Pixel"
          description: "Twitter advertising"
          type: "advertising"
        - name: "LinkedIn Insight Tag"
          description: "LinkedIn advertising"
          type: "advertising"
      cookies:
        - name: "_fbp"
          domain: ".facebook.com"
          expiry: "3 months"
          type: "third_party"
          description: "Facebook browser ID"
      purposes:
        - id: "targeted_advertising"
          name: "Targeted Advertising"
          description: "Show relevant ads based on your interests"
          legal_basis: "consent"
    
    # Functional cookies
    - id: "functional"
      name: "Functional"
      description: "Enable enhanced functionality and personalization, such as videos and live chats."
      required: false
      pre_selected: true
      providers:
        - name: "YouTube"
          description: "Video playback"
          type: "functional"
        - name: "Google Calendar"
          description: "Appointment booking"
          type: "functional"
      purposes:
        - id: "enhanced_functionality"
          name: "Enhanced Functionality"
          description: "Provide enhanced features"
          legal_basis: "legitimate_interest"
```

### Custom Category Example

```yaml
consent_config:
  categories:
    - id: "ai_features"
      name: "AI Features"
      description: "Enable AI-powered features like content recommendations and chatbots"
      required: false
      pre_selected: false
      icon: "🤖"
      providers:
        - name: "OpenAI"
          description: "AI language models"
          type: "functional"
        - name: "Anthropic"
          description: "Claude AI assistant"
          type: "functional"
      storage_types:
        - "localStorage"
        - "indexedDB"
      purposes:
        - id: "ai_assistance"
          name: "AI Assistance"
          description: "Provide AI-powered help and recommendations"
          legal_basis: "consent"
```

## Google Consent Mode v2

### Complete Configuration

```yaml
consent_config:
  google_consent_mode:
    enabled: true
    
    # Default consent state
    default_state:
      analytics_storage: "denied"
      ad_storage: "denied"
      ad_user_data: "denied"
      ad_personalization: "denied"
      functionality_storage: "granted"
      personalization_storage: "granted"
      security_storage: "granted"
    
    # Regional states
    regional_states:
      # European Union
      - region: "EU"
        state:
          analytics_storage: "denied"
          ad_storage: "denied"
          ad_user_data: "denied"
          ad_personalization: "denied"
        detection:
          method: "ip"
          fallback_region: "EU"  # Safe default
      
      # California
      - region: "US-CA"
        state:
          analytics_storage: "granted"
          ad_storage: "denied"
          ad_user_data: "denied"
          ad_personalization: "denied"
        detection:
          method: "ip"
      
      # Rest of US
      - region: "US"
        state:
          analytics_storage: "granted"
          ad_storage: "granted"
          ad_user_data: "granted"
          ad_personalization: "granted"
        detection:
          method: "ip"
      
      # India
      - region: "IN"
        state:
          analytics_storage: "granted"
          ad_storage: "granted"
          ad_user_data: "granted"
          ad_personalization: "granted"
        detection:
          method: "timezone"  # IST detection
    
    # Advanced settings
    advanced:
      url_passthrough: true
      ads_data_redaction: true
      developer_id: "dYmQxMT"
      enable_on_page_load: true
      wait_for_update_ms: 500
      region_features:
        EU:
          enhanced_conversions: false
          conversion_cookies: false
        US:
          enhanced_conversions: true
          conversion_cookies: true
    
    # Update settings
    update_settings:
      update_command: "gtag"
      update_event: "consent_update"
      batch_updates: true
      update_delay_ms: 100
    
    # GTM Integration
    integration:
      gtm_enabled: true
      gtm_events:
        - "consent_default"
        - "consent_update"
        - "consent_granted"
        - "consent_denied"
      gtag_enabled: true
```

### Consent Mode with Custom Detection

```yaml
consent_config:
  google_consent_mode:
    regional_states:
      - region: "CUSTOM_REGION"
        state:
          analytics_storage: "denied"
          ad_storage: "denied"
        detection:
          method: "custom"
          custom_function: |
            function detectRegion() {
              // Custom logic
              const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
              const locale = navigator.language;
              
              if (timezone.includes('Europe') || locale.startsWith('de')) {
                return 'EU';
              }
              return 'DEFAULT';
            }
```

## Regional Compliance

### GDPR (EU) Configuration

```yaml
consent_config:
  regional_compliance:
    - region: "EU"
      laws:
        - "GDPR"
      disclosures:
        - type: "data_controller"
          text: "${entity:full_name} is the data controller for this website"
          prominence: "prominent"
          location: "banner"
        - type: "legal_basis"
          text: "We process data based on consent and legitimate interests"
          prominence: "standard"
          location: "privacy_policy"
      age_restrictions:
        minimum_age: 16
        require_verification: true
        parental_consent_age: 13
        verification_method: "birthdate"
      retention:
        default_period_days: 730  # 2 years
        category_retention:
          analytics: 730
          marketing: 365
          functional: 365
        auto_delete: true
        policy_url: "/data-retention"
      rights:
        enable_portal: true
        portal_url: "/privacy/rights"
        supported_rights:
          - "access"
          - "rectification"
          - "erasure"
          - "portability"
          - "restriction"
          - "objection"
        response_time_days: 30
        verification_required: true
```

### CCPA (California) Configuration

```yaml
consent_config:
  regional_compliance:
    - region: "US-CA"
      laws:
        - "CCPA"
      disclosures:
        - type: "sale_opt_out"
          text: "Do Not Sell or Share My Personal Information"
          prominence: "very_prominent"
          location: "footer"
        - type: "financial_incentive"
          text: "Financial Incentive Notice"
          prominence: "prominent"
          location: "signup_forms"
      age_restrictions:
        minimum_age: 13
        require_verification: false
      rights:
        enable_portal: true
        portal_url: "/privacy/california"
        supported_rights:
          - "access"
          - "erasure"
          - "objection"  # Opt-out of sale
        response_time_days: 45
```

### India (Proposed DPA) Configuration

```yaml
consent_config:
  regional_compliance:
    - region: "IN"
      laws:
        - "DPA"
      disclosures:
        - type: "data_fiduciary"
          text: "${entity:full_name} is the data fiduciary"
          prominence: "standard"
          location: "privacy_policy"
      age_restrictions:
        minimum_age: 18
        parental_consent_age: 18
      retention:
        default_period_days: 1095  # 3 years
      special_requirements:
        explicit_consent: "true"
        data_localization: "false"
```

## Cross-Domain Synchronization

### Complete Sync Configuration

```yaml
consent_config:
  cross_domain:
    enabled: true
    method: "localStorage"  # Most reliable
    domains:
      - ".getHarsh.in"
      - ".causality.in"
      - ".rawThoughts.in"
      - ".sleepwalker.in"
      - ".daostudio.in"
    sync_key: "ecosystem_consent_v1"
    
    events:
      on_consent_given: true
      on_consent_changed: true
      on_page_load: true
      sync_interval_ms: 5000  # Check every 5 seconds
      custom_events:
        - "user_login"
        - "preference_change"
    
    conflict_resolution: "most_restrictive"  # Safest option
    
    security:
      encrypt: true
      verify_origin: true
      allowed_origins:
        - "https://getHarsh.in"
        - "https://blog.getHarsh.in"
        - "https://causality.in"
        - "https://blog.causality.in"
        - "https://rawThoughts.in"
        - "https://blog.rawThoughts.in"
        - "https://sleepwalker.in"
        - "https://blog.sleepwalker.in"
        - "https://daostudio.in"
        - "https://blog.daostudio.in"
      hmac_validation: true
      hmac_secret: "${CONSENT_SYNC_SECRET}"
```

### PostMessage Sync (for iframes)

```yaml
consent_config:
  cross_domain:
    enabled: true
    method: "postMessage"
    domains: ${ecosystem_domains}
    events:
      on_consent_given: true
      on_consent_changed: true
    security:
      verify_origin: true
      allowed_origins: ${ecosystem_origins}
```

## Entity-Specific Configuration

### Dynamic Entity-Based Consent Boundaries

```yaml
# Build system reads from EntityCatalog dynamically
consent_config:
  entity_boundaries:
    # Pattern-based configuration (not hardcoded)
    entity_pattern:
      entity_type: ENTITY_TYPE_LEGAL_ENTITY
      consent_scope: "separate_controller"
      cookie_sharing: "within_entity_only"
      data_controller: true
    
    # Relationship rules affect consent
    relationship_rules:
      - relationship: RELATIONSHIP_OWNS
        consent_sharing: "allowed_with_disclosure"
        shared_purposes: ["analytics", "functional"]
        
      - relationship: RELATIONSHIP_PARTNER
        consent_sharing: "separate_consent_required"
        shared_purposes: []  # No automatic sharing
        
      - relationship: RELATIONSHIP_PARENT_ORGANIZATION
        consent_sharing: "inherited_with_notice"
        shared_purposes: ["necessary", "functional"]
    
    # Projects inherit parent entity's consent boundary
    project_inheritance:
      inherit_from_parent: true
      override_allowed: false
      additional_disclosure: "This project is operated by ${parent_entity}"
```

### Browser-Specific Handling

```yaml
consent_config:
  browser_handling:
    safari:
      # ITP (Intelligent Tracking Prevention) workarounds
      use_storage_access_api: true
      refresh_consent_days: 7  # Before ITP expires cookies
      first_party_only: true
      fallback_message: "Safari users: Please allow cookies for full functionality"
      
    chrome:
      # Prepare for Privacy Sandbox
      topics_api_integration: false  # Not yet for static sites
      first_party_sets: ["getharsh.in", "causality.in", "rawthoughts.in"]
      
    firefox:
      # Enhanced Tracking Protection
      test_in_private_mode: true
      explicit_consent_required: true
```

### Cross-Domain Sync with Entity Awareness

```yaml
consent_config:
  cross_domain:
    sync_config:
      enabled: true
      method: "server_side"  # Via consent ID
      
      # Entity-aware sync rules
      sync_rules:
        - from_entity: "RTEPL"
          to_entities: ["RTEPL"]  # Only within same entity
          sync_categories: ["all"]
          
        - from_entity: "DSPL"
          to_entities: ["DSPL"]  # Separate consent space
          sync_categories: ["all"]
          
        - from_entity: "RTEPL"
          to_entities: ["DSPL"]
          sync_categories: []  # No automatic cross-entity sync
      
      # Honor most restrictive consent
      conflict_resolution: "most_restrictive"
      
      # Sync status display
      ui_config:
        show_sync_status: true
        sync_message: "Your privacy preferences are synced across ${entity} sites"
        cross_entity_message: "Privacy settings don't sync between ${from_entity} and ${to_entity}"
```

### RTEPL Configuration

```yaml
consent_config:
  entity_configs:
    RTEPL:
      entity_name: "RawThoughts Enterprises Private Limited"
      legal_info:
        full_name: "RawThoughts Enterprises Private Limited"
        registration_number: "U72900MH2020PTC349803"
        registered_address: "Mumbai, Maharashtra, India"
        is_data_controller: true
        is_data_processor: false
      
      contacts:
        privacy_email: "privacy@rtepl.co.in"
        dpo_email: "dpo@rtepl.co.in"
        privacy_phone: "+91-XXXXXXXXXX"
        privacy_address: "Mumbai, India"
        support_url: "https://rawthoughts.in/support"
      
      text_overrides:
        banner_text: "RTEPL values your privacy. We use cookies to improve your experience across our portfolio of sites."
        privacy_url: "https://rawthoughts.in/privacy"
        cookie_url: "https://rawthoughts.in/cookies"
        terms_url: "https://rawthoughts.in/terms"
        replacements:
          company_name: "RawThoughts Enterprises"
          company_short: "RTEPL"
      
      jurisdiction: "India"
      compliance_requirements:
        gdpr_representative: "Not required"
        local_storage_required: "false"
```

### DSPL Configuration

```yaml
consent_config:
  entity_configs:
    DSPL:
      entity_name: "DAO Studio Private Limited"
      legal_info:
        full_name: "DAO Studio Private Limited"
        registration_number: "U72900MH2021PTC368433"
        registered_address: "Mumbai, Maharashtra, India"
        is_data_controller: true
        is_data_processor: false
      
      contacts:
        privacy_email: "privacy@daostudio.in"
        dpo_email: "dpo@daostudio.in"
        support_url: "https://daostudio.in/support"
      
      text_overrides:
        banner_text: "DAO Studio uses cookies to enhance your Web3 experience."
        privacy_url: "https://daostudio.in/privacy"
        cookie_url: "https://daostudio.in/cookies"
      
      entity_categories:
        - id: "web3_analytics"
          name: "Web3 Analytics"
          description: "Track blockchain interactions and wallet connections"
          providers:
            - name: "Dune Analytics"
              type: "analytics"
```

## Advanced Features

### A/B Testing Configuration

```yaml
consent_config:
  advanced:
    ab_testing:
      enabled: true
      variants:
        - id: "control"
          name: "Standard Banner"
          overrides: {}
        
        - id: "simplified"
          name: "Simplified Banner"
          overrides:
            banner_text: "We use cookies. OK?"
            button_count: 2
        
        - id: "detailed"
          name: "Detailed Banner"
          overrides:
            show_categories: true
            show_purposes: true
      
      traffic_allocation:
        control: 33
        simplified: 33
        detailed: 34
      
      success_metrics:
        - "consent_rate"
        - "interaction_rate"
        - "time_to_consent"
```

### API Configuration

```yaml
consent_config:
  advanced:
    api:
      enabled: true
      endpoints:
        get_consent: "/api/consent/get"
        update_consent: "/api/consent/update"
        delete_consent: "/api/consent/delete"
        export_data: "/api/consent/export"
      
      auth:
        type: "jwt"
        jwt:
          secret: "${CONSENT_API_SECRET}"
          algorithm: "HS256"
          expiry_seconds: 3600
      
      rate_limiting:
        enabled: true
        requests_per_minute: 60
        burst_limit: 10
```

### Webhook Configuration

```yaml
consent_config:
  advanced:
    webhooks:
      enabled: true
      endpoints:
        - url: "https://analytics.example.com/consent"
          events:
            - "consent_given"
            - "consent_denied"
          headers:
            Authorization: "Bearer ${WEBHOOK_TOKEN}"
          active: true
      
      retry:
        max_retries: 3
        retry_delay_ms: 1000
        backoff_multiplier: 2.0
      
      security:
        sign_payloads: true
        signing_secret: "${WEBHOOK_SIGNING_SECRET}"
        verify_ssl: true
```

### Storage Configuration

```yaml
consent_config:
  storage:
    method: "hybrid"  # Cookie + localStorage
    
    cookie:
      name: "_ec_consent"
      domain: ".${domain}"
      path: "/"
      secure: true
      same_site: "Lax"
      http_only: false  # Needs JS access
    
    local:
      key_prefix: "ecosystem_consent_"
      use_session_storage: false
      compress: true
    
    server:
      endpoint: "/api/consent/store"
      auth_required: true
      sync_interval_ms: 30000
    
    enable_backup: true
    encrypt_storage: true
```

### Audit Configuration

```yaml
consent_config:
  audit:
    enabled: true
    log_consent_events: true
    log_preference_changes: true
    log_page_views: false  # Too verbose
    retention_days: 730  # 2 years
    anonymize_ip: true
    
    export:
      enabled: true
      format: "json"
      endpoint: "/api/audit/export"
      frequency: "monthly"
```

## Implementation Checklist

### Pre-Launch Checklist

- [ ] **Legal Review**
  - [ ] Privacy policy updated with cookie information
  - [ ] Cookie policy created and linked
  - [ ] Terms of service updated
  - [ ] Data retention policy documented

- [ ] **Technical Implementation**
  - [ ] Consent banner implemented and tested
  - [ ] Google Consent Mode v2 configured
  - [ ] GTM tags respect consent state
  - [ ] Cross-domain sync tested
  - [ ] Mobile experience optimized

- [ ] **Compliance Verification**
  - [ ] GDPR requirements met
  - [ ] Regional detection working
  - [ ] Age verification implemented
  - [ ] Data subject rights portal ready

- [ ] **Testing**
  - [ ] Test all consent scenarios
  - [ ] Verify cookie blocking works
  - [ ] Check analytics data flow
  - [ ] Test cross-domain navigation
  - [ ] Verify audit logging

### Post-Launch Monitoring

- [ ] Monitor consent rates by region
- [ ] Track banner interaction metrics
- [ ] Review audit logs weekly
- [ ] Update consent version if needed
- [ ] Respond to data subject requests

## Complete Example Configuration

### Full Domain Configuration

```yaml
# getHarsh.in/config.yml (excerpt)
consent_config:
  core:
    enabled: true
    version: "1.0"
    default_state:
      analytics: "denied"
      marketing: "denied"
      functional: "granted"
      necessary: "granted"
    expiry_days: 365
    require_explicit_consent: true
    enable_granular_control: true
  
  banner:
    display:
      position: "bottom"
      show_on_first_visit: true
      z_index: 9999
    content:
      text: "We value your privacy and use cookies to enhance your experience."
      privacy_url: "/privacy"
      cookie_url: "/cookies"
    styling:
      theme: "auto"
      max_width: 1200
    buttons:
      button_order: ["settings", "reject_all", "accept_all"]
  
  categories:
    - id: "analytics"
      name: "Analytics"
      description: "Help us understand site usage"
      required: false
      pre_selected: false
      providers:
        - name: "Google Analytics"
          type: "analytics"
    
    - id: "marketing"
      name: "Marketing"
      description: "Personalized advertising"
      required: false
      pre_selected: false
      linked_categories: ["analytics"]
  
  google_consent_mode:
    enabled: true
    default_state:
      analytics_storage: "denied"
      ad_storage: "denied"
    advanced:
      url_passthrough: true
      ads_data_redaction: true
      wait_for_update_ms: 500
  
  regional_compliance:
    - region: "EU"
      laws: ["GDPR"]
      age_restrictions:
        minimum_age: 16
  
  cross_domain:
    enabled: true
    method: "localStorage"
    domains: ${ecosystem_domains}
    conflict_resolution: "most_restrictive"
  
  entity_configs:
    RTEPL:
      entity_name: "RawThoughts Enterprises Private Limited"
      contacts:
        privacy_email: "privacy@rtepl.co.in"
      jurisdiction: "India"
  
  storage:
    method: "hybrid"
    cookie:
      name: "_ec_consent"
      secure: true
      same_site: "Lax"
  
  audit:
    enabled: true
    log_consent_events: true
    retention_days: 730
```

## Troubleshooting

### Common Issues

1. **Consent not syncing across domains**
   - Check allowed_origins includes all domains
   - Verify HMAC secret is same across domains
   - Test localStorage access in browser console

2. **Google Consent Mode not working**
   - Verify GTM integration is enabled
   - Check consent update events fire
   - Use Tag Assistant to debug

3. **Banner not showing**
   - Check consent version hasn't been accepted
   - Verify display conditions
   - Check browser console for errors

4. **Regional detection failing**
   - Test with VPN to verify IP detection
   - Check fallback region is set
   - Verify timezone detection logic

## See Also

- [Consent Schema Definition](schema/consent.proto)
- [Consent Mappings](schema/consent-mappings.yml)
- [GTM Configuration](GTM-EXAMPLES.md)
- [Google Consent Mode Documentation](https://developers.google.com/tag-platform/security/guides/consent)
- [GDPR Guidelines](https://gdpr.eu/)