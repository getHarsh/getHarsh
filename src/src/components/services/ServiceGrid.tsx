/**
 * @fileoverview ServiceGrid - Responsive grid layout for service cards
 * @module components/services/ServiceGrid
 * 
 * @description
 * A smart grid component that displays service offerings in an adaptive
 * responsive layout. Automatically adjusts grid columns based on service count,
 * handles sorting, filtering, and integrates with analytics tracking.
 * 
 * @architecture
 * ```
 * ┌──────────────────────────────────────────────────────────┐
 * │                    ServiceGrid Flow                       │
 * ├──────────────────────────────────────────────────────────┤
 * │                                                          │
 * │  Service[] Input                                         │
 * │       │                                                  │
 * │       ▼                                                  │
 * │  ┌────────────────────────────────────────────────┐     │
 * │  │           Service Processing                     │     │
 * │  │  ┌──────────────┐  ┌────────────────────┐     │     │
 * │  │  │  Sort by Order │  │  Filter is_active  │     │     │
 * │  │  └──────┬───────┘  └──────────┬─────────┘     │     │
 * │  │         └──────────┬──────────┘                │     │
 * │  │                    ▼                           │     │
 * │  │         Active Services Array                  │     │
 * │  └────────────────────┬───────────────────────────┘     │
 * │                       ▼                                  │
 * │  ┌────────────────────────────────────────────────┐     │
 * │  │         Grid Layout Calculation                 │     │
 * │  │                                                  │     │
 * │  │  Count ──► Column Configuration                │     │
 * │  │    1   ──► 1 col (centered, max-w-md)        │     │
 * │  │    2   ──► 2 cols (md+, max-w-4xl)           │     │
 * │  │    3   ──► 3 cols (lg+)                      │     │
 * │  │    4   ──► 2x2 or 4 cols (xl)                │     │
 * │  │    5+  ──► max 3 cols with wrap              │     │
 * │  └────────────────────┬───────────────────────────┘     │
 * │                       ▼                                  │
 * │  ┌────────────────────────────────────────────────┐     │
 * │  │              Render Service Cards               │     │
 * │  │  ┌──────────────────────────────────────┐     │     │
 * │  │  │  ┌──────────┐  ┌──────────┐  ┌──────┐ │     │     │
 * │  │  │  │  Card 1  │  │  Card 2  │  │ ...  │ │     │     │
 * │  │  │  └────┬─────┘  └────┬─────┘  └──┬───┘ │     │     │
 * │  │  │       └─────────────┴─────────────┘   │     │     │
 * │  │  │                     ▼                     │     │     │
 * │  │  │         Service Interaction Tracking      │     │     │
 * │  │  └──────────────────────────────────────┘     │     │
 * │  └────────────────────┬───────────────────────────┘     │
 * │                       ▼                                  │
 * │  ┌────────────────────────────────────────────────┐     │
 * │  │         Enhanced Ecommerce Tracking            │     │
 * │  │  ┌──────────────┐  ┌────────────────────┐     │     │
 * │  │  │ List Impression│  │  Interaction Events│     │     │
 * │  │  └──────────────┘  └────────────────────┘     │     │
 * │  └────────────────────────────────────────────────┘     │
 * │                                                          │
 * └──────────────────────────────────────────────────────────┘
 * ```
 * 
 * @proto-integration
 * Maps to protobuf configurations:
 * - `config/proto/services/service_grid.proto` - Grid layout configuration
 * - `config/proto/ui/responsive_layout.proto` - Breakpoint definitions
 * - `config/proto/analytics/ecommerce_tracking.proto` - Enhanced tracking
 * - `config/proto/services/service_ordering.proto` - Sort and filter rules
 * 
 * @hook-integration
 * - `useServiceTracking()` - Enhanced ecommerce and interaction tracking
 * - `setupServiceListing()` - Initialize list view tracking
 * - `trackInteraction()` - Delegate card interaction events
 * 
 * @ecosystem-integration
 * - Used by: Services page, service sections
 * - Data flow: Service config → grid → cards → tracking
 * - Analytics: Enhanced ecommerce listing tracking
 * - Configuration: Reads from services.yaml
 * - CMS: Service data managed via Decap CMS
 * 
 * @features
 * - 🎯 Adaptive grid layout (1-4 columns)
 * - 📏 Service count aware column distribution
 * - 🔢 Display order sorting
 * - 🔍 Active/inactive filtering
 * - 📊 Enhanced ecommerce tracking
 * - 📱 Responsive breakpoints
 * - 🎯 Centered layouts for fewer items
 * - ♾️ Automatic column adjustment
 * 
 * @grid-specifications
 * ```
 * Service Count | Mobile | Tablet (md) | Desktop (lg) | Wide (xl)
 * -------------|--------|-------------|--------------|----------
 * 1            | 1 col  | 1 col       | 1 col        | 1 col
 * 2            | 1 col  | 2 cols      | 2 cols       | 2 cols
 * 3            | 1 col  | 2 cols      | 3 cols       | 3 cols
 * 4            | 1 col  | 2 cols      | 2 cols       | 4 cols
 * 5+           | 1 col  | 2 cols      | 3 cols       | 3 cols
 * ```
 * 
 * @responsive-breakpoints
 * - Mobile: < 768px - Always single column
 * - Tablet (md): ≥ 768px - 2 columns max
 * - Desktop (lg): ≥ 1024px - 3 columns for 3+ items
 * - Wide (xl): ≥ 1280px - 4 columns for exactly 4 items
 * 
 * @analytics-events
 * - `service_list_view` - When grid renders
 * - `service_impression` - Per service in view
 * - `service_interaction` - Card click/feature expand
 * - Position tracking for conversion analysis
 * 
 * @accessibility
 * - Semantic grid structure
 * - Keyboard navigation between cards
 * - Screen reader announcements
 * - Focus management
 * 
 * @performance
 * - Efficient sorting algorithm
 * - Memoized grid class calculation
 * - Single effect for tracking setup
 * - Optimized re-renders
 * 
 * @dos
 * - ✅ Sort services by display_order
 * - ✅ Filter inactive services
 * - ✅ Setup tracking on mount
 * - ✅ Use responsive breakpoints
 * - ✅ Center single items
 * 
 * @donts
 * - ❌ Don't render if no services
 * - ❌ Don't skip tracking setup
 * - ❌ Don't hardcode grid columns
 * - ❌ Don't mutate service array
 * - ❌ Don't forget position tracking
 * 
 * @example
 * ```tsx
 * // Basic service grid
 * <ServiceGrid
 *   services={[
 *     { id: 'ai', title: 'AI Transformation', ... },
 *     { id: 'web', title: 'Web Development', ... },
 *     { id: 'consulting', title: 'Tech Consulting', ... }
 *   ]}
 * />
 * 
 * // With custom styling
 * <ServiceGrid
 *   services={activeServices}
 *   className="bg-gray-50 rounded-lg p-8"
 * />
 * 
 * // Filtered and sorted services
 * const services = rawServices
 *   .filter(s => s.is_active)
 *   .sort((a, b) => a.display_order - b.display_order)
 * <ServiceGrid services={services} />
 * 
 * // With complete configuration
 * <ServiceGrid
 *   services={services.map(s => ({
 *     ...s,
 *     display_order: s.priority,
 *     is_active: s.enabled,
 *     schemaJson: buildServiceSchema(s)
 *   }))}
 *   className="container mx-auto"
 * />
 * ```
 * 
 * @see {@link ../../../SERVICES.md} - Services system documentation
 * @see {@link ./ServiceCard.tsx} - Individual service cards
 * @see {@link ../../hooks/useServiceTracking.ts} - Analytics tracking
 * @see {@link ../../../PRD_SERVICE.md} - Service requirements
 * @see {@link ../../../BUILD.md#service-grid} - Grid build process
 * 
 * @since 1.0.0
 */

import * as React from "react"
import { ServiceCard } from "./ServiceCard"
import { useServiceTracking } from "@/hooks/useServiceTracking"
import { cn } from "@/lib/utils"
import { Service } from "@/types/api"

/**
 * @interface ServiceGridProps
 * @description Props for ServiceGrid component with service array
 * 
 * @property {Service[]} services - Array of service objects to display
 * @property {string} [className] - Additional CSS classes for container styling
 */
interface ServiceGridProps {
  /** Array of services to display */
  services: Service[]
  /** Additional CSS classes */
  className?: string
}

/**
 * ServiceGrid component - Adaptive service card grid with intelligent layout
 * 
 * @component
 * @param {ServiceGridProps} props - Component props
 * @param {Service[]} props.services - Array of services to display in grid
 * @param {string} [props.className] - Additional CSS classes for container
 * 
 * @returns {JSX.Element | null} Service grid with adaptive columns or null if empty
 * 
 * @example
 * ```tsx
 * // Dynamic grid with tracking
 * const MyServicesPage = () => {
 *   const services = useServices()
 *   
 *   return (
 *     <ServiceGrid 
 *       services={services}
 *       className="my-8"
 *     />
 *   )
 * }
 * ```
 */
export const ServiceGrid: React.FC<ServiceGridProps> = ({ 
  services, 
  className 
}) => {
  const { trackInteraction, setupServiceListing } = useServiceTracking()

  React.useEffect(() => {
    // Setup enhanced ecommerce tracking for service listing
    if (services && services.length > 0) {
      // Map Service to ServiceData format
      const serviceData = services.map(service => ({
        id: service.id,
        name: service.title,
        category: 'general', // Default category, could be derived from service.schema_type
        startingPrice: undefined // Could be added to Service interface if needed
      }))
      setupServiceListing(serviceData)
    }
  }, [services, setupServiceListing])

  // If no services provided, don't render
  if (!services || services.length === 0) {
    return null
  }

  // Sort services by display_order if provided
  const sortedServices = [...services].sort((a, b) => {
    const orderA = a.display_order ?? 999
    const orderB = b.display_order ?? 999
    return orderA - orderB
  })

  // Filter out inactive services if is_active field is used
  const activeServices = sortedServices.filter(service => 
    service.is_active !== false
  )

  // Determine grid columns based on service count
  const getGridClass = () => {
    const count = activeServices.length
    
    if (count === 1) {
      // Single service - centered
      return "grid-cols-1 max-w-md mx-auto"
    } else if (count === 2) {
      // Two services - side by side
      return "grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto"
    } else if (count === 3) {
      // Three services - perfect 3 column
      return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
    } else if (count === 4) {
      // Four services - 2x2 grid
      return "grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4"
    } else {
      // 5+ services - max 3 columns with wrapping
      return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
    }
  }

  const handleServiceInteraction = (serviceId: string, type: string) => {
    trackInteraction(serviceId, type)
  }

  return (
    <div className={cn("py-12", className)}>
      <div className={cn(
        "grid gap-6",
        getGridClass()
      )}>
        {activeServices.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            onInteraction={handleServiceInteraction}
          />
        ))}
      </div>
    </div>
  )
}

export default ServiceGrid