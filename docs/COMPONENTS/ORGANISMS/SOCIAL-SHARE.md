# Social Share Component

## Component Specification

**File Pattern:** `social-share.html`  
**Category:** Content Intelligence  
**Business Priority:** High  
**Lead Gen Focus:** Very High  
**Status:** ✅ Required | Active  
**Extends:** [SOCIAL-BASE.md](./SOCIAL-BASE.md)

## Purpose

Extends the social media base component to provide intelligent, context-driven sharing functionality. Automatically detects available platforms from config and generates optimized sharing URLs with article context. Supports X, LinkedIn, WhatsApp, and Slack sharing based on hierarchical configuration.

## Parameters

### Required
*None - Uses context engine for intelligent configuration*

### Optional
- `layout`: "horizontal|vertical|compact|floating" (default: "horizontal", mobile-adaptive)
- `style`: "buttons|icons|text" (default: "buttons", responsive sizing)
- `mobile_limit`: Number of platforms to show on mobile (default: 3)
- `responsive`: true|false (default: true, enables responsive behavior)
- `analytics_context`: "Custom analytics context override"

## Context Engine Integration

### Hierarchical Configuration
```yaml
# Global config (_config.yml)
social:
  sharing_enabled: ["x", "linkedin", "whatsapp", "slack"]
  x_handle: "@yourhandle"
  linkedin_company: "your-company"
  
# Page frontmatter (optional overrides)
social_sharing:
  enabled: ["x", "linkedin"] # Override global settings
  custom_text: "Check out this technical deep-dive"
```

### Intelligent Platform Detection
- **Config-Driven**: Only shows platforms enabled in site config
- **Context-Aware**: Adapts sharing text based on content type
- **Platform-Optimized**: Respects character limits and best practices
- **Fallback Strategy**: Default platforms if config missing

## Sharing Platforms

### X (Twitter)
```
URL Pattern: https://x.com/intent/tweet?text={title}&url={tracked_url}&via={handle}
Character Limit: 280 characters (auto-truncation)
Context Integration: Hashtags from page tags, mention from config
Tracking: UTM parameters with unique share ID
```

### LinkedIn
```
URL Pattern: https://linkedin.com/sharing/share-offsite/?url={tracked_url}
Context Integration: Professional framing, company mention
Optimization: B2B audience targeting
Tracking: Professional network attribution
```

### WhatsApp
```
URL Pattern: https://wa.me/?text={title}%20{tracked_url}
Context Integration: Casual, personal sharing tone
Mobile Optimization: Deep link support
Tracking: Mobile/personal sharing attribution
```

### Slack
```
URL Pattern: slack://channel?team={team}&id={channel}&message={title}%20{tracked_url}
Context Integration: Team collaboration context
Workspace Integration: Custom team/channel targeting
Tracking: Team collaboration attribution
```

## Leveraging Base Layer Tracking

### Intelligent URL Enhancement
The social share component leverages the base layer's tracking system:

```javascript
// Extends SocialBase for intelligent tracking
class SocialShare extends SocialBase {
  static selector = '[data-component="social-share"]';
  
  handleShareClick(platform) {
    // Generate tracked URL using base layer
    const trackedUrl = this.getTrackedUrl(window.location.href, {
      action: 'share',
      platform: platform
    });
    
    // Track the share using base layer
    const shareId = this.generateUniqueId('share', platform);
    this.trackInteraction('share', {
      platform: platform,
      share_id: shareId,
      content_type: this.getContentType(),
      viral_potential: this.calculateViralPotential()
    });
    
    // Open platform sharing dialog
    this.openPlatformShare(platform, trackedUrl);
  }
}
```

### Base Layer Integration Benefits
- **Consent Management**: Automatically respects STANDARDS.md consent preferences
- **Analytics Integration**: Uses existing ANALYTICS.md tracking infrastructure  
- **Context Engine**: Leverages CONTEXT-ENGINE.md for business intelligence
- **Performance**: Shared tracking logic across all social components
- **Consistency**: Unified tracking patterns across the entire system

## Intelligent Features

### Dynamic Content Generation
- **Title Optimization**: Platform-specific title formatting
- **Description Adaptation**: Context-aware descriptions
- **URL Tracking**: Consent-aware unique tracking parameter injection
- **Hashtag Integration**: Relevant hashtags from page metadata
- **Handle Mentions**: Author and company handle integration

### Content Context Analysis
```javascript
// Automatic context detection
const shareContext = {
  contentType: 'tutorial|article|project|announcement',
  technicalLevel: 'beginner|intermediate|advanced',
  targetAudience: 'developers|business|general',
  urgency: 'breaking|timely|evergreen'
};
```

## Responsive Design

### Mobile-First Sharing Strategy
```scss
// Mobile (320px-767px): Essential platforms, compact layout
.social-share {
  --share-button-size: 44px;         // WCAG 2.2 touch targets
  --share-spacing: 8px;              // Compact mobile spacing
  --visible-platforms: 3;            // X, LinkedIn, WhatsApp
  --layout-direction: horizontal;    // Single row layout
  --button-style: icons;             // Icons only for space
  --share-text: hidden;              // Hide "Share" text
}

// Tablet (768px-1023px): More platforms, comfortable spacing
@include tablet-up {
  .social-share {
    --share-button-size: 40px;       // Balanced touch targets
    --share-spacing: 12px;           // More comfortable spacing
    --visible-platforms: 4;          // Add Slack to mobile set
    --layout-direction: horizontal;  // Maintain horizontal
    --button-style: buttons;         // Show button styling
    --share-text: optional;          // Show if space allows
  }
}

// Desktop (1024px+): Full sharing experience
@include desktop-up {
  .social-share {
    --share-button-size: 36px;       // Mouse-optimized targets
    --share-spacing: 16px;           // Generous spacing
    --visible-platforms: all;        // All configured platforms
    --layout-direction: flexible;    // Auto-adapt to content
    --button-style: enhanced;        // Full button styling
    --share-text: visible;           // "Share this article"
  }
}
```

### Platform Priority by Device
```javascript
// Mobile sharing optimization (high viral potential platforms)
const getMobileSharingPlatforms = (contentType, businessContext) => {
  const platformPriority = {
    tutorial: ['x', 'linkedin', 'whatsapp'],      // Technical content
    article: ['linkedin', 'x', 'whatsapp'],       // Professional content  
    project: ['github', 'x', 'linkedin'],         // Project showcase
    announcement: ['x', 'linkedin', 'slack']      // News/updates
  };
  
  return platformPriority[contentType] || ['x', 'linkedin', 'whatsapp'];
};

// Progressive platform enhancement
const expandPlatformsForLargerScreens = (basePlatforms, allPlatforms) => {
  const expansionOrder = ['slack', 'reddit', 'discord', 'email'];
  return [...basePlatforms, ...expansionOrder.filter(p => allPlatforms.includes(p))];
};
```

### Adaptive Layout Behavior
- **Mobile**: Horizontal row, 3 essential platforms, icon-only buttons
- **Tablet**: Horizontal row, 4 platforms, compact buttons with optional labels
- **Desktop**: Flexible layout, all platforms, full buttons with clear labels
- **Floating**: Responsive floating bar that adapts position based on screen size
- **Progressive Enhancement**: More sharing options revealed on larger screens

### Touch Optimization
```javascript
// Touch-friendly responsive sharing
class ResponsiveSocialShare extends SocialShare {
  optimizeForTouchDevice() {
    const isTouchDevice = 'ontouchstart' in window;
    const screenWidth = window.innerWidth;
    
    if (isTouchDevice && screenWidth < 768) {
      // Mobile touch optimizations
      this.enableTouchTargetExpansion();
      this.addTouchFeedback();
      this.optimizeForThumb();
    }
  }
  
  enableTouchTargetExpansion() {
    // Expand touch area beyond visual button
    this.shareButtons.forEach(button => {
      button.style.setProperty('--touch-area', '44px');
      button.setAttribute('data-touch-optimized', 'true');
    });
  }
  
  optimizeForThumb() {
    // Position most important platform for thumb reach
    const platformOrder = this.getMobilePlatforms();
    this.reorderButtonsForThumbReach(platformOrder);
  }
}
```

### Connection-Aware Sharing
```javascript
// Optimize sharing for connection speed
const optimizeForConnection = (connectionSpeed) => {
  if (connectionSpeed === 'slow-2g' || connectionSpeed === '2g') {
    // Slow connection: Lightweight sharing only
    return {
      platforms: ['whatsapp', 'x'], // Direct messaging preferred
      shareMethod: 'native', // Use native sharing if available
      tracking: 'minimal' // Reduced tracking parameters
    };
  } else if (connectionSpeed === '3g') {
    // Medium connection: Standard sharing
    return {
      platforms: ['x', 'linkedin', 'whatsapp'],
      shareMethod: 'web',
      tracking: 'standard'
    };
  }
  // Fast connection: Full sharing experience
  return {
    platforms: 'all',
    shareMethod: 'enhanced',
    tracking: 'complete'
  };
};
```

### Native Sharing API Integration
```javascript
// Progressive enhancement with native sharing
const attemptNativeShare = async (shareData) => {
  if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
    try {
      await navigator.share(shareData);
      return true; // Native sharing succeeded
    } catch (error) {
      console.log('Native sharing cancelled or failed');
      return false; // Fall back to custom sharing
    }
  }
  return false; // Native sharing not available
};

// Responsive fallback to native sharing on mobile
const handleMobileShare = async (title, url) => {
  const shareData = { title, url, text: `Check out: ${title}` };
  
  const nativeSuccess = await attemptNativeShare(shareData);
  if (!nativeSuccess) {
    // Fallback to custom mobile-optimized sharing
    this.showMobileShareMenu(shareData);
  }
};
```

## Accessibility

### Keyboard Navigation
- **Tab Order**: Logical sharing button sequence
- **Enter/Space**: Activate sharing functionality
- **Escape**: Close any sharing dialogs
- **Arrow Keys**: Navigate between sharing options

### Screen Reader Support
- **Action Labels**: Clear sharing action descriptions
- **Platform Identification**: Explicit platform naming
- **Status Updates**: Sharing success/failure announcements
- **Context Information**: Content being shared description

## Performance

### Lightweight Implementation
- **No External Scripts**: Pure JavaScript implementation
- **Native Sharing API**: Browser sharing integration where available
- **Optimized URLs**: Pre-computed sharing URLs
- **Efficient DOM**: Minimal markup generation

### Progressive Enhancement
```html
<!-- Base sharing functionality -->
<div class="social-share" data-component="social-share">
  <div class="social-share__platforms">
    <!-- Platform buttons generated based on config -->
  </div>
</div>
```

## Analytics

### Sharing Metrics
- **Platform Preference**: User sharing behavior by platform
- **Content Virality**: Sharing frequency and patterns
- **Conversion Attribution**: Shared content to lead conversion
- **Geographic Distribution**: Sharing patterns by location

### Business Intelligence
The component leverages existing business intelligence systems:

```javascript
// Uses base layer analytics integration
class SocialShare extends SocialBase {
  calculateViralPotential() {
    // Leverages CONTEXT-ENGINE.md content analysis
    return window.contextEngine?.calculateContentViralPotential({
      content_type: this.getContentType(),
      technical_level: this.getTechnicalLevel(),
      engagement_metrics: this.getEngagementMetrics()
    });
  }
  
  handleIncomingShare() {
    // Leverages existing ANALYTICS.md journey tracking
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('share_id')) {
      this.trackInteraction('return_visit', {
        original_share_id: urlParams.get('share_id'),
        return_source: urlParams.get('utm_source'),
        conversion_stage: 'consideration'
      });
    }
  }
}
```

## Implementation Example

### Basic Usage
```liquid
<!-- Automatic platform detection and context generation -->
{% include components/social-share.html %}

<!-- Custom layout -->
{% include components/social-share.html 
   layout="vertical"
   style="icons" %}

<!-- Custom analytics context -->
{% include components/social-share.html 
   analytics_context="tutorial_completion" %}
```

### Advanced Configuration
```liquid
<!-- In article frontmatter -->
---
title: "Advanced React Patterns"
description: "Deep dive into React performance optimization"
social_sharing:
  custom_text: "Just published: Advanced React patterns for enterprise apps"
  hashtags: ["React", "JavaScript", "WebDev", "Performance"]
  priority_platforms: ["x", "linkedin"]
---

<!-- Component automatically uses frontmatter config -->
{% include components/social-share.html %}
```

### Advanced Configuration with Tracking
```liquid
<!-- Advanced sharing with custom tracking context -->
{% include components/social-share.html 
   analytics_context="tutorial_completion_sharing"
   tracking_campaign="advanced_react_tutorial"
   customer_stage="consideration" %}
```

### Tracking URL Examples
When a user shares content, the URLs are automatically enhanced with tracking:

```javascript
// Original URL
const originalUrl = "https://yoursite.com/articles/advanced-react-patterns";

// Enhanced tracking URL (with consent)
const trackedUrl = "https://yoursite.com/articles/advanced-react-patterns?utm_source=linkedin&utm_medium=social_share&utm_campaign=content_sharing&utm_content=react_tutorial&share_id=linkedin_1a2b3c4d_xyz56&share_timestamp=1703001234567&share_context=tutorial&referrer_path=/articles/advanced-react-patterns&customer_stage=consideration&content_type=tutorial&lead_source=organic_share";

// LinkedIn sharing URL
const linkedinShareUrl = `https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(trackedUrl)}`;
```

### Base Layer Integration Example
```javascript
// Simple implementation leveraging all existing systems
class SocialShare extends SocialBase {
  init() {
    super.init(); // Initializes all base layer systems
    this.setupSharingButtons();
    this.handleIncomingShares(); // Automatic journey tracking
  }
  
  setupSharingButtons() {
    // Uses base layer platform detection
    const platforms = this.getPlatformConfig('sharing');
    platforms.forEach(platform => {
      this.createShareButton(platform);
    });
  }
  
  createShareButton(platform) {
    const button = this.createButton(platform);
    button.addEventListener('click', () => {
      // All tracking handled by base layer
      this.handleShareClick(platform);
    });
  }
}
```

## Content Optimization

### Platform-Specific Adaptations

#### X (Twitter) Optimization
- **Character Management**: Auto-truncation with "..." handling
- **Hashtag Strategy**: Relevant hashtags without spam
- **Thread Integration**: Links to related X threads if available
- **Visual Appeal**: Emoji integration for engagement

#### LinkedIn Optimization
- **Professional Tone**: Business-appropriate language
- **Industry Context**: Relevant industry terminology
- **Company Branding**: Professional association integration
- **CTA Integration**: Clear call-to-action for engagement

#### WhatsApp Optimization
- **Personal Touch**: Conversational sharing language
- **Mobile-First**: Optimized for mobile sharing patterns
- **Group Sharing**: Context-appropriate for group discussions
- **Brevity Focus**: Concise, impactful messaging

#### Slack Optimization
- **Team Context**: Workplace-appropriate sharing
- **Channel Targeting**: Department-specific sharing options
- **Technical Focus**: Developer-friendly formatting
- **Collaboration CTA**: Encourages team discussion

## SEO Integration

### Social Signals
- **Backlink Generation**: Shared content creates social backlinks
- **Engagement Metrics**: Social sharing as ranking signal
- **Brand Mentions**: Consistent brand presence across platforms
- **Content Amplification**: Increased content reach and discovery

### Meta Tag Optimization
```html
<!-- Generated automatically based on sharing context -->
<meta property="og:title" content="Platform-optimized title">
<meta property="og:description" content="Context-aware description">
<meta property="og:image" content="Optimized sharing image">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@yourhandle">
```

## Related Components

- **[SOCIAL-BASE.md](./SOCIAL-BASE.md)** - Base functionality and context engine
- **[SOCIAL-EMBED.md](./SOCIAL-EMBED.md)** - Post embedding functionality
- **[SOCIAL-DISCUSS.md](./SOCIAL-DISCUSS.md)** - Discussion integration

## Architecture Compliance

### Extension Pattern
```javascript
// Extends SocialBase component
class SocialShare extends SocialBase {
  static selector = '[data-component="social-share"]';
  
  init() {
    super.init();
    this.generateSharingPlatforms();
    this.setupSharingHandlers();
  }
  
  generateSharingPlatforms() {
    const enabledPlatforms = this.getEnabledPlatforms();
    const shareContext = this.getShareContext();
    this.renderSharingButtons(enabledPlatforms, shareContext);
  }
}
```

### Context-Driven Rendering
- **Config Integration**: Reads from hierarchical configuration
- **Dynamic Generation**: Creates buttons based on available platforms
- **Smart Defaults**: Sensible fallbacks for missing configuration
- **Performance Optimization**: Cached platform configurations