/**
 * @fileoverview Navigation Components Barrel Export
 * @module components/navigation
 * 
 * @description
 * Central export point for all navigation components in the ecosystem.
 * Provides entity-aware navigation and footer components that adapt to
 * different site types (domain, blog, project, docs, sponsor, services).
 * 
 * These components form the primary navigation structure for the entire
 * ecosystem, handling cross-domain routing, feature flags, and legal compliance.
 * 
 * @architecture
 * ```
 * components/navigation/index.ts (this file)
 *         ├── TopNavigation (header nav)
 *         └── UniversalFooter (footer)
 * 
 * Component Hierarchy:
 * PageLayout
 *     ├── TopNavigation (fixed top)
 *     ├── Content
 *     └── UniversalFooter (bottom)
 * ```
 * 
 * @proto-integration
 * Navigation components map to:
 * - **NavigationConfig** (navigation.proto): Navigation patterns
 * - **DomainConfig** (domain.proto): Feature flags and entity info
 * - **PolicySettings** (policy.proto): Legal links in footer
 * - **ThemeConfig** (theme.proto): Colors and branding
 * 
 * @usage
 * ```tsx
 * // Import specific components
 * import { TopNavigation, UniversalFooter } from '@/components/navigation'
 * 
 * // Use in layout
 * export const AppLayout = ({ children }) => (
 *   <>
 *     <TopNavigation variant="domain" />
 *     <main>{children}</main>
 *     <UniversalFooter />
 *   </>
 * )
 * ```
 * 
 * @exports
 * - {@link TopNavigation} - Entity-aware header navigation
 * - {@link UniversalFooter} - Universal footer with legal/discovery links
 * 
 * Note: Legacy components (TopNav, Footer) are not exported here.
 * Use TopNavigation and UniversalFooter for all new implementations.
 * Breadcrumbs component is planned but not yet implemented.
 * 
 * @see {@link file://./TopNavigation.tsx} - Header navigation component
 * @see {@link file://./UniversalFooter.tsx} - Footer component
 * @see {@link file://./USE-CASE.md#navigation} - Navigation patterns
 * @see {@link file://./BUILD.md#navigation} - Navigation build process
 * 
 * @since 1.0.0
 */

export * from './TopNavigation'
export * from './UniversalFooter'