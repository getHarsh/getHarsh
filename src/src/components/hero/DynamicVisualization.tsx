/**
 * @fileoverview DynamicVisualization - Animated background visualization component
 * @module components/hero/DynamicVisualization
 * 
 * @description
 * An animated background visualization component that creates a retrofuturistic
 * atmosphere with gradient orbs, grid patterns, and animated lines. Provides
 * visual depth and movement to hero sections and landing pages.
 * 
 * @architecture
 * ```
 * ┌──────────────────────────────────────────────────────────┐
 * │           DynamicVisualization Architecture               │
 * ├──────────────────────────────────────────────────────────┤
 * │                                                          │
 * │  Variant Selection                                      │
 * │  ┌──────────────────────────────────────────────────┐   │
 * │  │  variant: 'prominent' | 'subtle' | 'full' |     │   │
 * │  │          'moderate' | 'error'                   │   │
 * │  │                ▼                                 │   │
 * │  │  ┌────────────────────────────────────────┐     │   │
 * │  │  │ full:      opacity-100 (100%)         │     │   │
 * │  │  │ prominent: opacity-50  (50% - default)│     │   │
 * │  │  │ moderate:  opacity-40  (40%)          │     │   │
 * │  │  │ subtle:    opacity-30  (30%)          │     │   │
 * │  │  │ error:     opacity-20  (20%)          │     │   │
 * │  │  └────────────────────────────────────────┘     │   │
 * │  └──────────────────────────────────────────────────┘   │
 * │                        ▼                                 │
 * │  Layer Composition                                      │
 * │  ┌──────────────────────────────────────────────────┐   │
 * │  │  Layer 1: Grid Pattern                         │   │
 * │  │  ┌──────────────────────────────────────────┐   │   │
 * │  │  │  .grid-pattern with animate-pulse        │   │   │
 * │  │  │  Creates base texture and rhythm         │   │   │
 * │  │  └──────────────────────────────────────────┘   │   │
 * │  │                                                  │   │
 * │  │  Layer 2: Gradient Orbs                        │   │
 * │  │  ┌──────────────────────────────────────────┐   │   │
 * │  │  │  Orb 1: top-left, primary, float         │   │   │
 * │  │  │  Orb 2: bottom-right, secondary, float   │   │   │
 * │  │  │  Orb 3: center, gradient, glow-pulse     │   │   │
 * │  │  └──────────────────────────────────────────┘   │   │
 * │  │                                                  │   │
 * │  │  Layer 3: SVG Lines                            │   │
 * │  │  ┌──────────────────────────────────────────┐   │   │
 * │  │  │  5 diagonal lines with gradient stroke    │   │   │
 * │  │  │  Staggered shimmer animation delays       │   │   │
 * │  │  │  Linear gradient from primary to secondary│   │   │
 * │  │  └──────────────────────────────────────────┘   │   │
 * │  └──────────────────────────────────────────────────┘   │
 * │                        ▼                                 │
 * │  Animation Timeline                                     │
 * │  ┌──────────────────────────────────────────────────┐   │
 * │  │  Time  | Animation                              │   │
 * │  │  ------|---------------------------------------  │   │
 * │  │  0s    | Grid pulse, Orb1 float, Line1 shimmer  │   │
 * │  │  0.5s  | Line2 shimmer starts                   │   │
 * │  │  1.0s  | Line3 shimmer starts                   │   │
 * │  │  1.5s  | Line4 shimmer starts                   │   │
 * │  │  2.0s  | Orb2 float starts, Line5 shimmer       │   │
 * │  │  ∞     | All animations loop                    │   │
 * │  └──────────────────────────────────────────────────┘   │
 * │                                                          │
 * └──────────────────────────────────────────────────────────┘
 * ```
 * 
 * @proto-integration
 * Maps to protobuf configurations:
 * - `config/proto/ui/visualization_config.proto` - Visualization settings
 * - `config/proto/design/animation_library.proto` - Animation definitions
 * - `config/proto/design/gradient_system.proto` - Gradient specifications
 * - `config/proto/ui/background_effects.proto` - Background effect types
 * 
 * @hook-integration
 * None - Pure CSS animations, no state management
 * 
 * @ecosystem-integration
 * - Used by: HeroSection, landing pages, error pages
 * - Data flow: Static visualization with CSS animations
 * - Performance: GPU-accelerated transforms
 * - Theme: Uses CSS custom properties for colors
 * - Variants: 5 opacity levels for different use cases
 * 
 * @features
 * - 🎨 Multi-layer visual composition
 * - ✨ GPU-accelerated animations
 * - 🌊 Fluid motion with staggered timing
 * - 🎭 5 opacity variants for context
 * - 📐 SVG-based geometric elements
 * - 🌈 Dynamic gradient effects
 * - 🕹️ Retrofuturistic aesthetic
 * - 📱 Responsive scaling
 * 
 * @visual-specifications
 * ```
 * Element     | Size        | Animation      | Duration | Delay
 * ------------|-------------|----------------|----------|--------
 * Grid        | Full screen | pulse          | 2s       | 0s
 * Orb 1       | 384x384px   | float          | 10s      | 0s
 * Orb 2       | 384x384px   | float          | 10s      | 2s
 * Orb 3       | 600x600px   | glow-pulse     | 3s       | 0s
 * Line [1-5]  | Diagonal    | shimmer        | 5s       | i*0.5s
 * ```
 * 
 * @animation-specifications
 * - **float**: translateY(-20px) → translateY(20px) → translateY(-20px)
 * - **pulse**: opacity(0.5) → opacity(1) → opacity(0.5)
 * - **glow-pulse**: scale(0.95) + opacity → scale(1.05) + opacity
 * - **shimmer**: strokeDashoffset animation for line reveal
 * 
 * @performance
 * - GPU acceleration via transform and opacity
 * - Blur optimization with large radius (blur-3xl)
 * - SVG preserveAspectRatio="none" for efficiency
 * - Staggered animations reduce simultaneous calculations
 * - Fixed positioning prevents reflow
 * 
 * @accessibility
 * - Decorative element with no semantic content
 * - Respects prefers-reduced-motion
 * - Low contrast for background positioning
 * - No interactive elements
 * 
 * @dos
 * - ✅ Use appropriate variant for context
 * - ✅ Place behind main content (z-index)
 * - ✅ Test performance on lower-end devices
 * - ✅ Ensure text contrast over visualization
 * - ✅ Use subtle variant for content-heavy pages
 * 
 * @donts
 * - ❌ Don't use full opacity with light backgrounds
 * - ❌ Don't stack multiple visualizations
 * - ❌ Don't use on pages with complex animations
 * - ❌ Don't forget to set proper z-index
 * - ❌ Don't use error variant for non-error states
 * 
 * @example
 * ```tsx
 * // Prominent hero visualization
 * <div className="relative">
 *   <DynamicVisualization variant="prominent" />
 *   <HeroContent className="relative z-10" />
 * </div>
 * 
 * // Subtle page background
 * <DynamicVisualization variant="subtle" className="z-0" />
 * 
 * // Error page atmosphere
 * <DynamicVisualization variant="error" />
 * 
 * // Full intensity for splash screens
 * <DynamicVisualization variant="full" />
 * 
 * // Complete hero integration
 * const LandingPage = () => (
 *   <div className="min-h-screen relative overflow-hidden">
 *     <DynamicVisualization 
 *       variant={isDarkMode ? "prominent" : "subtle"}
 *       className="pointer-events-none"
 *     />
 *     <main className="relative z-10">
 *       <HeroSection />
 *       <Features />
 *     </main>
 *   </div>
 * )
 * ```
 * 
 * @see {@link ./HeroSection.tsx} - Primary consumer
 * @see {@link ../../../USE-CASE.md#visual-effects} - Visual effect specifications
 * @see {@link ../../styles/animations.css} - Animation definitions
 * @see {@link ../../../BUILD.md#performance} - Performance optimization
 * @see {@link ../../../README.md#design-system} - Design system overview
 * 
 * @since 1.0.0
 */

import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * @interface DynamicVisualizationProps
 * @description Props for DynamicVisualization component with opacity variants
 * 
 * @property {'prominent' | 'subtle' | 'full' | 'moderate' | 'error'} [variant='prominent'] - Opacity level variant
 * @property {string} [className] - Additional CSS classes for positioning
 */
interface DynamicVisualizationProps {
  /** Opacity variant for the visualization */
  variant?: "prominent" | "subtle" | "full" | "moderate" | "error"
  /** Additional CSS classes */
  className?: string
}

/**
 * DynamicVisualization component - Animated background effects
 * 
 * @component
 * @param {DynamicVisualizationProps} props - Component props
 * @param {'prominent' | 'subtle' | 'full' | 'moderate' | 'error'} [props.variant='prominent'] - Opacity level
 * @param {string} [props.className] - Additional CSS classes
 * 
 * @returns {JSX.Element} Multi-layer animated background visualization
 * 
 * @example
 * ```tsx
 * // Hero section with prominent visualization
 * <section className="relative">
 *   <DynamicVisualization variant="prominent" />
 *   <div className="relative z-10 p-16">
 *     <h1>Welcome</h1>
 *   </div>
 * </section>
 * ```
 */
export const DynamicVisualization: React.FC<DynamicVisualizationProps> = ({ 
  variant = "prominent",
  className 
}) => {
  // Map variants to opacity levels
  const getOpacity = () => {
    switch(variant) {
      case "full": return "opacity-100"
      case "prominent": return "opacity-50"
      case "moderate": return "opacity-40"
      case "subtle": return "opacity-30"
      case "error": return "opacity-20"
      default: return "opacity-50"
    }
  }
  
  return (
    <div className={cn(
      "fixed inset-0 overflow-hidden",
      getOpacity(),
      className
    )}>
      {/* Animated grid pattern */}
      <div className="absolute inset-0 grid-pattern animate-pulse" />
      
      {/* Gradient orbs */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-primary rounded-full blur-3xl opacity-20 animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-secondary rounded-full blur-3xl opacity-20 animate-float" 
          style={{ animationDelay: "2s" }} 
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full blur-3xl opacity-10 animate-glow-pulse" />
      </div>
      
      {/* Retrofuturistic lines */}
      <svg 
        className="absolute inset-0 w-full h-full" 
        preserveAspectRatio="none"
        viewBox="0 0 1200 800"
      >
        <defs>
          <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-accent-primary)" stopOpacity="0.2" />
            <stop offset="50%" stopColor="var(--color-accent-primary)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="var(--color-accent-secondary)" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        
        {/* Animated diagonal lines */}
        {[...Array(5)].map((_, i) => (
          <line
            key={i}
            x1={i * 300}
            y1="0"
            x2={i * 300 + 200}
            y2="800"
            stroke="url(#line-gradient)"
            strokeWidth="1"
            className="animate-shimmer"
            style={{ animationDelay: `${i * 0.5}s` }}
          />
        ))}
      </svg>
    </div>
  )
}

export default DynamicVisualization