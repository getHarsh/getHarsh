# Deterministic ARIA Generation System

## Overview

The ARIA generation system is a **pure transformation layer** that transforms universal context from the [Central Context Engine](./CONTEXT-ENGINE.md) into WCAG 2.2 AA compliant accessibility markup. It contains NO detection logic - all detection happens in the Context Engine.

**Pure Transformation**: This system receives pre-calculated context and applies ARIA-specific transformations and compliance rules.

**Universal Context Source**: All context extraction (ecosystem, domain, project, page, component, theme) and detection (file types, link types, content types) is handled by the [Central Context Engine](./CONTEXT-ENGINE.md) and [CONTEXT-DETECTION.md](./CONTEXT-DETECTION.md).

> **Context Details**: See [CONTEXT-ENGINE.md](./CONTEXT-ENGINE.md) for complete multi-dimensional context extraction and [CONTEXT-DETECTION.md](./CONTEXT-DETECTION.md) for all detection algorithms

## WCAG 2.2 AA Compliance Standards

### Required ARIA Attributes

**CRITICAL**: Use semantic context for ARIA labels, never expose internal tracking data.

| Element Type | Required ARIA | Example | Notes |
|--------------|---------------|---------|--------|
| Buttons | `aria-label` or visible text | "Contact us" | Never include journey stage |
| Links | `aria-label` if ambiguous | "Read more about React" | Add context, not tracking |
| Forms | `aria-labelledby`, `aria-describedby` | References to labels/help | Required for all inputs |
| Modals | `aria-modal`, `role="dialog"` | Proper focus management | Trap focus when open |
| Navigation | `role="navigation"`, `aria-label` | "Main navigation" | Identify nav regions |

### Privacy-Safe ARIA Patterns

```liquid
{%- comment -%} ❌ NEVER expose tracking data in ARIA {%- endcomment -%}
{%- comment -%} aria-label="Contact - High value lead stage" {%- endcomment -%}

{%- comment -%} ✅ CORRECT - Semantic context only {%- endcomment -%}
aria-label="Contact us"
```

## ARIA Context Transformation

### Transformation Pattern

```javascript
class ARIATransformer {
  constructor(universalContext) {
    this.context = universalContext;
  }
  
  transform() {
    return {
      ariaLabel: this.buildARIALabel(),
      ariaDescription: this.buildARIADescription(),
      ariaRole: this.deriveARIARole(),
      ariaStates: this.deriveARIAStates(),
      ariaProperties: this.deriveARIAProperties()
    };
  }
  
  // All methods use pre-calculated context, no detection
  buildARIALabel() {
    const { semantics, content, dynamicSignals } = this.context;
    
    // Transform context into ARIA-compliant label
    return this.applyARIALabelRules(semantics, content);
  }
}
```

### Universal Context to ARIA Conversion

The ARIA system receives rich context from the [Central Context Engine](./CONTEXT-ENGINE.md) and transforms it specifically for accessibility standards:

```liquid
{%- comment -%} Context Extraction from Multi-Layer Hierarchy {%- endcomment -%}
{%- capture hierarchy_context -%}
  {%- comment -%} 1. Domain/Brand Context (from site config inheritance) {%- endcomment -%}
  {%- assign domain_type = site.domain_info.category | default: 'website' -%}
  {%- assign brand_voice = site.domain_info.voice | default: 'professional' -%}
  
  {%- comment -%} 2. Page Context (from Jekyll page variables) {%- endcomment -%}
  {%- assign page_type = page.layout -%}
  {%- assign content_category = page.category | default: page.categories[0] -%}
  {%- assign page_section = page.url | split: '/' | slice: 1 -%}
  
  {%- comment -%} 3. Component Hierarchy Context (from parent elements) {%- endcomment -%}
  {%- assign section_variant = include.section_variant | default: 'content' -%}
  {%- assign component_depth = include.component_depth | default: '1' -%}
  
  {%- comment -%} 4. Theme System Context (visual semantics) {%- endcomment -%}
  {%- assign theme_system = site.theme.system -%}
  {%- assign color_palette = site.theme.palette -%}
  {%- assign typography = site.theme.typography -%}
{%- endcapture -%}

{%- comment -%} ARIA Label Generation Using Extracted Context {%- endcomment -%}
{%- capture computed_aria_label -%}
  {%- comment -%} Domain-specific prefixes (from inheritance) {%- endcomment -%}
  {%- case domain_type -%}
    {%- when 'portfolio' -%}Portfolio: 
    {%- when 'blog' -%}Blog: 
    {%- when 'documentation' -%}Docs: 
    {%- when 'project' -%}Project: 
  {%- endcase -%}
  
  {%- comment -%} Component variant semantics {%- endcomment -%}
  {%- case include.variant -%}
    {%- when 'primary' -%}Main action: 
    {%- when 'secondary' -%}Secondary action: 
    {%- when 'danger' -%}Warning action: 
  {%- endcase -%}
  
  {%- comment -%} Base content {%- endcomment -%}
  {{ include.text }}
  
  {%- comment -%} Page context enhancement {%- endcomment -%}
  {%- case page_type -%}
    {%- when 'post' -%}, blog post action
    {%- when 'project' -%}, project showcase action
    {%- when 'documentation' -%}, documentation action
  {%- endcase -%}
  
  {%- comment -%} Content category context {%- endcomment -%}
  {%- if content_category -%}
    {%- case content_category -%}
      {%- when 'technical' -%} in technical content
      {%- when 'tutorial' -%} in tutorial content
      {%- when 'case-study' -%} in case study
    {%- endcase -%}
  {%- endif -%}
  
  {%- comment -%} Link analysis using Context Engine data {%- endcomment -%}
  {%- if include.href -%}
    {%- comment -%} Use pre-calculated file type from Context Engine {%- endcomment -%}
    {%- if include.file_type_label -%}, {{ include.file_type_label }}{%- endif -%}
    {%- comment -%} Use pre-calculated domain type from Context Engine {%- endcomment -%}
    {%- if include.domain_type_label -%}, {{ include.domain_type_label }}{%- endif -%}
    {%- if include.external -%}, opens in new tab{%- endif -%}
  {%- endif -%}
{%- endcapture -%}
```

### Rule-Based Pattern Matching System

The system analyzes component parameters and context using deterministic rules:

```liquid
{%- capture computed_aria_label -%}
  {%- comment -%} 1. Component Variant Rules {%- endcomment -%}
  {%- if include.variant == 'primary' -%}Primary action: {%- endif -%}
  {%- if include.variant == 'secondary' -%}Secondary action: {%- endif -%}
  {%- if include.variant == 'danger' -%}Warning action: {%- endif -%}
  
  {%- comment -%} 2. Base Text Content {%- endcomment -%}
  {{ include.text }}
  
  {%- comment -%} 3. Link Analysis Rules {%- endcomment -%}
  {%- if include.href -%}
    {%- comment -%} External link detection {%- endcomment -%}
    {%- if include.external -%}, opens in new tab{%- endif -%}
    
    {%- comment -%} File type from Context Engine {%- endcomment -%}
    {%- if include.file_type_label -%}, {{ include.file_type_label }}{%- endif -%}
    
    {%- comment -%} Action intent from Context Engine {%- endcomment -%}
    {%- if include.action_intent_label -%}, {{ include.action_intent_label }}{%- endif -%}
    
    {%- comment -%} Domain type from Context Engine {%- endcomment -%}
    {%- if include.external and include.domain_type_label -%}, {{ include.domain_type_label }}{%- endif -%}
  {%- endif -%}
  
  {%- comment -%} 4. Icon Enhancement Rules {%- endcomment -%}
  {%- if include.icon -%}, with {{ include.icon | replace: '-', ' ' }} icon{%- endif -%}
  
  {%- comment -%} 5. State Information {%- endcomment -%}
  {%- if include.disabled -%}, currently disabled{%- endif -%}
  {%- if include.pressed -%}, currently pressed{%- endif -%}
{%- endcapture -%}
```

### Section Context Analysis

For layout components, the system uses context mapping:

```liquid
{%- capture computed_aria_label -%}
  {%- comment -%} Section type mapping {%- endcomment -%}
  {%- case include.variant -%}
    {%- when 'hero' -%}Main hero section
    {%- when 'content' -%}Main content area
    {%- when 'sidebar' -%}Sidebar content
    {%- when 'footer' -%}Footer information
    {%- when 'header' -%}Page header
    {%- when 'navigation' -%}Navigation menu
    {%- when 'cta' -%}Call to action section
    {%- when 'testimonials' -%}Customer testimonials
    {%- when 'features' -%}Feature highlights
    {%- when 'pricing' -%}Pricing information
    {%- else -%}{{ include.variant | default: 'content' | replace: '-', ' ' | capitalize }} section
  {%- endcase -%}
  
  {%- comment -%} Title enhancement {%- endcomment -%}
  {%- if include.title -%}: {{ include.title }}{%- endif -%}
  
  {%- comment -%} Page context (from page variables) {%- endcomment -%}
  {%- if page.layout == 'post' -%}, blog post content{%- endif -%}
  {%- if page.layout == 'project' -%}, project showcase{%- endif -%}
  {%- if page.layout == 'documentation' -%}, documentation page{%- endif -%}
{%- endcapture -%}
```

### Form Field Intelligence

For form components, the system provides comprehensive context:

```liquid
{%- comment -%} Input field ARIA generation {%- endcomment -%}
{%- capture field_description -%}
  {%- comment -%} Field type mapping {%- endcomment -%}
  {%- case include.type -%}
    {%- when 'email' -%}Email address input
    {%- when 'password' -%}Password input
    {%- when 'tel' -%}Phone number input
    {%- when 'url' -%}Website URL input
    {%- when 'search' -%}Search query input
    {%- when 'number' -%}Numeric input
    {%- when 'date' -%}Date selection
    {%- when 'file' -%}File upload
    {%- else -%}Text input
  {%- endcase -%}
  
  {%- comment -%} Validation rules {%- endcomment -%}
  {%- if include.required -%}, required field{%- endif -%}
  {%- if include.min or include.max -%}, limited length{%- endif -%}
  {%- if include.pattern -%}, specific format required{%- endif -%}
  
  {%- comment -%} Help text integration {%- endcomment -%}
  {%- if include.help -%}. {{ include.help }}{%- endif -%}
{%- endcapture -%}

<label for="{{ include.id }}" class="form-label">
  {{ include.label }}
  {%- if include.required -%}<span aria-label="required">*</span>{%- endif -%}
</label>

<input type="{{ include.type | default: 'text' }}"
       id="{{ include.id }}"
       name="{{ include.name }}"
       aria-label="{{ include.label }}{{ field_description }}"
       {%- if include.required -%}aria-required="true"{%- endif -%}
       {%- if include.error -%}aria-invalid="true"{%- endif -%}>
```

### Image Context Analysis

For images, the system provides intelligent alt text generation:

```liquid
{%- comment -%} Image ARIA/alt text generation {%- endcomment -%}
{%- capture computed_alt -%}
  {%- comment -%} Priority 1: Explicit alt text {%- endcomment -%}
  {%- if include.alt -%}
    {{ include.alt }}
  {%- comment -%} Priority 2: Title as fallback {%- endcomment -%}
  {%- elsif include.title -%}
    {{ include.title }}
  {%- comment -%} Priority 3: Filename analysis {%- endcomment -%}
  {%- else -%}
    {%- assign filename = include.src | split: '/' | last | split: '.' | first -%}
    {%- assign clean_name = filename | replace: '-', ' ' | replace: '_', ' ' | capitalize -%}
    
    {%- comment -%} Context-based prefix {%- endcomment -%}
    {%- if page.layout == 'project' -%}Project image: {{ clean_name }}
    {%- elsif page.layout == 'post' -%}Blog image: {{ clean_name }}
    {%- comment -%} Use image type from Context Engine {%- endcomment -%}
    {%- elsif include.image_type_label -%}{{ include.image_type_label }}: {{ clean_name }}
    {%- else -%}Image: {{ clean_name }}
    {%- endif -%}
  {%- endif -%}
{%- endcapture -%}

<img src="{{ include.src }}"
     alt="{{ computed_alt | strip }}"
     {%- if include.decorative -%}role="presentation" aria-hidden="true"{%- endif -%}>
```

## Navigation Intelligence

### Menu Context Rules

```liquid
{%- comment -%} Navigation item ARIA enhancement {%- endcomment -%}
{%- capture nav_context -%}
  {{ include.text }}
  
  {%- comment -%} Page state detection {%- endcomment -%}
  {%- if page.url == include.url or page.url contains include.url -%}
    , current page
  {%- endif -%}
  
  {%- comment -%} Link type analysis {%- endcomment -%}
  {%- if include.external -%}
    , external link, opens in new tab
  {%- comment -%} Use link type from Context Engine {%- endcomment -%}
  {%- elsif include.link_type_label -%}
    , {{ include.link_type_label }}
  {%- endif -%}
  
  {%- comment -%} Submenu detection {%- endcomment -%}
  {%- if include.submenu -%}
    , has submenu
  {%- endif -%}
{%- endcapture -%}

<a href="{{ include.url }}"
   class="nav-item"
   aria-label="{{ nav_context | strip }}"
   {%- if page.url == include.url -%}aria-current="page"{%- endif -%}
   {%- if include.submenu -%}aria-expanded="false" aria-haspopup="true"{%- endif -%}>
  {{ include.text }}
</a>
```

### Breadcrumb Intelligence

```liquid
{%- comment -%} Breadcrumb ARIA generation {%- endcomment -%}
{%- assign crumbs = page.url | split: '/' -%}
<nav aria-label="Breadcrumb navigation" role="navigation">
  <ol class="breadcrumbs">
    {%- assign crumb_url = site.url -%}
    {%- for crumb in crumbs -%}
      {%- unless crumb == '' -%}
        {%- assign crumb_url = crumb_url | append: '/' | append: crumb -%}
        {%- assign crumb_name = crumb | replace: '-', ' ' | replace: '_', ' ' | capitalize -%}
        
        <li class="breadcrumb-item">
          {%- if forloop.last -%}
            <span aria-current="page">{{ crumb_name }}</span>
          {%- else -%}
            <a href="{{ crumb_url }}" aria-label="Navigate to {{ crumb_name }}">
              {{ crumb_name }}
            </a>
          {%- endif -%}
        </li>
      {%- endunless -%}
    {%- endfor -%}
  </ol>
</nav>
```

## Component Intelligence Patterns

### Rule-Based Context Detection

```javascript
// Client-side ARIA enhancement (deterministic rules)
class ARIAEnhancer {
  enhanceComponent(element) {
    // Pattern-based enhancement rules
    this.enhanceByDataAttributes(element);
    this.enhanceByContext(element);
    this.enhanceByContent(element);
  }
  
  enhanceByDataAttributes(element) {
    const variant = element.dataset.variant;
    const component = element.dataset.component;
    
    // Component-specific rules
    const rules = {
      'button': {
        'primary': 'Primary action button',
        'secondary': 'Secondary action button', 
        'danger': 'Warning action button'
      },
      'card': {
        'feature': 'Feature highlight card',
        'testimonial': 'Customer testimonial card',
        'project': 'Project showcase card'
      },
      'section': {
        'hero': 'Main hero section',
        'cta': 'Call to action section',
        'features': 'Feature overview section'
      }
    };
    
    if (rules[component] && rules[component][variant]) {
      this.enhanceLabel(element, rules[component][variant]);
    }
  }
  
  enhanceByContext(element) {
    // Parent context analysis
    const section = element.closest('[data-component="section"]');
    const article = element.closest('article');
    const nav = element.closest('nav');
    
    if (section) {
      const sectionVariant = section.dataset.variant;
      this.addContextSuffix(element, `in ${sectionVariant} section`);
    }
    
    if (article) {
      this.addContextSuffix(element, 'in article content');
    }
    
    if (nav) {
      this.addContextSuffix(element, 'navigation item');
    }
  }
  
  enhanceByContent(element) {
    // Content-based analysis
    const href = element.getAttribute('href');
    const text = element.textContent.toLowerCase();
    
    // Use Context Engine for all detection
    // File type detection is handled by CONTEXT-DETECTION.md Section 2.1
    // External link detection is handled by CONTEXT-DETECTION.md Section 2.2
    // The Context Engine provides detected link types and file types
    
    if (href && this.contextEngine) {
      // Get link type from Context Engine
      const linkContext = this.contextEngine.detectLinkType(href);
      
      if (linkContext.fileType) {
        // Use file type label from CONTEXT-MAPPING.md Section 6.1
        this.addContextSuffix(element, linkContext.fileTypeLabel);
      }
      
      if (linkContext.isExternal) {
        this.addContextSuffix(element, 'external link, opens in new tab');
      }
      
      // Action intent from Context Engine
      const actionIntent = this.contextEngine.detectActionIntent(text, href);
      if (actionIntent.description) {
        this.addContextSuffix(element, actionIntent.description);
      }
    }
  }
}
```

## Form Validation Integration

### Error State ARIA

```liquid
{%- comment -%} Form validation ARIA states {%- endcomment -%}
<div class="form-field" data-component="form-field">
  <label for="{{ include.id }}" class="form-label">
    {{ include.label }}
    {%- if include.required -%}<span aria-label="required">*</span>{%- endif -%}
  </label>
  
  <input type="{{ include.type | default: 'text' }}"
         id="{{ include.id }}"
         name="{{ include.name }}"
         class="form-input"
         
         {%- comment -%} Validation state ARIA {%- endcomment -%}
         {%- if include.error -%}
           aria-invalid="true"
           aria-describedby="{{ include.id }}-error"
         {%- elsif include.success -%}
           aria-invalid="false" 
           aria-describedby="{{ include.id }}-success"
         {%- else -%}
           {%- if include.help -%}aria-describedby="{{ include.id }}-help"{%- endif -%}
         {%- endif -%}
         
         {%- if include.required -%}aria-required="true"{%- endif -%}>
  
  {%- if include.help and include.error == null -%}
  <div id="{{ include.id }}-help" class="form-help">
    {{ include.help }}
  </div>
  {%- endif -%}
  
  {%- if include.error -%}
  <div id="{{ include.id }}-error" class="form-error" role="alert">
    {{ include.error }}
  </div>
  {%- endif -%}
  
  {%- if include.success -%}
  <div id="{{ include.id }}-success" class="form-success" role="status">
    {{ include.success }}
  </div>
  {%- endif -%}
</div>
```

## Live Regions for Dynamic Content

### Search Results ARIA

```liquid
{%- comment -%} Search component with live regions {%- endcomment -%}
<div class="search" data-component="search">
  <form class="search-form" role="search">
    <label for="search-input" class="search-label">
      Search {{ site.title }}
    </label>
    
    <input type="search"
           id="search-input"
           class="search-input"
           placeholder="Enter search terms..."
           aria-label="Search {{ site.title }} content"
           aria-describedby="search-instructions"
           autocomplete="off">
    
    <button type="submit" class="search-submit">
      <span class="visually-hidden">Submit search</span>
      <svg aria-hidden="true" class="search-icon">
        <use href="#icon-search"></use>
      </svg>
    </button>
  </form>
  
  <div id="search-instructions" class="search-instructions">
    Type to search through articles, projects, and documentation
  </div>
  
  {%- comment -%} Live region for results {%- endcomment -%}
  <div id="search-results" 
       class="search-results"
       role="region"
       aria-live="polite"
       aria-label="Search results">
    <!-- Results populated by JavaScript -->
  </div>
  
  {%- comment -%} Status announcements {%- endcomment -%}
  <div id="search-status" 
       class="visually-hidden"
       role="status"
       aria-live="assertive">
    <!-- Status updates like "5 results found" -->
  </div>
</div>
```

## Key Implementation Principles

### 1. Deterministic Logic Only

- **No AI or machine learning** - all rules are explicit
- **Pattern matching** using regular expressions and string contains
- **Lookup tables** for variant mapping
- **Conditional logic trees** for context analysis

### 2. Progressive Enhancement

- **Base accessibility** in server-side templates
- **Enhanced context** via client-side JavaScript
- **Fallback handling** for missing data
- **Graceful degradation** when JavaScript disabled

### 3. Context Hierarchy

```text
Page Context → Section Context → Component Context → Element Context
```

### 4. Rule Priority System

```text
1. Explicit aria-label parameter (highest priority)
2. Component variant rules
3. Content analysis patterns  
4. Context inheritance
5. Default fallbacks (lowest priority)
```

## Target-Aware Accessibility & Multi-Repository Support

### Repository Context ARIA Enhancement

**Multi-Repository Accessibility Coordination**: The ARIA system adapts accessibility patterns based on repository context and target-aware processing:

```javascript
// REQUIRED: Target-aware ARIA generation
class TargetAwareARIAGenerator {
  constructor(universalContext) {
    this.context = universalContext;
  }
  
  // REQUIRED: Generate repository-aware ARIA labels
  generateRepositoryAwareARIA() {
    // Use pre-calculated ARIA patterns from Context Engine
    return this.context.generateRepositoryARIAPatterns();
  }
  
  // REQUIRED: Cross-repository navigation ARIA
  generateCrossRepositoryNavigationARIA() {
    // Use pre-calculated navigation ARIA from Context Engine
    return this.context.generateCrossRepositoryNavigationARIA();
  }
}
```

### Cross-Posting Attribution ARIA

```javascript
// REQUIRED: Cross-posting attribution accessibility
class CrossPostingAttributionARIA {
  constructor(universalContext) {
    this.context = universalContext;
  }
  
  // REQUIRED: Generate attribution ARIA labels
  generateAttributionARIA() {
    // Use content relationship from Context Engine
    const relationship = this.context.determineContentRelationship();
    const attributionInfo = this.context.generateAttributionInfo();
    
    if (relationship?.type === 'canonical_attribution' && attributionInfo) {
      return {
        attributionRole: attributionInfo.ariaRole,
        ariaLabel: 'Content attribution information',
        ariaDescription: attributionInfo.text,
        
        // REQUIRED: Screen reader announcement
        attributionAnnouncement: {
          role: 'status',
          ariaLive: 'polite',
          content: `This content was ${attributionInfo.text} and is republished here with proper attribution`
        },
        
        // REQUIRED: Canonical link accessibility
        canonicalLinkARIA: {
          role: 'link',
          ariaLabel: `View original publication`,
          ariaDescription: 'Opens original source in new tab',
          target: '_blank',
          rel: 'canonical noopener'
        }
      };
    }
    
    return null;
  }
  
  // REQUIRED: Attribution component accessibility
  generateAttributionComponentARIA() {
    return {
      containerRole: 'complementary',
      containerAriaLabel: 'Content source attribution',
      
      // REQUIRED: Attribution notice accessibility
      noticeARIA: {
        role: 'note',
        ariaLabel: 'Original publication information',
        tabindex: '0', // Make focusable for keyboard navigation
        ariaDescribedby: 'attribution-details'
      },
      
      // REQUIRED: Link accessibility with cross-posting context
      linkARIA: {
        role: 'link',
        ariaLabel: 'Visit original publication',
        ariaDescription: 'Opens source article in new tab with proper attribution',
        target: '_blank',
        rel: 'canonical noopener noreferrer'
      }
    };
  }
}
```

### Target-Specific ARIA Patterns

```liquid
<!-- REQUIRED: Target-aware ARIA component integration -->
{% comment %} Universal Context Generation {% endcomment %}
{% include components/context-engine.html %}

{% comment %} Target-Aware ARIA Generation {% endcomment %}
{% assign aria_context = universal_context | aria_transform %}

<!-- REQUIRED: Repository-aware navigation ARIA -->
<nav role="navigation" 
     aria-label="{{ aria_context.repository.navigationRole }}"
     data-repository-context="{{ site.repository_context }}">
  
  {% comment %} Cross-repository navigation with accessibility {% endcomment %}
  {% if site.repository_context == "domain" %}
    <a href="{{ site.cross_repository_urls.blog }}"
       aria-label="Navigate to blog: Educational content and tutorials"
       aria-description="External navigation to blog repository">
      Blog
    </a>
  {% elsif site.repository_context == "blog" %}
    <a href="{{ site.cross_repository_urls.domain }}"
       aria-label="Navigate to portfolio: Project showcase and company information"
       aria-description="External navigation to main domain">
      Portfolio
    </a>
  {% endif %}
</nav>

<!-- REQUIRED: Target-specific content ARIA -->
<main role="main" 
      aria-label="{{ aria_context.content.mainRole }}"
      aria-describedby="content-description">
  
  {% comment %} Repository-specific content accessibility {% endcomment %}
  {% if site.target_type == "domain" %}
    <section role="region" 
             aria-labelledby="portfolio-heading"
             aria-describedby="portfolio-description">
      <h1 id="portfolio-heading">{{ page.title }}</h1>
      <p id="portfolio-description" class="sr-only">
        Portfolio project demonstrating {{ aria_context.technical.level }} level expertise
        in {{ aria_context.content.technologies | join: ", " }}
      </p>
    </section>
  {% elsif site.target_type == "blog" %}
    <article role="article" 
             aria-labelledby="article-heading"
             aria-describedby="article-meta">
      <h1 id="article-heading">{{ page.title }}</h1>
      <div id="article-meta" class="sr-only">
        {{ aria_context.content.readingTime }} tutorial for {{ aria_context.content.audience }}.
        Technical level: {{ aria_context.technical.level }}.
      </div>
    </article>
  {% endif %}
  
  {% comment %} Cross-posting attribution ARIA {% endcomment %}
  {% if page.canonical_url and page.primary_blog %}
    <aside role="note" 
           aria-label="Content attribution information"
           class="attribution-notice">
      <p>
        <span class="sr-only">Original publication notice:</span>
        Originally published on 
        <a href="{{ page.canonical_url }}"
           aria-label="View original publication on {{ page.primary_blog }}"
           aria-description="Opens original source in new tab"
           target="_blank"
           rel="canonical noopener">
          {{ page.primary_blog }}
        </a>
      </p>
    </aside>
  {% endif %}
</main>
```

### Build Mode ARIA Considerations

```yaml
# REQUIRED: ARIA behavior per build mode
aria_build_mode_config:
  local_mode:
    # REQUIRED: Development ARIA markers
    development_markers: true
    aria_debug_info: true
    localhost_navigation_hints: true
    
    # REQUIRED: Local development accessibility
    localhost_aria_patterns:
      navigation_base: "http://localhost"
      cross_repository_hints: "Local development navigation"
      debug_role_announcements: true
    
  production_mode:
    # REQUIRED: Production ARIA optimization
    optimized_aria: true
    minimal_debug_info: false
    cross_domain_navigation: true
    
    # REQUIRED: Production accessibility patterns
    production_aria_patterns:
      navigation_base: "https://"
      cross_repository_hints: "Navigate between related content"
      seo_optimized_labels: true
```

### Multi-Repository ARIA Coordination

```javascript
// REQUIRED: ARIA coordination across distributed repositories
class MultiRepositoryARIACoordinator {
  constructor(universalContext) {
    this.context = universalContext;
    this.crossRepositoryUrls = this.context.targetContext.crossRepositoryUrls;
  }
  
  // REQUIRED: Cross-repository ARIA consistency
  ensureARIAConsistency() {
    const ariaConsistency = {
      // REQUIRED: Consistent role patterns across repositories
      roleConsistency: this.validateRoleConsistency(),
      
      // REQUIRED: Cross-repository navigation accessibility
      navigationConsistency: this.validateNavigationARIA(),
      
      // REQUIRED: Landmark consistency
      landmarkConsistency: this.validateLandmarkARIA(),
      
      // REQUIRED: Content relationship accessibility
      relationshipARIA: this.generateRelationshipARIA()
    };
    
    return ariaConsistency;
  }
  
  // REQUIRED: Generate relationship ARIA for cross-repository content
  generateRelationshipARIA() {
    return {
      // REQUIRED: Content relationships
      usesProject: {
        role: 'complementary',
        ariaLabel: 'Related project information',
        ariaDescription: 'Content that references or showcases this project'
      },
      
      updatesProject: {
        role: 'complementary', 
        ariaLabel: 'Project update information',
        ariaDescription: 'Recent developments and changes to this project'
      },
      
      canonicalAttribution: {
        role: 'note',
        ariaLabel: 'Original source attribution',
        ariaDescription: 'Information about the original publication of this content'
      }
    };
  }
  
  // REQUIRED: Validate navigation ARIA across repositories
  validateNavigationARIA() {
    const navigationValidation = {};
    
    Object.entries(this.crossRepositoryUrls).forEach(([key, url]) => {
      navigationValidation[key] = {
        accessible: true,
        ariaCompliant: true,
        crossOriginSupport: url !== window.location.origin,
        keyboardNavigable: true,
        screenReaderFriendly: true
      };
    });
    
    return navigationValidation;
  }
}
```

## Sponsored Content and Intent-Based Accessibility

### Sponsor Disclosure ARIA

The system generates appropriate ARIA labels for sponsored content:

```javascript
class SponsorAccessibility {
  constructor(universalContext) {
    this.sponsor = universalContext.dynamicSignals?.sponsor;
    this.intent = universalContext.dynamicSignals?.intent;
  }
  
  generateSponsorARIA() {
    if (!this.sponsor?.isSponsored) return null;
    
    const disclosureMap = {
      'sponsored': `Sponsored content by ${this.sponsor.name}`,
      'affiliate': 'This content contains affiliate links',
      'partnership': `Content in partnership with ${this.sponsor.name}`
    };
    
    return {
      role: 'complementary',
      ariaLabel: disclosureMap[this.sponsor.disclosure] || `Sponsored by ${this.sponsor.name}`,
      ariaDescribedBy: 'sponsor-disclosure-details',
      ariaLive: 'polite'  // Announce to screen readers
    };
  }
}
```

### Intent-Based Component Labels

Components adapt their ARIA labels based on content intent:

```javascript
class IntentBasedARIA {
  generateCTALabels(buttonText, intent) {
    const intentMap = {
      'conversion': {
        prefix: 'Primary action',
        urgency: 'important',
        context: 'to connect with us'
      },
      'engagement': {
        prefix: 'Engage',
        urgency: 'interactive',
        context: 'to participate'
      },
      'trust-building': {
        prefix: 'Explore',
        urgency: 'informational',
        context: 'our expertise'
      },
      'awareness': {
        prefix: 'Learn more',
        urgency: 'standard',
        context: 'about this topic'
      }
    };
    
    const mapping = intentMap[intent] || intentMap['awareness'];
    
    return {
      ariaLabel: `${mapping.prefix}: ${buttonText} ${mapping.context}`,
      ariaPressed: false,
      ariaLive: mapping.urgency === 'important' ? 'assertive' : 'polite'
    };
  }
  
  generateNavigationARIA(variant) {
    const variantMap = {
      'sponsor': 'Sponsorship navigation',
      'docs': 'Documentation navigation',
      'project': 'Project navigation',
      'blog': 'Blog navigation',
      'domain': 'Main navigation'
    };
    
    return {
      ariaLabel: variantMap[variant] || 'Site navigation',
      role: 'navigation'
    };
  }
}
```

This **deterministic ARIA generation system** provides sophisticated accessibility without any AI dependency - using well-defined rules, pattern matching, and contextual analysis that can be implemented reliably across all components, with enhanced target-aware accessibility for multi-repository distributed serving architecture.

## Pure Transformation Architecture

**IMPORTANT**: This ARIA system is a **pure transformation layer** that:

1. **Receives** universal context from the Central Context Engine
2. **Transforms** context into WCAG 2.2 AA compliant accessibility markup
3. **Contains NO detection logic** - all detection happens in CONTEXT-DETECTION.md
4. **Uses pre-calculated data** from Context Engine for all file types, link types, and content analysis

All pattern detection, file type identification, and content analysis has been moved to the Central Context Engine. This system focuses purely on applying ARIA-specific transformation rules to pre-calculated context.
