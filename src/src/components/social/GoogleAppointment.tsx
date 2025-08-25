/**
 * @fileoverview GoogleAppointment - Google Calendar appointment booking component
 * @module components/social/GoogleAppointment
 * 
 * @description
 * A component that provides Google Calendar appointment booking integration.
 * Displays a stylized booking interface with a direct link to Google Calendar
 * appointments, supporting custom calendar URLs for different team members.
 * 
 * @architecture
 * ```
 * ┌──────────────────────────────────────────────────────────┐
 * │            GoogleAppointment Architecture                 │
 * ├──────────────────────────────────────────────────────────┤
 * │                                                          │
 * │  Configuration Input                                    │
 * │  ┌──────────────────────────────────────────────────┐   │
 * │  │  calendarUrl?: string                            │   │
 * │  │       │                                          │   │
 * │  │       ├── provided → Use custom URL            │   │
 * │  │       └── undefined → Use default fallback     │   │
 * │  └─────────────────────┬───────────────────────────┘   │
 * │                        ▼                                 │
 * │  URL Resolution                                         │
 * │  ┌──────────────────────────────────────────────────┐   │
 * │  │  bookingUrl = calendarUrl ||                     │   │
 * │  │    'https://calendar.google.com/calendar/        │   │
 * │  │     appointments'                                │   │
 * │  └─────────────────────┬───────────────────────────┘   │
 * │                        ▼                                 │
 * │  Component Rendering                                    │
 * │  ┌──────────────────────────────────────────────────┐   │
 * │  │  ┌──────────────────────────────────────────┐   │   │
 * │  │  │  Glass Morphism Container                 │   │   │
 * │  │  ├──────────────────────────────────────────┤   │   │
 * │  │  │  SCHEDULE A MEETING                       │   │   │
 * │  │  ├──────────────────────────────────────────┤   │   │
 * │  │  │  Book a time that works for you.          │   │   │
 * │  │  │  We'll discuss your needs and explore     │   │   │
 * │  │  │  how we can help.                         │   │   │
 * │  │  ├──────────────────────────────────────────┤   │   │
 * │  │  │  ┌────────────────────────────┐       │   │   │
 * │  │  │  │ [📅 Open Calendar]        │       │   │   │
 * │  │  │  └──────────┬─────────────────┘       │   │   │
 * │  │  │             │                           │   │   │
 * │  │  │        onClick → Open URL              │   │   │
 * │  │  │        target="_blank"                 │   │   │
 * │  │  │        rel="noopener noreferrer"       │   │   │
 * │  │  ├──────────────────────────────────────────┤   │   │
 * │  │  │  Powered by Google Calendar               │   │   │
 * │  │  └──────────────────────────────────────────┘   │   │
 * │  └──────────────────────────────────────────────────┘   │
 * │                                                          │
 * │  Visual Effects                                         │
 * │  ┌──────────────────────────────────────────────────┐   │
 * │  │  Hover State:                                    │   │
 * │  │  - Scale: 105%                                   │   │
 * │  │  - Shadow: Glow effect (accent color)            │   │
 * │  │  - Icon: 12deg rotation                          │   │
 * │  │  - Background: Opacity transition                │   │
 * │  │  - Border: Primary color                         │   │
 * │  └──────────────────────────────────────────────────┘   │
 * │                                                          │
 * └──────────────────────────────────────────────────────────┘
 * ```
 * 
 * @proto-integration
 * Maps to protobuf configurations:
 * - `config/proto/social/appointment_config.proto` - Appointment settings
 * - `config/proto/integrations/google_calendar.proto` - Calendar integration
 * - `config/proto/ui/booking_interface.proto` - Booking UI configuration
 * - `config/proto/design/glass_morphism.proto` - Visual styling
 * 
 * @hook-integration
 * None - Pure presentational component
 * 
 * @ecosystem-integration
 * - Used by: Contact page, service pages, team profiles
 * - Data flow: Calendar URL → appointment booking link
 * - External service: Google Calendar Appointments
 * - Theme: Glass morphism with accent colors
 * - Analytics: Could track appointment clicks via GTM
 * 
 * @features
 * - 📅 Google Calendar appointment integration
 * - 🔗 Custom calendar URL support
 * - 🕹️ Retrofuturistic glass morphism design
 * - ✨ Hover animations and glow effects
 * - 📱 Responsive layout
 * - ♿ Accessibility-friendly external links
 * - 🎯 Direct booking without intermediary
 * - 🔒 Privacy-focused (no data collection)
 * 
 * @google-calendar-specifications
 * - Service: Google Calendar Appointments
 * - URL format: calendar.google.com/calendar/appointments/schedules/{ID}
 * - Default: Generic appointments page
 * - Custom: Team member or service specific calendars
 * - Authentication: Handled by Google
 * - Privacy: Direct redirect, no data storage
 * 
 * @visual-specifications
 * - Container: Glass morphism with backdrop blur
 * - Border: 20% accent primary
 * - Padding: p-8 (32px)
 * - Border radius: rounded-lg
 * - Button:
 *   - Background: 10% accent, 20% on hover
 *   - Border: 40% accent, 100% on hover
 *   - Scale: 105% on hover
 *   - Shadow: Glow effect with accent RGB
 * - Icon: 20px, 12deg rotation on hover
 * - Typography: Monospace for technical feel
 * 
 * @accessibility
 * - External link attributes: target="_blank" rel="noopener noreferrer"
 * - Clear call-to-action text
 * - Keyboard navigation support
 * - Screen reader friendly labels
 * - Focus states for interaction
 * 
 * @performance
 * - No state management
 * - Static URL resolution
 * - Minimal DOM operations
 * - CSS-only animations
 * 
 * @security
 * - External link security attributes
 * - No user data collection
 * - Direct redirect to Google
 * - No intermediate processing
 * 
 * @dos
 * - ✅ Use full Google Calendar appointment URLs
 * - ✅ Include rel="noopener noreferrer"
 * - ✅ Test calendar links regularly
 * - ✅ Provide fallback URL
 * - ✅ Keep design consistent with ecosystem
 * 
 * @donts
 * - ❌ Don't collect user data before redirect
 * - ❌ Don't use URL shorteners
 * - ❌ Don't forget external link attributes
 * - ❌ Don't embed calendar directly (CORS)
 * - ❌ Don't skip hover animations
 * 
 * @example
 * ```tsx
 * // Basic appointment booking
 * <GoogleAppointment />
 * 
 * // Custom calendar URL
 * <GoogleAppointment 
 *   calendarUrl="https://calendar.google.com/calendar/appointments/schedules/SCHEDULE_ID"
 * />
 * 
 * // In contact section
 * <div className="grid md:grid-cols-2 gap-8">
 *   <ContactForm />
 *   <GoogleAppointment calendarUrl={config.appointmentUrl} />
 * </div>
 * 
 * // Complete integration
 * const ContactPage = () => {
 *   const { appointmentUrl } = useConfig()
 *   
 *   return (
 *     <section className="py-16">
 *       <h2>Get in Touch</h2>
 *       <div className="grid lg:grid-cols-2 gap-12">
 *         <div>
 *           <h3>Send a Message</h3>
 *           <ContactForm />
 *         </div>
 *         <div>
 *           <h3>Or Schedule a Call</h3>
 *           <GoogleAppointment 
 *             calendarUrl={appointmentUrl}
 *             className="mt-4"
 *           />
 *         </div>
 *       </div>
 *     </section>
 *   )
 * }
 * ```
 * 
 * @see {@link ../../../USE-CASE.md#social-components} - Social components spec
 * @see {@link https://calendar.google.com/calendar/appointments} - Google Calendar
 * @see {@link ../../../CONFIG.md#appointment-urls} - Calendar URL config
 * @see {@link ./SocialLinks.tsx} - Related social component
 * @see {@link ../../../BUILD.md#external-integrations} - Integration build
 * 
 * @since 1.0.0
 */

import React from 'react'
import { cn } from '@/lib/utils'
import { Calendar } from 'lucide-react'

/**
 * @interface GoogleAppointmentProps
 * @description Props for GoogleAppointment component with calendar configuration
 * 
 * @property {string} [calendarUrl] - Custom Google Calendar appointment URL
 * @property {string} [className] - Additional CSS classes for container
 */
interface GoogleAppointmentProps {
  /** Custom Google Calendar appointment URL */
  calendarUrl?: string
  /** Additional CSS classes */
  className?: string
}

/**
 * GoogleAppointment component - Google Calendar booking interface
 * 
 * @component
 * @param {GoogleAppointmentProps} props - Component props
 * @param {string} [props.calendarUrl] - Custom calendar appointment URL
 * @param {string} [props.className] - Additional CSS classes
 * 
 * @returns {JSX.Element} Styled appointment booking component with external link
 * 
 * @example
 * ```tsx
 * // Contact page integration
 * const Contact = () => (
 *   <GoogleAppointment
 *     calendarUrl={teamCalendarUrl}
 *     className="max-w-md mx-auto"
 *   />
 * )
 * ```
 */
export const GoogleAppointment: React.FC<GoogleAppointmentProps> = ({ 
  calendarUrl,
  className 
}) => {
  // Default to a placeholder URL if none provided
  const bookingUrl = calendarUrl || 'https://calendar.google.com/calendar/appointments'
  
  return (
    <div className={cn("w-full", className)}>
      <div className="bg-bg-glass backdrop-blur-xl border border-accent-primary/20 rounded-lg p-8">
        <h3 className="font-display text-2xl uppercase tracking-wider text-accent-primary mb-6">
          Schedule a Meeting
        </h3>
        
        <p className="font-mono text-text-secondary mb-6">
          Book a time that works for you. We&apos;ll discuss your needs and explore how we can help.
        </p>
        
        <a
          href={bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-6 py-3 
                     bg-accent-primary/10 hover:bg-accent-primary/20 
                     border border-accent-primary/40 hover:border-accent-primary 
                     rounded-lg transition-all duration-300
                     group hover:scale-105 hover:shadow-[0_0_20px_rgba(var(--accent-primary-rgb),0.3)]"
        >
          <Calendar size={20} className="text-accent-primary group-hover:rotate-12 transition-transform" />
          <span className="font-mono text-sm text-accent-primary">
            Open Calendar
          </span>
        </a>
        
        <p className="font-mono text-xs text-text-secondary/60 mt-4">
          Powered by Google Calendar
        </p>
      </div>
    </div>
  )
}