# Jekyll Theme Implementation

This directory contains the implementation of the Universal Intelligence Component Library specified in `/Users/getharsh/GitHub/Website/getHarsh/docs/`.

## Directory Structure

```
jekyll/
├── _includes/          # Component templates
│   ├── atoms/         # 15 atomic components
│   ├── molecules/     # 24 molecule components  
│   ├── organisms/     # 18 organism components
│   └── components/    # Core systems (context engine)
├── _sass/             # SCSS architecture
│   ├── base/         # Reset, responsive, utilities
│   ├── components/   # Component styles
│   ├── theme-systems/# Visual themes
│   ├── typography/   # Typography systems
│   └── palettes/     # Color palettes
├── assets/           # Static assets
│   ├── css/         # Compiled CSS
│   └── js/          # JavaScript modules
│       ├── core/    # Context system, analytics
│       ├── components/ # Component behaviors
│       └── theme-systems/ # Theme enhancements
├── _layouts/         # Page layouts
├── _data/           # Data files
└── _config.yml      # Jekyll configuration
```

## Implementation Status

This is a **placeholder implementation** with the basic structure in place. Each component file contains:

- Component documentation
- Universal Intelligence integration points
- Basic HTML structure
- Placeholder for full implementation

## Next Steps

1. Implement the Context Engine core logic
2. Complete atomic component implementations
3. Build molecule components using atoms
4. Create organism components
5. Implement SCSS styles for all components
6. Add JavaScript behaviors
7. Test multi-domain builds

## Specifications

For complete specifications, see:
- Architecture: `/Users/getharsh/GitHub/Website/getHarsh/docs/ARCHITECTURE.md`
- Components: `/Users/getharsh/GitHub/Website/getHarsh/docs/COMPONENTS.md`
- Context Engine: `/Users/getharsh/GitHub/Website/getHarsh/docs/CONTEXT-ENGINE.md`

## Development

This theme is designed to be used by the getHarsh engine build system. It receives:
- Processed configuration from the engine
- Content paths via absolute paths
- Build mode (LOCAL/PRODUCTION)
- Target context (domain/blog/project)

The theme then generates static sites with Universal Intelligence features automatically applied.