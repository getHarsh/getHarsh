# Mermaid Diagram Component Specification

## Overview

The **Mermaid Diagram Component** renders Mermaid diagrams inline with theme-aware styling that inherits from the color palette. It supports all Mermaid diagram types with responsive scaling and touch-friendly interactions.

**Component Type**: Content Intelligence  
**Priority**: High  
**Lead Gen Focus**: Medium  
**Status**: Required

## Purpose

- Render Mermaid diagrams with theme integration
- Support all Mermaid diagram types (flowcharts, sequence, gantt, etc.)
- Provide responsive scaling for different viewports
- Enable touch-friendly pan/zoom on mobile
- Maintain diagram clarity across light/dark themes

## Component API

### Parameters

```liquid
{% include components/mermaid-diagram.html 
   content="graph TD
   A[Start] --> B[Process]
   B --> C[End]"
   title="Process Flow Diagram"
   id="process-flow"
%}
```

#### Required Parameters
- `content` - The Mermaid diagram definition

#### Optional Parameters
- `title` - Diagram title for accessibility
- `id` - Unique identifier for the diagram
- `class` - Additional CSS classes
- `caption` - Caption text below diagram

## Implementation

### Jekyll Template
```liquid
<!-- _includes/components/mermaid-diagram.html -->
{% include components/context-engine.html %}

{% comment %} Generate unique ID if not provided {% endcomment %}
{% assign diagram_id = include.id | default: 'mermaid-' | append: site.time | slugify %}

<figure class="mermaid-diagram {{ include.class }}"
        data-component="mermaid-diagram"
        role="img"
        {% if include.title %}aria-label="{{ include.title }}"{% endif %}>
  
  <div class="mermaid-diagram__container" id="{{ diagram_id }}">
    <div class="mermaid" data-theme-aware="true">
{{ include.content }}
    </div>
  </div>
  
  {% if include.caption %}
    <figcaption class="mermaid-diagram__caption">
      {{ include.caption }}
    </figcaption>
  {% endif %}
  
  {% comment %} Fallback for no-JS {% endcomment %}
  <noscript>
    <div class="mermaid-diagram__fallback">
      <p>This diagram requires JavaScript to render. Content:</p>
      <pre><code>{{ include.content | xml_escape }}</code></pre>
    </div>
  </noscript>
</figure>
```

### SCSS Styles
```scss
// _sass/components/_mermaid-diagram.scss
.mermaid-diagram {
  margin: var(--space-lg) 0;
  
  &__container {
    position: relative;
    overflow: auto;
    -webkit-overflow-scrolling: touch; // Smooth scrolling on iOS
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    padding: var(--space-md);
    
    // Theme-aware diagram colors
    [data-theme="light"] & {
      --mermaid-background: var(--color-background);
      --mermaid-primary: var(--color-primary);
      --mermaid-secondary: var(--color-secondary);
      --mermaid-tertiary: var(--color-tertiary);
      --mermaid-text: var(--color-text);
      --mermaid-line: var(--color-border);
    }
    
    [data-theme="dark"] & {
      --mermaid-background: var(--color-surface);
      --mermaid-primary: var(--color-primary-dark);
      --mermaid-secondary: var(--color-secondary-dark);
      --mermaid-tertiary: var(--color-tertiary-dark);
      --mermaid-text: var(--color-text);
      --mermaid-line: var(--color-border);
    }
  }
  
  // Mermaid content styling
  .mermaid {
    text-align: center;
    
    // Override Mermaid defaults with theme colors
    .node rect,
    .node circle,
    .node ellipse,
    .node polygon {
      fill: var(--mermaid-primary) !important;
      stroke: var(--mermaid-line) !important;
    }
    
    .node text {
      fill: var(--mermaid-text) !important;
    }
    
    .edgePath .path {
      stroke: var(--mermaid-line) !important;
    }
    
    .cluster rect {
      fill: var(--mermaid-secondary) !important;
      stroke: var(--mermaid-line) !important;
    }
  }
  
  &__caption {
    margin-top: var(--space-sm);
    font-size: var(--text-sm);
    color: var(--color-text-subtle);
    text-align: center;
  }
  
  &__fallback {
    padding: var(--space-md);
    background: var(--color-surface-subtle);
    border-radius: var(--radius-sm);
    
    pre {
      overflow-x: auto;
      font-size: var(--text-xs);
    }
  }
  
  // Responsive scaling
  @include desktop {
    .mermaid {
      transform: scale(1);
    }
  }
  
  @include tablet {
    .mermaid {
      transform: scale(0.85);
      transform-origin: center;
    }
  }
  
  @include mobile {
    .mermaid {
      transform: scale(0.7);
      transform-origin: center;
    }
    
    &__container {
      // Enable horizontal scroll on mobile
      overflow-x: auto;
      overflow-y: hidden;
    }
  }
}
```

### JavaScript Enhancement
```javascript
// assets/js/components/mermaid-diagram.js
class MermaidDiagram extends ComponentSystem.Component {
  static selector = '[data-component="mermaid-diagram"]';
  
  constructor(element, universalContext) {
    super(element, universalContext);
    this.container = element.querySelector('.mermaid-diagram__container');
    this.mermaidElement = element.querySelector('.mermaid');
    this.initializeMermaid();
  }
  
  async initializeMermaid() {
    // Wait for Mermaid library to load
    if (typeof mermaid === 'undefined') {
      console.warn('Mermaid library not loaded');
      return;
    }
    
    // Configure Mermaid with theme colors
    const theme = this.getThemeConfig();
    
    mermaid.initialize({
      startOnLoad: false,
      theme: 'base',
      themeVariables: theme,
      flowchart: {
        useMaxWidth: true,
        htmlLabels: true,
        curve: 'basis'
      },
      securityLevel: 'loose'
    });
    
    // Render the diagram
    try {
      const graphDefinition = this.mermaidElement.textContent.trim();
      const { svg } = await mermaid.render(
        `mermaid-${Date.now()}`,
        graphDefinition
      );
      
      this.mermaidElement.innerHTML = svg;
      this.enablePanZoom();
      this.trackDiagramView();
      
    } catch (error) {
      console.error('Mermaid rendering failed:', error);
      this.showFallback();
    }
  }
  
  getThemeConfig() {
    const computedStyle = getComputedStyle(this.container);
    
    return {
      primaryColor: computedStyle.getPropertyValue('--mermaid-primary'),
      primaryTextColor: computedStyle.getPropertyValue('--mermaid-text'),
      primaryBorderColor: computedStyle.getPropertyValue('--mermaid-line'),
      lineColor: computedStyle.getPropertyValue('--mermaid-line'),
      secondaryColor: computedStyle.getPropertyValue('--mermaid-secondary'),
      tertiaryColor: computedStyle.getPropertyValue('--mermaid-tertiary'),
      background: computedStyle.getPropertyValue('--mermaid-background'),
      mainBkg: computedStyle.getPropertyValue('--mermaid-primary'),
      secondBkg: computedStyle.getPropertyValue('--mermaid-secondary'),
      tertiaryBkg: computedStyle.getPropertyValue('--mermaid-tertiary'),
      lineColor: computedStyle.getPropertyValue('--mermaid-line'),
      border1: computedStyle.getPropertyValue('--mermaid-line'),
      border2: computedStyle.getPropertyValue('--mermaid-line'),
      fontFamily: computedStyle.getPropertyValue('--font-family-base'),
      fontSize: '16px'
    };
  }
  
  enablePanZoom() {
    // Enable touch pan/zoom on mobile
    if ('ontouchstart' in window) {
      let startX, startY, scrollLeft, scrollTop;
      
      this.container.addEventListener('touchstart', (e) => {
        startX = e.touches[0].pageX - this.container.offsetLeft;
        startY = e.touches[0].pageY - this.container.offsetTop;
        scrollLeft = this.container.scrollLeft;
        scrollTop = this.container.scrollTop;
      });
      
      this.container.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const x = e.touches[0].pageX - this.container.offsetLeft;
        const y = e.touches[0].pageY - this.container.offsetTop;
        const walkX = (x - startX) * 2;
        const walkY = (y - startY) * 2;
        this.container.scrollLeft = scrollLeft - walkX;
        this.container.scrollTop = scrollTop - walkY;
      });
    }
  }
  
  trackDiagramView() {
    if (!this.context.technical.consent.analyticsConsent) return;
    
    this.analytics.trackEvent('mermaid_diagram_view', {
      event_category: 'engagement',
      event_action: 'diagram_rendered',
      diagram_type: this.detectDiagramType(),
      content_intent: this.context.dynamicSignals?.intent?.contentIntent
    });
  }
  
  detectDiagramType() {
    const content = this.mermaidElement.textContent;
    if (content.includes('graph')) return 'flowchart';
    if (content.includes('sequenceDiagram')) return 'sequence';
    if (content.includes('gantt')) return 'gantt';
    if (content.includes('classDiagram')) return 'class';
    if (content.includes('stateDiagram')) return 'state';
    if (content.includes('pie')) return 'pie';
    return 'unknown';
  }
  
  showFallback() {
    this.mermaidElement.innerHTML = `
      <div class="mermaid-diagram__error">
        <p>Unable to render diagram. View source:</p>
        <pre><code>${this.mermaidElement.textContent}</code></pre>
      </div>
    `;
  }
}

ComponentSystem.register(MermaidDiagram);
```

## Supported Diagram Types

1. **Flowcharts**
   ```
   graph TD
   A[Start] --> B{Decision}
   B -->|Yes| C[Process]
   B -->|No| D[End]
   ```

2. **Sequence Diagrams**
   ```
   sequenceDiagram
   Client->>Server: Request
   Server-->>Client: Response
   ```

3. **Gantt Charts**
   ```
   gantt
   title Project Timeline
   section Phase 1
   Task 1: 2024-01-01, 30d
   Task 2: 30d
   ```

4. **Class Diagrams**
   ```
   classDiagram
   class Component {
     +render()
     +update()
   }
   ```

## Theme Integration

The component automatically adapts to the current theme:

- **Light Theme**: Uses lighter colors from palette
- **Dark Theme**: Uses darker variants from palette
- **Glassmorphism**: Adds transparency effects
- **Neubrutalism**: Uses bold colors and borders

## Accessibility

- Diagrams have role="img" for screen readers
- Title provided via aria-label
- Fallback content for no-JS scenarios
- Keyboard navigable container
- High contrast mode support

## Performance

- Lazy loads Mermaid library
- Renders on intersection (visible in viewport)
- SVG output for crisp scaling
- Minimal re-renders on theme change

## Analytics

Tracks:
- Diagram views by type
- Rendering success/failure
- User interactions (pan/zoom)
- Time spent viewing

## Related Components

- [CODE-BLOCK.md](./CODE-BLOCK.md) - For code snippets
- `table.html` - For tabular data
- `image.html` - For static diagrams

## Implementation Status

- [ ] Jekyll template created
- [ ] SCSS styles implemented
- [ ] JavaScript enhancement added
- [ ] Theme integration complete
- [ ] Touch interactions enabled
- [ ] Documentation complete
- [ ] Tests written
- [ ] Accessibility audit passed