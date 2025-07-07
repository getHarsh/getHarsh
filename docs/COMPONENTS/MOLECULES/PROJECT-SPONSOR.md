# Project Sponsor Component Specification

## Overview

The **Project Sponsor** component is a specialized molecule for project-based sponsorship and support. It integrates payment processing (PayPal, GitHub Sponsors) with analytics tracking and provides flexible sponsorship tiers.

**Component Type**: Molecule
**Inherits From**: Theme Base
**Context Integration**: Analytics, ARIA, SEO, Business
**Business Model**: Project sponsorship & open-source funding

## Context Consumption

The Project Sponsor component receives and transforms:

```javascript
{
  // Project context
  project: {
    id: string,
    name: string,
    category: 'technical|creative|research',
    sponsorshipGoal: number
  },
  
  // Business context
  business: {
    conversionType: 'project_sponsorship',
    sponsorshipTiers: [50, 100, 500],
    currency: 'USD'
  },
  
  // Platform context
  platforms: {
    paypal: { enabled: boolean, buttonId: string },
    githubSponsors: { enabled: boolean, url: string },
    custom: { enabled: boolean, url: string }
  }
}
```

## Component API

### Input Parameters

```liquid
{% include components/project-sponsor.html 
   project_id="secure-api-framework"    // Required: Project identifier
   sponsor_amount="50"                   // Optional: Default amount
   platforms="paypal,github"             // Optional: Available platforms
   heading="Support This Project"        // Optional: Custom heading
   description=""                        // Optional: Custom description
%}
```

### Sponsorship Tiers

The component supports configurable tiers:
- **Supporter**: $50 - Early access to updates
- **Contributor**: $100 - Direct support channel
- **Partner**: $500 - Feature prioritization

## Analytics Integration

Tracks sponsorship funnel:
1. Component view (impression)
2. Platform selection
3. Amount selection
4. Redirect to payment
5. Return tracking (if available)

```javascript
// Debounced tracking to prevent double-clicks
trackProjectSponsorship(projectId, amount, platform)
```

## Accessibility Features

- **Region Landmark**: Identifies sponsorship area
- **Descriptive Labels**: Clear payment options
- **Keyboard Navigation**: Full form support
- **Status Announcements**: Payment redirects

## Platform Integration

### PayPal Integration
```html
<form action="https://www.paypal.com/donate" method="post">
  <input type="hidden" name="hosted_button_id" value="{{ buttonId }}">
  <input type="hidden" name="amount" value="{{ amount }}">
  <input type="hidden" name="item_name" value="Project: {{ project_id }}">
</form>
```

### GitHub Sponsors
```html
<a href="https://github.com/sponsors/{{ username }}?project={{ project_id }}"
   class="sponsor-link sponsor-link--github">
  Sponsor on GitHub
</a>
```

## SEO Enhancement

Uses Schema.org DonateAction:
```html
<div itemscope itemtype="https://schema.org/DonateAction">
  <meta itemprop="recipient" content="{{ project.name }}">
  <meta itemprop="price" content="{{ amount }}">
</div>
```

## Implementation Reference

- Template: `_includes/components/project-sponsor.html`
- Styles: `_sass/molecules/_project-sponsor.scss`
- JavaScript: `assets/js/components/project-sponsor.js`

## Context Transformation

```liquid
<!-- From Context Engine -->
{% assign project_category = universal_context.project.category %}
{% assign sponsor_tiers = universal_context.business.sponsorshipTiers %}

<!-- Transform to Component -->
data-project-category="{{ project_category }}"
data-sponsorship-value="{{ selected_amount }}"

<!-- Conditional platform display -->
{% if universal_context.platforms.paypal.enabled %}
  <!-- Show PayPal option -->
{% endif %}
```

## Error Handling

- Invalid project IDs
- Missing payment configuration
- Platform availability
- Network failures
- Consent state changes

## Related Components

- [SPONSOR-OPTION.md](./SPONSOR-OPTION.md) - Individual platform option
- [SPONSOR-GRID.md](../ORGANISMS/SPONSOR-GRID.md) - Multiple sponsor options
- [CONTACT-BUTTON.md](./CONTACT-BUTTON.md) - Alternative CTA

## Example Usage

```liquid
<!-- Basic sponsorship -->
{% include components/project-sponsor.html 
   project_id="hena-agent" %}

<!-- With custom amount -->
{% include components/project-sponsor.html 
   project_id="jarvis-kernel"
   sponsor_amount="100"
   heading="Fund JARVIS Development" %}

<!-- Multiple platforms -->
{% include components/project-sponsor.html 
   project_id="dao-protocol"
   platforms="paypal,github,crypto"
   description="Support decentralized development" %}

<!-- In project page -->
<aside class="project__sidebar">
  <h2>Support This Project</h2>
  {% include components/project-sponsor.html 
     project_id="{{ page.project_id }}"
     sponsor_amount="{{ page.suggested_sponsorship }}" %}
</aside>
```

This specification defines the Project Sponsor component as a business-optimized molecule for open-source project funding with multi-platform support.