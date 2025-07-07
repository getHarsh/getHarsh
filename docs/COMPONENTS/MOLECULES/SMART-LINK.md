# Smart Link Component Specification

## Overview

The **Smart Link Component** provides rich semantic links in articles by receiving link intelligence from the Context Engine. It adds appropriate icons, ARIA labels, and tracking based on the link type provided by Context Engine.

**Component Type**: Content Intelligence  
**Priority**: High  
**Lead Gen Focus**: Medium  
**Status**: Required

## Purpose

- Receive link type classification from Context Engine (Google Docs, GitHub, files, internal, ecosystem, external)
- Add appropriate visual indicators and icons based on Context Engine data
- Enhance accessibility with context-aware ARIA labels
- Track link engagement for analytics
- Provide ecosystem-aware navigation using Context Engine intelligence

## Component API

### Parameters

```liquid
{% include components/smart-link.html 
   href="https://github.com/user/repo"
   text="View Repository"
   type="github-repo"  (optional - provided by Context Engine if not specified)
%}
```

#### Required Parameters
- `href` - The URL to link to
- `text` - The link text to display

#### Optional Parameters
- `type` - Explicit type override (Context Engine provides if not specified)
- `title` - Link title attribute
- `class` - Additional CSS classes
- `target` - Link target (auto-set for external)
- `rel` - Link relationship (auto-set for external)

### Link Types from Context Engine

The Context Engine provides these link type classifications:

1. **Google Workspace**
   - Google Docs: `docs.google.com`
   - Google Sheets: `sheets.google.com`
   - Google Slides: `slides.google.com`
   - Google Drive: `drive.google.com`

2. **GitHub Resources**
   - Repository: `/user/repo` pattern
   - File: `/blob/` in URL
   - Folder: `/tree/` in URL
   - Issue: `/issues/` in URL
   - Pull Request: `/pull/` in URL

3. **File Types**
   - PDF: `.pdf` extension
   - Word: `.doc`, `.docx` extensions
   - Excel: `.xls`, `.xlsx` extensions
   - Archive: `.zip`, `.tar`, `.gz` extensions

4. **Link Categories**
   - Internal: Same domain as site
   - Ecosystem: Domains from config ecosystem list
   - External: All other domains

## Implementation

### Jekyll Template
```liquid
<!-- _includes/components/smart-link.html -->
{% include components/context-engine.html %}

{% comment %} Get link type from Context Engine if not provided {% endcomment %}
{% assign link_type = include.type %}
{% unless link_type %}
  {% assign link_data = universal_context.components.smartLink[include.href] %}
  {% assign link_type = link_data.type %}
{% endunless %}

{% comment %} Determine link category {% endcomment %}
{% assign is_internal = false %}
{% assign is_ecosystem = false %}
{% if include.href contains site.url %}
  {% assign is_internal = true %}
{% elsif site.ecosystem_domains %}
  {% for domain in site.ecosystem_domains %}
    {% if include.href contains domain %}
      {% assign is_ecosystem = true %}
      {% break %}
    {% endif %}
  {% endfor %}
{% endif %}

{% comment %} Set link attributes {% endcomment %}
{% assign target = include.target %}
{% assign rel = include.rel %}
{% unless is_internal %}
  {% assign target = "_blank" %}
  {% assign rel = "noopener noreferrer" %}
{% endunless %}

<a href="{{ include.href }}"
   class="smart-link smart-link--{{ link_type }} {{ include.class }}"
   {% if target %}target="{{ target }}"{% endif %}
   {% if rel %}rel="{{ rel }}"{% endif %}
   {% if include.title %}title="{{ include.title }}"{% endif %}
   data-link-type="{{ link_type }}"
   data-link-category="{% if is_internal %}internal{% elsif is_ecosystem %}ecosystem{% else %}external{% endif %}"
   aria-label="{{ include.text }}{% unless is_internal %}, opens in new tab{% endunless %}{% if link_type %}, {{ link_type | replace: '-', ' ' }}{% endif %}">
  
  {% comment %} Icon based on type {% endcomment %}
  {% case link_type %}
    {% when 'google-doc' %}
      {% include atoms/icon.html name="google-docs" size="sm" decorative=true %}
    {% when 'google-sheet' %}
      {% include atoms/icon.html name="google-sheets" size="sm" decorative=true %}
    {% when 'google-slide' %}
      {% include atoms/icon.html name="google-slides" size="sm" decorative=true %}
    {% when 'github-repo' %}
      {% include atoms/icon.html name="github" size="sm" decorative=true %}
    {% when 'pdf' %}
      {% include atoms/icon.html name="file-pdf" size="sm" decorative=true %}
    {% when 'external' %}
      {% include atoms/icon.html name="external-link" size="sm" decorative=true %}
  {% endcase %}
  
  <span class="smart-link__text">{{ include.text }}</span>
  
  {% comment %} External indicator for non-internal links {% endcomment %}
  {% unless is_internal %}
    <span class="smart-link__external-indicator" aria-hidden="true">↗</span>
  {% endunless %}
</a>
```

### SCSS Styles
```scss
// _sass/components/_smart-link.scss
.smart-link {
  // Base styles
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  color: var(--color-link);
  text-decoration: underline;
  text-decoration-color: var(--color-link-underline);
  text-underline-offset: 2px;
  transition: all var(--transition-fast);
  
  &:hover {
    color: var(--color-link-hover);
    text-decoration-color: var(--color-link-hover);
  }
  
  // Icon styling
  svg {
    flex-shrink: 0;
    opacity: 0.7;
    transition: opacity var(--transition-fast);
  }
  
  &:hover svg {
    opacity: 1;
  }
  
  // External indicator
  &__external-indicator {
    font-size: 0.75em;
    opacity: 0.5;
    margin-left: 0.1em;
  }
  
  // Type-specific colors
  &--google-doc,
  &--google-sheet,
  &--google-slide {
    svg { color: var(--color-google); }
  }
  
  &--github-repo,
  &--github-file {
    svg { color: var(--color-github); }
  }
  
  &--pdf {
    svg { color: var(--color-danger); }
  }
  
  // Category styling
  &[data-link-category="ecosystem"] {
    font-weight: var(--font-weight-medium);
  }
  
  // Responsive
  @include mobile {
    // Ensure touch-friendly tap targets
    min-height: var(--touch-target-min);
    padding: var(--space-2xs) 0;
  }
}
```

### JavaScript Enhancement
```javascript
// assets/js/components/smart-link.js
class SmartLink extends ComponentSystem.Component {
  static selector = '.smart-link';
  
  constructor(element, universalContext) {
    super(element, universalContext);
    this.initializeTracking();
  }
  
  initializeTracking() {
    this.element.addEventListener('click', (e) => {
      this.trackLinkClick(e);
    });
  }
  
  trackLinkClick(event) {
    if (!this.context.technical.consent.analyticsConsent) return;
    
    const linkType = this.element.dataset.linkType;
    const linkCategory = this.element.dataset.linkCategory;
    const href = this.element.href;
    
    this.analytics.trackEvent('smart_link_click', {
      event_category: 'engagement',
      event_action: 'link_click',
      link_type: linkType,
      link_category: linkCategory,
      link_url: href,
      content_intent: this.context.dynamicSignals?.intent?.contentIntent
    });
  }
}

ComponentSystem.register(SmartLink);
```

## Context Engine Integration

The Context Engine analyzes URLs and provides link type information:

```javascript
// Context Engine provides pre-calculated link data
const linkData = universalContext.components.smartLink[url];
// linkData contains:
// {
//   type: 'google-doc' | 'github-repo' | 'pdf' | etc,
//   category: 'internal' | 'ecosystem' | 'external',
//   isEcosystem: boolean,
//   requiresNewTab: boolean,
//   icon: 'google-docs' | 'github' | etc
// }
```

## Usage Examples

### Basic Usage
```liquid
{% include components/smart-link.html 
   href="https://github.com/getHarsh/getHarsh"
   text="View getHarsh Repository" %}
<!-- Context Engine provides type: 'github-repo' -->
```

### With Type Override
```liquid
{% include components/smart-link.html 
   href="https://example.com/report"
   text="Download Report"
   type="pdf" %}
<!-- Manual override, Context Engine type ignored -->
```

### In Article Content
```markdown
Check out our [technical documentation]{type="google-doc"} for more details.
```

## Accessibility

- Automatic ARIA labels with link type context
- "Opens in new tab" announcement for external links
- Icon marked as decorative (not announced)
- Keyboard navigable with visible focus states
- Touch-friendly tap targets on mobile

## Analytics Integration

Tracks:
- Link type (auto-detected or explicit)
- Link category (internal/ecosystem/external)
- Content intent context
- User engagement patterns

## Performance Considerations

- Icons loaded via SVG sprite (single HTTP request)
- Context Engine provides link types at build time (no runtime cost)
- Minimal JavaScript for tracking only
- CSS-only hover states

## Related Components

- [SOCIAL-LINKS.md](./SOCIAL-LINKS.md) - For social profile links
- [SOCIAL-SHARE.md](./SOCIAL-SHARE.md) - For sharing current page
- `nav-primary.html` - Main navigation links

## Implementation Status

- [ ] Jekyll template created
- [ ] SCSS styles implemented
- [ ] JavaScript enhancement added
- [ ] Type detection helper created
- [ ] Icon sprite updated
- [ ] Documentation complete
- [ ] Tests written
- [ ] Accessibility audit passed