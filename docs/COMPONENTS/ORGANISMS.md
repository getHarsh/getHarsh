# Atomic Components - Organisms

Organisms are relatively complex UI components composed of groups of molecules and/or atoms working together. They form distinct sections of an interface.

## Component Specifications

For the complete list of all 18 organisms with their variants, inheritance paths, and implementation status, see:

**[COMPONENT-TABLE.md → Organisms Section](../COMPONENT-TABLE.md#organisms-18-components)**

This single source of truth includes:

- Component names and ALL variants from items.md (e.g., 5 navigation variants)
- Complete inheritance paths showing Context → Core Systems → Theme → Organisms
- Links to individual organism specifications
- Context integration details showing repository awareness
- Current implementation status (Active/Planned)

## Document Structure

In addition to the 18 content organisms, we also maintain:

- **[LAYOUT-STRUCTURE.md](./ORGANISMS/LAYOUT-STRUCTURE.md)** - Complete HTML5 document wrapper with Context Engine integration

## Organism Principles

1. **Complete Sections**: Self-contained, meaningful page sections
2. **Molecule Composition**: Built from multiple molecules/atoms
3. **Business Logic**: Full Context Engine integration
4. **Cross-Template**: Reusable across different page templates
5. **Accessibility Landmarks**: Proper ARIA regions

## Navigation Organisms

### `organisms/header.html`

Complete site header with navigation:

```liquid
<!-- organisms/header.html -->
{%- comment -%}
  Parameters:
  - logo: Logo configuration
  - navigation: Primary navigation items
  - search: Boolean - show search
  - user_menu: User menu items
  - cta: Call-to-action button config
  - variant: default, minimal, full
  - class: Additional CSS classes
{%- endcomment -%}

{% include components/context-engine.html %}

<header 
  class="organism-header organism-header--{{ include.variant | default: 'default' }}{% if include.class %} {{ include.class }}{% endif %}"
  role="banner"
  data-component="organism-header"
  data-business-context="{{ universal_context.business.headerContext }}"
  data-repository-context="{{ site.repository_context }}">
  
  <div class="organism-header__container">
    <div class="organism-header__brand">
      {% include molecules/logo.html 
         link=include.logo.link
         image=include.logo.image
         text=include.logo.text %}
    </div>
    
    <nav 
      class="organism-header__nav"
      role="navigation"
      aria-label="Primary navigation">
      <ul class="organism-header__nav-list">
        {% for item in include.navigation %}
          <li class="organism-header__nav-item">
            {% include molecules/nav-link.html 
               href=item.href
               text=item.text
               icon=item.icon
               badge=item.badge
               active=item.active %}
            
            {% if item.submenu %}
              <ul class="organism-header__submenu" role="menu">
                {% for subitem in item.submenu %}
                  <li role="menuitem">
                    {% include molecules/nav-link.html 
                       href=subitem.href
                       text=subitem.text
                       icon=subitem.icon %}
                  </li>
                {% endfor %}
              </ul>
            {% endif %}
          </li>
        {% endfor %}
      </ul>
    </nav>
    
    <div class="organism-header__actions">
      {% if include.search %}
        {% include molecules/search-box.html 
           placeholder="Search..."
           size="sm" %}
      {% endif %}
      
      {% include molecules/theme-toggle.html %}
      
      {% if include.user_menu %}
        {% include molecules/dropdown-menu.html 
           items=include.user_menu
           trigger_icon="user"
           align="right" %}
      {% endif %}
      
      {% if include.cta %}
        {% include molecules/button.html 
           text=include.cta.text
           href=include.cta.href
           variant="primary"
           size="sm"
           data_attributes=include.cta.data_attributes %}
      {% endif %}
      
      {% if site.repository_context == "domain" and site.cross_repository_urls %}
        {% include molecules/cross-repo-nav.html 
           urls=site.cross_repository_urls %}
      {% endif %}
    </div>
    
    {% include molecules/mobile-menu-toggle.html %}
  </div>
  
  {% include organisms/mobile-menu.html 
     navigation=include.navigation
     search=include.search
     cta=include.cta %}
</header>
```

### `organisms/footer.html`

Site footer with multiple sections:

```liquid
<!-- organisms/footer.html -->
{%- comment -%}
  Parameters:
  - sections: Array of footer sections
  - social: Social media links
  - newsletter: Newsletter signup config
  - copyright: Copyright text
  - class: Additional CSS classes
{%- endcomment -%}

{% include components/context-engine.html %}

<footer 
  class="organism-footer{% if include.class %} {{ include.class }}{% endif %}"
  role="contentinfo"
  data-component="organism-footer"
  data-conversion-context="{{ universal_context.business.footerConversionContext }}">
  
  {% if include.newsletter %}
    <section 
      class="organism-footer__newsletter"
      aria-labelledby="newsletter-heading">
      <h2 id="newsletter-heading" class="organism-footer__newsletter-title">
        {{ include.newsletter.title | default: "Stay Updated" }}
      </h2>
      
      {% include molecules/newsletter-form.html 
         description=include.newsletter.description
         button_text=include.newsletter.button_text %}
    </section>
  {% endif %}
  
  <div class="organism-footer__main">
    <div class="organism-footer__sections">
      {% for section in include.sections %}
        <section 
          class="organism-footer__section"
          aria-labelledby="footer-section-{{ forloop.index }}">
          <h3 
            id="footer-section-{{ forloop.index }}"
            class="organism-footer__section-title">
            {{ section.title }}
          </h3>
          
          <ul class="organism-footer__links">
            {% for link in section.links %}
              <li>
                {% include atoms/link.html 
                   href=link.href
                   text=link.text
                   external=link.external %}
              </li>
            {% endfor %}
          </ul>
        </section>
      {% endfor %}
      
      {% if universal_context.business.showContactInFooter %}
        <section 
          class="organism-footer__section organism-footer__section--contact"
          aria-labelledby="footer-contact">
          <h3 id="footer-contact" class="organism-footer__section-title">
            Get in Touch
          </h3>
          
          {% include molecules/contact-info.html 
             email=site.contact.email
             phone=site.contact.phone
             address=site.contact.address %}
          
          {% include molecules/button.html 
             text="Book Consultation"
             href="/contact"
             variant="secondary"
             size="sm"
             icon="calendar"
             data_attributes={
               "track-click": "footer_consultation_cta",
               "conversion-value": universal_context.business.footerCtaValue
             } %}
        </section>
      {% endif %}
    </div>
    
    {% if include.social %}
      <div class="organism-footer__social">
        <h3 class="sr-only">Follow us on social media</h3>
        {% include molecules/social-links.html 
           links=include.social
           variant="footer" %}
      </div>
    {% endif %}
  </div>
  
  <div class="organism-footer__bottom">
    <div class="organism-footer__copyright">
      {% include atoms/text.html 
         content=include.copyright | default: site.copyright
         variant="small" %}
    </div>
    
    <nav 
      class="organism-footer__legal"
      aria-label="Legal">
      {% include molecules/nav-link.html 
         href="/privacy"
         text="Privacy Policy" %}
      {% include molecules/nav-link.html 
         href="/terms"
         text="Terms of Service" %}
      {% include molecules/nav-link.html 
         href="/cookies"
         text="Cookie Policy" %}
    </nav>
  </div>
</footer>
```

## Form Organisms

### `organisms/contact-form.html`

Complete contact form with sections:

```liquid
<!-- organisms/contact-form.html -->
{%- comment -%}
  Parameters:
  - action: Form action URL
  - method: Form method (default: POST)
  - sections: Form sections configuration
  - success_message: Success message
  - error_message: Error message
  - class: Additional CSS classes
{%- endcomment -%}

{% include components/context-engine.html %}

<form 
  action="{{ include.action | default: '/contact' }}"
  method="{{ include.method | default: 'POST' }}"
  class="organism-form organism-form--contact{% if include.class %} {{ include.class }}{% endif %}"
  novalidate
  data-component="organism-contact-form"
  data-business-model="lead_generation"
  data-lead-quality="{{ universal_context.business.formLeadQuality }}"
  data-conversion-value="{{ universal_context.business.estimatedProjectValue }}">
  
  {% if include.error_message %}
    {% include molecules/alert.html 
       content=include.error_message
       variant="error"
       dismissible=true %}
  {% endif %}
  
  {% if include.success_message %}
    {% include molecules/alert.html 
       content=include.success_message
       variant="success" %}
  {% else %}
    <div class="organism-form__header">
      {% include atoms/heading.html 
         text="Let's Discuss Your Project"
         level=2 %}
      
      {% include atoms/text.html 
         content="Tell us about your needs and we'll get back to you within 24 hours."
         element="p"
         class="organism-form__description" %}
    </div>
    
    <fieldset class="organism-form__section">
      <legend class="organism-form__section-title">Contact Information</legend>
      
      <div class="organism-form__row">
        {% include molecules/field.html 
           type="text"
           id="first_name"
           name="first_name"
           label="First Name"
           required=true
           autocomplete="given-name" %}
        
        {% include molecules/field.html 
           type="text"
           id="last_name"
           name="last_name"
           label="Last Name"
           required=true
           autocomplete="family-name" %}
      </div>
      
      {% include molecules/field.html 
         type="email"
         id="email"
         name="email"
         label="Email Address"
         required=true
         autocomplete="email"
         help="We'll use this to respond to your inquiry" %}
      
      {% include molecules/field.html 
         type="tel"
         id="phone"
         name="phone"
         label="Phone Number"
         autocomplete="tel"
         help="Optional - for urgent inquiries" %}
      
      {% include molecules/field.html 
         type="text"
         id="company"
         name="company"
         label="Company"
         autocomplete="organization" %}
    </fieldset>
    
    <fieldset class="organism-form__section">
      <legend class="organism-form__section-title">Project Details</legend>
      
      {% include molecules/select-field.html 
         id="project_type"
         name="project_type"
         label="Project Type"
         options=site.data.project_types
         required=true %}
      
      {% include molecules/select-field.html 
         id="budget"
         name="budget"
         label="Estimated Budget"
         options=site.data.budget_ranges
         help="This helps us tailor our proposal" %}
      
      {% include molecules/field.html 
         type="textarea"
         id="message"
         name="message"
         label="Project Description"
         rows=5
         required=true
         help="Tell us about your project goals and requirements" %}
      
      {% include molecules/checkbox-group.html 
         name="services"
         label="Services Needed"
         options=site.data.services
         help="Select all that apply" %}
    </fieldset>
    
    <fieldset class="organism-form__section">
      <legend class="organism-form__section-title">Additional Information</legend>
      
      {% include molecules/radio-group.html 
         name="timeline"
         label="Project Timeline"
         options=site.data.timeline_options
         required=true %}
      
      {% include molecules/field.html 
         type="text"
         id="referral"
         name="referral"
         label="How did you hear about us?"
         help="Optional" %}
    </fieldset>
    
    <div class="organism-form__consent">
      {% include molecules/checkbox.html 
         id="privacy_consent"
         name="privacy_consent"
         label="I agree to the privacy policy and terms of service"
         required=true %}
      
      {% include molecules/checkbox.html 
         id="marketing_consent"
         name="marketing_consent"
         label="I'd like to receive occasional updates about your services" %}
    </div>
    
    <div class="organism-form__actions">
      {% include molecules/button.html 
         type="submit"
         text="Send Inquiry"
         variant="primary"
         size="lg"
         icon="send"
         full_width=true %}
      
      {% include atoms/text.html 
         content="We typically respond within 24 hours"
         variant="small"
         class="organism-form__note" %}
    </div>
  {% endif %}
</form>
```

## Content Organisms

### `organisms/hero.html`

Hero section with multiple variants:

```liquid
<!-- organisms/hero.html -->
{%- comment -%}
  Parameters:
  - title (required): Hero title
  - subtitle: Hero subtitle
  - description: Hero description
  - cta: Primary CTA button config
  - secondary_cta: Secondary CTA config
  - image: Hero image config
  - variant: default, centered, split, video
  - class: Additional CSS classes
{%- endcomment -%}

{% include components/context-engine.html %}

<section 
  class="organism-hero organism-hero--{{ include.variant | default: 'default' }}{% if include.class %} {{ include.class }}{% endif %}"
  data-component="organism-hero"
  data-conversion-impact="{{ universal_context.business.heroConversionImpact }}"
  aria-labelledby="hero-title">
  
  <div class="organism-hero__container">
    <div class="organism-hero__content">
      {% include atoms/heading.html 
         text=include.title
         level=1
         id="hero-title"
         class="organism-hero__title" %}
      
      {% if include.subtitle %}
        {% include atoms/heading.html 
           text=include.subtitle
           level=2
           class="organism-hero__subtitle" %}
      {% endif %}
      
      {% if include.description %}
        {% include atoms/text.html 
           content=include.description
           element="p"
           variant="large"
           class="organism-hero__description" %}
      {% endif %}
      
      {% if include.cta or include.secondary_cta %}
        <div class="organism-hero__actions">
          {% if include.cta %}
            {% include molecules/button.html 
               text=include.cta.text
               href=include.cta.href
               variant="primary"
               size="lg"
               icon=include.cta.icon
               data_attributes={
                 "track-click": "hero_primary_cta",
                 "conversion-value": universal_context.business.heroPrimaryCTAValue
               } %}
          {% endif %}
          
          {% if include.secondary_cta %}
            {% include molecules/button.html 
               text=include.secondary_cta.text
               href=include.secondary_cta.href
               variant="secondary"
               size="lg"
               icon=include.secondary_cta.icon
               data_attributes={
                 "track-click": "hero_secondary_cta"
               } %}
          {% endif %}
        </div>
      {% endif %}
      
      {% if include.features %}
        <ul class="organism-hero__features">
          {% for feature in include.features %}
            <li class="organism-hero__feature">
              {% include atoms/icon.html 
                 name="check"
                 size="sm"
                 class="organism-hero__feature-icon" %}
              {% include atoms/text.html 
                 content=feature
                 element="span" %}
            </li>
          {% endfor %}
        </ul>
      {% endif %}
    </div>
    
    {% if include.image %}
      <div class="organism-hero__media">
        {% include atoms/image.html 
           src=include.image.src
           alt=include.image.alt
           loading="eager"
           sizes="(min-width: 768px) 50vw, 100vw"
           class="organism-hero__image" %}
      </div>
    {% endif %}
    
    {% if include.variant == 'video' and include.video %}
      <div class="organism-hero__video">
        {% include molecules/video-player.html 
           src=include.video.src
           poster=include.video.poster
           autoplay=true
           muted=true
           loop=true %}
      </div>
    {% endif %}
  </div>
  
  {% if include.scroll_indicator %}
    {% include molecules/scroll-indicator.html %}
  {% endif %}
</section>
```

### `organisms/feature-grid.html`

Grid of feature cards:

```liquid
<!-- organisms/feature-grid.html -->
{%- comment -%}
  Parameters:
  - title: Section title
  - subtitle: Section subtitle
  - features (required): Array of feature objects
  - columns: 2, 3 (default), 4
  - variant: cards, minimal, icons
  - class: Additional CSS classes
{%- endcomment -%}

{% include components/context-engine.html %}

<section 
  class="organism-feature-grid organism-feature-grid--{{ include.variant | default: 'cards' }}{% if include.class %} {{ include.class }}{% endif %}"
  data-component="organism-feature-grid"
  data-content-value="{{ universal_context.business.featureGridValue }}"
  aria-labelledby="feature-grid-title">
  
  {% if include.title %}
    <header class="organism-feature-grid__header">
      {% include atoms/heading.html 
         text=include.title
         level=2
         id="feature-grid-title"
         class="organism-feature-grid__title" %}
      
      {% if include.subtitle %}
        {% include atoms/text.html 
           content=include.subtitle
           element="p"
           variant="large"
           class="organism-feature-grid__subtitle" %}
      {% endif %}
    </header>
  {% endif %}
  
  <div class="organism-feature-grid__grid organism-feature-grid__grid--{{ include.columns | default: 3 }}">
    {% for feature in include.features %}
      <article 
        class="organism-feature-grid__item"
        data-feature-type="{{ feature.type }}"
        data-feature-value="{{ feature.value }}">
        
        {% case include.variant %}
          {% when 'minimal' %}
            {% include molecules/feature-minimal.html 
               icon=feature.icon
               title=feature.title
               description=feature.description %}
          
          {% when 'icons' %}
            {% include molecules/feature-icon.html 
               icon=feature.icon
               title=feature.title
               description=feature.description
               link=feature.link %}
          
          {% else %}
            {% include molecules/card.html 
               title=feature.title
               content=feature.description
               image=feature.image
               link=feature.link
               variant="featured" %}
        {% endcase %}
      </article>
    {% endfor %}
  </div>
  
  {% if include.cta %}
    <footer class="organism-feature-grid__footer">
      {% include molecules/button.html 
         text=include.cta.text
         href=include.cta.href
         variant="primary"
         icon="arrow-right"
         icon_position="right" %}
    </footer>
  {% endif %}
</section>
```

### `organisms/testimonials.html`

Testimonial showcase:

```liquid
<!-- organisms/testimonials.html -->
{%- comment -%}
  Parameters:
  - title: Section title
  - testimonials (required): Array of testimonial objects
  - variant: cards, carousel, quotes
  - columns: 1, 2, 3
  - class: Additional CSS classes
{%- endcomment -%}

{% include components/context-engine.html %}

<section 
  class="organism-testimonials organism-testimonials--{{ include.variant | default: 'cards' }}{% if include.class %} {{ include.class }}{% endif %}"
  data-component="organism-testimonials"
  data-social-proof-value="{{ universal_context.business.socialProofValue }}"
  aria-labelledby="testimonials-title">
  
  {% if include.title %}
    <header class="organism-testimonials__header">
      {% include atoms/heading.html 
         text=include.title
         level=2
         id="testimonials-title"
         class="organism-testimonials__title" %}
    </header>
  {% endif %}
  
  <div class="organism-testimonials__content organism-testimonials__content--{{ include.columns | default: 2 }}">
    {% for testimonial in include.testimonials %}
      <blockquote 
        class="organism-testimonials__item"
        data-rating="{{ testimonial.rating }}">
        
        {% if testimonial.rating %}
          {% include molecules/rating.html 
             value=testimonial.rating
             max=5 %}
        {% endif %}
        
        {% include atoms/text.html 
           content=testimonial.quote
           element="p"
           class="organism-testimonials__quote" %}
        
        <footer class="organism-testimonials__author">
          {% if testimonial.image %}
            {% include atoms/image.html 
               src=testimonial.image
               alt=testimonial.author
               loading="lazy"
               class="organism-testimonials__author-image" %}
          {% endif %}
          
          <div class="organism-testimonials__author-info">
            {% include atoms/text.html 
               content=testimonial.author
               element="cite"
               class="organism-testimonials__author-name" %}
            
            {% if testimonial.role %}
              {% include atoms/text.html 
                 content=testimonial.role
                 variant="small"
                 class="organism-testimonials__author-role" %}
            {% endif %}
            
            {% if testimonial.company %}
              {% include atoms/text.html 
                 content=testimonial.company
                 variant="small"
                 class="organism-testimonials__author-company" %}
            {% endif %}
          </div>
        </footer>
      </blockquote>
    {% endfor %}
  </div>
  
  {% if include.variant == 'carousel' %}
    {% include molecules/carousel-controls.html %}
  {% endif %}
</section>
```

## Utility Organisms

### `organisms/consent-banner.html`

GDPR consent banner:

```liquid
<!-- organisms/consent-banner.html -->
{%- comment -%}
  Parameters:
  - title: Banner title
  - description: Consent description
  - settings_link: Link to cookie settings
  - privacy_link: Link to privacy policy
  - class: Additional CSS classes
{%- endcomment -%}

{% include components/context-engine.html %}

{% if universal_context.technical.consent.required %}
<aside 
  class="organism-consent-banner{% if include.class %} {{ include.class }}{% endif %}"
  role="dialog"
  aria-labelledby="consent-title"
  aria-describedby="consent-description"
  data-component="organism-consent-banner"
  data-consent-required="true"
  hidden>
  
  <div class="organism-consent-banner__container">
    <div class="organism-consent-banner__content">
      {% include atoms/heading.html 
         text=include.title | default: "Cookie Consent"
         level=3
         id="consent-title"
         class="organism-consent-banner__title" %}
      
      {% include atoms/text.html 
         content=include.description | default: "We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies."
         element="p"
         id="consent-description"
         class="organism-consent-banner__description" %}
      
      <div class="organism-consent-banner__links">
        {% include atoms/link.html 
           href=include.privacy_link | default: "/privacy"
           text="Privacy Policy" %}
        
        {% include atoms/link.html 
           href=include.settings_link | default: "/cookie-settings"
           text="Cookie Settings" %}
      </div>
    </div>
    
    <div class="organism-consent-banner__actions">
      {% include molecules/button.html 
         text="Accept All"
         variant="primary"
         size="sm"
         data_attributes={
           "consent-action": "accept-all"
         } %}
      
      {% include molecules/button.html 
         text="Essential Only"
         variant="secondary"
         size="sm"
         data_attributes={
           "consent-action": "essential-only"
         } %}
      
      {% include molecules/button.html 
         text="Manage Preferences"
         variant="ghost"
         size="sm"
         data_attributes={
           "consent-action": "manage"
         } %}
    </div>
  </div>
</aside>
{% endif %}
```

### `organisms/modal.html`

Modal dialog container:

```liquid
<!-- organisms/modal.html -->
{%- comment -%}
  Parameters:
  - id (required): Modal ID
  - title: Modal title
  - content: Modal content
  - size: sm, md (default), lg, xl
  - closable: Boolean (default: true)
  - footer: Footer content/actions
  - class: Additional CSS classes
{%- endcomment -%}

<div 
  id="{{ include.id }}"
  class="organism-modal organism-modal--{{ include.size | default: 'md' }}{% if include.class %} {{ include.class }}{% endif %}"
  role="dialog"
  aria-modal="true"
  aria-labelledby="{{ include.id }}-title"
  data-component="organism-modal"
  hidden>
  
  <div class="organism-modal__backdrop" data-modal-close></div>
  
  <div class="organism-modal__container">
    <div class="organism-modal__content">
      {% if include.closable != false %}
        <button 
          type="button"
          class="organism-modal__close"
          aria-label="Close modal"
          data-modal-close>
          {% include atoms/icon.html 
             name="x"
             size="md"
             decorative=true %}
        </button>
      {% endif %}
      
      {% if include.title %}
        <header class="organism-modal__header">
          {% include atoms/heading.html 
             text=include.title
             level=2
             id=include.id | append: "-title"
             class="organism-modal__title" %}
        </header>
      {% endif %}
      
      <div class="organism-modal__body">
        {{ include.content }}
      </div>
      
      {% if include.footer %}
        <footer class="organism-modal__footer">
          {{ include.footer }}
        </footer>
      {% endif %}
    </div>
  </div>
</div>
```

## Organism CSS Architecture

```scss
// _organisms.scss
.organism-{name} {
  // Complete sections
  display: block; // or grid for complex layouts
  position: relative;
  
  // Section spacing
  padding: var(--section-padding);
  margin: var(--section-margin);
  
  // Container for consistent width
  &__container {
    max-width: var(--container-width);
    margin: 0 auto;
    padding: 0 var(--container-padding);
  }
  
  // Internal structure
  &__header {
    // Section headers
  }
  
  &__content {
    // Main content area
  }
  
  &__footer {
    // Section footers
  }
  
  // Responsive behavior
  @include tablet-up {
    // Tablet+ layouts
  }
  
  @include desktop-up {
    // Desktop+ layouts
  }
}
```

## Organism JavaScript Module

```javascript
// organisms/organism-enhancer.js
import { ContextConsumer } from '../core/context-consumer.js';
import { PerformanceUtils } from '../core/performance-utils.js';

export class OrganismEnhancer extends ContextConsumer {
  static enhance(element) {
    const componentType = element.dataset.component;
    const enhancer = this.enhancers[componentType];
    
    if (enhancer) {
      const instance = new enhancer(element, window.universalContext);
      instance.init();
    }
  }
  
  static enhancers = {
    'organism-header': HeaderOrganism,
    'organism-contact-form': ContactFormOrganism,
    'organism-consent-banner': ConsentBannerOrganism
  };
}

// Example: Header Organism
class HeaderOrganism extends ContextConsumer {
  constructor(element, context) {
    super(element, context);
    this.mobileMenu = element.querySelector('.organism-header__mobile-menu');
    this.searchBox = element.querySelector('.molecule-search-box');
  }
  
  init() {
    this.setupMobileMenu();
    this.setupSearch();
    this.trackNavigation();
  }
  
  setupMobileMenu() {
    const toggle = this.element.querySelector('[data-mobile-toggle]');
    if (!toggle || !this.mobileMenu) return;
    
    toggle.addEventListener('click', () => {
      const isOpen = this.mobileMenu.getAttribute('aria-hidden') === 'false';
      this.mobileMenu.setAttribute('aria-hidden', !isOpen);
      toggle.setAttribute('aria-expanded', !isOpen);
    });
  }
  
  setupSearch() {
    if (!this.searchBox) return;
    
    // Enhance search with suggestions
    const input = this.searchBox.querySelector('input');
    input.addEventListener('input', 
      PerformanceUtils.debounce(() => {
        this.loadSearchSuggestions(input.value);
      }, 300)
    );
  }
  
  trackNavigation() {
    if (!this.context.technical.consent.analyticsConsent) return;
    
    // Track navigation interactions
    this.element.addEventListener('click', (e) => {
      const navLink = e.target.closest('.molecule-nav-link');
      if (navLink) {
        window.analyticsInstance?.trackEvent('navigation_click', {
          section: 'header',
          destination: navLink.href,
          journey_stage: this.context.business.customerJourneyStage
        });
      }
    });
  }
}

// Example: Contact Form Organism
class ContactFormOrganism extends ContextConsumer {
  constructor(element, context) {
    super(element, context);
    this.form = element;
    this.submitButton = element.querySelector('[type="submit"]');
  }
  
  init() {
    this.setupValidation();
    this.setupSubmission();
    this.trackFormInteractions();
  }
  
  setupValidation() {
    // Real-time field validation
    this.form.addEventListener('blur', (e) => {
      if (e.target.matches('input, textarea, select')) {
        this.validateField(e.target);
      }
    }, true);
  }
  
  setupSubmission() {
    this.form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      if (!this.validateForm()) return;
      
      // Show loading state
      this.submitButton.disabled = true;
      this.submitButton.classList.add('is-loading');
      
      try {
        await this.submitForm();
      } catch (error) {
        this.showError(error.message);
      } finally {
        this.submitButton.disabled = false;
        this.submitButton.classList.remove('is-loading');
      }
    });
  }
  
  async submitForm() {
    const formData = new FormData(this.form);
    
    // Add context data
    formData.append('lead_score', this.context.business.leadQualityScore);
    formData.append('journey_stage', this.context.business.customerJourneyStage);
    
    const response = await fetch(this.form.action, {
      method: this.form.method,
      body: formData
    });
    
    if (!response.ok) {
      throw new Error('Submission failed');
    }
    
    // Show success message
    this.showSuccess();
    
    // Track conversion
    if (this.context.technical.consent.analyticsConsent) {
      window.analyticsInstance?.trackEvent('form_submission', {
        form_type: 'contact',
        lead_score: this.context.business.leadQualityScore,
        estimated_value: this.context.business.estimatedProjectValue
      });
    }
  }
}
```

## Key Benefits

1. **Complete Solutions**: Full page sections ready to use
2. **Business Integrated**: Full Context Engine awareness
3. **Accessibility Complete**: Proper landmarks and ARIA
4. **Responsive Built-in**: Mobile-first responsive design
5. **Performance Optimized**: Lazy loading, debouncing
6. **Reusable Patterns**: Consistent across templates
