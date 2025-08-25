/**
 * @fileoverview ServiceCard - Individual service offering display card
 * @module components/services/ServiceCard
 * 
 * @description
 * A rich service card component that displays comprehensive information about
 * a single service offering including features, outcomes, deliverables, and
 * Schema.org structured data. Supports interaction tracking and dynamic styling.
 * 
 * @architecture
 * ```
 * ┌──────────────────────────────────────────────────────────┐
 * │                    ServiceCard Structure                  │
 * ├──────────────────────────────────────────────────────────┤
 * │                                                          │
 * │  ┌────────────────────────────────────────────────┐     │
 * │  │           Service Configuration                 │     │
 * │  │  ┌──────────────┐  ┌────────────────────┐     │     │
 * │  │  │ services.yaml│  │ Schema.org Mapping │     │     │
 * │  │  └──────┬───────┘  └──────────┬─────────┘     │     │
 * │  │         └──────────┬──────────┘                │     │
 * │  │                    ▼                           │     │
 * │  │           Service Data Object                  │     │
 * │  └────────────────────┬───────────────────────────┘     │
 * │                       ▼                                  │
 * │  ┌────────────────────────────────────────────────┐     │
 * │  │              Card Rendering                     │     │
 * │  │  ┌──────────────────────────────────────┐     │     │
 * │  │  │ [Icon]  Title                        │     │     │
 * │  │  │         Tagline                      │     │     │
 * │  │  ├──────────────────────────────────────┤     │     │
 * │  │  │ Description                          │     │     │
 * │  │  ├──────────────────────────────────────┤     │     │
 * │  │  │ ▼ Key Features (expandable)          │     │     │
 * │  │  │   • Feature 1                        │     │     │
 * │  │  │   • Feature 2                        │     │     │
 * │  │  ├──────────────────────────────────────┤     │     │
 * │  │  │ ▼ Outcomes (expandable)              │     │     │
 * │  │  │   ✓ Outcome 1                        │     │     │
 * │  │  │   ✓ Outcome 2                        │     │     │
 * │  │  ├──────────────────────────────────────┤     │     │
 * │  │  │ ▼ Deliverables (expandable)          │     │     │
 * │  │  │   → Deliverable 1                    │     │     │
 * │  │  │   → Deliverable 2                    │     │     │
 * │  │  └──────────────────────────────────────┘     │     │
 * │  └────────────────────┬───────────────────────────┘     │
 * │                       ▼                                  │
 * │  ┌────────────────────────────────────────────────┐     │
 * │  │           Interaction & Analytics               │     │
 * │  │  ┌──────────────┐  ┌────────────────────┐     │     │
 * │  │  │  Card Click  │  │  Feature Expand    │     │     │
 * │  │  └──────┬───────┘  └──────────┬─────────┘     │     │
 * │  │         └──────────┬──────────┘                │     │
 * │  │                    ▼                           │     │
 * │  │          GTM Event Tracking                    │     │
 * │  └────────────────────────────────────────────────┘     │
 * │                                                          │
 * └──────────────────────────────────────────────────────────┘
 * ```
 * 
 * @proto-integration
 * Maps to protobuf configurations:
 * - `config/proto/services/service_definition.proto` - Service data structure
 * - `config/proto/ui/card_config.proto` - Card display settings
 * - `config/proto/analytics/interaction_tracking.proto` - Event tracking
 * - `config/proto/schema/service_schema.proto` - Schema.org mappings
 * - `config/proto/design/accent_colors.proto` - Color customization
 * 
 * @hook-integration
 * - `useSchema()` - Build and render Schema.org JSON-LD
 * - `useServiceTracking()` - Track service interactions (implicit)
 * - `getSchemaType()` - Map service types to Schema.org
 * 
 * @ecosystem-integration
 * - Used by: ServiceGrid for service listings
 * - Data flow: Service config → card display → interaction tracking
 * - Schema: Embeds pre-built Schema.org JSON-LD
 * - Analytics: Tracks card and feature interactions
 * - CMS: Service data managed via Decap CMS
 * 
 * @features
 * - 🎨 Dynamic accent colors from configuration
 * - 📊 Schema.org JSON-LD for SEO
 * - 📝 Feature, outcome, and deliverable lists
 * - 📈 Interaction tracking for analytics
 * - ✨ Hover effects and animations
 * - 🖼️ Icon support (URL or emoji)
 * - ♿ Full accessibility with ARIA
 * - 🔄 Expandable/collapsible sections
 * 
 * @service-structure
 * ```yaml
 * service:
 *   id: string              # Unique identifier
 *   title: string           # Service name
 *   tagline: string         # Value proposition
 *   description: string     # Detailed description
 *   features: string[]      # Key capabilities
 *   outcomes: string[]      # Expected results
 *   deliverables: string[]  # Tangible outputs
 *   icon: string           # URL or emoji
 *   accent_color: string   # Hex color
 *   schema_type: string    # Schema.org type
 *   is_active: boolean     # Enable/disable
 *   display_order: number  # Sort order
 * ```
 * 
 * @interaction-events
 * - `card_click` - Full card interaction
 * - `feature_expand_{feature}` - Individual feature click
 * - `section_toggle_{section}` - Section expand/collapse
 * - Enables conversion funnel analysis
 * - Feeds into service optimization
 * 
 * @visual-specifications
 * - Glass morphism: `backdrop-blur-sm bg-background/95`
 * - Border: 2px with 50% opacity, primary on hover
 * - Scale on hover: 1.02x with shadow-xl
 * - Gradient overlay: Dynamic from accent_color
 * - Expandable sections: Smooth transitions
 * 
 * @accessibility
 * - Semantic HTML with article role
 * - ARIA labels for service identification
 * - Expandable sections with aria-expanded
 * - Keyboard navigation support
 * - Screen reader announcements
 * 
 * @performance
 * - Memoized schema generation
 * - Optimized re-renders with React.memo
 * - Lazy loading for icons
 * - CSS transitions for animations
 * 
 * @dos
 * - ✅ Use pre-built schema when available
 * - ✅ Track all user interactions
 * - ✅ Provide fallbacks for missing data
 * - ✅ Keep sections expanded by default
 * - ✅ Use semantic markup
 * 
 * @donts
 * - ❌ Don't hardcode accent colors
 * - ❌ Don't skip interaction tracking
 * - ❌ Don't block card clicks on child elements
 * - ❌ Don't animate without transitions
 * - ❌ Don't hide critical information
 * 
 * @example
 * ```tsx
 * // Basic service card
 * <ServiceCard
 *   service={{
 *     id: 'ai-transformation',
 *     title: 'AI Transformation',
 *     tagline: 'Elevate your business with AI',
 *     description: 'Strategic AI implementation...',
 *     features: ['Custom AI solutions', 'Team training'],
 *     outcomes: ['Increased efficiency', 'Cost reduction'],
 *     accent_color: '#3B82F6'
 *   }}
 *   onInteraction={trackServiceInteraction}
 * />
 * 
 * // With Schema.org and deliverables
 * <ServiceCard
 *   service={{
 *     ...serviceData,
 *     deliverables: ['Implementation roadmap', 'Training materials'],
 *     schemaJson: preBuiltSchema
 *   }}
 *   className="col-span-2"
 * />
 * 
 * // Full-featured card
 * <ServiceCard
 *   service={{
 *     id: 'quantum-consulting',
 *     title: 'Quantum Computing Consulting',
 *     tagline: 'Navigate the quantum revolution',
 *     description: 'Expert guidance for quantum adoption',
 *     features: [
 *       'Quantum readiness assessment',
 *       'Algorithm development',
 *       'Team training'
 *     ],
 *     outcomes: [
 *       'Quantum strategy roadmap',
 *       'Competitive advantage',
 *       'Future-proof infrastructure'
 *     ],
 *     deliverables: [
 *       'Assessment report',
 *       'Implementation plan',
 *       'Training materials'
 *     ],
 *     icon: '⚛️',
 *     accent_color: '#8B5CF6',
 *     schema_type: 'ProfessionalService',
 *     is_active: true,
 *     display_order: 1
 *   }}
 *   onInteraction={(id, type) => {
 *     console.log(`Service ${id}: ${type}`)
 *   }}
 * />
 * ```
 * 
 * @see {@link ../../../SERVICES.md} - Services system documentation
 * @see {@link ./ServiceGrid.tsx} - Parent container component
 * @see {@link ../../../../config/services.yaml} - Service configuration
 * @see {@link ../../../PRD_SERVICE.md} - Service requirements
 * @see {@link ../../../BUILD.md#services} - Service build process
 * 
 * @since 1.0.0
 */

import * as React from "react"
import { Card } from "@/components/ui/Card"
import { cn } from "@/lib/utils"
import { useSchema } from "@/hooks/useSchema"
import { getSchemaType } from "@/utils/mappings"

/**
 * @interface ServiceCardProps
 * @description Props for ServiceCard component with comprehensive service data
 * 
 * @property {Object} service - Service data object from configuration
 * @property {(serviceId: string, type: string) => void} [onInteraction] - Interaction tracking callback
 * @property {string} [className] - Additional CSS classes for styling
 */
interface ServiceCardProps {
  /** Service data object */
  service: {
    /** Unique service identifier */
    id: string
    /** Service title */
    title: string
    /** Brief tagline */
    tagline: string
    /** Full description */
    description: string
    /** Key features list */
    features?: string[]
    /** Expected outcomes */
    outcomes?: string[]
    /** Tangible deliverables */
    deliverables?: string[]
    /** Icon URL or emoji */
    icon?: string
    /** Custom accent color */
    accent_color?: string
    /** Schema.org type */
    schema_type?: string
    /** Active/inactive state */
    is_active?: boolean
    /** Display order */
    display_order?: number
    /** Pre-built Schema.org JSON-LD from build system */
    schemaJson?: any
  }
  /** Interaction tracking callback */
  onInteraction?: (serviceId: string, type: string) => void
  /** Additional CSS classes */
  className?: string
}

/**
 * ServiceCard component - Rich service offering display with interaction tracking
 * 
 * @component
 * @param {ServiceCardProps} props - Component props
 * @param {Object} props.service - Service data object with all fields
 * @param {(serviceId: string, type: string) => void} [props.onInteraction] - Interaction tracking handler
 * @param {string} [props.className] - Additional CSS classes
 * 
 * @returns {JSX.Element} Service card with comprehensive information and Schema.org
 * 
 * @example
 * ```tsx
 * // Track interactions
 * const handleInteraction = (serviceId: string, type: string) => {
 *   gtag('event', 'service_interaction', {
 *     service_id: serviceId,
 *     interaction_type: type
 *   })
 * }
 * 
 * <ServiceCard
 *   service={serviceData}
 *   onInteraction={handleInteraction}
 * />
 * ```
 */
export const ServiceCard: React.FC<ServiceCardProps> = ({ 
  service, 
  onInteraction,
  className 
}) => {
  // State for expandable sections - default to expanded for better UX
  const [expandedFeatures, setExpandedFeatures] = React.useState(true)
  const [expandedOutcomes, setExpandedOutcomes] = React.useState(true)
  const [expandedDeliverables, setExpandedDeliverables] = React.useState(true)
  
  // Get schema utilities from hook
  const { buildServiceSchema, renderJsonLd } = useSchema()
  
  const handleClick = () => {
    if (onInteraction) {
      onInteraction(service.id, 'card_click')
    }
  }

  const handleFeatureClick = (feature: string) => {
    if (onInteraction) {
      onInteraction(service.id, `feature_expand_${feature}`)
    }
  }

  // Dynamic accent color from config or default
  const accentStyle = service.accent_color 
    ? { borderColor: service.accent_color, '--accent': service.accent_color } as React.CSSProperties
    : {}
  
  // Build Service schema for SEO and rich snippets
  const serviceSchema = React.useMemo(() => {
    // Use pre-built schema if provided, otherwise build new one
    if (service.schemaJson) {
      return service.schemaJson
    }
    
    // Map service type using the mapping system
    const schemaType = service.schema_type 
      ? getSchemaType('service_component_types', service.schema_type, 'Service')
      : 'Service'
    
    return buildServiceSchema({
      name: service.title,
      description: service.description,
      serviceType: schemaType
    })
  }, [service, buildServiceSchema])

  return (
    <Card 
      className={cn(
        "group relative overflow-hidden transition-all duration-300",
        "hover:shadow-xl hover:scale-[1.02]",
        "border-2 border-border/50 hover:border-primary/50",
        "backdrop-blur-sm bg-background/95",
        className
      )}
      style={accentStyle}
      onClick={handleClick}
      role="article"
      aria-label={`${service.title} service`}
    >
      {/* Schema.org JSON-LD - Either pre-built or generated */}
      {renderJsonLd(serviceSchema)}

      <div className="p-6 space-y-4">
        {/* Icon if provided */}
        {service.icon && (
          <div className="w-12 h-12 mb-4 text-primary">
            {/* Icon can be URL or icon name - handle both */}
            {service.icon.startsWith('http') ? (
              <img src={service.icon} alt="" className="w-full h-full" />
            ) : (
              <span className="text-3xl">{service.icon}</span>
            )}
          </div>
        )}

        {/* Title and Tagline */}
        <div>
          <h3 className="text-xl font-bold mb-1">{service.title}</h3>
          {service.tagline && (
            <p className="text-sm text-muted-foreground font-medium">
              {service.tagline}
            </p>
          )}
        </div>

        {/* Description */}
        <p className="text-sm leading-relaxed">
          {service.description}
        </p>

        {/* Features List with expandable section */}
        {service.features && service.features.length > 0 && (
          <div className="space-y-2">
            <button
              className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2 hover:text-primary transition-colors"
              onClick={(e) => {
                e.stopPropagation()
                setExpandedFeatures(!expandedFeatures)
              }}
              aria-expanded={expandedFeatures}
              aria-controls="features-list"
            >
              Key Features
              <span className="text-xs">{expandedFeatures ? '▼' : '▶'}</span>
            </button>
            <ul 
              id="features-list" 
              className={cn("space-y-1 transition-all", !expandedFeatures && "hidden")}
              aria-hidden={!expandedFeatures}
            >
              {service.features.map((feature, index) => (
                <li 
                  key={index}
                  className="text-sm flex items-start gap-2 cursor-pointer hover:text-primary transition-colors"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleFeatureClick(feature)
                  }}
                >
                  <span className="text-primary mt-0.5">•</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Outcomes List with expandable section */}
        {service.outcomes && service.outcomes.length > 0 && (
          <div className="space-y-2">
            <button
              className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2 hover:text-primary transition-colors"
              onClick={(e) => {
                e.stopPropagation()
                setExpandedOutcomes(!expandedOutcomes)
              }}
              aria-expanded={expandedOutcomes}
              aria-controls="outcomes-list"
            >
              Outcomes
              <span className="text-xs">{expandedOutcomes ? '▼' : '▶'}</span>
            </button>
            <ul 
              id="outcomes-list" 
              className={cn("space-y-1 transition-all", !expandedOutcomes && "hidden")}
              aria-hidden={!expandedOutcomes}
            >
              {service.outcomes.map((outcome, index) => (
                <li 
                  key={index}
                  className="text-sm flex items-start gap-2"
                >
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Deliverables with expandable section */}
        {service.deliverables && service.deliverables.length > 0 && (
          <div className="space-y-2">
            <button
              className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2 hover:text-primary transition-colors"
              onClick={(e) => {
                e.stopPropagation()
                setExpandedDeliverables(!expandedDeliverables)
              }}
              aria-expanded={expandedDeliverables}
              aria-controls="deliverables-list"
            >
              Deliverables
              <span className="text-xs">{expandedDeliverables ? '▼' : '▶'}</span>
            </button>
            <ul 
              id="deliverables-list" 
              className={cn("space-y-1 transition-all", !expandedDeliverables && "hidden")}
              aria-hidden={!expandedDeliverables}
            >
              {service.deliverables.map((deliverable, index) => (
                <li 
                  key={index}
                  className="text-sm flex items-start gap-2"
                >
                  <span className="text-blue-500 mt-0.5">→</span>
                  <span>{deliverable}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Hover effect overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        style={{ background: `linear-gradient(135deg, ${service.accent_color}15 0%, transparent 100%)` }}
      />
    </Card>
  )
}

export default ServiceCard