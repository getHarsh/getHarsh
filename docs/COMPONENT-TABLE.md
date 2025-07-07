# Component Library Specification Table

## Overview

This document provides the complete specification table for all components in the Universal Intelligence Component Library. Each component follows the atomic design pattern (Atoms → Molecules → Organisms) and integrates with the [Central Context Engine](./CONTEXT-ENGINE.md) for intelligent adaptation.

> **Architecture Details**: See [COMPONENTS.md](./COMPONENTS.md) for the Universal Intelligence philosophy and [ATOMS.md](./COMPONENTS/ATOMS.md), [MOLECULES.md](./COMPONENTS/MOLECULES.md), [ORGANISMS.md](./COMPONENTS/ORGANISMS.md) for atomic design patterns.

## Component Structure

All components follow this hierarchy:
- **Atoms**: Single-purpose, indivisible elements
- **Molecules**: Simple groups of atoms functioning as a unit
- **Organisms**: Complex UI sections composed of molecules/atoms

## Component Specifications

### Atoms (15 components)

The fundamental building blocks that cannot be broken down further:

| Component | Variants | Inheritance Path | Spec Path | Context Integration | Status |
|-----------|----------|------------------|-----------|---------------------|--------|
| **Text** | body, small, large, caption, code | Context → Responsive → Theme → Text | [TEXT.md](./ATOMS/TEXT.md) | Semantic level, reading level, font scaling | Active |
| **Heading** | H1-H6, visual override | Context → SEO/ARIA → Theme → Heading | [HEADING.md](./ATOMS/HEADING.md) | Document outline, anchor generation, SEO data | Active |
| **Icon** | xs, sm, md, lg, xl + all icon names | Context → Performance → Theme → Icon | [ICON.md](./ATOMS/ICON.md) | Icon style, sprite loading, contrast mode | Active |
| **Image** | Responsive srcset, aspect ratios | Context → Performance → Theme → Image | [IMAGE.md](./ATOMS/IMAGE.md) | Loading strategy, network adaptation, WebP | Active |
| **Link** | Internal, external, download | Context → ARIA → Theme → Link | — | Receives link type and active state from Context | Planned |
| **Chip** | project, tag, domain | Context → Theme → Chip | — | Receives chip type and URL from Context | Planned |
| **Separator** | horizontal, vertical | Context → Theme → Separator | — | Decorative vs semantic | Planned |
| **Spacer** | xs, sm, md, lg, xl | Context → Responsive → Spacer | — | Responsive scaling | Planned |
| **Code** | Inline only | Context → Theme → Code | — | Receives language info from Context | Planned |
| **Math** | Inline LaTeX/KaTeX | Context → Theme → Math | — | Math rendering engine | Planned |
| **Quote** | Inline quotes | Context → ARIA → Theme → Quote | — | Citation handling | Planned |
| **List Item** | ordered, unordered | Context → Theme → List Item | — | Nesting level, marker style | Planned |
| **Table Cell** | th, td | Context → ARIA → Theme → Table Cell | — | Header association, scope | Planned |
| **Audio Control** | play, pause, seek | Context → ARIA → Theme → Audio Control | — | Audio state management | Planned |
| **Video Control** | play, pause, seek, fullscreen | Context → ARIA → Theme → Video Control | — | Video state management | Future |

### Molecules (24 components)

Simple combinations of atoms that form reusable patterns:

| Component | Variants | Inheritance Path | Spec Path | Context Integration | Status |
|-----------|----------|------------------|-----------|---------------------|--------|
| **Button** | primary, secondary, danger, ghost, link | Context → Analytics/ARIA → Theme → Button | [BUTTON.md](./MOLECULES/BUTTON.md) | Intent-based styling, lead scoring, journey stage | Active |
| **Navigation Link** | icon/badge/active states | Context → ARIA → Theme → Nav Link | — | Receives active state and journey section from Context | Planned |
| **Social Link** | All social platforms | Context → Theme → Social Base → Social Link | — | Receives platform type from Context | Planned |
| **Social Share Button** | twitter, linkedin, facebook, email | Context → Analytics → Theme → Share Button | — | Share URL generation, engagement tracking | Planned |
| **Social Discuss Link** | github, twitter, linkedin, reddit | Context → Theme → Social Base → Discuss Link | — | Platform icon from URL pattern | Planned |
| **Smart Link** | Internal, external, ecosystem, project | Context → SEO/Analytics → Theme → Smart Link | [SMART-LINK.md](./MOLECULES/SMART-LINK.md) | Receives link type and ecosystem status from Context | Active |
| **Code Block** | Multiple languages, line numbers | Context → Performance → Theme → Code Block | — | Receives language and highlighting rules from Context | Planned |
| **Mermaid Diagram** | flowchart, sequence, gantt, etc | Context → Theme → Mermaid | [MERMAID-DIAGRAM.md](./MOLECULES/MERMAID-DIAGRAM.md) | Theme palette injection | Active |
| **Math Block** | Display LaTeX/KaTeX | Context → Theme → Math Block | — | Math rendering, theme colors | Planned |
| **Table Row** | Header, data, striped | Context → ARIA → Theme → Table Row | — | First row accent, responsive | Planned |
| **List** | ordered, unordered, nested | Context → Theme → List | — | List type and nesting level | Planned |
| **Footnote** | Numbered with backlinks | Context → ARIA → Theme → Footnote | — | Auto-numbering, accessibility | Planned |
| **Audio Player** | Google Drive, local files | Context → ARIA → Theme → Audio Player | [AUDIO-PLAYER.md](./MOLECULES/AUDIO-PLAYER.md) | Google Drive integration, controls | Active |
| **Quirky Message** | 404, 403, 500, empty states | Context → Theme → Quirky Message | — | Error-specific personality | Planned |
| **Project Chip** | With icon, clickable | Context → Theme → Chip → Project Chip | — | Project data, link generation | Planned |
| **Domain Chip** | Canonical indicator | Context → Theme → Chip → Domain Chip | — | Cross-posting detection | Planned |
| **Empty State** | No posts, no results, etc | Context → Theme → Empty State | — | Context-specific messaging | Planned |
| **CTA Button** | High/medium/low priority | Context → Analytics → Theme → Button → CTA | — | Conversion tracking, A/B testing | Planned |
| **Consent Toggle** | Analytics, marketing, etc | Context → Legal → Theme → Toggle | — | Consent state management | Planned |
| **Theme Toggle** | Light/dark/auto | Context → Theme → Toggle | — | Theme persistence, transition | Planned |
| **Sponsor Option** | PayPal, GitHub, YouTube | Context → Theme → Sponsor Option | — | Platform availability from config | Planned |
| **Metadata Item** | Date, author, reading time | Context → Responsive → Theme → Metadata | — | Progressive disclosure | Planned |
| **TOC Item** | Active tracking, nested | Context → ARIA → Theme → TOC Item | — | Scroll position tracking | Planned |
| **Social Embed** | Twitter, LinkedIn, YouTube, GitHub | Context → Privacy → Theme → Social Embed | [SOCIAL-EMBED.md](./MOLECULES/SOCIAL-EMBED.md) | Receives platform type and privacy settings from Context | Active |

### Organisms (18 components)

Complete UI sections that form meaningful parts of the interface:

| Component | Variants | Inheritance Path | Spec Path | Context Integration | Status |
|-----------|----------|------------------|-----------|---------------------|--------|
| **Site Header** | domain, blog, project, docs, sponsor | Context → Analytics/ARIA → Theme → Header | [SITE-HEADER.md](./ORGANISMS/SITE-HEADER.md) | Repository context detection, navigation items | Active |
| **Site Footer** | Universal with context adaptations | Context → Legal/Analytics → Theme → Footer | [SITE-FOOTER.md](./ORGANISMS/SITE-FOOTER.md) | Entity data, ecosystem links, newsletter | Active |
| **Article Header** | Mobile minimal, desktop full | Context → Responsive/SEO → Theme → Article Header | — | Progressive disclosure, metadata | Planned |
| **Article Body** | Standard, technical, narrative | Context → Content → Theme → Article Body | — | Content processing, enhancement | Planned |
| **Article Navigation** | Mobile (3 buttons), Desktop (6 buttons) | Context → Responsive → Theme → Article Nav | — | Smart prev/next, button selection | Planned |
| **Social Links** | Contact page, footer | Context → Theme → Social Links | [SOCIAL-LINKS.md](./ORGANISMS/SOCIAL-LINKS.md) | Platform list from config | Active |
| **Social Share** | Desktop sidebar, mobile bottom | Context → Analytics/Responsive → Theme → Social Share | [SOCIAL-SHARE.md](./ORGANISMS/SOCIAL-SHARE.md) | Position by viewport, engagement tracking | Active |
| **Social Discuss** | Mobile hidden, tablet/desktop shown | Context → Responsive → Theme → Social Discuss | [SOCIAL-DISCUSS.md](./ORGANISMS/SOCIAL-DISCUSS.md) | Platform availability from frontmatter | Active |
| **Article Grid** | Latest articles, index pages | Context → Responsive → Theme → Article Grid | — | CSS Grid areas, responsive columns | Planned |
| **Latest Article** | Homepage feature | Context → Content → Theme → Latest Article | — | Latest post data, responsive layout | Planned |
| **Index List** | Blog index, category pages | Context → Content → Theme → Index List | — | Pagination, filtering, sorting | Planned |
| **Project Card** | Projects page showcase | Context → Content → Theme → Project Card | — | Project data, tech stack display | Planned |
| **Sponsor Grid** | 3 columns desktop, 1 mobile | Context → Responsive → Theme → Sponsor Grid | — | PayPal, GitHub Sponsors, Content | Planned |
| **Google Appointment** | Full widget desktop, link mobile | Context → Responsive → Theme → Google Appointment | — | Calendar integration, responsive behavior | Planned |
| **Visualization Background** | Dynamic (hero), Subtle (content) | Context → Performance → Theme → Visualization | — | Animation type by page context | Planned |
| **Table of Contents** | Desktop sidebar, mobile hidden | Context → Responsive/ARIA → Theme → TOC | — | Heading extraction, scroll spy | Planned |
| **Consent Banner** | GDPR required regions | Context → Legal → Theme → Consent Banner | — | Consent categories, persistence | Planned |

## Context Engine Integration

All components receive universal context that includes:

```javascript
{
  // Page Context
  page: {
    type: 'domain|blog|project|docs|sponsor',
    variant: 'index|about|contact|article|error',
    content_intent: 'awareness|engagement|conversion|trust',
    frontmatter: { /* all page data */ }
  },
  
  // Responsive Context
  viewport: {
    size: 'mobile|tablet|desktop|large',
    orientation: 'portrait|landscape',
    touch: boolean
  },
  
  // Theme Context
  theme: {
    mode: 'light|dark',
    palette: { /* color system */ },
    typography: { /* font system */ }
  },
  
  // Business Context
  ecosystem: {
    domains: [],
    current_domain: {},
    cross_posted: boolean
  },
  
  // Technical Context
  performance: {
    mode: 'economy|balanced|quality',
    consent: { /* privacy states */ }
  }
}
```

## Component Behavior Patterns

### Responsive Behavior
- **Mobile First**: Base styles for mobile, enhance for larger screens
- **Progressive Disclosure**: Show more information as viewport increases
- **Touch Friendly**: Minimum 44px touch targets on mobile

### Intent-Based Adaptation
- **Awareness**: Minimal, clean, focus on content
- **Engagement**: Interactive elements, sharing encouraged
- **Conversion**: Prominent CTAs, lead capture focus
- **Trust**: Authority indicators, social proof visible

### Semantic HTML
- All components use proper HTML5 elements
- ARIA labels and roles built into every component
- Keyboard navigation support throughout

## Implementation Status

- **Active**: Component fully implemented and tested
- **Future**: Planned for future implementation
- **Review**: Under review for inclusion

## File Organization

```
_includes/
├── atoms/                 # Single-purpose elements
├── molecules/            # Simple combinations
├── organisms/            # Complete sections
└── components/           # Context Engine and utilities
    └── context-engine.html
```

## Usage Examples

### Simple Atom
```liquid
{% include atoms/heading.html 
   text="Welcome to getHarsh" 
   level=1 %}
```

### Context-Aware Molecule
```liquid
{% include molecules/button.html 
   text="Get Started" 
   icon="arrow-right" %}
<!-- Automatically styled based on page intent -->
```

### Adaptive Organism
```liquid
{% include organisms/header.html %}
<!-- Automatically renders correct variant based on context -->
```

## Key Principles

1. **Context-Driven**: Components adapt based on universal context
2. **Atomic Design**: Clear hierarchy from atoms to organisms
3. **DRY**: No duplication - one source of truth
4. **SOLID**: Each component has single responsibility
5. **Progressive Enhancement**: Mobile-first, enhance for larger screens
6. **Accessibility First**: WCAG 2.2 AA compliance built-in
7. **Performance Optimized**: Lazy loading, efficient rendering
8. **Theme Aware**: Automatic adaptation to theme changes

> All components follow the Universal Intelligence patterns defined in [COMPONENTS.md](./COMPONENTS.md)