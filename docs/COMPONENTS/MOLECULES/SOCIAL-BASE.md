# Social Media Base Component

## Component Specification

**File Pattern:** `social-base.html`  
**Category:** Content Intelligence  
**Business Priority:** High  
**Lead Gen Focus:** High  
**Status:** ✅ Required | Active

## Purpose

Base social media component that provides shared functionality and context engine integration for all social media components. This component is extended by `social-embed.html`, `social-share.html`, and `social-discuss.html`.

## Parameters

### Required
*None - Base component provides foundational functionality*

### Optional
- `analytics_context`: "Custom analytics context override" (default: provided by Context Engine)
- `business_context`: "Authority|Portfolio|Testimonial|News" (default: "Authority")

## Context Engine Integration

### Hierarchical Configuration
```yaml
# Global config (_config.yml)
social:
  platforms:
    x:
      handle: "@yourhandle"
      enabled: true
    linkedin:
      company: "your-company"
      enabled: true
    instagram:
      handle: "yourhandle"
      enabled: true
  sharing_enabled: ["x", "linkedin", "whatsapp", "slack"]
  analytics_tracking: true
  privacy_mode: true

# Page frontmatter
discussion:
  reddit: "https://reddit.com/r/webdev/comments/abc123"
  discord: "https://discord.gg/yourdiscord/channel/message"
  x_thread: "https://x.com/yourhandle/status/123456"
```

## Base Functionality

### Context Engine Integration
- **Platform availability**: Receives enabled platforms from Context Engine
- **Content analysis**: Receives extracted title, description, URL from Context Engine
- **Business intelligence**: Receives lead generation optimization from Context Engine
- **Privacy compliance**: Receives GDPR consent state from Context Engine

### Universal Analytics
- **Platform engagement tracking**: Base tracking for all social interactions
- **Cross-platform attribution**: Unified social media analytics
- **Lead generation metrics**: Social proof impact measurement
- **Privacy-compliant tracking**: Consent-based analytics activation
- **Unique ID generation**: Universal share/interaction tracking system
- **Journey mapping**: Customer journey tracking across social touchpoints

### Performance Optimization
- **Lazy loading foundation**: Intersection observer setup
- **Resource optimization**: Shared social media scripts
- **Error handling**: Graceful degradation for failed loads
- **Connection awareness**: Adapts to network conditions

## Responsive Architecture Foundation

### Mobile-First Design Integration
- **Touch targets**: 44px minimum size for mobile interaction compliance (WCAG 2.2)
- **Adaptive layouts**: Horizontal/vertical layout switching based on viewport
- **Platform prioritization**: Most important platforms visible on mobile, full list on desktop
- **Performance optimization**: Connection-aware loading of social platform scripts
- **Gesture support**: Touch-friendly interactions with proper touch boundaries

### Breakpoint-Specific Behavior
```scss
// Mobile (320px-767px): Priority platforms only
.social-base {
  --touch-target-size: 44px;
  --platform-spacing: 8px;
  --visible-platforms: 4; // Show most important only
}

// Tablet (768px-1023px): Balanced approach  
@include tablet-up {
  .social-base {
    --touch-target-size: 40px;
    --platform-spacing: 12px;
    --visible-platforms: 6; // Show more platforms
  }
}

// Desktop (1024px+): Full platform set
@include desktop-up {
  .social-base {
    --touch-target-size: 36px;
    --platform-spacing: 16px;
    --visible-platforms: unlimited; // Show all configured platforms
  }
}
```

### Business Model Responsive Optimization
- **Lead generation focus**: Contact/consultation platforms prioritized on mobile
- **Conversion path optimization**: Most valuable social proof visible first
- **Progressive disclosure**: Secondary platforms revealed on larger screens
- **Performance-first**: Critical business platforms load first, others lazy-loaded

## Accessibility Foundation

- **ARIA landmarks**: Social content region identification
- **Keyboard navigation**: Base keyboard interaction support with responsive focus management
- **Screen reader compatibility**: Semantic markup foundation with device-aware descriptions
- **High contrast support**: Theme-aware styling base with responsive contrast adjustment
- **Reduced motion**: Respects user motion preferences across all breakpoints
- **Touch accessibility**: Responsive touch targets meeting WCAG 2.2 requirements

## Business Intelligence

### Lead Generation Integration
- **Social proof amplification**: Authority building through social presence
- **Cross-platform engagement**: Multi-channel audience development
- **Community building**: Discussion-driven lead generation
- **Content syndication**: Automated cross-platform distribution

### SEO Integration
- **Open Graph optimization**: Social media meta tag generation
- **Twitter Card enhancement**: Platform-specific optimization
- **Canonical URL preservation**: Consistent link attribution
- **Social signals**: SEO benefit through social engagement

## Extension Points

This base component provides hooks for extending components:

### Data Attributes
- `data-component="social-base"`
- `data-social-type="embed|share|discuss"`
- `data-platform="x|linkedin|instagram|reddit|discord|whatsapp|slack"`
- `data-business-context="[context]"`
- `data-analytics-context="[context]"`

### CSS Classes
- `.social-base` - Base styling foundation
- `.social-base--[type]` - Component type variants
- `.social-base--[platform]` - Platform-specific styling
- `.social-base--[theme]` - Light/dark theme variants

### JavaScript Extension Points
```javascript
// Base component class for extension with responsive behavior
class SocialBase extends ComponentSystem.Component {
  static selector = '[data-component="social-base"]';
  
  init() {
    super.init();
    this.initializeTracking();
    this.setupConsentHandling();
    this.initializeResponsiveBehavior();
  }
  
  // Responsive behavior initialization
  initializeResponsiveBehavior() {
    this.currentBreakpoint = this.detectBreakpoint();
    this.setupResponsiveHandlers();
    this.optimizeForCurrentViewport();
  }
  
  detectBreakpoint() {
    const width = window.innerWidth;
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
  }
  
  setupResponsiveHandlers() {
    // Performance: Debounced resize handler
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const newBreakpoint = this.detectBreakpoint();
        if (newBreakpoint !== this.currentBreakpoint) {
          this.currentBreakpoint = newBreakpoint;
          this.optimizeForCurrentViewport();
        }
      }, 150);
    });
  }
  
  optimizeForCurrentViewport() {
    const platforms = this.getPlatformVisibilityForBreakpoint(this.currentBreakpoint);
    this.updatePlatformVisibility(platforms);
    this.adjustTouchTargets(this.currentBreakpoint);
    this.optimizeLayoutForBreakpoint(this.currentBreakpoint);
  }
  
  getPlatformVisibilityForBreakpoint(breakpoint) {
    const businessContext = this.getBusinessContext();
    const isLeadGeneration = businessContext?.conversionType === 'lead_generation';
    
    switch (breakpoint) {
      case 'mobile':
        // Mobile: Show most important platforms only
        return isLeadGeneration 
          ? ['linkedin', 'x', 'whatsapp', 'email'] // Business-focused
          : ['x', 'linkedin', 'github', 'instagram']; // Content-focused
      
      case 'tablet':
        // Tablet: Show more platforms
        return isLeadGeneration
          ? ['linkedin', 'x', 'whatsapp', 'email', 'github', 'discord']
          : ['x', 'linkedin', 'github', 'instagram', 'youtube', 'reddit'];
      
      case 'desktop':
        // Desktop: Show all configured platforms
        return 'all';
    }
  }
  
  adjustTouchTargets(breakpoint) {
    const targetSize = {
      mobile: '44px',
      tablet: '40px', 
      desktop: '36px'
    }[breakpoint];
    
    this.element.style.setProperty('--touch-target-size', targetSize);
  }
  
  // Core tracking functionality (leverages existing systems)
  generateUniqueId(action, platform) {
    // Leverages existing analytics ID generation
    return window.analyticsInstance?.generateInteractionId('social', action, platform);
  }
  
  getTrackedUrl(baseUrl, trackingContext) {
    // Leverages existing ANALYTICS.md tracking system
    if (!this.hasAnalyticsConsent()) {
      return baseUrl; // No tracking without consent
    }
    
    return window.analyticsInstance?.enhanceUrlWithTracking(baseUrl, {
      category: 'social',
      action: trackingContext.action,
      platform: trackingContext.platform,
      business_context: this.getBusinessContext(),
      customer_stage: this.getCustomerStage()
    });
  }
  
  // Extension points for child components
  getPlatformConfig(platform) {
    // Leverages CONTEXT-ENGINE.md hierarchical config
    return window.contextEngine?.getSocialPlatformConfig(platform);
  }
  
  getAnalyticsContext() {
    // Leverages existing analytics context system
    return window.analyticsInstance?.getCurrentContext();
  }
  
  trackInteraction(action, data) {
    // Leverages existing ANALYTICS.md tracking
    if (!this.hasAnalyticsConsent()) return;
    
    return window.analyticsInstance?.trackSocialInteraction({
      component: this.componentType,
      action: action,
      platform: data.platform,
      business_context: this.getBusinessContext(),
      ...data
    });
  }
  
  hasAnalyticsConsent() {
    // Leverages existing STANDARDS.md consent management
    return window.consentManager?.hasConsent('analytics');
  }
  
  getBusinessContext() {
    // Leverages CONTEXT-ENGINE.md business intelligence
    return window.contextEngine?.getBusinessContext();
  }
  
  getCustomerStage() {
    // Leverages existing customer journey tracking
    return window.analyticsInstance?.getCustomerStage();
  }
}
```

## Implementation Example

```liquid
<!-- Base component usage (internal) -->
{% include components/social-base.html 
   analytics_context="article_engagement"
   business_context="Authority" %}
```

## Related Components

- **[Social Media Embed](./social-embed.md)** - Extends base for post embedding
- **[Social Share](./social-share.md)** - Extends base for sharing functionality  
- **[Social Discuss](./social-discuss.md)** - Extends base for discussion integration

## Architecture Compliance

### Three-Layer Architecture
- **Jekyll Template**: Base HTML structure with context integration
- **SCSS Module**: Foundation styles with CSS custom properties
- **JavaScript Module**: Base functionality extending ComponentSystem.Component

### SOLID Principles
- **Single Responsibility**: Provides shared social media functionality
- **Open/Closed**: Open for extension by specialized social components
- **Liskov Substitution**: Extended components can replace base functionality
- **Interface Segregation**: Minimal base interface, extended as needed
- **Dependency Inversion**: Depends on context engine abstractions