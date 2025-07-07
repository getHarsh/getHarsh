# Theme System Architecture

## Overview

The Theme System provides visual styling for all components in the Universal Intelligence Component Library. Themes apply ONLY aesthetic properties - they NEVER define structure, layout, or typography. This strict separation ensures components work perfectly without themes and themes can be swapped without breaking functionality.

## Core Principles

### 1. Visual Properties Only

Themes are responsible for:
- **Colors**: backgrounds, borders, text colors
- **Effects**: shadows, blurs, filters, gradients
- **Borders**: styles, widths, radius
- **Transitions**: animations, transforms
- **Visual States**: hover, focus, active effects
- **Decorative Elements**: patterns, overlays

Themes NEVER define:
- ❌ Layout properties (display, position, flex, grid)
- ❌ Structural spacing (padding, margin for layout)
- ❌ Dimensions (width, height, except decorative)
- ❌ Typography (handled by typography system)
- ❌ Responsive behavior (handled by responsive system)

### 2. Component Independence

```scss
// ✅ CORRECT: Component works without theme
.btn {
  display: inline-flex;        // Structure
  align-items: center;         // Structure
  padding: var(--btn-padding); // Structure
  gap: var(--btn-gap);         // Structure
  cursor: pointer;             // Functionality
}

// ✅ CORRECT: Theme only adds visual enhancement
[data-theme="glass"] .btn {
  background: rgba(255, 255, 255, 0.1);  // Visual
  backdrop-filter: blur(12px);           // Visual
  border: 1px solid rgba(255, 255, 255, 0.2); // Visual
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);  // Visual
}

// ❌ WRONG: Theme defining structure
[data-theme="glass"] .btn {
  display: flex;        // ❌ Structure in theme!
  padding: 1rem 2rem;   // ❌ Structure in theme!
}
```

## Available Theme Systems

### 1. Retrofuture Glass

Combines 80s retrofuturism with modern glassmorphism:

```scss
// _sass/theme-systems/_retrofuture-glass.scss
[data-theme="retrofuture-glass"] {
  // Theme-specific CSS variables
  --glass-blur: 12px;
  --glass-opacity: 0.1;
  --neon-glow: 0 0 20px var(--color-primary);
  --grid-pattern: linear-gradient(rgba(255, 0, 255, 0.1) 1px, transparent 1px);
  
  // Apply to all components
  .component {
    background: rgba(var(--color-background-rgb), var(--glass-opacity));
    backdrop-filter: blur(var(--glass-blur));
    border: 1px solid rgba(var(--color-primary-rgb), 0.3);
    box-shadow: var(--neon-glow), inset 0 1px 0 rgba(255, 255, 255, 0.1);
    
    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: var(--grid-pattern);
      opacity: 0.05;
      pointer-events: none;
    }
  }
  
  // Component-specific visual enhancements
  .btn {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    
    &:hover {
      box-shadow: var(--neon-glow), 0 12px 48px rgba(var(--color-primary-rgb), 0.3);
      transform: translateY(-2px) scale(1.02);
    }
    
    &:active {
      transform: translateY(0) scale(0.98);
    }
  }
}
```

### 2. Pure Glass

Clean, modern glassmorphism without retro elements:

```scss
// _sass/theme-systems/_pure-glass.scss
[data-theme="pure-glass"] {
  --glass-blur: 16px;
  --glass-opacity: 0.08;
  --glass-border: rgba(255, 255, 255, 0.18);
  --glass-shadow: 0 8px 32px rgba(31, 38, 135, 0.15);
  
  .component {
    background: rgba(255, 255, 255, var(--glass-opacity));
    backdrop-filter: blur(var(--glass-blur));
    border: 1px solid var(--glass-border);
    box-shadow: var(--glass-shadow);
  }
}
```

### 3. Brutalist

Raw, bold aesthetic with strong contrasts:

```scss
// _sass/theme-systems/_brutalist.scss
[data-theme="brutalist"] {
  --brutal-border: 4px solid currentColor;
  --brutal-shadow: 8px 8px 0 currentColor;
  --brutal-hover-shadow: 12px 12px 0 currentColor;
  
  .component {
    background: var(--color-background);
    border: var(--brutal-border);
    box-shadow: var(--brutal-shadow);
    transition: box-shadow 0.2s ease-out;
    
    &:hover {
      box-shadow: var(--brutal-hover-shadow);
    }
  }
}
```

### 4. Minimal

Ultra-clean design with subtle enhancements:

```scss
// _sass/theme-systems/_minimal.scss
[data-theme="minimal"] {
  --minimal-border: 1px solid var(--color-border);
  --minimal-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  --minimal-radius: 4px;
  
  .component {
    background: var(--color-background);
    border: var(--minimal-border);
    border-radius: var(--minimal-radius);
    box-shadow: var(--minimal-shadow);
    
    &:hover {
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    }
  }
}
```

## Theme JavaScript Behaviors

Themes can include JavaScript for dynamic visual effects:

```javascript
// assets/js/theme-systems/retrofuture-glass.js
class RetrofutureGlassTheme {
  constructor() {
    this.initNeonGlow();
    this.initGlitchEffects();
    this.initHolographicShimmer();
  }
  
  initNeonGlow() {
    // Dynamic neon glow based on mouse proximity
    document.addEventListener('mousemove', (e) => {
      const elements = document.querySelectorAll('[data-neon-glow]');
      elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const distance = this.getDistance(e.clientX, e.clientY, rect);
        const intensity = Math.max(0, 1 - distance / 500);
        
        el.style.setProperty('--neon-intensity', intensity);
      });
    });
  }
  
  initGlitchEffects() {
    // Occasional glitch animations
    const glitchElements = document.querySelectorAll('[data-glitch]');
    glitchElements.forEach(el => {
      setInterval(() => {
        if (Math.random() > 0.95) {
          el.classList.add('glitch-active');
          setTimeout(() => el.classList.remove('glitch-active'), 200);
        }
      }, 3000);
    });
  }
}
```

## Theme CSS Variables

Themes communicate with components through CSS variables:

```scss
// Theme defines visual variables
[data-theme="glass"] {
  // Colors
  --theme-background: rgba(255, 255, 255, 0.1);
  --theme-border: rgba(255, 255, 255, 0.2);
  --theme-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  
  // Effects
  --theme-blur: 12px;
  --theme-radius: 16px;
  --theme-transition: all 0.3s ease;
}

// Components use theme variables
.component {
  // Structure (theme-independent)
  display: flex;
  padding: var(--component-padding);
  
  // Visual (from theme)
  background: var(--theme-background, transparent);
  border: 1px solid var(--theme-border, transparent);
  border-radius: var(--theme-radius, 0);
  box-shadow: var(--theme-shadow, none);
  transition: var(--theme-transition, none);
}
```

## Theme Selection & Configuration

Themes are selected in configuration:

```yaml
# ecosystem-defaults.yml
theme:
  system: "retrofuture-glass"  # Selected theme system
  
# Theme automatically applied to HTML
<html data-theme="retrofuture-glass">
```

## Creating New Themes

To create a new theme:

1. **Create SCSS file**: `_sass/theme-systems/_your-theme.scss`
2. **Define visual properties only**
3. **Use CSS variables for customization**
4. **Create JS file if needed**: `assets/js/theme-systems/your-theme.js`
5. **Test with ALL components**
6. **Ensure no structural CSS**

### Theme Template

```scss
// _sass/theme-systems/_your-theme.scss
[data-theme="your-theme"] {
  // Define theme variables
  --theme-primary-bg: ...;
  --theme-primary-border: ...;
  --theme-primary-shadow: ...;
  
  // Apply to base component class
  .component {
    background: var(--theme-primary-bg);
    border: 1px solid var(--theme-primary-border);
    box-shadow: var(--theme-primary-shadow);
    
    // State variations
    &:hover { ... }
    &:focus { ... }
    &:active { ... }
  }
  
  // Component-specific enhancements
  .btn { ... }
  .card { ... }
  .modal { ... }
}
```

## Theme Testing Checklist

Before approving a theme:

- [ ] Components work without the theme
- [ ] No structural CSS in theme files
- [ ] All visual properties use CSS variables
- [ ] Theme works with all color palettes
- [ ] Proper contrast ratios maintained
- [ ] Hover/focus states defined
- [ ] Performance impact acceptable
- [ ] No conflicts with typography system
- [ ] No conflicts with responsive system

## Common Theme Violations to Avoid

```scss
// ❌ NEVER do this in themes:
[data-theme="example"] {
  .btn {
    display: flex;           // ❌ Structure
    padding: 1rem 2rem;      // ❌ Structure
    margin: 0 auto;          // ❌ Structure
    width: 200px;            // ❌ Structure
    font-size: 18px;         // ❌ Typography
    font-weight: bold;       // ❌ Typography
    @media (max-width: 768px) { } // ❌ Responsive
  }
}

// ✅ ALWAYS do this in themes:
[data-theme="example"] {
  .btn {
    background: linear-gradient(...);  // ✅ Visual
    border: 2px solid ...;            // ✅ Visual
    border-radius: 8px;               // ✅ Visual
    box-shadow: ...;                  // ✅ Visual
    transition: all 0.3s;             // ✅ Visual
    
    &:hover {
      background: ...;                // ✅ Visual
      transform: scale(1.05);         // ✅ Visual
    }
  }
}
```

## Integration with Other Systems

- **Components**: Provide structure, themes enhance visually
- **Typography**: Handles all text properties, themes don't touch fonts
- **Responsive**: Handles breakpoints, themes remain consistent across sizes
- **Palettes**: Provide colors, themes use them via CSS variables

The theme system is a pure visual enhancement layer that makes components beautiful without compromising their functionality or independence.