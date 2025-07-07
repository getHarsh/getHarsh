# Social Media Embed Component

## Component Specification

**File Pattern:** `social-embed.html`  
**Category:** Content Intelligence  
**Business Priority:** Medium  
**Lead Gen Focus:** High  
**Status:** ✅ Required | Active  
**Extends:** [SOCIAL-BASE.md](./SOCIAL-BASE.md)

## Purpose

Extends the social media base component to receive embed configuration from Context Engine for social media posts and videos from X (Twitter), LinkedIn, Instagram, and YouTube. Context Engine provides platform-specific embedding requirements while maintaining privacy compliance and performance optimization.

## Parameters

### Required
- `platform`: "x|linkedin|instagram|youtube"
- `content_url`: "Full URL to the post/video"

### Optional
- `theme`: "light|dark|auto" (default: "auto")
- `responsive`: true|false (default: true)
- `privacy_mode`: true|false (default: true)
- `lazy_load`: true|false (default: true)
- `analytics_context`: "Context for social engagement tracking"
- `business_context`: "Authority|Portfolio|Testimonial|News" (default: "Authority")

## Platform Support

### X (Twitter)
- **Embed Type**: Tweet embedding with conversation context
- **Privacy Mode**: No tracking until user interaction
- **Responsive**: Automatic width adaptation
- **Theme Support**: Light/dark mode integration

### LinkedIn
- **Embed Type**: Post embedding with company/personal context
- **Privacy Mode**: GDPR-compliant loading
- **Responsive**: Mobile-optimized display
- **Theme Support**: Platform theme matching

### Instagram
- **Embed Type**: Post embedding with media optimization
- **Privacy Mode**: Consent-required loading
- **Responsive**: Square/portrait aspect ratio handling
- **Theme Support**: Auto-detection from site theme

### YouTube
- **Embed Type**: Video embedding with privacy-enhanced mode
- **Privacy Mode**: No tracking until user interaction (youtube-nocookie.com)
- **Responsive**: 16:9 aspect ratio with responsive scaling
- **Theme Support**: Player theme matching site design
- **Performance**: Lazy loading with custom thumbnail preview

## Context Engine Integration

### Context Engine Platform Resolution
```liquid
<!-- Simple usage - Context Engine determines platform from URL -->
{% include components/social-embed.html 
   content_url="https://x.com/username/status/123456" %}
<!-- Context Engine provides: platform='x', embed_type='tweet' -->

<!-- Explicit platform specification -->
{% include components/social-embed.html 
   platform="linkedin"
   content_url="https://linkedin.com/posts/username_abc123" %}
<!-- Manual override, Context Engine validation still applies -->
```

### Business Context Integration
- **Authority Building**: Embeds showcase professional expertise
- **Portfolio Enhancement**: Technical work demonstrations
- **Testimonial Display**: Client feedback and recommendations
- **News Integration**: Industry engagement and thought leadership

## Accessibility

### Screen Reader Support
- **Alternative Content**: Text fallback for embedded posts
- **Semantic Markup**: Proper `<blockquote>` structure for fallback
- **ARIA Labels**: Context-aware labeling for embedded content
- **Keyboard Navigation**: Tab-accessible embedded content

### Visual Accessibility
- **High Contrast**: Theme-aware contrast adjustment
- **Reduced Motion**: Respects user motion preferences
- **Scalable Text**: Responsive font sizing
- **Focus Indicators**: Clear focus states for interactive elements

## Performance

### Loading Optimization
- **Lazy Loading**: Intersection observer-based loading
- **Privacy-First**: No external scripts until user consent
- **Connection-Aware**: Adapts to network conditions
- **Cache Optimization**: Efficient platform script management

### Fallback Strategy
```html
<!-- Progressive enhancement structure -->
<div class="social-embed" data-component="social-embed" data-platform="x">
  <!-- Fallback content (always visible) -->
  <blockquote class="social-embed__fallback">
    <p>Tweet content fallback...</p>
    <cite>— @username on X</cite>
  </blockquote>
  
  <!-- Enhanced embed (loaded progressively) -->
  <div class="social-embed__enhanced" style="display: none;">
    <!-- Platform-specific embed code -->
  </div>
</div>
```

## Analytics

### Engagement Tracking
- **Embed View Tracking**: Platform-specific impression measurement
- **Click-Through Measurement**: Engagement with embedded content
- **Load Performance**: Embed loading time and success rate
- **Platform Preference**: User interaction patterns by platform

### Business Intelligence
- **Social Proof Impact**: Conversion influence of embedded posts
- **Authority Metrics**: Professional credibility demonstration
- **Engagement Quality**: Time spent with embedded content
- **Cross-Platform Attribution**: Multi-platform engagement correlation

## Privacy Compliance

### GDPR Integration
- **Consent Management**: Cookie consent before platform loading
- **Privacy Mode**: Preview without tracking
- **Data Minimization**: Only essential platform data loaded
- **User Control**: Easy opt-out and consent withdrawal

### Platform-Specific Compliance
```javascript
// Privacy-compliant loading sequence
if (window.cookieConsent?.hasConsent('social_media')) {
  loadPlatformEmbed(platform, contentUrl);
} else {
  showPrivacyPreview(platform, contentUrl);
}
```

## Implementation Example

### Basic Usage
```liquid
<!-- Authority building through X engagement -->
{% include components/social-embed.html 
   platform="x"
   content_url="https://x.com/yourhandle/status/123456"
   business_context="Authority" %}

<!-- Portfolio showcase via LinkedIn -->
{% include components/social-embed.html 
   platform="linkedin"
   content_url="https://linkedin.com/posts/yourhandle_project-showcase"
   business_context="Portfolio" %}

<!-- Client testimonial via Instagram -->
{% include components/social-embed.html 
   platform="instagram"
   content_url="https://instagram.com/p/ABC123"
   business_context="Testimonial" %}
```

### Advanced Configuration
```liquid
<!-- Privacy-focused embedding with custom analytics -->
{% include components/social-embed.html 
   platform="x"
   content_url="https://x.com/yourhandle/status/123456"
   privacy_mode="true"
   lazy_load="true"
   analytics_context="article_social_proof"
   business_context="Authority" %}
```

## SEO Integration

### Meta Tag Generation
- **Open Graph**: Enhanced social sharing metadata
- **Twitter Cards**: Platform-specific optimization
- **Schema.org**: SocialMediaPosting structured data
- **Canonical URLs**: Proper attribution and link preservation

### Social Signals
- **Backlink Creation**: Embedded posts create social backlinks
- **Engagement Metrics**: Social engagement as SEO signal
- **Content Freshness**: Dynamic social content integration
- **Authority Building**: Social proof enhancing domain authority

## Related Components

- **[SOCIAL-BASE.md](./SOCIAL-BASE.md)** - Base functionality and context engine
- **[SOCIAL-SHARE.md](./SOCIAL-SHARE.md)** - Sharing functionality extension
- **[SOCIAL-DISCUSS.md](./SOCIAL-DISCUSS.md)** - Discussion integration extension

## Architecture Compliance

### Extension Pattern
```javascript
// Extends SocialBase component
class SocialEmbed extends SocialBase {
  static selector = '[data-component="social-embed"]';
  
  init() {
    super.init();
    this.setupPlatformEmbed();
    this.handlePrivacyMode();
  }
  
  setupPlatformEmbed() {
    // Receive platform configuration from Context Engine
    const embedData = this.context.components.socialEmbed[this.element.dataset.contentUrl];
    const platform = embedData.platform;
    const embedConfig = embedData.config;
    this.loadPlatformEmbed(platform, embedConfig);
  }
}
```

### Three-Layer Integration
- **Jekyll Template**: Extends social-base.html with embed-specific markup
- **SCSS Module**: Extends social-base styles with platform-specific styling
- **JavaScript Module**: Extends SocialBase class with embed functionality