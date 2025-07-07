# Organism: SITE-FOOTER

## Purpose

The SITE-FOOTER organism provides a comprehensive footer section with navigation links, business information, legal compliance, and conversion opportunities. It adapts based on repository context and business goals.

## Context Engine Integration

```javascript
// Automatically receives from Context Engine:
{
  business: {
    showContactInFooter: true,           // Contact info visibility
    footerConversionContext: 'secondary', // Conversion priority
    footerCtaValue: 250,                 // CTA value estimation
    newsletterEnabled: true              // Newsletter signup
  },
  repository: {
    context: 'domain',                   // domain, blog, project
    crossLinks: true,                    // Show cross-repository links
    legalEntity: 'RTEPL'                 // Legal entity for copyright
  },
  compliance: {
    gdprRequired: true,                  // GDPR compliance
    cookiePolicy: true,                  // Cookie policy link
    privacyPolicy: true                  // Privacy policy link
  }
}
```

## Multi-Layer Inheritance

```
Context Engine
    ↓
Core Systems (ANALYTICS.md, LEGAL.md)
    ↓
Theme System (footer layout, colors)
    ↓
Molecules (links, social, forms)
    ↓
SITE-FOOTER Organism
    ↓
Page Layouts (all templates)
```

## Implementation

### Liquid Template

```liquid
<!-- organisms/site-footer.html -->
{%- comment -%}
  SITE-FOOTER Organism - Universal footer with context awareness
  
  Parameters:
  - sections: Array of footer sections with links
  - social: Social media links configuration
  - newsletter: Newsletter signup configuration
  - contact: Contact information display
  - legal: Legal links and copyright
  - class: Additional CSS classes
{%- endcomment -%}

{% include components/context-engine.html %}

{%- comment -%} Repository-specific configuration {%- endcomment -%}
{%- case site.repository_context -%}
  {%- when 'blog' -%}
    {%- assign show_categories = true -%}
    {%- assign show_archive = true -%}
  {%- when 'project' -%}
    {%- assign show_docs = true -%}
    {%- assign show_releases = true -%}
  {%- else -%}
    {%- assign show_services = true -%}
    {%- assign show_portfolio = true -%}
{%- endcase -%}

<footer 
  class="organism-footer{% if include.class %} {{ include.class }}{% endif %}"
  role="contentinfo"
  aria-label="Site footer"
  data-component="organism-footer"
  data-repository-context="{{ site.repository_context }}"
  data-conversion-context="{{ universal_context.business.footerConversionContext }}">
  
  {% if universal_context.business.newsletterEnabled and include.newsletter %}
    <section 
      class="organism-footer__newsletter"
      aria-labelledby="newsletter-heading">
      <div class="organism-footer__container">
        <h2 id="newsletter-heading" class="organism-footer__newsletter-title">
          {{ include.newsletter.title | default: "Stay Updated" }}
        </h2>
        
        {% include molecules/newsletter-form.html 
           description=include.newsletter.description
           buttonText=include.newsletter.buttonText
           successMessage=include.newsletter.successMessage %}
      </div>
    </section>
  {% endif %}
  
  <div class="organism-footer__main">
    <div class="organism-footer__container">
      <div class="organism-footer__grid">
        
        {%- comment -%} Dynamic sections based on context {%- endcomment -%}
        {% for section in include.sections %}
          <section 
            class="organism-footer__section"
            aria-labelledby="footer-{{ section.id }}">
            <h3 id="footer-{{ section.id }}" class="organism-footer__section-title">
              {{ section.title }}
            </h3>
            
            <ul class="organism-footer__links" role="list">
              {% for link in section.links %}
                <li>
                  {% include molecules/nav-link.html 
                     href=link.href
                     text=link.text
                     external=link.external
                     class="organism-footer__link" %}
                </li>
              {% endfor %}
              
              {%- comment -%} Auto-generated links based on context {%- endcomment -%}
              {% if section.id == 'content' %}
                {% if show_categories %}
                  {% for category in site.categories limit:5 %}
                    <li>
                      {% include molecules/nav-link.html 
                         href="/category/{{ category[0] | slugify }}"
                         text=category[0]
                         class="organism-footer__link" %}
                    </li>
                  {% endfor %}
                {% endif %}
                
                {% if show_docs %}
                  <li>
                    {% include molecules/nav-link.html 
                       href="/docs"
                       text="Documentation"
                       class="organism-footer__link" %}
                  </li>
                  <li>
                    {% include molecules/nav-link.html 
                       href="/api"
                       text="API Reference"
                       class="organism-footer__link" %}
                  </li>
                {% endif %}
              {% endif %}
            </ul>
          </section>
        {% endfor %}
        
        {%- comment -%} Contact section if enabled {%- endcomment -%}
        {% if universal_context.business.showContactInFooter %}
          <section 
            class="organism-footer__section organism-footer__section--contact"
            aria-labelledby="footer-contact">
            <h3 id="footer-contact" class="organism-footer__section-title">
              Get in Touch
            </h3>
            
            <div class="organism-footer__contact">
              {% if site.contact.email %}
                <a href="mailto:{{ site.contact.email }}" 
                   class="organism-footer__contact-item">
                  {% include atoms/icon.html 
                     name="mail"
                     size="sm"
                     label="Email" %}
                  <span>{{ site.contact.email }}</span>
                </a>
              {% endif %}
              
              {% if site.contact.phone %}
                <a href="tel:{{ site.contact.phone | remove: ' ' | remove: '-' }}" 
                   class="organism-footer__contact-item">
                  {% include atoms/icon.html 
                     name="phone"
                     size="sm"
                     label="Phone" %}
                  <span>{{ site.contact.phone }}</span>
                </a>
              {% endif %}
              
              {% include molecules/button.html 
                 text="Book Consultation"
                 href="/contact"
                 variant="secondary"
                 size="sm"
                 icon="calendar"
                 dataAttributes={
                   "track-click": "footer_consultation_cta",
                   "conversion-value": universal_context.business.footerCtaValue
                 }
                 class="organism-footer__cta" %}
            </div>
          </section>
        {% endif %}
        
        {%- comment -%} Cross-repository links for domains {%- endcomment -%}
        {% if site.repository_context == 'domain' and site.cross_repository_urls %}
          <section 
            class="organism-footer__section organism-footer__section--ecosystem"
            aria-labelledby="footer-ecosystem">
            <h3 id="footer-ecosystem" class="organism-footer__section-title">
              Our Ecosystem
            </h3>
            
            <ul class="organism-footer__links" role="list">
              {% for link in site.cross_repository_urls %}
                <li>
                  {% include molecules/nav-link.html 
                     href=link.url
                     text=link.title
                     external=true
                     class="organism-footer__link organism-footer__link--ecosystem" %}
                </li>
              {% endfor %}
            </ul>
          </section>
        {% endif %}
      </div>
      
      {%- comment -%} Social links {%- endcomment -%}
      {% if include.social %}
        <div class="organism-footer__social">
          <h3 class="sr-only">Connect with us on social media</h3>
          {% include organisms/social-links.html 
             links=include.social
             variant="footer"
             class="organism-footer__social-links" %}
        </div>
      {% endif %}
    </div>
  </div>
  
  {%- comment -%} Legal footer {%- endcomment -%}
  <div class="organism-footer__legal">
    <div class="organism-footer__container">
      <div class="organism-footer__legal-content">
        <div class="organism-footer__copyright">
          {% include atoms/text.html 
             content=site.copyright
             variant="small"
             element="p" %}
          
          {%- comment -%} Legal entity based on domain {%- endcomment -%}
          {% case site.legal_entity %}
            {% when 'RTEPL' %}
              <p class="organism-footer__entity">
                RawThoughts Enterprises Private Limited
              </p>
            {% when 'DSPL' %}
              <p class="organism-footer__entity">
                DAO Studio Private Limited
              </p>
          {% endcase %}
        </div>
        
        <nav 
          class="organism-footer__legal-links"
          aria-label="Legal information">
          {% if universal_context.compliance.privacyPolicy %}
            {% include molecules/nav-link.html 
               href="/privacy"
               text="Privacy Policy"
               class="organism-footer__legal-link" %}
          {% endif %}
          
          {% if universal_context.compliance.cookiePolicy %}
            {% include molecules/nav-link.html 
               href="/cookies"
               text="Cookie Policy"
               class="organism-footer__legal-link" %}
          {% endif %}
          
          {% include molecules/nav-link.html 
             href="/terms"
             text="Terms of Service"
             class="organism-footer__legal-link" %}
          
          {% if site.repository_context == 'project' %}
            {% include molecules/nav-link.html 
               href="/license"
               text="License"
               class="organism-footer__legal-link" %}
          {% endif %}
        </nav>
      </div>
    </div>
  </div>
</footer>
```

### SCSS Structure

```scss
// organisms/_site-footer.scss
.organism-footer {
  // Structure
  display: flex;
  flex-direction: column;
  margin-top: auto; // Push to bottom in flex layouts
  
  // Container for consistent width
  &__container {
    max-width: var(--container-max-width);
    margin: 0 auto;
    padding: 0 var(--container-padding);
    width: 100%;
  }
  
  // Newsletter section
  &__newsletter {
    padding: var(--space-xl) 0;
    border-bottom: 1px solid var(--color-border);
    
    &-title {
      margin-bottom: var(--space-md);
      text-align: center;
    }
  }
  
  // Main footer content
  &__main {
    padding: var(--space-xl) 0;
  }
  
  // Grid layout for sections
  &__grid {
    display: grid;
    gap: var(--space-lg);
    
    @include mobile {
      grid-template-columns: 1fr;
    }
    
    @include tablet {
      grid-template-columns: repeat(2, 1fr);
    }
    
    @include desktop-up {
      grid-template-columns: repeat(4, 1fr);
    }
  }
  
  // Individual sections
  &__section {
    &-title {
      margin-bottom: var(--space-sm);
      font-size: var(--font-size-md);
      font-weight: var(--font-weight-semibold);
    }
    
    &--contact {
      @include desktop-up {
        grid-column: span 2;
      }
    }
  }
  
  // Link lists
  &__links {
    list-style: none;
    padding: 0;
    margin: 0;
    
    li {
      margin-bottom: var(--space-xs);
    }
  }
  
  &__link {
    display: inline-flex;
    align-items: center;
    gap: var(--space-xs);
    
    &--ecosystem {
      font-weight: var(--font-weight-medium);
    }
  }
  
  // Contact section
  &__contact {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
    
    &-item {
      display: inline-flex;
      align-items: center;
      gap: var(--space-xs);
    }
  }
  
  // Social links
  &__social {
    margin-top: var(--space-lg);
    padding-top: var(--space-lg);
    border-top: 1px solid var(--color-border);
  }
  
  // Legal footer
  &__legal {
    padding: var(--space-md) 0;
    border-top: 1px solid var(--color-border);
    
    &-content {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      gap: var(--space-md);
      
      @include mobile {
        flex-direction: column;
        text-align: center;
      }
    }
    
    &-links {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-md);
      
      @include mobile {
        justify-content: center;
      }
    }
  }
  
  // Copyright text
  &__copyright {
    p {
      margin: 0;
    }
  }
  
  &__entity {
    font-size: var(--font-size-sm);
    opacity: 0.8;
  }
}
```

### JavaScript Enhancement

```javascript
// organisms/site-footer-enhancer.js
import { ContextConsumer } from '../core/context-consumer.js';

export class SiteFooterEnhancer extends ContextConsumer {
  constructor(element, context) {
    super(element, context);
    this.newsletterForm = element.querySelector('.molecule-newsletter-form');
  }
  
  init() {
    // Track footer visibility for engagement
    this.trackFooterEngagement();
    
    // Enhance newsletter if present
    if (this.newsletterForm) {
      this.enhanceNewsletter();
    }
    
    // Set up link tracking
    this.trackLinkClicks();
    
    // Dynamic year update
    this.updateCopyrightYear();
  }
  
  trackFooterEngagement() {
    if (!this.context.analytics.trackEngagement) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          window.analyticsInstance?.trackEvent('footer_viewed', {
            repository_context: this.element.dataset.repositoryContext,
            has_newsletter: !!this.newsletterForm,
            journey_stage: this.context.business.customerJourneyStage
          });
          
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(this.element);
  }
  
  enhanceNewsletter() {
    this.newsletterForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const email = this.newsletterForm.querySelector('input[type="email"]').value;
      
      // Track signup attempt
      window.analyticsInstance?.trackEvent('newsletter_signup_attempt', {
        location: 'footer',
        lead_score: this.context.business.leadQualityScore
      });
      
      try {
        // Submit to newsletter service
        await this.submitNewsletter(email);
        
        // Track success
        window.analyticsInstance?.trackConversion({
          action: 'newsletter_signup',
          value: 50,
          category: 'lead_generation'
        });
        
        // Show success message
        this.showNewsletterSuccess();
      } catch (error) {
        this.showNewsletterError();
      }
    });
  }
  
  trackLinkClicks() {
    this.element.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (!link) return;
      
      const section = link.closest('.organism-footer__section');
      const sectionTitle = section?.querySelector('.organism-footer__section-title')?.textContent;
      
      window.analyticsInstance?.trackEvent('footer_link_click', {
        section: sectionTitle || 'legal',
        destination: link.href,
        text: link.textContent.trim(),
        is_external: link.target === '_blank'
      });
    });
  }
  
  updateCopyrightYear() {
    const copyrightElement = this.element.querySelector('.organism-footer__copyright');
    if (!copyrightElement) return;
    
    const currentYear = new Date().getFullYear();
    copyrightElement.innerHTML = copyrightElement.innerHTML.replace(
      /\d{4}/g,
      currentYear.toString()
    );
  }
  
  async submitNewsletter(email) {
    // Integration point for newsletter service
    const response = await fetch('/api/newsletter/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        email,
        source: 'footer',
        context: this.context.repository.context
      })
    });
    
    if (!response.ok) throw new Error('Subscription failed');
    return response.json();
  }
}
```

## Usage Examples

### Domain Footer

```liquid
{% include organisms/site-footer.html
   sections=site.footer_sections
   social=site.social_profiles
   newsletter={
     title: "Get Tech Insights",
     description: "Monthly updates on web development and AI",
     buttonText: "Subscribe"
   }
   contact=true %}
```

### Blog Footer

```liquid
{% include organisms/site-footer.html
   sections=[
     {
       id: "content",
       title: "Categories",
       links: [] // Auto-populated
     },
     {
       id: "archive", 
       title: "Archive",
       links: site.archive_links
     }
   ]
   social=site.social_profiles %}
```

### Project Footer

```liquid
{% include organisms/site-footer.html
   sections=[
     {
       id: "docs",
       title: "Documentation",
       links: site.doc_links
     },
     {
       id: "community",
       title: "Community", 
       links: site.community_links
     }
   ]
   social=site.social_profiles %}
```

## Repository Context Adaptations

1. **Domain Sites**: Shows services, portfolio, cross-links
2. **Blog Sites**: Shows categories, tags, archive
3. **Project Sites**: Shows docs, releases, license

## Compliance Features

- GDPR-compliant newsletter signup
- Privacy and cookie policy links
- Legal entity information
- Terms of service
- Proper consent handling

## Testing Checklist

- [ ] All sections display correctly
- [ ] Newsletter form submits properly
- [ ] Social links open correctly
- [ ] Legal links present
- [ ] Mobile layout stacks properly
- [ ] Copyright year updates
- [ ] Analytics tracking fires
- [ ] Cross-repository links work
- [ ] Accessibility landmarks present
- [ ] Contact information displays