# JavaScript Module Architecture Examples

This document shows the implementation of the JavaScript module architecture defined in [ARCHITECTURE.md](./ARCHITECTURE.md).

## Module Structure

```
assets/js/
├── components/              # Base component behaviors (pure functionality)
│   ├── button.js           # Button base class
│   ├── contact-button.js   # Contact button specialization
│   ├── form.js            # Form validation and submission
│   └── navigation.js      # Navigation behaviors
├── theme-systems/          # Theme-specific visual behaviors
│   ├── glassmorphism.js   # Glass theme behaviors
│   ├── retrofuturism.js   # Retro theme behaviors
│   └── index.js          # Theme system loader
├── typography/            # Typography-specific behaviors
│   ├── inter.js          # Inter font behaviors
│   └── jetbrains.js      # JetBrains font behaviors
└── core/                  # Core system modules
    ├── component-system.js    # Component discovery and initialization
    ├── context-consumer.js    # Base class for Context Engine consumption
    ├── module-loader.js       # Module loading orchestration
    ├── theme-system.js        # Theme enhancement registry
    └── performance-utils.js   # Performance utilities
```

## Core Modules

### Context Consumer Base Class

```javascript
// core/context-consumer.js
// Base class for all components to consume pre-calculated intelligence
// from the Context Engine. Components NEVER calculate business logic -
// all intelligence comes from the three-layer architecture:
// 1. Detection Layer (CONTEXT-DETECTION.md) - HOW things are detected
// 2. Engine Layer (CONTEXT-ENGINE.md) - Orchestration and calculation
// 3. Components (this layer) - Pure consumption and transformation

export class ContextConsumer {
  constructor(element, universalContext) {
    this.element = element;
    this.context = universalContext || window.universalContext;
    
    if (!this.context) {
      console.warn('Universal context not available, using fallback values');
      this.context = this.getFallbackContext();
    }
    
    this.applyContextIntelligence();
  }
  
  applyContextIntelligence() {
    // Apply all context dimensions
    this.applyBusinessContext();
    this.applyBehaviorContext();
    this.applySemanticContext();
    this.applyTechnicalContext();
  }
  
  applyBusinessContext() {
    const { business } = this.context;
    if (!business) return;
    
    // Apply pre-calculated business values as data attributes
    this.element.dataset.leadScore = business.leadQualityScore || '0.5';
    this.element.dataset.journeyStage = business.customerJourneyStage || 'awareness';
    this.element.dataset.conversionProbability = business.conversionProbability || '0.3';
    this.element.dataset.expertiseArea = business.expertiseArea || 'general';
    this.element.dataset.projectValue = business.estimatedProjectValue || '0';
  }
  
  applyBehaviorContext() {
    const { behavior } = this.context;
    if (!behavior) return;
    
    // Apply behavioral intelligence
    this.element.dataset.engagementLevel = behavior.engagementLevel || 'low';
    this.element.dataset.interestLevel = behavior.interestLevel || 'browsing';
    this.element.dataset.userIntent = behavior.userIntent || 'exploring';
  }
  
  applySemanticContext() {
    const { semantics } = this.context;
    if (!semantics) return;
    
    // Apply semantic understanding
    this.element.dataset.contentType = semantics.contentType || 'general';
    this.element.dataset.technicalLevel = semantics.technicalLevel || 'intermediate';
    this.element.dataset.audience = semantics.audience || 'general';
  }
  
  applyTechnicalContext() {
    const { technical } = this.context;
    if (!technical) return;
    
    // Apply technical context
    this.element.dataset.consentStatus = technical.consent?.analyticsConsent ? 'granted' : 'denied';
    this.element.dataset.performanceMode = technical.performance?.mode || 'balanced';
  }
  
  getFallbackContext() {
    // Minimal fallback context when Context Engine unavailable
    return {
      business: {
        leadQualityScore: 0.5,
        customerJourneyStage: 'awareness',
        conversionProbability: 0.3
      },
      behavior: {
        engagementLevel: 'low',
        interestLevel: 'browsing'
      },
      semantics: {
        contentType: 'general',
        technicalLevel: 'intermediate'
      },
      technical: {
        consent: { analyticsConsent: false }
      }
    };
  }
}
```

### Component System

```javascript
// core/component-system.js
import { ContextConsumer } from './context-consumer.js';

export class ComponentSystem {
  static components = new Map();
  static instances = new WeakMap();
  
  static register(ComponentClass) {
    if (!ComponentClass.selector) {
      throw new Error(`Component ${ComponentClass.name} must define static selector property`);
    }
    this.components.set(ComponentClass.selector, ComponentClass);
  }
  
  static async init() {
    // Wait for Context Engine
    await this.waitForContext();
    
    // Initialize all registered components
    this.components.forEach((ComponentClass, selector) => {
      this.initializeComponent(ComponentClass, selector);
    });
    
    // Watch for dynamic content
    this.observeDynamicContent();
  }
  
  static initializeComponent(ComponentClass, selector) {
    document.querySelectorAll(selector).forEach(element => {
      // Skip if already initialized
      if (this.instances.has(element)) return;
      
      // Create instance with universal context
      const instance = new ComponentClass(element, window.universalContext);
      this.instances.set(element, instance);
    });
  }
  
  static async waitForContext() {
    // Wait for Context Engine to be ready
    const maxWait = 5000; // 5 seconds
    const start = Date.now();
    
    while (!window.universalContext && Date.now() - start < maxWait) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    if (!window.universalContext) {
      console.warn('Context Engine not ready, components using fallback context');
    }
  }
  
  static observeDynamicContent() {
    // Watch for dynamically added elements
    const observer = new MutationObserver(mutations => {
      this.components.forEach((ComponentClass, selector) => {
        mutations.forEach(mutation => {
          mutation.addedNodes.forEach(node => {
            if (node.nodeType === 1) { // Element node
              if (node.matches(selector)) {
                this.initializeComponent(ComponentClass, selector);
              }
              // Check descendants
              node.querySelectorAll(selector).forEach(element => {
                if (!this.instances.has(element)) {
                  const instance = new ComponentClass(element, window.universalContext);
                  this.instances.set(element, instance);
                }
              });
            }
          });
        });
      });
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
}

// Base Component class extending ContextConsumer
export class Component extends ContextConsumer {
  constructor(element, universalContext) {
    super(element, universalContext);
    this.initialized = false;
  }
  
  // Lifecycle methods
  init() {
    // Override in subclasses
  }
  
  destroy() {
    // Override in subclasses for cleanup
  }
}
```

## Component Implementations

### Base Button Component

```javascript
// components/button.js
import { Component } from '../core/component-system.js';
import { PerformanceUtils } from '../core/performance-utils.js';

export class Button extends Component {
  static selector = '[data-component="button"]';
  
  constructor(element, universalContext) {
    super(element, universalContext);
    this.init();
  }
  
  init() {
    this.setupEventHandlers();
    this.enhanceAccessibility();
    this.manageStates();
    this.initialized = true;
  }
  
  setupEventHandlers() {
    // Debounced click handler
    this.handleClick = PerformanceUtils.debounce(
      PerformanceUtils.withErrorBoundary(this.onClick.bind(this)),
      300
    );
    
    this.element.addEventListener('click', this.handleClick);
  }
  
  onClick(event) {
    // Track interaction if consent granted
    if (this.context.technical?.consent?.analyticsConsent) {
      this.trackInteraction();
    }
    
    // Announce action for accessibility
    if (this.element.dataset.announces) {
      this.announceAction();
    }
  }
  
  trackInteraction() {
    // Use pre-calculated values from Context Engine
    // NO business logic here - all values come from the Detection Layer
    // via the Context Engine. This component is a pure consumer.
    const trackingData = {
      event_category: 'button_interaction',
      event_action: this.element.dataset.trackAction || 'click',
      event_label: this.element.textContent.trim(),
      
      // Business context from Context Engine (pre-calculated by Detection Layer)
      lead_quality_score: this.context.business.leadQualityScore,
      customer_journey_stage: this.context.business.customerJourneyStage,
      conversion_probability: this.context.business.conversionProbability,
      expertise_area: this.context.business.expertiseArea,
      estimated_project_value: this.context.business.estimatedProjectValue,
      
      // Behavioral context
      engagement_level: this.context.behavior.engagementLevel,
      interest_level: this.context.behavior.interestLevel,
      user_intent: this.context.behavior.userIntent,
      
      // Semantic context
      content_type: this.context.semantics.contentType,
      technical_level: this.context.semantics.technicalLevel,
      audience: this.context.semantics.audience
    };
    
    // Send to analytics
    if (window.analyticsInstance) {
      window.analyticsInstance.trackEvent('button_click', trackingData);
    }
  }
  
  enhanceAccessibility() {
    // Ensure button role
    if (!this.element.hasAttribute('role')) {
      this.element.setAttribute('role', 'button');
    }
    
    // Add keyboard support for non-button elements
    if (this.element.tagName !== 'BUTTON') {
      this.element.setAttribute('tabindex', '0');
      this.element.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.element.click();
        }
      });
    }
  }
  
  manageStates() {
    // Visual feedback
    this.element.addEventListener('mousedown', () => {
      this.element.classList.add('is-pressed');
    });
    
    this.element.addEventListener('mouseup', () => {
      this.element.classList.remove('is-pressed');
    });
    
    this.element.addEventListener('mouseleave', () => {
      this.element.classList.remove('is-pressed');
    });
  }
  
  announceAction() {
    // Create live region announcement
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.classList.add('sr-only');
    announcement.textContent = this.element.dataset.announces;
    
    document.body.appendChild(announcement);
    
    // Remove after announcement
    setTimeout(() => {
      announcement.remove();
    }, 1000);
  }
  
  destroy() {
    this.element.removeEventListener('click', this.handleClick);
  }
}
```

### Contact Button Specialization

```javascript
// components/contact-button.js
import { Button } from './button.js';

export class ContactButton extends Button {
  static selector = '[data-component="contact-button"]';
  
  constructor(element, universalContext) {
    super(element, universalContext);
    this.setupContactTracking();
  }
  
  setupContactTracking() {
    // Enhanced tracking for contact buttons
    this.originalTrackInteraction = this.trackInteraction.bind(this);
    
    this.trackInteraction = () => {
      // Call base tracking
      this.originalTrackInteraction();
      
      // Additional contact-specific tracking
      if (window.analyticsInstance && this.context.technical?.consent?.analyticsConsent) {
        window.analyticsInstance.trackEvent('consultation_interest', {
          event_category: 'lead_generation',
          event_action: 'contact_button_click',
          consultation_vertical: this.context.business.consultingVertical || 'technical_expertise',
          lead_source: this.element.dataset.leadSource || 'organic',
          
          // Enhanced business context for lead generation
          lead_quality_score: this.context.business.leadQualityScore,
          consultation_readiness: this.context.business.consultationReadiness,
          expertise_match: this.context.business.expertiseMatch,
          urgency_level: this.context.business.urgencyLevel || 'standard'
        });
        
        // Facebook Pixel tracking if available
        if (window.fbq && typeof window.fbq === 'function') {
          try {
            window.fbq('track', 'Lead', {
              content_name: 'consultation_inquiry',
              value: this.context.business.estimatedProjectValue || 500,
              currency: 'USD',
              lead_quality: this.context.business.leadQualityScore
            });
          } catch (error) {
            console.error('Facebook Pixel tracking failed:', error);
          }
        }
      }
    };
  }
}
```

## Theme Enhancement Modules

### Glassmorphism Theme

```javascript
// theme-systems/glassmorphism.js
import { ThemeSystem } from '../core/theme-system.js';
import { PerformanceUtils } from '../core/performance-utils.js';

export class GlassmorphismTheme {
  constructor() {
    this.initEffects();
    this.registerEnhancements();
  }
  
  initEffects() {
    this.initParallaxBlur();
    this.initRefractionEffects();
    this.initGlassPhysics();
  }
  
  initParallaxBlur() {
    // Throttled scroll handler for performance
    const handleScroll = PerformanceUtils.throttleRAF(() => {
      const scrollY = window.scrollY;
      const elements = document.querySelectorAll('[data-glass-parallax]');
      
      elements.forEach(el => {
        const speed = parseFloat(el.dataset.glassParallax) || 0.5;
        const blur = Math.min(20, scrollY * speed * 0.01);
        el.style.setProperty('--dynamic-blur', `${blur}px`);
      });
    });
    
    window.addEventListener('scroll', handleScroll, { passive: true });
  }
  
  initRefractionEffects() {
    // Mouse movement creates refraction
    const handleMouseMove = PerformanceUtils.throttleRAF((e) => {
      const cards = document.querySelectorAll('.card[data-glass-refraction]');
      
      cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        
        // Only update if mouse is near card
        if (x >= -0.2 && x <= 1.2 && y >= -0.2 && y <= 1.2) {
          card.style.setProperty('--refraction-x', x);
          card.style.setProperty('--refraction-y', y);
        }
      });
    });
    
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
  }
  
  initGlassPhysics() {
    // Intersection observer for glass fade-in
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('glass-visible');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '50px'
    });
    
    // Observe all glass elements
    document.querySelectorAll('[data-glass-physics]').forEach(el => {
      observer.observe(el);
    });
  }
  
  registerEnhancements() {
    // Register button enhancements
    ThemeSystem.enhance('button', {
      glassmorphism: this.enhanceButton.bind(this)
    });
    
    // Register card enhancements
    ThemeSystem.enhance('card', {
      glassmorphism: this.enhanceCard.bind(this)
    });
  }
  
  enhanceButton(element) {
    // Add glass-specific behaviors to buttons
    element.addEventListener('mouseenter', () => {
      this.createRipple(element);
    });
    
    element.addEventListener('focus', () => {
      element.classList.add('glass-focus');
    });
    
    element.addEventListener('blur', () => {
      element.classList.remove('glass-focus');
    });
  }
  
  enhanceCard(element) {
    // Add glass-specific behaviors to cards
    element.dataset.glassRefraction = 'true';
    element.dataset.glassPhysics = 'true';
  }
  
  createRipple(element) {
    const ripple = document.createElement('span');
    ripple.classList.add('glass-ripple');
    element.appendChild(ripple);
    
    // Remove ripple after animation
    ripple.addEventListener('animationend', () => {
      ripple.remove();
    });
  }
}

// Register theme
ThemeSystem.register('glassmorphism', GlassmorphismTheme);
```

## Performance Utilities

```javascript
// core/performance-utils.js
export class PerformanceUtils {
  /**
   * Debounce function calls
   */
  static debounce(fn, delay = 300) {
    let timeoutId;
    return function(...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn.apply(this, args), delay);
    };
  }
  
  /**
   * Throttle using requestAnimationFrame
   */
  static throttleRAF(fn) {
    let rafId;
    return function(...args) {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        fn.apply(this, args);
        rafId = null;
      });
    };
  }
  
  /**
   * Throttle with time limit
   */
  static throttle(fn, limit = 100) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        fn.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
  
  /**
   * Error boundary wrapper
   */
  static withErrorBoundary(fn, fallback) {
    return function(...args) {
      try {
        return fn.apply(this, args);
      } catch (error) {
        console.error('Component error:', error);
        
        // Track error if analytics available
        if (window.analyticsInstance) {
          window.analyticsInstance.trackError('component_error', {
            error: error.message,
            stack: error.stack,
            component: this.constructor?.name || 'Unknown'
          });
        }
        
        // Execute fallback if provided
        if (fallback) {
          return fallback.apply(this, args);
        }
      }
    };
  }
  
  /**
   * Lazy load with intersection observer
   */
  static lazyLoad(selector, callback, options = {}) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          callback(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: options.rootMargin || '50px',
      threshold: options.threshold || 0.01
    });
    
    document.querySelectorAll(selector).forEach(el => {
      observer.observe(el);
    });
    
    return observer;
  }
  
  /**
   * Memory-efficient event delegation
   */
  static delegate(parent, eventType, selector, handler) {
    parent.addEventListener(eventType, function(event) {
      const targetElement = event.target.closest(selector);
      
      if (targetElement && parent.contains(targetElement)) {
        handler.call(targetElement, event);
      }
    });
  }
}
```

## Module Initialization

```javascript
// main.js - Application entry point
import { ModuleLoader } from './core/module-loader.js';
import { ComponentSystem } from './core/component-system.js';
import { ThemeSystem } from './core/theme-system.js';

// Import components
import { Button } from './components/button.js';
import { ContactButton } from './components/contact-button.js';

// Import themes
import './theme-systems/glassmorphism.js';
import './theme-systems/retrofuturism.js';

// Register components
ComponentSystem.register(Button);
ComponentSystem.register(ContactButton);

// Initialize application
async function initApp() {
  try {
    // Load all modules
    await ModuleLoader.loadModules();
    
    // Initialize components
    await ComponentSystem.init();
    
    // Apply theme enhancements
    const currentTheme = window.site?.theme?.system || 'glassmorphism';
    ThemeSystem.applyEnhancements(currentTheme);
    
    console.log('Application initialized successfully');
    
  } catch (error) {
    console.error('Application initialization failed:', error);
  }
}

// Start when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
```

## Key Benefits

1. **Clean Separation**: Business logic in Detection Layer ([CONTEXT-DETECTION.md](./CONTEXT-DETECTION.md)), orchestration in Context Engine ([CONTEXT-ENGINE.md](./CONTEXT-ENGINE.md)), presentation in components
2. **Three-Layer Architecture**: Detection → Engine → Components (pure transformation)
3. **Modular Loading**: Components, themes, and typography load independently
4. **Performance Optimized**: Debouncing, throttling, error boundaries built-in
5. **Context-Driven**: All components consume pre-calculated intelligence
6. **Theme Flexibility**: Themes enhance without breaking base functionality
7. **Error Resilient**: Comprehensive error handling throughout
8. **Memory Efficient**: Weak maps for instance tracking, proper cleanup

This modular architecture ensures maintainable, performant, and intelligent JavaScript that follows the same layered principles as the CSS architecture. Components are pure consumers of intelligence - they never calculate or detect anything themselves.
