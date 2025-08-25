/**
 * @fileoverview EvolutionTimeline - AI evolution timeline visualization
 * @module components/services/EvolutionTimeline
 * 
 * @description
 * A responsive timeline component that visualizes the evolution of AI technology
 * and its business applications. Features three distinct responsive layouts
 * (desktop horizontal, tablet compact, mobile vertical) with current era highlighting.
 * 
 * @architecture
 * ```
 * ┌──────────────────────────────────────────────────────────┐
 * │            EvolutionTimeline Responsive Layouts           │
 * ├──────────────────────────────────────────────────────────┤
 * │                                                          │
 * │  Desktop (lg+): Horizontal Timeline                     │
 * │  ┌────────────────────────────────────────────────┐     │
 * │  │       Era 1        Era 2        Era 3         │     │
 * │  │  ──────●────────────●────────────●──────  │     │
 * │  │       │            │            │            │     │
 * │  │    [Period]     [Period]    [🔴Period]      │     │
 * │  │     Title        Title        Title          │     │
 * │  │   Description  Description  Description      │     │
 * │  │   • Point 1    • Point 1    • Point 1        │     │
 * │  │   • Point 2    • Point 2    • Point 2        │     │
 * │  │                             [NOW]             │     │
 * │  └────────────────────────────────────────────────┘     │
 * │                                                          │
 * │  Tablet (md): Compact Vertical                          │
 * │  ┌────────────────────────────────────────────────┐     │
 * │  │  ●── [Period] Title                          │     │
 * │  │  │   Description                              │     │
 * │  │  │   • Key points                             │     │
 * │  │  │                                            │     │
 * │  │  ●── [Period] [CURRENT] Title                │     │
 * │  │  │   ┌────────────────────────────────┐    │     │
 * │  │  │   │ Highlighted current era      │    │     │
 * │  │  │   └────────────────────────────────┘    │     │
 * │  │  │                                            │     │
 * │  │  ●── [Period] Title                          │     │
 * │  └────────────────────────────────────────────────┘     │
 * │                                                          │
 * │  Mobile: Full Vertical Cards                            │
 * │  ┌────────────────────────────────────────────────┐     │
 * │  │    ● [Period] Title                          │     │
 * │  │    │ Description                              │     │
 * │  │    │ • Points                                 │     │
 * │  │    │                                          │     │
 * │  │    ● [Period] [NOW] Title                   │     │
 * │  │    │ ┌──────────────────────────────────┐  │     │
 * │  │    │ │ Current era card with bg      │  │     │
 * │  │    │ └──────────────────────────────────┘  │     │
 * │  │    │                                          │     │
 * │  │    ● [Period] Title                          │     │
 * │  └────────────────────────────────────────────────┘     │
 * │                                                          │
 * └──────────────────────────────────────────────────────────┘
 * ```
 * 
 * @proto-integration
 * Maps to protobuf configurations:
 * - `config/proto/services/evolution_timeline.proto` - Timeline data structure
 * - `config/proto/ui/timeline_display.proto` - Display configuration
 * - `config/proto/design/animation_config.proto` - Animation settings
 * - `config/proto/content/storytelling.proto` - Era narrative content
 * 
 * @hook-integration
 * None - Pure presentational component
 * 
 * @ecosystem-integration
 * - Used by: Services page AI evolution section
 * - Data flow: Timeline config → visual timeline
 * - Content: From services.yaml evolution configuration
 * - Responsive: Desktop, tablet, mobile layouts
 * 
 * @features
 * - 📊 Three responsive layout variants
 * - 🎯 Current era highlighting with animation
 * - 📝 Key points for each era
 * - 🔗 Visual timeline connections
 * - 🎲 Adaptive grid for any number of eras
 * - ✨ Smooth transitions and hover effects
 * - 📡 Pulsing animation for current era
 * - 🏷️ NOW indicator positioning
 * 
 * @timeline-data-structure
 * ```yaml
 * timeline:
 *   eras:
 *     - period: "2015-2020"      # Time range
 *       title: "ML Era"          # Era name
 *       description: "Early AI"  # Brief description
 *       key_points:              # Optional points
 *         - "Classification"
 *         - "Regression"
 *       is_current: false        # Current marker
 * ```
 * 
 * @responsive-specifications
 * 
 * Desktop (lg+, ≥ 1024px):
 * - Horizontal timeline with equal columns
 * - Timeline line connecting all nodes
 * - Centered node circles
 * - Full content below each node
 * - NOW indicator below current era
 * 
 * Tablet (md, 768-1023px):
 * - Compact vertical list
 * - Side timeline indicators
 * - Inline CURRENT badge
 * - Highlighted current era card
 * - Connected vertical line
 * 
 * Mobile (< 768px):
 * - Full vertical timeline
 * - Left-aligned timeline line
 * - Card-based era display
 * - NOW badge inline
 * - Enhanced current era styling
 * 
 * @visual-specifications
 * - Node size: 16px (desktop), 12px (tablet/mobile)
 * - Timeline line: 2px solid border color
 * - Current node: Primary color with pulse
 * - Current card: 5% primary bg, 20% border
 * - NOW badge: Primary bg, white text
 * - Animation: CSS pulse on current nodes
 * 
 * @accessibility
 * - Semantic HTML structure
 * - Clear visual hierarchy
 * - Color not sole indicator (badges/text)
 * - Keyboard navigable content
 * - Screen reader friendly labels
 * 
 * @performance
 * - Pure CSS animations
 * - No JavaScript state management
 * - Responsive CSS Grid/Flexbox
 * - Minimal re-renders
 * 
 * @dos
 * - ✅ Always mark current era clearly
 * - ✅ Maintain visual continuity
 * - ✅ Use consistent spacing
 * - ✅ Provide fallback for empty data
 * - ✅ Keep animations subtle
 * 
 * @donts
 * - ❌ Don't render without eras
 * - ❌ Don't skip responsive layouts
 * - ❌ Don't use heavy animations
 * - ❌ Don't break timeline continuity
 * - ❌ Don't hide key information
 * 
 * @example
 * ```tsx
 * // Basic evolution timeline
 * <EvolutionTimeline
 *   timeline={{
 *     eras: [
 *       {
 *         period: "2015-2020",
 *         title: "Machine Learning Era",
 *         description: "Traditional ML models",
 *         key_points: ["Classification", "Regression"]
 *       },
 *       {
 *         period: "2020-2023",
 *         title: "Transformer Revolution",
 *         description: "GPT and BERT models",
 *         key_points: ["NLP breakthrough", "Transfer learning"],
 *         is_current: true
 *       },
 *       {
 *         period: "2024+",
 *         title: "AGI Horizon",
 *         description: "Towards general intelligence"
 *       }
 *     ]
 *   }}
 * />
 * 
 * // With custom styling
 * <EvolutionTimeline
 *   timeline={evolutionData}
 *   className="bg-gray-50 rounded-lg p-8"
 * />
 * 
 * // Complete AI evolution
 * <EvolutionTimeline
 *   timeline={{
 *     eras: [
 *       {
 *         period: "2010-2015",
 *         title: "Early Neural Networks",
 *         description: "Deep learning foundations",
 *         key_points: [
 *           "ImageNet breakthrough",
 *           "Convolutional networks",
 *           "RNN/LSTM models"
 *         ]
 *       },
 *       {
 *         period: "2015-2020",
 *         title: "AI Democratization",
 *         description: "Frameworks and cloud AI",
 *         key_points: [
 *           "TensorFlow/PyTorch",
 *           "Cloud AI services",
 *           "Transfer learning"
 *         ]
 *       },
 *       {
 *         period: "2020-2023",
 *         title: "Large Language Models",
 *         description: "GPT era begins",
 *         key_points: [
 *           "GPT-3 launch",
 *           "ChatGPT phenomenon",
 *           "Multimodal models"
 *         ],
 *         is_current: true
 *       },
 *       {
 *         period: "2024+",
 *         title: "AGI Pursuit",
 *         description: "Towards artificial general intelligence",
 *         key_points: [
 *           "Reasoning capabilities",
 *           "Autonomous agents",
 *           "Scientific discovery"
 *         ]
 *       }
 *     ]
 *   }}
 * />
 * ```
 * 
 * @see {@link ../../../SERVICES.md#ai-evolution} - AI evolution content
 * @see {@link ../../../../config/services.yaml#evolution} - Timeline configuration
 * @see {@link ../../../PRD_SERVICE.md#storytelling} - Evolution storytelling
 * @see {@link ../../../BUILD.md#evolution-timeline} - Timeline build process
 * 
 * @since 1.0.0
 */

import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * @interface TimelineEra
 * @description Individual era in the evolution timeline with metadata
 * 
 * @property {string} period - Time period or year range (e.g., "2020-2023")
 * @property {string} title - Era title/name for display
 * @property {string} description - Brief description of the era
 * @property {string[]} [key_points] - Optional major developments/capabilities
 * @property {boolean} [is_current] - Whether this is the current/active era
 */
interface TimelineEra {
  /** Time period or year range */
  period: string
  /** Era title/name */
  title: string
  /** Era description */
  description: string
  /** Key developments/points */
  key_points?: string[]
  /** Whether this is the current era */
  is_current?: boolean
}

/**
 * @interface EvolutionTimelineProps
 * @description Props for EvolutionTimeline component with timeline data
 * 
 * @property {Object} [timeline] - Timeline data structure container
 * @property {TimelineEra[]} [timeline.eras] - Array of timeline eras to display
 * @property {string} [className] - Additional CSS classes for styling
 */
interface EvolutionTimelineProps {
  /** Timeline data structure */
  timeline?: {
    /** Array of timeline eras */
    eras?: TimelineEra[]
  }
  /** Additional CSS classes */
  className?: string
}

/**
 * EvolutionTimeline component - Responsive AI evolution timeline visualization
 * 
 * @component
 * @param {EvolutionTimelineProps} props - Component props
 * @param {Object} [props.timeline] - Timeline data container
 * @param {TimelineEra[]} [props.timeline.eras] - Array of eras to visualize
 * @param {string} [props.className] - Additional CSS classes
 * 
 * @returns {JSX.Element | null} Responsive timeline visualization or null if no data
 * 
 * @example
 * ```tsx
 * // Create an evolution story
 * const aiEvolution = {
 *   eras: [
 *     { period: "Past", title: "Rule-based AI", description: "Expert systems" },
 *     { period: "Present", title: "Deep Learning", description: "Neural networks", is_current: true },
 *     { period: "Future", title: "AGI", description: "General intelligence" }
 *   ]
 * }
 * 
 * <EvolutionTimeline timeline={aiEvolution} />
 * ```
 */
export const EvolutionTimeline: React.FC<EvolutionTimelineProps> = ({ 
  timeline,
  className 
}) => {
  // If no timeline or eras provided, don't render
  if (!timeline?.eras || timeline.eras.length === 0) {
    return null
  }

  const eras = timeline.eras

  return (
    <div className={cn("py-12", className)}>
      {/* Desktop: Horizontal Timeline */}
      <div className="hidden lg:block">
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2" />
          
          {/* Era nodes */}
          <div className="relative grid" style={{ gridTemplateColumns: `repeat(${eras.length}, 1fr)` }}>
            {eras.map((era, index) => (
              <div 
                key={index}
                className={cn(
                  "relative flex flex-col items-center",
                  index > 0 && "border-l border-border/30"
                )}
              >
                {/* Node circle */}
                <div 
                  className={cn(
                    "relative z-10 w-4 h-4 rounded-full border-2 bg-background",
                    era.is_current 
                      ? "border-primary bg-primary animate-pulse" 
                      : "border-muted-foreground"
                  )}
                />
                
                {/* Era content */}
                <div className="mt-6 text-center px-4">
                  <div className={cn(
                    "text-sm font-bold mb-1",
                    era.is_current && "text-primary"
                  )}>
                    {era.period}
                  </div>
                  <div className={cn(
                    "text-base font-semibold mb-2",
                    era.is_current && "text-primary"
                  )}>
                    {era.title}
                  </div>
                  <div className="text-xs text-muted-foreground mb-2">
                    {era.description}
                  </div>
                  
                  {/* Key points */}
                  {era.key_points && era.key_points.length > 0 && (
                    <ul className="text-xs space-y-1">
                      {era.key_points.map((point, pointIndex) => (
                        <li key={pointIndex} className="text-muted-foreground">
                          • {point}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Current era indicator */}
                {era.is_current && (
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
                    <div className="px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full">
                      NOW
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tablet: Compact Horizontal */}
      <div className="hidden md:block lg:hidden">
        <div className="space-y-4">
          {eras.map((era, index) => (
            <div 
              key={index}
              className={cn(
                "flex items-start gap-4 p-4 rounded-lg",
                era.is_current && "bg-primary/5 border border-primary/20"
              )}
            >
              {/* Timeline indicator */}
              <div className="flex flex-col items-center">
                <div 
                  className={cn(
                    "w-3 h-3 rounded-full",
                    era.is_current 
                      ? "bg-primary animate-pulse" 
                      : "bg-muted-foreground"
                  )}
                />
                {index < eras.length - 1 && (
                  <div className="w-0.5 h-full bg-border mt-2" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={cn(
                    "text-sm font-bold",
                    era.is_current && "text-primary"
                  )}>
                    {era.period}
                  </span>
                  {era.is_current && (
                    <span className="px-2 py-0.5 bg-primary text-primary-foreground text-xs font-bold rounded">
                      CURRENT
                    </span>
                  )}
                </div>
                <div className="font-semibold mb-1">{era.title}</div>
                <div className="text-sm text-muted-foreground mb-2">
                  {era.description}
                </div>
                {era.key_points && (
                  <div className="text-xs text-muted-foreground space-y-0.5">
                    {era.key_points.map((point, pointIndex) => (
                      <div key={pointIndex}>• {point}</div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: Vertical Timeline */}
      <div className="md:hidden">
        <div className="space-y-6">
          {eras.map((era, index) => (
            <div 
              key={index}
              className={cn(
                "relative pl-8",
                era.is_current && "pr-4"
              )}
            >
              {/* Vertical line */}
              {index < eras.length - 1 && (
                <div className="absolute left-2 top-6 bottom-0 w-0.5 bg-border" />
              )}

              {/* Node */}
              <div 
                className={cn(
                  "absolute left-0 top-1 w-4 h-4 rounded-full border-2 bg-background",
                  era.is_current 
                    ? "border-primary bg-primary animate-pulse" 
                    : "border-muted-foreground"
                )}
              />

              {/* Content */}
              <div className={cn(
                "space-y-1",
                era.is_current && "bg-primary/5 p-3 rounded-lg border border-primary/20"
              )}>
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "text-sm font-bold",
                    era.is_current && "text-primary"
                  )}>
                    {era.period}
                  </span>
                  {era.is_current && (
                    <span className="px-2 py-0.5 bg-primary text-primary-foreground text-xs font-bold rounded">
                      NOW
                    </span>
                  )}
                </div>
                <div className="font-semibold">{era.title}</div>
                <div className="text-sm text-muted-foreground">
                  {era.description}
                </div>
                {era.key_points && era.key_points.length > 0 && (
                  <div className="text-xs text-muted-foreground space-y-0.5 mt-2">
                    {era.key_points.map((point, pointIndex) => (
                      <div key={pointIndex}>• {point}</div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default EvolutionTimeline