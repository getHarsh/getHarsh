---
layout: page
title: Cookie Policy
permalink: /cookies/
---

# Cookie Policy

*Last updated: {{ site.time | date: '%B %d, %Y' }}*

## What Are Cookies

Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.

## How We Use Cookies

{{ site.domain.full_name }} uses cookies to:

- Remember your preferences and settings
- Analyze how you use our website
- Improve your experience
- Understand the effectiveness of our content

## Types of Cookies We Use

### Essential Cookies

These cookies are necessary for the website to function properly. They include:

| Cookie Name | Purpose | Duration |
|------------|---------|----------|
| {{ site.consent_settings.consent_cookie_name \| default: "analytics_consent" }} | Stores your cookie consent preferences | {{ site.consent_settings.consent_duration_days \| default: 365 }} days |

### Analytics Cookies

We use analytics cookies to understand how visitors interact with our website. These cookies are only set after you provide consent.

| Cookie Name | Provider | Purpose | Duration |
|------------|----------|---------|----------|
| _ga | Google Analytics | Distinguishes unique users | 2 years |
| _gid | Google Analytics | Distinguishes unique users | 24 hours |
| _gat | Google Analytics | Throttles request rate | 1 minute |
| _fbp | Meta/Facebook | Distinguishes unique users | 3 months |

### Third-Party Cookies

Some cookies are placed by third-party services that appear on our pages:

- **Google Analytics**: Used to collect anonymous information about how visitors use our website
- **Meta Pixel**: Used to measure the effectiveness of our content and understand user interactions

## Your Cookie Choices

### Cookie Consent

When you first visit our website, you will see a cookie consent banner. You can:
- **Accept**: Allow all cookies including analytics
- **Decline**: Only essential cookies will be used

### Managing Cookies

You can change your cookie preferences at any time by:

1. **Using our cookie tool**: Click the "Cookie Settings" link in the footer
2. **Browser settings**: Most browsers allow you to:
   - View what cookies are stored
   - Delete cookies individually or entirely
   - Block third-party cookies
   - Block all cookies

**Note**: Blocking all cookies may impact your experience on our website.

### Browser-Specific Instructions

- [Chrome](https://support.google.com/chrome/answer/95647)
- [Firefox](https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences)
- [Safari](https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac)
- [Edge](https://support.microsoft.com/en-us/help/4027947/microsoft-edge-delete-cookies)

## Google Consent Mode v2

We implement Google Consent Mode v2 (as required since March 2024) which allows us to adjust how Google tags behave based on your consent choices. This means:

- If you decline cookies, Google Analytics will still receive limited data for basic measurements
- No cookies will be set without your consent
- Your privacy choices are respected across all Google services

## Do Not Track

Some browsers have a "Do Not Track" feature that lets you tell websites you don't want your online activities tracked. We currently do not respond to Do Not Track signals, but we respect your cookie consent choices.

## Updates to This Policy

We may update this Cookie Policy to reflect changes in our practices or for legal reasons. We will notify you of any material changes by updating the date at the top of this policy.

## Contact Us

If you have questions about our use of cookies, please contact us at:

**{{ site.entity.name }}**  
Email: {{ site.contact.legal | default: site.contact.info }}  
Website: {{ site.url }}

---

*This Cookie Policy is provided by {{ site.entity.name }} ({{ site.entity.abbreviation }}) and applies to all websites under our management.*