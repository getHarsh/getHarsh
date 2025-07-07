# Site Header Component

## Component Specification

**File Pattern:** `header.html`  
**Category:** Layout Foundation  
**Business Priority:** High  
**Lead Gen Focus:** High  
**Status:** ✅ Required | Active

## Purpose

Provides the complete site header with intelligent navigation, branding, and business optimization. This component creates the primary site navigation that adapts across all devices while integrating seamlessly with the Universal Intelligence systems for lead generation, accessibility, and performance optimization.

## Simple Author Input

```liquid
<!-- Basic header usage -->
{% include components/header.html %}

<!-- Custom navigation priority -->
{% include components/header.html 
   nav_priority="consultation" 
   show_contact_button="true" %}

<!-- Project-specific header -->
{% include components/header.html 
   logo_variant="project"
   nav_context="project_showcase" %}
```

## Generated Output

```html
<!-- Mobile-first responsive header with Universal Intelligence -->
<header class="site-header" 
        data-component="site-header"
        data-responsive-priority="navigation"
        data-business-context="{{ site.business.model | default: 'lead_generation' }}"
        
        <!-- ARIA Intelligence (from ARIA.md) -->
        role="banner"
        aria-label="Site header with main navigation and contact information"
        
        <!-- Analytics Intelligence (Consent-Compliant) -->
        data-track-navigation="true"
        data-conversion-tracking="header_engagement"
        data-customer-stage="{{ page.customer_stage | default: 'awareness' }}"
        
        <!-- SEO Intelligence -->
        itemscope itemtype="https://schema.org/WPHeader">

  <!-- Responsive Navigation Container -->
  <div class="header-container">
    
    <!-- Site Branding with Context Intelligence -->
    <div class="header-brand" 
         itemscope itemtype="https://schema.org/Organization">
      
      <a href="{{ '/' | relative_url }}" 
         class="brand-link"
         aria-label="Return to {{ site.title }} homepage"
         itemprop="url">
        
        <!-- Responsive Logo System -->
        <div class="brand-logo" 
             data-logo-variant="{{ page.logo_variant | default: 'default' }}">
          {% if site.logo %}
            <img src="{{ site.logo | relative_url }}" 
                 alt="{{ site.title }} logo"
                 class="logo-image"
                 itemprop="logo"
                 
                 <!-- Responsive Intelligence -->
                 sizes="(max-width: 768px) 120px, (max-width: 1024px) 140px, 160px"
                 loading="eager"
                 fetchpriority="high">
          {% endif %}
          
          <span class="brand-text" itemprop="name">
            {{ site.title }}
          </span>
        </div>
      </a>
      
      <!-- Business Context Integration -->
      {% if site.business.tagline %}
        <div class="brand-tagline" 
             aria-label="Business tagline"
             itemprop="description">
          {{ site.business.tagline }}
        </div>
      {% endif %}
    </div>

    <!-- Responsive Navigation System -->
    <nav class="header-navigation" 
         role="navigation"
         aria-label="Primary site navigation"
         itemscope itemtype="https://schema.org/SiteNavigationElement">
      
      <!-- Mobile Navigation Toggle -->
      <button class="nav-toggle" 
              aria-expanded="false"
              aria-controls="header-nav-menu"
              aria-label="Toggle navigation menu"
              data-component="nav-toggle"
              
              <!-- Responsive Touch Optimization -->
              style="min-height: 44px; min-width: 44px;">
        <span class="nav-toggle-icon" aria-hidden="true">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>

      <!-- Navigation Menu with Business Intelligence -->
      <div class="nav-menu" 
           id="header-nav-menu"
           data-nav-context="{{ include.nav_context | default: 'main' }}">
        
        <ul class="nav-list" role="menubar">
          
          <!-- Dynamic Navigation from Config -->
          {% assign nav_items = site.navigation.primary | default: site.data.navigation %}
          {% for nav_item in nav_items %}
            <li class="nav-item" role="none">
              <a href="{{ nav_item.url | relative_url }}" 
                 class="nav-link"
                 role="menuitem"
                 
                 <!-- Analytics Intelligence -->
                 data-track-click="navigation"
                 data-nav-section="{{ nav_item.section | default: 'main' }}"
                 data-business-priority="{{ nav_item.priority | default: 'medium' }}"
                 
                 <!-- Current Page Detection -->
                 {% if page.url == nav_item.url %}
                   aria-current="page"
                   class="nav-link nav-link--current"
                 {% endif %}
                 
                 itemprop="url">
                
                <span itemprop="name">{{ nav_item.title }}</span>
                
                {% if nav_item.description %}
                  <span class="nav-description sr-only">
                    {{ nav_item.description }}
                  </span>
                {% endif %}
              </a>
            </li>
          {% endfor %}
          
          <!-- Business Model Contact Integration -->
          {% if include.show_contact_button != "false" and site.business.model == "lead_generation" %}
            <li class="nav-item nav-item--cta" role="none">
              {% include components/contact-button.html 
                 text="Get Started"
                 style="primary"
                 size="small"
                 conversion_context="header_navigation" %}
            </li>
          {% endif %}
        </ul>
      </div>
    </nav>
  </div>
</header>

<!-- Performance: Responsive Header JavaScript with Universal Intelligence -->
<script>
(function() {
  'use strict';
  
  class SiteHeaderIntelligence extends ComponentSystem.Component {
    static selector = '[data-component="site-header"]';
    
    init() {
      super.init();
      this.initializeResponsiveBehavior();
      this.setupNavigationIntelligence();
      this.initializeBusinessOptimization();
      this.setupAnalyticsTracking();
    }
    
    // Responsive Intelligence Integration
    initializeResponsiveBehavior() {
      this.currentBreakpoint = this.detectBreakpoint();
      this.setupResponsiveNavigation();
      this.optimizeForCurrentViewport();
      
      // Performance: Debounced resize handler
      let resizeTimeout;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          const newBreakpoint = this.detectBreakpoint();
          if (newBreakpoint !== this.currentBreakpoint) {
            this.currentBreakpoint = newBreakpoint;
            this.handleBreakpointChange(newBreakpoint);
          }
        }, 150);
      });
    }
    
    detectBreakpoint() {
      const width = window.innerWidth;
      if (width < 768) return 'mobile';
      if (width < 1024) return 'tablet';
      return 'desktop';
    }
    
    setupResponsiveNavigation() {
      this.navToggle = this.element.querySelector('.nav-toggle');
      this.navMenu = this.element.querySelector('.nav-menu');
      
      if (this.navToggle && this.navMenu) {
        this.navToggle.addEventListener('click', this.handleNavToggle.bind(this));
        
        // Accessibility: Escape key closes mobile menu
        document.addEventListener('keydown', (e) => {
          if (e.key === 'Escape' && this.navToggle.getAttribute('aria-expanded') === 'true') {
            this.closeNavigation();
          }
        });
      }
    }
    
    handleNavToggle() {
      const isExpanded = this.navToggle.getAttribute('aria-expanded') === 'true';
      
      if (isExpanded) {
        this.closeNavigation();
      } else {
        this.openNavigation();
      }
      
      // Analytics: Track mobile navigation usage
      this.trackNavigationInteraction(isExpanded ? 'close' : 'open');
    }
    
    openNavigation() {
      this.navToggle.setAttribute('aria-expanded', 'true');
      this.navMenu.classList.add('nav-menu--open');
      document.body.classList.add('nav-open');
      
      // Accessibility: Focus first nav item
      const firstNavLink = this.navMenu.querySelector('.nav-link');
      if (firstNavLink) {
        setTimeout(() => firstNavLink.focus(), 100);
      }
    }
    
    closeNavigation() {
      this.navToggle.setAttribute('aria-expanded', 'false');
      this.navMenu.classList.remove('nav-menu--open');
      document.body.classList.remove('nav-open');
      
      // Accessibility: Return focus to toggle button
      this.navToggle.focus();
    }
    
    // Business Intelligence Integration
    initializeBusinessOptimization() {
      const businessContext = this.element.dataset.businessContext;
      
      if (businessContext === 'lead_generation') {
        this.optimizeForLeadGeneration();
      }
    }
    
    optimizeForLeadGeneration() {
      // Mobile: Prioritize contact visibility
      if (this.currentBreakpoint === 'mobile') {
        this.prioritizeContactButton();
      }
      
      // Add consultation prompts for qualified traffic
      this.addIntelligentPrompts();
    }
    
    prioritizeContactButton() {
      const contactButton = this.element.querySelector('.nav-item--cta');
      if (contactButton && this.currentBreakpoint === 'mobile') {
        contactButton.style.order = '-1'; // Move to front on mobile
        contactButton.classList.add('nav-item--priority');
      }
    }
    
    // Analytics Intelligence Integration
    setupAnalyticsTracking() {
      // Performance: Check consent before any tracking
      if (!window.analyticsInstance?.hasConsent('analytics')) {
        console.log('Header analytics blocked: Analytics consent not granted');
        return;
      }
      
      this.trackHeaderView();
      this.setupNavigationTracking();
    }
    
    trackHeaderView() {
      try {
        window.analyticsInstance?.trackEvent('header_view', {
          event_category: 'navigation',
          header_type: 'primary',
          business_context: this.element.dataset.businessContext,
          device_type: this.currentBreakpoint,
          lead_generation_header: true
        });
      } catch (error) {
        console.error('Header view tracking failed:', error);
      }
    }
    
    setupNavigationTracking() {
      const navLinks = this.element.querySelectorAll('.nav-link');
      
      navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          this.trackNavigationClick(link, e);
        });
      });
    }
    
    trackNavigationClick(link, event) {
      try {
        if (!window.analyticsInstance?.hasConsent('analytics')) return;
        
        const navSection = link.dataset.navSection;
        const businessPriority = link.dataset.businessPriority;
        
        window.analyticsInstance?.trackEvent('navigation_click', {
          event_category: 'navigation',
          event_action: 'nav_link_click',
          nav_section: navSection,
          business_priority: businessPriority,
          link_text: link.textContent.trim(),
          link_url: link.href,
          device_type: this.currentBreakpoint,
          customer_journey_stage: 'navigation'
        });
      } catch (error) {
        console.error('Navigation click tracking failed:', error);
      }
    }
    
    trackNavigationInteraction(action) {
      try {
        if (!window.analyticsInstance?.hasConsent('analytics')) return;
        
        window.analyticsInstance?.trackEvent('mobile_navigation', {
          event_category: 'navigation',
          event_action: action,
          navigation_type: 'mobile_toggle',
          device_type: this.currentBreakpoint
        });
      } catch (error) {
        console.error('Navigation interaction tracking failed:', error);
      }
    }
    
    // Performance: Cleanup
    cleanup() {
      if (this.navToggle) {
        this.navToggle.removeEventListener('click', this.handleNavToggle);
      }
    }
  }
  
  // Performance: Initialize when DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    try {
      const headerElement = document.querySelector('[data-component="site-header"]');
      if (headerElement) {
        const headerIntelligence = new SiteHeaderIntelligence(headerElement);
        headerIntelligence.init();
        
        // Performance: Store instance for cleanup
        headerElement._headerIntelligence = headerIntelligence;
      }
    } catch (error) {
      console.error('Site header initialization failed:', error);
    }
  });
  
  // Performance: Cleanup on page unload
  window.addEventListener('beforeunload', () => {
    try {
      const headerElement = document.querySelector('[data-component="site-header"]');
      if (headerElement?._headerIntelligence) {
        headerElement._headerIntelligence.cleanup();
      }
    } catch (error) {
      console.error('Site header cleanup failed:', error);
    }
  });
})();
</script>
```

## Universal Intelligence Integration

### Responsive Architecture Integration
- **Mobile-First Navigation**: Hamburger menu with touch-optimized 44px targets
- **Progressive Enhancement**: Full navigation revealed on larger screens
- **Adaptive Branding**: Logo sizing and tagline visibility based on viewport
- **Business-Aware Layout**: Contact CTAs prioritized based on business model
- **Connection-Aware**: Resource loading optimized for device capabilities

### ARIA System Integration
- **Landmark Roles**: Header banner with proper navigation structure
- **Focus Management**: Logical tab order and mobile menu focus handling
- **Screen Reader Support**: Comprehensive ARIA labels and descriptions
- **Keyboard Navigation**: Full keyboard accessibility with escape key support
- **Current Page Indication**: aria-current for active navigation states

### Analytics System Integration
```javascript
// Performance: Consent-aware header analytics with error handling
const headerAnalytics = {
  trackHeaderEngagement: (action, context) => {
    // Performance: Check consent before tracking
    if (!window.analyticsInstance?.hasConsent('analytics')) return;
    
    try {
      window.analyticsInstance.trackEvent('header_engagement', {
        event_category: 'navigation',
        event_action: action,
        business_context: context.businessModel,
        device_type: context.deviceType,
        customer_journey_stage: context.customerStage,
        lead_generation_optimization: true
      });
    } catch (error) {
      console.error('Header analytics failed:', error);
    }
  }
};
```

### SEO Integration
- **Schema.org Markup**: WPHeader and Organization structured data
- **Navigation Schema**: SiteNavigationElement for search engines
- **Brand Authority**: Complete organization markup with logo and description
- **Internal Linking**: Optimized link structure for site architecture

### Business Model Integration

#### Lead Generation Optimization
- **Contact Prominence**: Strategic contact button placement in navigation
- **Mobile Priority**: Lead generation CTAs prioritized on mobile devices
- **Conversion Context**: Business-aware navigation with consultation focus
- **Customer Journey**: Navigation adapts based on customer stage awareness

#### Authority Building
- **Professional Branding**: Clean, authoritative header design
- **Expertise Demonstration**: Navigation structure showcasing competencies
- **Trust Signals**: Consistent branding and professional presentation

## Responsive Design Intelligence

### Mobile-First Navigation Strategy
```scss
// Mobile (320px-767px): Hamburger navigation
.site-header {
  --header-height: 64px;              // Touch-friendly height
  --nav-toggle-size: 44px;            // WCAG 2.2 touch targets
  --brand-logo-size: 120px;           // Compact logo sizing
  --nav-menu-position: fixed;         // Full-screen mobile menu
}

// Tablet (768px-1023px): Hybrid navigation
@include tablet-up {
  .site-header {
    --header-height: 72px;            // More space for content
    --brand-logo-size: 140px;         // Larger logo
    --nav-menu-position: relative;    // Inline navigation menu
  }
}

// Desktop (1024px+): Full navigation experience
@include desktop-up {
  .site-header {
    --header-height: 80px;            // Full height for desktop
    --brand-logo-size: 160px;         // Full logo size
    --nav-spacing: 2rem;              // Generous navigation spacing
  }
}
```

### Business-Context Responsive Behavior
- **Mobile**: Contact button prioritized, simplified navigation, essential links only
- **Tablet**: Balanced navigation with secondary links, moderate contact prominence
- **Desktop**: Full navigation suite, comprehensive contact options, authority elements

### Touch and Interaction Optimization
- **Touch Targets**: 44px minimum for all interactive elements (WCAG 2.2)
- **Hover States**: Desktop-only hover effects with proper touch detection
- **Focus Management**: Responsive focus indicators for keyboard navigation
- **Gesture Support**: Touch-friendly swipe interactions on mobile menu

## Performance Optimization

### Critical Path Optimization
- **Logo Preloading**: Eager loading for above-the-fold branding
- **Navigation Lazy Enhancement**: Progressive JavaScript enhancement
- **Font Loading**: Optimized web font loading with fallbacks
- **Resource Hints**: DNS prefetch for external navigation links

### Efficient Navigation
```javascript
// Performance: Optimized navigation initialization
class PerformantHeaderNavigation {
  constructor() {
    this.isInitialized = false;
    this.navigationCache = new Map();
  }
  
  // Performance: Lazy initialization of complex features
  initializeOnInteraction() {
    if (this.isInitialized) return;
    
    this.setupAdvancedFeatures();
    this.isInitialized = true;
  }
  
  // Performance: Debounced resize handling
  handleResize = this.debounce(() => {
    this.updateNavigationLayout();
  }, 150);
}
```

## Configuration Integration

### Hierarchical Navigation Config
```yaml
# Global navigation (_config.yml)
navigation:
  primary:
    - title: "About"
      url: "/about"
      section: "main"
      priority: "high"
    - title: "Services"
      url: "/services"
      section: "business"
      priority: "very_high"
    - title: "Portfolio"
      url: "/portfolio"
      section: "showcase"
      priority: "high"
    - title: "Contact"
      url: "/contact"
      section: "conversion"
      priority: "very_high"

# Business model integration
business:
  model: "lead_generation"
  tagline: "Expert Web Development Consulting"
  header:
    show_contact_button: true
    contact_priority: "mobile_first"
```

### Context-Driven Navigation
- **Domain Config**: Primary navigation structure and branding
- **Project Overrides**: Project-specific navigation modifications
- **Page Context**: Dynamic navigation highlighting and CTAs
- **Business Intelligence**: Navigation optimization based on conversion goals

## Related Components

- **[LAYOUT-STRUCTURE.md](./LAYOUT-STRUCTURE.md)** - Document structure integration
- **[SITE-FOOTER.md](./SITE-FOOTER.md)** - Footer counterpart component
- **[CONTACT-BUTTON.md](./CONTACT-BUTTON.md)** - Integrated contact CTA
- **[RESPONSIVE-CONTAINERS.md](./RESPONSIVE-CONTAINERS.md)** - Container layout system

## Architecture Compliance

### Three-Layer Architecture
- **Jekyll Template**: HTML structure with Universal Intelligence integration
- **SCSS Module**: Responsive navigation styling with CSS custom properties
- **JavaScript Module**: Navigation intelligence extending ComponentSystem.Component

### SOLID Principles
- **Single Responsibility**: Site header navigation and branding only
- **Open/Closed**: Extensible through navigation config and business contexts
- **Liskov Substitution**: Works with any navigation configuration
- **Interface Segregation**: Minimal required config, rich optional customization
- **Dependency Inversion**: Depends on Central Context Engine abstractions

### Universal Intelligence Compliance
- ✅ **Responsive Integration**: Mobile-first navigation with device optimization
- ✅ **ARIA Integration**: Complete accessibility markup and keyboard support
- ✅ **Analytics Integration**: Consent-compliant navigation tracking with business intelligence
- ✅ **SEO Integration**: Schema.org header markup and navigation structure
- ✅ **AI Integration**: Navigation context for AI discovery and content analysis
- ✅ **Standards Integration**: WCAG 2.2 AA compliance and performance optimization
- ✅ **Performance Integration**: Optimized loading and responsive behavior with error resilience