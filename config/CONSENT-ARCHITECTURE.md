# Consent Architecture Documentation

This document serves as the single source of truth for the consent and privacy implementation in the getHarsh ecosystem. It provides comprehensive documentation of the GDPR-compliant cookie consent system with Google Consent Mode v2 integration.

## Table of Contents

- [Overview](#overview)
- [Proto Schema Integration](#proto-schema-integration)
- [Configuration Flow](#configuration-flow)
- [Build Pipeline Integration](#build-pipeline-integration)
- [Entity Domain Population](#entity-domain-population)
- [Component Architecture](#component-architecture)
- [Regional Detection](#regional-detection)
- [Analytics Blocking](#analytics-blocking)
- [Granular Consent UI](#granular-consent-ui)
- [Policy Template Processing](#policy-template-processing)
- [Cross-Domain Limitations](#cross-domain-limitations)
- [Implementation Verification](#implementation-verification)

## Overview

The ecosystem implements GDPR-compliant cookie consent with Google Consent Mode v2 integration. Due to browser security restrictions, consent cannot be technically synchronized across different root domains, but we maintain consistent privacy practices across all properties.

### Key Features

- **€1.34M GDPR Fine Prevention**: Comprehensive compliance implementation
- **Google Consent Mode v2**: Full integration with regional defaults
- **Regional Detection**: Client-side detection for EU, California, India
- **Granular Control**: Category-based consent management
- **Entity Awareness**: Separate consent boundaries for RTEPL and DSPL
- **Static Site Compatible**: All logic runs client-side after deployment

### Related Documentation

- **[Schema Design](../schema/SCHEMA.md)**: Proto schema philosophy and patterns
- **[Configuration System](../CONFIG.md)**: YAML configuration and inheritance
- **[Build Pipeline](../../BUILD.md)**: 6-phase build process integration
- **[Component Architecture](../../src/README.md)**: React component structure
- **[Processing Tools](../tools/TOOLS.md)**: Configuration processing scripts
- **[Implementation Examples](../CONSENT-EXAMPLES.md)**: Configuration examples

## Proto Schema Integration

The consent system is defined in the proto schema and flows through the entire build pipeline. See **[Schema Documentation](../schema/SCHEMA.md)** for proto philosophy.

### ConsentSettings Schema

**Location**: `config/schema/ecosystem.proto`

The `ConsentSettings` message (lines 854-920) defines the consent configuration:

```proto
message ConsentSettings {
  bool enable_consent_banner = 1;
  string consent_cookie_name = 2;  
  int32 consent_duration_days = 3;
  bool google_consent_mode_v2 = 4;
  // ... additional fields
  repeated string region_defaults = 21;  // Regional consent defaults
  bool enable_granular_control = 22;     // Category-level control
  ConsentCategories categories_config = 23; // Category configuration
}
```

### Schema Validation

The proto schemas are converted to JSON Schema for validation:
1. `proto2schema.sh` converts proto to JSON Schema
2. `validate.sh` validates YAML configs against schemas
3. Ensures type safety and completeness

## Configuration Flow

The consent configuration flows through multiple layers with proper inheritance. See **[Configuration System](../CONFIG.md)** for details.

### Configuration Hierarchy

1. **Proto Schema**: Defines structure in `ecosystem.proto`
2. **Ecosystem Defaults**: Base configuration in `ecosystem-defaults.yml`
3. **Domain Overrides**: Domain-specific settings in `[domain]/config.yml`
4. **Environment Variables**: Runtime overrides via wrapper.sh

### Example Configuration

**File**: `config/ecosystem-defaults.yml`

```yaml
consent_settings:
  # Basic settings
  enable_consent_banner: true
  consent_cookie_name: "ecosystem_consent"
  consent_duration_days: 365
  
  # Regional defaults - See: #regional-detection
  region_defaults:
    - "EU:denied"      # GDPR requires explicit consent
    - "US-CA:denied"   # CCPA requires opt-in
    - "IN:granted"     # India allows implied consent
    - "DEFAULT:granted" # Fallback for other regions
  
  # Granular categories - See: #granular-consent-ui
  categories_config:
    analytics:
      enabled: true
      default: "denied"
      description: "Website analytics and performance"
    marketing:
      enabled: true
      default: "denied"
      description: "Personalized advertising"
```

## Build Pipeline Integration

The consent system integrates seamlessly with the 6-phase build pipeline. See **[Build System](../../BUILD.md#cookie-consent-management)** for complete pipeline documentation.

### Phase 2: Configuration Processing

**Script**: `config/tools/process-configs.sh`

- Merges ecosystem defaults with domain configs
- Populates entity domains dynamically (see [#entity-domain-population](#entity-domain-population))
- Validates against proto schemas
- Outputs to `build/configs/[domain]/[mode]/config.yml`

### Phase 6: Static Site Building

**Script**: `wrapper.sh`

The wrapper exports consent configuration as environment variables:

```bash
# Lines 121-150 in wrapper.sh
export GATSBY_CONSENT_ENABLED=$(yq eval '.consent_settings.enable_consent_banner')
export GATSBY_CONSENT_COOKIE_NAME=$(yq eval '.consent_settings.consent_cookie_name')
export GATSBY_CONSENT_DURATION_DAYS=$(yq eval '.consent_settings.consent_duration_days')
export GATSBY_CONSENT_DOMAINS=$(yq eval '.consent_settings.consent_domains | join(",")')
# ... additional exports
```

These variables are embedded into the static bundle during build.

## Entity Domain Population

Entity domains are populated dynamically based on ownership relationships, ensuring consent boundaries respect legal entity separation.

### Implementation

**Location**: `config/tools/process-configs.sh`

```bash
# Populate consent_domains based on entity ownership
if [[ "$entity" == "RTEPL" ]]; then
    # RTEPL owns these domains
    yq eval -i '.consent_settings.consent_domains = ["getHarsh.in", "rawThoughts.in", "causality.in", "sleepwalker.in"]' "$output_file"
elif [[ "$entity" == "DSPL" ]]; then
    # DSPL owns this domain
    yq eval -i '.consent_settings.consent_domains = ["daostudio.in"]' "$output_file"
fi
```

### Purpose

- Shows users which domains are operated by the same entity
- Maintains separate consent boundaries between RTEPL and DSPL
- Enables entity relationship notices in consent banner

## Component Architecture

The consent system uses React components integrated with Gatsby's data layer. See **[Component Documentation](../../src/README.md)** for architecture details.

### ConsentBanner Component

**Location**: `src/components/consent/ConsentBanner.tsx`

Primary consent interface that:
- Displays consent banner based on configuration
- Implements regional detection (see [#regional-detection](#regional-detection))
- Updates Google Consent Mode v2
- Stores consent in cookies and localStorage
- Shows entity relationship notices

### ConsentSettings Component

**Location**: `src/components/consent/ConsentSettings.tsx`

Granular consent management interface:
- Modal/drawer for category selection
- Saves preferences to localStorage
- Updates individual consent categories
- Integrates with Google Consent Mode

### Data Flow

1. **Build Time**: Configuration → Environment Variables → Static Bundle
2. **Runtime**: Static Bundle → useConfig() Hook → Components
3. **User Action**: Components → Cookie/localStorage → Google Consent Mode

## Regional Detection

The system implements client-side regional detection to apply appropriate consent defaults based on user location.

### Detection Logic

**Location**: `src/components/consent/ConsentBanner.tsx`

```typescript
const detectRegion = (): string => {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const locale = navigator.language;
  
  // EU Detection (GDPR)
  if (timezone.includes('Europe') || 
      locale.startsWith('de') || locale.startsWith('fr')) {
    return 'EU';
  }
  
  // California Detection (CCPA)
  if (timezone.includes('America/Los_Angeles')) {
    return 'US-CA';
  }
  
  // India Detection
  if (timezone.includes('Asia/Kolkata')) {
    return 'IN';
  }
  
  return 'DEFAULT';
};
```

### Regional Defaults

Different regions have different legal requirements:

| Region | Default State | Legal Basis |
|--------|--------------|-------------|
| EU | Denied | GDPR requires explicit consent |
| US-CA | Denied | CCPA requires opt-in for sale |
| IN | Granted | India allows implied consent |
| DEFAULT | Granted | Standard practice outside regulated regions |

## Analytics Blocking

Analytics scripts are conditionally loaded only after user consent, ensuring compliance with privacy regulations.

### Implementation Strategy

**Location**: `src/gatsby-config.ts`

1. **Conditional Plugin Loading**: GTM plugin added only when consent is configured
2. **Consent Mode Defaults**: Set to "denied" before user interaction
3. **Event-Based Loading**: Scripts load after 'consentGranted' event
4. **Respect DNT**: Honor Do Not Track browser settings

### Google Tag Manager Integration

```typescript
// Only add GTM if consent is properly configured
if (process.env.GATSBY_GTM_CONTAINER_ID && 
    process.env.GATSBY_CONSENT_ENABLED !== 'false') {
  plugins.push({
    resolve: 'gatsby-plugin-google-gtag',
    options: {
      trackingIds: [process.env.GATSBY_GTM_CONTAINER_ID],
      gtagConfig: {
        anonymize_ip: true,
        cookie_expires: 0, // Session only until consent
      },
      pluginConfig: {
        respectDNT: true,
        head: false, // Load in body for control
      },
    },
  });
}
```

### Third-Party Scripts

**Location**: `src/gatsby-browser.js`

The `loadAnalyticsScripts()` function conditionally loads:
- Meta Pixel (Facebook)
- Twitter Pixel
- LinkedIn Insight Tag
- Custom analytics providers

## Granular Consent UI

The system provides granular control over consent categories, allowing users to selectively enable/disable different types of tracking.

### ConsentSettings Modal

**Location**: `src/components/consent/ConsentSettings.tsx`

Features:
- Category toggles (Analytics, Marketing, Functional)
- Clear descriptions of each category
- Real-time consent updates
- Persistent preferences

### Category Definitions

| Category | Purpose | Examples |
|----------|---------|----------|
| Necessary | Required for basic functionality | Session cookies, security tokens |
| Analytics | Usage analysis and performance | Google Analytics, heatmaps |
| Marketing | Advertising and remarketing | Meta Pixel, LinkedIn Ads |
| Functional | Enhanced features | Preferences, personalization |

### User Experience

1. **Initial Banner**: Simple Accept/Decline/Settings options
2. **Settings Modal**: Detailed category control
3. **Preference Memory**: Choices persist for configured duration
4. **Clear Communication**: Each category explains its purpose

## Policy Template Processing

Policy pages are dynamically generated with accurate consent information during build time. See **[Processing Tools](../tools/TOOLS.md)** for script details.

### Template Variables

**Location**: `master_posts/pages/[ENTITY]/`

Templates use variables that are replaced during processing:

| Variable | Description | Source |
|----------|-------------|--------|
| `{ENTITY_LEGAL_NAME}` | Full legal entity name | Entity config |
| `{ENTITY_ABBREVIATION}` | RTEPL or DSPL | Entity config |
| `{CONSENT_COOKIE_NAME}` | Cookie name for consent | Consent settings |
| `{CONSENT_DURATION_DAYS}` | Consent validity period | Consent settings |
| `{FOR_EACH_ENTITY_DOMAIN}` | Loop through entity domains | Dynamic population |

### Processing Pipeline

1. **Template Files**: Located in `master_posts/pages/[ENTITY]/`
2. **Processing Script**: `process-policy-templates.sh` runs during build
3. **Variable Injection**: Replaces placeholders with actual values
4. **Output**: Generated policy pages in site build

## Cross-Domain Limitations

### Technical Reality

**What Works**:
- Subdomains share cookies (blog.getHarsh.in ↔ getHarsh.in)
- Google Analytics can link sessions across domains (when consented on each)
- Consistent UI/UX across all entity properties
- localStorage stores preferences locally

**What Doesn't Work**:
- Cannot set cookies for other root domains (browser security)
- Consent must be given separately on each domain
- No automatic synchronization between getHarsh.in and causality.in
- Cross-domain consent sharing requires server infrastructure

### User Communication

The system is transparent about limitations:
- Banner shows entity relationship
- Policies explain technical constraints
- Each domain requires separate consent
- No false promises about synchronization

## Implementation Verification

This section serves as a checklist to verify the implementation against the architecture.

### Proto Schema Checklist

- [x] `ecosystem.proto` has ConsentSettings message with all fields
- [x] `region_defaults` field added (repeated string)
- [x] `enable_granular_control` field added (bool)
- [x] `categories_config` field added (ConsentCategories)
- [x] `proto2schema.sh` run to generate JSON schemas
- [x] Schemas generated successfully

### Configuration Checklist

- [x] `ecosystem-defaults.yml` has complete consent_settings
- [x] Regional defaults configured (EU, US-CA, IN, DEFAULT)
- [x] Category configuration present (analytics, marketing, functional)
- [x] Entity domains populated by `process-configs.sh` dynamically
- [x] Configuration ready for validation

### Build Pipeline Checklist

- [x] `process-configs.sh` populates consent_domains dynamically based on entity
- [x] `wrapper.sh` exports all GATSBY_CONSENT_* variables
- [x] Environment variables configured in gatsby-config.ts
- [x] Static bundle configuration complete

### Component Implementation Checklist

- [x] `ConsentBanner.tsx` implements regional detection with error handling
- [x] Banner shows entity relationship notice for transparency
- [x] `ConsentSettings.tsx` provides granular control with error handling
- [x] Google Consent Mode v2 integrated in gatsby-browser.js
- [x] Analytics scripts load conditionally in gatsby-config.ts

### Policy Template Checklist

- [x] Templates use consent variables (CONSENT_COOKIE_NAME, CONSENT_DURATION_DAYS, etc.)
- [x] `process-policy-templates.sh` provides all variables including GTM, regional, tracking
- [x] `process-policy-templates.js` is entity-agnostic - uses dynamic lookup
- [x] Cross-domain limitations clearly stated in templates

### Testing Checklist

- [ ] Consent banner appears on first visit
- [ ] Regional detection works correctly
- [ ] Consent persists for configured duration
- [ ] Analytics blocked until consent
- [ ] Subdomain cookie sharing works
- [ ] Entity domains shown correctly

## Troubleshooting

### Common Issues and Solutions

| Issue | Solution |
|-------|----------|
| Banner not showing | Check GATSBY_CONSENT_ENABLED is "true" |
| Regional detection fails | Verify timezone/locale detection logic |
| Analytics loading before consent | Ensure GTM plugin is conditional |
| Entity domains missing | Check process-configs.sh population |
| Consent not persisting | Verify cookie domain setting |

### Debug Commands

```bash
# Check processed configuration
cat build/configs/getHarsh.in/PRODUCTION/config.yml | grep consent

# Verify environment variables
env | grep GATSBY_CONSENT

# Test regional detection in browser console
Intl.DateTimeFormat().resolvedOptions().timeZone

# Check localStorage
localStorage.getItem('consent_preferences')
```

## Summary

The consent architecture provides comprehensive GDPR compliance for a static site deployment:

### ✅ What It Provides

- **GDPR Compliance**: Explicit consent before tracking with €1.34M fine risk mitigation
- **Google Consent Mode v2**: Full integration with regional defaults
- **Regional Awareness**: Different defaults for EU, California, India with fallback handling
- **Granular Control**: Category-based consent management with robust error handling
- **Entity Separation**: Dynamic entity detection - NOT hardcoded to RTEPL/DSPL
- **Static Compatibility**: All logic runs client-side for GitHub Pages
- **Clear Communication**: Transparent about browser security limitations
- **Complete Variable Injection**: All policy template variables dynamically provided
- **Error Resilience**: Components continue functioning even when APIs fail

### ❌ Intentional Limitations

- **No Cross-Domain Sync**: Browser security prevents this
- **Per-Domain Consent**: Each domain requires separate consent
- **No Server Component**: Pure static site implementation
- **No False Promises**: Honest about technical constraints

### 🔗 Related Documentation

- **[Configuration Examples](../CONSENT-EXAMPLES.md)**: Sample configurations
- **[Build System](../../BUILD.md#cookie-consent-management)**: Pipeline integration
- **[Component Documentation](../../src/README.md)**: React components
- **[Processing Tools](../tools/TOOLS.md)**: Build scripts
- **[Schema Design](../schema/SCHEMA.md)**: Proto philosophy

---

*This document serves as the single source of truth for consent implementation in the getHarsh ecosystem.*