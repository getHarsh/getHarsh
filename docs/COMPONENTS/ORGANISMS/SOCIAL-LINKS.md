# Social Links Component

## Component Specification

**File Pattern:** `social-links.html`  
**Category:** Content Intelligence  
**Business Priority:** High  
**Lead Gen Focus:** High  
**Status:** ✅ Required | Active  
**Extends:** [SOCIAL-BASE.md](./SOCIAL-BASE.md)

## Purpose

Extends the social media base component to provide domain-level profile and account links with optional project-level overrides. This component displays professional social media profiles, GitHub repositories, YouTube channels, and other platform identities for authority building and cross-platform presence.

## Parameters

### Required
*None - Uses hierarchical configuration from context engine*

### Optional
- `layout`: "horizontal|vertical|grid|minimal" (default: "horizontal", auto-adapts mobile→desktop)
- `style`: "icons|text|cards|buttons" (default: "icons")
- `size`: "small|medium|large" (default: "medium", responsive scaling)
- `include_labels`: true|false (default: false, auto-enabled on desktop)
- `responsive`: true|false (default: true, enables responsive behavior)
- `priority_platforms`: Array of platforms for mobile display (default: business-context aware)
- `analytics_context`: "Custom analytics context override"

## Context Engine Integration

### Hierarchical Configuration
```yaml
# Domain config (website.yml)
social:
  x: "getHarsh"                               # X handle
  github: "getHarsh"                          # GitHub username
  linkedin: "https://linkedin.com/in/harshjoshi"  # LinkedIn profile
  youtube: "https://youtube.com/@getharshin"   # YouTube channel
  instagram: "getharsh"                       # Instagram handle
  huggingface: "getHarsh"                    # HuggingFace profile
  reddit: "u/getHarsh"                       # Reddit username
  discord: "https://discord.gg/getHarsh"     # Discord server invite
  whatsapp_channel: "https://whatsapp.com/channel/0029Va123456"  # WhatsApp Channel
  email: "hi@getharsh.in"                    # Contact email

# Project config (project.yml) - optional overrides
social_overrides:
  github: "getHarsh/hena"                    # Project-specific repository
  discord: "https://discord.gg/HENA"        # Project-specific Discord
  youtube: "https://youtube.com/playlist?list=PLxxx"  # Project playlist
```

### Intelligent Platform Detection
- **Config-Driven**: Only shows platforms with configured accounts
- **Domain vs Project**: Automatically switches between domain and project-specific links
- **Authority Building**: Emphasizes professional platforms first
- **Business Context**: Optimizes platform order for lead generation

## Platform Support

### Professional Platforms (High Priority)
- **X (Twitter)**: Professional identity and thought leadership
- **LinkedIn**: Business networking and B2B authority
- **GitHub**: Technical expertise and project portfolio
- **YouTube**: Educational content and technical demonstrations

### Community Platforms (Medium Priority)  
- **HuggingFace**: AI/ML expertise and model sharing
- **Reddit**: Community engagement and technical discussions
- **Discord**: Real-time community and project support
- **WhatsApp Channel**: Broadcast updates and community announcements
- **Instagram**: Visual content and behind-the-scenes

### Contact Integration
- **Email**: Direct professional contact

## URL Generation Patterns

### Platform-Specific URL Construction
```yaml
url_patterns:
  x: "https://x.com/{handle}"
  github: "https://github.com/{username_or_repo}"
  linkedin: "{full_url}"  # Full URL provided in config
  youtube: "{full_url}"   # Channel or playlist URL
  instagram: "https://instagram.com/{handle}"
  huggingface: "https://huggingface.co/{username}"
  reddit: "https://reddit.com/{u/username}"
  discord: "{invite_url}"  # Full Discord invite URL
  email: "mailto:{email_address}"
```

### Smart Link Detection
```javascript
// Intelligent URL generation based on config format
const generatePlatformUrl = (platform, value) => {
  const patterns = {
    x: (handle) => `https://x.com/${handle.replace('@', '')}`,
    github: (path) => path.includes('/') 
      ? `https://github.com/${path}` 
      : `https://github.com/${path}`,
    linkedin: (value) => value.startsWith('http') 
      ? value 
      : `https://linkedin.com/in/${value}`,
    youtube: (value) => value.startsWith('http') 
      ? value 
      : `https://youtube.com/@${value}`,
    huggingface: (username) => `https://huggingface.co/${username}`,
    reddit: (username) => username.startsWith('u/') 
      ? `https://reddit.com/${username}` 
      : `https://reddit.com/u/${username}`,
    whatsapp_channel: (channelUrl) => channelUrl, // Full URL provided
    email: (email) => `mailto:${email}`
  };
  
  return patterns[platform] ? patterns[platform](value) : value;
};
```

## Business Intelligence

### Authority Building Strategy
```javascript
// Platform priority for authority building
const platformPriority = {
  'professional': ['linkedin', 'github', 'x'],
  'technical': ['github', 'huggingface', 'youtube'],
  'community': ['discord', 'whatsapp_channel', 'reddit', 'instagram'],
  'contact': ['email']
};

// Dynamic reordering based on business context
const optimizePlatformOrder = (availablePlatforms, businessContext) => {
  const contextPriority = platformPriority[businessContext] || platformPriority.professional;
  return availablePlatforms.sort((a, b) => {
    const aIndex = contextPriority.indexOf(a) !== -1 ? contextPriority.indexOf(a) : 999;
    const bIndex = contextPriority.indexOf(b) !== -1 ? contextPriority.indexOf(b) : 999;
    return aIndex - bIndex;
  });
};
```

### Project vs Domain Context
- **Domain Links**: Used on main pages, about pages, contact pages
- **Project Links**: Used on project pages, portfolio items, specific repos
- **Automatic Switching**: Context engine determines which set to use
- **Override Logic**: Project overrides take precedence when available

## Responsive Behavior

### Mobile-First Design Strategy
```scss
// Mobile (320px-767px): Priority platforms only
.social-links {
  --platform-count-mobile: 4;        // Show top 4 platforms
  --icon-size-mobile: 44px;          // WCAG 2.2 touch targets  
  --spacing-mobile: 8px;             // Compact spacing
  --layout-mobile: horizontal;       // Space-efficient horizontal layout
  --labels-mobile: hidden;           // Hide labels for space
}

// Tablet (768px-1023px): Expanded platforms  
@include tablet-up {
  .social-links {
    --platform-count-tablet: 6;      // Show 6 platforms
    --icon-size-tablet: 40px;        // Balanced touch targets
    --spacing-tablet: 12px;          // More comfortable spacing
    --layout-tablet: horizontal;     // Maintain horizontal layout
    --labels-tablet: optional;       // Show labels if requested
  }
}

// Desktop (1024px+): Full platform experience
@include desktop-up {
  .social-links {
    --platform-count-desktop: unlimited;  // Show all configured platforms
    --icon-size-desktop: 36px;           // Precise mouse targets
    --spacing-desktop: 16px;             // Generous spacing
    --layout-desktop: flexible;          // Grid or horizontal based on count
    --labels-desktop: auto;              // Auto-show labels for authority
  }
}
```

### Business-Context Platform Prioritization
```javascript
// Mobile platform priority based on business context
const getMobilePlatforms = (businessContext, allPlatforms) => {
  const priorityMaps = {
    lead_generation: ['linkedin', 'email', 'x', 'whatsapp'], // Business focused
    technical_authority: ['github', 'linkedin', 'x', 'huggingface'], // Tech expertise
    content_creation: ['youtube', 'x', 'linkedin', 'instagram'], // Content focus  
    community_building: ['discord', 'reddit', 'x', 'whatsapp'], // Community focus
    default: ['linkedin', 'x', 'github', 'email'] // Professional default
  };
  
  const priorityOrder = priorityMaps[businessContext] || priorityMaps.default;
  return allPlatforms
    .filter(platform => priorityOrder.includes(platform))
    .sort((a, b) => priorityOrder.indexOf(a) - priorityOrder.indexOf(b))
    .slice(0, 4); // Mobile limit
};
```

### Adaptive Layout Behavior
- **Mobile**: Single row, scrollable if needed, priority platforms only
- **Tablet**: Balanced row, increased touch targets, more platforms visible
- **Desktop**: Grid layout for 6+ platforms, horizontal for fewer, full set visible
- **Touch Optimization**: 44px minimum touch targets on mobile (WCAG 2.2)
- **Progressive Enhancement**: Labels appear on larger screens for authority building

### Performance Responsive Optimization
```javascript
// Connection-aware platform loading
const optimizeForConnection = (connectionSpeed, platforms) => {
  if (connectionSpeed === 'slow-2g' || connectionSpeed === '2g') {
    // Slow connection: Essential platforms only
    return platforms.slice(0, 3);
  } else if (connectionSpeed === '3g') {
    // Medium connection: Balanced set
    return platforms.slice(0, 5);
  }
  // Fast connection: Full platform set
  return platforms;
};

// Responsive icon loading
const loadIconsBasedOnViewport = (breakpoint) => {
  const iconSizes = {
    mobile: { size: '24x24', format: 'svg' },
    tablet: { size: '32x32', format: 'svg' },
    desktop: { size: '32x32', format: 'svg', enhanced: true }
  };
  
  return iconSizes[breakpoint];
};
```

### Accessibility Responsive Features
- **Touch Targets**: Responsive sizing meeting WCAG 2.2 requirements across breakpoints
- **Focus Management**: Larger focus rings on touch devices, precise on desktop
- **Screen Reader Labels**: Device-aware descriptions (e.g., "tap to visit" vs "click to visit")
- **High Contrast**: Responsive contrast adjustments for different screen sizes
- **Reduced Motion**: Respects motion preferences across all breakpoints

## Accessibility

### Screen Reader Support
- **Platform Identification**: Clear platform names in ARIA labels
- **External Link Indicators**: Screen reader notifications for external navigation
- **Contact Information**: Accessible contact details
- **Professional Context**: Business relationship context in labels

### Implementation Example
```html
<!-- Accessible social links structure -->
<nav class="social-links" 
     role="navigation" 
     aria-label="Professional social media profiles">
  
  <ul class="social-links__list">
    {% for platform in enabled_platforms %}
    <li class="social-links__item">
      <a href="{{ platform.url }}" 
         class="social-links__link social-links__link--{{ platform.name }}"
         target="_blank" 
         rel="noopener noreferrer"
         aria-label="{{ platform.label }} (opens in new tab)">
        
        {% include icons/{{ platform.name }}.svg %}
        {% if include_labels %}
          <span class="social-links__label">{{ platform.label }}</span>
        {% endif %}
      </a>
    </li>
    {% endfor %}
  </ul>
</nav>
```

## Performance

### Loading Optimization
- **No External Scripts**: Pure HTML/CSS implementation
- **SVG Icons**: Lightweight, scalable vector icons
- **Conditional Rendering**: Only renders configured platforms
- **Lazy Icon Loading**: Icons load as needed

### Efficient Rendering
```liquid
<!-- Optimized social links rendering -->
{% assign social_config = site.social | default: {} %}
{% if page.social_overrides %}
  {% assign social_config = social_config | merge: page.social_overrides %}
{% endif %}

<div class="social-links" data-component="social-links">
  {% for platform_data in social_config %}
    {% assign platform = platform_data[0] %}
    {% assign value = platform_data[1] %}
    {% if value and value != "" %}
      <!-- Render platform link -->
    {% endif %}
  {% endfor %}
</div>
```

## Analytics

### Platform Engagement Tracking
- **Click-Through Rates**: Platform-specific engagement measurement
- **Authority Building Metrics**: Professional credibility tracking
- **Cross-Platform Attribution**: Multi-platform user journey analysis
- **Contact Conversion**: Email/contact form conversion from social links

### Business Intelligence
```javascript
// Social links engagement analytics
const trackSocialLinkEngagement = (platform, context) => {
  analytics.track('social_link_click', {
    platform: platform,
    link_type: 'profile',
    business_context: context.business_context,
    authority_building: 'professional_identity',
    lead_generation_stage: 'awareness',
    cross_platform_navigation: 'external'
  });
};
```

## Implementation Examples

### Basic Usage
```liquid
<!-- Automatic domain-level social links -->
{% include components/social-links.html %}

<!-- Custom layout and style -->
{% include components/social-links.html 
   layout="grid"
   style="cards"
   include_labels="true" %}
```

### Project-Specific Usage
```liquid
<!-- In project page with overrides -->
{% include components/social-links.html 
   analytics_context="project_portfolio_navigation" %}
```

### Footer Integration
```liquid
<!-- Professional footer links -->
{% include components/social-links.html 
   layout="horizontal"
   style="icons"
   size="small"
   analytics_context="footer_professional_links" %}
```

### About Page Integration
```liquid
<!-- Comprehensive professional presence -->
{% include components/social-links.html 
   layout="grid"
   style="cards"
   include_labels="true"
   size="large"
   analytics_context="about_page_professional_identity" %}
```

## Platform-Specific Optimizations

### GitHub Integration
- **Repository Links**: Project-specific repo links
- **Organization Links**: Domain-level GitHub organization
- **Portfolio Context**: Technical expertise demonstration
- **Code Authority**: Open source contribution showcase

### LinkedIn Integration
- **Professional Profile**: Personal brand building
- **Company Page**: Business entity representation
- **B2B Context**: Professional networking and lead generation
- **Industry Authority**: Professional credibility establishment

### YouTube Integration
- **Channel Links**: Educational content authority
- **Playlist Links**: Project-specific video content
- **Technical Demonstrations**: Expertise through video content
- **Educational Authority**: Teaching and knowledge sharing

### HuggingFace Integration
- **Profile Links**: AI/ML expertise demonstration
- **Model Cards**: Technical contribution showcase
- **Research Authority**: AI/ML community participation
- **Innovation Leadership**: Cutting-edge technology engagement

## SEO Integration

### Professional Identity Schema
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "{{ site.author }}",
  "sameAs": [
    "{{ x_url }}",
    "{{ linkedin_url }}",
    "{{ github_url }}",
    "{{ youtube_url }}"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "{{ email }}"
  }
}
```

### Cross-Platform Authority
- **Consistent Identity**: Unified professional presence
- **Backlink Network**: Cross-platform link building
- **Brand Recognition**: Consistent visual and content identity
- **Social Signals**: SEO benefits from social media presence

## Related Components

- **[SOCIAL-BASE.md](./SOCIAL-BASE.md)** - Base functionality and context engine
- **[SOCIAL-EMBED.md](./SOCIAL-EMBED.md)** - Post embedding functionality
- **[SOCIAL-SHARE.md](./SOCIAL-SHARE.md)** - Content sharing functionality  
- **[SOCIAL-DISCUSS.md](./SOCIAL-DISCUSS.md)** - Discussion integration

## Architecture Compliance

### Extension Pattern
```javascript
// Extends SocialBase component
class SocialLinks extends SocialBase {
  static selector = '[data-component="social-links"]';
  
  init() {
    super.init();
    this.detectAvailablePlatforms();
    this.optimizePlatformOrder();
    this.setupLinkTracking();
  }
  
  detectAvailablePlatforms() {
    const socialConfig = this.getSocialConfig();
    const projectOverrides = this.getProjectOverrides();
    const mergedConfig = { ...socialConfig, ...projectOverrides };
    this.renderPlatformLinks(mergedConfig);
  }
}
```

### Configuration Hierarchy Integration
- **Domain Config**: Primary social media accounts and profiles
- **Project Overrides**: Project-specific account variations
- **Context Awareness**: Automatic domain vs project context detection
- **Business Optimization**: Authority building through strategic platform selection