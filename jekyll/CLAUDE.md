# CLAUDE.md - Jekyll Theme Subsystem

This file provides guidance for Claude Code when working with the Jekyll theme implementation.

## Quick Context

You are working in the Jekyll theme subsystem that implements the Universal Intelligence Component Library. This theme is part of the larger getHarsh engine ecosystem.

## Key Principles

1. **Universal Intelligence**: Every component automatically inherits analytics, SEO, ARIA, and AI discovery features through the Context Engine

2. **Zero Configuration**: Authors write simple includes, the system handles all complexity

3. **Multi-Domain Support**: Single codebase serves infinite variations through configuration

4. **Three-Layer Architecture**:
   - **Jekyll Layer**: HTML templates in `_includes/`
   - **SCSS Layer**: Styles in `_sass/`
   - **JavaScript Layer**: Behaviors in `assets/js/`

## Directory Structure

```
/Users/getharsh/GitHub/Website/getHarsh/jekyll/    # You are here
├── _includes/                                     # Component templates
│   ├── components/context-engine.html           # Core intelligence
│   ├── atoms/                                   # 15 atomic components
│   ├── molecules/                               # 24 molecules
│   └── organisms/                               # 18 organisms
└── ...
```

## Specifications Location

The complete specifications are in:
```
/Users/getharsh/GitHub/Website/getHarsh/docs/
├── README.md              # Navigation hub
├── ARCHITECTURE.md        # Technical architecture
├── COMPONENTS.md          # Component philosophy
├── COMPONENT-TABLE.md     # All 57 components listed
├── CONTEXT-ENGINE.md      # Central intelligence
└── ... (consumer systems)
```

## Current Implementation Status

**Placeholder Structure Created**:
- ✅ Directory structure
- ✅ Basic component templates (atoms, molecules, organisms)
- ✅ SCSS structure with sample theme/typography/palette
- ✅ JavaScript module structure
- ✅ Layout files
- ✅ Configuration files

**Not Yet Implemented**:
- ❌ Context Engine logic
- ❌ Full component implementations
- ❌ Complete SCSS styles
- ❌ JavaScript behaviors
- ❌ Build integration

## Component Implementation Pattern

When implementing components, follow this pattern:

```liquid
{%- comment -%}
  Component Name
  
  Universal Intelligence: [Inheritance path from COMPONENT-TABLE.md]
  
  Parameters:
  - param1: Description
  - param2: Description
  
  Context Integration:
  - What context it receives
  - How it adapts
{%- endcomment -%}

{%- include components/context-engine.html -%}
{%- assign context = universal_context -%}

<!-- Component HTML here -->
```

## Working with the Engine

This theme is designed to work with the getHarsh engine:

1. **Configuration**: Comes from processed configs in `build/configs/`
2. **Content**: Provided via absolute paths
3. **Output**: Generated to domain `site/` or `site_local/`
4. **Context**: Multi-dimensional (ecosystem → domain → blog/project)

## Next Implementation Steps

1. **Context Engine**: Implement the core logic in `_includes/components/context-engine.html`
2. **Atoms**: Complete the 15 atomic components
3. **Base Styles**: Implement `_sass/base/` files
4. **Component Styles**: Create styles for each component
5. **JavaScript**: Implement core systems and behaviors

## Important Notes

- This is a **subsystem** of the larger getHarsh engine
- It should be **path-agnostic** - all paths come from the engine
- Focus on **component intelligence** not configuration
- Maintain **clear separation** between layers
- Follow the **specifications exactly** from `/docs/`

## Testing

To test this theme:
1. The getHarsh engine will process configs
2. Run Jekyll build with processed configs
3. Verify Universal Intelligence features work
4. Test across multiple domains/themes/palettes

Remember: The magic is in the Universal Intelligence - every component should "just work" with zero configuration from the author's perspective!