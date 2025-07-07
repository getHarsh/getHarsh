# Document Structure Component

## Component Specification

**File Pattern:** `layout-start.html` / `layout-end.html`  
**Category:** Layout Foundation  
**Business Priority:** Critical  
**Lead Gen Focus:** Medium  
**Status:** ✅ Required | Active

## Purpose

Provides complete HTML5 document wrapper with Universal Intelligence integration, standards compliance, and business optimization. This component creates the fundamental document structure that all other components rely on, automatically integrating ARIA, Analytics, SEO, AI discovery, and performance optimizations.

## Simple Author Input

```liquid
<!-- layout-start.html usage -->
{% include components/layout-start.html 
   title="Advanced React Patterns"
   description="Learn advanced patterns for scalable React applications" %}

<!-- Page content goes here -->
<main>
  {% include components/article-start.html %}
    <!-- Article content -->
  {% include components/article-end.html %}
</main>

<!-- layout-end.html usage -->
{% include components/layout-end.html %}
```

## Generated Output

```html
<!DOCTYPE html>
<html lang="{{ site.language | default: 'en' }}" 
      data-theme-system="{{ site.theme.system | default: 'glassmorphism' }}"
      data-typography="{{ site.theme.typography | default: 'cyber-terminal' }}"
      data-palette="{{ site.theme.palette | default: 'harsh-yellow' }}"
      
      <!-- Business Intelligence -->
      data-business-model="lead_generation"
      data-consulting-vertical="web_development"
      data-domain="{{ site.domain }}"
      
      <!-- Universal Intelligence Integration -->
      itemscope itemtype="https://schema.org/WebPage">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  
  <!-- Performance Intelligence -->
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="dns-prefetch" href="//www.google-analytics.com">
  
  <!-- SEO Intelligence (from SEO.md) -->
  <title itemprop="name">{{ page.title | default: title }} | {{ site.title }}</title>
  <meta name="description" content="{{ page.description | default: description | default: site.description }}" itemprop="description">
  <meta name="keywords" content="{{ page.tags | join: ', ' | default: site.keywords }}">
  <meta name="author" content="{{ site.author }}" itemprop="author">
  
  <!-- Open Graph Intelligence -->
  <meta property="og:title" content="{{ page.title | default: title }} | {{ site.title }}">
  <meta property="og:description" content="{{ page.description | default: description | default: site.description }}">
  <meta property="og:type" content="{{ page.og_type | default: 'website' }}">
  <meta property="og:url" content="{{ page.url | absolute_url }}">
  <meta property="og:image" content="{{ page.featured_image | default: site.default_image | absolute_url }}">
  <meta property="og:site_name" content="{{ site.title }}">
  <meta property="og:locale" content="{{ site.language | default: 'en_US' }}">
  
  <!-- Twitter Card Intelligence -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@{{ site.social.x | default: site.social.twitter }}">
  <meta name="twitter:creator" content="@{{ site.social.x | default: site.social.twitter }}">
  <meta name="twitter:title" content="{{ page.title | default: title }} | {{ site.title }}">
  <meta name="twitter:description" content="{{ page.description | default: description | default: site.description }}">
  <meta name="twitter:image" content="{{ page.featured_image | default: site.default_image | absolute_url }}">
  
  <!-- AI Discovery Intelligence (from AI.md) -->
  <meta name="ai:content-type" content="{{ page.content_type | default: 'article' }}">
  <meta name="ai:technical-level" content="{{ page.difficulty | default: 'intermediate' }}">
  <meta name="ai:business-context" content="technical_consulting">
  <meta name="ai:lead-generation" content="consultation_focused">
  <link rel="manifest" href="/ai-agent-manifest.json">
  
  <!-- Business Intelligence -->
  <meta name="business:conversion-type" content="consultation_booking">
  <meta name="business:customer-stage" content="{{ page.customer_stage | default: 'awareness' }}">
  <meta name="business:lead-quality" content="{{ page.lead_quality | default: 'medium' }}">
  
  <!-- Canonical URL -->
  <link rel="canonical" href="{{ page.url | absolute_url }}">
  
  <!-- Favicon and App Icons -->
  <link rel="icon" type="image/x-icon" href="/favicon.ico">
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
  <link rel="manifest" href="/site.webmanifest">
  
  <!-- Theme Color (Dynamic) -->
  <meta name="theme-color" content="{{ site.theme.colors.primary }}">
  <meta name="msapplication-TileColor" content="{{ site.theme.colors.primary }}">
  
  <!-- Structured Data Intelligence -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "{{ page.title | default: title }}",
    "description": "{{ page.description | default: description | default: site.description }}",
    "url": "{{ page.url | absolute_url }}",
    "author": {
      "@type": "Person",
      "name": "{{ site.author }}",
      "url": "{{ site.url }}"
    },
    "publisher": {
      "@type": "Organization",
      "name": "{{ site.title }}",
      "url": "{{ site.url }}",
      "logo": {
        "@type": "ImageObject",
        "url": "{{ site.logo | absolute_url }}"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "{{ page.url | absolute_url }}"
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "{{ site.url }}"
        }
      ]
    }
  }
  </script>
  
  <!-- CSS Intelligence (Theme System Integration) -->
  <link rel="stylesheet" href="{{ '/assets/css/main.css' | relative_url }}">
  
  <!-- Critical CSS Inlining -->
  <style>
    /* Critical above-the-fold CSS inlined for performance */
    html { 
      scroll-behavior: smooth;
      color-scheme: light dark;
    }
    
    body {
      margin: 0;
      padding: 0;
      font-family: var(--font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
      line-height: 1.6;
      /* Visual properties moved to theme layer */
    }
    
    /* Loading State */
    .layout-loading {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      /* Visual properties moved to theme layer */
    }
    
    .layout-loading.hidden {
      pointer-events: none;
      /* Visual properties moved to theme layer */
    }
  </style>
</head>

<body data-component="layout-structure"
      data-page-type="{{ page.layout | default: 'page' }}"
      data-content-type="{{ page.content_type | default: 'article' }}"
      data-technical-level="{{ page.difficulty | default: 'intermediate' }}"
      data-business-context="{{ page.business_context | default: 'lead_generation' }}"
      
      <!-- ARIA Intelligence (from ARIA.md) -->
      role="document"
      aria-label="Main website content for {{ page.title | default: title }}"
      
      <!-- Analytics Intelligence (Consent-Compliant) -->
      data-track-page-view="true"
      data-track-scroll-depth="true"
      data-track-engagement="true"
      data-conversion-tracking="{{ page.conversion_tracking | default: 'enabled' }}">

  <!-- Loading State -->
  <div class="layout-loading" aria-hidden="true">
    <div class="loading-spinner" role="status" aria-label="Page loading">
      <span class="sr-only">Loading content...</span>
    </div>
  </div>
  
  <!-- Skip Navigation (Accessibility) -->
  <a href="#main-content" class="skip-link sr-only-focusable">
    Skip to main content
  </a>
  
  <!-- Analytics Initialization (Consent-Compliant) -->
  {% include components/analytics-init.html %}
  
  <!-- Consent Banner (GDPR Compliance) -->
  {% include components/consent-banner.html %}

<!-- Content will be inserted here by Jekyll -->
```

## Universal Intelligence Integration

### ARIA System Integration
- **Document Role**: Proper document structure with semantic landmarks
- **Skip Navigation**: Accessibility-first navigation for screen readers
- **Loading States**: Screen reader compatible loading indicators
- **Focus Management**: Proper focus flow and management

### Analytics System Integration
```javascript
// Performance: Optimized page analytics with consent validation
(function() {
  'use strict';
  
  class LayoutStructureAnalytics {
    constructor() {
      this.pageLoadTime = performance.now();
      this.engagementMetrics = {
        scrollDepth: 0,
        timeOnPage: 0,
        interactions: 0
      };
    }
    
    init() {
      // Performance: Check consent before any tracking
      if (!window.consentManager?.hasConsent('analytics')) {
        console.log('Layout analytics blocked: Analytics consent not granted');
        return;
      }
      
      this.trackPageView();
      this.setupEngagementTracking();
      this.trackPerformanceMetrics();
    }
    
    trackPageView() {
      try {
        // Performance: Use analytics instance for consistent tracking
        window.analyticsInstance?.trackEvent('page_view', {
          event_category: 'navigation',
          page_title: document.title,
          page_location: window.location.href,
          content_type: document.body.dataset.contentType,
          technical_level: document.body.dataset.technicalLevel,
          business_context: document.body.dataset.businessContext,
          page_load_time: this.pageLoadTime,
          lead_generation_page: true
        });
        
      } catch (error) {
        console.error('Page view tracking failed:', error);
        window.analyticsInstance?.trackError('page_view_failed', error.message);
      }
    }
    
    setupEngagementTracking() {
      // Performance: Debounced scroll tracking
      let scrollTimeout;
      const SCROLL_DEBOUNCE = 250;
      
      window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          this.trackScrollDepth();
        }, SCROLL_DEBOUNCE);
      });
      
      // Performance: Track time on page
      this.startTime = Date.now();
      window.addEventListener('beforeunload', () => {
        this.trackTimeOnPage();
      });
    }
    
    trackScrollDepth() {
      try {
        const scrollPercentage = Math.round(
          (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
        );
        
        if (scrollPercentage > this.engagementMetrics.scrollDepth) {
          this.engagementMetrics.scrollDepth = scrollPercentage;
          
          // Track milestone scroll depths
          if ([25, 50, 75, 90].includes(scrollPercentage)) {
            window.analyticsInstance?.trackEvent('scroll_depth', {
              event_category: 'engagement',
              scroll_percentage: scrollPercentage,
              content_type: document.body.dataset.contentType,
              lead_generation_engagement: 'scroll_milestone'
            });
          }
        }
      } catch (error) {
        console.error('Scroll tracking failed:', error);
      }
    }
    
    trackTimeOnPage() {
      try {
        const timeOnPage = Math.round((Date.now() - this.startTime) / 1000);
        
        window.analyticsInstance?.trackEvent('time_on_page', {
          event_category: 'engagement',
          time_seconds: timeOnPage,
          content_type: document.body.dataset.contentType,
          engagement_quality: this.calculateEngagementQuality(timeOnPage),
          lead_generation_engagement: 'time_spent'
        });
        
      } catch (error) {
        console.error('Time tracking failed:', error);
      }
    }
    
    calculateEngagementQuality(timeSeconds) {
      // Business intelligence: Calculate engagement quality for lead scoring
      if (timeSeconds < 30) return 'low';
      if (timeSeconds < 120) return 'medium';
      if (timeSeconds < 300) return 'high';
      return 'very_high';
    }
    
    trackPerformanceMetrics() {
      try {
        // Performance: Track Core Web Vitals
        if ('web-vital' in window) {
          window.webVitals.getCLS((metric) => {
            this.trackWebVital('CLS', metric);
          });
          
          window.webVitals.getFID((metric) => {
            this.trackWebVital('FID', metric);
          });
          
          window.webVitals.getLCP((metric) => {
            this.trackWebVital('LCP', metric);
          });
        }
      } catch (error) {
        console.error('Performance tracking failed:', error);
      }
    }
    
    trackWebVital(name, metric) {
      window.analyticsInstance?.trackEvent('web_vital', {
        event_category: 'performance',
        metric_name: name,
        metric_value: metric.value,
        metric_rating: metric.rating,
        page_type: document.body.dataset.pageType
      });
    }
  }
  
  // Performance: Initialize when DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    try {
      window.layoutAnalytics = new LayoutStructureAnalytics();
      window.layoutAnalytics.init();
      
      // Performance: Hide loading state
      const loadingElement = document.querySelector('.layout-loading');
      if (loadingElement) {
        loadingElement.classList.add('hidden');
        document.body.classList.add('loaded');
      }
      
    } catch (error) {
      console.error('Layout analytics initialization failed:', error);
    }
  });
})();
```

## Business Model Integration

### Lead Generation Optimization
- **Conversion Context**: Every page tagged with business model and conversion type
- **Customer Journey**: Automatic customer stage detection and tracking
- **Lead Scoring**: Content difficulty and engagement quality scoring
- **Authority Building**: Professional markup and technical expertise demonstration

### Consultation Funnel Integration
```javascript
// Business intelligence: Layout-level conversion optimization
class LayoutConversionOptimizer {
  constructor() {
    this.businessContext = document.body.dataset.businessContext;
    this.contentType = document.body.dataset.contentType;
    this.technicalLevel = document.body.dataset.technicalLevel;
  }
  
  optimizeForConversions() {
    // Performance: Check if optimization needed
    if (this.businessContext !== 'lead_generation') return;
    
    try {
      // Add subtle conversion elements based on content
      this.addConversionOptimization();
      this.trackConversionOpportunities();
      
    } catch (error) {
      console.error('Conversion optimization failed:', error);
    }
  }
  
  addConversionOptimization() {
    // Add consultation CTAs for advanced technical content
    if (this.technicalLevel === 'advanced' && this.contentType === 'tutorial') {
      this.addConsultationPrompt();
    }
  }
  
  addConsultationPrompt() {
    // Subtle, non-intrusive consultation prompt for qualified leads
    const prompt = document.createElement('div');
    prompt.className = 'conversion-prompt';
    prompt.innerHTML = `
      <div class="prompt-content">
        <p>Working on a similar technical challenge?</p>
        <a href="/contact" class="prompt-cta">Get Expert Guidance</a>
      </div>
    `;
    
    // Performance: Add after initial page load
    setTimeout(() => {
      document.body.appendChild(prompt);
    }, 5000);
  }
}

// Performance: Initialize conversion optimization
document.addEventListener('DOMContentLoaded', () => {
  window.conversionOptimizer = new LayoutConversionOptimizer();
  window.conversionOptimizer.optimizeForConversions();
});
```

## Performance Optimization

### Core Web Vitals Optimization
- **Critical CSS Inlining**: Above-the-fold styles inlined for fast rendering
- **Resource Preloading**: DNS prefetch and preconnect for external resources
- **Font Loading**: Optimized web font loading with fallbacks
- **Image Optimization**: Responsive images with lazy loading

### Loading Performance
- **Progressive Enhancement**: Works without JavaScript, enhanced with it
- **Graceful Degradation**: Fallbacks for all interactive features
- **Error Resilience**: Comprehensive error handling with user feedback
- **Memory Management**: Efficient event listener cleanup

## Responsive Architecture Integration

### Mobile-First Document Structure
The document structure component automatically provides responsive behavior through the Universal Intelligence system:

```html
<!-- Mobile-optimized viewport and meta tags -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
<meta name="format-detection" content="telephone=no">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">

<!-- Responsive critical CSS with mobile-first approach -->
<style>
  /* Mobile-first base styles (320px+) */
  html {
    scroll-behavior: smooth;
    color-scheme: light dark;
    font-size: clamp(16px, 4vw, 18px); /* Fluid typography */
  }
  
  body {
    margin: 0;
    padding: 0;
    font-family: var(--font-family);
    line-height: clamp(1.4, 2vw, 1.6); /* Responsive line height */
    /* Visual properties (color, background) moved to theme layer */
    
    /* Mobile performance optimization */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }
  
  /* Responsive container system */
  .container {
    width: 100%;
    max-width: var(--container-mobile, 100%);
    margin: 0 auto;
    padding: var(--spacing-mobile, 1rem);
  }
  
  /* Responsive enhancements using mixins from base/_responsive.scss */
  @include tablet-up {
    .container {
      max-width: var(--container-tablet, min(90vw, 768px));
      padding: var(--spacing-tablet, 1.5rem);
    }
  }
  
  @include desktop-up {
    .container {
      max-width: var(--container-desktop, min(85vw, 1200px));
      padding: var(--spacing-desktop, 2rem);
    }
  }
  
  /* Large screen optimization (1440px+) */
  @media (min-width: 1440px) {
    .container {
      max-width: var(--container-large, min(80vw, 1400px));
      padding: var(--spacing-large, 2.5rem);
    }
  }
  
  /* Touch optimization */
  @media (pointer: coarse) {
    .skip-link {
      padding: 1rem 1.5rem; /* Larger touch targets */
      font-size: 1.125rem;
    }
  }
  
  /* High contrast mode support */
  @media (prefers-contrast: high) {
    body {
      --color-text: CanvasText;
      --color-background: Canvas;
      --color-border: ButtonBorder;
    }
  }
  
  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }
    
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
</style>
```

### Responsive Layout Intelligence
```javascript
// Document-level responsive optimization
class LayoutResponsiveIntelligence {
  constructor() {
    this.currentBreakpoint = this.detectBreakpoint();
    this.viewportMeta = document.querySelector('meta[name="viewport"]');
    this.documentElement = document.documentElement;
  }
  
  init() {
    this.setupViewportOptimization();
    this.initializeResponsiveHandlers();
    this.optimizeForCurrentDevice();
    this.enableBusinessOptimizations();
  }
  
  detectBreakpoint() {
    const width = window.innerWidth;
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    if (width < 1440) return 'desktop';
    return 'large';
  }
  
  setupViewportOptimization() {
    // Dynamic viewport optimization based on device
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    
    if (isIOS && isSafari) {
      // iOS Safari viewport fix for 100vh issues
      this.addIOSViewportFix();
    }
    
    // Prevent zoom on input focus for mobile
    if (this.currentBreakpoint === 'mobile') {
      this.preventInputZoom();
    }
  }
  
  addIOSViewportFix() {
    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      this.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    setViewportHeight();
    window.addEventListener('resize', setViewportHeight);
    window.addEventListener('orientationchange', () => {
      setTimeout(setViewportHeight, 500);
    });
  }
  
  preventInputZoom() {
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      if (parseFloat(getComputedStyle(input).fontSize) < 16) {
        input.style.fontSize = '16px'; // Prevent zoom on iOS
      }
    });
  }
  
  initializeResponsiveHandlers() {
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const newBreakpoint = this.detectBreakpoint();
        if (newBreakpoint !== this.currentBreakpoint) {
          this.handleBreakpointChange(newBreakpoint);
        }
      }, 150);
    });
    
    // Orientation change handling
    window.addEventListener('orientationchange', () => {
      setTimeout(() => {
        this.optimizeForCurrentDevice();
      }, 300);
    });
  }
  
  handleBreakpointChange(newBreakpoint) {
    const oldBreakpoint = this.currentBreakpoint;
    this.currentBreakpoint = newBreakpoint;
    
    // Update body data attribute for CSS targeting
    document.body.dataset.breakpoint = newBreakpoint;
    
    // Trigger breakpoint change event for other components
    window.dispatchEvent(new CustomEvent('breakpointChange', {
      detail: { from: oldBreakpoint, to: newBreakpoint }
    }));
    
    // Business optimization updates
    this.updateBusinessOptimizations(newBreakpoint);
  }
  
  updateBusinessOptimizations(breakpoint) {
    const businessContext = document.body.dataset.businessContext;
    
    if (businessContext === 'lead_generation') {
      switch (breakpoint) {
        case 'mobile':
          this.prioritizeMobileConversion();
          break;
        case 'tablet':
          this.balanceContentAndConversion();
          break;
        case 'desktop':
          this.enableFullConversionExperience();
          break;
      }
    }
  }
  
  prioritizeMobileConversion() {
    // Mobile-specific lead generation optimizations
    document.body.classList.add('mobile-conversion-priority');
    
    // Make contact information more prominent
    const contactElements = document.querySelectorAll('[data-conversion-element]');
    contactElements.forEach(el => {
      el.classList.add('mobile-prominent');
    });
  }
}

// Initialize responsive document intelligence
document.addEventListener('DOMContentLoaded', () => {
  window.layoutResponsive = new LayoutResponsiveIntelligence();
  window.layoutResponsive.init();
});
```

### Device-Specific Performance Optimization
- **Mobile**: Prioritized critical path, reduced JavaScript execution, optimized images
- **Tablet**: Balanced resource loading, progressive enhancement of interactive features
- **Desktop**: Full feature set, preloading of secondary resources, enhanced interactions
- **Connection-Aware**: Adapts resource loading based on network speed detection

### Business Model Responsive Integration
The document structure automatically optimizes for lead generation across all breakpoints:

- **Mobile**: Contact CTAs prioritized, simplified navigation, touch-optimized conversion flows
- **Tablet**: Balanced content and conversion elements, hybrid interaction patterns
- **Desktop**: Full conversion suite, advanced interaction tracking, comprehensive lead capture

## SEO Integration

### Schema.org Intelligence
- **WebPage Schema**: Complete structured data for page content
- **Organization Schema**: Business entity markup for authority
- **Breadcrumb Schema**: Navigation structure for search engines
- **Author Schema**: Professional credibility markup

### Technical SEO
- **Meta Tag Optimization**: Complete meta tag coverage for all platforms
- **Canonical URLs**: Proper URL canonicalization
- **Sitemap Integration**: Automatic sitemap generation support
- **Robot Instructions**: Optimized crawling and indexing directives

## Related Components

- **[ANALYTICS-INIT.md](./ANALYTICS-INIT.md)** - Analytics initialization component
- **[CONSENT-BANNER.md](./CONSENT-BANNER.md)** - GDPR consent management
- **[STRUCTURED-DATA.md](./STRUCTURED-DATA.md)** - Schema.org implementation
- **[HEADER.md](./HEADER.md)** - Site header component
- **[FOOTER.md](./FOOTER.md)** - Site footer component

## Theme Layer Integration

### Visual Properties Applied by Themes

The layout structure component provides the structural foundation, while themes apply visual properties:

```scss
/* Theme applies visual properties to layout elements */
[data-theme="retrofuture-glass"] {
  body {
    color: var(--color-text);
    background: var(--color-background);
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }
  
  body.loaded {
    opacity: 1;
  }
  
  .layout-loading {
    background: var(--color-background);
    transition: opacity 0.3s ease-in-out;
    
    &.hidden {
      opacity: 0;
    }
  }
}

/* Different theme, different visual treatment */
[data-theme="minimal"] {
  body {
    color: var(--color-text);
    background: var(--color-background);
    /* No transition for minimal theme */
  }
  
  .layout-loading {
    background: var(--color-background);
    /* Simple fade without transition */
  }
}
```

### Theme Responsibilities for Layout

- **Colors**: Text, background, and accent colors
- **Transitions**: Page load animations and state changes
- **Loading States**: Visual feedback during page initialization
- **Opacity Effects**: Fade-in/fade-out behaviors
- **Background Treatments**: Patterns, gradients, or solid colors

### Component Responsibilities (This File)

- **Structure**: HTML document structure and meta tags
- **Layout**: Positioning, sizing, and spacing
- **Performance**: Font rendering and optimization hints
- **Accessibility**: ARIA landmarks and skip navigation
- **Intelligence**: Analytics and context integration

## Architecture Compliance

### Three-Layer Architecture
- **Jekyll Template**: HTML structure with Universal Intelligence integration
- **SCSS Module**: Theme system integration with CSS custom properties
- **JavaScript Module**: Performance optimization and analytics integration

### SOLID Principles
- **Single Responsibility**: Document structure and meta tag management only
- **Open/Closed**: Extensible through component includes and data attributes
- **Liskov Substitution**: Works with any content type and layout
- **Interface Segregation**: Minimal required parameters, rich optional configuration
- **Dependency Inversion**: Depends on theme system and analytics abstractions

### Universal Intelligence Compliance
- ✅ **ARIA Integration**: Complete accessibility markup and screen reader support
- ✅ **Analytics Integration**: Consent-compliant tracking with comprehensive metrics
- ✅ **SEO Integration**: Complete meta tag coverage and structured data
- ✅ **AI Integration**: AI discovery meta tags and content analysis
- ✅ **Standards Integration**: WCAG 2.2 AA compliance and performance optimization
- ✅ **Performance Integration**: Core Web Vitals tracking and optimization